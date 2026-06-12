export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/customer-offers/dashboard",
          "/admin",
        ],
      },

      {
        userAgent: [
          "GPTBot",
          "CCBot",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Bytespider",
          "Amazonbot",
        ],
        disallow: "/",
      },
    ],

    sitemap: [
      "https://www.bpschat.com/sitemap.xml",
      "https://www.bpschat.com/sitemaps/products.xml",
      "https://www.bpschat.com/sitemaps/search.xml",
      "https://www.bpschat.com/sitemaps/blog.xml",
      "https://www.bpschat.com/sitemaps/categories.xml",
      "https://www.bpschat.com/sitemaps/pages.xml",
      "https://www.bpschat.com/sitemaps/videos.xml",
      "https://www.bpschat.com/sitemaps/comparisons.xml",
    ],
  };
}