import { createClient } from "@supabase/supabase-js";

function cleanSlug(slug: string) {
  return decodeURIComponent(slug)
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-");
}

const countryMap: any = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

function parseSlug(slug: string) {
  const clean = cleanSlug(slug);
  const parts = clean.split("-");
  const countryCode = parts.pop() || "sa";
  const query = parts.join(" ");

  return {
    clean,
    countryCode,
    query,
    countryName: countryMap[countryCode] || countryCode,
  };
}

async function getSearchData(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { clean } = parseSlug(slug);

  const { data, error } = await supabase
    .from("search_terms")
    .select("*")
    .eq("slug", clean)
    .maybeSingle();

  if (error) {
    console.error("SEO page Supabase error:", error);
  }

  return data;
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const { query, countryName } = parseSlug(slug);

  return {
    title: `أفضل سعر ${query} في ${countryName}`,
    description: `قارن أسعار ${query} في ${countryName} واعرف أفضل العروض والمتاجر المتاحة.`,
  };
}

export default async function Page({ params }: any) {
  const { slug } = await params;
  const { query, countryName } = parseSlug(slug);
  const data = await getSearchData(slug);

  return (
    <main style={{ padding: "40px", color: "white", background: "#212121", minHeight: "100vh" }}>
      <h1>أفضل سعر {data?.query || query} في {countryName}</h1>

      <p>عدد مرات البحث: {data?.search_count || 0}</p>

      <p>
        عروض {data?.query || query} في {countryName} وأفضل أماكن الشراء والمتاجر المتاحة.
      </p>
    </main>
  );
}