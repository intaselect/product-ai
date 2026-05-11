"use client";

import { useState } from "react";

const plans = [
  { country: "السعودية", flag: "🇸🇦", slider: "299 ريال", search: "499 ريال", full: "799 ريال" },
  { country: "الإمارات", flag: "🇦🇪", slider: "299 درهم", search: "499 درهم", full: "799 درهم" },
  { country: "الكويت", flag: "🇰🇼", slider: "25 دينار", search: "45 دينار", full: "70 دينار" },
  { country: "قطر", flag: "🇶🇦", slider: "299 ريال", search: "499 ريال", full: "799 ريال" },
  { country: "البحرين", flag: "🇧🇭", slider: "25 دينار", search: "45 دينار", full: "70 دينار" },
  { country: "مصر", flag: "🇪🇬", slider: "1500 جنيه", search: "2500 جنيه", full: "4000 جنيه" },
];

export default function AdvertisePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("السعودية");
  const [packageType, setPackageType] = useState("أعلى الصفحة Ads Slider");
  const [message, setMessage] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    const text = `طلب إعلان جديد من BPS Chat:
الاسم: ${name}
رقم الهاتف: ${phone}
الدولة المستهدفة: ${country}
نوع الباقة: ${packageType}
تفاصيل الإعلان: ${message}`;

    const whatsappNumber = "966549330606";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <h1 style={styles.title}>اعلن معنا</h1>

        <p style={styles.desc}>
          اعرض منتجاتك أمام مستخدمين يبحثون عن الشراء في السعودية والإمارات والكويت وقطر والبحرين ومصر.
          الإعلان يظهر حسب الدولة المناسبة لعملائك.
        </p>

        <div style={styles.box}>
          <h2 style={styles.h2}>لماذا الإعلان معنا؟</h2>
          <ul style={styles.list}>
            <li>🚀 وصول لعملاء جاهزين للشراء</li>
            <li>🌍 استهداف حسب الدولة</li>
            <li>📈 ظهور داخل صفحات المنتجات والبحث</li>
            <li>🔥 مناسب للمتاجر، البراندات، والعروض الموسمية</li>
          </ul>
        </div>

        <div style={styles.box}>
          <h2 style={styles.h2}>أماكن ظهور إعلانك</h2>
          <ul style={styles.list}>
            <li>🔥 أعلى الصفحة في Ads Slider</li>
            <li>🔎 أثناء البحث عن المنتجات</li>
            <li>📄 صفحات المنتجات SEO Pages</li>
          </ul>
        </div>

        <div style={styles.pricingBox}>
          <h2 style={styles.h2}>أسعار الإعلانات حسب الدولة</h2>

          <div style={styles.cards}>
            {plans.map((plan) => (
              <div key={plan.country} style={styles.card}>
                <h3 style={styles.country}>
                  {plan.flag} {plan.country}
                </h3>

                <p style={styles.priceLine}>
                  أعلى الصفحة: <strong>{plan.slider}</strong> / شهر
                </p>
                <p style={styles.priceLine}>
                  أثناء البحث: <strong>{plan.search}</strong> / شهر
                </p>
                <p style={styles.priceLine}>
                  باقة كاملة: <strong>{plan.full}</strong> / شهر
                </p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.h2}>اطلب الإعلان الآن</h2>

          <input
            required
            placeholder="اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            required
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={styles.input}
          >
            {plans.map((plan) => (
              <option key={plan.country} value={plan.country}>
                {plan.flag} {plan.country}
              </option>
            ))}
          </select>

          <select
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            style={styles.input}
          >
            <option>أعلى الصفحة Ads Slider</option>
            <option>أثناء البحث</option>
            <option>صفحات المنتجات SEO Pages</option>
            <option>باقة كاملة</option>
          </select>

          <textarea
            placeholder="اكتب تفاصيل الإعلان أو رابط المتجر أو المنتج"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />

          <button style={styles.button}>إرسال الطلب عبر واتساب</button>
        </form>

        <a
          href="https://wa.me/966549330606"
          target="_blank"
          style={styles.whatsapp}
        >
          تواصل واتساب مباشرة
        </a>

        <a href="/" style={styles.home}>
          الرجوع للرئيسية
        </a>
      </section>
    </main>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#212121",
    color: "#fff",
    padding: "40px 16px",
    direction: "rtl",
  },
  container: {
    maxWidth: "950px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "10px",
  },
  desc: {
    textAlign: "center",
    color: "#bbb",
    marginBottom: "30px",
    lineHeight: "1.8",
  },
  box: {
    background: "#2b2b2b",
    padding: "18px",
    borderRadius: "14px",
    marginBottom: "20px",
    border: "1px solid #3a3a3a",
  },
  h2: {
    marginBottom: "12px",
    fontSize: "20px",
  },
  list: {
    lineHeight: "2",
    paddingRight: "20px",
  },
  pricingBox: {
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
    border: "1px solid #3a3a3a",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "14px",
  },
  card: {
    background: "#1f1f1f",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #444",
  },
  country: {
    marginBottom: "12px",
    color: "#10a37f",
    fontSize: "19px",
  },
  priceLine: {
    color: "#ddd",
    marginBottom: "8px",
  },
  form: {
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #3a3a3a",
  },
  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "13px",
    height: "110px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
    outline: "none",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#10a37f",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
  whatsapp: {
    display: "block",
    marginTop: "22px",
    textAlign: "center",
    color: "#25D366",
    fontWeight: "bold",
  },
  home: {
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    color: "#10a37f",
  },
};