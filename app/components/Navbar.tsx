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
  <span style={styles.customerStoreIcon}>🛍️</span>
  <span style={styles.customerStoreText}>متجر العملاء</span>
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
          @keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
  .customerStoreBtn {
  animation: customerStorePulse 2.6s ease-in-out infinite, highlightStart 1s ease;
}

@keyframes highlightStart {
  0% {
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.customerStoreIcon {
  animation: iconFloat 2s ease-in-out infinite;
}

      @keyframes customerStorePulse {
  0%, 100% {
    transform: translateY(0) scale(1);
    box-shadow:
      0 0 14px rgba(34,197,94,0.38),
      0 0 32px rgba(6,182,212,0.18);
  }

  50% {
    transform: translateY(-1px) scale(1.035);
    box-shadow:
      0 0 24px rgba(34,197,94,0.75),
      0 0 55px rgba(6,182,212,0.38);
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
  position: relative;
  overflow: hidden;
  animation: customerStorePulse 2.6s ease-in-out infinite;
}
  .customerStoreHover::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.28),
    transparent
  );
  transform: translateX(-120%);
  transition: transform 0.65s ease;
}
  .customerStoreHover:hover::before {
  transform: translateX(120%);
}

.customerStoreHover:hover {
  transform: translateY(-2px) scale(1.07);
  filter: brightness(1.15);
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
  background:
    "linear-gradient(135deg, #16a34a 0%, #06b6d4 55%, #2563eb 100%)",
  color: "#fff",
  fontWeight: "950",
  fontSize: "13px",
  textDecoration: "none",
  whiteSpace: "nowrap",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow:
    "0 0 14px rgba(34,197,94,0.42), 0 0 34px rgba(6,182,212,0.22)",
  transition: "all 0.25s ease",
},

customerStoreIcon: {
  width: "25px",
  height: "25px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.18)",
  fontSize: "15px",
},

customerStoreText: {
  position: "relative",
  zIndex: 2,
},

customerStoreSub: {
  position: "relative",
  zIndex: 2,
  fontSize: "10px",
  padding: "2px 7px",
  borderRadius: "999px",
  background: "rgba(0,0,0,0.22)",
  color: "#ecfeff",
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