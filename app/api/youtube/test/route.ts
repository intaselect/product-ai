import { google } from "googleapis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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

    const res = await youtube.channels.list({
      part: ["snippet", "statistics"],
      mine: true,
    });

    return NextResponse.json({
      ok: true,
      channel: res.data.items?.[0] || null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message || "YouTube test failed" },
      { status: 500 }
    );
  }
}