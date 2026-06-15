"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SidebarMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <button
        className="menuButton"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebarHeader">
          <strong>
            BPS Chat
            <span className="arabicName">بي بي اس شات</span>
          </strong>

          <button className="closeButton" onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>

        {user ? (
          <div className="menuItem" style={{ cursor: "default", opacity: 0.9 }}>
            👤 {user.email.split("@")[0]}
          </div>
        ) : (
          <a href="/login" className="menuItem">تسجيل الدخول</a>
        )}
<a href="/daily-deals" className="menuItem sidebarDailyDealsGlow">
  <span className="discountRainSide" aria-hidden="true">
    <i>20%</i>
    <i>50%</i>
    <i>35%</i>
    <i>70%</i>
    <i>90%</i>
    <i>15%</i>
  </span>
  <span className="dailyDealsSideIcon">🔥</span>
  <span>
  عروض اليوم عالم المنتجات
  <span className="dailyDealsSideSub">
    أفضل عروض وخصومات جميع المتاجر في بلدك
  </span>
</span>
</a>
        <a href="/" className="menuItem">الرئيسية</a>
        <a href="/product-world" className="menuItem">
  🌍 عالم المنتجات
</a>

        <a href="/advertise" className="menuItem sidebarAdvertiseGlow">
          🚀 أعلن معنا
        </a>
        <a href="/customer-offers/dashboard" className="menuItem sidebarSellerDashboardGlow">
  👤 صفحة البائعين
</a>

        <a href="/smart-search" className="menuItem sidebarSmartGlow">
          ⚡ البحث الذكي
        </a>
        <a href="/research" className="menuItem sidebarResearchGlow">
  <span className="researchSidebarIcon">📊</span>

  <span>
    دراسات المنتجات
    <span className="researchSidebarSub">
      تحليل الأسعار والمتاجر بالرسم البياني
    </span>
  </span>
</a>

        <a href="/seller-tools" className="menuItem sidebarSellerGlow">
          📝 أدوات البائع
        </a>
        <a href="/bps-market" className="menuItem sidebarFireMarketGlow">
  <span className="fireMarketSideIcon">🔥</span>
  <span>
    BPS Market
    <span className="fireMarketSideSub">تسوق حسب الدولة والقسم</span>
  </span>
</a>
       <a href="/customer-offers" className="menuItem sidebarCustomerStoreGlow">
  <span className="storeIcon">🛍️</span>
  <span>
متجر عالم المنتجات 🛒
<span className="subText">تسوّق عروض العملاء الآن</span>
  </span>
</a>
<a
  href="/customer-offers/share-center"
  className="menuItem sidebarQuickBrowseGlow"
>
  <span className="quickBrowseIcon">⚡</span>

  <span>
    تصفح سريع للمنتجات
    <span className="quickBrowseSub">
      كل المنتجات والشير السريع
    </span>
  </span>
</a>
<a
  href="/sell-online"
  className="menuItem sidebarSellOnlineGlow"
>
  <span className="sellOnlineSidebarIcon">🚀</span>

  <span>
    بيع منتجاتك مجاناً
    <span className="sellOnlineSidebarSub">
      إنستجرام • تيك توك • هاند ميد
    </span>
  </span>
</a>
<a
  href="/comparisons"
  className="menuItem sidebarComparisonsGlow"
>
  <span className="comparisonsSidebarIcon">⚔️</span>

  <span>
    مقارنات المنتجات
    <span className="comparisonsSidebarSub">
      قارن الأسعار والمواصفات
    </span>
  </span>
</a>

        <a href="/about" className="menuItem">عن الموقع</a>
        <a href="/contact" className="menuItem">تواصل معنا</a>
        <a href="/privacy" className="menuItem">سياسة الخصوصية</a>
        <a href="/terms" className="menuItem">الشروط والأحكام</a>

        {user && (
          <button
            className="menuItem logoutButton"
            onClick={async () => {
              await supabase.auth.signOut();
              setUser(null);
              setMenuOpen(false);
            }}
          >
            تسجيل الخروج
          </button>
        )}
      </aside>

      <style jsx>{`
 .menuButton {
  position: fixed;
  top: 76px;
  left: 18px;
  z-index: 9999;

  width: 48px;
  height: 48px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  border: 1px solid rgba(0,255,200,0.32);

  background:
    linear-gradient(
      135deg,
      rgba(15,23,42,0.96),
      rgba(30,41,59,0.94)
    );

  color: #ffffff;

  font-size: 24px;
  line-height: 1;

  cursor: pointer;

  backdrop-filter: blur(14px);

  box-shadow:
    0 0 12px rgba(0,255,200,0.18),
    0 0 30px rgba(37,99,235,0.20),
    inset 0 0 18px rgba(255,255,255,0.05);

  animation: menuGlowPulse 2.2s ease-in-out infinite;

  overflow: hidden;

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}
.sidebarDailyDealsGlow {
  position: relative;
  overflow: hidden;
  isolation: isolate;

  display: flex;
  align-items: center;
  gap: 12px;

  min-height: 68px;
  border-radius: 22px;

  background: rgba(249, 115, 22, 0.34);
  border: 1px solid rgba(255,255,255,.26);

  color: #fff !important;

  backdrop-filter: blur(12px);

  box-shadow:
    0 0 18px rgba(249,115,22,.38),
    inset 0 0 20px rgba(255,255,255,.08);

  animation: sidebarDailyDealsGlass 2.4s ease-in-out infinite;
}

@keyframes sidebarDailyDealsGlass {
  0%,100% {
    box-shadow:
      0 0 16px rgba(249,115,22,.35),
      inset 0 0 18px rgba(255,255,255,.07);
  }

  50% {
    box-shadow:
      0 0 30px rgba(249,115,22,.65),
      inset 0 0 26px rgba(255,255,255,.13);
  }
}

.discountRainSide {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.discountRainSide i {
  position: absolute;
  top: -18px;
  color: rgba(255,255,255,.34);
  font-size: 12px;
  font-weight: 950;
  font-style: normal;
  animation: sidebarDiscountFall 3s linear infinite;
}

.discountRainSide i:nth-child(1) { right: 10%; animation-delay: 0s; }
.discountRainSide i:nth-child(2) { right: 25%; animation-delay: .4s; }
.discountRainSide i:nth-child(3) { right: 42%; animation-delay: .8s; }
.discountRainSide i:nth-child(4) { right: 58%; animation-delay: 1.2s; }
.discountRainSide i:nth-child(5) { right: 74%; animation-delay: 1.6s; }
.discountRainSide i:nth-child(6) { right: 86%; animation-delay: 2s; }

@keyframes sidebarDiscountFall {
  0% {
    transform: translateY(-18px) rotate(-10deg);
    opacity: 0;
  }

  15% {
    opacity: .7;
  }

  100% {
    transform: translateY(86px) rotate(14deg);
    opacity: 0;
  }
}

.dailyDealsSideIcon {
  position: relative;
  z-index: 2;

  width: 46px;
  height: 46px;
  min-width: 46px;

  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255,255,255,.16);
  border: 1px solid rgba(255,255,255,.22);

  font-size: 25px;

  box-shadow:
    inset 0 0 16px rgba(255,255,255,.10),
    0 0 18px rgba(249,115,22,.26);
}

.dailyDealsSideText {
  position: relative;
  z-index: 2;
  font-weight: 950;
}

.dailyDealsSideSub {
  display: block;
  font-size: 11px;
  margin-top: 4px;
  color: rgba(255,255,255,.82);
  font-weight: 900;
}

.sidebarDailyDealsGlow:hover {
  transform: translateX(-5px) scale(1.03);
  filter: brightness(1.08);
}
.sidebarComparisonsGlow {
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.15),
    rgba(37, 99, 235, 0.15)
  );
  border: 1px solid rgba(34, 197, 94, 0.35);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.18);
}

.sidebarComparisonsGlow:hover {
  transform: translateY(-2px);
  border-color: rgba(96, 165, 250, 0.6);
  box-shadow:
    0 0 25px rgba(34, 197, 94, 0.25),
    0 0 35px rgba(37, 99, 235, 0.2);
}

.comparisonsSidebarIcon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: linear-gradient(
    135deg,
    #22c55e,
    #2563eb
  );
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
}

.comparisonsSidebarSub {
  display: block;
  font-size: 12px;
  opacity: .85;
  margin-top: 2px;
}
.menuButton::before {
  content: "";

  position: absolute;
  inset: -2px;

  background:
    linear-gradient(
      120deg,
      transparent,
      rgba(255,255,255,0.22),
      transparent
    );

  transform: translateX(-140%);
  animation: menuShine 3.5s linear infinite;
}
.sidebarFireMarketGlow {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 68px;
  border-radius: 999px;
  color: #fff !important;
  background:
    radial-gradient(circle at 25% 20%, #fef3c7 0%, #fb923c 24%, #ef4444 58%, #7f1d1d 100%);
  border: 2px solid rgba(254,215,170,.75);
  box-shadow:
    0 0 18px rgba(249,115,22,.7),
    0 0 48px rgba(239,68,68,.35);
  animation: sidebarFirePulse 1.8s ease-in-out infinite;
}

.fireMarketSideIcon {
  width: 46px;
  height: 46px;
  min-width: 46px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.18);
  font-size: 25px;
}

.fireMarketSideSub {
  display: block;
  font-size: 11px;
  margin-top: 4px;
  color: #fff7ed;
  font-weight: 900;
}

.sidebarFireMarketGlow:hover {
  transform: translateX(-5px) scale(1.04);
}

@keyframes sidebarFirePulse {
  0%,100% {
    box-shadow:
      0 0 18px rgba(249,115,22,.65),
      0 0 48px rgba(239,68,68,.35);
  }

  50% {
    box-shadow:
      0 0 30px rgba(249,115,22,.95),
      0 0 72px rgba(239,68,68,.55);
  }
}
.menuButton:hover {
  transform: scale(1.08);

  border-color: rgba(0,255,200,0.58);

  box-shadow:
    0 0 18px rgba(0,255,200,0.30),
    0 0 42px rgba(37,99,235,0.30),
    inset 0 0 20px rgba(255,255,255,0.08);
}

@keyframes menuGlowPulse {
  0%,100% {
    transform: scale(1);
    box-shadow:
      0 0 12px rgba(0,255,200,0.18),
      0 0 30px rgba(37,99,235,0.20);
  }

  50% {
    transform: scale(1.06);
    box-shadow:
      0 0 22px rgba(0,255,200,0.38),
      0 0 55px rgba(37,99,235,0.34);
  }
}

@keyframes menuShine {
  0% {
    transform: translateX(-140%);
  }

  100% {
    transform: translateX(140%);
  }
}
.sidebarCustomerStoreGlow {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 12px;
  min-height: 68px;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      #ffffff 0%,
      #f8fafc 55%,
      #ecfdf5 100%
    );

  border: 1px solid rgba(219,234,254,0.95);

  color: #111827 !important;

  box-shadow:
    0 14px 32px rgba(15,23,42,0.18),
    0 0 0 5px rgba(34,197,94,0.05);

  animation: marketSidebarWhitePulse 3.2s ease-in-out infinite;

  transition: all .25s ease;
}
  @keyframes marketSidebarPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.045);
  }
}
 .storeIcon {
  width: 42px;
  height: 42px;
  min-width: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background:
    linear-gradient(135deg,#ecfdf5,#dbeafe);

  color: #111827;

  font-size: 22px;

  box-shadow:
    inset 0 0 12px rgba(255,255,255,.8),
    0 8px 18px rgba(15,23,42,.10);

  animation: marketIconFloat 2.2s ease-in-out infinite;
}
.sidebarCustomerStoreGlow:hover {
  transform: translateX(-5px) scale(1.03);
  box-shadow: 0 0 30px rgba(34,197,94,0.42);
  background: linear-gradient(
    135deg,
    rgba(34,197,94,0.36),
    rgba(6,182,212,0.25),
    rgba(37,99,235,0.22)
  );
  cursor: pointer; 
}
  @keyframes storeIconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.storeIcon {
  animation: storeIconFloat 2s ease-in-out infinite;
}
.sidebarCustomerStoreGlow::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(120deg, transparent, rgba(34,197,94,0.6), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebarCustomerStoreGlow:hover::before {
  opacity: 1;
}


  .sidebarSellerDashboardGlow {
  background: linear-gradient(135deg, rgba(124,58,237,0.22), rgba(37,99,235,0.18));
  border: 1px solid rgba(124,58,237,0.35);
  color: #fff;
  font-weight: 900;
  transition: all 0.25s ease;
}
  

.sidebarSellerDashboardGlow:hover {
  transform: translateX(-5px) scale(1.02);
  box-shadow: 0 0 28px rgba(124,58,237,0.35);
}

.subText {
  display: block;
  font-size: 11px;
  margin-top: 4px;

  color: #16a34a;

  font-weight: 900;
}
        .menuButton:hover {
          background: #383838;
        }

        .overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.45);
        }

        .sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  z-index: 10001;

  width: 260px;
  height: 100dvh;
  max-height: 100dvh;
  padding: 18px;
  padding-bottom: 34px;

  background: #171717;
  border-right: 1px solid #2f2f2f;

  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  transition: left 0.25s ease;
  box-shadow: 12px 0 40px rgba(0, 0, 0, 0.45);
  background:
linear-gradient(
135deg,
rgba(15,23,42,.98),
rgba(17,24,39,.96),
rgba(2,6,23,.98)
);

backdrop-filter: blur(18px);

box-shadow:
18px 0 60px rgba(0,0,0,.55),
0 0 60px rgba(37,99,235,.12);
}

.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #22c55e, #2563eb);
  border-radius: 20px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #34d399, #3b82f6);
}

        .sidebar.open {
          left: 0;
        }

        .sidebarHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
border-bottom: 1px solid rgba(148,163,184,.12);
margin-bottom: 18px;

          color: white;
          margin-bottom: 22px;
          font-size: 18px;
        }

        .arabicName {
          display: block;
          width: 100%;
          text-align: center;
          font-size: 14px;
          opacity: 0.7;
          margin-top: 6px;
          color: #60a5fa;
font-weight: 700;
        }

        .closeButton {
          background: transparent;
          border: none;
          color: #ececec;
          font-size: 28px;
          cursor: pointer;
        }
.menuItem {
  display: block;
  width: 100%;
  box-sizing: border-box;

  padding: 13px 14px;
  margin-bottom: 8px;

  border-radius: 16px;

  color: #ffffff !important;
  text-decoration: none;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.04),
      rgba(255,255,255,.02)
    );

  border: 1px solid rgba(148,163,184,.12);

  text-align: right;
  font-size: 15px;
  cursor: pointer;

  transition: all .25s ease;
}

        .menuItem:hover {
  transform: translateX(-6px) scale(1.02);

  background:
    linear-gradient(
      135deg,
      rgba(37,99,235,.18),
      rgba(16,185,129,.12)
    );

  border-color: rgba(96,165,250,.35);

  box-shadow:
    0 0 24px rgba(37,99,235,.20),
    0 0 40px rgba(16,185,129,.10);
}

        .logoutButton {
          font-family: inherit;
        }

        .sidebarAdvertiseGlow {
          background: rgba(16, 163, 127, 0.18);
          border: 1px solid rgba(0, 255, 200, 0.25);
          animation: sidebarAdPulse 2.2s ease-in-out infinite;
        }

        .sidebarSmartGlow {
          background: rgba(37, 99, 235, 0.18);
          border: 1px solid rgba(0, 180, 255, 0.35);
          animation: sidebarSmartPulse 2.2s ease-in-out infinite;
        }
          .sidebarResearchGlow {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 12px;
  min-height: 68px;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      rgba(15,118,110,0.32),
      rgba(37,99,235,0.24),
      rgba(124,58,237,0.22)
    );

  border: 1px solid rgba(45,212,191,0.42);

  color: #ffffff !important;

  box-shadow:
    0 0 18px rgba(45,212,191,0.22),
    0 0 34px rgba(124,58,237,0.18),
    inset 0 0 18px rgba(255,255,255,0.04);

  animation: sidebarResearchPulse 2.6s ease-in-out infinite;
}

.sidebarResearchGlow::after {
  content: "▁ ▃ ▅ ▇";
  position: absolute;
  left: 14px;
  bottom: 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.28);
  letter-spacing: 3px;
  animation: sidebarResearchBars 1.8s ease-in-out infinite;
}

.researchSidebarIcon {
  width: 44px;
  height: 44px;
  min-width: 44px;

  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(135deg, #2dd4bf, #60a5fa, #a78bfa);

  color: #020617;

  font-size: 23px;

  box-shadow:
    inset 0 0 14px rgba(255,255,255,0.55),
    0 0 18px rgba(45,212,191,0.28);
}

.researchSidebarSub {
  display: block;
  font-size: 11px;
  margin-top: 4px;
  color: rgba(255,255,255,0.84);
  font-weight: 900;
}

.sidebarResearchGlow:hover {
  transform: translateX(-5px) scale(1.035);
  border-color: rgba(96,165,250,0.7);
  filter: brightness(1.1);
  box-shadow:
    0 0 28px rgba(45,212,191,0.35),
    0 0 48px rgba(124,58,237,0.28);
}

@keyframes sidebarResearchPulse {
  0%,100% {
    box-shadow:
      0 0 18px rgba(45,212,191,0.22),
      0 0 34px rgba(124,58,237,0.18);
  }

  50% {
    box-shadow:
      0 0 30px rgba(45,212,191,0.45),
      0 0 62px rgba(124,58,237,0.34);
  }
}

@keyframes sidebarResearchBars {
  0%,100% {
    transform: translateY(0);
    opacity: .35;
  }

  50% {
    transform: translateY(-4px);
    opacity: .85;
  }
}

        .sidebarSellerGlow {
          background: linear-gradient(
            135deg,
            rgba(16, 163, 127, 0.2),
            rgba(0, 180, 255, 0.12)
          );
          border: 1px solid rgba(16, 163, 127, 0.35);
          animation: sellerPulse 2.5s ease-in-out infinite;
        }

        @keyframes sidebarAdPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 6px rgba(16, 163, 127, 0.25),
              0 0 12px rgba(0, 255, 200, 0.10);
          }

          50% {
            transform: scale(1.05);
            box-shadow:
              0 0 18px rgba(16, 163, 127, 0.60),
              0 0 40px rgba(0, 255, 200, 0.35);
          }
        }

        @keyframes sidebarSmartPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 6px rgba(37, 99, 235, 0.25),
              0 0 12px rgba(0, 180, 255, 0.12);
          }

          50% {
            transform: scale(1.05);
            box-shadow:
              0 0 18px rgba(37, 99, 235, 0.60),
              0 0 40px rgba(0, 180, 255, 0.35);
          }
        }

        @keyframes sellerPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 8px rgba(16, 163, 127, 0.3),
              0 0 18px rgba(0, 180, 255, 0.12);
          }

          50% {
            transform: scale(1.05);
            box-shadow:
              0 0 18px rgba(16, 163, 127, 0.55),
              0 0 38px rgba(0, 180, 255, 0.28);
          }
        }
          .sidebarSellOnlineGlow {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 12px;
  min-height: 68px;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      #ffffff 0%,
      #fff7ed 55%,
      #ffedd5 100%
    );

  border: 1px solid rgba(251,146,60,.35);

  color: #111827 !important;

  box-shadow:
    0 14px 32px rgba(15,23,42,.18),
    0 0 0 5px rgba(249,115,22,.05);

  animation: sellOnlineSidebarPulse 3.1s ease-in-out infinite;

  transition: all .25s ease;
}

.sellOnlineSidebarIcon {
  width: 42px;
  height: 42px;
  min-width: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background: linear-gradient(135deg,#fed7aa,#fdba74);

  color: #111827;

  font-size: 22px;

  box-shadow:
    inset 0 0 12px rgba(255,255,255,.8),
    0 8px 18px rgba(15,23,42,.10);
}

.sellOnlineSidebarSub {
  display: block;
  font-size: 11px;
  margin-top: 4px;
  color: #ea580c;
  font-weight: 900;
}

.sidebarSellOnlineGlow:hover {
  transform: translateX(-5px) scale(1.03);
  box-shadow: 0 0 30px rgba(249,115,22,.35);
  cursor: pointer;
}

@keyframes sellOnlineSidebarPulse {
  0%,100% {
    transform: scale(1);
    box-shadow:
      0 14px 32px rgba(15,23,42,.18),
      0 0 0 5px rgba(249,115,22,.05);
  }

  50% {
    transform: scale(1.035);
    box-shadow:
      0 18px 42px rgba(15,23,42,.22),
      0 0 0 7px rgba(251,146,60,.08),
      0 0 40px rgba(249,115,22,.22);
  }
}
          .sidebarQuickBrowseGlow {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 12px;
  min-height: 68px;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      #ffffff 0%,
      #fffbeb 55%,
      #fef3c7 100%
    );

  border: 1px solid rgba(253,230,138,0.95);

  color: #111827 !important;

  box-shadow:
    0 14px 32px rgba(15,23,42,0.18),
    0 0 0 5px rgba(250,204,21,0.05);

  animation: quickBrowseSidebarPulse 3.2s ease-in-out infinite;

  transition: all .25s ease;
}

.quickBrowseIcon {
  width: 42px;
  height: 42px;
  min-width: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background:
    linear-gradient(135deg,#fef3c7,#fed7aa);

  color: #111827;

  font-size: 22px;

  box-shadow:
    inset 0 0 12px rgba(255,255,255,.8),
    0 8px 18px rgba(15,23,42,.10);
}

.quickBrowseSub {
  display: block;
  font-size: 11px;
  margin-top: 4px;

  color: #f97316;

  font-weight: 900;
}

.sidebarQuickBrowseGlow:hover {
  transform: translateX(-5px) scale(1.03);

  box-shadow:
    0 0 30px rgba(249,115,22,0.42);

  cursor: pointer;
}

@keyframes quickBrowseSidebarPulse {
  0%,100% {
    transform: scale(1);

    box-shadow:
      0 14px 32px rgba(15,23,42,.18),
      0 0 0 5px rgba(250,204,21,.05);
  }

  50% {
    transform: scale(1.035);

    box-shadow:
      0 18px 42px rgba(15,23,42,.22),
      0 0 0 7px rgba(249,115,22,.08),
      0 0 40px rgba(249,115,22,.20);
  }
}

        @media (max-width: 600px) {
        .sidebar {
  height: 100dvh;
  max-height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 46px;
  -webkit-overflow-scrolling: touch;
}
          .menuButton {
            top: 76px;
            left: 18px;
          }

          .sidebar {
            width: 82%;
            left: -90%;
          }

          .sidebar.open {
            left: 0;
          }
            .sidebarCustomerStoreGlow {
  padding: 16px 14px !important;
  border-radius: 18px;

  box-shadow:
    0 0 24px rgba(249,115,22,0.42),
    0 0 42px rgba(34,197,94,0.34);

  animation: marketSidebarPulse 2s ease-in-out infinite;
}

.sidebarCustomerStoreGlow .subText {
  font-size: 12px;
  margin-top: 5px;
  color: rgba(255,255,255,0.92);
}

.storeIcon {
  width: 46px;
  height: 46px;
  min-width: 46px;

  font-size: 24px;

  border-radius: 16px;

  box-shadow:
    inset 0 0 18px rgba(255,255,255,0.18),
    0 0 16px rgba(255,255,255,0.12);
}

.sidebarCustomerStoreGlow::after {
  content: "🔥";
  position: absolute;

  top: 8px;
  left: 10px;

  font-size: 14px;

  animation: fireFloat 1.8s ease-in-out infinite;
}

@keyframes fireFloat {
  0%,100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}
        }
@keyframes marketSidebarWhitePulse {
  0%,100% {
    transform: scale(1);
    box-shadow:
      0 14px 32px rgba(15,23,42,.18),
      0 0 0 5px rgba(34,197,94,.05);
  }

  50% {
    transform: scale(1.035);
    box-shadow:
      0 18px 42px rgba(15,23,42,.22),
      0 0 0 7px rgba(37,99,235,.08),
      0 0 40px rgba(37,99,235,.20);
  }
}

@keyframes marketIconFloat {
  0%,100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}
      `}</style>
    </>
  );
}