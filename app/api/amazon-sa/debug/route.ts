import { NextResponse } from "next/server";
import { getAmazonAccessToken } from "@/lib/amazon-sa/token";
import {
  AMAZON_SA_MARKETPLACE,
  getAmazonSaTag,
  getAmazonApiBase,
  getAmazonTokenUrl,
} from "@/lib/amazon-sa/config";

export const dynamic = "force-dynamic";

function checkAdmin(req: Request) {
  const url = new URL(req.url);
  return url.searchParams.get("secret") === process.env.CUSTOMER_OFFERS_ADMIN_SECRET;
}

function mask(value: string) {
  if (!value) return "";
  return `${value.slice(0, 12)}...${value.slice(-6)}`;
}

export async function GET(req: Request) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json({ ok: false, error: "غير مصرح" }, { status: 401 });
    }

    const token = await getAmazonAccessToken();

    return NextResponse.json({
      ok: true,
      amazon: {
        clientIdExists: Boolean(process.env.AMAZON_CLIENT_ID),
        clientIdPreview: mask(process.env.AMAZON_CLIENT_ID || ""),
        clientSecretExists: Boolean(process.env.AMAZON_CLIENT_SECRET),
        tokenGenerated: Boolean(token),
        tokenPreview: mask(token),
        apiBase: getAmazonApiBase(),
        tokenUrl: getAmazonTokenUrl(),
        marketplace: AMAZON_SA_MARKETPLACE,
        partnerTag: getAmazonSaTag(),
        storeId: process.env.AMAZON_STORE_ID || "",
        saTag: process.env.AMAZON_SA_TAG || "",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Amazon debug failed" },
      { status: 500 }
    );
  }
}