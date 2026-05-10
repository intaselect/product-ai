console.log("VERSION 9 GCC SAFE FIX");

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
    const currencyMap = {
      sa: "SAR",
      ae: "AED",
      kw: "KWD",
      qa: "QAR",
      bh: "BHD",
      eg: "EGP",
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

  function withTimeout(promise, ms = 5000) {
    return Promise.race([
      promise,
      new Promise((resolve) => setTimeout(() => resolve([]), ms)),
    ]);
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
  kw: {
    gl: "ae",
    google_domain: "google.com.kw",
  },
  qa: {
    gl: "us",
    google_domain: "google.com.qa",
  },
  bh: {
    gl: "ae",
    google_domain: "google.com.bh",
  },
};

  const current = config[country];
  if (!current || !apiKey) return [];

  const shoppingUrl = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
    query
  )}&api_key=${apiKey}&gl=${current.gl}&hl=ar&google_domain=${
    current.google_domain
  }`;

  const data = await fetchJsonSafe(shoppingUrl, 8000);

  console.log("GCC RAW DATA:", JSON.stringify(data, null, 2));

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

  // ✅ الإمارات بدون تغيير
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

  // ✅ الكويت - معدل فقط
  if (country === "kw") {
    return await fetchGccShopping(query, "kw");
  }

  // ✅ قطر - معدل فقط
  if (country === "qa") {
    return await fetchGccShopping(query, "qa");
  }

  // ✅ البحرين - معدل فقط
  if (country === "bh") {
    return await fetchGccShopping(query, "bh");
  }

  // ✅ مصر بدون تغيير
  // ✅ مصر زي السعودية (Google Shopping)
if (country === "eg") {
  const res = await fetch(
    `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&location=Egypt`
  );

  const data = await res.json();

  if (!data.shopping_results) return [];

  return mapShoppingResults(data.shopping_results, "eg").map((item) => ({
    ...item,
    image:
      item.image ||
      `https://placehold.co/400x400?text=${encodeURIComponent(query)}`,
  }));
}

  return [];
}