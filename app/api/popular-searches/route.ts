import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

function slugFromCacheKey(cacheKey: string) {
  const [country, ...queryParts] = String(cacheKey || "").split(":");
  const query = queryParts.join(":");

  const slug =
    query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "") +
    "-" +
    country;

  return {
    query,
    country,
    slug,
  };
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 🔥 أحدث عمليات البحث من product_cache فقط
  const { data: cacheData } = await supabase
    .from("product_cache")
    .select("cache_key, query, country, updated_at, results")
    .not("results", "eq", "[]")
    .order("updated_at", { ascending: false })
    .limit(200);

  const map = new Map();

  (cacheData || []).forEach((item: any) => {
    if (!item.cache_key) return;
    if (!Array.isArray(item.results) || item.results.length === 0) return;

    const parsed = slugFromCacheKey(item.cache_key);
    const key = item.cache_key;

    map.set(key, {
      query: parsed.query || item.query,
      country: parsed.country || item.country,
      slug: parsed.slug,
      updated_at: item.updated_at,
    });
  });

  let searches = Array.from(map.values());

  searches.sort((a: any, b: any) => {
    return (
      new Date(b.updated_at || 0).getTime() -
      new Date(a.updated_at || 0).getTime()
    );
  });

  return NextResponse.json(
    { searches },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}