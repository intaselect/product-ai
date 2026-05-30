import Link from "next/link";

import SeoSearchBar from "@/app/components/SeoSearchBar";
import InternalLinksBoost from "@/app/components/InternalLinksBoost";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import PopularSearches from "@/app/components/PopularSearches";
import { advertiserPages } from "@/app/advertisers/data";

export const metadata = {
  title: "اعلن عن متجرك ومنتجاتك | BPS Chat",
  description:
    "صفحات مخصصة لأصحاب المتاجر والمعلنين لعرض المنتجات وجذب العملاء عبر BPS Chat في السعودية والخليج ومصر.",
};


export default function AdvertisersPage() {
  return (
    <main className="advertisersPage" dir="rtl">
      <SeoSearchBar />

      <section className="hero">
        <span>🚀 BPS Chat للمعلنين والتجار</span>
        <h1>اعلن عن متجرك ومنتجاتك أمام عملاء يبحثون عن الشراء</h1>
        <p>
          صفحات مخصصة لأصحاب المتاجر، البراندات، الهاند ميد، والمشاريع الصغيرة
          للوصول إلى عملاء يبحثون عن منتجات وأسعار وعروض داخل BPS Chat.
        </p>

        <div className="actions">
          <Link href="/advertise" className="primaryBtn">
            🚀 أعلن معنا الآن
          </Link>

          <Link href="/customer-offers/add" className="secondaryBtn">
            + أضف منتجك مجانًا
          </Link>

          <Link href="/customer-offers" className="darkBtn">
            🛍️ تصفح المتجر
          </Link>
        </div>
      </section>

      <section className="intro">
        <h2>لماذا هذه الصفحات مهمة للتاجر؟</h2>
        <p>
          صاحب المتجر لا يحتاج فقط إلى إعلان عشوائي، بل يحتاج إلى الظهور في
          مكان يبحث فيه العميل عن المنتج والسعر والمقارنة. BPS Chat يساعد
          التاجر على الوصول إلى مستخدمين لديهم نية شراء أعلى من مجرد تصفح
          السوشيال ميديا.
        </p>
      </section>

      <section className="grid">
        {advertiserPages.map((page) => (
          <Link
            href={`/advertisers/${page.slug}`}
            className="card"
            key={page.slug}
          >
            <span>دليل للمعلنين</span>
            <h2>{page.title}</h2>
            <p>{page.desc}</p>
            <small>افتح الصفحة ←</small>
          </Link>
        ))}
      </section>

      <section className="cta">
        <h2>ابدأ الآن بدون تعقيد</h2>
        <p>
          يمكنك الإعلان عن متجرك مباشرة أو إضافة أول منتج داخل BPS Market
          ليظهر ضمن عروض العملاء وصفحات المنتجات والروابط الداخلية.
        </p>

        <div className="actions">
          <Link href="/advertise" className="primaryBtn">
            🚀 اختر باقة إعلان
          </Link>

          <Link href="/customer-offers/add" className="secondaryBlue">
            + أضف منتجك
          </Link>
        </div>
      </section>

      <SearchBeforeBuyBanner />
      <PopularSearches />
      <InternalLinksBoost />

      <style>{`
        .advertisersPage {
          min-height: 100vh;
          background: #f8fafc;
        }

        .hero {
          max-width: 1150px;
          margin: 30px auto;
          padding: 50px 24px;
          text-align: center;
          border-radius: 34px;
          color: white;
          background:
            radial-gradient(circle at 20% 20%, rgba(34,197,94,0.25), transparent 35%),
            radial-gradient(circle at 80% 10%, rgba(37,99,235,0.24), transparent 35%),
            linear-gradient(135deg, #0f172a, #1d4ed8);
          box-shadow: 0 24px 60px rgba(15,23,42,0.18);
        }

        .hero span {
          color: #86efac;
          font-weight: 950;
        }

        .hero h1 {
          font-size: clamp(34px, 6vw, 62px);
          line-height: 1.3;
          margin: 14px 0;
          font-weight: 950;
        }

        .hero p,
        .intro p,
        .cta p {
          max-width: 850px;
          margin: 14px auto;
          line-height: 2.1;
          font-size: 17px;
        }

        .hero p {
          color: #dbeafe;
        }

        .actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        .primaryBtn,
        .secondaryBtn,
        .darkBtn,
        .secondaryBlue {
          text-decoration: none;
          padding: 15px 24px;
          border-radius: 18px;
          font-weight: 950;
          transition: all .25s ease;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          box-shadow: 0 14px 34px rgba(34,197,94,0.34);
        }

        .secondaryBtn {
          background: rgba(255,255,255,0.14);
          color: white;
          border: 1px solid rgba(255,255,255,0.18);
        }

        .darkBtn {
          background: #111827;
          color: white;
        }

        .secondaryBlue {
          background: #1d4ed8;
          color: white;
        }

        .primaryBtn:hover,
        .secondaryBtn:hover,
        .darkBtn:hover,
        .secondaryBlue:hover {
          transform: translateY(-4px) scale(1.04);
        }

        .intro,
        .cta {
          max-width: 1100px;
          margin: 30px auto;
          padding: 30px 24px;
          border-radius: 30px;
          background: white;
          box-shadow: 0 18px 50px rgba(15,23,42,0.08);
          text-align: center;
        }

        .intro h2,
        .cta h2 {
          color: #111827;
          font-size: 34px;
          margin-top: 0;
        }

        .intro p,
        .cta p {
          color: #334155;
        }

        .grid {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          text-decoration: none;
          color: #111827;
          background: white;
          padding: 24px;
          border-radius: 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 16px 40px rgba(15,23,42,0.08);
          transition: all .25s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: #22c55e;
        }

        .card span {
          color: #16a34a;
          font-size: 13px;
          font-weight: 950;
        }

        .card h2 {
          font-size: 22px;
          line-height: 1.6;
          margin: 10px 0;
        }

        .card p {
          color: #64748b;
          line-height: 1.9;
        }

        .card small {
          color: #2563eb;
          font-weight: 950;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .hero,
          .intro,
          .cta {
            margin: 18px 12px;
          }
        }
      `}</style>
    </main>
  );
}