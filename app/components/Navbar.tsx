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
  <Link href="/sell-online" className="mobileTopBtn green">🚀 بيع مجاناً</Link>

  <Link href="/customer-offers" className="mobileTopBtn">
    🛒 المتجر
  </Link>

  <Link href="/customer-offers/add" className="mobileTopBtn green">
    🎁 أضف منتجك
  </Link>
  <Link href="/customer-offers/dashboard" className="mobileTopBtn">👤 البائعين</Link>
  
  <Link href="/bps-market" className="mobileTopBtn hot">🔥 BPS Market</Link>
  <Link href="/research" className="mobileTopBtn">📊 دراسات</Link>
  
  <Link href="/customer-offers/share-center" className="mobileTopBtn">⚡ تصفح سريع</Link>
  <Link href="/seller-tools" className="mobileTopBtn">📝 أدوات البائع</Link>
  <Link href="/sell-online" className="mobileTopBtn green">🚀 بيع مجاناً</Link>
  <Link href="/comparisons" className="mobileTopBtn">⚔️ مقارنات</Link>
  <Link href="/advertise" className="mobileTopBtn">🚀 أعلن معنا</Link>
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
  <Link href="/advertise" style={styles.amazonItemGreen}>🚀 أعلن معنا</Link>
  <Link href="/bps-market" style={styles.amazonItemHot}>🔥 ماركت</Link>
  <Link href="/customer-offers" style={styles.amazonItem}>🛒 متجر عالم المنتجات</Link>
  <Link href="/daily-deals" style={styles.amazonItemHot}>🔥 عروض اليوم</Link>
  <Link href="/customer-offers/share-center" style={styles.amazonItem}>⚡ تصفح سريع</Link>
  <Link href="/sell-online" style={styles.amazonItemGreen}>🚀 بيع منتجاتك</Link>
  <Link href="/customer-offers/dashboard" style={styles.amazonItemPurple}>👤 صفحة البائعين</Link>
  <Link href="/smart-search" style={styles.amazonItemBlue}>⚡ البحث الذكي</Link>
  <Link href="/research" style={styles.amazonItem}>📊 دراسات المنتجات</Link>
  <Link href="/comparisons" style={styles.amazonItem}>⚔️ مقارنات المنتجات</Link>

  {user ? (
    <span style={styles.amazonItem}>👤 {user.first_name}</span>
  ) : (
    <Link href="/login" style={styles.amazonItem}>تسجيل الدخول</Link>
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
  nav a {
    text-decoration: none;
    transition: all 0.22s ease;
  }

  nav a:hover {
    background: rgba(255,255,255,.10);
    color: #fff !important;
    transform: translateY(-1px);
  }

  .navSmallHover:hover {
    background: rgba(255,255,255,.10);
    border-color: rgba(255,255,255,.22);
    color: #fff !important;
  }

  .mobileTopSlider {
    display: none;
  }

  @media (max-width:768px){
    .mobileTopSlider{
      display:flex;
      align-items:center;
      gap:8px;
      overflow-x:auto;
      overflow-y:hidden;
      scrollbar-width:none;
      direction:rtl;
      width:100%;
      padding:0 4px;
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
      box-shadow:0 0 16px rgba(249,115,22,.35);
    }

    .mobileTopBtn.green{
      background:linear-gradient(135deg,#22c55e,#06b6d4);
      color:#04120d !important;
      box-shadow:0 0 16px rgba(34,197,94,.35);
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
    background: "#131921",
    borderBottom: "1px solid rgba(255,255,255,.10)",
  },

  container: {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
    gap: "10px",
  },

  logo: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#fff",
    textDecoration: "none",
    flexShrink: 0,
  },

  navDesktop: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    width: "100%",
    minWidth: 0,
    color: "#fff",
    padding: "6px",
    borderRadius: "14px",
    background: "#232f3e",
    border: "1px solid rgba(255,255,255,.10)",
    boxShadow: "0 8px 24px rgba(0,0,0,.18)",
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
  },

  navSmallGroup: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    padding: "0",
    flexShrink: 0,
  },

  navMainGroup: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    padding: "0",
    flexShrink: 0,
  },

  navUserGroup: {
    display: "none",
  },

  navSmallBtn: {
    height: "38px",
    padding: "0 10px",
    borderRadius: "6px",
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: 800,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    border: "1px solid transparent",
  },

  amazonItem: {
    height: "38px",
    padding: "0 12px",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f3f4f6",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 850,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
  },

  amazonItemHot: {
    height: "38px",
    padding: "0 12px",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffb454",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 950,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
  },

  amazonItemGreen: {
    height: "38px",
    padding: "0 12px",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4ade80",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 950,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
  },

  amazonItemBlue: {
    height: "38px",
    padding: "0 12px",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#60a5fa",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 950,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
  },

  amazonItemPurple: {
    height: "38px",
    padding: "0 12px",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#c4b5fd",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 950,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
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