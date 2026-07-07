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

  if (id) return `https://bpschat.com/customer-offers/product/${id}-${slug}`;

  return `https://bpschat.com/search/${slug}-sa`;
}

function makeKeywords(name: string) {
  const n = cleanText(name, 80);

  return [
    { keyword: `[${n}]`, matchType: "Exact" },
    { keyword: `"${n}"`, matchType: "Phrase" },
    { keyword: n, matchType: "Broad" },
    { keyword: `سعر ${n}`, matchType: "Phrase" },
    { keyword: `شراء ${n}`, matchType: "Phrase" },
    { keyword: `${n} السعودية`, matchType: "Phrase" },
    { keyword: `${n} سعر السعودية`, matchType: "Phrase" },
    { keyword: `${n} امازون`, matchType: "Phrase" },
    { keyword: `${n} نون`, matchType: "Phrase" },
  ];
}

function makePath1(product: any) {
  const category = Array.isArray(product.category)
    ? product.category[0]
    : product.category;

  return cleanText(category || "products", 15)
    .replace(/\s+/g, "-")
    .slice(0, 15);
}

function makePath2() {
  return "sa";
}

function makeHeadlines(product: any) {
  const name22 = cleanText(product.product_name, 22);
  const name18 = cleanText(product.product_name, 18);
  const price = cleanPrice(product.price);
  const store = cleanText(product.store_name, 16);

  return [
    `سعر ${name22}`.slice(0, 30),
    price ? `بسعر ${price}`.slice(0, 30) : "قارن الأسعار قبل الشراء",
    store ? `من ${store}`.slice(0, 30) : "BPS Chat",
    `قارن سعر ${name18}`.slice(0, 30),
    "عروض السعودية اليوم",
    "اعرف السعر قبل الشراء",
    "قارن بين المتاجر",
    "منتجات السعودية",
    "BPS Chat",
    "تسوق بذكاء",
    "شاهد التفاصيل الآن",
    "رابط الشراء من المتجر",
    "أفضل عروض المنتجات",
    "قارن واشتري بسهولة",
    "صفحة المنتج والسعر",
  ];
}

function makeDescriptions(product: any) {
  const price = cleanPrice(product.price);
  const store = cleanText(product.store_name, 20);

  return [
    price
      ? `شاهد سعر المنتج حوالي ${price} وقارن التفاصيل قبل الشراء.`.slice(0, 90)
      : "قارن أسعار المنتجات في السعودية واعرف التفاصيل ورابط الشراء.".slice(0, 90),

    store
      ? `انتقل من BPS Chat إلى ${store} لإتمام الشراء من المتجر.`.slice(0, 90)
      : "صفحة المنتج تعرض السعر والتفاصيل ورابط الشراء من المتجر.".slice(0, 90),

    "اعرف تفاصيل المنتج والسعر ثم انتقل للمتجر لإتمام عملية الشراء.".slice(0, 90),

    "BPS Chat يساعدك على الوصول لصفحة المنتج ومقارنة السعر قبل الشراء.".slice(0, 90),
  ];
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
      "Headline 4",
      "Headline 5",
      "Headline 6",
      "Headline 7",
      "Headline 8",
      "Headline 9",
      "Headline 10",
      "Headline 11",
      "Headline 12",
      "Headline 13",
      "Headline 14",
      "Headline 15",
      "Description 1",
      "Description 2",
      "Description 3",
      "Description 4",
      "Path 1",
      "Path 2",
      "Status",
    ];

    const rows: string[][] = [];
    const campaign = "BPS Products Saudi";

    for (const product of products) {
      const name = cleanText(product.product_name, 80);
      const adGroup = name.slice(0, 60);
      const finalUrl = makeFinalUrl(product);
      const headlines = makeHeadlines(product);
      const descriptions = makeDescriptions(product);
      const path1 = makePath1(product);
      const path2 = makePath2();

      for (const item of makeKeywords(name)) {
        rows.push([
          campaign,
          adGroup,
          item.keyword,
          item.matchType,
          finalUrl,
          ...headlines,
          ...descriptions,
          path1,
          path2,
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
        "Content-Disposition": `attachment; filename="bps-google-ads-editor-sa.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}