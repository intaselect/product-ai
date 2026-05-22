import { createClient } from "@supabase/supabase-js";

console.log("VERSION 9 GCC SAFE FIX");

const CACHE_DAYS = 10;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

export async function fetchRealProducts(query, country = "sa", ip = null)  {
  const apiKey = process.env.SERPAPI_KEY;
 

  const cleanQuery = String(query || "").trim();
  const cleanCountry = String(country || "sa").toLowerCase().trim();
  const cacheKey = makeCacheKey(cleanQuery, cleanCountry);
  const now = new Date().toISOString();

  const { data: cached } = await supabase
    .from("product_cache")
    .select("results")
    .eq("cache_key", cacheKey)
    .gt("expires_at", now)
    .maybeSingle();

  if (cached?.results?.length) {
    console.log("✅ FETCHREAL CACHE HIT:", cacheKey);
    return cached.results;
  }

  async function saveResultsToCache(results) {
    if (!Array.isArray(results) || results.length === 0) return;

    const expiresAt = new Date(
      Date.now() + CACHE_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();

    const { error } = await supabase.from("product_cache").upsert(
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

    if (error) console.error("Cache save error:", error.message);
  }

  function cleanPrice(priceText) {
    if (!priceText) return 0;
    const cleaned = priceText.toString().replace(/[^0-9.]/g, "").trim();
    const value = parseFloat(cleaned);
    return isNaN(value) ? 0 : value;
  }

  function isLikelyInstallment(item) {
    const text = `${item.title || ""} ${item.source || ""}`.toLowerCase();

    return (
      text.includes("monthly") ||
      text.includes("installment") ||
      text.includes("تقسيط") ||
      text.includes("plan") ||
      text.includes("carrier")
    );
  }

  function mapShoppingResults(results, country) {
    const currencyMap = {
      sa: "SAR",
      ae: "AED",
      kw: "KWD",
      qa: "QAR",
      bh: "BHD",
      eg: "EGP",
       iq: "IQD", // جديد
  om: "OMR", // جديد
    };

    const currency = currencyMap[country] || "SAR";

    return (results || [])
      .filter((item) => !isLikelyInstallment(item))
      .map((item, i) => {
        const price = cleanPrice(
          item.extracted_price ?? item.extracted_price_from ?? item.price
        );

        return {
          id: String(i + 1),
          title: item.title || "No title",
          price,
          priceText: price ? `${price.toLocaleString("en-US")} ${currency}` : "",
          store: item.source || "Unknown",
          image: item.thumbnail || "",
          url: item.link || item.product_link || item.serpapi_product_api || null,
        };
      });
  }

  async function fetchJsonSafe(url, ms = 8000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);

    try {
      console.log("SERPAPI URL:", url);

      const res = await fetch(url, { signal: controller.signal });
      const text = await res.text();

      clearTimeout(timeout);

      if (!res.ok) {
        console.log("SERPAPI HTTP ERROR:", res.status);
        console.log("SERPAPI ERROR BODY:", text);
        return null;
      }

      return JSON.parse(text);
    } catch (error) {
      clearTimeout(timeout);
      console.log("SERPAPI FETCH ERROR:", error?.message || error);
      return null;
    }
  }

  async function fetchGccShopping(query, country) {
    const config = {
      kw: { gl: "ae", google_domain: "google.com.kw" },
      qa: { gl: "us", google_domain: "google.com.qa" },
      bh: { gl: "ae", google_domain: "google.com.bh" },
      eg: { gl: "eg", google_domain: "google.com.eg" },
    };

    const current = config[country];
    if (!current || !apiKey) return [];

    const shoppingUrl = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}&gl=${current.gl}&hl=ar&google_domain=${
      current.google_domain
    }`;

    const data = await fetchJsonSafe(shoppingUrl, 8000);
    const shoppingResults = data?.shopping_results || [];

    return mapShoppingResults(shoppingResults, country)
      .filter((item) => item.url && item.title)
      .map((item) => ({
        ...item,
        image:
          item.image ||
          `https://placehold.co/400x400?text=${encodeURIComponent(query)}`,
        priceText: item.priceText || "—",
      }));
  }

  if (!apiKey) return [];

  // ✅ السعودية بدون تغيير
  if (cleanCountry === "sa") {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        cleanQuery
      )}&api_key=${apiKey}&gl=sa&hl=ar&google_domain=google.com.sa&location=Saudi%20Arabia`
    );

    const data = await res.json();
    if (!data.shopping_results) return [];

    const results = mapShoppingResults(data.shopping_results, "sa").map((item) => ({
      ...item,
      image:
        item.image ||
        `https://placehold.co/400x400?text=${encodeURIComponent(cleanQuery)}`,
    }));

    await saveResultsToCache(results);
    return results;
  }

  // ✅ الإمارات بدون تغيير
  if (cleanCountry === "ae") {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        cleanQuery
      )}&api_key=${apiKey}&gl=ae&hl=ar&google_domain=google.ae&location=United%20Arab%20Emirates`
    );

    const data = await res.json();
    if (!data.shopping_results) return [];

    const results = mapShoppingResults(data.shopping_results, "ae").map((item) => ({
      ...item,
      image:
        item.image ||
        `https://placehold.co/400x400?text=${encodeURIComponent(cleanQuery)}`,
    }));

    await saveResultsToCache(results);
    return results;
  }

  // ✅ الكويت - معدل فقط
  if (cleanCountry === "kw") {
    const results = await fetchGccShopping(cleanQuery, "kw");
    await saveResultsToCache(results);
    return results;
  }

  // ✅ قطر - معدل فقط
  if (cleanCountry === "qa") {
    const results = await fetchGccShopping(cleanQuery, "qa");
    await saveResultsToCache(results);
    return results;
  }

  // ✅ البحرين - معدل فقط
  if (cleanCountry === "bh") {
    const results = await fetchGccShopping(cleanQuery, "bh");
    await saveResultsToCache(results);
    return results;
  }
// ✅ العراق
if (cleanCountry === "iq") {
  const results = await fetchGccShopping(cleanQuery, "qa"); // نفس قطر مؤقتًا
  await saveResultsToCache(results);
  return results;
}

// ✅ عمان
if (cleanCountry === "om") {
  const results = await fetchGccShopping(cleanQuery, "ae"); // نفس الإمارات
  await saveResultsToCache(results);
  return results;
}
  if (cleanCountry === "eg") {
    const shopping = await fetchGccShopping(cleanQuery, "eg");

    if (shopping && shopping.length > 0) {
      await saveResultsToCache(shopping);
      return shopping;
    }

    console.log("⚠️ Egypt Shopping empty → single Google Search fallback");

    const searchUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
      `${cleanQuery} سعر مصر amazon.eg noon.com jumia.com.eg`
    )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&num=20`;

    const searchData = await fetchJsonSafe(searchUrl, 8000);
    const organic = searchData?.organic_results || [];

    const results = organic
      .filter((item) => item.link && item.title)
      .map((item, i) => {
        const text = `${item.title || ""} ${item.snippet || ""}`;

        const priceMatch =
          text.match(/(?:EGP|جنيه|ج\.م)\s?[\d,.]+/i) ||
          text.match(/[\d,.]+\s?(?:EGP|جنيه|ج\.م)/i);

        const price = cleanPrice(priceMatch ? priceMatch[0] : "");

        return {
          id: String(i + 1),
          title: item.title || "No title",
          price,
          priceText: price
            ? `${price.toLocaleString("en-US")} EGP`
            : "السعر داخل المتجر",
          store: item.source || item.displayed_link || "Egypt Store",
          image: `https://placehold.co/400x400/ffffff/111111?text=${encodeURIComponent(
            cleanQuery
          )}`,
          url: item.link,
        };
      })
      .filter((item) => item.url && item.title);

    await saveResultsToCache(results);
    return results;
  }

  return [];
}