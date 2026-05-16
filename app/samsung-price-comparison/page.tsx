import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "مقارنة أسعار Samsung | أفضل سعر سامسونج في السعودية والخليج ومصر",
  description:
    "قارن أسعار Samsung Galaxy في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat وشاهد عروض Galaxy S24 و S23 و A55 و A15 و Z Fold و Z Flip.",
  keywords: [
    "سعر سامسونج",
    "Samsung price",
    "مقارنة أسعار سامسونج",
    "أفضل سعر سامسونج",
    "عروض سامسونج",
    "Samsung deals",
    "Samsung offers",
    "Galaxy S24 Ultra",
    "Galaxy S23 Ultra",
    "Galaxy A55",
    "Galaxy A35",
    "Galaxy A15",
    "Galaxy Z Fold",
    "Galaxy Z Flip",
    "سعر سامسونج في السعودية",
    "سعر سامسونج في الإمارات",
    "سعر سامسونج في مصر",
    "BPS Chat",
    "بي بي اس شات",
    "Amazon",
    "Noon",
    "Jarir",
    "Extra",
    "Jumia",
    "Carrefour",
  ],
};

export default function SamsungPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار Samsung Galaxy
          <span>اعرف أفضل سعر سامسونج قبل الشراء في كل الدول</span>
        </h1>

        <p>
          لو بتبحث عن <strong>سعر سامسونج</strong> أو{" "}
          <strong>Samsung offers</strong> في السعودية أو الإمارات أو مصر أو
          الخليج، استخدم <strong>BPS Chat</strong> لمقارنة الأسعار بين المتاجر
          بدل الاعتماد على متجر واحد.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن سعر سامسونج
          </Link>
          <Link href="/bps-chat" className="secondaryBtn">
            ما هو BPS Chat؟
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تقارن أسعار Samsung قبل الشراء؟</h2>

        <p>
          أسعار Samsung Galaxy تختلف من متجر لآخر. ممكن تلاقي Galaxy S24 Ultra
          أو Galaxy A55 بسعر مختلف بين Amazon و Noon و Jarir و Extra و Jumia و
          Carrefour، لذلك المقارنة مهمة جدًا قبل الشراء.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>أفضل سعر</h3>
            <p>اعرف أرخص سعر سامسونج في أكثر من متجر.</p>
          </div>

          <div className="infoCard">
            <h3>عروض قوية</h3>
            <p>شوف عروض Samsung deals وخصومات اليوم.</p>
          </div>

          <div className="infoCard">
            <h3>كل الدول</h3>
            <p>السعودية، الإمارات، الكويت، قطر، البحرين، مصر.</p>
          </div>
        </div>

        <h2>أشهر موبايلات Samsung</h2>

        <div className="quickLinks">
          <Link href="/search/s24-ultra-sa">Galaxy S24 Ultra</Link>
          <Link href="/search/s23-ultra-sa">Galaxy S23 Ultra</Link>
          <Link href="/search/a55-sa">Galaxy A55</Link>
          <Link href="/search/a35-sa">Galaxy A35</Link>
          <Link href="/search/a15-sa">Galaxy A15</Link>
          <Link href="/search/z-fold-sa">Galaxy Z Fold</Link>
          <Link href="/search/z-flip-sa">Galaxy Z Flip</Link>
        </div>

        <h2>كلمات بحث قوية</h2>

        <p>
          الناس بتبحث عن: سعر سامسونج اليوم، عروض سامسونج، Samsung price،
          Samsung deals، أرخص Samsung، سامسونج تقسيط، Galaxy S24 price،
          Samsung offers UAE، Samsung Egypt price.
        </p>

        <h2>مقارنة حسب الدولة</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>بحث شائع</th>
                <th>متاجر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>السعودية</td>
                <td>سعر سامسونج، Galaxy S24</td>
                <td>Amazon.sa، Noon، Jarir، Extra</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>Samsung UAE price</td>
                <td>Amazon.ae، Noon، Carrefour</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>سعر سامسونج في مصر</td>
                <td>Jumia، Amazon.eg، Noon</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>Samsung Kuwait price</td>
                <td>Xcite، Lulu</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>Samsung Qatar</td>
                <td>Carrefour، Lulu</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>Samsung Bahrain</td>
                <td>متاجر محلية</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>روابط مهمة</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ المقارنة الآن</h2>
          <p>قارن أسعار سامسونج واختر أفضل عرض.</p>

          <Link href="/" className="primaryBtn">
            ابحث الآن
          </Link>
        </div>
      </section>

      <PopularSearches />

      <style>{`
        .seoPage {
          color: white;
          min-height: 100vh;
          background: #0b0f14;
        }

        .hero {
          text-align: center;
          padding: 40px;
        }

        .content {
          max-width: 900px;
          margin: auto;
          padding: 20px;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }

        .infoCard {
          background: #2f2f2f;
          padding: 20px;
          border-radius: 16px;
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .quickLinks a {
          background: #2f2f2f;
          padding: 8px 12px;
          border-radius: 999px;
          text-decoration: none;
          color: white;
        }

        table {
          width: 100%;
        }

        .primaryBtn {
          background: #10a37f;
          padding: 10px 16px;
          border-radius: 10px;
          color: white;
          text-decoration: none;
        }
      `}</style>
    </main>
  );
}