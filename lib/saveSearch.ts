import { supabase } from "@/lib/supabase";

export async function saveSearch(query: string, country: string) {
  if (!query || query.length < 3) return;

  const slug = `${query.toLowerCase().replace(/\s+/g, "-")}-${country}`;

  const { data: existing } = await supabase
    .from("search_terms")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("search_terms")
      .update({
        search_count: existing.search_count + 1,
        updated_at: new Date(),
      })
      .eq("slug", slug);
  } else {
    await supabase.from("search_terms").insert({
      query,
      country,
      slug,
    });
  }
}