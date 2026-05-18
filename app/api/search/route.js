import { fetchRealProducts } from "@/lib/fetchRealProducts";
import { saveSearch } from "@/lib/saveSearch";
import { createClient } from "@supabase/supabase-js";

const CACHE_DAYS = 10;

function cleanCacheText(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ");
}

function makeCacheKey(query, country) {
  return `${String(country || "sa").toLowerCase().trim()}:${cleanCacheText(query)}`;
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function POST(req) {
  try {
    const { query, country } = await req.json();

    const cleanQuery = String(query || "").trim();
    const cleanCountry = String(country || "sa").toLowerCase().trim();

    await saveSearch(cleanQuery, cleanCountry); // 🔥 مهم جدًا

    const supabase = getSupabaseAdmin();
    const cacheKey = makeCacheKey(cleanQuery, cleanCountry);
    const now = new Date().toISOString();

    const { data: cached, error: cacheError } = await supabase
      .from("product_cache")
      .select("results")
      .eq("cache_key", cacheKey)
      .gt("expires_at", now)
      .maybeSingle();

    if (!cacheError && cached?.results?.length) {
      console.log("✅ CACHE HIT:", cacheKey);

      return Response.json({
        value: cached.results,
        cache: "hit",
      });
    }

    console.log("⚠️ CACHE MISS:", cacheKey);

    const results = await fetchRealProducts(cleanQuery, cleanCountry);

    if (Array.isArray(results) && results.length > 0) {
      const expiresAt = new Date(
        Date.now() + CACHE_DAYS * 24 * 60 * 60 * 1000
      ).toISOString();

      const { error: upsertError } = await supabase.from("product_cache").upsert(
        {
          cache_key: cacheKey,
          query: cleanCacheText(cleanQuery),
          country: cleanCountry,
          results,
          updated_at: now,
          expires_at: expiresAt,
        },
        { onConflict: "cache_key" }
      );

      if (upsertError) {
        console.error("Cache save error:", upsertError.message);
      } else {
        console.log("✅ CACHE SAVED:", cacheKey);
      }
    }

    return Response.json({
      value: results,
      cache: "miss",
    });
  } catch (err) {
    return Response.json(
      { error: "Search failed", details: err.message },
      { status: 500 }
    );
  }
}