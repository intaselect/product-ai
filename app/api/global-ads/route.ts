import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

export async function GET() {
  const { data, error } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, country, store_name")
    .eq("status", "approved")
    .eq("is_ad", true)
    .order("updated_at", { ascending: false })
    .limit(12);

  if (error) {
    return NextResponse.json([]);
  }

  const ads = (data || []).map((item: any) => ({
    ...item,
    slug: `${slugify(item.product_name)}-${item.country || "sa"}-${item.id}`,
  }));

  return NextResponse.json(ads);
}