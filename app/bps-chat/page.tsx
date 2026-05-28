import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "BPS Chat | بي بي اس شات - محرك بحث ومقارنة أسعار المنتجات",
  description:
    "BPS Chat أو بي بي اس شات هو محرك بحث لمقارنة أسعار المنتجات بين المتاجر في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
  keywords: [
    "BPS Chat",
    "بي بي اس شات",
    "bpschat",
    "BPSChat",
    "موقع BPS Chat",
    "ما هو BPS Chat",
    "ما هو بي بي اس شات",
    "محرك بحث منتجات",
    "مقارنة أسعار",
    "مقارنة أسعار المنتجات",
    "أفضل سعر",
    "أرخص سعر",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض مصر",
    "Amazon",
    "Noon",
    "Jumia",
    "Jarir",
    "Extra",
    "Carrefour",
  ],
  openGraph: {
    title: "BPS Chat | بي بي اس شات",
    description:
      "محرك بحث ومقارنة أسعار المنتجات في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
    url: "https://www.bpschat.com/bps-chat",
    siteName: "BPS Chat",
    images: [
      {
        url: "https://www.bpschat.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "BPS Chat - بي بي اس شات",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
};

export default function BpsChatPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://www.bpschat.com/bps-chat/#webpage",
                url: "https://www.bpschat.com/bps-chat",
                name: "BPS Chat | بي بي اس شات",
                description:
                  "BPS Chat أو بي بي اس شات هو محرك بحث لمقارنة أسعار المنتجات بين المتاجر في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
                isPartOf: {
                  "@id": "https://www.bpschat.com/#website",
                },
                about: {
                  "@id": "https://www.bpschat.com/#organization",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "ما هو BPS Chat؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "BPS Chat أو بي بي اس شات هو محرك بحث يساعد المستخدمين على البحث عن المنتجات ومقارنة الأسعار بين المتاجر في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "هل BPS Chat متجر إلكتروني؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "لا، BPS Chat ليس متجرًا يبيع المنتجات مباشرة، لكنه يساعدك على مقارنة الأسعار ثم الانتقال إلى المتجر الأصلي.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "ما الدول التي يدعمها BPS Chat؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "يدعم BPS Chat البحث ومقارنة الأسعار في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          BPS Chat
          <span>بي بي اس شات لمقارنة أسعار المنتجات</span>
        </h1>

        <p>
          <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> هو محرك بحث
          يساعدك على مقارنة أسعار المنتجات بين المتاجر في السعودية، الإمارات،
          الكويت، قطر، البحرين ومصر، بدل ما تفتح كل متجر لوحده.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابدأ البحث الآن
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            مقارنة الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>ما هو BPS Chat؟</h2>

        <p>
          BPS Chat هو موقع عربي يساعد المستخدم على البحث عن المنتجات ومقارنة
          الأسعار بين أكثر من متجر. الهدف هو معرفة أفضل سعر، أرخص عرض، والمتجر
          المناسب قبل الشراء.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>محرك بحث منتجات</h3>
            <p>
              اكتب اسم المنتج مرة واحدة، واختر الدولة، وشاهد نتائج من متاجر
              مختلفة حسب السوق.
            </p>
          </div>

          <div className="infoCard">
            <h3>مقارنة أسعار</h3>
            <p>
              قارن بين الأسعار والعروض بدل البحث اليدوي في Amazon وNoon وJumia
              وJarir وExtra وCarrefour.
            </p>
          </div>

          <div className="infoCard">
            <h3>يدعم عدة دول</h3>
            <p>
              السعودية، الإمارات، الكويت، قطر، البحرين ومصر، مع نتائج مناسبة لكل
              دولة.
            </p>
          </div>
        </div>

        <h2>كيف يعمل بي بي اس شات؟</h2>

        <p>
          تكتب اسم المنتج في شريط البحث، تختار الدولة، ثم يعرض لك BPS Chat نتائج
          تساعدك على معرفة الأسعار والعروض المتاحة. بعد ذلك يمكنك الانتقال إلى
          المتجر الأصلي لمراجعة السعر النهائي، الشحن، الضمان والتوفر.
        </p>

        <h2>ما المنتجات التي يمكنك البحث عنها؟</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/search/airpods-sa">سعر AirPods</Link>
          <Link href="/search/playstation-sa">سعر PlayStation</Link>
          <Link href="/search/شاشات-sa">أسعار الشاشات</Link>
          <Link href="/search/ملابس-ae">عروض الملابس</Link>
        </div>

        <h2>الدول التي يدعمها BPS Chat</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>صفحة المقارنة</th>
                <th>أمثلة بحث</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>السعودية</td>
                <td>مقارنة أسعار السعودية</td>
                <td>سعر ايفون في السعودية، عروض نون، عروض جرير</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>مقارنة أسعار الإمارات</td>
                <td>Amazon UAE offers، سعر لابتوب في دبي، عروض نون الإمارات</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>مقارنة أسعار مصر</td>
                <td>عروض جوميا، عروض أمازون مصر، سعر موبايل في مصر</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>مقارنة أسعار الكويت</td>
                <td>عروض Xcite، سعر ايفون في الكويت، عروض لولو</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>مقارنة أسعار قطر</td>
                <td>Qatar deals، سعر سامسونج في قطر، عروض كارفور قطر</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>مقارنة أسعار البحرين</td>
                <td>عروض البحرين، Sharaf DG Bahrain، eXtra Bahrain</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>المتاجر التي قد تظهر في BPS Chat</h2>

        <p>
          حسب الدولة والمنتج، قد تظهر نتائج من متاجر مثل Amazon، Noon، Jumia،
          Jarir، Extra، Carrefour، Sharaf DG، Lulu، Xcite، B.TECH، Raya، 2B
          ومتاجر إلكترونية محلية أخرى.
        </p>

        <div className="quickLinks">
          <Link href="/bps-vs-amazon">BPS Chat vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS Chat vs Noon</Link>
          <Link href="/bps-vs-jumia">BPS Chat vs Jumia</Link>
          <Link href="/bps-vs-google">BPS Chat vs Google</Link>
        </div>

        <h2>هل BPS Chat يبيع المنتجات؟</h2>

        <p>
          لا. BPS Chat ليس متجرًا ولا يبيع المنتجات مباشرة. الموقع يساعدك فقط على
          البحث والمقارنة، وبعدها يمكنك الانتقال إلى المتجر الأصلي لإتمام الشراء
          أو مراجعة تفاصيل المنتج.
        </p>

        <h2>لماذا يظهر اسم BPS Chat في البحث؟</h2>

        <p>
          لأن BPS Chat يقدم صفحات متخصصة لمقارنة أسعار المنتجات، وصفحات للدول،
          وصفحات للمتاجر، وصفحات بحث ديناميكية تساعد المستخدمين على الوصول إلى
          أفضل سعر حسب المنتج والدولة.
        </p>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/saudi-product-price-comparison">مقارنة أسعار السعودية</Link>
          <Link href="/uae-product-price-comparison">مقارنة أسعار الإمارات</Link>
          <Link href="/egypt-product-price-comparison">مقارنة أسعار مصر</Link>
          <Link href="/kuwait-product-price-comparison">مقارنة أسعار الكويت</Link>
          <Link href="/qatar-product-price-comparison">مقارنة أسعار قطر</Link>
          <Link href="/bahrain-product-price-comparison">مقارنة أسعار البحرين</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ البحث في BPS Chat الآن</h2>
          <p>
            ابحث عن أي منتج، اختر الدولة، وقارن الأسعار بين المتاجر بسهولة.
          </p>

          <Link href="/" className="primaryBtn">
            جرّب BPS Chat
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

        .hero {
          max-width: 980px;
          margin: 0 auto;
          padding: 54px 18px 30px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          background: rgba(16, 163, 127, 0.14);
          border: 1px solid rgba(16, 163, 127, 0.35);
          color: #7fffe0;
          padding: 8px 16px;
          border-radius: 999px;
          margin-bottom: 18px;
          font-weight: 700;
        }

        h1 {
          font-size: 42px;
          line-height: 1.35;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: 24px;
          color: #cfcfcf;
          margin-top: 8px;
        }

        .hero p {
          max-width: 820px;
          margin: 0 auto;
          color: #e8e8e8;
          font-size: 18px;
          line-height: 2;
        }

        .ctaBox {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .primaryBtn,
        .secondaryBtn {
          display: inline-block;
          padding: 12px 18px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 800;
        }

        .primaryBtn {
          background: #10a37f;
          color: #fff;
        }

        .secondaryBtn {
          background: #2f2f2f;
          color: #fff;
          border: 1px solid #444;
        }

        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 25px 18px 50px;
          line-height: 2;
        }

        h2 {
          margin-top: 38px;
          font-size: 26px;
          color: #10a37f;
        }

        h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        p,
        li {
          font-size: 17px;
          color: #e8e8e8;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .infoCard {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .quickLinks a {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
        }

        .quickLinks a:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        .tableWrap {
          overflow-x: auto;
          margin-top: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        table {
          width: 100%;
          min-width: 760px;
          border-collapse: collapse;
          background: rgba(40,40,40,0.55);
        }

        th,
        td {
          padding: 15px;
          text-align: right;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #e8e8e8;
        }

        th {
          color: #7fffe0;
          background: rgba(16, 163, 127, 0.1);
        }

        .finalCta {
          margin-top: 38px;
          text-align: center;
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 0 30px rgba(16,163,127,0.12);
        }

        .finalCta p {
          max-width: 720px;
          margin: 0 auto 22px;
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }
        }
      `}</style>
    </main>
  );
}