import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import { fetchRealProducts } from "@/lib/fetchRealProducts";

export const revalidate = 300;

export const metadata: Metadata = {
  title:
    "سعر سماعات Apple AirPods | ايربودز في السعودية ومصر والإمارات والخليج | BPS Chat",
  description:
    "قارن أسعار Apple AirPods وAirPods Pro وAirPods Max في السعودية ومصر والإمارات والكويت وقطر والبحرين عبر BPS Chat بي بي اس شات من Amazon وNoon وJumia وJarir وExtra وCarrefour.",
  keywords: [
    "AirPods",
    "Apple AirPods",
    "سماعات ابل",
    "ايربودز",
    "ايربودز برو",
    "ايربودز ماكس",
    "سعر AirPods",
    "سعر ايربودز",
    "AirPods 4",
    "AirPods Pro 2",
    "AirPods Pro 3",
    "AirPods Max",
    "AirPods Max 2",
    "سعر سماعات ابل",
    "عروض AirPods",
    "أفضل سعر AirPods",
    "BPS Chat",
    "بي بي اس شات",
    "مقارنة أسعار السماعات",
    "سماعات بلوتوث ابل",
  ],
};

const countries = [
  {
    name: "السعودية",
    code: "sa",
    currency: "ريال سعودي",
    stores: [
      "Amazon.sa",
      "Noon Saudi",
      "Jarir",
      "Extra",
      "Carrefour Saudi",
      "Lulu Saudi",
      "Virgin Megastore Saudi",
      "SACO",
    ],
  },
  {
    name: "مصر",
    code: "eg",
    currency: "جنيه مصري",
    stores: [
      "Amazon.eg",
      "Noon Egypt",
      "Jumia Egypt",
      "B.TECH",
      "Raya",
      "2B Egypt",
      "Dream 2000",
      "Tradeline",
    ],
  },
  {
    name: "الإمارات",
    code: "ae",
    currency: "درهم إماراتي",
    stores: [
      "Amazon.ae",
      "Noon UAE",
      "Carrefour UAE",
      "Sharaf DG",
      "Jumbo Electronics",
      "Lulu UAE",
      "Virgin Megastore UAE",
      "Emax",
    ],
  },
  {
    name: "الكويت",
    code: "kw",
    currency: "دينار كويتي",
    stores: [
      "Xcite Kuwait",
      "Best Al-Yousifi",
      "Noon Kuwait",
      "Lulu Kuwait",
      "Carrefour Kuwait",
      "Jarir Kuwait",
      "Eureka Kuwait",
      "Blink Kuwait",
    ],
  },
  {
    name: "قطر",
    code: "qa",
    currency: "ريال قطري",
    stores: [
      "Carrefour Qatar",
      "Lulu Qatar",
      "Noon Qatar",
      "Jarir Qatar",
      "Virgin Megastore Qatar",
      "Al Anees Qatar",
      "Starlink Qatar",
      "Jumbo Qatar",
    ],
  },
  {
    name: "البحرين",
    code: "bh",
    currency: "دينار بحريني",
    stores: [
      "Sharaf DG Bahrain",
      "eXtra Bahrain",
      "Lulu Bahrain",
      "Carrefour Bahrain",
      "Noon Bahrain",
      "Virgin Megastore Bahrain",
      "Ashrafs Bahrain",
      "Home Centre Bahrain",
    ],
  },
];

const airpodsModels = [
  {
    name: "AirPods 4",
    ar: "ايربودز 4",
    desc: "سماعات Apple AirPods 4 مناسبة للاستخدام اليومي والمكالمات والموسيقى مع شحن USB-C.",
  },
  {
    name: "AirPods 4 ANC",
    ar: "ايربودز 4 عزل ضوضاء",
    desc: "نسخة AirPods 4 مع Active Noise Cancellation لمن يريد عزل ضوضاء بسعر أقل من Pro.",
  },
  {
    name: "AirPods Pro 2 USB-C",
    ar: "ايربودز برو 2 USB-C",
    desc: "من أكثر سماعات ابل بحثًا بسبب عزل الضوضاء والراحة والتكامل مع iPhone.",
  },
  {
    name: "AirPods Pro 3",
    ar: "ايربودز برو 3",
    desc: "سماعات AirPods Pro 3 تستهدف من يريد أحدث تجربة Pro من Apple مع عزل ضوضاء أقوى.",
  },
  {
    name: "AirPods Max",
    ar: "ايربودز ماكس",
    desc: "سماعات رأس فاخرة من Apple لعشاق الصوت القوي والتصميم الكبير.",
  },
  {
    name: "AirPods Max 2",
    ar: "ايربودز ماكس 2",
    desc: "نسخة أحدث من AirPods Max لمحبي السماعات الكبيرة وتجربة Apple الكاملة.",
  },
];

const strongKeywords = [
  "سعر سماعات ابل اليوم",
  "سعر AirPods اليوم",
  "أفضل سعر ايربودز",
  "عروض سماعات ابل",
  "عروض AirPods",
  "أرخص AirPods",
  "أرخص ايربودز",
  "AirPods price",
  "AirPods Pro price",
  "AirPods Max price",
  "سماعات ابل أصلية",
  "AirPods USB-C",
  "AirPods noise cancellation",
  "ايربودز عزل ضوضاء",
  "ايربودز تقسيط",
  "شراء AirPods",
];

const internalLinks = [
  { label: "دليل الماركات", href: "/brands" },
  { label: "دليل الأقسام والمنتجات", href: "/categories" },
  { label: "دليل المتاجر", href: "/stores" },
  { label: "العروض والخصومات", href: "/deals" },
  { label: "أفضل سعر أونلاين", href: "/best-price-online" },
  { label: "أرخص المنتجات", href: "/cheapest-products" },
  { label: "مقارنة الأسعار أونلاين", href: "/compare-prices-online" },
  { label: "وفر فلوسك عند الشراء أونلاين", href: "/save-money-online-shopping" },
  { label: "دليل الشراء الآمن أونلاين", href: "/online-shopping-safety-guide" },
  { label: "أسعار iPhone 16 و iPhone 17", href: "/products/iphone-16-17" },
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

function getStoreName(product: any) {
  const raw = String(product.source || product.store || product.merchant || "");
  const url = String(product.url || product.link || "");
  const text = `${raw} ${url}`.toLowerCase();

  if (text.includes("amazon")) return "Amazon";
  if (text.includes("noon")) return "Noon";
  if (text.includes("jumia")) return "Jumia";
  if (text.includes("jarir")) return "Jarir";
  if (text.includes("extra")) return "Extra";
  if (text.includes("carrefour")) return "Carrefour";
  if (text.includes("xcite")) return "Xcite";
  if (text.includes("sharaf")) return "Sharaf DG";
  if (text.includes("lulu")) return "Lulu";
  if (text.includes("btech")) return "B.TECH";
  if (text.includes("raya")) return "Raya";

  return raw || "متجر إلكتروني";
}

export default async function AppleAirpodsPage() {
  const [airpods, airpodsPro, airpodsMax] = await Promise.all([
    fetchRealProducts("Apple AirPods", "sa"),
    fetchRealProducts("AirPods Pro", "sa"),
    fetchRealProducts("AirPods Max", "sa"),
  ]);

  const products = [...(airpods || []), ...(airpodsPro || []), ...(airpodsMax || [])].slice(0, 24);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Apple AirPods Prices | BPS Chat",
    description:
      "صفحة Hub لمقارنة أسعار Apple AirPods وAirPods Pro وAirPods Max في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
    publisher: {
      "@type": "Organization",
      name: "BPS Chat",
      alternateName: "بي بي اس شات",
      url: "https://www.bpschat.com",
    },
  };

  return (
    <main className="seoPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <div className="heroGrid">
          <div>
            <h1>
              أسعار سماعات Apple AirPods
              <span>
                قارن ايربودز وAirPods Pro وAirPods Max في السعودية ومصر
                والإمارات والخليج
              </span>
            </h1>

            <p>
              صفحة <strong>Apple AirPods</strong> في <strong>BPS Chat</strong>{" "}
              أو <strong>بي بي اس شات</strong> هي Hub قوي لمقارنة أسعار سماعات
              ابل: AirPods 4، AirPods 4 ANC، AirPods Pro 2 USB-C، AirPods Pro
              3، AirPods Max وAirPods Max 2 في السعودية، مصر، الإمارات، الكويت،
              قطر والبحرين من متاجر مثل Amazon وNoon وJumia وJarir وExtra
              وCarrefour وXcite وSharaf DG.
            </p>

            <div className="ctaBox">
              <Link href={searchHref("AirPods Pro", "sa")} className="primaryBtn">
                قارن AirPods Pro
              </Link>
              <Link href={searchHref("AirPods 4", "sa")} className="secondaryBtn">
                قارن AirPods 4
              </Link>
              <Link href={searchHref("AirPods Max", "sa")} className="secondaryBtn">
                قارن AirPods Max
              </Link>
              <Link href="/deals" className="secondaryBtn">
                عروض السماعات
              </Link>
            </div>
          </div>

          <div className="visualBox">
            <div className="podCard">
              <span>AirPods</span>
              <strong>4 / ANC</strong>
            </div>
            <div className="podCard glow">
              <span>AirPods Pro</span>
              <strong>Pro 2 / Pro 3</strong>
            </div>
            <div className="podCard">
              <span>AirPods Max</span>
              <strong>Max / Max 2</strong>
            </div>
            <p>Apple Audio Hub داخل BPS Chat</p>
          </div>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>كل أنواع سماعات Apple AirPods</h2>

        <div className="modelGrid">
          {airpodsModels.map((model) => (
            <div key={model.name} className="modelCard">
              <h3>{model.name}</h3>
              <strong>{model.ar}</strong>
              <p>{model.desc}</p>

              <div className="quickLinks small">
                {countries.map((country) => (
                  <Link
                    key={`${model.name}-${country.code}`}
                    href={searchHref(model.name, country.code)}
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>قارن أسعار AirPods حسب الدولة</h2>

        {countries.map((country) => (
          <section key={country.code} className="countryBlock">
            <div className="countryHeader">
              <div>
                <h2>سعر AirPods في {country.name}</h2>
                <p>
                  ابحث عن أفضل سعر سماعات ابل في {country.name} بالـ{" "}
                  {country.currency} وقارن AirPods وAirPods Pro وAirPods Max بين
                  المتاجر المهمة قبل الشراء.
                </p>
              </div>

              <Link href={searchHref("Apple AirPods", country.code)} className="countryBtn">
                قارن في {country.name}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة في {country.name}:</strong>
              <span>{country.stores.join("، ")}</span>
            </div>

            <h3>روابط بحث قوية في {country.name}</h3>

            <div className="quickLinks">
              <Link href={searchHref("سعر AirPods", country.code)}>
                سعر AirPods في {country.name}
              </Link>
              <Link href={searchHref("سعر AirPods Pro", country.code)}>
                سعر AirPods Pro في {country.name}
              </Link>
              <Link href={searchHref("AirPods 4 ANC", country.code)}>
                AirPods 4 ANC في {country.name}
              </Link>
              <Link href={searchHref("AirPods Pro 3", country.code)}>
                AirPods Pro 3 في {country.name}
              </Link>
              <Link href={searchHref("AirPods Max", country.code)}>
                AirPods Max في {country.name}
              </Link>
              <Link href={searchHref("عروض سماعات ابل", country.code)}>
                عروض سماعات ابل في {country.name}
              </Link>
            </div>

            <h3>بحث حسب المتجر في {country.name}</h3>

            <div className="storeGrid">
              {country.stores.map((store) => (
                <Link
                  key={`${country.code}-${store}`}
                  href={searchHref(`AirPods ${store}`, country.code)}
                  className="storeCard"
                >
                  <strong>{store}</strong>
                  <small>
                    أسعار وعروض Apple AirPods وAirPods Pro في {country.name}
                  </small>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2>أفضل نتائج Apple AirPods الحالية</h2>

        <div className="productsGrid">
          {products.length > 0 ? (
            products.map((product: any, index: number) => (
              <div key={index} className="seoProductCard">
                {(product.image || product.thumbnail) && (
                  <img
                    src={product.image || product.thumbnail}
                    alt={`${product.title || "Apple AirPods"} - BPS Chat`}
                    loading="lazy"
                  />
                )}

                <div>
                  <h3>{product.title || product.name || "Apple AirPods"}</h3>
                  <p className="price">
                    {product.priceText || product.price || "السعر غير متوفر"}
                  </p>
                  <p className="store">المتجر: {getStoreName(product)}</p>

                  {(product.url || product.link) && (
                    <a
                      href={product.url || product.link}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                    >
                      عرض المنتج
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>
              لم تظهر نتائج مباشرة الآن. استخدم مربع البحث بالأعلى وابحث عن نوع
              AirPods والدولة للحصول على أحدث الأسعار.
            </p>
          )}
        </div>

        <h2>كلمات مفتاحية قوية لسماعات ابل</h2>

        <div className="quickLinks">
          {strongKeywords.flatMap((keyword) =>
            countries.map((country) => (
              <Link key={`${keyword}-${country.code}`} href={searchHref(keyword, country.code)}>
                {keyword} - {country.name}
              </Link>
            ))
          )}
        </div>

        <h2>روابط داخلية مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          {internalLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/saudi-product-price-comparison">مقارنة أسعار السعودية</Link>
          <Link href="/egypt-product-price-comparison">مقارنة أسعار مصر</Link>
          <Link href="/uae-product-price-comparison">مقارنة أسعار الإمارات</Link>
          <Link href="/kuwait-product-price-comparison">مقارنة أسعار الكويت</Link>
          <Link href="/qatar-product-price-comparison">مقارنة أسعار قطر</Link>
          <Link href="/bahrain-product-price-comparison">مقارنة أسعار البحرين</Link>
        </div>

        <h2>أسئلة شائعة عن AirPods وسماعات ابل</h2>

        <div className="faqGrid">
          <div className="faqCard">
            <h3>ما أفضل نوع AirPods للشراء؟</h3>
            <p>
              AirPods 4 مناسبة للاستخدام اليومي، AirPods Pro مناسبة لعزل الضوضاء،
              وAirPods Max مناسبة لمن يريد سماعة رأس فاخرة.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل سعر AirPods يختلف بين الدول؟</h3>
            <p>
              نعم، السعر يختلف حسب الدولة والمتجر والعملة والضمان والعروض
              المتاحة.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل أبحث بالعربي أم الإنجليزي؟</h3>
            <p>
              الأفضل تجربة الاثنين: AirPods Pro و ايربودز برو و سماعات ابل، حتى
              تظهر نتائج أكثر.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل BPS Chat يبيع سماعات ابل؟</h3>
            <p>
              لا، BPS Chat يساعدك تقارن الأسعار والعروض ثم تنتقل إلى المتجر
              المناسب.
            </p>
          </div>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار AirPods الآن</h2>
          <p>
            ابحث عن AirPods أو AirPods Pro أو AirPods Max، اختار الدولة، وقارن
            الأسعار والعروض من المتاجر المتاحة عبر BPS Chat.
          </p>

          <Link href={searchHref("AirPods Pro", "sa")} className="primaryBtn">
            قارن أفضل سعر الآن
          </Link>
        </div>
      </section>

      <PopularSearches />

      <style>{`
        .seoPage {
          color: white;
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
            #0b0f14;
        }

        .hero, .content {
          max-width: 1160px;
          margin: 0 auto;
          padding: 42px 18px;
        }

        .badge {
          display: inline-flex;
          padding: 8px 14px;
          border: 1px solid rgba(16,163,127,0.45);
          border-radius: 999px;
          color: #10a37f;
          background: rgba(16,163,127,0.08);
          margin-bottom: 18px;
          font-weight: 800;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1.35fr 0.85fr;
          gap: 28px;
          align-items: center;
        }

        h1 {
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.15;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: clamp(18px, 2vw, 28px);
          color: #b8c7d9;
          margin-top: 12px;
        }

        h2 {
          font-size: 30px;
          margin-top: 46px;
          margin-bottom: 16px;
        }

        p {
          color: #d7dee8;
          line-height: 2;
          font-size: 17px;
        }

        .ctaBox, .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }

        .primaryBtn, .secondaryBtn, .countryBtn, .quickLinks a {
          text-decoration: none;
          border-radius: 14px;
          padding: 12px 18px;
          font-weight: 800;
          transition: 0.2s ease;
        }

        .primaryBtn, .countryBtn {
          background: linear-gradient(135deg, #10a37f, #18d6a3);
          color: #06110e;
        }

        .secondaryBtn, .quickLinks a {
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
        }

        .primaryBtn:hover, .secondaryBtn:hover, .quickLinks a:hover, .countryBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(16,163,127,0.18);
        }

        .visualBox {
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.22), transparent 55%),
            rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 30px;
          padding: 24px;
          display: grid;
          gap: 16px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
        }

        .podCard {
          min-height: 115px;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035));
          display: grid;
          place-items: center;
          text-align: center;
          padding: 18px;
        }

        .podCard span {
          font-size: 27px;
          font-weight: 900;
        }

        .podCard strong {
          color: #18d6a3;
        }

        .glow {
          box-shadow: 0 0 45px rgba(16,163,127,0.22);
        }

        .modelGrid, .storeGrid, .faqGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 18px;
        }

        .modelCard, .countryBlock, .storeCard, .seoProductCard, .faqCard, .finalCta {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.22);
        }

        .modelCard h3 {
          margin: 0 0 8px;
          color: #18d6a3;
        }

        .modelCard strong {
          color: #fff;
        }

        .small a {
          padding: 8px 10px;
          font-size: 13px;
        }

        .countryBlock {
          margin-top: 18px;
        }

        .countryHeader {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
        }

        .miniPanel {
          margin-top: 14px;
          padding: 14px;
          border-radius: 16px;
          background: rgba(16,163,127,0.08);
          border: 1px solid rgba(16,163,127,0.2);
          color: #dcefe9;
          line-height: 2;
        }

        .miniPanel span {
          margin-right: 8px;
          color: #c7d2df;
        }

        .storeCard {
          display: grid;
          gap: 8px;
          color: white;
          text-decoration: none;
        }

        .storeCard small {
          color: #aeb8c6;
          line-height: 1.7;
        }

        .productsGrid {
          display: grid;
          gap: 16px;
          margin-top: 18px;
        }

        .seoProductCard {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 16px;
          align-items: center;
        }

        .seoProductCard img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 16px;
          background: white;
          padding: 8px;
        }

        .seoProductCard h3 {
          font-size: 17px;
          margin: 0 0 8px;
        }

        .price {
          color: #18d6a3;
          font-weight: 900;
          margin: 0;
        }

        .store {
          color: #aeb8c6;
          margin: 4px 0 10px;
          font-size: 14px;
        }

        .seoProductCard a {
          color: #10a37f;
          font-weight: 800;
        }

        .finalCta {
          margin-top: 44px;
          text-align: center;
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.18), transparent 50%),
            rgba(255,255,255,0.06);
        }

        @media (max-width: 950px) {
          .heroGrid,
          .modelGrid,
          .storeGrid,
          .faqGrid {
            grid-template-columns: 1fr;
          }

          .countryHeader {
            align-items: flex-start;
            flex-direction: column;
          }

          .seoProductCard {
            grid-template-columns: 82px 1fr;
          }

          .seoProductCard img {
            width: 82px;
            height: 82px;
          }
        }
      `}</style>
    </main>
  );
}