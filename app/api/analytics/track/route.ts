import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const visitorId = body.visitor_id || "unknown";
    const sessionId = body.session_id || "unknown";
    const eventType = body.event_type;

    if (!eventType) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent") || "";
    const referrer = req.headers.get("referer") || "";

    const country =
      req.headers.get("x-vercel-ip-country")?.toLowerCase() ||
      body.country ||
      null;

    await supabase.from("analytics_events").insert({
      visitor_id: visitorId,
      session_id: sessionId,
      event_type: eventType,
      path: body.path || null,
      query: body.query || null,
      country,
      offer_id: body.offer_id || null,
      duration_seconds: body.duration_seconds || null,
      referrer,
      user_agent: userAgent,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("analytics track error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}