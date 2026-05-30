import Link from "next/link";
import { notFound } from "next/navigation";

import SeoSearchBar from "@/app/components/SeoSearchBar";
import InternalLinksBoost from "@/app/components/InternalLinksBoost";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import PopularSearches from "@/app/components/PopularSearches";

export const dynamic = "force-dynamic";

const pages: Record<string, any> = {
  "advertise-store-saudi": {
    title: "اعلن عن متجرك في السعودية",
    country: "السعودية",
    target: "أصحاب المتاجر في السعودية",
    productType: "المنتجات والعروض",
    keyword: "اعلن عن متجرك في السعودية",
  },
  "advertise-products-uae": {
    title: "اعلن عن منتجاتك في الإمارات",
    country: "الإمارات",
    target: "أصحاب المتاجر والمشاريع في الإمارات",
    productType: "المنتجات والخدمات",
    keyword: "اعلن عن منتجاتك في الإمارات",
  },
  "advertise-handmade-egypt": {
    title: "اعلن عن منتجات الهاند ميد في مصر",
    country: "مصر",
    target: "أصحاب الهاند ميد والمشاريع الصغيرة في مصر",
    productType: "منتجات الهاند ميد",
    keyword: "اعلن عن منتجات الهاند ميد",
  },
  "advertise-perfume-store-saudi": {
    title: "اعلن عن متجر عطور في السعودية",
    country: "السعودية",
    target: "أصحاب متاجر العطور في السعودية",
    productType: "العطور الرجالية والنسائية",
    keyword: "اعلن عن متجر عطور",
  },
  "advertise-mobile-store-saudi": {
    title: "اعلن عن متجر جوالات في السعودية",
    country: "السعودية",
    target: "أصحاب متاجر الجوالات والإكسسوارات",
    productType: "الجوالات والإكسسوارات",
    keyword: "اعلن عن متجر جوالات",
  },
  "increase-store-sales": {
    title: "كيف تزيد مبيعات متجرك أونلاين",
    country: "السعودية والخليج ومصر",
    target: "أصحاب المتاجر والمشاريع",
    productType: "كل أنواع المنتجات",
    keyword: "زيادة مبيعات المتجر",
  },
};

const relatedPages = Object.entries(pages).map(([slug, item]) => ({
  slug,
  title: item.title,
}));

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
const item = pages[slug];

  if (!item) {
    return {
      title: "دليل المعلنين | BPS Chat",
    };
  }

  return {
    title: `${item.title} | BPS Chat`,
    description: `${item.title} عبر BPS Chat. اعرض منتجاتك، أضف عروضك، ووصل لعملاء يبحثون عن الشراء.`,
    alternates: {
      canonical: `https://www.bpschat.com/advertisers/${slug}`,
    },
  };
}

export default async function AdvertiserLandingPage({ params }: any) {
  const { slug } = await params;
  const item = pages[slug];

  if (!item) return notFound();

  const related = relatedPages.filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <main className="advertiserPage" dir="rtl">
      <SeoSearchBar />

      <article className="article">
        <div className="badge">🚀 دليل BPS Chat للمعلنين والتجار</div>

        <h1>{item.title}</h1>

        <p className="lead">
          إذا كنت من {item.target} وتبحث عن طريقة لعرض {item.productType} أمام
          عملاء لديهم نية شراء حقيقية، فصفحات BPS Chat تساعدك على الظهور في
          مكان يبحث فيه المستخدم عن المنتجات والأسعار والعروض.
        </p>

        <div className="actions">
          <Link href="/advertise" className="primaryBtn">
            🚀 أعلن معنا الآن
          </Link>

          <Link href="/customer-offers/add" className="secondaryBtn">
            + أضف منتجك مجانًا
          </Link>

          <Link href="/customer-offers" className="darkBtn">
            🛍️ تصفح متجر العملاء
          </Link>
        </div>

        <h2>لماذا يحتاج التاجر إلى الظهور في BPS Chat؟</h2>

        <p>
          أغلب التجار يعتمدون على السوشيال ميديا فقط، لكن العميل على السوشيال
          غالبًا يتصفح بدون نية شراء واضحة. أما العميل الذي يبحث عن منتج أو
          سعر أو مقارنة فهو أقرب بكثير لاتخاذ قرار الشراء.
        </p>

        <p>
          لذلك عند ظهور متجرك أو منتجاتك داخل BPS Chat، فأنت لا تعرض إعلانك
          بشكل عشوائي، بل تظهر في بيئة مرتبطة بالشراء والبحث عن الأسعار
          والمقارنة بين المنتجات.
        </p>

        <h2>{item.keyword}: ما الذي يميز هذه الطريقة؟</h2>

        <p>
          الإعلان داخل موقع متخصص في البحث عن المنتجات يعطيك فرصة مختلفة عن
          الإعلان التقليدي. المستخدم هنا لا يرى إعلانًا منفصلًا عن اهتمامه، بل
          يرى منتجات وعروضًا مرتبطة بما يبحث عنه بالفعل.
        </p>

        <ul>
          <li>ظهور أمام زوار يبحثون عن منتجات وأسعار.</li>
          <li>إمكانية إضافة منتجاتك داخل BPS Market.</li>
          <li>روابط مباشرة للمتجر أو المنتج.</li>
          <li>صفحات SEO تساعد في ظهور المنتجات على جوجل.</li>
          <li>مناسب للمتاجر، المشاريع الصغيرة، والهاند ميد.</li>
        </ul>

        <h2>من يناسبه الإعلان في BPS Chat؟</h2>

        <p>
          يناسب BPS Chat أصحاب المتاجر الإلكترونية، صفحات إنستجرام، متاجر
          العطور، الجوالات، الإلكترونيات، الملابس، الإكسسوارات، ومنتجات الهاند
          ميد، وكل من يريد أن يعرض منتجاته في مكان مرتبط بالبحث والشراء.
        </p>

        <div className="features">
          <div>
            <strong>متاجر إلكترونية</strong>
            <span>اعرض روابط منتجاتك ومتجرك.</span>
          </div>

          <div>
            <strong>هاند ميد</strong>
            <span>اعرض منتجاتك أمام جمهور يبحث عن أفكار وشراء.</span>
          </div>

          <div>
            <strong>براندات صغيرة</strong>
            <span>ابدأ الظهور بدون ميزانية إعلانات ضخمة.</span>
          </div>
        </div>

        <h2>كيف تبدأ؟</h2>

        <p>
          يمكنك البدء بطريقتين: إما اختيار باقة إعلان من صفحة أعلن معنا، أو
          إضافة منتجك داخل متجر العملاء. الأفضل في البداية أن تضيف منتجًا
          واضحًا بصورة جيدة وسعر مباشر ورابط شراء، ثم تختبر التفاعل والزيارات.
        </p>

        <div className="steps">
          <div>
            <b>1</b>
            <h3>أضف منتجك</h3>
            <p>ارفع صورة واضحة، اكتب السعر، وضع رابط المنتج أو المتجر.</p>
          </div>

          <div>
            <b>2</b>
            <h3>اختر الدولة</h3>
            <p>حدد الدولة المناسبة لعملائك مثل السعودية أو الإمارات أو مصر.</p>
          </div>

          <div>
            <b>3</b>
            <h3>ابدأ الظهور</h3>
            <p>يظهر منتجك داخل BPS Market وصفحات الموقع الداخلية.</p>
          </div>
        </div>

        <h2>أسئلة شائعة للمعلنين والتجار</h2>

        <div className="faq">
          <h3>هل يمكنني إضافة منتج بدون إعلان مدفوع؟</h3>
          <p>نعم، يمكنك إضافة منتج داخل متجر العملاء كبداية.</p>

          <h3>هل الإعلان مناسب للمشاريع الصغيرة؟</h3>
          <p>نعم، خصوصًا لو لديك منتج واضح وسعر منافس وصور جيدة.</p>

          <h3>هل يمكن الإعلان حسب الدولة؟</h3>
          <p>نعم، يمكن استهداف دول مثل السعودية، الإمارات، الكويت، قطر، البحرين ومصر.</p>

          <h3>هل BPS Chat يضمن المبيعات؟</h3>
          <p>
            لا يمكن ضمان المبيعات، لكن الموقع يساعدك في زيادة الظهور أمام
            مستخدمين يبحثون عن المنتجات والأسعار.
          </p>

          <h3>ما الفرق بين الإعلان وإضافة منتج؟</h3>
          <p>
            إضافة المنتج تجعله يظهر في متجر العملاء، أما الإعلان فيمنحك ظهورًا
            أقوى في أماكن بارزة داخل الموقع.
          </p>
        </div>

        <section className="related">
          <h2>صفحات مفيدة للتجار</h2>

          <div>
            {related.map((page) => (
              <Link href={`/advertisers/${page.slug}`} key={page.slug}>
                {page.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="finalCta">
          <h2>ابدأ الآن واجعل منتجاتك تظهر في BPS Chat</h2>
          <p>
            لا تنتظر أن يصل العملاء إليك بالصدفة. اعرض منتجاتك في مكان يبحث
            فيه المستخدم عن الأسعار والمنتجات والمقارنات.
          </p>

          <div className="actions">
            <Link href="/advertise" className="primaryBtn">
              🚀 أعلن معنا
            </Link>

            <Link href="/customer-offers/add" className="secondaryBlue">
              + أضف منتجك
            </Link>
          </div>
        </section>

        <SearchBeforeBuyBanner />
      </article>

      <PopularSearches />
      <InternalLinksBoost />

      <style>{`
        .advertiserPage {
          min-height: 100vh;
          background: #f8fafc;
        }

        .article {
          max-width: 1060px;
          margin: 30px auto;
          padding: 30px;
          background: white;
          border-radius: 32px;
          box-shadow: 0 20px 55px rgba(15,23,42,0.08);
        }

        .badge {
          display: inline-flex;
          padding: 9px 15px;
          border-radius: 999px;
          background: #ecfdf5;
          color: #16a34a;
          font-weight: 950;
        }

        h1 {
          font-size: clamp(34px, 6vw, 60px);
          line-height: 1.35;
          margin: 18px 0;
          color: #111827;
        }

        h2 {
          margin-top: 36px;
          color: #111827;
          font-size: 31px;
        }

        h3 {
          color: #111827;
        }

        .lead,
        p,
        li {
          color: #334155;
          line-height: 2.1;
          font-size: 17px;
        }

        .lead {
          font-size: 19px;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin: 24px 0;
        }

        .primaryBtn,
        .secondaryBtn,
        .darkBtn,
        .secondaryBlue {
          text-decoration: none;
          padding: 14px 22px;
          border-radius: 17px;
          font-weight: 950;
          transition: all .25s ease;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          box-shadow: 0 14px 34px rgba(34,197,94,0.34);
        }

        .secondaryBtn {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
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

        .features,
        .steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin: 18px 0;
        }

        .features div,
        .steps div {
          padding: 18px;
          border-radius: 22px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .features strong {
          display: block;
          color: #16a34a;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .features span {
          color: #475569;
          line-height: 1.8;
        }

        .steps b {
          display: inline-flex;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #16a34a;
          color: white;
        }

        .faq {
          padding: 20px;
          border-radius: 22px;
          background: #f1f5f9;
        }

        .related {
          margin-top: 34px;
          padding: 22px;
          border-radius: 24px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .related div {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .related a {
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 999px;
          background: #ecfdf5;
          color: #166534;
          font-weight: 900;
          border: 1px solid #bbf7d0;
        }

        .finalCta {
          margin-top: 34px;
          padding: 28px;
          border-radius: 28px;
          color: white;
          background: linear-gradient(135deg, #0f172a, #1d4ed8);
        }

        .finalCta h2,
        .finalCta p {
          color: white;
        }

        @media (max-width: 900px) {
          .article {
            margin: 18px 12px;
            padding: 18px;
          }

          .features,
          .steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}