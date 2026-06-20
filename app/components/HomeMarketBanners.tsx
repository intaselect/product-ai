"use client";

type Props = {
  products: any[];
  country: string;
};

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const sections = [
  { key: "mobiles", title: "أحدث الجوالات", icon: "📱" },
  { key: "computers", title: "لابتوبات وكمبيوتر", icon: "💻" },
  { key: "perfumes", title: "عطور مختارة", icon: "🌸" },
  { key: "incense", title: "بخور ومنتجات فاخرة", icon: "🪔" },
  { key: "gaming", title: "ألعاب وجيمينج", icon: "🎮" },
];

export default function HomeMarketBanners({ products, country }: Props) {
  const countryName = countryNames[country] || "دولتك";

  const countryProducts = (products || []).filter(
    (p) => (p.country || "sa") === country
  );

  const fallbackProducts = countryProducts.length
  ? countryProducts
  : (products || []).slice(0, 20);

if (!fallbackProducts.length) return null;

  return (
    <section className="homeMarketBanners" dir="rtl">
      <div className="homeMarketTopBanner">
        <div>
          <span>✨ عالم المنتجات</span>
          <h2>منتجات مختارة لك في {countryName}</h2>
          <p>
            تصفح منتجات وعروض من متاجر وبائعين داخل دولتك بنفس تجربة المتاجر الكبيرة.
          </p>
        </div>

        <a href={`/customer-offers?country=${country}`}>
          تصفح كل المنتجات
        </a>
      </div>

      {sections.map((section) => {
      const matchedItems = fallbackProducts.filter((p) => {
  const cat = Array.isArray(p.category)
    ? p.category
    : [p.category];

  return cat.includes(section.key);
});

const items = (matchedItems.length ? matchedItems : fallbackProducts).slice(0, 10);

        return (
          <div className="homeMarketSection" key={section.key}>
            <div className="homeMarketHeader">
              <div>
                <span>{section.icon}</span>
                <h3>{section.title} في {countryName}</h3>
              </div>

              <a href={`/customer-offers?category=${section.key}&country=${country}`}>
                عرض الكل
              </a>
            </div>

            <div className="homeMarketSlider">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`/api/customer-offers/click/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="homeMarketCard"
                >
                  <div className="homeMarketImage">
                    <img src={item.image_url} alt={item.product_name} />
                  </div>

                  <div className="homeMarketInfo">
                    <strong>{item.product_name}</strong>
                    <span>{item.price}</span>
                    <small>{item.store_name || "BPS Market"}</small>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .homeMarketBanners {
          max-width: 1320px;
          margin: 24px auto;
        }

        .homeMarketTopBanner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 24px;
          border-radius: 30px;
          background: linear-gradient(135deg, #ffffff, #fffaf0);
          border: 1px solid rgba(245, 158, 11, 0.28);
          box-shadow:
            0 18px 45px rgba(15, 23, 42, 0.08),
            0 0 0 5px rgba(245, 158, 11, 0.05);
        }

        .homeMarketTopBanner span {
          color: #b45309;
          font-weight: 950;
        }

        .homeMarketTopBanner h2 {
          margin: 6px 0;
          color: #111827;
          font-size: 28px;
          font-weight: 950;
        }

        .homeMarketTopBanner p {
          margin: 0;
          color: #6b7280;
          font-weight: 800;
          line-height: 1.8;
        }

        .homeMarketTopBanner a,
        .homeMarketHeader a {
          text-decoration: none;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #fff;
          padding: 13px 20px;
          border-radius: 16px;
          font-weight: 950;
          white-space: nowrap;
          transition: .25s;
          box-shadow: 0 12px 26px rgba(245, 158, 11, .24);
        }

        .homeMarketTopBanner a:hover,
        .homeMarketHeader a:hover {
          background: linear-gradient(135deg, #fbbf24, #b45309);
          transform: translateY(-3px);
        }

        .homeMarketSection {
          margin-top: 22px;
          padding: 18px;
          border-radius: 28px;
          background: #ffffff;
          border: 1px solid rgba(245, 158, 11, 0.18);
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
        }

        .homeMarketHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
        }

        .homeMarketHeader div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .homeMarketHeader span {
          width: 46px;
          height: 46px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff7ed;
          border: 1px solid rgba(245, 158, 11, .22);
          font-size: 24px;
        }

        .homeMarketHeader h3 {
          margin: 0;
          color: #111827;
          font-size: 22px;
          font-weight: 950;
        }

        .homeMarketSlider {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding: 4px 2px 12px;
          scroll-snap-type: x mandatory;
        }

        .homeMarketSlider::-webkit-scrollbar {
          height: 7px;
        }

        .homeMarketSlider::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #f59e0b, #d97706);
          border-radius: 999px;
        }

        .homeMarketCard {
          width: 185px;
          min-width: 185px;
          text-decoration: none;
          color: #111827;
          border-radius: 22px;
          background: #fff;
          border: 1px solid #f3e8d0;
          overflow: hidden;
          scroll-snap-align: start;
          transition: .25s;
        }

        .homeMarketCard:hover {
          transform: translateY(-6px);
          border-color: #f59e0b;
          box-shadow: 0 18px 35px rgba(245, 158, 11, .20);
        }

        .homeMarketImage {
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fffaf0;
          padding: 10px;
        }

        .homeMarketImage img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .homeMarketInfo {
          padding: 11px;
        }

        .homeMarketInfo strong {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 42px;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 950;
        }

        .homeMarketInfo span {
          display: block;
          margin-top: 8px;
          color: #b45309;
          font-size: 16px;
          font-weight: 950;
        }

        .homeMarketInfo small {
          display: block;
          margin-top: 4px;
          color: #6b7280;
          font-size: 11px;
          font-weight: 800;
        }

        @media (max-width: 700px) {
          .homeMarketBanners {
            margin: 18px 10px;
          }

          .homeMarketTopBanner {
            flex-direction: column;
            text-align: center;
            padding: 20px 16px;
          }

          .homeMarketTopBanner a {
            width: 100%;
            text-align: center;
          }

          .homeMarketHeader {
            align-items: flex-start;
          }

          .homeMarketHeader h3 {
            font-size: 18px;
          }

          .homeMarketHeader a {
            padding: 10px 14px;
            font-size: 12px;
          }

          .homeMarketCard {
            width: 155px;
            min-width: 155px;
          }

          .homeMarketImage {
            height: 130px;
          }
        }
      `}</style>
    </section>
  );
}