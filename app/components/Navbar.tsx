"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({ user }: { user?: any }) {
  const [open, setOpen] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        
        {/* 🔥 اللوجو */}
        <Link href="/" style={styles.logo}>
          BPS Chat
        </Link>

        {/* 🖥️ القائمة الكبيرة */}
        <nav style={styles.navDesktop}>
          <Link href="/">الرئيسية</Link>
          <Link href="/advertise" style={styles.adBtn} className="adBtnHover">
  🚀 أعلن معنا
</Link>
          <Link href="/about">عن الموقع</Link>
          <Link href="/contact">تواصل</Link>
          <Link href="/privacy">سياسة الخصوصية</Link>
<Link href="/terms">الشروط</Link>
<Link href="/smart-search" style={styles.smartBtn} className="smartBtnHover">
  ⚡ البحث الذكي
</Link>

          {user ? (
            <span>👤 {user.first_name}</span>
          ) : (
            <Link href="/login">تسجيل الدخول</Link>
          )}
        </nav>

       {false && (
  <button onClick={() => setOpen(!open)} style={styles.menuBtn}>
    ☰
  </button>
)}
      </div>

      {/* 📱 القائمة في الموبايل */}
      {false && open && (
  <div style={styles.mobileMenu}>
        </div>
      )}
      <style>{`
  @keyframes advertisePulse {
    0%, 100% {
      transform: scale(1);
      box-shadow:
        0 0 10px rgba(16, 163, 127, 0.35),
        0 0 22px rgba(0, 255, 200, 0.12);
    }

    50% {
      transform: scale(1.06);
      box-shadow:
        0 0 18px rgba(16, 163, 127, 0.65),
        0 0 45px rgba(0, 255, 200, 0.35);
    }
  }
    .adBtnHover:hover {
  transform: scale(1.1);
}
  .smartBtnHover:hover {
  transform: scale(1.1);
}
`}</style>
    </header>
  );
}

const styles: any = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 999,
    background: "#212121",
    borderBottom: "1px solid #333",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#fff",
    textDecoration: "none",
  },
  navDesktop: {
    display: "flex",
    gap: "20px",
    color: "#ccc",
  },
  adBtn: {
  background: "#10a37f",
  padding: "8px 14px",
  borderRadius: "10px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "all 0.3s ease",

  boxShadow:
    "0 0 12px rgba(16, 163, 127, 0.45), 0 0 28px rgba(0, 255, 200, 0.18)",

  animation: "advertisePulse 2.2s ease-in-out infinite",
},
  menuBtn: {
    display: "none",
    fontSize: "22px",
    background: "none",
    border: "none",
    color: "#fff",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    gap: "10px",
    background: "#212121",
  },
  smartBtn: {
  background: "linear-gradient(135deg, #2563eb, #10a37f)",
  padding: "8px 14px",
  borderRadius: "10px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow:
    "0 0 12px rgba(37, 99, 235, 0.45), 0 0 28px rgba(16, 163, 127, 0.18)",
},
};