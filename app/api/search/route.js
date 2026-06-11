import { fetchRealProducts } from "@/lib/fetchRealProducts";
import { saveSearch } from "@/lib/saveSearch";
import { createClient } from "@supabase/supabase-js";

const CACHE_DAYS = 10;
function getClientIP(req) {
  const xff = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const vercelIp = req.headers.get("x-vercel-forwarded-for");
  const cfIp = req.headers.get("cf-connecting-ip");

  if (xff) return xff.split(",")[0].trim();
  if (vercelIp) return vercelIp.split(",")[0].trim();
  if (realIp) return realIp;
  if (cfIp) return cfIp;

  return "unknown";
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
async function fetchBpsStoreOffers(supabase, query, country) {
  const q = cleanCacheText(query);
  if (!q || q === "*") return [];

  const words = q.split(" ").filter(Boolean).slice(0, 5);

  const orParts = words.flatMap((word) => [
    `product_name.ilike.%${word}%`,
    `store_name.ilike.%${word}%`,
  ]);

  const { data, error } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, product_url, store_name, country, category, created_at")
    .eq("status", "approved")
    .eq("country", country)
    .or(orParts.join(","))
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("BPS store offers error:", error.message);
    return [];
  }

  return (data || []).map((item) => ({
    id: `bps-${item.id}`,
    title: item.product_name,
    name: item.product_name,
    priceText: item.price,
    price: item.price,
    image: item.image_url,
    url: `/api/customer-offers/click/${item.id}`,
    link: `/api/customer-offers/click/${item.id}`,
    store: item.store_name || "BPS Chat Market",
    source: item.store_name || "BPS Chat Market",
    country: item.country,
    isBpsOffer: true,
  }));
}

function removeDuplicateProducts(products) {
  const seen = new Set();

  return (products || []).filter((item) => {
    const key = cleanCacheText(
      item?.url || item?.link || item?.title || item?.name || ""
    );

    if (!key || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
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
const ADMIN_EMAILS = ["gospstudio2030@gmail.com"];
const userEmail = req.headers.get("x-bps-user-email");
const isAdmin = ADMIN_EMAILS.includes(userEmail || "");

const rawIp = getClientIP(req);
const realIp = rawIp && rawIp !== "unknown" ? rawIp : null;
const visitorId = req.headers.get("x-bps-visitor-id");
await supabase.from("analytics_events").insert({
  visitor_id: visitorId || "unknown",
  session_id: "search",
  event_type: "search",
  query: cleanQuery,
  country: cleanCountry,
  path: "/api/search",
  referrer: req.headers.get("referer") || "",
  user_agent: req.headers.get("user-agent") || "",
});

const searchKey = realIp || (visitorId ? `visitor:${visitorId}` : "unknown");

console.log("USER IP:", realIp || "unknown");
console.log("SEARCH KEY:", searchKey);
const today = new Date().toISOString().slice(0, 10);
const minuteBucket = new Date().toISOString().slice(0, 16);

const { count: dailyCount } = await supabase
  .from("search_rate_limits")
  .select("*", { count: "exact", head: true })
  .eq("ip", searchKey)
  .eq("day", today);

const HARD_BLOCK_LIMIT = 15;

if ((dailyCount || 0) >= HARD_BLOCK_LIMIT) {
  console.log("🚫 HARD BLOCKED:", searchKey);

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
    const origin = req.headers.get("origin") || "";
const referer = req.headers.get("referer") || "";
const isFromSite =
  origin.includes("bpschat.com") || referer.includes("bpschat.com");

if (!visitorId || !isFromSite) {
  console.log("🚫 BOT BLOCKED BEFORE SERPAPI:", searchKey);

  return Response.json({
    value: [],
    message: "طلب غير موثوق.",
    blocked: true,
    remainingSearches,
    limit: DAILY_LIMIT,
  });
}

const { count: minuteCount } = await supabase
  .from("search_rate_limits")
  .select("*", { count: "exact", head: true })
  .eq("ip", searchKey)
  .eq("minute_bucket", minuteBucket);

// 🚫 لو بوت
if (!isAdmin && (dailyCount || 0) >= DAILY_LIMIT) {
 return Response.json({
  value: [],
  message: "لقد وصلت للحد اليومي 10 عمليات بحث جديدة، جرّب غدًا أو استخدم نتائج الكاش.",
  blocked: true,
  remainingSearches: 0,
  limit: DAILY_LIMIT,
});
}

if (!isAdmin && (minuteCount || 0) >= MINUTE_LIMIT) {
  return Response.json({
  value: [],
  message: "طلبات سريعة جدًا، استنى دقيقة وجرب تاني.",
  blocked: true,
  remainingSearches,
  limit: DAILY_LIMIT,
});
}
let results = [];

if (searchKey === "unknown") {
  console.log("🚫 BOT BLOCKED: no IP and no visitorId");
  results = [];
} else {
  const bpsOffers = await fetchBpsStoreOffers(
    supabase,
    cleanQuery,
    cleanCountry
  );

  const realProducts = await fetchRealProducts(
    cleanQuery,
    cleanCountry,
    realIp || searchKey
  );

  results = removeDuplicateProducts([
    ...bpsOffers,
    ...(Array.isArray(realProducts) ? realProducts : []),
  ]);
}
    // ✅ نسجل الطلب
await supabase.from("search_rate_limits").insert({
  ip: searchKey,
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
  ip: realIp || searchKey,
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