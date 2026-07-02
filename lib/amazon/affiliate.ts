export type AmazonCountry = "sa" | "ae" | "eg";

export function amazonDomainByCountry(country: string) {
  if (country === "ae") return "www.amazon.ae";
  if (country === "eg") return "www.amazon.eg";
  return "www.amazon.sa";
}

export function amazonStoreNameByCountry(country: string) {
  if (country === "ae") return "amazon.ae";
  if (country === "eg") return "amazon.eg";
  return "amazon.sa";
}

export function amazonTagByCountry(country: string) {
  if (country === "ae") return process.env.AMAZON_AE_TAG || "";
  if (country === "eg") return process.env.AMAZON_EG_TAG || "";
  return process.env.AMAZON_SA_TAG || process.env.AMAZON_STORE_ID || "bpschatksa-21";
}

export function buildAmazonAffiliateUrl(asin: string, country: string) {
  const domain = amazonDomainByCountry(country);
  const tag = amazonTagByCountry(country);

  if (!asin || !tag) return "";

  return `https://${domain}/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}

export function extractAsin(input: string) {
  const text = String(input || "").trim();

  if (/^[A-Z0-9]{10}$/i.test(text)) {
    return text.toUpperCase();
  }

  const match =
    text.match(/\/dp\/([A-Z0-9]{10})/i) ||
    text.match(/\/gp\/product\/([A-Z0-9]{10})/i) ||
    text.match(/[?&]asin=([A-Z0-9]{10})/i);

  return match?.[1]?.toUpperCase() || "";
}