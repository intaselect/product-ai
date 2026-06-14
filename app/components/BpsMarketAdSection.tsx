"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  products?: any[];
  country?: string;
};

const countryNames: any = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

export default function BpsMarketAdSection({ products = [], country = "sa" }: Props) {
  const [active, setActive] = useState(0);

  const images = useMemo(() => {
    const imgs = products
      .map((p) => p?.image_url || p?.image)
      .filter(Boolean)
      .slice(0, 6);

    return imgs.length > 0 ? imgs : ["/logo-icon.png"];
  }, [products]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [images.length]);

  const countryName = countryNames[country] || "دولتك";

  return (
    <section className="bpsMarketAd" dir="rtl">
      <div className="marketGlow"></div>

      <div className="marketImages">
        {images.map((img, i) => (
          <div
            key={i}
            className={`marketProductFloat float${i + 1} ${active === i ? "active" : ""}`}
          >
            <img src={img} alt="BPS Market product" />
          </div>
        ))}
      </div>

      <div className="marketAdContent">
       <div className="marketBadge">
  🌍 عالم المنتجات | BPS Chat Market
</div>

        <h2>
         اكتشف عالم المنتجات بأفضل الأسعار
          <span>والمنتجات من المتاجر الموثوقة</span>
        </h2>

        <p>
          تصفح عروض ومنتجات مختارة في {countryName}، قارن الأسعار، واشترِ من
          روابط مباشرة للمتاجر والبائعين داخل BPS Chat.
        </p>

        <div className="marketFeatures">
          <span>🔥 عروض يومية</span>
          <span>🛡️ متاجر موثوقة</span>
          <span>💸 أسعار أقل</span>
        </div>

        <div className="marketActions">
          <a href={`/customer-offers?country=${country}`} className="mainMarketBtn">
            🛒 تصفح أرخص الأسعار والمنتجات
          </a>

          <a href="/customer-offers/dashboard" className="sellBtn">
            🏪 بيع معنا
          </a>

          <a href="/advertise" className="adsBtn">
            🚀 أعلن معنا
          </a>
        </div>
      </div>

      <style jsx>{`
        .bpsMarketAd {
          position: relative;
          overflow: hidden;
          margin: 30px auto;
          padding: 42px 26px;
          max-width: 920px;
          min-height: 330px;
          border-radius: 34px;
          background:
            radial-gradient(circle at top, rgba(34,197,94,0.18), transparent 35%),
            linear-gradient(135deg, rgba(15,23,42,0.96), rgba(17,24,39,0.94), rgba(37,99,235,0.28));
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 0 45px rgba(0,255,200,0.12),
            inset 0 0 30px rgba(255,255,255,0.04);
        }

        .marketGlow {
          position: absolute;
          inset: -40%;
          background: conic-gradient(from 180deg, transparent, rgba(0,255,200,0.12), transparent, rgba(37,99,235,0.12), transparent);
          animation: marketRotate 12s linear infinite;
        }

        @keyframes marketRotate {
          to { transform: rotate(360deg); }
        }

        .marketAdContent {
          position: relative;
          z-index: 3;
          text-align: center;
          max-width: 650px;
          margin: 0 auto;
        }

        .marketBadge {
          display: inline-flex;
          padding: 9px 17px;
          border-radius: 999px;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(0,255,200,0.28);
          color: #00ffd5;
          font-size: 13px;
          font-weight: 950;
          margin-bottom: 15px;
        }

        .marketAdContent h2 {
          margin: 0;
          font-size: clamp(30px, 5vw, 48px);
          line-height: 1.25;
          font-weight: 950;
          color: #fff;
        }

        .marketAdContent h2 span {
          display: block;
           color: #00d4ff;
  text-shadow: 0 0 18px rgba(0,212,255,.35);
        }

        .marketAdContent p {
          color: #dbeafe;
          line-height: 2;
          font-size: 15px;
          margin: 16px auto;
        }

        .marketFeatures {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin: 18px 0;
        }

        .marketFeatures span {
          padding: 9px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          font-weight: 900;
          font-size: 12px;
          color: #fff;
        }

        .marketActions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .marketActions a {
          text-decoration: none;
          border-radius: 16px;
          font-weight: 950;
          transition: all .25s ease;
        }

        .mainMarketBtn {
          padding: 15px 28px;
          color: #fff;
           background: linear-gradient(
    135deg,
    #0b7cff,
    #00d4ff,
    #ff8a00
  );
          box-shadow: 0 16px 35px rgba(37,99,235,0.28);
        }

        .sellBtn,
        .adsBtn {
          padding: 14px 20px;
          color: #fff;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
        }

        .marketActions a:hover {
          transform: translateY(-4px) scale(1.03);
        }

        .marketImages {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .marketProductFloat {
          position: absolute;
          width: 120px;
          height: 120px;
          padding: 10px;
          border-radius: 24px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          opacity: .55;
          transform: scale(.92);
          transition: all .5s ease;
          animation: floatProduct 5s ease-in-out infinite;
        }

        .marketProductFloat.active {
          opacity: 1;
          transform: scale(1.08);
          box-shadow: 0 0 28px rgba(0,255,200,0.28);
        }

        .marketProductFloat img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 18px;
        }

        .float1 { top: 35px; right: 35px; }
        .float2 { bottom: 35px; right: 70px; animation-delay: .6s; }
        .float3 { top: 45px; left: 45px; animation-delay: 1s; }
        .float4 { bottom: 35px; left: 80px; animation-delay: 1.4s; }
        .float5 { top: 135px; right: 10px; animation-delay: 1.8s; }
        .float6 { top: 135px; left: 10px; animation-delay: 2.2s; }

        @keyframes floatProduct {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }

        @media (max-width: 700px) {
          .bpsMarketAd {
            margin: 22px 8px;
            padding: 30px 14px;
            min-height: auto;
          }

          .marketProductFloat {
            display: none;
          }

          .marketActions a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}