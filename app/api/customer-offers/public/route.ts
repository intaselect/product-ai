import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, country, store_name, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(60);

  if (error) {
    return NextResponse.json({ ok: false, offers: [] }, { status: 500 });
  }

  return NextResponse.json({ ok: true, offers: data || [] });
}