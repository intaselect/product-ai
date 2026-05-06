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
      <main className="container">
        <section className="hero">
          <div className="badge">Product Search AI</div>
          <h1 className="title">best Product Search chat V:1.0.8</h1>
          <p className="subtitle">ابحث عن المنتجات حسب الدولة</p>
        </section>

        <section className="composer">
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

            <button onClick={handleSearch} className="button" disabled={loading}>
              {loading ? "..." : "بحث"}
            </button>
          </div>
        </section>

        <section className="results">
          {loading && (
            <div className="loadingCard">
              <div className="dot" />
              <span>جاري البحث عن أفضل النتائج...</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <p className="empty">ابدأ البحث أو جرّب اسم منتج آخر</p>
          )}

          {!loading &&
            results.map((item, i) => {
              const data = item as any;

              return (
                <article key={i} className="card">
                  <img
                    src={data.image}
                    className="image"
                    alt={data.title || data.name || "Product image"}
                  />

                  <div className="info">
                    <div className="name">
                      {data.title || data.name || "No title"}
                    </div>

                    <div className="meta">
                      <span>💰 {data.priceText || "No price"}</span>
                      <span>🏬 {data.store || "Unknown store"}</span>
                    </div>

                    <a
                      href={data.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      عرض المنتج ↗
                    </a>
                  </div>
                </article>
              );
            })}
        </section>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #212121;
          color: #ececec;
        }

        .container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 42px 18px 60px;
        }

        .hero {
          text-align: center;
          margin-bottom: 22px;
        }

        .badge {
          display: inline-flex;
          padding: 7px 12px;
          border: 1px solid #3a3a3a;
          border-radius: 999px;
          background: #2f2f2f;
          color: #b4b4b4;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .title {
          font-size: 36px;
          line-height: 1.15;
          margin: 0 0 10px;
          color: #ffffff;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: #b4b4b4;
          margin: 0;
          font-size: 15px;
        }

        .composer {
          position: sticky;
          top: 0;
          z-index: 10;
          padding: 14px 0 20px;
          background: linear-gradient(
            180deg,
            #212121 0%,
            #212121 75%,
            rgba(33, 33, 33, 0)
          );
        }

        .select {
          display: block;
          margin: 0 auto 12px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #3a3a3a;
          background: #2f2f2f;
          color: #ececec;
          outline: none;
          cursor: pointer;
        }

        .searchBox {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .input {
          width: min(520px, 100%);
          padding: 15px 16px;
          border-radius: 16px;
          border: 1px solid #3a3a3a;
          background: #2f2f2f;
          color: #ffffff;
          outline: none;
          font-size: 15px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
        }

        .input:focus {
          border-color: #565656;
          background: #303030;
        }

        .input::placeholder {
          color: #9b9b9b;
        }

        .button {
          min-width: 70px;
          padding: 0 18px;
          border: none;
          border-radius: 16px;
          background: #10a37f;
          color: white;
          cursor: pointer;
          font-weight: 700;
          font-size: 15px;
        }

        .button:hover {
          background: #0e8f6e;
        }

        .button:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .results {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 10px;
        }

        .empty,
        .loadingCard {
          text-align: center;
          color: #b4b4b4;
          padding: 26px 16px;
        }

        .loadingCard {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .dot {
          width: 9px;
          height: 9px;
          background: #10a37f;
          border-radius: 50%;
          animation: pulse 1s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        .card {
          display: flex;
          gap: 14px;
          padding: 14px;
          border-radius: 18px;
          background: #2f2f2f;
          border: 1px solid #3a3a3a;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .card:hover {
          background: #333333;
          border-color: #4a4a4a;
        }

        .image {
          width: 88px;
          height: 88px;
          object-fit: cover;
          border-radius: 14px;
          background: #1f1f1f;
          flex-shrink: 0;
        }

        .info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          justify-content: center;
        }

        .name {
          font-weight: 700;
          font-size: 16px;
          color: #ffffff;
          line-height: 1.45;
        }

        .meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 14px;
          color: #d7d7d7;
          font-size: 14px;
        }

        .link {
          color: #10a37f;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          width: fit-content;
        }

        .link:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .container {
            padding: 28px 12px 40px;
          }

          .title {
            font-size: 28px;
          }

          .searchBox {
            align-items: stretch;
          }

          .input {
            flex: 1;
            width: 100%;
          }

          .button {
            min-width: 64px;
          }

          .card {
            border-radius: 16px;
          }

          .image {
            width: 74px;
            height: 74px;
          }

          .name {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}