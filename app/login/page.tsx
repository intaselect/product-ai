"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendCode() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setStep("code");
      setMessage("تم إرسال كود التحقق إلى رقم الهاتف");
    }

    setLoading(false);
  }

  async function verifyCode() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("تم تسجيل الدخول بنجاح");
      window.location.href = "/";
    }

    setLoading(false);
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>تسجيل الدخول</h1>
        <p style={styles.subtitle}>
          سجل دخولك باستخدام رقم الهاتف
        </p>

        {step === "phone" && (
          <>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+9665xxxxxxxx"
              style={styles.input}
            />

            <button onClick={sendCode} disabled={loading} style={styles.button}>
              {loading ? "جاري الإرسال..." : "إرسال كود التحقق"}
            </button>
          </>
        )}

        {step === "code" && (
          <>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="اكتب كود التحقق"
              style={styles.input}
            />

            <button onClick={verifyCode} disabled={loading} style={styles.button}>
              {loading ? "جاري التحقق..." : "تأكيد الدخول"}
            </button>
          </>
        )}

        {message && <p style={styles.message}>{message}</p>}

        <a href="/" style={styles.homeLink}>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#2b2b2b",
    border: "1px solid #444",
    borderRadius: "20px",
    padding: "28px",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "24px",
  },
  input: {
    width: "100%",
    height: "48px",
    borderRadius: "14px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
    padding: "0 14px",
    marginBottom: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    height: "48px",
    borderRadius: "14px",
    border: "none",
    background: "#10a37f",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    marginTop: "14px",
    color: "#10a37f",
  },
  homeLink: {
    display: "inline-block",
    marginTop: "22px",
    color: "#10a37f",
    textDecoration: "none",
  },
};