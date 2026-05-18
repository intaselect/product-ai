import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.SERPAPI_KEY || "";

  return NextResponse.json({
    hasKey: !!key,
    keyLength: key.length,
    keyStart: key ? key.slice(0, 4) : null,
    keyEnd: key ? key.slice(-4) : null,
  });
}