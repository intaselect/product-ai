import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "مقارنة أسعار المنتجات في السعودية | أفضل سعر وعروض السعودية",
  description:
    "قارن أسعار المنتجات في السعودية عبر BPS Chat واعرف أفضل سعر للايفون، سامسونج، اللابتوبات، العطور، السماعات، الشاشات والعروض بين Amazon.sa وNoon وJarir وExtra وCarrefour.",
  keywords: [
    "مقارنة أسعار السعودية",
    "مقارنة اسعار المنتجات في السعودية",
    "أفضل سعر في السعودية",
    "أرخص سعر في السعودية",
    "عروض السعودية",
    "عروض نون السعودية",
    "عروض أمازون السعودية",
    "عروض جرير",
    "عروض اكسترا",
    "سعر ايفون في السعودية",
    "سعر سامسونج في السعودية",
    "سعر لابتوب في السعودية",
    "عروض عطور في السعودية",
    "Saudi price comparison",
    "best price Saudi Arabia",
    "Amazon.sa",
    "Noon Saudi",
    "Jarir",
    "Extra",
    "Carrefour Saudi",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function SaudiProductPriceComparisonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار المنتجات في السعودية
          <span>اعرف أفضل سعر وعروض السعودية قبل الشراء</span>
        </h1>

        <p>
          لو بتبحث عن <strong>سعر ايفون في السعودية</strong> أو{" "}
          <strong>عروض نون السعودية</strong> أو <strong>أفضل سعر لابتوب</strong>،
          استخدم <strong>BPS Chat (بي بي اس شات)</strong> لمقارنة الأسعار بين
          المتاجر السعودية مثل Amazon.sa وNoon وJarir وExtra وCarrefour.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن أفضل سعر في السعودية
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            مقارنة الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تستخدم BPS Chat لمقارنة الأسعار في السعودية؟</h2>

        <p>
          السوق السعودي فيه متاجر كثيرة وعروض مختلفة، ونفس المنتج ممكن يظهر بسعر
          مختلف بين Amazon.sa وNoon وJarir وExtra وCarrefour. لذلك مقارنة الأسعار
          قبل الشراء تساعدك تعرف أفضل سعر، أرخص عرض، والمتجر المناسب حسب المنتج
          والتوفر والشحن.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن بين المتاجر السعودية</h3>
            <p>
              ابحث مرة واحدة وشاهد نتائج من متاجر مثل Amazon.sa وNoon وJarir
              وExtra وCarrefour حسب المنتج.
            </p>
          </div>

          <div className="infoCard">
            <h3>أفضل سعر قبل الشراء</h3>
            <p>
              اعرف أرخص سعر وأفضل عرض بدل ما تعتمد على متجر واحد أو أول نتيجة
              تظهر لك.
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

        <h2>أكثر المنتجات بحثًا في السعودية</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</Link>
          <Link href="/search/ايفون-16-pro-max-sa">سعر ايفون 16 Pro Max</Link>
          <Link href="/search/galaxy-s24-ultra-sa">سعر Galaxy S24 Ultra</Link>
          <Link href="/search/لابتوب-sa">سعر لابتوب في السعودية</Link>
          <Link href="/search/airpods-sa">سعر AirPods في السعودية</Link>
          <Link href="/search/عطور-sa">عروض عطور في السعودية</Link>
          <Link href="/search/بلايستيشن-sa">سعر بلايستيشن في السعودية</Link>
          <Link href="/search/شاشة-sa">عروض الشاشات في السعودية</Link>
        </div>

        <h2>كلمات بحث قوية عن عروض السعودية</h2>

        <p>
          كثير من المستخدمين يبحثون عن: عروض السعودية، عروض نون السعودية، عروض
          أمازون السعودية، عروض جرير، عروض اكسترا، أرخص سعر في السعودية، أفضل
          سعر في السعودية، سعر ايفون في السعودية، سعر سامسونج في السعودية، سعر
          لابتوب في السعودية، عروض الجوالات، عروض الإلكترونيات، عروض العطور،
          عروض الشاشات، وعروض اليوم.
        </p>

        <div className="quickLinks">
          <Link href="/search/عروض-نون-sa">عروض نون السعودية</Link>
          <Link href="/search/عروض-امازون-sa">عروض أمازون السعودية</Link>
          <Link href="/search/عروض-جرير-sa">عروض جرير</Link>
          <Link href="/search/عروض-اكسترا-sa">عروض اكسترا</Link>
          <Link href="/search/ارخص-سعر-sa">أرخص سعر في السعودية</Link>
          <Link href="/search/افضل-سعر-sa">أفضل سعر في السعودية</Link>
        </div>

        <h2>متاجر السعودية التي قد تظهر في نتائج المقارنة</h2>

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
                <td>Amazon.sa</td>
                <td>ايفون، سامسونج، سماعات، أجهزة منزلية</td>
                <td>عروض أمازون السعودية، Amazon Saudi offers</td>
              </tr>
              <tr>
                <td>Noon</td>
                <td>جوالات، عطور، ملابس، إلكترونيات</td>
                <td>عروض نون السعودية، Noon deals Saudi</td>
              </tr>
              <tr>
                <td>Jarir</td>
                <td>لابتوبات، ايفون، تابلت، ألعاب</td>
                <td>عروض جرير، سعر لابتوب جرير</td>
              </tr>
              <tr>
                <td>Extra</td>
                <td>شاشات، أجهزة منزلية، جوالات</td>
                <td>عروض اكسترا، تخفيضات اكسترا</td>
              </tr>
              <tr>
                <td>Carrefour</td>
                <td>منتجات منزلية، إلكترونيات، أجهزة</td>
                <td>عروض كارفور السعودية</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>مقارنة أسعار حسب نوع المنتج في السعودية</h2>

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
                <td>سعر ايفون 15، ايفون 16 برو max، عروض ايفون</td>
                <td>مقارنة أسعار iPhone</td>
              </tr>
              <tr>
                <td>Samsung</td>
                <td>Galaxy S24 Ultra، Galaxy A55، عروض سامسونج</td>
                <td>مقارنة أسعار Samsung</td>
              </tr>
              <tr>
                <td>Laptop</td>
                <td>HP، Dell، Lenovo، MacBook، Gaming Laptop</td>
                <td>مقارنة أسعار Laptop</td>
              </tr>
              <tr>
                <td>Perfume</td>
                <td>عطور رجالي، عطور نسائي، عطور أصلية</td>
                <td>مقارنة أسعار العطور</td>
              </tr>
              <tr>
                <td>Electronics</td>
                <td>سماعات، شاشات، بلايستيشن، شواحن</td>
                <td>مقارنة الأسعار أونلاين</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>هل BPS Chat يبيع المنتجات في السعودية؟</h2>

        <p>
          لا. BPS Chat ليس متجرًا ولا يبيع المنتجات مباشرة. الموقع يساعدك على
          البحث والمقارنة فقط، وبعد اختيار نتيجة مناسبة يمكنك الانتقال إلى المتجر
          الأصلي لمراجعة السعر النهائي، الشحن، التوفر، الضمان، والتقييمات قبل
          الشراء.
        </p>

        <h2>نصائح قبل الشراء أونلاين في السعودية</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الشراء.</li>
          <li>راجع السعر النهائي بعد الشحن والضريبة.</li>
          <li>تأكد من التوفر ومدة التوصيل داخل السعودية.</li>
          <li>راجع الضمان وسياسة الاسترجاع.</li>
          <li>لا تعتمد على أول عرض؛ قد تجد سعرًا أفضل في متجر آخر.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار السعودية الآن</h2>
          <p>
            اكتب اسم المنتج الذي تبحث عنه، واختر السعودية، وشاهد النتائج بدل
            الاعتماد على متجر واحد فقط.
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