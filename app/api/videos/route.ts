import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const categoryNames: Record<string, string> = {
  mobiles: "الموبايلات",
  electronics: "الإلكترونيات",
  computers: "اللابتوبات والكمبيوتر",
  beauty: "الجمال والعناية",
  fashion: "الموضة",
  home: "المنزل",
  gaming: "الألعاب والجيمينج",
  perfumes: "العطور",
  watches: "الساعات",
  phone_accessories: "إكسسوارات الموبايل",
};

function getYoutubeId(url: string) {
  const match = url?.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{6,})/);
  return match?.[1] || "";
}

function makeSlug(title: string, id: string) {
  return `${title || "bps-chat-video"}-${id}`
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150);
}

function makeNiceTitle(v: any) {
  const raw = String(v.title || "");

  const match = raw.match(/(?:\d{4}-\d{2}-\d{2}:)?store:([a-z]{2}):([a-z_]+)/i);

  if (match) {
    const country = match[1];
    const category = match[2];

    return `🔥 أفضل عروض ${categoryNames[category] || category} في ${
      countryNames[country] || country
    } | BPS Chat`;
  }

  return raw || "فيديو عروض BPS Chat";
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

  const videos = (data || []).map((v: any) => {
    const youtubeId = getYoutubeId(v.youtube_url);
    const displayTitle = makeNiceTitle(v);

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