import { NextResponse } from "next/server";

const countryConfig: Record<
  string,
  { gl: string; hl: string; google_domain: string; countryName: string }
> = {
  sa: { gl: "sa", hl: "ar", google_domain: "google.com.sa", countryName: "السعودية" },
  ae: { gl: "ae", hl: "ar", google_domain: "google.ae", countryName: "الإمارات" },
  eg: { gl: "eg", hl: "ar", google_domain: "google.com.eg", countryName: "مصر" },
  kw: { gl: "kw", hl: "ar", google_domain: "google.com.kw", countryName: "الكويت" },
  qa: { gl: "qa", hl: "ar", google_domain: "google.com.qa", countryName: "قطر" },
  bh: { gl: "bh", hl: "ar", google_domain: "google.com.bh", countryName: "البحرين" },
};

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = cleanText(searchParams.get("q") || "");
    const country = searchParams.get("country") || "sa";

    if (!q || q.length < 2) {
      return NextResponse.json({ videos: [] });
    }

    const apiKey = process.env.SERPAPI_API_KEY || process.env.SERPAPI_KEY;

    if (!apiKey) {
      return NextResponse.json({ videos: [] });
    }

    const cfg = countryConfig[country] || countryConfig.sa;

    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "youtube");
    url.searchParams.set("search_query", `${q} مراجعة سعر عيوب مميزات ${cfg.countryName}`);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("gl", cfg.gl);
    url.searchParams.set("hl", cfg.hl);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      console.error("YouTube reviews API error:", res.status);
      return NextResponse.json({ videos: [] });
    }

    const data = await res.json();

    const raw =
      data?.video_results ||
      data?.organic_results ||
      data?.results ||
      [];

    const videos = raw
      .map((item: any) => ({
        title: cleanText(item?.title || ""),
        link: item?.link || item?.url || "",
        thumbnail:
          item?.thumbnail?.static ||
          item?.thumbnail ||
          item?.thumbnail_url ||
          "",
        channel:
          item?.channel?.name ||
          item?.channel ||
          item?.source ||
          "",
        views: item?.views || "",
        published: item?.published_date || item?.date || "",
        description: cleanText(item?.description || item?.snippet || ""),
      }))
      .filter((video: any) => video.title && video.link)
      .slice(0, 6);

    return NextResponse.json({
      q,
      country,
      videos,
    });
  } catch (error) {
    console.error("YouTube reviews route error:", error);
    return NextResponse.json({ videos: [] });
  }
}