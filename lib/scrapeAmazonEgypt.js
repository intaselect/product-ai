export async function scrapeAmazonEgypt(query) {
  try {
    const url = `https://www.amazon.eg/s?k=${encodeURIComponent(query)}&language=en_AE`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
      },
    });

    const html = await res.text();
    const results = [];

    const items =
      html.match(/<div[^>]+data-component-type="s-search-result"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) ||
      html.match(/<div[^>]+data-asin="[^"]+"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) ||
      [];

    console.log("AMAZON RAW ITEMS FOUND:", items.length);

    items.slice(0, 50).forEach((block, i) => {
      const titleMatch =
        block.match(/<h2[\s\S]*?<span[^>]*>(.*?)<\/span>/) ||
        block.match(/aria-label="([^"]+)"/);

      const priceMatch =
        block.match(/<span class="a-offscreen">([^<]+)<\/span>/) ||
        block.match(/EGP\s?[\d,.]+/);

      const imageMatch =
        block.match(/<img[^>]+class="[^"]*s-image[^"]*"[^>]+src="([^"]+)"/) ||
        block.match(/src="([^"]+)"[^>]+class="[^"]*s-image[^"]*"/);

      const linkMatch =
        block.match(/<a[^>]+class="[^"]*a-link-normal[^"]*"[^>]+href="([^"]+)"/) ||
        block.match(/href="([^"]*\/dp\/[^"]+)"/);

      const title = titleMatch
        ? titleMatch[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim()
        : "";

      const priceText = priceMatch
        ? Array.isArray(priceMatch) ? priceMatch[1] || priceMatch[0] : ""
        : "";

      const price = priceText
        ? parseFloat(priceText.replace(/,/g, "").replace(/[^0-9.]/g, ""))
        : 0;

      const image = imageMatch ? imageMatch[1] : "";

      let link = linkMatch ? linkMatch[1] : "";

      if (link && link.startsWith("/")) {
        link = `https://www.amazon.eg${link}`;
      }

      const badText = title.toLowerCase();

      if (
        title &&
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
          store: "Amazon.eg",
          image: image || "",
          url: link,
        });
      }
    });

    console.log("AMAZON URL:", url);
    console.log("AMAZON STATUS:", res.status);
    console.log("AMAZON HTML LENGTH:", html.length);
    console.log("AMAZON PRODUCTS COUNT:", results.length);

    return results;
  } catch (err) {
    console.error("Amazon scrape error:", err);
    return [];
  }
}