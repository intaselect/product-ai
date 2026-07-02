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
function stripHtml(html: string) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
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

function deepFindAvailability(input: any): string[] {
  const found: string[] = [];

  function walk(value: any) {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    if (typeof value === "object") {
      for (const [key, val] of Object.entries(value)) {
        if (String(key).toLowerCase() === "availability") {
          found.push(String(val || ""));
        }
        walk(val);
      }
    }
  }

  walk(input);
  return found;
}

function detectAvailabilityFromHtml(html: string): {
  availability: "in_stock" | "out_of_stock" | "unknown";
  note: string;
} {
  const raw = decodeHtmlText(html || "");
  const lower = raw.toLowerCase();

  for (const block of extractJsonLdBlocks(raw)) {
    try {
      const parsed = JSON.parse(block);
      const values = deepFindAvailability(parsed).join(" ").toLowerCase();

      if (
        values.includes("outofstock") ||
        values.includes("soldout") ||
        values.includes("discontinued")
      ) {
        return { availability: "out_of_stock", note: "JSON-LD OutOfStock" };
      }

      if (
        values.includes("instock") ||
        values.includes("limitedavailability") ||
        values.includes("preorder") ||
        values.includes("presale")
      ) {
        return { availability: "in_stock", note: "JSON-LD InStock" };
      }
    } catch {}
  }

  const availabilityMeta = [
    /itemprop=["']availability["'][^>]+href=["']([^"']+)["']/i,
    /itemprop=["']availability["'][^>]+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["'][^>]+itemprop=["']availability["']/i,
    /href=["']([^"']+)["'][^>]+itemprop=["']availability["']/i,
  ];

  for (const pattern of availabilityMeta) {
    const match = raw.match(pattern);
    const value = String(match?.[1] || "").toLowerCase();

    if (
      value.includes("outofstock") ||
      value.includes("soldout") ||
      value.includes("discontinued")
    ) {
      return { availability: "out_of_stock", note: "Microdata OutOfStock" };
    }

    if (
      value.includes("instock") ||
      value.includes("limitedavailability") ||
      value.includes("preorder")
    ) {
      return { availability: "in_stock", note: "Microdata InStock" };
    }
  }

  const text = stripHtml(raw);

  const outWords = [
    "out of stock",
    "currently unavailable",
    "temporarily unavailable",
    "sold out",
    "unavailable",
    "غير متوفر",
    "غير متاح",
    "نفد المخزون",
    "نفدت الكمية",
    "حاليا غير متوفر",
    "حالياً غير متوفر",
  ];

  for (const word of outWords) {
    if (text.includes(word)) {
      return { availability: "out_of_stock", note: `Text: ${word}` };
    }
  }

  const inWords = [
    "in stock",
    "available",
    "add to cart",
    "add to basket",
    "buy now",
    "متوفر",
    "أضف إلى السلة",
    "اضف إلى السلة",
    "اشتر الآن",
  ];

  for (const word of inWords) {
    if (text.includes(word)) {
      return { availability: "in_stock", note: `Text: ${word}` };
    }
  }

  return { availability: "unknown", note: "No clear availability signal" };
}

async function checkOneProductStock(productUrl: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const res = await fetch(productUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; BPSChatMerchantChecker/1.0; +https://bpschat.com)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ar,en-US;q=0.9,en;q=0.8",
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return {
        availability: "unknown" as const,
        note: `HTTP ${res.status}`,
      };
    }

    const html = await res.text();
    return detectAvailabilityFromHtml(html);
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
  if (body.action === "check_stock_google_like_bulk") {
  const limit = Math.min(Number(body.limit || 50), 100);

  const { data: offers, error: offersError } = await supabase
    .from("customer_offers")
    .select("id, product_url, status")
    .eq("status", "approved")
    .not("product_url", "is", null)
    .order("last_stock_checked_at", { ascending: true, nullsFirst: true })
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

    await new Promise((resolve) => setTimeout(resolve, 700));
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

    const { error } = await supabase
      .from("customer_offers")
      .update({
        status,
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