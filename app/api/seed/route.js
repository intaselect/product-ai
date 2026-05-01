export async function GET() {
  const endpoint = process.env.AZURE_SEARCH_ENDPOINT;
  const key = process.env.AZURE_SEARCH_KEY;

  const url = `${endpoint}/indexes/products/docs/index?api-version=2023-11-01`;

  const products = Array.from({ length: 50 }).map((_, i) => {
    const type =
      i % 3 === 0 ? "iPhone" : i % 3 === 1 ? "Samsung" : "MacBook";

    const store = i % 2 === 0 ? "Amazon KSA" : "Noon";

    const title =
      type === "iPhone"
        ? `iPhone ${15 + (i % 3)} Pro`
        : type === "Samsung"
        ? `Samsung Galaxy S${20 + (i % 5)} Ultra`
        : `MacBook Air M${1 + (i % 3)}`;

    // 🔥 صورة شبه حقيقية للمنتج (أفضل حل بدون API)
    const image =
      type === "iPhone"
        ? `https://source.unsplash.com/400x400/?iphone,apple,phone`
        : type === "Samsung"
        ? `https://source.unsplash.com/400x400/?samsung,phone,android`
        : `https://source.unsplash.com/400x400/?macbook,laptop,apple`;

    // 🔥 رابط متجر حقيقي (مش وهمي)
    const url =
      store === "Amazon KSA"
        ? `https://www.amazon.sa/s?k=${encodeURIComponent(title)}`
        : `https://www.noon.com/saudi-en/search?q=${encodeURIComponent(title)}`;

    return {
      "@search.action": "upload",
      id: String(i + 1),

      title,
      price: 2000 + i * 150,
      store,

      image,
      url
    };
  });

  const data = {
    value: products
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": key
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  return Response.json({
    success: true,
    count: products.length,
    result
  });
}