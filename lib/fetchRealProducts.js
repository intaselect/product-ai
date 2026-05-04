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

  function extractEgyptPrice(text) {
    if (!text) return 0;

    const hasCurrency =
      text.includes("EGP") ||
      text.includes("جنيه") ||
      text.includes("ج.م");

    if (!hasCurrency) return 0;

    const match = text.replace(/,/g, "").match(/(\d{3,7})/);
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

  // ✅ مصر فقط
  if (country === "eg") {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
        query +
          " سعر مصر site:amazon.eg OR site:jumia.com.eg OR site:noon.com/egypt"
      )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&num=50`
    );

    const data = await res.json();

    return (data.organic_results || [])
      .filter((item) => !isLikelyEgyptInstallment(item))
      .map((item, i) => ({
        id: String(i + 1),
        title: item.title || "No title",
        price:
          extractEgyptPrice(item.snippet) ||
          extractEgyptPrice(item.title),
        store: item.source || item.displayed_link || "Unknown",
        image:
          item.thumbnail ||
          `https://placehold.co/400x400/2f2f2f/ffffff?text=${encodeURIComponent(
            query
          )}`,
        url: item.link || null,
      }))
      .filter((item) => item.url)
      .slice(0, 50);
  }

  return [];
}