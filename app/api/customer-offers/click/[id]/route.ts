import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isBot(userAgent: string) {
  return /Googlebot|AdsBot-Google|Mediapartners-Google|Google-InspectionTool|bingbot|Slurp|DuckDuckBot|YandexBot|facebookexternalhit|Twitterbot|crawler|spider|bot/i.test(
    userAgent || ""
  );
}

export async function GET(req: Request, context: any) {
  try {
    const params = await context.params;
    const id = Number(params?.id);

    if (!id) {
      return NextResponse.redirect(new URL("/", req.url), 302);
    }

    const userAgent = req.headers.get("user-agent") || "";

    const { data, error } = await supabase
      .from("customer_offers")
      .select("product_url, click_count")
      .eq("id", id)
      .single();

    if (error || !data?.product_url) {
      return NextResponse.redirect(new URL("/", req.url), 302);
    }

    const targetUrl = String(data.product_url || "").trim();

    if (!/^https?:\/\//i.test(targetUrl)) {
      return NextResponse.redirect(new URL("/", req.url), 302);
    }

    if (!isBot(userAgent)) {
      await supabase
        .from("customer_offers")
        .update({
          click_count: Number(data.click_count || 0) + 1,
        })
        .eq("id", id);

      try {
        await supabase.from("analytics_events").insert({
          event_type: "offer_click",
          offer_id: id,
          path: "/customer-offers",
          referrer: req.headers.get("referer") || "",
          user_agent: userAgent,
        });
      } catch {}
    }

    return NextResponse.redirect(targetUrl, 302);
  } catch (err) {
    console.error("CLICK ROUTE ERROR:", err);
    return NextResponse.redirect(new URL("/", req.url), 302);
  }
}