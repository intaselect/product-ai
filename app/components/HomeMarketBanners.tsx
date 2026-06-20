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
  category: string[] | null;
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

const categories = [
  { key: "mobiles", title: "جوالات وتابلت", icon: "📱" },
  { key: "electronics", title: "إلكترونيات", icon: "🎧" },
  { key: "computers", title: "لابتوبات وكمبيوتر", icon: "💻" },
  { key: "mobile_accessories", title: "إكسسوارات جوالات", icon: "📲" },
  { key: "smart_watch", title: "ساعات ذكية", icon: "⌚" },
  { key: "power_bank", title: "باور بانك", icon: "🔋" },
  { key: "chargers", title: "شواحن وكابلات", icon: "🔌" },
  { key: "headphones", title: "سماعات", icon: "🎧" },
  { key: "computer_accessories", title: "إكسسوارات كمبيوتر", icon: "🖱️" },
  { key: "gaming", title: "ألعاب وجيمينج", icon: "🎮" },
  { key: "home", title: "المنزل والمطبخ", icon: "🏠" },
  { key: "fashion", title: "ملابس", icon: "👕" },
  { key: "shoes", title: "أحذية", icon: "👟" },
  { key: "bags", title: "شنط", icon: "👜" },
  { key: "beauty", title: "جمال وعناية", icon: "💄" },
  { key: "cars", title: "سيارات وإكسسوارات", icon: "🚗" },
  { key: "kids", title: "أطفال", icon: "🧸" },
  { key: "sports", title: "رياضة", icon: "🏋️" },
  { key: "cameras", title: "كاميرات", icon: "📷" },
  { key: "camera_accessories", title: "ملحقات كاميرات", icon: "🎥" },
  { key: "perfumes", title: "عطور", icon: "🌸" },
  { key: "incense", title: "بخور", icon: "🪔" },
];

function productSeoUrl(offer: Offer) {
  const slug = String(offer.product_name || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");

  return `/customer-offers/product/bps-chat-${slug}-${offer.country || "sa"}-${offer.id}`;
}
function detectCategory(offer: Offer) {
  const text = `${offer.product_name || ""} ${offer.store_name || ""}`.toLowerCase();

  const rules: Record<string, string[]> = {
    mobiles: ["iphone", "galaxy", "samsung", "huawei", "oppo", "realme", "xiaomi", "redmi", "poco", "ipad", "جوال", "هاتف", "ايفون", "موبايل"],
    electronics: ["سماعة", "headset", "earbuds", "airpods", "كاميرا", "camera", "ring", "speaker"],
    computers: ["laptop", "keyboard", "mouse", "monitor", "كمبيوتر", "لابتوب", "كيبورد", "ماوس", "شاشة"],
    home: ["مكنسة", "مطبخ", "قلاية", "خلاط", "كرسي", "طاولة", "منزل", "kitchen", "chair", "vacuum"],
    beauty: ["عطر", "perfume", "كريم", "شامبو", "فرشاة", "beauty", "skin", "makeup"],
    fashion: ["هودي", "تيشيرت", "حذاء", "شنطة", "ملابس", "shirt", "shoes", "bag"],
    gaming: ["playstation", "ps5", "xbox", "nintendo", "gaming", "بلايستيشن", "جيمينج"],
    kids: ["kids", "baby", "طفل", "أطفال", "لعبة", "toy"],
    cars: ["car", "سيارة", "سيارات", "carlinkit", "jump starter"],
    sports: ["sport", "رياض", "fitness", "جيم", "دراجة"],
    cameras: ["camera", "كاميرا"],
  };

  for (const [key, words] of Object.entries(rules)) {
    if (words.some((word) => text.includes(word))) {
      return key;
    }
  }

  return "electronics";
}
export default function HomeMarketBanners({
  products = [],
  country = "sa",
}: Props) {
  const safeCountry = countryNames[country] ? country : "sa";
  const countryName = countryNames[safeCountry] || "دولتك";

  const offers = (products || []).filter((offer) => {
    const offerCountry = offer?.country || safeCountry;
    return offerCountry === safeCountry;
  }) as Offer[];

  if (!offers.length) return null;

const sections = categories
  .map((cat) => {
    const items = offers
      .filter((offer) => detectCategory(offer) === cat.key)
      .slice(0, 4);

    return { ...cat, items };
  })
  .filter((section) => section.items.length > 0)
  .slice(0, 8);

if (!sections.length) return null;
const heroProducts = offers.slice(0, 5);

  return (
    <section className="homeMarketBanners" dir="rtl">
      <div className="homeMegaBanner">
        <div className="megaText">
          <span className="megaBadge">🔥 عروض مناسبة لسوق {countryName}</span>

          <h2>
            منتجات مختارة حسب دولتك
            <small>صور وأسعار وروابط مباشرة للشراء</small>
          </h2>

          <p>
            اكتشف عروض من المتاجر والعملاء داخل BPS Chat، وشاهد منتجات من أقسام مختلفة
            بنفس تجربة المواقع الكبيرة.
          </p>

          <div className="megaActions">
            <a href={`/customer-offers?country=${safeCountry}`}>
              🛒 تصفح عروض {countryName}
            </a>
            <a href="/customer-offers/add">+ أضف منتجك</a>
          </div>
        </div>

        <div className="megaHuman">
          <div className="personBubble">🛍️</div>
          <strong>تسوق أذكى</strong>
          <span>Compare • Choose • Buy</span>
        </div>

        <div className="megaProducts">
          {heroProducts.map((offer) => (
            <a
              key={offer.id}
              href={productSeoUrl(offer)}
              className="megaProductCard"
            >
              <img src={offer.image_url} alt={offer.product_name} />
              <strong>{offer.price}</strong>
              <small>{currencies[offer.country || safeCountry]}</small>
            </a>
          ))}
        </div>
      </div>

      <div className="categoryBannerGrid">
        {sections.map((section) => (
          <div className="categoryBanner" key={section.key}>
            <div className="categoryBannerHead">
              <div>
                <span>{section.icon}</span>
                <h3>{section.title}</h3>
              </div>

              <a href={`/customer-offers?category=${section.key}&country=${safeCountry}`}>
                عرض الكل
              </a>
            </div>

            <div className="categoryProducts">
              {section.items.map((offer) => (
                <a
                  key={offer.id}
                  href={productSeoUrl(offer)}
                  className="categoryProductCard"
                >
                  <div className="catImage">
                    <img src={offer.image_url} alt={offer.product_name} />
                  </div>

                  <h4>{offer.product_name}</h4>

                  <div className="catPrice">
                    <strong>{offer.price}</strong>
                    <small>{currencies[offer.country || safeCountry]}</small>
                  </div>

                  <span>{offer.store_name || "BPS Market"}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .homeMarketBanners {
          max-width: 1320px;
          margin: 28px auto;
          padding: 0 18px;
        }

        .homeMegaBanner {
          position: relative;
          overflow: hidden;
          min-height: 360px;
          border-radius: 36px;
          padding: 34px;
          display: grid;
          grid-template-columns: 1fr 230px 1fr;
          gap: 24px;
          align-items: center;
          background:
            radial-gradient(circle at 15% 20%, rgba(34,197,94,.22), transparent 28%),
            radial-gradient(circle at 90% 15%, rgba(14,165,233,.28), transparent 30%),
            linear-gradient(135deg, #020617, #0f172a 48%, #2563eb);
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 24px 70px rgba(15,23,42,.22);
        }

        .megaText {
          position: relative;
          z-index: 2;
        }

        .megaBadge {
          display: inline-flex;
          padding: 9px 16px;
          border-radius: 999px;
          background: rgba(34,197,94,.15);
          border: 1px solid rgba(34,197,94,.35);
          color: #bbf7d0;
          font-weight: 950;
          font-size: 13px;
          margin-bottom: 14px;
        }

        .megaText h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(30px, 5vw, 54px);
          line-height: 1.2;
          font-weight: 950;
        }

        .megaText h2 small {
          display: block;
          margin-top: 8px;
          color: #67e8f9;
          font-size: .48em;
          font-weight: 900;
        }

        .megaText p {
          max-width: 560px;
          color: #dbeafe;
          line-height: 2;
          font-size: 15px;
        }

        .megaActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .megaActions a {
          text-decoration: none;
          padding: 14px 22px;
          border-radius: 16px;
          font-weight: 950;
          color: #fff;
          transition: .25s ease;
        }

        .megaActions a:first-child {
          background: linear-gradient(135deg, #22c55e, #0ea5e9, #f97316);
          box-shadow: 0 16px 32px rgba(14,165,233,.24);
        }

        .megaActions a:last-child {
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.16);
        }

        .megaActions a:hover {
          transform: translateY(-4px);
        }

        .megaHuman {
          z-index: 2;
          min-height: 250px;
          border-radius: 32px;
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(239,246,255,.96));
          box-shadow: 0 24px 55px rgba(0,0,0,.22);
        }

        .personBubble {
          width: 118px;
          height: 118px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 56px;
          background:
            radial-gradient(circle at 35% 25%, #fff7ed, #fb923c 45%, #2563eb);
          margin-bottom: 14px;
          box-shadow: 0 18px 35px rgba(249,115,22,.24);
        }

        .megaHuman strong {
          color: #0f172a;
          font-size: 22px;
          font-weight: 950;
        }

        .megaHuman span {
          color: #2563eb;
          font-size: 12px;
          font-weight: 900;
          margin-top: 6px;
        }

        .megaProducts {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .megaProductCard {
          min-height: 132px;
          text-decoration: none;
          background: rgba(255,255,255,.96);
          border-radius: 22px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #111827;
          box-shadow: 0 14px 32px rgba(0,0,0,.18);
          transition: .25s ease;
        }

        .megaProductCard:first-child {
          grid-row: span 2;
          min-height: 276px;
        }

        .megaProductCard:hover {
          transform: translateY(-6px) scale(1.03);
        }

        .megaProductCard img {
          width: 100%;
          height: 92px;
          object-fit: contain;
          margin-bottom: 8px;
        }

        .megaProductCard:first-child img {
          height: 185px;
        }

        .megaProductCard strong {
          color: #16a34a;
          font-size: 20px;
          font-weight: 950;
        }

        .megaProductCard small {
          color: #64748b;
          font-weight: 900;
        }

        .categoryBannerGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-top: 22px;
        }

        .categoryBanner {
          overflow: hidden;
          border-radius: 28px;
          padding: 20px;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow: 0 18px 45px rgba(15,23,42,.08);
        }

        .categoryBannerHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
        }

        .categoryBannerHead div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .categoryBannerHead span {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ecfdf5;
          font-size: 25px;
        }

        .categoryBannerHead h3 {
          margin: 0;
          color: #0f172a;
          font-size: 22px;
          font-weight: 950;
        }

        .categoryBannerHead a {
          color: #16a34a;
          text-decoration: none;
          font-weight: 950;
          white-space: nowrap;
        }

        .categoryProducts {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .categoryProductCard {
          text-decoration: none;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 10px;
          color: #111827;
          transition: .25s ease;
        }

        .categoryProductCard:hover {
          transform: translateY(-5px);
          border-color: #22c55e;
          box-shadow: 0 14px 28px rgba(15,23,42,.12);
        }

        .catImage {
          height: 105px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 14px;
          margin-bottom: 9px;
        }

        .catImage img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .categoryProductCard h4 {
          height: 38px;
          overflow: hidden;
          margin: 0 0 8px;
          color: #111827;
          font-size: 12px;
          line-height: 1.55;
          font-weight: 900;
        }

        .catPrice {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .catPrice strong {
          color: #16a34a;
          font-size: 17px;
          font-weight: 950;
        }

        .catPrice small {
          color: #64748b;
          font-size: 10px;
          font-weight: 900;
        }

        .categoryProductCard > span {
          display: block;
          margin-top: 5px;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 980px) {
          .homeMegaBanner {
            grid-template-columns: 1fr;
          }

          .megaHuman {
            display: none;
          }

          .categoryBannerGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .homeMarketBanners {
            padding: 0 10px;
          }

          .homeMegaBanner {
            padding: 24px 16px;
            border-radius: 26px;
          }

          .megaProducts {
            display: flex;
            overflow-x: auto;
            padding-bottom: 8px;
          }

          .megaProductCard,
          .megaProductCard:first-child {
            min-width: 145px;
            min-height: 155px;
          }

          .megaProductCard img,
          .megaProductCard:first-child img {
            height: 92px;
          }

          .categoryProducts {
            display: flex;
            overflow-x: auto;
            padding-bottom: 8px;
          }

          .categoryProductCard {
            min-width: 145px;
          }
        }
      `}</style>
    </section>
  );
}