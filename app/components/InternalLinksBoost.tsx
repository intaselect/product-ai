"use client";

import { useEffect, useState } from "react";

const countries = ["sa", "ae", "kw", "qa", "bh", "eg"];

const categories = [
  { key: "mobiles", name: "موبايلات" },
  { key: "electronics", name: "إلكترونيات" },
  { key: "smart_watch", name: "ساعات ذكية" },
  { key: "gaming", name: "جيمينج" },
  { key: "home", name: "المنزل" },
];

const countryNames: any = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const mainSeoLinks = [
  { title: "🔥 موبايلات السعودية", href: "/customer-offers/sa/mobiles" },
  { title: "🔥 إلكترونيات السعودية", href: "/customer-offers/sa/electronics" },
  { title: "🔥 موبايلات مصر", href: "/customer-offers/eg/mobiles" },
  { title: "🔥 إلكترونيات مصر", href: "/customer-offers/eg/electronics" },
  { title: "🔥 موبايلات الإمارات", href: "/customer-offers/ae/mobiles" },
  { title: "🔥 ساعات ذكية الإمارات", href: "/customer-offers/ae/smart_watch" },
  { title: "🛒 كل عروض العملاء", href: "/customer-offers" },
  { title: "🚀 أعلن عن منتجاتك", href: "/advertise" },
];

const dynamicSeoLinks = countries.flatMap((c) =>
  categories.map((cat) => ({
    title: `${cat.name} ${countryNames[c]}`,
    href: `/customer-offers/${c}/${cat.key}`,
  }))
);

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

  return (
    <section className="aiLinksBoost" dir="rtl">
      <div className="aiLinksInner">
        <div className="aiLinksTitle">
          <span>🤖 روابط ذكية من BPS Chat</span>
          <small>تصفح عروض المنتجات حسب الدولة والقسم وقارن الأسعار أسرع</small>
        </div>

        <div className="aiLinksSlider">
          {mainSeoLinks.map((item, i) => (
            <a key={`main-seo-${i}`} href={item.href} className="mainSeoLink">
              {item.title}
            </a>
          ))}

          {dynamicSeoLinks.slice(0, 12).map((item, i) => (
            <a key={`dynamic-seo-${i}`} href={item.href} className="seoLink">
              {item.title}
            </a>
          ))}

          {links.slice(0, 16).map((item, i) => (
            <a key={`search-${i}`} href={`/search/${item.slug}`}>
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
        }

        .aiLinksSlider a {
          flex: 0 0 auto;
          max-width: 230px;
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

        .mainSeoLink {
          background: rgba(249,115,22,0.18) !important;
          border: 1px solid rgba(249,115,22,0.55) !important;
          color: #ffd0a8 !important;
          font-weight: 900;
        }

        .seoLink {
          background: rgba(34,197,94,0.12) !important;
          border: 1px solid rgba(34,197,94,0.35) !important;
          color: #bbf7d0 !important;
        }

        .mainSeoLink:hover,
        .seoLink:hover {
          color: #fff !important;
          box-shadow: 0 0 18px rgba(249,115,22,0.28) !important;
        }
      `}</style>
    </section>
  );
}