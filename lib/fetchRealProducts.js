console.log("VERSION 4 EGYPT NORMALIZE FIX");

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

  function mapShoppingResults(results) {
    return (results || [])
      .filter((item) => !isLikelyInstallment(item))
      .map((item, i) => ({
        id: String(i + 1),
        title: item.title || "No title",
        price: cleanPrice(
          item.extracted_price ??
            item.extracted_price_from ??
            item.price
        ),
        store: item.source || "Unknown",
        image: item.thumbnail || "",
        url:
          item.link ||
          item.product_link ||
          item.serpapi_product_api ||
          null,
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

    return mapShoppingResults(data.shopping_results);
  }

  // ✅ مصر فقط: Jumia + Amazon + Noon
 const jumia = await scrapeJumiaEgypt(query);
const amazon = await scrapeAmazonEgypt(query);
const noon = await scrapeNoonEgypt(query);

console.log("JUMIA COUNT:", jumia.length);
console.log("AMAZON COUNT:", amazon.length);
console.log("NOON COUNT:", noon.length);

console.log("JUMIA FIRST:", jumia[0]);
console.log("NOON FIRST:", noon[0]);

const rawResults = [...jumia, ...amazon, ...noon];
    const rawResults = results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : []
    );

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

    return unique.map((item, i) => ({
      id: String(i + 1),
      title: item.title,
      price: item.price || 0,
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