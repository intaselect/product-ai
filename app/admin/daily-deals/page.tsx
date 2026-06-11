"use client";

import { useEffect, useMemo, useState } from "react";

type Deal = {
  id: number;
  title: string;
  image_url: string | null;
  product_url: string;
  store_name: string | null;
  country: string | null;
  category: string[] | null;
  old_price: number | null;
  new_price: number | null;
  discount_percent: number | null;
  status: string | null;
  created_at: string;
  updated_at: string;
};

const countries = [
  { value: "sa", label: "السعودية" },
  { value: "ae", label: "الإمارات" },
  { value: "kw", label: "الكويت" },
  { value: "qa", label: "قطر" },
  { value: "bh", label: "البحرين" },
  { value: "eg", label: "مصر" },
];

const categories = [
  { value: "mobiles", label: "جوالات وتابلت" },
  { value: "electronics", label: "إلكترونيات" },
  { value: "computers", label: "كمبيوتر ولابتوب" },
  { value: "home", label: "المنزل والمطبخ" },
  { value: "beauty", label: "جمال وعناية" },
  { value: "fashion", label: "ملابس" },
  { value: "shoes", label: "أحذية" },
  { value: "sports", label: "رياضة" },
  { value: "kids", label: "أطفال وألعاب" },
  { value: "gaming", label: "جيمينج" },
  { value: "watches", label: "ساعات" },
  { value: "smartwatches", label: "ساعات ذكية" },
  { value: "perfumes", label: "عطور" },
  { value: "makeup", label: "مكياج" },
  { value: "skincare", label: "العناية بالبشرة" },
  { value: "earphones", label: "سماعات" },
  { value: "phone_accessories", label: "إكسسوارات الجوال" },
  { value: "power_bank", label: "باور بانك" },
  { value: "cars", label: "سيارات وإكسسوارات" },
  { value: "tools", label: "أدوات ومعدات" },
  { value: "office", label: "مستلزمات مكتبية" },
  { value: "pets", label: "مستلزمات الحيوانات" },
  { value: "books", label: "كتب" },
  { value: "food", label: "أغذية ومشروبات" },
  { value: "other", label: "أخرى" },
];

const emptyForm = {
  title: "",
  image_url: "",
  product_url: "",
  store_name: "",
  country: "sa",
  category: ["electronics"],
  old_price: "",
  new_price: "",
};

export default function DailyDealsAdminPage() {
  const [secret, setSecret] = useState("");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const urlSecret = params.get("secret") || "";

  setSecret(urlSecret);

  setForm({
    ...emptyForm,
    title: params.get("title") || "",
    image_url: params.get("image_url") || "",
    product_url: params.get("product_url") || "",
    store_name: params.get("store_name") || "",
    country: params.get("country") || "sa",
    old_price: params.get("old_price") || "",
    new_price: params.get("new_price") || "",
  });

  if (urlSecret) loadDeals(urlSecret);
}, []);

  const discountPreview = useMemo(() => {
    const oldPrice = Number(form.old_price || 0);
    const newPrice = Number(form.new_price || 0);
    if (!oldPrice || !newPrice || oldPrice <= newPrice) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  }, [form.old_price, form.new_price]);

  async function loadDeals(adminSecret = secret) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/daily-deals/admin?secret=${encodeURIComponent(adminSecret)}`
      );
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء تحميل العروض");
        return;
      }

      setDeals(data.deals || []);
    } catch {
      setError("حدث خطأ غير متوقع أثناء تحميل العروض");
    } finally {
      setLoading(false);
    }
  }

  function updateField(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleCategory(value: string) {
    setForm((prev) => {
      const exists = prev.category.includes(value);
      return {
        ...prev,
        category: exists
          ? prev.category.filter((c) => c !== value)
          : [...prev.category, value],
      };
    });
  }

  function editDeal(deal: Deal) {
    setEditingId(deal.id);
    setForm({
      title: deal.title || "",
      image_url: deal.image_url || "",
      product_url: deal.product_url || "",
      store_name: deal.store_name || "",
      country: deal.country || "sa",
      category: deal.category?.length ? deal.category : ["electronics"],
      old_price: String(deal.old_price || ""),
      new_price: String(deal.new_price || ""),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setMessage("");
  }

  async function submitDeal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setActionLoading("save");
    setError("");
    setMessage("");

    const payload = {
      ...form,
      old_price: Number(form.old_price || 0),
      new_price: Number(form.new_price || 0),
    };

    try {
      const res = await fetch(
        `/api/daily-deals/admin?secret=${encodeURIComponent(secret)}`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء حفظ العرض");
        return;
      }

      setMessage(editingId ? "تم تعديل العرض ✅" : "تم إضافة العرض ✅");

      if (editingId) {
        setDeals((prev) =>
          prev.map((d) => (d.id === editingId ? data.deal : d))
        );
      } else {
        setDeals((prev) => [data.deal, ...prev]);
      }

      resetForm();
    } catch {
      setError("حدث خطأ غير متوقع أثناء الحفظ");
    } finally {
      setActionLoading("");
    }
  }

  async function deleteDeal(id: number) {
    if (!confirm("متأكد إنك عايز تحذف العرض؟")) return;

    setActionLoading(`delete-${id}`);
    setError("");

    try {
      const res = await fetch(
        `/api/daily-deals/admin?secret=${encodeURIComponent(secret)}&id=${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء حذف العرض");
        return;
      }

      setDeals((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("حدث خطأ غير متوقع أثناء الحذف");
    } finally {
      setActionLoading("");
    }
  }

  return (
    <main className="dailyAdminPage" dir="rtl">
      <section className="adminHero">
        <h1>🔥 إدارة عروض اليوم</h1>
        <p>أضف عروض نون وأمازون والمتاجر الكبيرة مع السعر قبل وبعد الخصم.</p>

        {!secret && (
          <div className="secretBox">
            افتح الصفحة بالرابط السري:
            <br />
            <code>/admin/daily-deals?secret=YOUR_SECRET</code>
          </div>
        )}

        {secret && (
          <button onClick={() => loadDeals()} disabled={loading}>
            {loading ? "جاري التحميل..." : "تحديث العروض"}
          </button>
        )}

        {error && <div className="errorMsg">{error}</div>}
        {message && <div className="successMsg">{message}</div>}
      </section>

      {secret && (
        <>
          <section className="formBox">
            <h2>{editingId ? "✏️ تعديل عرض" : "➕ إضافة عرض جديد"}</h2>

            <form onSubmit={submitDeal} className="dealForm">
              <label>
                اسم العرض *
                <input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                  placeholder="مثال: iPhone 15 Pro Max خصم قوي"
                />
              </label>

              <label>
                رابط الصورة
                <input
                  value={form.image_url}
                  onChange={(e) => updateField("image_url", e.target.value)}
                  placeholder="https://..."
                />
              </label>

              <label>
                رابط المنتج *
                <input
                  value={form.product_url}
                  onChange={(e) => updateField("product_url", e.target.value)}
                  required
                  placeholder="https://..."
                />
              </label>

              <label>
                اسم المتجر
                <input
                  value={form.store_name}
                  onChange={(e) => updateField("store_name", e.target.value)}
                  placeholder="noon / amazon / jarir"
                />
              </label>

              <div className="twoCols">
                <label>
                  السعر قبل الخصم
                  <input
                    type="number"
                    value={form.old_price}
                    onChange={(e) => updateField("old_price", e.target.value)}
                    placeholder="1999"
                  />
                </label>

                <label>
                  السعر بعد الخصم *
                  <input
                    type="number"
                    value={form.new_price}
                    onChange={(e) => updateField("new_price", e.target.value)}
                    required
                    placeholder="1499"
                  />
                </label>
              </div>

              <div className="discountPreview">
                🔥 الخصم المتوقع: <strong>{discountPreview}%</strong>
              </div>

              <label>
                الدولة
                <select
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                >
                  {countries.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="categoryBox">
                <span>التصنيفات</span>
                <div className="categoryGrid">
                  {categories.map((cat) => (
                    <label key={cat.value}>
                      <input
                        type="checkbox"
                        checked={form.category.includes(cat.value)}
                        onChange={() => toggleCategory(cat.value)}
                      />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="formActions">
                <button type="submit" disabled={actionLoading === "save"}>
                  {actionLoading === "save"
                    ? "جاري الحفظ..."
                    : editingId
                    ? "حفظ التعديل"
                    : "إضافة العرض"}
                </button>

                {editingId && (
                  <button type="button" onClick={resetForm} className="cancelBtn">
                    إلغاء التعديل
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="statsBox">
            <div>
              <strong>{deals.length}</strong>
              <span>إجمالي العروض</span>
            </div>
          </section>

          <section className="dealsGrid">
            {deals.map((deal) => (
              <article key={deal.id} className="dealCard">
                <div className="imageBox">
                  {deal.discount_percent ? (
                    <div className="discountBadge">
                      خصم {Math.round(Number(deal.discount_percent))}%
                    </div>
                  ) : null}

                  {deal.image_url ? (
                    <img src={deal.image_url} alt={deal.title} />
                  ) : (
                    <div className="noImage">لا توجد صورة</div>
                  )}
                </div>

                <div className="content">
                  <h2>{deal.title}</h2>

                  <p className="store">🏬 {deal.store_name || "متجر غير محدد"}</p>
                  <p className="store">🌍 {deal.country || "sa"}</p>

                  <div className="prices">
                    <span>قبل: {deal.old_price || "-"}</span>
                    <strong>الآن: {deal.new_price}</strong>
                  </div>

                  <a
                    href={deal.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="openBtn"
                  >
                    فتح العرض
                  </a>

                  <div className="cardActions">
                    <button onClick={() => editDeal(deal)} className="editBtn">
                      ✏️ تعديل
                    </button>

                    <button
                      onClick={() => deleteDeal(deal.id)}
                      disabled={actionLoading === `delete-${deal.id}`}
                      className="deleteBtn"
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      <style>{`
        .dailyAdminPage {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 10%, rgba(249,115,22,.16), transparent 28%),
            radial-gradient(circle at 80% 15%, rgba(34,197,94,.14), transparent 28%),
            #151515;
          color: white;
          padding: 36px 16px 80px;
        }

        .adminHero,
        .formBox,
        .statsBox {
          max-width: 1100px;
          margin: 0 auto 24px;
          border-radius: 28px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.09);
          box-shadow: 0 20px 60px rgba(0,0,0,.35);
        }

        .adminHero {
          text-align: center;
          padding: 28px;
          background: linear-gradient(135deg, rgba(249,115,22,.16), rgba(34,197,94,.12));
        }

        .adminHero h1 {
          margin: 0 0 10px;
          font-size: 36px;
        }

        .adminHero p {
          color: #d1d5db;
          line-height: 1.8;
        }

        .adminHero button,
        .dealForm button {
          border: 0;
          border-radius: 999px;
          padding: 13px 24px;
          background: linear-gradient(135deg, #f97316, #16a34a);
          color: white;
          font-weight: 950;
          cursor: pointer;
        }

        .secretBox,
        .errorMsg,
        .successMsg {
          max-width: 720px;
          margin: 16px auto 0;
          padding: 14px;
          border-radius: 16px;
          line-height: 1.8;
        }

        .secretBox {
          background: rgba(255,255,255,.07);
        }

        .errorMsg {
          background: rgba(239,68,68,.13);
          border: 1px solid rgba(239,68,68,.35);
          color: #fecaca;
        }

        .successMsg {
          background: rgba(34,197,94,.13);
          border: 1px solid rgba(34,197,94,.35);
          color: #bbf7d0;
        }

        .formBox {
          padding: 24px;
        }

        .formBox h2 {
          margin: 0 0 18px;
        }

        .dealForm {
          display: grid;
          gap: 14px;
        }

        .dealForm label,
        .categoryBox {
          display: grid;
          gap: 8px;
          color: #f3f4f6;
          font-weight: 900;
          font-size: 14px;
        }

        .dealForm input,
        .dealForm select {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,.13);
          background: #111;
          color: white;
          border-radius: 16px;
          padding: 14px 15px;
          font-size: 15px;
          outline: none;
        }

        .twoCols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .discountPreview {
          padding: 14px;
          border-radius: 18px;
          background: rgba(249,115,22,.13);
          border: 1px solid rgba(249,115,22,.3);
          font-weight: 950;
        }

        .discountPreview strong {
          color: #fdba74;
          font-size: 22px;
        }

        .categoryGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .categoryGrid label {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #111;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 14px;
          padding: 11px;
          cursor: pointer;
        }

        .categoryGrid input {
          width: auto;
        }

        .formActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cancelBtn {
          background: #64748b !important;
        }

        .statsBox {
          padding: 18px;
          text-align: center;
        }

        .statsBox strong {
          display: block;
          font-size: 44px;
          color: #86efac;
        }

        .statsBox span {
          color: #d1d5db;
          font-weight: 900;
        }

        .dealsGrid {
          max-width: 1250px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
        }

        .dealCard {
          overflow: hidden;
          border-radius: 24px;
          background: linear-gradient(180deg, #222, #151515);
          border: 1px solid rgba(255,255,255,.09);
          box-shadow: 0 20px 50px rgba(0,0,0,.35);
        }

        .imageBox {
          position: relative;
          height: 230px;
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

        .discountBadge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: linear-gradient(135deg, #ef4444, #f97316);
          color: white;
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 950;
          z-index: 2;
        }

        .noImage {
          color: #94a3b8;
          font-weight: 900;
        }

        .content {
          padding: 16px;
        }

        .content h2 {
          font-size: 17px;
          line-height: 1.6;
          margin: 0 0 10px;
        }

        .store {
          color: #cfcfcf;
          margin: 6px 0;
          font-size: 13px;
        }

        .prices {
          display: grid;
          gap: 8px;
          margin: 14px 0;
        }

        .prices span {
          color: #fca5a5;
          text-decoration: line-through;
          font-weight: 900;
        }

        .prices strong {
          color: #86efac;
          font-size: 24px;
          font-weight: 950;
        }

        .openBtn {
          display: block;
          text-align: center;
          padding: 12px;
          border-radius: 14px;
          background: white;
          color: #111;
          text-decoration: none;
          font-weight: 950;
          margin-bottom: 10px;
        }

        .cardActions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .cardActions button {
          border: 0;
          border-radius: 12px;
          padding: 11px;
          color: white;
          font-weight: 950;
          cursor: pointer;
        }

        .editBtn {
          background: #2563eb;
        }

        .deleteBtn {
          background: #dc2626;
        }

        button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        @media (max-width: 700px) {
          .dailyAdminPage {
            padding: 24px 12px 60px;
          }

          .twoCols,
          .dealsGrid {
            grid-template-columns: 1fr;
          }

          .categoryGrid {
            grid-template-columns: 1fr 1fr;
          }

          .adminHero h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}