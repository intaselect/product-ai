import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { createClient } from "@supabase/supabase-js";
import { loadEnvConfig } from "@next/env";
import path from "path";

loadEnvConfig(process.cwd());

type CacheRow = {
  query: string;
  country: string;
  results: any[];
};

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const run = async () => {
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
    throw new Error(`Supabase error: ${error.message}`);
  }

  const products =
    (caches as CacheRow[] | null)?.flatMap((cache) => {
      const results = Array.isArray(cache.results) ? cache.results : [];

      return results.map((product) => ({
        ...product,
        searchQuery: cache.query,
        country: cache.country,
        countryName: countryNames[cache.country] || cache.country,
      }));
    }) || [];

  const cleanProducts = products
    .filter((p) => (p.title || p.name) && (p.priceText || p.price))
    .slice(0, 25);

  console.log(`✅ Products loaded: ${cleanProducts.length}`);

  const entry = path.join(process.cwd(), "remotion/index.tsx");

  const bundleLocation = await bundle({
    entryPoint: entry,
  });

  const inputProps = {
    query: "منتجات متنوعة",
    countryName: "الخليج ومصر",
    products: cleanProducts,
  };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "MarketingVideo",
    inputProps,
  });

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: path.join(process.cwd(), "public/bps-video.mp4"),
    inputProps,
  });

  console.log("✅ Video rendered: public/bps-video.mp4");
};

run();