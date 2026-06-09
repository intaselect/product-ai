import { createClient } from "@supabase/supabase-js";
import { fetchRealProducts } from "@/lib/fetchRealProducts";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import VideoPreview from "@/app/marketing-video/VideoPreview";
import SidebarMenu from "@/app/components/SidebarMenu";
import ShareSlugVideo from "@/app/components/ShareSlugVideo";
import { headers } from "next/headers";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
  

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
  const { query, countryName, clean } = parseSlug(slug);
  const pageUrl = `https://www.bpschat.com/search/${clean}`;

  return {
    title: `أفضل سعر ${query} في ${countryName} اليوم | مقارنة أسعار BPS Chat`,
    description: `قارن سعر ${query} في ${countryName} اليوم من عدة متاجر، وشاهد أرخص العروض قبل الشراء عبر BPS Chat بي بي اس شات.`,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `أفضل سعر ${query} في ${countryName} | BPS Chat`,
      description: `قارن أسعار ${query} في ${countryName} واعرف أرخص عرض قبل الشراء.`,
      url: pageUrl,
      siteName: "BPS Chat | بي بي اس شات",
      images: [
        {
          url: "https://www.bpschat.com/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
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
  const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://www.bpschat.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: countryName,
      item: `https://www.bpschat.com/${countryCode}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: query,
      item: `https://www.bpschat.com/search/${slug}`,
    },
  ],
};
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
type MarketOffer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  product_url: string;
  store_name: string | null;
  country: string | null;
};

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const countryCurrencies: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};

const { data: marketOffers } = await supabase
  .from("customer_offers")
  .select("id, product_name, price, image_url, product_url, store_name, country")
  .eq("status", "approved")
  .eq("country", countryCode)
  .order("created_at", { ascending: false })
  .limit(40);

const slugMarketOffers = (marketOffers || []) as MarketOffer[];
const queryWords = String(query || "")
  .split(/\s+/)
  .filter((w) => w.length > 2)
  .slice(0, 4);

const searchFilters = queryWords
  .map((w) => `query.ilike.%${w}%`)
  .join(",");

const { data: relatedSearchTerms } = await supabase
  .from("search_terms")
  .select("query, slug, search_count")
  .eq("country", countryCode)
  .or(searchFilters)
  .order("search_count", { ascending: false })
  .limit(30);
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
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>
    <SeoSearchBar />
    <section className="slugMarketHero" dir="rtl">
  <div className="slugMarketText">
    <div className="slugMarketBadge">🛒 BPS Market | بي بي اس ماركت</div>

    <h2>
      عروض حقيقية قريبة من بحثك في <span>{countryName}</span>
    </h2>

    <p>
      أثناء بحثك عن <strong>{data?.query || query}</strong>، تقدر كمان تشوف عروض
      العملاء والمتاجر داخل {countryName} من BPS Market.
    </p>

    <div className="slugMarketActions">
      <a href={`/customer-offers?country=${countryCode}`} className="slugPrimaryBtn">
        🔥 تصفح عروض {countryName}
      </a>

      <a href="/customer-offers/add" className="slugSecondaryBtn">
        + أضف عرضك
      </a>
    </div>
  </div>

  <div className="slugMarketVisual">
    <div className="slugDealCard big">
      <span>Today Deals 🔥</span>
      <strong>{slugMarketOffers.length}</strong>
      <small>عروض مناسبة لدولتك</small>
    </div>

    <div className="slugDealCard small one">
      <span>Best Prices</span>
      <strong>{countryName}</strong>
    </div>

    <div className="slugDealCard small two">
      <span>BPS Market</span>
      <strong>Local Deals</strong>
    </div>
  </div>
</section>
<SearchBeforeBuyBanner />
{slugMarketOffers.length > 0 && (
  <section className="slugMarketOffers" dir="rtl">
    <div className="slugSectionHeader">
      <div>
        <h2>🔥 عروض من المتجر في {countryName}</h2>
        <p>منتجات مختارة من BPS Market حسب الدولة</p>
      </div>

      <a href={`/customer-offers?country=${countryCode}`}>عرض كل العروض</a>
    </div>

    <div className="slugOffersGrid">
      {slugMarketOffers.map((offer) => (
        <article className="slugOfferCard" key={offer.id}>
          <div className="slugOfferImage">
            <img src={offer.image_url} alt={offer.product_name} loading="lazy" />
            <span>{countryNames[offer.country || ""] || countryName}</span>
          </div>

          <div className="slugOfferContent">
            <p>{offer.store_name || "عرض عميل BPS Chat"}</p>
            <h3>{offer.product_name}</h3>

            <div className="slugPriceRow">
              <strong>{offer.price}</strong>
              <small>{countryCurrencies[offer.country || ""]}</small>
            </div>

            <a
              href={`/api/customer-offers/click/${offer.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              عرض المنتج
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
)}

    <div style={{ padding: "40px" }}>
      <h1>
  أفضل سعر {data?.query || query} في {countryName} عبر BPS Chat (بي بي اس شات)
</h1>
<section className="faqSeoSection">
  <h2>أسئلة شائعة حول {data?.query || query}</h2>

  <h3>ما أفضل سعر {data?.query || query} في {countryName}؟</h3>
  <p>
    يعرض BPS Chat الأسعار المتوفرة من عدة متاجر لمساعدتك في الوصول إلى أفضل سعر.
  </p>

  <h3>أين يمكن شراء {data?.query || query} في {countryName}؟</h3>
  <p>
    يمكنك مقارنة العروض المتاحة ثم الانتقال مباشرة إلى المتجر المناسب.
  </p>

  <h3>هل تختلف الأسعار بين المتاجر؟</h3>
  <p>
    نعم، تختلف حسب العروض والتخفيضات والشحن والتوفر.
  </p>
</section>
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
  {relatedSearchTerms && relatedSearchTerms.length > 0 && (
  <>
    <h3 style={{ marginTop: "20px" }}>
      عمليات بحث حقيقية مرتبطة بـ {data?.query || query}
    </h3>

    <div className="relatedSearchLinks">
      {relatedSearchTerms.map((item: any) => (
        <a
          key={item.slug}
          href={`/search/${item.slug}`}
          className="relatedSearchLink"
        >
          {item.query}
        </a>
      ))}
    </div>
  </>
)}

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
    .slugMarketHero {
  max-width: 1320px;
  margin: 26px auto 28px;
  padding: 42px 32px;
  border-radius: 34px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #2563eb 100%);
  box-shadow: 0 18px 50px rgba(0,0,0,0.22);
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 28px;
  align-items: center;
  overflow: hidden;
}

.slugMarketText h2 {
  margin: 0;
  font-size: clamp(26px, 4vw, 44px);
  font-weight: 950;
  color: #fff;
}

.slugMarketText h2 span {
  background: linear-gradient(135deg, #22c55e, #60a5fa, #fff);
  -webkit-background-clip: text;
  color: transparent;
}

.slugMarketText p {
  color: #dbeafe;
  line-height: 1.9;
  font-size: 15px;
  max-width: 760px;
}

.slugMarketBadge {
  display: inline-flex;
  padding: 8px 15px;
  border-radius: 999px;
  background: rgba(34,197,94,0.14);
  border: 1px solid rgba(34,197,94,0.35);
  color: #bbf7d0;
  font-size: 12px;
  font-weight: 950;
  margin-bottom: 10px;
}

.slugMarketActions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.slugPrimaryBtn,
.slugSecondaryBtn {
  text-decoration: none;
  padding: 14px 24px;
  border-radius: 15px;
  font-weight: 950;
  transition: all .25s ease;
}

.slugPrimaryBtn {
  background: #22c55e;
  color: #fff;
  box-shadow: 0 10px 28px rgba(34,197,94,0.3);
}

.slugSecondaryBtn {
  background: rgba(255,255,255,0.13);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.16);
}

.slugPrimaryBtn:hover,
.slugSecondaryBtn:hover {
  transform: translateY(-3px) scale(1.03);
}

.slugMarketVisual {
  position: relative;
  min-height: 230px;
}

.slugDealCard {
  position: absolute;
  background: rgba(255,255,255,0.96);
  color: #111827;
  border-radius: 26px;
  padding: 20px;
  box-shadow: 0 22px 55px rgba(0,0,0,0.22);
}

.slugDealCard span {
  color: #2563eb;
  font-weight: 950;
  display: block;
  margin-bottom: 10px;
}

.slugDealCard strong {
  color: #16a34a;
  font-size: 28px;
  font-weight: 950;
  display: block;
}

.slugDealCard.big {
  width: 240px;
  min-height: 145px;
  left: 35px;
  top: 30px;
}

.slugDealCard.small {
  width: 175px;
}

.slugDealCard.one {
  right: 0;
  top: 0;
}

.slugDealCard.two {
  right: 55px;
  bottom: 5px;
}

.slugMarketOffers {
  max-width: 1320px;
  margin: 0 auto 26px;
  padding: 0 20px;
}

.slugSectionHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.slugSectionHeader h2 {
  color: #fff;
  margin: 0;
  font-size: 26px;
  font-weight: 950;
}

.slugSectionHeader p {
  color: #cbd5e1;
  margin: 5px 0 0;
}

.slugSectionHeader a {
  color: #22c55e;
  font-weight: 950;
  text-decoration: none;
}

.slugOffersGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.slugOfferCard {
  background: #fff;
  color: #111827;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 14px 34px rgba(0,0,0,0.16);
  transition: all .25s ease;
}

.slugOfferCard:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 45px rgba(0,0,0,0.22);
}

.slugOfferImage {
  position: relative;
  height: 220px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.slugOfferImage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.slugOfferImage span {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 7px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);
  color: #fff;
  font-size: 11px;
  font-weight: 950;
}

.slugOfferContent {
  padding: 14px;
}

.slugOfferContent p {
  margin: 0 0 8px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 800;
}

.slugOfferContent h3 {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.7;
  min-height: 48px;
}

.slugPriceRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.slugPriceRow strong {
  color: #16a34a;
  font-size: 24px;
  font-weight: 950;
}

.slugPriceRow small {
  background: #dcfce7;
  color: #166534;
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 900;
}

.slugOfferContent a {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 13px;
  border-radius: 14px;
  background: #111827;
  color: #fff;
  font-weight: 950;
}

.slugOfferContent a:hover {
  background: #2563eb;
}

@media (max-width: 900px) {
  .slugMarketHero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .slugMarketVisual {
    display: none;
  }

  .slugMarketActions {
    justify-content: center;
  }

  .slugOffersGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .slugMarketHero {
    margin: 18px 12px;
    padding: 24px 16px;
    border-radius: 24px;
  }

  .slugOffersGrid {
    grid-template-columns: 1fr;
  }

  .slugSectionHeader {
    flex-direction: column;
    align-items: flex-start;
  }
}
  .relatedSearchLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.relatedSearchLink {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(0,255,200,0.25);
  color: #7fffe0;
  text-decoration: none;
  font-weight: 800;
  transition: .25s;
}

.relatedSearchLink:hover {
  background: rgba(0,255,200,0.12);
  transform: translateY(-2px);
}
`}</style>
     </main>
  </>
);
  
}