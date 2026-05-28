"use client";

import { useEffect, useState } from "react";

export default function PopularSearches() {
  const [searches, setSearches] = useState<any[]>([]);

  useEffect(() => {
    async function loadPopularSearches() {
      try {
        const res = await fetch("/api/popular-searches", { cache: "no-store" });
        const data = await res.json();
        setSearches(data.searches || []);
      } catch (err) {
        console.error("Popular searches fetch error:", err);
      }
    }

    loadPopularSearches();
  }, []);

  if (!searches.length) return null;

  const sliderItems = searches.slice(0, 80);

  return (
    <section className="popularSearches" dir="rtl">
      <div className="popularHeader">
        <div>
          <h2>🔥 عمليات بحث شائعة الآن</h2>
          <p>اكتشف المنتجات التي يبحث عنها العملاء على BPS Chat</p>
        </div>

        <span>يتحرك تلقائيًا</span>
      </div>

      <div className="popularSliderMask">
        <div className="popularSliderTrack">
          {[...sliderItems, ...sliderItems].map((item, index) => (
            <a
              key={`${item.slug}-${index}`}
              href={`/search/${item.slug}`}
              className="popularItem"
            >
              <b>🔎</b>
              <span>{item.query}</span>
              <small>{item.country}</small>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .popularSearches {
          max-width: 1320px;
          margin: 36px auto 24px;
          padding: 22px;
          overflow: hidden;
          border-radius: 32px;
          background:
            radial-gradient(circle at 12% 20%, rgba(34,197,94,0.16), transparent 30%),
            radial-gradient(circle at 88% 10%, rgba(37,99,235,0.14), transparent 28%),
            linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow:
            0 22px 55px rgba(15,23,42,0.10),
            0 0 0 6px rgba(34,197,94,0.035);
        }

        .popularHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .popularHeader h2 {
          margin: 0;
          color: #111827;
          font-size: 26px;
          font-weight: 950;
        }

        .popularHeader p {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 850;
        }

        .popularHeader span {
          white-space: nowrap;
          color: #ffffff;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          padding: 9px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 950;
          box-shadow: 0 10px 24px rgba(37,99,235,0.22);
        }

        .popularSliderMask {
          position: relative;
          overflow: hidden;
          padding: 4px 0 8px;
        }

        .popularSliderMask::before,
        .popularSliderMask::after {
          content: "";
          position: absolute;
          top: 0;
          width: 90px;
          height: 100%;
          z-index: 5;
          pointer-events: none;
        }

        .popularSliderMask::before {
          right: 0;
          background: linear-gradient(to left, #ffffff, transparent);
        }

        .popularSliderMask::after {
          left: 0;
          background: linear-gradient(to right, #ffffff, transparent);
        }

        .popularSliderTrack {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: popularAutoMove 55s linear infinite;
        }

        .popularSearches:hover .popularSliderTrack {
          animation-play-state: paused;
        }

        .popularItem {
          width: 235px;
          min-height: 82px;
          flex-shrink: 0;
          text-decoration: none;
          display: grid;
          grid-template-columns: 42px 1fr;
          column-gap: 10px;
          align-items: center;
          padding: 12px;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 22px rgba(15,23,42,0.06);
          transition: all .25s ease;
        }

        .popularItem b {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ecfdf5, #dbeafe);
          font-size: 20px;
        }

        .popularItem span {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #111827;
          font-size: 14px;
          font-weight: 950;
        }

        .popularItem small {
          grid-column: 2;
          margin-top: 5px;
          width: fit-content;
          color: #ffffff;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 950;
        }

        .popularItem:hover {
          transform: translateY(-6px) scale(1.03);
          border-color: rgba(34,197,94,0.45);
          box-shadow:
            0 18px 40px rgba(15,23,42,0.14),
            0 0 30px rgba(34,197,94,0.18);
        }

        @keyframes popularAutoMove {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(50%);
          }
        }

        @media (max-width: 700px) {
          .popularSearches {
            margin: 26px 12px 20px;
            padding: 16px;
            border-radius: 26px;
          }

          .popularHeader {
            flex-direction: column;
            align-items: flex-start;
          }

          .popularHeader h2 {
            font-size: 21px;
          }

          .popularHeader p {
            font-size: 13px;
          }

          .popularItem {
            width: 210px;
          }
        }
      `}</style>
    </section>
  );
}