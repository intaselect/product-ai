export default async function sitemap() {
  return [
    {
      url: "https://www.bpschat.com/sitemaps/pages.xml",
    },
    {
      url: "https://www.bpschat.com/bps-for-stores",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
  url: "https://www.bpschat.com/product-world",
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 1,
},
    {
      url: "https://www.bpschat.com/sitemaps/search.xml",
    },
    {
      url: "https://www.bpschat.com/sitemaps/products.xml",
    },
    {
      url: "https://www.bpschat.com/sitemaps/categories.xml",
    },
    {
      url: "https://www.bpschat.com/sitemaps/blog.xml",
    },
    {
  url: "https://www.bpschat.com/sitemaps/comparisons.xml",
},
{
  url: "https://www.bpschat.com/sitemaps/daily-deals.xml",
},
{
  url: "https://www.bpschat.com/sitemaps/collections.xml",
},
    {
      url: "https://www.bpschat.com/sitemaps/videos.xml",
    },
  ];
}