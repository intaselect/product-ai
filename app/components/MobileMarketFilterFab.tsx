"use client";

import { useState } from "react";
import Link from "next/link";

const countries = {
  sa: { ar: "السعودية", flag: "🇸🇦" },
  ae: { ar: "الإمارات", flag: "🇦🇪" },
  kw: { ar: "الكويت", flag: "🇰🇼" },
  qa: { ar: "قطر", flag: "🇶🇦" },
  bh: { ar: "البحرين", flag: "🇧🇭" },
  eg: { ar: "مصر", flag: "🇪🇬" },
};

const categories = {
  electronics: { ar: "إلكترونيات", icon: "🎧" },
  mobiles: { ar: "جوالات وتابلت", icon: "📱" },
  computers: { ar: "كمبيوتر ولابتوب", icon: "💻" },
  home: { ar: "المنزل والمطبخ", icon: "🏠" },
  beauty: { ar: "جمال وعناية", icon: "💄" },
  kids: { ar: "أطفال", icon: "🧸" },
  gaming: { ar: "ألعاب وجيمينج", icon: "🎮" },
  cameras: { ar: "كاميرات", icon: "📷" },
  fashion: { ar: "ملابس", icon: "👕" },
  shoes: { ar: "أحذية", icon: "👟" },
};

export default function MobileMarketFilterFab({
  country = "sa",
  category = "mobiles",
}: {
  country?: string;
  category?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="marketFab" onClick={() => setOpen(true)}>
        🔥
      </button>

      {open && <div className="fabOverlay" onClick={() => setOpen(false)} />}

      <div className={`fabSheet ${open ? "open" : ""}`} dir="rtl">
        <div className="sheetHeader">
          <div>
            <strong>تغيير السوق بسرعة</strong>
            <span>اختار الدولة أو القسم</span>
          </div>

          <button onClick={() => setOpen(false)}>×</button>
        </div>

        <h3>🌍 الدول</h3>
        <div className="quickGrid">
          {Object.entries(countries).map(([code, item]) => (
            <Link
              key={code}
              href={`/bps-market/${code}/${category}`}
              className={code === country ? "active" : ""}
            >
              {item.flag} {item.ar}
            </Link>
          ))}
        </div>

        <h3>🔥 الأقسام</h3>
        <div className="quickGrid">
          {Object.entries(categories).map(([key, item]) => (
            <Link
              key={key}
              href={`/bps-market/${country}/${key}`}
              className={key === category ? "active" : ""}
            >
              {item.icon} {item.ar}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marketFab {
          display: none;
        }

        @media (max-width: 700px) {
          .marketFab {
            position: fixed;
            right: 18px;
            bottom: 22px;
            z-index: 9998;

            width: 58px;
            height: 58px;
            border-radius: 999px;
            border: 2px solid rgba(254, 215, 170, 0.9);

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 27px;
            color: white;
            background:
              radial-gradient(circle at 30% 20%, #fef3c7, #fb923c 32%, #ef4444 62%, #7f1d1d);
            box-shadow:
              0 0 20px rgba(249, 115, 22, 0.75),
              0 0 55px rgba(239, 68, 68, 0.38);

            animation: fireFabPulse 1.8s ease-in-out infinite;
          }

          .fabOverlay {
            position: fixed;
            inset: 0;
            z-index: 9996;
            background: rgba(0, 0, 0, 0.45);
          }

          .fabSheet {
            position: fixed;
            right: 0;
            left: 0;
            bottom: -85vh;
            z-index: 9997;

            max-height: 78vh;
            overflow-y: auto;

            padding: 18px;
            border-radius: 28px 28px 0 0;

            background: linear-gradient(180deg, #ffffff, #f8fafc);
            border: 1px solid #dbeafe;
            box-shadow: 0 -22px 55px rgba(15, 23, 42, 0.24);

            transition: bottom 0.28s ease;
          }

          .fabSheet.open {
            bottom: 0;
          }

          .sheetHeader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 14px;
            margin-bottom: 16px;
          }

          .sheetHeader strong {
            display: block;
            color: #111827;
            font-size: 18px;
            font-weight: 950;
          }

          .sheetHeader span {
            display: block;
            color: #64748b;
            font-size: 12px;
            font-weight: 800;
            margin-top: 4px;
          }

          .sheetHeader button {
            width: 38px;
            height: 38px;
            border-radius: 999px;
            border: 0;
            background: #111827;
            color: white;
            font-size: 24px;
          }

          h3 {
            margin: 18px 0 10px;
            color: #111827;
            font-size: 16px;
            font-weight: 950;
          }

          .quickGrid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 9px;
          }

          .quickGrid a {
            text-decoration: none;
            color: #111827;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            padding: 12px 10px;
            border-radius: 16px;
            text-align: center;
            font-size: 13px;
            font-weight: 900;
          }

          .quickGrid a.active {
            color: white;
            border-color: transparent;
            background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);
          }

          @keyframes fireFabPulse {
            0%, 100% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.08);
            }
          }
        }
      `}</style>
    </>
  );
}