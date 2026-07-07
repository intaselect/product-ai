import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function csvEscape(value: any) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return `"${text.replace(/"/g, '""')}"`;
}

function cleanProductName(name: string) {
  return String(name || "")
    .replace(/[^\p{L}\p{N}\s\-\+\.\&]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function makeSlug(text: string) {
  return encodeURIComponent(
    String(text || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
  );
}

function makeFinalUrl(product: any) {
  const id = product.id;
  const name = cleanProductName(product.product_name);
  const slug = makeSlug(name);

  if (id) {
    return `https://bpschat.com/customer-offers/product/${id}-${slug}`;
  }

  return `https://bpschat.com/search/${slug}-sa`;
}

function makeKeywords(name: string) {
  const n = cleanProductName(name);

  return [
    `[${n}]`,
    `"${n}"`,
    `${n}`,
    `سعر ${n}`,
    `شراء ${n}`,
    `${n} السعودية`,
    `${n} سعر السعودية`,
    `${n} امازون`,
    `${n} نون`,
  ];
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const country = url.searchParams.get("country") || "sa";
    const limit = Number(url.searchParams.get("limit") || 100);

    const filePath = path.join(process.cwd(), "data", "customer_offers.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { ok: false, error: "ملف customer_offers.json غير موجود داخل data" },
        { status: 404 }
      );
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const allProducts = JSON.parse(raw);

    const products = allProducts
      .filter((p: any) => p.status === "approved")
      .filter((p: any) => String(p.country || "sa") === country)
      .filter((p: any) => p.product_name)
      .slice(0, limit);

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
      const name = cleanProductName(product.product_name);
      const finalUrl = makeFinalUrl(product);

      const campaign = country === "sa" ? "BPS Products Saudi" : `BPS Products ${country}`;
      const adGroup = name.slice(0, 60);

      const headline1 = `أفضل سعر ${name}`.slice(0, 30);
      const headline2 = "قارن الأسعار قبل الشراء";
      const headline3 = "BPS Chat";

      const description1 = `اعرف سعر ${name} وقارن بين المتاجر قبل الشراء.`.slice(0, 90);
      const description2 = "صفحة منتج واحدة تعرض السعر والتفاصيل ورابط الشراء.".slice(0, 90);

      for (const keyword of makeKeywords(name)) {
        rows.push([
          campaign,
          adGroup,
          keyword,
          keyword.startsWith("[") ? "Exact" : keyword.startsWith('"') ? "Phrase" : "Broad",
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
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bps-google-ads-${country}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}