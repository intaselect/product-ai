import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function checkSecret(req: Request) {
  return req.headers.get("x-desktop-secret") === process.env.DESKTOP_CHECKER_SECRET;
}

export async function GET(req: Request) {
  if (!checkSecret(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") || 10), 5000);
  const country = url.searchParams.get("country") || "sa";

  const { data, error } = await supabase
    .from("customer_offers")
    .select("id, product_name, product_url, store_name, country, price")
    .eq("status", "approved")
    .eq("country", country)
    .not("product_url", "is", null)
    .order("desktop_checked_at", { ascending: true, nullsFirst: true })
    .limit(limit);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, jobs: data || [] });
}