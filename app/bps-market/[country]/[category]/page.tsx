import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

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

function extractKeywords(offers: Offer[], countryName: string, categoryName: string) {
  const words = offers
    .flatMap((offer) => offer.product_name.split(/\s+/))
    .map((w) => w.trim())
    .filter((w) => w.length > 2)
    .slice(0, 35);

  return Array.from(
    new Set([
      `عروض ${categoryName}`,
      `أفضل ${categoryName} في ${countryName}`,
      `أسعار ${categoryName} في ${countryName}`,
      `شراء ${categoryName} أونلاين`,
      `BPS Market`,
      `BPS Chat`,
      `بي بي اس شات`,
      ...words,
    ])
  );
}

async function getOffers(country: string, category: string) {
  const { data } = await supabase
    .from("customer_offers")
    .select(
      "id, product_name, price, image_url, image_url_2, image_url_3, store_name, country, category"
    )
    .eq("status", "approved")
    .eq("country", country)
    .contains("category", [category])
    .order("created_at", { ascending: false })
    .limit(80);

  return (data || []) as Offer[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; category: string }>;
}): Promise<Metadata> {
  const { country, category } = await params;

  if (!countries[country] || !categories[category]) {
    return { title: "صفحة غير موجودة | BPS Market" };
  }

  const countryName = countries[country].ar;
  const categoryName = categories[category].ar;
  const offers = await getOffers(country, category);
  const keywords = extractKeywords(offers, countryName, categoryName);
  const pageUrl = `${SITE_URL}/bps-market/${country}/${category}`;

  return {
    title: `أفضل عروض ${categoryName} في ${countryName} | BPS Market`,
    description: `تصفح أفضل عروض ${categoryName} في ${countryName} على BPS Market من BPS Chat. منتجات حقيقية، أسعار واضحة، وروابط مباشرة للشراء من المتاجر والبائعين.`,
    keywords,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `أفضل عروض ${categoryName} في ${countryName} | BPS Market`,
      description: `منتجات ${categoryName} في ${countryName} بروابط مباشرة وأسعار واضحة على BPS Chat.`,
      url: pageUrl,
      siteName: "BPS Chat | بي بي اس شات",
      images: [
        {
          url: offers[0]?.image_url || `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `عروض ${categoryName} في ${countryName}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `أفضل عروض ${categoryName} في ${countryName}`,
      description: `تصفح منتجات ${categoryName} في ${countryName} على BPS Market.`,
      images: [offers[0]?.image_url || `${SITE_URL}/og-image.png`],
    },
  };
}

export default async function BpsMarketCategoryPage({
  params,
}: {
  params: Promise<{ country: string; category: string }>;
}) {
  const { country, category } = await params;

  if (!countries[country] || !categories[category]) {
    notFound();
  }

  const offers = await getOffers(country, category);
  const countryName = countries[country].ar;
  const countryFlag = countries[country].flag;
  const categoryName = categories[category].ar;
  const categoryIcon = categories[category].icon;
  const keywords = extractKeywords(offers, countryName, categoryName);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `أفضل عروض ${categoryName} في ${countryName}`,
    description: `صفحة تجمع عروض ${categoryName} في ${countryName} داخل BPS Market.`,
    url: `${SITE_URL}/bps-market/${country}/${category}`,
    mainEntity: offers.slice(0, 20).map((offer) => ({
      "@type": "Product",
      name: offer.product_name,
      image: offer.image_url,
      offers: {
        "@type": "Offer",
        price: String(offer.price || "").replace(/[^\d.]/g, "") || "0",
        priceCurrency:
          country === "sa"
            ? "SAR"
            : country === "ae"
              ? "AED"
              : country === "kw"
                ? "KWD"
                : country === "qa"
                  ? "QAR"
                  : country === "bh"
                    ? "BHD"
                    : "EGP",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${productSeoUrl(offer)}`,
      },
    })),
  };

  return (
    <main className="marketCategoryPage" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="hero">
        <div className="badge">
          {countryFlag} {categoryIcon} BPS Market
        </div>

        <h1>
          أفضل عروض {categoryName}
          <span>في {countryName}</span>
        </h1>

        <p>
          اكتشف منتجات {categoryName} في {countryName} من BPS Market by BPS Chat.
          صفحة مخصصة للسيو تجمع المنتجات الحقيقية والأسعار والروابط المباشرة
          حسب الدولة والقسم.
        </p>

        <div className="heroActions">
          <Link href="/bps-market" className="secondaryBtn">
            كل الأسواق
          </Link>
          <Link href="/customer-offers/add" className="primaryBtn">
            + أضف عرضك
          </Link>
        </div>
      </section>

      <section className="layout">
        <aside className="sideBar">
          <div className="sideBox">
            <h2>🌍 الدول</h2>
            {Object.entries(countries).map(([code, item]) => (
              <Link
                key={code}
                href={`/bps-market/${code}/${category}`}
                className={code === country ? "active" : ""}
              >
                {item.flag} {item.ar}
              </Link>
            ))}
          </div>

          <div className="sideBox">
            <h2>🔥 الأقسام</h2>
            {Object.entries(categories).map(([key, item]) => (
              <Link
                key={key}
                href={`/bps-market/${country}/${key}`}
                className={key === category ? "active" : ""}
              >
                {item.icon} {item.ar}
              </Link>
            ))}
          </div>
        </aside>

        <section className="contentArea">
          <section className="seoBox">
            <h2>
              {categoryIcon} عروض {categoryName} في {countryName}
            </h2>

            <p>
              هذه الصفحة مخصصة لعرض منتجات {categoryName} داخل {countryName} على
              BPS Market. يتم توليد الكلمات المفتاحية تلقائيًا من أسماء المنتجات
              الموجودة في الصفحة، مما يساعد جوجل على فهم محتوى الصفحة وربطها
              بعمليات البحث مثل: أسعار {categoryName}، أفضل عروض {categoryName}،
              وشراء {categoryName} أونلاين في {countryName}.
            </p>

            {keywords.length > 0 && (
              <div className="keywordChips">
                {keywords.slice(0, 18).map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </div>
            )}
          </section>

          {offers.length === 0 && (
            <section className="emptyBox">
              <div>🛒</div>
              <h2>لا توجد منتجات حاليًا</h2>
              <p>
                لا توجد عروض في قسم {categoryName} داخل {countryName} حاليًا.
                أضف أول عرض ليظهر في هذه الصفحة.
              </p>
              <Link href="/customer-offers/add">أضف أول عرض</Link>
            </section>
          )}

          {offers.length > 0 && (
            <>
              <div className="resultsHeader">
                <div>
                  <h2>🔥 المنتجات المتاحة</h2>
                  <p>
                    {offers.length} منتج في {categoryName} - {countryName}
                  </p>
                </div>
              </div>

              <section className="offersGrid">
                {offers.map((offer) => (
                  <article className="offerCard" key={offer.id}>
                    <Link href={productSeoUrl(offer)} className="imageWrap">
                      <img src={offer.image_url} alt={offer.product_name} />
                      <b>{countryName}</b>
                    </Link>

                    <div className="cardContent">
                      <small>{offer.store_name || "BPS Market"}</small>
                      <h3>{offer.product_name}</h3>

                      <div className="priceRow">
                        <strong>{offer.price}</strong>
                        <span>{currencies[offer.country || country]}</span>
                      </div>

                      <div className="cardActions">
                        <a
                          href={`/api/customer-offers/click/${offer.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="buyBtn"
                        >
                          عرض المنتج
                        </a>

                        <Link href={productSeoUrl(offer)} className="detailsBtn">
                          تفاصيل
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </>
          )}

          <section className="internalLinks">
            <h2>روابط مهمة داخل BPS Market</h2>

            <div>
              {Object.entries(countries).map(([code, item]) => (
                <Link key={code} href={`/bps-market/${code}/${category}`}>
                  {item.flag} {categoryName} في {item.ar}
                </Link>
              ))}

              {Object.entries(categories).slice(0, 12).map(([key, item]) => (
                <Link key={key} href={`/bps-market/${country}/${key}`}>
                  {item.icon} {item.ar} في {countryName}
                </Link>
              ))}
            </div>
          </section>
        </section>
      </section>

      <style>{`
        .marketCategoryPage {
          min-height: 100vh;
          background: linear-gradient(180deg,#f4f7fb,#eef2f7);
          color: #111827;
          padding-bottom: 70px;
        }

        .hero {
          max-width: 1320px;
          margin: 0 auto 24px;
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
          display: block;
          background: linear-gradient(135deg,#22c55e,#60a5fa,#fff);
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero p {
          max-width: 820px;
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
        .secondaryBtn {
          text-decoration: none;
          border-radius: 16px;
          font-weight: 950;
          padding: 14px 28px;
          transition: .25s;
        }

        .primaryBtn {
          background: #22c55e;
          color: white;
        }

        .secondaryBtn {
          background: rgba(255,255,255,.12);
          color: white;
          border: 1px solid rgba(255,255,255,.18);
        }

        .primaryBtn:hover,
        .secondaryBtn:hover {
          transform: translateY(-3px);
        }

        .layout {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 22px;
          align-items: start;
        }

        .sideBar {
  position: sticky;
  top: 88px;
  display: grid;
  gap: 16px;

  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding-left: 4px;
}

        .sideBox,
        .seoBox,
        .emptyBox,
        .internalLinks {
          background:
            radial-gradient(circle at 10% 20%, rgba(37,99,235,.08), transparent 30%),
            linear-gradient(135deg,#ffffff,#f8fafc);
          border: 1px solid #dbeafe;
          border-radius: 26px;
          box-shadow: 0 14px 38px rgba(15,23,42,.08);
        }

        .sideBox {
          padding: 16px;
        }

        .sideBox h2 {
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 950;
        }

        .sideBox a {
          display: block;
          text-decoration: none;
          color: #111827;
          padding: 11px 12px;
          border-radius: 14px;
          font-weight: 900;
          margin-bottom: 7px;
          background: #fff;
          border: 1px solid #e5e7eb;
          transition: .25s;
        }

        .sideBox a:hover,
        .sideBox a.active {
          color: white;
          background: linear-gradient(135deg,#0f172a,#2563eb,#22c55e);
          border-color: transparent;
          transform: translateX(-4px);
        }

        .contentArea {
          min-width: 0;
        }

        .seoBox {
          padding: 22px;
          margin-bottom: 18px;
        }

        .seoBox h2 {
          margin: 0 0 10px;
          font-size: 25px;
          font-weight: 950;
        }

        .seoBox p {
          margin: 0;
          color: #64748b;
          line-height: 1.9;
          font-weight: 800;
        }

        .keywordChips {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 16px;
        }

        .keywordChips span {
          background: #dcfce7;
          color: #166534;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 950;
        }

        .resultsHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 18px 0;
        }

        .resultsHeader h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
        }

        .resultsHeader p {
          margin: 5px 0 0;
          color: #64748b;
          font-weight: 800;
        }

        .offersGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(245px,1fr));
          gap: 20px;
        }

        .offerCard {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(15,23,42,.06);
          transition: .25s;
          overflow: hidden;
        }

        .offerCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(15,23,42,.13);
          border-color: rgba(34,197,94,.45);
        }

        .imageWrap {
          position: relative;
          height: 255px;
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
          max-height: 225px;
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

        .cardActions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .buyBtn,
        .detailsBtn {
          text-decoration: none;
          text-align: center;
          padding: 12px;
          border-radius: 14px;
          color: white;
          font-weight: 950;
          transition: .25s;
        }

        .buyBtn {
          background: linear-gradient(135deg,#16a34a,#22c55e);
        }

        .detailsBtn {
          background: #111827;
        }

        .buyBtn:hover,
        .detailsBtn:hover {
          transform: translateY(-2px);
        }

        .emptyBox {
          text-align: center;
          padding: 34px 18px;
        }

        .emptyBox div {
          font-size: 46px;
        }

        .emptyBox h2 {
          margin: 10px 0;
          font-size: 25px;
          font-weight: 950;
        }

        .emptyBox p {
          color: #64748b;
          line-height: 1.8;
          font-weight: 800;
        }

        .emptyBox a {
          display: inline-block;
          margin-top: 12px;
          text-decoration: none;
          background: linear-gradient(135deg,#16a34a,#2563eb);
          color: white;
          padding: 13px 24px;
          border-radius: 999px;
          font-weight: 950;
        }

        .internalLinks {
          padding: 22px;
          margin-top: 24px;
        }

        .internalLinks h2 {
          margin: 0 0 14px;
          font-size: 22px;
          font-weight: 950;
        }

        .internalLinks div {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .internalLinks a {
          text-decoration: none;
          color: #111827;
          background: #fff;
          border: 1px solid #e5e7eb;
          padding: 10px 13px;
          border-radius: 999px;
          font-weight: 900;
          transition: .25s;
        }

        .internalLinks a:hover {
          background: #dcfce7;
          border-color: #22c55e;
        }

        @media (max-width: 950px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .sideBar {
            position: static;
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 650px) {
          .marketCategoryPage {
            padding: 10px;
          }

          .hero {
            border-radius: 24px;
            padding: 32px 16px;
          }

          .layout {
            padding: 0;
          }

          .sideBar {
            grid-template-columns: 1fr;
          }

          .offersGrid {
            grid-template-columns: 1fr;
          }

          .cardActions {
            grid-template-columns: 1fr;
          }
        }
          .sideBar::-webkit-scrollbar {
  width: 8px;
}

.sideBar::-webkit-scrollbar-track {
  background: #eef2f7;
  border-radius: 999px;
}

.sideBar::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    #2563eb,
    #22c55e
  );
  border-radius: 999px;
}

.sideBar::-webkit-scrollbar-thumb:hover {
  opacity: .8;
}
      `}</style>
    </main>
  );
}