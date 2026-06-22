"use client";

type Props = {
  products?: any[];
  country?: string;
};

type Offer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  store_name: string | null;
  country: string | null;
};

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const currencies: Record<string, string> = {
  sa: "ريال",
  ae: "درهم",
  kw: "دينار",
  qa: "ريال",
  bh: "دينار",
  eg: "جنيه",
};

function productSeoUrl(offer: Offer) {
  const slug = String(offer.product_name || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");

  return `/customer-offers/product/bps-chat-${slug}-${offer.country || "sa"}-${offer.id}`;
}

export default function SidebarMarketProducts({
  products = [],
  country = "sa",
}: Props) {
  const safeCountry = countryNames[country] ? country : "sa";
  const countryName = countryNames[safeCountry] || "دولتك";

  // فلترة المنتجات حسب الدولة الحالية فقط
  const filteredOffers = (products || []).filter((offer) => {
    const offerCountry = offer?.country || safeCountry;
    return offerCountry === safeCountry;
  });

  // أخذ أول 5 أو 6 منتجات متنوعة لعرضها بالطول
  const sidebarItems = filteredOffers.slice(0, 6) as Offer[];

  if (!sidebarItems.length) return null;

  return (
    <aside className="sidebarVerticalMarket" dir="rtl">
      <div className="sidebarMarketHead">
        <span className="sidebarMarketBadge">🔥 سوق {countryName}</span>
        <h3>مقترحة لك</h3>
      </div>

      <div className="sidebarProductList">
        {sidebarItems.map((offer) => (
          <a
            key={offer.id}
            href={productSeoUrl(offer)}
            className="sidebarProductCard"
          >
            <div className="sidebarProductImage">
              <img src={offer.image_url} alt={offer.product_name} />
            </div>
            
            <div className="sidebarProductInfo">
              <h4>{offer.product_name}</h4>
              <div className="sidebarProductMeta">
                <span className="sidebarProductPrice">
                  <strong>{offer.price}</strong>
                  <small>{currencies[offer.country || safeCountry]}</small>
                </span>
                <span className="sidebarProductStore">
                  {offer.store_name || "BPS Market"}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <a 
        href={`/customer-offers?country=${safeCountry}`} 
        className="sidebarMarketViewAll"
      >
        عرض كل عروض {countryName} 🚀
      </a>

      <style>{`
        .sidebarVerticalMarket {
          background: linear-gradient(180deg, #ffffff, #f8fafc);
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 10px 30px rgba(15,23,42,0.04);
        }

        .sidebarMarketHead {
          margin-bottom: 16px;
          border-bottom: 1px dashed #e2e8f0;
          padding-bottom: 12px;
        }

        .sidebarMarketBadge {
          display: inline-block;
          padding: 4px 10px;
          background: rgba(14, 165, 233, 0.1);
          color: #0284c7;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .sidebarMarketHead h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 950;
          color: #0f172a;
        }

        .sidebarProductList {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebarProductCard {
          display: flex;
          gap: 10px;
          text-decoration: none;
          padding: 8px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid #f1f5f9;
          transition: all 0.2s ease;
        }

        .sidebarProductCard:hover {
          transform: translateX(-4px);
          border-color: #0ea5e9;
          box-shadow: 0 6px 16px rgba(14,165,233,0.08);
        }

        .sidebarProductImage {
          width: 65px;
          height: 65px;
          min-width: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 10px;
          padding: 4px;
        }

        .sidebarProductImage img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .sidebarProductInfo {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-w-0;
          flex-1;
        }

        .sidebarProductInfo h4 {
          margin: 0;
          font-size: 12px;
          font-weight: 800;
          color: #1e293b;
          line-height: 1.4;
          height: 34px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .sidebarProductMeta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          margin-top: 4px;
        }

        .sidebarProductPrice {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .sidebarProductPrice strong {
          color: #16a34a;
          font-size: 13px;
          font-weight: 950;
        }

        .sidebarProductPrice small {
          color: #64748b;
          font-size: 9px;
          font-weight: 700;
        }

        .sidebarProductStore {
          font-size: 9px;
          color: #94a3b8;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 70px;
        }

        .sidebarMarketViewAll {
          display: block;
          text-align: center;
          text-decoration: none;
          background: #0f172a;
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          padding: 10px;
          border-radius: 12px;
          margin-top: 14px;
          transition: background 0.2s;
        }

        .sidebarMarketViewAll:hover {
          background: #0ea5e9;
        }
      `}</style>
    </aside>
  );
}