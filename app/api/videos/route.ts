import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function makeSlug(title: string, id: string) {
  return `${title || "bps-chat-video"}-${id}`
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export async function GET() {
  const { data, error } = await supabase
    .from("youtube_shorts_log")
    .select("*")
    .eq("status", "uploaded")
    .not("youtube_url", "is", null)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ ok: false, videos: [] }, { status: 500 });
  }

  const videos = (data || []).map((v: any) => ({
    ...v,
    slug: makeSlug(v.title || "bps-chat-video", v.id),
  }));

  return NextResponse.json({ ok: true, videos });
}