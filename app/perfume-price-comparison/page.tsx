import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "مقارنة أسعار العطور | أفضل عروض Perfume في السعودية والخليج ومصر",
  description:
    "قارن أسعار العطور الرجالي والنسائي في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat وشاهد أفضل عروض Perfume.",
  keywords: [
    "عروض عطور",
    "سعر عطر",
    "عطور رجالي",
    "عطور نسائي",
    "Perfume price",
    "Perfume offers",
    "عطور اصلية",
    "ارخص عطر",
    "عطور نون",
    "عطور امازون",
    "عطور درعه",
    "العربية للعود",
    "سعر عطر في السعودية",
    "سعر عطر في الامارات",
    "سعر عطر في مصر",
    "BPS Chat",
    "بي بي اس شات",
    "Amazon",
    "Noon",
    "Jumia",
    "Carrefour",
  ],
};

export default function PerfumePage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار العطور
          <span>اعرف أفضل عروض Perfume قبل الشراء</span>
        </h1>

        <p>
          لو بتبحث عن <strong>عطور رجالي أو نسائي</strong> أو{" "}
          <strong>Perfume offers</strong> في السعودية أو الإمارات أو مصر أو
          الخليج، استخدم <strong>BPS Chat</strong> لمقارنة الأسعار بين المتاجر
          المختلفة.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن عطر الآن
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تقارن أسعار العطور؟</h2>

        <p>
          أسعار العطور تختلف بشكل كبير بين المتاجر مثل Amazon و Noon و Jumia و
          Carrefour. نفس العطر ممكن تلاقيه بسعر مختلف، لذلك المقارنة قبل الشراء
          مهمة جدًا.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>عطور رجالي</h3>
            <p>أفضل عطور رجالي مثل Dior و Chanel و Armani.</p>
          </div>

          <div className="infoCard">
            <h3>عطور نسائي</h3>
            <p>عطور نسائية مشهورة مثل Victoria's Secret و Gucci و YSL.</p>
          </div>

          <div className="infoCard">
            <h3>عطور أصلية</h3>
            <p>قارن بين المتاجر للحصول على عطور أصلية بأفضل سعر.</p>
          </div>
        </div>

        <h2>أمثلة بحث</h2>

        <div className="quickLinks">
          <Link href="/search/عطور-sa">عطور في السعودية</Link>
          <Link href="/search/عطور-ae">عطور في الإمارات</Link>
          <Link href="/search/عطور-eg">عطور في مصر</Link>
          <Link href="/search/perfume-sa">Perfume Saudi</Link>
          <Link href="/search/عطر-رجالي-sa">عطر رجالي</Link>
          <Link href="/search/عطر-نسائي-sa">عطر نسائي</Link>
        </div>

        <h2>كلمات بحث قوية</h2>

        <p>
          الناس بتبحث عن: عروض عطور، ارخص عطر، Perfume deals، Perfume offers،
          عطور اصلية، سعر عطر اليوم، عطور تقسيط، عطور نون، عطور امازون، عطور
          درعه، العربية للعود.
        </p>

        <h2>مقارنة حسب الدولة</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>بحث</th>
                <th>متاجر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>السعودية</td>
                <td>عطور رجالي ونسائي</td>
                <td>Amazon.sa، Noon، درعه</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>Perfume UAE</td>
                <td>Amazon.ae، Noon</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>عطور مصر</td>
                <td>Jumia، Amazon.eg</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>Perfume Kuwait</td>
                <td>Lulu، متاجر محلية</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>Perfume Qatar</td>
                <td>Carrefour</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>Perfume Bahrain</td>
                <td>متاجر محلية</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>روابط مهمة</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">iPhone</Link>
          <Link href="/samsung-price-comparison">Samsung</Link>
          <Link href="/laptop-price-comparison">Laptop</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ المقارنة الآن</h2>
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