export async function scrapeJumiaEgypt(query) {
  const url = `https://www.jumia.com.eg/catalog/?q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    },
  });

  const html = await res.text();

  const products = [];

  const productBlocks = html.match(/<article[\s\S]*?<\/article>/g) || [];

  productBlocks.slice(0, 50).forEach((block, i) => {
    const titleMatch = block.match(/class="name"[^>]*>(.*?)<\/h3>/);
    const priceMatch = block.match(/class="prc"[^>]*>(.*?)<\/div>/);
    const imageMatch = block.match(/data-src="([^"]+)"/) || block.match(/src="([^"]+)"/);
    const linkMatch = block.match(/href="([^"]+)"/);

    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]+>/g, "").trim()
      : "";

    const priceText = priceMatch
      ? priceMatch[1].replace(/<[^>]+>/g, "").trim()
      : "";

    const price = priceText
      ? parseFloat(priceText.replace(/[^0-9.]/g, ""))
      : 0;

    const image = imageMatch ? imageMatch[1] : "";

    const link = linkMatch ? linkMatch[1] : "";

    if (title && link) {
      products.push({
        id: String(i + 1),
        title,
        price: isNaN(price) ? 0 : price,
        store: "Jumia Egypt",
        image,
        url: link.startsWith("http") ? link : `https://www.jumia.com.eg${link}`,
      });
    }
  });

  return products;
}