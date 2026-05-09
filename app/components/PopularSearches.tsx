"use client";

import { useEffect, useState } from "react";

export default function PopularSearches() {
  const [searches, setSearches] = useState<any[]>([]);

  useEffect(() => {
    async function loadPopularSearches() {
      try {
        const res = await fetch("/api/popular-searches");
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
    <section className="popularSearches">
      <h2>عمليات بحث شائعة</h2>

      <div className="popularGrid">
        {searches.map((item, index) => (
          <a
            key={index}
            href={`/search/${item.slug}`}
            className="popularItem"
          >
            {item.query} - {item.country}
          </a>
        ))}
      </div>

      <style jsx>{`
        .popularSearches {
          margin: 50px auto 20px;
          max-width: 900px;
          text-align: center;
        }

        .popularSearches h2 {
          font-size: 20px;
          margin-bottom: 18px;
          color: #ececec;
        }

        .popularGrid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .popularItem {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #ececec;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
        }

        .popularItem:hover {
          border-color: #10a37f;
          color: #10a37f;
        }
      `}</style>
    </section>
  );
}