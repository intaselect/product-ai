"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({ user }: { user?: any }) {
  const [open, setOpen] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
     <div className="mobileTopSlider">
  <Link href="/" className="mobileTopBtn">
    🏠 الرئيسية
  </Link>

  <Link href="/daily-deals" className="mobileTopBtn hot">
    🔥 عروض اليوم
  </Link>

  <Link href="/customer-offers" className="mobileTopBtn">
    🛒 المتجر
  </Link>

  <Link href="/customer-offers/add" className="mobileTopBtn green">
    🎁 أضف منتجك
  </Link>

  <Link href="/" style={styles.logo}>
    <img
      src="/logo.png"
      alt="عالم المنتجات من BPS Chat"
      style={{
        height: "54px",
        width: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  </Link>
</div>

        <nav style={styles.navDesktop}>
  <div style={styles.navSmallGroup}>
    <Link href="/" style={styles.navSmallBtn}
className="navSmallHover">الرئيسية</Link>
    <Link href="/about" style={styles.navSmallBtn}
className="navSmallHover">عن الموقع</Link>
    <Link href="/contact" style={styles.navSmallBtn}
className="navSmallHover">تواصل</Link>
    <Link href="/privacy" style={styles.navSmallBtn}
className="navSmallHover">سياسة الخصوصية</Link>
    <Link href="/terms" style={styles.navSmallBtn}
className="navSmallHover">الشروط</Link>
    <Link href="/seller-tools" style={styles.navSmallBtn}
className="navSmallHover">📝 أدوات البائع</Link>
<Link href="/product-world" style={styles.navSmallBtn} className="navSmallHover">
  🌍 عالم المنتجات
</Link>
  </div>

  <div style={styles.navMainGroup}>
    <Link href="/advertise" style={styles.adBtn} className="adBtnHover">
      🚀 أعلن معنا
    </Link>

    <Link href="/bps-market" style={styles.fireMarketBtn} className="fireMarketHover">
      <span style={styles.fireMarketIcon}>🔥</span>
      <span style={styles.fireMarketText}>ماركت</span>
    </Link>

    <Link href="/customer-offers" style={styles.customerStoreBtn} className="customerStoreHover">
      <span style={styles.customerStoreIcon}>🛒</span>
      <div style={styles.customerStoreContent}>
        <span style={styles.customerStoreText}>متجر عالم المنتجات</span>
        <span style={styles.customerStoreSub}>تسوّق العروض الآن</span>
      </div>
      <span style={styles.customerStoreArrow}>←</span>
    </Link>
<Link href="/daily-deals" style={styles.dailyDealsBtn} className="dailyDealsHover">
  <span className="discountRain" aria-hidden="true">
    <i>20%</i>
    <i>50%</i>
    <i>35%</i>
    <i>70%</i>
    <i>15%</i>
  </span>
  <span style={{ position: "relative", zIndex: 2 }}>🔥 عروض اليوم عالم المنتجات</span>
</Link>
    <Link href="/customer-offers/share-center" style={styles.quickBrowseBtn} className="quickBrowseHover">
      <span style={styles.quickBrowseIcon}>⚡</span>
      <div style={styles.customerStoreContent}>
        <span style={styles.quickBrowseText}>تصفح سريع</span>
        <span style={styles.quickBrowseSub}>كل المنتجات والشير</span>
      </div>
      <span style={styles.quickBrowseArrow}>←</span>
    </Link>

    <Link href="/sell-online" style={styles.sellOnlineBtn} className="sellOnlineHover">
      <span style={styles.sellOnlineIcon}>🚀</span>
      <div style={styles.customerStoreContent}>
        <span style={styles.sellOnlineText}>بيع منتجاتك</span>
        <span style={styles.sellOnlineSub}>مجاناً للتجار والهاند ميد</span>
      </div>
      <span style={styles.sellOnlineArrow}>←</span>
    </Link>
  </div>

  <div style={styles.navUserGroup}>
    <Link href="/customer-offers/dashboard" style={styles.sellerDashboardBtn} className="sellerDashboardHover">
      👤 صفحة البائعين
    </Link>

    <Link href="/smart-search" style={styles.smartBtn} className="smartBtnHover">
      ⚡ البحث الذكي
    </Link>
    <Link href="/comparisons">⚔️ مقارنات المنتجات</Link>

    {user ? (
      <span>👤 {user.first_name}</span>
    ) : (
      <Link href="/login" style={styles.navSmallBtn}
className="navSmallHover">تسجيل الدخول</Link>
    )}
  </div>
</nav>

        {false && (
          <button onClick={() => setOpen(!open)} style={styles.menuBtn}>
            ☰
          </button>
        )}
      </div>

      {false && open && <div style={styles.mobileMenu}></div>}

      <style>{`
      @keyframes fireMarketPulse {
  0%,100% {
    transform: scale(1);
    box-shadow:
      0 0 14px rgba(249,115,22,.65),
      0 0 34px rgba(239,68,68,.35),
      0 0 60px rgba(250,204,21,.22);
  }

  50% {
    transform: scale(1.08);
    box-shadow:
      0 0 24px rgba(249,115,22,.95),
      0 0 58px rgba(239,68,68,.58),
      0 0 90px rgba(250,204,21,.42);
  }
}
.dailyDealsHover {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: rgba(249, 115, 22, 0.42) !important;
  border: 1px solid rgba(255,255,255,.28) !important;
  backdrop-filter: blur(10px);
  animation: dailyDealsGlow 2.4s ease-in-out infinite;
}

@keyframes dailyDealsGlow {
  0%,100% {
    box-shadow:
      0 0 14px rgba(249,115,22,.35),
      inset 0 0 18px rgba(255,255,255,.08);
  }
  50% {
    box-shadow:
      0 0 28px rgba(249,115,22,.65),
      inset 0 0 24px rgba(255,255,255,.14);
  }
}

.discountRain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.discountRain i {
  position: absolute;
  top: -18px;
  color: rgba(255,255,255,.42);
  font-size: 10px;
  font-weight: 950;
  font-style: normal;
  animation: discountFall 2.8s linear infinite;
}

.discountRain i:nth-child(1) { right: 12%; animation-delay: 0s; }
.discountRain i:nth-child(2) { right: 32%; animation-delay: .45s; }
.discountRain i:nth-child(3) { right: 52%; animation-delay: .9s; }
.discountRain i:nth-child(4) { right: 70%; animation-delay: 1.35s; }
.discountRain i:nth-child(5) { right: 84%; animation-delay: 1.8s; }

@keyframes discountFall {
  0% {
    transform: translateY(-16px) rotate(-8deg);
    opacity: 0;
  }
  15% {
    opacity: .75;
  }
  100% {
    transform: translateY(54px) rotate(12deg);
    opacity: 0;
  }
}

.dailyDealsHover:hover {
  transform: scale(1.06) !important;
  filter: brightness(1.1);
}


.fireMarketHover {
  animation: fireMarketPulse 1.8s ease-in-out infinite;
}

.fireMarketHover:hover {
  transform: scale(1.12) rotate(-3deg) !important;
  filter: brightness(1.12);
}
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

@keyframes sellOnlinePulse {
  0%,100%{
    transform:translateY(0) scale(1);
    box-shadow:
      0 12px 28px rgba(15,23,42,.18),
      0 0 0 5px rgba(249,115,22,.08);
  }

  50%{
    transform:translateY(-2px) scale(1.035);
    box-shadow:
      0 18px 40px rgba(15,23,42,.24),
      0 0 0 7px rgba(251,146,60,.10),
      0 0 46px rgba(249,115,22,.35);
  }
}

.sellOnlineHover{
  position:relative;
  overflow:hidden;
  isolation:isolate;
  animation:sellOnlinePulse 3.2s ease-in-out infinite;
}

.sellOnlineHover:hover{
  animation-play-state:paused;
  transform:translateY(-4px) scale(1.06);
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
          .navSmallHover {
  transition: all .25s ease;
}

.navSmallHover:hover {
  transform: translateY(-3px) scale(1.08);
  background: rgba(37,99,235,.18);
  border-color: rgba(96,165,250,.35);
  box-shadow:
    0 0 20px rgba(37,99,235,.25),
    0 8px 22px rgba(0,0,0,.25);
  color: #fff !important;
}
  .mobileTopSlider{
  display:none;
}

@media (max-width:768px){
  .mobileTopSlider{
    display:flex;
    align-items:center;
    gap:8px;
    overflow-x:auto;
    scrollbar-width:none;
  }

  .mobileTopSlider::-webkit-scrollbar{
    display:none;
  }

  .mobileTopBtn{
    flex:0 0 auto;
    padding:10px 14px;
    border-radius:14px;
    background:#1e293b;
    color:#fff !important;
    text-decoration:none;
    font-size:12px;
    font-weight:900;
    white-space:nowrap;
  }

  .mobileTopBtn.hot{
    background:linear-gradient(135deg,#ef4444,#f97316);
  }

  .mobileTopBtn.green{
    background:linear-gradient(135deg,#22c55e,#06b6d4);
    color:#04120d !important;
  }
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
dailyDealsBtn: {
  padding: "10px 16px",
  borderRadius: "999px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "950",
  whiteSpace: "nowrap",
  position: "relative",
},
fireMarketBtn: {
  width: "74px",
  height: "74px",
  borderRadius: "999px",
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  textDecoration: "none",
  color: "#fff",
  background:
    "radial-gradient(circle at 35% 20%, #fef3c7 0%, #fb923c 28%, #ef4444 58%, #7f1d1d 100%)",
  border: "2px solid rgba(254,215,170,.9)",
  boxShadow:
    "0 0 20px rgba(249,115,22,.7), 0 0 48px rgba(239,68,68,.38)",
  transition: "all .25s ease",
},

fireMarketIcon: {
  fontSize: "26px",
  lineHeight: 1,
},

fireMarketText: {
  fontSize: "12px",
  fontWeight: 950,
  lineHeight: 1,
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
sellOnlineBtn: {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  minWidth: "220px",
  padding: "9px 13px",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg,#ffffff 0%,#fff7ed 55%,#ffedd5 100%)",
  color: "#111827",
  textDecoration: "none",
  border: "1px solid rgba(251,146,60,.35)",
  boxShadow:
    "0 14px 32px rgba(15,23,42,.18),0 0 0 5px rgba(249,115,22,.06)",
  transition: "all .25s ease",
  overflow: "hidden",
  position: "relative",
},

sellOnlineIcon: {
  width: "42px",
  height: "42px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg,#fed7aa,#fdba74)",
  color: "#111827",
  fontSize: "22px",
},

sellOnlineText: {
  fontSize: "15px",
  fontWeight: 950,
  color: "#111827",
},

sellOnlineSub: {
  fontSize: "11px",
  fontWeight: 900,
  color: "#ea580c",
},

sellOnlineArrow: {
  width: "27px",
  height: "27px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg,#f97316,#fb923c)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 950,
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
  gap: "10px",
  color: "#ccc",
  padding: "7px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(15,23,42,.92), rgba(17,24,39,.78))",
  border: "1px solid rgba(148,163,184,.20)",
  boxShadow:
    "inset 0 0 0 1px rgba(255,255,255,.04), 0 14px 40px rgba(0,0,0,.30)",
  backdropFilter: "blur(14px)",
},

navSmallGroup: {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px",
  borderRadius: "18px",
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(148,163,184,.14)",
},

navMainGroup: {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px",
  borderRadius: "20px",
  background:
    "linear-gradient(135deg, rgba(34,197,94,.08), rgba(37,99,235,.08))",
  border: "1px solid rgba(34,211,238,.16)",
},

navUserGroup: {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px",
  borderRadius: "18px",
  background: "rgba(124,58,237,.08)",
  border: "1px solid rgba(167,139,250,.16)",
},

navSmallBtn: {
  padding: "8px 10px",
  borderRadius: "12px",
  color: "#dbeafe",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 850,
  background:
    "linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.025))",
  border: "1px solid rgba(148,163,184,.14)",
  whiteSpace: "nowrap",
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