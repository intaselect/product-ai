import { getAmazonAccessToken } from "./auth";
import { normalizeAmazonProduct } from "./normalize";

function baseUrl() {
  return process.env.AMAZON_CREATORS_API_BASE_URL || "";
}

export async function amazonCreatorsRequest(path: string, body: any) {
  const token = await getAmazonAccessToken();

  const apiBase = baseUrl();

  if (!apiBase) {
    throw new Error("AMAZON_CREATORS_API_BASE_URL غير موجود");
  }

  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data?.message ||
        data?.error_description ||
        data?.error ||
        `Amazon API failed ${res.status}`
    );
  }

  return data;
}

export async function getAmazonItemByAsin(params: {
  asin: string;
  country: string;
}) {
  const data = await amazonCreatorsRequest("/getItems", {
    itemIds: [params.asin],
    marketplace: params.country,
    resources: [
      "images",
      "itemInfo",
      "offers",
      "offersV2",
      "customerReviews",
    ],
  });

  const item =
    data?.items?.[0] ||
    data?.ItemsResult?.Items?.[0] ||
    data?.data?.items?.[0] ||
    data?.results?.[0];

  if (!item) {
    throw new Error("Amazon لم يرجع بيانات للمنتج");
  }

  return normalizeAmazonProduct(item);
}