import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

function cleanText(text: string) {
  return String(text || "")
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&rlm;/g, "")
    .replace(/&lrm;/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAsin(input: string) {
  const text = String(input || "").trim();

  if (/^[A-Z0-9]{10}$/i.test(text)) {
    return text.toUpperCase();
  }

  const match =
    text.match(/\/dp\/([A-Z0-9]{10})/i) ||
    text.match(/\/gp\/product\/([A-Z0-9]{10})/i) ||
    text.match(/[?&]asin=([A-Z0-9]{10})/i);

  return match?.[1]?.toUpperCase() || "";
}

function amazonDomainByCountry(country: string) {
  if (country === "ae") return "www.amazon.ae";
  if (country === "eg") return "www.amazon.eg";
  return "www.amazon.sa";
}

function storeNameByCountry(country: string) {
  if (country === "ae") return "amazon.ae";
  if (country === "eg") return "amazon.eg";
  return "amazon.sa";
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

  const reg3 = new RegExp(
    `<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );

  return cleanText(
    html.match(reg1)?.[1] ||
      html.match(reg2)?.[1] ||
      html.match(reg3)?.[1] ||
      ""
  );
}

function extractTitle(html: string) {
  const productTitle =
    html.match(/id=["']productTitle["'][^>]*>([\s\S]*?)<\/span>/i)?.[1] || "";

  if (productTitle) return cleanText(productTitle);

  const og = pickMeta(html, "og:title");
  if (og) return og.replace(/\s*:\s*Amazon\..*$/i, "").trim();

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  return cleanText(title).replace(/\s*:\s*Amazon\..*$/i, "").trim();
}

function decodeAmazonImageUrl(url: string) {
  return cleanText(url)
    .replace(/\\u002F/g, "/")
    .replace(/\\/g, "")
    .replace(/&amp;/g, "&");
}

function extractImage(html: string) {
  const og = pickMeta(html, "og:image");
  if (og) return decodeAmazonImageUrl(og);

  const landing =
    html.match(/"landingImage"\s*:\s*"([^"]+)"/i)?.[1] ||
    html.match(/id=["']landingImage["'][^>]+src=["']([^"']+)["']/i)?.[1] ||
    html.match(/data-old-hires=["']([^"']+)["']/i)?.[1];

  if (landing) return decodeAmazonImageUrl(landing);

  const dynamicImage = html.match(/data-a-dynamic-image=["']([^"']+)["']/i)?.[1];
  if (dynamicImage) {
    const decoded = cleanText(dynamicImage);
    const firstImage = decoded.match(/https?:\/\/[^"{}]+/i)?.[0];
    if (firstImage) return decodeAmazonImageUrl(firstImage);
  }

  return "";
}

function extractPrice(html: string) {
  const offscreenPrices = Array.from(
    html.matchAll(
      /<span[^>]*class=["'][^"']*a-offscreen[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi
    )
  )
    .map((m) => cleanText(m[1]))
    .filter((v) => /\d/.test(v));

  if (offscreenPrices.length > 0) {
    return offscreenPrices[0];
  }

  const displayPrice =
    html.match(/"displayPrice"\s*:\s*"([^"]+)"/i)?.[1] ||
    html.match(/"priceToPay"\s*:\s*"([^"]+)"/i)?.[1];

  if (displayPrice) return cleanText(displayPrice);

  const priceAmount = html.match(/"priceAmount"\s*:\s*([0-9.]+)/i)?.[1];
  if (priceAmount) return cleanText(priceAmount);

  const whole = html
    .match(
      /<span[^>]*class=["'][^"']*a-price-whole[^"']*["'][^>]*>([\s\S]*?)<\/span>/i
    )?.[1]
    ?.replace(/[^\d.,]/g, "");

  const fraction = html
    .match(
      /<span[^>]*class=["'][^"']*a-price-fraction[^"']*["'][^>]*>([\s\S]*?)<\/span>/i
    )?.[1]
    ?.replace(/[^\d]/g, "");

  if (whole) return fraction ? `${whole}.${fraction}` : whole;

  return "";
}

function isAmazonUrl(url: string) {
  return (
    url.includes("amazon.sa") ||
    url.includes("amazon.ae") ||
    url.includes("amazon.eg") ||
    url.includes("amzn.to")
  );
}

function hasAffiliate(rawUrl: string, finalUrl: string) {
  return (
    rawUrl.includes("tag=") ||
    finalUrl.includes("tag=") ||
    rawUrl.includes("amzn.to/")
  );
}

async function fetchAmazonData(inputUrl: string) {
  const res = await fetch(inputUrl, {
    cache: "no-store",
    redirect: "follow",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "accept-language": "ar-SA,ar;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
    },
  });

  const finalUrl = res.url || inputUrl;
  const html = await res.text();

  return {
    finalUrl,
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

    const urls = Array.isArray(body.urls)
      ? body.urls
          .map((u: unknown) => String(u || "").trim())
          .filter(Boolean)
          .slice(0, 50)
      : String(body.urls || "")
          .split("\n")
          .map((u: string) => u.trim())
          .filter(Boolean)
          .slice(0, 50);

    const country = String(body.country || "sa").trim();
    const category = [String(body.category || "electronics").trim()];

    if (!urls.length) {
      return NextResponse.json(
        { ok: false, error: "حط روابط أمازون الأول" },
        { status: 400 }
      );
    }

    const success: any[] = [];
    const failed: any[] = [];

    for (const rawUrl of urls) {
      try {
        if (!isAmazonUrl(rawUrl)) {
          failed.push({
            url: rawUrl,
            reason: "الرابط ليس رابط أمازون أو amzn.to",
          });
          continue;
        }

        const fetched = await fetchAmazonData(rawUrl);
        const asin = extractAsin(fetched.finalUrl) || extractAsin(rawUrl);

        if (!hasAffiliate(rawUrl, fetched.finalUrl)) {
          failed.push({
            url: rawUrl,
            reason: "الرابط لا يحتوي على أفلييت tag أو ليس رابط amzn.to",
          });
          continue;
        }

        if (!asin) {
          failed.push({
            url: rawUrl,
            reason: "لم يتم العثور على كود ASIN",
          });
          continue;
        }

        if (!fetched.title || !fetched.image || !fetched.price) {
          failed.push({
            url: rawUrl,
            asin,
            reason: "لم نقدر نجيب الاسم أو الصورة أو السعر من أمازون",
          });
          continue;
        }

        const { error } = await supabaseAdmin.from("customer_offers").insert({
          product_name: fetched.title,
          price: fetched.price,
          image_url: fetched.image,
          image_url_2: null,
          image_url_3: null,
          product_url: rawUrl,
          store_name: storeNameByCountry(country),
          country,
          category,
          status: "pending",
          user_id: user.id,
          seller_email: user.email || "",
        });

        if (error) {
          failed.push({
            url: rawUrl,
            asin,
            reason: error.message,
          });
          continue;
        }

        success.push({
          asin,
          product_name: fetched.title,
          price: fetched.price,
          image_url: fetched.image,
          product_url: rawUrl,
        });
      } catch {
        failed.push({
          url: rawUrl,
          reason: "فشل جلب بيانات المنتج من أمازون",
        });
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