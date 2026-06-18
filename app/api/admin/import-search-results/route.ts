import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchRealProducts } from "@/lib/fetchRealProducts";
import { saveSearch } from "@/lib/saveSearch";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["gospstudio2030@gmail.com"];

const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ ok: false, error: "لازم تسجل دخول" }, { status: 401 });
    }

    const { data, error } = await supabaseAuth.auth.getUser(token);
    const user = data?.user;

    if (error || !user || !ADMIN_EMAILS.includes(user.email || "")) {
      return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 403 });
    }

    const body = await req.json();
    const query = String(body.query || "").trim();
    const country = String(body.country || "sa").trim().toLowerCase();

    if (!query) {
      return NextResponse.json({ ok: false, error: "اكتب اسم المنتج" }, { status: 400 });
    }

    await saveSearch(query, country);

    const results = await fetchRealProducts(
  query,
  country,
  "admin-import" as any,
  true
);

    return NextResponse.json({
      ok: true,
      value: Array.isArray(results) ? results : [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "حدث خطأ في البحث" },
      { status: 500 }
    );
  }
}