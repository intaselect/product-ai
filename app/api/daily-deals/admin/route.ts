import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function checkAdmin(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  return secret && secret === process.env.CUSTOMER_OFFERS_ADMIN_SECRET;
}

function calcDiscount(oldPrice: number, newPrice: number) {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) return 0;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

export async function GET(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("daily_deals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deals: data || [] });
}

export async function POST(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();

  const old_price = Number(body.old_price || 0);
  const new_price = Number(body.new_price || 0);

  const payload = {
    title: String(body.title || "").trim(),
    image_url: String(body.image_url || "").trim(),
    product_url: String(body.product_url || "").trim(),
    store_name: String(body.store_name || "").trim(),
    country: String(body.country || "sa"),
    category: Array.isArray(body.category) ? body.category : [],
    old_price,
    new_price,
    discount_percent: calcDiscount(old_price, new_price),
    status: "approved",
    updated_at: new Date().toISOString(),
  };

  if (!payload.title || !payload.product_url || !new_price) {
    return NextResponse.json(
      { ok: false, error: "اسم العرض والرابط والسعر بعد الخصم مطلوبين" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("daily_deals")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deal: data });
}

export async function PATCH(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({ ok: false, error: "ID غير صحيح" }, { status: 400 });
  }

  const old_price = Number(body.old_price || 0);
  const new_price = Number(body.new_price || 0);

  const payload = {
    title: String(body.title || "").trim(),
    image_url: String(body.image_url || "").trim(),
    product_url: String(body.product_url || "").trim(),
    store_name: String(body.store_name || "").trim(),
    country: String(body.country || "sa"),
    category: Array.isArray(body.category) ? body.category : [],
    old_price,
    new_price,
    discount_percent: calcDiscount(old_price, new_price),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("daily_deals")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deal: data });
}

export async function DELETE(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ ok: false, error: "ID غير صحيح" }, { status: 400 });
  }

  const { error } = await supabase.from("daily_deals").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}