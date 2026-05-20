"use client";

import { useEffect, useState } from "react";

type Offer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  product_url: string;
  store_name: string | null;
  country: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function CustomerOffersAdminPage() {
  const [secret, setSecret] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSecret = params.get("secret") || "";
    setSecret(urlSecret);

    if (urlSecret) {
      loadOffers(urlSecret);
    }
  }, []);

  async function loadOffers(adminSecret = secret) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(adminSecret)}`
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحميل العروض");
        return;
      }

      setOffers(data.offers || []);
    } catch {
      setError("حدث خطأ غير متوقع أثناء تحميل العروض");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: "approved" | "rejected" | "pending") {
    setActionLoading(id);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحديث العرض");
        return;
      }

      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === id ? { ...offer, status } : offer
        )
      );
    } catch {
      setError("حدث خطأ غير متوقع أثناء تحديث العرض");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <main className="adminPage" dir="rtl">
      <section className="adminHero">
        <h1>إدارة عروض العملاء</h1>
        <p>راجع العروض الجديدة ووافق عليها أو ارفضها قبل ظهورها للزوار.</p>

        {!secret && (
          <div className="secretBox">
            افتح الصفحة بالرابط السري:
            <br />
            <code>/customer-offers/admin?secret=YOUR_SECRET</code>
          </div>
        )}

        {secret && (
          <button onClick={() => loadOffers()} disabled={loading}>
            {loading ? "جاري التحميل..." : "تحديث العروض"}
          </button>
        )}

        {error && <div className="errorMsg">{error}</div>}
      </section>

      <section className="offersGrid">
        {offers.map((offer) => (
          <article key={offer.id} className={`offerCard ${offer.status}`}>
            <div className="imageBox">
              <img src={offer.image_url} alt={offer.product_name} />
            </div>

            <div className="content">
              <span className={`status ${offer.status}`}>
                {offer.status === "pending"
                  ? "قيد المراجعة"
                  : offer.status === "approved"
                  ? "موافق عليه"
                  : "مرفوض"}
              </span>

              <h2>{offer.product_name}</h2>

              <p className="price">{offer.price}</p>

              <p className="meta">
                المتجر: {offer.store_name || "غير محدد"}
              </p>

              <p className="meta">
                الدولة: {offer.country || "غير محدد"}
              </p>

              <a
                href={offer.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="productLink"
              >
                فتح رابط المنتج
              </a>

              <div className="actions">
                <button
                  className="approve"
                  disabled={actionLoading === offer.id}
                  onClick={() => updateStatus(offer.id, "approved")}
                >
                  ✅ موافقة
                </button>

                <button
                  className="reject"
                  disabled={actionLoading === offer.id}
                  onClick={() => updateStatus(offer.id, "rejected")}
                >
                  ❌ رفض
                </button>

                <button
                  className="pending"
                  disabled={actionLoading === offer.id}
                  onClick={() => updateStatus(offer.id, "pending")}
                >
                  ↩️ Pending
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <style>{`
        .adminPage {
          min-height: 100vh;
          background: #151515;
          color: white;
          padding: 40px 16px 80px;
        }

        .adminHero {
          max-width: 1100px;
          margin: 0 auto 28px;
          padding: 28px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(37,99,235,0.10));
          border: 1px solid rgba(255,255,255,0.08);
          text-align: center;
        }

        .adminHero h1 {
          margin: 0 0 10px;
          font-size: 36px;
        }

        .adminHero p {
          color: #d1d5db;
          margin-bottom: 18px;
        }

        .adminHero button {
          border: 0;
          border-radius: 999px;
          padding: 12px 22px;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: white;
          font-weight: 900;
          cursor: pointer;
        }

        .secretBox,
        .errorMsg {
          max-width: 700px;
          margin: 16px auto 0;
          padding: 14px;
          border-radius: 16px;
          line-height: 1.8;
        }

        .secretBox {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .errorMsg {
          background: rgba(239,68,68,0.13);
          border: 1px solid rgba(239,68,68,0.35);
          color: #fecaca;
        }

        .offersGrid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .offerCard {
          overflow: hidden;
          border-radius: 24px;
          background: #222;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .imageBox {
          height: 220px;
          background: #0f0f0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }

        .imageBox img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .content {
          padding: 16px;
        }

        .status {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .status.pending {
          background: rgba(234,179,8,0.16);
          color: #fde68a;
        }

        .status.approved {
          background: rgba(34,197,94,0.16);
          color: #bbf7d0;
        }

        .status.rejected {
          background: rgba(239,68,68,0.16);
          color: #fecaca;
        }

        h2 {
          font-size: 17px;
          line-height: 1.6;
          margin: 0 0 10px;
        }

        .price {
          color: #22c55e;
          font-size: 22px;
          font-weight: 950;
          margin: 0 0 10px;
        }

        .meta {
          color: #cfcfcf;
          font-size: 13px;
          margin: 6px 0;
        }

        .productLink {
          display: block;
          margin: 14px 0;
          text-align: center;
          padding: 11px;
          border-radius: 14px;
          background: white;
          color: #111;
          text-decoration: none;
          font-weight: 900;
        }

        .actions {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
        }

        .actions button {
          border: 0;
          border-radius: 12px;
          padding: 10px 6px;
          color: white;
          cursor: pointer;
          font-weight: 900;
        }

        .approve {
          background: #16a34a;
        }

        .reject {
          background: #dc2626;
        }

        .pending {
          background: #ca8a04;
        }

        .actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  );
}