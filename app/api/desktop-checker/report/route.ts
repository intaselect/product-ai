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

export async function GET(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
  }

  const url = new URL(req.url);
  const country = url.searchParams.get("country") || "all";
  const availability = url.searchParams.get("availability") || "all";
  const changed = url.searchParams.get("changed") || "all";

  let query = supabase
    .from("customer_offers")
    .select(`
      id,
      product_name,
      image_url,
      product_url,
      store_name,
      country,
      status,
      price,
      availability,
      desktop_price,
      desktop_availability,
      desktop_checked_at,
      desktop_check_note,
      desktop_check_status,
      desktop_out_of_stock_count,
      desktop_in_stock_count,
      desktop_last_screenshot,
      desktop_last_price_changed
    `)
    .not("desktop_checked_at", "is", null)
    .order("desktop_checked_at", { ascending: false })
    .limit(500);

  if (country !== "all") query = query.eq("country", country);
  if (availability !== "all") query = query.eq("desktop_availability", availability);
  if (changed === "yes") query = query.eq("desktop_last_price_changed", true);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, offers: data || [] });
}