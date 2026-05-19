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

  return (
    <section className="popularSearches" dir="rtl">
      <div className="popularHeader">
        <h2>عمليات بحث شائعة</h2>
        <span>اسحب يمين وشمال</span>
      </div>

      <div className="popularSlider">
        {searches.slice(0, 200).map((item, index) => (
          <a key={index} href={`/search/${item.slug}`} className="popularItem">
            {item.query} - {item.country}
          </a>
        ))}
      </div>

      <style jsx>{`
        .popularSearches {
          margin: 45px auto 20px;
          max-width: 900px;
          padding: 0 14px;
          text-align: center;
        }

        .popularHeader {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .popularHeader h2 {
          font-size: 20px;
          margin: 0;
          color: #ececec;
        }

        .popularHeader span {
          font-size: 12px;
          color: #aaa;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 5px 9px;
          border-radius: 999px;
        }

        .popularSlider {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 12px 6px 18px;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: #10a37f #2f2f2f;
          white-space: nowrap;
        }

        .popularSlider::-webkit-scrollbar {
          height: 6px;
        }

        .popularSlider::-webkit-scrollbar-track {
          background: #2f2f2f;
          border-radius: 999px;
        }

        .popularSlider::-webkit-scrollbar-thumb {
          background: #10a37f;
          border-radius: 999px;
        }

        .popularItem {
          flex: 0 0 auto;
          max-width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          background: rgba(47, 47, 47, 0.9);
          border: 1px solid #444;
          color: #ececec;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
          transition: 0.2s ease;
        }

        .popularItem:hover {
          border-color: #10a37f;
          color: #10a37f;
          transform: translateY(-2px);
        }

        @media (max-width: 700px) {
          .popularSearches {
            margin-top: 32px;
          }

          .popularHeader {
            flex-direction: column;
            gap: 8px;
          }

          .popularItem {
            max-width: 210px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}