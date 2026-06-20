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
        <div className="aiLimitNotice">
  <span className="aiLimitIcon">✦</span>
  <span>
    لحماية جودة النتائج، كل مستخدم له <strong>10 عمليات بحث جديدة يوميًا</strong>
    والنتائج الموجودة في الكاش متاحة بدون حد.
  </span>
</div>
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
    radial-gradient(circle at center, rgba(245,158,11,.12), transparent 38%),
    linear-gradient(180deg,#ffffff,#fffaf0);
          padding: 34px 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .seoSearchInner {
          max-width: 760px;
          margin: 0 auto;
        }
.aiLimitNotice {
  max-width: 620px;
  margin: 0 auto 14px;
  padding: 11px 14px;
  border-radius: 18px;
  color: #444;
  font-size: 14px;
  line-height: 1.8;
  text-align: center;
  background:
    linear-gradient(135deg, rgba(245,158,11,.10), rgba(251,191,36,.08)),
    #ffffff;
  border: 1px solid rgba(245,158,11,.25);
  box-shadow:
    0 10px 24px rgba(245,158,11,.08),
    inset 0 0 18px rgba(255,255,255,.8);
}

.aiLimitIcon {
  display: inline-flex;
  margin-left: 8px;
  color: #d97706;
  text-shadow: 0 0 8px rgba(245,158,11,.35);
  animation: aiLimitPulse 1.8s ease-in-out infinite;
}

.aiLimitNotice strong {
  color: #b45309;
}

@keyframes aiLimitPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.25); }
}
        .seoSelect {
          display: block;
          margin: 0 auto 14px;
          padding: 11px 18px;
          border-radius: 14px;
          background: #ffffff;
color: #111827;
border: 1px solid rgba(245,158,11,.25);
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
          background: #ffffff;
border: 1px solid rgba(245,158,11,.22);
color: #111827;
          outline: none;
          font-size: 15px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
        }

       .seoInput:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245,158,11,.15);
}

        .seoButton {
          height: 52px;
          border: none;
          padding: 0 26px;
          border-radius: 18px;
          color: white;
          font-weight: 800;
          cursor: pointer;
          background: linear-gradient(135deg,#f59e0b,#d97706);
box-shadow: 0 12px 34px rgba(245,158,11,.28);
          transition: 0.2s ease;
        }

       .seoButton:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg,#fbbf24,#b45309);
  box-shadow: 0 16px 42px rgba(245,158,11,.40);
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