import { amazonSaRequest } from "./client";
import { mapAmazonItem } from "./mapper";

const resources = [
  "images.primary.large",
  "images.variants.large",
  "itemInfo.title",
  "itemInfo.features",
  "itemInfo.byLineInfo",
  "offersV2.listings.price",
  "offersV2.listings.availability",
  "parentASIN",
];

export async function searchAmazonSaProducts(keyword: string) {
  const data = await amazonSaRequest("/catalog/v1/searchItems", {
    keywords: keyword,
    searchIndex: "All",
    availability: "Available",
    condition: "New",
    resources,
  });

  const items =
    data?.itemResults?.items ||
    data?.items ||
    [];

  return items.map(mapAmazonItem);
}