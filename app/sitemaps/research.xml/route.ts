import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function xmlEscape(str: string) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const { data } = await supabase
    .from("search_terms")
    .select("slug, updated_at, created_at, search_count")
    .not("slug", "is", null)
    .gte("search_count", 1)
    .order("updated_at", { ascending: false })
    .limit(50000);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(data || [])
  .filter((item: any) => item.slug)
  .map((item: any) => {
    const lastmod = item.updated_at || item.created_at || new Date().toISOString();

    return `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/research/${item.slug}`)}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${item.search_count >= 3 ? "0.8" : "0.6"}</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}