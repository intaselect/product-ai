import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";

import SeoSearchBar from "@/app/components/SeoSearchBar";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import TrustedSourcesBar from "@/app/components/TrustedSourcesBar";
import ProductVideos from "@/app/components/ProductVideos";
import MarketPromoSection from "@/app/components/MarketPromoSection";
import InternalLinksBoost from "@/app/components/InternalLinksBoost";
import PopularSearches from "@/app/components/PopularSearches";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const countryFlags: Record<string, string> = {
  sa: "🇸🇦",
  ae: "🇦🇪",
  kw: "🇰🇼",
  qa: "🇶🇦",
  bh: "🇧🇭",
  eg: "🇪🇬",
};

const currencies: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};

const currencyCodes: Record<string, string> = {
  sa: "SAR",
  ae: "AED",
  kw: "KWD",
  qa: "QAR",
  bh: "BHD",
  eg: "EGP",
};

function cleanText(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ");
}

function slugify(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-");
}

function parseProductSlug(slug: string) {
  const clean = decodeURIComponent(slug || "").toLowerCase().trim();
  const parts = clean.split("-");
  const last = parts[parts.length - 1];

  const countryCode = countryNames[last] ? last : "sa";

  if (countryNames[last]) {
    parts.pop();
  }

  const productName = cleanText(parts.join(" "));

  return {
    productName,
    countryCode,
    countryName: countryNames[countryCode] || "السعودية",
  };
}

function getPriceNumber(product: any) {
  const raw = String(product.price || product.priceText || "");
  const num = Number(raw.replace(/[^\d.]/g, ""));
  return Number.isFinite(num) ? num : null;
}

function getStoreName(product: any) {
  const raw = String(
    product.source || product.store || product.merchant || product.seller || ""
  ).toLowerCase();

  const url = String(product.url || product.link || "").toLowerCase();

  const text = `${raw} ${url}`;

  if (text.includes("amazon")) return "Amazon";
  if (text.includes("noon")) return "Noon";
  if (text.includes("jumia")) return "Jumia";
  if (text.includes("jarir")) return "Jarir";
  if (text.includes("extra")) return "Extra";
  if (text.includes("carrefour")) return "Carrefour";

  return raw || "متجر إلكتروني";
}

function offerSeoUrl(offer: any) {
  return `/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}

async function getCachedProducts(productName: string, countryCode: string) {
  const cacheKey = `${countryCode}:${cleanText(productName)}`;

  const { data } = await supabase
    .from("product_cache")
    .select("results, updated_at, query, country")
    .eq("cache_key", cacheKey)
    .maybeSingle();

  return {
    products: Array.isArray(data?.results) ? data.results : [],
    updatedAt: data?.updated_at || null,
    query: data?.query || productName,
  };
}

async function getMarketOffers(productName: string, countryCode: string) {
  const firstWord = cleanText(productName).split(" ")[0];

  let query = supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, store_name, country, category")
    .eq("status", "approved")
    .eq("country", countryCode)
    .order("created_at", { ascending: false })
    .limit(40);

  if (firstWord) {
    query = query.ilike("product_name", `%${firstWord}%`);
  }

  const { data } = await query;
  return data || [];
}

async function getRelatedSearches(productName: string, countryCode: string) {
  const firstWord = cleanText(productName).split(" ")[0];

  if (!firstWord) return [];

  const { data } = await supabase
    .from("search_terms")
    .select("query, slug, search_count")
    .eq("country", countryCode)
    .ilike("query", `%${firstWord}%`)
    .order("search_count", { ascending: false })
    .limit(40);

  return data || [];
}

function makeProductHubUrl(query: string, countryCode: string) {
  return `/product/${slugify(query)}-${countryCode}`;
}

function getSimilarProducts(productName: string, countryCode: string) {
  const q = productName.toLowerCase();

  if (q.includes("iphone") || q.includes("ايفون")) {
    return ["iphone 16 pro", "iphone 16 pro max", "iphone 15", "airpods pro", "apple watch"].map(
      (x) => ({ title: x, href: makeProductHubUrl(x, countryCode) })
    );
  }

  if (q.includes("samsung") || q.includes("galaxy") || q.includes("سامسونج")) {
    return ["samsung galaxy s25", "galaxy s24 ultra", "galaxy a55", "samsung watch", "samsung earbuds"].map(
      (x) => ({ title: x, href: makeProductHubUrl(x, countryCode) })
    );
  }

  if (q.includes("playstation") || q.includes("ps5") || q.includes("بلايستيشن")) {
    return ["playstation 5 slim", "ps5 controller", "playstation portal", "xbox series x", "gaming headset"].map(
      (x) => ({ title: x, href: makeProductHubUrl(x, countryCode) })
    );
  }

  if (q.includes("macbook") || q.includes("laptop") || q.includes("لاب توب")) {
    return ["macbook air m3", "macbook pro", "hp laptop", "dell laptop", "lenovo laptop"].map(
      (x) => ({ title: x, href: makeProductHubUrl(x, countryCode) })
    );
  }

  return [
    `${productName} عروض`,
    `${productName} سعر`,
    `${productName} ارخص سعر`,
    `${productName} مقارنة`,
    `${productName} online`,
  ].map((x) => ({ title: x, href: makeProductHubUrl(x, countryCode) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { productName, countryName } = parseProductSlug(slug);

  const title = `سعر ${productName} في ${countryName} | أفضل عروض ومقارنة أسعار | BPS Chat`;
  const description = `قارن سعر ${productName} في ${countryName} عبر BPS Chat بي بي اس شات. شاهد أرخص سعر، أعلى سعر، عروض المتاجر، فيديوهات المراجعة وروابط الشراء قبل ما تشتري.`;

  return {
    title,
    description,
    keywords: [
      `سعر ${productName}`,
      `سعر ${productName} في ${countryName}`,
      `أفضل سعر ${productName}`,
      `عروض ${productName}`,
      `مقارنة أسعار ${productName}`,
      `شراء ${productName}`,
      `BPS Chat`,
      `بي بي اس شات`,
      `best price ${productName}`,
      `${productName} price`,
    ],
    alternates: {
      canonical: `${SITE_URL}/product/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/product/${slug}`,
      type: "website",
    },
  };
}

export default async function ProductHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { productName, countryCode, countryName } = parseProductSlug(slug);

  const currency = currencies[countryCode] || "";
  const currencyCode = currencyCodes[countryCode] || "SAR";
  const flag = countryFlags[countryCode] || "🌍";

  const [{ products, updatedAt }, marketOffers, relatedSearches] =
    await Promise.all([
      getCachedProducts(productName, countryCode),
      getMarketOffers(productName, countryCode),
      getRelatedSearches(productName, countryCode),
    ]);

  const productsWithPrices = products
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

  const priceDiff =
    cheapestProduct && highestProduct
      ? highestProduct.numericPrice - cheapestProduct.numericPrice
      : null;

  const stores = Array.from(
    new Set(productsWithPrices.map((p: any) => p.storeName))
  ).slice(0, 6);

  const similarProducts = getSimilarProducts(productName, countryCode);

  const pageUrl = `${SITE_URL}/product/${slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: `مقارنة سعر ${productName} في ${countryName} عبر BPS Chat بي بي اس شات.`,
    brand: {
      "@type": "Brand",
      name: "BPS Chat",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "128",
    },
    offers: productsWithPrices.slice(0, 10).map((product: any) => ({
      "@type": "Offer",
      price: product.numericPrice,
      priceCurrency: currencyCode,
      availability: "https://schema.org/InStock",
      url: product.url || product.link || pageUrl,
      seller: {
        "@type": "Organization",
        name: product.storeName,
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `كم سعر ${productName} في ${countryName}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `سعر ${productName} في ${countryName} يختلف حسب المتجر والتوفر والعروض. يمكنك متابعة هذه الصفحة لمعرفة أفضل الأسعار المتاحة عبر BPS Chat.`,
        },
      },
      {
        "@type": "Question",
        name: `أين أشتري ${productName} بأفضل سعر؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `يمكنك مقارنة عروض ${productName} من عدة متاجر داخل هذه الصفحة ثم الانتقال إلى رابط الشراء المناسب.`,
        },
      },
      {
        "@type": "Question",
        name: `هل BPS Chat يبيع ${productName} مباشرة؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `لا، BPS Chat يساعدك على مقارنة الأسعار والوصول إلى روابط الشراء من المتاجر والبائعين.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "مقارنة الأسعار", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: productName, item: pageUrl },
    ],
  };

  return (
    <main className="productHubPage" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SeoSearchBar />
      <TrustedSourcesBar />

      <section className="hero marketplaceHero">
        <div className="heroText">
          <div className="badge">🔥 Product Hub | BPS Chat</div>

          <h1>
            سعر <span>{productName}</span> في {countryName}
          </h1>

          <p>
            قارن سعر <strong>{productName}</strong> في {countryName} قبل الشراء.
            شاهد أرخص سعر، أعلى سعر، فرق السعر، عروض المتاجر، فيديوهات المراجعة،
            وروابط الشراء المباشرة عبر BPS Chat - بي بي اس شات.
          </p>

          <div className="heroActions">
            <a href="/" className="primaryBtn">🔎 ابحث عن منتج آخر</a>
            <a href={`/search/${slugify(productName)}-${countryCode}`} className="secondaryBtn">
              مقارنة البحث العادية
            </a>
          </div>
        </div>

        <div className="heroVisual">
          <div className="dealCard bigDeal">
            <span>أرخص سعر</span>
            <strong>{cheapestProduct ? cheapestProduct.priceText || cheapestProduct.price : "قريبًا"}</strong>
            <small>{cheapestProduct?.storeName || "BPS Chat"}</small>
          </div>

          <div className="dealCard smallDeal one">
            <span>{flag} السوق</span>
            <strong>{countryName}</strong>
          </div>

          <div className="dealCard smallDeal two">
            <span>فرق السعر</span>
            <strong>{priceDiff ? `${priceDiff.toLocaleString()} ${currency}` : "قارن الآن"}</strong>
          </div>
        </div>
      </section>

      <SearchBeforeBuyBanner />

      <section className="summaryGrid">
        <div className="summaryCard">
          <span>🔥 أرخص سعر</span>
          <strong>{cheapestProduct ? cheapestProduct.priceText || cheapestProduct.price : "غير متوفر"}</strong>
          <small>{cheapestProduct?.storeName || "سيتم التحديث قريبًا"}</small>
        </div>

        <div className="summaryCard">
          <span>📈 أعلى سعر</span>
          <strong>{highestProduct ? highestProduct.priceText || highestProduct.price : "غير متوفر"}</strong>
          <small>{highestProduct?.storeName || "سيتم التحديث قريبًا"}</small>
        </div>

        <div className="summaryCard">
          <span>💸 فرق السعر</span>
          <strong>{priceDiff ? `${priceDiff.toLocaleString()} ${currency}` : "غير متوفر"}</strong>
          <small>المقارنة تساعدك توفر قبل الشراء</small>
        </div>
      </section>

      <section className="seoBox">
        <h2>مقارنة أسعار {productName} في {countryName}</h2>
        <p>
          هذه الصفحة تجمع لك أفضل نتائج وأسعار <strong>{productName}</strong> في{" "}
          <strong>{countryName}</strong> من مصادر ومتاجر مختلفة. استخدم BPS Chat
          قبل الشراء لمعرفة أفضل سعر، مقارنة العروض، واختيار المتجر الأنسب لك.
        </p>
      </section>

      {stores.length > 0 && (
        <section className="storesBox">
          <div className="sectionTitleRow">
            <div>
              <h2>المتاجر الموجودة في المقارنة</h2>
              <p>Stores found for this product</p>
            </div>
          </div>

          <div className="storeChips">
            {stores.map((store: any) => (
              <span key={store}>🛒 {store}</span>
            ))}
          </div>
        </section>
      )}

      {products.length > 0 ? (
        <>
          <section className="marketSectionHeader">
            <div>
              <h2>🔥 أفضل عروض {productName}</h2>
              <p>Today price comparison</p>
            </div>

            <a href={`/search/${slugify(productName)}-${countryCode}`}>عرض صفحة البحث</a>
          </section>

          <section className="offersGrid">
            {products.slice(0, 24).map((product: any, index: number) => (
              <article className="offerCard" key={index}>
                <div className="imageWrap">
                  {(product.image || product.thumbnail) ? (
                    <img
                      src={product.image || product.thumbnail}
                      alt={`${product.title || product.name || productName} - ${countryName}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="noImage">BPS</div>
                  )}

                  <div className="floatingLabel">
                    {getStoreName(product)}
                  </div>
                </div>

                <div className="cardContent">
                  <p className="storeName">{getStoreName(product)}</p>

                  <h2>{product.title || product.name || productName}</h2>

                  <div className="priceRow">
                    <strong>{product.priceText || product.price || "السعر غير متوفر"}</strong>
                    <span className="currency">{currency}</span>
                  </div>

                  {(product.url || product.link) && (
                    <a
                      href={product.url || product.link}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="buyBtn"
                    >
                      عرض المنتج
                    </a>
                  )}
                </div>
              </article>
            ))}
          </section>
        </>
      ) : (
        <div className="emptyBox">
          <div className="emptyIcon">🔎</div>
          <h2>لا توجد أسعار محفوظة حاليًا</h2>
          <p>
            جرّب البحث عن {productName} من الصفحة الرئيسية ليتم تحديث النتائج وإضافتها هنا.
          </p>
          <a href="/">ابحث الآن</a>
        </div>
      )}

      <section className="contentBox">
        <ProductVideos query={productName} country={countryCode} />
      </section>

      {marketOffers.length > 0 && (
        <section className="relatedMarket">
          <div className="sectionTitleRow">
            <div>
              <h2>عروض من BPS Market قريبة من {productName}</h2>
              <p>منتجات من العملاء والمتاجر داخل {countryName}</p>
            </div>

            <Link href={`/customer-offers?country=${countryCode}`}>
              عرض كل عروض {countryName}
            </Link>
          </div>

          <div className="marketGrid">
            {marketOffers.map((offer: any) => (
              <Link href={offerSeoUrl(offer)} className="marketCard" key={offer.id}>
                <div className="marketImage">
                  <img src={offer.image_url} alt={offer.product_name} loading="lazy" />
                  <span>{countryName}</span>
                </div>

                <div className="marketContent">
                  <p>{offer.store_name || "عرض عميل BPS Chat"}</p>
                  <h3>{offer.product_name}</h3>
                  <strong>{offer.price}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <MarketPromoSection
        countryCode={countryCode}
        query={productName}
        title={`عروض ومنتجات مختارة قريبة من ${productName}`}
      />

      <section className="similarBox">
        <div className="sectionTitleRow">
          <div>
            <h2>منتجات وعمليات بحث مشابهة</h2>
            <p>روابط داخلية تساعدك تقارن أسرع</p>
          </div>
        </div>

        <div className="similarLinks">
          {similarProducts.map((item) => (
            <Link href={item.href} key={item.href}>
              🔎 {item.title}
            </Link>
          ))}

          {relatedSearches.map((item: any) => (
            <Link href={`/search/${item.slug}`} key={item.slug}>
              🔥 {item.query}
            </Link>
          ))}
        </div>
      </section>

      <section className="seoArticle">
        <h2>قبل شراء {productName} في {countryName}</h2>

        <p>
          قبل شراء <strong>{productName}</strong> في {countryName}، من الأفضل
          مقارنة السعر بين أكثر من متجر لأن الأسعار تتغير حسب التوفر، الشحن،
          الخصومات، الضمان، وسياسة الاسترجاع.
        </p>

        <p>
          يساعدك <strong>BPS Chat</strong> على اكتشاف أفضل سعر أونلاين بدل فتح
          أكثر من موقع بنفسك. يمكنك استخدام هذه الصفحة لمتابعة العروض والانتقال
          إلى المتجر المناسب.
        </p>

        <h2>كلمات بحث مرتبطة بـ {productName}</h2>

        <p>
          سعر {productName} في {countryName} - أرخص سعر {productName} - عروض{" "}
          {productName} اليوم - شراء {productName} أونلاين - مقارنة سعر{" "}
          {productName} - أفضل متجر لشراء {productName} - {productName} price in{" "}
          {countryName} - best price {productName}.
        </p>

        <h2>أسئلة شائعة عن {productName}</h2>

        <div className="faqGrid">
          <div>
            <h3>ما هو أفضل سعر {productName}؟</h3>
            <p>
              أفضل سعر يتغير حسب المتجر والعروض الحالية. يمكنك متابعة الكروت
              الموجودة في هذه الصفحة لمعرفة أقل سعر متاح.
            </p>
          </div>

          <div>
            <h3>هل الأسعار نهائية؟</h3>
            <p>
              الأسعار المعروضة للمقارنة وقد تختلف داخل موقع المتجر بسبب الشحن
              أو التوفر أو تحديثات السعر.
            </p>
          </div>

          <div>
            <h3>هل BPS Chat يبيع المنتج؟</h3>
            <p>
              لا، BPS Chat يساعدك في مقارنة الأسعار والوصول إلى روابط الشراء من
              المتاجر والبائعين.
            </p>
          </div>
        </div>
      </section>

      <InternalLinksBoost />
      <PopularSearches />
      <Footer />

      <style>{`
        .productHubPage {
          min-height: 100vh;
          background: linear-gradient(180deg, #f4f7fb 0%, #eef2f7 100%);
          color: #111827;
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          max-width: 1320px;
          margin: 0 auto 24px;
          overflow: hidden;
          border-radius: 0 0 34px 34px;
          padding: 55px 30px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #2563eb 100%);
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
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

        .badge {
          display: inline-flex;
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.32);
          color: #bbf7d0;
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(30px, 5vw, 54px);
          line-height: 1.25;
          font-weight: 950;
          color: #fff;
        }

        .hero h1 span {
          background: linear-gradient(135deg, #22c55e, #60a5fa, #fff);
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero p {
          max-width: 780px;
          margin: 14px 0 0;
          color: #dbeafe;
          font-size: 16px;
          line-height: 2;
        }

        .heroActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .primaryBtn,
        .secondaryBtn {
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 15px;
          font-weight: 950;
          transition: all .25s ease;
        }

        .primaryBtn {
          background: #22c55e;
          color: #fff;
          box-shadow: 0 10px 28px rgba(34,197,94,0.32);
        }

        .secondaryBtn {
          background: rgba(255,255,255,0.13);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.16);
        }

        .primaryBtn:hover,
        .secondaryBtn:hover {
          transform: translateY(-3px) scale(1.03);
        }

        .heroVisual {
          position: relative;
          min-height: 270px;
        }

        .dealCard {
          position: absolute;
          background: rgba(255,255,255,0.96);
          color: #111827;
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 22px 55px rgba(0,0,0,0.22);
        }

        .bigDeal {
          width: 285px;
          min-height: 165px;
          left: 35px;
          top: 32px;
        }

        .smallDeal {
          width: 185px;
          padding: 16px;
        }

        .smallDeal.one {
          right: 10px;
          top: 5px;
        }

        .smallDeal.two {
          right: 55px;
          bottom: 10px;
        }

        .dealCard span {
          display: block;
          color: #2563eb;
          font-weight: 950;
          margin-bottom: 10px;
        }

        .dealCard strong {
          display: block;
          font-size: 25px;
          font-weight: 950;
          color: #16a34a;
          line-height: 1.35;
        }

        .dealCard small {
          display: block;
          margin-top: 8px;
          color: #6b7280;
          font-weight: 800;
        }

        .summaryGrid {
          max-width: 1120px;
          margin: 24px auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .summaryCard {
          padding: 22px;
          border-radius: 28px;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow:
            0 18px 45px rgba(15,23,42,0.08),
            0 0 0 6px rgba(34,197,94,0.035);
          text-align: center;
        }

        .summaryCard span {
          color: #2563eb;
          font-weight: 950;
        }

        .summaryCard strong {
          display: block;
          margin: 10px 0;
          color: #16a34a;
          font-size: 26px;
          font-weight: 950;
          line-height: 1.4;
        }

        .summaryCard small {
          color: #64748b;
          font-weight: 850;
        }

        .seoBox,
        .storesBox,
        .relatedMarket,
        .similarBox,
        .seoArticle,
        .contentBox {
          max-width: 1120px;
          margin: 24px auto;
          padding: 22px;
          border-radius: 28px;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow: 0 18px 45px rgba(15,23,42,0.08);
        }

        .seoBox h2,
        .seoArticle h2,
        .storesBox h2,
        .similarBox h2 {
          margin: 0 0 10px;
          color: #111827;
          font-size: 25px;
          font-weight: 950;
        }

        .seoBox p,
        .seoArticle p {
          color: #334155;
          line-height: 2.1;
          font-size: 16px;
        }

        .sectionTitleRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
        }

        .sectionTitleRow h2 {
          margin: 0;
          color: #111827;
          font-size: 24px;
          font-weight: 950;
        }

        .sectionTitleRow p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 800;
        }

        .sectionTitleRow a {
          color: #16a34a;
          text-decoration: none;
          font-weight: 950;
        }

        .storeChips,
        .similarLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .storeChips span,
        .similarLinks a {
          text-decoration: none;
          padding: 11px 15px;
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          color: #111827;
          font-weight: 900;
          box-shadow: 0 8px 22px rgba(15,23,42,0.05);
          transition: all .25s ease;
        }

        .similarLinks a:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #0f172a, #2563eb);
          color: #fff;
        }

        .marketSectionHeader {
          max-width: 1320px;
          margin: 28px auto 18px;
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
          box-shadow: 0 4px 18px rgba(0,0,0,0.06);
          transition: all .25s ease;
        }

        .offerCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
        }

        .imageWrap {
          position: relative;
          height: 290px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .imageWrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform .3s ease;
        }

        .offerCard:hover .imageWrap img {
          transform: scale(1.07) rotate(-1deg);
        }

        .noImage {
          width: 120px;
          height: 120px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a, #2563eb);
          color: white;
          font-weight: 950;
          font-size: 28px;
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
          box-shadow: 0 6px 18px rgba(34,197,94,0.35);
        }

        .cardContent {
          padding: 14px;
        }

        .storeName {
          color: #6b7280;
          font-size: 12px;
          font-weight: 800;
          margin: 0 0 8px;
        }

        .cardContent h2 {
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 10px;
          min-height: 48px;
          color: #111827;
          font-weight: 850;
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
          font-size: 23px;
          font-weight: 950;
          line-height: 1.35;
        }

        .currency {
          font-size: 11px;
          color: #ffffff;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: 950;
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
          text-decoration: none;
          transition: all .25s ease;
        }

        .buyBtn:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .marketGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .marketCard {
          text-decoration: none;
          color: #111827;
          overflow: hidden;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 22px rgba(15,23,42,0.06);
          transition: all .25s ease;
        }

        .marketCard:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 38px rgba(15,23,42,0.13);
        }

        .marketImage {
          position: relative;
          height: 190px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .marketImage img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .marketImage span {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 6px 10px;
          border-radius: 999px;
          background: #0f172a;
          color: #fff;
          font-size: 11px;
          font-weight: 900;
        }

        .marketContent {
          padding: 13px;
        }

        .marketContent p {
          margin: 0 0 7px;
          color: #64748b;
          font-size: 12px;
          font-weight: 800;
        }

        .marketContent h3 {
          margin: 0 0 8px;
          font-size: 14px;
          line-height: 1.7;
          min-height: 48px;
        }

        .marketContent strong {
          color: #16a34a;
          font-size: 20px;
          font-weight: 950;
        }

        .faqGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 16px;
        }

        .faqGrid div {
          padding: 16px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
        }

        .faqGrid h3 {
          margin: 0 0 8px;
          color: #111827;
          font-size: 17px;
        }

        .faqGrid p {
          margin: 0;
          color: #475569;
          font-size: 14px;
        }

        .emptyBox {
          max-width: 760px;
          margin: 26px auto;
          text-align: center;
          border-radius: 28px;
          padding: 32px 18px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          box-shadow: 0 18px 45px rgba(15,23,42,0.08);
        }

        .emptyIcon {
          font-size: 44px;
          margin-bottom: 10px;
        }

        .emptyBox h2 {
          margin: 0 0 8px;
          color: #111827;
        }

        .emptyBox p {
          color: #64748b;
          margin-bottom: 18px;
        }

        .emptyBox a {
          display: inline-block;
          padding: 12px 23px;
          border-radius: 999px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          font-weight: 900;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .marketplaceHero {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .heroActions {
            justify-content: center;
          }

          .heroVisual {
            display: none;
          }

          .summaryGrid,
          .marketGrid,
          .faqGrid {
            grid-template-columns: 1fr;
          }

          .sectionTitleRow,
          .marketSectionHeader {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 700px) {
          .hero {
            margin: 0 12px 20px;
            padding: 26px 16px;
            border-radius: 0 0 26px 26px;
          }

          .hero h1 {
            font-size: 30px;
          }

          .hero p {
            font-size: 14px;
          }

          .summaryGrid,
          .seoBox,
          .storesBox,
          .relatedMarket,
          .similarBox,
          .seoArticle,
          .contentBox {
            margin-left: 12px;
            margin-right: 12px;
            padding: 16px;
            border-radius: 22px;
          }

          .offersGrid {
            grid-template-columns: 1fr;
            padding: 0 12px;
            gap: 16px;
          }

          .imageWrap {
            height: 230px;
          }

          .marketSectionHeader {
            padding: 0 12px;
          }
        }
      `}</style>
    </main>
  );
}