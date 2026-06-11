import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const revalidate = 43200;

const SITE_URL = "https://www.bpschat.com";

const countryNames: Record<string, string> = {
  all: "كل الدول",
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

async function getComparisons(country: string) {
  let query = supabaseAdmin
    .from("comparisons")
    .select(`
id,
slug,
title,
meta_description,
product1_name,
product2_name,
product1_image,
product2_image,
product1_price,
product2_price,
country,
created_at
`)
    .order("created_at", { ascending: false })
    .limit(100);

  if (country !== "all") {
    query = query.eq("country", country);
  }

  const { data, error } = await query;

  if (error) {
    console.error("COMPARISONS_PAGE_ERROR:", error.message);
    return [];
  }

  return data || [];
}

export const metadata = {
  title: "مقارنات المنتجات | BPS Chat",
  description:
    "تصفح أحدث مقارنات المنتجات على BPS Chat وقارن بين الأسعار والمواصفات قبل الشراء.",
  alternates: {
    canonical: `${SITE_URL}/comparisons`,
  },
};

export default async function ComparisonsPage({
  searchParams,
}: {
  searchParams?: Promise<{ country?: string }>;
}) {
  const params = await searchParams;
  const selectedCountry = params?.country || "all";
  const comparisons = await getComparisons(selectedCountry);

  return (
    <main className="comparisonsPage" dir="rtl">
      <section className="hero">
        <div className="badge">⚔️ مقارنات BPS Chat</div>

        <h1>مقارنات المنتجات</h1>

        <p>
          شوف أحدث مقارنات المنتجات بين الأسعار والمواصفات، واضغط على أي كارت
          لفتح صفحة المقارنة الكاملة.
        </p>
      </section>

      <div className="countryTabs">
        {Object.entries(countryNames).map(([code, name]) => (
          <Link
            key={code}
            href={code === "all" ? "/comparisons" : `/comparisons?country=${code}`}
            className={selectedCountry === code ? "active" : ""}
          >
            {name}
          </Link>
        ))}
      </div>

      {comparisons.length === 0 ? (
        <section className="emptyBox">
          لا توجد مقارنات لهذه الدولة حاليًا.
        </section>
      ) : (
        <section className="gridBox">
          {comparisons.map((item: any) => (
            <Link
              key={item.id}
              href={`/compare/${item.slug}`}
              className="comparisonCard"
            >
              <div className="cardTop">
                <span>{countryNames[item.country] || "مقارنة"}</span>
                <b>VS</b>
              </div>

              <div className="productsPreview">
                <div className="productBox">
                  <img
                    src={item.product1_image || "/logo-icon.png"}
                    alt={item.product1_name || "المنتج الأول"}
                  />

                  <span>{item.product1_name}</span>

                  {item.product1_price && (
                    <strong>{item.product1_price}</strong>
                  )}
                </div>

                <div className="vsCircle">VS</div>

                <div className="productBox">
                  <img
                    src={item.product2_image || "/logo-icon.png"}
                    alt={item.product2_name || "المنتج الثاني"}
                  />

                  <span>{item.product2_name}</span>

                  {item.product2_price && (
                    <strong>{item.product2_price}</strong>
                  )}
                </div>
              </div>

              <h2>{item.title}</h2>

              <p>{item.meta_description}</p>

              <button>افتح المقارنة</button>
            </Link>
          ))}
        </section>
      )}

      <style>{`
        .comparisonsPage {
          min-height: 100vh;
          padding: 40px 16px 80px;
          color: white;
          background:
            radial-gradient(circle at 18% 8%, rgba(34,197,94,.18), transparent 28%),
            radial-gradient(circle at 80% 18%, rgba(37,99,235,.20), transparent 30%),
            linear-gradient(180deg, #151515 0%, #202020 55%, #0f0f0f 100%);
        }

        .hero {
          max-width: 1050px;
          margin: 0 auto 24px;
          text-align: center;
          padding: 42px 20px;
          border-radius: 32px;
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.09);
          box-shadow: 0 25px 80px rgba(0,0,0,.35);
        }

        .badge {
          display: inline-block;
          margin-bottom: 14px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(34,197,94,.13);
          border: 1px solid rgba(34,197,94,.3);
          color: #bbf7d0;
          font-weight: 900;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 950;
          background: linear-gradient(135deg, #fff, #86efac, #60a5fa);
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero p {
          max-width: 760px;
          margin: 16px auto 0;
          color: #d1d5db;
          line-height: 1.9;
        }

        .countryTabs {
          max-width: 1050px;
          margin: 0 auto 26px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .countryTabs a {
          text-decoration: none;
          color: white;
          padding: 11px 18px;
          border-radius: 999px;
          font-weight: 900;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
        }

        .countryTabs a.active,
        .countryTabs a:hover {
          background: linear-gradient(135deg, #16a34a, #2563eb);
          border-color: rgba(34,197,94,.55);
        }

        .emptyBox {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          padding: 30px;
          border-radius: 24px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.1);
          color: #d1d5db;
          font-weight: 900;
        }

        .gridBox {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .comparisonCard {
          text-decoration: none;
          color: white;
          padding: 20px;
          border-radius: 26px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.11);
          box-shadow: 0 18px 55px rgba(0,0,0,.25);
          transition: .25s ease;
        }

        .comparisonCard:hover {
          transform: translateY(-6px);
          border-color: rgba(34,197,94,.55);
          box-shadow: 0 0 35px rgba(34,197,94,.18);
        }

        .cardTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .cardTop span {
          color: #bbf7d0;
          font-weight: 950;
        }

        .cardTop b {
          color: #86efac;
          font-size: 24px;
        }

        .productsPreview {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
        }

        .productBox {
          background: rgba(255,255,255,.06);
          border-radius: 18px;
          padding: 10px;
          text-align: center;
        }

        .productBox img {
          width: 100%;
          height: 140px;
          object-fit: contain;
          background: white;
          border-radius: 14px;
          padding: 8px;
          margin-bottom: 10px;
        }

        .productBox span {
          display: block;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 800;
        }

        .productBox strong {
          display: block;
          margin-top: 8px;
          color: #86efac;
          font-size: 18px;
        }

        .vsCircle {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: white;
          font-weight: 950;
          box-shadow: 0 0 25px rgba(34,197,94,.25);
        }

        .comparisonCard h2 {
          font-size: 20px;
          line-height: 1.6;
          margin: 0 0 10px;
        }

        .comparisonCard p {
          color: #d1d5db;
          line-height: 1.8;
          font-size: 14px;
          min-height: 75px;
        }

        .comparisonCard button {
          width: 100%;
          border: 0;
          cursor: pointer;
          color: white;
          padding: 13px;
          border-radius: 999px;
          font-weight: 950;
          background: linear-gradient(135deg, #16a34a, #2563eb);
        }

        @media (max-width: 950px) {
          .gridBox {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 620px) {
          .gridBox {
            grid-template-columns: 1fr;
          }

          .productsPreview {
            grid-template-columns: 1fr;
          }

          .vsCircle {
            margin: 0 auto;
          }
        }
      `}</style>
    </main>
  );
}