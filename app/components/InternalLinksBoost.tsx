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
  padding: 18px 14px 16px;
  background:
    radial-gradient(circle at center, rgba(16,163,127,0.08), transparent 48%),
    rgba(8, 12, 16, 0.92);
  border-top: 1px solid rgba(16,163,127,0.14);
  border-bottom: 1px solid rgba(16,163,127,0.10);
  box-shadow: inset 0 0 45px rgba(0,0,0,0.45);
}

.aiLinksInner {
  max-width: 1050px;
  margin: 0 auto;
  text-align: center;
}

.aiLinksTitle span {
  display: block;
  color: #10ffd0;
  font-size: 16px;
  font-weight: 900;
  text-shadow:
    0 0 10px rgba(16,163,127,0.55),
    0 0 24px rgba(0,255,200,0.16);
}

.aiLinksTitle small {
  display: block;
  margin-top: 6px;
  color: #7f938b;
  font-size: 12px;
}

.aiLinksSlider {
  margin-top: 13px;
  display: flex;
  gap: 9px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 4px 12px;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #10a37f rgba(255,255,255,0.06);
}

.aiLinksSlider::-webkit-scrollbar {
  height: 5px;
}

.aiLinksSlider::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
}

.aiLinksSlider::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #10a37f, #00c8ff);
  border-radius: 999px;
}

.aiLinksSlider a {
  flex: 0 0 auto;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #dffaf2;
  text-decoration: none;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(16,163,127,0.22);
  transition: 0.2s ease;
}

.aiLinksSlider a:hover {
  color: #10ffd0;
  border-color: rgba(0,255,200,0.55);
  background: rgba(16,163,127,0.12);
  transform: translateY(-2px);
  box-shadow: 0 0 16px rgba(16,163,127,0.22);
}
      `}</style>
    </section>
  );
}