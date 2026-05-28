import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import MarketPromoSection from "@/app/components/MarketPromoSection";
import PopularSearches from "@/app/components/PopularSearches";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "المنتجات الأكثر بحثًا اليوم | تريند BPS Chat",
  description:
    "اكتشف أكثر المنتجات بحثًا اليوم في السعودية، الإمارات، الكويت، قطر، البحرين ومصر عبر BPS Chat بي بي اس شات.",
  keywords: [
    "المنتجات الأكثر بحثًا",
    "تريند المنتجات",
    "عروض اليوم",
    "أفضل سعر",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const flags: Record<string, string> = {
  sa: "🇸🇦",
  ae: "🇦🇪",
  kw: "🇰🇼",
  qa: "🇶🇦",
  bh: "🇧🇭",
  eg: "🇪🇬",
};

export default async function TrendingPage() {
  const { data } = await supabase
    .from("search_terms")
    .select("query, country, slug, search_count, updated_at")
    .order("search_count", { ascending: false })
    .order("updated_at", { ascending: false })
    .limit(80);

  const trends = data || [];

  const byCountry = Object.keys(countryNames).map((code) => ({
    code,
    name: countryNames[code],
    items: trends.filter((item: any) => item.country === code).slice(0, 10),
  }));

  return (
    <main className="trendingPage" dir="rtl">
      <SeoSearchBar />

      <section className="trendHero">
        <div className="trendBadge">🔥 BPS Chat Trends</div>

        <h1>
          المنتجات الأكثر بحثًا اليوم
          <span>اعرف الناس بتدور على إيه في كل دولة</span>
        </h1>

        <p>
          صفحة تريند BPS Chat تعرض أكثر المنتجات بحثًا داخل السعودية،
          الإمارات، الكويت، قطر، البحرين ومصر، مع روابط مباشرة لمقارنة الأسعار
          والعروض.
        </p>

        <div className="heroBtns">
          <Link href="/" className="primaryBtn">
            ابحث عن منتج
          </Link>
          <Link href="/customer-offers" className="secondaryBtn">
            تصفح عروض المتجر
          </Link>
        </div>
      </section>

      <MarketPromoSection />

      <section className="trendSection">
        <div className="sectionHead">
          <h2>🔥 الأكثر بحثًا الآن</h2>
          <p>Top searches across BPS Chat</p>
        </div>

        <div className="trendGrid">
          {trends.slice(0, 24).map((item: any, index: number) => (
            <Link href={`/search/${item.slug}`} className="trendCard" key={item.slug}>
              <div className="rank">#{index + 1}</div>
              <h3>{item.query}</h3>
              <p>
                {flags[item.country] || "🌍"} {countryNames[item.country] || item.country}
              </p>
              <span>{item.search_count || 0} عملية بحث</span>
            </Link>
          ))}
        </div>
      </section>

      {byCountry.map(
        (group) =>
          group.items.length > 0 && (
            <section className="countryTrend" key={group.code}>
              <div className="sectionHead">
                <h2>
                  {flags[group.code]} تريند {group.name}
                </h2>
                <p>أكثر المنتجات بحثًا في {group.name}</p>
              </div>

              <div className="chips">
                {group.items.map((item: any) => (
                  <Link href={`/search/${item.slug}`} key={item.slug}>
                    {item.query}
                    <small>{item.search_count || 0}</small>
                  </Link>
                ))}
              </div>
            </section>
          )
      )}

      <section className="seoBox">
        <h2>لماذا صفحة التريند مهمة؟</h2>
        <p>
          تساعدك صفحة المنتجات الأكثر بحثًا في معرفة ما يهتم به المستخدمون
          حاليًا، سواء كنت تبحث عن أفضل سعر، عروض اليوم، منتجات مشهورة، أو
          أفكار شراء داخل بلدك. يتم تحديث هذه الصفحة تلقائيًا حسب عمليات البحث
          داخل BPS Chat.
        </p>
      </section>

      <PopularSearches />

      <style>{`
        .trendingPage {
          min-height: 100vh;
          color: white;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
            #0b0f14;
          padding-bottom: 60px;
        }

        .trendHero {
          max-width: 1050px;
          margin: 0 auto;
          padding: 54px 18px 30px;
          text-align: center;
        }

        .trendBadge {
          display: inline-flex;
          padding: 8px 15px;
          border-radius: 999px;
          background: rgba(34,197,94,0.14);
          border: 1px solid rgba(34,197,94,0.35);
          color: #bbf7d0;
          font-size: 12px;
          font-weight: 950;
          margin-bottom: 14px;
        }

        .trendHero h1 {
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.2;
          margin: 0 0 16px;
          font-weight: 950;
        }

        .trendHero h1 span {
          display: block;
          font-size: clamp(18px, 2.4vw, 26px);
          color: #cbd5e1;
          margin-top: 10px;
        }

        .trendHero p {
          max-width: 850px;
          margin: 0 auto;
          color: #e5e7eb;
          line-height: 2;
          font-size: 17px;
        }

        .heroBtns {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 22px;
        }

        .primaryBtn,
        .secondaryBtn {
          text-decoration: none;
          padding: 13px 22px;
          border-radius: 15px;
          font-weight: 950;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: #fff;
        }

        .secondaryBtn {
          background: rgba(255,255,255,0.12);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.16);
        }

        .trendSection,
        .countryTrend,
        .seoBox {
          max-width: 1220px;
          margin: 28px auto;
          padding: 0 20px;
        }

        .sectionHead {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .sectionHead h2 {
          margin: 0;
          font-size: 28px;
          font-weight: 950;
          color: #fff;
        }

        .sectionHead p {
          margin: 4px 0 0;
          color: #94a3b8;
          font-weight: 800;
        }

        .trendGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .trendCard {
          position: relative;
          text-decoration: none;
          color: #111827;
          background: #fff;
          border-radius: 22px;
          padding: 18px;
          min-height: 150px;
          box-shadow: 0 14px 34px rgba(0,0,0,0.16);
          transition: all .25s ease;
          overflow: hidden;
        }

        .trendCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 48px rgba(0,0,0,0.24);
        }

        .rank {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);
          color: #fff;
          font-weight: 950;
          margin-bottom: 12px;
        }

        .trendCard h3 {
          margin: 0 0 10px;
          font-size: 17px;
          line-height: 1.6;
          font-weight: 950;
        }

        .trendCard p {
          margin: 0 0 10px;
          color: #64748b;
          font-weight: 850;
        }

        .trendCard span {
          display: inline-flex;
          background: #dcfce7;
          color: #166534;
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 950;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chips a {
          text-decoration: none;
          color: #111827;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 900;
          transition: all .25s ease;
        }

        .chips a:hover {
          color: #fff;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          transform: translateY(-2px);
        }

        .chips small {
          margin-right: 8px;
          color: #16a34a;
          font-weight: 950;
        }

        .chips a:hover small {
          color: #fff;
        }

        .seoBox {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 24px;
        }

        .seoBox h2 {
          margin: 0 0 10px;
          color: #22c55e;
        }

        .seoBox p {
          margin: 0;
          color: #e5e7eb;
          line-height: 2;
          font-size: 17px;
        }

        @media (max-width: 950px) {
          .trendGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sectionHead {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .trendGrid {
            grid-template-columns: 1fr;
          }

          .trendSection,
          .countryTrend,
          .seoBox {
            padding: 0 12px;
          }
        }
      `}</style>
    </main>
  );
}