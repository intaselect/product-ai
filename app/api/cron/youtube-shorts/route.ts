import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function makeTitle(title: string, country?: string) {
  const c = country ? ` في ${country.toUpperCase()}` : "";
  return `🔥 ${title}${c} | أرخص عروض BPS Chat #Shorts`;
}

function makeDescription(title: string, pageUrl: string, country?: string) {
  return `🔥 ${title}

اكتشف أفضل الأسعار والعروض${country ? ` في ${country.toUpperCase()}` : ""} مع BPS Chat.

قارن قبل ما تشتري:
${pageUrl}

#BPSChat #Shorts #عروض #تسوق #مقارنة_أسعار #بي_بي_اس_شات`;
}

function toNodeStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export async function GET(req: Request) {
  try {
   const { searchParams } = new URL(req.url);
const secret = searchParams.get("secret");

if (secret !== process.env.CRON_SECRET) {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}
    const { data: offers, error } = await supabase
      .from("customer_offers")
      .select("id, product_name, country, image_url")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;

    const uploaded: any[] = [];

    for (const offer of offers || []) {
      const already = await supabase
        .from("youtube_shorts_log")
        .select("id")
        .eq("source_type", "customer_offer")
        .eq("source_id", String(offer.id))
        .maybeSingle();

      if (already.data) continue;

      const title = offer.product_name;
      const country = offer.country || "sa";
      const pageUrl = `https://www.bpschat.com/product/${offer.id}`;

      const videoRenderUrl =
        `https://www.bpschat.com/api/slug-video?query=${encodeURIComponent(title)}&country=${encodeURIComponent(country)}`;

      const videoRes = await fetch(videoRenderUrl);

      if (!videoRes.ok) {
        await supabase.from("youtube_shorts_log").insert({
          source_type: "customer_offer",
          source_id: String(offer.id),
          title,
          country,
          page_url: pageUrl,
          video_url: videoRenderUrl,
          status: "failed",
          error: `Video render failed: ${videoRes.status}`,
        });
        continue;
      }

      const arrayBuffer = await videoRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

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

      const upload = await youtube.videos.insert({
        part: ["snippet", "status"],
        requestBody: {
          snippet: {
            title: makeTitle(title, country),
            description: makeDescription(title, pageUrl, country),
            tags: [
              "BPS Chat",
              "Shorts",
              "Shopping",
              "عروض",
              "تسوق",
              "مقارنة أسعار",
              "بي بي اس شات",
            ],
            categoryId: "22",
          },
          status: {
            privacyStatus: "public",
            selfDeclaredMadeForKids: false,
          },
        },
        media: {
          body: toNodeStream(buffer),
        },
      });

      const youtubeId = upload.data.id;
      const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

      await supabase.from("youtube_shorts_log").insert({
        source_type: "customer_offer",
        source_id: String(offer.id),
        title,
        country,
        page_url: pageUrl,
        video_url: videoRenderUrl,
        youtube_video_id: youtubeId,
        youtube_url: youtubeUrl,
        status: "uploaded",
      });

      uploaded.push({ title, youtubeUrl });

      if (uploaded.length >= 3) break;
    }

    return NextResponse.json({
      ok: true,
      uploaded_count: uploaded.length,
      uploaded,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message || "YouTube shorts cron failed" },
      { status: 500 }
    );
  }
}