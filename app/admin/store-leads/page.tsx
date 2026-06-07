"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  store_name: string;
  website: string;
  platform: string;
  country: string;
  email: string | null;
  whatsapp: string | null;
  instagram: string | null;
  status: string;
  notes: string | null;
};

export default function StoreLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadLeads() {
    const res = await fetch("/api/admin/store-leads");
    const data = await res.json();
    setLeads(data.leads || []);
  }

  async function importUrls() {
    setLoading(true);

    await fetch("/api/admin/store-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        urls: urls
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean),
      }),
    });

    setUrls("");
    await loadLeads();
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/store-leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    await loadLeads();
  }

  useEffect(() => {
    loadLeads();
  }, []);
async function discoverStores(type: string) {
  setLoading(true);

  await fetch("/api/admin/store-leads/discover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  });

  await loadLeads();
  setLoading(false);
}
  return (
    <main dir="rtl" style={{ padding: 24, maxWidth: 1300, margin: "0 auto" }}>
      <h1>إدارة أصحاب المتاجر</h1>
<div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    margin: "18px 0",
  }}
>
 <button onClick={() => discoverStores("sa")} disabled={loading}>
  {loading ? "جاري الجلب..." : "🔍 جلب متاجر السعودية"}
</button>

  <button onClick={() => discoverStores("perfumes")} disabled={loading}>
    🌸 جلب متاجر العطور
  </button>

  <button onClick={() => discoverStores("mobiles")} disabled={loading}>
    📱 جلب متاجر الجوالات
  </button>

  <button onClick={() => discoverStores("fashion")} disabled={loading}>
    👗 جلب متاجر الملابس
  </button>
</div>

      <section
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 18,
          marginBottom: 25,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h2>استيراد متاجر</h2>

        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder={`ضع روابط المتاجر هنا، كل رابط في سطر
https://example.com
https://store-name.com/contact`}
          style={{
            width: "100%",
            minHeight: 150,
            padding: 15,
            borderRadius: 14,
            border: "1px solid #ddd",
            direction: "ltr",
          }}
        />

        <button
          onClick={importUrls}
          disabled={loading || !urls.trim()}
          style={{
            marginTop: 12,
            padding: "12px 22px",
            borderRadius: 999,
            border: 0,
            background: "linear-gradient(135deg,#2563eb,#f97316)",
            color: "#fff",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          {loading ? "جاري الاستيراد..." : "استيراد المتاجر"}
        </button>
      </section>

      <section
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          overflowX: "auto",
        }}
      >
        <h2>العملاء المحتملين: {leads.length}</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>المتجر</th>
              <th>المنصة</th>
              <th>الرابط</th>
              <th>واتساب</th>
              <th>إيميل</th>
              <th>إنستجرام</th>
              <th>الحالة</th>
              <th>إجراء</th>
            </tr>
          </thead>

          <tbody>
           {leads.map((lead) => (
  <tr key={lead.id} style={{ borderTop: "1px solid #eee" }}>
    <td>{lead.store_name}</td>
    <td>{lead.platform}</td>

    <td>
      <a
        href={lead.website}
        target="_blank"
        rel="noopener noreferrer"
      >
        فتح
      </a>
    </td>

    <td>
      {lead.whatsapp ? (
        <a
          href={lead.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          واتساب
        </a>
      ) : (
        "-"
      )}
    </td>

    <td>{lead.email || "-"}</td>

    <td>
      {lead.instagram ? (
        <a
          href={lead.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      ) : (
        "-"
      )}
    </td>

    <td>{lead.status}</td>

    <td style={{ display: "flex", gap: 6 }}>
      <button onClick={() => updateStatus(lead.id, "contacted")}>
        تم التواصل
      </button>

      <button onClick={() => updateStatus(lead.id, "interested")}>
        مهتم
      </button>

      <button onClick={() => updateStatus(lead.id, "customer")}>
        عميل
      </button>
    </td>
  </tr>
))}
          </tbody>
        </table>
      </section>
    </main>
  );
}