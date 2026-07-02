"use client";

import { useEffect, useMemo, useState } from "react";

type Offer = {
    id: number;
    product_name: string;
    product_url: string;
    image_url: string;
    price: string;
    store_name: string | null;
    country: string | null;
    status: string;
    availability?: "in_stock" | "out_of_stock" | "unknown";
    last_stock_checked_at?: string | null;
    stock_check_note?: string | null;
};

export default function AdminStockReportPage() {
    const [secret, setSecret] = useState("");
    const [filter, setFilter] = useState("all");
    const [offers, setOffers] = useState<Offer[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        inStock: 0,
        outOfStock: 0,
        unknown: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState("");

    async function loadReport(adminSecret = secret, selected = filter) {
        if (!adminSecret) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `/api/customer-offers/admin?secret=${encodeURIComponent(
                    adminSecret
                )}&action=stock_report&availability=${encodeURIComponent(selected)}`
            );

            const data = await res.json();

            if (!res.ok || !data.ok) {
                setError(data.error || "حدث خطأ أثناء تحميل التقرير");
                return;
            }

            setOffers(data.offers || []);
            setStats(data.stats || stats);
        } catch (err: any) {
            setError(err?.message || "حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlSecret = params.get("secret") || "";
        setSecret(urlSecret);

        if (urlSecret) {
            loadReport(urlSecret, "all");
        }
    }, []);

    const title = useMemo(() => {
        if (filter === "in_stock") return "المنتجات المتوفرة";
        if (filter === "out_of_stock") return "المنتجات غير المتوفرة";
        if (filter === "unknown") return "المنتجات غير الواضحة";
        return "كل نتائج فحص التوفر";
    }, [filter]);

    function changeFilter(value: string) {
        setFilter(value);
        loadReport(secret, value);
    }
    async function updateOneOfferStatus(
        id: number,
        status: "approved" | "rejected"
    ) {
        setActionLoading(`status-${id}`);
        setError("");

        try {
            const res = await fetch(
                `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        action: "update_offer_status",
                        id,
                        status,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok || !data.ok) {
                setError(data.error || "حدث خطأ أثناء تحديث المنتج");
                return;
            }

            setOffers((prev) =>
                prev.map((offer) =>
                    offer.id === id ? { ...offer, status } : offer
                )
            );
        } finally {
            setActionLoading("");
        }
    }

    async function bulkUpdateByAvailability(
        availability: "unknown" | "out_of_stock" | "in_stock",
        status: "approved" | "rejected"
    ) {
        const ok = window.confirm(
            `هل أنت متأكد؟ سيتم تحديث كل المنتجات ذات الحالة: ${availability}`
        );

        if (!ok) return;

        setActionLoading(`bulk-${availability}-${status}`);
        setError("");

        try {
            const res = await fetch(
                `/api/customer-offers/admin?secret=${encodeURIComponent(secret)}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        action: "bulk_update_stock_status",
                        availability,
                        status,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok || !data.ok) {
                setError(data.error || "حدث خطأ أثناء التحديث الجماعي");
                return;
            }

            await loadReport();

            alert(`تم تحديث ${data.updated} منتج`);
        } finally {
            setActionLoading("");
        }
    }

    return (
        <main className="page" dir="rtl">
            <section className="hero">
                <h1>📄 تقرير فحص توفر المنتجات</h1>
                <p>
                    هنا تظهر نتائج فحص التوفر مع رابط المنتج وسبب القرار، علشان تراجع
                    يدويًا قبل تحديث Merchant.
                </p>

                <div className="stats">
                    <div>
                        <strong>{stats.total}</strong>
                        <span>كل المنتجات</span>
                    </div>
                    <div>
                        <strong>{stats.inStock}</strong>
                        <span>متوفر</span>
                    </div>
                    <div>
                        <strong>{stats.outOfStock}</strong>
                        <span>غير متوفر</span>
                    </div>
                    <div>
                        <strong>{stats.unknown}</strong>
                        <span>غير واضح</span>
                    </div>
                </div>

                <div className="filters">
                    <button
                        className={filter === "all" ? "active" : ""}
                        onClick={() => changeFilter("all")}
                    >
                        الكل
                    </button>
                    <button
                        className={filter === "in_stock" ? "active" : ""}
                        onClick={() => changeFilter("in_stock")}
                    >
                        ✅ متوفر
                    </button>
                    <button
                        className={filter === "out_of_stock" ? "active" : ""}
                        onClick={() => changeFilter("out_of_stock")}
                    >
                        ❌ غير متوفر
                    </button>
                    <button
                        className={filter === "unknown" ? "active" : ""}
                        onClick={() => changeFilter("unknown")}
                    >
                        ❓ غير واضح
                    </button>
                </div>
                <div className="bulkActions">
                    <button
                        className="danger"
                        disabled={actionLoading === "bulk-unknown-rejected"}
                        onClick={() => bulkUpdateByAvailability("unknown", "rejected")}
                    >
                        ❌ رفض كل غير الواضح
                    </button>

                    <button
                        className="danger"
                        disabled={actionLoading === "bulk-out_of_stock-rejected"}
                        onClick={() => bulkUpdateByAvailability("out_of_stock", "rejected")}
                    >
                        ❌ رفض كل غير المتوفر
                    </button>

                    <button
                        className="success"
                        disabled={actionLoading === "bulk-in_stock-approved"}
                        onClick={() => bulkUpdateByAvailability("in_stock", "approved")}
                    >
                        ✅ موافقة كل المتوفر
                    </button>
                </div>

                <button className="reload" onClick={() => loadReport()}>
                    {loading ? "جاري التحميل..." : "تحديث التقرير"}
                </button>

                {error && <div className="error">{error}</div>}
            </section>

            <section className="tableBox">
                <h2>{title}</h2>

                <div className="tableWrap">
                    <table>
                        <thead>
                            <tr>
                                <th>الصورة</th>
                                <th>المنتج</th>
                                <th>الحالة</th>
                                <th>قرار الموقع</th>
                                <th>سبب الفحص</th>
                                <th>آخر فحص</th>
                                <th>الرابط</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {offers.map((offer) => (
                                <tr key={offer.id}>
                                    <td>
                                        <img src={offer.image_url} alt={offer.product_name} />
                                    </td>
                                    <td>
                                        <strong>{offer.product_name}</strong>
                                        <small>
                                            {offer.store_name || "متجر غير معروف"} -{" "}
                                            {offer.country || "دولة غير محددة"}
                                        </small>
                                        <small>{offer.price}</small>
                                    </td>
                                    <td>
                                        <span className={`badge ${offer.status}`}>
                                            {offer.status === "approved"
                                                ? "موافق عليه"
                                                : offer.status === "rejected"
                                                    ? "مرفوض"
                                                    : "قيد المراجعة"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`stock ${offer.availability || "unknown"}`}>
                                            {offer.availability === "in_stock"
                                                ? "✅ متوفر"
                                                : offer.availability === "out_of_stock"
                                                    ? "❌ غير متوفر"
                                                    : "❓ غير واضح"}
                                        </span>
                                    </td>
                                    <td>{offer.stock_check_note || "-"}</td>
                                    <td>
                                        {offer.last_stock_checked_at
                                            ? new Date(offer.last_stock_checked_at).toLocaleString(
                                                "ar-SA"
                                            )
                                            : "لم يتم الفحص"}
                                    </td>
                                    <td>
                                        <a
                                            href={offer.product_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            فتح المنتج
                                        </a>
                                    </td>
                                    <td>
  <div className="rowActions">
    <button
      className="success"
      disabled={actionLoading === `status-${offer.id}`}
      onClick={() => updateOneOfferStatus(offer.id, "approved")}
    >
      ✅ موافقة
    </button>

    <button
      className="danger"
      disabled={actionLoading === `status-${offer.id}`}
      onClick={() => updateOneOfferStatus(offer.id, "rejected")}
    >
      ❌ عدم موافقة
    </button>
  </div>
</td>
                                </tr>
                            ))}

                            {offers.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="empty">
                                        لا توجد نتائج
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <style>{`
        .page {
          min-height: 100vh;
          padding: 34px 16px 80px;
          color: white;
          background:
            radial-gradient(circle at 20% 10%, rgba(34,197,94,.14), transparent 28%),
            radial-gradient(circle at 80% 15%, rgba(37,99,235,.14), transparent 28%),
            #121212;
        }

        .hero {
          max-width: 1200px;
          margin: 0 auto 24px;
          text-align: center;
          padding: 26px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(34,197,94,.13), rgba(37,99,235,.10));
          border: 1px solid rgba(255,255,255,.09);
        }

        h1 {
          margin: 0 0 10px;
          font-size: 32px;
        }

        p {
          color: #d1d5db;
          line-height: 1.8;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 20px;
        }

        .stats div {
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
        }

        .stats strong {
          display: block;
          font-size: 32px;
          color: #86efac;
        }

        .stats span {
          color: #e5e7eb;
          font-weight: 900;
        }

        .filters {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .filters button,
        .reload {
          border: 0;
          border-radius: 999px;
          padding: 11px 18px;
          color: white;
          font-weight: 900;
          cursor: pointer;
          background: rgba(255,255,255,.1);
        }

        .filters button.active,
        .reload {
          background: linear-gradient(135deg, #16a34a, #2563eb);
        }

        .reload {
          margin-top: 16px;
        }

        .error {
          margin: 16px auto 0;
          max-width: 700px;
          padding: 12px;
          border-radius: 14px;
          color: #fecaca;
          background: rgba(239,68,68,.13);
          border: 1px solid rgba(239,68,68,.35);
        }

        .tableBox {
          max-width: 1350px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 24px;
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.08);
        }

        .tableBox h2 {
          margin: 0 0 16px;
        }

        .tableWrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px;
        }

        th,
        td {
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          vertical-align: middle;
          text-align: right;
          font-size: 13px;
        }

        th {
          color: #86efac;
          background: rgba(255,255,255,.04);
        }

        td img {
          width: 70px;
          height: 70px;
          object-fit: contain;
          background: white;
          border-radius: 10px;
          padding: 4px;
        }

        td strong {
          display: block;
          line-height: 1.6;
        }

        td small {
          display: block;
          color: #cbd5e1;
          margin-top: 4px;
        }

        a {
          color: #93c5fd;
          font-weight: 900;
        }

        .badge,
        .stock {
          display: inline-block;
          padding: 7px 10px;
          border-radius: 999px;
          font-weight: 900;
          white-space: nowrap;
        }

        .badge.approved,
        .stock.in_stock {
          background: rgba(34,197,94,.16);
          color: #bbf7d0;
        }

        .badge.rejected,
        .stock.out_of_stock {
          background: rgba(239,68,68,.16);
          color: #fecaca;
        }

        .badge.pending,
        .stock.unknown {
          background: rgba(234,179,8,.16);
          color: #fde68a;
        }

        .empty {
          text-align: center;
          color: #cbd5e1;
          padding: 30px;
        }
          .bulkActions,
.rowActions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.bulkActions {
  margin-top: 16px;
}

.bulkActions button,
.rowActions button {
  border: 0;
  border-radius: 999px;
  padding: 9px 14px;
  color: white;
  font-weight: 900;
  cursor: pointer;
}

.success {
  background: linear-gradient(135deg, #16a34a, #22c55e);
}

.danger {
  background: linear-gradient(135deg, #dc2626, #991b1b);
}

.bulkActions button:disabled,
.rowActions button:disabled {
  opacity: .55;
  cursor: not-allowed;
}

        @media (max-width: 800px) {
          .stats {
            grid-template-columns: 1fr 1fr;
          }

          h1 {
            font-size: 25px;
          }
        }
      `}</style>
        </main>
    );
}