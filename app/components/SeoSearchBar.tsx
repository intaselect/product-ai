"use client";

import { useState } from "react";

export default function SeoSearchBar() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("sa");

  function handleSearch() {
    const q = query.trim();

    if (!q) {
      window.location.href = "/";
      return;
    }

    window.location.href = `/?q=${encodeURIComponent(q)}&country=${country}`;
  }

  return (
    <section className="seoSearch" dir="rtl">
      <div className="seoSearchInner">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="seoSelect"
        >
          <option value="sa">السعودية</option>
          <option value="ae">الإمارات</option>
          <option value="kw">الكويت</option>
          <option value="qa">قطر</option>
          <option value="bh">البحرين</option>
          <option value="eg">مصر</option>
        </select>

        <div className="seoSearchBox">
          <input
            placeholder="اكتب اسم المنتج..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="seoInput"
          />

          <button onClick={handleSearch} className="seoButton">
            بحث
          </button>
        </div>
      </div>

      <style jsx>{`
        .seoSearch {
          background:
            radial-gradient(circle at center, rgba(16, 163, 127, 0.12), transparent 38%),
            #212121;
          padding: 34px 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .seoSearchInner {
          max-width: 760px;
          margin: 0 auto;
        }

        .seoSelect {
          display: block;
          margin: 0 auto 14px;
          padding: 11px 18px;
          border-radius: 14px;
          background: #2f2f2f;
          color: white;
          border: 1px solid rgba(255,255,255,0.14);
          outline: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }

        .seoSearchBox {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .seoInput {
          flex: 1;
          height: 52px;
          padding: 0 18px;
          border-radius: 18px;
          background: #2f2f2f;
          border: 1px solid rgba(255,255,255,0.14);
          color: white;
          outline: none;
          font-size: 15px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
        }

        .seoInput:focus {
          border-color: #10a37f;
          box-shadow: 0 0 0 4px rgba(16,163,127,0.14);
        }

        .seoButton {
          height: 52px;
          border: none;
          padding: 0 26px;
          border-radius: 18px;
          color: white;
          font-weight: 800;
          cursor: pointer;
          background: linear-gradient(135deg, #10a37f, #18d6a3);
          box-shadow: 0 12px 34px rgba(16,163,127,0.28);
          transition: 0.2s ease;
        }

        .seoButton:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 42px rgba(16,163,127,0.38);
        }

        @media (max-width: 640px) {
          .seoSearchBox {
            flex-direction: column;
          }

          .seoInput,
          .seoButton {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}