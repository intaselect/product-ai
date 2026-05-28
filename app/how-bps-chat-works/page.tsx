import type { Metadata } from "next";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "كيف يعمل BPS Chat؟ | شرح بي بي اس شات",
  description:
    "تعرف على طريقة عمل BPS Chat وكيف يساعدك في مقارنة أسعار المنتجات بسهولة في السعودية والخليج ومصر.",
  keywords: [
    "كيف يعمل BPS Chat",
    "كيف يعمل بي بي اس شات",
    "طريقة استخدام BPS Chat",
    "مقارنة أسعار المنتجات",
    "مقارنة اسعار السعودية",
    "مقارنة اسعار الامارات",
    "Amazon",
    "Noon",
    "Jarir",
    "Extra",
    "Jumia",
  ],
};

export default function HowBpsChatWorksPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="content" dir="rtl">
        <h1>كيف يعمل BPS Chat؟</h1>

        <p>
          يعمل <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> كأداة
          ذكية لمقارنة أسعار المنتجات بين المتاجر المختلفة، حيث يمكنك كتابة اسم
          المنتج مرة واحدة والحصول على نتائج متعددة من أكثر من متجر في نفس
          الوقت.
        </p>

        <h2>خطوات استخدام BPS Chat</h2>

        <ul>
          <li>اكتب اسم المنتج في شريط البحث بالأعلى.</li>
          <li>اختر الدولة مثل السعودية أو الإمارات أو مصر.</li>
          <li>اضغط على بحث.</li>
          <li>ستظهر لك نتائج من متاجر مختلفة.</li>
          <li>قارن الأسعار واختر الأفضل لك.</li>
        </ul>

        <h2>كيف يتم عرض الأسعار؟</h2>

        <p>
          يقوم الموقع بجلب نتائج من متاجر مثل Amazon وNoon وJarir وExtra وJumia
          وغيرها، ويعرض لك الأسعار المتاحة لكل منتج، مما يساعدك على معرفة أفضل
          عرض بسرعة.
        </p>

        <h2>ما الفرق بين BPS Chat والبحث في Google؟</h2>

        <p>
          عند استخدام Google، تحتاج إلى فتح عدة مواقع ومقارنة الأسعار بنفسك.
          أما في BPS Chat، يتم جمع النتائج في مكان واحد لتسهيل المقارنة وتوفير
          الوقت.
        </p>

        <h2>ما المنتجات التي يمكنك البحث عنها؟</h2>

        <p>
          يمكنك البحث عن الجوالات مثل iPhone وSamsung وXiaomi، واللابتوبات مثل HP
          وDell وLenovo، والسماعات مثل AirPods وسماعات البلوتوث، بالإضافة إلى
          الملابس، العطور، مستحضرات التجميل، ألعاب الأطفال، الشواحن، والإكسسوارات.
        </p>

        <h2>في أي دول يعمل الموقع؟</h2>

        <p>
          يعمل BPS Chat في السعودية، الإمارات، الكويت، قطر، البحرين ومصر، ويعرض
          نتائج مناسبة لكل دولة حسب المتاجر المتاحة فيها.
        </p>

        <h2>ابدأ الآن</h2>

        <p>
          جرب البحث الآن عن: ايفون 15، لابتوب، سماعات بلوتوث، عروض نون، عطور،
          ملابس، أو أي منتج تريد معرفة سعره.
        </p>

        <div className="quickLinks">
          <a href="/bps-chat">ما هو BPS Chat؟</a>
          <a href="/is-bps-chat-safe">هل BPS Chat موثوق؟</a>
          <a href="/is-bps-chat-free">هل BPS Chat مجاني؟</a>
          <a href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</a>
          <a href="/search/لابتوب-ae">عروض لابتوب في الإمارات</a>
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