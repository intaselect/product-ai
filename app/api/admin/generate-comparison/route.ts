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
    .substring(0, 170)
    .trim();
}

function extractJson(text: string) {
  let clean = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const first = clean.indexOf("{");
  const last = clean.lastIndexOf("}");

  if (first !== -1 && last !== -1 && last > first) {
    clean = clean.slice(first, last + 1);
  }

  return JSON.parse(clean);
}

export async function POST(req: Request) {
  try {
    const { product1, product2 } = await req.json();

    if (!product1 || !product2) {
      return NextResponse.json(
        { ok: false, error: "يجب اختيار منتجين" },
        { status: 400 }
      );
    }

    const prompt = `
أنت خبير SEO عربي وخبير مراجعات ومقارنات منتجات.

قارن بين المنتجين التاليين:

المنتج الأول:
الاسم: ${product1.product_name}
السعر: ${product1.price}
المتجر: ${product1.store_name}
الدولة: ${product1.country}
الفئة: ${JSON.stringify(product1.category || [])}

المنتج الثاني:
الاسم: ${product2.product_name}
السعر: ${product2.price}
المتجر: ${product2.store_name}
الدولة: ${product2.country}
الفئة: ${JSON.stringify(product2.category || [])}

اكتب مقارنة عربية احترافية لموقع BPS Chat.

المطلوب:
- title: عنوان SEO قوي.
- metaDescription: وصف SEO لا يزيد عن 160 حرف.
- content: مقال HTML فقط بدون markdown.

المقال داخل content يجب أن يحتوي:
<h2>نظرة عامة</h2>
<h2>مقارنة السعر</h2>
<h2>مميزات المنتج الأول</h2>
<h2>مميزات المنتج الثاني</h2>
<h2>أوجه التشابه</h2>
<h2>أوجه الاختلاف</h2>
<h2>أيهما أفضل؟</h2>
<h2>الخلاصة</h2>

مهم جداً:
ارجع JSON صالح فقط بدون أي شرح خارجي وبدون markdown.

الشكل المطلوب بالضبط:
{
  "title": "عنوان هنا",
  "metaDescription": "وصف هنا",
  "content": "<h2>نظرة عامة</h2><p>...</p>"
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = result.text || "";

    let generated: any;

    try {
      generated = extractJson(rawText);
    } catch {
      console.error("GEMINI_RAW_RESPONSE:", rawText);

      return NextResponse.json(
        {
          ok: false,
          error: "فشل تحليل رد Gemini",
          raw: rawText.slice(0, 1000),
        },
        { status: 500 }
      );
    }

    const title =
      generated.title ||
      `مقارنة ${product1.product_name} و ${product2.product_name}`;

    const metaDescription =
      generated.metaDescription ||
      `مقارنة بين ${product1.product_name} و ${product2.product_name} من حيث السعر والمميزات وأيهما أفضل للشراء.`;

    const content =
      generated.content ||
      `<h2>مقارنة السعر</h2><p>قارن بين المنتجين من حيث السعر والمتجر والمميزات المتاحة.</p>`;

    const baseSlug = slugify(
      `${product1.product_name}-vs-${product2.product_name}`
    );

    const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabaseAdmin
      .from("comparisons")
      .insert({
        slug,
        title,
        meta_description: metaDescription,
        content,
        product1_name: product1.product_name,
        product2_name: product2.product_name,
      })
      .select()
      .single();

    if (error) {
      console.error("COMPARISON_SAVE_ERROR:", error);

      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      comparison: data,
      url: `/compare/${slug}`,
    });
  } catch (e: any) {
    console.error("GENERATE_COMPARISON_ERROR:", e);

    return NextResponse.json(
      {
        ok: false,
        error: e.message || "حدث خطأ غير متوقع",
      },
      { status: 500 }
    );
  }
}