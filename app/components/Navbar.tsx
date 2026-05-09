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
          <Link href="/advertise" style={styles.adBtn}>🚀 أعلن معنا</Link>
          <Link href="/about">عن الموقع</Link>
          <Link href="/contact">تواصل</Link>

          {user ? (
            <span>👤 {user.first_name}</span>
          ) : (
            <Link href="/login">تسجيل الدخول</Link>
          )}
        </nav>

        {/* 📱 زرار الموبايل */}
        <button onClick={() => setOpen(!open)} style={styles.menuBtn}>
          ☰
        </button>
      </div>

      {/* 📱 القائمة في الموبايل */}
      {open && (
        <div style={styles.mobileMenu}>
          <Link href="/">الرئيسية</Link>
          <Link href="/advertise">🚀 أعلن معنا</Link>
          <Link href="/about">عن الموقع</Link>
          <Link href="/contact">تواصل</Link>
          <Link href="/login">تسجيل الدخول</Link>
        </div>
      )}
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
    padding: "6px 12px",
    borderRadius: "8px",
    color: "#fff",
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
};