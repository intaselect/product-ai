import { createClient } from "@supabase/supabase-js";

export async function saveSearch(query: string, country: string) {
  if (!query) return;

  const cleanQuery = query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\u0600-\u06FF\s]/g, "");

  if (!cleanQuery) return;

  const cleanCountry = country?.toLowerCase().trim() || "sa";

  console.log("🔥 SERVER SAVE:", cleanQuery, cleanCountry);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const slug = `${cleanQuery.replace(/\s+/g, "-")}-${cleanCountry}`;

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
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);

    if (updateError) console.error("Update error:", updateError);
    return;
  }

  const { error: insertError } = await supabase.from("search_terms").insert({
    query: cleanQuery,
    country: cleanCountry,
    slug,
  });

  if (insertError) console.error("Insert error:", insertError);
}