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

  const text = String(value)
    .replace(/EGP|ج\.م|SAR|ر\.س|ريال|جنيه/gi, "")
    .replace(/[^\d.,]/g, "")
    .replace(/,/g, "");

  const match = text.match(/\d+(\.\d+)?/);
  if (!match) return null;

  const price = Number(match[0]);
  return Number.isFinite(price) ? price : null;
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
    priceText: price
      ? price.toLocaleString("en-US")
      : "Price not available",
    image: image || null,
    link,
    source,
  };
}