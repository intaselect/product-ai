import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "مقارنة أسعار المنتجات في مصر | أفضل سعر وعروض مصر",
  description:
    "قارن أسعار المنتجات في مصر عبر BPS Chat واعرف أفضل سعر للايفون، سامسونج، اللابتوبات، العطور والإلكترونيات بين Amazon.eg وJumia وNoon Egypt وCarrefour وRaya وB.TECH.",
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
    "Raya Egypt",
    "BTECH Egypt",
    "price comparison Egypt",
    "best price Egypt",
    "Amazon.eg",
    "Jumia Egypt",
    "Noon Egypt",
    "Carrefour Egypt",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function EgyptProductPriceComparisonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار المنتجات في مصر
          <span>اعرف أفضل سعر في مصر قبل ما تشتري</span>
        </h1>

        <p>
          لو بتبحث عن <strong>سعر ايفون في مصر</strong> أو{" "}
          <strong>أسعار الموبايلات اليوم</strong> أو{" "}
          <strong>أفضل سعر لابتوب</strong>، استخدم{" "}
          <strong>BPS Chat (بي بي اس شات)</strong> علشان تقارن الأسعار بين
          Amazon.eg وJumia وNoon وCarrefour وB.TECH وRaya.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن أفضل سعر في مصر
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            قارن الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا مقارنة الأسعار مهمة في مصر؟</h2>

        <p>
          في مصر الأسعار بتختلف جدًا بين المتاجر، ونفس المنتج ممكن تلاقيه بسعر
          مختلف في Jumia أو Amazon أو B.TECH أو Raya أو Carrefour. علشان كده
          المقارنة قبل الشراء بتوفر عليك فلوس ووقت.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن بين المتاجر المصرية</h3>
            <p>شوف أسعار من Jumia وAmazon وNoon وCarrefour وBTECH وRaya.</p>
          </div>

          <div className="infoCard">
            <h3>اعرف أرخص سعر</h3>
            <p>وصل لأفضل عرض بدل ما تعتمد على متجر واحد.</p>
          </div>

          <div className="infoCard">
            <h3>منتجات كتير</h3>
            <p>موبايلات، لابتوبات، عطور، أجهزة كهربائية، شاشات وأكثر.</p>
          </div>
        </div>

        <h2>أكثر المنتجات بحثًا في مصر</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-15-eg">سعر ايفون 15 في مصر</Link>
          <Link href="/search/ايفون-16-eg">سعر ايفون 16 في مصر</Link>
          <Link href="/search/سامسونج-eg">سعر سامسونج في مصر</Link>
          <Link href="/search/لابتوب-eg">سعر لابتوب في مصر</Link>
          <Link href="/search/عطور-eg">عروض عطور في مصر</Link>
          <Link href="/search/شاشات-eg">سعر الشاشات في مصر</Link>
          <Link href="/search/غسالة-eg">سعر غسالة في مصر</Link>
          <Link href="/search/ثلاجة-eg">سعر ثلاجة في مصر</Link>
        </div>

        <h2>أهم متاجر مصر (مهم جدًا للسيو)</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>المتجر</th>
                <th>نوع المنتجات</th>
                <th>كلمات بحث</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Amazon.eg</td>
                <td>إلكترونيات، موبايلات، أجهزة منزلية</td>
                <td>أمازون مصر، Amazon Egypt offers</td>
              </tr>
              <tr>
                <td>Jumia</td>
                <td>موبايلات، ملابس، منتجات متنوعة</td>
                <td>عروض جوميا، Jumia deals</td>
              </tr>
              <tr>
                <td>Noon Egypt</td>
                <td>إلكترونيات وعروض</td>
                <td>عروض نون مصر</td>
              </tr>
              <tr>
                <td>Carrefour Egypt</td>
                <td>أجهزة منزلية وإلكترونيات</td>
                <td>عروض كارفور مصر</td>
              </tr>
              <tr>
                <td>B.TECH</td>
                <td>أجهزة كهربائية وموبايلات</td>
                <td>بي تك مصر، BTECH offers</td>
              </tr>
              <tr>
                <td>Raya</td>
                <td>إلكترونيات وأجهزة منزلية</td>
                <td>راية شوب، Raya Egypt</td>
              </tr>
              <tr>
                <td>2B Egypt</td>
                <td>كمبيوتر ولابتوبات</td>
                <td>2B Egypt laptop</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>كلمات بحث قوية في مصر</h2>

        <p>
          أسعار الموبايلات في مصر، سعر ايفون اليوم، سعر سامسونج، أرخص موبايل،
          عروض جوميا، عروض أمازون مصر، سعر لابتوب، سعر شاشة، عروض الأجهزة
          الكهربائية، أفضل سعر في مصر، وأرخص سعر أونلاين.
        </p>

        <h2>روابط مهمة داخل الموقع</h2>

        <div className="quickLinks">
          <Link href="/saudi-product-price-comparison">السعودية</Link>
          <Link href="/uae-product-price-comparison">الإمارات</Link>
          <Link href="/qatar-product-price-comparison">قطر</Link>
          <Link href="/compare-prices-online">مقارنة الأسعار</Link>
          <Link href="/best-price-online">أفضل سعر</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ البحث عن أفضل سعر في مصر</h2>
          <p>اكتب اسم المنتج وشوف الأسعار من كل المتاجر في مكان واحد.</p>

          <Link href="/" className="primaryBtn">
            ابحث في BPS Chat
          </Link>
        </div>
      </section>

      <PopularSearches />

      <style>{`
        .seoPage { color:white; background:#0b0f14; min-height:100vh; }
        .hero { text-align:center; padding:50px; }
        .content { max-width:1000px; margin:auto; padding:20px; }
        .cardsGrid { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; }
        .infoCard { background:#2f2f2f; padding:20px; border-radius:16px; }
        .quickLinks { display:flex; flex-wrap:wrap; gap:10px; }
        .quickLinks a { background:#2f2f2f; padding:8px 12px; border-radius:999px; color:white; text-decoration:none; }
        .primaryBtn { background:#10a37f; padding:10px 16px; border-radius:10px; color:white; text-decoration:none; }
      `}</style>
    </main>
  );
}