import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 🔥 أحدث عمليات البحث من الكاش
  const { data: cacheData } = await supabase
    .from("product_cache")
    .select("query, country, updated_at")
    .order("updated_at", { ascending: false })
    .limit(200);

  // 🔥 الأكثر شيوعًا
  const { data: popularData } = await supabase
    .from("search_terms")
    .select("query, country, search_count")
    .order("search_count", { ascending: false })
    .limit(200);

  // 🔥 دمج الاتنين
  const map = new Map();

  // 1️⃣ نحط الكاش الأول (الأحدث)
  (cacheData || []).forEach((item: any) => {
    const key = item.query + "-" + item.country;

    map.set(key, {
      query: item.query,
      country: item.country,
      updated_at: item.updated_at,
      score: Date.now(), // أعلى أولوية
    });
  });

  // 2️⃣ نضيف الشائع لو مش موجود
  (popularData || []).forEach((item: any) => {
    const key = item.query + "-" + item.country;

    if (!map.has(key)) {
      map.set(key, {
        query: item.query,
        country: item.country,
        score: item.search_count || 0,
      });
    }
  });

  // 🔥 تحويل Array
  let searches = Array.from(map.values());

  // 🔥 ترتيب (الأحدث الأول)
  searches.sort((a: any, b: any) => {
    return (b.updated_at || 0) - (a.updated_at || 0);
  });

  // 🔥 نعمل slug
  searches = searches.map((item: any) => {
    const slug =
      item.query
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "") +
      "-" +
      item.country;

    return {
      query: item.query,
      country: item.country,
      slug,
    };
  });

  return NextResponse.json({ searches });
}