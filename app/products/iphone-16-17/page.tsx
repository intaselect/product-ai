import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import { fetchRealProducts } from "@/lib/fetchRealProducts";

export const revalidate = 300;

export const metadata: Metadata = {
  title:
    "iPhone 16 و iPhone 17 | الأسعار والعروض في السعودية ومصر والإمارات والخليج | BPS Chat",
  description:
    "قارن أسعار iPhone 16 و iPhone 17 و iPhone 16 Pro Max و iPhone 17 Pro Max في السعودية ومصر والإمارات والكويت وقطر والبحرين عبر BPS Chat بي بي اس شات.",
  keywords: [
    "iPhone 16",
    "iPhone 17",
    "ايفون 16",
    "ايفون 17",
    "سعر ايفون 16",
    "سعر ايفون 17",
    "iPhone 16 Pro",
    "iPhone 16 Pro Max",
    "iPhone 17 Pro",
    "iPhone 17 Pro Max",
    "iPhone 17 Air",
    "ايفون 16 برو ماكس",
    "ايفون 17 برو ماكس",
    "عروض ايفون",
    "أفضل سعر ايفون",
    "BPS Chat",
    "بي بي اس شات",
    "مقارنة أسعار ايفون",
    "ايفون السعودية",
    "ايفون مصر",
    "ايفون الإمارات",
    "ايفون الكويت",
    "ايفون قطر",
    "ايفون البحرين",
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
      "SACO",
      "Virgin Megastore Saudi",
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

const iphoneModels = [
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
  "iPhone 17",
  "iPhone 17 Air",
  "iPhone 17 Pro",
  "iPhone 17 Pro Max",
];

const storageOptions = ["128GB", "256GB", "512GB", "1TB"];

const strongKeywords = [
  "سعر ايفون 16 اليوم",
  "سعر ايفون 17 اليوم",
  "أفضل سعر iPhone 16",
  "أفضل سعر iPhone 17",
  "عروض iPhone 16",
  "عروض iPhone 17",
  "أرخص ايفون 16",
  "أرخص ايفون 17",
  "iPhone 16 price",
  "iPhone 17 price",
  "iPhone 16 Pro Max price",
  "iPhone 17 Pro Max price",
  "ايفون 16 تقسيط",
  "ايفون 17 تقسيط",
  "شراء ايفون 16",
  "شراء ايفون 17",
];

const internalLinks = [
  { label: "مقارنة أسعار iPhone", href: "/iphone-price-comparison" },
  { label: "دليل الماركات", href: "/brands" },
  { label: "دليل المتاجر", href: "/stores" },
  { label: "دليل الأقسام والمنتجات", href: "/categories" },
  { label: "العروض والخصومات", href: "/deals" },
  { label: "أفضل سعر أونلاين", href: "/best-price-online" },
  { label: "أرخص المنتجات", href: "/cheapest-products" },
  { label: "مقارنة الأسعار أونلاين", href: "/compare-prices-online" },
  { label: "أفضل المتاجر الإلكترونية", href: "/best-online-stores-egypt-gulf" },
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

export default async function IphoneHubPage() {
  const [iphone16, iphone17] = await Promise.all([
    fetchRealProducts("iPhone 16", "sa"),
    fetchRealProducts("iPhone 17", "sa"),
  ]);

  const products = [...(iphone16 || []), ...(iphone17 || [])].slice(0, 24);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "iPhone 16 و iPhone 17 عبر BPS Chat",
    description:
      "صفحة Hub لمقارنة أسعار iPhone 16 و iPhone 17 في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
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
              أسعار iPhone 16 و iPhone 17
              <span>
                قارن كل أنواع الايفون في السعودية ومصر والإمارات والكويت وقطر
                والبحرين
              </span>
            </h1>

            <p>
              صفحة <strong>iPhone 16 و iPhone 17</strong> في{" "}
              <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> هي Hub
              قوي لمقارنة أسعار ايفون 16، ايفون 16 بلس، ايفون 16 برو، ايفون 16
              برو ماكس، ايفون 17، ايفون 17 Air، ايفون 17 برو، وايفون 17 برو
              ماكس داخل السعودية، مصر، الإمارات، الكويت، قطر والبحرين من متاجر
              مثل Amazon وNoon وJumia وJarir وExtra وCarrefour وXcite وSharaf DG.
            </p>

            <div className="ctaBox">
              <Link href={searchHref("iPhone 17 Pro Max", "sa")} className="primaryBtn">
                قارن iPhone 17 Pro Max
              </Link>
              <Link href={searchHref("iPhone 16 Pro Max", "sa")} className="secondaryBtn">
                قارن iPhone 16 Pro Max
              </Link>
              <Link href="/iphone-price-comparison" className="secondaryBtn">
                دليل أسعار iPhone
              </Link>
              <Link href="/deals" className="secondaryBtn">
                عروض الايفون
              </Link>
            </div>
          </div>

          <div className="visualBox">
            <div className="phoneCard">
              <span>iPhone 16</span>
              <strong>Pro / Plus / Pro Max</strong>
            </div>
            <div className="phoneCard glow">
              <span>iPhone 17</span>
              <strong>Air / Pro / Pro Max</strong>
            </div>
            <p>Apple iPhone Hub داخل BPS Chat</p>
          </div>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>كل أنواع iPhone 16 و iPhone 17</h2>

        <div className="modelGrid">
          {iphoneModels.map((model) => (
            <div key={model} className="modelCard">
              <h3>{model}</h3>
              <p>
                قارن سعر {model} حسب الدولة والمتجر والسعة، واعرف أفضل عرض قبل
                الشراء.
              </p>

              <div className="quickLinks small">
                {countries.map((country) => (
                  <Link key={`${model}-${country.code}`} href={searchHref(model, country.code)}>
                    {country.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>السعات والكلمات القوية للبحث</h2>

        <div className="quickLinks">
          {iphoneModels.flatMap((model) =>
            storageOptions.map((storage) => (
              <Link key={`${model}-${storage}`} href={searchHref(`${model} ${storage}`, "sa")}>
                {model} {storage}
              </Link>
            ))
          )}
        </div>

        <h2>قارن أسعار الايفون حسب الدولة</h2>

        {countries.map((country) => (
          <section key={country.code} className="countryBlock">
            <div className="countryHeader">
              <div>
                <h2>أسعار iPhone 16 و iPhone 17 في {country.name}</h2>
                <p>
                  ابحث عن أفضل سعر ايفون 16 وايفون 17 في {country.name} بالـ{" "}
                  {country.currency} وقارن بين المتاجر المهمة قبل الشراء.
                </p>
              </div>

              <Link href={searchHref("iPhone 17", country.code)} className="countryBtn">
                قارن في {country.name}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة في {country.name}:</strong>
              <span>{country.stores.join("، ")}</span>
            </div>

            <h3>روابط بحث قوية في {country.name}</h3>

            <div className="quickLinks">
              <Link href={searchHref("سعر iPhone 16", country.code)}>
                سعر iPhone 16 في {country.name}
              </Link>
              <Link href={searchHref("سعر iPhone 17", country.code)}>
                سعر iPhone 17 في {country.name}
              </Link>
              <Link href={searchHref("iPhone 16 Pro Max", country.code)}>
                iPhone 16 Pro Max في {country.name}
              </Link>
              <Link href={searchHref("iPhone 17 Pro Max", country.code)}>
                iPhone 17 Pro Max في {country.name}
              </Link>
              <Link href={searchHref("عروض ايفون 17", country.code)}>
                عروض ايفون 17 في {country.name}
              </Link>
              <Link href={searchHref("أرخص ايفون", country.code)}>
                أرخص ايفون في {country.name}
              </Link>
            </div>

            <h3>بحث حسب المتجر في {country.name}</h3>

            <div className="storeGrid">
              {country.stores.map((store) => (
                <Link
                  key={`${country.code}-${store}`}
                  href={searchHref(`iPhone 17 ${store}`, country.code)}
                  className="storeCard"
                >
                  <strong>{store}</strong>
                  <small>
                    أسعار وعروض iPhone 16 و iPhone 17 في {country.name}
                  </small>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2>أفضل نتائج iPhone 16 و iPhone 17 الحالية</h2>

        <div className="productsGrid">
          {products.length > 0 ? (
            products.map((product: any, index: number) => (
              <div key={index} className="seoProductCard">
                {(product.image || product.thumbnail) && (
                  <img
                    src={product.image || product.thumbnail}
                    alt={`${product.title || "iPhone"} - BPS Chat`}
                    loading="lazy"
                  />
                )}

                <div>
                  <h3>{product.title || product.name || "iPhone"}</h3>
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
              الايفون والدولة للحصول على أحدث الأسعار.
            </p>
          )}
        </div>

        <h2>كلمات مفتاحية قوية لـ BPS Chat</h2>

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

        <h2>أسئلة شائعة عن أسعار iPhone 16 و iPhone 17</h2>

        <div className="faqGrid">
          <div className="faqCard">
            <h3>هل BPS Chat يبيع iPhone 16 أو iPhone 17؟</h3>
            <p>
              لا، BPS Chat لا يبيع المنتجات مباشرة، لكنه يساعدك تقارن الأسعار
              والعروض بين المتاجر وتنتقل للمتجر المناسب.
            </p>
          </div>

          <div className="faqCard">
            <h3>ما أفضل طريقة لمعرفة أرخص سعر ايفون؟</h3>
            <p>
              اكتب اسم الموديل والسعة والدولة، مثل iPhone 17 Pro Max 256GB
              السعودية، ثم قارن النتائج داخل بي بي اس شات.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل أسعار الايفون تختلف بين الدول؟</h3>
            <p>
              نعم، السعر يختلف حسب العملة والضرائب والعروض والمتجر والضمان
              والتوفر.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل الصفحة مفيدة لجوجل؟</h3>
            <p>
              نعم، لأنها تربط المنتج بالدول والمتاجر والكلمات الشرائية والروابط
              الداخلية وصفحات البحث الديناميكية.
            </p>
          </div>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار الايفون الآن</h2>
          <p>
            ابحث عن iPhone 16 أو iPhone 17 أو أي نوع ايفون، اختار الدولة، وقارن
            الأسعار والعروض من المتاجر المتاحة عبر BPS Chat.
          </p>

          <Link href={searchHref("iPhone 17 Pro Max", "sa")} className="primaryBtn">
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

        .phoneCard {
          min-height: 140px;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035));
          display: grid;
          place-items: center;
          text-align: center;
          padding: 20px;
        }

        .phoneCard span {
          font-size: 28px;
          font-weight: 900;
        }

        .phoneCard strong {
          color: #18d6a3;
        }

        .glow {
          box-shadow: 0 0 45px rgba(16,163,127,0.22);
        }

        .modelGrid, .storeGrid, .faqGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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