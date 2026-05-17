"use client";

import { useEffect, useState } from "react";

export default function InternalLinksBoost() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/popular-searches");
        const data = await res.json();
        setLinks(data.searches || []);
      } catch {}
    }

    load();
  }, []);

  if (!links.length) return null;

  return (
    <section className="aiLinksBoost" dir="rtl">
      <div className="aiLinksInner">
        <div className="aiLinksTitle">
          <span>🤖 روابط ذكية من BPS Chat</span>
          <small>اقتراحات بحث تساعدك تقارن الأسعار أسرع</small>
        </div>

        <div className="aiLinksSlider">
          {links.slice(0, 30).map((item, i) => (
            <a key={i} href={`/search/${item.slug}`}>
              {item.query}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .aiLinksBoost {
          width: 100%;
          margin: 0;
          padding: 28px 14px;
          background:
            radial-gradient(circle at center, rgba(16,163,127,0.12), transparent 55%),
            linear-gradient(180deg, rgba(11,15,20,0.2), rgba(11,15,20,1));
          border-top: 1px solid rgba(16,163,127,0.18);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .aiLinksInner {
          max-width: 1050px;
          margin: 0 auto;
          text-align: center;
        }

        .aiLinksTitle span {
          display: block;
          color: #18d6a3;
          font-size: 18px;
          font-weight: 900;
          text-shadow:
            0 0 12px rgba(16,163,127,0.55),
            0 0 30px rgba(0,255,200,0.18);
        }

        .aiLinksTitle small {
          display: block;
          margin-top: 7px;
          color: #9fb3aa;
          font-size: 13px;
        }

        .aiLinksSlider {
          margin-top: 18px;
          display: flex;
          gap: 10px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 10px 4px 16px;
          white-space: nowrap;
          scrollbar-width: thin;
          scrollbar-color: #10a37f rgba(255,255,255,0.08);
        }

        .aiLinksSlider::-webkit-scrollbar {
          height: 6px;
        }

        .aiLinksSlider::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
        }

        .aiLinksSlider::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #10a37f, #00e5ff);
          border-radius: 999px;
        }

        .aiLinksSlider a {
          flex: 0 0 auto;
          max-width: 230px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          color: #dffaf2;
          text-decoration: none;
          font-size: 13px;
          padding: 9px 13px;
          border-radius: 999px;

          background:
            linear-gradient(135deg, rgba(16,163,127,0.13), rgba(0,180,255,0.08)),
            rgba(255,255,255,0.045);

          border: 1px solid rgba(16,163,127,0.25);

          box-shadow:
            0 0 10px rgba(16,163,127,0.10),
            inset 0 0 12px rgba(255,255,255,0.03);

          transition: 0.2s ease;
        }

        .aiLinksSlider a:hover {
          color: #10ffd0;
          border-color: rgba(0,255,200,0.65);
          background: rgba(16,163,127,0.16);
          transform: translateY(-2px);
          box-shadow:
            0 0 16px rgba(16,163,127,0.35),
            0 0 35px rgba(0,180,255,0.12);
        }
      `}</style>
    </section>
  );
}