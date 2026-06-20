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

const currencyLabel: Record<string, string> = {
  sa: "ريال",
  ae: "درهم",
  kw: "دينار",
  qa: "ريال",
  bh: "دينار",
  eg: "جنيه",
};

const promoCategories = [
  {
    key: "mobiles",
    title: "جوالات وتابلت",
    subtitle: "أحدث الموبايلات والأسعار",
    icon: "📱",
  },
  {
    key: "computers",
    title: "لابتوبات وكمبيوتر",
    subtitle: "أجهزة مناسبة للشغل والدراسة",
    icon: "💻",
  },
  {
    key: "perfumes",
    title: "عطور مختارة",
    subtitle: "أفضل العطور حسب دولتك",
    icon: "🌸",
  },
  {
    key: "incense",
    title: "بخور فاخر",
    subtitle: "بخور ومنتجات فاخرة",
    icon: "🪔",
  },
  {
    key: "gaming",
    title: "ألعاب وجيمينج",
    subtitle: "بلايستيشن وإكسسوارات الألعاب",
    icon: "🎮",
  },
];

function productCategories(product: any): string[] {
  if (Array.isArray(product.category)) return product.category;
  if (product.category) return [String(product.category)];
  return [];
}

export default function HomeCategoryPromoBanners({ products, country }: Props) {
  const countryName = countryNames[country] || "دولتك";
  const currency = currencyLabel[country] || "";

  const countryProducts = (products || []).filter(
    (item) => (item.country || "sa") === country
  );

  const blocks = promoCategories
    .map((cat) => {
      const matchedItems = countryProducts.filter((item) =>
        productCategories(item).includes(cat.key)
      );

      if (!matchedItems.length) {
        return null;
      }

      return {
        ...cat,
        items: matchedItems.slice(0, 5),
      };
    })
    .filter(
      (
        block
      ): block is {
        key: string;
        title: string;
        subtitle: string;
        icon: string;
        items: any[];
      } => block !== null
    );

  if (!blocks.length) return null;

  return (
    <section className="homeCategoryPromoBanners" dir="rtl">
      <div className="homeCategoryPromoHeader">
        <div>
          <span>✨ مختار لك حسب دولتك</span>
          <h2>تسوق من أقسام عالم المنتجات في {countryName}</h2>
          <p>
            بانرات أقسام تعرض منتجات حقيقية من المتجر، وكل قسم يفتح منتجاته في دولتك مباشرة.
          </p>
        </div>

        <a href={`/customer-offers?country=${country}`} className="openAllMarket">
          تصفح كل المنتجات
        </a>
      </div>

      <div className="homeCategoryPromoGrid">
        {blocks.map((block) => {
          const hero = block.items[0];
          const circles = block.items.slice(0, 4);

          return (
            <a
              href={`/customer-offers?category=${block.key}&country=${country}`}
              className="homeCategoryPromoCard"
              key={block.key}
            >
              <div className="promoCardText">
                <span>{block.icon}</span>
                <h3>{block.title}</h3>
                <p>{block.subtitle}</p>
                <b>تصفح القسم ←</b>
              </div>

              <div className="promoHeroImage">
                <img src={hero.image_url} alt={hero.product_name} />
              </div>

              <div className="promoCircleRow">
                {circles.map((item) => (
                  <div className="promoCircleItem" key={item.id}>
                    <div className="promoCircleImage">
                      <img src={item.image_url} alt={item.product_name} />
                    </div>

                    <strong>
                      {item.price} {currency}
                    </strong>
                  </div>
                ))}
              </div>
            </a>
          );
        })}
      </div>

      <style jsx>{`
        .homeCategoryPromoBanners {
          max-width: 1320px;
          margin: 26px auto;
          padding: 0 12px;
        }

        .homeCategoryPromoHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 16px;
          padding: 22px 24px;
          border-radius: 30px;
          background: linear-gradient(135deg, #ffffff, #fffaf0);
          border: 1px solid rgba(245, 158, 11, 0.26);
          box-shadow:
            0 18px 45px rgba(15, 23, 42, 0.08),
            0 0 0 5px rgba(245, 158, 11, 0.05);
        }

        .homeCategoryPromoHeader span {
          color: #b45309;
          font-weight: 950;
          font-size: 13px;
        }

        .homeCategoryPromoHeader h2 {
          margin: 6px 0;
          color: #111827;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 950;
        }

        .homeCategoryPromoHeader p {
          margin: 0;
          color: #6b7280;
          line-height: 1.8;
          font-size: 14px;
          font-weight: 800;
        }

        .openAllMarket {
          text-decoration: none;
          white-space: nowrap;
          padding: 14px 22px;
          border-radius: 18px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #ffffff;
          font-weight: 950;
          box-shadow: 0 12px 28px rgba(245, 158, 11, 0.25);
          transition: .25s;
        }

        .openAllMarket:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #fbbf24, #b45309);
        }

        .homeCategoryPromoGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .homeCategoryPromoCard {
          position: relative;
          min-height: 285px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 16px;
          text-decoration: none;
          color: #111827;
          padding: 22px;
          border-radius: 32px;
          background:
            radial-gradient(circle at 80% 15%, rgba(245, 158, 11, 0.18), transparent 34%),
            linear-gradient(135deg, #ffffff, #fffaf0);
          border: 1px solid rgba(245, 158, 11, 0.26);
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
          transition: .28s;
        }

        .homeCategoryPromoCard:hover {
          transform: translateY(-6px);
          border-color: #f59e0b;
          box-shadow:
            0 24px 55px rgba(15, 23, 42, 0.12),
            0 0 0 5px rgba(245, 158, 11, 0.08);
        }

        .promoCardText {
          position: relative;
          z-index: 2;
        }

        .promoCardText span {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: #fff7ed;
          border: 1px solid rgba(245, 158, 11, 0.28);
          font-size: 28px;
          margin-bottom: 12px;
        }

        .promoCardText h3 {
          margin: 0;
          font-size: 25px;
          font-weight: 950;
          color: #111827;
        }

        .promoCardText p {
          margin: 8px 0 16px;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.7;
          font-weight: 800;
        }

        .promoCardText b {
          display: inline-flex;
          color: #b45309;
          font-weight: 950;
        }

        .promoHeroImage {
          position: relative;
          z-index: 2;
          width: 210px;
          height: 210px;
          border-radius: 999px;
          background: #ffffff;
          border: 6px solid #fff7ed;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 18px 35px rgba(15, 23, 42, 0.10);
        }

        .promoHeroImage img {
          max-width: 88%;
          max-height: 88%;
          object-fit: contain;
        }

        .promoCircleRow {
          position: absolute;
          right: 20px;
          left: 20px;
          bottom: 18px;
          display: flex;
          gap: 12px;
          z-index: 3;
        }

        .promoCircleItem {
          text-align: center;
          min-width: 78px;
        }

        .promoCircleImage {
          width: 64px;
          height: 64px;
          margin: 0 auto 6px;
          border-radius: 999px;
          background: #ffffff;
          border: 3px solid rgba(245, 158, 11, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
          transition: .25s;
        }

        .homeCategoryPromoCard:hover .promoCircleImage {
          border-color: #f59e0b;
          transform: translateY(-3px);
        }

        .promoCircleImage img {
          width: 90%;
          height: 90%;
          object-fit: contain;
        }

        .promoCircleItem strong {
          display: block;
          color: #b45309;
          font-size: 11px;
          font-weight: 950;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .homeCategoryPromoGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .homeCategoryPromoHeader {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            padding: 18px 14px;
          }

          .openAllMarket {
            text-align: center;
          }

          .homeCategoryPromoCard {
            display: block;
            min-height: 360px;
            padding: 18px;
          }

          .promoHeroImage {
            width: 150px;
            height: 150px;
            margin: 12px auto 82px;
          }

          .promoCircleRow {
            overflow-x: auto;
            padding-bottom: 4px;
          }

          .promoCircleItem {
            min-width: 72px;
          }

          .promoCircleImage {
            width: 58px;
            height: 58px;
          }
        }
      `}</style>
    </section>
  );
}