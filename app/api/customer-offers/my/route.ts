import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "لازم تسجل دخول الأول" },
        { status: 401 }
      );
    }

    const { data: userData, error: userError } =
      await supabaseAuth.auth.getUser(token);

    if (userError || !userData.user) {
      return NextResponse.json(
        { ok: false, error: "جلسة تسجيل الدخول غير صالحة" },
        { status: 401 }
      );
    }

    const user = userData.user;
    const user_id = user.id;
    const email = user.email || "";

    const { data: maxOffersData, error: limitError } = await supabaseAdmin.rpc(
      "get_or_create_customer_offer_limit",
      {
        p_user_id: user_id,
        p_email: email,
      }
    );

    if (limitError) {
      return NextResponse.json(
        { ok: false, error: limitError.message },
        { status: 500 }
      );
    }

    const { data: offers, error: offersError } = await supabaseAdmin
      .from("customer_offers")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (offersError) {
      return NextResponse.json(
        { ok: false, error: offersError.message },
        { status: 500 }
      );
    }

    const usedOffers = offers?.length || 0;
    const maxOffers = Number(maxOffersData || 1);

    return NextResponse.json({
      ok: true,
      user: {
        id: user_id,
        email,
      },
      stats: {
        maxOffers,
        usedOffers,
        remainingOffers: Math.max(0, maxOffers - usedOffers),
      },
      offers: offers || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}