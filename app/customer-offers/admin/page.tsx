"use client";

import { useEffect, useMemo, useState } from "react";
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
  created_at: string;
  user_id: string | null;
  seller_email: string | null;
  click_count?: number;
  is_ad?: boolean;
  side_ad?: boolean;
  best_offer?: boolean;
  description?: string;
  features?: string[];
  gallery_images?: string[];
  specifications?: Record<string, any>;
  source_brand?: string;
  ai_description?: string;
  ai_features?: string[];
  ai_specifications?: Record<string, any>;
  ai_keywords?: string[];
  ai_enriched_at?: string;
  availability?: "in_stock" | "out_of_stock" | "unknown";
  last_stock_checked_at?: string;
  stock_check_note?: string;
};

type Limit = {
  user_id: string;
  email: string | null;
  max_offers: number;
  created_at: string;
  updated_at: string;
};

export default function CustomerOffersAdminPage() {
  const [secret, setSecret] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [limits, setLimits] = useState<Limit[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string>("");
  const [error, setError] = useState("");

  const [countryFilter, setCountryFilter] = useState("all");
  const filteredOffers = useMemo(() => {
    if (countryFilter === "all") return offers;

    return offers.filter(
      (offer) =>
        String(offer.country || "")
          .toLowerCase()
          .trim() === countryFilter
    );
  }, [offers, countryFilter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSecret = params.get("secret") || "";
    setSecret(urlSecret);

    if (urlSecret) {
      loadData(urlSecret);
    }
  }, []);

  const limitMap = useMemo(() => {
    const map = new Map<string, Limit>();
    limits.forEach((limit) => map.set(limit.user_id, limit));
    return map;
  }, [limits]);
  const adminStats = useMemo(() => {
    const totalSellers = new Set(
      offers.map((offer) => offer.user_id).filter(Boolean)
    ).size;

    const totalClicks = offers.reduce(
      (sum, offer) => sum + Number(offer.click_count || 0),
      0
    );

    const sellerClicks = offers.reduce((acc: Record<string, number>, offer) => {
      const email = offer.seller_email || "غير معروف";
      acc[email] = (acc[email] || 0) + Number(offer.click_count || 0);
      return acc;
    }, {});

    return {
      totalSellers,
      totalClicks,
      sellerClicks: Object.entries(sellerClicks).sort((a, b) => b[1] - a[1]),
    };
  }, [offers]);

  async function loadData(adminSecret = secret) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(adminSecret)}`
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحميل البيانات");
        return;
      }

      setOffers(data.offers || []);
      setLimits(data.limits || []);
    } catch (err: any) {
      setError(err?.message || "حدث خطأ غير متوقع أثناء تحسين المنتج");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    id: number,
    status: "approved" | "rejected" | "pending"
  ) {
    setActionLoading(`status-${id}`);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "update_offer_status",
            id,
            status,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحديث العرض");
        return;
      }

      setOffers((prev) =>
        prev.map((offer) => (offer.id === id ? { ...offer, status } : offer))
      );
    } catch {
      setError("حدث خطأ غير متوقع أثناء تحديث العرض");
    } finally {
      setActionLoading("");
    }
  }
  async function toggleAd(id: number, is_ad: boolean) {
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
            is_ad,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحديث الإعلان");
        return;
      }

      setOffers((prev) =>
        prev.map((offer) => (offer.id === id ? { ...offer, is_ad } : offer))
      );
    } catch {
      setError("حدث خطأ غير متوقع أثناء تحديث الإعلان");
    } finally {
      setActionLoading("");
    }
  }
  async function toggleSideAd(
    id: number,
    side_ad: boolean
  ) {
    setActionLoading(`side-${id}`);

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "toggle_side_ad",
            id,
            side_ad,
          }),
        }
      );

      const data = await res.json();

      if (!data.ok) return;

      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === id
            ? { ...offer, side_ad }
            : offer
        )
      );
    } finally {
      setActionLoading("");
    }
  }
  async function toggleBestOffer(
    id: number,
    best_offer: boolean
  ) {
    setActionLoading(`best-${id}`);

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "toggle_best_offer",
            id,
            best_offer,
          }),
        }
      );

      const data = await res.json();

      if (!data.ok) return;

      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === id
            ? { ...offer, best_offer }
            : offer
        )
      );
    } finally {
      setActionLoading("");
    }
  }
  async function updateUserLimit(
    user_id: string,
    email: string,
    max_offers: number
  ) {
    setActionLoading(`limit-${user_id}`);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "update_user_limit",
            user_id,
            email,
            max_offers,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحديث عدد العروض");
        return;
      }

      setLimits((prev) => {
        const exists = prev.some((limit) => limit.user_id === user_id);

        if (exists) {
          return prev.map((limit) =>
            limit.user_id === user_id
              ? { ...limit, max_offers, email, updated_at: new Date().toISOString() }
              : limit
          );
        }

        return [
          ...prev,
          {
            user_id,
            email,
            max_offers,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
      });
    } catch {
      setError("حدث خطأ غير متوقع أثناء تحديث عدد العروض");
    } finally {
      setActionLoading("");
    }
  }
  async function fetchDetails(id: number) {
    setActionLoading(`details-${id}`);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "fetch_product_details",
            id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء جلب التفاصيل");
        return;
      }

      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === id
            ? {
              ...offer,
              description: data.details?.description || offer.description,
              features: data.details?.features || offer.features,
              gallery_images:
                data.details?.gallery_images || offer.gallery_images,
              specifications:
                data.details?.specifications || offer.specifications,
              source_brand:
                data.details?.source_brand || offer.source_brand,
            }
            : offer
        )
      );
    } catch {
      setError("حدث خطأ غير متوقع أثناء جلب التفاصيل");
    } finally {
      setActionLoading("");
    }
  }
  async function generateAiDetails(id: number) {
    setActionLoading(`ai-details-${id}`);
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "generate_ai_product_details",
            id,
          }),
        }
      );

      const data = await res.json();

      console.log("AI SEO RESPONSE:", data);

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحسين المنتج");
        return;
      }

      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === id
            ? {
              ...offer,
              ai_description: data.details?.description,
              ai_features: data.details?.features || [],
              ai_keywords: data.details?.keywords || [],
              ai_enriched_at: new Date().toISOString(),
            }
            : offer
        )
      );
    } catch (err: any) {
      console.error("AI SEO ERROR:", err);
      setError(err?.message || "حدث خطأ غير متوقع أثناء تحسين المنتج");
    } finally {
      setActionLoading("");
    }
  }
  async function generateAiBulk() {
    setActionLoading("ai-bulk");
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "generate_ai_product_details_bulk",
            limit: 10,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحسين الدفعة");
        return;
      }

      await loadData();

      alert(`تم تحسين ${data.success} منتج وفشل ${data.failed}`);
    } catch (err: any) {
      setError(err?.message || "حدث خطأ أثناء تحسين الدفعة");
    } finally {
      setActionLoading("");
    }
  }
  async function checkStockGoogleLikeBulk() {
    setActionLoading("stock-check");
    setError("");

    try {
      const res = await fetch(
        `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "check_stock_google_like_bulk",
            limit: 100,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء فحص التوفر");
        return;
      }

      await loadData();

      alert(
        `تم فحص ${data.total} منتج\nمتوفر: ${data.inStock}\nغير متوفر وتم رفضه: ${data.outOfStock}\nغير واضح: ${data.unknown}`
      );
    } catch (err: any) {
      setError(err?.message || "حدث خطأ أثناء فحص التوفر");
    } finally {
      setActionLoading("");
    }
  }
  return (
    <main className="adminPage" dir="rtl">
      <section className="adminHero">
        <h1>إدارة عروض العملاء</h1>
        {secret && (
          <Link
            href={`/customer-offers/admin-ads?secret=${encodeURIComponent(secret)}`}
            className="adsDashboardBtn"
          >
            ⭐ إدارة الإعلانات
          </Link>
        )}
        <p>
          راجع العروض، وافق أو ارفض، وتحكم في عدد العروض المسموح بها لكل عميل.
        </p>

        {!secret && (
          <div className="secretBox">
            افتح الصفحة بالرابط السري:
            <br />
            <code>/customer-offers/admin?secret=YOUR_SECRET</code>
          </div>
        )}

        {secret && (
          <button onClick={() => loadData()} disabled={loading}>
            {loading ? "جاري التحميل..." : "تحديث البيانات"}
          </button>
        )}
        <button
          onClick={generateAiBulk}
          disabled={actionLoading === "ai-bulk"}
        >
          {actionLoading === "ai-bulk"
            ? "جاري تحسين الدفعة..."
            : "🧠 تحسين 25 منتج غير محسن"}
        </button>
        <button
          onClick={checkStockGoogleLikeBulk}
          disabled={actionLoading === "stock-check"}
        >
          {actionLoading === "stock-check"
            ? "جاري فحص التوفر..."
            : "🔍 فحص التوفر مثل Google Merchant"}
        </button>
        {secret && (
  <Link
    href={`/customer-offers/admin-stock?secret=${encodeURIComponent(secret)}`}
    className="adsDashboardBtn"
  >
    📄 تقرير فحص التوفر
  </Link>
)}

        {error && <div className="errorMsg">{error}</div>}
      </section>
      {secret && (
        <section className="analyticsBox">
          <div className="totalClicksCard">
            <strong>{adminStats.totalSellers}</strong>
            <span>عدد العملاء اللي أضافوا عروض</span>
          </div>
          <div className="totalClicksCard">
            <strong>{adminStats.totalClicks}</strong>
            <span>إجمالي ضغطات كل عروض الموقع</span>
          </div>

          <div className="sellerClicksList">
            <h2>ضغطات كل بائع</h2>

            {adminStats.sellerClicks.length === 0 ? (
              <p>لا توجد ضغطات حتى الآن</p>
            ) : (
              adminStats.sellerClicks.map(([email, clicks]) => (
                <div className="sellerClickRow" key={email}>
                  <span>{email}</span>
                  <strong>{clicks}</strong>
                </div>
              ))
            )}
          </div>
        </section>
      )}
      {secret && (
        <section className="adminFilters">
          <button
            className={countryFilter === "all" ? "active" : ""}
            onClick={() => setCountryFilter("all")}
          >
            كل الدول
          </button>

          {[
            ["sa", "السعودية"],
            ["eg", "مصر"],
            ["ae", "الإمارات"],
            ["kw", "الكويت"],
            ["qa", "قطر"],
            ["bh", "البحرين"],
          ].map(([code, name]) => (
            <button
              key={code}
              className={countryFilter === code ? "active" : ""}
              onClick={() => setCountryFilter(code)}
            >
              {name}
            </button>
          ))}
        </section>
      )}

      <section className="offersGrid">
        {filteredOffers.map((offer: Offer) => {
          const userLimit =
            offer.user_id && limitMap.get(offer.user_id)
              ? limitMap.get(offer.user_id)
              : null;

          const sellerEmail =
            offer.seller_email || userLimit?.email || "غير معروف";

          const maxOffers = userLimit?.max_offers ?? 1;

          const userOffersCount = offer.user_id
            ? offers.filter((item) => item.user_id === offer.user_id).length
            : 0;

          return (
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
                <p className="clicksMeta">
                  👁️ ضغطات العرض: <strong>{offer.click_count || 0}</strong>
                </p>

                <p className="meta">المتجر: {offer.store_name || "غير محدد"}</p>
                <p className="meta">الدولة: {offer.country || "غير محدد"}</p>
                <p className="meta">المتجر: {offer.store_name || "غير محدد"}</p>
                <p className="meta">الدولة: {offer.country || "غير محدد"}</p>

                <p className="meta">
                  التوفر:{" "}
                  <strong>
                    {offer.availability === "in_stock"
                      ? "✅ متوفر"
                      : offer.availability === "out_of_stock"
                        ? "❌ غير متوفر"
                        : "❓ غير معروف"}
                  </strong>
                </p>

                {offer.stock_check_note && (
                  <p className="meta">
                    سبب الفحص: {offer.stock_check_note}
                  </p>
                )}

                <div className="sellerBox"></div>


                <div className="sellerBox">
                  <p>
                    📧 العميل:
                    <strong>{sellerEmail}</strong>
                  </p>

                  <p>
                    📦 العروض:
                    <strong>
                      {userOffersCount} / {maxOffers}
                    </strong>
                  </p>

                  {offer.user_id ? (
                    <>
                      <div className="limitControl">
                        <input
                          type="number"
                          min={0}
                          defaultValue={maxOffers}
                          id={`limit-${offer.user_id}`}
                        />

                        <button
                          disabled={actionLoading === `limit-${offer.user_id}`}
                          onClick={() => {
                            const input = document.getElementById(
                              `limit-${offer.user_id}`
                            ) as HTMLInputElement | null;

                            const newLimit = Number(input?.value || 0);

                            updateUserLimit(offer.user_id!, sellerEmail, newLimit);
                          }}
                        >
                          {actionLoading === `limit-${offer.user_id}`
                            ? "جاري..."
                            : "تحديث العدد"}
                        </button>
                      </div>


                    </>
                  ) : (
                    <p className="oldOfferNote">
                      عرض قديم قبل ربط تسجيل الدخول
                    </p>
                  )}
                </div>
                <div className="blockControl">
                  <button
                    className="reject"
                    disabled={actionLoading === `limit-${offer.user_id}`}
                    onClick={() => updateUserLimit(offer.user_id!, sellerEmail, 0)}
                  >
                    🚫 حظر
                  </button>

                  <button
                    className="approve"
                    disabled={actionLoading === `limit-${offer.user_id}`}
                    onClick={() => updateUserLimit(offer.user_id!, sellerEmail, 1)}
                  >
                    🔓 فك الحظر
                  </button>
                </div>

                <a
                  href={offer.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="productLink"
                >
                  فتح رابط المنتج
                </a>
                {offer.status === "approved" && (
                  <Link
                    href={`/customer-offers/product/bps-chat-${String(
                      offer.product_name || ""
                    )
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")}-${offer.country || "sa"
                      }-${offer.id}`}
                    target="_blank"
                    className="productCardLink"
                  >
                    🛒 عرض كارت المنتج
                  </Link>
                )}
                <button
                  className="detailsBtn"
                  disabled={actionLoading === `details-${offer.id}`}
                  onClick={() => fetchDetails(offer.id)}
                >
                  {actionLoading === `details-${offer.id}`
                    ? "جاري جلب التفاصيل..."
                    : "📄 جلب الوصف والمواصفات"}
                </button>
                {offer.description && (
                  <details
                    style={{
                      marginTop: 10,
                      padding: 10,
                      borderRadius: 12,
                      background: "rgba(255,255,255,.05)",
                    }}
                  >
                    <summary style={{ cursor: "pointer", fontWeight: 900 }}>
                      📄 عرض الوصف
                    </summary>

                    <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                      {offer.description}
                    </div>
                  </details>
                )}
                <button
                  className={
                    offer.ai_description
                      ? "aiSeoDoneBtn"
                      : "aiSeoBtn"
                  }
                  disabled={actionLoading === `ai-details-${offer.id}`}
                  onClick={() => generateAiDetails(offer.id)}
                >
                  {actionLoading === `ai-details-${offer.id}`
                    ? "جاري تحسين المنتج..."
                    : offer.ai_description
                      ? "✅ تم تحسين SEO (اضغط لإعادة التحسين)"
                      : "🧠 تحسين SEO بالذكاء الاصطناعي"}
                </button>
                <button
                  className={offer.is_ad ? "adOffBtn" : "adOnBtn"}
                  disabled={actionLoading === `ad-${offer.id}`}
                  onClick={() => toggleAd(offer.id, !offer.is_ad)}
                >
                  {actionLoading === `ad-${offer.id}`
                    ? "جاري..."
                    : offer.is_ad
                      ? "⭐ إلغاء الإعلان"
                      : "⭐ تفعيل كإعلان"}
                </button>

                <button
                  className={offer.side_ad ? "sideOffBtn" : "sideOnBtn"}
                  disabled={actionLoading === `side-${offer.id}`}
                  onClick={() => toggleSideAd(offer.id, !offer.side_ad)}
                >
                  {actionLoading === `side-${offer.id}`
                    ? "جاري..."
                    : offer.side_ad
                      ? "📢 إزالة من إعلانات الأجناب"
                      : "📢 أضف لإعلانات الأجناب"}
                </button>

                <button
                  className={offer.best_offer ? "adOnBtn" : "adOffBtn"}
                  disabled={actionLoading === `best-${offer.id}`}
                  onClick={() =>
                    toggleBestOffer(
                      offer.id,
                      !offer.best_offer
                    )
                  }
                >
                  {actionLoading === `best-${offer.id}`
                    ? "جاري..."
                    : offer.best_offer
                      ? "🔥 ضمن أفضل العروض"
                      : "⭐ أضف إلى أفضل العروض"}
                </button>
                <div className="actions">
                  <button
                    className="approve"
                    disabled={actionLoading === `status-${offer.id}`}
                    onClick={() => updateStatus(offer.id, "approved")}
                  >
                    ✅ موافقة
                  </button>

                  <button
                    className="reject"
                    disabled={actionLoading === `status-${offer.id}`}
                    onClick={() => updateStatus(offer.id, "rejected")}
                  >
                    ❌ رفض
                  </button>

                  <button
                    className="pending"
                    disabled={actionLoading === `status-${offer.id}`}
                    onClick={() => updateStatus(offer.id, "pending")}
                  >
                    ↩️ Pending
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <style>{`
        .adminPage {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 10%, rgba(34,197,94,0.14), transparent 28%),
            radial-gradient(circle at 80% 15%, rgba(37,99,235,0.14), transparent 28%),
            #151515;
          color: white;
          padding: 36px 16px 80px;
        }

        .adminHero {
          max-width: 1100px;
          margin: 0 auto 26px;
          padding: 26px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(37,99,235,0.10));
          border: 1px solid rgba(255,255,255,0.08);
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }
.blockControl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}

.blockControl button {
  border: 0;
  border-radius: 12px;
  padding: 10px 6px;
  color: white;
  cursor: pointer;
  font-weight: 900;
}
        .adminHero h1 {
          margin: 0 0 10px;
          font-size: 34px;
        }

        .adminHero p {
          color: #d1d5db;
          margin-bottom: 18px;
          line-height: 1.8;
        }

        .adminHero button {
          border: 0;
          border-radius: 999px;
          padding: 12px 22px;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: white;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 0 28px rgba(34,197,94,0.28);
        }
          .analyticsBox {
  max-width: 1100px;
  margin: 0 auto 24px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
}
  .aiSeoDoneBtn{
  width:100%;
  border:none;
  border-radius:14px;
  padding:14px;
  font-weight:900;
  color:#fff;
  cursor:pointer;
  background:linear-gradient(135deg,#16a34a,#22c55e);
}
  .aiSeoBtn {
  width: 100%;
  border: 0;
  border-radius: 14px;
  padding: 12px;
  color: white;
  font-weight: 950;
  cursor: pointer;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #0f766e, #2563eb);
}

.aiSeoBtn:disabled {
  opacity: .6;
  cursor: not-allowed;
}
.adminFilters {
  max-width: 1100px;
  margin: 0 auto 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.adminFilters button {
  border: 0;
  border-radius: 999px;
  padding: 11px 18px;
  color: white;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  font-weight: 950;
  cursor: pointer;
}

.adminFilters button.active {
  background: linear-gradient(135deg, #16a34a, #2563eb);
  box-shadow: 0 10px 26px rgba(37,99,235,.22);
}
.totalClicksCard,
.sellerClicksList {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(34,197,94,0.22);
}

.totalClicksCard {
  text-align: center;
  background: linear-gradient(135deg, rgba(34,197,94,0.20), rgba(37,99,235,0.14));
}

.totalClicksCard strong {
  display: block;
  font-size: 42px;
  color: #86efac;
  font-weight: 950;
}

.totalClicksCard span {
  color: #d1d5db;
  font-weight: 900;
}

.sellerClicksList h2 {
  margin: 0 0 12px;
  font-size: 18px;
}

.sellerClickRow {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  color: #d1d5db;
  font-size: 13px;
}

.sellerClickRow strong {
  color: #86efac;
  font-size: 16px;
}
.sideOnBtn,
.sideOffBtn{
  width:100%;
  border:0;
  border-radius:14px;
  padding:12px;
  color:white;
  font-weight:950;
  cursor:pointer;
  margin-bottom:10px;
}

.sideOnBtn{
  background:linear-gradient(
    135deg,
    #2563eb,
    #06b6d4
  );
}

.sideOffBtn{
  background:linear-gradient(
    135deg,
    #64748b,
    #dc2626
  );
}
.clicksMeta {
  margin: 0 0 10px;
  color: #86efac;
  font-size: 13px;
  font-weight: 900;
}

@media (max-width: 700px) {
  .analyticsBox {
    grid-template-columns: 1fr;
  }
}
.adsDashboardBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,#f59e0b,#16a34a);
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 950;
  margin: 12px auto 16px;
  box-shadow: 0 10px 28px rgba(245,158,11,.25);
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
          max-width: 1250px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 22px;
        }

        .offerCard {
          overflow: hidden;
          border-radius: 24px;
          background: linear-gradient(180deg, #222, #151515);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .offerCard.pending {
          border-color: rgba(234,179,8,0.45);
        }

        .offerCard.approved {
          border-color: rgba(34,197,94,0.42);
        }

        .offerCard.rejected {
          border-color: rgba(239,68,68,0.42);
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

        .sellerBox {
          margin: 14px 0;
          padding: 13px;
          border-radius: 18px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .sellerBox p {
          margin: 7px 0;
          color: #d1d5db;
          font-size: 13px;
          line-height: 1.7;
        }

        .sellerBox strong {
          display: block;
          color: #bbf7d0;
          margin-top: 4px;
          word-break: break-all;
        }

        .limitControl {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 8px;
          margin-top: 12px;
        }

        .limitControl input {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.14);
          background: #111;
          color: white;
          border-radius: 12px;
          padding: 10px;
          text-align: center;
          font-weight: 900;
        }

        .limitControl button {
          border: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: white;
          font-weight: 900;
          cursor: pointer;
        }

        .oldOfferNote {
          color: #fcd34d !important;
          font-weight: 900;
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
          .productCardLink {
  display: block;
  margin: 0 0 12px;
  text-align: center;
  padding: 11px;
  border-radius: 14px;
  background: linear-gradient(135deg,#16a34a,#2563eb);
  color: #fff;
  text-decoration: none;
  font-weight: 900;
}

.productCardLink:hover {
  opacity: .95;
}
          .detailsBtn {
  width: 100%;
  border: 0;
  border-radius: 14px;
  padding: 12px;
  color: white;
  font-weight: 950;
  cursor: pointer;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.detailsBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
          .adOnBtn,
.adOffBtn {
  width: 100%;
  border: 0;
  border-radius: 14px;
  padding: 12px;
  color: white;
  font-weight: 950;
  cursor: pointer;
  margin-bottom: 10px;
}

.adOnBtn {
  background: linear-gradient(135deg, #f59e0b, #16a34a);
}

.adOffBtn {
  background: linear-gradient(135deg, #64748b, #dc2626);
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

        .actions button:disabled,
        .limitControl button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 700px) {
          .adminPage {
            padding: 24px 12px 60px;
          }

          .offersGrid {
            grid-template-columns: 1fr;
          }

          .adminHero h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}