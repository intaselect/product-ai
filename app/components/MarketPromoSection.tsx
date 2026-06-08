import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

type MarketPromoSectionProps = {
  countryCode?: string;
  title?: string;
  query?: string;
};

type MarketOffer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  product_url: string;
  store_name: string | null;
  country: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const countryCurrencies: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};
const vercelCountryToCode: Record<string, string> = {
  SA: "sa",
  AE: "ae",
  KW: "kw",
  QA: "qa",
  BH: "bh",
  EG: "eg",
};

async function detectVisitorCountry() {
  const h = await headers();

  const vercelCountry =
    h.get("x-vercel-ip-country")?.toUpperCase() || "";

  return vercelCountryToCode[vercelCountry] || "sa";
}

export default async function MarketPromoSection({
  countryCode,
  title,
  query,
}: MarketPromoSectionProps) {

  const autoCountry = await detectVisitorCountry();

  const finalCountry = countryCode || autoCountry;

  const safeCountry = countryNames[finalCountry]
    ? finalCountry
    : "sa";
  const countryName = countryNames[safeCountry];

  const { data } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, product_url, store_name, country")
    .eq("status", "approved")
    .eq("country", safeCountry)
    .order("created_at", { ascending: false })
    .limit(4);

  const offers = (data || []) as MarketOffer[];

  return (
    <section className="marketPromoSection" dir="rtl">
      <div className="marketPromoHero">
        <div>
          <div className="marketPromoBadge">🛒 BPS Market | بي بي اس ماركت</div>

          <h2>
            {title || `عروض ومنتجات مختارة في ${countryName}`}
          </h2>

          <p>
            {query
              ? `أثناء بحثك عن ${query}، شاهد عروض حقيقية من العملاء والمتاجر داخل ${countryName}.`
              : `اكتشف عروض العملاء والمتاجر في ${countryName} وانتقل لأفضل المنتجات داخل BPS Market.`}
          </p>

          <div className="marketPromoActions">
            <a href={`/customer-offers?country=${safeCountry}`} className="marketPromoPrimary">
              🔥 تصفح عروض {countryName}
            </a>

            <a href="/customer-offers/add" className="marketPromoSecondary">
              + أضف عرضك
            </a>
          </div>
        </div>

        <div className="marketPromoVisual">
          <div className="marketPromoDeal big">
            <span>Today Deals 🔥</span>
            <strong>{offers.length}</strong>
            <small>عروض مناسبة لدولتك</small>
          </div>

          <div className="marketPromoDeal small one">
            <span>Best Prices</span>
            <strong>{countryName}</strong>
          </div>

          <div className="marketPromoDeal small two">
            <span>BPS Market</span>
            <strong>Local Deals</strong>
          </div>
        </div>
      </div>

      {offers.length > 0 && (
        <>
          <div className="marketPromoHeader">
            <div>
              <h2>🔥 عروض من المتجر في {countryName}</h2>
              <p>منتجات مختارة حسب الدولة</p>
            </div>

            <a href={`/customer-offers?country=${safeCountry}`}>عرض كل العروض</a>
          </div>
          <div className="marketStoreMiniCTA">
  <div>
    <h3>🚀 أضف منتجك مجاناً</h3>
    <p>
      أرسل رابط منتج واحد فقط وسنضيفه داخل BPS Chat.
    </p>
  </div>

  <a href="/customer-offers/add">
    أضف منتجك الآن
  </a>
</div>

          <div className="marketPromoGrid">
            {offers.map((offer) => (
              <article className="marketPromoCard" key={offer.id}>
                <div className="marketPromoImage">
                  <img src={offer.image_url} alt={offer.product_name} loading="lazy" />
                  <span>{countryNames[offer.country || ""] || countryName}</span>
                </div>

                <div className="marketPromoContent">
                  <p>{offer.store_name || "عرض عميل BPS Chat"}</p>
                  <h3>{offer.product_name}</h3>

                  <div className="marketPromoPrice">
                    <strong>{offer.price}</strong>
                    <small>{countryCurrencies[offer.country || ""]}</small>
                  </div>

                  <a
                    href={`/api/customer-offers/click/${offer.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    عرض المنتج
                  </a>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <style>{`
        .marketPromoSection {
          max-width: 1320px;
          margin: 28px auto;
          padding: 0 20px;
        }
.marketStoreMiniCTA{
  margin: 20px 0 24px;
  padding: 18px 22px;

  border-radius: 20px;

  background: linear-gradient(
    135deg,
    rgba(34,197,94,.12),
    rgba(37,99,235,.12)
  );

  border: 1px solid rgba(34,197,94,.25);

  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
}

.marketStoreMiniCTA h3{
  margin:0 0 6px;
  color:#fff;
  font-size:22px;
  font-weight:950;
}

.marketStoreMiniCTA p{
  margin:0;
  color:#cbd5e1;
}

.marketStoreMiniCTA a{
  white-space:nowrap;
  text-decoration:none;

  padding:12px 22px;
  border-radius:999px;

  background:linear-gradient(
    135deg,
    #22c55e,
    #2563eb
  );

  color:#fff;
  font-weight:950;

  box-shadow:0 0 20px rgba(34,197,94,.3);
}

.marketStoreMiniCTA a:hover{
  transform:translateY(-2px);
}

@media(max-width:700px){
  .marketStoreMiniCTA{
    flex-direction:column;
    text-align:center;
  }
}
        .marketPromoHero {
          padding: 42px 32px;
          border-radius: 34px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #2563eb 100%);
          box-shadow: 0 18px 50px rgba(0,0,0,0.22);
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 28px;
          align-items: center;
          overflow: hidden;
        }

        .marketPromoBadge {
          display: inline-flex;
          padding: 8px 15px;
          border-radius: 999px;
          background: rgba(34,197,94,0.14);
          border: 1px solid rgba(34,197,94,0.35);
          color: #bbf7d0;
          font-size: 12px;
          font-weight: 950;
          margin-bottom: 10px;
        }

        .marketPromoHero h2 {
          margin: 0;
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 950;
          color: #fff;
        }

        .marketPromoHero p {
          color: #dbeafe;
          line-height: 1.9;
          font-size: 15px;
          max-width: 760px;
        }

        .marketPromoActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .marketPromoPrimary,
        .marketPromoSecondary {
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 15px;
          font-weight: 950;
          transition: all .25s ease;
        }

        .marketPromoPrimary {
          background: #22c55e;
          color: #fff;
          box-shadow: 0 10px 28px rgba(34,197,94,0.3);
        }

        .marketPromoSecondary {
          background: rgba(255,255,255,0.13);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.16);
        }

        .marketPromoPrimary:hover,
        .marketPromoSecondary:hover {
          transform: translateY(-3px) scale(1.03);
        }

        .marketPromoVisual {
          position: relative;
          min-height: 230px;
        }

        .marketPromoDeal {
          position: absolute;
          background: rgba(255,255,255,0.96);
          color: #111827;
          border-radius: 26px;
          padding: 20px;
          box-shadow: 0 22px 55px rgba(0,0,0,0.22);
        }

        .marketPromoDeal span {
          color: #2563eb;
          font-weight: 950;
          display: block;
          margin-bottom: 10px;
        }

        .marketPromoDeal strong {
          color: #16a34a;
          font-size: 28px;
          font-weight: 950;
          display: block;
        }

        .marketPromoDeal.big {
          width: 240px;
          min-height: 145px;
          left: 35px;
          top: 30px;
        }

        .marketPromoDeal.small {
          width: 175px;
        }

        .marketPromoDeal.one {
          right: 0;
          top: 0;
        }

        .marketPromoDeal.two {
          right: 55px;
          bottom: 5px;
        }

        .marketPromoHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin: 26px 0 18px;
        }

        .marketPromoHeader h2 {
          color: #fff;
          margin: 0;
          font-size: 26px;
          font-weight: 950;
        }

        .marketPromoHeader p {
          color: #cbd5e1;
          margin: 5px 0 0;
        }

        .marketPromoHeader a {
          color: #22c55e;
          font-weight: 950;
          text-decoration: none;
        }

        .marketPromoGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .marketPromoCard {
          background: #fff;
          color: #111827;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(0,0,0,0.16);
          transition: all .25s ease;
        }

        .marketPromoCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.22);
        }

        .marketPromoImage {
          position: relative;
          height: 220px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .marketPromoImage img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .marketPromoImage span {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 7px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);
          color: #fff;
          font-size: 11px;
          font-weight: 950;
        }

        .marketPromoContent {
          padding: 14px;
        }

        .marketPromoContent p {
          margin: 0 0 8px;
          color: #6b7280;
          font-size: 12px;
          font-weight: 800;
        }

        .marketPromoContent h3 {
          margin: 0 0 12px;
          font-size: 14px;
          line-height: 1.7;
          min-height: 48px;
        }

        .marketPromoPrice {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .marketPromoPrice strong {
          color: #16a34a;
          font-size: 24px;
          font-weight: 950;
        }

        .marketPromoPrice small {
          background: #dcfce7;
          color: #166534;
          border-radius: 999px;
          padding: 6px 10px;
          font-weight: 900;
        }

        .marketPromoContent a {
          display: block;
          text-align: center;
          text-decoration: none;
          padding: 13px;
          border-radius: 14px;
          background: #111827;
          color: #fff;
          font-weight: 950;
        }

        .marketPromoContent a:hover {
          background: #2563eb;
        }

        @media (max-width: 900px) {
          .marketPromoHero {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .marketPromoVisual {
            display: none;
          }

          .marketPromoActions {
            justify-content: center;
          }

          .marketPromoGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .marketPromoSection {
            padding: 0 12px;
          }

          .marketPromoHero {
            padding: 24px 16px;
            border-radius: 24px;
          }

          .marketPromoGrid {
            grid-template-columns: 1fr;
          }

          .marketPromoHeader {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}