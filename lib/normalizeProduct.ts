export type RawProduct = {
  title?: string;
  name?: string;
  price?: string | number;
  image?: string;
  thumbnail?: string;
  link?: string;
  url?: string;
  source?: string;
};

export type Product = {
  title: string;
  price: number | null;
  priceText: string;
  image: string | null;
  link: string;
  source: string;
};

export function parsePrice(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  const original = String(value);

  const hasCurrency =
    /EGP/i.test(original) ||
    /جنيه/i.test(original) ||
    /ج\.?م/i.test(original);

  if (!hasCurrency) return null;

  const cleaned = original.replace(/,/g, "");
  const matches = cleaned.match(/\d+(?:\.\d+)?/g);

  if (!matches) return null;

  const prices = matches
    .map((n) => Number(n))
    .filter((n) => Number.isFinite(n) && n >= 1000 && n <= 300000);

  if (prices.length === 0) return null;

  return prices[0];
}

export function normalizeProduct(item: RawProduct): Product | null {
  const title = item.title || item.name;
  const link = item.link || item.url;
  const image = item.image || item.thumbnail || null;
  const source = item.source || "unknown";

  if (!title || !link) return null;

  const price = parsePrice(item.price);

  return {
    title: title.trim(),
    price,
    priceText: price ? `${price.toLocaleString("en-US")} EGP` : "No price",
    image: image || null,
    link,
    source,
  };
}