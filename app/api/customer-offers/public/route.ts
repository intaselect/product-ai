import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 300;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countries = ["sa", "ae", "kw", "qa", "bh", "eg"];

export async function GET() {
  try {
    const results = await Promise.all(
      countries.map(async (country) => {
        const { data } = await supabase
          .from("customer_offers")
          .select("id, product_name, price, image_url, product_url, country, store_name, created_at, best_offer")
          .eq("status", "approved")
          .eq("country", country)
          .order("created_at", { ascending: false })
          .limit(600);

        return data || [];
      })
    );

    return NextResponse.json({ ok: true, offers: results.flat() });
  } catch {
    return NextResponse.json({ ok: false, offers: [] }, { status: 500 });
  }
}