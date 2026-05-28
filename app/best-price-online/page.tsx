import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";
export const metadata: Metadata = {
  title: "أفضل سعر أونلاين | اعرف Best Price قبل الشراء مع BPS Chat",
  description:
    "اعرف أفضل سعر أونلاين للمنتجات في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat وقارن بين Amazon وNoon وJumia وJarir وExtra وCarrefour.",
  keywords: [
    "أفضل سعر",
    "افضل سعر اونلاين",
    "Best price online",
    "best price",
    "أرخص سعر",
    "مقارنة أسعار",
    "أفضل عروض",
    "عروض أونلاين",
    "سعر ايفون",
    "سعر سامسونج",
    "سعر لابتوب",
    "عروض عطور",
    "Amazon",
    "Noon",
    "Jumia",
    "Jarir",
    "Extra",
    "Carrefour",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function BestPriceOnlinePage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          أفضل سعر أونلاين
          <span>قارن قبل الشراء واعرف Best Price في ثواني</span>
        </h1>

        <p>
          لو بتبحث عن <strong>أفضل سعر</strong> أو <strong>Best price online</strong>{" "}
          في السعودية أو الإمارات أو الكويت أو قطر أو البحرين أو مصر، استخدم{" "}
          <strong>BPS Chat</strong> لمقارنة الأسعار بين المتاجر بدل الاعتماد على
          متجر واحد فقط.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن أفضل سعر الآن
          </Link>
          <Link href="/cheapest-products" className="secondaryBtn">
            أرخص المنتجات
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>كيف يساعدك BPS Chat في معرفة أفضل سعر؟</h2>

        <p>
          السعر الأفضل لا يعني دائمًا السعر الأقل فقط. أحيانًا يكون أفضل سعر هو
          السعر المناسب مع متجر موثوق، شحن مناسب، توفر المنتج، وضمان واضح. لذلك
          يساعدك BPS Chat على البحث عن المنتج ومقارنة النتائج بين متاجر مثل
          Amazon وNoon وJumia وJarir وExtra وCarrefour حسب الدولة.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن السعر</h3>
            <p>شاهد أكثر من نتيجة لنفس المنتج بدل الاعتماد على متجر واحد.</p>
          </div>

          <div className="infoCard">
            <h3>اختار الدولة</h3>
            <p>السعودية، الإمارات، الكويت، قطر، البحرين ومصر.</p>
          </div>

          <div className="infoCard">
            <h3>اشتري بذكاء</h3>
            <p>راجع السعر والشحن والتوفر قبل الانتقال للمتجر الأصلي.</p>
          </div>
        </div>

        <h2>منتجات يبحث عنها الناس بأفضل سعر</h2>

        <div className="quickLinks">
          <Link href="/search/افضل-سعر-ايفون-sa">أفضل سعر ايفون في السعودية</Link>
          <Link href="/search/افضل-سعر-سامسونج-ae">أفضل سعر سامسونج في الإمارات</Link>
          <Link href="/search/افضل-سعر-لابتوب-eg">أفضل سعر لابتوب في مصر</Link>
          <Link href="/search/افضل-سعر-airpods-sa">أفضل سعر AirPods</Link>
          <Link href="/search/افضل-سعر-عطور-sa">أفضل سعر عطور</Link>
          <Link href="/search/افضل-سعر-شاشة-sa">أفضل سعر شاشة</Link>
          <Link href="/search/افضل-سعر-بلايستيشن-sa">أفضل سعر PlayStation</Link>
        </div>

        <h2>كلمات بحث قوية عن أفضل سعر</h2>

        <p>
          الناس بتبحث عن: أفضل سعر، أرخص سعر، سعر اليوم، Best price online،
          online price comparison، compare prices، عروض اليوم، خصومات أونلاين،
          أفضل سعر iPhone، أفضل سعر Samsung، أفضل سعر Laptop، عروض نون، عروض
          أمازون، عروض جوميا، عروض جرير، عروض اكسترا.
        </p>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
        </div>

        <h2>أفضل سعر حسب الدولة</h2>

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
                <td>أفضل سعر ايفون، سامسونج، لابتوب، عروض نون</td>
                <td>Amazon.sa، Noon، Jarir، Extra، Carrefour</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>Best price UAE، عروض Amazon، أرخص موبايل</td>
                <td>Amazon.ae، Noon، Carrefour، Sharaf DG</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>أفضل سعر موبايل، عروض جوميا، سعر لابتوب</td>
                <td>Jumia، Amazon.eg، Noon Egypt</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>أفضل سعر الكويت، عروض إلكترونيات</td>
                <td>Xcite، Lulu، متاجر محلية</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>Best price Qatar، عروض أونلاين</td>
                <td>Carrefour، Lulu، متاجر قطرية</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>أفضل سعر البحرين، عروض اليوم</td>
                <td>متاجر البحرين الإلكترونية والمتاجر الكبرى</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>نصائح للحصول على أفضل سعر</h2>

        <ul>
          <li>قارن بين أكثر من متجر قبل الشراء.</li>
          <li>راجع السعر النهائي بعد الشحن.</li>
          <li>تأكد من التوفر والضمان.</li>
          <li>قارن بين عروض اليوم والعروض الموسمية.</li>
          <li>لا تعتمد على أول نتيجة تظهر لك.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
          <Link href="/bps-vs-jumia">BPS vs Jumia</Link>
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ البحث عن أفضل سعر الآن</h2>
          <p>اكتب اسم المنتج، اختر الدولة، وقارن الأسعار قبل الشراء.</p>

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