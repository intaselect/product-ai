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

export async function POST(req: Request) {
  if (!checkSecret(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }

  const availability = ["in_stock", "out_of_stock", "unknown"].includes(
    String(body.desktop_availability)
  )
    ? String(body.desktop_availability)
    : "unknown";

  const { data: current, error: currentError } = await supabase
    .from("customer_offers")
    .select(`
      price,
      desktop_out_of_stock_count,
      desktop_in_stock_count
    `)
    .eq("id", id)
    .maybeSingle();

  if (currentError) {
    return NextResponse.json(
      { ok: false, error: currentError.message },
      { status: 500 }
    );
  }

  const oldPrice = String(current?.price || "").trim();
  const newPrice = String(body.desktop_price || "").trim();

  const updateData: any = {
    desktop_price: newPrice || null,
    desktop_availability: availability,
    desktop_check_status: body.desktop_check_status || "checked",
    desktop_check_note: body.desktop_check_note || null,
    desktop_checked_at: new Date().toISOString(),
    desktop_last_screenshot: body.desktop_last_screenshot || null,
    desktop_last_price_changed:
      oldPrice !== "" && newPrice !== "" && oldPrice !== newPrice,
    updated_at: new Date().toISOString(),
  };

  if (availability === "out_of_stock") {
    updateData.desktop_out_of_stock_count =
      Number(current?.desktop_out_of_stock_count || 0) + 1;

    updateData.desktop_in_stock_count = 0;
  }

  if (availability === "in_stock") {
    updateData.desktop_in_stock_count =
      Number(current?.desktop_in_stock_count || 0) + 1;

    updateData.desktop_out_of_stock_count = 0;
  }

  const { error } = await supabase
    .from("customer_offers")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}