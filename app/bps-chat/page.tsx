import type { Metadata } from "next";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "ما هو BPS Chat؟ | بي بي اس شات لمقارنة أسعار المنتجات",
  description:
    "تعرف على موقع BPS Chat بي بي اس شات لمقارنة أسعار المنتجات بين المتاجر في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
  keywords: [
    "BPS Chat",
    "بي بي اس شات",
    "ما هو BPS Chat",
    "ما هو بي بي اس شات",
    "مقارنة أسعار",
    "مقارنة اسعار المنتجات",
    "أفضل سعر",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض الكويت",
    "عروض قطر",
    "عروض البحرين",
    "عروض مصر",
    "Amazon",
    "Noon",
    "Jarir",
    "Extra",
    "Jumia",
    "Carrefour",
  ],
};

export default function BpsChatPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="content" dir="rtl">
        <h1>ما هو BPS Chat؟ بي بي اس شات لمقارنة أسعار المنتجات</h1>

        <p>
          <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> هو موقع يساعدك على
          البحث عن المنتجات ومقارنة الأسعار بين المتاجر بسهولة بدل ما تفتح أكثر من
          موقع بنفسك. الهدف من الموقع هو إنك تعرف أفضل سعر، أفضل عرض، والمتجر المناسب
          قبل الشراء.
        </p>

        <p>
          بي بي اس شات يخدم المستخدمين في <strong>السعودية</strong>،{" "}
          <strong>الإمارات</strong>، <strong>الكويت</strong>، <strong>قطر</strong>،{" "}
          <strong>البحرين</strong> و<strong>مصر</strong>، ويعرض نتائج من متاجر مختلفة
          حسب الدولة والمنتج.
        </p>

        <h2>ليه تستخدم بي بي اس شات بدل البحث اليدوي؟</h2>

        <p>
          عند البحث بالطريقة التقليدية، غالبًا تحتاج تدخل على Google ثم تفتح Amazon
          وNoon وJarir وExtra وJumia وCarrefour ومتاجر أخرى علشان تعرف السعر. أما مع
          BPS Chat، تكتب اسم المنتج مرة واحدة وتشوف نتائج وأسعار من أكثر من متجر في
          مكان واحد.
        </p>

        <ul>
          <li>مقارنة أسعار المنتجات في ثواني.</li>
          <li>معرفة أرخص سعر متاح حسب الدولة.</li>
          <li>عرض منتجات من متاجر مختلفة مثل Amazon وNoon وJarir وExtra وJumia.</li>
          <li>توفير وقت البحث بين عشرات المواقع.</li>
          <li>مناسب للبحث عن الجوالات، اللابتوبات، السماعات، الملابس، العطور، وألعاب الأطفال.</li>
        </ul>

        <h2>ما المنتجات التي يمكنك البحث عنها؟</h2>

        <p>
          يمكنك استخدام BPS Chat للبحث عن منتجات كثيرة مثل: ايفون، سامسونج، شاومي،
          هواوي، لابتوب HP، لابتوب Lenovo، لابتوب Dell، سماعات بلوتوث، ايربودز،
          شواحن، باور بانك، ساعات ذكية، ملابس رجالي، ملابس حريمي، ملابس أطفال،
          عطور، ميكب، مستحضرات تجميل، ألعاب أطفال، وبامبرز.
        </p>

        <h2>ما المتاجر التي تظهر في المقارنة؟</h2>

        <p>
          حسب الدولة والمنتج، قد تظهر نتائج من متاجر مثل Amazon السعودية، Amazon
          الإمارات، Amazon مصر، Noon، Jarir، Extra، Jumia، Carrefour، Namshi، Shein،
          Sharaf DG، Lulu، Xcite وغيرها من المتاجر المتاحة في السعودية والخليج ومصر.
        </p>

        <h2>هل BPS Chat يبيع المنتجات؟</h2>

        <p>
          لا، BPS Chat ليس متجرًا يبيع المنتجات مباشرة. الموقع يساعدك على البحث
          والمقارنة، ثم يمكنك الضغط على المنتج والانتقال إلى المتجر الأصلي لعرض تفاصيل
          المنتج والسعر.
        </p>

        <h2>ابدأ البحث الآن</h2>

        <p>
          اكتب اسم أي منتج في شريط البحث بالأعلى مثل: ايفون 15، سماعات بلوتوث،
          لابتوب HP، عروض نون، عطور، ملابس أطفال، أو أي منتج تريد مقارنة سعره.
        </p>

        <div className="quickLinks">
          <a href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</a>
          <a href="/search/airpods-sa">سعر AirPods في السعودية</a>
          <a href="/search/لابتوب-ae">عروض لابتوب في الإمارات</a>
          <a href="/search/عطور-sa">عروض عطور في السعودية</a>
          <a href="/search/موبايل-eg">أسعار الموبايلات في مصر</a>
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

        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 40px 18px;
          line-height: 2;
        }

        h1 {
          font-size: 34px;
          margin-bottom: 20px;
        }

        h2 {
          margin-top: 34px;
          font-size: 24px;
          color: #10a37f;
        }

        p, li {
          font-size: 17px;
          color: #e8e8e8;
        }

        ul {
          padding-right: 22px;
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
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
      `}</style>
    </main>
  );
}