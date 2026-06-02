import { google } from "googleapis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { ok: false, error: "Missing code" },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      "https://www.bpschat.com/api/youtube/callback"
    );

    const { tokens } = await oauth2Client.getToken(code);

    return NextResponse.json({
      ok: true,
      message: "COPY_REFRESH_TOKEN_AND_SAVE_IT_IN_VERCEL",
      refresh_token: tokens.refresh_token || null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message || "Callback failed" },
      { status: 500 }
    );
  }
}