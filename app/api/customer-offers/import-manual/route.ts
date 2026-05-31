import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

function cleanText(value: any) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "لازم تسجل دخول الأول" },
        { status: 401 }
      );
    }

    const { data: userData, error: userError } =
      await supabaseAuth.auth.getUser(token);

    if (userError || !userData.user) {
      return NextResponse.json(
        { ok: false, error: "جلسة تسجيل الدخول غير صالحة" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const product_name = cleanText(body.product_name);
    const price = cleanText(body.price);
    const image_url = cleanText(body.image_url);
    const product_url = cleanText(body.product_url);
    const country = cleanText(body.country || "sa");
    const category = [cleanText(body.category || "electronics")];
    const store_name = cleanText(body.store_name || "amazon.sa");

    if (!product_name || !price || !image_url || !product_url) {
      return NextResponse.json(
        { ok: false, error: "بيانات المنتج ناقصة" },
        { status: 400 }
      );
    }

    const user = userData.user;

    const { error } = await supabaseAdmin.from("customer_offers").insert({
      product_name,
      price,
      image_url,
      image_url2: null,
      image_url3: null,
      product_url,
      store_name,
      country,
      category,
      status: "pending",
      user_id: user.id,
      email: user.email || "",
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "تم رفع المنتج بنجاح وهو الآن قيد المراجعة",
    });
  } catch (error) {
    console.error("IMPORT_MANUAL_ERROR:", error);

    return NextResponse.json(
      { ok: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}