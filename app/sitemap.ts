import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // صفحات ثابتة
  const staticPages = [
    {
      url: "https://www.bpschat.com",
      lastModified: new Date(),
    },
    { url: "https://www.bpschat.com/login" },
    { url: "https://www.bpschat.com/advertise" },
    { url: "https://www.bpschat.com/about" },
    { url: "https://www.bpschat.com/contact" },
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