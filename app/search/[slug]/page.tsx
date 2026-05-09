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

async function getSearchData(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const clean = cleanSlug(slug);

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
const countryMap: any = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};
export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const clean = cleanSlug(slug);

  const parts = clean.split("-");
  const countryCode = parts.pop();
  const query = parts.join(" ");

  const countryMap: any = {
    sa: "السعودية",
    ae: "الإمارات",
    kw: "الكويت",
    qa: "قطر",
    bh: "البحرين",
    eg: "مصر",
  };

  const countryName = countryMap[countryCode || ""] || "السعودية";

  return {
    title: `أفضل سعر ${query} في ${countryName}`,
    description: `قارن أسعار ${query} في ${countryName} واعرف أفضل العروض والمتاجر المتاحة.`,
  };
}

export default async function Page({ params }: any) {
  const { slug } = await params;

  const clean = cleanSlug(slug);
  const data = await getSearchData(slug);

  const parts = clean.split("-");
  const countryCode = parts.pop();
  const query = parts.join(" ");

  const countryName = countryMap[countryCode || ""] || countryCode;

  return (
    <main style={{ padding: "40px", color: "white", background: "#212121", minHeight: "100vh" }}>
      
      <h1>أفضل سعر {query} في {countryName}</h1>

      <p>عدد مرات البحث: {data?.search_count || 0}</p>

      <p>
        عروض {query} في {countryName} وأفضل أماكن الشراء والمتاجر المتاحة.
      </p>

    </main>
  );
}