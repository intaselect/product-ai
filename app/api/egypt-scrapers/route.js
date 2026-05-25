import { scrapeAmazonEgypt } from "@/lib/scrapeAmazonEgypt";
import { scrapeJumiaEgypt } from "@/lib/scrapeJumiaEgypt";
import { scrapeNoonEgypt } from "@/lib/scrapeNoonEgypt";

export const dynamic = "force-dynamic";

function withTimeout(promise, ms = 9000) {
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
      withTimeout(scrapeAmazonEgypt(query), 9000),
      withTimeout(scrapeJumiaEgypt(query), 9000),
      withTimeout(scrapeNoonEgypt(query), 9000),
    ]);

    console.log("EG SCRAPERS:", {
      amazon: amazon.length,
      jumia: jumia.length,
      noon: noon.length,
    });

   function normalize(items, sourceName) {
  return (items || [])
    .filter((item) => item.title && item.url && item.image)
    .map((item) => ({
      title: `🔥 ${item.title}`,
      price: item.price || 0,
      priceText: item.price
        ? `${Number(item.price).toLocaleString("en-US")} EGP`
        : "السعر داخل المتجر",
      store: sourceName,
      image: item.image,
      url: item.url,
    }));
}

const results = [
  ...normalize(amazon, "Amazon.eg"),
  ...normalize(noon, "Noon Egypt"),
  ...normalize(jumia, "Jumia Egypt"),
].map((item, i) => ({
  id: `eg-bg-${i + 1}`,
  ...item,
}));

    return Response.json(results);
  } catch (err) {
    console.log("EG SCRAPERS ERROR:", err?.message || err);
    return Response.json([]);
  }
}