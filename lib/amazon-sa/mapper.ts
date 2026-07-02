export type AmazonSaProduct = {
  asin: string;
  title: string;
  price: string;
  availability: "in_stock" | "out_of_stock" | "unknown";
  image: string;
  gallery: string[];
  detailPageUrl: string;
  features: string[];
  description: string;
  brand: string;
  raw: any;
};

function clean(value: any) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function imageUrl(img: any) {
  return clean(img?.url || img?.URL || "");
}

function priceText(item: any) {
  const listing = item?.offersV2?.listings?.[0];

  return clean(
    listing?.price?.displayAmount ||
      listing?.price?.money?.displayAmount ||
      listing?.price?.money?.amount ||
      listing?.price?.amount ||
      ""
  );
}

function availability(item: any): AmazonSaProduct["availability"] {
  const listing = item?.offersV2?.listings?.[0];

  const text = clean(
    listing?.availability?.message ||
      listing?.availability?.type ||
      listing?.availability ||
      ""
  ).toLowerCase();

  if (text.includes("available") || text.includes("in stock") || text.includes("متوفر")) {
    return "in_stock";
  }

  if (text.includes("out") || text.includes("unavailable") || text.includes("غير متوفر")) {
    return "out_of_stock";
  }

  if (item?.offersV2?.listings?.length > 0) {
    return "in_stock";
  }

  return "unknown";
}

export function mapAmazonItem(item: any): AmazonSaProduct {
  const primary =
    item?.images?.primary?.large ||
    item?.images?.primary?.medium ||
    item?.images?.primary?.small;

  const variants = Array.isArray(item?.images?.variants)
    ? item.images.variants
    : [];

  const gallery = [
    imageUrl(primary),
    ...variants
      .map((v: any) => imageUrl(v?.large || v?.medium || v?.small || v))
      .filter(Boolean),
  ].filter(Boolean);

  const features = Array.isArray(item?.itemInfo?.features?.displayValues)
    ? item.itemInfo.features.displayValues.map(clean).filter(Boolean)
    : [];

  const title = clean(item?.itemInfo?.title?.displayValue || item?.title?.displayValue);

  return {
    asin: clean(item?.asin),
    title,
    price: priceText(item),
    availability: availability(item),
    image: gallery[0] || "",
    gallery: gallery.slice(0, 8),
    detailPageUrl: clean(item?.detailPageURL || item?.detailPageUrl),
    features,
    description: features.join("، "),
    brand: clean(item?.itemInfo?.byLineInfo?.brand?.displayValue),
    raw: item,
  };
}