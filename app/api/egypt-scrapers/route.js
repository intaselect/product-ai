import { scrapeAmazonEgypt } from "@/lib/scrapeAmazonEgypt";
import { scrapeJumiaEgypt } from "@/lib/scrapeJumiaEgypt";
import { scrapeNoonEgypt } from "@/lib/scrapeNoonEgypt";

export const dynamic = "force-dynamic";

function withTimeout(promise, ms = 20000) {
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
      withTimeout(scrapeAmazonEgypt(query)),
      withTimeout(scrapeJumiaEgypt(query)),
      withTimeout(scrapeNoonEgypt(query)),
    ]);

    console.log("EG SCRAPERS:", {
      amazon: amazon.length,
      jumia: jumia.length,
      noon: noon.length,
    });

    const results = [...amazon, ...jumia, ...noon]
      .filter((item) => item.title && item.url)
      .map((item, i) => ({
        id: `eg-bg-${i + 1}`,
        title: `🔥 ${item.title}`,
        price: item.price || 0,
        priceText: item.price
          ? `${Number(item.price).toLocaleString("en-US")} EGP`
          : "السعر داخل المتجر",
        store: item.store || "Egypt Store",
        image: item.image || "",
        url: item.url,
      }));

    return Response.json(results);
  } catch (err) {
    console.log("EG SCRAPERS ERROR:", err?.message || err);
    return Response.json([]);
  }
}