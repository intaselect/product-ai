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

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      <button className="menuButton" onClick={() => setMenuOpen(true)}>☰</button>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebarHeader">
          <strong>
            BPS Chat
            <span className="arabicName">بي بي اس شات</span>
          </strong>

          <button className="closeButton" onClick={() => setMenuOpen(false)}>×</button>
        </div>

        {user ? (
          <div className="menuItem" style={{ cursor: "default", opacity: 0.9 }}>
            👤 {user.email.split("@")[0]}
          </div>
        ) : (
          <a href="/login" className="menuItem">تسجيل الدخول</a>
        )}

        <a href="/advertise" className="menuItem sidebarAdvertiseGlow">🚀 أعلن معنا</a>
        <a href="/smart-search" className="menuItem sidebarSmartGlow">⚡ البحث الذكي</a>
        <a href="/seller-tools" className="menuItem sidebarSellerGlow">📝 أدوات البائع</a>
        <a href="/about" className="menuItem">عن الموقع</a>
        <a href="/contact" className="menuItem">تواصل معنا</a>
        <a href="/privacy" className="menuItem">سياسة الخصوصية</a>
        <a href="/terms" className="menuItem">الشروط والأحكام</a>

        {user && (
          <button
            className="menuItem"
            onClick={async () => {
              await supabase.auth.signOut();
              setUser(null);
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
          z-index: 80;
          width: 42px;
          height: 42px;
          border: 1px solid #3a3a3a;
          border-radius: 12px;
          background: #2f2f2f;
          color: #fff;
          font-size: 22px;
          cursor: pointer;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 90;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: -280px;
          width: 260px;
          height: 100vh;
          background: #171717;
          border-right: 1px solid #2f2f2f;
          z-index: 100;
          padding: 18px;
          transition: left 0.25s ease;
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

        .sidebarAdvertiseGlow {
          background: rgba(16, 163, 127, 0.18);
          border: 1px solid rgba(0,255,200,0.25);
        }

        .sidebarSmartGlow {
          background: rgba(37, 99, 235, 0.18);
          border: 1px solid rgba(0,180,255,0.35);
        }

        .sidebarSellerGlow {
          background: rgba(255, 193, 7, 0.14);
          border: 1px solid rgba(255,193,7,0.25);
        }

        @media (max-width: 600px) {
          .sidebar {
            width: 82%;
            left: -85%;
          }

          .sidebar.open {
            left: 0;
          }
        }
      `}</style>
    </>
  );
}