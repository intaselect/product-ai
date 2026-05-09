import { createClient } from "@supabase/supabase-js";

function cleanText(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ")
    .split(" ")
    .sort((a, b) => {
      // نخلي الكلمات تبدأ بالحروف مش الأرقام
      const isNumA = /^\d/.test(a);
      const isNumB = /^\d/.test(b);
      if (isNumA && !isNumB) return 1;
      if (!isNumA && isNumB) return -1;
      return 0;
    })
    .join(" ");
}

function makeSlug(query: string, country: string) {
  return `${query.replace(/\s+/g, "-")}-${country}`;
}

export async function saveSearch(query: string, country: string) {
  if (!query) return;

  const cleanQuery = cleanText(query);
  if (!cleanQuery) return;

  const cleanCountry = country?.toLowerCase().trim() || "sa";
  const slug = makeSlug(cleanQuery, cleanCountry);

  console.log("🔥 SERVER SAVE:", cleanQuery, cleanCountry, slug);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

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