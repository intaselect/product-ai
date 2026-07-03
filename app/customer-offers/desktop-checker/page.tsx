"use client";

import { useEffect, useMemo, useState } from "react";

type Offer = {
  id: number;
  product_name: string;
  image_url: string | null;
  product_url: string;
  store_name: string | null;
  country: string | null;
  status: string;
  price: string | null;
  availability: string | null;
  desktop_price: string | null;
  desktop_availability: string | null;
  desktop_checked_at: string | null;
  desktop_check_note: string | null;
  desktop_check_status: string | null;
  desktop_out_of_stock_count: number | null;
  desktop_in_stock_count: number | null;
  desktop_last_screenshot: string | null;
  desktop_last_price_changed: boolean | null;
};

export default function DesktopCheckerPage() {
  const [secret, setSecret] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [country, setCountry] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [changed, setChanged] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("secret") || "";
    setSecret(s);
    if (s) loadData(s);
  }, []);

  async function loadData(adminSecret = secret) {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        secret: adminSecret,
        country,
        availability,
        changed,
      });

      const res = await fetch(`/api/desktop-checker/report?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحميل النتائج");
        return;
      }

      setOffers(data.offers || []);
    } catch (err: any) {
      setError(err?.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    return {
      total: offers.length,
      inStock: offers.filter((x) => x.desktop_availability === "in_stock").length,
      outStock: offers.filter((x) => x.desktop_availability === "out_of_stock").length,
      unknown: offers.filter((x) => x.desktop_availability === "unknown").length,
      changed: offers.filter((x) => x.desktop_last_price_changed).length,
    };
  }, [offers]);

  return (
    <main className="page" dir="rtl">
      <section className="hero">
        <h1>🖥️ نتائج Desktop Checker</h1>
        <p>راجع السعر والتوفر الذي قرأه برنامج الكمبيوتر قبل اعتماد النتائج على الموقع.</p>

        {!secret && (
          <div className="error">
            افتح الصفحة بالرابط السري:
            <br />
            <code>/customer-offers/desktop-checker?secret=YOUR_SECRET</code>
          </div>
        )}

        {secret && (
          <>
            <div className="filters">
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="all">كل الدول</option>
                <option value="sa">السعودية</option>
                <option value="ae">الإمارات</option>
                <option value="eg">مصر</option>
                <option value="kw">الكويت</option>
                <option value="qa">قطر</option>
                <option value="bh">البحرين</option>
              </select>

              <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <option value="all">كل حالات التوفر</option>
                <option value="in_stock">متوفر</option>
                <option value="out_of_stock">غير متوفر</option>
                <option value="unknown">غير واضح</option>
              </select>

              <select value={changed} onChange={(e) => setChanged(e.target.value)}>
                <option value="all">كل الأسعار</option>
                <option value="yes">السعر متغير فقط</option>
              </select>

              <button onClick={() => loadData()} disabled={loading}>
                {loading ? "جاري التحميل..." : "تحديث النتائج"}
              </button>
            </div>

            <div className="stats">
              <div><strong>{stats.total}</strong><span>إجمالي مفحوص</span></div>
              <div><strong>{stats.inStock}</strong><span>متوفر</span></div>
              <div><strong>{stats.outStock}</strong><span>غير متوفر</span></div>
              <div><strong>{stats.unknown}</strong><span>غير واضح</span></div>
              <div><strong>{stats.changed}</strong><span>السعر متغير</span></div>
            </div>
          </>
        )}

        {error && <div className="error">{error}</div>}
      </section>

      <section className="grid">
        {offers.map((offer) => (
          <article key={offer.id} className={`card ${offer.desktop_availability || "unknown"}`}>
            <div className="imgBox">
              {offer.image_url ? <img src={offer.image_url} alt={offer.product_name} /> : null}
            </div>

            <div className="content">
              <div className="badges">
                <span>{offer.country || "-"}</span>
                <span>{offer.status}</span>
                {offer.desktop_last_price_changed && <b>السعر متغير</b>}
              </div>

              <h2>{offer.product_name}</h2>

              <p>المتجر: <strong>{offer.store_name || "غير محدد"}</strong></p>
              <p>السعر الحالي: <strong>{offer.price || "-"}</strong></p>
              <p>سعر الكمبيوتر: <strong>{offer.desktop_price || "-"}</strong></p>

              <p>
                التوفر الحالي: <strong>{offer.availability || "unknown"}</strong>
              </p>

              <p>
                توفر الكمبيوتر:{" "}
                <strong>
                  {offer.desktop_availability === "in_stock"
                    ? "✅ متوفر"
                    : offer.desktop_availability === "out_of_stock"
                    ? "❌ غير متوفر"
                    : "❓ غير واضح"}
                </strong>
              </p>

              <p>مرات متوفر: <strong>{offer.desktop_in_stock_count || 0}</strong></p>
              <p>مرات غير متوفر: <strong>{offer.desktop_out_of_stock_count || 0}</strong></p>
              <p>آخر فحص: <strong>{offer.desktop_checked_at || "-"}</strong></p>
              <p className="note">السبب: {offer.desktop_check_note || "-"}</p>

              <div className="actions">
                <a href={offer.product_url} target="_blank" rel="noopener noreferrer">
                  فتح المنتج
                </a>

                {offer.desktop_last_screenshot && (
                  <span title={offer.desktop_last_screenshot}>
                    Screenshot محفوظ على جهازك
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      <style>{`
        .page {
          min-height: 100vh;
          background: #101010;
          color: white;
          padding: 32px 16px 70px;
        }

        .hero {
          max-width: 1200px;
          margin: 0 auto 24px;
          padding: 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(34,197,94,.14), rgba(37,99,235,.12));
          border: 1px solid rgba(255,255,255,.08);
          text-align: center;
        }

        .hero h1 {
          margin: 0 0 10px;
          font-size: 32px;
        }

        .hero p {
          color: #d1d5db;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 18px;
        }

        .filters select,
        .filters button {
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          padding: 11px 16px;
          background: #171717;
          color: white;
          font-weight: 900;
        }

        .filters button {
          background: linear-gradient(135deg,#16a34a,#2563eb);
          cursor: pointer;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-top: 20px;
        }

        .stats div {
          padding: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,.07);
        }

        .stats strong {
          display: block;
          font-size: 28px;
          color: #86efac;
        }

        .stats span {
          font-size: 13px;
          color: #d1d5db;
        }

        .grid {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 18px;
        }

        .card {
          overflow: hidden;
          border-radius: 22px;
          background: #181818;
          border: 1px solid rgba(255,255,255,.08);
        }

        .card.in_stock {
          border-color: rgba(34,197,94,.45);
        }

        .card.out_of_stock {
          border-color: rgba(239,68,68,.55);
        }

        .card.unknown {
          border-color: rgba(234,179,8,.45);
        }

        .imgBox {
          height: 190px;
          background: #0c0c0c;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .imgBox img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .content {
          padding: 15px;
        }

        .badges {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .badges span,
        .badges b {
          border-radius: 999px;
          padding: 5px 9px;
          font-size: 12px;
          background: rgba(255,255,255,.08);
        }

        .badges b {
          background: rgba(245,158,11,.18);
          color: #fcd34d;
        }

        h2 {
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 10px;
        }

        p {
          margin: 6px 0;
          color: #d1d5db;
          font-size: 13px;
        }

        strong {
          color: white;
        }

        .note {
          color: #fcd34d;
        }

        .actions {
          display: grid;
          gap: 8px;
          margin-top: 12px;
        }

        .actions a,
        .actions span {
          text-align: center;
          border-radius: 12px;
          padding: 10px;
          font-weight: 900;
          text-decoration: none;
        }

        .actions a {
          background: white;
          color: #111;
        }

        .actions span {
          background: rgba(255,255,255,.08);
          color: #d1d5db;
        }

        .error {
          margin: 16px auto 0;
          padding: 14px;
          border-radius: 16px;
          background: rgba(239,68,68,.14);
          border: 1px solid rgba(239,68,68,.35);
          color: #fecaca;
          max-width: 700px;
          line-height: 1.8;
        }

        @media (max-width: 800px) {
          .stats {
            grid-template-columns: 1fr 1fr;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}