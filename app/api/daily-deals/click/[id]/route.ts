import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data } = await supabase
    .from("daily_deals")
    .select("product_url")
    .eq("id", Number(id))
    .single();

  if (!data?.product_url) {
    return NextResponse.redirect("https://www.bpschat.com");
  }

  return NextResponse.redirect(data.product_url);
}