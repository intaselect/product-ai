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

  const [inputs, setInputs] = useState<string[]>(
    Array.from({ length: 50 }, () => "")
  );

  const [country, setCountry] = useState("sa");
  const [category, setCategory] = useState("electronics");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      setAccessToken(data.session?.access_token || "");
      if (data.session?.access_token) {
  localStorage.setItem("bps_import_token", data.session.access_token);
}
      setChecking(false);
    }

    checkUser();
  }, []);

  function updateInput(index: number, value: string) {
    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  function clearInputs() {
    setInputs(Array.from({ length: 50 }, () => ""));
    setResult(null);
    setError("");
  }

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();

    const urls = inputs.map((u) => u.trim()).filter(Boolean);

    if (!urls.length) {
      setError("حط رابط أفلييت واحد على الأقل");
      return;
    }

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
          <Link href="/login" className="btn">
            تسجيل الدخول
          </Link>
        </div>
        <style>{style}</style>
      </main>
    );
  }

  const filledCount = inputs.filter((u) => u.trim()).length;

  return (
    <main className="page" dir="rtl">
      <section className="hero">
        <Link href="/customer-offers/add" className="back">
          ← رجوع لإضافة عرض يدوي
        </Link>

        <h1>استيراد منتجات أمازون بالأفلييت</h1>

        <p>
          حط روابط أفلييت جاهزة من Amazon SiteStripe أو روابط amzn.to. كل رابط
          في خانة مستقلة. السيستم يحاول يجيب الاسم والصورة والسعر، والمنتجات
          الناجحة تتحفظ Pending للمراجعة.
        </p>
      </section>

      <form onSubmit={handleImport} className="form">
        <div className="topGrid">
          <label>
            الدولة
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="sa">السعودية</option>
              <option value="ae">الإمارات</option>
              <option value="eg">مصر</option>
            </select>
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
        </div>

        <div className="inputsHeader">
          <div>
            <h2>روابط الأفلييت</h2>
            <p>الممتلئ الآن: {filledCount} / 50</p>
          </div>

          <button type="button" className="clearBtn" onClick={clearInputs}>
            مسح الكل
          </button>
        </div>

        <div className="tipsBox">
          <strong>مهم جدًا:</strong>
          <span>
            استخدم رابط أفلييت جاهز فيه tag أو رابط amzn.to من SiteStripe.
            المنتجات اللي تفشل في جلب الاسم أو الصورة أو السعر لن يتم إضافتها.
          </span>
        </div>

        <div className="inputsList">
          {inputs.map((value, index) => (
            <label key={index} className="urlRow">
              <span>رابط أفلييت رقم {index + 1}</span>
              <input
                type="text"
                value={value}
                onChange={(e) => updateInput(index, e.target.value)}
                placeholder="https://www.amazon.sa/.../dp/B0XXXXXXXX?...&tag=xxxx أو https://amzn.to/xxxx"
                dir="ltr"
              />
            </label>
          ))}
        </div>

        {error && <div className="error">{error}</div>}

        <button disabled={loading} type="submit" className="submitBtn">
          {loading ? "جاري جلب المنتجات..." : "🚀 استيراد المنتجات"}
        </button>

        <p className="note">
          الرابط اللي هيتحفظ هو نفس رابط الأفلييت اللي أنت حطيته، علشان العمولة
          ماتضيعش.
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
                      <small>{item.asin}</small>
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
  max-width: 920px;
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
  max-width: 740px;
  color: #ddd;
  line-height: 1.9;
}

.form {
  padding: 22px;
  display: grid;
  gap: 18px;
}

.topGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.form label {
  display: grid;
  gap: 8px;
  font-weight: 900;
}

.form input,
.form select {
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

.form input:focus,
.form select:focus {
  border-color: rgba(34,197,94,0.75);
  box-shadow: 0 0 0 4px rgba(34,197,94,0.12);
}

.inputsHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(0,0,0,0.20);
  border: 1px solid rgba(255,255,255,0.08);
}

.inputsHeader h2 {
  margin: 0 0 4px;
  font-size: 20px;
}

.inputsHeader p {
  margin: 0;
  color: #bbf7d0;
  font-weight: 900;
  font-size: 13px;
}

.clearBtn {
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  background: rgba(239,68,68,0.18);
  color: #fecaca;
  font-weight: 950;
}

.tipsBox {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(250,204,21,0.10);
  border: 1px solid rgba(250,204,21,0.26);
  color: #fef3c7;
  line-height: 1.8;
}

.tipsBox strong {
  color: #fde68a;
}

.inputsList {
  display: grid;
  gap: 10px;
  max-height: 580px;
  overflow-y: auto;
  padding: 12px;
  border-radius: 20px;
  background: rgba(0,0,0,0.18);
  border: 1px solid rgba(255,255,255,0.08);
}

.urlRow {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.07);
}

.urlRow span {
  color: #d1fae5;
  font-size: 13px;
  font-weight: 950;
}

.urlRow input {
  direction: ltr;
  text-align: left;
  font-size: 13px;
}

.submitBtn,
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

.submitBtn:disabled {
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

.product small {
  display: block;
  color: #aaa;
  margin-top: 6px;
  direction: ltr;
  text-align: left;
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

@media (max-width: 800px) {
  .topGrid {
    grid-template-columns: 1fr;
  }

  .urlRow {
    grid-template-columns: 1fr;
  }

  .product {
    grid-template-columns: 1fr;
  }

  .product img {
    width: 100%;
    height: 170px;
  }
}
`;