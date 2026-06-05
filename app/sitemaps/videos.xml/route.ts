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

export async function GET() {
  const { data } = await supabase
    .from("youtube_shorts_log")
    .select("slug, created_at")
    .order("created_at", { ascending: false })
    .limit(50000);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
  <loc>${SITE_URL}/videos</loc>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>

${(data || [])
  .filter((item:any) => item?.slug)
  .map((item:any) => `
<url>
  <loc>${xmlEscape(`${SITE_URL}/videos/${item.slug}`)}</loc>
  <lastmod>${new Date(
    item.created_at || Date.now()
  ).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
`)
  .join("")}

</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}