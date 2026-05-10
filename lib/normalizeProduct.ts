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
  if (!value) return null;

  if (typeof value === "number") {
    return value > 0 ? value : null;
  }

  const cleaned = String(value).replace(/,/g, "");
  const matches = cleaned.match(/\d+(?:\.\d+)?/g);

  if (!matches) return null;

  const price = Number(matches[0]);

  // نطاق منطقي لمصر
  if (price < 50 || price > 500000) return null;

  return price;
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