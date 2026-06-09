import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Link from "next/link";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

export const metadata: Metadata = {
  title: "مقارنة أسعار المنتجات في السعودية ومصر والإمارات | BPS Chat",
  description:
    "قارن أسعار المنتجات في السعودية، مصر، الإمارات، الكويت، قطر والبحرين عبر BPS Chat. صفحات مقارنة قوية تجمع نتائج البحث وعروض المتجر.",
  alternates: {
    canonical: `${SITE_URL}/compare`,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countries = [
  { code: "sa", name: "السعودية", flag: "🇸🇦" },
  { code: "eg", name: "مصر", flag: "🇪🇬" },
  { code: "ae", name: "الإمارات", flag: "🇦🇪" },
  { code: "kw", name: "الكويت", flag: "🇰🇼" },
  { code: "qa", name: "قطر", flag: "🇶🇦" },
  { code: "bh", name: "البحرين", flag: "🇧🇭" },
];

const baseComparisons = [
  { slug: "iphone", ar: "ايفون", icon: "📱" },
  { slug: "samsung", ar: "سامسونج", icon: "📱" },
  { slug: "xiaomi", ar: "شاومي", icon: "📱" },
  { slug: "laptop", ar: "لابتوب", icon: "💻" },
  { slug: "airpods", ar: "ايربودز", icon: "🎧" },
  { slug: "ps5", ar: "بلايستيشن 5", icon: "🎮" },
  { slug: "watch", ar: "ساعة ذكية", icon: "⌚" },
  { slug: "perfume", ar: "عطور", icon: "🌸" },
  { slug: "headphones", ar: "سماعات", icon: "🎧" },
  { slug: "camera", ar: "كاميرا", icon: "📷" },
];

function slugify(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

export default async function CompareHomePage() {
  const [{ data: searches }, { data: offers }] = await Promise.all([
    supabase
      .from("search_terms")
      .select("query, country, search_count, updated_at")
      .order("search_count", { ascending: false })
      .limit(120),

    supabase
      .from("customer_offers")
      .select("product_name, country, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(120),
  ]);

  const dynamicSearches =
    (searches || [])
      .filter((item: any) => item?.query && item?.country)
      .slice(0, 30) || [];

  const dynamicOffers =
    (offers || [])
      .filter((item: any) => item?.product_name && item?.country)
      .slice(0, 30) || [];

  return (
    <main className="compareHomePage" dir="rtl">
      <section className="hero">
        <div className="badge">🔥 BPS Chat Compare</div>

        <h1>
          مقارنة أسعار المنتجات
          <span>في السعودية ومصر والإمارات</span>
        </h1>

        <p>
          صفحة مقارنة قوية تجمع لك أفضل صفحات الأسعار حسب الدولة والمنتج.
          اختر المنتج والدولة وشاهد مقارنة بين نتائج بحث BPS Chat وعروض BPS
          Market في صفحة واحدة.
        </p>

        <div className="heroActions">
          <Link href="/compare/sa/iphone">مقارنة أسعار ايفون في السعودية</Link>
          <Link href="/compare/eg/samsung">مقارنة أسعار سامسونج في مصر</Link>
        </div>
      </section>

      <SearchBeforeBuyBanner />

      <section className="sectionBox">
        <div className="sectionHeader">
          <div>
            <h2>ابدأ المقارنة حسب الدولة</h2>
            <p>اختر الدولة ثم المنتج الذي تريد مقارنة سعره.</p>
          </div>
        </div>

        <div className="countryGrid">
          {countries.map((country) => (
            <div className="countryCard" key={country.code}>
              <div className="countryTitle">
                <span>{country.flag}</span>
                <h3>{country.name}</h3>
              </div>

              <div className="quickLinks">
                {baseComparisons.slice(0, 6).map((item) => (
                  <Link
                    key={`${country.code}-${item.slug}`}
                    href={`/compare/${country.code}/${item.slug}`}
                  >
                    {item.icon} {item.ar}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sectionBox darkBox">
        <div className="sectionHeader">
          <div>
            <h2>أشهر مقارنات الأسعار</h2>
            <p>صفحات جاهزة لكلمات عليها طلب شرائي قوي.</p>
          </div>
        </div>

        <div className="comparisonGrid">
          {countries.slice(0, 3).flatMap((country) =>
            baseComparisons.map((item) => (
              <Link
                key={`${country.code}-${item.slug}`}
                href={`/compare/${country.code}/${item.slug}`}
                className="comparisonCard"
              >
                <span>{item.icon}</span>
                <strong>
                  مقارنة أسعار {item.ar} في {country.name}
                </strong>
                <small>
                  نتائج بحث + عروض متجر BPS Chat
                </small>
              </Link>
            ))
          )}
        </div>
      </section>

      {dynamicSearches.length > 0 && (
        <section className="sectionBox">
          <div className="sectionHeader">
            <div>
              <h2>مقارنات من عمليات البحث داخل BPS Chat</h2>
              <p>روابط مبنية على كلمات بحث حقيقية من الموقع.</p>
            </div>
          </div>

          <div className="chipsGrid">
            {dynamicSearches.map((item: any, index: number) => {
              const country =
                countries.find((c) => c.code === item.country)?.name ||
                item.country;

              return (
                <Link
                  key={`${item.query}-${item.country}-${index}`}
                  href={`/compare/${item.country}/${slugify(item.query)}`}
                >
                  مقارنة أسعار {item.query} في {country}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {dynamicOffers.length > 0 && (
        <section className="sectionBox">
          <div className="sectionHeader">
            <div>
              <h2>مقارنات من منتجات BPS Market</h2>
              <p>صفحات مقارنة مبنية على أحدث المنتجات المضافة للمتجر.</p>
            </div>
          </div>

          <div className="chipsGrid">
            {dynamicOffers.map((item: any, index: number) => {
              const shortName = String(item.product_name || "")
                .split(" ")
                .slice(0, 5)
                .join(" ");

              const country =
                countries.find((c) => c.code === item.country)?.name ||
                item.country;

              return (
                <Link
                  key={`${item.product_name}-${item.country}-${index}`}
                  href={`/compare/${item.country}/${slugify(shortName)}`}
                >
                  مقارنة أسعار {shortName} في {country}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="seoText">
        <h2>لماذا تستخدم صفحة مقارنة الأسعار في BPS Chat؟</h2>

        <p>
          تساعدك صفحة مقارنة الأسعار في BPS Chat على الوصول بسرعة إلى أفضل
          العروض حسب الدولة والمنتج. بدل ما تبحث في أكثر من مكان، يمكنك فتح
          صفحة مقارنة واحدة تجمع نتائج البحث مع عروض المتجر، وتعرض لك أرخص
          الأسعار والمنتجات المتاحة.
        </p>

        <h2>مقارنة أسعار في السعودية ومصر والإمارات</h2>

        <p>
          يمكنك مقارنة أسعار ايفون، سامسونج، شاومي، لابتوب، سماعات، عطور،
          بلايستيشن، ساعات ذكية ومنتجات كثيرة في السعودية، مصر، الإمارات،
          الكويت، قطر والبحرين.
        </p>
      </section>

      <style>{`
        .compareHomePage {
          min-height: 100vh;
          background: linear-gradient(180deg, #f4f7fb 0%, #eef2f7 100%);
          color: #111827;
          padding-bottom: 70px;
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 65px 18px 30px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          padding: 9px 16px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-weight: 950;
          margin-bottom: 18px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 950;
          line-height: 1.35;
        }

        .hero h1 span {
          display: block;
          color: #2563eb;
        }

        .hero p {
          max-width: 820px;
          margin: 18px auto 0;
          color: #475569;
          line-height: 2;
          font-size: 17px;
          font-weight: 800;
        }

        .heroActions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-top: 25px;
        }

        .heroActions a {
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          padding: 14px 20px;
          border-radius: 16px;
          font-weight: 950;
          box-shadow: 0 14px 30px rgba(37,99,235,.22);
        }

        .sectionBox,
        .seoText {
          max-width: 1180px;
          margin: 24px auto 0;
          padding: 24px;
          border-radius: 30px;
          background: white;
          border: 1px solid #dbeafe;
          box-shadow: 0 16px 40px rgba(15,23,42,.08);
        }

        .darkBox {
          background:
            radial-gradient(circle at top right, rgba(34,197,94,.13), transparent 30%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }

        .sectionHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .sectionHeader h2,
        .seoText h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
        }

        .sectionHeader p,
        .seoText p {
          margin: 7px 0 0;
          color: #64748b;
          line-height: 2;
          font-weight: 800;
        }

        .darkBox .sectionHeader p {
          color: #cbd5e1;
        }

        .countryGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .countryCard {
          padding: 20px;
          border-radius: 24px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .countryTitle {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .countryTitle span {
          font-size: 34px;
        }

        .countryTitle h3 {
          margin: 0;
          font-size: 21px;
          font-weight: 950;
        }

        .quickLinks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .quickLinks a,
        .chipsGrid a {
          text-decoration: none;
          color: #111827;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 11px 13px;
          border-radius: 14px;
          font-weight: 900;
          transition: .25s;
        }

        .quickLinks a:hover,
        .chipsGrid a:hover {
          transform: translateY(-3px);
          border-color: #22c55e;
          box-shadow: 0 12px 25px rgba(34,197,94,.14);
        }

        .comparisonGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .comparisonCard {
          text-decoration: none;
          color: white;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          transition: .25s;
        }

        .comparisonCard:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,.13);
        }

        .comparisonCard span {
          font-size: 28px;
          display: block;
          margin-bottom: 10px;
        }

        .comparisonCard strong {
          display: block;
          font-size: 16px;
          line-height: 1.7;
        }

        .comparisonCard small {
          display: block;
          margin-top: 8px;
          color: #cbd5e1;
          font-weight: 800;
        }

        .chipsGrid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .seoText {
          line-height: 2;
        }

        .seoText p {
          font-size: 16px;
        }

        @media (max-width: 900px) {
          .countryGrid,
          .comparisonGrid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .hero {
            padding-top: 45px;
          }

          .countryGrid,
          .comparisonGrid {
            grid-template-columns: 1fr;
          }

          .quickLinks {
            grid-template-columns: 1fr;
          }

          .sectionBox,
          .seoText {
            margin: 18px 12px 0;
            padding: 18px;
            border-radius: 24px;
          }

          .heroActions a {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}