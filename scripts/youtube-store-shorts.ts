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

const MAX_VIDEOS_PER_RUN = 6;

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

function safeText(v: any) {
  return String(v || "").trim();
}

function cleanTitle(t: string, max = 95) {
  const x = safeText(t).replace(/\s+/g, " ");
  return x.length > max ? x.slice(0, max - 3) + "..." : x;
}

function makeYoutubeTitle(categoryName: string, countryName: string) {
  return `🔥 عروض ${categoryName} في ${countryName} | منتجات وأسعار من BPS Chat #Shorts`;
}

function makeYoutubeDescription(
  categoryName: string,
  countryName: string,
  country: string,
  offers: any[]
) {
  const currency = currencyNames[country] || "";
  const productLines = offers
    .slice(0, 10)
    .map((offer: any, i: number) => {
      const name = cleanTitle(offer.product_name, 80);
      const price = safeText(offer.price);
      const store = safeText(offer.store_name) || "BPS";
      const url = safeText(offer.product_url);

      return `${i + 1}) ${name}
السعر: ${price} ${currency}
المتجر: ${store}
الرابط: ${url || "https://www.bpschat.com/customer-offers"}`;
    })
    .join("\n\n");

  return `🔥 أفضل عروض ${categoryName} في ${countryName}

في الفيديو ده هتشوف منتجات مختارة من متجر BPS Chat مع الأسعار والمتاجر وروابط الشراء.

المنتجات الموجودة في الفيديو:

${productLines}

تصفح كل عروض ${countryName}:
https://www.bpschat.com/customer-offers?country=${country}

موقع BPS Chat:
https://www.bpschat.com

#BPSChat #Shorts #عروض #تسوق #مقارنة_أسعار #بي_بي_اس_شات #${countryName.replace(/\s/g, "_")} #${categoryName.replace(/\s/g, "_")}`;
}

function makeTags(categoryName: string, countryName: string) {
  return [
    "BPS Chat",
    "بي بي اس شات",
    "Shorts",
    "عروض",
    "تسوق",
    "منتجات",
    "مقارنة أسعار",
    categoryName,
    countryName,
    `عروض ${countryName}`,
    `منتجات ${countryName}`,
    `أسعار ${categoryName}`,
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

async function getBestCategoryForCountry(country: string, usedCategories: Set<string>) {
  for (const category of Object.keys(categoryNames)) {
    if (usedCategories.has(category)) continue;

    const { data: alreadyToday } = await supabase
      .from("youtube_shorts_log")
      .select("id")
      .eq("source_type", "store_country_short")
      .eq("title", `${todayKey()}:store:${country}:${category}`)
      .eq("status", "uploaded")
      .maybeSingle();

    if (alreadyToday) continue;

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
      return { category, offers };
    }
  }

  return null;
}

async function run() {
  const day = todayKey();
  const uploaded: any[] = [];
  const usedCategories = new Set<string>();

  const entry = path.join(process.cwd(), "remotion/index.tsx");

  console.log("🎬 Bundling Remotion...");
  const bundleLocation = await bundle({ entryPoint: entry });

  for (const country of Object.keys(countryNames)) {
    if (uploaded.length >= MAX_VIDEOS_PER_RUN) break;

    const picked = await getBestCategoryForCountry(country, usedCategories);

    if (!picked) {
      console.log("⚠️ No suitable category for:", country);
      continue;
    }

    const { category, offers } = picked;
    const countryName = countryNames[country];
    const categoryName = categoryNames[category];
    const logTitle = `${day}:store:${country}:${category}`;

    usedCategories.add(category);

    const products = offers.map((offer: any) => ({
      title: offer.product_name,
      name: offer.product_name,
      priceText: `${offer.price} ${currencyNames[country] || ""}`,
      price: `${offer.price} ${currencyNames[country] || ""}`,
      store: offer.store_name || "BPS",
      source: offer.store_name || "BPS",
      image: offer.image_url,
      thumbnail: offer.image_url,
    }));

    const inputProps = {
      query: `${categoryName} في ${countryName}`,
      countryName,
      products,
    };

    console.log("🎞️ Rendering:", logTitle);

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "MarketingVideo",
      inputProps,
    });

    const outputLocation = path.join(
      process.cwd(),
      `store-${day}-${country}-${category}.mp4`
    );

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps,
    });

    const ytTitle = makeYoutubeTitle(categoryName, countryName);
    const ytDescription = makeYoutubeDescription(categoryName, countryName, country, offers);
    const tags = makeTags(categoryName, countryName);

    console.log("⬆️ Uploading:", ytTitle);

    const videoId = await uploadToYouTube(outputLocation, ytTitle, ytDescription, tags);
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    await supabase.from("youtube_shorts_log").insert({
      source_type: "store_country_short",
      source_id: offers.map((o: any) => o.id).join(","),
      title: ytTitle,
      country,
      page_url: `https://www.bpschat.com/customer-offers?country=${country}`,
      video_url: outputLocation,
      youtube_video_id: videoId,
      youtube_url: youtubeUrl,
      status: "uploaded",
    });

    uploaded.push({
      country,
      category,
      title: ytTitle,
      youtubeUrl,
    });

    console.log("✅ Uploaded:", youtubeUrl);
  }

  console.log("✅ Done:", uploaded);
}

run().catch((err) => {
  console.error("❌ YouTube Store Shorts failed:", err);
  process.exit(1);
});