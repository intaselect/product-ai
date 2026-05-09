import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("search_terms")
    .select("query, country, slug, search_count")
    .order("search_count", { ascending: false })
    .limit(30);

  if (error) {
    console.error("Popular searches error:", error);
    return NextResponse.json({ searches: [] });
  }

  return NextResponse.json({ searches: data || [] });
}