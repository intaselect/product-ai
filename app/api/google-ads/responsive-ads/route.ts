import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const HEADERS = [
    "Row Type", "Action", "Ad status", "Campaign ID", "Campaign", "Ad group ID", "Ad group", "Ad ID", "Ad type", "Label",
    "Headline 1", "Headline 2", "Headline 3", "Headline 4", "Headline 5", "Headline 6", "Headline 7", "Headline 8", "Headline 9", "Headline 10", "Headline 11", "Headline 12", "Headline 13", "Headline 14", "Headline 15",
    "Description 1", "Description 2", "Description 3", "Description 4",
    "Headline 1 position", "Headline 2 position", "Headline 3 position", "Headline 4 position", "Headline 5 position", "Headline 6 position", "Headline 7 position", "Headline 8 position", "Headline 9 position", "Headline 10 position", "Headline 11 position", "Headline 12 position", "Headline 13 position", "Headline 14 position", "Headline 15 position",
    "Description 1 position", "Description 2 position", "Description 3 position", "Description 4 position",
    "Path 1", "Path 2", "Final URL", "Mobile final URL", "Tracking template", "Final URL suffix", "Custom parameter"
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

function cleanPrice(value: any) {
    const num = Number(String(value ?? "").replace(/[^\d.]/g, ""));
    if (!Number.isFinite(num) || num <= 0) return "";
    return `${Math.round(num)} ريال`;
}

function makeSlug(text: any) {
    return cleanText(text, 120)
        .toLowerCase()
        .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function makeFinalUrl(product: any) {
    return `https://www.bpschat.com/customer-offers/product/bps-chat-${makeSlug(
        product.product_name
    )}-${product.country || "sa"}-${product.id}`;
}

function makePath1(product: any) {
    const category = Array.isArray(product.category)
        ? product.category[0]
        : product.category;

    return cleanText(category || "products", 15)
        .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "")
        .slice(0, 15);
}

function makeHeadlines(product: any) {
    const name22 = cleanText(product.product_name, 22);
    const name18 = cleanText(product.product_name, 18);
    const price = cleanPrice(product.price);
    const store = cleanText(product.store_name, 16);

    return [
        `سعر ${name22}`.slice(0, 30),
        price ? `بسعر ${price}`.slice(0, 30) : "اعرف أحدث سعر",
        store ? `من ${store}`.slice(0, 30) : "BPS Chat",
        `قارن سعر ${name18}`.slice(0, 30),
        "اعرف السعر قبل الشراء",
        "قارن بين المتاجر",
        "رابط الشراء من المتجر",
        "صفحة المنتج والسعر",
        "عروض السعودية اليوم",
        "شاهد التفاصيل الآن",
        "تسوق بذكاء",
        "أفضل عروض المنتجات",
        "قارن واشتري بسهولة",
        "منتجات السعودية",
        "BPS Chat",
    ];
}

function makeDescriptions(product: any) {
    const price = cleanPrice(product.price);
    const store = cleanText(product.store_name, 20);

    return [
        price
            ? `شاهد سعر المنتج حوالي ${price} وقارن التفاصيل قبل الشراء.`.slice(0, 90)
            : "قارن أسعار المنتجات في السعودية واعرف التفاصيل ورابط الشراء.".slice(0, 90),

        store
            ? `انتقل من BPS Chat إلى ${store} لإتمام الشراء من المتجر.`.slice(0, 90)
            : "صفحة المنتج تعرض السعر والتفاصيل ورابط الشراء من المتجر.".slice(0, 90),

        "اعرف تفاصيل المنتج والسعر ثم انتقل للمتجر لإتمام عملية الشراء.".slice(0, 90),

        "BPS Chat يساعدك على الوصول لصفحة المنتج ومقارنة السعر قبل الشراء.".slice(0, 90),
    ];
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
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
const campaign =
  url.searchParams.get("campaign") || "Website traffic-Search-2-6/7/2026";

const campaignId =
  url.searchParams.get("campaignId") || "23999519217";

        const commentLines = [
            '"# Assets can be shown in any order, so make sure that they make sense individually or in combination, and don’t violate our policies or local law."',
            '"# IMPORTANT: For each responsive search ad, provide at least 5 distinct headlines that do not repeat the same or similar phrases. Providing redundant headlines will restrict our ability to generate combinations."',
        ];

        const rows: string[][] = [];

        for (const product of products) {
            const adGroup = cleanText(product.product_name, 60);
            const headlines = makeHeadlines(product);
            const descriptions = makeDescriptions(product);

            rows.push([
                "Ad",
                "Add",
                "Enabled",
               campaignId,
campaign,
                "",
                adGroup,
                "",
                "Responsive search ad",
                "",
                ...headlines,
                ...descriptions,
                ...Array(15).fill(""),
                ...Array(4).fill(""),
                makePath1(product),
                "sa",
                makeFinalUrl(product),
                "",
                "",
                "",
                "",
            ]);
        }

        const csv = [
            ...commentLines,
            HEADERS.map(csvEscape).join(","),
            ...rows.map((r) => r.map(csvEscape).join(",")),
        ].join("\n");

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="bps-responsive-search-ads-sa.csv"`,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { ok: false, error: error?.message || "Export failed" },
            { status: 500 }
        );
    }
}