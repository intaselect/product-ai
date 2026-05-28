import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "مقارنة أسعار Laptop | أفضل سعر لابتوب في السعودية والخليج ومصر",
  description:
    "قارن أسعار اللابتوبات Laptop في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat وشاهد عروض HP و Dell و Lenovo و Asus و Apple MacBook.",
  keywords: [
    "سعر لابتوب",
    "عروض لابتوب",
    "مقارنة أسعار لابتوب",
    "أفضل سعر لابتوب",
    "Laptop price",
    "Laptop deals",
    "HP laptop price",
    "Dell laptop price",
    "Lenovo laptop price",
    "Asus laptop price",
    "MacBook price",
    "سعر لابتوب في السعودية",
    "سعر لابتوب في الإمارات",
    "سعر لابتوب في مصر",
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

export default function LaptopPriceComparisonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار Laptop
          <span>اعرف أفضل سعر لابتوب في السعودية والخليج ومصر</span>
        </h1>

        <p>
          لو بتبحث عن <strong>سعر لابتوب</strong> أو عروض Laptop في السعودية أو
          الإمارات أو الكويت أو قطر أو البحرين أو مصر، استخدم{" "}
          <strong>BPS Chat</strong> لمقارنة أسعار HP و Dell و Lenovo و Asus و
          MacBook بين المتاجر.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">ابحث عن سعر لابتوب الآن</Link>
          <Link href="/bps-chat" className="secondaryBtn">ما هو BPS Chat؟</Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تقارن أسعار اللابتوبات قبل الشراء؟</h2>

        <p>
          أسعار اللابتوبات تختلف جدًا حسب المتجر والمواصفات. ممكن تلاقي نفس
          لابتوب HP أو Dell أو Lenovo أو Asus أو MacBook بسعر مختلف في Amazon أو
          Noon أو Jarir أو Extra أو Jumia أو Carrefour. لذلك المقارنة قبل الشراء
          تساعدك تختار أفضل سعر وأفضل عرض.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>لابتوبات للدراسة</h3>
            <p>قارن أسعار لابتوبات خفيفة ومناسبة للطلاب والاستخدام اليومي.</p>
          </div>

          <div className="infoCard">
            <h3>لابتوبات للألعاب</h3>
            <p>ابحث عن Gaming Laptop من Asus و Lenovo و HP Victus و Dell G Series.</p>
          </div>

          <div className="infoCard">
            <h3>لابتوبات للعمل</h3>
            <p>قارن أسعار MacBook و Dell XPS و Lenovo ThinkPad و HP Pavilion.</p>
          </div>
        </div>

        <h2>أشهر أنواع اللابتوبات التي يبحث عنها الناس</h2>

        <div className="quickLinks">
          <Link href="/search/hp-laptop-sa">سعر لابتوب HP في السعودية</Link>
          <Link href="/search/dell-laptop-sa">سعر لابتوب Dell</Link>
          <Link href="/search/lenovo-laptop-ae">لابتوب Lenovo في الإمارات</Link>
          <Link href="/search/asus-laptop-sa">عروض Asus Laptop</Link>
          <Link href="/search/macbook-sa">سعر MacBook</Link>
          <Link href="/search/gaming-laptop-sa">Gaming Laptop عروض</Link>
          <Link href="/search/لابتوب-eg">سعر لابتوب في مصر</Link>
        </div>

        <h2>كلمات بحث قوية عن عروض اللابتوب</h2>

        <p>
          كثير من المستخدمين يبحثون عن: عروض لابتوب، أرخص لابتوب، أفضل لابتوب
          للدراسة، أفضل لابتوب للألعاب، Laptop deals، laptop offers، سعر HP
          laptop، سعر Dell laptop، سعر MacBook، لابتوب تقسيط، عروض جرير لابتوب،
          عروض اكسترا لابتوب، وعروض نون لابتوب.
        </p>

        <div className="quickLinks">
          <Link href="/search/عروض-لابتوب-sa">عروض لابتوب في السعودية</Link>
          <Link href="/search/لابتوب-تقسيط-sa">لابتوب تقسيط</Link>
          <Link href="/search/ارخص-لابتوب-ae">أرخص لابتوب في الإمارات</Link>
          <Link href="/search/عروض-لابتوب-نون-sa">عروض لابتوب نون</Link>
          <Link href="/search/عروض-جرير-لابتوب-sa">عروض جرير لابتوب</Link>
          <Link href="/search/عروض-اكسترا-لابتوب-sa">عروض اكسترا لابتوب</Link>
        </div>

        <h2>مقارنة أسعار Laptop حسب الدولة</h2>

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
                <td>سعر لابتوب HP، MacBook، Gaming Laptop</td>
                <td>Amazon.sa، Noon، Jarir، Extra، Carrefour</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>Laptop price UAE، Lenovo، Asus، Dell</td>
                <td>Amazon.ae، Noon، Sharaf DG، Carrefour</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>سعر لابتوب في مصر، HP، Dell، Lenovo</td>
                <td>Amazon.eg، Jumia، Noon Egypt، متاجر محلية</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>Laptop Kuwait price، عروض لابتوب</td>
                <td>Xcite، Lulu، متاجر إلكترونية محلية</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>Laptop Qatar، MacBook Qatar</td>
                <td>Lulu، Carrefour، متاجر قطرية</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>Laptop Bahrain، عروض لابتوب البحرين</td>
                <td>متاجر البحرين الإلكترونية والمتاجر الكبرى</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>نصائح قبل شراء لابتوب</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الشراء.</li>
          <li>راجع المعالج: Intel Core i5 أو i7 أو AMD Ryzen.</li>
          <li>تأكد من حجم الرام: 8GB أو 16GB أو أكثر.</li>
          <li>راجع نوع التخزين SSD وحجمه.</li>
          <li>لو للألعاب، تأكد من كارت الشاشة مثل RTX أو GTX.</li>
          <li>راجع الضمان والشحن والتوفر داخل الدولة.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
          <Link href="/bps-vs-jumia">BPS vs Jumia</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار اللابتوبات الآن</h2>
          <p>
            اكتب نوع اللابتوب الذي تبحث عنه واختر الدولة، وشاهد النتائج بدل
            الاعتماد على متجر واحد فقط.
          </p>

          <Link href="/" className="primaryBtn">ابحث في BPS Chat</Link>
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