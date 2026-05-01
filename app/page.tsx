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
    <div style={{ padding: 20 }}>
      <h1>Product Search</h1>

      <div style={{ marginBottom: 15 }}>
        <input
          placeholder="اكتب اسم المنتج..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, marginRight: 10, width: 250 }}
        />

        <button onClick={handleSearch}>
          {loading ? "جاري البحث..." : "بحث"}
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {!loading && results.length === 0 && (
          <p>لا توجد نتائج</p>
        )}

        {results.map((item, i) => {
          const data = item as any;

          return (
            <div
              key={i}
              style={{
                marginBottom: 15,
                padding: 12,
                border: "1px solid #ccc",
                borderRadius: 8,
                display: "flex",
                gap: 15,
                alignItems: "center",
              }}
            >
              {/* صورة المنتج */}
              <img
  src={data.image}
  width={80}
  height={80}
  style={{ objectFit: "cover", borderRadius: 8 }}
/>
  
              {/* تفاصيل المنتج */}
              <div>
                <div style={{ fontWeight: "bold", fontSize: 16 }}>
                  {data.title || data.name || "No title"}
                </div>

                <div style={{ marginTop: 5 }}>
                  💰 {data.price ? `${data.price} SAR` : "No price"}
                </div>

                <div>
                  🏬 {data.store || "Unknown store"}
                </div>

                <a
                  href={data.url || "#"}
                  target="_blank"
                  style={{ display: "inline-block", marginTop: 5 }}
                >
                  عرض المنتج
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}