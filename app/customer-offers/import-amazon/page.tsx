"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const categoryLabels: Record<string, string> = {
  electronics: "إلكترونيات",
  mobiles: "موبايلات",
  mobile_accessories: "إكسسوارات جوالات",
  smart_watch: "ساعات ذكية",
  power_bank: "باور بانك",
  chargers: "شواحن وكابلات",
  headphones: "سماعات",
  computers: "كمبيوتر ولابتوب",
  computer_accessories: "إكسسوارات كمبيوتر",
  gaming: "ألعاب وجيمينج",
  home: "المنزل والمطبخ",
  fashion: "أزياء",
  shoes: "أحذية",
  bags: "شنط",
  beauty: "جمال وعناية",
  cars: "سيارات وإكسسوارات",
  kids: "أطفال",
  sports: "رياضة",
  cameras: "كاميرات",
  camera_accessories: "ملحقات كاميرات",
  other: "أخرى",
};

const countryLabels: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  eg: "مصر",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
};

export default function ImportAmazonPage() {
  const [accessToken, setAccessToken] = useState("");
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bulkItems, setBulkItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token || "";
      setAccessToken(token);
      setChecking(false);
    }

    checkUser();
  }, []);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("bps_bulk_items") || "[]");

  const params = new URLSearchParams(window.location.search);
  const rawItem = params.get("item");

  if (!rawItem) {
    setBulkItems(saved);
    return;
  }

  try {
    let item;

    try {
      item = JSON.parse(rawItem);
    } catch {
      item = JSON.parse(decodeURIComponent(rawItem));
    }

    const updated = [...saved, item];

    localStorage.setItem("bps_bulk_items", JSON.stringify(updated));
    setBulkItems(updated);

    window.history.replaceState({}, "", "/customer-offers/import-amazon");
  } catch (err) {
    console.error("BPS_IMPORT_ITEM_PARSE_ERROR:", err);
    setBulkItems(saved);
    alert("المنتج وصل للصفحة لكن حصل خطأ في قراءته");
  }
}, []);

  function removeItem(index: number) {
    const updated = bulkItems.filter((_, i) => i !== index);
    localStorage.setItem("bps_bulk_items", JSON.stringify(updated));
    setBulkItems(updated);
  }

  function clearAll() {
    if (!confirm("تمسح كل المنتجات المجمعة؟")) return;
    localStorage.removeItem("bps_bulk_items");
    setBulkItems([]);
    setError("");
  }

  async function uploadBulkItems() {
    if (!bulkItems.length) {
      alert("مفيش منتجات مجمعة");
      return;
    }

    if (!confirm(`هترفع ${bulkItems.length} منتج للمراجعة. تكمل؟`)) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/customer-offers/import-manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ items: bulkItems }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "فشل رفع المنتجات");
        return;
      }

      localStorage.removeItem("bps_bulk_items");
      setBulkItems([]);
      alert(data.message || "تم رفع المنتجات بنجاح ✅");
    } catch {
      setError("حدث خطأ أثناء رفع المنتجات");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="page" dir="rtl">
        <div className="card">⏳ جاري التحقق من تسجيل الدخول...</div>
        <style>{style}</style>
      </main>
    );
  }

  if (!accessToken) {
    return (
      <main className="page" dir="rtl">
        <div className="card center">
          <h1>سجّل دخول الأول</h1>
          <p>لازم تسجل دخول علشان ترفع المنتجات المجمعة.</p>
          <Link href="/login" className="btn">
            تسجيل الدخول
          </Link>
        </div>
        <style>{style}</style>
      </main>
    );
  }

  return (
    <main className="page" dir="rtl">
      <section className="hero">
        <Link href="/customer-offers/add" className="back">
          ← رجوع لإضافة عرض يدوي
        </Link>

        <h1>استيراد منتجات أمازون من البوكمارك</h1>

        <p>
          افتح منتج أمازون واضغط BPS Add To List. المنتجات هتظهر هنا بالاسم
          والسعر والصورة والكاتيجري، وبعدها ارفعهم كلهم مرة واحدة.
        </p>
      </section>

      <section className="card">
        <div className="topBar">
          <div>
            <h2>المنتجات المجمعة</h2>
            <p>العدد الحالي: {bulkItems.length}</p>
          </div>

          <button type="button" className="clearBtn" onClick={clearAll}>
            مسح الكل
          </button>
        </div>

        <button
          type="button"
          className="uploadBtn"
          onClick={uploadBulkItems}
          disabled={loading || !bulkItems.length}
        >
          {loading
            ? "جاري رفع المنتجات..."
            : `🚀 رفع ${bulkItems.length} منتج للمراجعة`}
        </button>

        {error && <div className="error">{error}</div>}

        {!bulkItems.length ? (
          <div className="empty">
            <h3>مفيش منتجات لسه</h3>
            <p>
              افتح منتج أمازون واضغط على بوكمارك BPS Add To List، وبعدها ارجع
              هنا.
            </p>
          </div>
        ) : (
          <div className="products">
            {bulkItems.map((item, index) => {
              const cats = Array.isArray(item.category)
                ? item.category
                : [item.category];

              return (
                <div className="product" key={index}>
                  <img src={item.image_url} alt={item.product_name} />

                  <div className="productInfo">
                    <h3>{item.product_name}</h3>

                    <div className="meta">
                      <span>💰 {item.price}</span>
                      <span>🌍 {countryLabels[item.country] || item.country}</span>
                      <span>🏪 {item.store_name}</span>
                    </div>

                    <div className="cats">
                      {cats.map((cat: string) => (
                        <span key={cat}>{categoryLabels[cat] || cat}</span>
                      ))}
                    </div>

                    <a href={item.product_url} target="_blank">
                      فتح رابط الأفلييت
                    </a>
                  </div>

                  <button
                    type="button"
                    className="removeBtn"
                    onClick={() => removeItem(index)}
                  >
                    حذف
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <style>{style}</style>
    </main>
  );
}

const style = `
.page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 10%, rgba(34,197,94,0.16), transparent 30%),
    radial-gradient(circle at 80% 20%, rgba(37,99,235,0.16), transparent 30%),
    linear-gradient(180deg, #181818 0%, #212121 60%, #111 100%);
  color: #fff;
  padding: 40px 16px 80px;
}

.hero,
.card {
  max-width: 980px;
  margin: 0 auto 22px;
  border-radius: 28px;
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 20px 70px rgba(0,0,0,0.35);
}

.hero {
  padding: 34px 22px;
  text-align: center;
}

.card {
  padding: 22px;
}

.center {
  text-align: center;
}

.back {
  color: #bbf7d0;
  text-decoration: none;
  font-weight: 900;
}

.hero h1 {
  margin: 18px 0 10px;
  font-size: clamp(28px, 5vw, 48px);
  line-height: 1.25;
  background: linear-gradient(135deg, #fff, #86efac, #60a5fa);
  -webkit-background-clip: text;
  color: transparent;
}

.hero p,
.card p {
  color: #ddd;
  line-height: 1.9;
}

.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(0,0,0,0.20);
  border: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 16px;
}

.topBar h2 {
  margin: 0 0 4px;
}

.topBar p {
  margin: 0;
  color: #bbf7d0;
  font-weight: 900;
}

.clearBtn,
.removeBtn {
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  background: rgba(239,68,68,0.18);
  color: #fecaca;
  font-weight: 950;
}

.uploadBtn,
.btn {
  width: 100%;
  border: 0;
  cursor: pointer;
  padding: 16px 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, #16a34a, #22c55e, #2563eb);
  color: white;
  font-weight: 950;
  font-size: 17px;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-bottom: 18px;
}

.uploadBtn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.error {
  background: rgba(239,68,68,0.15);
  border: 1px solid rgba(239,68,68,0.35);
  color: #fecaca;
  padding: 12px;
  border-radius: 14px;
  font-weight: 900;
  margin-bottom: 16px;
}

.empty {
  text-align: center;
  padding: 40px 16px;
  border-radius: 22px;
  background: rgba(0,0,0,0.22);
  border: 1px dashed rgba(255,255,255,0.18);
}

.products {
  display: grid;
  gap: 14px;
}

.product {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 14px;
  align-items: center;
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 20px;
  padding: 12px;
}

.product img {
  width: 110px;
  height: 110px;
  object-fit: contain;
  background: #111;
  border-radius: 14px;
}

.productInfo h3 {
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.7;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.meta span {
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  color: #d1fae5;
  font-weight: 900;
}

.cats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.cats span {
  background: rgba(37,99,235,0.18);
  border: 1px solid rgba(96,165,250,0.25);
  color: #bfdbfe;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}

.product a {
  color: #86efac;
  font-weight: 900;
  text-decoration: none;
}

@media (max-width: 800px) {
  .topBar {
    flex-direction: column;
    align-items: stretch;
  }

  .product {
    grid-template-columns: 1fr;
  }

  .product img {
    width: 100%;
    height: 180px;
  }

  .removeBtn {
    width: 100%;
  }
}
`;