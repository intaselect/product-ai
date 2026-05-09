"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister() {
    if (!firstName || !lastName || !phone || !email) {
      setMessage("من فضلك املأ كل البيانات");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error: insertError } = await supabase.from("profiles").upsert(
      {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
      },
      { onConflict: "email" }
    );

    if (insertError) {
      setMessage(insertError.message);
      setLoading(false);
      return;
    }

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://www.bpschat.com",
      },
    });

    if (otpError) {
      setMessage(otpError.message);
    } else {
      setMessage("تم إرسال رابط تسجيل الدخول إلى بريدك الإلكتروني");
    }

    setLoading(false);
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>تسجيل الدخول</h1>
        <p style={styles.subtitle}>
          سجل بياناتك وسيتم إرسال رابط الدخول على الإيميل
        </p>

        <input
          placeholder="الاسم الأول"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="الاسم الثاني"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="رقم الهاتف مع مفتاح الدولة"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="البريد الإلكتروني"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} disabled={loading} style={styles.button}>
          {loading ? "جاري الإرسال..." : "تسجيل الدخول بالإيميل"}
        </button>

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
    maxWidth: "440px",
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