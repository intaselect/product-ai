export async function scrapeJumiaEgypt(query) {
  try {
    const url = `https://www.jumia.com.eg/catalog/?q=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const html = await res.text();

    const results = [];

    // ✅ المنتجات في جوميا بتيجي بالشكل ده
    const items = [...html.matchAll(/<article class="prd.*?<\/article>/gs)];

    items.slice(0, 50).forEach((item, i) => {
      const block = item[0];

      // ✅ title
      const titleMatch = block.match(/class="name">([^<]+)/);
      const title = titleMatch ? titleMatch[1].trim() : "No title";

      // ✅ price
      const priceMatch = block.match(/class="prc">([^<]+)/);
      let price = 0;

      if (priceMatch) {
        const cleaned = priceMatch[1]
          .replace(/[^0-9]/g, "")
          .trim();
        price = parseInt(cleaned) || 0;
      }

      // ✅ image
      const imgMatch = block.match(/data-src="([^"]+)"/);
      const image = imgMatch
        ? imgMatch[1]
        : `https://placehold.co/400x400?text=No+Image`;

      // ✅ link
      const linkMatch = block.match(/href="([^"]+)"/);
      const link = linkMatch
        ? "https://www.jumia.com.eg" + linkMatch[1]
        : null;

      // ❌ فلترة المنتجات الوهمية
      if (
        !title.toLowerCase().includes("تقسيط") &&
        price > 1000 // 👈 يمنع أسعار وهمية زي 200 جنيه
      ) {
        results.push({
          id: String(i + 1),
          title,
          price,
          store: "Jumia Egypt",
          image,
          url: link,
        });
      }
    });

    return results;
  } catch (err) {
    console.error("Jumia scrape error:", err);
    return [];
  }
}