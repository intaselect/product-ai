import type { Metadata } from "next";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "هل BPS Chat موثوق؟ | بي بي اس شات لمقارنة الأسعار",
  description:
    "هل موقع BPS Chat موثوق؟ تعرف على طريقة عمل بي بي اس شات في مقارنة أسعار المنتجات بين المتاجر في السعودية والخليج ومصر.",
  keywords: [
    "هل BPS Chat موثوق",
    "هل بي بي اس شات موثوق",
    "BPS Chat",
    "بي بي اس شات",
    "موقع مقارنة أسعار موثوق",
    "مقارنة أسعار السعودية",
    "مقارنة أسعار الإمارات",
    "مقارنة أسعار مصر",
    "Amazon",
    "Noon",
    "Jarir",
    "Extra",
    "Jumia",
    "Carrefour",
  ],
};

export default function IsBpsChatSafePage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="content" dir="rtl">
        <h1>هل BPS Chat موثوق؟</h1>

        <p>
          نعم، <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> هو موقع
          يساعدك على مقارنة أسعار المنتجات بين المتاجر، لكنه لا يبيع المنتجات مباشرة.
          يعني الموقع دوره الأساسي هو عرض نتائج وأسعار من مصادر مختلفة حتى تختار
          العرض الأنسب لك.
        </p>

        <h2>لماذا يعتبر BPS Chat مفيدًا قبل الشراء؟</h2>

        <p>
          بدل ما تدخل على أكثر من متجر مثل Amazon وNoon وJarir وExtra وJumia وCarrefour
          وتبحث يدويًا عن السعر، يمكنك كتابة اسم المنتج مرة واحدة في BPS Chat ومقارنة
          النتائج في مكان واحد.
        </p>

        <ul>
          <li>يساعدك على الوصول لأفضل سعر بسرعة.</li>
          <li>يعرض لك منتجات من متاجر مختلفة حسب الدولة.</li>
          <li>يسهّل مقارنة السعر والمتجر قبل الشراء.</li>
          <li>يوفر وقت البحث اليدوي بين مواقع كثيرة.</li>
        </ul>

        <h2>هل BPS Chat متجر إلكتروني؟</h2>

        <p>
          لا. BPS Chat ليس متجرًا إلكترونيًا ولا يستلم المدفوعات منك. عند الضغط على
          المنتج، تنتقل إلى رابط المتجر الأصلي لمراجعة تفاصيل المنتج والسعر والشحن
          قبل إتمام الشراء.
        </p>

        <h2>ما الدول التي يدعمها BPS Chat؟</h2>

        <p>
          يعمل الموقع على مساعدة المستخدمين في <strong>السعودية</strong>،{" "}
          <strong>الإمارات</strong>، <strong>الكويت</strong>، <strong>قطر</strong>،{" "}
          <strong>البحرين</strong> و<strong>مصر</strong>. وتختلف النتائج حسب الدولة
          والمتاجر المتاحة فيها.
        </p>

        <h2>ما المنتجات التي يمكنك مقارنتها؟</h2>

        <p>
          يمكنك البحث عن ايفون، سامسونج، شاومي، هواوي، لابتوب HP، لابتوب Dell،
          لابتوب Lenovo، سماعات بلوتوث، AirPods، شواحن، اكسسوارات جوالات، ملابس،
          عطور، ميكب، مستحضرات تجميل، ألعاب أطفال، بامبرز، أجهزة منزلية، ومنتجات
          كثيرة أخرى.
        </p>

        <h2>نصائح لاستخدام BPS Chat بأمان</h2>

        <ul>
          <li>راجع السعر النهائي داخل المتجر قبل الشراء.</li>
          <li>تأكد من تكلفة الشحن والتوفر.</li>
          <li>قارن بين أكثر من نتيجة إذا ظهر أكثر من متجر.</li>
          <li>اختر المتجر المناسب لك حسب السعر والتقييم والتوفر.</li>
        </ul>

        <h2>ابدأ المقارنة الآن</h2>

        <p>
          استخدم شريط البحث بالأعلى واكتب اسم المنتج الذي تريده، مثل: ايفون 15،
          لابتوب، سماعات بلوتوث، عروض نون، عطور، أو ملابس، وسيتم توجيهك للصفحة
          الرئيسية لعرض نتائج البحث.
        </p>

        <div className="quickLinks">
          <a href="/bps-chat">ما هو BPS Chat؟</a>
          <a href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</a>
          <a href="/search/لابتوب-sa">عروض لابتوب في السعودية</a>
          <a href="/search/airpods-ae">سعر AirPods في الإمارات</a>
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