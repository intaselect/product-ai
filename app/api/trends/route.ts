import { NextResponse } from "next/server";

const countryConfig: Record<string, { geo: string; name: string }> = {
  sa: { geo: "SA", name: "السعودية" },
  ae: { geo: "AE", name: "الإمارات" },
  eg: { geo: "EG", name: "مصر" },
  kw: { geo: "KW", name: "الكويت" },
  qa: { geo: "QA", name: "قطر" },
  bh: { geo: "BH", name: "البحرين" },
};

const fallbackTrends: Record<string, string[]> = {
  sa: [
    "iPhone 16 Pro Max",
    "Samsung Galaxy S25 Ultra",
    "iPhone 15",
    "AirPods Pro",
    "PS5",
    "MacBook Air",
    "لابتوب HP",
    "عروض نون السعودية",
    "عروض جرير",
    "عروض اكسترا",
    "عطور رجالي",
    "ساعة ذكية",
    "سماعات بلوتوث",
    "شاشة سامسونج",
    "باور بانك",
    "قلاية هوائية",
    "غسالة LG",
    "ثلاجة سامسونج",
    "Nike shoes",
    "Apple Watch",
  ],
  ae: [
    "iPhone 16 Pro Max UAE",
    "Samsung Galaxy S25 Ultra UAE",
    "Noon UAE deals",
    "Amazon UAE offers",
    "MacBook UAE",
    "AirPods UAE",
    "PS5 UAE",
    "Apple Watch UAE",
    "Sharaf DG offers",
    "Carrefour UAE offers",
    "Dyson Airwrap UAE",
    "Perfume UAE",
    "Gaming laptop UAE",
    "Power bank UAE",
    "Smart watch UAE",
    "Bluetooth speaker UAE",
    "iPad UAE",
    "Nike shoes UAE",
    "Laptop UAE",
    "Samsung TV UAE",
  ],
  eg: [
    "سعر ايفون في مصر",
    "سعر Samsung في مصر",
    "عروض جوميا",
    "عروض أمازون مصر",
    "عروض نون مصر",
    "لابتوب HP في مصر",
    "سعر PS5 في مصر",
    "AirPods في مصر",
    "عطور في مصر",
    "سعر Oppo في مصر",
    "سعر Xiaomi في مصر",
    "سعر Realme في مصر",
    "شاشة LG في مصر",
    "غسالة في مصر",
    "تكييف في مصر",
    "باور بانك في مصر",
    "سماعات بلوتوث في مصر",
    "Apple Watch في مصر",
    "تابلت أطفال في مصر",
    "قلاية هوائية في مصر",
  ],
  kw: [
    "عروض Xcite الكويت",
    "iPhone Kuwait price",
    "Samsung Kuwait",
    "Lulu Kuwait offers",
    "Jarir Kuwait",
    "PS5 Kuwait",
    "AirPods Kuwait",
    "MacBook Kuwait",
    "Apple Watch Kuwait",
    "Laptop Kuwait",
    "Perfume Kuwait",
    "Power bank Kuwait",
    "Smart watch Kuwait",
    "Samsung TV Kuwait",
    "Gaming laptop Kuwait",
    "Nintendo Switch Kuwait",
    "iPad Kuwait",
    "Bluetooth headphones Kuwait",
    "Carrefour Kuwait offers",
    "Noon Kuwait offers",
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
    "AirPods Qatar",
    "Apple Watch Qatar",
    "Laptop Qatar",
    "Perfume Qatar",
    "Power bank Qatar",
    "Smart watch Qatar",
    "Samsung TV Qatar",
    "Gaming laptop Qatar",
    "iPad Qatar",
    "Nintendo Switch Qatar",
    "Noon Qatar offers",
    "Virgin Megastore Qatar",
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
    "MacBook Bahrain",
    "Apple Watch Bahrain",
    "Laptop Bahrain",
    "Perfume Bahrain",
    "Power bank Bahrain",
    "Smart watch Bahrain",
    "Samsung TV Bahrain",
    "Gaming laptop Bahrain",
    "iPad Bahrain",
    "Nintendo Switch Bahrain",
    "Noon Bahrain offers",
    "Bluetooth headphones Bahrain",
  ],
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
  )
    .toString()
    .replace(/\s+/g, " ")
    .trim();
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
        trends: fallbackTrends[country].map((title) => ({
          title,
          traffic: "",
          type: "product",
        })),
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
        trends: fallbackTrends[country].map((title) => ({
          title,
          traffic: "",
          type: "product",
        })),
        source: "fallback",
      });
    }

    const data = await res.json();

    const liveTrends = findLists(data)
      .map((item: any) => ({
        title: getTitle(item),
        traffic:
          item?.traffic ||
          item?.search_volume ||
          item?.volume ||
          item?.formatted_traffic ||
          item?.trend_breakdown?.[0] ||
          "",
        type: "live",
      }))
      .filter((item) => item.title);

    const productTrends = fallbackTrends[country].map((title) => ({
      title,
      traffic: "",
      type: "product",
    }));

    const merged = [...liveTrends, ...productTrends]
      .filter(
        (item, index, arr) =>
          arr.findIndex(
            (x) => x.title.toLowerCase() === item.title.toLowerCase()
          ) === index
      )
      .slice(0, 24);

    return NextResponse.json({
      country,
      countryName: cfg.name,
      trends: merged.length ? merged : productTrends,
      source: liveTrends.length ? "serpapi_mixed_products" : "fallback",
    });
  } catch {
    return NextResponse.json({
      trends: fallbackTrends.sa.map((title) => ({
        title,
        traffic: "",
        type: "product",
      })),
      source: "fallback",
    });
  }
}