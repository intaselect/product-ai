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
  product_url: string;
  store_name: string | null;
  country: string | null;
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

export default async function CustomerOffersPage() {
  const { data: offers, error } = await supabase
    .from("customer_offers")
    .select(
      "id, product_name, price, image_url, product_url, store_name, country, created_at"
    )
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const approvedOffers = (offers || []) as CustomerOffer[];

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
            <strong>{approvedOffers.length}</strong>
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

      {error && (
        <div className="message error">
          حدث خطأ أثناء تحميل العروض. حاول مرة أخرى لاحقًا.
        </div>
      )}

      {!error && approvedOffers.length === 0 && (
        <div className="emptyBox">
          <div className="emptyIcon">🛒</div>
          <h2>لا توجد عروض معتمدة حاليًا</h2>
          <p>كن أول من يضيف عرضًا مميزًا يظهر بعد المراجعة.</p>
          <a href="/customer-offers/add">أضف أول عرض</a>
        </div>
      )}

      {!error && approvedOffers.length > 0 && (
        <section className="offersGrid">
          {approvedOffers.map((offer) => (
            <article className="offerCard" key={offer.id}>
              <div className="imageWrap">
                <img src={offer.image_url} alt={offer.product_name} />
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
            radial-gradient(circle at 20% 10%, rgba(34,197,94,0.18), transparent 30%),
            radial-gradient(circle at 80% 15%, rgba(59,130,246,0.16), transparent 28%),
            linear-gradient(180deg, #181818 0%, #212121 45%, #111 100%);
          color: #fff;
          padding: 46px 16px 80px;
          overflow: hidden;
        }

        .hero {
          position: relative;
          max-width: 1150px;
          margin: 0 auto 34px;
          text-align: center;
          padding: 56px 18px 36px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 34px;
          background: rgba(255,255,255,0.035);
          box-shadow: 0 25px 80px rgba(0,0,0,0.35);
          backdrop-filter: blur(12px);
          overflow: hidden;
        }

        .aiGlow {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 999px;
          filter: blur(55px);
          opacity: 0.35;
          animation: floatGlow 6s ease-in-out infinite alternate;
        }

        .aiGlowOne {
          background: #22c55e;
          top: -100px;
          right: -70px;
        }

        .aiGlowTwo {
          background: #3b82f6;
          bottom: -110px;
          left: -80px;
          animation-delay: 1.5s;
        }

        @keyframes floatGlow {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(22px) scale(1.12); }
        }

        .badge {
          position: relative;
          z-index: 2;
          display: inline-flex;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.35);
          color: #bbf7d0;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .hero h1 {
          position: relative;
          z-index: 2;
          max-width: 850px;
          margin: 0 auto;
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.18;
          font-weight: 950;
          letter-spacing: -1px;
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
          margin: 18px auto 0;
          color: #d6d6d6;
          font-size: 18px;
          line-height: 1.9;
        }

        .heroActions {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .primaryBtn,
        .secondaryBtn,
        .buyBtn,
        .emptyBox a {
          text-decoration: none;
          transition: all .25s ease;
        }

        .primaryBtn {
          padding: 14px 26px;
          border-radius: 999px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          font-weight: 900;
          box-shadow: 0 0 28px rgba(34,197,94,0.38);
        }

        .primaryBtn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 0 42px rgba(34,197,94,0.6);
        }

        .secondaryBtn {
          padding: 14px 24px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          font-weight: 800;
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
          gap: 12px;
          max-width: 650px;
          margin: 32px auto 0;
        }

        .stats div {
          padding: 16px;
          border-radius: 20px;
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .stats strong {
          display: block;
          font-size: 24px;
          color: #86efac;
        }

        .stats span {
          display: block;
          margin-top: 5px;
          color: #cfcfcf;
          font-size: 13px;
        }

        .seoBox {
          max-width: 1150px;
          margin: 0 auto 28px;
          padding: 24px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
          border: 1px solid rgba(255,255,255,0.08);
        }

        .seoBox h2 {
          margin: 0 0 10px;
          font-size: 24px;
        }

        .seoBox p {
          margin: 0;
          color: #d4d4d4;
          line-height: 1.9;
          font-size: 16px;
        }

        .offersGrid {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
          gap: 22px;
        }

        .offerCard {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background: linear-gradient(180deg, #2b2b2b, #191919);
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 18px 45px rgba(0,0,0,0.32);
          transition: all .28s ease;
        }

        .offerCard:before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, transparent, rgba(34,197,94,0.38), transparent);
          opacity: 0;
          transition: opacity .28s ease;
          pointer-events: none;
        }

        .offerCard:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 70px rgba(0,0,0,0.48);
          border-color: rgba(34,197,94,0.35);
        }

        .offerCard:hover:before {
          opacity: 1;
        }

        .imageWrap {
          position: relative;
          height: 230px;
          background:
            radial-gradient(circle at center, rgba(255,255,255,0.09), transparent 60%),
            #101010;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .imageWrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform .3s ease;
          position: relative;
          z-index: 2;
        }

        .offerCard:hover img {
          transform: scale(1.08) rotate(-1deg);
        }

        .floatingLabel {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 3;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(34,197,94,0.16);
          border: 1px solid rgba(34,197,94,0.35);
          color: #bbf7d0;
          font-size: 12px;
          font-weight: 900;
        }

        .cardContent {
          position: relative;
          z-index: 2;
          padding: 17px;
        }

        .storeName {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .cardContent h2 {
          font-size: 16px;
          line-height: 1.65;
          margin: 0 0 14px;
          min-height: 52px;
          color: #fff;
        }

        .priceRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 15px;
        }

        .priceRow strong {
          color: #22c55e;
          font-size: 20px;
          font-weight: 950;
        }

        .priceRow span {
          font-size: 12px;
          color: #d1fae5;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.22);
          padding: 5px 9px;
          border-radius: 999px;
        }

        .buyBtn {
          display: block;
          text-align: center;
          padding: 12px;
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
          max-width: 800px;
          margin: 35px auto;
          text-align: center;
          border-radius: 28px;
          padding: 36px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .error {
          color: #fecaca;
          border-color: rgba(248,113,113,0.35);
        }

        .emptyIcon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .emptyBox h2 {
          margin: 0 0 10px;
          font-size: 26px;
        }

        .emptyBox p {
          color: #cfcfcf;
          margin-bottom: 20px;
        }

        .emptyBox a {
          display: inline-block;
          padding: 13px 25px;
          border-radius: 999px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          font-weight: 900;
        }

        @media (max-width: 700px) {
          .customerOffersPage {
            padding-top: 26px;
          }

          .hero {
            padding: 38px 14px 26px;
            border-radius: 26px;
          }

          .hero p {
            font-size: 15.5px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .offersGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}