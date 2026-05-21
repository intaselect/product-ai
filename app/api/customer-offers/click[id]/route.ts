import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await context.params;
    const id = Number(idParam);

    if (!id) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const { data, error } = await supabase
      .from("customer_offers")
      .select("product_url, click_count")
      .eq("id", id)
      .single();

    if (error || !data?.product_url) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const currentClicks = Number(data.click_count || 0);

    await supabase
      .from("customer_offers")
      .update({ click_count: currentClicks + 1 })
      .eq("id", id);

    return NextResponse.redirect(data.product_url);
  } catch (err) {
    console.error("CLICK ROUTE ERROR:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}