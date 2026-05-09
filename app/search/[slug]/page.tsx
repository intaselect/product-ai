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
      <section style={{ marginTop: "20px", lineHeight: "1.8" }}>
  <p>
    إذا كنت تبحث عن أفضل سعر {data?.query || query} في {countryName}، فأنت في المكان الصحيح.
    نوفر لك مقارنة شاملة لأحدث الأسعار والعروض من مختلف المتاجر.
  </p>

  <p>
    يمكنك العثور على {data?.query || query} بأفضل الأسعار في {countryName} مع إمكانية مقارنة المنتجات
    من حيث السعر، الجودة، والتقييمات قبل اتخاذ قرار الشراء.
  </p>

  <p>
    Looking for the best price for {data?.query || query} in {countryName}?  
    Compare deals, check prices, and find the best offers from trusted stores.
  </p>
</section>
<section style={{ marginTop: "20px" }}>
  <h2>كلمات مرتبطة بـ {data?.query || query}</h2>

  <p style={{ lineHeight: "2" }}>
    سعر {data?.query || query} في {countryName} - 
    عروض {data?.query || query} - 
    شراء {data?.query || query} - 
    {data?.query || query} مستعمل - 
    {data?.query || query} جديد - 
    best price {data?.query || query} - 
    {data?.query || query} price today
  </p>
</section>

      <p>عدد مرات البحث: {data?.search_count || 0}</p>

      <p>
  إذا كنت تبحث عن أفضل سعر {data?.query || query} في {countryName} فأنت في المكان الصحيح.
  نقدم لك مقارنة شاملة لأفضل العروض المتاحة لـ {data?.query || query} في {countryName} من مختلف المتاجر.
</p>

<h2 style={{ marginTop: "30px" }}>سعر {data?.query || query} في {countryName}</h2>

<p>
  يختلف سعر {data?.query || query} في {countryName} حسب المتجر والعروض المتاحة.
  يمكنك من خلال هذه الصفحة معرفة أحدث الأسعار ومقارنة المنتجات بسهولة.
</p>

<h2 style={{ marginTop: "30px" }}>أفضل عروض {data?.query || query}</h2>

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
    alt={`${product.title || product.name || query} - أفضل سعر في ${countryName}`}
    loading="lazy"
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
      <section style={{ marginTop: "40px" }}>
        <section style={{ marginTop: "40px" }}>
  <h2>عمليات بحث شائعة عن {data?.query || query} في {countryName}</h2>

  <ul style={{ marginTop: "16px", lineHeight: "2" }}>
    <li>سعر {data?.query || query} في {countryName}</li>
    <li>أفضل عروض {data?.query || query} في {countryName}</li>
    <li>أرخص {data?.query || query} في {countryName}</li>
    <li>{data?.query || query} جديد ومستعمل في {countryName}</li>
    <li>مقارنة أسعار {data?.query || query} في {countryName}</li>
    <li>{data?.query || query} أونلاين في {countryName}</li>
    <li>{data?.query || query} price in {countryName}</li>
    <li>best price {data?.query || query} in {countryName}</li>
  </ul>
</section>
  <h2>
    أسئلة شائعة عن {data?.query || query} في {countryName}
  </h2>

  <div style={{ marginTop: "20px", display: "grid", gap: "16px" }}>
    
    <div>
      <h3>ما هو أفضل سعر {data?.query || query} في {countryName}؟</h3>
      <p>
        يختلف أفضل سعر {data?.query || query} في {countryName} حسب المتجر والعروض المتاحة.
        يمكنك مقارنة الأسعار بسهولة من خلال هذه الصفحة للحصول على أفضل صفقة.
      </p>
    </div>

    <div>
      <h3>أين يمكن شراء {data?.query || query} في {countryName}؟</h3>
      <p>
        يمكنك شراء {data?.query || query} في {countryName} من خلال المتاجر الإلكترونية المختلفة
        مثل المتاجر المحلية والعالمية، مع إمكانية مقارنة الأسعار قبل الشراء.
      </p>
    </div>

    <div>
      <h3>هل يوجد عروض على {data?.query || query} في {countryName}؟</h3>
      <p>
        نعم، تتوفر عروض وخصومات على {data?.query || query} في {countryName} بشكل مستمر،
        خاصة خلال المواسم والعروض الخاصة مثل الجمعة البيضاء.
      </p>
    </div>

    <div>
      <h3>هل الأسعار تتغير باستمرار؟</h3>
      <p>
        نعم، أسعار {data?.query || query} في {countryName} تتغير حسب التوفر والعروض،
        لذلك يُفضل متابعة الأسعار بشكل مستمر للحصول على أفضل سعر.
      </p>
    </div>

  </div>
</section>
    </main>
  );
}