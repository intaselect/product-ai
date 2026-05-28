import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "مقارنة أسعار المنتجات في قطر | أفضل سعر وعروض قطر",
  description:
    "قارن أسعار المنتجات في قطر عبر BPS Chat واعرف أفضل سعر للايفون، سامسونج، اللابتوبات، العطور، السماعات، الشاشات والعروض بين Carrefour Qatar وLulu Qatar والمتاجر الإلكترونية.",
  keywords: [
    "مقارنة أسعار قطر",
    "مقارنة اسعار المنتجات في قطر",
    "أفضل سعر في قطر",
    "أرخص سعر في قطر",
    "عروض قطر",
    "عروض قطر اليوم",
    "سعر ايفون في قطر",
    "سعر سامسونج في قطر",
    "سعر لابتوب في قطر",
    "عروض عطور في قطر",
    "سعر AirPods في قطر",
    "سعر بلايستيشن في قطر",
    "Qatar price comparison",
    "best price Qatar",
    "compare prices Qatar",
    "Qatar deals",
    "Qatar offers",
    "Carrefour Qatar",
    "Lulu Qatar",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function QatarProductPriceComparisonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار المنتجات في قطر
          <span>اعرف أفضل سعر وعروض قطر قبل الشراء</span>
        </h1>

        <p>
          لو بتبحث عن <strong>سعر ايفون في قطر</strong> أو{" "}
          <strong>سعر سامسونج في قطر</strong> أو{" "}
          <strong>أفضل سعر لابتوب في قطر</strong>، استخدم{" "}
          <strong>BPS Chat (بي بي اس شات)</strong> لمقارنة الأسعار بين المتاجر
          والعروض بدل الاعتماد على متجر واحد فقط.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن أفضل سعر في قطر
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            مقارنة الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تستخدم BPS Chat لمقارنة الأسعار في قطر؟</h2>

        <p>
          السوق القطري فيه منتجات كثيرة وأسعار مختلفة بين المتاجر، ونفس المنتج قد
          يظهر بسعر مختلف في Carrefour Qatar أو Lulu Qatar أو المتاجر الإلكترونية
          المحلية. لذلك مقارنة الأسعار قبل الشراء تساعدك تعرف أفضل سعر، أرخص عرض،
          والمتجر المناسب حسب المنتج والتوفر والشحن.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن بين متاجر قطر</h3>
            <p>
              ابحث مرة واحدة وشاهد نتائج من متاجر مختلفة في قطر حسب المنتج
              والعروض المتاحة.
            </p>
          </div>

          <div className="infoCard">
            <h3>أفضل سعر قبل الشراء</h3>
            <p>
              اعرف أرخص سعر وأفضل عرض بدل ما تعتمد على أول نتيجة أو متجر واحد.
            </p>
          </div>

          <div className="infoCard">
            <h3>منتجات كثيرة</h3>
            <p>
              ايفون، سامسونج، لابتوب، عطور، سماعات، شاشات، بلايستيشن، ملابس
              وأجهزة منزلية.
            </p>
          </div>
        </div>

        <h2>أكثر المنتجات بحثًا في قطر</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-15-qa">سعر ايفون 15 في قطر</Link>
          <Link href="/search/ايفون-16-pro-max-qa">سعر ايفون 16 Pro Max في قطر</Link>
          <Link href="/search/galaxy-s24-ultra-qa">سعر Galaxy S24 Ultra في قطر</Link>
          <Link href="/search/لابتوب-qa">سعر لابتوب في قطر</Link>
          <Link href="/search/airpods-qa">سعر AirPods في قطر</Link>
          <Link href="/search/عطور-qa">عروض عطور في قطر</Link>
          <Link href="/search/playstation-qa">سعر PlayStation في قطر</Link>
          <Link href="/search/شاشة-qa">عروض الشاشات في قطر</Link>
        </div>

        <h2>كلمات بحث قوية عن عروض قطر</h2>

        <p>
          كثير من المستخدمين يبحثون عن: عروض قطر، عروض قطر اليوم، أفضل سعر في
          قطر، أرخص سعر في قطر، سعر ايفون في قطر، سعر سامسونج في قطر، سعر لابتوب
          في قطر، Qatar deals، Qatar offers، compare prices Qatar، best price
          Qatar، عروض الإلكترونيات في قطر، عروض الجوالات في قطر، عروض العطور في
          قطر، وعروض الشاشات في قطر.
        </p>

        <div className="quickLinks">
          <Link href="/search/عروض-قطر-qa">عروض قطر اليوم</Link>
          <Link href="/search/ارخص-سعر-qa">أرخص سعر في قطر</Link>
          <Link href="/search/افضل-سعر-qa">أفضل سعر في قطر</Link>
          <Link href="/search/qatar-deals-qa">Qatar deals</Link>
          <Link href="/search/عروض-الكترونيات-قطر-qa">عروض إلكترونيات قطر</Link>
          <Link href="/search/عروض-جوالات-قطر-qa">عروض جوالات قطر</Link>
        </div>

        <h2>متاجر قطر التي قد تظهر في نتائج المقارنة</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>المتجر</th>
                <th>أمثلة منتجات</th>
                <th>كلمات بحث مفيدة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Carrefour Qatar</td>
                <td>إلكترونيات، أجهزة منزلية، شاشات، منتجات يومية</td>
                <td>عروض كارفور قطر، Carrefour Qatar offers</td>
              </tr>
              <tr>
                <td>Lulu Qatar</td>
                <td>منتجات متنوعة، أجهزة، عروض يومية، مستلزمات منزلية</td>
                <td>عروض لولو قطر، Lulu Qatar deals</td>
              </tr>
              <tr>
                <td>متاجر إلكترونية محلية</td>
                <td>جوالات، لابتوبات، عطور، سماعات، اكسسوارات</td>
                <td>أفضل سعر قطر، أرخص سعر قطر</td>
              </tr>
              <tr>
                <td>متاجر الإلكترونيات</td>
                <td>iPhone، Samsung، Laptop، PlayStation، AirPods</td>
                <td>عروض الإلكترونيات قطر، Qatar electronics deals</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>مقارنة أسعار حسب نوع المنتج في قطر</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>المنتج</th>
                <th>أمثلة بحث</th>
                <th>صفحات مفيدة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>iPhone</td>
                <td>سعر ايفون 15 في قطر، iPhone 16 Pro Max Qatar</td>
                <td>مقارنة أسعار iPhone</td>
              </tr>
              <tr>
                <td>Samsung</td>
                <td>Galaxy S24 Ultra، Galaxy A55، عروض سامسونج قطر</td>
                <td>مقارنة أسعار Samsung</td>
              </tr>
              <tr>
                <td>Laptop</td>
                <td>HP، Dell، Lenovo، MacBook، Gaming Laptop Qatar</td>
                <td>مقارنة أسعار Laptop</td>
              </tr>
              <tr>
                <td>Perfume</td>
                <td>عطور رجالي، عطور نسائي، Perfume Qatar</td>
                <td>مقارنة أسعار العطور</td>
              </tr>
              <tr>
                <td>Electronics</td>
                <td>سماعات، شاشات، PlayStation، شواحن، AirPods</td>
                <td>مقارنة الأسعار أونلاين</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>هل BPS Chat يبيع المنتجات في قطر؟</h2>

        <p>
          لا. BPS Chat ليس متجرًا ولا يبيع المنتجات مباشرة. الموقع يساعدك على
          البحث والمقارنة فقط، وبعد اختيار نتيجة مناسبة يمكنك الانتقال إلى المتجر
          الأصلي لمراجعة السعر النهائي، الشحن، التوفر، الضمان، والتقييمات قبل
          الشراء.
        </p>

        <h2>نصائح قبل الشراء أونلاين في قطر</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الشراء.</li>
          <li>راجع السعر النهائي بعد الشحن والرسوم إن وجدت.</li>
          <li>تأكد من التوفر ومدة التوصيل داخل قطر.</li>
          <li>راجع الضمان وسياسة الاسترجاع.</li>
          <li>قارن بين عروض اليوم والعروض الموسمية.</li>
          <li>لا تعتمد على أول عرض؛ قد تجد سعرًا أفضل في متجر آخر.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/saudi-product-price-comparison">مقارنة أسعار السعودية</Link>
          <Link href="/uae-product-price-comparison">مقارنة أسعار الإمارات</Link>
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار قطر الآن</h2>
          <p>
            اكتب اسم المنتج الذي تبحث عنه، واختر قطر، وشاهد النتائج بدل الاعتماد
            على متجر واحد فقط.
          </p>

          <Link href="/" className="primaryBtn">
            ابحث في BPS Chat
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
        ul {
          padding-right: 22px;
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