"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAILS = ["gospstudio2030@gmail.com"];

export default function AdminImportFromSearchPage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("sa");
  const [category, setCategory] = useState("electronics");
  const [limit, setLimit] = useState(20);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"search" | "import" | "">("");
  const [message, setMessage] = useState("");

  async function handleSearch() {
    if (loading) return;

    setLoading(true);
    setMode("search");
    setMessage("");
    setResults([]);

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const email = data.session?.user?.email || "";

      if (!token || !ADMIN_EMAILS.includes(email)) {
        setMessage("غير مصرح");
        return;
      }

      const cleanQuery = query.trim();

      if (!cleanQuery) {
        setMessage("اكتب اسم المنتج الأول");
        return;
      }

      const res = await fetch("/api/admin/import-search-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: cleanQuery,
          country,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setMessage(json.error || "فشل البحث");
        return;
      }

      const items = Array.isArray(json.value) ? json.value : [];
      const sliced = items.slice(0, limit);

      setResults(sliced);
      setMessage(`تم جلب ${sliced.length} نتيجة من البحث العادي فقط`);
    } catch {
      setMessage("حدث خطأ أثناء البحث");
    } finally {
      setLoading(false);
      setMode("");
    }
  }

  async function handleImport() {
    if (loading || results.length === 0) return;

    setLoading(true);
    setMode("import");
    setMessage("جاري استيراد المنتجات...");

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const email = data.session?.user?.email || "";

      if (!token || !ADMIN_EMAILS.includes(email)) {
        setMessage("غير مصرح");
        return;
      }

      const res = await fetch("/api/customer-offers/admin-import-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          country,
          category: [category],
          items: results,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setMessage(json.error || "فشل الاستيراد");
        return;
      }

      setMessage(json.message || "تم الاستيراد بنجاح");
    } catch {
      setMessage("حدث خطأ أثناء الاستيراد");
    } finally {
      setLoading(false);
      setMode("");
    }
  }

  return (
    <main
      style={{
        maxWidth: 1050,
        margin: "40px auto",
        padding: 20,
        direction: "rtl",
        fontFamily: "system-ui, Arial",
      }}
    >
      <section
        style={{
          background: "linear-gradient(135deg,#0f172a,#111827)",
          color: "#fff",
          borderRadius: 22,
          padding: 24,
          boxShadow: "0 18px 45px rgba(0,0,0,.18)",
          marginBottom: 22,
        }}
      >
        <h1 style={{ margin: "0 0 8px", fontSize: 28 }}>
          📥 استيراد منتجات من نتائج البحث
        </h1>

        <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.8 }}>
          هذه الصفحة للأدمن فقط. البحث هنا يستخدم نتائج البحث العادية فقط بدون منتجات متجر BPS فوق النتائج، وبعدها يتم استيراد المنتجات كـ Pending.
        </p>
      </section>

      <section
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          padding: 18,
          boxShadow: "0 10px 30px rgba(15,23,42,.08)",
          marginBottom: 18,
        }}
      >
        <label style={{ display: "block", fontWeight: 800, marginBottom: 8 }}>
          اسم المنتج
        </label>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="مثال: ساعة ذكية"
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: 14,
            border: "1px solid #d1d5db",
            borderRadius: 12,
            fontSize: 16,
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              padding: "13px 14px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              minWidth: 150,
            }}
          >
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
            <option value="kw">الكويت</option>
            <option value="qa">قطر</option>
            <option value="bh">البحرين</option>
            <option value="eg">مصر</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "13px 14px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              minWidth: 190,
            }}
          >
            <option value="all">كل العروض</option>
            <option value="mobiles">جوالات وتابلت</option>
            <option value="electronics">إلكترونيات</option>
            <option value="computers">كمبيوتر ولابتوب</option>
            <option value="home">المنزل والمطبخ</option>
            <option value="beauty">جمال وعناية</option>
            <option value="fashion">ملابس</option>
            <option value="shoes">أحذية</option>
            <option value="sports">رياضة</option>
            <option value="kids">أطفال</option>
            <option value="cars">سيارات</option>
            <option value="cameras">كاميرات</option>
            <option value="camera_accessories">ملحقات كاميرات</option>
            <option value="mobile_accessories">إكسسوارات جوالات</option>
            <option value="smart_watch">ساعات ذكية</option>
            <option value="power_bank">باور بانك</option>
            <option value="chargers">شواحن وكابلات</option>
            <option value="headphones">سماعات</option>
            <option value="computer_accessories">إكسسوارات كمبيوتر</option>
            <option value="gaming">ألعاب وجيمينج</option>
            <option value="bags">شنط</option>
            <option value="other">المزيد</option>
          </select>

          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{
              padding: "13px 14px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              minWidth: 130,
            }}
          >
            <option value={10}>10 منتجات</option>
            <option value={20}>20 منتج</option>
            <option value={50}>50 منتج</option>
          </select>

          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: "14px 24px",
              borderRadius: 12,
              border: "none",
              background: loading && mode === "search" ? "#94a3b8" : "#2563eb",
              color: "#fff",
              fontWeight: 900,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 20px rgba(37,99,235,.22)",
            }}
          >
            {loading && mode === "search" ? "جاري البحث..." : "🔎 بحث"}
          </button>
        </div>

        {results.length > 0 && (
          <button
            onClick={handleImport}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 16,
              padding: "16px 22px",
              borderRadius: 14,
              border: "none",
              background:
                loading && mode === "import"
                  ? "#94a3b8"
                  : "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#fff",
              fontWeight: 900,
              fontSize: 18,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 25px rgba(34,197,94,.28)",
            }}
          >
            {loading && mode === "import"
              ? "جاري الاستيراد..."
              : `📥 استيراد ${results.length} منتج Pending`}
          </button>
        )}

        {message && (
          <div
            style={{
              marginTop: 14,
              padding: "12px 14px",
              borderRadius: 12,
              background: message.includes("فشل") || message.includes("غير") || message.includes("خطأ")
                ? "#fee2e2"
                : "#dcfce7",
              color: message.includes("فشل") || message.includes("غير") || message.includes("خطأ")
                ? "#991b1b"
                : "#166534",
              fontWeight: 800,
            }}
          >
            {message}
          </div>
        )}
      </section>

      <div style={{ marginTop: 25, display: "grid", gap: 12 }}>
        {results.map((item, i) => (
          <div
            key={`${item.url || item.link || i}`}
            style={{
              display: "flex",
              gap: 14,
              border: "1px solid #e5e7eb",
              padding: 12,
              borderRadius: 14,
              background: "#fff",
              boxShadow: "0 6px 18px rgba(15,23,42,.06)",
              alignItems: "center",
            }}
          >
            <img
              src={item.image || "https://placehold.co/120x120?text=BPS"}
              width={92}
              height={92}
              style={{
                objectFit: "contain",
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #eef2f7",
              }}
              alt={item.title || item.name || "product"}
            />

            <div style={{ flex: 1 }}>
              <strong style={{ display: "block", marginBottom: 8 }}>
                {item.title || item.name}
              </strong>

              <div style={{ fontWeight: 900, color: "#16a34a" }}>
                {item.priceText || item.price}
              </div>

              <div style={{ color: "#475569", marginTop: 4 }}>
                {item.store || item.source || "Unknown store"}
              </div>

              {(item.url || item.link) && (
                <a
                  href={item.url || item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    color: "#2563eb",
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  فتح المنتج ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}