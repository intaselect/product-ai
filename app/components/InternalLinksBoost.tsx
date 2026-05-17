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
    <div className="internalLinksBoost" dir="rtl">
      {links.slice(0, 30).map((item, i) => (
        <a key={i} href={`/search/${item.slug}`}>
          {item.query}
        </a>
      ))}

      <style jsx>{`
        .internalLinksBoost {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          opacity: 0.9;
        }

        .internalLinksBoost a {
          font-size: 12px;
          color: #aaa;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          transition: 0.2s;
        }

        .internalLinksBoost a:hover {
          color: #10a37f;
          border-color: #10a37f;
        }
      `}</style>
    </div>
  );
}