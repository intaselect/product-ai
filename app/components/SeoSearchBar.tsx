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
    <section className="seoSearch">
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

      <style jsx>{`
        .seoSearch {
          background: #212121;
          padding: 30px 16px 20px;
          border-bottom: 1px solid #333;
        }

        .seoSelect {
          display: block;
          margin: 0 auto 14px;
          padding: 10px;
          border-radius: 10px;
          background: #2f2f2f;
          color: white;
          border: 1px solid #444;
        }

        .seoSearchBox {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
        }

        .seoInput {
          flex: 1;
          height: 46px;
          padding: 0 14px;
          border-radius: 14px;
          background: #2f2f2f;
          border: 1px solid #444;
          color: white;
          outline: none;
          font-size: 14px;
        }

        .seoInput:focus {
          border-color: #10a37f;
        }

        .seoButton {
          height: 46px;
          background: #10a37f;
          border: none;
          padding: 0 20px;
          border-radius: 14px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .seoButton:hover {
          background: #0e8f6e;
        }
      `}</style>
    </section>
  );
}