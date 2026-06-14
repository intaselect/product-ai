import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://www.bpschat.com";

function xmlEscape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("seo_landing_pages")
    .select("slug,updated_at")
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(data || [])
  .map(
    (page) => `
<url>
<loc>${xmlEscape(`${SITE_URL}/collections/${page.slug}`)}</loc>
<lastmod>${new Date(
      page.updated_at || Date.now()
    ).toISOString()}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}