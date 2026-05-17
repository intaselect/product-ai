import { NextResponse } from "next/server";

const countryConfig: Record<string, { geo: string; name: string }> = {
  sa: { geo: "SA", name: "السعودية" },
  ae: { geo: "AE", name: "الإمارات" },
  eg: { geo: "EG", name: "مصر" },
  kw: { geo: "KW", name: "الكويت" },
  qa: { geo: "QA", name: "قطر" },
  bh: { geo: "BH", name: "البحرين" },
};

const productKeywords = [
  "iphone",
  "ايفون",
  "samsung",
  "سامسونج",
  "galaxy",
  "xiaomi",
  "شاومي",
  "oppo",
  "reno",
  "honor",
  "هواوي",
  "huawei",
  "infinix",
  "realme",
  "laptop",
  "لاب توب",
  "macbook",
  "hp",
  "dell",
  "lenovo",
  "asus",
  "acer",
  "ps5",
  "playstation",
  "بلايستيشن",
  "airpods",
  "سماعة",
  "headphones",
  "watch",
  "ساعة",
  "perfume",
  "عطر",
  "عطور",
  "noon",
  "نون",
  "amazon",
  "أمازون",
  "jumia",
  "جوميا",
  "jarir",
  "جرير",
  "extra",
  "اكسترا",
  "carrefour",
  "كارفور",
  "xcite",
  "sharaf",
  "lulu",
];

const fallbackTrends: Record<string, string[]> = {
  sa: [
    "iPhone 17 Pro Max",
    "Samsung Galaxy S25 Ultra",
    "عروض نون السعودية",
    "عروض جرير",
    "لابتوب HP",
    "AirPods",
    "عطور رجالي",
    "PS5",
  ],
  ae: [
    "iPhone price UAE",
    "Samsung Galaxy UAE",
    "Noon UAE offers",
    "Amazon UAE deals",
    "Sharaf DG offers",
    "Carrefour UAE offers",
    "MacBook UAE",
    "AirPods UAE",
  ],
  eg: [
    "سعر ايفون في مصر",
    "سعر سامسونج في مصر",
    "عروض جوميا",
    "عروض أمازون مصر",
    "عروض نون مصر",
    "لابتوب HP في مصر",
    "سعر PS5 في مصر",
    "عطور في مصر",
  ],
  kw: [
    "عروض Xcite الكويت",
    "iPhone Kuwait price",
    "Samsung Kuwait",
    "Lulu Kuwait offers",
    "Jarir Kuwait",
    "Best Al-Yousifi offers",
    "PS5 Kuwait",
    "عطور الكويت",
  ],
  qa: [
    "iPhone Qatar price",
    "Samsung Qatar",
    "Carrefour Qatar offers",
    "Lulu Qatar offers",
    "Jarir Qatar",
    "Al Anees Qatar",
    "PS5 Qatar",
    "MacBook Qatar",
  ],
  bh: [
    "iPhone Bahrain price",
    "Samsung Bahrain",
    "Sharaf DG Bahrain",
    "eXtra Bahrain offers",
    "Lulu Bahrain offers",
    "Carrefour Bahrain",
    "PS5 Bahrain",
    "AirPods Bahrain",
  ],
};

function normalizeTrendTitle(item: any): string {
  if (typeof item === "string") return item;

  return (
    item?.query ||
    item?.title ||
    item?.search_term ||
    item?.name ||
    item?.keyword ||
    item?.trend ||
    ""
  )
    .toString()
    .replace(/\s+/g, " ")
    .trim();
}

function extractTrends(data: any) {
  const possibleLists = [
    data?.trending_searches,
    data?.trending_now,
    data?.daily_searches,
    data?.searches,
    data?.results,
  ];

  const list = possibleLists.find((x) => Array.isArray(x)) || [];

  return list
    .map((item: any) => {
      const title = normalizeTrendTitle(item);

      return {
        title,
        traffic:
          item?.traffic ||
          item?.search_volume ||
          item?.volume ||
          item?.formatted_traffic ||
          "",
      };
    })
    .filter((item: any) => item.title);
}

function isProductTrend(title: string) {
  const lower = title.toLowerCase();

  return productKeywords.some((word) => lower.includes(word.toLowerCase()));
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const country = searchParams.get("country") || "sa";
    const hours = searchParams.get("hours") || "24";

    const cfg = countryConfig[country] || countryConfig.sa;

    const apiKey = process.env.SERPAPI_API_KEY || process.env.SERPAPI_KEY;

    if (!apiKey) {
      return NextResponse.json({
        country,
        countryName: cfg.name,
        trends: fallbackTrends[country] || fallbackTrends.sa,
        source: "fallback",
      });
    }

    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google_trends_trending_now");
    url.searchParams.set("geo", cfg.geo);
    url.searchParams.set("hours", hours);
    url.searchParams.set("api_key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!res.ok) {
      return NextResponse.json({
        country,
        countryName: cfg.name,
        trends: fallbackTrends[country] || fallbackTrends.sa,
        source: "fallback",
      });
    }

    const data = await res.json();

    const realTrends = extractTrends(data)
      .filter((item: any) => isProductTrend(item.title))
      .slice(0, 20);

    const trends =
      realTrends.length > 0
        ? realTrends
        : (fallbackTrends[country] || fallbackTrends.sa).map((title) => ({
            title,
            traffic: "",
          }));

    return NextResponse.json({
      country,
      countryName: cfg.name,
      trends,
      source: realTrends.length > 0 ? "serpapi" : "fallback",
    });
  } catch (error) {
    console.error("Trends route error:", error);

    return NextResponse.json({
      trends: fallbackTrends.sa.map((title) => ({ title, traffic: "" })),
      source: "fallback",
    });
  }
}