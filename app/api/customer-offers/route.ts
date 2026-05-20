import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product_name = String(body.product_name || "").trim();
    const price = String(body.price || "").trim();
    const image_url = String(body.image_url || "").trim();
    const product_url = String(body.product_url || "").trim();
    const store_name = String(body.store_name || "").trim();
    const country = String(body.country || "sa").trim();

    if (!product_name || !price || !image_url || !product_url) {
      return NextResponse.json(
        { ok: false, error: "الاسم والسعر والصورة والرابط مطلوبين" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("customer_offers")
      .insert({
        product_name,
        price,
        image_url,
        product_url,
        store_name: store_name || null,
        country,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("CUSTOMER_OFFER_INSERT_ERROR:", error);
      return NextResponse.json(
        { ok: false, error: "حدث خطأ أثناء إضافة العرض" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: data.id,
      message: "تم إرسال العرض بنجاح وسيظهر بعد المراجعة",
    });
  } catch (error) {
    console.error("CUSTOMER_OFFER_API_ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}