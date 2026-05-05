console.log("VERSION 8 EGYPT CLEAN FALLBACK FIX");

import { scrapeJumiaEgypt } from "@/lib/scrapeJumiaEgypt";
import { scrapeAmazonEgypt } from "@/lib/scrapeAmazonEgypt";
import { scrapeNoonEgypt } from "@/lib/scrapeNoonEgypt";
import { normalizeProduct } from "@/lib/normalizeProduct";

export async function fetchRealProducts(query, country = "sa") {
  const apiKey = process.env.SERPAPI_KEY;

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
  const currency = country === "ae" ? "AED" : "SAR";

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

  function withTimeout(promise, ms = 5000) {
    return Promise.race([
      promise,
      new Promise((resolve) => setTimeout(() => resolve([]), ms)),
    ]);
  }

  // ✅ السعودية بدون تغيير
  if (country === "sa") {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        query
      )}&api_key=${apiKey}&gl=sa&hl=ar&google_domain=google.com.sa&location=Saudi%20Arabia`
    );

    const data = await res.json();

    if (!data.shopping_results) return [];

    return mapShoppingResults(data.shopping_results, "sa").map((item) => ({
  ...item,
  image:
    item.image ||
    `https://placehold.co/400x400?text=${encodeURIComponent(query)}`,
}));
  }
// ✅ الإمارات بنفس طريقة السعودية
if (country === "ae") {
  const res = await fetch(
    `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}&gl=ae&hl=ar&google_domain=google.ae&location=United%20Arab%20Emirates`
  );

  const data = await res.json();

  if (!data.shopping_results) return [];

  return mapShoppingResults(data.shopping_results, "ae").map((item) => ({
  ...item,
  image:
    item.image ||
    `https://placehold.co/400x400?text=${encodeURIComponent(query)}`,
}));
}
  // ✅ مصر فقط
  if (country === "eg") {
    const results = await Promise.allSettled([
      withTimeout(scrapeAmazonEgypt(query), 5000),
      withTimeout(scrapeJumiaEgypt(query), 5000),
      withTimeout(scrapeNoonEgypt(query), 5000),
    ]);

    console.log(
      "EGYPT SCRAPERS:",
      results.map((r) =>
        r.status === "fulfilled" && Array.isArray(r.value)
          ? r.value.length
          : 0
      )
    );

    let rawResults = results.flatMap((result) =>
      result.status === "fulfilled" && Array.isArray(result.value)
        ? result.value
        : []
    );

    // ✅ Fallback دايمًا لمصر، لكن من غير أسعار وهمية
    if (apiKey) {
      const res = await fetch(
        `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
          query +
            " سعر مصر site:amazon.eg OR site:jumia.com.eg OR site:noon.com/egypt"
        )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&num=80`
      );

      const data = await res.json();

      const fallbackResults = (data.organic_results || [])
        .filter((item) => item.link)
        .map((item, i) => ({
          id: `fallback-${i + 1}`,
          title: item.title || "No title",

          // مهم: ما ناخدش snippet كسعر عشان بيطلع أرقام وهمية
          price:
            item.rich_snippet?.top?.detected_extensions?.price ||
            item.rich_snippet?.bottom?.detected_extensions?.price ||
            "",

          store: item.source || item.displayed_link || "Google Egypt",

          // لو جوجل مرجعش صورة حقيقية، نخليها فاضية والـ placeholder يتعمل في الآخر
          image: item.thumbnail || "",
          url: item.link,
        }));

      rawResults = [...rawResults, ...fallbackResults];
    }

    const normalized = rawResults
      .map((item) =>
        normalizeProduct({
          title: item.title,
          price: item.price,
          image: item.image,
          url: item.url,
          source: item.store,
        })
      )
      .filter(Boolean);

    const seen = new Set();

    const unique = normalized.filter((item) => {
      const key = item.title
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 90);

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });

    unique.sort((a, b) => {
      if (a.image && !b.image) return -1;
      if (!a.image && b.image) return 1;

      if (a.price === null && b.price === null) return 0;
      if (a.price === null) return 1;
      if (b.price === null) return -1;

      return a.price - b.price;
    });

    return unique.slice(0, 80).map((item, i) => ({
      id: String(i + 1),
      title: item.title,
      price: item.price ?? null,
      store: item.source,
      image:
        item.image ||
        `https://placehold.co/400x400/2f2f2f/ffffff?text=${encodeURIComponent(
          query
        )}`,
      url: item.link,
    }));
  }

  return [];
}