export async function scrapeNoonEgypt(query) {
  try {
    const url = `https://www.noon.com/egypt-en/search?q=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
      },
    });

    const html = await res.text();
    const results = [];

    const blocks =
      html.match(/"name":"[^"]+"[\s\S]*?"sale_price":\{[\s\S]*?\}/g) || [];

    blocks.slice(0, 50).forEach((block, i) => {
      const titleMatch = block.match(/"name":"([^"]+)"/);
      const priceMatch =
        block.match(/"sale_price":\{"currency":"EGP","amount":([0-9.]+)/) ||
        block.match(/"price":\{"currency":"EGP","amount":([0-9.]+)/);

      const imageMatch =
        block.match(/"image_key":"([^"]+)"/) ||
        block.match(/"image":"([^"]+)"/);

      const skuMatch = block.match(/"sku":"([^"]+)"/);
      const urlMatch = block.match(/"url":"([^"]+)"/);

      const title = titleMatch
        ? titleMatch[1].replace(/\\u002F/g, "/").replace(/\\"/g, '"').trim()
        : "";

      const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

      let image = "";
      if (imageMatch) {
        const img = imageMatch[1];
        image = img.startsWith("http")
          ? img
          : `https://f.nooncdn.com/p/${img}.jpg`;
      }

      let link = "";
      if (urlMatch) {
        link = urlMatch[1].replace(/\\u002F/g, "/");
        if (link.startsWith("/")) {
          link = `https://www.noon.com/egypt-en${link}`;
        }
      } else if (skuMatch) {
        link = `https://www.noon.com/egypt-en/search?q=${encodeURIComponent(
          skuMatch[1]
        )}`;
      }

      const badText = title.toLowerCase();

      if (
        title &&
        price > 1000 &&
        link &&
        !badText.includes("installment") &&
        !badText.includes("تقسيط") &&
        !badText.includes("used") &&
        !badText.includes("مستعمل")
      ) {
        results.push({
          id: String(i + 1),
          title,
          price,
          store: "Noon Egypt",
          image,
          url: link,
        });
      }
    });

    console.log("NOON URL:", url);
    console.log("NOON STATUS:", res.status);
    console.log("NOON HTML LENGTH:", html.length);
    console.log("NOON PRODUCTS COUNT:", results.length);

    return results;
  } catch (err) {
    console.error("Noon scrape error:", err);
    return [];
  }
}