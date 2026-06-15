import { createClient } from "@supabase/supabase-js";

import Link from "next/link";

export const revalidate = 86400;
export const dynamicParams = true;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countryMap: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const currencyMap: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};

const currencyCodeMap: Record<string, string> = {
  sa: "SAR",
  ae: "AED",
  kw: "KWD",
  qa: "QAR",
  bh: "BHD",
  eg: "EGP",
};

function cleanSlug(slug: string) {
  return decodeURIComponent(slug)
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-");
}

function cleanCacheText(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ");
}

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

function getPriceNumber(product: any) {
  const raw = String(product.price || product.priceText || "");
  const num = Number(raw.replace(/[^\d.]/g, ""));
  return isNaN(num) || num <= 0 ? null : num;
}

function getStoreName(product: any) {
  const raw = String(
    product.source || product.store || product.merchant || product.seller || ""
  );

  const url = String(product.url || product.link || "");
  const text = `${raw} ${url}`.toLowerCase();

  if (text.includes("amazon")) return "Amazon";
  if (text.includes("noon")) return "Noon";
  if (text.includes("jumia")) return "Jumia";
  if (text.includes("jarir")) return "Jarir";
  if (text.includes("extra")) return "Extra";
  if (text.includes("carrefour")) return "Carrefour";
  if (text.includes("sharafdg") || text.includes("sharaf dg")) return "Sharaf DG";
  if (text.includes("xcite")) return "Xcite";
  if (text.includes("namshi")) return "Namshi";
  if (text.includes("trendyol")) return "Trendyol";
  if (text.includes("aliexpress")) return "AliExpress";
  if (text.includes("temu")) return "Temu";
  if (text.includes("shein")) return "Shein";
  if (text.includes("btech")) return "B.TECH";
  if (text.includes("lulu")) return "Lulu";
  if (text.includes("blink")) return "Blink";

  return raw || "متجر إلكتروني";
}

async function getProducts(query: string, countryCode: string) {
  const cacheKey = `${countryCode}:${cleanCacheText(query)}`;
  const now = new Date().toISOString();

  const { data: cached } = await supabase
    .from("product_cache")
    .select("results")
    .eq("cache_key", cacheKey)
    .gt("expires_at", now)
    .maybeSingle();

  return cached?.results?.length ? cached.results : [];
}
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const { query, countryName, clean } = parseSlug(slug);

  return {
    title: `دراسة أسعار ${query} في ${countryName} | تحليل المتاجر والأسعار | BPS Chat`,
    description: `دراسة وتحليل أسعار ${query} في ${countryName}: جدول متاجر، أفضل سعر، فرق الأسعار، روابط الشراء والكلمات المفتاحية القوية.`,
    alternates: {
      canonical: `https://www.bpschat.com/research/${clean}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `دراسة أسعار ${query} في ${countryName}`,
      description: `تحليل أسعار ${query} بين المتاجر مع جدول وروابط وأفضل سعر.`,
      url: `https://www.bpschat.com/research/${clean}`,
      siteName: "BPS Chat | بي بي اس شات",
      images: ["https://www.bpschat.com/og-image.png"],
      type: "article",
    },
  };
}

export default async function ProductResearchPage({ params }: any) {
  const { slug } = await params;
  const { query, countryCode, countryName, clean } = parseSlug(slug);

  const products = await getProducts(query, countryCode);

  const productsWithPrices = (products || [])
    .map((p: any) => ({
      ...p,
      storeName: getStoreName(p),
      numericPrice: getPriceNumber(p),
      productTitle: p.title || p.name || query,
      productUrl: p.url || p.link || "#",
      productImage: p.image || p.thumbnail || "",
    }))
    .filter((p: any) => p.numericPrice && p.productUrl);

  const sortedProducts = [...productsWithPrices].sort(
    (a: any, b: any) => a.numericPrice - b.numericPrice
  );
const topDeals = sortedProducts.slice(0, 5);
  const cheapest = sortedProducts[0];
  const highest = sortedProducts[sortedProducts.length - 1];
  const priceDiff =
    cheapest && highest ? highest.numericPrice - cheapest.numericPrice : 0;

  const chartBars = sortedProducts.slice(0, 40);
  const maxPrice = Math.max(...chartBars.map((p: any) => p.numericPrice || 0), 1);

  const keywordList = [
    `سعر ${query} في ${countryName}`,
    `أفضل سعر ${query}`,
    `شراء ${query} أونلاين`,
    `مقارنة أسعار ${query}`,
    `أرخص ${query} في ${countryName}`,
    `عروض ${query}`,
    `${query} price in ${countryName}`,
    `best price ${query}`,
  ];

  const queryWords = String(query)
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 4);

  const searchFilters = queryWords.map((w) => `query.ilike.%${w}%`).join(",");

  const { data: relatedSearchTerms } = searchFilters
    ? await supabase
        .from("search_terms")
        .select("query, slug, search_count")
        .eq("country", countryCode)
        .or(searchFilters)
        .order("search_count", { ascending: false })
        .limit(20)
    : { data: [] };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: query,
    description: `دراسة أسعار ${query} في ${countryName} ومقارنة أفضل العروض بين المتاجر.`,
    brand: {
      "@type": "Brand",
      name: "BPS Chat",
    },
    offers: sortedProducts.slice(0, 8).map((product: any) => ({
      "@type": "Offer",
      price: product.numericPrice,
      priceCurrency: currencyCodeMap[countryCode] || "SAR",
      availability: "https://schema.org/InStock",
      url: product.productUrl,
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
        name: `ما أفضل سعر ${query} في ${countryName}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: cheapest
            ? `أفضل سعر متاح حاليًا هو ${cheapest.priceText || cheapest.price} من متجر ${cheapest.storeName}.`
            : `يمكنك متابعة هذه الصفحة لمعرفة أحدث أسعار ${query}.`,
        },
      },
      {
        "@type": "Question",
        name: `هل تختلف أسعار ${query} بين المتاجر؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `نعم، تختلف الأسعار حسب المتجر والتوفر والعروض والشحن والضمان.`,
        },
      },
      {
        "@type": "Question",
        name: `هل أسعار ${query} محدثة؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `يتم تحديث النتائج دوريًا حسب البيانات المتاحة من المتاجر ومصادر البحث.`,
        },
      },
    ],
  };

  return (
    <main className="researchSlugPage" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="hero">
        <div className="badge">📊 دراسة منتج</div>

        <h1>دراسة أسعار {query} في {countryName}</h1>

        <p>
          تحليل شامل لأسعار {query} في {countryName} من عدة متاجر مع جدول أسعار،
          روابط شراء، رسم بياني، أفضل سعر وكلمات مفتاحية مرتبطة.
        </p>

        <div className="actions">
          <Link href="/research">🔎 اعمل دراسة لمنتج آخر</Link>
          <Link href={`/search/${clean}`}>🛒 عرض صفحة البحث العادية</Link>
        </div>
      </section>

      <section className="statsGrid">
        <div>
          <span>عدد النتائج</span>
          <strong>{sortedProducts.length}</strong>
        </div>

        <div>
          <span>أقل سعر</span>
          <strong>{cheapest ? cheapest.priceText || cheapest.price : "غير متوفر"}</strong>
        </div>

        <div>
          <span>أعلى سعر</span>
          <strong>{highest ? highest.priceText || highest.price : "غير متوفر"}</strong>
        </div>

        <div>
          <span>فرق السعر</span>
          <strong>
            {priceDiff
              ? `${priceDiff.toLocaleString()} ${currencyMap[countryCode] || ""}`
              : "غير متوفر"}
          </strong>
        </div>
      </section>

      {topDeals.length > 0 && (
  <section className="bestBox">
    <h2>🏆 أفضل 5 أسعار حاليًا</h2>

    <div className="bestContent">
      {topDeals.map((deal, index) => (
        <div className="bestMiniCard" key={index}>
          {deal.productImage && (
            <img
              src={deal.productImage}
              alt={deal.productTitle}
            />
          )}

          <h3>{deal.productTitle}</h3>

          <p>
            المتجر:
            <strong> {deal.storeName}</strong>
          </p>

          <p className="bestMiniPrice">
            {deal.priceText || deal.price}
          </p>

          <a
            href={deal.productUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
          >
            فتح الرابط
          </a>
        </div>
      ))}
    </div>
  </section>
)}

      <section className="tableSection">
        <h2>جدول أسعار {query}</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>المتجر</th>
                <th>السعر</th>
                <th>اسم المنتج</th>
                <th>الرابط</th>
              </tr>
            </thead>

            <tbody>
              {sortedProducts.slice(0, 100).map((product: any, index: number) => (
                <tr key={index}>
                  <td>{product.storeName}</td>
                  <td>{product.priceText || product.price}</td>
                  <td>{product.productTitle}</td>
                  <td>
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                    >
                      شراء
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {chartBars.length > 0 && (
        <section className="chartSection">
          <h2>الرسم البياني لمقارنة الأسعار</h2>

          <div className="chart">
            {chartBars.map((product: any, index: number) => (
              <div className="barRow" key={index}>
                <span>{product.storeName}</span>

                <div className="barTrack">
                  <div
                    className="barFill"
                    style={{
                      width: `${Math.max(
                        8,
                        (product.numericPrice / maxPrice) * 100
                      )}%`,
                    }}
                  />
                </div>

                <strong>{product.priceText || product.price}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="analysisSection">
        <h2>تحليل سعر {query}</h2>

        {cheapest && highest ? (
          <>
            <p>
              يتراوح سعر {query} في {countryName} بين{" "}
              <strong>{cheapest.priceText || cheapest.price}</strong> و{" "}
              <strong>{highest.priceText || highest.price}</strong>.
            </p>

            {priceDiff > 0 && (
              <p>
                فرق السعر بين أقل وأعلى عرض يصل إلى حوالي{" "}
                <strong>
                  {priceDiff.toLocaleString()} {currencyMap[countryCode]}
                </strong>
                ، لذلك مقارنة الأسعار قبل الشراء قد تساعدك على توفير مبلغ واضح.
              </p>
            )}

            <p>
              أفضل سعر ظاهر حاليًا من متجر <strong>{cheapest.storeName}</strong>.
              ومع ذلك يجب مراجعة تفاصيل الشحن والضمان والتوفر داخل المتجر قبل إتمام الشراء.
            </p>
          </>
        ) : (
          <p>
            لم يتم العثور على أسعار كافية حاليًا، لكن الصفحة ستساعدك على متابعة
            أحدث العروض عند توفر نتائج جديدة.
          </p>
        )}
      </section>

      <section className="keywordsSection">
        <h2>الكلمات المفتاحية والجمل القوية عن {query}</h2>

        <div className="keywordsGrid">
          {keywordList.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>

        <p>
          أفضل سعر {query} في {countryName}، مقارنة أسعار {query}، عروض {query}،
          شراء {query} أونلاين، أرخص متجر لشراء {query}.
        </p>
      </section>

      {relatedSearchTerms && relatedSearchTerms.length > 0 && (
        <section className="relatedSection">
          <h2>عمليات بحث مرتبطة</h2>

          <div className="relatedLinks">
          {relatedSearchTerms.map((item: any) => (
  <Link
    href={`/research/${item.slug}`}
    key={item.slug}
    prefetch={false}
  >
    {item.query}
  </Link>
))}
          </div>
        </section>
      )}

      <section className="faqSection">
        <h2>أسئلة شائعة حول {query}</h2>

        <h3>ما أفضل سعر {query} في {countryName}؟</h3>
        <p>
          {cheapest
            ? `أفضل سعر ظاهر حاليًا هو ${cheapest.priceText || cheapest.price} من متجر ${cheapest.storeName}.`
            : "السعر يختلف حسب المتجر والتوفر والعروض الحالية."}
        </p>

        <h3>هل الأسعار تختلف بين المتاجر؟</h3>
        <p>
          نعم، الأسعار تختلف بسبب العروض والشحن والضمان وتوفر المنتج داخل كل متجر.
        </p>

        <h3>هل يمكن شراء المنتج مباشرة؟</h3>
        <p>
          نعم، يمكنك الضغط على رابط الشراء بجانب كل متجر للانتقال إلى صفحة المنتج.
        </p>
      </section>

      <style>{`
        .researchSlugPage {
          min-height: 100vh;
          padding: 36px 16px;
          color: #fff;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.10), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.10), transparent 25%),
            #0b0f14;
        }

        .hero,
        .statsGrid,
        .bestBox,
        .tableSection,
        .chartSection,
        .analysisSection,
        .keywordsSection,
        .relatedSection,
        .faqSection {
          max-width: 1100px;
          margin: 0 auto 24px;
        }

        .hero {
          text-align: center;
          padding: 36px 22px;
          border-radius: 28px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,255,200,0.18);
        }

        .badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(0,255,200,0.1);
          color: #00ffd5;
          font-weight: 900;
          border: 1px solid rgba(0,255,200,0.25);
          margin-bottom: 12px;
        }

        h1 {
          font-size: clamp(28px, 5vw, 48px);
          margin: 0 0 14px;
        }

        h2 {
          color: #00ffd5;
          margin-top: 0;
        }

        p {
          color: #d1d5db;
          line-height: 2;
        }

        .actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .actions a,
        .bestContent a,
        table a {
          text-decoration: none;
          font-weight: 900;
          color: #020617;
          background: linear-gradient(135deg, #00ffd5, #38bdf8);
          padding: 10px 14px;
          border-radius: 12px;
          display: inline-block;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .statsGrid div,
        .bestBox,
        .tableSection,
        .chartSection,
        .analysisSection,
        .keywordsSection,
        .relatedSection,
        .faqSection {
          padding: 22px;
          border-radius: 22px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .statsGrid span {
          display: block;
          color: #cbd5e1;
          margin-bottom: 8px;
        }

        .statsGrid strong {
          font-size: 22px;
          color: #fff;
        }
.bestContent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.bestMiniCard {
  text-align: center;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(0,255,200,0.15);
}

.bestMiniCard img {
  width: 95px;
  height: 95px;
  object-fit: contain;
  background: #fff;
  border-radius: 12px;
  padding: 6px;
  margin-bottom: 10px;
}

.bestMiniCard h3 {
  font-size: 13px;
  line-height: 1.6;
  min-height: 62px;
}

.bestMiniCard p {
  margin: 6px 0;
}

.bestMiniPrice {
  color: #00ffd5 !important;
  font-size: 18px !important;
  font-weight: 950;
}

.bestMiniCard a {
  margin-top: 8px;
  display: inline-block;
}

@media (max-width: 1000px) {
  .bestContent {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .bestContent {
    grid-template-columns: 1fr;
  }
}
        .bestContent {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .bestContent img {
          width: 130px;
          height: 130px;
          object-fit: contain;
          background: #fff;
          border-radius: 16px;
          padding: 8px;
        }

        .tableWrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }

        th,
        td {
          padding: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          text-align: right;
        }

        th {
          color: #00ffd5;
        }

        .chart {
          display: grid;
          gap: 14px;
        }

        .barRow {
          display: grid;
          grid-template-columns: 130px 1fr 150px;
          gap: 12px;
          align-items: center;
        }

        .barTrack {
          height: 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }

        .barFill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #00ffd5, #38bdf8);
        }

        .keywordsGrid,
        .relatedLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .keywordsGrid span,
        .relatedLinks a {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(0,255,200,0.10);
          border: 1px solid rgba(0,255,200,0.22);
          color: #8ffff0;
          text-decoration: none;
          font-weight: 800;
        }

        .faqSection h3 {
          margin-top: 20px;
          color: #fff;
        }

        @media (max-width: 800px) {
          .statsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .bestContent {
            flex-direction: column;
            text-align: center;
          }

          .barRow {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .statsGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}