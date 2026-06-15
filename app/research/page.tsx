"use client";

import { useEffect, useState } from "react";

function slugify(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getVisitorId() {
  let id = localStorage.getItem("bps_visitor_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("bps_visitor_id", id);
  }

  return id;
}

export default function ResearchHomePage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("sa");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bps_selected_country");
    if (saved) setCountry(saved);
  }, []);

  async function handleResearchSearch() {
    if (loading) return;

    const cleanQuery = query.trim();

    if (!cleanQuery) {
      setErrorMessage("اكتب اسم المنتج الأول");
      return;
    }

    setLoading(true);
    setErrorMessage("");

 try {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-bps-visitor-id": getVisitorId(),
    },
    body: JSON.stringify({
      query: cleanQuery,
      country,
      searchType: "research",
    }),
  });

  const data = await res.json();

  if (data.blocked) {
    setErrorMessage(data.message);
    setPaymentLink(data.paymentLink || "");
    setLoading(false);
    return;
  }

  const slug = `${slugify(cleanQuery)}-${country}`;
  window.location.href = `/research/${slug}`;
} catch {
      const slug = `${slugify(cleanQuery)}-${country}`;
      window.location.href = `/research/${slug}`;
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="researchPage" dir="rtl">
      <section className="researchHero">
        <div className="badge">📊 BPS Product Research</div>

        <h1>
          دراسات المنتجات ومقارنة الأسعار
          <span>ابحث عن منتج وشوف تحليل الأسعار والمتاجر والكلمات المفتاحية</span>
        </h1>

        <p>
          صفحة مخصصة لتحليل المنتج بدل عرض النتائج فقط: جدول أسعار، روابط شراء،
          رسم بياني، أفضل سعر، كلمات مفتاحية وجمل قوية تساعدك قبل الشراء.
        </p>

      {errorMessage && <div className="errorBox">{errorMessage}</div>}

{paymentLink && (
  <>
    <a
      href={paymentLink}
      target="_blank"
      rel="noopener noreferrer"
      className="paypalBtn"
    >
      شراء 50 دراسة منتج بـ 20 دولار بعد الدفع أرسل كود حسابك الظاهر هنا عبر واتساب.
    </a>

    <div className="visitorBox">
      كود حسابك بعد الدفع:
      <strong>{getVisitorId()}</strong>
    </div>
  </>
)}

<div className="researchSearchBox">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              localStorage.setItem("bps_selected_country", e.target.value);
            }}
          >
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
            <option value="kw">الكويت</option>
            <option value="qa">قطر</option>
            <option value="bh">البحرين</option>
            <option value="eg">مصر</option>
          </select>

          <input
            value={query}
            placeholder="اكتب اسم المنتج للدراسة..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleResearchSearch();
            }}
          />

          <button onClick={handleResearchSearch} disabled={loading}>
            {loading ? "جاري التحليل..." : "اعمل دراسة المنتج"}
          </button>
        </div>
      </section>

      <section className="researchInfo">
        <h2>ماذا ستجد داخل دراسة المنتج؟</h2>

        <div className="infoGrid">
          <div>🏬 جدول المتاجر والأسعار</div>
          <div>📈 رسم بياني لفروق الأسعار</div>
          <div>🏆 أقل وأعلى سعر</div>
          <div>🔎 كلمات مفتاحية قوية</div>
          <div>🧠 تحليل مختصر للمنتج</div>
          <div>❓ أسئلة شائعة للسيو</div>
        </div>
      </section>

      <style jsx>{`
        .researchPage {
          min-height: 100vh;
          color: #fff;
          padding: 40px 16px;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.12), transparent 32%),
            radial-gradient(circle at left, rgba(0,180,255,0.1), transparent 28%),
            #0b0f14;
        }
            .visitorBox {
  margin: 12px auto;
  padding: 12px;
  max-width: 500px;

  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(0,255,200,0.25);

  border-radius: 14px;

  color: #fff;
  font-weight: 800;
}

.visitorBox strong {
  display: block;
  margin-top: 8px;

  color: #00ffd5;

  font-size: 14px;
  word-break: break-all;
}

        .researchHero {
          max-width: 900px;
          margin: 40px auto;
          text-align: center;
          padding: 34px 22px;
          border-radius: 28px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,255,200,0.18);
          box-shadow: 0 0 35px rgba(0,255,200,0.12);
        }

        .badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          color: #00ffd5;
          background: rgba(0,255,200,0.1);
          border: 1px solid rgba(0,255,200,0.25);
          font-weight: 900;
          margin-bottom: 14px;
        }

        h1 {
          font-size: clamp(30px, 5vw, 52px);
          margin: 0;
          font-weight: 950;
        }

        h1 span {
          display: block;
          margin-top: 10px;
          font-size: 18px;
          color: #cbd5e1;
        }

        p {
          color: #d1d5db;
          line-height: 2;
          max-width: 760px;
          margin: 18px auto;
        }

        .researchSearchBox {
          display: grid;
          grid-template-columns: 150px 1fr 190px;
          gap: 10px;
          margin-top: 24px;
        }

        input,
        select,
        button {
          height: 52px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.12);
          background: #111827;
          color: #fff;
          padding: 0 14px;
          font-weight: 800;
        }

        button {
          background: linear-gradient(135deg, #00ffd5, #38bdf8);
          color: #020617;
          cursor: pointer;
          border: none;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .errorBox {
          margin: 14px auto;
          color: #fecaca;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 14px;
          padding: 12px;
        }
          .paypalBtn {
  display: inline-block;
  margin: 10px auto 0;
  padding: 12px 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, #facc15, #f97316);
  color: #111827;
  font-weight: 950;
  text-decoration: none;
}

        .researchInfo {
          max-width: 900px;
          margin: 20px auto;
          padding: 24px;
          border-radius: 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .researchInfo h2 {
          color: #00ffd5;
          margin-top: 0;
        }

        .infoGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .infoGrid div {
          padding: 16px;
          border-radius: 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          font-weight: 900;
        }

        @media (max-width: 700px) {
          .researchSearchBox {
            grid-template-columns: 1fr;
          }

          .infoGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}