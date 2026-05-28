import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "BPS Chat vs Noon | مقارنة بي بي اس شات مع نون",
  description:
    "مقارنة بين BPS Chat و Noon لمعرفة أفضل طريقة للبحث عن المنتجات ومقارنة الأسعار في السعودية والإمارات ومصر والخليج.",
  keywords: [
    "BPS Chat vs Noon",
    "بي بي اس شات ضد نون",
    "مقارنة أسعار نون",
    "بديل نون",
    "عروض نون",
    "Noon offers",
    "Noon price comparison",
    "مقارنة أسعار السعودية",
    "مقارنة أسعار الإمارات",
    "مقارنة أسعار مصر",
  ],
};

export default function BpsVsNoonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          BPS Chat vs Noon
          <span>هل تعتمد على نون فقط أم تقارن الأسعار قبل الشراء؟</span>
        </h1>

        <p>
          متجر <strong>Noon (نون)</strong> من أشهر المتاجر في السعودية والإمارات
          ومصر، لكن <strong>BPS Chat (بي بي اس شات)</strong> يساعدك على مقارنة
          الأسعار بين أكثر من متجر بدل الاعتماد على نون فقط.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            جرّب البحث الآن
          </Link>
          <Link href="/bps-chat" className="secondaryBtn">
            ما هو BPS Chat؟
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>ما الفرق بين BPS Chat و Noon؟</h2>

        <div className="compareGrid">
          <div className="compareCard old">
            <h3>البحث داخل Noon</h3>
            <ul>
              <li>يعرض منتجات موجودة داخل نون فقط.</li>
              <li>مناسب للشراء المباشر.</li>
              <li>قد لا تعرف هل السعر هو الأفضل.</li>
              <li>تحتاج تقارن يدويًا مع متاجر أخرى.</li>
            </ul>
          </div>

          <div className="compareCard new">
            <h3>البحث في BPS Chat</h3>
            <ul>
              <li>تكتب المنتج مرة واحدة.</li>
              <li>تشاهد أسعار من أكثر من متجر.</li>
              <li>تقارن بسهولة قبل الشراء.</li>
              <li>توفر وقت البحث بين المواقع.</li>
            </ul>
          </div>
        </div>

        <h2>لماذا لا تعتمد على نون فقط؟</h2>

        <p>
          عند البحث عن منتجات مثل iPhone، Samsung، لابتوب، سماعات، عطور، ملابس،
          أو أجهزة منزلية، قد تجد المنتج في Noon بسعر معين، لكن نفس المنتج قد يكون
          أرخص في Amazon أو Jumia أو متاجر أخرى.
        </p>

        <p>
          لذلك استخدام BPS Chat قبل الشراء يساعدك على معرفة أفضل سعر بدل الاعتماد
          على متجر واحد فقط.
        </p>

        <h2>مقارنة سريعة</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>المقارنة</th>
                <th>BPS Chat</th>
                <th>Noon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>نوع الخدمة</td>
                <td>محرك بحث ومقارنة أسعار</td>
                <td>متجر إلكتروني</td>
              </tr>
              <tr>
                <td>عدد المتاجر</td>
                <td>يعرض أكثر من متجر</td>
                <td>نون فقط</td>
              </tr>
              <tr>
                <td>أفضل استخدام</td>
                <td>معرفة أرخص سعر</td>
                <td>شراء مباشر</td>
              </tr>
              <tr>
                <td>الدول</td>
                <td>السعودية، الإمارات، مصر والخليج</td>
                <td>حسب توفر نون</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>متى تستخدم BPS Chat بدل Noon؟</h2>

        <p>
          استخدم BPS Chat عندما تريد معرفة أفضل سعر للمنتج في السعودية أو الإمارات
          أو مصر أو الخليج، خصوصًا عند البحث عن:
        </p>

        <ul>
          <li>سعر iPhone في السعودية</li>
          <li>عروض Samsung في الإمارات</li>
          <li>أفضل لابتوب في مصر</li>
          <li>سعر AirPods</li>
          <li>عروض Noon اليوم</li>
        </ul>

        <h2>أمثلة بحث</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</Link>
          <Link href="/search/samsung-ae">أسعار سامسونج في الإمارات</Link>
          <Link href="/search/لابتوب-eg">لابتوب في مصر</Link>
          <Link href="/search/airpods-sa">سعر AirPods</Link>
          <Link href="/search/عطور-ae">عطور في الإمارات</Link>
        </div>

        <h2>روابط مهمة</h2>

        <div className="quickLinks">
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-google">BPS vs Google</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ المقارنة الآن</h2>
          <p>
            لا تعتمد على متجر واحد، قارن الأسعار أولًا باستخدام BPS Chat واختر
            أفضل عرض.
          </p>

          <Link href="/" className="primaryBtn">
            ابدأ البحث
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
          background: rgba(16, 163, 127, 0.14);
          border: 1px solid rgba(16, 163, 127, 0.35);
          color: #7fffe0;
          padding: 8px 16px;
          border-radius: 999px;
          display: inline-block;
          margin-bottom: 18px;
        }

        h1 {
          font-size: 42px;
          margin-bottom: 18px;
        }

        h1 span {
          display: block;
          font-size: 22px;
          color: #ccc;
        }

        .ctaBox {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .primaryBtn {
          background: #10a37f;
          padding: 12px 18px;
          border-radius: 10px;
          color: white;
          text-decoration: none;
        }

        .secondaryBtn {
          background: #2f2f2f;
          padding: 12px 18px;
          border-radius: 10px;
          color: white;
          text-decoration: none;
        }

        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 20px;
          line-height: 2;
        }

        h2 {
          margin-top: 30px;
          color: #10a37f;
        }

        .compareGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .compareCard {
          background: rgba(40,40,40,0.7);
          padding: 20px;
          border-radius: 16px;
        }

        .tableWrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;
        }

        .quickLinks a {
          background: #2f2f2f;
          padding: 8px 12px;
          border-radius: 999px;
          text-decoration: none;
          color: white;
        }

        .finalCta {
          margin-top: 40px;
          text-align: center;
        }
      `}</style>
    </main>
  );
}