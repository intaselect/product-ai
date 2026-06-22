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

أرجع JSON فقط:
{
  "description": "وصف عربي أصلي",
  "features": ["ميزة", "ميزة"],
  "keywords": ["كلمة مفتاحية", "كلمة مفتاحية"]
}
`;

  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

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
              temperature: 0.35,
              maxOutputTokens: 900,
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

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

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
  throw new Error(err?.message || "Gemini request failed");
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