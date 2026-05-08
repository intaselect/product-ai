import { createClient } from "@supabase/supabase-js";

export async function saveSearch(query: string, country: string) {
  if (!query) return;

  console.log("🔥 SERVER SAVE:", query, country);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 🔥 المهم
  );

  const slug = `${query.toLowerCase().replace(/\s+/g, "-")}-${country}`;

  const { data: existing, error: selectError } = await supabase
    .from("search_terms")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (selectError) {
    console.error("Select error:", selectError);
    return;
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("search_terms")
      .update({
        search_count: existing.search_count + 1,
        updated_at: new Date(),
      })
      .eq("slug", slug);

    if (updateError) console.error("Update error:", updateError);
  } else {
    const { error: insertError } = await supabase
      .from("search_terms")
      .insert({
        query,
        country,
        slug,
      });

    if (insertError) console.error("Insert error:", insertError);
  }
}