import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function csvEscape(value: any) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return `"${text.replace(/"/g, '""')}"`;
}

function cleanText(value: any, max = 80) {
  return String(value || "")
    .replace(/[^\w\s\u0600-\u06FF\-+.&]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanPrice(value: any) {
  const text = String(value ?? "").replace(/[^\d.]/g, "");
  const num = Number(text);
  if (!Number.isFinite(num) || num <= 0) return "";
  return `${Math.round(num)} ريال`;
}

function makeSlug(text: string) {
  return encodeURIComponent(
    cleanText(text, 120)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );
}

function makeFinalUrl(product: any) {
  const id = product.id;
  const name = cleanText(product.product_name, 120);
  const slug = makeSlug(name);

  if (id) {
    return `https://bpschat.com/customer-offers/product/${id}-${slug}`;
  }

  return `https://bpschat.com/search/${slug}-sa`;
}

function makeKeywords(name: string) {
  const n = cleanText(name, 80);

  return [
    `[${n}]`,
    `"${n}"`,
    n,
    `سعر ${n}`,
    `شراء ${n}`,
    `${n} السعودية`,
    `${n} سعر السعودية`,
    `${n} امازون`,
    `${n} نون`,
  ];
}

function makeHeadline1(product: any) {
  const name = cleanText(product.product_name, 22);
  return `سعر ${name}`.slice(0, 30);
}

function makeHeadline2(product: any) {
  const price = cleanPrice(product.price);
  if (price) return `بسعر ${price}`.slice(0, 30);
  return "قارن الأسعار قبل الشراء";
}

function makeHeadline3(product: any) {
  const store = cleanText(product.store_name, 18);
  if (store) return `من ${store}`.slice(0, 30);
  return "BPS Chat";
}

function makeDescription1(product: any) {
  const price = cleanPrice(product.price);
  if (price) {
    return `شاهد سعر المنتج حوالي ${price} وقارن التفاصيل قبل الشراء.`.slice(0, 90);
  }
  return "قارن أسعار المنتجات في السعودية واعرف التفاصيل ورابط الشراء.".slice(0, 90);
}

function makeDescription2(product: any) {
  const store = cleanText(product.store_name, 20);
  if (store) {
    return `انتقل من BPS Chat إلى ${store} لإتمام الشراء من المتجر.`.slice(0, 90);
  }
  return "صفحة المنتج تعرض السعر والتفاصيل ورابط الشراء من المتجر.".slice(0, 90);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : null;

    const filePath = path.join(process.cwd(), "data", "customer_offers.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { ok: false, error: "ملف customer_offers.json غير موجود داخل data" },
        { status: 404 }
      );
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const allProducts = JSON.parse(raw);

    let products = allProducts
      .filter((p: any) => p.status === "approved")
      .filter((p: any) => String(p.country || "sa") === "sa")
      .filter((p: any) => p.product_name)
      .filter((p: any) => p.product_url);

    if (limit && Number.isFinite(limit) && limit > 0) {
      products = products.slice(0, limit);
    }

    const headers = [
      "Campaign",
      "Ad group",
      "Keyword",
      "Match type",
      "Final URL",
      "Headline 1",
      "Headline 2",
      "Headline 3",
      "Description 1",
      "Description 2",
      "Status",
    ];

    const rows: string[][] = [];

    for (const product of products) {
      const name = cleanText(product.product_name, 80);
      const finalUrl = makeFinalUrl(product);

      const campaign = "BPS Products Saudi";
      const adGroup = name.slice(0, 60);

      const headline1 = makeHeadline1(product);
      const headline2 = makeHeadline2(product);
      const headline3 = makeHeadline3(product);

      const description1 = makeDescription1(product);
      const description2 = makeDescription2(product);

      for (const keyword of makeKeywords(name)) {
        rows.push([
          campaign,
          adGroup,
          keyword,
          keyword.startsWith("[")
            ? "Exact"
            : keyword.startsWith('"')
            ? "Phrase"
            : "Broad",
          finalUrl,
          headline1,
          headline2,
          headline3,
          description1,
          description2,
          "Enabled",
        ]);
      }
    }

    const csv = [
      headers.map(csvEscape).join(","),
      ...rows.map((row) => row.map(csvEscape).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bps-google-ads-sa.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}