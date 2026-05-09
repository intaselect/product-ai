"use client";

import { useState } from "react";

export default function AdvertisePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();

    // حاليا بنعرض نجاح فقط
    setDone(true);

    // تقدر بعدين تبعت لـ API أو واتساب
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <h1 style={styles.title}>اعلن معنا</h1>

        <p style={styles.desc}>
          اعرض منتجاتك أمام آلاف المستخدمين الباحثين عن الشراء يوميًا في السعودية والإمارات ومصر والكويت والبحرين وقطر .. تظهر الاعلانات بحسب دولنك فقط.
        </p>

        {/* 💰 المميزات */}
        <div style={styles.box}>
          <h2>لماذا الإعلان معنا؟</h2>
          <ul>
            <li>🚀 وصول لعملاء جاهزين للشراء</li>
            <li>🌍 استهداف حسب الدولة</li>
            <li>📈 زيادة المبيعات بسرعة</li>
          </ul>
        </div>

        {/* 📢 أماكن الإعلان */}
        <div style={styles.box}>
          <h2>أماكن ظهور إعلانك</h2>
          <ul>
            <li>🔥 أعلى الصفحة (Ads Slider)</li>
            <li>🔎 أثناء البحث</li>
            <li>📄 صفحات المنتجات (SEO Pages)</li>
          </ul>
        </div>

        {/* 📩 فورم */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>اطلب الإعلان الآن</h2>

          <input
            placeholder="اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="اكتب تفاصيل الإعلان"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />

          <button style={styles.button}>
            إرسال الطلب
          </button>

          {done && <p style={styles.success}>تم إرسال طلبك بنجاح ✔</p>}
        </form>

        {/* 📱 واتساب */}
        <a
          href="https://wa.me/00966564911912"
          target="_blank"
          style={styles.whatsapp}
        >
          تواصل واتساب
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
  },
  container: {
    maxWidth: "700px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "10px",
  },
  desc: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: "30px",
  },
  box: {
    background: "#2b2b2b",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  form: {
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "12px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    height: "100px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#10a37f",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  success: {
    marginTop: "10px",
    color: "#10a37f",
  },
  whatsapp: {
    display: "block",
    marginTop: "20px",
    textAlign: "center",
    color: "#25D366",
  },
  home: {
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    color: "#10a37f",
  },
};