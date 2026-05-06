"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("sa");

  // 🔥 Ads (تقدر تغيرهم بعد كده)
  const ads = [
    {
      title: "🔥 iPhone 15 عرض خاص",
      image: "https://via.placeholder.com/300x200",
      url: "https://example.com",
    },
    {
      title: "خصم 30% على اللابتوبات",
      image: "https://via.placeholder.com/300x200",
      url: "https://example.com",
    },
    {
      title: "أفضل سماعات 2026",
      image: "https://via.placeholder.com/300x200",
      url: "https://example.com",
    },
  ];

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
          <h1 className="title">best Product Search chat V:1.0.9</h1>
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
          max-width: 900px;
          margin: auto;
          padding: 40px 16px;
        }

        .hero {
          text-align: center;
        }

        .badge {
          background: #2f2f2f;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #aaa;
        }

        .title {
          font-size: 32px;
          margin: 10px 0;
        }

        .subtitle {
          color: #aaa;
        }

        /* 🔥 Ads */
        .adsWrapper {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .adCard {
          min-width: 200px;
          background: #2f2f2f;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: white;
        }

        .adImage {
          width: 100%;
          height: 100px;
          object-fit: cover;
        }

        .adInfo {
          padding: 10px;
        }

        .adTitle {
          font-size: 14px;
          margin-bottom: 4px;
        }

        .adTag {
          font-size: 12px;
          color: #10a37f;
        }

        .composer {
          position: sticky;
          top: 0;
          background: #212121;
          padding: 10px 0;
        }

        .select {
          display: block;
          margin: auto;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 10px;
          background: #2f2f2f;
          color: white;
        }

        .searchBox {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .input {
          padding: 12px;
          border-radius: 12px;
          background: #2f2f2f;
          border: 1px solid #444;
          color: white;
          width: 60%;
        }

        .button {
          background: #10a37f;
          border: none;
          padding: 12px;
          border-radius: 12px;
          color: white;
        }

        .results {
          margin-top: 20px;
        }

        .card {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: #2f2f2f;
          border-radius: 12px;
          margin-bottom: 10px;
        }

        .image {
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }

        .name {
          font-weight: bold;
        }

        .meta {
          font-size: 14px;
        }

        .link {
          color: #10a37f;
        }

        .loadingCard {
          text-align: center;
        }

        .empty {
          text-align: center;
        }
      `}</style>
    </div>
  );
}