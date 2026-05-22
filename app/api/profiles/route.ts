import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const first_name = String(body.first_name || "").trim();
    const last_name = String(body.last_name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    if (!first_name || !last_name || !phone || !email) {
      return NextResponse.json(
        { ok: false, error: "من فضلك املأ كل البيانات" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("profiles").upsert(
      {
        first_name,
        last_name,
        phone,
        email,
      },
      { onConflict: "email" }
    );

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "حدث خطأ أثناء حفظ بيانات الحساب" },
      { status: 500 }
    );
  }
}