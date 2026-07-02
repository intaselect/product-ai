import { amazonSaRequest } from "./client";
import { mapAmazonItem } from "./mapper";

const resources = [
  "images.primary.large",
  "images.variants.large",
  "itemInfo.title",
  "itemInfo.features",
  "itemInfo.byLineInfo",
  "itemInfo.productInfo",
  "offersV2.listings.price",
  "offersV2.listings.availability",
  "offersV2.listings.merchantInfo",
  "parentASIN",
];

export async function getAmazonSaItems(asins: string[]) {
  const data = await amazonSaRequest("/catalog/v1/getItems", {
    itemIds: asins,
    itemIdType: "ASIN",
    condition: "New",
    resources,
  });

  const items =
    data?.itemResults?.items ||
    data?.items ||
    [];

  return items.map(mapAmazonItem);
}

export async function getAmazonSaItem(asin: string) {
  const items = await getAmazonSaItems([asin]);
  return items[0] || null;
}