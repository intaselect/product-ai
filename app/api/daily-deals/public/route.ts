import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country") || "sa";

  let { data, error } = await supabase
    .from("daily_deals")
    .select("id,title,image_url,store_name,country,old_price,new_price,discount_percent")
    .eq("status", "approved")
    .eq("country", country)
    .order("created_at", { ascending: false })
    .limit(12);

  if ((!data || data.length === 0) && ["kw", "qa", "bh"].includes(country)) {
    const fallback = await supabase
      .from("daily_deals")
      .select("id,title,image_url,store_name,country,old_price,new_price,discount_percent")
      .eq("status", "approved")
      .eq("country", "sa")
      .order("created_at", { ascending: false })
      .limit(12);

    data = fallback.data || [];
    error = fallback.error;
  }

  if ((!data || data.length === 0) && country !== "all") {
    const fallbackAll = await supabase
      .from("daily_deals")
      .select("id,title,image_url,store_name,country,old_price,new_price,discount_percent")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(12);

    data = fallbackAll.data || [];
    error = fallbackAll.error;
  }

  if (error) {
    return NextResponse.json({ deals: [] });
  }

  return NextResponse.json({ deals: data || [] });
}