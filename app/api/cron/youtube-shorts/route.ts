import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";
import fs from "fs/promises";
import fss from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const execFileAsync = promisify(execFile);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countries: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const categories: Record<string, string> = {
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

function daySeed() {
  return Math.floor(Date.now() / 86400000);
}

function rotate<T>(arr: T[], offset: number) {
  return [...arr.slice(offset % arr.length), ...arr.slice(0, offset % arr.length)];
}

function makeTitle(categoryName: string, countryName: string) {
  return `🔥 أفضل 10 عروض ${categoryName} في ${countryName} | BPS Chat #Shorts`;
}

function makeDescription(categoryName: string, countryName: string) {
  return `🔥 أفضل 10 عروض ${categoryName} في ${countryName}

اكتشف منتجات وعروض من متجر BPS Chat.
قارن قبل ما تشتري ووفر وقتك وفلوسك.

تصفح العروض:
https://www.bpschat.com/customer-offers

#BPSChat #Shorts #عروض #تسوق #مقارنة_أسعار #بي_بي_اس_شات #${countryName.replace(/\s/g, "_")} #${categoryName.replace(/\s/g, "_")}`;
}

function escapeXml(str: string) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function downloadImage(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("image download failed");
  return Buffer.from(await res.arrayBuffer());
}

async function createSlide(product: any, index: number, total: number, categoryName: string, countryName: string, outPath: string) {
  let productImage: Buffer | null = null;

  try {
    productImage = await downloadImage(product.image_url);
  } catch {
    productImage = null;
  }

  const base = sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: "#06111f",
    },
  });

  const imageBuffer = productImage
    ? await sharp(productImage)
        .resize(760, 760, { fit: "contain", background: "#ffffff" })
        .png()
        .toBuffer()
    : await sharp({
        create: {
          width: 760,
          height: 760,
          channels: 4,
          background: "#ffffff",
        },
      }).png().toBuffer();

  const svg = Buffer.from(`
  <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="1080" height="1920" fill="#06111f"/>
    <circle cx="120" cy="130" r="80" fill="#00e5ff" opacity="0.20"/>
    <circle cx="970" cy="250" r="120" fill="#ff8a00" opacity="0.16"/>
    <text x="540" y="115" text-anchor="middle" font-size="52" font-family="Arial" fill="#ffffff" font-weight="700">BPS Chat</text>
    <text x="540" y="185" text-anchor="middle" font-size="36" font-family="Arial" fill="#8ffcff">أفضل عروض ${escapeXml(categoryName)} في ${escapeXml(countryName)}</text>

    <rect x="100" y="1000" width="880" height="420" rx="44" fill="#ffffff" opacity="0.08"/>
    <text x="540" y="1085" text-anchor="middle" font-size="38" font-family="Arial" fill="#00e5ff">منتج ${index + 1} من ${total}</text>

    <foreignObject x="130" y="1130" width="820" height="160">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial; direction:rtl; text-align:center; color:white; font-size:46px; font-weight:800; line-height:1.25;">
        ${escapeXml(product.product_name || "").slice(0, 95)}
      </div>
    </foreignObject>

    <text x="540" y="1355" text-anchor="middle" font-size="54" font-family="Arial" fill="#ffd166" font-weight="900">${escapeXml(product.price || "شاهد السعر")}</text>

    <rect x="190" y="1510" width="700" height="96" rx="48" fill="#00e5ff"/>
    <text x="540" y="1572" text-anchor="middle" font-size="38" font-family="Arial" fill="#06111f" font-weight="900">قارن قبل ما تشتري</text>

    <text x="540" y="1740" text-anchor="middle" font-size="34" font-family="Arial" fill="#ffffff">www.bpschat.com/customer-offers</text>
    <text x="540" y="1810" text-anchor="middle" font-size="30" font-family="Arial" fill="#9fb4c8">#BPSChat #Shorts #عروض</text>
  </svg>`);

  await base
    .composite([
      { input: svg, left: 0, top: 0 },
      { input: imageBuffer, left: 160, top: 260 },
    ])
    .png()
    .toFile(outPath);
}

async function makeVideo(products: any[], categoryName: string, countryName: string, workDir: string) {
  const slides: string[] = [];

  for (let i = 0; i < products.length; i++) {
    const slidePath = path.join(workDir, `slide-${i}.png`);
    await createSlide(products[i], i, products.length, categoryName, countryName, slidePath);
    slides.push(slidePath);
  }

  const listPath = path.join(workDir, "list.txt");
  const outPath = path.join(workDir, "short.mp4");

  const concat = slides
    .map((s) => `file '${s.replace(/\\/g, "/")}'\nduration 2.6`)
    .join("\n") + `\nfile '${slides[slides.length - 1].replace(/\\/g, "/")}'\n`;

  await fs.writeFile(listPath, concat);

  await execFileAsync(ffmpegPath!, [
    "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", listPath,
    "-vf", "scale=1080:1920,format=yuv420p",
    "-r", "30",
    "-movflags", "+faststart",
    outPath,
  ]);

  return outPath;
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
      body: fss.createReadStream(videoPath),
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

    const seed = daySeed();
    const countryKeys = rotate(Object.keys(countries), seed);
    const categoryKeys = rotate(Object.keys(categories), seed);

    const uploaded: any[] = [];

    for (const country of countryKeys) {
      for (const category of categoryKeys) {
        if (uploaded.length >= 3) break;

        const countryName = countries[country];
        const categoryName = categories[category];

        const already = await supabase
          .from("youtube_shorts_log")
          .select("id")
          .eq("source_type", "category_video")
          .eq("country", country)
          .eq("title", `${category}:${country}`)
          .eq("status", "uploaded")
          .maybeSingle();

        if (already.data) continue;

        const { data: products, error } = await supabase
          .from("customer_offers")
          .select("id, product_name, price, image_url, product_url, country, category")
          .eq("status", "approved")
          .eq("country", country)
          .contains("category", [category])
          .not("image_url", "is", null)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        if (!products || products.length < 5) continue;

        const workDir = path.join("/tmp", `bps-short-${Date.now()}-${country}-${category}`);
        await fs.mkdir(workDir, { recursive: true });

        const videoPath = await makeVideo(products.slice(0, 10), categoryName, countryName, workDir);

        const ytTitle = makeTitle(categoryName, countryName);
        const ytDescription = makeDescription(categoryName, countryName);

        const videoId = await uploadToYouTube(videoPath, ytTitle, ytDescription, [
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
          source_type: "category_video",
          source_id: products.map((p: any) => p.id).join(","),
          title: `${category}:${country}`,
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