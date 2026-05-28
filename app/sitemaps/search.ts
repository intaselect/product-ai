import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function sitemap() {
  const { data } = await supabase
    .from("search_terms")
    .select("slug, updated_at")
    .order("updated_at", { ascending: false })
    .limit(50000);

  return (
    data?.map((item) => ({
      url: `https://www.bpschat.com/search/${item.slug}`,
      lastModified: item.updated_at
        ? new Date(item.updated_at)
        : new Date(),
    })) || []
  );
}