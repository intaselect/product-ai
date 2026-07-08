import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const HEADERS = [
  "Row Type",
  "Action",
  "Keyword status",
  "Campaign ID",
  "Campaign",
  "Ad group ID",
  "Ad group",
  "Keyword",
  "Match type",
  "Max. CPC",
  "Final URL",
];

function csvEscape(value: any) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return `"${text.replace(/"/g, '""')}"`;
}

// نفس تنظيف ملف الـ Ad Groups بالظبط عشان الاسم يطابق الموجود في Google
function cleanAdGroup(value: any, max = 60) {
  return String(value || "")
    .replace(/[^\w\s\u0600-\u06FF\-+.&]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

// تنظيف صارم للكلمات فقط
function cleanKeyword(value: any) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 8)
    .join(" ");
}

function makeSlug(text: any) {
  return String(text || "")
    .normalize("NFKD")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeFinalUrl(product: any) {
  return `https://www.bpschat.com/customer-offers/product/bps-chat-${makeSlug(
    product.product_name
  )}-${product.country || "sa"}-${product.id}`;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const campaign =
      url.searchParams.get("campaign") || "Website traffic-Search-6/7/2026";

    const campaignId =
      url.searchParams.get("campaignId") || "24008888842";

    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : null;

    const filePath = path.join(process.cwd(), "data", "customer_offers.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { ok: false, error: "customer_offers.json not found" },
        { status: 404 }
      );
    }

    const allProducts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    let products = allProducts
      .filter((p: any) => p.status === "approved")
      .filter((p: any) => String(p.country || "sa") === "sa")
      .filter((p: any) => p.product_name)
      .filter((p: any) => p.product_url);

    if (limit && Number.isFinite(limit) && limit > 0) {
      products = products.slice(0, limit);
    }

    const rows: string[][] = [];
    const seen = new Set<string>();

    for (const product of products) {
      const adGroup = cleanAdGroup(product.product_name, 60);
      const keyword = cleanKeyword(product.product_name);

      if (!adGroup || !keyword) continue;

      const key = `${adGroup}__${keyword}`;
      if (seen.has(key)) continue;
      seen.add(key);

      rows.push([
        "Keyword",
        "Add",
        "Enabled",
        campaignId,
        campaign,
        "",
        adGroup,
        keyword,
        "Phrase",
        "0.10",
        makeFinalUrl(product),
      ]);
    }

    const csv = [
      HEADERS.map(csvEscape).join(","),
      ...rows.map((r) => r.map(csvEscape).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bps-keywords-sa.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}