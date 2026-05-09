"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleWhatsapp(e: any) {
    e.preventDefault();

    const text = `رسالة تواصل جديدة من BPS Chat:
الاسم: ${name}
الرسالة: ${message}`;

    const whatsappNumber = "966564911912"; // غيّر الرقم لرقمك بدون +

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.badge}>BPS Chat Support</div>

        <h1 style={styles.title}>تواصل معنا</h1>

        <p style={styles.desc}>
          عندك سؤال، اقتراح، مشكلة في البحث، أو طلب تعاون؟ يسعدنا تواصلك معنا.
        </p>

        <div style={styles.infoBox}>
          <p>📧 البريد الإلكتروني: support@bpschat.com</p>
          <p>⏱️ نحاول الرد في أقرب وقت ممكن</p>
          <p>🌍 نخدم المستخدمين في السعودية، الإمارات، مصر، الكويت، قطر والبحرين</p>
        </div>

        <form onSubmit={handleWhatsapp} style={styles.form}>
          <input
            placeholder="اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="اكتب رسالتك"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            إرسال عبر واتساب
          </button>
        </form>

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
    padding: "50px 16px",
    direction: "rtl",
  },
  card: {
    maxWidth: "720px",
    margin: "0 auto",
    background: "#2b2b2b",
    border: "1px solid #444",
    borderRadius: "22px",
    padding: "28px",
  },
  badge: {
    display: "inline-block",
    color: "#10a37f",
    background: "#1f1f1f",
    border: "1px solid #3a3a3a",
    borderRadius: "999px",
    padding: "7px 14px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "30px",
    marginBottom: "10px",
  },
  desc: {
    color: "#ccc",
    lineHeight: "2",
    marginBottom: "22px",
  },
  infoBox: {
    background: "#1f1f1f",
    border: "1px solid #3a3a3a",
    borderRadius: "16px",
    padding: "16px",
    lineHeight: "2",
    marginBottom: "22px",
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
    outline: "none",
  },
  button: {
    background: "#10a37f",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  home: {
    display: "block",
    textAlign: "center",
    marginTop: "20px",
    color: "#10a37f",
    textDecoration: "none",
    fontWeight: "bold",
  },
};