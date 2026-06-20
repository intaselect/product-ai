"use client";

export default function TrustedSourcesBar() {
  const sources = [
    "Amazon Saudi",
    "Noon Saudi",
    "Jarir",
    "Extra",
    "SACO",
    "Namshi",
    "Amazon UAE",
    "Noon UAE",
    "Sharaf DG",
    "Carrefour UAE",
    "DubaiStore",
    "Lulu Hypermarket",
    "Best Al-Yousifi Kuwait",
    "Blink Kuwait",
    "Xcite Kuwait",
    "Eureka Kuwait",
    "Noon Kuwait",
    "Jumia Egypt",
    "Amazon Egypt",
    "Noon Egypt",
    "B.TECH",
    "2B Egypt",
    "Raya Shop",
    "Carrefour Egypt",
    "AliExpress",
    "Temu",
    "Alibaba",
    "Google Shopping",
    "ChatGPT AI",
    "BPS Market",
  ];

  return (
    <section className="trustedSourcesBar">
      <div className="trustedText">
        <strong>مصادر تسوق موثوقة</strong>
        <span>Trusted Shopping Sources</span>
      </div>

      <div className="trustedTrack">
        {[...sources, ...sources].map((name, i) => (
          <span key={i} className="trustedLogo">
            {name}
          </span>
        ))}
      </div>

      <style jsx>{`
        .trustedSourcesBar {
          margin: 24px auto;
          max-width: 1320px;
          border-radius: 28px;
          overflow: hidden;
          background: linear-gradient(135deg, #ffffff, #fffaf0);
          border: 1px solid rgba(245, 158, 11, 0.22);
          box-shadow:
            0 15px 35px rgba(15, 23, 42, 0.08),
            0 0 0 4px rgba(245, 158, 11, 0.05);
          padding: 18px;
        }

        .trustedText {
          text-align: center;
          margin-bottom: 14px;
        }

        .trustedText strong {
          display: block;
          color: #111827;
          font-size: 22px;
          font-weight: 950;
        }

        .trustedText span {
          color: #b45309;
          font-weight: 900;
        }

        .trustedTrack {
          display: flex;
          gap: 12px;
          overflow: hidden;
          white-space: nowrap;
        }

        .trustedLogo {
          flex-shrink: 0;
          padding: 10px 16px;
          border-radius: 999px;
          background: #fff;
          color: #111827;
          border: 1px solid rgba(245, 158, 11, 0.25);
          font-weight: 900;
          transition: .25s;
        }

        .trustedLogo:hover {
          background: linear-gradient(135deg, #fbbf24, #d97706);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(245, 158, 11, 0.25);
        }
      `}</style>
    </section>
  );
}