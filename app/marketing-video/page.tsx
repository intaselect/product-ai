import { createClient } from "@supabase/supabase-js";
import VideoPreview from "./VideoPreview";

type CacheRow = {
  query: string;
  country: string;
  results: any[];
};

export default async function MarketingVideoPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: caches, error } = await supabase
    .from("product_cache")
    .select("query, country, results")
    .order("id", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Marketing video cache error:", error);

    return (
      <div style={{ color: "white", padding: 40 }}>
        Error loading cached products
      </div>
    );
  }

  if (!caches || caches.length === 0) {
    return (
      <div style={{ color: "white", padding: 40 }}>
        No cached products found
      </div>
    );
  }

  const countryNames: Record<string, string> = {
    sa: "السعودية",
    ae: "الإمارات",
    kw: "الكويت",
    qa: "قطر",
    bh: "البحرين",
    eg: "مصر",
  };

  const allProducts = (caches as CacheRow[]).flatMap((cache) => {
    const results = Array.isArray(cache.results) ? cache.results : [];

    return results.map((product) => ({
      ...product,
      searchQuery: cache.query,
      country: cache.country,
      countryName: countryNames[cache.country] || cache.country,
    }));
  });

  const cleanProducts = allProducts.filter((product) => {
    const title = product.title || product.name;
    const price = product.priceText || product.price;
    return title && price;
  });

  if (cleanProducts.length === 0) {
    return (
      <div style={{ color: "white", padding: 40 }}>
        No valid products found in cache
      </div>
    );
  }

  return (
    <VideoPreview
      query="منتجات متنوعة"
      countryName="الخليج ومصر"
      products={cleanProducts}
    />
  );
}