import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "أفضل عروض العملاء | BPS Chat - بي بي اس شات",
  description:
    "اكتشف أفضل عروض العملاء والمتاجر على BPS Chat. منتجات بأسعار مميزة من السعودية، الإمارات، الكويت، قطر، البحرين ومصر مع روابط مباشرة للشراء.",
  keywords: [
    "أفضل عروض العملاء",
    "عروض BPS Chat",
    "بي بي اس شات",
    "عروض منتجات",
    "خصومات",
    "أفضل سعر",
    "مقارنة أسعار",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض مصر",
  ],
};

type CustomerOffer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  image_url_2: string | null;
image_url_3: string | null;
  product_url: string;
  store_name: string | null;
  country: string | null;
  category: string[] | null;
  created_at: string;
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
const categoryNames: Record<string, string> = {
  all: "كل العروض",
  electronics: "إلكترونيات",
  mobiles: "موبايلات",
  computers: "كمبيوتر ولابتوب",
  home: "المنزل والمطبخ",
  fashion: "أزياء",
  beauty: "جمال وعناية",
  cars: "سيارات",
  other: "أخرى",
};
export default async function CustomerOffersPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const params = await searchParams;

  const selectedCategory = params?.category || "all";
  const selectedCountry = params?.country || "all";
  const { data: offers, error } = await supabase
    .from("customer_offers")
    .select(
  "id, product_name, price, image_url, image_url_2, image_url_3, product_url, store_name, country, category, created_at"
)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
const approvedOffers = (offers || []) as CustomerOffer[];

const filteredOffers = approvedOffers.filter((offer) => {
  const categoryOk =
    selectedCategory === "all" ||
    (offer.category || ["other"]).includes(selectedCategory);

  const countryOk =
    selectedCountry === "all" ||
    (offer.country || "sa") === selectedCountry;

  return categoryOk && countryOk;
});
  return (
    <main className="customerOffersPage" dir="rtl">
      <section className="hero">
        <div className="aiGlow aiGlowOne" />
        <div className="aiGlow aiGlowTwo" />

        <div className="badge">🚀 عروض مختارة من عملاء ومتاجر BPS Chat</div>

        <h1>
          أفضل عروض العملاء على{" "}
          <span>BPS Chat</span>
        </h1>

        <p>
          صفحة مخصصة لعرض منتجات مميزة بأسعار منافسة من المتاجر والعملاء.
          كل عرض يتم مراجعته قبل الظهور لضمان جودة أفضل وتجربة شراء أوضح.
        </p>

        <div className="heroActions">
          <a href="/customer-offers/add" className="primaryBtn">
            + أضف عرضك الآن
          </a>

          <a href="/" className="secondaryBtn">
            ابحث عن منتج في BPS Chat
          </a>
        </div>

        <div className="stats">
          <div>
            <strong>{filteredOffers.length}</strong>
            <span>عرض معتمد</span>
          </div>
          <div>
            <strong>6</strong>
            <span>دول مستهدفة</span>
          </div>
          <div>
            <strong>AI</strong>
            <span>تجربة بحث ذكية</span>
          </div>
        </div>
      </section>

      <section className="seoBox">
        <h2>عروض منتجات حقيقية من العملاء والمتاجر</h2>
        <p>
          في صفحة أفضل عروض عملاء بي بي اس شات يمكنك اكتشاف عروض منتجات،
          خصومات، أسعار مميزة، وروابط مباشرة للشراء من المتاجر. الصفحة تساعد
          المستخدمين في الوصول لعروض قوية داخل السعودية، الإمارات، الكويت،
          قطر، البحرين ومصر.
        </p>
      </section>
      <section className="categoryTabs">
  {Object.entries(categoryNames).map(([key, label]) => (
    <a
      key={key}
     href={
  key === "all"
    ? selectedCountry === "all"
      ? "/customer-offers"
      : `/customer-offers?country=${selectedCountry}`
    : selectedCountry === "all"
      ? `/customer-offers?category=${key}`
      : `/customer-offers?category=${key}&country=${selectedCountry}`
}
      className={selectedCategory === key ? "active" : ""}
    >
      {label}
    </a>
  ))}
</section>

<section className="countryTabs">
  <a
    href={
      selectedCategory === "all"
        ? "/customer-offers"
        : `/customer-offers?category=${selectedCategory}`
    }
    className={selectedCountry === "all" ? "active" : ""}
  >
    كل الدول
  </a>

  {Object.entries(countryNames).map(([key, label]) => (
    <a
      key={key}
      href={
        selectedCategory === "all"
          ? `/customer-offers?country=${key}`
          : `/customer-offers?category=${selectedCategory}&country=${key}`
      }
      className={selectedCountry === key ? "active" : ""}
    >
      {label}
    </a>
  ))}
</section>
      {error && (
        <div className="message error">
          حدث خطأ أثناء تحميل العروض. حاول مرة أخرى لاحقًا.
        </div>
      )}

      {!error && filteredOffers.length === 0 && (
        <div className="emptyBox">
          <div className="emptyIcon">🛒</div>
          <h2>لا توجد عروض معتمدة حاليًا</h2>
          <p>كن أول من يضيف عرضًا مميزًا يظهر بعد المراجعة.</p>
          <a href="/customer-offers/add">أضف أول عرض</a>
        </div>
      )}

      {!error && filteredOffers.length > 0 && (
        <section className="offersGrid">
          {filteredOffers.map((offer) => (
            <article className="offerCard" key={offer.id}>
              <div className="imageWrap">
               <div className="productSlider">
  {[offer.image_url, offer.image_url_2, offer.image_url_3]
    .filter(Boolean)
    .map((img, index) => (
      <img
        key={index}
        src={img as string}
        alt={offer.product_name}
        
      />
    ))}
</div>
                <div className="floatingLabel">
                  {countryNames[offer.country || ""] || "عرض مميز"}
                </div>
              </div>

              <div className="cardContent">
                <p className="storeName">
                  {offer.store_name || "عرض عميل BPS Chat"}
                </p>

                <h2>{offer.product_name}</h2>

                <div className="priceRow">
                  <strong>{offer.price}</strong>
                  <span>أفضل عرض</span>
                </div>

                <a
                  href={offer.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buyBtn"
                >
                  عرض المنتج
                </a>
              </div>
            </article>
          ))}
        </section>
      )}

     <style>{`
  .customerOffersPage {
    min-height: 100vh;
    background:
      radial-gradient(circle at 18% 8%, rgba(34,197,94,0.16), transparent 26%),
      radial-gradient(circle at 84% 10%, rgba(59,130,246,0.14), transparent 24%),
      linear-gradient(180deg, #171717 0%, #212121 45%, #101010 100%);
    color: #fff;
    padding: 16px 16px 70px;
    overflow-x: hidden;
  }
.countryTabs {
  max-width: 1080px;
  margin: -6px auto 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.productSlider {
  position: relative;
  width: 100%;
  height: 100%;
}

.productSlider img {
  position: absolute;
  inset: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0;
  animation: productSlide 10s infinite;
}

.productSlider img:only-child {
  opacity: 1;
  animation: none;
}

@keyframes productSlide {
  0% { opacity: 1; }
  30% { opacity: 1; }
  33% { opacity: 0; }
  100% { opacity: 0; }
}
.countryTabs a {
  text-decoration: none;
  padding: 9px 14px;
  border-radius: 999px;
  background: rgba(59,130,246,0.10);
  border: 1px solid rgba(96,165,250,0.22);
  color: #dbeafe;
  font-weight: 900;
  font-size: 13px;
  transition: all .25s ease;
}

.countryTabs a:hover,
.countryTabs a.active {
  background: linear-gradient(135deg, #2563eb, #22c55e);
  color: #fff;
  box-shadow: 0 0 24px rgba(59,130,246,0.35);
  transform: translateY(-2px);
}
  .hero {
    position: relative;
    max-width: 1080px;
    margin: 0 auto 16px;
    text-align: center;
    padding: 22px 16px 18px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 26px;
    background: rgba(255,255,255,0.035);
    box-shadow: 0 18px 55px rgba(0,0,0,0.32);
    backdrop-filter: blur(12px);
    overflow: hidden;
  }
    .categoryTabs {
  max-width: 1080px;
  margin: 0 auto 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.categoryTabs a {
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 999px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  transition: all .25s ease;
}

.categoryTabs a:hover,
.categoryTabs a.active {
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: #fff;
  box-shadow: 0 0 24px rgba(34,197,94,0.35);
  transform: translateY(-2px);
}

  .aiGlow {
    position: absolute;
    width: 210px;
    height: 210px;
    border-radius: 999px;
    filter: blur(52px);
    opacity: 0.32;
    animation: floatGlow 6s ease-in-out infinite alternate;
  }

  .aiGlowOne {
    background: #22c55e;
    top: -120px;
    right: -55px;
  }

  .aiGlowTwo {
    background: #3b82f6;
    bottom: -125px;
    left: -55px;
    animation-delay: 1.4s;
  }

  @keyframes floatGlow {
    from { transform: translateY(0) scale(1); }
    to { transform: translateY(18px) scale(1.1); }
  }

  .badge {
    position: relative;
    z-index: 2;
    display: inline-flex;
    padding: 7px 14px;
    border-radius: 999px;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.32);
    color: #bbf7d0;
    font-size: 12px;
    font-weight: 900;
    margin-bottom: 8px;
  }

  .hero h1 {
    position: relative;
    z-index: 2;
    max-width: 850px;
    margin: 0 auto;
    font-size: clamp(28px, 4vw, 46px);
    line-height: 1.15;
    font-weight: 950;
    letter-spacing: -0.5px;
  }

  .hero h1 span {
    background: linear-gradient(135deg, #22c55e, #60a5fa, #fff);
    -webkit-background-clip: text;
    color: transparent;
  }

  .hero p {
    position: relative;
    z-index: 2;
    max-width: 760px;
    margin: 9px auto 0;
    color: #d6d6d6;
    font-size: 14.5px;
    line-height: 1.7;
  }

  .heroActions {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 14px;
  }

  .primaryBtn,
  .secondaryBtn,
  .buyBtn,
  .emptyBox a {
    text-decoration: none;
    transition: all .25s ease;
  }

  .primaryBtn {
    padding: 11px 22px;
    border-radius: 999px;
    background: linear-gradient(135deg, #16a34a, #22c55e);
    color: white;
    font-weight: 950;
    box-shadow: 0 0 24px rgba(34,197,94,0.36);
  }

  .primaryBtn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 0 38px rgba(34,197,94,0.58);
  }

  .secondaryBtn {
    padding: 11px 20px;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    color: #fff;
    font-weight: 850;
  }

  .secondaryBtn:hover {
    background: rgba(255,255,255,0.14);
    transform: translateY(-3px);
  }

  .stats {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    max-width: 560px;
    margin: 16px auto 0;
  }

  .stats div {
    padding: 10px 12px;
    border-radius: 17px;
    background: rgba(0,0,0,0.26);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .stats strong {
    display: block;
    font-size: 21px;
    color: #86efac;
  }

  .stats span {
    display: block;
    margin-top: 3px;
    color: #cfcfcf;
    font-size: 12px;
  }

  .seoBox {
    max-width: 1080px;
    margin: 0 auto 16px;
    padding: 15px 20px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025));
    border: 1px solid rgba(255,255,255,0.08);
  }

  .seoBox h2 {
    margin: 0 0 6px;
    font-size: 20px;
  }

  .seoBox p {
    margin: 0;
    color: #d4d4d4;
    line-height: 1.75;
    font-size: 14px;
  }

  .offersGrid {
    max-width: 1080px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
    gap: 18px;
    align-items: stretch;
  }

  .offerCard {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    background: linear-gradient(180deg, #202020, #121212);
    border: 1px solid rgba(255,255,255,0.09);
    box-shadow: 0 18px 45px rgba(0,0,0,0.34);
    transition: all .28s ease;
  }

  .offerCard:before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, transparent, rgba(34,197,94,0.4), transparent);
    opacity: 0;
    transition: opacity .28s ease;
    pointer-events: none;
  }

  .offerCard:hover {
    transform: translateY(-7px);
    box-shadow: 0 25px 70px rgba(0,0,0,0.5);
    border-color: rgba(34,197,94,0.35);
  }

  .offerCard:hover:before {
    opacity: 1;
  }

  .imageWrap {
    position: relative;
    height: 210px;
    background:
      radial-gradient(circle at center, rgba(255,255,255,0.09), transparent 62%),
      #0e0e0e;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .imageWrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform .3s ease;
  z-index: 2;
}

.productSlider img {
  position: absolute;
  inset: 0;
  margin: auto;
  opacity: 0;
  animation: productSlide 3s infinite;
}

.productSlider img:nth-child(1) {
  animation-delay: 0s;
}

.productSlider img:nth-child(2) {
  animation-delay: 2s;
}

.productSlider img:nth-child(3) {
  animation-delay: 4s;
}

.productSlider img:only-child {
  opacity: 1;
  animation: none;
}

.offerCard:hover .productSlider img {
  transform: scale(1.07) rotate(-1deg);
}
  .floatingLabel {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 3;
    padding: 6px 11px;
    border-radius: 999px;
    background: rgba(34,197,94,0.16);
    border: 1px solid rgba(34,197,94,0.35);
    color: #bbf7d0;
    font-size: 11px;
    font-weight: 900;
  }

  .cardContent {
    position: relative;
    z-index: 2;
    padding: 15px;
  }

  .storeName {
    color: #9ca3af;
    font-size: 12.5px;
    font-weight: 700;
    margin: 0 0 7px;
  }

  .cardContent h2 {
    font-size: 15.5px;
    line-height: 1.6;
    margin: 0 0 12px;
    min-height: 50px;
    color: #fff;
  }

  .priceRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 13px;
  }

  .priceRow strong {
    color: #22c55e;
    font-size: 21px;
    font-weight: 950;
  }

  .priceRow span {
    font-size: 11px;
    color: #d1fae5;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.22);
    padding: 5px 9px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .buyBtn {
    display: block;
    text-align: center;
    padding: 11px;
    border-radius: 15px;
    background: #fff;
    color: #111;
    font-weight: 950;
  }

  .buyBtn:hover {
    background: #22c55e;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 0 25px rgba(34,197,94,0.32);
  }

  .message,
  .emptyBox {
    max-width: 760px;
    margin: 20px auto;
    text-align: center;
    border-radius: 24px;
    padding: 28px 18px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
  }

  .error {
    color: #fecaca;
    border-color: rgba(248,113,113,0.35);
  }

  .emptyIcon {
    font-size: 44px;
    margin-bottom: 10px;
  }

  .emptyBox h2 {
    margin: 0 0 8px;
    font-size: 24px;
  }

  .emptyBox p {
    color: #cfcfcf;
    margin-bottom: 18px;
  }

  .emptyBox a {
    display: inline-block;
    padding: 12px 23px;
    border-radius: 999px;
    background: linear-gradient(135deg, #16a34a, #22c55e);
    color: white;
    font-weight: 900;
  }

  @media (max-width: 700px) {
    .customerOffersPage {
      padding: 12px 12px 60px;
    }

    .hero {
      padding: 18px 12px 16px;
      border-radius: 22px;
    }

    .badge {
      font-size: 11px;
      margin-bottom: 7px;
    }

    .hero p {
      font-size: 13.5px;
    }

    .stats {
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
    }

    .stats div {
      padding: 8px 5px;
      border-radius: 14px;
    }

    .stats strong {
      font-size: 18px;
    }

    .stats span {
      font-size: 10.5px;
    }

    .seoBox {
      padding: 13px 14px;
      border-radius: 18px;
    }

    .seoBox h2 {
      font-size: 18px;
    }

    .offersGrid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .imageWrap {
      height: 205px;
    }
  }
`}</style>
    </main>
  );
}