import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "لازم تسجل دخول الأول لإضافة عرض" },
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

    const user = userData.user;
    const user_id = user.id;
    const seller_email = user.email || "";

    const body = await req.json();

    const product_name = String(body.product_name || "").trim();
    const price = String(body.price || "").trim();
    const image_url = String(body.image_url || "").trim();
    const image_url_2 = String(body.image_url_2 || "").trim();
const image_url_3 = String(body.image_url_3 || "").trim();
    const product_url = String(body.product_url || "").trim();
    const store_name = String(body.store_name || "").trim();
    const country = String(body.country || "sa").trim();
    const rawCategory = body.category;

const category = Array.isArray(rawCategory)
  ? rawCategory.map((c) => String(c).trim()).filter(Boolean)
  : [String(rawCategory || "other").trim()];

    if (!product_name || !price || !image_url || !product_url) {
      return NextResponse.json(
        { ok: false, error: "الاسم والسعر والصورة والرابط مطلوبين" },
        { status: 400 }
      );
    }

    const { data: limitData, error: limitError } = await supabaseAdmin.rpc(
      "get_or_create_customer_offer_limit",
      {
        p_user_id: user_id,
        p_email: seller_email,
      }
    );

    if (limitError) {
      console.error("CUSTOMER_OFFER_LIMIT_ERROR:", limitError.message);
      return NextResponse.json(
        {
          ok: false,
          error: "حدث خطأ أثناء التحقق من عدد العروض",
          details: limitError.message,
        },
        { status: 500 }
      );
    }

    const maxOffers = Number(limitData || 1);

    const { count, error: countError } = await supabaseAdmin
      .from("customer_offers")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (countError) {
      console.error("CUSTOMER_OFFER_COUNT_ERROR:", countError.message);
      return NextResponse.json(
        {
          ok: false,
          error: "حدث خطأ أثناء حساب عروضك الحالية",
          details: countError.message,
        },
        { status: 500 }
      );
    }

    if ((count || 0) >= maxOffers) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "وصلت للحد الأقصى من العروض المتاحة لك. تواصل معنا لزيادة عدد العروض.",
        },
        { status: 403 }
      );
    }

    const { error } = await supabaseAdmin.from("customer_offers").insert({
      product_name,
      price,
      image_url,
      image_url_2: image_url_2 || null,
image_url_3: image_url_3 || null,
      product_url,
      store_name: store_name || null,
      country,
      category,
      status: "pending",
      user_id,
      seller_email,
    });

    if (error) {
      console.error("CUSTOMER_OFFER_INSERT_ERROR:", error.message);
      return NextResponse.json(
        {
          ok: false,
          error: "حدث خطأ أثناء إضافة العرض",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
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