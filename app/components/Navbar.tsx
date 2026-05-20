"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({ user }: { user?: any }) {
  const [open, setOpen] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo}>
          BPS Chat
        </Link>

        <nav style={styles.navDesktop}>
          <Link href="/">الرئيسية</Link>

          <Link href="/advertise" style={styles.adBtn} className="adBtnHover">
            🚀 أعلن معنا
          </Link>

          <Link href="/about">عن الموقع</Link>
          <Link href="/contact">تواصل</Link>
          <Link href="/privacy">سياسة الخصوصية</Link>
          <Link href="/terms">الشروط</Link>
          <Link href="/seller-tools">📝 أدوات البائع</Link>

          <Link
            href="/customer-offers"
            style={styles.customerStoreBtn}
            className="customerStoreHover"
          >
            🛒 متجر عملاء بي بي اس
            <span style={styles.customerStoreSub}>بيع واشتري</span>
          </Link>
          <Link
  href="/customer-offers/dashboard"
  style={styles.sellerDashboardBtn}
  className="sellerDashboardHover"
>
  👤 صفحة البائعين
</Link>

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

      {false && open && <div style={styles.mobileMenu}></div>}

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

        @keyframes customerStorePulse {
          0%, 100% {
            box-shadow:
              0 0 12px rgba(34, 197, 94, 0.35),
              0 0 26px rgba(59, 130, 246, 0.14);
          }

          50% {
            box-shadow:
              0 0 20px rgba(34, 197, 94, 0.7),
              0 0 46px rgba(59, 130, 246, 0.28);
          }
        }
.sellerDashboardHover:hover {
  transform: scale(1.08);
}
        .adBtnHover:hover,
        .smartBtnHover:hover {
          transform: scale(1.1);
        }

        .customerStoreHover {
          transition: all 0.3s ease;
          animation: customerStorePulse 2.4s ease-in-out infinite;
        }

        .customerStoreHover:hover {
          transform: translateY(-2px) scale(1.08);
          filter: brightness(1.12);
        }

        nav a {
          color: #ccc;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        nav a:hover {
          color: #fff;
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
sellerDashboardBtn: {
  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
  padding: "8px 14px",
  borderRadius: "999px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "900",
  boxShadow:
    "0 0 12px rgba(124,58,237,0.45), 0 0 28px rgba(37,99,235,0.18)",
  transition: "all 0.3s ease",
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
    alignItems: "center",
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

  customerStoreBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #16a34a, #22c55e, #2563eb)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "900",
    whiteSpace: "nowrap",
  },

  customerStoreSub: {
    fontSize: "10px",
    opacity: 0.95,
    padding: "2px 7px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.16)",
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