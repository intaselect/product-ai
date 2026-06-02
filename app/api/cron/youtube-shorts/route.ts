import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

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

function makeYoutubeTitle(categoryName: string, countryName: string) {
  return `🔥 أفضل 10 عروض ${categoryName} في ${countryName} | BPS Chat #Shorts`;
}

function makeYoutubeDescription(categoryName: string, countryName: string) {
  return `🔥 أفضل 10 عروض ${categoryName} في ${countryName}

شوف أحدث المنتجات والعروض من متجر BPS Chat.
قارن قبل ما تشتري ووفر وقتك وفلوسك.

تصفح العروض:
https://www.bpschat.com/customer-offers

#BPSChat #Shorts #عروض #تسوق #مقارنة_أسعار #بي_بي_اس_شات #${countryName.replace(/\s/g, "_")} #${categoryName.replace(/\s/g, "_")}`;
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

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  const fs = await import("fs");

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

  return upload.data.id;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const day = todayKey();
    const uploaded: any[] = [];

    const countries = Object.keys(countryNames);
    const categories = Object.keys(categoryNames);

    const entry = path.join(process.cwd(), "remotion/index.tsx");

    const bundleLocation = await bundle({
      entryPoint: entry,
    });

    for (const country of countries) {
      for (const category of categories) {
        if (uploaded.length >= 3) break;

        const countryName = countryNames[country];
        const categoryName = categoryNames[category];
        const logTitle = `${day}:${category}:${country}`;

        const already = await supabase
          .from("youtube_shorts_log")
          .select("id")
          .eq("source_type", "store_category_short")
          .eq("title", logTitle)
          .eq("status", "uploaded")
          .maybeSingle();

        if (already.data) continue;

        const { data: offers, error } = await supabase
          .from("customer_offers")
          .select("id, product_name, price, image_url, store_name, country, category")
          .eq("status", "approved")
          .eq("country", country)
          .contains("category", [category])
          .not("image_url", "is", null)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;

        if (!offers || offers.length < 5) continue;

        const products = offers.map((offer: any) => ({
          title: offer.product_name,
          name: offer.product_name,
          priceText: offer.price,
          price: offer.price,
          store: offer.store_name || "BPS Chat Store",
          source: offer.store_name || "BPS Chat",
          image: offer.image_url,
          thumbnail: offer.image_url,
          countryName,
        }));

        const inputProps = {
          query: `${categoryName} في ${countryName}`,
          countryName,
          products,
        };

        const composition = await selectComposition({
          serveUrl: bundleLocation,
          id: "MarketingVideo",
          inputProps,
        });

        const outputLocation = path.join(
          "/tmp",
          `bps-${day}-${country}-${category}.mp4`
        );

        await renderMedia({
          composition,
          serveUrl: bundleLocation,
          codec: "h264",
          outputLocation,
          inputProps,
        });

        const ytTitle = makeYoutubeTitle(categoryName, countryName);
        const ytDescription = makeYoutubeDescription(categoryName, countryName);

        const videoId = await uploadToYouTube(outputLocation, ytTitle, ytDescription, [
          "BPS Chat",
          "Shorts",
          categoryName,
          countryName,
          "عروض",
          "تسوق",
          "مقارنة أسعار",
          "بي بي اس شات",
        ]);

        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

        await supabase.from("youtube_shorts_log").insert({
          source_type: "store_category_short",
          source_id: offers.map((o: any) => o.id).join(","),
          title: logTitle,
          country,
          page_url: "https://www.bpschat.com/customer-offers",
          video_url: null,
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
      }
    }

    return NextResponse.json({
      ok: true,
      uploaded_count: uploaded.length,
      uploaded,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: e.message || "YouTube shorts cron failed",
        details: e?.errors || null,
      },
      { status: 500 }
    );
  }
}