import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const AMAZON_TAG = "bpschatksa-21";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function json(data: any, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders,
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

function checkAdmin(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  return secret && secret === process.env.CUSTOMER_OFFERS_ADMIN_SECRET;
}

function calcDiscount(oldPrice: number, newPrice: number) {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) return 0;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

function toNumber(value: any) {
  const cleaned = String(value || "")
    .replace(/[^\d.,]/g, "")
    .replace(/,/g, "")
    .trim();

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function extractAsin(url: string) {
  const match =
    url.match(/\/dp\/([A-Z0-9]{10})/i) ||
    url.match(/\/gp\/product\/([A-Z0-9]{10})/i) ||
    url.match(/[?&]ASIN=([A-Z0-9]{10})/i);

  return match?.[1] || "";
}

function makeAmazonAffiliateUrl(url: string) {
  const asin = extractAsin(url);
  if (!asin) return url;
  return `https://www.amazon.sa/dp/${asin}?tag=${AMAZON_TAG}`;
}

function cleanText(v: any) {
  return String(v || "").replace(/\s+/g, " ").trim();
}

export async function POST(req: Request) {
  if (!checkAdmin(req)) {
    return json({ ok: false, error: "غير مصرح" }, 401);
  }

  let body: any = {};

  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Body JSON غير صحيح" }, 400);
  }

  const items = Array.isArray(body.items) ? body.items : [];

  if (!items.length) {
    return json({ ok: false, error: "لا توجد منتجات للاستيراد" }, 400);
  }

  const payload = items
    .map((item: any) => {
      const old_price = toNumber(item.old_price);
      const new_price = toNumber(item.new_price);
      const productUrl = cleanText(item.product_url);

      return {
        title: cleanText(item.title).slice(0, 260),
        image_url: cleanText(item.image_url),
        product_url: makeAmazonAffiliateUrl(productUrl),
        store_name: cleanText(item.store_name || "amazon"),
        country: cleanText(item.country || "sa"),
        category: Array.isArray(item.category) && item.category.length
          ? item.category
          : ["electronics"],
        old_price,
        new_price,
        discount_percent: calcDiscount(old_price, new_price),

        description: cleanText(item.description),
        features: Array.isArray(item.features) ? item.features : [],
        gallery_images: Array.isArray(item.gallery_images)
          ? item.gallery_images
          : [],
        specifications:
          item.specifications && typeof item.specifications === "object"
            ? item.specifications
            : {},
        source_brand: cleanText(item.source_brand),

        status: "approved",
        updated_at: new Date().toISOString(),
      };
    })
    .filter((item: any) => item.title && item.product_url && item.image_url);

  if (!payload.length) {
    return json(
      { ok: false, error: "كل المنتجات ناقصة اسم أو رابط أو صورة" },
      400
    );
  }

  const uniqueMap = new Map<string, any>();

  for (const item of payload) {
    const asin = extractAsin(item.product_url);
    const key = asin || item.product_url;

    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  }

  const uniquePayload = Array.from(uniqueMap.values());

  const { data, error } = await supabase
    .from("daily_deals")
    .insert(uniquePayload)
    .select("id,title,product_url");

  if (error) {
    return json({ ok: false, error: error.message }, 500);
  }

  return json({
    ok: true,
    inserted: data?.length || 0,
    skipped: items.length - uniquePayload.length,
    deals: data || [],
  });
}