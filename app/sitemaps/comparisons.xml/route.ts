import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const { data } = await supabase
    .from("comparisons")
    .select("slug, created_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  const urls = (data || [])
    .filter((item) => item.slug)
    .map((item) => {
      const loc = `${SITE_URL}/compare/${encodeURIComponent(item.slug)}`;
      const lastmod = item.created_at
        ? new Date(item.created_at).toISOString()
        : new Date().toISOString();

      return `
  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}