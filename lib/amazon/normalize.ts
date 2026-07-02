import type { NormalAmazonProduct } from "./types";

function cleanText(value: any) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function pickFirst(...values: any[]) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim()) {
      return value;
    }
  }
  return "";
}

function normalizeAvailability(value: any): NormalAmazonProduct["availability"] {
  const text = String(value || "").toLowerCase();

  if (
    text.includes("instock") ||
    text.includes("in_stock") ||
    text.includes("available") ||
    text.includes("متوفر")
  ) {
    return "in_stock";
  }

  if (
    text.includes("outofstock") ||
    text.includes("out_of_stock") ||
    text.includes("unavailable") ||
    text.includes("soldout") ||
    text.includes("غير متوفر")
  ) {
    return "out_of_stock";
  }

  return "unknown";
}

export function normalizeAmazonProduct(item: any): NormalAmazonProduct {
  const asin = cleanText(
    pickFirst(item?.asin, item?.ASIN, item?.itemId, item?.id)
  );

  const title = cleanText(
    pickFirst(
      item?.title,
      item?.itemInfo?.title?.displayValue,
      item?.itemInfo?.title,
      item?.productTitle,
      item?.name
    )
  );

  const image = cleanText(
    pickFirst(
      item?.image,
      item?.images?.primary?.large?.url,
      item?.images?.primary?.medium?.url,
      item?.images?.primary?.small?.url,
      item?.images?.[0]?.url,
      item?.mainImage
    )
  );

  const galleryRaw =
    item?.images?.variants ||
    item?.images?.gallery ||
    item?.gallery ||
    item?.images ||
    [];

  const gallery = Array.isArray(galleryRaw)
    ? galleryRaw
        .map((img: any) =>
          cleanText(
            pickFirst(
              img?.large?.url,
              img?.medium?.url,
              img?.small?.url,
              img?.url,
              img
            )
          )
        )
        .filter(Boolean)
        .slice(0, 8)
    : [];

  const price = cleanText(
    pickFirst(
      item?.price,
      item?.offers?.listings?.[0]?.price?.displayAmount,
      item?.offers?.listings?.[0]?.price?.amount,
      item?.offersV2?.listings?.[0]?.price?.displayAmount,
      item?.offersV2?.listings?.[0]?.price?.money?.amount,
      item?.buyingOptions?.[0]?.price?.displayAmount
    )
  );

  const availabilityRaw = pickFirst(
    item?.availability,
    item?.offers?.listings?.[0]?.availability?.type,
    item?.offers?.listings?.[0]?.availability?.message,
    item?.offersV2?.listings?.[0]?.availability?.type,
    item?.offersV2?.listings?.[0]?.availability?.message
  );

  const featuresRaw = pickFirst(
    item?.features,
    item?.itemInfo?.features?.displayValues,
    item?.bulletPoints,
    []
  );

  const features = Array.isArray(featuresRaw)
    ? featuresRaw.map(cleanText).filter(Boolean).slice(0, 10)
    : [];

  const description = cleanText(
    pickFirst(
      item?.description,
      item?.itemInfo?.productInfo?.displayValue,
      features.join("، ")
    )
  );

  const brand = cleanText(
    pickFirst(
      item?.brand,
      item?.itemInfo?.byLineInfo?.brand?.displayValue,
      item?.manufacturer
    )
  );

  return {
    asin,
    title,
    price,
    availability: normalizeAvailability(availabilityRaw),
    image,
    gallery: image ? [image, ...gallery.filter((x) => x !== image)] : gallery,
    description,
    features,
    specifications: item?.specifications || item?.itemInfo || {},
    brand,
    rating: cleanText(pickFirst(item?.rating, item?.customerReviews?.starRating)),
    reviewsCount: cleanText(
      pickFirst(item?.reviewsCount, item?.customerReviews?.count)
    ),
    raw: item,
  };
}