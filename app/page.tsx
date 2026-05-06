"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("sa");

  async function handleSearch() {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim() === "" ? "*" : query,
          country: country,
        }),
      });

      const data = await res.json();

      console.log("API RESULT:", data);

      setResults(data?.value || data?.products || data || []);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">best Product Search chat V:1.0.2</h1>

        <p className="subtitle">ابحث عن المنتجات حسب الدولة</p>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="select"
        >
          <option value="sa">السعودية</option>
          <option value="ae">الإمارات</option>
          <option value="kw">الكويت</option>
          <option value="qa">قطر</option>
          <option value="bh">البحرين</option>
          <option value="eg">مصر</option>
        </select>

        <div className="searchBox">
          <input
            placeholder="اكتب اسم المنتج..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="input"
          />

          <button onClick={handleSearch} className="button">
            {loading ? "جاري البحث..." : "بحث"}
          </button>
        </div>

        <div className="results">
          {!loading && results.length === 0 && (
            <p className="empty">لا توجد نتائج</p>
          )}

          {results.map((item, i) => {
            const data = item as any;

            return (
              <div key={i} className="card">
                <img src={data.image} className="image" />

                <div className="info">
                  <div className="name">
                    {data.title || data.name || "No title"}
                  </div>

                  <div className="price">
                    💰 {data.priceText || "No price"}
                  </div>

                  <div className="store">
                    🏬 {data.store || "Unknown store"}
                  </div>

                  <a
                    href={data.url || "#"}
                    target="_blank"
                    className="link"
                  >
                    عرض المنتج
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #212121;
          color: #ececec;
          overflow: hidden;
        }

        .container {
          padding: 40px 24px;
          max-width: 900px;
          margin: auto;
        }

        .title {
          text-align: center;
          font-size: 36px;
          margin-bottom: 8px;
          color: #ffffff;
          font-weight: 700;
        }

        .subtitle {
          text-align: center;
          color: #b4b4b4;
          margin-bottom: 24px;
        }

        .select {
          display: block;
          margin: 0 auto 14px auto;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #3a3a3a;
          background: #2f2f2f;
          color: #ececec;
          outline: none;
        }

        .searchBox {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .input {
          padding: 12px 14px;
          width: 300px;
          border-radius: 12px;
          border: 1px solid #3a3a3a;
          background: #2f2f2f;
          color: #ffffff;
          outline: none;
        }

        .input::placeholder {
          color: #9b9b9b;
        }

        .button {
          padding: 12px 18px;
          border: none;
          border-radius: 12px;
          background: #10a37f;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .button:hover {
          background: #0e8f6e;
        }

        .results {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .empty {
          text-align: center;
          color: #b4b4b4;
        }

        .card {
          display: flex;
          gap: 15px;
          padding: 15px;
          border-radius: 16px;
          background: #2f2f2f;
          border: 1px solid #3a3a3a;
        }

        .image {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 12px;
          background: #1f1f1f;
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .name {
          font-weight: bold;
          font-size: 16px;
          color: #ffffff;
        }

        .price {
          color: #ececec;
        }

        .store {
          font-size: 14px;
          color: #b4b4b4;
        }

        .link {
          margin-top: 5px;
          color: #10a37f;
          text-decoration: none;
          font-weight: 600;
        }

        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}