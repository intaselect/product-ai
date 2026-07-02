import { NextResponse } from "next/server";
import { searchAmazonSaProducts } from "@/lib/amazon-sa/search";

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
    const q = String(url.searchParams.get("q") || "").trim();

    if (!q) {
      return NextResponse.json({ ok: false, error: "اكتب كلمة البحث" }, { status: 400 });
    }

    const products = await searchAmazonSaProducts(q);

    return NextResponse.json({
      ok: true,
      products,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Amazon search failed" },
      { status: 500 }
    );
  }
}