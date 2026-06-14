import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  eg: "مصر",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
};

function cleanText(v: any) {
  return String(v || "").trim().replace(/\s+/g, " ");
}

function slugify(text: string) {
  return cleanText(text)
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function getKeywords(text: string) {
  const stopWords = new Set([
    "في", "من", "على", "عن", "مع", "الى", "إلى",
    "سعر", "اسعار", "أسعار", "عروض", "عرض", "افضل", "أفضل",
    "قطعة", "لون", "جديد", "اصلي", "أصلي",
    "for", "with", "and", "the", "price", "best", "offer", "offers",
  ]);

  return cleanText(text)
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w))
    .slice(0, 4);
}

function makeQueryFromOffer(offer: any) {
  const name = cleanText(offer.product_name);
  const words = getKeywords(name);

  if (words.length >= 2) return words.slice(0, 3).join(" ");
  return name.slice(0, 70);
}

function makeFallbackContent(query: string, country: string) {
  const countryName = countryNames[country] || "السعودية";

  return {
    title: `أفضل عروض ${query} في ${countryName} | BPS Chat عالم المنتجات`,
    meta_description: `تصفح أفضل منتجات ${query} في ${countryName} من متجر العملاء على BPS Chat، قارن الأسعار وشاهد تفاصيل المنتجات وروابط الشراء.`,
    intro: `إذا كنت تبحث عن ${query} في ${countryName}، فهذه الصفحة من BPS Chat وعالم المنتجات تجمع لك عروض ومنتجات مرتبطة من متجر العملاء. الهدف هو مساعدتك على مقارنة المنتجات، معرفة السعر، مشاهدة الصور، وفتح صفحة كل منتج قبل اتخاذ قرار الشراء.`,
    buying_tips: `قبل شراء ${query}، قارن بين أكثر من عرض داخل الصفحة، راجع السعر والمتجر والصورة والوصف، وافتح صفحة تفاصيل المنتج لمعرفة معلومات أكثر. يمكنك أيضًا متابعة عروض اليوم وصفحات المقارنة داخل BPS Chat للوصول لاختيار أفضل.`,
    faq: [
      {
        q: `ما أفضل طريقة لاختيار ${query}؟`,
        a: `قارن بين المنتجات المعروضة حسب السعر، المتجر، الصورة، والوصف ثم افتح صفحة المنتج لمراجعة التفاصيل.`,
      },
      {
        q: `هل منتجات ${query} في BPS Chat محدثة؟`,
        a: `الصفحة تعرض منتجات من متجر العملاء داخل BPS Chat حسب المنتجات المضافة والموافق عليها.`,
      },
      {
        q: `هل يمكن شراء ${query} مباشرة؟`,
        a: `يمكنك فتح صفحة المنتج أو صفحة الكارت للوصول إلى تفاصيل العرض ورابط الشراء أو التواصل.`,
      },
    ],
    internal_links: [
      {
        title: "متجر العملاء",
        url: `${SITE_URL}/customer-offers?country=${country}`,
      },
      {
        title: "عروض اليوم",
        url: `${SITE_URL}/daily-deals?country=${country}`,
      },
      {
        title: `بحث ${query}`,
        url: `${SITE_URL}/search/${slugify(query)}-${country}`,
      },
    ],
  };
}

async function generateWithGemini(query: string, country: string) {
  if (!process.env.GEMINI_API_KEY) return null;

  const countryName = countryNames[country] || "السعودية";

  const prompt = `
اكتب محتوى SEO عربي لصفحة منتجات عن: ${query}
الدولة: ${countryName}
الموقع: BPS Chat | عالم المنتجات

اكتب JSON فقط بدون Markdown:
{
  "title": "عنوان SEO أقل من 70 حرف",
  "meta_description": "وصف SEO أقل من 160 حرف",
  "intro": "مقدمة 80 إلى 120 كلمة",
  "buying_tips": "نصائح شراء 80 إلى 120 كلمة",
  "faq": [
    {"q":"سؤال","a":"إجابة"},
    {"q":"سؤال","a":"إجابة"},
    {"q":"سؤال","a":"إجابة"}
  ]
}

ممنوع ذكر أسعار وهمية.
ممنوع ادعاء أن BPS Chat يبيع مباشرة.
ركّز على مقارنة العروض والمنتجات وروابط الشراء.
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: offers, error } = await supabase
      .from("customer_offers")
      .select("id, product_name, country, category, created_at")
      .eq("status", "approved")
      .not("product_name", "is", null)
      .not("image_url", "is", null)
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;

    let created = 0;
    let skipped = 0;
    let geminiUsed = 0;
    let fallbackUsed = 0;

    const usedSlugs = new Set<string>();

    for (const offer of offers || []) {
      const country = offer.country || "sa";
      const query = makeQueryFromOffer(offer);

      if (!query || query.length < 3) {
        skipped++;
        continue;
      }

      const slug = `${slugify(query)}-${country}`;

      if (usedSlugs.has(slug)) {
        skipped++;
        continue;
      }

      usedSlugs.add(slug);

      const { data: exists } = await supabase
        .from("seo_landing_pages")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (exists) {
        skipped++;
        continue;
      }

      const fallback = makeFallbackContent(query, country);
      const gemini = await generateWithGemini(query, country);
      const content = gemini || fallback;

      const { error: insertError } = await supabase
        .from("seo_landing_pages")
        .insert({
          query,
          country,
          slug,
          title: content.title || fallback.title,
          meta_description: content.meta_description || fallback.meta_description,
          intro: content.intro || fallback.intro,
          buying_tips: content.buying_tips || fallback.buying_tips,
          faq: content.faq || fallback.faq,
          internal_links: fallback.internal_links,
          source: "customer_offers",
          status: "published",
          gemini_status: gemini ? "success" : "fallback",
        });

      if (insertError) {
        skipped++;
        continue;
      }

      if (gemini) geminiUsed++;
      else fallbackUsed++;

      created++;

      if (created >= 100) break;
    }

    return NextResponse.json({
      success: true,
      checked: offers?.length || 0,
      created,
      skipped,
      geminiUsed,
      fallbackUsed,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}