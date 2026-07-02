import { NextResponse } from "next/server";
import { getAmazonItemByAsin } from "@/lib/amazon/client";
import { buildAmazonAffiliateUrl } from "@/lib/amazon/affiliate";

export const dynamic = "force-dynamic";

function checkAdmin(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  return secret && secret === process.env.CUSTOMER_OFFERS_ADMIN_SECRET;
}

export async function GET(req: Request) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { ok: false, error: "غير مصرح" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const asin = String(url.searchParams.get("asin") || "").trim().toUpperCase();
    const country = String(url.searchParams.get("country") || "sa").trim();

    if (!asin) {
      return NextResponse.json(
        { ok: false, error: "اكتب asin في الرابط" },
        { status: 400 }
      );
    }

    const product = await getAmazonItemByAsin({ asin, country });

    return NextResponse.json({
      ok: true,
      product,
      affiliate_url: buildAmazonAffiliateUrl(product.asin || asin, country),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "فشل اختبار Amazon API",
      },
      { status: 500 }
    );
  }
}