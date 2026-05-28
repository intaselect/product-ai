export const dynamic = "force-dynamic";

export default async function sitemap() {
  const countries = ["sa", "ae", "kw", "qa", "bh", "eg"];

  const categories = [
    "electronics",
    "mobiles",
    "mobile_accessories",
    "smart_watch",
    "power_bank",
    "chargers",
    "headphones",
    "computers",
    "computer_accessories",
    "gaming",
    "home",
    "fashion",
    "shoes",
    "bags",
    "beauty",
    "cars",
    "kids",
    "sports",
    "cameras",
    "camera_accessories",
    "other",
  ];

  // صفحات الكاتيجوري العادية
  const customerOfferCategoryPages = countries.flatMap((c) =>
    categories.map((cat) => ({
      url: `https://www.bpschat.com/customer-offers/${c}/${cat}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }))
  );

  // صفحات Best الجديدة
  const bestCategoryPages = countries.flatMap((c) =>
    categories.map((cat) => ({
      url: `https://www.bpschat.com/best/${c}/${cat}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }))
  );

  return [
    ...customerOfferCategoryPages,
    ...bestCategoryPages,
  ];
}