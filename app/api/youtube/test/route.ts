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

    const { token } = await oauth2Client.getAccessToken();

    return NextResponse.json({
      ok: true,
      version: "token-test-v2",
      has_access_token: !!token,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        version: "token-test-v2",
        error: e.message || "YouTube test failed",
      },
      { status: 500 }
    );
  }
}