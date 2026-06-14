import { NextResponse } from "next/server";

const INDEXNOW_KEY = "3d19f63719034655a5dbcd35aaa86f0b";
const SITE_URL = "https://www.bpschat.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const urls = Array.isArray(body.urls) ? body.urls : [];

    const urlList = urls
      .filter((url: string) => typeof url === "string")
      .filter((url: string) => url.startsWith(SITE_URL))
      .slice(0, 10000);

    if (urlList.length === 0) {
      return NextResponse.json(
        { ok: false, message: "No valid URLs" },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: "www.bpschat.com",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: urlList.length,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "IndexNow submit failed" },
      { status: 500 }
    );
  }
}