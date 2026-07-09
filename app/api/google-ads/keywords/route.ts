import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const HEADERS = [
  "Row Type",
  "Action",
  "Keyword status",
  "Campaign ID",
  "Campaign",
  "Ad group ID",
  "Ad group",
  "Keyword",
  "Match type",
  "Max. CPC",
  "Final URL",
];

function csvEscape(value: any) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return `"${text.replace(/"/g, '""')}"`;
}

/**
 * مهم جدًا:
 * لازم تفضل نفس دالة الـ Ad Group القديمة عندك عشان تطابق
 * المجموعات الإعلانية اللي اترفعت قبل كده.
 * لا تغيرها إلا لو هتعيد رفع Ad Groups من جديد.
 */
function cleanAdGroup(value: any, max = 60) {
  return String(value || "")
    .replace(/[^\w\s\u0600-\u06FF\-+.&]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function norm(value: any) {
  return String(value || "")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ة]/g, "ه")
    .replace(/["'“”‘’[\]{}<>|\\]/g, " ")
    .replace(/[،,:؛()/_]+/g, " ")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9+\-.& ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shortKeyword(value: any, maxChars = 55, maxWords = 6) {
  let words = norm(value).split(" ").filter(Boolean).slice(0, maxWords);
  let text = words.join(" ");

  while (text.length > maxChars && words.length > 1) {
    words = words.slice(0, -1);
    text = words.join(" ");
  }

  return text.trim();
}

function makeSlug(text: any) {
  return String(text || "")
    .normalize("NFKD")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeFinalUrl(product: any) {
  return `https://www.bpschat.com/customer-offers/product/bps-chat-${makeSlug(
    product.product_name
  )}-${product.country || "sa"}-${product.id}`;
}

function detectBrands(title: string) {
  const low = norm(title).toLowerCase();
  const brands: string[] = [];

  const add = (brand: string) => {
    if (!brands.includes(brand)) brands.push(brand);
  };

  const map: Record<string, string[]> = {
    سامسونج: ["سامسونج", "Samsung"],
    جالكسي: ["جالكسي", "Galaxy"],
    جالاكسي: ["جالكسي", "Galaxy"],
    ايفون: ["ايفون", "iPhone"],
    ابل: ["ابل", "Apple"],
    شاومي: ["شاومي", "Xiaomi"],
    ريدمي: ["ريدمي", "Redmi"],
    هواوي: ["هواوي", "Huawei"],
    هونر: ["هونر", "Honor"],
    اوبو: ["اوبو", "Oppo"],
    ريلمي: ["ريلمي", "Realme"],
    نوكيا: ["نوكيا", "Nokia"],
    لينوفو: ["لينوفو", "Lenovo"],
    ديل: ["ديل", "Dell"],
    "اتش بي": ["اتش بي", "HP"],
    hp: ["اتش بي", "HP"],
    سوني: ["سوني", "Sony"],
    sony: ["سوني", "Sony"],
  };

  for (const [key, values] of Object.entries(map)) {
    if (low.includes(key.toLowerCase())) {
      values.forEach(add);
    }
  }

  return brands.slice(0, 4);
}

function extractModels(title: string) {
  const t = norm(title);
  const models: string[] = [];

  const patterns = [
    /\bS\d{1,2}\s*(?:FE|Ultra|Plus|Lite)?\b/gi,
    /\bA\d{1,2}\b/gi,
    /\bM\d{1,2}\b/gi,
    /\bNote\s*\d{1,2}\b/gi,
    /\bRedmi\s*Note\s*\d{1,2}\b/gi,
    /\b\d{1,2}\s*Pro\s*Max\b/gi,
    /\b\d{1,3}\s?W\b/gi,
    /\b\d{4,5}\s?mAh\b/gi,
    /\bPS5\b|\bPS4\b/gi,
    /\b[A-Z]{1,4}[- ]?\d{2,5}[A-Z0-9-]*\b/g,
  ];

  for (const pattern of patterns) {
    for (const match of t.matchAll(pattern)) {
      const model = shortKeyword(match[0], 35, 4);
      if (model && !models.some((x) => x.toLowerCase() === model.toLowerCase())) {
        models.push(model);
      }
    }
  }

  return models.slice(0, 4);
}

function categoryTerms(title: string) {
  const low = norm(title).toLowerCase();
  const terms: string[] = [];

  const add = (items: string[]) => {
    for (const item of items) {
      if (!terms.includes(item)) terms.push(item);
    }
  };

  if (
    ["جوال", "هاتف", "موبايل", "galaxy", "iphone", "سامسونج", "ايفون", "جالكسي", "شاومي", "ريدمي"].some((x) =>
      low.includes(x)
    )
  ) {
    add(["جوال", "هاتف", "سعر جوال", "شراء جوال"]);
  }

  if (["شاحن", "charger", "gan"].some((x) => low.includes(x))) {
    add(["شاحن سريع", "شاحن جوال", "شاحن تايب سي", "شاحن يو اس بي سي", "شراء شاحن"]);
  }

  if (["كيبل", "كابل", "cable", "تايب"].some((x) => low.includes(x))) {
    add(["كيبل شحن", "كيبل تايب سي", "كابل شحن", "كيبل ايفون"]);
  }

  if (["باور", "بنك", "power bank"].some((x) => low.includes(x))) {
    add(["باور بانك", "شاحن متنقل", "باور بانك سريع", "شراء باور بانك"]);
  }

  if (["سماعه", "سماعات", "earbuds", "headphone"].some((x) => low.includes(x))) {
    add(["سماعه بلوتوث", "سماعات لاسلكيه", "سماعات جوال", "شراء سماعه بلوتوث"]);
  }

  if (["كفر", "حافظه", "غطاء", "case"].some((x) => low.includes(x))) {
    add(["كفر جوال", "حافظه جوال", "غطاء جوال", "كفر حمايه"]);
  }

  if (["ساعه", "smart watch", "watch"].some((x) => low.includes(x))) {
    add(["ساعه ذكيه", "ساعه سمارت", "ساعه ذكيه رجالي", "شراء ساعه ذكيه"]);
  }

  if (["ماوس", "كيبورد", "لوحه مفاتيح", "gaming", "جيمنج"].some((x) => low.includes(x))) {
    add(["اكسسوارات جيمنج", "ماوس جيمنج", "كيبورد جيمنج", "ملحقات كمبيوتر"]);
  }

  if (["لابتوب", "لاب توب", "كمبيوتر"].some((x) => low.includes(x))) {
    add(["اكسسوارات لابتوب", "ملحقات كمبيوتر", "شراء اكسسوارات لابتوب"]);
  }

  if (["مطبخ", "مقلاه", "قدر", "منزلي", "منزليه"].some((x) => low.includes(x))) {
    add(["ادوات منزليه", "ادوات مطبخ", "شراء ادوات منزليه"]);
  }

  return terms.slice(0, 6);
}

function makeKeywords(title: string) {
  const base = shortKeyword(title, 55, 6);
  const brands = detectBrands(title);
  const models = extractModels(title);
  const categories = categoryTerms(title);

  const keywords: string[] = [];

  const add = (value: any) => {
    const keyword = shortKeyword(value, 55, 6);
    if (keyword && keyword.length >= 3 && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  };

  // أقوى كلمات: براند + موديل
  for (const brand of brands) {
    for (const model of models) {
      add(`${brand} ${model}`);
      add(`سعر ${brand} ${model}`);
      add(`شراء ${brand} ${model}`);
    }
  }

  // فئة + موديل
  for (const category of categories.slice(0, 3)) {
    for (const model of models.slice(0, 2)) {
      add(`${category} ${model}`);
    }
  }

  // كلمات عامة عليها بحث أعلى
  for (const category of categories) {
    add(category);
    add(`${category} السعوديه`);
    add(`شراء ${category}`);
  }

  // fallback من اسم المنتج لكن مختصر
  add(base);
  add(`سعر ${base}`);
  add(`شراء ${base}`);

  return keywords.slice(0, 10);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const campaign =
      url.searchParams.get("campaign") || "Website traffic-Search-6/7/2026";

    const campaignId =
      url.searchParams.get("campaignId") || "23999519217";

    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : null;

    const filePath = path.join(process.cwd(), "data", "customer_offers.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { ok: false, error: "customer_offers.json not found" },
        { status: 404 }
      );
    }

    const allProducts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    let products = allProducts
      .filter((p: any) => p.status === "approved")
      .filter((p: any) => String(p.country || "sa") === "sa")
      .filter((p: any) => p.product_name)
      .filter((p: any) => p.product_url);

    if (limit && Number.isFinite(limit) && limit > 0) {
      products = products.slice(0, limit);
    }

    const rows: string[][] = [];
    const seen = new Set<string>();

    for (const product of products) {
      const adGroup = cleanAdGroup(product.product_name, 60);
      const finalUrl = makeFinalUrl(product);
      const keywords = makeKeywords(product.product_name);

      if (!adGroup) continue;

      for (const keyword of keywords) {
        for (const [matchType, cpc] of [
          ["Phrase", "0.10"],
          ["Exact", "0.12"],
        ]) {
          const key = `${adGroup}__${keyword}__${matchType}`;
          if (seen.has(key)) continue;
          seen.add(key);

          rows.push([
            "Keyword",
            "Add",
            "Enabled",
            campaignId,
            campaign,
            "",
            adGroup,
            keyword,
            matchType,
            cpc,
            finalUrl,
          ]);
        }
      }
    }

    const csv = [
      HEADERS.map(csvEscape).join(","),
      ...rows.map((r) => r.map(csvEscape).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bps-keywords-sa.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}
