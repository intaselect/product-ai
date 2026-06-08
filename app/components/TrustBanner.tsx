"use client";

export default function TrustBanner() {
  const stores = ["Amazon", "Noon", "Jarir", "Extra", "Carrefour", "Namshi"];

  return (
    <section className="trustBanner" dir="rtl">
      <div className="trustInner">
        <div className="trustText">
          🛡️ مصادر موثوقة للنتائج والأسعار
        </div>

        <div className="trustStores">
          {stores.map((store) => (
            <span key={store}>
              <b>{store.slice(0, 1)}</b>
              {store}
            </span>
          ))}
        </div>

        <div className="trustNote">
          يقارن BPS Chat الأسعار من أشهر المتاجر لمساعدتك في أفضل عرض
        </div>
      </div>

      <style jsx>{`
        .trustBanner {
          background: rgba(255,255,255,.96);
          border-bottom: 1px solid #e5e7eb;
          padding: 5px 10px;
          overflow: hidden;
        }

        .trustInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .trustText {
          font-size: 12px;
          font-weight: 950;
          color: #0f172a;
          white-space: nowrap;
        }

        .trustStores {
          display: flex;
          gap: 6px;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .trustStores::-webkit-scrollbar {
          display: none;
        }

        .trustStores span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg,#f8fafc,#ffffff);
          border: 1px solid #dbeafe;
          color: #334155;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 900;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(15,23,42,.05);
        }

        .trustStores b {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg,#16a34a,#2563eb);
          color: #fff;
          font-size: 9px;
          font-weight: 950;
        }

        .trustNote {
          font-size: 11px;
          color: #64748b;
          font-weight: 800;
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .trustBanner {
            padding: 5px 6px;
          }

          .trustInner {
            justify-content: flex-start;
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .trustInner::-webkit-scrollbar {
            display: none;
          }

          .trustText {
            font-size: 11px;
          }

          .trustNote {
            display: none;
          }

          .trustStores span {
            font-size: 9px;
            padding: 3px 7px;
          }
        }
      `}</style>
    </section>
  );
}