import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
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

export async function GET() {
  const [{ data: offers }, { data: cachedProducts }] = await Promise.all([
    supabase
      .from("customer_offers")
      .select("id, product_name, country, updated_at")
      .eq("status", "approved")
      .order("updated_at", { ascending: false })
      .limit(50000),

    supabase
      .from("product_cache")
      .select("query, country, updated_at, results")
      .order("updated_at", { ascending: false })
      .limit(50000),
  ]);

  const offerUrls =
    offers?.flatMap((item: any) => {
      const name = slugify(item.product_name || "product");
      const country = item.country || "sa";
      const lastmod = item.updated_at
        ? new Date(item.updated_at).toISOString()
        : new Date().toISOString();

      return [
        `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/customer-offers/product/${name}-${country}-${item.id}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
        `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/customer-offers/card/${name}-${country}-${item.id}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`,
      ];
    }) || [];

  const productHubUrls =
    cachedProducts
      ?.filter((item: any) => {
        return (
          item?.query &&
          item?.country &&
          Array.isArray(item?.results) &&
          item.results.length > 0
        );
      })
      .map((item: any) => {
        const query = slugify(item.query || "product");
        const country = item.country || "sa";
        const lastmod = item.updated_at
          ? new Date(item.updated_at).toISOString()
          : new Date().toISOString();

        return `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/product/${query}-${country}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
      }) || [];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${offerUrls.join("")}
${productHubUrls.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}