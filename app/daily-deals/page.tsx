import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "عروض عالم المنتجات اليومية | أقوى الخصومات | BPS Chat",
  description:
    "تابع أقوى عروض اليوم والخصومات من نون وأمازون والمتاجر الكبيرة في السعودية ومصر والخليج على BPS Chat.",
};

type Deal = {
  id: number;
  title: string;
  image_url: string | null;
  product_url: string;
  store_name: string | null;
  country: string | null;
  category: string[] | null;
  old_price: number | null;
  new_price: number | null;
  discount_percent: number | null;
  created_at: string;
};
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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
  sa: "ريال",
  ae: "درهم",
  kw: "دينار",
  qa: "ريال",
  bh: "دينار",
  eg: "جنيه",
};

const categoryNames: Record<string, string> = {
  all: "كل الأقسام",

  mobiles: "جوالات وتابلت",
  electronics: "إلكترونيات",
  computers: "كمبيوتر ولابتوب",

  home: "المنزل والمطبخ",

  beauty: "جمال وعناية",
  makeup: "مكياج",
  skincare: "العناية بالبشرة",
  perfumes: "عطور",

  fashion: "ملابس",
  shoes: "أحذية",

  sports: "رياضة",

  kids: "أطفال وألعاب",

  gaming: "جيمينج",

  watches: "ساعات",
  smartwatches: "ساعات ذكية",

  earphones: "سماعات",
  phone_accessories: "إكسسوارات الجوال",
  power_bank: "باور بانك",

  cars: "سيارات وإكسسوارات",

  tools: "أدوات ومعدات",

  office: "مستلزمات مكتبية",

  pets: "مستلزمات الحيوانات",

  books: "كتب",

  food: "أغذية ومشروبات",

  other: "أخرى",
};
function money(value?: number | null, country?: string | null) {
  if (!value) return "-";
  return `${Number(value).toLocaleString("en-US")} ${
    countryCurrencies[country || ""] || ""
  }`;
}

export default async function DailyDealsPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const params = await searchParams;

 const selectedCountry = String(params?.country || "sa");
  const selectedCategory = String(params?.category || "all");
  const selectedStore = String(params?.store || "all");

  let query = supabase
  .from("daily_deals")
  .select("*")
  .eq("status", "approved")
  .order("created_at", { ascending: false });

  if (selectedCountry !== "all") {
    query = query.eq("country", selectedCountry);
  }

  if (selectedCategory !== "all") {
    query = query.contains("category", [selectedCategory]);
  }

  if (selectedStore !== "all") {
    query = query.ilike("store_name", `%${selectedStore}%`);
  }

  const { data, error } = await query.limit(300);
  const deals = (data || []) as Deal[];

  const stores = Array.from(
    new Set(
      deals
        .map((deal) => deal.store_name)
        .filter(Boolean)
        .map((store) => String(store))
    )
  );

  function buildUrl(values: {
    country?: string;
    category?: string;
    store?: string;
  }) {
    const url = new URLSearchParams();

    const country = values.country ?? selectedCountry;
    const category = values.category ?? selectedCategory;
    const store = values.store ?? selectedStore;

    if (country !== "all") url.set("country", country);
    if (category !== "all") url.set("category", category);
    if (store !== "all") url.set("store", store);

    const qs = url.toString();
    return qs ? `/daily-deals?${qs}` : "/daily-deals";
  }

  return (
    <main className="dailyDealsPage" dir="rtl">
      <section className="dealsHero">
        <div className="heroBadge">🔥 عروض عالم المنتجات اليومية</div>

        <h1>أقوى عروض عالم المنتجات اليومية</h1>

        <p>
          تابع أفضل الخصومات اليومية من نون، أمازون، جرير، إكسترا والمتاجر
          المختلفة في السعودية ومصر والخليج.
        </p>

        <div className="heroStats">
          <div>
            <strong>{deals.length}</strong>
            <span>عرض متاح الآن</span>
          </div>

          <div>
            <strong>
              {deals[0]?.discount_percent
                ? `${Math.round(Number(deals[0].discount_percent))}%`
                : "0%"}
            </strong>
            <span>أعلى خصم</span>
          </div>
        </div>
      </section>

      <section className="filtersBox">
        <div className="filterGroup">
          <span>الدولة</span>
          <div className="chips">
            <a className={selectedCountry === "all" ? "active" : ""} href={buildUrl({ country: "all" })}>
              كل الدول
            </a>

            {Object.entries(countryNames).map(([key, label]) => (
              <a
                key={key}
                className={selectedCountry === key ? "active" : ""}
                href={buildUrl({ country: key })}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="filterGroup">
          <span>القسم</span>
          <div className="chips">
            {Object.entries(categoryNames).map(([key, label]) => (
              <a
                key={key}
                className={selectedCategory === key ? "active" : ""}
                href={buildUrl({ category: key })}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {stores.length > 0 && (
          <div className="filterGroup">
            <span>المتجر</span>
            <div className="chips">
              <a className={selectedStore === "all" ? "active" : ""} href={buildUrl({ store: "all" })}>
                كل المتاجر
              </a>

              {stores.map((store) => (
                <a
                  key={store}
                  className={selectedStore === store ? "active" : ""}
                  href={buildUrl({ store })}
                >
                  {store}
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      {error && (
        <div className="message error">حدث خطأ أثناء تحميل عروض اليوم.</div>
      )}

      {!error && deals.length === 0 && (
        <section className="emptyBox">
          <div>🛒</div>
          <h2>لا توجد عروض اليوم حاليًا</h2>
          <p>سيتم إضافة عروض قوية قريبًا.</p>
        </section>
      )}

      {!error && deals.length > 0 && (
        <section className="dealsGrid">
          {deals.map((deal) => {
            const discount = Math.round(Number(deal.discount_percent || 0));

            return (
              <article className="dealCard" key={deal.id}>
                <div className="imageWrap">
                  {discount > 0 && (
                    <div className="discountBadge">🔥 خصم {discount}%</div>
                  )}

                  {deal.image_url ? (
                    <img src={deal.image_url} alt={deal.title} />
                  ) : (
                    <div className="noImage">BPS Chat</div>
                  )}
                </div>

                <div className="cardContent">
                  <p className="storeName">
                    {deal.store_name || "متجر"} ·{" "}
                    {countryNames[deal.country || ""] || "كل الدول"}
                  </p>

                  <h2>{deal.title}</h2>

                  <div className="pricesBox">
                    {deal.old_price ? (
                      <span className="oldPrice">
                        قبل: {money(deal.old_price, deal.country)}
                      </span>
                    ) : null}

                    <strong className="newPrice">
                      الآن: {money(deal.new_price, deal.country)}
                    </strong>

                    {deal.old_price && deal.new_price ? (
                      <small>
                        وفرت:{" "}
                        {money(
                          Number(deal.old_price) - Number(deal.new_price),
                          deal.country
                        )}
                      </small>
                    ) : null}
                  </div>

                 <div className="dealActions">
  <a href={`/daily-deals/${deal.id}`} className="detailsBtn">
    👀 تفاصيل العرض
  </a>

  <a
    href={`/api/daily-deals/click/${deal.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="buyBtn"
  >
    🛒 عرض المنتج
  </a>
</div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <style>{`
        .dailyDealsPage {
          min-height: 100vh;
          background: linear-gradient(180deg,#f8fafc,#eef2f7);
          color: #111827;
          padding: 36px 16px 80px;
        }

        .dealsHero {
          max-width: 1180px;
          margin: 0 auto 24px;
          padding: 42px 24px;
          border-radius: 34px;
          text-align: center;
          background:
            radial-gradient(circle at 15% 20%, rgba(249,115,22,.20), transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(34,197,94,.18), transparent 30%),
            #ffffff;
          border: 1px solid #fed7aa;
          box-shadow: 0 20px 55px rgba(15,23,42,.10);
        }

        .heroBadge {
          display: inline-flex;
          padding: 8px 14px;
          border-radius: 999px;
          background: #fff7ed;
          color: #f97316;
          font-weight: 950;
          margin-bottom: 14px;
        }

        .dealsHero h1 {
          margin: 0;
          font-size: clamp(32px,5vw,58px);
          font-weight: 950;
          color: #111827;
        }

        .dealsHero p {
          max-width: 760px;
          margin: 16px auto 0;
          color: #64748b;
          line-height: 1.9;
          font-weight: 800;
        }

        .heroStats {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .heroStats div {
          min-width: 170px;
          border-radius: 22px;
          background: #fff;
          border: 1px solid #e5e7eb;
          padding: 16px;
          box-shadow: 0 10px 30px rgba(15,23,42,.08);
        }

        .heroStats strong {
          display: block;
          font-size: 34px;
          color: #16a34a;
          font-weight: 950;
        }

        .heroStats span {
          color: #64748b;
          font-weight: 900;
        }

        .filtersBox {
          max-width: 1180px;
          margin: 0 auto 24px;
          padding: 20px;
          border-radius: 28px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 14px 40px rgba(15,23,42,.08);
        }

        .filterGroup {
          margin-bottom: 18px;
        }

        .filterGroup:last-child {
          margin-bottom: 0;
        }

        .filterGroup > span {
          display: block;
          margin-bottom: 10px;
          color: #111827;
          font-weight: 950;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chips a {
          text-decoration: none;
          color: #111827;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 900;
          font-size: 13px;
        }

        .chips a.active,
        .chips a:hover {
          background: linear-gradient(135deg,#f97316,#16a34a);
          color: white;
          border-color: transparent;
        }

        .message,
        .emptyBox {
          max-width: 800px;
          margin: 30px auto;
          text-align: center;
          padding: 28px;
          border-radius: 28px;
          background: white;
          border: 1px solid #e5e7eb;
        }

        .emptyBox div {
          font-size: 48px;
        }

        .dealsGrid {
          max-width: 1250px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(270px,1fr));
          gap: 22px;
        }

        .dealCard {
          overflow: hidden;
          border-radius: 26px;
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 16px 38px rgba(15,23,42,.08);
          transition: all .25s ease;
        }

        .dealCard:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 55px rgba(15,23,42,.14);
        }

        .imageWrap {
          position: relative;
          height: 230px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }

        .imageWrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .discountBadge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: linear-gradient(135deg,#ef4444,#f97316);
          color: white;
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 950;
          box-shadow: 0 10px 20px rgba(239,68,68,.25);
        }

        .noImage {
          font-weight: 950;
          color: #94a3b8;
        }

        .cardContent {
          padding: 16px;
        }

        .storeName {
          margin: 0 0 8px;
          color: #16a34a;
          font-size: 13px;
          font-weight: 950;
        }

        .cardContent h2 {
          height: 54px;
          overflow: hidden;
          margin: 0 0 12px;
          font-size: 16px;
          line-height: 1.7;
          color: #111827;
        }

        .pricesBox {
          display: grid;
          gap: 7px;
          margin-bottom: 14px;
        }

        .oldPrice {
          color: #ef4444;
          text-decoration: line-through;
          font-weight: 900;
          font-size: 13px;
        }

        .newPrice {
          color: #16a34a;
          font-size: 21px;
          font-weight: 950;
        }

        .pricesBox small {
          color: #64748b;
          font-weight: 900;
        }

        .buyBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          border-radius: 15px;
          background: linear-gradient(135deg,#16a34a,#2563eb);
          color: white;
          text-decoration: none;
          font-weight: 950;
          box-shadow: 0 12px 28px rgba(37,99,235,.20);
        }
          .dealActions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.detailsBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 15px;
  background: #fff7ed;
  color: #f97316;
  text-decoration: none;
  font-weight: 950;
  border: 1px solid #fed7aa;
}

        @media (max-width: 700px) {
          .dailyDealsPage {
            padding: 24px 12px 60px;
          }

          .dealsHero {
            padding: 30px 16px;
            border-radius: 26px;
          }

          .dealsGrid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.imageWrap {
  height: 140px;
}

.cardContent {
  padding: 10px;
}

.cardContent h2 {
  height: 44px;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 6px;
}

.storeName {
  font-size: 10px;
}

.newPrice {
  font-size: 15px;
}

.oldPrice {
  font-size: 10px;
}

.pricesBox small {
  font-size: 10px;
}

.dealActions {
  grid-template-columns: 1fr;
  gap: 6px;
}

.buyBtn,
.detailsBtn {
  height: 36px;
  font-size: 11px;
}

          .imageWrap {
            height: 210px;
          }
        }
      `}</style>
    </main>
  );
}