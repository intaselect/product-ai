import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import { fetchRealProducts } from "@/lib/fetchRealProducts";

export const revalidate = 300;

const productName = "iPhone 15";
const productArabic = "ايفون 15";

export const metadata: Metadata = {
  title:
    "iPhone 15 | سعر ايفون 15 في السعودية ومصر والإمارات والخليج | BPS Chat",
  description:
    "قارن سعر iPhone 15 وايفون 15 في السعودية ومصر والإمارات والكويت وقطر والبحرين عبر BPS Chat بي بي اس شات من Amazon وNoon وJumia وJarir وExtra وCarrefour.",
  keywords: [
    "iPhone 15",
    "ايفون 15",
    "سعر ايفون 15",
    "سعر iPhone 15",
    "عروض ايفون 15",
    "ايفون 15 السعودية",
    "ايفون 15 مصر",
    "ايفون 15 الإمارات",
    "ايفون 15 الكويت",
    "ايفون 15 قطر",
    "ايفون 15 البحرين",
    "BPS Chat",
    "بي بي اس شات",
    "مقارنة أسعار ايفون",
    "أفضل سعر ايفون 15",
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
      "Jumbo",
      "Lulu UAE",
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
    ],
  },
];

const specs = [
  "شاشة Super Retina XDR مقاس 6.1 بوصة",
  "تصميم Dynamic Island",
  "معالج A16 Bionic",
  "كاميرا رئيسية 48MP",
  "تصوير فيديو بجودة عالية",
  "منفذ USB-C",
  "مناسب للتصوير، الألعاب، الدراسة، الشغل والاستخدام اليومي",
];

const relatedKeywords = [
  "سعر ايفون 15 اليوم",
  "أفضل سعر iPhone 15",
  "عروض ايفون 15",
  "ايفون 15 128GB",
  "ايفون 15 256GB",
  "iPhone 15 price",
  "iPhone 15 best price",
  "ايفون 15 جديد",
  "ايفون 15 تقسيط",
  "أرخص ايفون 15",
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

  return raw || "متجر إلكتروني";
}

export default async function Iphone15Page() {
  const saProducts = await fetchRealProducts("iPhone 15", "sa");
  const products = (saProducts || []).slice(0, 16);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "iPhone 15",
    alternateName: "ايفون 15",
    description:
      "صفحة مقارنة أسعار iPhone 15 عبر BPS Chat في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
    brand: {
      "@type": "Brand",
      name: "Apple",
    },
    offers: products.slice(0, 5).map((p: any) => ({
      "@type": "Offer",
      price: String(p.price || p.priceText || "").replace(/[^\d.]/g, ""),
      priceCurrency: "SAR",
      availability: "https://schema.org/InStock",
      url: p.url || p.link || "https://www.bpschat.com",
      seller: {
        "@type": "Organization",
        name: getStoreName(p),
      },
    })),
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
              سعر iPhone 15
              <span>قارن ايفون 15 في السعودية ومصر والإمارات والخليج</span>
            </h1>

            <p>
              صفحة <strong>iPhone 15</strong> في{" "}
              <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> تساعدك
              تعرف سعر <strong>ايفون 15</strong> وتقارن العروض بين Amazon وNoon
              وJumia وJarir وExtra وCarrefour وXcite وSharaf DG في السعودية،
              مصر، الإمارات، الكويت، قطر والبحرين.
            </p>

            <div className="ctaBox">
              <Link href={searchHref("iPhone 15", "sa")} className="primaryBtn">
                قارن سعر iPhone 15 الآن
              </Link>
              <Link href="/iphone-price-comparison" className="secondaryBtn">
                دليل أسعار iPhone
              </Link>
              <Link href="/deals" className="secondaryBtn">
                عروض وخصومات
              </Link>
              <Link href="/stores" className="secondaryBtn">
                دليل المتاجر
              </Link>
            </div>
          </div>

          <div className="productVisual">
            <img
              src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue"
              alt="iPhone 15 - ايفون 15"
            />
            <div className="visualText">
              <strong>iPhone 15</strong>
              <span>Apple • 128GB / 256GB / 512GB</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تقارن سعر iPhone 15 قبل الشراء؟</h2>

        <p>
          سعر ايفون 15 قد يختلف من متجر لمتجر ومن دولة لدولة، وأحيانًا نفس
          المنتج يظهر بسعر مختلف حسب السعة، اللون، الضمان، طريقة الشحن، أو وجود
          عرض مؤقت. لذلك BPS Chat يساعدك تبحث عن أفضل سعر iPhone 15 بدل ما تفتح
          كل متجر لوحده.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>مقارنة بين المتاجر</h3>
            <p>
              قارن بين Amazon وNoon وJumia وJarir وExtra وCarrefour والمتاجر
              القوية في كل دولة.
            </p>
          </div>

          <div className="infoCard">
            <h3>كل الدول المهمة</h3>
            <p>
              السعودية، مصر، الإمارات، الكويت، قطر والبحرين بروابط بحث مباشرة.
            </p>
          </div>

          <div className="infoCard">
            <h3>نية شراء قوية</h3>
            <p>
              الصفحة تستهدف كلمات مثل سعر، عروض، أرخص، مقارنة، اليوم، تقسيط
              وأفضل سعر.
            </p>
          </div>
        </div>

        <h2>مواصفات iPhone 15 باختصار</h2>

        <div className="specGrid">
          {specs.map((spec) => (
            <div key={spec} className="specCard">
              {spec}
            </div>
          ))}
        </div>

        <h2>قارن سعر iPhone 15 حسب الدولة</h2>

        {countries.map((country) => (
          <section key={country.code} className="countryBlock">
            <div className="countryHeader">
              <div>
                <h2>سعر iPhone 15 في {country.name}</h2>
                <p>
                  ابحث عن سعر ايفون 15 في {country.name} بالـ{" "}
                  {country.currency} وقارن العروض بين أشهر المتاجر قبل الشراء.
                </p>
              </div>

              <Link href={searchHref("iPhone 15", country.code)} className="countryBtn">
                قارن في {country.name}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة:</strong>
              <span>{country.stores.join("، ")}</span>
            </div>

            <div className="quickLinks">
              <Link href={searchHref("سعر iPhone 15", country.code)}>
                سعر iPhone 15 في {country.name}
              </Link>
              <Link href={searchHref("عروض iPhone 15", country.code)}>
                عروض iPhone 15 في {country.name}
              </Link>
              <Link href={searchHref("ايفون 15 128GB", country.code)}>
                ايفون 15 128GB في {country.name}
              </Link>
              <Link href={searchHref("ايفون 15 256GB", country.code)}>
                ايفون 15 256GB في {country.name}
              </Link>
              <Link href={searchHref("أرخص ايفون 15", country.code)}>
                أرخص ايفون 15 في {country.name}
              </Link>
            </div>
          </section>
        ))}

        <h2>أفضل عروض iPhone 15 الحالية</h2>

        <div className="productGrid">
          {products.length > 0 ? (
            products.map((product: any, index: number) => (
              <div key={index} className="seoProductCard">
                {(product.image || product.thumbnail) && (
                  <img
                    src={product.image || product.thumbnail}
                    alt={`${product.title || "iPhone 15"} - سعر ايفون 15`}
                    loading="lazy"
                  />
                )}

                <div>
                  <h3>{product.title || product.name || "iPhone 15"}</h3>
                  <p className="price">{product.priceText || product.price || "السعر غير متوفر"}</p>
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
              لم تظهر نتائج مباشرة الآن. استخدم البحث بالأعلى أو جرّب البحث حسب
              الدولة للحصول على أحدث عروض iPhone 15.
            </p>
          )}
        </div>

        <h2>كلمات بحث مرتبطة بـ iPhone 15</h2>

        <div className="quickLinks">
          {relatedKeywords.map((keyword) =>
            countries.map((country) => (
              <Link key={`${keyword}-${country.code}`} href={searchHref(keyword, country.code)}>
                {keyword} - {country.name}
              </Link>
            ))
          )}
        </div>

        <h2>متاجر يكثر البحث فيها عن iPhone 15</h2>

        <div className="storeGrid">
          {countries.flatMap((country) =>
            country.stores.map((store) => (
              <Link
                key={`${country.code}-${store}`}
                href={searchHref(`iPhone 15 ${store}`, country.code)}
                className="storeCard"
              >
                <strong>{store}</strong>
                <small>
                  سعر وعروض iPhone 15 في {country.name}
                </small>
              </Link>
            ))
          )}
        </div>

        <h2>أسئلة شائعة عن iPhone 15</h2>

        <div className="faqGrid">
          <div className="faqCard">
            <h3>ما هو أفضل سعر iPhone 15؟</h3>
            <p>
              أفضل سعر يختلف حسب الدولة والمتجر والسعة. استخدم BPS Chat لمقارنة
              السعر بين المتاجر قبل الشراء.
            </p>
          </div>

          <div className="faqCard">
            <h3>أين أشتري ايفون 15 أونلاين؟</h3>
            <p>
              يمكنك البحث في Amazon وNoon وJumia وJarir وExtra وCarrefour
              والمتاجر المحلية حسب الدولة.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل سعر iPhone 15 يختلف حسب السعة؟</h3>
            <p>
              نعم، سعر iPhone 15 128GB يختلف عن 256GB و512GB، لذلك من الأفضل
              كتابة السعة أثناء البحث.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل BPS Chat يبيع المنتج؟</h3>
            <p>
              لا، BPS Chat يساعدك تقارن الأسعار والعروض ثم يوجهك إلى المتجر
              المناسب.
            </p>
          </div>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة سعر iPhone 15 الآن</h2>
          <p>
            اكتب iPhone 15 أو ايفون 15، اختار الدولة، وشوف أفضل الأسعار والعروض
            من المتاجر المتاحة عبر بي بي اس شات.
          </p>

          <Link href={searchHref("iPhone 15", "sa")} className="primaryBtn">
            ابحث عن أفضل سعر
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
          max-width: 1120px;
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
          font-weight: 700;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr;
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

        h3 {
          margin-top: 0;
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

        .primaryBtn, .secondaryBtn, .countryBtn {
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
          text-decoration: none;
          border-radius: 14px;
          padding: 11px 14px;
        }

        .primaryBtn:hover, .secondaryBtn:hover, .quickLinks a:hover, .countryBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(16,163,127,0.18);
        }

        .productVisual {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03));
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 28px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
        }

        .productVisual img {
          width: 100%;
          max-width: 270px;
          height: 330px;
          object-fit: contain;
          filter: drop-shadow(0 30px 40px rgba(0,0,0,0.45));
        }

        .visualText {
          display: grid;
          gap: 6px;
          margin-top: 12px;
        }

        .visualText span {
          color: #aab7c6;
        }

        .cardsGrid, .specGrid, .faqGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 20px;
        }

        .infoCard, .specCard, .faqCard, .countryBlock, .storeCard, .seoProductCard, .finalCta {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.22);
        }

        .specCard {
          color: #eaf5f1;
          line-height: 1.8;
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

        .productGrid {
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
          margin-bottom: 8px;
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

        .storeGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 18px;
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

        .finalCta {
          margin-top: 44px;
          text-align: center;
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.18), transparent 50%),
            rgba(255,255,255,0.06);
        }

        @media (max-width: 850px) {
          .heroGrid,
          .cardsGrid,
          .specGrid,
          .faqGrid,
          .storeGrid {
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

          h1 {
            font-size: 36px;
          }
        }
      `}</style>
    </main>
  );
}