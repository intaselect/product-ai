import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (!id) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 1️⃣ نجيب البيانات
    const { data, error } = await supabase
      .from("customer_offers")
      .select("product_url, click_count")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2️⃣ نزود العداد (بدون ما نوقف المستخدم لو فشل)
    try {
      await supabase
        .from("customer_offers")
        .update({
          click_count: (data.click_count || 0) + 1,
        })
        .eq("id", id);
    } catch (e) {
      console.error("CLICK UPDATE ERROR:", e);
    }

    // 3️⃣ نحول المستخدم للرابط الأصلي
    return NextResponse.redirect(data.product_url);

  } catch (err) {
    console.error("CLICK ROUTE ERROR:", err);

    // fallback أخير لو حصل crash
    return NextResponse.redirect(new URL("/", req.url));
  }
}