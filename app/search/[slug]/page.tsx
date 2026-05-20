import { createClient } from "@supabase/supabase-js";
import { fetchRealProducts } from "@/lib/fetchRealProducts";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import VideoPreview from "@/app/marketing-video/VideoPreview";
import SidebarMenu from "@/app/components/SidebarMenu";
import ShareSlugVideo from "@/app/components/ShareSlugVideo";
import { headers } from "next/headers";
  

export const revalidate = 43200; // 12 ساعة
function cleanSlug(slug: string) {
  return decodeURIComponent(slug)
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-");
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
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
  title: `${query} في ${countryName} | مقارنة أسعار وعروض | BPS Chat | بي بي اس شات`,
  description: `ابحث عن ${query} في ${countryName} وقارن الأسعار والعروض بسهولة عبر بي بي اس شات (BPS Chat) أفضل موقع لمقارنة الأسعار.`,
};
}

export default async function Page({ params }: any) {
  const { slug } = await params;

  const { query, countryCode, countryName } = parseSlug(slug);

  const data = await getSearchData(slug);

  let products: any[] = [];

// نحاول نجيب من الكاش الأول
function cleanCacheText(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ");
}

const cacheKey = `${countryCode}:${cleanCacheText(query)}`;

const { data: cached } = await supabase
  .from("product_cache")
  .select("results, expires_at")
  .eq("cache_key", cacheKey)
  .gt("expires_at", new Date().toISOString())
  .maybeSingle();

if (cached?.results?.length) {
  console.log("✅ SLUG CACHE HIT");
  products = cached.results;
} else {
  console.log("🔥 SLUG FETCH FROM API");

  try {
    



const headersList = await headers();

const realIp =
  headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  headersList.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
  headersList.get("x-real-ip") ||
  "unknown";
//const fresh = await fetchRealProducts(query, countryCode);
console.log("🚫 SLUG PAGE BLOCKED FROM SERPAPI");
products = [];
  //products = fresh || [];

  if (products.length > 0) {
   await supabase.from("product_cache").upsert({
  cache_key: cacheKey,
  query: cleanCacheText(query),
  country: countryCode,
  results: products,
  ip: realIp,
  updated_at: new Date().toISOString(),
  expires_at: new Date(
    Date.now() + 10 * 24 * 60 * 60 * 1000
  ).toISOString(),
});
  }
} catch (e) {
  console.log("❌ SLUG API FAILED");
  products = [];
}
}
  const validProducts = (products || []).filter((p: any) => p.price || p.priceText);

function getPriceNumber(product: any) {
  const raw = String(product.price || product.priceText || "");
  const num = Number(raw.replace(/[^\d.]/g, ""));
  return isNaN(num) ? null : num;
}
function getStoreName(product: any) {
  const raw = String(product.source || product.store || product.merchant || product.seller || "");
  const url = String(product.url || product.link || "");

  // تنظيف الاسم الأول
  if (raw) {
    if (raw.toLowerCase().includes("amazon")) return "Amazon";
    if (raw.toLowerCase().includes("noon")) return "Noon";
    if (raw.toLowerCase().includes("jumia")) return "Jumia";
    if (raw.toLowerCase().includes("jarir")) return "Jarir";
    if (raw.toLowerCase().includes("extra")) return "Extra";

    return raw; // لو متجر تاني
  }

  // fallback من الرابط
  if (url.includes("amazon.")) return "Amazon";
  if (url.includes("noon.")) return "Noon";
  if (url.includes("jumia.")) return "Jumia";
  if (url.includes("jarir.")) return "Jarir";
  if (url.includes("extra.")) return "Extra";

  return "متجر إلكتروني";
}
const currency =
  countryCode === "sa" ? "ريال" :
  countryCode === "ae" ? "درهم" :
  countryCode === "kw" ? "دينار" :
  countryCode === "qa" ? "ريال" :
  countryCode === "bh" ? "دينار" :
  "جنيه";
const productsWithPrices = validProducts
  .map((p: any) => ({
    ...p,
    numericPrice: getPriceNumber(p),
   storeName: getStoreName(p),
  }))
  .filter((p: any) => p.numericPrice);


const cheapestProduct = [...productsWithPrices].sort(
  (a: any, b: any) => a.numericPrice - b.numericPrice
)[0];

const highestProduct = [...productsWithPrices].sort(
  (a: any, b: any) => b.numericPrice - a.numericPrice
)[0];

const priceDiff = highestProduct && cheapestProduct
  ? highestProduct.numericPrice - cheapestProduct.numericPrice
  : null;

const stores = Array.from(
  new Set(productsWithPrices.map((p: any) => p.storeName))
).slice(0, 5);

const storeSummary = stores
  .map((store: any) => {
    const storeProducts = productsWithPrices.filter((p: any) => p.storeName === store);
    const cheapestInStore = [...storeProducts].sort(
  (a: any, b: any) => a.numericPrice - b.numericPrice
)[0];

    return {
      store,
      price: cheapestInStore?.priceText || cheapestInStore?.price,
      title: cheapestInStore?.title || cheapestInStore?.name,
    };
  })
  .filter((x: any) => x.price);
  const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${data?.query || query}`,
  description: `قارن أسعار ${data?.query || query} في ${countryName} واعرف أفضل العروض.`,
  brand: {
    "@type": "Brand",
    name: "BPS Chat",
  },
  offers:
    products?.slice(0, 5).map((product: any) => ({
      "@type": "Offer",
      price:
        product.price ||
        String(product.priceText || "").replace(/[^\d.]/g, ""),
      priceCurrency:
        countryCode === "sa"
          ? "SAR"
          : countryCode === "ae"
          ? "AED"
          : countryCode === "kw"
          ? "KWD"
          : countryCode === "qa"
          ? "QAR"
          : countryCode === "bh"
          ? "BHD"
          : "EGP",
      availability: "https://schema.org/InStock",
      url: product.url || product.link || "",
      seller: {
        "@type": "Organization",
        name: product.source || "Store",
      },
    })) || [],
};

return (
  <>
    <SidebarMenu />

    <main className="seoPage">
  <div className="aiBackground">
    <div className="brainCore"></div>
    <div className="grid"></div>
    <div className="particles">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} style={{ "--i": i } as any}></span>
      ))}
    </div>
  </div>
    
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(schema),
  }}
/>


{/* 🎥 Video Schema */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `أفضل سعر ${data?.query || query} في ${countryName}`,
      description: `فيديو مقارنة أسعار ${data?.query || query} في ${countryName}`,
      thumbnailUrl: "https://bpschat.com/og-image.png",
      uploadDate: new Date().toISOString(),
    }),
  }}
/>
    <SeoSearchBar />

    <div style={{ padding: "40px" }}>
      <h1>
  أفضل سعر {data?.query || query} في {countryName} عبر BPS Chat (بي بي اس شات)
</h1>
<p>
  موقع <strong>BPS Chat (بي بي اس شات)</strong> هو أفضل موقع لمقارنة أسعار المنتجات
  في {countryName}، حيث يمكنك البحث عن <strong>{data?.query || query}</strong>
  ومعرفة أرخص سعر من بين عدة متاجر مثل أمازون ونون وجوميا بسهولة.
  قارن بين الأسعار، اختار الأفضل، ووفّر فلوسك قبل الشراء.
</p>

<h2 style={{ marginTop: "30px" }}>أفضل عروض {data?.query || query}</h2>
<div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
  <p style={{ marginBottom: "10px", fontSize: "18px" }}>
    شاهد مقارنة الأسعار في فيديو 👇
  </p>

  <a
  href={`/api/slug-video?query=${encodeURIComponent(
    data?.query || query
  )}&country=${countryCode}`}
>
  <button
    style={{
      padding: "14px 24px",
      borderRadius: 14,
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #00d4ff, #00ffa6)",
      color: "#000",
      fontSize: "16px",
    }}
  >
    ⬇️ تحميل فيديو مقارنة الأسعار
  </button>
</a>
</div>

      <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
        {products?.slice(0, 20).map((product: any, index: number) => (
         <div
  key={index}
  className="seoProductCard"
>
          {(product.image || product.thumbnail) && (
  <img
  src={product.image || product.thumbnail}
  width={90}
  height={90}
  alt={`${product.title || product.name || query} - أفضل سعر في ${countryName}`}
  loading="lazy"
  style={{
    objectFit: "contain",
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
  {product.priceText || product.price || "السعر غير متوفر"}
</p>
<p style={{ margin: "4px 0", color: "#aaa", fontSize: "14px" }}>
  المتجر: {getStoreName(product)}
</p>

{(product.url || product.link) && (
  <a
    href={product.url || product.link}
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
      <div style={{ marginTop: "40px", marginBottom: "30px" }}>
  <h2>🎥 فيديو مقارنة الأسعار</h2>

  <VideoPreview
    query={data?.query || query}
    countryName={countryName}
    products={products}
  />
</div>
<ShareSlugVideo
  query={data?.query || query}
  countryName={countryName}
  countryCode={countryCode}
  slug={slug}
/>
      <section style={{ marginTop: "20px", lineHeight: "1.8" }}>
  <p dir="rtl">
  يعرض لك <span dir="ltr">BPS Chat</span> تحليلًا مباشرًا ومحدثًا لأسعار{" "}
  <strong>{data?.query || query}</strong> في {countryName}،
  مع مقارنة أفضل العروض من متاجر موثوقة مثل{" "}
  <span dir="ltr">
    {storeSummary.length > 0
      ? storeSummary.slice(0, 2).map((s: any) => s.store).join(" و ")
      : "متاجر مختلفة"}
  </span>
  ، لمساعدتك في اختيار أفضل سعر بسهولة.
</p>
{cheapestProduct ? (
  <>
    <p>
      أفضل سعر حاليًا لـ {data?.query || query} في {countryName}
      هو <span dir="ltr">{cheapestProduct.priceText || cheapestProduct.price}</span>
      من متجر {cheapestProduct.storeName}.
    </p>

    {priceDiff && (
      <p>
        يمكن أن يصل الفرق بين أعلى وأقل سعر إلى حوالي{" "}
        <span dir="ltr">{priceDiff.toLocaleString()} {currency}</span>،
        مما يجعل المقارنة بين المتاجر أمرًا مهمًا قبل الشراء.
      </p>
    )}

    {highestProduct && (
      <p>
        يعتبر السعر الحالي من متجر {cheapestProduct.storeName} من بين الأفضل في السوق،
        خاصة مقارنة بأعلى سعر والذي يصل إلى{" "}
        <span dir="ltr">{highestProduct.priceText || highestProduct.price}</span>.
      </p>
    )}
  </>
) : (
  <p>
    الأسعار قد تختلف حسب المتجر والتوفر والعروض الحالية، لذلك ننصح بمقارنة أكثر من نتيجة قبل الشراء.
  </p>
)}
 {storeSummary.length > 0 && (
  <div style={{ marginTop: "14px" }}>
    <p>من خلال النتائج الحالية، ظهرت عروض من عدة متاجر، منها:</p>

    <ul style={{ lineHeight: "2", marginTop: "8px", paddingRight: "22px" }}>
      {storeSummary.slice(0, 5).map((item: any) => (
        <li key={item.store}>
  <strong>{item.store}</strong>:
  السعر يبدأ من{" "}
  <span dir="ltr">{item.price}</span>
</li>
      ))}
    </ul>
  </div>
)}

  <p>
    هذه الصفحة تساعدك على معرفة سعر {data?.query || query} في {countryName}
    ومقارنة العروض من حيث السعر، المتجر، والتوفر قبل اتخاذ قرار الشراء.
  </p>
  <p>
  يتم تحديث الأسعار بشكل دوري بناءً على أحدث البيانات من المتاجر المختلفة لضمان عرض معلومات دقيقة وحديثة.
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
    </div>
    <PopularSearches />
    <style>{`
  .seoPage {
    color: white;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    background:
      radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
      radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
      #0b0f14;
  }

  .seoPage > *:not(.aiBackground) {
  position: relative;
  z-index: 2;
}

  .seoProductCard {
  position: relative;
overflow: hidden;
    display: flex;
    gap: 14px;
    padding: 16px;
    background: rgba(40,40,40,0.72);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    transition: all 0.25s ease;
  }

  .seoProductCard:hover {
 transform: translateY(-2px);

  border-color: rgba(0,255,200,0.45);

  box-shadow:
    0 0 22px rgba(0,255,200,0.22),
    0 12px 35px rgba(0,0,0,0.28);
}
  .aiBackground {
    position: fixed;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
  }

  .brainCore {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 450px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 30% 40%, rgba(0,255,200,1), transparent 10%),
      radial-gradient(circle at 50% 50%, rgba(0,180,255,0.9), transparent 12%),
      radial-gradient(circle at 70% 45%, rgba(16,163,127,1), transparent 10%),
      radial-gradient(circle at 45% 70%, rgba(0,220,255,0.9), transparent 8%);
    filter: blur(35px);
    opacity: 0.22;
    animation: brainPulse 6s ease-in-out infinite;
  }

  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,255,200,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,200,0.08) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.22;
    animation: gridMove 20s linear infinite;
  }

  .particles span {
    position: absolute;
    top: calc((var(--i) * 23%) % 100%);
    left: calc((var(--i) * 37%) % 100%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00f7ff;
    box-shadow:
      0 0 8px #00f7ff,
      0 0 18px #00f7ff,
      0 0 35px rgba(0,247,255,0.8);
    animation:
      floatParticle 8s ease-in-out infinite,
      particleGlow 2.5s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.2s);
  }

  @keyframes brainPulse {
    0%,100% { transform: translateX(-50%) scale(1); opacity: 0.22; }
    50% { transform: translateX(-50%) scale(1.06); opacity: 0.42; }
  }

  @keyframes gridMove {
    from { background-position: 0 0; }
    to { background-position: 120px 120px; }
  }

  @keyframes floatParticle {
    0%,100% { transform: translateY(0px) scale(1); opacity: 0.3; }
    50% { transform: translateY(-25px) scale(1.8); opacity: 1; }
  }

  @keyframes particleGlow {
    0%,100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.8); }
  }
`}</style>
     </main>
  </>
);
  
}