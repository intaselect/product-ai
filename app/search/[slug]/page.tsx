import { createClient } from "@supabase/supabase-js";
import { fetchRealProducts } from "@/lib/fetchRealProducts";

function cleanSlug(slug: string) {
  return decodeURIComponent(slug)
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-");
}

const countryMap: any = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

function parseSlug(slug: string) {
  const clean = cleanSlug(slug);
  const parts = clean.split("-");
  const countryCode = parts.pop() || "sa";
  const query = parts.join(" ");

  return {
    clean,
    countryCode,
    query,
    countryName: countryMap[countryCode] || countryCode,
  };
}

async function getSearchData(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { clean } = parseSlug(slug);

  const { data, error } = await supabase
    .from("search_terms")
    .select("*")
    .eq("slug", clean)
    .maybeSingle();

  if (error) {
    console.error("SEO page Supabase error:", error);
  }

  return data;
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const { query, countryName } = parseSlug(slug);

  return {
    title: `أفضل سعر ${query} في ${countryName}`,
    description: `قارن أسعار ${query} في ${countryName} واعرف أفضل العروض والمتاجر المتاحة.`,
  };
}

export default async function Page({ params }: any) {
  const { slug } = await params;

  const { query, countryCode, countryName } = parseSlug(slug);

  const data = await getSearchData(slug);

  const products = await fetchRealProducts(query, countryCode);

  return (
    <main style={{ padding: "40px", color: "white", background: "#212121", minHeight: "100vh" }}>
      <h1>أفضل سعر {data?.query || query} في {countryName}</h1>

      <p>عدد مرات البحث: {data?.search_count || 0}</p>

      <p>
        عروض {data?.query || query} في {countryName} وأفضل أماكن الشراء والمتاجر المتاحة.
      </p>

      <h2 style={{ marginTop: "30px" }}>أفضل المنتجات المتاحة</h2>

      <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
        {products?.slice(0, 20).map((product: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "14px",
              padding: "16px",
              border: "1px solid #444",
              borderRadius: "14px",
              background: "#2b2b2b",
            }}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.title || product.name || query}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  background: "#fff",
                }}
              />
            )}

            <div>
              <h3 style={{ margin: 0 }}>
                {product.title || product.name || "منتج"}
              </h3>

              <p style={{ margin: "8px 0" }}>
                {product.price || product.priceText || ""}
              </p>

              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  style={{ color: "#10a37f" }}
                >
                  عرض المنتج
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}