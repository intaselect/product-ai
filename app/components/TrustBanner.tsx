export default function TrustBanner() {
  return (
    <section className="trustBanner">
      <div className="trustInner">

        <div className="trustLogos">
          <span>Amazon</span>
          <span>Noon</span>
          <span>Jarir</span>
          <span>Extra</span>
          <span>Carrefour</span>
          <span>Namshi</span>
        </div>

        <div className="trustText">
          🛡️ يبحث BPS Chat ويقارن الأسعار من متاجر موثوقة لمساعدتك في العثور على أفضل العروض.
        </div>

      </div>

      <style jsx>{`
        .trustBanner {
          background: rgba(255,255,255,.96);
          border-bottom: 1px solid #e5e7eb;
          padding: 6px 10px;
        }

        .trustInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .trustLogos {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .trustLogos span {
          background: #f8fafc;
          border: 1px solid #dbeafe;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          color: #374151;
        }

        .trustText {
          font-size: 12px;
          font-weight: 900;
          color: #0f172a;
        }

        @media (max-width: 700px) {
          .trustInner {
            justify-content: center;
            text-align: center;
          }

          .trustText {
            font-size: 11px;
          }

          .trustLogos span {
            font-size: 10px;
            padding: 3px 8px;
          }
        }
      `}</style>
    </section>
  );
}