import { NextResponse } from "next/server";
import { advertiserPages } from "@/app/advertisers/data";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

function xmlEscape(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy",
"/terms",
"/refund-policy",
"/shipping-policy",
    "/advertise",
    "/smart-search",
    "/seller-tools",
    "/customer-offers",
    "/compare-prices-online",
    "/best-price-online",
    "/deals",
    "/categories",
    "/brands",
    "/stores",
    "/trending",
    "/advertisers",
    "/sell-online",
  ];

  const urls = [
    ...staticPages.map((path) => `${SITE_URL}${path}`),
    ...advertiserPages.map((page) => `${SITE_URL}/advertisers/${page.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}