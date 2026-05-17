import { NextResponse } from "next/server";

const countryConfig: Record<string, { geo: string; name: string }> = {
  sa: { geo: "SA", name: "السعودية" },
  ae: { geo: "AE", name: "الإمارات" },
  eg: { geo: "EG", name: "مصر" },
  kw: { geo: "KW", name: "الكويت" },
  qa: { geo: "QA", name: "قطر" },
  bh: { geo: "BH", name: "البحرين" },
};

const productWords = [
  "iphone", "ايفون", "samsung", "سامسونج", "galaxy", "xiaomi", "شاومي",
  "oppo", "honor", "huawei", "realme", "infinix", "laptop", "لاب توب",
  "macbook", "hp", "dell", "lenovo", "asus", "acer", "airpods", "سماعة",
  "watch", "ساعة", "ps5", "playstation", "بلايستيشن", "perfume", "عطر",
  "عطور", "noon", "نون", "amazon", "أمازون", "jumia", "جوميا", "jarir",
  "جرير", "extra", "اكسترا", "carrefour", "كارفور", "xcite", "sharaf", "lulu",
  "عروض", "خصومات", "سعر",
];

const fallbackTrends: Record<string, string[]> = {
  sa: ["iPhone 16 Pro Max", "Samsung Galaxy S25 Ultra", "عروض نون السعودية", "عروض جرير", "AirPods", "PS5", "عطور رجالي", "لابتوب HP"],
  ae: ["iPhone price UAE", "Noon UAE deals", "Amazon UAE offers", "Samsung UAE", "MacBook UAE", "AirPods UAE", "Sharaf DG offers", "PS5 UAE"],
  eg: ["سعر ايفون في مصر", "عروض جوميا", "عروض أمازون مصر", "Samsung A series", "لابتوب HP في مصر", "سعر PS5 في مصر", "عروض نون مصر", "عطور في مصر"],
  kw: ["عروض Xcite الكويت", "iPhone Kuwait price", "Samsung Kuwait", "Lulu Kuwait offers", "Jarir Kuwait", "PS5 Kuwait", "AirPods Kuwait", "عطور الكويت"],
  qa: ["iPhone Qatar price", "Samsung Qatar", "Carrefour Qatar offers", "Lulu Qatar offers", "Jarir Qatar", "Al Anees Qatar", "PS5 Qatar", "MacBook Qatar"],
  bh: ["iPhone Bahrain price", "Samsung Bahrain", "Sharaf DG Bahrain", "eXtra Bahrain offers", "Lulu Bahrain offers", "Carrefour Bahrain", "PS5 Bahrain", "AirPods Bahrain"],
};

function getTitle(item: any) {
  if (typeof item === "string") return item;

  return (
    item?.query ||
    item?.title ||
    item?.search_term ||
    item?.name ||
    item?.keyword ||
    item?.trend ||
    item?.topic ||
    ""
  ).toString().replace(/\s+/g, " ").trim();
}

function findLists(obj: any): any[] {
  const lists: any[] = [];

  function walk(value: any) {
    if (!value) return;

    if (Array.isArray(value)) {
      if (value.length && value.some((x) => getTitle(x))) {
        lists.push(value);
      }

      value.forEach(walk);
      return;
    }

    if (typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  }

  walk(obj);
  return lists.flat();
}

function isProductLike(title: string) {
  const lower = title.toLowerCase();
  return productWords.some((word) => lower.includes(word.toLowerCase()));
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
        trends: fallbackTrends[country].map((title) => ({ title, traffic: "" })),
        source: "fallback",
      });
    }

    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google_trends_trending_now");
    url.searchParams.set("geo", cfg.geo);
    url.searchParams.set("hours", hours);
    url.searchParams.set("api_key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 3 },
    });

    if (!res.ok) {
      return NextResponse.json({
        country,
        countryName: cfg.name,
        trends: fallbackTrends[country].map((title) => ({ title, traffic: "" })),
        source: "fallback",
      });
    }

    const data = await res.json();

    const all = findLists(data)
      .map((item: any) => ({
        title: getTitle(item),
        traffic:
          item?.traffic ||
          item?.search_volume ||
          item?.volume ||
          item?.formatted_traffic ||
          item?.trend_breakdown?.[0] ||
          "",
      }))
      .filter((item) => item.title);

    const productTrends = all.filter((item) => isProductLike(item.title));

    const finalTrends = (productTrends.length ? productTrends : all)
      .filter((item, index, arr) => arr.findIndex((x) => x.title === item.title) === index)
      .slice(0, 12);

    return NextResponse.json({
      country,
      countryName: cfg.name,
      trends:
        finalTrends.length > 0
          ? finalTrends
          : fallbackTrends[country].map((title) => ({ title, traffic: "" })),
      source: finalTrends.length > 0 ? "serpapi" : "fallback",
    });
  } catch {
    return NextResponse.json({
      trends: fallbackTrends.sa.map((title) => ({ title, traffic: "" })),
      source: "fallback",
    });
  }
}