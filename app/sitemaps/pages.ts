import { advertiserPages } from "@/app/advertisers/data";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const staticPages = [
    { url: "https://www.bpschat.com" },

    { url: "https://www.bpschat.com/about" },
    { url: "https://www.bpschat.com/contact" },
    { url: "https://www.bpschat.com/advertise" },
    { url: "https://www.bpschat.com/smart-search" },
    { url: "https://www.bpschat.com/seller-tools" },

    { url: "https://www.bpschat.com/customer-offers" },

    { url: "https://www.bpschat.com/compare-prices-online" },
    { url: "https://www.bpschat.com/best-price-online" },
    { url: "https://www.bpschat.com/deals" },
    { url: "https://www.bpschat.com/categories" },
    { url: "https://www.bpschat.com/brands" },
    { url: "https://www.bpschat.com/stores" },
    { url: "https://www.bpschat.com/trending" },

    { url: "https://www.bpschat.com/advertisers" },
    { url: "https://www.bpschat.com/sell-online" },
    { url: "https://www.bpschat.com/compare" },
  ];

  const advertiserUrls = advertiserPages.map((page) => ({
    url: `https://www.bpschat.com/advertisers/${page.slug}`,
  }));
  const compareCountries = ["sa", "eg", "ae", "kw", "qa", "bh"];

const compareProducts = [
  "samsung",
  "xiaomi",
  "iphone-16",
  "laptop",
  "airpods",
  "ps5",
  "watch",
  "perfume",
  "headphones",
  "camera",
];

const compareUrls = compareCountries.flatMap((country) =>
  compareProducts.map((product) => ({
    url: `https://www.bpschat.com/compare/${country}/${product}`,
  }))
);

 return [...staticPages, ...advertiserUrls, ...compareUrls];
}