export async function fetchRealProducts(query) {
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
      text.includes("plan") ||
      text.includes("carrier")
    );
  }

  const res = await fetch(
    `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}&gl=sa&hl=ar&google_domain=google.com.sa&location=Saudi%20Arabia`
  );

  const data = await res.json();

  if (!data.shopping_results) return [];

  return data.shopping_results
    .filter(item => !isLikelyInstallment(item))
    .map((item, i) => {
      return {
        id: String(i + 1),
        title: item.title || "No title",

        price: cleanPrice(
          item.extracted_price ??
          item.extracted_price_from ??
          item.price
        ),

        store: item.source || "Unknown",

        image: item.thumbnail || "",

        // 🔥 الرابط الحقيقي فقط
        url:
          item.link ||
          item.product_link ||
          item.serpapi_product_api ||
          null
      };
    });
}