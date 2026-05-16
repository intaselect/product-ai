import type { Metadata } from "next";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "BPS Chat vs Google | هل انتهى زمن البحث اليدوي عن الأسعار؟",
  description:
    "مقارنة بين BPS Chat و Google لمعرفة أسرع طريقة لمقارنة أسعار المنتجات في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
  keywords: [
    "BPS Chat vs Google",
    "بي بي اس شات ضد جوجل",
    "بديل Google Shopping",
    "مقارنة أسعار",
    "مقارنة أسعار المنتجات",
    "أفضل سعر",
    "أرخص سعر",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض مصر",
    "Amazon",
    "Noon",
    "Jarir",
    "Extra",
    "Jumia",
    "Carrefour",
  ],
};

export default function BpsVsGooglePage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          BPS Chat vs Google
          <span>هل انتهى زمن البحث اليدوي عن أفضل الأسعار؟</span>
        </h1>

        <p>
          بدل ما تستخدم Google وتفتح عشرات المواقع علشان تعرف أرخص سعر، يمكنك
          استخدام <strong>BPS Chat (بي بي اس شات)</strong> لمقارنة أسعار المنتجات
          في ثواني بين المتاجر المختلفة.
        </p>

        <div className="ctaBox">
          <a href="/" className="primaryBtn">
            جرّب البحث الآن
          </a>
          <a href="/bps-chat" className="secondaryBtn">
            ما هو BPS Chat؟
          </a>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>ما الفرق بين BPS Chat و Google؟</h2>

        <div className="compareGrid">
          <div className="compareCard old">
            <h3>البحث في Google</h3>
            <ul>
              <li>تكتب اسم المنتج.</li>
              <li>تفتح أكثر من متجر بنفسك.</li>
              <li>تقارن الأسعار يدويًا.</li>
              <li>تحتاج وقت ومجهود للوصول لأفضل عرض.</li>
            </ul>
          </div>

          <div className="compareCard new">
            <h3>البحث في BPS Chat</h3>
            <ul>
              <li>تكتب اسم المنتج مرة واحدة.</li>
              <li>تختار الدولة المناسبة لك.</li>
              <li>تشاهد أسعار من متاجر مختلفة في مكان واحد.</li>
              <li>تختار العرض الأنسب بسرعة.</li>
            </ul>
          </div>
        </div>

        <h2>لماذا BPS Chat أسرع في مقارنة الأسعار؟</h2>

        <p>
          لأن BPS Chat مصمم خصيصًا لمقارنة أسعار المنتجات، وليس مجرد محرك بحث عام.
          عند البحث عن ايفون، سامسونج، لابتوب، سماعات، ملابس، عطور، ميكب، ألعاب
          أطفال أو شواحن، يعرض لك الموقع نتائج تساعدك على مقارنة السعر والمتجر
          بدل التنقل بين صفحات كثيرة.
        </p>

        <h2>المتاجر التي قد تظهر في نتائج المقارنة</h2>

        <p>
          حسب الدولة والمنتج، قد تظهر نتائج من متاجر مثل Amazon، Noon، Jarir،
          Extra، Jumia، Carrefour، Namshi، Shein، Sharaf DG، Lulu، Xcite وغيرها.
          الهدف هو مساعدتك على رؤية أكثر من خيار قبل الشراء.
        </p>

        <h2>الدول التي يدعمها BPS Chat</h2>

        <div className="countries">
          <span>السعودية</span>
          <span>الإمارات</span>
          <span>الكويت</span>
          <span>قطر</span>
          <span>البحرين</span>
          <span>مصر</span>
        </div>

        <h2>أمثلة بحث يمكنك تجربتها</h2>

        <div className="quickLinks">
          <a href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</a>
          <a href="/search/samsung-sa">أسعار سامسونج في السعودية</a>
          <a href="/search/لابتوب-ae">عروض لابتوب في الإمارات</a>
          <a href="/search/airpods-sa">سعر AirPods في السعودية</a>
          <a href="/search/عطور-ae">عروض عطور في الإمارات</a>
          <a href="/search/موبايل-eg">أسعار الموبايلات في مصر</a>
        </div>

        <h2>أسئلة شائعة</h2>

        <div className="faq">
          <div>
            <h3>هل BPS Chat بديل كامل لجوجل؟</h3>
            <p>
              لا، Google مفيد للبحث العام، لكن BPS Chat متخصص أكثر في مقارنة أسعار
              المنتجات بين المتاجر حسب الدولة.
            </p>
          </div>

          <div>
            <h3>هل BPS Chat يبيع المنتجات مباشرة؟</h3>
            <p>
              لا، BPS Chat يساعدك على المقارنة فقط، ثم يمكنك الانتقال إلى المتجر
              الأصلي لمراجعة تفاصيل المنتج والسعر.
            </p>
          </div>

          <div>
            <h3>هل يمكنني استخدامه للجوالات واللابتوبات؟</h3>
            <p>
              نعم، يمكنك البحث عن ايفون، سامسونج، شاومي، هواوي، لابتوبات، سماعات،
              شواحن، اكسسوارات، ملابس، عطور ومنتجات كثيرة أخرى.
            </p>
          </div>
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
          max-width: 760px;
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

        p, li {
          font-size: 17px;
          color: #e8e8e8;
        }

        ul {
          padding-right: 22px;
        }

        .compareGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .compareCard {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          backdrop-filter: blur(8px);
        }

        .compareCard.old {
          border-color: rgba(255, 120, 120, 0.25);
        }

        .compareCard.new {
          border-color: rgba(16, 163, 127, 0.45);
          box-shadow: 0 0 25px rgba(16,163,127,0.12);
        }

        .countries,
        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .countries span,
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

        .faq {
          display: grid;
          gap: 16px;
          margin-top: 16px;
        }

        .faq div {
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 18px;
        }

        @media (max-width: 700px) {
          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }

          .compareGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}