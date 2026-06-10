import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function POST(req: Request) {
  try {
    const { product1, product2 } = await req.json();

    if (!product1 || !product2) {
      return NextResponse.json(
        {
          ok: false,
          error: "يجب اختيار منتجين"
        },
        {
          status: 400
        }
      );
    }

    const prompt = `
أنت خبير SEO عربي وخبير مراجعات ومقارنات المنتجات.

قارن بين المنتجين التاليين:

المنتج الأول:
${JSON.stringify(product1, null, 2)}

المنتج الثاني:
${JSON.stringify(product2, null, 2)}

المطلوب:

1- إنشاء عنوان SEO احترافي قوي.
2- إنشاء Meta Description احترافي.
3- إنشاء مقال HTML احترافي طويل.

المقال يجب أن يكون:

- عربي بالكامل
- لا يقل عن 1200 كلمة
- مناسب لمحركات البحث
- طبيعي وغير مكرر
- يساعد المستخدم على اتخاذ قرار الشراء

استخدم العناوين التالية:

<h2>نظرة عامة</h2>

<h2>مقارنة السعر</h2>

<h2>مميزات المنتج الأول</h2>

<h2>مميزات المنتج الثاني</h2>

<h2>أوجه التشابه</h2>

<h2>أوجه الاختلاف</h2>

<h2>أيهما أفضل؟</h2>

<h2>الخلاصة</h2>

داخل الخلاصة اذكر أفضل استخدام لكل منتج.

مهم جداً:

- أرجع JSON فقط.
- لا تكتب markdown.
- لا تضع \`\`\`json.
- content يجب أن يحتوي HTML فقط.

الشكل المطلوب:

{
  "title": "",
  "metaDescription": "",
  "content": ""
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = result.text || "";

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let generated;

    try {
      generated = JSON.parse(clean);
    } catch (e) {
      console.error("GEMINI_JSON_PARSE_ERROR", clean);

      return NextResponse.json(
        {
          ok: false,
          error: "فشل تحليل رد Gemini"
        },
        {
          status: 500
        }
      );
    }

    const slug = slugify(
      `${product1.product_name}-vs-${product2.product_name}`
    ).substring(0, 180);

    const { data, error } = await supabaseAdmin
      .from("comparisons")
      .insert({
        slug,
        title: generated.title,
        meta_description: generated.metaDescription,
        content: generated.content,
        product1_name: product1.product_name,
        product2_name: product2.product_name,
      })
      .select()
      .single();

    if (error) {
      console.error("COMPARISON_SAVE_ERROR", error);

      return NextResponse.json(
        {
          ok: false,
          error: error.message
        },
        {
          status: 500
        }
      );
    }

    return NextResponse.json({
      ok: true,
      comparison: data,
      slug,
      url: `/compare/${slug}`
    });
  } catch (e: any) {
    console.error("GENERATE_COMPARISON_ERROR", e);

    return NextResponse.json(
      {
        ok: false,
        error: e.message || "حدث خطأ غير متوقع"
      },
      {
        status: 500
      }
    );
  }
}