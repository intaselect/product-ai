import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "أرخص المنتجات أونلاين | قارن أفضل سعر مع BPS Chat",
  description:
    "اعرف أرخص المنتجات وأفضل الأسعار أونلاين في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat.",
  keywords: [
    "أرخص المنتجات",
    "أرخص سعر",
    "أفضل سعر",
    "أفضل عروض",
    "عروض أونلاين",
    "أرخص منتجات في السعودية",
    "أرخص منتجات في الإمارات",
    "أرخص منتجات في مصر",
    "compare prices",
    "best price online",
    "cheapest products",
    "BPS Chat",
    "بي بي اس شات",
    "Amazon",
    "Noon",
    "Jumia",
    "Jarir",
    "Extra",
    "Carrefour",
  ],
};

export default function CheapestProductsPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          أرخص المنتجات أونلاين
          <span>قارن الأسعار قبل الشراء واعرف أفضل عرض</span>
        </h1>

        <p>
          لو بتبحث عن <strong>أرخص سعر</strong> أو <strong>أفضل عروض أونلاين</strong>{" "}
          في السعودية أو الإمارات أو الكويت أو قطر أو البحرين أو مصر، استخدم{" "}
          <strong>BPS Chat</strong> لمقارنة أسعار المنتجات بين المتاجر بسرعة.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن أرخص سعر الآن
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            قارن الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>كيف تجد أرخص سعر قبل الشراء؟</h2>

        <p>
          بدل ما تفتح Amazon و Noon و Jumia و Jarir و Extra و Carrefour يدويًا،
          يمكنك كتابة اسم المنتج في BPS Chat واختيار الدولة، ثم مقارنة النتائج
          والأسعار المتاحة في مكان واحد.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>منتجات إلكترونية</h3>
            <p>ايفون، سامسونج، لابتوب، سماعات، شاشات، شواحن وباور بانك.</p>
          </div>

          <div className="infoCard">
            <h3>منتجات يومية</h3>
            <p>عطور، ملابس، ميكب، ألعاب أطفال، مستلزمات منزلية ومنتجات العناية.</p>
          </div>

          <div className="infoCard">
            <h3>حسب الدولة</h3>
            <p>السعودية، الإمارات، الكويت، قطر، البحرين ومصر.</p>
          </div>
        </div>

        <h2>أمثلة بحث عن أرخص المنتجات</h2>

        <div className="quickLinks">
          <Link href="/search/ارخص-ايفون-sa">أرخص ايفون في السعودية</Link>
          <Link href="/search/ارخص-سامسونج-ae">أرخص سامسونج في الإمارات</Link>
          <Link href="/search/ارخص-لابتوب-eg">أرخص لابتوب في مصر</Link>
          <Link href="/search/ارخص-عطور-sa">أرخص عطور</Link>
          <Link href="/search/عروض-نون-sa">عروض نون</Link>
          <Link href="/search/عروض-امازون-sa">عروض أمازون</Link>
          <Link href="/search/عروض-جوميا-eg">عروض جوميا</Link>
        </div>

        <h2>كلمات يبحث عنها المستخدمون</h2>

        <p>
          أرخص سعر، أفضل سعر، عروض اليوم، خصومات أونلاين، cheapest products،
          best price online، online deals، عروض نون، عروض أمازون، عروض جوميا،
          عروض جرير، عروض اكسترا، أرخص موبايل، أرخص لابتوب، أرخص عطر، وأفضل
          متجر للشراء.
        </p>

        <h2>أين تبحث عن أرخص المنتجات؟</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>أمثلة بحث</th>
                <th>متاجر قد تظهر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>السعودية</td>
                <td>أرخص ايفون، عروض نون، عروض جرير، عروض اكسترا</td>
                <td>Amazon.sa، Noon، Jarir، Extra، Carrefour</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>best price UAE، عروض Amazon، أرخص لابتوب</td>
                <td>Amazon.ae، Noon، Carrefour، Sharaf DG</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>أرخص موبايل، عروض جوميا، عروض أمازون مصر</td>
                <td>Jumia، Amazon.eg، Noon Egypt</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>أرخص منتجات الكويت، عروض إلكترونيات</td>
                <td>Xcite، Lulu، متاجر محلية</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>أرخص سعر قطر، عروض أونلاين</td>
                <td>Carrefour، Lulu، متاجر قطرية</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>أرخص منتجات البحرين، عروض اليوم</td>
                <td>متاجر البحرين الإلكترونية والمتاجر الكبرى</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>روابط مهمة</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ البحث عن أرخص سعر الآن</h2>
          <p>
            اكتب اسم المنتج، اختر الدولة، وقارن الأسعار قبل الشراء من أي متجر.
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
          max-width: 800px;
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