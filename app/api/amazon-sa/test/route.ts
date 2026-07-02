import { NextResponse } from "next/server";
import { getAmazonSaItem } from "@/lib/amazon-sa/items";

export const dynamic = "force-dynamic";

function checkAdmin(req: Request) {
  const url = new URL(req.url);
  return url.searchParams.get("secret") === process.env.CUSTOMER_OFFERS_ADMIN_SECRET;
}

export async function GET(req: Request) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
    }

    const url = new URL(req.url);
    const asin = String(url.searchParams.get("asin") || "").trim().toUpperCase();

    if (!asin) {
      return NextResponse.json({ ok: false, error: "اكتب asin" }, { status: 400 });
    }

    const product = await getAmazonSaItem(asin);

    return NextResponse.json({
      ok: true,
      product,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Amazon test failed" },
      { status: 500 }
    );
  }
}