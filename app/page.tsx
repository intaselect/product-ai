"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("sa");
  const [menuOpen, setMenuOpen] = useState(false);
const useMainLogo = true;
  // 🔥 Ads حسب الدولة
  const adsByCountry: any = {
    sa: [
      {
        title: "🔥 عروض السعودية",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/sa",
      },
      {
        title: "خصم السعودية على الإلكترونيات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/sa-electronics",
      },
      {
        title: "أفضل منتجات السعودية",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/sa-products",
      },
    ],
    ae: [
      {
        title: "🔥 عروض الإمارات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/ae",
      },
      {
        title: "خصم الإمارات على اللابتوبات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/ae-laptops",
      },
      {
        title: "أفضل منتجات الإمارات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/ae-products",
      },
    ],
    kw: [
      {
        title: "🔥 عروض الكويت",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/kw",
      },
      {
        title: "خصم الكويت على الموبايلات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/kw-mobiles",
      },
      {
        title: "أفضل منتجات الكويت",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/kw-products",
      },
    ],
    qa: [
      {
        title: "🔥 عروض قطر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/qa",
      },
      {
        title: "خصم قطر على الإلكترونيات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/qa-electronics",
      },
      {
        title: "أفضل منتجات قطر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/qa-products",
      },
    ],
    bh: [
      {
        title: "🔥 عروض البحرين",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/bh",
      },
      {
        title: "خصم البحرين على الموبايلات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/bh-mobiles",
      },
      {
        title: "أفضل منتجات البحرين",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/bh-products",
      },
    ],
    eg: [
      {
        title: "🔥 عروض مصر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/eg",
      },
      {
        title: "خصم مصر على اللابتوبات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/eg-laptops",
      },
      {
        title: "أفضل منتجات مصر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/eg-products",
      },
    ],
  };

  const ads = adsByCountry[country] || [];

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
      <button className="menuButton" onClick={() => setMenuOpen(true)}>
  ☰
</button>

{menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

<aside className={`sidebar ${menuOpen ? "open" : ""}`}>
  <div className="sidebarHeader">
    <strong>BPS Chat</strong>
    <button className="closeButton" onClick={() => setMenuOpen(false)}>
      ×
    </button>
  </div>

  <a href="/login" className="menuItem">تسجيل الدخول</a>
<a href="/advertise" className="menuItem">أعلن معنا</a>
<a href="/about" className="menuItem">عن الموقع</a>
<a href="/contact" className="menuItem">تواصل معنا</a>
</aside>
      <main className="container">
       <section className="hero">
  
  <div className="badge">Product Search AI</div>
  <h1 className="titleWithLogo">
  <img src="/logo-icon.png" className="inlineLogo leftLogo" />
  <span className="typingText">
    best Product Search chat V:1.1.6
  </span>
  <img src="/logo-icon.png" className="inlineLogo rightLogo" />
</h1>
  <p className="subtitle">ابحث عن المنتجات حسب الدولة</p>
</section>

        {/* 🔥 Ads Slider */}
        <div className="adsWrapper">
          {ads.map((ad: any, i: number) => (
            <a
              key={i}
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="adCard"
            >
              <img src={ad.image} className="adImage" alt={ad.title} />
              <div className="adInfo">
                <div className="adTitle">{ad.title}</div>
                <div className="adTag">إعلان</div>
              </div>
            </a>
          ))}
        </div>

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

/* 🔥 Title */
.titleWithLogo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  margin: 10px 0;
}
  /* ✍️ Typing (مظبوط من غير ما يبوّظ العرض) */
.typingText {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  
  padding-right: 5px;
  animation: typing 2.5s steps(30, end) forwards, blink 0.8s infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  50% { border-color: transparent }
}
/* 🤖 Logo base */
.inlineLogo {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

/* 👈 الشمال يهتز */
.leftLogo {
  animation: logoWave 2.5s ease-in-out infinite;
  transform-origin: bottom center;
}

/* 👉 اليمين حركة خفيفة مختلفة */
.rightLogo {
  animation: logoFloat 3s ease-in-out infinite;
}

/* 🔄 حركة الشمال */
@keyframes logoWave {
  0%, 100% { transform: rotate(0deg) translateY(0) }
  20% { transform: rotate(-8deg) translateY(-2px) }
  40% { transform: rotate(8deg) translateY(-2px) }
  60% { transform: rotate(-5deg) }
  80% { transform: rotate(5deg) }
}

/* 🔄 حركة اليمين */
@keyframes logoFloat {
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-4px) }
}



/* 📦 Container */
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

/* 🍔 Menu */
.menuButton {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 50;
  width: 42px;
  height: 42px;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  background: #2f2f2f;
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
}

.menuButton:hover {
  background: #383838;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 60;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 260px;
  height: 100vh;
  background: #171717;
  border-right: 1px solid #2f2f2f;
  z-index: 70;
  padding: 18px;
  transition: left 0.25s ease;
}

.sidebar.open {
  left: 0;
}

.sidebarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-bottom: 22px;
  font-size: 18px;
}

.closeButton {
  background: transparent;
  border: none;
  color: #ececec;
  font-size: 28px;
  cursor: pointer;
}

.menuItem {
  display: block;
  padding: 13px 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  color: #ececec;
  text-decoration: none;
}

.menuItem:hover {
  background: #2f2f2f;
}

/* 📱 Mobile */
@media (max-width: 600px) {
  .menuButton {
    top: 12px;
    left: 12px;
    width: 40px;
    height: 40px;
  }

  .sidebar {
    width: 82%;
    left: -85%;
  }

  .sidebar.open {
    left: 0;
  }
}

/* 🧾 Text */
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

/* 🔥 Composer */
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

/* 🔥 SEARCH (FINAL FIX) */
.searchBox {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 15px auto;
}

.input {
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

.input::placeholder {
  color: #9b9b9b;
}

.input:focus {
  border-color: #10a37f;
}

.button {
  height: 46px;
  background: #10a37f;
  border: none;
  padding: 0 18px;
  border-radius: 14px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.button:hover {
  background: #0e8f6e;
}

/* 📦 Results */
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