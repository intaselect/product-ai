import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";
import { loadEnvConfig } from "@next/env";
import path from "path";
import fs from "fs";

loadEnvConfig(process.cwd());

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const currencyNames: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};

const categoryNames: Record<string, string> = {
  mobiles: "الموبايلات",
  electronics: "الإلكترونيات",
  computers: "اللابتوبات والكمبيوتر",
  beauty: "الجمال والعناية",
  fashion: "الموضة",
  home: "المنزل",
  gaming: "الألعاب والجيمينج",
  perfumes: "العطور",
  watches: "الساعات",
  phone_accessories: "إكسسوارات الموبايل",
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function cleanText(v: any) {
  return String(v || "").trim().replace(/\s+/g, " ");
}

function shortText(v: any, max = 90) {
  const t = cleanText(v);
  return t.length > max ? t.slice(0, max - 3) + "..." : t;
}

function makeTitle(categoryName: string, countryName: string) {
  return `🔥 قارن أفضل عروض ${categoryName} في ${countryName} قبل الشراء | BPS Chat`;
}

function makeDescription(categoryName: string, countryName: string, country: string, offers: any[]) {
  const currency = currencyNames[country] || "";

  const lines = offers
    .slice(0, 10)
    .map((o: any, i: number) => {
      return `${i + 1}) ${shortText(o.product_name, 85)}
السعر: ${cleanText(o.price)} ${currency}
المتجر: ${cleanText(o.store_name) || "BPS Chat Store"}
الرابط: ${cleanText(o.product_url) || "https://www.bpschat.com/customer-offers"}`;
    })
    .join("\n\n");

  return `🔥 فيديو دعائي لأفضل عروض ${categoryName} في ${countryName}

BPS Chat محرك بحث ومقارنة أسعار يساعدك تكتشف أفضل المنتجات والعروض من المتاجر المختلفة في السعودية والإمارات والكويت وقطر والبحرين ومصر.

المنتجات الموجودة في الفيديو:

${lines}

تصفح عروض ${countryName}:
https://www.bpschat.com/customer-offers?country=${country}

تصفح متجر BPS Chat:
https://www.bpschat.com/customer-offers

الموقع الرئيسي:
https://www.bpschat.com

#BPSChat #بي_بي_اس_شات #عروض #تسوق #مقارنة_أسعار #${countryName.replace(/\s/g, "_")} #${categoryName.replace(/\s/g, "_")}`;
}

function makeTags(categoryName: string, countryName: string) {
  return [
    "BPS Chat",
    "بي بي اس شات",
    "عروض",
    "تسوق",
    "مقارنة أسعار",
    "منتجات",
    "فيديو دعائي",
    categoryName,
    countryName,
    `عروض ${countryName}`,
    `أفضل أسعار ${categoryName}`,
  ];
}

async function uploadToYouTube(videoPath: string, title: string, description: string, tags: string[]) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    "https://www.bpschat.com/api/youtube/callback"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
  });

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const upload = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title,
        description,
        tags,
        categoryId: "22",
      },
      status: {
        privacyStatus: "public",
        selfDeclaredMadeForKids: false,
      },
    },
    media: {
      body: fs.createReadStream(videoPath),
    },
  });

  return upload.data.id!;
}

async function getPickedOffers() {
  const day = todayKey();

  for (const country of Object.keys(countryNames)) {
    for (const category of Object.keys(categoryNames)) {
      const logTitle = `${day}:store-video:${country}:${category}`;

      const already = await supabase
        .from("youtube_shorts_log")
        .select("id")
        .eq("source_type", "store_promo_video")
        .eq("title", logTitle)
        .eq("status", "uploaded")
        .maybeSingle();

      if (already.data) continue;

      const { data: offers, error } = await supabase
        .from("customer_offers")
        .select("id, product_name, price, image_url, product_url, store_name, country, category, created_at")
        .eq("status", "approved")
        .eq("country", country)
        .contains("category", [category])
        .not("image_url", "is", null)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      if (offers && offers.length >= 5) {
        return {
          country,
          category,
          offers,
          logTitle,
        };
      }
    }
  }

  return null;
}

async function run() {
  const picked = await getPickedOffers();

  if (!picked) {
    console.log("⚠️ No suitable offers found for store promo video");
    return;
  }

  const { country, category, offers, logTitle } = picked;

  const countryName = countryNames[country];
  const categoryName = categoryNames[category];

  const products = offers.map((offer: any) => ({
    title: offer.product_name,
    name: offer.product_name,
    priceText: `${offer.price} ${currencyNames[country] || ""}`,
    price: `${offer.price} ${currencyNames[country] || ""}`,
    store: offer.store_name || "BPS Chat Store",
    source: offer.store_name || "BPS Chat",
    image: offer.image_url,
    thumbnail: offer.image_url,
  }));

  const inputProps = {
    query: `${categoryName} في ${countryName}`,
    countryName,
    products,
  };

  const entry = path.join(process.cwd(), "remotion/index.tsx");

  console.log("🎬 Bundling Remotion...");
  const bundleLocation = await bundle({ entryPoint: entry });

  console.log("🎞️ Rendering StorePromoVideo:", logTitle);

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "StorePromoVideo",
    inputProps,
  });

  const outputLocation = path.join(
    process.cwd(),
    `store-video-${todayKey()}-${country}-${category}.mp4`
  );

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
  });

  const ytTitle = makeTitle(categoryName, countryName);
  const ytDescription = makeDescription(categoryName, countryName, country, offers);
  const tags = makeTags(categoryName, countryName);

  console.log("⬆️ Uploading Store Promo Video:", ytTitle);

  const videoId = await uploadToYouTube(outputLocation, ytTitle, ytDescription, tags);
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  await supabase.from("youtube_shorts_log").insert({
    source_type: "store_promo_video",
    source_id: offers.map((o: any) => o.id).join(","),
    title: logTitle,
    country,
    page_url: `https://www.bpschat.com/customer-offers?country=${country}`,
    video_url: outputLocation,
    youtube_video_id: videoId,
    youtube_url: youtubeUrl,
    status: "uploaded",
  });

  console.log("✅ Uploaded Store Promo Video:", youtubeUrl);
}

run().catch((err) => {
  console.error("❌ YouTube Store Promo Video failed:", err);
  process.exit(1);
});