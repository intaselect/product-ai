import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getYoutubeId(url: string) {
  const match = url?.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{6,})/);
  return match?.[1] || "";
}

function cleanTitle(title: string) {
  return String(title || "فيديو BPS Chat")
    .trim()
    .replace(/\s+/g, " ");
}

function makeSlug(title: string, id: string) {
  return `${title || "bps-chat-video"}-${id}`
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150);
}

export async function GET() {
  const { data, error } = await supabase
    .from("youtube_shorts_log")
    .select("*")
    .in("status", ["uploaded", "success", "published"])
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    return NextResponse.json({ ok: false, videos: [] }, { status: 500 });
  }

  const videos = (data || [])
    .filter((v: any) => v.youtube_url || v.youtube_video_id)
    .map((v: any) => {
      const youtubeUrl =
        v.youtube_url ||
        (v.youtube_video_id
          ? `https://www.youtube.com/watch?v=${v.youtube_video_id}`
          : "");

      const youtubeId = getYoutubeId(youtubeUrl) || v.youtube_video_id || "";
      const displayTitle = cleanTitle(v.title);

      return {
        ...v,
        youtube_url: youtubeUrl,
        displayTitle,
        youtubeId,
        thumbnail: youtubeId
          ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
          : "",
        slug: makeSlug(displayTitle, v.id),
      };
    });

  return NextResponse.json({ ok: true, videos });
}