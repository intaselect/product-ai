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
  const [message, setMessage] = useState("");

  async function getVisitorId() {
    let id = localStorage.getItem("bps_visitor_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("bps_visitor_id", id);
    }
    return id;
  }

  async function handleSearch() {
    setLoading(true);
    setMessage("");

    const { data } = await supabase.auth.getSession();
    const email = data.session?.user?.email || "";

    if (!ADMIN_EMAILS.includes(email)) {
      setMessage("غير مصرح");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-bps-visitor-id": await getVisitorId(),
        "x-bps-user-email": email,
      },
      body: JSON.stringify({ query, country }),
    });

    const json = await res.json();
    const items = json?.value || json?.products || [];

    setResults(Array.isArray(items) ? items.slice(0, limit) : []);
    setLoading(false);
  }

  async function handleImport() {
    setLoading(true);
    setMessage("");

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      setMessage("لازم تسجل دخول");
      setLoading(false);
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
    setMessage(json.message || json.error || "تم");
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20, direction: "rtl" }}>
      <h1>استيراد منتجات من نتائج البحث</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="اسم المنتج"
        style={{ width: "100%", padding: 12, marginBottom: 10 }}
      />

      <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ padding: 12 }}>
        <option value="sa">السعودية</option>
        <option value="ae">الإمارات</option>
        <option value="kw">الكويت</option>
        <option value="qa">قطر</option>
        <option value="bh">البحرين</option>
        <option value="eg">مصر</option>
      </select>

     <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 12, marginRight: 10 }}>
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

      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} style={{ padding: 12, marginRight: 10 }}>
        <option value={10}>10 منتجات</option>
        <option value={20}>20 منتج</option>
        <option value={50}>50 منتج</option>
      </select>

      <div style={{ marginTop: 15 }}>
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "جاري..." : "بحث"}
        </button>

        {results.length > 0 && (
          <button onClick={handleImport} disabled={loading} style={{ marginRight: 10 }}>
            استيراد {results.length} منتج Pending
          </button>
        )}
      </div>

      {message && <p>{message}</p>}

      <div style={{ marginTop: 25, display: "grid", gap: 12 }}>
        {results.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, border: "1px solid #ddd", padding: 10 }}>
            <img src={item.image} width={90} height={90} style={{ objectFit: "contain" }} />
            <div>
              <strong>{item.title || item.name}</strong>
              <div>{item.priceText || item.price}</div>
              <div>{item.store || item.source}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}