import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "مقارنة أسعار المنتجات في مصر | أفضل سعر وعروض مصر",
  description:
    "قارن أسعار المنتجات في مصر عبر BPS Chat واعرف أفضل سعر للايفون، سامسونج، اللابتوبات، العطور، الشاشات والأجهزة المنزلية بين Amazon.eg وJumia وNoon Egypt وCarrefour وB.TECH وRaya و2B.",
  keywords: [
    "مقارنة أسعار مصر",
    "مقارنة اسعار المنتجات في مصر",
    "أفضل سعر في مصر",
    "أرخص سعر في مصر",
    "أسعار الموبايلات في مصر",
    "سعر ايفون في مصر",
    "سعر سامسونج في مصر",
    "سعر لابتوب في مصر",
    "عروض جوميا",
    "عروض أمازون مصر",
    "عروض نون مصر",
    "عروض كارفور مصر",
    "عروض بي تك",
    "عروض راية",
    "2B Egypt",
    "BTECH Egypt",
    "Raya Egypt",
    "Amazon.eg",
    "Jumia Egypt",
    "Noon Egypt",
    "Carrefour Egypt",
    "price comparison Egypt",
    "best price Egypt",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function EgyptProductPriceComparisonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار المنتجات في مصر
          <span>اعرف أفضل سعر وعروض مصر قبل الشراء</span>
        </h1>

        <p>
          لو بتبحث عن <strong>سعر ايفون في مصر</strong> أو{" "}
          <strong>أسعار الموبايلات في مصر</strong> أو{" "}
          <strong>أفضل سعر لابتوب في مصر</strong>، استخدم{" "}
          <strong>BPS Chat (بي بي اس شات)</strong> لمقارنة الأسعار بين متاجر مصر
          مثل Amazon.eg وJumia وNoon Egypt وCarrefour وB.TECH وRaya و2B.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن أفضل سعر في مصر
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            مقارنة الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تستخدم BPS Chat لمقارنة الأسعار في مصر؟</h2>

        <p>
          السوق المصري فيه متاجر كثيرة وأسعار متغيرة جدًا، ونفس المنتج ممكن يظهر
          بسعر مختلف في Amazon.eg أو Jumia أو Noon Egypt أو Carrefour أو B.TECH
          أو Raya أو 2B. لذلك مقارنة الأسعار قبل الشراء تساعدك تعرف أفضل سعر،
          أرخص عرض، والمتجر المناسب حسب المنتج والتوفر والشحن والضمان.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن بين متاجر مصر</h3>
            <p>
              ابحث مرة واحدة وشاهد نتائج من متاجر مثل Amazon.eg وJumia وNoon
              وCarrefour وB.TECH وRaya و2B حسب المنتج.
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
            <h3>منتجات كثيرة في مصر</h3>
            <p>
              موبايلات، ايفون، سامسونج، لابتوبات، عطور، شاشات، أجهزة منزلية،
              سماعات واكسسوارات.
            </p>
          </div>
        </div>

        <h2>أكثر المنتجات بحثًا في مصر</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-15-eg">سعر ايفون 15 في مصر</Link>
          <Link href="/search/ايفون-16-pro-max-eg">سعر ايفون 16 Pro Max في مصر</Link>
          <Link href="/search/galaxy-s24-ultra-eg">سعر Galaxy S24 Ultra في مصر</Link>
          <Link href="/search/سامسونج-eg">أسعار سامسونج في مصر</Link>
          <Link href="/search/موبايل-eg">أسعار الموبايلات في مصر</Link>
          <Link href="/search/لابتوب-eg">سعر لابتوب في مصر</Link>
          <Link href="/search/عطور-eg">عروض عطور في مصر</Link>
          <Link href="/search/شاشات-eg">أسعار الشاشات في مصر</Link>
          <Link href="/search/غسالة-eg">سعر غسالة في مصر</Link>
          <Link href="/search/ثلاجة-eg">سعر ثلاجة في مصر</Link>
        </div>

        <h2>كلمات بحث قوية عن عروض مصر</h2>

        <p>
          كثير من المستخدمين يبحثون عن: عروض مصر، عروض جوميا، عروض أمازون مصر،
          عروض نون مصر، عروض كارفور مصر، عروض بي تك، عروض راية، أرخص سعر في مصر،
          أفضل سعر في مصر، أسعار الموبايلات في مصر، سعر ايفون في مصر، سعر
          سامسونج في مصر، سعر لابتوب في مصر، عروض الأجهزة الكهربائية، عروض
          الشاشات، وعروض الإلكترونيات في مصر.
        </p>

        <div className="quickLinks">
          <Link href="/search/عروض-جوميا-eg">عروض جوميا</Link>
          <Link href="/search/عروض-امازون-مصر-eg">عروض أمازون مصر</Link>
          <Link href="/search/عروض-نون-مصر-eg">عروض نون مصر</Link>
          <Link href="/search/عروض-كارفور-مصر-eg">عروض كارفور مصر</Link>
          <Link href="/search/عروض-بي-تك-eg">عروض بي تك</Link>
          <Link href="/search/عروض-راية-eg">عروض راية</Link>
          <Link href="/search/ارخص-سعر-eg">أرخص سعر في مصر</Link>
          <Link href="/search/افضل-سعر-eg">أفضل سعر في مصر</Link>
        </div>

        <h2>متاجر مصر التي قد تظهر في نتائج المقارنة</h2>

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
                <td>Amazon.eg</td>
                <td>موبايلات، ايفون، سامسونج، سماعات، أجهزة منزلية</td>
                <td>عروض أمازون مصر، Amazon Egypt offers، Amazon.eg</td>
              </tr>
              <tr>
                <td>Jumia Egypt</td>
                <td>موبايلات، ملابس، عطور، أجهزة، منتجات متنوعة</td>
                <td>عروض جوميا، Jumia Egypt، Jumia deals</td>
              </tr>
              <tr>
                <td>Noon Egypt</td>
                <td>إلكترونيات، موبايلات، عطور، منتجات يومية</td>
                <td>عروض نون مصر، Noon Egypt offers</td>
              </tr>
              <tr>
                <td>Carrefour Egypt</td>
                <td>أجهزة منزلية، شاشات، منتجات يومية، إلكترونيات</td>
                <td>عروض كارفور مصر، Carrefour Egypt offers</td>
              </tr>
              <tr>
                <td>B.TECH</td>
                <td>أجهزة كهربائية، شاشات، موبايلات، لابتوبات</td>
                <td>عروض بي تك، BTECH Egypt، B.TECH offers</td>
              </tr>
              <tr>
                <td>Raya</td>
                <td>موبايلات، لابتوبات، أجهزة منزلية، إلكترونيات</td>
                <td>عروض راية، Raya Shop، Raya Egypt</td>
              </tr>
              <tr>
                <td>2B Egypt</td>
                <td>لابتوبات، كمبيوتر، اكسسوارات، شاشات، إلكترونيات</td>
                <td>2B Egypt laptop، عروض 2B، سعر لابتوب 2B</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>مقارنة أسعار حسب نوع المنتج في مصر</h2>

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
                <td>سعر ايفون 15 في مصر، سعر ايفون 16، ايفون تقسيط</td>
                <td>مقارنة أسعار iPhone</td>
              </tr>
              <tr>
                <td>Samsung</td>
                <td>سعر سامسونج في مصر، Galaxy A55، Galaxy S24 Ultra</td>
                <td>مقارنة أسعار Samsung</td>
              </tr>
              <tr>
                <td>Laptop</td>
                <td>HP، Dell، Lenovo، MacBook، لابتوب للدراسة أو الشغل</td>
                <td>مقارنة أسعار Laptop</td>
              </tr>
              <tr>
                <td>Appliances</td>
                <td>غسالة، ثلاجة، تكييف، شاشة، بوتاجاز، ميكروويف</td>
                <td>أفضل سعر أونلاين</td>
              </tr>
              <tr>
                <td>Perfume</td>
                <td>عطور رجالي، عطور نسائي، عطور أصلية، عروض عطور</td>
                <td>مقارنة أسعار العطور</td>
              </tr>
              <tr>
                <td>Electronics</td>
                <td>سماعات، شاشات، PlayStation، شواحن، باور بانك</td>
                <td>مقارنة الأسعار أونلاين</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>هل BPS Chat يبيع المنتجات في مصر؟</h2>

        <p>
          لا. BPS Chat ليس متجرًا ولا يبيع المنتجات مباشرة. الموقع يساعدك على
          البحث والمقارنة فقط، وبعد اختيار نتيجة مناسبة يمكنك الانتقال إلى المتجر
          الأصلي لمراجعة السعر النهائي، الشحن، التوفر، الضمان، والتقييمات قبل
          الشراء.
        </p>

        <h2>نصائح قبل الشراء أونلاين في مصر</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الشراء.</li>
          <li>راجع السعر النهائي بعد الشحن أو مصاريف التقسيط إن وجدت.</li>
          <li>تأكد من الضمان المحلي خصوصًا في الموبايلات والأجهزة الكهربائية.</li>
          <li>راجع التوفر ومدة التوصيل داخل محافظتك.</li>
          <li>قارن بين عروض جوميا وأمازون ونون وبي تك وراية قبل القرار.</li>
          <li>لا تعتمد على أول عرض؛ ممكن تلاقي سعر أفضل في متجر آخر.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/saudi-product-price-comparison">مقارنة أسعار السعودية</Link>
          <Link href="/uae-product-price-comparison">مقارنة أسعار الإمارات</Link>
          <Link href="/qatar-product-price-comparison">مقارنة أسعار قطر</Link>
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار مصر الآن</h2>
          <p>
            اكتب اسم المنتج الذي تبحث عنه، واختر مصر، وشاهد النتائج بدل الاعتماد
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