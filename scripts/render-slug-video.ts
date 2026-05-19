import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { createClient } from "@supabase/supabase-js";
import nextEnv from "@next/env";
import path from "path";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

function cleanSlug(slug: string) {
  return decodeURIComponent(slug)
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-");
}

const countryNames: Record<string, string> = {
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
  const country = parts.pop() || "sa";
  const query = parts.join(" ");

  return {
    clean,
    query,
    country,
    countryName: countryNames[country] || country,
  };
}

const run = async () => {
  const inputSlug = process.argv[2];

  if (!inputSlug) {
    console.log("❌ اكتب slug بعد الأمر");
    console.log('مثال: npx ts-node scripts/render-slug-video.ts "أفضل-هاتف-للألعاب-bh"');
    return;
  }

  const { clean, query, country, countryName } = parseSlug(inputSlug);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const cacheKey = `${country}:${query.toLowerCase().trim()}`;

  console.log("🔎 Query:", query);
  console.log("🌍 Country:", countryName);
  console.log("🧠 Cache key:", cacheKey);

  const { data: cache, error } = await supabase
    .from("product_cache")
    .select("results")
    .eq("cache_key", cacheKey)
    .maybeSingle();

  if (error) {
    console.error("❌ Supabase error:", error.message);
    return;
  }

  const products = cache?.results || [];

  if (!products.length) {
    console.log("❌ مفيش منتجات في الكاش للصفحة دي");
    console.log("مهم: افتح صفحة الصلاج الأول مرة واحدة عشان تعمل كاش، وبعدها شغّل السكريبت تاني.");
    return;
  }

  console.log(`✅ Products loaded: ${products.length}`);

  const entry = path.join(process.cwd(), "remotion/index.tsx");

  const bundleLocation = await bundle({
    entryPoint: entry,
  });

  const inputProps = {
    query,
    countryName,
    products,
  };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "MarketingVideo",
    inputProps,
  });

  const outputName = `${clean}-bpschat.mp4`;
  const outputLocation = path.join(process.cwd(), "public", outputName);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
  });

  console.log(`✅ Video rendered: public/${outputName}`);
};

run();