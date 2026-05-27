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
 <div style={styles.customerStoreContent}>
  <div style={styles.customerStoreTexts}>
    <span style={styles.customerStoreText}>BPS Market</span>

    <span style={styles.customerStoreSub}>
      تسوّق الآن
    </span>
  </div>
</div>
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
      0 0 16px rgba(249,115,22,0.45),
      0 0 34px rgba(34,197,94,0.28);
  }

  50% {
    transform: translateY(-2px) scale(1.06);
    box-shadow:
      0 0 28px rgba(249,115,22,0.75),
      0 0 58px rgba(34,197,94,0.48);
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
 .customerStoreHover:hover {
  transform: translateY(-2px) scale(1.05);
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
  customerStoreContent: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
},

customerStoreIcon: {
  width: "34px",
  height: "34px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.18)",
  fontSize: "18px",
  boxShadow: "inset 0 0 10px rgba(255,255,255,0.15)",
},

customerStoreTexts: {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1.05,
},

customerStoreText: {
  fontSize: "14px",
  fontWeight: 950,
  color: "#fff",
},

customerStoreSub: {
  fontSize: "10px",
  fontWeight: 800,
  color: "rgba(255,255,255,0.85)",
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

  padding: "8px 15px",

  borderRadius: "999px",

  background:
    "linear-gradient(135deg, #f97316 0%, #22c55e 45%, #2563eb 100%)",

  color: "#fff",

  textDecoration: "none",

  border: "1px solid rgba(255,255,255,0.22)",

  boxShadow:
    "0 0 18px rgba(249,115,22,0.42), 0 0 34px rgba(34,197,94,0.28)",

  animation: "customerStorePulse 2.4s ease-in-out infinite",

  transition: "all .25s ease",

  overflow: "hidden",

  position: "relative",
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