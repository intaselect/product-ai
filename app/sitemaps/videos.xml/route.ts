import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function xmlEscape(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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
  const { data } = await supabase
    .from("youtube_shorts_log")
    .select("id, title, created_at, youtube_url, youtube_video_id, source_type, status")
    .in("source_type", ["store_country_short", "store_promo_video"])
    .eq("status", "uploaded")
    .order("created_at", { ascending: false })
    .limit(50000);

  const urls = (data || [])
    .filter((item: any) => item?.id && item?.title && (item?.youtube_url || item?.youtube_video_id))
    .map((item: any) => {
      const slug = makeSlug(cleanTitle(item.title), item.id);
      const lastmod = item.created_at
        ? new Date(item.created_at).toISOString()
        : new Date().toISOString();

      return `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/videos/${slug}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/videos</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${urls.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}