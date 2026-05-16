import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "BPS Chat vs Jumia | مقارنة بي بي اس شات مع جوميا",
  description:
    "مقارنة بين BPS Chat و Jumia لمعرفة أفضل طريقة للبحث عن المنتجات ومقارنة الأسعار في مصر والخليج.",
  keywords: [
    "BPS Chat vs Jumia",
    "بي بي اس شات ضد جوميا",
    "مقارنة أسعار جوميا",
    "بديل جوميا",
    "Jumia Egypt prices",
    "Jumia offers",
    "مقارنة أسعار مصر",
  ],
};

export default function BpsVsJumiaPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          BPS Chat vs Jumia
          <span>هل تعتمد على جوميا فقط أم تقارن الأسعار؟</span>
        </h1>

        <p>
          متجر <strong>Jumia (جوميا)</strong> من أشهر المتاجر في مصر، لكن{" "}
          <strong>BPS Chat</strong> يساعدك على مقارنة الأسعار بين أكثر من متجر
          بدل الاعتماد على جوميا فقط.
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
        <h2>ما الفرق بين BPS Chat و Jumia؟</h2>

        <div className="compareGrid">
          <div className="compareCard old">
            <h3>البحث داخل Jumia</h3>
            <ul>
              <li>يعرض منتجات جوميا فقط.</li>
              <li>مناسب للشراء المباشر.</li>
              <li>قد لا يكون السعر الأفضل.</li>
            </ul>
          </div>

          <div className="compareCard new">
            <h3>البحث في BPS Chat</h3>
            <ul>
              <li>مقارنة أسعار من عدة متاجر.</li>
              <li>عرض نتائج حسب الدولة.</li>
              <li>اختيار أفضل سعر بسهولة.</li>
            </ul>
          </div>
        </div>

        <h2>لماذا تستخدم BPS Chat في مصر؟</h2>

        <p>
          عند البحث عن منتجات مثل iPhone، Samsung، لابتوب، سماعات، عطور أو
          ملابس، قد تجد المنتج في Jumia بسعر معين، لكن نفس المنتج قد يكون أرخص
          في متاجر أخرى.
        </p>

        <h2>أمثلة بحث</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-eg">سعر ايفون في مصر</Link>
          <Link href="/search/samsung-eg">أسعار سامسونج</Link>
          <Link href="/search/لابتوب-eg">لابتوب في مصر</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ المقارنة الآن</h2>
          <p>قارن الأسعار قبل الشراء واختر الأفضل.</p>

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
            #0b0f14;
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

        .quickLinks {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .quickLinks a {
          background: #2f2f2f;
          padding: 8px 12px;
          border-radius: 999px;
          text-decoration: none;
          color: white;
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