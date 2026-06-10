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
async function getAllSearchTerms() {
  const pageSize = 1000;
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("search_terms")
      .select("slug, updated_at")
      .order("updated_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (error || !data?.length) break;

    all = [...all, ...data];

    if (data.length < pageSize) break;

    from += pageSize;
  }

  return all;
}

export async function GET() {
  const data = await getAllSearchTerms();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(data || [])
  .filter((item: any) => item?.slug)
  .map((item: any) => {
    const lastmod = item.updated_at
      ? new Date(item.updated_at).toISOString()
      : new Date().toISOString();

    return `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/search/${item.slug}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}