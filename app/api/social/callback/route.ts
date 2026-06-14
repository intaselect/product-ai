import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  return NextResponse.redirect(
    `https://www.bpschat.com/?tiktok_auth=success&code=${encodeURIComponent(
      url.searchParams.get("code") || ""
    )}`
  );
}