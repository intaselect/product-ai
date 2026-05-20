import { fetchRealProducts } from "@/lib/fetchRealProducts";
import { saveSearch } from "@/lib/saveSearch";
import { createClient } from "@supabase/supabase-js";

const CACHE_DAYS = 10;
function getClientIP(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
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
    const DAILY_LIMIT = 10;
const MINUTE_LIMIT = 5;

const ip = getClientIP(req);
console.log("USER IP:", ip);
const today = new Date().toISOString().slice(0, 10);
const minuteBucket = new Date().toISOString().slice(0, 16);

const threeDaysAgo = new Date(
  Date.now() - 3 * 24 * 60 * 60 * 1000
).toISOString();
const { count: dailyCount } = await supabase
  .from("product_cache")
  .select("*", { count: "exact", head: true })
  .eq("ip", ip)
  .gte("created_at", threeDaysAgo);

const HARD_BLOCK_LIMIT = 15;

if ((dailyCount || 0) >= HARD_BLOCK_LIMIT) {
  console.log("🚫 HARD BLOCKED IP:", ip);

  return Response.json({
    value: [],
    message: "تم حظر هذا المستخدم بسبب استخدام مفرط.",
    blocked: true,
    remainingSearches: 0,
    limit: DAILY_LIMIT,
  });
}

const remainingSearches = Math.max(0, DAILY_LIMIT - (dailyCount || 0));
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
  remainingSearches,
  limit: DAILY_LIMIT,
});
    }

    console.log("⚠️ CACHE MISS:", cacheKey);

const { count: minuteCount } = await supabase
  .from("search_rate_limits")
  .select("*", { count: "exact", head: true })
  .eq("ip", ip)
  .eq("minute_bucket", minuteBucket);

// 🚫 لو بوت
if ((dailyCount || 0) >= DAILY_LIMIT) {
 return Response.json({
  value: [],
  message: "لقد وصلت للحد اليومي 10 عمليات بحث جديدة، جرّب غدًا أو استخدم نتائج الكاش.",
  blocked: true,
  remainingSearches: 0,
  limit: DAILY_LIMIT,
});
}

if ((minuteCount || 0) >= MINUTE_LIMIT) {
  return Response.json({
  value: [],
  message: "طلبات سريعة جدًا، استنى دقيقة وجرب تاني.",
  blocked: true,
  remainingSearches,
  limit: DAILY_LIMIT,
});
}
  let results = [];

results = await fetchRealProducts(cleanQuery, cleanCountry, ip);
    // ✅ نسجل الطلب
await supabase.from("search_rate_limits").insert({
  ip,
  day: today,
  minute_bucket: minuteBucket,
  query: cleanQuery,
  country: cleanCountry,
});
const remainingAfterSearch = Math.max(
  0,
  DAILY_LIMIT - ((dailyCount || 0) + (Array.isArray(results) && results.length > 0 ? 1 : 0))
);
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
  ip,
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
  remainingSearches: remainingAfterSearch,
  limit: DAILY_LIMIT,
});
  } catch (err) {
    return Response.json(
      { error: "Search failed", details: err.message },
      { status: 500 }
    );
    
  }
}