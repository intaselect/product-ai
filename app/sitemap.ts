import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // صفحات ثابتة
  const staticPages = [
  { url: "https://www.bpschat.com", lastModified: new Date() },

  // صفحات الموقع
  { url: "https://www.bpschat.com/about" },
  { url: "https://www.bpschat.com/contact" },
  { url: "https://www.bpschat.com/advertise" },

  // صفحات SEO الأساسية
  { url: "https://www.bpschat.com/bps-chat" },
  { url: "https://www.bpschat.com/is-bps-chat-safe" },
  { url: "https://www.bpschat.com/is-bps-chat-free" },
  { url: "https://www.bpschat.com/how-bps-chat-works" },
  { url: "https://www.bpschat.com/bps-vs-google" },
  { url: "https://www.bpschat.com/bps-vs-amazon" },
  { url: "https://www.bpschat.com/bps-vs-noon" },
{ url: "https://www.bpschat.com/bps-vs-jumia" },

  // صفحات المنتجات
  { url: "https://www.bpschat.com/iphone-price-comparison" },
  { url: "https://www.bpschat.com/samsung-price-comparison" },
  { url: "https://www.bpschat.com/laptop-price-comparison" },
  { url: "https://www.bpschat.com/perfume-price-comparison" },

  // صفحات قوية
  { url: "https://www.bpschat.com/compare-prices-online" },
  { url: "https://www.bpschat.com/best-price-online" },
  { url: "https://www.bpschat.com/cheapest-products" },
  { url: "https://www.bpschat.com/best-price-websites-saudi" },
{ url: "https://www.bpschat.com/save-money-online-shopping" },
{ url: "https://www.bpschat.com/best-online-stores-egypt-gulf" },
{ url: "https://www.bpschat.com/best-time-to-buy-online" },
{ url: "https://www.bpschat.com/online-shopping-safety-guide" },
{ url: "https://www.bpschat.com/stores" },
{ url: "https://www.bpschat.com/categories" },
{ url: "https://www.bpschat.com/brands" },
{ url: "https://www.bpschat.com/deals" },

  // صفحات الدول
  { url: "https://www.bpschat.com/saudi-product-price-comparison" },
  { url: "https://www.bpschat.com/uae-product-price-comparison" },
  { url: "https://www.bpschat.com/qatar-product-price-comparison" },
  { url: "https://www.bpschat.com/kuwait-product-price-comparison" },
  { url: "https://www.bpschat.com/bahrain-product-price-comparison" },
  { url: "https://www.bpschat.com/egypt-product-price-comparison" },
  { url: "https://www.bpschat.com/products/iphone-15" },
  { url: "https://www.bpschat.com/products/iphone-16-17" },
  { url: "https://www.bpschat.com/products/apple-airpods" },
  { url: "https://www.bpschat.com/best-smartphones-2026" },
  { url: "https://www.bpschat.com/what-is-bpschat" },
];

  // نجيب السلاج من الداتا بيز
  const { data } = await supabase
    .from("search_terms")
    .select("slug, updated_at")
    .limit(5000); // ممكن تزود بعدين

  const dynamicPages =
    data?.map((item) => ({
      url: `https://www.bpschat.com/search/${item.slug}`,
      lastModified: item.updated_at
        ? new Date(item.updated_at)
        : new Date(),
    })) || [];

  return [...staticPages, ...dynamicPages];
}