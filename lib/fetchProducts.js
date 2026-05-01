export async function fetchProducts(query) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    query + " buy Saudi"
  )}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  const html = await res.text();

  const results = [];

  const matches = [
    ...html.matchAll(/url\?q=(https?:\/\/[^&]+)/g)
  ];

  matches.slice(0, 10).forEach((m, i) => {
    const link = decodeURIComponent(m[1]);

    results.push({
      id: String(i + 1),
      title: query,
      price: 0,
      store: "External",
      url: link,
      image: `https://via.placeholder.com/400?text=${encodeURIComponent(query)}`
    });
  });

  return results;
}