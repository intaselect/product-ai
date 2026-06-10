import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function xmlEscape(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
async function getAllBlogPosts() {
  const pageSize = 1000;
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("product_cache")
      .select("query, country, updated_at, results")
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
  const cacheData = await getAllBlogPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(cacheData || [])
  .filter(
    (item: any) =>
      item?.query &&
      item?.country &&
      Array.isArray(item?.results) &&
      item.results.length > 0
  )
  .map((item: any) => {
    const slug = `${slugify(item.query)}-${item.country || "sa"}`;
    const lastmod = item.updated_at
      ? new Date(item.updated_at).toISOString()
      : new Date().toISOString();

    return `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/blog/${slug}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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