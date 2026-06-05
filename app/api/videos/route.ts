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
  return String(title || "")
    .trim()
    .replace(/\s+/g, " ");
}

function isInternalTitle(title: string) {
  const t = cleanTitle(title);
  return (
    !t ||
    /^store-video:/i.test(t) ||
    /^\d{4}-\d{2}-\d{2}:store:/i.test(t) ||
    /^store:/i.test(t)
  );
}

function makeSlug(title: string, id: string) {
  return `${title}-${id}`
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150);
}

export async function GET() {
  const { data, error } = await supabase
    .from("youtube_shorts_log")
    .select("*")
    .eq("status", "uploaded")
    .not("youtube_url", "is", null)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ ok: false, videos: [] }, { status: 500 });
  }

  const videos = (data || [])
    .filter((v: any) => !isInternalTitle(v.title))
    .map((v: any) => {
      const youtubeId = getYoutubeId(v.youtube_url);
      const displayTitle = cleanTitle(v.title);

      return {
        ...v,
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