import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const revalidate = 43200;

const SITE_URL = "https://www.bpschat.com";

async function getComparisons() {
  const { data, error } = await supabaseAdmin
    .from("comparisons")
    .select("id, slug, title, meta_description, product1_name, product2_name, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

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

export default async function ComparisonsPage() {
  const comparisons = await getComparisons();

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

      <section className="gridBox">
        {comparisons.map((item: any) => (
          <Link
            key={item.id}
            href={`/compare/${item.slug}`}
            className="comparisonCard"
          >
            <div className="cardTop">
              <span>مقارنة</span>
              <b>VS</b>
            </div>

            <div className="productsLine">
              <div>{item.product1_name}</div>
              <strong>ضد</strong>
              <div>{item.product2_name}</div>
            </div>

            <h2>{item.title}</h2>

            <p>{item.meta_description}</p>

            <button>افتح المقارنة</button>
          </Link>
        ))}
      </section>

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
          margin: 0 auto 28px;
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

        .productsLine {
          display: grid;
          gap: 10px;
          margin-bottom: 16px;
        }

        .productsLine div {
          padding: 12px;
          border-radius: 16px;
          background: rgba(255,255,255,.07);
          line-height: 1.6;
          font-weight: 850;
        }

        .productsLine strong {
          text-align: center;
          color: #86efac;
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
        }
      `}</style>
    </main>
  );
}