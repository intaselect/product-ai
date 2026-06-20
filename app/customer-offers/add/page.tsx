"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddCustomerOfferPage() {
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [remainingOffers, setRemainingOffers] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();

     if (data.session?.access_token) {
  const token = data.session.access_token;

  setAccessToken(token);
  setUserEmail(data.session.user.email || "");

  const res = await fetch("/api/customer-offers/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (json.ok) {
    setRemainingOffers(Number(json.stats?.remainingOffers ?? 0));
  }
}

      setCheckingUser(false);
    }

    checkUser();
  }, []);
 useEffect(() => {
  if (typeof window === "undefined") return;
  if (checkingUser) return;
  if (!accessToken) return;

  const params = new URLSearchParams(window.location.search);
  if (!params.get("auto")) return;

  setTimeout(() => {
    function setInput(name: string, value: string) {
      const el = document.querySelector(
        `[name="${name}"]`
      ) as HTMLInputElement | HTMLSelectElement | null;

      if (el && value) el.value = value;
    }

    setInput("product_name", params.get("product_name") || "");
    setInput("price", params.get("price") || "");
    setInput("image_url", params.get("image_url") || "");
    setInput("product_url", params.get("product_url") || "");
    setInput("store_name", params.get("store_name") || "amazon.sa");
    setInput("country", params.get("country") || "sa");

    const category = params.get("category") || "electronics";

    document
      .querySelectorAll<HTMLInputElement>('input[name="category"]')
      .forEach((box) => {
        box.checked = box.value === category;
      });
  }, 300);
}, [checkingUser, accessToken]);
  useEffect(() => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    setEditId(params.get("edit") || "");
  }
}, []);
  useEffect(() => {
  if (!editId) return;

  async function loadOffer() {
    const res = await fetch(`/api/customer-offers/get?id=${editId}`);
    const data = await res.json();

    if (data.ok && data.offer) {
      const o = data.offer;

    
    }
  }

  loadOffer();
}, [editId]);

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
      image_url_2: String(formData.get("image_url_2") || ""),
image_url_3: String(formData.get("image_url_3") || ""),
      product_url: String(formData.get("product_url") || ""),
      store_name: String(formData.get("store_name") || ""),
      country: String(formData.get("country") || "sa"),
      category: formData.getAll("category").map((c) => String(c)),
      
    };

    try {
    const res = await fetch(
  editId
    ? `/api/customer-offers/update?id=${editId}`
    : "/api/customer-offers",
  {
    method: editId ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  }
);

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
if (remainingOffers !== null && remainingOffers <= 0) {
  return (
    <main className="addOfferPage" dir="rtl">
      <section className="successCard">
        <div className="successIcon">🚫</div>

        <h1>لا يمكنك إضافة عرض</h1>

        <p>
          تم حظر حسابك أو انتهى رصيد العروض لديك.
        </p>

       <div className="successActions">
  <Link href="/customer-offers/dashboard" className="successBtn">
    الرجوع للداشبورد
  </Link>

  <Link href="/customer-offers" className="homeBtn">
    مشاهدة متجر العملاء
  </Link>
</div>

<div className="blockedPlansBox">
  <h2>باقات زيادة رصيد العروض</h2>
  <p>اختر الباقة المناسبة، وبعد الدفع تواصل معنا لتفعيل الرصيد داخل حسابك.</p>

  <div className="blockedPlansGrid">
    <a
      href="https://www.paypal.com/ncp/payment/B4V5Q7B4CF5LE"
      target="_blank"
      rel="noopener noreferrer"
      className="blockedPlanCard"
    >
      <strong>5 منتجات</strong>
      <span>5 دولار / شهر</span>
      <b>شراء الباقة</b>
    </a>

    <a
      href="https://www.paypal.com/ncp/payment/MNVA672HM8CKN"
      target="_blank"
      rel="noopener noreferrer"
      className="blockedPlanCard featured"
    >
      <strong>15 منتج</strong>
      <span>10 دولار / شهر</span>
      <b>الأكثر طلبًا</b>
    </a>

    <a
      href="https://www.paypal.com/ncp/payment/JBH72Y65YU8D4"
      target="_blank"
      rel="noopener noreferrer"
      className="blockedPlanCard"
    >
      <strong>50 منتج</strong>
      <span>20 دولار / شهر</span>
      <b>شراء الباقة</b>
    </a>
  </div>

  <a
    href="https://wa.me/966549330606?text=دفعت%20باقة%20عروض%20BPS%20Chat%20وعايز%20تفعيل%20الرصيد"
    target="_blank"
    rel="noopener noreferrer"
    className="blockedWhatsappBtn"
  >
    📱 تواصل بعد الدفع
  </a>
</div>
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
  <button
  type="button"
  className="successBtn successButtonReset"
  onClick={() => {
    setMessage("");
    setError("");
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
>
  ➕ إضافة عرض جديد
</button>

  <Link href="/customer-offers" className="secondaryBtn">
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
  رابط صورة المنتج 2 (اختياري)
  <input
    name="image_url_2"
    placeholder="https://example.com/product-image-2.jpg"
  />
</label>

<label>
  رابط صورة المنتج 3 (اختياري)
  <input
    name="image_url_3"
    placeholder="https://example.com/product-image-3.jpg"
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
              <option value="eg">مصر</option>ئ
            </select>
          </label>
<div className="formGroup">
  <span>فئات المنتج</span>

  <div className="categoryChecks">
  <label><input type="checkbox" name="category" value="electronics" defaultChecked /> إلكترونيات</label>
  <label><input type="checkbox" name="category" value="mobiles" /> موبايلات</label>
  <label><input type="checkbox" name="category" value="mobile_accessories" /> إكسسوارات جوالات</label>
  <label><input type="checkbox" name="category" value="smart_watch" /> ساعات ذكية</label>
  <label><input type="checkbox" name="category" value="power_bank" /> باور بانك</label>
  <label><input type="checkbox" name="category" value="chargers" /> شواحن وكابلات</label>
  <label><input type="checkbox" name="category" value="headphones" /> سماعات</label>
  <label><input type="checkbox" name="category" value="computers" /> كمبيوتر ولابتوب</label>
  <label><input type="checkbox" name="category" value="computer_accessories" /> إكسسوارات كمبيوتر</label>
  <label><input type="checkbox" name="category" value="gaming" /> ألعاب وجيمينج</label>
  <label><input type="checkbox" name="category" value="home" /> المنزل والمطبخ</label>
  <label><input type="checkbox" name="category" value="fashion" /> ملابس</label>
  <label><input type="checkbox" name="category" value="shoes" /> أحذية</label>
  <label><input type="checkbox" name="category" value="bags" /> شنط</label>
  <label><input type="checkbox" name="category" value="beauty" /> جمال وعناية</label>
  <label><input type="checkbox" name="category" value="cars" /> سيارات وإكسسوارات</label>
  <label><input type="checkbox" name="category" value="kids" /> أطفال</label>
  <label><input type="checkbox" name="category" value="sports" /> رياضة</label>
  <label><input type="checkbox" name="category" value="cameras" /> كاميرات</label>

<label><input type="checkbox" name="category" value="camera_accessories" /> ملحقات كاميرات</label>
<label><input type="checkbox" name="category" value="perfumes" /> عطور</label>
<label><input type="checkbox" name="category" value="incense" /> بخور</label>
  <label><input type="checkbox" name="category" value="other" /> أخرى</label>
</div>
</div>
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
.successButtonReset {
  border: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
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
.formGroup {
  display: grid;
  gap: 8px;
  color: #f3f4f6;
  font-weight: 900;
  font-size: 14px;
}

.categoryChecks {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.categoryChecks label {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #171717;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 11px 12px;
  cursor: pointer;
  font-size: 13px;
}

.categoryChecks input {
  width: auto;
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
     position: relative; 
  z-index: 5;    
  }
.successActions a {
  position: relative;
  z-index: 10;
  display: inline-block;
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
  display: inline-block;
  transition: all 0.25s ease;
}
.secondaryBtn {
  padding: 13px 22px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  color: white;
  border: 1px solid rgba(255,255,255,0.12);
  text-decoration: none;
  font-weight: 900;
}
.successBtn {
  background: linear-gradient(135deg, #16a34a, #22c55e, #2563eb);
  color: white;
  box-shadow: 0 0 30px rgba(34,197,94,0.35);
}

.successBtn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 0 40px rgba(34,197,94,0.6);
}

  .homeBtn {
    background: rgba(255,255,255,0.1);
    color: white;
    border: 1px solid rgba(255,255,255,0.12);
  }
.blockedPlansBox {
  margin-top: 28px;
  padding: 18px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(37,99,235,0.10));
  border: 1px solid rgba(34,197,94,0.22);
}

.blockedPlansBox h2 {
  margin: 0 0 8px;
  font-size: 22px;
}

.blockedPlansBox p {
  margin: 0 0 16px;
  color: #d1d5db;
  font-size: 14px;
}

.blockedPlansGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.blockedPlanCard {
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  text-decoration: none;
  color: white;
  display: grid;
  gap: 6px;
  transition: 0.25s;
}

.blockedPlanCard:hover {
  transform: translateY(-4px);
  border-color: rgba(34,197,94,0.5);
}

.blockedPlanCard strong {
  color: #bbf7d0;
  font-size: 18px;
}

.blockedPlanCard b {
  color: #22c55e;
}

.blockedPlanCard.featured {
  background: linear-gradient(135deg, rgba(34,197,94,0.22), rgba(37,99,235,0.16));
}

.blockedWhatsappBtn {
  display: inline-block;
  margin-top: 16px;
  padding: 12px 20px;
  border-radius: 999px;
  background: white;
  color: #111;
  text-decoration: none;
  font-weight: 950;
}

@media (max-width: 700px) {
  .blockedPlansGrid {
    grid-template-columns: 1fr;
  }
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