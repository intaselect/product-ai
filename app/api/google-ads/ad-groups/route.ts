import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const HEADERS = [
  "Row Type",
  "Action",
  "Ad group status",
  "Campaign ID",
  "Campaign",
  "Ad group ID",
  "Ad group",
  "Ad group type",
  "Default max. CPC",
];

function csvEscape(value: any) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return `"${text.replace(/"/g, '""')}"`;
}

function cleanText(value: any, max = 80) {
  return String(value || "")
    .replace(/[^\w\s\u0600-\u06FF\-+.&]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

 const campaign =
  url.searchParams.get("campaign") || "Website traffic-Search-2-6/7/2026";

const campaignId =
  url.searchParams.get("campaignId") || "23999519217";

    const filePath = path.join(process.cwd(), "data", "customer_offers.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { ok: false, error: "customer_offers.json not found" },
        { status: 404 }
      );
    }

    const allProducts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const seen = new Set<string>();

    const products = allProducts
      .filter((p: any) => p.status === "approved")
      .filter((p: any) => String(p.country || "sa") === "sa")
      .filter((p: any) => p.product_name)
      .filter((p: any) => p.product_url)
      .filter((p: any) => {
        const adGroup = cleanText(p.product_name, 60);
        if (seen.has(adGroup)) return false;
        seen.add(adGroup);
        return true;
      });

    const rows = products.map((product: any) => [
      "Ad group",
      "Add",
      "Enabled",
      campaignId,
      campaign,
      "",
      cleanText(product.product_name, 60),
      "Standard",
      "0.10",
    ]);

    const csv = [
      HEADERS.map(csvEscape).join(","),
      ...rows.map((r: any[]) => r.map(csvEscape).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bps-ad-groups-sa.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}