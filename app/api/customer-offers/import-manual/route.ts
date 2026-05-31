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

function cleanCategories(value: any) {
  if (Array.isArray(value)) {
    return value.map((v) => cleanText(v)).filter(Boolean);
  }

  const single = cleanText(value || "electronics");
  return single ? [single] : ["electronics"];
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
    const user = userData.user;

    const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];

    if (!items.length) {
      return NextResponse.json(
        { ok: false, error: "لا توجد منتجات للإضافة" },
        { status: 400 }
      );
    }

    const rows = items
      .map((item: any) => {
        return {
          product_name: cleanText(item.product_name),
          price: cleanText(item.price),
          image_url: cleanText(item.image_url),
          product_url: cleanText(item.product_url),
          store_name: cleanText(item.store_name || "amazon.sa"),
          country: cleanText(item.country || "sa"),
          category: cleanCategories(item.category),
          description: cleanText(item.description || ""),
features: Array.isArray(item.features)
  ? item.features.map((v: any) => cleanText(v)).filter(Boolean).slice(0, 20)
  : [],
gallery_images: Array.isArray(item.gallery_images)
  ? item.gallery_images.map((v: any) => cleanText(v)).filter(Boolean).slice(0, 10)
  : [],
specifications:
  item.specifications && typeof item.specifications === "object"
    ? item.specifications
    : {},
source_brand: cleanText(item.source_brand || ""),
          status: "pending",
          user_id: user.id,
        };
      })
      .filter((item: any) => {
        return (
          item.product_name &&
          item.price &&
          item.image_url &&
          item.product_url
        );
      });

    if (!rows.length) {
      return NextResponse.json(
        { ok: false, error: "كل المنتجات بياناتها ناقصة" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("customer_offers").insert(rows);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      imported: rows.length,
      message: `تم رفع ${rows.length} منتج بنجاح وهو الآن قيد المراجعة`,
    });
  } catch (error) {
    console.error("IMPORT_MANUAL_ERROR:", error);

    return NextResponse.json(
      { ok: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}