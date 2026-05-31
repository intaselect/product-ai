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
const items = Array.isArray(body.items) ? body.items : [];

if (!items.length) {
  return NextResponse.json(
    { ok: false, error: "لا توجد منتجات للإضافة" },
    { status: 400 }
  );
}
    const user = userData.user;

   const rows = items.map((item: any) => ({
  product_name: cleanText(item.product_name),
  price: cleanText(item.price),
  image_url: cleanText(item.image_url),
  image_url2: null,
  image_url3: null,
  product_url: cleanText(item.product_url),
  store_name: cleanText(item.store_name),
  country: cleanText(item.country),
  category: [cleanText(item.category)],
  status: "pending",
  user_id: user.id,
  email: user.email || "",
}));

const { error } = await supabaseAdmin
  .from("customer_offers")
  .insert(rows);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
     message: `تم رفع ${rows.length} منتج بنجاح`
    });
  } catch (error) {
    console.error("IMPORT_MANUAL_ERROR:", error);

    return NextResponse.json(
      { ok: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}