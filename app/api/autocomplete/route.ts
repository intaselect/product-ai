import { NextResponse } from "next/server";

const countryConfig: Record<
  string,
  { gl: string; hl: string; google_domain: string; countryName: string }
> = {
  sa: {
    gl: "sa",
    hl: "ar",
    google_domain: "google.com.sa",
    countryName: "السعودية",
  },
  ae: {
    gl: "ae",
    hl: "ar",
    google_domain: "google.ae",
    countryName: "الإمارات",
  },
  eg: {
    gl: "eg",
    hl: "ar",
    google_domain: "google.com.eg",
    countryName: "مصر",
  },
  kw: {
    gl: "kw",
    hl: "ar",
    google_domain: "google.com.kw",
    countryName: "الكويت",
  },
  qa: {
    gl: "qa",
    hl: "ar",
    google_domain: "google.com.qa",
    countryName: "قطر",
  },
  bh: {
    gl: "bh",
    hl: "ar",
    google_domain: "google.com.bh",
    countryName: "البحرين",
  },
};

const productIntentWords = [
  "سعر",
  "أفضل سعر",
  "عروض",
  "خصومات",
  "مقارنة سعر",
  "أرخص",
];

function cleanSuggestion(value: string) {
  return value
    .replace(/<\/?b>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = (searchParams.get("q") || "").trim();
    const country = searchParams.get("country") || "sa";

    if (!q || q.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const apiKey = process.env.SERPAPI_API_KEY || process.env.SERPAPI_KEY;

    if (!apiKey) {
      console.warn("SERPAPI key missing in autocomplete route");
      return NextResponse.json({ suggestions: [] });
    }

    const cfg = countryConfig[country] || countryConfig.sa;

    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google_autocomplete");
    url.searchParams.set("q", q);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("gl", cfg.gl);
    url.searchParams.set("hl", cfg.hl);
    url.searchParams.set("google_domain", cfg.google_domain);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      console.error("Autocomplete API error:", res.status);
      return NextResponse.json({ suggestions: [] });
    }

    const data = await res.json();

    const googleSuggestions =
      data?.suggestions
        ?.map((item: any) =>
          cleanSuggestion(item?.value || item?.suggestion || item?.term || "")
        )
        .filter(Boolean) || [];

    const seoSuggestions = productIntentWords.map(
      (word) => `${word} ${q} في ${cfg.countryName}`
    );

    const mixed = [...googleSuggestions, ...seoSuggestions];

    const unique = Array.from(new Set(mixed))
      .filter((item) => item.length > 1)
      .slice(0, 10);

    return NextResponse.json({
      suggestions: unique,
      country,
    });
  } catch (error) {
    console.error("Autocomplete route error:", error);
    return NextResponse.json({ suggestions: [] });
  }
}