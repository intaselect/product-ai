"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Offer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  product_url: string;
  store_name: string | null;
  country: string | null;
  status: "pending" | "approved" | "rejected";
  is_ad?: boolean;
  click_count?: number;
};

export default function AdminAdsPage() {
  const [secret, setSecret] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSecret = params.get("secret") || "";
    setSecret(urlSecret);

    if (urlSecret) {
      loadAds(urlSecret);
    }
  }, []);

  async function loadAds(adminSecret = secret) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(adminSecret)}`
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحميل الإعلانات");
        return;
      }

      const adsOnly = (data.offers || []).filter((offer: Offer) => offer.is_ad);
      setOffers(adsOnly);
    } catch {
      setError("حدث خطأ غير متوقع أثناء تحميل الإعلانات");
    } finally {
      setLoading(false);
    }
  }

  async function removeAd(id: number) {
    setActionLoading(`ad-${id}`);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "toggle_ad",
            id,
            is_ad: false,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء إلغاء الإعلان");
        return;
      }

      setOffers((prev) => prev.filter((offer) => offer.id !== id));
    } catch {
      setError("حدث خطأ غير متوقع أثناء إلغاء الإعلان");
    } finally {
      setActionLoading("");
    }
  }

  return (
    <main className="adminAdsPage" dir="rtl">
      <section className="adminAdsHero">
        <h1>⭐ إدارة الإعلانات</h1>
        <p>هنا تظهر المنتجات المفعّلة كإعلانات فقط.</p>

        <div className="topActions">
          <Link href={`/customer-offers/admin?secret=${encodeURIComponent(secret)}`}>
            رجوع لإدارة العروض
          </Link>

          {secret && (
            <button onClick={() => loadAds()} disabled={loading}>
              {loading ? "جاري التحميل..." : "تحديث"}
            </button>
          )}
        </div>

        {!secret && (
          <div className="errorMsg">
            افتح الصفحة بالرابط السري.
          </div>
        )}

        {error && <div className="errorMsg">{error}</div>}
      </section>

      <section className="adsStats">
        <strong>{offers.length}</strong>
        <span>عدد الإعلانات الحالية</span>
      </section>

      <section className="adsGrid">
        {offers.length === 0 ? (
          <div className="emptyBox">لا توجد إعلانات مفعّلة حاليًا</div>
        ) : (
          offers.map((offer) => (
            <article className="adCard" key={offer.id}>
              <div className="imageBox">
                <img src={offer.image_url} alt={offer.product_name} />
                <span>إعلان</span>
              </div>

              <div className="content">
                <h2>{offer.product_name}</h2>

                <p className="price">{offer.price}</p>

                <p>الدولة: {offer.country || "غير محدد"}</p>
                <p>المتجر: {offer.store_name || "غير محدد"}</p>
                <p>الضغطات: {offer.click_count || 0}</p>

                <a
                  href={offer.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="openBtn"
                >
                  فتح رابط المنتج
                </a>

                <button
                  className="removeBtn"
                  disabled={actionLoading === `ad-${offer.id}`}
                  onClick={() => removeAd(offer.id)}
                >
                  {actionLoading === `ad-${offer.id}`
                    ? "جاري..."
                    : "إلغاء الإعلان"}
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <style>{`
        .adminAdsPage {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 10%, rgba(245,158,11,.16), transparent 28%),
            radial-gradient(circle at 80% 20%, rgba(34,197,94,.14), transparent 28%),
            #151515;
          color: white;
          padding: 36px 16px 80px;
        }

        .adminAdsHero {
          max-width: 1100px;
          margin: 0 auto 22px;
          padding: 26px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(245,158,11,.14), rgba(34,197,94,.12));
          border: 1px solid rgba(255,255,255,.09);
          text-align: center;
        }

        .adminAdsHero h1 {
          margin: 0 0 10px;
          font-size: 34px;
        }

        .adminAdsHero p {
          color: #d1d5db;
          line-height: 1.8;
        }

        .topActions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .topActions a,
        .topActions button {
          border: 0;
          border-radius: 999px;
          padding: 12px 20px;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: white;
          text-decoration: none;
          font-weight: 950;
          cursor: pointer;
        }

        .adsStats {
          max-width: 1100px;
          margin: 0 auto 22px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(245,158,11,.28);
          text-align: center;
        }

        .adsStats strong {
          display: block;
          color: #fbbf24;
          font-size: 42px;
          font-weight: 950;
        }

        .adsStats span {
          color: #d1d5db;
          font-weight: 900;
        }

        .adsGrid {
          max-width: 1250px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
        }

        .adCard {
          overflow: hidden;
          border-radius: 24px;
          background: linear-gradient(180deg, #222, #151515);
          border: 1px solid rgba(245,158,11,.35);
          box-shadow: 0 20px 50px rgba(0,0,0,.35);
        }

        .imageBox {
          position: relative;
          height: 220px;
          background: #fff;
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

        .imageBox span {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg,#f59e0b,#16a34a);
          color: white;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 950;
        }

        .content {
          padding: 16px;
        }

        .content h2 {
          font-size: 17px;
          line-height: 1.6;
          margin: 0 0 10px;
        }

        .content p {
          color: #d1d5db;
          font-size: 13px;
          margin: 7px 0;
        }

        .price {
          color: #22c55e !important;
          font-size: 22px !important;
          font-weight: 950;
        }

        .openBtn,
        .removeBtn {
          display: block;
          width: 100%;
          text-align: center;
          border: 0;
          border-radius: 14px;
          padding: 12px;
          color: white;
          text-decoration: none;
          font-weight: 950;
          margin-top: 10px;
          cursor: pointer;
        }

        .openBtn {
          background: #2563eb;
        }

        .removeBtn {
          background: #dc2626;
        }

        .removeBtn:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .emptyBox,
        .errorMsg {
          grid-column: 1 / -1;
          padding: 18px;
          border-radius: 18px;
          text-align: center;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          color: #fef3c7;
          font-weight: 900;
        }

        @media (max-width: 700px) {
          .adminAdsPage {
            padding: 24px 12px 60px;
          }

          .adminAdsHero h1 {
            font-size: 28px;
          }

          .adsGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}