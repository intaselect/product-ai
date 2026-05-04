export async function scrapeJumiaEgypt(query) {
  const url = `https://www.jumia.com.eg/catalog/?q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
  });

  const html = await res.text();

  const products = [];

  const matches = html.match(/"name":"(.*?)".*?"price":"(.*?)".*?"image":"(.*?)".*?"url":"(.*?)"/g) || [];

  matches.slice(0, 50).forEach((block, i) => {
    const name = block.match(/"name":"(.*?)"/)?.[1];
    const priceText = block.match(/"price":"(.*?)"/)?.[1];
    const image = block.match(/"image":"(.*?)"/)?.[1];
    const link = block.match(/"url":"(.*?)"/)?.[1];

    const price = priceText
      ? parseFloat(priceText.replace(/[^0-9.]/g, ""))
      : 0;

    if (name && link) {
      products.push({
        id: String(i + 1),
        title: name,
        price: isNaN(price) ? 0 : price,
        store: "Jumia Egypt",
        image,
        url: link.startsWith("http") ? link : `https://www.jumia.com.eg${link}`,
      });
    }
  });

  return products;
}