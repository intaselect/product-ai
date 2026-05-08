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

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const clean = cleanSlug(slug);

  return {
    title: `أفضل سعر ${clean.replace(/-/g, " ")} في السعودية والخليج`,
    description: `قارن أسعار ${clean.replace(/-/g, " ")} في السعودية والخليج واعرف أفضل العروض والمتاجر.`,
  };
}

export default async function Page({ params }: any) {
  const { slug } = await params;
  const clean = cleanSlug(slug);
  const data = await getSearchData(slug);

  return (
    <main style={{ padding: "40px", color: "white", background: "#212121", minHeight: "100vh" }}>
      <h1>نتائج البحث عن: {data?.query || clean.replace(/-/g, " ")}</h1>

      <p>عدد مرات البحث: {data?.search_count || 0}</p>

      <p>هذه صفحة مخصصة لتحسين ظهور البحث في جوجل.</p>
    </main>
  );
}