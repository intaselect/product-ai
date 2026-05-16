import type { Metadata } from "next";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "هل BPS Chat مجاني؟ | بي بي اس شات لمقارنة الأسعار",
  description:
    "تعرف هل موقع BPS Chat مجاني وكيف يساعدك بي بي اس شات في مقارنة أسعار المنتجات والعروض في السعودية والخليج ومصر.",
  keywords: [
    "هل BPS Chat مجاني",
    "هل بي بي اس شات مجاني",
    "BPS Chat مجاني",
    "بي بي اس شات",
    "مقارنة أسعار مجانية",
    "موقع مقارنة أسعار مجاني",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض مصر",
    "Amazon",
    "Noon",
    "Jarir",
    "Extra",
    "Jumia",
  ],
};

export default function IsBpsChatFreePage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="content" dir="rtl">
        <h1>هل BPS Chat مجاني؟</h1>

        <p>
          نعم، يمكنك استخدام <strong>BPS Chat</strong> أو{" "}
          <strong>بي بي اس شات</strong> للبحث عن المنتجات ومقارنة الأسعار بدون
          الحاجة لفتح عشرات المتاجر يدويًا. الموقع يساعدك على الوصول إلى أفضل سعر
          وأفضل عرض بسهولة قبل الشراء.
        </p>

        <h2>ماذا يقدم لك BPS Chat مجانًا؟</h2>

        <ul>
          <li>البحث عن المنتجات في أكثر من دولة.</li>
          <li>مقارنة أسعار الجوالات واللابتوبات والسماعات والملابس والعطور.</li>
          <li>عرض متاجر مختلفة حسب المنتج والدولة.</li>
          <li>الوصول السريع للعروض بدل البحث اليدوي الطويل.</li>
        </ul>

        <h2>ما الدول المتاحة؟</h2>

        <p>
          يدعم BPS Chat البحث والمقارنة في <strong>السعودية</strong>،{" "}
          <strong>الإمارات</strong>، <strong>الكويت</strong>، <strong>قطر</strong>،{" "}
          <strong>البحرين</strong> و<strong>مصر</strong>. يمكنك اختيار الدولة من
          شريط البحث بالأعلى ثم كتابة اسم المنتج.
        </p>

        <h2>ما المتاجر التي يمكن أن تظهر في النتائج؟</h2>

        <p>
          حسب الدولة والمنتج، قد تظهر نتائج من متاجر مثل Amazon، Noon، Jarir،
          Extra، Jumia، Carrefour، Namshi، Shein، Sharaf DG، Lulu وXcite. الهدف هو
          مساعدتك على مقارنة الأسعار والعروض في مكان واحد.
        </p>

        <h2>هل أشتري من BPS Chat مباشرة؟</h2>

        <p>
          لا، BPS Chat ليس متجرًا ولا يبيع المنتجات مباشرة. عند اختيار منتج، يمكنك
          الانتقال إلى المتجر الأصلي لمراجعة السعر النهائي، التوفر، الشحن، والتقييمات
          قبل إتمام الشراء.
        </p>

        <h2>ابدأ البحث الآن</h2>

        <p>
          جرّب البحث عن كلمات مثل: سعر ايفون 15، عروض نون، لابتوب HP، سماعات
          بلوتوث، ملابس أطفال، عطور، ميكب، شواحن واكسسوارات جوالات.
        </p>

        <div className="quickLinks">
          <a href="/bps-chat">ما هو BPS Chat؟</a>
          <a href="/is-bps-chat-safe">هل BPS Chat موثوق؟</a>
          <a href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</a>
          <a href="/search/سماعات-بلوتوث-sa">سماعات بلوتوث في السعودية</a>
          <a href="/search/عطور-ae">عروض عطور في الإمارات</a>
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