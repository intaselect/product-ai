import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

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

const currencies: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};

const countryHashtags: Record<string, string> = {
  sa: "#السعودية #عروض_السعودية #تسوق_السعودية",
  ae: "#الإمارات #عروض_الإمارات #تسوق_الإمارات",
  kw: "#الكويت #عروض_الكويت",
  qa: "#قطر #عروض_قطر",
  bh: "#البحرين #عروض_البحرين",
  eg: "#مصر #عروض_مصر #تسوق_مصر",
};

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function cardUrl(item: any) {
  return `${SITE_URL}/customer-offers/card/${item.country || "sa"}-${item.id}`;
}

export default async function ShareCenterPage({
  searchParams,
}: {
  searchParams?: Promise<{ country?: string }>;
}) {
  const params = await searchParams;
  const selectedCountry = params?.country || "sa";

  const { data } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, store_name, country, created_at")
    .eq("status", "approved")
    .eq("country", selectedCountry)
    .order("created_at", { ascending: false })
    .limit(300);

  const offers = data || [];
  const country = countryNames[selectedCountry] || "السعودية";
  const currency = currencies[selectedCountry] || "";
  const hashtags =
    `${countryHashtags[selectedCountry] || ""} #BPSChat #بي_بي_اس_شات #عروض`;

  return (
    <main className="shareCenterPage" dir="rtl">
      <section className="hero">
        <div>
          <span className="badge">📢 BPS Share Center</span>
          <h1>مركز مشاركة عروض BPS Chat</h1>
          <p>
            اختار الدولة وشوف كل المنتجات أمامك مع أزرار شير جاهزة لواتساب،
            فيسبوك، و X.
          </p>
        </div>
      </section>

      <section className="countryBox">
        <h2>اختر الدولة</h2>

        <div className="countryTabs">
          {Object.entries(countryNames).map(([code, name]) => (
            <a
              key={code}
              href={`/customer-offers/share-center?country=${code}`}
              className={selectedCountry === code ? "active" : ""}
            >
              {name}
            </a>
          ))}
        </div>
      </section>

      <section className="sectionHeader">
        <div>
          <h2>منتجات {country}</h2>
          <p>{offers.length} منتج جاهز للشير</p>
        </div>

        <a href={`/customer-offers?country=${selectedCountry}`}>
          فتح متجر {country}
        </a>
      </section>

      <section className="shareGrid">
        {offers.map((item: any) => {
          const url = cardUrl(item);

          const whatsappText = `🔥 ${item.product_name}

💰 السعر: ${item.price} ${currency}

🌍 الدولة: ${country}

${hashtags}

شاهد العرض على BPS Chat:
${url}`;

const twitterText = `${item.product_name}

🌍 ${country}

#BPSChat`;

          return (
            <article className="shareCard" key={item.id}>
              <div className="imageBox">
                <img src={item.image_url} alt={item.product_name} />
                <span>{country}</span>
              </div>

              <div className="contentBox">
                <small>{item.store_name || "BPS Market"}</small>
                <h3>{item.product_name}</h3>

                <div className="price">
                  <strong>{item.price}</strong>
                  <span>{currency}</span>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mainBtn"
                >
                  فتح صفحة الكارت
                </a>
                <a
  href={`/customer-offers/product/bps-chat-${slugify(
    item.product_name
  )}-${item.country || "sa"}-${item.id}`}
  target="_blank"
  rel="noopener noreferrer"
  className="detailsBtn"
>
  👀 شاهد صفحة المنتج على BPS Chat
</a>

                <div className="shareBtns">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      whatsappText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp"
                  >
                    واتساب
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      url
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook"
                  >
                    فيسبوك
                  </a>

                  <a
  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="twitter"
>
  X
</a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <style>{`
        .shareCenterPage {
          min-height: 100vh;
          background: linear-gradient(180deg, #f4f7fb 0%, #eef2f7 100%);
          color: #111827;
          padding: 0 14px 70px;
        }

        .hero {
          max-width: 1320px;
          margin: 0 auto 24px;
          padding: 50px 24px;
          border-radius: 0 0 34px 34px;
          background: linear-gradient(135deg, #0f172a, #1e293b, #2563eb);
          color: white;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }

        .badge {
          display: inline-flex;
          padding: 8px 15px;
          border-radius: 999px;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.32);
          color: #bbf7d0;
          font-weight: 950;
          margin-bottom: 12px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 950;
        }

        .hero p {
          color: #dbeafe;
          line-height: 1.8;
          font-weight: 800;
        }

        .countryBox,
        .sectionHeader {
          max-width: 1320px;
          margin: 0 auto 22px;
          padding: 20px;
          border-radius: 28px;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow: 0 18px 45px rgba(15,23,42,0.08);
        }

        .countryBox h2 {
          margin: 0 0 14px;
          font-size: 22px;
          font-weight: 950;
        }

        .countryTabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .countryTabs a {
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid #e5e7eb;
          color: #111827;
          font-weight: 950;
          transition: .25s;
        }

        .countryTabs a:hover,
        .countryTabs a.active {
          background: linear-gradient(135deg, #0f172a, #2563eb);
          color: white;
          transform: translateY(-2px);
        }

        .sectionHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
        }

        .sectionHeader h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
        }

        .sectionHeader p {
          margin: 5px 0 0;
          color: #64748b;
          font-weight: 800;
        }

        .sectionHeader a {
          color: #16a34a;
          text-decoration: none;
          font-weight: 950;
        }

        .shareGrid {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 20px;
        }

        .shareCard {
          overflow: hidden;
          border-radius: 24px;
          background: #fff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 24px rgba(15,23,42,0.06);
          transition: .25s;
        }

        .shareCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(15,23,42,0.13);
        }

        .imageBox {
          position: relative;
          height: 240px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .imageBox img {
          max-width: 100%;
          max-height: 210px;
          object-fit: contain;
        }

        .imageBox span {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 7px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);
          color: white;
          font-size: 11px;
          font-weight: 950;
        }

        .contentBox {
          padding: 14px;
        }

        .contentBox small {
          color: #64748b;
          font-weight: 850;
        }

        .contentBox h3 {
          font-size: 15px;
          line-height: 1.7;
          min-height: 52px;
          margin: 8px 0;
          font-weight: 950;
        }

        .price {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .price strong {
          color: #16a34a;
          font-size: 24px;
          font-weight: 950;
        }

        .price span {
          padding: 6px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          font-size: 11px;
          font-weight: 950;
        }

        .mainBtn {
          display: block;
          text-align: center;
          text-decoration: none;
          padding: 12px;
          border-radius: 14px;
          background: #111827;
          color: white;
          font-weight: 950;
          margin-bottom: 10px;
        }

        .shareBtns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .shareBtns a {
          text-align: center;
          text-decoration: none;
          color: white;
          padding: 10px 6px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 950;
          transition: .25s;
        }

        .shareBtns a:hover {
          transform: translateY(-2px);
        }

        .whatsapp {
          background: #16a34a;
        }

        .facebook {
          background: #2563eb;
        }

        .twitter {
          background: #111827;
        }

        @media (max-width: 700px) {
          .sectionHeader {
            flex-direction: column;
            align-items: flex-start;
          }

          .shareGrid {
            grid-template-columns: 1fr;
          }
        }
          .detailsBtn {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(135deg,#2563eb,#0f172a);
  color: white;
  font-weight: 950;
  margin-bottom: 10px;
  transition: .25s;
}

.detailsBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(37,99,235,.25);
}
      `}</style>
    </main>
  );
}