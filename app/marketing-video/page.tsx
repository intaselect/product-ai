import { createClient } from "@supabase/supabase-js";
import VideoPreview from "./VideoPreview";

export default async function MarketingVideoPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: trends } = await supabase
    .from("search_terms")
    .select("query, country, slug, search_count")
    .order("search_count", { ascending: false })
    .limit(1);

  const trend = trends?.[0];

  if (!trend) {
    return <div style={{ color: "white", padding: 40 }}>No trends found</div>;
  }

  // مهم: غيّر اسم الجدول واسم العمود حسب جدول الكاش عندك
  const { data: cache } = await supabase
  .from("product_cache")
  .select("results")
  .eq("query", trend.query)
  .eq("country", trend.country)
  .maybeSingle();

  const countryNames: Record<string, string> = {
    sa: "السعودية",
    ae: "الإمارات",
    kw: "الكويت",
    qa: "قطر",
    bh: "البحرين",
    eg: "مصر",
  };

  return (
    <VideoPreview
      query={trend.query}
      countryName={countryNames[trend.country] || trend.country}
      products={cache?.results || []}
    />
  );
}