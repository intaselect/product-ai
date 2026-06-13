import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { headers } from "next/headers";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "أفضل عروض العملاء | BPS Chat - بي بي اس شات",
  description:
  "اكتشف عروض العملاء والمتاجر على BPS Chat وقارن المنتجات من Amazon و Noon و Jumia و Jarir و Extra و Carrefour و Sharaf DG و Xcite و Namshi و Trendyol و AliExpress و Temu و Shein في السعودية والإمارات والكويت والبحرين ومصر.",
  keywords: [
    "أفضل عروض العملاء",
    "عروض BPS Chat",
    "بي بي اس شات",
    "عروض منتجات",
    "خصومات",
    "أفضل سعر",
    "مقارنة أسعار",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض مصر",
    "Amazon",
"Noon",
"Jumia",
"Jarir",
"Extra",
"Carrefour",
"Sharaf DG",
"Xcite",
"Namshi",
"Trendyol",
"AliExpress",
"Temu",
"Shein",
"B.TECH",
"Homzmart",
"Breadfast",
"OpenSooq",
"Blink",
"Best Al Yousifi",
"Eureka",
"Lulu",
"Mumzworld",
"Dubizzle",
"D4D Online",
"مقارنة أسعار أمازون",
"مقارنة أسعار نون",
"مقارنة أسعار جوميا",
  ],
};

type CustomerOffer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  image_url_2: string | null;
image_url_3: string | null;
  product_url: string;
  store_name: string | null;
  country: string | null;
  category: string[] | null;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const vercelCountryToCode: Record<string, string> = {
  SA: "sa",
  AE: "ae",
  KW: "kw",
  QA: "qa",
  BH: "bh",
  EG: "eg",
};

async function getVisitorCountry() {
  const h = await headers();
  const vercelCountry = h.get("x-vercel-ip-country") || "";
  return vercelCountryToCode[vercelCountry.toUpperCase()] || "all";
}

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

function formatOfferPrice(price: string, country?: string | null) {
  const currency = countryCurrencies[country || ""] || "";
  return currency ? `${price} ${currency}` : price;
}
function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function productSeoUrl(offer: any) {
  return `/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}
const categoryCards: Record<string, { ar: string; en: string; icon: string }> = {
  all: { ar: "كل العروض", en: "All Deals", icon: "🛍️" },
  mobiles: { ar: "جوالات وتابلت", en: "Mobiles", icon: "📱" },
  electronics: { ar: "إلكترونيات", en: "Electronics", icon: "🎧" },
  computers: { ar: "كمبيوتر ولابتوب", en: "Computers", icon: "💻" },
  home: { ar: "المنزل والمطبخ", en: "Home", icon: "🏠" },
  beauty: { ar: "جمال وعناية", en: "Beauty", icon: "💄" },
  fashion: { ar: "ملابس", en: "Fashion", icon: "👕" },
  shoes: { ar: "أحذية", en: "Shoes", icon: "👟" },
  sports: { ar: "رياضة", en: "Sports", icon: "🏋️" },
  kids: { ar: "أطفال", en: "Kids", icon: "🧸" },
  cars: { ar: "سيارات", en: "Cars", icon: "🚗" },
  cameras: { ar: "كاميرات", en: "Cameras", icon: "📷" },
camera_accessories: { ar: "ملحقات كاميرات", en: "Camera Accessories", icon: "🎥" },
mobile_accessories: {
  ar: "إكسسوارات جوالات",
  en: "Mobile Accessories",
  icon: "📲",
},

smart_watch: {
  ar: "ساعات ذكية",
  en: "Smart Watches",
  icon: "⌚",
},

power_bank: {
  ar: "باور بانك",
  en: "Power Banks",
  icon: "🔋",
},

chargers: {
  ar: "شواحن وكابلات",
  en: "Chargers",
  icon: "🔌",
},

headphones: {
  ar: "سماعات",
  en: "Headphones",
  icon: "🎧",
},

computer_accessories: {
  ar: "إكسسوارات كمبيوتر",
  en: "Computer Accessories",
  icon: "🖱️",
},

gaming: {
  ar: "ألعاب وجيمينج",
  en: "Gaming",
  icon: "🎮",
},

bags: {
  ar: "شنط",
  en: "Bags",
  icon: "👜",
},
  other: { ar: "المزيد", en: "More", icon: "▦" },
};
const categoryNames: Record<string, string> = {
  all: "كل العروض",
  electronics: "إلكترونيات",
  mobiles: "جوالات وتابلت",
  mobile_accessories: "إكسسوارات جوالات",
  smart_watch: "ساعات ذكية",
  power_bank: "باور بانك",
  chargers: "شواحن وكابلات",
  headphones: "سماعات",
  computers: "كمبيوتر ولابتوب",
  computer_accessories: "إكسسوارات كمبيوتر",
  gaming: "ألعاب وجيمينج",
  home: "المنزل والمطبخ",
  fashion: "ملابس",
  shoes: "أحذية",
  bags: "شنط",
  beauty: "جمال وعناية",
  cars: "سيارات وإكسسوارات",
  kids: "أطفال",
  sports: "رياضة",
  cameras: "كاميرات",
camera_accessories: "ملحقات كاميرات",
  other: "أخرى",
};
const brandDefinitions = [
  { key: "apple", label: "Apple", terms: ["apple", "iphone", "ipad", "macbook", "airpods", "ابل", "ايفون"] },
  { key: "samsung", label: "Samsung", terms: ["samsung", "galaxy", "سامسونج"] },
  { key: "hp", label: "HP", terms: ["hp", "اتش بي"] },
  { key: "lenovo", label: "Lenovo", terms: ["lenovo", "لينوفو", "thinkpad", "ideapad", "legion"] },
  { key: "dell", label: "Dell", terms: ["dell"] },
  { key: "asus", label: "ASUS", terms: ["asus"] },
  { key: "acer", label: "Acer", terms: ["acer"] },
  { key: "msi", label: "MSI", terms: ["msi"] },
  { key: "sony", label: "Sony", terms: ["sony", "playstation", "بلايستيشن", "سوني"] },
  { key: "xiaomi", label: "Xiaomi", terms: ["xiaomi", "redmi", "poco", "شاومي"] },
  { key: "huawei", label: "Huawei", terms: ["huawei", "هواوي"] },
  { key: "oppo", label: "OPPO", terms: ["oppo", "اوبو"] },
  { key: "realme", label: "Realme", terms: ["realme", "ريلمي"] },
  { key: "canon", label: "Canon", terms: ["canon", "كانون"] },
  { key: "nikon", label: "Nikon", terms: ["nikon", "نيكون"] },
];

function detectBrand(offer: CustomerOffer) {
  const text = `${offer.product_name || ""} ${offer.store_name || ""}`.toLowerCase();

  return brandDefinitions.find((brand) =>
    brand.terms.some((term) => text.includes(term.toLowerCase()))
  );
}
export default async function CustomerOffersPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const params = await searchParams;

  const selectedCategory = params?.category || "all";
const visitorCountry = await getVisitorCountry();
const selectedCountry = params?.country || visitorCountry;
const heroCountryName =
  selectedCountry === "all"
    ? "كل الدول"
    : countryNames[selectedCountry] || "منطقتك";

const heroCountryUrl =
  selectedCountry === "all"
    ? "/customer-offers"
    : `/customer-offers?country=${selectedCountry}`;

const searchQuery = String(params?.q || "").trim();
const selectedBrand = String(params?.brand || "").trim().toLowerCase();

const page = Math.max(1, Number(params?.page || 1));
const limit = 100;
const from = (page - 1) * limit;
const to = from + limit - 1;

let error: any = null;

const gccFallbackCountries = ["kw", "qa", "bh"];

let localCountQuery = supabase
  .from("customer_offers")
  .select("id", { count: "exact", head: true })
  .eq("status", "approved");

if (selectedCountry !== "all") {
  localCountQuery = localCountQuery.eq("country", selectedCountry);
}

const { count: localCount } = await localCountQuery;

const shouldUseSaudiFallback =
  gccFallbackCountries.includes(selectedCountry) &&
  selectedCountry !== "all" &&
  (localCount || 0) === 0;

let query = supabase
  .from("customer_offers")
  .select(
    "id, product_name, price, image_url, image_url_2, image_url_3, product_url, store_name, country, category, created_at",
    { count: "exact" }
  )
  .eq("status", "approved")
  .order("created_at", { ascending: false });

if (selectedCountry !== "all") {
  query = query.eq("country", shouldUseSaudiFallback ? "sa" : selectedCountry);
}

if (selectedCategory !== "all") {
  query = query.contains("category", [selectedCategory]);
}

if (searchQuery) {
  query = query.or(
    `product_name.ilike.%${searchQuery}%,store_name.ilike.%${searchQuery}%,price.ilike.%${searchQuery}%`
  );
}

if (selectedBrand) {
  const brand = brandDefinitions.find((b) => b.key === selectedBrand);

  if (brand) {
    const brandOr = brand.terms
      .flatMap((term) => [
        `product_name.ilike.%${term}%`,
        `store_name.ilike.%${term}%`,
      ])
      .join(",");

    query = query.or(brandOr);
  }
}

const { data: offers, error: offersError, count } = await query.range(from, to);

if (offersError) {
  error = offersError;
}

const filteredOffers = (offers || []) as CustomerOffer[];
const totalOffers = count || 0;
const hasMore = page * limit < totalOffers;

function buildOffersUrl(nextPage: number) {
  const urlParams = new URLSearchParams();

  if (selectedCategory !== "all") {
    urlParams.set("category", selectedCategory);
  }

  if (selectedCountry !== "all") {
    urlParams.set("country", selectedCountry);
  }

  if (searchQuery) {
    urlParams.set("q", searchQuery);
  }

  if (selectedBrand) {
    urlParams.set("brand", selectedBrand);
  }

  urlParams.set("page", String(nextPage));

  return `/customer-offers?${urlParams.toString()}`;
}

function buildFilterUrl(values: {
  category?: string;
  country?: string;
  brand?: string;
  q?: string;
}) {
  const urlParams = new URLSearchParams();

  const category = values.category ?? selectedCategory;
  const country = values.country ?? selectedCountry;
  const brand = values.brand ?? selectedBrand;
  const q = values.q ?? searchQuery;

  if (category && category !== "all") urlParams.set("category", category);
  if (country && country !== "all") urlParams.set("country", country);
  if (brand) urlParams.set("brand", brand);
  if (q) urlParams.set("q", q);

  const qs = urlParams.toString();
  return qs ? `/customer-offers?${qs}` : "/customer-offers";
}

const countryCategoryOffers = filteredOffers;

const availableBrands = brandDefinitions
  .map((brand) => {
    const count = countryCategoryOffers.filter((offer) => {
      const detected = detectBrand(offer);
      return detected?.key === brand.key;
    }).length;

    return { ...brand, count };
  })
  .filter((brand) => brand.count > 0);

const featuredSliderOffers = filteredOffers
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, 18);

const categorySliderItems = Object.entries(categoryCards)
  .filter(([key]) => key !== "all")
  .map(([key, cat]) => {
    const categoryOffer = filteredOffers.find((offer) =>
      (offer.category || []).includes(key)
    );

    return {
      key,
      ...cat,
      image: categoryOffer?.image_url || "",
    };
  });
return (
  <main className="customerOffersPage" dir="rtl">
    
      <section className="hero marketplaceHero">
  <div className="heroText">
    <div className="badge">🛒 BPS Market | بي بي اس ماركت</div>

    <h1>
      أفضل عروض <span>{heroCountryName}</span>
    </h1>

    <p>
      اكتشف عروض ومنتجات مختارة في {heroCountryName} من العملاء والمتاجر
      على BPS Market by BPS Chat.
      <br />
      Discover best deals, trending products, electronics, fashion,
      mobiles and home appliances in {heroCountryName}.
    </p>

    <div className="heroActions">
      <a href={heroCountryUrl} className="primaryBtn">
        تصفح عروض {heroCountryName}
      </a>

      <a href="/customer-offers/add" className="secondaryBtn">
        + أضف عرضك
      </a>
    </div>
  </div>

  <div className="heroVisual">
    <div className="dealCard bigDeal">
      <span>🔥 Today Deals</span>
      <strong>{filteredOffers.length}</strong>
      <small>عرض متاح الآن</small>
    </div>

    <div className="dealCard smallDeal one">
      <span>📱 Mobiles</span>
      <strong>Best Prices</strong>
    </div>

    <div className="dealCard smallDeal two">
      <span>🚚 Local Deals</span>
      <strong>{heroCountryName}</strong>
    </div>
  </div>
</section>
<section className="fireMarketStrip">
  <div className="fireMarketContent">
    <div>
      <span className="fireMarketBadge">🔥 BPS Market</span>

      <h2>تصفح المتجر حسب الدولة والتصنيف</h2>

      <p>
        جوالات، إلكترونيات، لابتوبات، أطفال، جمال وعناية،
        مع صفحات SEO قوية لكل دولة وقسم.
      </p>
    </div>

    <a href="/bps-market" className="fireMarketBtn">
      🔥 تصفح المتجر
    </a>
  </div>
</section>
<SearchBeforeBuyBanner />

     <section
  id="market-filters"
  className="marketCategorySection"
>
  <div className="sectionTitleRow">
    <div>
      <h2>تسوق حسب القسم</h2>
      <p>Shop by Category</p>
    </div>
    <a href="/customer-offers">عرض كل العروض</a>
  </div>

  <div className="marketCategoryGrid">
    {Object.entries(categoryCards).map(([key, item]) => (
      <a
        key={key}
        href={
          key === "all"
            ? selectedCountry === "all"
              ? "/customer-offers"
              : `/customer-offers?country=${selectedCountry}`
            : selectedCountry === "all"
              ? `/customer-offers?category=${key}`
              : `/customer-offers?category=${key}&country=${selectedCountry}`
        }
        className={selectedCategory === key ? "marketCategoryCard active" : "marketCategoryCard"}
      >
        <span className="categoryIcon">{item.icon}</span>
        <strong>{item.ar}</strong>
        <small>{item.en}</small>
      </a>
    ))}
  </div>
</section>

      <section className="seoBox">
        <h2>عروض منتجات حقيقية من العملاء والمتاجر</h2>
       <p>
  في صفحة أفضل عروض عملاء بي بي اس شات يمكنك اكتشاف عروض منتجات،
  خصومات، أسعار مميزة، وروابط مباشرة للشراء من المتاجر. الصفحة تساعد
  المستخدمين في الوصول لعروض قوية داخل السعودية، الإمارات، الكويت،
  قطر، البحرين ومصر، مع ربط تجربة البحث والمقارنة بأشهر المتاجر مثل
  Amazon و Noon و Jumia و Jarir و Extra و Carrefour و Sharaf DG و Xcite
  و Namshi و Trendyol و AliExpress و Temu و Shein و B.TECH و Lulu.
</p>
      </section>
      
      <section className="categoryTabs">
  {Object.entries(categoryNames).map(([key, label]) => (
    <a
      key={key}
     href={
  key === "all"
    ? selectedCountry === "all"
      ? "/customer-offers"
      : `/customer-offers?country=${selectedCountry}`
    : selectedCountry === "all"
      ? `/customer-offers?category=${key}`
      : `/customer-offers?category=${key}&country=${selectedCountry}`
}
      className={selectedCategory === key ? "active" : ""}
    >
      {label}
    </a>
  ))}
</section>
<section className="offersSearchBox">
  <form action="/customer-offers" className="offersSearchForm">
    {selectedCategory !== "all" && (
      <input type="hidden" name="category" value={selectedCategory} />
    )}
    <input
      name="q"
      defaultValue={params?.q || ""}
      placeholder="ابحث داخل متجر العملاء... مثال: موبايل ريلمي"
    />
   <select name="country" defaultValue={selectedCountry} className="countrySelect">
  <option value="all">🌍 كل الدول</option>
  <option value="sa">🇸🇦 السعودية</option>
  <option value="ae">🇦🇪 الإمارات</option>
  <option value="kw">🇰🇼 الكويت</option>
  <option value="qa">🇶🇦 قطر</option>
  <option value="bh">🇧🇭 البحرين</option>
  <option value="eg">🇪🇬 مصر</option>
</select>

    <button type="submit">
  🔎 بحث
</button>

   
    {searchQuery && (
      <a href="/customer-offers">مسح البحث</a>
    )}
  </form>
</section>
<div className="countryBox premiumCountryBox">
  <div className="countryBoxHeader">
    <div>
      <span>🌍 اختر سوقك</span>
      <small>Choose your market</small>
    </div>
    <p>العروض تظهر حسب الدولة المختارة</p>
  </div>

  <section className="countryTabs premiumCountryTabs">
    <a
      href={
        selectedCategory === "all"
          ? "/customer-offers"
          : `/customer-offers?category=${selectedCategory}`
      }
      className={selectedCountry === "all" ? "active" : ""}
    >
      <b>🌐</b>
      <span>كل الدول</span>
      <small>All Markets</small>
    </a>

    <a href={selectedCategory === "all" ? "/customer-offers?country=sa" : `/customer-offers?category=${selectedCategory}&country=sa`} className={selectedCountry === "sa" ? "active" : ""}>
      <b>🇸🇦</b><span>السعودية</span><small>Saudi Arabia</small>
    </a>

    <a href={selectedCategory === "all" ? "/customer-offers?country=ae" : `/customer-offers?category=${selectedCategory}&country=ae`} className={selectedCountry === "ae" ? "active" : ""}>
      <b>🇦🇪</b><span>الإمارات</span><small>UAE</small>
    </a>

    <a href={selectedCategory === "all" ? "/customer-offers?country=kw" : `/customer-offers?category=${selectedCategory}&country=kw`} className={selectedCountry === "kw" ? "active" : ""}>
      <b>🇰🇼</b><span>الكويت</span><small>Kuwait</small>
    </a>

    <a href={selectedCategory === "all" ? "/customer-offers?country=qa" : `/customer-offers?category=${selectedCategory}&country=qa`} className={selectedCountry === "qa" ? "active" : ""}>
      <b>🇶🇦</b><span>قطر</span><small>Qatar</small>
    </a>

    <a href={selectedCategory === "all" ? "/customer-offers?country=bh" : `/customer-offers?category=${selectedCategory}&country=bh`} className={selectedCountry === "bh" ? "active" : ""}>
      <b>🇧🇭</b><span>البحرين</span><small>Bahrain</small>
    </a>

    <a href={selectedCategory === "all" ? "/customer-offers?country=eg" : `/customer-offers?category=${selectedCategory}&country=eg`} className={selectedCountry === "eg" ? "active" : ""}>
      <b>🇪🇬</b><span>مصر</span><small>Egypt</small>
    </a>
  </section>
</div>

{availableBrands.length > 0 && (
  <section className="brandFilterBox">
    <div className="brandFilterHeader">
      <div>
        <h2>فلترة حسب البراند</h2>
        <p>
          البراندات تظهر تلقائيًا حسب الدولة والقسم الحالي
        </p>
      </div>

      {selectedBrand && (
        <a
          href={
            selectedCategory === "all"
              ? selectedCountry === "all"
                ? "/customer-offers"
                : `/customer-offers?country=${selectedCountry}`
              : selectedCountry === "all"
                ? `/customer-offers?category=${selectedCategory}`
                : `/customer-offers?category=${selectedCategory}&country=${selectedCountry}`
          }
        >
          مسح البراند
        </a>
      )}
    </div>

    <div className="brandFilterChips">
      {availableBrands.map((brand) => {
        const base =
          selectedCategory === "all"
            ? selectedCountry === "all"
              ? "/customer-offers"
              : `/customer-offers?country=${selectedCountry}`
            : selectedCountry === "all"
              ? `/customer-offers?category=${selectedCategory}`
              : `/customer-offers?category=${selectedCategory}&country=${selectedCountry}`;

        const href = `${base}${base.includes("?") ? "&" : "?"}brand=${brand.key}`;

        return (
          <a
            key={brand.key}
            href={href}
            className={selectedBrand === brand.key ? "active" : ""}
          >
            <strong>{brand.label}</strong>
            <span>{brand.count}</span>
          </a>
        );
      })}
    </div>
  </section>
)}


      {error && (
        <div className="message error">
          حدث خطأ أثناء تحميل العروض. حاول مرة أخرى لاحقًا.
        </div>
      )}

      {!error && filteredOffers.length === 0 && (
        <div className="emptyBox">
          <div className="emptyIcon">🛒</div>
          <h2>لا توجد عروض معتمدة حاليًا</h2>
          <p>كن أول من يضيف عرضًا مميزًا يظهر بعد المراجعة.</p>
          <a href="/customer-offers/add">أضف أول عرض</a>
        </div>
      )}
      {shouldUseSaudiFallback && (
  <div className="fallbackNotice">
    🇸🇦 لا توجد عروض محلية كافية حاليًا،
    يتم عرض أفضل عروض السعودية المناسبة للشحن الخليجي.
  </div>
)}
{featuredSliderOffers.length > 0 && (
  <section className="hotOffersSliderBox">
    <div className="hotOffersHeader">
      <div>
        <h2>⚡ أهم العروض</h2>
        <p>
          منتجات مختارة عشوائيًا من {heroCountryName} حسب السوق الحالي
        </p>
      </div>

      <a href="/customer-offers">تصفح المزيد</a>
    </div>

    <div className="hotOffersTrack">
      {[...featuredSliderOffers, ...featuredSliderOffers].map((offer, index) => (
        <a
          key={`${offer.id}-${index}`}
          href={`/api/customer-offers/click/${offer.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hotOfferMiniCard"
        >
          <div className="hotOfferImage">
            <img src={offer.image_url} alt={offer.product_name} />
          </div>

          <div className="hotOfferInfo">
  <strong>{offer.product_name}</strong>

  <span>
    {offer.price} {countryCurrencies[offer.country || ""]}
  </span>

  <small>{offer.store_name || "BPS Market"}</small>

  <div className="hotOfferActions">
    <a
     href={productSeoUrl(offer)}
      className="hotDetailsBtn"
    >
      👀 شاهد صفحة المنتج
    </a>

    <a
      href={`/api/customer-offers/click/${offer.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hotBuyBtn"
    >
      🛒 عرض المنتج
    </a>
  </div>
</div>
        </a>
        
      ))}
    </div>
  </section>
)}
{categorySliderItems.length > 0 && (
  <section className="categoryCircleSlider">
    <div className="categoryCircleHeader">
      <div>
        <h2>تصفح حسب القسم</h2>
        <p>اختار التصنيف المناسب بعد تحديد الدولة</p>
      </div>
    </div>

    <div className="categoryCircleTrack">
      {categorySliderItems.map((cat) => (
       <a
  key={cat.key}
  href={
    selectedCountry === "all"
      ? `/customer-offers?category=${cat.key}`
      : `/customer-offers?category=${cat.key}&country=${selectedCountry}`
  }
  className={
    selectedCategory === cat.key
      ? "categoryCircleCard active"
      : "categoryCircleCard"
  }
>
  <div className="categoryCircleImage">
    {cat.image ? (
      <img src={cat.image} alt={cat.ar} />
    ) : (
      <span>{cat.icon}</span>
    )}
  </div>

  <strong>{cat.ar}</strong>
</a>
      ))}
    </div>
  </section>
)}
<section className="marketSectionHeader">
  <div>
    <h2>🔥 عروض اليوم</h2>
    <p>Today Deals</p>
  </div>

  <a href="/customer-offers">
    عرض كل العروض
  </a>
</section>
    {!error && filteredOffers.length > 0 && (
  <>
    <section id="offers" className="offersGrid">
      {filteredOffers.map((offer) => (
        <article className="offerCard" key={offer.id}>
          <div className="imageWrap">
            <div className="productSlider">
              {[offer.image_url, offer.image_url_2, offer.image_url_3]
                .filter(Boolean)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img as string}
                    alt={offer.product_name}
                  />
                ))}
            </div>

            <div className="floatingLabel">
              {countryNames[offer.country || ""] || "عرض مميز"}
            </div>
          </div>

          <div className="cardContent">
            <p className="storeName">
              {offer.store_name || "عرض عميل BPS Chat"}
            </p>

            <h2 className="mobileProductTitle">
              <span>{offer.product_name}</span>
            </h2>

            <div className="priceRow">
              <strong>{offer.price}</strong>

              <span className="currency">
                {countryCurrencies[offer.country || ""]}
              </span>

              <span className="bestLabel">أفضل عرض</span>
            </div>

            <a
              href={`/api/customer-offers/click/${offer.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="buyBtn"
            >
              عرض المنتج
            </a>

            <a href={productSeoUrl(offer)} className="detailsBtn">
              👀 شاهد صفحة المنتج على BPS Chat
            </a>
          </div>
        </article>
      ))}
    </section>

    {hasMore && (
      <div className="loadMoreBox">
        <a className="loadMoreBtn" href={`${buildOffersUrl(page + 1)}#offers`}>
  🚀 مشاهدة المزيد  
</a>
      </div>
    )}
  </>
)}

<section className="seoLinksSection">
      
  <h2>🔥 تصفح العروض حسب التصنيف</h2>

  <div className="seoLinksGrid">
    {Object.entries(categoryCards)
      .filter(([key]) => key !== "all")
      .map(([key, cat]) => (
        <a
          key={key}
          href={`/customer-offers?category=${key}`}
          className="seoLinkCard"
        >
          {cat.icon} {cat.ar}
        </a>
      ))}
  </div>

  <h2 style={{ marginTop: "40px" }}>
    🌍 تصفح العروض حسب الدولة
  </h2>

  <div className="seoLinksGrid">
    {Object.entries(countryNames).map(([key, label]) => (
      <a
        key={key}
        href={`/customer-offers?country=${key}`}
        className="seoLinkCard"
      >
        {label}
      </a>
    ))}
  </div>
</section>

     <style>{`
     .mobileProductTitle {
  height: 36px !important;
  min-height: 36px !important;
  max-height: 36px !important;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0 7px;
  margin: 6px 0 8px !important;
  font-size: 11.5px !important;
  line-height: 1 !important;
}
.categoryCircleSlider {
  max-width: 1320px;
  margin: 22px auto 26px;
  padding: 22px 20px;
  border-radius: 30px;
  background: linear-gradient(135deg,#ffffff,#f8fafc);
  border: 1px solid #dbeafe;
  box-shadow: 0 18px 45px rgba(15,23,42,.08);
}

.categoryCircleHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.loadMoreBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 40px;
}

.loadMoreBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 320px;
  height: 58px;

  padding: 0 28px;

  border-radius: 18px;

  text-decoration: none;

  background: linear-gradient(
    135deg,
    #2563eb,
    #22c55e
  );

  color: #fff;

  font-size: 16px;
  font-weight: 900;

  box-shadow:
    0 12px 30px rgba(37,99,235,.25),
    0 0 25px rgba(34,197,94,.18);

  transition: all .25s ease;
}

.loadMoreBtn:hover {
  transform: translateY(-4px) scale(1.03);

  box-shadow:
    0 18px 40px rgba(37,99,235,.35),
    0 0 35px rgba(34,197,94,.25);
}

.loadMoreBtn::before {
  content: "📦";
  margin-left: 10px;
}

@media (max-width:700px) {
  .loadMoreBox {
    padding: 0 12px;
  }

  .loadMoreBtn {
    width: 100%;
    min-width: auto;
    height: 54px;

    font-size: 14px;
    border-radius: 14px;
  }
}
.categoryCircleHeader h2 {
  margin: 0;
  color: #111827;
  font-size: 26px;
  font-weight: 950;
}

.categoryCircleHeader p {
  margin: 5px 0 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 800;
}

.categoryCircleTrack {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding: 6px 4px 14px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.categoryCircleTrack::-webkit-scrollbar {
  height: 6px;
}

.categoryCircleTrack::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 999px;
}

.categoryCircleCard {
  min-width: 135px;
  scroll-snap-align: start;
  text-decoration: none;
  color: #111827;
  text-align: center;
  border-radius: 24px;
  padding: 14px 10px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15,23,42,.06);
  transition: all .25s ease;
}

.categoryCircleCard:hover,
.categoryCircleCard.active {
  transform: translateY(-5px);
  border-color: #22c55e;
  background: linear-gradient(180deg,#ffffff,#ecfdf5);
}

.categoryCircleImage {
  width: 86px;
  height: 86px;
  margin: 0 auto 10px;
  border-radius: 999px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid #dcfce7;
}

.categoryCircleImage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
}

.categoryCircleImage span {
  font-size: 34px;
}

.categoryCircleCard strong {
  display: block;
  font-size: 13px;
  font-weight: 950;
}

.categoryCircleCard small {
  display: block;
  margin-top: 5px;
  color: #16a34a;
  font-size: 11px;
  font-weight: 900;
}

@media (max-width:700px) {
  .categoryCircleSlider {
    margin: 18px 12px 22px;
    padding: 16px 12px;
    border-radius: 24px;
  }

  .categoryCircleCard {
    min-width: 112px;
    padding: 12px 8px;
  }

  .categoryCircleImage {
    width: 72px;
    height: 72px;
  }

  .categoryCircleHeader h2 {
    font-size: 21px;
  }
}
.mobileProductTitle {
  height: 36px !important;
  min-height: 36px !important;
  max-height: 36px !important;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  display: flex;
  align-items: center;

  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;

  padding: 0 7px;
  margin: 6px 0 8px !important;

  font-size: 11.5px !important;
  line-height: 1 !important;

  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.mobileProductTitle::-webkit-scrollbar {
  display: none;
}

.mobileProductTitle span {
  display: inline-block;
  white-space: nowrap;
}
.mobileQuickFilterBtn {
  display: none;
}

@media (max-width:700px){

  .mobileQuickFilterBtn{
    position: fixed;
    right: 16px;
    bottom: 22px;

    width: 58px;
    height: 58px;

    border-radius: 999px;

    display:flex;
    align-items:center;
    justify-content:center;

    text-decoration:none;

    z-index:9999;

    font-size:28px;

    background:
      radial-gradient(
        circle at 30% 20%,
        #fef3c7,
        #fb923c 35%,
        #ef4444 65%,
        #7f1d1d
      );

    border:2px solid rgba(254,215,170,.9);

    box-shadow:
      0 0 20px rgba(249,115,22,.8),
      0 0 50px rgba(239,68,68,.4);

    animation:marketFabPulse 2s infinite;
  }

  @keyframes marketFabPulse{
    0%,100%{
      transform:scale(1);
    }

    50%{
      transform:scale(1.08);
    }
  }
}
.seoLinksSection {
  max-width: 1320px;
  margin: 35px auto 20px;
  padding: 28px;
  border-radius: 28px;
  background: linear-gradient(135deg,#ffffff,#f8fafc);
  border: 1px solid #dbeafe;
  box-shadow: 0 15px 40px rgba(15,23,42,.08);
}

.seoLinksSection h2 {
  color: #0f172a;
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 20px;
  text-align: center;
}

.seoLinksGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
  gap: 14px;
}

.seoLinkCard {
  text-decoration: none;
  color: #111827;
  font-weight: 900;
  background: white;
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 18px;
  transition: all .25s ease;
  text-align: center;
  display: block;
}

.seoLinkCard:hover {
  transform: translateY(-4px);
  border-color: #22c55e;
  box-shadow: 0 12px 25px rgba(34,197,94,.15);
}

    .offersSearchBox {
  max-width: 1120px;
  margin: 22px auto 18px;
  padding: 10px;
  border-radius: 26px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border: 1px solid #dbeafe;
  box-shadow:
    0 18px 45px rgba(15,23,42,0.08),
    0 0 0 6px rgba(34,197,94,0.04);
}
.hotOffersSliderBox {
  max-width: 1320px;
  margin: 10px auto 26px;
  padding: 20px;
  overflow: hidden;
  border-radius: 30px;
  background:
    radial-gradient(circle at 10% 20%, rgba(34,197,94,0.14), transparent 30%),
    linear-gradient(135deg, #ffffff, #f8fafc);
  border: 1px solid #dbeafe;
  box-shadow:
    0 20px 50px rgba(15,23,42,0.08),
    0 0 0 6px rgba(34,197,94,0.035);
}

.hotOffersHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
}

.hotOffersHeader h2 {
  margin: 0;
  color: #111827;
  font-size: 26px;
  font-weight: 950;
}

.hotOffersHeader p {
  margin: 5px 0 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 850;
}

.hotOffersHeader a {
  text-decoration: none;
  color: #16a34a;
  font-weight: 950;
  white-space: nowrap;
}

.hotOffersTrack {
  display: flex;
  gap: 14px;
  width: max-content;
  animation: hotOffersMove 45s linear infinite;
}

.hotOffersSliderBox:hover .hotOffersTrack {
  animation-play-state: paused;
}

.hotOfferMiniCard {
  width: 235px;
  min-height: 104px;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 82px 1fr;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  border-radius: 22px;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 22px rgba(15,23,42,0.06);
  transition: all .25s ease;
}

.hotOfferMiniCard:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: rgba(34,197,94,0.45);
  box-shadow: 0 18px 38px rgba(15,23,42,0.13);
}

.hotOfferImage {
  width: 82px;
  height: 82px;
  border-radius: 18px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hotOfferImage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.hotOfferInfo {
  min-width: 0;
}

.hotOfferInfo strong {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #111827;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 950;
}

.hotOfferInfo span {
  display: block;
  margin-top: 6px;
  color: #16a34a;
  font-size: 14px;
  font-weight: 950;
}

.hotOfferInfo small {
  display: block;
  margin-top: 4px;
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
}

@keyframes hotOffersMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50%);
  }
}

@media (max-width: 700px) {
  .hotOffersSliderBox {
    margin: 8px 12px 22px;
    padding: 14px;
    border-radius: 24px;
  }

  .hotOffersHeader {
    flex-direction: column;
    align-items: flex-start;
  }

  .hotOffersHeader h2 {
    font-size: 22px;
  }

  .hotOfferMiniCard {
    width: 210px;
  }
}
.offersSearchForm {
  display: grid;
  grid-template-columns: 1fr 190px 110px auto;
  gap: 10px;
  align-items: center;
}
.marketCategorySection {
  max-width: 1320px;
  margin: 0 auto 22px;
  padding: 0 20px;
}

.sectionTitleRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.sectionTitleRow h2 {
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 950;
}

.sectionTitleRow p {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 14px;
  font-weight: 800;
}

.sectionTitleRow a {
  text-decoration: none;
  color: #16a34a;
  font-weight: 950;
  font-size: 14px;
}

.marketCategoryGrid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.marketCategoryCard {
  text-decoration: none;
  min-height: 118px;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  box-shadow: 0 6px 20px rgba(15,23,42,0.06);
  transition: all .25s ease;
}

.marketCategoryCard:hover,
.marketCategoryCard.active {
  transform: translateY(-5px);
  border-color: rgba(34,197,94,0.45);
  box-shadow: 0 16px 34px rgba(15,23,42,0.12);
  background: linear-gradient(180deg, #ffffff, #ecfdf5);
}

.categoryIcon {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0fdf4;
  font-size: 25px;
}

.marketCategoryCard strong {
  font-size: 14px;
  font-weight: 950;
}

.marketCategoryCard small {
  color: #6b7280;
  font-size: 12px;
  font-weight: 800;
}

@media (max-width: 900px) {
  .marketCategoryGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .marketCategoryGrid {
    display: flex;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .marketCategoryCard {
    min-width: 130px;
  }

  .sectionTitleRow {
    align-items: flex-start;
    flex-direction: column;
  }
}
.offersSearchForm input,
.offersSearchForm select {
  height: 54px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  border-radius: 18px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 850;
  outline: none;
  transition: all .25s ease;
}

.offersSearchForm input:focus,
.offersSearchForm select:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 5px rgba(34,197,94,0.12);
}

.countrySelect {
  cursor: pointer;
}

.offersSearchForm button,
.offersSearchForm a {
  height: 54px;
  border: 0;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 18px;
  padding: 0 20px;
  font-weight: 950;
}

.offersSearchForm button {
  background: linear-gradient(135deg, #16a34a, #2563eb);
  color: white;
  box-shadow: 0 12px 28px rgba(37,99,235,0.22);
  cursor: pointer;
  transition: all .25s ease;
}

.offersSearchForm button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(37,99,235,0.30);
}


.offersSearchForm button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  background: #444 !important;
}

.offersSearchForm a {
  background: rgba(255,255,255,0.10);
  color: #fff;
}

.countryWarning {
  color: #ff4d4f;
  font-size: 13px;
  font-weight: 900;
}

@media (max-width: 700px) {
  .offersSearchForm {
    display: flex;
    flex-direction: column;
  }

  .offersSearchForm input,
  .offersSearchForm select,
  .offersSearchForm button,
  .offersSearchForm a,
  .countryWarning {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }
}
  .customerOffersPage {
  min-height: 100vh;
  background:
    linear-gradient(180deg, #f4f7fb 0%, #eef2f7 100%);
  color: #111827;
  padding: 0 0 70px;
  overflow-x: hidden;
}
.premiumCountryBox {
  max-width: 1120px;
  margin: 18px auto 34px;
  padding: 18px;
  border-radius: 30px;
  background:
    radial-gradient(circle at 15% 20%, rgba(34,197,94,0.12), transparent 28%),
    linear-gradient(135deg, #ffffff, #f8fafc);
  border: 1px solid #dbeafe;
  box-shadow:
    0 20px 50px rgba(15,23,42,0.08),
    0 0 0 6px rgba(37,99,235,0.035);
}

.countryBoxHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.countryBoxHeader div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.countryBoxHeader span {
  font-size: 18px;
  font-weight: 950;
  color: #111827;
}

.countryBoxHeader small {
  color: #16a34a;
  font-size: 13px;
  font-weight: 900;
}

.countryBoxHeader p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 800;
}

.premiumCountryTabs {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
}

.premiumCountryTabs a {
  position: relative;
  overflow: hidden;
  min-height: 92px;
  text-decoration: none;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 8px 22px rgba(15,23,42,0.05);
  transition: all .28s ease;
}

.premiumCountryTabs a::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(34,197,94,0.12));
  opacity: 0;
  transition: opacity .28s ease;
}

.premiumCountryTabs a b {
  position: relative;
  z-index: 2;
  font-size: 28px;
  line-height: 1;
  transition: transform .28s ease;
}

.premiumCountryTabs a span {
  position: relative;
  z-index: 2;
  font-size: 13px;
  font-weight: 950;
}

.premiumCountryTabs a small {
  position: relative;
  z-index: 2;
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
}

.premiumCountryTabs a:hover {
  transform: translateY(-5px);
  border-color: rgba(37,99,235,0.22);
  box-shadow: 0 18px 36px rgba(15,23,42,0.12);
}

.premiumCountryTabs a:hover::before {
  opacity: 1;
}

.premiumCountryTabs a:hover b {
  transform: scale(1.18) rotate(-4deg);
}

.premiumCountryTabs a.active {
  background: linear-gradient(135deg, #0f172a, #2563eb);
  color: #ffffff;
  border-color: transparent;
  box-shadow:
    0 18px 42px rgba(37,99,235,0.26),
    0 0 0 5px rgba(37,99,235,0.08);
}

.premiumCountryTabs a.active small {
  color: #dbeafe;
}

.premiumCountryTabs a.active::after {
  content: "✓";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #22c55e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 950;
}

@media (max-width: 900px) {
  .premiumCountryTabs {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .premiumCountryBox {
    padding: 14px;
    border-radius: 24px;
  }

  .countryBoxHeader {
    flex-direction: column;
    align-items: flex-start;
  }

  .premiumCountryTabs {
    display: flex;
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .premiumCountryTabs::-webkit-scrollbar {
    display: none;
  }

  .premiumCountryTabs a {
    min-width: 125px;
    scroll-snap-align: start;
    flex-shrink: 0;
  }
}

@media (max-width: 700px) {
  .countryBox {
    padding: 14px;
    border-radius: 20px;
  }

  .countryBoxHeader {
    flex-direction: column;
    text-align: center;
    margin-bottom: 12px;
  }

  .countryTabs {
    grid-template-columns: repeat(2, 1fr);
  }

  .countryTabs a {
    min-height: 44px;
    font-size: 12.5px;
  }
}

.countryTabs a:hover,
.countryTabs a.active {
  background: linear-gradient(135deg, #2563eb, #22c55e);
  color: #fff;
  box-shadow: 0 0 24px rgba(59,130,246,0.35);
  transform: translateY(-2px);
}
 .hero {
  position: relative;
  max-width: 1320px;
  margin: 0 auto 24px;
  overflow: hidden;
  border-radius: 0 0 34px 34px;
  padding: 55px 30px;
  background:
    linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #2563eb 100%);
  box-shadow:
    0 10px 40px rgba(0,0,0,0.15);
}
   .categoryTabs {
  max-width: 1320px;
  margin: 10px auto 18px;
  padding: 0 20px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  flex-wrap: nowrap;
}
  .marketplaceHero {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  align-items: center;
  gap: 28px;
}

.heroText {
  position: relative;
  z-index: 2;
}

.heroVisual {
  position: relative;
  min-height: 260px;
}

.dealCard {
  position: absolute;
  background: rgba(255,255,255,0.95);
  color: #111827;
  border-radius: 26px;
  padding: 22px;
  box-shadow: 0 22px 55px rgba(0,0,0,0.22);
}

.bigDeal {
  width: 260px;
  height: 170px;
  left: 40px;
  top: 30px;
}

.dealCard span {
  display: block;
  color: #2563eb;
  font-weight: 950;
  margin-bottom: 12px;
}

.dealCard strong {
  display: block;
  font-size: 34px;
  font-weight: 950;
  color: #16a34a;
}

.dealCard small {
  color: #6b7280;
  font-weight: 800;
}

.smallDeal {
  width: 180px;
  padding: 16px;
}

.smallDeal strong {
  font-size: 17px;
}

.smallDeal.one {
  right: 10px;
  top: 5px;
}

.smallDeal.two {
  right: 60px;
  bottom: 10px;
}

@media (max-width: 800px) {
  .marketplaceHero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .heroVisual {
    display: none;
  }
}
.categoryTabs a {
  text-decoration: none;
  padding: 9px 15px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #dbe4ee;
  color: #111827;
  font-weight: 900;
  font-size: 12px;
  transition: all .25s ease;
  white-space: nowrap;
}
.categoryTabs a:hover,
.categoryTabs a.active {
  background: #111827;
  color: #fff;
  border-color: #111827;
}
  .aiGlow {
    position: absolute;
    width: 210px;
    height: 210px;
    border-radius: 999px;
    filter: blur(52px);
    opacity: 0.32;
    animation: floatGlow 6s ease-in-out infinite alternate;
  }

  .aiGlowOne {
    background: #22c55e;
    top: -120px;
    right: -55px;
  }

  .aiGlowTwo {
    background: #3b82f6;
    bottom: -125px;
    left: -55px;
    animation-delay: 1.4s;
  }

  @keyframes floatGlow {
    from { transform: translateY(0) scale(1); }
    to { transform: translateY(18px) scale(1.1); }
  }

  .badge {
    position: relative;
    z-index: 2;
    display: inline-flex;
    padding: 7px 14px;
    border-radius: 999px;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.32);
    color: #bbf7d0;
    font-size: 12px;
    font-weight: 900;
    margin-bottom: 8px;
  }

  .hero h1 {
    position: relative;
    z-index: 2;
    max-width: 850px;
    margin: 0 auto;
    font-size: clamp(28px, 4vw, 46px);
    line-height: 1.15;
    font-weight: 950;
    letter-spacing: -0.5px;
  }

  .hero h1 span {
    background: linear-gradient(135deg, #22c55e, #60a5fa, #fff);
    -webkit-background-clip: text;
    color: transparent;
  }

  .hero p {
    position: relative;
    z-index: 2;
    max-width: 760px;
    margin: 9px auto 0;
    color: #d6d6d6;
    font-size: 14.5px;
    line-height: 1.7;
  }

  .heroActions {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 14px;
  }

  .primaryBtn,
  .secondaryBtn,
  .buyBtn,
  .emptyBox a {
    text-decoration: none;
    transition: all .25s ease;
  }

  .primaryBtn {
  padding: 14px 28px;
  border-radius: 14px;
  background: #22c55e;
  color: white;
  font-weight: 900;
  font-size: 15px;
  box-shadow:
    0 8px 24px rgba(34,197,94,0.28);
}

  .primaryBtn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 0 38px rgba(34,197,94,0.58);
  }

 .secondaryBtn {
  padding: 14px 24px;
  border-radius: 14px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.14);
  color: #fff;
  font-weight: 850;
  backdrop-filter: blur(10px);
}

  .secondaryBtn:hover {
    background: rgba(255,255,255,0.14);
    transform: translateY(-3px);
  }

  .stats {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    max-width: 560px;
    margin: 16px auto 0;
  }

  .stats div {
    padding: 10px 12px;
    border-radius: 17px;
    background: rgba(0,0,0,0.26);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .stats strong {
    display: block;
    font-size: 21px;
    color: #86efac;
  }

  .stats span {
    display: block;
    margin-top: 3px;
    color: #cfcfcf;
    font-size: 12px;
  }

  .seoBox {
    max-width: 1080px;
    margin: 0 auto 16px;
    padding: 15px 20px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025));
    border: 1px solid rgba(255,255,255,0.08);
  }

  .seoBox h2 {
    margin: 0 0 6px;
    font-size: 20px;
  }

  .seoBox p {
    margin: 0;
    color: #d4d4d4;
    line-height: 1.75;
    font-size: 14px;
  }

  .offersGrid {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
  align-items: stretch;
}

  .offerCard {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 4px 18px rgba(0,0,0,0.06);
  transition: all .25s ease;
}
  .offerCard:before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, transparent, rgba(34,197,94,0.4), transparent);
    opacity: 0;
    transition: opacity .28s ease;
    pointer-events: none;
  }

  .offerCard:hover {
  transform: translateY(-6px);
  box-shadow:
    0 18px 40px rgba(0,0,0,0.12);
}
  .offerCard:hover:before {
    opacity: 1;
  }

 .imageWrap {
  position: relative;
  height: 290px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #f1f5f9;
}

  .imageWrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform .3s ease;
  z-index: 2;
}

.productSlider {
  position: relative;
  width: 100%;
  height: 100%;
}

.productSlider img {
  position: absolute;
  inset: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0;
  z-index: 2;
}

.productSlider img:first-child {
  opacity: 1;
}

.currency,
.bestLabel {
  font-size: 11px;
  color: #ffffff !important;
  background: linear-gradient(135deg, #16a34a, #22c55e) !important;
  border: 0 !important;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 950;
  box-shadow: 0 5px 14px rgba(34,197,94,0.28);
  text-shadow: 0 1px 2px rgba(0,0,0,0.22);
}
.offerCard:hover .productSlider img {
  transform: scale(1.07) rotate(-1deg);
}
 .floatingLabel {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;

  padding: 7px 12px;
  border-radius: 999px;

 background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);

  color: #ffffff;

  font-size: 11px;
  font-weight: 950;

  border: 0;

  box-shadow:
    0 6px 18px rgba(34,197,94,0.35);

  text-shadow:
    0 1px 2px rgba(0,0,0,0.25);

  backdrop-filter: blur(6px);
}
  .cardContent {
  position: relative;
  z-index: 2;
  padding: 12px;
}

  .storeName {
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 8px;
}

 .cardContent h2 {
  font-size: 14px;
  line-height: 1.7;
  margin: 0 0 10px;
  min-height: 46px;
  color: #111827;
  font-weight: 800;
}
  .priceRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 13px;
  }

  .priceRow strong {
  color: #16a34a;
  font-size: 26px;
  font-weight: 950;
}

  .priceRow span {
    font-size: 11px;
    color: #d1fae5;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.22);
    padding: 5px 9px;
    border-radius: 999px;
    white-space: nowrap;
  }

 .buyBtn {
  display: block;
  text-align: center;
  padding: 13px;
  border-radius: 14px;
  background: #111827;
  color: #fff;
  font-weight: 900;
  transition: all .25s ease;
}

 .buyBtn:hover {
  background: #2563eb;
  color: #fff;
  transform: translateY(-2px);
}
  .message,
  .emptyBox {
    max-width: 760px;
    margin: 20px auto;
    text-align: center;
    border-radius: 24px;
    padding: 28px 18px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
  }

  .error {
    color: #fecaca;
    border-color: rgba(248,113,113,0.35);
  }

  .emptyIcon {
    font-size: 44px;
    margin-bottom: 10px;
  }

  .emptyBox h2 {
    margin: 0 0 8px;
    font-size: 24px;
  }

  .emptyBox p {
    color: #cfcfcf;
    margin-bottom: 18px;
  }

  .emptyBox a {
    display: inline-block;
    padding: 12px 23px;
    border-radius: 999px;
    background: linear-gradient(135deg, #16a34a, #22c55e);
    color: white;
    font-weight: 900;
  }
.marketSectionHeader {
  max-width: 1320px;
  margin: 24px auto 18px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.marketSectionHeader h2 {
  margin: 0;
  font-size: 28px;
  color: #111827;
  font-weight: 950;
}

.marketSectionHeader p {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 14px;
  font-weight: 800;
}

.marketSectionHeader a {
  text-decoration: none;
  color: #16a34a;
  font-weight: 950;
}

@media (max-width: 700px) {
  .marketSectionHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .marketSectionHeader h2 {
    font-size: 22px;
  }
}
  @media (max-width: 700px) {
    .customerOffersPage {
      padding: 12px 12px 60px;
    }

    .hero {
      padding: 18px 12px 16px;
      border-radius: 22px;
    }

    .badge {
      font-size: 11px;
      margin-bottom: 7px;
    }

    .hero p {
      font-size: 13.5px;
    }

    .stats {
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
    }

    .stats div {
      padding: 8px 5px;
      border-radius: 14px;
    }

    .stats strong {
      font-size: 18px;
    }

    .stats span {
      font-size: 10.5px;
    }

    .seoBox {
      padding: 13px 14px;
      border-radius: 18px;
    }

    .seoBox h2 {
      font-size: 18px;
    }

    .offersGrid {
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 0 8px;
}

.offerCard {
  border-radius: 14px;
}

.imageWrap {
  height: 155px;
  padding: 8px;
}

.cardContent {
  padding: 9px;
}

.cardContent h2 {
  font-size: 11.5px;
  line-height: 1.55;
  min-height: 54px;
  margin-bottom: 8px;
}

.storeName {
  font-size: 10px;
  margin-bottom: 5px;
}

.priceRow {
  gap: 5px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.priceRow strong {
  font-size: 18px;
}

.currency,
.bestLabel {
  font-size: 9px;
  padding: 4px 7px;
}

.buyBtn,
.detailsBtn {
  padding: 9px;
  border-radius: 10px;
  font-size: 11px;
}

.floatingLabel {
  font-size: 9px;
  padding: 5px 8px;
}

    .imageWrap {
      height: 205px;
    }
  }
    .brandFilterBox {
  max-width: 1120px;
  margin: 18px auto 28px;
  padding: 18px;
  border-radius: 28px;
  background:
    radial-gradient(circle at 15% 20%, rgba(37,99,235,0.10), transparent 28%),
    linear-gradient(135deg, #ffffff, #f8fafc);
  border: 1px solid #dbeafe;
  box-shadow:
    0 18px 45px rgba(15,23,42,0.08),
    0 0 0 6px rgba(34,197,94,0.035);
}

.brandFilterHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.brandFilterHeader h2 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 950;
}

.brandFilterHeader p {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 800;
}

.brandFilterHeader a {
  text-decoration: none;
  color: #16a34a;
  font-weight: 950;
  white-space: nowrap;
}

.brandFilterChips {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
}

.brandFilterChips a {
  min-width: 118px;
  text-decoration: none;
  padding: 12px 14px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0 8px 22px rgba(15,23,42,0.05);
  transition: all .25s ease;
}

.brandFilterChips a:hover,
.brandFilterChips a.active {
  transform: translateY(-3px);
  background: linear-gradient(135deg, #0f172a, #2563eb);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 18px 34px rgba(37,99,235,0.22);
}

.brandFilterChips strong {
  font-size: 13px;
  font-weight: 950;
}

.brandFilterChips span {
  min-width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 950;
}

.brandFilterChips a.active span,
.brandFilterChips a:hover span {
  background: #22c55e;
  color: #ffffff;
}

@media (max-width: 700px) {
  .brandFilterBox {
    margin: 14px 12px 22px;
    padding: 14px;
    border-radius: 22px;
  }

  .brandFilterHeader {
    flex-direction: column;
    align-items: flex-start;
  }

  .brandFilterChips a {
    min-width: 110px;
  }
}
  .fallbackNotice {
  max-width: 1320px;
  margin: 10px auto 18px;
  padding: 16px 20px;
  border-radius: 20px;

  background:
    linear-gradient(135deg, rgba(37,99,235,0.10), rgba(34,197,94,0.12));

  border: 1px solid rgba(37,99,235,0.16);

  color: #0f172a;

  font-size: 14px;
  font-weight: 950;

  box-shadow:
    0 10px 28px rgba(15,23,42,0.06);
}
    .hotOfferActions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.hotDetailsBtn,
.hotBuyBtn {
  text-decoration: none;
  text-align: center;
  padding: 7px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 900;
  transition: .25s;
}

.hotDetailsBtn {
  background: linear-gradient(135deg,#2563eb,#0f172a);
  color: #fff;
}

.hotBuyBtn {
  background: linear-gradient(135deg,#16a34a,#22c55e);
  color: #fff;
}

.hotDetailsBtn:hover,
.hotBuyBtn:hover {
  transform: translateY(-2px);
}
  .detailsBtn {
  display: block;
  text-align: center;
  margin-top: 9px;
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(135deg,#2563eb,#0f172a);
  color: #fff;
  text-decoration: none;
  font-weight: 900;
  transition: all .25s ease;
}

.detailsBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(37,99,235,.25);
}
  .fireMarketStrip {
  max-width: 1320px;
  margin: 18px auto;
  padding: 0 20px;
}

.fireMarketContent {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  padding: 22px 26px;

  border-radius: 28px;

  background:
    radial-gradient(circle at 15% 50%,
      rgba(251,146,60,.25),
      transparent 30%),
    linear-gradient(
      135deg,
      #7f1d1d 0%,
      #dc2626 25%,
      #f97316 60%,
      #facc15 100%
    );

  box-shadow:
    0 0 25px rgba(249,115,22,.35),
    0 0 65px rgba(239,68,68,.22);

  animation: fireMarketGlow 2s ease-in-out infinite;
}

.fireMarketBadge {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;

  background: rgba(255,255,255,.15);
  color: #fff;

  font-size: 12px;
  font-weight: 950;

  margin-bottom: 8px;
}

.fireMarketContent h2 {
  margin: 0;
  color: #fff;
  font-size: 28px;
  font-weight: 950;
}

.fireMarketContent p {
  margin: 8px 0 0;
  color: rgba(255,255,255,.9);
  font-size: 14px;
  font-weight: 800;
}

.fireMarketBtn {
  flex-shrink: 0;

  text-decoration: none;

  padding: 16px 28px;

  border-radius: 999px;

  background: #fff;
  color: #dc2626;

  font-size: 15px;
  font-weight: 950;

  box-shadow:
    0 10px 30px rgba(255,255,255,.25);

  transition: .25s;
}

.fireMarketBtn:hover {
  transform: translateY(-3px) scale(1.04);
}

@keyframes fireMarketGlow {
  0%,100% {
    box-shadow:
      0 0 25px rgba(249,115,22,.35),
      0 0 65px rgba(239,68,68,.22);
  }

  50% {
    box-shadow:
      0 0 40px rgba(249,115,22,.55),
      0 0 90px rgba(239,68,68,.35);
  }
}

@media (max-width: 700px) {
  .fireMarketContent {
    flex-direction: column;
    text-align: center;
  }

  .fireMarketContent h2 {
    font-size: 22px;
  }

  .fireMarketBtn {
    width: 100%;
  }
}
`}</style>
    </main>
  );
}