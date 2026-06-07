import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BPS Market | تسوق حسب الدولة والقسم | بي بي اس شات",
  description:
    "تصفح منتجات BPS Market حسب الدولة والقسم. عروض السعودية والإمارات والكويت وقطر والبحرين ومصر في صفحة واحدة بروابط مباشرة ومنتجات حقيقية.",
  keywords: [
    "BPS Market",
    "بي بي اس ماركت",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض مصر",
    "منتجات حسب الدولة",
    "منتجات حسب القسم",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

type Offer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  image_url_2: string | null;
  image_url_3: string | null;
  store_name: string | null;
  country: string | null;
  category: string[] | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const countries: Record<string, { ar: string; flag: string }> = {
  sa: { ar: "السعودية", flag: "🇸🇦" },
  ae: { ar: "الإمارات", flag: "🇦🇪" },
  kw: { ar: "الكويت", flag: "🇰🇼" },
  qa: { ar: "قطر", flag: "🇶🇦" },
  bh: { ar: "البحرين", flag: "🇧🇭" },
  eg: { ar: "مصر", flag: "🇪🇬" },
};

const categories: Record<string, { ar: string; icon: string }> = {
  electronics: { ar: "إلكترونيات", icon: "🎧" },
  mobiles: { ar: "جوالات وتابلت", icon: "📱" },
  mobile_accessories: { ar: "إكسسوارات جوالات", icon: "🔌" },
  smart_watch: { ar: "ساعات ذكية", icon: "⌚" },
  power_bank: { ar: "باور بانك", icon: "🔋" },
  chargers: { ar: "شواحن وكابلات", icon: "⚡" },
  headphones: { ar: "سماعات", icon: "🎧" },
  computers: { ar: "كمبيوتر ولابتوب", icon: "💻" },
  computer_accessories: { ar: "إكسسوارات كمبيوتر", icon: "🖱️" },
  gaming: { ar: "ألعاب وجيمينج", icon: "🎮" },
  home: { ar: "المنزل والمطبخ", icon: "🏠" },
  fashion: { ar: "ملابس", icon: "👕" },
  shoes: { ar: "أحذية", icon: "👟" },
  bags: { ar: "شنط", icon: "👜" },
  beauty: { ar: "جمال وعناية", icon: "💄" },
  cars: { ar: "سيارات وإكسسوارات", icon: "🚗" },
  kids: { ar: "أطفال", icon: "🧸" },
  sports: { ar: "رياضة", icon: "🏋️" },
  cameras: { ar: "كاميرات", icon: "📷" },
  camera_accessories: { ar: "ملحقات كاميرات", icon: "🎥" },
  other: { ar: "أخرى", icon: "▦" },
};

const currencies: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function productSeoUrl(offer: Offer) {
  return `/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}

async function getOffers() {
  const { data } = await supabase
    .from("customer_offers")
    .select(
      "id, product_name, price, image_url, image_url_2, image_url_3, store_name, country, category"
    )
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(60);

  return (data || []) as Offer[];
}

export default async function BpsMarketPage() {
  const offers = await getOffers();

  return (
    <main className="bpsMarketPage" dir="rtl">
      <section className="hero">
        <div className="badge">🛒 BPS Market | بي بي اس ماركت</div>

        <h1>
          تسوق المنتجات حسب <span>الدولة والقسم</span>
        </h1>

        <p>
          صفحة جديدة منفصلة داخل BPS Chat لتصفح المنتجات والعروض حسب الدولة
          والكاتيجري، مع روابط SEO قوية لكل سوق وكل قسم.
        </p>

        <div className="heroActions">
          <a href="#countries" className="primaryBtn">
            اختر الدولة
          </a>
          <a href="#categories" className="secondaryBtn">
            اختر القسم
          </a>
        </div>
      </section>
<section className="boxSection">
  <div className="sectionHeader">
    <div>
      <h2>🔥 أشهر الأقسام</h2>
      <p>روابط سريعة لأقوى صفحات BPS Market.</p>
    </div>
  </div>

  <div className="topSeoLinks">
    <Link href="/bps-market/sa/mobiles">📱 جوالات السعودية</Link>
    <Link href="/bps-market/ae/mobiles">📱 جوالات الإمارات</Link>
    <Link href="/bps-market/sa/computers">💻 لابتوبات السعودية</Link>
    <Link href="/bps-market/sa/beauty">💄 عناية وجمال السعودية</Link>
    <Link href="/bps-market/sa/kids">🧸 ألعاب وأطفال السعودية</Link>
    <Link href="/bps-market/eg/electronics">🎧 إلكترونيات مصر</Link>
    <Link href="/bps-market/sa/cameras">📷 كاميرات السعودية</Link>
    <Link href="/bps-market/sa/home">🏠 المنزل والمطبخ</Link>
    <Link href="/bps-market/kw/mobiles">📱 جوالات الكويت</Link>
    <Link href="/bps-market/qa/mobiles">📱 جوالات قطر</Link>
    <Link href="/bps-market/bh/mobiles">📱 جوالات البحرين</Link>
    <Link href="/bps-market/eg/mobiles">📱 جوالات مصر</Link>
  </div>
</section>
      <section id="countries" className="boxSection">
        <div className="sectionHeader">
          <div>
            <h2>🌍 اختر الدولة</h2>
            <p>كل دولة لها صفحات أقسام مستقلة للسيو.</p>
          </div>
        </div>

        <div className="countryGrid">
          {Object.entries(countries).map(([code, country]) => (
            <div className="countryCard" key={code}>
              <strong>
                <span>{country.flag}</span>
                {country.ar}
              </strong>

              <div className="miniCats">
                {Object.entries(categories).map(([cat, item]) => (
                  <Link key={cat} href={`/bps-market/${code}/${cat}`}>
                    {item.icon} {item.ar}
                  </Link>
                ))}
              </div>

              <Link href={`/bps-market/${code}/mobiles`} className="openBtn">
                تصفح سوق {country.ar}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="boxSection">
        <div className="sectionHeader">
          <div>
            <h2>🔥 تسوق حسب القسم</h2>
            <p>اختار القسم ثم افتح منتجاته داخل كل دولة.</p>
          </div>
        </div>

        <div className="categoryGrid">
          {Object.entries(categories).map(([key, cat]) => (
            <div className="categoryCard" key={key}>
              <span>{cat.icon}</span>
              <strong>{cat.ar}</strong>

              <div className="countryLinks">
                {Object.entries(countries).map(([code, country]) => (
                  <Link key={code} href={`/bps-market/${code}/${key}`}>
                    {country.flag} {country.ar}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {offers.length > 0 && (
        <section className="boxSection">
          <div className="sectionHeader">
            <div>
              <h2>⚡ أحدث المنتجات</h2>
              <p>آخر المنتجات المعتمدة من BPS Market.</p>
            </div>
            <Link href="/customer-offers">المتجر الأصلي</Link>
          </div>

          <div className="offersGrid">
            {offers.map((offer) => (
              <article className="offerCard" key={offer.id}>
                <Link href={productSeoUrl(offer)} className="imageWrap">
                  <img src={offer.image_url} alt={offer.product_name} />
                  <b>{countries[offer.country || ""]?.ar || "عرض مميز"}</b>
                </Link>

                <div className="cardContent">
                  <small>{offer.store_name || "BPS Market"}</small>
                  <h3>{offer.product_name}</h3>

                  <div className="priceRow">
                    <strong>{offer.price}</strong>
                    <span>{currencies[offer.country || ""] || ""}</span>
                  </div>

                  <Link href={productSeoUrl(offer)} className="detailsBtn">
                    شاهد المنتج
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .bpsMarketPage {
          min-height: 100vh;
          background: linear-gradient(180deg,#f4f7fb,#eef2f7);
          color: #111827;
          padding-bottom: 70px;
        }

        .hero {
          max-width: 1320px;
          margin: 0 auto 26px;
          padding: 58px 26px;
          border-radius: 0 0 36px 36px;
          text-align: center;
          background:
            radial-gradient(circle at 20% 20%, rgba(34,197,94,.22), transparent 28%),
            linear-gradient(135deg,#0f172a,#1e293b,#2563eb);
          color: white;
          box-shadow: 0 18px 55px rgba(15,23,42,.22);
        }

        .badge {
          display: inline-flex;
          padding: 8px 15px;
          border-radius: 999px;
          background: rgba(34,197,94,.14);
          border: 1px solid rgba(34,197,94,.35);
          color: #bbf7d0;
          font-weight: 950;
          margin-bottom: 12px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(30px,4vw,50px);
          font-weight: 950;
          line-height: 1.25;
        }

        .hero h1 span {
          background: linear-gradient(135deg,#22c55e,#60a5fa,#fff);
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero p {
          max-width: 780px;
          margin: 14px auto 0;
          color: #e5e7eb;
          line-height: 1.9;
          font-weight: 800;
        }

        .heroActions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .primaryBtn,
        .secondaryBtn,
        .openBtn,
        .detailsBtn {
          text-decoration: none;
          border-radius: 16px;
          font-weight: 950;
          transition: .25s;
        }

        .primaryBtn {
          padding: 14px 28px;
          background: #22c55e;
          color: white;
        }

        .secondaryBtn {
          padding: 14px 28px;
          background: rgba(255,255,255,.12);
          color: white;
          border: 1px solid rgba(255,255,255,.18);
        }

        .primaryBtn:hover,
        .secondaryBtn:hover,
        .openBtn:hover,
        .detailsBtn:hover {
          transform: translateY(-3px);
        }

        .boxSection {
          max-width: 1320px;
          margin: 24px auto;
          padding: 24px;
          border-radius: 30px;
          background:
            radial-gradient(circle at 10% 20%, rgba(37,99,235,.08), transparent 30%),
            linear-gradient(135deg,#ffffff,#f8fafc);
          border: 1px solid #dbeafe;
          box-shadow: 0 18px 45px rgba(15,23,42,.08);
        }

        .sectionHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 18px;
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
          font-weight: 950;
          text-decoration: none;
        }
.topSeoLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.topSeoLinks a {
  text-decoration: none;
  color: #111827;
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 950;
  transition: .25s;
}

.topSeoLinks a:hover {
  transform: translateY(-3px);
  background: #dcfce7;
  border-color: #22c55e;
  box-shadow: 0 12px 25px rgba(34,197,94,.14);
}
        .countryGrid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 18px;
        }

        .countryCard,
        .categoryCard,
        .offerCard {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(15,23,42,.06);
          transition: .25s;
          overflow: hidden;
        }

        .countryCard:hover,
        .categoryCard:hover,
        .offerCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(15,23,42,.13);
          border-color: rgba(34,197,94,.45);
        }

        .countryCard {
          padding: 18px;
        }

        .countryCard strong {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 21px;
          font-weight: 950;
          margin-bottom: 14px;
        }

        .countryCard strong span {
          font-size: 30px;
        }

        .miniCats,
        .countryLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .miniCats a,
        .countryLinks a {
          text-decoration: none;
          color: #111827;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          padding: 8px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
        }

        .miniCats a:hover,
        .countryLinks a:hover {
          background: #dcfce7;
          border-color: #22c55e;
        }

        .openBtn {
          display: block;
          margin-top: 15px;
          text-align: center;
          padding: 13px;
          background: linear-gradient(135deg,#16a34a,#2563eb);
          color: white;
        }

        .categoryGrid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 16px;
        }

        .categoryCard {
          padding: 18px;
        }

        .categoryCard > span {
          width: 52px;
          height: 52px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0fdf4;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .categoryCard strong {
          display: block;
          font-size: 17px;
          font-weight: 950;
          margin-bottom: 12px;
        }

        .offersGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
          gap: 20px;
        }

        .imageWrap {
          position: relative;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          background: #fff;
          border-bottom: 1px solid #f1f5f9;
          text-decoration: none;
        }

        .imageWrap img {
          max-width: 100%;
          max-height: 220px;
          object-fit: contain;
          transition: .3s;
        }

        .offerCard:hover .imageWrap img {
          transform: scale(1.06);
        }

        .imageWrap b {
          position: absolute;
          top: 12px;
          right: 12px;
          color: white;
          background: linear-gradient(135deg,#0f172a,#2563eb,#22c55e);
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 11px;
        }

        .cardContent {
          padding: 14px;
        }

        .cardContent small {
          color: #64748b;
          font-weight: 800;
        }

        .cardContent h3 {
          min-height: 48px;
          font-size: 14px;
          line-height: 1.7;
          margin: 8px 0;
          font-weight: 900;
        }

        .priceRow {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .priceRow strong {
          color: #16a34a;
          font-size: 23px;
          font-weight: 950;
        }

        .priceRow span {
          background: #dcfce7;
          color: #166534;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 950;
        }

        .detailsBtn {
          display: block;
          text-align: center;
          padding: 12px;
          color: white;
          background: #111827;
        }

        @media (max-width: 950px) {
          .countryGrid,
          .categoryGrid {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media (max-width: 620px) {
          .bpsMarketPage {
            padding: 10px;
          }

          .hero {
            border-radius: 24px;
            padding: 32px 16px;
          }

          .boxSection {
            padding: 16px;
            border-radius: 24px;
          }

          .countryGrid,
          .categoryGrid,
          .offersGrid {
            grid-template-columns: 1fr;
          }

          .sectionHeader {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}