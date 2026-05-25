import { scrapeAmazonEgypt } from "@/lib/scrapeAmazonEgypt";
import { scrapeJumiaEgypt } from "@/lib/scrapeJumiaEgypt";
import { scrapeNoonEgypt } from "@/lib/scrapeNoonEgypt";

function withTimeout(promise, ms = 3500) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve([]), ms)),
  ]);
}

export async function POST(req) {
  try {
    const { query, country } = await req.json();

    if (country !== "eg" || !query) {
      return Response.json([]);
    }

    const [amazon, jumia, noon] = await Promise.all([
      withTimeout(scrapeAmazonEgypt(query), 3500),
      withTimeout(scrapeJumiaEgypt(query), 3500),
      withTimeout(scrapeNoonEgypt(query), 3500),
    ]);

    const results = [...amazon, ...jumia, ...noon]
      .filter((item) => item.title && item.url && item.image)
      .map((item, i) => ({
        id: `eg-bg-${i + 1}`,
        title: item.title,
        price: item.price || 0,
        priceText: item.price
          ? `${Number(item.price).toLocaleString("en-US")} EGP`
          : "السعر داخل المتجر",
        store: item.store || "Egypt Store",
        image: item.image,
        url: item.url,
      }))
      .slice(0, 10);

    return Response.json(results);
  } catch {
    return Response.json([]);
  }
}