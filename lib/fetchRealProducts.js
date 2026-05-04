export async function fetchRealProducts(query, country = "sa") {
  const apiKey = process.env.SERPAPI_KEY;

  function cleanPrice(priceText) {
    if (!priceText) return 0;

    const cleaned = priceText
      .toString()
      .replace(/[^0-9.]/g, "")
      .trim();

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

  function isLikelyEgyptInstallment(item) {
    const text = `${item.title || ""} ${item.source || ""} ${
      item.snippet || ""
    }`.toLowerCase();

    return (
      text.includes("monthly") ||
      text.includes("installment") ||
      text.includes("installments") ||
      text.includes("plan") ||
      text.includes("carrier") ||
      text.includes("تقسيط") ||
      text.includes("قسط") ||
      text.includes("اقساط") ||
      text.includes("أقساط") ||
      text.includes("بدون مقدم") ||
      text.includes("تمويل") ||
      text.includes("مستعمل") ||
      text.includes("used")
    );
  }

  function extractPriceFromText(text) {
    if (!text) return 0;

    const match = text.match(/(\d{3,7})/);
    return match ? parseFloat(match[1]) : 0;
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

  // ✅ السعودية زي ما هي بالظبط
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

  // ✅ مصر Pro
  if (country === "eg") {
    const shoppingAttempts = [
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        query
      )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&location=${encodeURIComponent(
        "Cairo, Egypt"
      )}&num=50`,

      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        query
      )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&num=50`,

      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        query + " مصر"
      )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&num=50`,
    ];

    let products = [];

    for (const url of shoppingAttempts) {
      const res = await fetch(url);
      const data = await res.json();

      const mapped = mapShoppingResults(data.shopping_results);

      products = [...products, ...mapped];

      if (products.length >= 50) break;
    }

    const uniqueProducts = [];
    const seen = new Set();

    for (const item of products) {
      const key = `${item.title}-${item.store}`.toLowerCase();

      if (!seen.has(key) && item.price > 0 && item.image) {
        seen.add(key);
        uniqueProducts.push(item);
      }
    }

    if (uniqueProducts.length > 0) {
      return uniqueProducts.slice(0, 50);
    }

    // ✅ fallback مصري أقوى من القديم
    const fallbackRes = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
        query +
          " سعر مصر site:amazon.eg OR site:jumia.com.eg OR site:noon.com/egypt"
      )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&num=50`
    );

    const fallbackData = await fallbackRes.json();

    return (fallbackData.organic_results || [])
      .filter((item) => !isLikelyEgyptInstallment(item))
      .map((item, i) => ({
        id: String(i + 1),
        title: item.title || "No title",
        price:
          extractPriceFromText(item.rich_snippet?.top?.detected_extensions?.price) ||
          extractPriceFromText(item.snippet) ||
          extractPriceFromText(item.title),
        store: item.source || item.displayed_link || "Unknown",
        image: item.thumbnail || "",
        url: item.link || null,
      }))
      .filter((item) => item.url)
      .slice(0, 50);
  }

  return [];
}