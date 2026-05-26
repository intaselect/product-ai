"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const categories = [
  ["electronics", "إلكترونيات"],
  ["mobiles", "موبايلات"],
  ["mobile_accessories", "إكسسوارات جوالات"],
  ["smart_watch", "ساعات ذكية"],
  ["power_bank", "باور بانك"],
  ["chargers", "شواحن وكابلات"],
  ["headphones", "سماعات"],
  ["computers", "كمبيوتر ولابتوب"],
  ["computer_accessories", "إكسسوارات كمبيوتر"],
  ["gaming", "ألعاب وجيمينج"],
  ["home", "المنزل والمطبخ"],
  ["fashion", "ملابس"],
  ["shoes", "أحذية"],
  ["bags", "شنط"],
  ["beauty", "جمال وعناية"],
  ["cars", "سيارات وإكسسوارات"],
  ["kids", "أطفال"],
  ["sports", "رياضة"],
  ["other", "أخرى"],
];

export default function ImportAmazonPage() {
  const [accessToken, setAccessToken] = useState("");
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState("");
  const [country, setCountry] = useState("sa");
  const [affiliateTag, setAffiliateTag] = useState("bpschatksa-21");
  const [category, setCategory] = useState("electronics");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      setAccessToken(data.session?.access_token || "");
      setChecking(false);
    }

    checkUser();
  }, []);

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/customer-offers/import-amazon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          urls,
          country,
          affiliateTag,
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء الاستيراد");
        return;
      }

      setResult(data);
    } catch {
      setError("حدث خطأ غير متوقع");
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
        <div className="card">
          <h1>سجّل دخول الأول</h1>
          <p>لازم تسجل دخول علشان تستورد منتجات أمازون.</p>
          <Link href="/login" className="btn">تسجيل الدخول</Link>
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

        <h1>استيراد منتجات أمازون بالجملة</h1>
        <p>
          حط روابط أمازون، اختار الدولة، اكتب كود الأفلييت، واختار كاتيجري
          واحدة. المنتجات هتتحفظ Pending لحد ما توافق عليها.
        </p>
      </section>

      <form onSubmit={handleImport} className="form">
        <label>
          روابط أمازون
          <textarea
            required
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder={`حط كل رابط في سطر\nhttps://www.amazon.sa/.../dp/B0FPG2DK8N\nhttps://www.amazon.sa/.../dp/B0GNK19RLH`}
          />
        </label>

        <label>
          الدولة
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
            <option value="eg">مصر</option>
          </select>
        </label>

        <label>
          كود الأفلييت
          <input
            required
            value={affiliateTag}
            onChange={(e) => setAffiliateTag(e.target.value)}
            placeholder="مثال: bpschatksa-21"
          />
        </label>

        <label>
          الكاتيجري لكل المنتجات
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {error && <div className="error">{error}</div>}

        <button disabled={loading} type="submit">
          {loading ? "جاري جلب المنتجات..." : "🚀 استيراد المنتجات"}
        </button>

        <p className="note">
          مهم: بدون Amazon PA-API جلب السعر والصورة ممكن يفشل لبعض المنتجات.
          الروابط الناجحة فقط هتتحفظ.
        </p>
      </form>

      {result && (
        <section className="result">
          <h2>نتيجة الاستيراد</h2>

          <div className="stats">
            <div>
              <strong>{result.imported}</strong>
              <span>تم استيرادها</span>
            </div>
            <div>
              <strong>{result.failed}</strong>
              <span>فشلت</span>
            </div>
          </div>

          {result.success?.length > 0 && (
            <>
              <h3>المنتجات الناجحة</h3>
              <div className="grid">
                {result.success.map((item: any) => (
                  <div className="product" key={item.asin}>
                    <img src={item.image_url} alt={item.product_name} />
                    <div>
                      <b>{item.product_name}</b>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {result.failedItems?.length > 0 && (
            <>
              <h3>روابط فشلت</h3>
              <div className="failed">
                {result.failedItems.map((item: any, index: number) => (
                  <div key={index}>
                    <b>{item.reason}</b>
                    <small>{item.url}</small>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

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
.form,
.result,
.card {
  max-width: 850px;
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

.hero p {
  margin: 0 auto;
  max-width: 700px;
  color: #ddd;
  line-height: 1.9;
}

.form {
  padding: 22px;
  display: grid;
  gap: 16px;
}

.form label {
  display: grid;
  gap: 8px;
  font-weight: 900;
}

.form input,
.form select,
.form textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(255,255,255,0.13);
  background: #151515;
  color: white;
  border-radius: 16px;
  padding: 14px 15px;
  font-size: 15px;
  outline: none;
}

.form textarea {
  min-height: 210px;
  resize: vertical;
  direction: ltr;
  text-align: left;
}

.form button,
.btn {
  border: 0;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, #16a34a, #22c55e, #2563eb);
  color: white;
  font-weight: 950;
  font-size: 16px;
  text-decoration: none;
  text-align: center;
}

.form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.note {
  margin: 0;
  color: #fef3c7;
  line-height: 1.8;
  font-size: 13px;
}

.error {
  background: rgba(239,68,68,0.15);
  border: 1px solid rgba(239,68,68,0.35);
  color: #fecaca;
  padding: 12px;
  border-radius: 14px;
  font-weight: 900;
}

.result,
.card {
  padding: 22px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 16px 0;
}

.stats div {
  background: rgba(0,0,0,0.25);
  border-radius: 18px;
  padding: 16px;
  text-align: center;
}

.stats strong {
  display: block;
  font-size: 34px;
  color: #86efac;
}

.stats span {
  color: #ddd;
}

.grid {
  display: grid;
  gap: 12px;
}

.product {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 12px;
  background: rgba(255,255,255,0.055);
  border-radius: 16px;
  padding: 10px;
}

.product img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  background: #111;
  border-radius: 12px;
}

.product b {
  display: block;
  line-height: 1.6;
}

.product span {
  display: block;
  color: #86efac;
  font-weight: 900;
  margin-top: 8px;
}

.failed {
  display: grid;
  gap: 10px;
}

.failed div {
  background: rgba(239,68,68,0.12);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 14px;
  padding: 12px;
}

.failed b {
  display: block;
  color: #fecaca;
  margin-bottom: 6px;
}

.failed small {
  display: block;
  color: #ddd;
  direction: ltr;
  text-align: left;
  word-break: break-all;
}

@media (max-width: 700px) {
  .product {
    grid-template-columns: 1fr;
  }

  .product img {
    width: 100%;
    height: 170px;
  }
}
`;