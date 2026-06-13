import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const currencyCodes: Record<string, string> = {
  sa: "SAR",
  ae: "AED",
  kw: "KWD",
  qa: "QAR",
  bh: "BHD",
  eg: "EGP",
};

function xmlEscape(value: any) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function productUrl(offer: any) {
  return `${SITE_URL}/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}

function cleanPrice(price: any) {
  const n = String(price || "").replace(/[^\d.]/g, "");
  return n || "0";
}

function buildDescription(offer: any) {
  return (
    offer.description ||
    `عرض ${offer.product_name} من ${offer.store_name || "BPS Chat"} عبر BPS Chat. يتم الشراء من المتجر أو البائع صاحب العرض.`
  ).slice(0, 4800);
}

export async function GET() {
 const { data, error } = await supabase
  .from("customer_offers")
  .select(
    "id, product_name, price, image_url, product_url, store_name, country, status, description, source_brand, gallery_images, image_url_2, image_url_3, updated_at, created_at, seller_email, is_ad"
  )
  .eq("status", "approved")
  .eq("is_ad", false)
.not("seller_email", "is", null)
  .eq("is_ad", false)
  .not("seller_email", "is", null)
  .not("product_name", "is", null)
  .not("price", "is", null)
  .not("image_url", "is", null)
  .order("updated_at", { ascending: false })
  .limit(5000);

if (error) {
  return new NextResponse(`Feed error: ${error.message}`, { status: 500 });
}
  const items = (data || [])
    .filter((offer: any) => {
      const price = Number(cleanPrice(offer.price));
      return (
        offer.product_name &&
        offer.image_url &&
        offer.country &&
        currencyCodes[offer.country] &&
        price > 0
      );
    })
    .map((offer: any) => {
      const currency = currencyCodes[offer.country] || "SAR";
      const price = cleanPrice(offer.price);
      const link = productUrl(offer);

      const extraImages = [
        ...(Array.isArray(offer.gallery_images) ? offer.gallery_images : []),
        offer.image_url_2,
        offer.image_url_3,
      ].filter(Boolean);

      return `
  <item>
    <g:id>${xmlEscape(`bps-${offer.id}`)}</g:id>
    <g:title>${xmlEscape(offer.product_name)}</g:title>
    <g:description>${xmlEscape(buildDescription(offer))}</g:description>
    <g:link>${xmlEscape(link)}</g:link>
    <g:image_link>${xmlEscape(offer.image_url)}</g:image_link>
    ${extraImages
      .slice(0, 10)
      .map(
        (img: string) =>
          `<g:additional_image_link>${xmlEscape(img)}</g:additional_image_link>`
      )
      .join("\n    ")}
    <g:availability>in_stock</g:availability>
    <g:condition>new</g:condition>
    <g:price>${xmlEscape(price)} ${currency}</g:price>
    <g:brand>${xmlEscape(
      offer.source_brand || offer.store_name || "BPS Chat"
    )}</g:brand>
    <g:mpn>${xmlEscape(`bps-${offer.id}`)}</g:mpn>
    <g:identifier_exists>no</g:identifier_exists>
    <g:adult>no</g:adult>
  </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>BPS Chat Customer Offers</title>
  <link>${SITE_URL}</link>
  <description>Approved customer offers from BPS Chat marketplace</description>
${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}