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
  ];

  const advertiserUrls = advertiserPages.map((page) => ({
    url: `https://www.bpschat.com/advertisers/${page.slug}`,
  }));

  return [...staticPages, ...advertiserUrls];
}