export async function scrapeJumiaEgypt(query) {
  try {
    const url = `https://www.jumia.com.eg/catalog/?q=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
      },
    });

    const html = await res.text();
    const results = [];

    const items = [...html.matchAll(/<article class="prd[\s\S]*?<\/article>/g)];
    console.log("RAW ITEMS FOUND:", items.length || blocks.length);

    items.slice(0, 50).forEach((item, i) => {
      const block = item[0];

      const titleMatch = block.match(/class="name">([^<]+)/);
      const priceMatch = block.match(/class="prc">([^<]+)/);
      const imgMatch =
        block.match(/data-src="([^"]+)"/) ||
        block.match(/src="([^"]+)"/);
      const linkMatch = block.match(/href="([^"]+)"/);

      const title = titleMatch
        ? titleMatch[1].replace(/&amp;/g, "&").trim()
        : "";

      const price = priceMatch
        ? parseInt(priceMatch[1].replace(/[^0-9]/g, ""), 10) || 0
        : 0;

      let image = imgMatch ? imgMatch[1] : "";
      if (image && image.startsWith("//")) image = `https:${image}`;

      let link = linkMatch ? linkMatch[1] : "";
      if (link && link.startsWith("/")) {
        link = `https://www.jumia.com.eg${link}`;
      }

      const badText = title.toLowerCase();

      if (
        title &&
        link &&
        
        !badText.includes("تقسيط") &&
        !badText.includes("installment") &&
        !badText.includes("used") &&
        !badText.includes("مستعمل")
      ) {
        results.push({
          id: `jumia-${i + 1}`,
          title,
          price,
          store: "Jumia Egypt",
          image: image || "",
          url: link,
        });
      }
    });

    console.log("JUMIA PRODUCTS COUNT:", results.length);

    return results;
  } catch (err) {
    console.error("Jumia scrape error:", err);
   
    return [];
  }
}