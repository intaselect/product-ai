import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["gospstudio2030@gmail.com"];

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
      return NextResponse.json({ ok: false, error: "لازم تسجل دخول" }, { status: 401 });
    }

    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
    const user = userData?.user;

    if (userError || !user || !ADMIN_EMAILS.includes(user.email || "")) {
      return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 403 });
    }

    const body = await req.json();
    const country = cleanText(body.country || "sa");
    const category = cleanCategories(body.category || "electronics");

    const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];

    const rows = items
      .map((item: any) => ({
        product_name: cleanText(item.title || item.name || item.product_name),
        price: cleanText(item.priceText || item.price),
        image_url: cleanText(item.image || item.image_url),
        product_url: cleanText(item.url || item.link || item.product_url),
        store_name: cleanText(item.store || item.source || item.store_name || "Unknown store"),
        country,
        category,
       description: cleanText(item.description || item.snippet || item.product_description || ""),
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
source_brand: cleanText(item.source_brand || item.brand || item.store || item.source || ""),
        status: "pending",
        user_id: user.id,
      }))
      .filter((item: any) => item.product_name && item.price && item.image_url && item.product_url);

    if (!rows.length) {
      return NextResponse.json({ ok: false, error: "لا توجد منتجات صالحة للاستيراد" }, { status: 400 });
    }

    const urls = rows.map((r: any) => r.product_url);

    const { data: existing } = await supabaseAdmin
      .from("customer_offers")
      .select("product_url")
      .in("product_url", urls);

    const existingUrls = new Set((existing || []).map((x: any) => x.product_url));

    const newRows = rows.filter((r: any) => !existingUrls.has(r.product_url));

    if (!newRows.length) {
      return NextResponse.json({
        ok: true,
        imported: 0,
        skipped: rows.length,
        message: "كل المنتجات موجودة بالفعل",
      });
    }

    const { error } = await supabaseAdmin.from("customer_offers").insert(newRows);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      imported: newRows.length,
      skipped: rows.length - newRows.length,
      message: `تم استيراد ${newRows.length} منتج كـ Pending`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "حدث خطأ" },
      { status: 500 }
    );
  }
}