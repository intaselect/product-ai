"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddCustomerOfferPage() {
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();

      if (data.session?.access_token) {
        setAccessToken(data.session.access_token);
        setUserEmail(data.session.user.email || "");
      }

      setCheckingUser(false);
    }

    checkUser();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!accessToken) {
      setError("لازم تسجل دخول الأول لإضافة عرض.");
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      product_name: String(formData.get("product_name") || ""),
      price: String(formData.get("price") || ""),
      image_url: String(formData.get("image_url") || ""),
      product_url: String(formData.get("product_url") || ""),
      store_name: String(formData.get("store_name") || ""),
      country: String(formData.get("country") || "sa"),
      category: String(formData.get("category") || "other"),
    };

    try {
      const res = await fetch("/api/customer-offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "حدث خطأ أثناء إرسال العرض");
        return;
      }

      setMessage("تم إرسال العرض بنجاح ✅ سيظهر بعد المراجعة والموافقة.");
      form.reset();
    } catch {
      setError("حدث خطأ غير متوقع. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingUser) {
    return (
      <main className="addOfferPage" dir="rtl">
        <section className="successCard">
          <div className="successIcon">⏳</div>
          <h1>جاري التحقق من تسجيل الدخول...</h1>
        </section>

        <style>{baseStyle}</style>
      </main>
    );
  }

  if (!accessToken) {
    return (
      <main className="addOfferPage" dir="rtl">
        <section className="successCard">
          <div className="successIcon">🔐</div>

          <h1>سجّل دخول الأول</h1>

          <p>
            لإضافة عرض في متجر عملاء بي بي اس، لازم تسجل دخول الأول. بعد
            تسجيل الدخول تقدر تضيف عرضك للمراجعة.
          </p>

          <div className="successActions">
            <Link href="/login" className="successBtn">
              تسجيل الدخول
            </Link>

            <Link href="/customer-offers" className="homeBtn">
              رجوع لمتجر العملاء
            </Link>
          </div>
        </section>

        <style>{baseStyle}</style>
      </main>
    );
  }

  if (message) {
    return (
      <main className="addOfferPage" dir="rtl">
        <section className="successCard">
          <div className="successIcon">✅</div>

          <h1>تم إرسال العرض بنجاح</h1>

          <p>
            شكرًا لك. تم استلام عرضك وسيظهر في متجر عملاء بي بي اس بعد المراجعة
            والموافقة.
          </p>

          <div className="successActions">
            <Link href="/customer-offers" className="successBtn">
              مشاهدة متجر العملاء
            </Link>

            <Link href="/" className="homeBtn">
              الرجوع للرئيسية
            </Link>
          </div>
        </section>

        <style>{baseStyle}</style>
      </main>
    );
  }

  return (
    <main className="addOfferPage" dir="rtl">
      <section className="addHero">
        <div className="glow one" />
        <div className="glow two" />

        <Link href="/customer-offers" className="backLink">
          ← رجوع لمتجر العملاء
        </Link>

        <h1>أضف عرضك في متجر عملاء بي بي اس</h1>

        <p>
          أضف صورة المنتج، الاسم، السعر، ورابط الشراء. العرض هيتراجع الأول،
          وبعد الموافقة هيظهر للزوار داخل صفحة العروض.
        </p>

        <div className="loginInfo">
          مسجل الدخول: <strong>{userEmail}</strong>
        </div>
      </section>

      <section className="formWrap">
        <form onSubmit={handleSubmit} className="offerForm">
          <label>
            اسم المنتج *
            <input
              name="product_name"
              required
              placeholder="مثال: iPhone 15 Pro Max"
            />
          </label>

          <label>
            السعر *
            <input name="price" required placeholder="مثال: 2999 SAR" />
          </label>

          <label>
            رابط صورة المنتج *
            <input
              name="image_url"
              required
              placeholder="https://example.com/product-image.jpg"
            />
          </label>

          <label>
            رابط المنتج أو المتجر *
            <input
              name="product_url"
              required
              placeholder="https://example.com/product"
            />
          </label>

          <label>
            اسم المتجر / البائع
            <input name="store_name" placeholder="مثال: متجر أحمد للعروض" />
          </label>

          <label>
            الدولة
            <select name="country" defaultValue="sa">
              <option value="sa">السعودية</option>
              <option value="ae">الإمارات</option>
              <option value="kw">الكويت</option>
              <option value="qa">قطر</option>
              <option value="bh">البحرين</option>
              <option value="eg">مصر</option>
            </select>
          </label>
<label>
  فئة المنتج
  <select name="category" defaultValue="electronics">
    <option value="electronics">إلكترونيات</option>
    <option value="mobiles">موبايلات</option>
    <option value="computers">كمبيوتر ولابتوب</option>
    <option value="home">المنزل والمطبخ</option>
    <option value="fashion">أزياء</option>
    <option value="beauty">جمال وعناية</option>
    <option value="cars">سيارات وإكسسوارات</option>
    <option value="other">أخرى</option>
  </select>
</label>
          {error && <div className="errorMsg">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "جاري إرسال العرض..." : "🚀 إرسال العرض للمراجعة"}
          </button>

          <p className="note">
            ملاحظة: كل حساب له عرض واحد افتراضيًا. لزيادة عدد العروض تواصل معنا.
          </p>
        </form>
      </section>

      <style>{baseStyle}</style>
    </main>
  );
}

const baseStyle = `
  .addOfferPage {
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 10%, rgba(34,197,94,0.18), transparent 30%),
      radial-gradient(circle at 80% 20%, rgba(37,99,235,0.18), transparent 30%),
      linear-gradient(180deg, #181818 0%, #212121 55%, #111 100%);
    color: white;
    padding: 45px 16px 80px;
  }

  .addHero {
    position: relative;
    max-width: 950px;
    margin: 0 auto 28px;
    text-align: center;
    padding: 42px 18px;
    border-radius: 32px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 25px 80px rgba(0,0,0,0.35);
    overflow: hidden;
  }

  .glow {
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 999px;
    filter: blur(60px);
    opacity: 0.35;
    animation: floatGlow 6s ease-in-out infinite alternate;
  }

  .one {
    background: #22c55e;
    top: -120px;
    right: -80px;
  }

  .two {
    background: #2563eb;
    bottom: -130px;
    left: -80px;
    animation-delay: 1.5s;
  }

  @keyframes floatGlow {
    from { transform: translateY(0) scale(1); }
    to { transform: translateY(20px) scale(1.12); }
  }

  .backLink {
    position: relative;
    z-index: 2;
    display: inline-block;
    margin-bottom: 18px;
    color: #bbf7d0;
    text-decoration: none;
    font-weight: 800;
  }

  .addHero h1 {
    position: relative;
    z-index: 2;
    margin: 0;
    font-size: clamp(30px, 5vw, 54px);
    line-height: 1.25;
    font-weight: 950;
    background: linear-gradient(135deg, #fff, #86efac, #60a5fa);
    -webkit-background-clip: text;
    color: transparent;
  }

  .addHero p {
    position: relative;
    z-index: 2;
    max-width: 700px;
    margin: 18px auto 0;
    color: #d6d6d6;
    line-height: 1.9;
    font-size: 17px;
  }

  .loginInfo {
    position: relative;
    z-index: 2;
    display: inline-block;
    margin-top: 18px;
    padding: 9px 14px;
    border-radius: 999px;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.3);
    color: #bbf7d0;
    font-size: 13px;
    font-weight: 800;
  }

  .formWrap {
    max-width: 720px;
    margin: 0 auto;
  }

  .offerForm {
    display: grid;
    gap: 16px;
    padding: 24px;
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
    border: 1px solid rgba(255,255,255,0.09);
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  }

  .offerForm label {
    display: grid;
    gap: 8px;
    color: #f3f4f6;
    font-weight: 900;
    font-size: 14px;
  }

  .offerForm input,
  .offerForm select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(255,255,255,0.12);
    background: #171717;
    color: white;
    border-radius: 16px;
    padding: 14px 15px;
    font-size: 15px;
    outline: none;
    transition: all 0.25s ease;
  }

  .offerForm input:focus,
  .offerForm select:focus {
    border-color: rgba(34,197,94,0.75);
    box-shadow: 0 0 0 4px rgba(34,197,94,0.12);
    transform: translateY(-1px);
  }

  .offerForm input::placeholder {
    color: #777;
  }

  .offerForm button {
    margin-top: 8px;
    border: 0;
    cursor: pointer;
    padding: 15px 20px;
    border-radius: 999px;
    background: linear-gradient(135deg, #16a34a, #22c55e, #2563eb);
    color: white;
    font-weight: 950;
    font-size: 16px;
    box-shadow: 0 0 30px rgba(34,197,94,0.35);
    transition: all 0.25s ease;
  }

  .offerForm button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 0 45px rgba(34,197,94,0.55);
  }

  .offerForm button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  .errorMsg {
    padding: 13px 15px;
    border-radius: 16px;
    font-weight: 800;
    line-height: 1.7;
    background: rgba(239,68,68,0.13);
    border: 1px solid rgba(239,68,68,0.35);
    color: #fecaca;
  }

  .note {
    margin: 0;
    text-align: center;
    color: #bdbdbd;
    font-size: 13px;
    line-height: 1.7;
  }

  .successCard {
    max-width: 720px;
    margin: 80px auto;
    text-align: center;
    padding: 45px 24px;
    border-radius: 32px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(34,197,94,0.35);
    box-shadow: 0 0 60px rgba(34,197,94,0.18);
  }

  .successIcon {
    font-size: 64px;
    margin-bottom: 18px;
  }

  .successCard h1 {
    font-size: 36px;
    margin: 0 0 14px;
  }

  .successCard p {
    color: #d1d5db;
    line-height: 1.9;
    font-size: 17px;
  }

  .successActions {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 26px;
  }

  .successBtn,
  .homeBtn {
    padding: 13px 22px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 900;
  }

  .successBtn {
    background: linear-gradient(135deg, #16a34a, #22c55e);
    color: white;
    box-shadow: 0 0 30px rgba(34,197,94,0.35);
  }

  .homeBtn {
    background: rgba(255,255,255,0.1);
    color: white;
    border: 1px solid rgba(255,255,255,0.12);
  }

  @media (max-width: 700px) {
    .addOfferPage {
      padding-top: 28px;
    }

    .addHero {
      border-radius: 24px;
      padding: 34px 14px;
    }

    .offerForm {
      padding: 18px;
      border-radius: 22px;
    }
  }
`;