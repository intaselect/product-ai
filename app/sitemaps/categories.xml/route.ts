import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const countries = ["sa", "ae", "kw", "qa", "bh", "eg"];

const categories = [
  "electronics",
  "mobiles",
  "mobile_accessories",
  "smart_watch",
  "power_bank",
  "chargers",
  "headphones",
  "computers",
  "computer_accessories",
  "gaming",
  "home",
  "fashion",
  "shoes",
  "bags",
  "beauty",
  "cars",
  "kids",
  "sports",
  "cameras",
  "camera_accessories",
  "other",
];

function xmlEscape(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
const urls = [
  ...countries.flatMap((c) =>
    categories.map((cat) => `${SITE_URL}/customer-offers/${c}/${cat}`)
  ),

  ...countries.flatMap((c) =>
    categories.map((cat) => `${SITE_URL}/best/${c}/${cat}`)
  ),

  ...countries.flatMap((c) =>
    categories.map((cat) => `${SITE_URL}/bps-market/${c}/${cat}`)
  ),
];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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