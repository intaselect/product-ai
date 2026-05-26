import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

function extractAsin(url: string) {
  const match =
    url.match(/\/dp\/([A-Z0-9]{10})/i) ||
    url.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  return match?.[1]?.toUpperCase() || "";
}

function amazonDomainByCountry(country: string) {
  if (country === "ae") return "www.amazon.ae";
  if (country === "eg") return "www.amazon.eg";
  return "www.amazon.sa";
}

function buildAffiliateUrl(originalUrl: string, country: string, tag: string) {
  const asin = extractAsin(originalUrl);
  const domain = amazonDomainByCountry(country);

  if (!asin) return originalUrl;

  const cleanTag = String(tag || "").trim();

  if (!cleanTag) {
    return `https://${domain}/dp/${asin}`;
  }

  return `https://${domain}/dp/${asin}?tag=${encodeURIComponent(cleanTag)}`;
}

function cleanText(text: string) {
  return String(text || "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function pickMeta(html: string, key: string) {
  const reg1 = new RegExp(
    `<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const reg2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["']`,
    "i"
  );

  return cleanText(html.match(reg1)?.[1] || html.match(reg2)?.[1] || "");
}

function extractTitle(html: string) {
  const og = pickMeta(html, "og:title");
  if (og) return og.replace(/\s*:\s*Amazon\..*$/i, "").trim();

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  return cleanText(title).replace(/\s*:\s*Amazon\..*$/i, "").trim();
}

function extractImage(html: string) {
  const og = pickMeta(html, "og:image");
  if (og) return og;

  const landing = html.match(/"landingImage"\s*:\s*"([^"]+)"/i)?.[1];
  if (landing) return landing.replace(/\\u002F/g, "/").replace(/\\/g, "");

  return "";
}

function extractPrice(html: string) {
  const metaPrice =
    html.match(/"priceAmount"\s*:\s*([0-9.]+)/i)?.[1] ||
    html.match(/"displayPrice"\s*:\s*"([^"]+)"/i)?.[1];

  if (metaPrice) return cleanText(metaPrice);

  const whole = html
    .match(/<span[^>]*class=["'][^"']*a-price-whole[^"']*["'][^>]*>([\s\S]*?)<\/span>/i)?.[1]
    ?.replace(/[^\d.,]/g, "");

  const fraction = html
    .match(/<span[^>]*class=["'][^"']*a-price-fraction[^"']*["'][^>]*>([\s\S]*?)<\/span>/i)?.[1]
    ?.replace(/[^\d]/g, "");

  if (whole) {
    return fraction ? `${whole}.${fraction}` : whole;
  }

  return "";
}

async function fetchAmazonData(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "accept-language": "ar,en-US;q=0.9,en;q=0.8",
    },
  });

  const html = await res.text();

  return {
    title: extractTitle(html),
    image: extractImage(html),
    price: extractPrice(html),
  };
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "لازم تسجل دخول الأول" },
        { status: 401 }
      );
    }

    const { data: userData, error: userError } =
      await supabaseAuth.auth.getUser(token);

    if (userError || !userData.user) {
      return NextResponse.json(
        { ok: false, error: "جلسة تسجيل الدخول غير صالحة" },
        { status: 401 }
      );
    }

    const user = userData.user;
    const body = await req.json();

    const urls = String(body.urls || "")
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean)
      .slice(0, 30);

    const country = String(body.country || "sa").trim();
    const affiliateTag = String(body.affiliateTag || "").trim();
    const category = [String(body.category || "electronics").trim()];

    if (!urls.length) {
      return NextResponse.json(
        { ok: false, error: "حط روابط أمازون الأول" },
        { status: 400 }
      );
    }

    if (!affiliateTag) {
      return NextResponse.json(
        { ok: false, error: "اكتب كود الأفلييت" },
        { status: 400 }
      );
    }

    const success: any[] = [];
    const failed: any[] = [];

    for (const url of urls) {
      try {
        const asin = extractAsin(url);

        if (!asin) {
          failed.push({ url, reason: "لم يتم العثور على كود ASIN" });
          continue;
        }

        const productUrl = buildAffiliateUrl(url, country, affiliateTag);
        const data = await fetchAmazonData(productUrl);

        if (!data.title || !data.image || !data.price) {
          failed.push({
            url,
            asin,
            reason: "لم نقدر نجيب الاسم أو الصورة أو السعر من أمازون",
          });
          continue;
        }

        const { error } = await supabaseAdmin.from("customer_offers").insert({
          product_name: data.title,
          price: data.price,
          image_url: data.image,
          image_url_2: null,
          image_url_3: null,
          product_url: productUrl,
          store_name: amazonDomainByCountry(country),
          country,
          category,
          status: "pending",
          user_id: user.id,
          seller_email: user.email || "",
        });

        if (error) {
          failed.push({ url, asin, reason: error.message });
          continue;
        }

        success.push({
          asin,
          product_name: data.title,
          price: data.price,
          image_url: data.image,
          product_url: productUrl,
        });
      } catch {
        failed.push({ url, reason: "فشل جلب بيانات المنتج" });
      }
    }

    return NextResponse.json({
      ok: true,
      imported: success.length,
      failed: failed.length,
      success,
      failedItems: failed,
    });
  } catch (error) {
    console.error("IMPORT_AMAZON_ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}