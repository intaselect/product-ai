import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function checkAdmin(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  return secret && secret === process.env.CUSTOMER_OFFERS_ADMIN_SECRET;
}
function cleanText(value: any) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function pickMeta(html: string, key: string) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${key}["']`, "i"),
  ];

  for (const p of patterns) {
    const match = html.match(p);
    if (match?.[1]) {
      return cleanText(
        match[1]
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&#x27;/g, "'")
      );
    }
  }

  return "";
}

async function fetchProductDetails(productUrl: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(productUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("fetch failed");

    const html = await res.text();

    const description =
      pickMeta(html, "og:description") ||
      pickMeta(html, "description") ||
      pickMeta(html, "twitter:description");

    const image = pickMeta(html, "og:image");

    return {
      description: cleanText(description).slice(0, 2500),
      features: description
        ? cleanText(description)
          .split(/[،,.]/)
          .map((x) => cleanText(x))
          .filter((x) => x.length > 15)
          .slice(0, 10)
        : [],
      gallery_images: image ? [image] : [],
      specifications: {},
      source_brand: "",
    };
  } catch {
    clearTimeout(timeout);
    return {
      description: "",
      features: [],
      gallery_images: [],
      specifications: {},
      source_brand: "",
    };
  }
}
function decodeHtmlText(value: string) {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(html: string) {
  return decodeHtmlText(String(html || ""))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeSignal(value: any) {
  return String(value || "").toLowerCase().replace(/[\s_\-]/g, "");
}

function classifyAvailabilitySignal(value: any) {
  const v = normalizeSignal(value);

  if (
    v.includes("outofstock") ||
    v.includes("soldout") ||
    v.includes("discontinued") ||
    v.includes("unavailable") ||
    v.includes("notavailable")
  ) {
    return "out_of_stock";
  }

  if (
    v.includes("instock") ||
    v.includes("limitedavailability") ||
    v.includes("preorder") ||
    v.includes("presale")
  ) {
    return "in_stock";
  }

  return "unknown";
}

function extractJsonLdBlocks(html: string) {
  const blocks: string[] = [];
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match;
  while ((match = re.exec(html)) !== null) {
    if (match[1]) blocks.push(decodeHtmlText(match[1]).trim());
  }

  return blocks;
}

function safeJsonParse(input: string) {
  try {
    return JSON.parse(input);
  } catch {
    try {
      return JSON.parse(input.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]"));
    } catch {
      return null;
    }
  }
}

function deepFindKeys(input: any, keys: string[]) {
  const found: string[] = [];
  const wanted = keys.map((k) => k.toLowerCase());

  function walk(value: any) {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    if (typeof value === "object") {
      for (const [key, val] of Object.entries(value)) {
        if (wanted.includes(String(key).toLowerCase())) {
          found.push(String(val || ""));
        }
        walk(val);
      }
    }
  }

  walk(input);
  return found;
}
type StockResult = {
  availability: "in_stock" | "out_of_stock" | "unknown";
  note: string;
};

function hasAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w.toLowerCase()));
}

function detectAvailabilityFromHtml(html: string, finalUrl = ""): StockResult {
  const raw = decodeHtmlText(html || "");
  const lower = raw.toLowerCase();
  const text = stripHtml(raw);
  const url = finalUrl.toLowerCase();

  if (
    hasAny(text, [
      "page not found",
      "product not found",
      "404",
      "410",
      "هذه الصفحة غير موجودة",
      "صفحة غير موجودة",
      "المنتج غير موجود",
      "لم يتم العثور على المنتج",
      "عذراً الصفحة غير موجودة",
      "عذرا الصفحة غير موجودة",
    ])
  ) {
    return { availability: "out_of_stock", note: "Product page not found / 404" };
  }

  if (
    hasAny(text, [
      "access denied",
      "captcha",
      "robot check",
      "verify you are human",
      "blocked",
      "تم حظر",
    ])
  ) {
    return { availability: "unknown", note: "Blocked / Captcha page" };
  }

  let score = 0;
  const notes: string[] = [];

  function add(points: number, note: string) {
    score += points;
    notes.push(`${points > 0 ? "+" : ""}${points} ${note}`);
  }

  const hardOutWords = [
    "out of stock",
    "sold out",
    "currently unavailable",
    "temporarily unavailable",
    "not available",
    "unavailable",
    "discontinued",
    "notify me when available",
    "notify when available",
    "add to wishlist",
    "add to list",
    "نفد المخزون",
    "نفدت الكمية",
    "غير متوفر حالياً",
    "غير متوفر حاليا",
    "حاليا غير متوفر",
    "حالياً غير متوفر",
    "غير متوفر",
    "غير متاح",
    "هذا المنتج غير متوفر",
    "المنتج غير متوفر",
    "لا يتوفر هذا المنتج",
    "لا نعرف متى أو فيما إذا كان هذا المنتج سيتوفر مرة أخرى",
    "لا نعرف متى سيتوفر",
    "أعلمني عند التوفر",
    "اعلمني عند التوفر",
    "نبهني عند التوفر",
  ];

 const strongInWords = [
  "add to cart",
  "add to basket",
  "buy now",
  "checkout now",
  "place order",
  "confirm order",
  "complete order",
  "submit order",
  "order now",
  "purchase now",
  "proceed to checkout",
  "cash on delivery",
  "in stock",
  "available in stock",
  "available now",
  "ready to ship",
  "ships today",
  "free delivery",
  "express delivery",
  "delivery tomorrow",
  "quantity",
  "qty",
  "sold by",
  "fulfilled by",
  "prime",
  "أضف إلى السلة",
  "اضف إلى السلة",
  "أضف للسلة",
  "اضف للسلة",
  "إضافة إلى عربة التسوق",
  "أضف إلى عربة التسوق",
  "اشتر الآن",
  "شراء الآن",
  "اطلب الآن",
  "اطلب الان",
  "الطلب الآن",
  "الطلب الان",
  "تأكيد الطلب",
  "تاكيد الطلب",
  "إنهاء الطلب",
  "انهاء الطلب",
  "إتمام الطلب",
  "اتمام الطلب",
  "إكمال الطلب",
  "اكمال الطلب",
  "تثبيت الطلب",
  "إرسال الطلب",
  "ارسل الطلب",
  "الدفع عند الاستلام",
  "ادفع عند الاستلام",
  "متوفر",
  "متاح",
  "الكمية",
  "توصيل مجاني",
  "شحن مجاني",
  "يصلك",
  "استلمه",
  "التوصيل",
  "تبقى",
  "يشحن من",
  "الشحن من",
  "يباع من",
  "جاهز للشحن",
];

 const buyButtonSignals = [
  "add-to-cart-button",
  "buy-now-button",
  "submit.add-to-cart",
  "addtocart",
  "buy-now",
  "btn-cart",
  "cart-button",
  "add_to_cart",
  "checkout",
  "place-order",
  "place_order",
  "confirm-order",
  "confirm_order",
  "complete-order",
  "complete_order",
  "submit-order",
  "submit_order",
  "order-now",
  "order_now",
];

  if (buyButtonSignals.some((x) => lower.includes(x))) {
    add(14, "HTML buy/add-to-cart button");
  }
  const checkoutSignals = [
  "تأكيد الطلب",
  "تاكيد الطلب",
  "إنهاء الطلب",
  "انهاء الطلب",
  "إتمام الطلب",
  "اتمام الطلب",
  "إكمال الطلب",
  "اكمال الطلب",
  "تثبيت الطلب",
  "إرسال الطلب",
  "ارسل الطلب",
  "اطلب الآن",
  "اطلب الان",
  "الطلب الآن",
  "الطلب الان",
  "ملخص الطلب",
  "سعر المنتجات",
  "سعر الشحن",
  "المستحق للدفع",
  "طريقة الدفع",
  "ادفع عند الاستلام",
  "الدفع عند الاستلام",
  "العنوان",
  "الاسم",
  "رقم الجوال",
  "رقم الهاتف",
  "المحافظة",
  "الشارع",
  "الشقة",
  "shipping address",
  "billing address",
  "order summary",
  "confirm order",
  "place order",
  "complete order",
  "submit order",
  "order now",
  "checkout",
  "cash on delivery",
  "cod",
];

const checkoutScore = checkoutSignals.filter((x) =>
  text.includes(x.toLowerCase())
).length;

if (checkoutScore >= 4) {
  add(24, `Checkout/order form detected: ${checkoutScore} signals`);
}

  if (hasAny(text, hardOutWords)) {
    add(-25, "Visible out-of-stock text");
  }

  if (
    hasAny(text, [
      "أضف إلى القائمة",
      "اضف إلى القائمة",
      "add to list",
      "wishlist",
    ]) &&
    !hasAny(text, ["add to cart", "buy now", "اشتر الآن", "أضف للسلة", "أضف إلى السلة"])
  ) {
    add(-12, "Wishlist/list only without buy button");
  }

  if (hasAny(text, strongInWords)) {
    add(12, "Visible purchase/stock/delivery signal");
  }

  if (
    hasAny(text, [
      "توصيل مجاني",
      "يصلك",
      "استلمه",
      "delivery",
      "free delivery",
      "ships",
      "ready to ship",
    ])
  ) {
    add(8, "Delivery signal");
  }

  if (hasAny(text, ["الكمية", "quantity", "qty"])) {
    add(8, "Quantity selector");
  }

  if (hasAny(text, ["اشتر الآن", "buy now", "أضف للسلة", "أضف إلى السلة", "add to cart"])) {
    add(10, "Buy button text");
  }

  const hasPrice =
    /itemprop=["']price["']/i.test(raw) ||
    /"price"\s*:\s*"?[0-9]/i.test(raw) ||
    /property=["']product:price:amount["']/i.test(raw) ||
    /(?:sar|egp|aed|kwd|qar|bhd|ريال|جنيه|درهم|دينار)\s*[0-9]/i.test(text) ||
    /[0-9]+\s*(?:sar|egp|aed|kwd|qar|bhd|ريال|جنيه|درهم|دينار)/i.test(text);

  if (hasPrice) {
    add(4, "Price found");
  }

  for (const block of extractJsonLdBlocks(raw)) {
    const parsed = safeJsonParse(block);
    if (!parsed) continue;

    const values = deepFindKeys(parsed, ["availability", "itemAvailability"]);
    for (const value of values) {
      const detected = classifyAvailabilitySignal(value);

      if (detected === "in_stock") add(8, `JSON-LD in stock: ${value}`);
      if (detected === "out_of_stock") add(-10, `JSON-LD out of stock: ${value}`);
    }
  }

  const scriptAvailabilityPatterns = [
    /"availability"\s*:\s*"([^"]+)"/i,
    /"stockStatus"\s*:\s*"([^"]+)"/i,
    /"stock_status"\s*:\s*"([^"]+)"/i,
    /"isInStock"\s*:\s*(true|false)/i,
    /"inStock"\s*:\s*(true|false)/i,
    /"available"\s*:\s*(true|false)/i,
  ];

  for (const pattern of scriptAvailabilityPatterns) {
    const match = lower.match(pattern);
    const value = match?.[1];

    if (value === "true") add(8, `Script in stock: ${match?.[0]}`);
    if (value === "false") add(-10, `Script out of stock: ${match?.[0]}`);

    const detected = classifyAvailabilitySignal(value);
    if (detected === "in_stock") add(8, `Script availability in stock: ${value}`);
    if (detected === "out_of_stock") add(-10, `Script availability out of stock: ${value}`);
  }

  if (url.includes("amazon.")) {
    if (
      hasAny(text, [
        "غير متوفر حالياً",
        "غير متوفر حاليا",
        "لا نعرف متى أو فيما إذا كان هذا المنتج سيتوفر مرة أخرى",
        "currently unavailable",
      ])
    ) {
      add(-30, "Amazon clear unavailable message");
    }

    if (
      hasAny(text, ["اشتر الآن", "أضف إلى عربة التسوق", "الكمية", "توصيل مجاني", "متوفر"]) ||
      buyButtonSignals.some((x) => lower.includes(x))
    ) {
      add(18, "Amazon strong buy box signal");
    }
  }

  if (score >= 10) {
    return {
      availability: "in_stock",
      note: `Score ${score}: ${notes.slice(0, 6).join(" | ")}`,
    };
  }

  if (score <= -15) {
    return {
      availability: "out_of_stock",
      note: `Score ${score}: ${notes.slice(0, 6).join(" | ")}`,
    };
  }

  return {
    availability: "unknown",
    note: `Score ${score}: ${notes.slice(0, 6).join(" | ") || "No clear stock signal"}`,
  };
}
async function checkOneProductStock(productUrl: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(productUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; BPSChatMerchantChecker/1.0; +https://www.bpschat.com)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ar-SA,ar;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
      },
    });

    clearTimeout(timeout);

    if ([404, 410].includes(res.status)) {
      return {
        availability: "out_of_stock" as const,
        note: `HTTP ${res.status} product removed`,
      };
    }

    if ([401, 403, 429, 503].includes(res.status)) {
      return {
        availability: "unknown" as const,
        note: `HTTP ${res.status} blocked or rate limited`,
      };
    }

    if (!res.ok) {
      return {
        availability: "unknown" as const,
        note: `HTTP ${res.status}`,
      };
    }

    const html = await res.text();
    return detectAvailabilityFromHtml(html, res.url);
  } catch (err: any) {
    clearTimeout(timeout);

    return {
      availability: "unknown" as const,
      note: err?.name === "AbortError" ? "Timeout" : "Fetch failed",
    };
  }
}
export async function GET(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
  }
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  if (action === "stock_report") {
    const availability = url.searchParams.get("availability") || "all";
    const country = url.searchParams.get("country") || "all";

    let query = supabase
      .from("customer_offers")
      .select(
        "id, product_name, product_url, image_url, price, store_name, country, status, manual_review, availability, last_stock_checked_at, stock_check_note"
      )
      .eq("status", "approved")
      .order("last_stock_checked_at", { ascending: false, nullsFirst: false })
      .limit(500);

    if (availability !== "all") {
      query = query.eq("availability", availability);
    }
    if (country !== "all") {
  query = query.eq("country", country);
}

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

  let totalQuery = supabase
  .from("customer_offers")
  .select("*", { count: "exact", head: true })
  .eq("status", "approved");

let inStockQuery = supabase
  .from("customer_offers")
  .select("*", { count: "exact", head: true })
  .eq("status", "approved")
  .eq("availability", "in_stock");

let outOfStockQuery = supabase
  .from("customer_offers")
  .select("*", { count: "exact", head: true })
  .eq("status", "approved")
  .eq("availability", "out_of_stock");

let unknownQuery = supabase
  .from("customer_offers")
  .select("*", { count: "exact", head: true })
  .eq("status", "approved")
  .eq("availability", "unknown");

if (country !== "all") {
  totalQuery = totalQuery.eq("country", country);
  inStockQuery = inStockQuery.eq("country", country);
  outOfStockQuery = outOfStockQuery.eq("country", country);
  unknownQuery = unknownQuery.eq("country", country);
}

const { count: total } = await totalQuery;
const { count: inStock } = await inStockQuery;
const { count: outOfStock } = await outOfStockQuery;
const { count: unknown } = await unknownQuery;

    return NextResponse.json({
      ok: true,
      stats: {
        total: total || 0,
        inStock: inStock || 0,
        outOfStock: outOfStock || 0,
        unknown: unknown || 0,
      },
      offers: data || [],
    });
  }

  const { data: offers, error: offersError } = await supabase
    .from("customer_offers")
    .select("*")
    .order("created_at", { ascending: false });

  if (offersError) {
    return NextResponse.json(
      { ok: false, error: offersError.message },
      { status: 500 }
    );
  }

  const { data: limits, error: limitsError } = await supabase
    .from("customer_offer_limits")
    .select("*")
    .order("updated_at", { ascending: false });

  if (limitsError) {
    return NextResponse.json(
      { ok: false, error: limitsError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    offers: offers || [],
    limits: limits || [],
  });
}
async function generateAiProductDetails(offer: any) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY غير موجود");
  }

  const countryName =
    offer.country === "sa" ? "السعودية" :
      offer.country === "eg" ? "مصر" :
        offer.country === "ae" ? "الإمارات" :
          offer.country === "kw" ? "الكويت" :
            offer.country === "qa" ? "قطر" :
              offer.country === "bh" ? "البحرين" :
                "السوق العربي";

  const storesText =
    offer.country === "eg"
      ? "Amazon Egypt و Noon Egypt و Jumia و B.TECH و Carrefour"
      : offer.country === "sa"
        ? "Amazon السعودية و Noon و Jarir و Extra و Carrefour"
        : "Amazon و Noon و Jarir و Extra و Carrefour و AliExpress";

  const prompt = `
أنت مساعد SEO لموقع BPS Chat.

اكتب تحسينًا ذكيًا وآمنًا لصفحة منتج.

بيانات المنتج:
اسم المنتج: ${offer.product_name}
السعر: ${offer.price}
الدولة: ${countryName}
المتجر: ${offer.store_name || "متجر خارجي"}
الوصف الأصلي: ${offer.description || "لا يوجد وصف كافٍ"}

القواعد:
- اكتب وصفًا عربيًا أصليًا من 120 إلى 180 كلمة.
- اجعل الكلام خاصًا بالمنتج والدولة: ${countryName}.
- استخدم كلمات مفتاحية مناسبة للدولة مثل: سعر، عروض، شراء أونلاين، مقارنة أسعار، أفضل سعر في ${countryName}.
- اربط BPS Chat طبيعيًا بالبحث ومقارنة الأسعار بين المتاجر الكبرى مثل ${storesText}.
- لا تكرر اسم المنتج أكثر من 4 مرات.
- لا تقل إن BPS Chat يبيع المنتج.
- لا تخترع مواصفات تقنية غير مؤكدة.
- لا تستخدم حشو كلمات مفتاحية.
- لا تنسخ من أي موقع.
- اكتب 5 إلى 7 مميزات مفيدة.
- اكتب keywords مناسبة للدولة والمنتج.
- استخدم فقط المعلومات الموجودة في اسم المنتج والوصف الأصلي.
- لا تخترع مواصفات أو أرقام أو أحجام أو سعات غير موجودة.
- إذا لم تكن المعلومة مؤكدة لا تذكرها.
- اكتب نصاً إرشادياً يساعد المستخدم على اتخاذ قرار الشراء.

أرجع JSON صالح فقط بدون markdown وبدون شرح وبدون أي نص خارج JSON:
{
  "description": "دليل شراء عربي مختصر وآمن من 80 إلى 120 كلمة بدون أرقام أو مواصفات غير مؤكدة",
  "features": ["ميزة آمنة", "ميزة آمنة", "ميزة آمنة"],
  "keywords": ["كلمة مفتاحية مناسبة للدولة", "كلمة مفتاحية مناسبة للمنتج"]
}
`;

  const models = [
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-pro-latest",
  ];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.25,
              maxOutputTokens: 700,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data?.error?.message || `Gemini failed with status ${res.status}`
        );
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      console.log("GEMINI RAW RESPONSE:");
      console.log(text);

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsed: any;

      try {
        parsed = JSON.parse(cleaned);
      } catch {
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
          throw new Error("Gemini رجّع نص غير صالح وليس JSON");
        }

        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch {
          throw new Error("Gemini رجّع JSON غير مكتمل، جرّب المنتج مرة أخرى");
        }
      }

      return {
        description: cleanText(parsed.description).slice(0, 1600),

        features: Array.isArray(parsed.features)
          ? parsed.features
            .map((x: any) => cleanText(x))
            .filter(Boolean)
            .slice(0, 7)
          : [],

        keywords: Array.isArray(parsed.keywords)
          ? parsed.keywords
            .map((x: any) => cleanText(x))
            .filter(Boolean)
            .slice(0, 12)
          : [],
      };
    } catch (err: any) {
      console.error("Gemini model failed:", model, err?.message);
      continue;
    }
  }

  throw new Error("فشل توليد بيانات المنتج بالذكاء الاصطناعي");
}
export async function PATCH(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  if (body.action === "bulk_update_stock_status_by_store") {
    const storeName = String(body.store_name || "").trim();
    const availability = String(body.availability || "");
    const status = String(body.status || "");

    if (!storeName || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "بيانات غير صحيحة" },
        { status: 400 }
      );
    }

    let query = supabase
      .from("customer_offers")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("store_name", storeName);

    if (availability !== "all") {
      query = query.eq("availability", availability);
    }

    const { data, error } = await query.select("id");

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      updated: data?.length || 0,
    });
  }
  if (body.action === "bulk_update_stock_status") {
    const availability = String(body.availability || "");
    const status = String(body.status || "");

    if (
      !["in_stock", "out_of_stock", "unknown"].includes(availability) ||
      !["approved", "rejected", "pending"].includes(status)
    ) {
      return NextResponse.json(
        { ok: false, error: "بيانات غير صحيحة" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("customer_offers")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("availability", availability)
      .select("id");

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      updated: data?.length || 0,
    });
  }

  if (body.action === "check_stock_google_like_bulk") {
    const limit = Math.min(Number(body.limit || 250), 250);

    const { data: offers, error: offersError } = await supabase
      .from("customer_offers")
      .select("id, product_url")
      .eq("status", "approved")
      .not("product_url", "is", null)
      .is("last_stock_checked_at", null)
      .limit(limit);

    if (offersError) {
      return NextResponse.json(
        { ok: false, error: offersError.message },
        { status: 500 }
      );
    }

    const results: any[] = [];

    for (const offer of offers || []) {
      const checked = await checkOneProductStock(offer.product_url);

      const updateData: any = {
        availability: checked.availability,
        last_stock_checked_at: new Date().toISOString(),
        stock_check_note: checked.note,
        updated_at: new Date().toISOString(),
      };

      if (checked.availability === "out_of_stock") {
        updateData.status = "rejected";
        updateData.is_ad = false;
        updateData.side_ad = false;
        updateData.best_offer = false;
      }

      const { error } = await supabase
        .from("customer_offers")
        .update(updateData)
        .eq("id", offer.id);

      results.push({
        id: offer.id,
        availability: checked.availability,
        note: checked.note,
        rejected: checked.availability === "out_of_stock",
        ok: !error,
        error: error?.message || null,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return NextResponse.json({
      ok: true,
      total: results.length,
      inStock: results.filter((x) => x.availability === "in_stock").length,
      outOfStock: results.filter((x) => x.availability === "out_of_stock").length,
      unknown: results.filter((x) => x.availability === "unknown").length,
      rejected: results.filter((x) => x.rejected).length,
      results,
    });
  }

  if (body.action === "fetch_product_details") {
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "رقم المنتج غير صحيح" },
        { status: 400 }
      );
    }

    const { data: offer, error: offerError } = await supabase
      .from("customer_offers")
      .select("id, product_url")
      .eq("id", id)
      .maybeSingle();

    if (offerError || !offer) {
      return NextResponse.json(
        { ok: false, error: "المنتج غير موجود" },
        { status: 404 }
      );
    }

    const details = await fetchProductDetails(offer.product_url);

    const { error } = await supabase
      .from("customer_offers")
      .update({
        description: details.description || null,
        features: details.features || [],
        gallery_images: details.gallery_images || [],
        specifications: details.specifications || {},
        source_brand: details.source_brand || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      details,
      message: details.description
        ? "تم جلب الوصف وتحديث المنتج"
        : "تمت المحاولة لكن لم يتم العثور على وصف",
    });
  }
  if (body.action === "toggle_ad") {
    const id = Number(body.id);
    const is_ad = Boolean(body.is_ad);

    const { error } = await supabase
      .from("customer_offers")
      .update({
        is_ad,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }
  if (body.action === "toggle_side_ad") {
    const id = Number(body.id);
    const side_ad = Boolean(body.side_ad);

    const { error } = await supabase
      .from("customer_offers")
      .update({
        side_ad,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }
  if (body.action === "toggle_best_offer") {
    const id = Number(body.id);
    const best_offer = Boolean(body.best_offer);

    const { error } = await supabase
      .from("customer_offers")
      .update({
        best_offer,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
    });
  }

  // ✅ تحديث حالة العرض: approved / rejected / pending
  if (body.action === "update_offer_status") {
    const id = Number(body.id);
    const status = String(body.status || "");

    if (!id || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "بيانات غير صحيحة" },
        { status: 400 }
      );
    }

    const availability =
  status === "approved"
    ? "in_stock"
    : status === "rejected"
      ? "out_of_stock"
      : "unknown";

const { error } = await supabase
  .from("customer_offers")
  .update({
    status,
    availability,
    manual_review: true,
    stock_check_note:
      status === "approved"
        ? "Manual admin approval: marked in stock"
        : status === "rejected"
          ? "Manual admin rejection: marked out of stock"
          : "Manual admin review: marked unknown",
    last_stock_checked_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  // ✅ تحديث عدد العروض المسموح بها للعميل
  if (body.action === "update_user_limit") {
    const user_id = String(body.user_id || "");
    const email = String(body.email || "");
    const max_offers = Number(body.max_offers);

    if (!user_id || !email || !Number.isFinite(max_offers) || max_offers < 0) {
      return NextResponse.json(
        { ok: false, error: "بيانات limit غير صحيحة" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("customer_offer_limits")
      .upsert(
        {
          user_id,
          email,
          max_offers,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }
  if (body.action === "generate_ai_product_details_bulk") {

    const limit = Math.min(Number(body.limit || 25), 50);



    const { data: offers, error: offersError } = await supabase

      .from("customer_offers")

      .select("*")

      .eq("status", "approved")

      .or("ai_description.is.null,ai_description.eq.")

      .order("created_at", { ascending: false })

      .limit(limit);



    if (offersError) {

      return NextResponse.json({ ok: false, error: offersError.message }, { status: 500 });

    }



    const results: any[] = [];



    for (const offer of offers || []) {

      try {

        const details = await generateAiProductDetails(offer);



        const { error } = await supabase

          .from("customer_offers")

          .update({

            ai_description: details.description,

            ai_features: details.features,

            ai_keywords: details.keywords,

            ai_enriched_at: new Date().toISOString(),

            updated_at: new Date().toISOString(),

          })

          .eq("id", offer.id);



        if (error) throw error;



        results.push({ id: offer.id, ok: true });

      } catch (err: any) {

        results.push({

          id: offer.id,

          ok: false,

          error: err?.message || "فشل التحسين",

        });

      }



      await new Promise((resolve) => setTimeout(resolve, 5000));

    }



    return NextResponse.json({

      ok: true,

      total: results.length,

      success: results.filter((x) => x.ok).length,

      failed: results.filter((x) => !x.ok).length,

      results,

    });

  }
  if (body.action === "generate_ai_product_details") {
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "رقم المنتج غير صحيح" },
        { status: 400 }
      );
    }

    const { data: offer, error: offerError } = await supabase
      .from("customer_offers")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (offerError || !offer) {
      return NextResponse.json(
        { ok: false, error: "المنتج غير موجود" },
        { status: 404 }
      );
    }

    let details;

    try {
      details = await generateAiProductDetails(offer);
    } catch (err: any) {
      return NextResponse.json(
        {
          ok: false,
          error: err?.message || "فشل Gemini في توليد بيانات المنتج",
        },
        { status: 500 }
      );
    }

    const { error } = await supabase
      .from("customer_offers")
      .update({
        ai_description: details.description,
        ai_features: details.features,
        ai_keywords: details.keywords,
        ai_enriched_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      details,
    });
  }

  return NextResponse.json(
    { ok: false, error: "نوع العملية غير معروف" },
    { status: 400 }
  );
}