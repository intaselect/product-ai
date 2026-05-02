"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim() === "" ? "*" : query,
        }),
      });

      const data = await res.json();

      console.log("API RESULT:", data);

      setResults(data.value || []);
    } catch (err) {
      console.error("Search error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="page">

      {/* 🌊 Waves Background */}
      <div className="wave"></div>
      <div className="wave"></div>

      <div className="container">

        <h1 className="title">Product Search</h1>

        {/* Search Box */}
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

        {/* Results */}
        <div className="results">
          {!loading && results.length === 0 && (
            <p className="empty">لا توجد نتائج</p>
          )}

          {results.map((item, i) => {
            const data = item as any;

            return (
              <div key={i} className="card">

                <img
                  src={data.image}
                  className="image"
                />

                <div className="info">
                  <div className="name">
                    {data.title || data.name || "No title"}
                  </div>

                  <div className="price">
                    💰 {data.price ? `${data.price} SAR` : "No price"}
                  </div>

                  <div className="store">
                    🏬 {data.store || "Unknown store"}
                  </div>

                  <a href={data.url || "#"} target="_blank" className="link">
                    عرض المنتج
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* CSS */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #d7f0ff, #ffffff);
          overflow: hidden;
        }

        .container {
          position: relative;
          z-index: 2;
          padding: 30px;
          max-width: 900px;
          margin: auto;
        }

        .title {
          text-align: center;
          font-size: 32px;
          margin-bottom: 25px;
        }

        .searchBox {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 25px;
        }

        .input {
          padding: 10px;
          width: 260px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
        }

        .button {
          padding: 10px 15px;
          border: none;
          border-radius: 8px;
          background: #00aaff;
          color: white;
          cursor: pointer;
        }

        .results {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .empty {
          text-align: center;
          color: #666;
        }

        .card {
          display: flex;
          gap: 15px;
          padding: 15px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.4);
        }

        .image {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 10px;
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .name {
          font-weight: bold;
          font-size: 16px;
        }

        .price {
          color: #333;
        }

        .store {
          font-size: 14px;
          color: #555;
        }

        .link {
          margin-top: 5px;
          color: #0077ff;
          text-decoration: none;
        }

        /* 🌊 Waves */
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 220px;
          background: rgba(0, 170, 255, 0.15);
          border-radius: 40%;
          animation: waveMove 10s linear infinite;
        }

        .wave:nth-child(1) {
          opacity: 0.25;
        }

        .wave:nth-child(2) {
          animation-delay: -5s;
          opacity: 0.35;
        }

        @keyframes waveMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </div>
  );
}