import { createClient } from "@supabase/supabase-js";

async function getSearchData(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("search_terms")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
}

export default async function Page({ params }: any) {
  const { slug } = await params;

  const data = await getSearchData(slug);

  return (
    <main style={{ padding: "40px", color: "white", background: "#212121", minHeight: "100vh" }}>
      <h1>نتائج البحث عن: {decodeURIComponent(slug)}</h1>

      <p>عدد مرات البحث: {data?.search_count || 0}</p>

      <p>هذه صفحة مخصصة لتحسين ظهور البحث في جوجل.</p>
    </main>
  );
}