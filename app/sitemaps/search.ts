import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getAllSearchTerms() {
  const pageSize = 1000;
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("search_terms")
      .select("slug, updated_at")
      .order("updated_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (error || !data?.length) break;

    all = [...all, ...data];

    if (data.length < pageSize) break;

    from += pageSize;
  }

  return all;
}

export default async function sitemap() {
  const data = await getAllSearchTerms();

  return (
    data?.map((item: any) => ({
      url: `https://www.bpschat.com/search/${item.slug}`,
      lastModified: item.updated_at
        ? new Date(item.updated_at)
        : new Date(),
    })) || []
  );
}