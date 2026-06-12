import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("daily_deals")
    .select("id,updated_at")
    .eq("status", "approved");

  const urls = (data || [])
    .map(
      (deal) => `
<url>
  <loc>https://www.bpschat.com/daily-deals/${deal.id}</loc>
  <lastmod>${new Date(
    deal.updated_at || new Date()
  ).toISOString()}</lastmod>
</url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
  <loc>https://www.bpschat.com/daily-deals</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>

${urls}

</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}