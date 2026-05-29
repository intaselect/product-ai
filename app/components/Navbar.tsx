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
  <span style={styles.customerStoreIcon}>🛒</span>

  <div style={styles.customerStoreContent}>
    <span style={styles.customerStoreText}>BPS Market</span>
    <span style={styles.customerStoreSub}>تسوّق العروض الآن</span>
  </div>

  <span style={styles.customerStoreArrow}>←</span>
</Link>
<Link
  href="/customer-offers/share-center"
  style={styles.quickBrowseBtn}
  className="quickBrowseHover"
>
  <span style={styles.quickBrowseIcon}>⚡</span>

  <div style={styles.customerStoreContent}>
    <span style={styles.quickBrowseText}>تصفح سريع</span>
    <span style={styles.quickBrowseSub}>كل المنتجات والشير</span>
  </div>

  <span style={styles.quickBrowseArrow}>←</span>
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
        @keyframes marketNavPulse {
  0%, 100% {
    transform: translateY(0) scale(1);
    box-shadow:
      0 14px 32px rgba(15,23,42,0.18),
      0 0 0 5px rgba(34,197,94,0.06),
      0 0 34px rgba(34,197,94,0.26);
  }

  50% {
    transform: translateY(-2px) scale(1.035);
    box-shadow:
      0 18px 42px rgba(15,23,42,0.24),
      0 0 0 7px rgba(37,99,235,0.08),
      0 0 48px rgba(37,99,235,0.35);
  }
}

@keyframes marketIconFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-3px) rotate(-5deg);
  }
}

@keyframes marketShineMove {
  0% {
    transform: translateX(-140%) skewX(-18deg);
  }
  55%, 100% {
    transform: translateX(170%) skewX(-18deg);
  }
}

.customerStoreHover {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  animation: marketNavPulse 3.2s ease-in-out infinite;
}

.customerStoreHover::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 20%, rgba(34,197,94,0.18), transparent 32%),
    linear-gradient(135deg, rgba(255,255,255,0.96), rgba(248,250,252,0.90));
  z-index: -2;
}

.customerStoreHover::after {
  content: "";
  position: absolute;
  top: -30%;
  bottom: -30%;
  width: 42px;
  right: -60px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.95),
    transparent
  );
  animation: marketShineMove 3.8s ease-in-out infinite;
  z-index: -1;
}
  @keyframes quickBrowsePulse {
  0%, 100% {
    transform: translateY(0) scale(1);
    box-shadow:
      0 12px 28px rgba(15,23,42,0.18),
      0 0 0 5px rgba(250,204,21,0.08),
      0 0 30px rgba(250,204,21,0.26);
  }

  50% {
    transform: translateY(-2px) scale(1.035);
    box-shadow:
      0 18px 40px rgba(15,23,42,0.24),
      0 0 0 7px rgba(249,115,22,0.10),
      0 0 46px rgba(249,115,22,0.38);
  }
}

.quickBrowseHover {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  animation: quickBrowsePulse 3.4s ease-in-out infinite;
}

.quickBrowseHover::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 20%, rgba(250,204,21,0.18), transparent 32%),
    linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,251,235,0.92));
  z-index: -2;
}

.quickBrowseHover::after {
  content: "";
  position: absolute;
  top: -30%;
  bottom: -30%;
  width: 42px;
  right: -60px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.95),
    transparent
  );
  animation: marketShineMove 3.8s ease-in-out infinite;
  z-index: -1;
}

.quickBrowseHover:hover {
  animation-play-state: paused;
  transform: translateY(-4px) scale(1.06);
  filter: brightness(1.04);
}

.customerStoreIcon {
  animation: marketIconFloat 2.2s ease-in-out infinite;
}

.customerStoreHover:hover {
animation-play-state: paused;
  transform: translateY(-4px) scale(1.06);
  filter: brightness(1.04);
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
  flexDirection: "column",
  lineHeight: 1.05,
},

customerStoreIcon: {
  width: "42px",
  height: "42px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #ecfdf5, #dbeafe)",
  color: "#111827",
  fontSize: "22px",
  boxShadow:
    "inset 0 0 12px rgba(255,255,255,0.85), 0 8px 18px rgba(15,23,42,0.10)",
},

customerStoreText: {
  fontSize: "16px",
  fontWeight: 950,
  color: "#111827",
  letterSpacing: "-0.2px",
},

customerStoreSub: {
  fontSize: "11px",
  fontWeight: 900,
  color: "#16a34a",
},

customerStoreArrow: {
  width: "27px",
  height: "27px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #16a34a, #2563eb)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 950,
  boxShadow: "0 8px 18px rgba(37,99,235,0.24)",
},

customerStoreBtn: {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  minWidth: "205px",
  padding: "9px 13px",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg, #ffffff 0%, #f8fafc 55%, #ecfdf5 100%)",
  color: "#111827",
  textDecoration: "none",
  border: "1px solid rgba(219,234,254,0.95)",
  boxShadow:
    "0 14px 32px rgba(15,23,42,0.18), 0 0 0 5px rgba(34,197,94,0.06)",
  transition: "all .25s ease",
  overflow: "hidden",
  position: "relative",
},
quickBrowseBtn: {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  minWidth: "190px",
  padding: "9px 13px",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg, #ffffff 0%, #fffbeb 55%, #fef3c7 100%)",
  color: "#111827",
  textDecoration: "none",
  border: "1px solid rgba(253,230,138,0.95)",
  boxShadow:
    "0 14px 32px rgba(15,23,42,0.18), 0 0 0 5px rgba(250,204,21,0.06)",
  transition: "all .25s ease",
  overflow: "hidden",
  position: "relative",
},

quickBrowseIcon: {
  width: "42px",
  height: "42px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
  color: "#111827",
  fontSize: "22px",
  boxShadow:
    "inset 0 0 12px rgba(255,255,255,0.85), 0 8px 18px rgba(15,23,42,0.10)",
},

quickBrowseText: {
  fontSize: "15px",
  fontWeight: 950,
  color: "#111827",
  letterSpacing: "-0.2px",
},

quickBrowseSub: {
  fontSize: "11px",
  fontWeight: 900,
  color: "#f97316",
},

quickBrowseArrow: {
  width: "27px",
  height: "27px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f97316, #facc15)",
  color: "#111827",
  fontSize: "16px",
  fontWeight: 950,
  boxShadow: "0 8px 18px rgba(249,115,22,0.24)",
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