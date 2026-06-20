"use client";

import { useEffect, useState } from "react";

type Props = {
  country?: string;
};

const countryNames: any = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const currencies: any = {
  sa: "ريال",
  ae: "درهم",
  kw: "دينار",
  qa: "ريال",
  bh: "دينار",
  eg: "جنيه",
};

export default function HomeDailyDealsBanner({ country = "sa" }: Props) {
  const [deals, setDeals] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadDeals() {
      try {
        setLoaded(false);

        const res = await fetch(`/api/daily-deals/public?country=${country}`, {
          cache: "no-store",
        });

        const json = await res.json();

        setDeals(Array.isArray(json.deals) ? json.deals : []);
      } catch {
        setDeals([]);
      } finally {
        setLoaded(true);
      }
    }

    loadDeals();
  }, [country]);

  if (loaded && deals.length === 0) return null;

  const countryName = countryNames[country] || "دولتك";

  return (
    <section className="homeDailyDeals" dir="rtl">
      <div className="dailyDealsHero">
        <div>
          <span className="dailyBadge">🔥 عروض اليوم</span>

          <h2>خصومات يومية في {countryName}</h2>

          <p>
            عروض سريعة من المتاجر حسب دولة الزائر، قبل ما تخلص.
          </p>
        </div>

        <a href={`/daily-deals?country=${country}`}>
          مشاهدة كل العروض
        </a>
      </div>

      {!loaded && (
        <div className="dailyLoading">
          جاري تحميل عروض اليوم...
        </div>
      )}

      {loaded && deals.length > 0 && (
        <div className="dailyDealsTrack">
          {deals.map((deal) => (
            <a
              key={deal.id}
              href={`/daily-deals/${deal.id}`}
              className="dailyDealCard"
            >
              <div className="dealImage">
                {Number(deal.discount_percent || 0) > 0 && (
                  <b>
                    خصم {Math.round(Number(deal.discount_percent))}%
                  </b>
                )}

                <img
                  src={deal.image_url || "/logo-icon.png"}
                  alt={deal.title || "عرض اليوم"}
                />
              </div>

              <strong>{deal.title}</strong>

              <div className="priceLine">
                {deal.old_price ? (
                  <del>
                    {Number(deal.old_price).toLocaleString("en-US")}{" "}
                    {currencies[deal.country || country]}
                  </del>
                ) : null}

                <span>
                  {Number(deal.new_price || 0).toLocaleString("en-US")}{" "}
                  {currencies[deal.country || country]}
                </span>
              </div>

              <small>{deal.store_name || "BPS Deals"}</small>
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .homeDailyDeals {
          margin: 28px auto;
          max-width: 1320px;
          padding: 24px;
          border-radius: 34px;
          background:
            radial-gradient(circle at 10% 10%, rgba(249,115,22,.18), transparent 30%),
            linear-gradient(135deg, #fff7ed, #ffffff);
          border: 1px solid #fed7aa;
          box-shadow: 0 20px 55px rgba(15,23,42,.10);
          overflow: hidden;
        }

        .dailyDealsHero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .dailyBadge {
          display: inline-flex;
          padding: 8px 14px;
          border-radius: 999px;
          background: #ffedd5;
          color: #ea580c;
          font-weight: 950;
          margin-bottom: 8px;
        }

        .dailyDealsHero h2 {
          margin: 0;
          color: #111827;
          font-size: 30px;
          font-weight: 950;
        }

        .dailyDealsHero p {
          margin: 6px 0 0;
          color: #64748b;
          font-weight: 800;
        }

        .dailyDealsHero a {
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, #f97316, #ef4444);
          padding: 13px 20px;
          border-radius: 999px;
          font-weight: 950;
          white-space: nowrap;
        }

        .dailyLoading {
          padding: 22px;
          border-radius: 20px;
          background: white;
          color: #ea580c;
          font-weight: 950;
          text-align: center;
        }

        .dailyDealsTrack {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }

        .dailyDealCard {
          text-decoration: none;
          color: #111827;
          background: white;
          border: 1px solid #fed7aa;
          border-radius: 22px;
          padding: 10px;
          transition: .25s ease;
          box-shadow: 0 10px 26px rgba(15,23,42,.07);
        }

        .dailyDealCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 36px rgba(249,115,22,.18);
        }

        .dealImage {
          position: relative;
          height: 120px;
          border-radius: 16px;
          background: #fff7ed;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 9px;
          overflow: hidden;
        }

        .dealImage img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .dealImage b {
          position: absolute;
          top: 8px;
          right: 8px;
          background: linear-gradient(135deg, #ef4444, #f97316);
          color: white;
          border-radius: 999px;
          padding: 5px 8px;
          font-size: 10px;
          font-weight: 950;
          z-index: 2;
        }

        .dailyDealCard strong {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 38px;
          font-size: 12px;
          line-height: 1.55;
          font-weight: 950;
        }

        .priceLine {
          margin-top: 8px;
          display: grid;
          gap: 3px;
        }

        .priceLine del {
          color: #ef4444;
          font-size: 11px;
          font-weight: 900;
        }

        .priceLine span {
          color: #16a34a;
          font-size: 17px;
          font-weight: 950;
        }

        .dailyDealCard small {
          display: block;
          margin-top: 5px;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .dailyDealsTrack {
            display: flex;
            overflow-x: auto;
            padding-bottom: 8px;
          }

          .dailyDealCard {
            min-width: 155px;
          }

          .dailyDealsHero {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}