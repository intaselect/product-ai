export async function fetchRealProducts(query, country = "sa") {
  const apiKey = process.env.SERPAPI_KEY;

  function cleanPrice(priceText) {
    if (!priceText) return 0;

    const cleaned = priceText
      .toString()
      .replace(/[^0-9.,]/g, "")
      .replace(/,/g, "")
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
        image:
          item.thumbnail ||
          "https://via.placeholder.com/90?text=No+Image",
        url:
          item.link ||
          item.product_link ||
          item.serpapi_product_api ||
          null,
      }))
      .filter((item) => item.price > 0);
  }

  // ✅ السعودية (بدون أي تغيير)
  if (country === "sa") {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        query
      )}&api_key=${apiKey}&gl=sa&hl=ar&google_domain=google.com.sa&location=Saudi%20Arabia&num=50`
    );

    const data = await res.json();

    if (!data.shopping_results) return [];

    return mapShoppingResults(data.shopping_results);
  }

  // ✅ مصر (نفس السعودية بالظبط)
  if (country === "eg") {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
        query
      )}&api_key=${apiKey}&gl=eg&hl=ar&google_domain=google.com.eg&location=${encodeURIComponent(
        "Cairo, Egypt"
      )}&num=50`
    );

    const data = await res.json();

    // 🔥 مهم: بعض الأحيان النتيجة بتيجي هنا مش shopping_results
    const results =
      data.shopping_results ||
      data.inline_shopping_results ||
      [];

    return mapShoppingResults(results);
  }

  return [];
}