import Link from "next/link";

import SeoSearchBar from "@/app/components/SeoSearchBar";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import PopularSearches from "@/app/components/PopularSearches";
import InternalLinksBoost from "@/app/components/InternalLinksBoost";

export const metadata = {
  title: "بتبيع على إنستجرام أو تيك توك؟ اعرض منتجاتك مجانًا | BPS Chat",
  description:
    "إذا كنت تبيع على إنستجرام أو تيك توك أو واتساب أو فيسبوك، يمكنك عرض منتجاتك مجانًا على BPS Chat والوصول إلى عملاء يبحثون عن الشراء.",
};

export default function SellOnlinePage() {
  return (
    <main className="sellPage" dir="rtl">
      <SeoSearchBar />

      <section className="hero">
        <span>🚀 منصة مجانية للبائعين</span>

        <h1>
          بتبيع على إنستجرام أو تيك توك أو واتساب؟
          <br />
          اعرض منتجاتك مجانًا على BPS Chat
        </h1>

        <p>
          إذا كنت تبيع منتجاتك عبر السوشيال ميديا فقط، فهناك فرصة إضافية للوصول
          إلى عملاء يبحثون بالفعل عن الشراء والأسعار والعروض داخل BPS Chat.
        </p>

        <div className="actions">
          <Link href="/customer-offers/add" className="primaryBtn">
            + أضف منتجك مجانًا
          </Link>

          <Link href="/advertise" className="secondaryBtn">
            🚀 أعلن معنا
          </Link>

          <Link href="/customer-offers" className="darkBtn">
            🛍️ تصفح المتجر
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>هل تواجه هذه المشاكل؟</h2>

        <div className="grid">
          <div className="card">
            <h3>📉 مشاهدات كثيرة ومبيعات قليلة</h3>
            <p>
              يحصل كثيرًا أن يشاهد العملاء المنشورات لكن لا يتحولون إلى مشترين.
            </p>
          </div>

          <div className="card">
            <h3>💬 رسائل كثيرة بدون شراء</h3>
            <p>
              يسأل العميل عن السعر ثم يختفي دون إتمام عملية الشراء.
            </p>
          </div>

          <div className="card">
            <h3>🔍 لا تظهر في جوجل</h3>
            <p>
              أغلب صفحات السوشيال ميديا لا تحصل على زيارات من نتائج البحث.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>كيف يساعدك BPS Chat؟</h2>

        <div className="grid">
          <div className="card">
            <h3>🛒 عرض المنتجات</h3>
            <p>
              أضف صور منتجاتك وأسعارها وروابطها في متجر العملاء.
            </p>
          </div>

          <div className="card">
            <h3>🌍 الوصول لدول متعددة</h3>
            <p>
              السعودية، الإمارات، الكويت، قطر، البحرين ومصر.
            </p>
          </div>

          <div className="card">
            <h3>📈 ظهور إضافي</h3>
            <p>
              منتجاتك تظهر داخل صفحات BPS Chat والروابط الداخلية للموقع.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>هل تبيع منتجات هاند ميد؟</h2>

        <p>
          إذا كنت تصنع أو تبيع:
        </p>

        <div className="tags">
          <span>كروشيه</span>
          <span>شموع</span>
          <span>ريزن</span>
          <span>إكسسوارات</span>
          <span>هدايا</span>
          <span>منتجات منزلية</span>
          <span>عطور</span>
          <span>منتجات يدوية</span>
        </div>

        <p>
          يمكنك إضافة منتجاتك مجانًا والبدء في عرضها داخل BPS Chat.
        </p>
      </section>

      <section className="section">
        <h2>هل لديك متجر إلكتروني؟</h2>

        <div className="tags">
          <span>سلة</span>
          <span>زد</span>
          <span>Shopify</span>
          <span>WooCommerce</span>
          <span>متجر خاص</span>
        </div>

        <p>
          اربط منتجاتك بمتجرك واجعل العملاء يصلون إليها بسهولة.
        </p>
      </section>

      <section className="cta">
        <h2>ابدأ خلال دقيقة واحدة</h2>

        <p>
          أضف منتجك الآن وابدأ في عرض منتجاتك أمام مستخدمين يبحثون عن الشراء.
        </p>

        <div className="actions">
          <Link href="/customer-offers/add" className="primaryBtn">
            + أضف منتجك الآن
          </Link>

          <Link href="/advertisers" className="secondaryBtn">
            🚀 دليل التجار
          </Link>
        </div>
      </section>

      <SearchBeforeBuyBanner />
      <PopularSearches />
      <InternalLinksBoost />

      <style>{`
        .sellPage{
          min-height:100vh;
          background:#f8fafc;
        }

        .hero,.section,.cta{
          max-width:1100px;
          margin:24px auto;
          padding:32px;
          border-radius:28px;
          background:white;
          box-shadow:0 18px 50px rgba(15,23,42,.08);
        }

        .hero{
          text-align:center;
          background:
            radial-gradient(circle at top, rgba(34,197,94,.15), transparent 35%),
            white;
        }

        .hero span{
          color:#16a34a;
          font-weight:900;
        }

        .hero h1{
          font-size:clamp(34px,6vw,60px);
          line-height:1.3;
          margin:16px 0;
        }

        .hero p,
        .section p,
        .cta p{
          color:#475569;
          line-height:2;
        }

        .actions{
          display:flex;
          gap:12px;
          justify-content:center;
          flex-wrap:wrap;
          margin-top:20px;
        }

        .primaryBtn,
        .secondaryBtn,
        .darkBtn{
          text-decoration:none;
          padding:14px 22px;
          border-radius:16px;
          font-weight:900;
        }

        .primaryBtn{
          background:#16a34a;
          color:white;
        }

        .secondaryBtn{
          background:#1d4ed8;
          color:white;
        }

        .darkBtn{
          background:#111827;
          color:white;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:16px;
        }

        .card{
          padding:20px;
          border-radius:20px;
          background:#f8fafc;
          border:1px solid #e5e7eb;
        }

        .tags{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          margin:20px 0;
        }

        .tags span{
          background:#ecfdf5;
          color:#166534;
          padding:10px 14px;
          border-radius:999px;
          font-weight:800;
        }

        .cta{
          text-align:center;
          background:
            linear-gradient(135deg,#0f172a,#1d4ed8);
          color:white;
        }

        .cta h2,
        .cta p{
          color:white;
        }

        @media(max-width:900px){
          .grid{
            grid-template-columns:1fr;
          }

          .hero,
          .section,
          .cta{
            margin:14px;
            padding:22px;
          }
        }
      `}</style>
    </main>
  );
}