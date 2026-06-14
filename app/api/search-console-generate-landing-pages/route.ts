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

function cleanQuery(q: string) {
  return String(q || "").trim().replace(/\s+/g, " ").slice(0, 120);
}

function slugify(text: string) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function detectCountry(page: string) {
  if (page.includes("-eg") || page.includes("country=eg")) return "eg";
  if (page.includes("-ae") || page.includes("country=ae")) return "ae";
  if (page.includes("-kw") || page.includes("country=kw")) return "kw";
  if (page.includes("-qa") || page.includes("country=qa")) return "qa";
  if (page.includes("-bh") || page.includes("country=bh")) return "bh";
  return "sa";
}

function makeFallbackContent(query: string, country: string) {
  const countryName = countryNames[country] || "السعودية";

  return {
    title: `أفضل عروض ${query} في ${countryName} | BPS Chat`,
    meta_description: `اكتشف أفضل عروض ${query} في ${countryName} من متجر BPS Chat، قارن المنتجات والأسعار واختر الأنسب قبل الشراء.`,
    intro: `إذا كنت تبحث عن ${query} في ${countryName}، فهذه الصفحة تجمع لك منتجات وعروض مختارة من متجر BPS Chat لمساعدتك على مقارنة الخيارات والوصول إلى أفضل سعر متاح بسهولة.`,
    buying_tips: `قبل شراء ${query}، قارن السعر النهائي، حالة المنتج، المتجر، وتفاصيل الشحن أو التواصل. اختر العرض الذي يناسب ميزانيتك وراجع أكثر من منتج قبل اتخاذ القرار.`,
    faq: [
      {
        q: `كيف أجد أفضل سعر لـ ${query}؟`,
        a: `قارن بين المنتجات المعروضة في الصفحة وافتح تفاصيل كل عرض لمعرفة السعر والمتجر ورابط الشراء.`,
      },
      {
        q: `هل المنتجات في BPS Chat محدثة؟`,
        a: `يتم عرض المنتجات والعروض المتاحة من متجر العملاء داخل BPS Chat ويتم تحديثها حسب المنتجات المضافة والموافق عليها.`,
      },
      {
        q: `هل أستطيع شراء ${query} مباشرة؟`,
        a: `يمكنك فتح رابط المنتج أو صفحة الكارت للوصول إلى تفاصيل العرض والمتجر وبدء الشراء أو التواصل.`,
      },
    ],
    internal_links: [
      {
        title: "كل عروض BPS Chat",
        url: `${SITE_URL}/customer-offers?country=${country}`,
      },
      {
        title: `بحث ${query}`,
        url: `${SITE_URL}/search/${slugify(query)}-${country}`,
      },
      {
        title: "عروض اليوم",
        url: `${SITE_URL}/daily-deals?country=${country}`,
      },
    ],
  };
}

async function generateWithGemini(query: string, country: string) {
  if (!process.env.GEMINI_API_KEY) return null;

  const countryName = countryNames[country] || "السعودية";

  const prompt = `
اكتب محتوى SEO عربي احترافي لصفحة هبوط عن: ${query}
الدولة: ${countryName}

المطلوب JSON فقط بدون Markdown:
{
  "title": "عنوان SEO أقل من 70 حرف",
  "meta_description": "وصف أقل من 160 حرف",
  "intro": "مقدمة عربية مفيدة من 80 إلى 120 كلمة",
  "buying_tips": "نص نصائح شراء من 80 إلى 120 كلمة",
  "faq": [
    {"q":"سؤال","a":"إجابة"},
    {"q":"سؤال","a":"إجابة"},
    {"q":"سؤال","a":"إجابة"}
  ]
}

مهم:
- لا تذكر أسعار وهمية.
- لا تدعي أن BPS Chat يبيع مباشرة.
- ركز على المقارنة واختيار أفضل عرض.
`;

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

  if (!res.ok) {
    console.error("Gemini failed:", await res.text());
    return null;
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
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

    const { data, error } = await supabase
      .from("search_console_queries")
      .select("query,page,clicks,impressions,ctr,position")
      .gte("impressions", 20)
      .lte("position", 40)
      .order("impressions", { ascending: false })
      .limit(100);

    if (error) throw error;

    let created = 0;
    let skipped = 0;
    let geminiUsed = 0;
    let fallbackUsed = 0;

    for (const row of data || []) {
      const query = cleanQuery(row.query);
      if (!query || query.length < 3) {
        skipped++;
        continue;
      }

      if (
        query.includes("bps") ||
        query.includes("بي بي اس") ||
        query.includes("admin") ||
        query.includes("login")
      ) {
        skipped++;
        continue;
      }

      const country = detectCountry(row.page || "");
      const slug = `${slugify(query)}-${country}`;

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
          meta_description:
            content.meta_description || fallback.meta_description,
          intro: content.intro || fallback.intro,
          buying_tips: content.buying_tips || fallback.buying_tips,
          faq: content.faq || fallback.faq,
          internal_links: fallback.internal_links,
          source: "search_console",
          status: "published",
          gemini_status: gemini ? "success" : "fallback",
        });

      if (insertError) {
        console.error("Insert landing failed:", query, insertError);
        skipped++;
        continue;
      }

      if (gemini) geminiUsed++;
      else fallbackUsed++;

      created++;
    }

    return NextResponse.json({
      success: true,
      checked: data?.length || 0,
      created,
      skipped,
      geminiUsed,
      fallbackUsed,
    });
  } catch (error: any) {
    console.error("Landing generator error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}