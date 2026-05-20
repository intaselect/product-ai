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

        <a href="/" className="menuItem">الرئيسية</a>

        <a href="/advertise" className="menuItem sidebarAdvertiseGlow">
          🚀 أعلن معنا
        </a>

        <a href="/smart-search" className="menuItem sidebarSmartGlow">
          ⚡ البحث الذكي
        </a>

        <a href="/seller-tools" className="menuItem sidebarSellerGlow">
          📝 أدوات البائع
        </a>
        <a href="/customer-offers" className="menuItem sidebarCustomerStoreGlow">
  🛒 متجر العملاء
  <span className="subText">بيع واشتري</span>
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

          width: 42px;
          height: 42px;
          padding: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #3a3a3a;
          border-radius: 12px;
          background: #2f2f2f;
          color: #ffffff;

          font-size: 22px;
          line-height: 1;
          cursor: pointer;

          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
.sidebarCustomerStoreGlow {
  position: relative;
  background: linear-gradient(135deg, rgba(34,197,94,0.18), rgba(59,130,246,0.15));
  border: 1px solid rgba(34,197,94,0.35);
  color: #fff;
  font-weight: 900;
  overflow: hidden;
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

.sidebarCustomerStoreGlow:hover {
  transform: translateX(-4px);
  box-shadow: 0 0 25px rgba(34,197,94,0.35);
}

/* النص الصغير */
.subText {
  display: block;
  font-size: 11px;
  color: #cfcfcf;
  margin-top: 3px;
  font-weight: 600;
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
          height: 100vh;
          padding: 18px;

          background: #171717;
          border-right: 1px solid #2f2f2f;

          transition: left 0.25s ease;
          box-shadow: 12px 0 40px rgba(0, 0, 0, 0.45);
        }

        .sidebar.open {
          left: 0;
        }

        .sidebarHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;

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

          padding: 13px 12px;
          margin-bottom: 8px;
          border-radius: 12px;

          color: #ffffff !important;
          text-decoration: none;
          background: transparent;
          border: none;

          text-align: right;
          font-size: 15px;
          cursor: pointer;
        }

        .menuItem:hover {
          background: #2f2f2f;
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

        @media (max-width: 600px) {
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
        }
      `}</style>
    </>
  );
}