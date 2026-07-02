export const AMAZON_SA_MARKETPLACE = "www.amazon.sa";
export const AMAZON_SA_LANGUAGE = "en_AE";
export const AMAZON_SA_CURRENCY = "SAR";
export const AMAZON_CREDENTIAL_VERSION = "3.2";

export function getAmazonSaTag() {
  return process.env.AMAZON_SA_TAG || process.env.AMAZON_STORE_ID || "bpschatksa-21";
}

export function getAmazonApiBase() {
  return process.env.AMAZON_API_BASE || "https://creatorsapi.amazon";
}

export function getAmazonTokenUrl() {
  return process.env.AMAZON_TOKEN_URL || "https://api.amazon.co.uk/auth/o2/token";
}