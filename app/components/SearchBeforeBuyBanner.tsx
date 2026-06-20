"use client";

export default function SearchBeforeBuyBanner() {
  return (
    <section className="searchBeforeBuyBanner" dir="rtl">
      <div className="searchBeforeBuyGlow"></div>

      <div className="searchBeforeBuyText">
        <span>✨ قبل ما تشتري</span>

        <h2>ابحث داخل عالم المنتجات وقارن السعر أولاً</h2>

        <p>
          عالم المنتجات من BPS Chat يساعدك تشوف أفضل الأسعار من المتاجر قبل قرار الشراء.
        </p>
      </div>

      <a href="/" className="searchBeforeBuyBtn">
        🔎 ابحث عن المنتج
      </a>

      <style jsx>{`
        .searchBeforeBuyBanner {
          position: relative;
          max-width: 1320px;
          margin: 18px auto 22px;
          padding: 18px 22px;
          border-radius: 26px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background:
            radial-gradient(circle at 15% 20%, rgba(245, 158, 11, 0.16), transparent 32%),
            linear-gradient(135deg, #ffffff, #fffaf0);
          color: #111827;
          border: 1px solid rgba(245, 158, 11, 0.35);
          box-shadow:
            0 18px 45px rgba(15, 23, 42, 0.08),
            0 0 0 5px rgba(245, 158, 11, 0.06);
        }

        .searchBeforeBuyGlow {
          position: absolute;
          inset: -60%;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.24), transparent 55%);
          animation: searchGlowMove 6s ease-in-out infinite;
          pointer-events: none;
        }

        .searchBeforeBuyText {
          position: relative;
          z-index: 2;
        }

        .searchBeforeBuyText span {
          display: inline-flex;
          margin-bottom: 6px;
          color: #b45309;
          font-weight: 950;
          font-size: 13px;
        }

        .searchBeforeBuyText h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 950;
          color: #111827;
        }

        .searchBeforeBuyText p {
          margin: 6px 0 0;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.7;
          font-weight: 800;
        }

        .searchBeforeBuyBtn {
          position: relative;
          z-index: 2;
          text-decoration: none;
          white-space: nowrap;
          padding: 14px 24px;
          border-radius: 18px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          font-weight: 950;
          box-shadow: 0 14px 32px rgba(245, 158, 11, 0.28);
          transition: all .25s ease;
        }

        .searchBeforeBuyBtn:hover {
          transform: translateY(-3px) scale(1.04);
          background: linear-gradient(135deg, #fbbf24, #b45309);
          box-shadow: 0 20px 44px rgba(245, 158, 11, 0.42);
        }

        @keyframes searchGlowMove {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
            opacity: .55;
          }
          50% {
            transform: translateX(-8%) rotate(-8deg);
            opacity: 1;
          }
        }

        @media (max-width: 700px) {
          .searchBeforeBuyBanner {
            margin: 14px 12px 20px;
            padding: 18px;
            flex-direction: column;
            text-align: center;
          }

          .searchBeforeBuyText h2 {
            font-size: 21px;
          }

          .searchBeforeBuyBtn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}