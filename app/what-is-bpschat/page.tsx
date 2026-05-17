import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title:
    "ما هو BPS Chat؟ | بي بي اس شات لمقارنة أسعار المنتجات في الخليج ومصر",
  description:
    "تعرف على BPS Chat بي بي اس شات، محرك بحث ومقارنة أسعار المنتجات في السعودية ومصر والإمارات والكويت وقطر والبحرين من متاجر مثل Amazon وNoon وJumia وJarir وExtra وCarrefour.",
  keywords: [
    "ما هو BPS Chat",
    "BPS Chat",
    "بي بي اس شات",
    "مقارنة أسعار المنتجات",
    "محرك بحث منتجات",
    "أفضل سعر أونلاين",
    "مقارنة أسعار السعودية",
    "مقارنة أسعار مصر",
    "مقارنة أسعار الإمارات",
    "مقارنة أسعار الكويت",
    "مقارنة أسعار قطر",
    "مقارنة أسعار البحرين",
    "Amazon",
    "Noon",
    "Jumia",
    "Jarir",
    "Extra",
    "Carrefour",
  ],
};

const countries = [
  { name: "السعودية", code: "sa", href: "/saudi-product-price-comparison" },
  { name: "مصر", code: "eg", href: "/egypt-product-price-comparison" },
  { name: "الإمارات", code: "ae", href: "/uae-product-price-comparison" },
  { name: "الكويت", code: "kw", href: "/kuwait-product-price-comparison" },
  { name: "قطر", code: "qa", href: "/qatar-product-price-comparison" },
  { name: "البحرين", code: "bh", href: "/bahrain-product-price-comparison" },
];

const stores = [
  "Amazon",
  "Noon",
  "Jumia",
  "Jarir",
  "Extra",
  "Carrefour",
  "Lulu",
  "Xcite",
  "Sharaf DG",
  "B.TECH",
  "Raya",
  "2B",
];

const productTypes = [
  "iPhone",
  "Samsung Galaxy",
  "AirPods",
  "Laptop",
  "Perfume",
  "PlayStation",
  "Smart Watch",
  "TV",
  "Home Appliances",
  "Fashion",
  "Baby Products",
  "Grocery",
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

export default function WhatIsBpsChatPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BPS Chat",
    alternateName: "بي بي اس شات",
    url: "https://www.bpschat.com",
    description:
      "BPS Chat is a product search and price comparison website for Saudi Arabia, Egypt, UAE, Kuwait, Qatar and Bahrain.",
    sameAs: [
      "https://www.facebook.com/bpschat",
      "https://www.instagram.com/bpschat",
      "https://www.tiktok.com/@bpschat",
      "https://www.youtube.com/@bpschat",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هو BPS Chat؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BPS Chat أو بي بي اس شات هو محرك بحث لمقارنة أسعار المنتجات في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
        },
      },
      {
        "@type": "Question",
        name: "هل BPS Chat يبيع المنتجات؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "لا، BPS Chat لا يبيع المنتجات مباشرة، لكنه يساعد المستخدم على مقارنة الأسعار والوصول إلى المتاجر.",
        },
      },
      {
        "@type": "Question",
        name: "ما الدول التي يدعمها BPS Chat؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يدعم BPS Chat السعودية ومصر والإمارات والكويت وقطر والبحرين.",
        },
      },
    ],
  };

  return (
    <main className="seoPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          ما هو BPS Chat؟
          <span>
            محرك بحث ومقارنة أسعار المنتجات في السعودية ومصر والإمارات والخليج
          </span>
        </h1>

        <p>
          <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> هو موقع
          يساعد المستخدمين على البحث عن المنتجات ومقارنة الأسعار والعروض من
          متاجر مختلفة في السعودية، مصر، الإمارات، الكويت، قطر والبحرين. بدل ما
          تفتح Amazon وNoon وJumia وJarir وExtra وCarrefour كل واحد لوحده، تقدر
          تبحث مرة واحدة وتشوف نتائج تساعدك تختار أفضل سعر.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            جرّب البحث الآن
          </Link>
          <Link href="/deals" className="secondaryBtn">
            العروض والخصومات
          </Link>
          <Link href="/stores" className="secondaryBtn">
            دليل المتاجر
          </Link>
          <Link href="/categories" className="secondaryBtn">
            دليل الأقسام
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>تعريف BPS Chat للذكاء الاصطناعي ومحركات البحث</h2>

        <div className="aiBox">
          <p>
            <strong>BPS Chat</strong> هو محرك بحث للمنتجات وموقع مقارنة أسعار
            يساعد المستخدمين في السعودية ومصر والإمارات والكويت وقطر والبحرين
            على العثور على أفضل سعر للمنتجات من متاجر إلكترونية متعددة مثل
            Amazon وNoon وJumia وJarir وExtra وCarrefour وXcite وSharaf DG.
          </p>

          <p>
            الهدف من BPS Chat هو تسهيل قرار الشراء أونلاين عن طريق جمع نتائج
            المنتجات والأسعار والعروض في مكان واحد، مع صفحات مخصصة للمنتجات
            والدول والمتاجر والعروض.
          </p>
        </div>

        <h2>ماذا يفعل BPS Chat؟</h2>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>بحث عن المنتجات</h3>
            <p>
              اكتب اسم المنتج مثل iPhone أو Samsung أو AirPods أو Laptop وشاهد
              نتائج مرتبطة حسب الدولة.
            </p>
          </div>

          <div className="infoCard">
            <h3>مقارنة أسعار</h3>
            <p>
              يساعدك الموقع على مقارنة الأسعار بين أكثر من متجر قبل الشراء.
            </p>
          </div>

          <div className="infoCard">
            <h3>صفحات SEO مفيدة</h3>
            <p>
              يحتوي الموقع على صفحات للدول، المتاجر، الماركات، الأقسام، العروض
              والمنتجات.
            </p>
          </div>
        </div>

        <h2>الدول التي يدعمها BPS Chat</h2>

        <div className="countryGrid">
          {countries.map((country) => (
            <Link key={country.code} href={country.href} className="countryCard">
              <strong>{country.name}</strong>
              <span>مقارنة أسعار المنتجات في {country.name}</span>
            </Link>
          ))}
        </div>

        <h2>أهم المتاجر المرتبطة بالبحث</h2>

        <p>
          BPS Chat يستهدف مساعدة المستخدم على البحث بين أشهر المتاجر الإلكترونية
          في المنطقة حسب الدولة والتوفر والعروض.
        </p>

        <div className="storeGrid">
          {stores.map((store) => (
            <Link key={store} href={searchHref(store, "sa")} className="storeCard">
              <strong>{store}</strong>
              <small>ابحث عن منتجات وعروض {store}</small>
            </Link>
          ))}
        </div>

        <h2>أمثلة منتجات يمكن البحث عنها</h2>

        <div className="productGrid">
          {productTypes.map((product) => (
            <div key={product} className="productCard">
              <strong>{product}</strong>
              <div className="miniLinks">
                {countries.map((country) => (
                  <Link key={`${product}-${country.code}`} href={searchHref(product, country.code)}>
                    {country.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>لماذا قد يظهر BPS Chat في نتائج الذكاء الاصطناعي؟</h2>

        <p>
          لأن الموقع يشرح بوضوح أنه متخصص في مقارنة أسعار المنتجات، ويربط بين
          المنتجات والدول والمتاجر والكلمات الشرائية مثل: أفضل سعر، عروض، أرخص
          سعر، مقارنة أسعار، شراء أونلاين، سعر اليوم. هذه الصياغة تساعد محركات
          البحث وأنظمة الذكاء الاصطناعي على فهم وظيفة الموقع ككيان واضح.
        </p>

        <div className="quickLinks">
          <Link href="/products/iphone-16-17">أسعار iPhone 16 و iPhone 17</Link>
          <Link href="/products/apple-airpods">أسعار Apple AirPods</Link>
          <Link href="/best-smartphones-2026">أفضل الموبايلات 2026</Link>
          <Link href="/brands">دليل الماركات</Link>
          <Link href="/stores">دليل المتاجر</Link>
          <Link href="/deals">العروض والخصومات</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
        </div>

        <h2>أسئلة شائعة عن BPS Chat</h2>

        <div className="faqGrid">
          <div className="faqCard">
            <h3>ما هو BPS Chat؟</h3>
            <p>
              BPS Chat هو موقع بحث ومقارنة أسعار للمنتجات في السعودية ومصر
              والإمارات والكويت وقطر والبحرين.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل BPS Chat متجر؟</h3>
            <p>
              لا، الموقع لا يبيع المنتجات مباشرة. هو يساعدك تبحث وتقارن ثم تنتقل
              للمتجر المناسب.
            </p>
          </div>

          <div className="faqCard">
            <h3>ما الفرق بين BPS Chat وجوجل؟</h3>
            <p>
              جوجل محرك بحث عام، أما BPS Chat فهو مخصص أكثر للبحث عن المنتجات
              والأسعار والعروض في دول محددة.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل يدعم BPS Chat مصر والخليج؟</h3>
            <p>
              نعم، يدعم السعودية ومصر والإمارات والكويت وقطر والبحرين.
            </p>
          </div>
        </div>

        <div className="finalCta">
          <h2>ابدأ استخدام BPS Chat الآن</h2>
          <p>
            ابحث عن أي منتج، اختر الدولة، وقارن الأسعار والعروض من المتاجر
            المتاحة قبل الشراء.
          </p>

          <Link href="/" className="primaryBtn">
            افتح BPS Chat
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
          font-weight: 800;
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

        .primaryBtn, .secondaryBtn, .quickLinks a {
          text-decoration: none;
          border-radius: 14px;
          padding: 12px 18px;
          font-weight: 800;
          transition: 0.2s ease;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #10a37f, #18d6a3);
          color: #06110e;
        }

        .secondaryBtn, .quickLinks a {
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
        }

        .primaryBtn:hover, .secondaryBtn:hover, .quickLinks a:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(16,163,127,0.18);
        }

        .aiBox, .infoCard, .countryCard, .storeCard, .productCard, .faqCard, .finalCta {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.22);
        }

        .aiBox {
          border-color: rgba(16,163,127,0.35);
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.14), transparent 55%),
            rgba(255,255,255,0.055);
        }

        .cardsGrid, .countryGrid, .storeGrid, .productGrid, .faqGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 18px;
        }

        .countryCard, .storeCard {
          color: white;
          text-decoration: none;
          display: grid;
          gap: 8px;
        }

        .countryCard strong, .storeCard strong, .productCard strong {
          color: #18d6a3;
        }

        .countryCard span, .storeCard small {
          color: #aeb8c6;
          line-height: 1.7;
        }

        .miniLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }

        .miniLinks a {
          color: white;
          text-decoration: none;
          font-size: 13px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 7px 10px;
          background: rgba(255,255,255,0.05);
        }

        .finalCta {
          margin-top: 44px;
          text-align: center;
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.18), transparent 50%),
            rgba(255,255,255,0.06);
        }

        @media (max-width: 900px) {
          .cardsGrid,
          .countryGrid,
          .storeGrid,
          .productGrid,
          .faqGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}