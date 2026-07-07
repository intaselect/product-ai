import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const HEADERS = [
  "Campaign","Labels","Campaign Type","Networks","Budget","Budget type","EU political ads","Standard conversion goals","Customer acquisition","Languages","Bid Strategy Type","Bid Strategy Name","Enhanced CPC","Maximum CPC bid limit","Start Date","End Date","Broad match keywords","Ad Schedule","Ad rotation","Content exclusions","Targeting method","Exclusion method","Audience targeting","Flexible Reach","AI Max","Text customization","Final URL expansion","Ad Group","Max CPC","Max CPM","Target CPA","Max CPV","Target CPV","Percent CPC","Target CPM","Target ROAS","Target CPC","Desktop Bid Modifier","Mobile Bid Modifier","Tablet Bid Modifier","TV Screen Bid Modifier","Display Network Custom Bid Type","Optimized targeting","Strict age and gender targeting","Search term matching","Ad Group Type","Channels","Audience name","Age demographic","Gender demographic","Income demographic","Parental status demographic","Remarketing audience segments","Interest categories","Life events","Custom audience segments","Detailed demographics","Remarketing audience exclusions","Tracking template","Final URL suffix","Custom parameters","ID","Location","Reach","Location groups","Radius","Unit","Bid Modifier","Criterion Type","Keyword","First page bid","Top of page bid","First position bid","Quality score","Landing page experience","Expected CTR","Ad relevance","Final URL","Final mobile URL","Image Size","Upgraded extension","Link source","Business name","Ad type","Headline 1","Headline 1 position","Headline 2","Headline 2 position","Headline 3","Headline 3 position","Headline 4","Headline 4 position","Headline 5","Headline 5 position","Headline 6","Headline 6 position","Headline 7","Headline 7 position","Headline 8","Headline 8 position","Headline 9","Headline 9 position","Headline 10","Headline 10 position","Headline 11","Headline 11 position","Headline 12","Headline 12 position","Headline 13","Headline 13 position","Headline 14","Headline 14 position","Headline 15","Headline 15 position","Description 1","Description 1 position","Description 2","Description 2 position","Description 3","Description 3 position","Description 4","Description 4 position","Path 1","Path 2","Link Text","Description Line 1","Description Line 2","Source","Campaign Status","Ad Group Status","Status","Approval Status","Ad strength","Comment"
];

function cell(v: any) {
  return String(v ?? "").replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
}

function row(data: Record<string, any>) {
  return HEADERS.map((h) => cell(data[h])).join("\t");
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
  return `https://www.bpschat.com/customer-offers/product/bps-chat-${makeSlug(product.product_name)}-${product.country || "sa"}-${product.id}`;
}

function makeKeywords(name: string) {
  const n = cleanText(name, 80);
  return [
    { k: n, t: "Broad" },
    { k: `سعر ${n}`, t: "Phrase" },
    { k: `شراء ${n}`, t: "Phrase" },
    { k: `${n} السعودية`, t: "Phrase" },
    { k: `${n} سعر السعودية`, t: "Phrase" },
    { k: `${n} امازون`, t: "Phrase" },
    { k: `${n} نون`, t: "Phrase" },
  ];
}

function makeHeadlines(product: any) {
  const name22 = cleanText(product.product_name, 22);
  const name18 = cleanText(product.product_name, 18);
  const price = cleanPrice(product.price);
  const store = cleanText(product.store_name, 16);

  return [
    `سعر ${name22}`.slice(0, 30),
    price ? `بسعر ${price}`.slice(0, 30) : "قارن الأسعار قبل الشراء",
    store ? `من ${store}`.slice(0, 30) : "BPS Chat",
    `قارن سعر ${name18}`.slice(0, 30),
    "عروض السعودية اليوم",
    "اعرف السعر قبل الشراء",
    "قارن بين المتاجر",
    "منتجات السعودية",
    "BPS Chat",
    "تسوق بذكاء",
    "شاهد التفاصيل الآن",
    "رابط الشراء من المتجر",
    "أفضل عروض المنتجات",
    "قارن واشتري بسهولة",
    "صفحة المنتج والسعر",
  ];
}

function makeDescriptions(product: any) {
  const price = cleanPrice(product.price);
  const store = cleanText(product.store_name, 20);

  return [
    price ? `شاهد سعر المنتج حوالي ${price} وقارن التفاصيل قبل الشراء.`.slice(0, 90) : "قارن أسعار المنتجات في السعودية واعرف التفاصيل ورابط الشراء.",
    store ? `انتقل من BPS Chat إلى ${store} لإتمام الشراء من المتجر.`.slice(0, 90) : "صفحة المنتج تعرض السعر والتفاصيل ورابط الشراء من المتجر.",
    "اعرف تفاصيل المنتج والسعر ثم انتقل للمتجر لإتمام عملية الشراء.",
    "BPS Chat يساعدك على الوصول لصفحة المنتج ومقارنة السعر قبل الشراء.",
  ];
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : null;

    const filePath = path.join(process.cwd(), "data", "customer_offers.json");
    const allProducts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    let products = allProducts
      .filter((p: any) => p.status === "approved")
      .filter((p: any) => String(p.country || "sa") === "sa")
      .filter((p: any) => p.product_name)
      .filter((p: any) => p.product_url);

    if (limit && Number.isFinite(limit) && limit > 0) {
      products = products.slice(0, limit);
    }

    const campaign = "BPS Products Saudi";
    const lines: string[] = [];

    lines.push(HEADERS.join("\t"));

    lines.push(row({
      Campaign: campaign,
      "Campaign Type": "Search",
      Networks: "Google search;Search Partners",
      Budget: "10.00",
      "Budget type": "Daily",
      "EU political ads": "Not specified",
      "Standard conversion goals": "Account-level",
      "Customer acquisition": "Bid equally",
      Languages: "ar;en",
      "Bid Strategy Type": "Maximize clicks",
      "Enhanced CPC": "Disabled",
      "Maximum CPC bid limit": "0.00",
      "Broad match keywords": "Off",
      "Ad rotation": "Optimize for clicks",
      "Targeting method": "Location of presence or Area of interest",
      "Exclusion method": "Location of presence",
      "Audience targeting": "Audience segments",
      "Flexible Reach": "Audience segments",
      "AI Max": "Disabled",
      "Text customization": "Disabled",
      "Final URL expansion": "Disabled",
      "Campaign Status": "Enabled",
    }));

    for (const product of products) {
      const name = cleanText(product.product_name, 80);
      const adGroup = name.slice(0, 60);
      const finalUrl = makeFinalUrl(product);
      const headlines = makeHeadlines(product);
      const descriptions = makeDescriptions(product);
      const path1 = cleanText(Array.isArray(product.category) ? product.category[0] : product.category || "products", 15);

      lines.push(row({
        Campaign: campaign,
        Languages: "All",
        "Audience targeting": "Audience segments",
        "Flexible Reach": "Audience segments;Genders;Ages;Parental status;Household incomes",
        "Ad Group": adGroup,
        "Max CPC": "0.01",
        "Max CPM": "0.01",
        "Target CPV": "0.01",
        "Target CPM": "0.01",
        "Display Network Custom Bid Type": "None",
        "Optimized targeting": "Disabled",
        "Strict age and gender targeting": "Disabled",
        "Search term matching": "Enabled",
        "Ad Group Type": "Standard",
        Channels: "[]",
        "Campaign Status": "Enabled",
        "Ad Group Status": "Enabled",
      }));

      const ad: Record<string, any> = {
        Campaign: campaign,
        "Ad Group": adGroup,
        "Final URL": finalUrl,
        "Ad type": "Responsive search ad",
        "Campaign Status": "Enabled",
        "Ad Group Status": "Enabled",
        Status: "Enabled",
        "Path 1": path1,
        "Path 2": "sa",
      };

      headlines.forEach((h, i) => {
        ad[`Headline ${i + 1}`] = h;
        ad[`Headline ${i + 1} position`] = " -";
      });

      descriptions.forEach((d, i) => {
        ad[`Description ${i + 1}`] = d;
        ad[`Description ${i + 1} position`] = " -";
      });

      lines.push(row(ad));

      for (const kw of makeKeywords(name)) {
        lines.push(row({
          Campaign: campaign,
          "Ad Group": adGroup,
          "Criterion Type": kw.t,
          Keyword: kw.k,
          "First page bid": "0.00",
          "Top of page bid": "0.00",
          "First position bid": "0.00",
          "Landing page experience": " -",
          "Expected CTR": " -",
          "Ad relevance": " -",
          "Final URL": finalUrl,
          "Campaign Status": "Enabled",
          "Ad Group Status": "Enabled",
          Status: "Enabled",
        }));
      }
    }

    const tsv = lines.join("\r\n");
    const buffer = Buffer.from("\uFEFF" + tsv, "utf16le");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "text/tab-separated-values; charset=utf-16le",
        "Content-Disposition": `attachment; filename="bps-google-ads-editor-sa.tsv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}