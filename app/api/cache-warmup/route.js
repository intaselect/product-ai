import { fetchRealProducts } from "@/lib/fetchRealProducts";
import { createClient } from "@supabase/supabase-js";

const CACHE_DAYS = 10;
const DEFAULT_LIMIT = 20;

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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const secret = searchParams.get("secret");
    const limit = Number(searchParams.get("limit") || DEFAULT_LIMIT);

    if (secret !== process.env.CACHE_WARMUP_SECRET) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data: searches, error } = await supabase
      .from("search_terms")
      .select("query, country, search_count")
      .order("search_count", { ascending: false })
      .limit(Math.min(limit, 30));

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const report = [];

    for (const item of searches || []) {
      const query = item.query;
      const country = item.country || "sa";
      const cacheKey = makeCacheKey(query, country);
      const now = new Date().toISOString();

      const { data: existing } = await supabase
        .from("product_cache")
        .select("id")
        .eq("cache_key", cacheKey)
        .gt("expires_at", now)
        .maybeSingle();

      if (existing) {
        report.push({ query, country, status: "already_cached" });
        continue;
      }

      const results = await fetchRealProducts(query, country);

      if (!Array.isArray(results) || results.length === 0) {
        report.push({ query, country, status: "no_results" });
        continue;
      }

      const expiresAt = new Date(
        Date.now() + CACHE_DAYS * 24 * 60 * 60 * 1000
      ).toISOString();

      const { error: saveError } = await supabase.from("product_cache").upsert(
        {
          cache_key: cacheKey,
          query: cleanCacheText(query),
          country,
          results,
          updated_at: now,
          expires_at: expiresAt,
        },
        { onConflict: "cache_key" }
      );

      report.push({
        query,
        country,
        status: saveError ? "save_error" : "cached",
        results: results.length,
      });
    }

    return Response.json({
      ok: true,
      processed: report.length,
      report,
    });
  } catch (err) {
    return Response.json(
      { error: "Warmup failed", details: err.message },
      { status: 500 }
    );
  }
}