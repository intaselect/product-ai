import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import BpsMarketAdSection from "@/app/components/BpsMarketAdSection";

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

function getIdFromSlug(slug: string) {
  const parts = slug.split("-");
  const id = Number(parts[parts.length - 1]);
  return Number.isFinite(id) ? id : null;
}

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function productSeoUrl(offer: any) {
  return `/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}

function cardSeoUrl(offer: any) {
  return `/customer-offers/card/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}

async function getOffer(slug: string) {
  const id = getIdFromSlug(slug);
  if (!id) return null;

  const { data } = await supabase
    .from("customer_offers")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  return data;
}

async function getSameCountryOffers(offer: any) {
  const { data } = await supabase
    .from("customer_offers")
    .select(
      "id, product_name, price, image_url, image_url_2, image_url_3, store_name, country, category"
    )
    .eq("status", "approved")
    .eq("country", offer.country || "sa")
    .neq("id", offer.id)
    .limit(12);

  return data || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOffer(slug);

  if (!offer) {
    return { title: "كارت عرض غير موجود | BPS Chat" };
  }

  const country = countryNames[offer.country || ""] || "السوق العربي";
  const currency = currencies[offer.country || ""] || "";
  const pageUrl = `${SITE_URL}/customer-offers/card/${slug}`;
 const ogImage = offer.image_url || `${SITE_URL}/og-image.png`;

  return {
    title: `كارت عرض ${offer.product_name} في ${country} | BPS Chat Market`,
    description: `شاهد كارت عرض ${offer.product_name} بسعر ${offer.price} ${currency} داخل BPS Chat Market مع رابط مباشر للمتجر ومنتجات مشابهة.`,
    alternates: { canonical: pageUrl },
    robots: { index: true, follow: true },
    openGraph: {
  title: `${offer.product_name} | ${offer.price} ${currency}`,
  description: `🔥 عرض في ${country} بسعر ${offer.price} ${currency} من ${
    offer.store_name || "BPS Market"
  }. شاهد العرض على BPS Chat.`,
  url: pageUrl,
  siteName: "BPS Chat | بي بي اس شات",
images: [
  {
    url: ogImage,
    width: 1200,
    height: 630,
    alt: offer.product_name,
  },
],
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: `${offer.product_name} | ${offer.price} ${currency}`,
  description: `🔥 عرض في ${country} بسعر ${offer.price} ${currency} من ${
    offer.store_name || "BPS Market"
  }.`,
  images: [ogImage],
},
  };
}

export default async function OfferCardSeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = await getOffer(slug);

  if (!offer) notFound();

  const relatedOffers = await getSameCountryOffers(offer);

  const country = countryNames[offer.country || ""] || "غير محدد";
  const currency = currencies[offer.country || ""] || "";
  
  const countryHashtags: Record<string, string> = {
  sa: "#السعودية #عروض_السعودية #تسوق_السعودية",
  ae: "#الإمارات #عروض_الإمارات #تسوق_الإمارات",
  kw: "#الكويت #عروض_الكويت",
  qa: "#قطر #عروض_قطر",
  bh: "#البحرين #عروض_البحرين",
  eg: "#مصر #عروض_مصر #تسوق_مصر",
};

const shareHashtags =
  `${countryHashtags[offer.country || "sa"] || ""} #BPSChat #بي_بي_اس_شات #عروض`;
  const shareUrl = `${SITE_URL}/customer-offers/card/${offer.country || "sa"}-${offer.id}`;

const shortTitle =
  offer.product_name.length > 85
    ? `${offer.product_name.slice(0, 85)}...`
    : offer.product_name;
  

  return (
    <main className="cardSeoPage" dir="rtl">
      <section className="topProductCard">
        <div className="productImageBox">
          <img src={offer.image_url} alt={offer.product_name} />
          <span className="floatingLabel">🔥 عرض مميز</span>
        </div>

        <div className="productInfoBox">
          <span className="countryBadge">🌍 {country}</span>

          <h1>{offer.product_name}</h1>

          <div className="priceBox">
            <strong>{offer.price}</strong>
            <span>{currency}</span>
          </div>

          <div className="metaGrid">
            <div>
              <small>المتجر</small>
              <b>{offer.store_name || "عرض عميل BPS Chat"}</b>
            </div>

            <div>
              <small>الدولة</small>
              <b>{country}</b>
            </div>
          </div>

          <a
            href={`/api/customer-offers/click/${offer.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="affiliateBtn"
          >
            🔥 عرض المنتج من المتجر
        </a>

<div className="premiumShareBox">
  <h3>📢 شارك العرض</h3>

  <div className="premiumShareButtons">
    <a
    href={`https://wa.me/?text=${encodeURIComponent(
  `🔥 ${shortTitle}

💰 ${offer.price} ${currency}

🌍 ${country}

${shareHashtags}

${shareUrl}`
)}`}
target="_blank"
rel="noopener noreferrer"
className="premiumShareBtn whatsapp"
>
  <span>📱</span>
  <div>
    <strong>واتساب</strong>
    <small>WhatsApp</small>
  </div>
</a>

<a
 href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  shareUrl
)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="premiumShareBtn facebook"
>
  <span>👍</span>
  <div>
    <strong>فيسبوك</strong>
    <small>Facebook</small>
  </div>
</a>

<a
href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
  shareUrl
)}&text=${encodeURIComponent(
  `🔥 ${shortTitle}

💰 ${offer.price} ${currency}

🌍 ${country}

#BPSChat`
)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="premiumShareBtn twitter"
>
      <span>𝕏</span>
      <div>
        <strong>X</strong>
        <small>Twitter</small>
      </div>
    </a>
  </div>
</div>

<Link href={productSeoUrl(offer)} className="detailsBtn">
  🚀 تفاصيل المنتج داخل BPS Chat
</Link>

<div className="shareMiniText">
  كارت مختصر للمنتج داخل BPS Market مع رابط مباشر للشراء ومنتجات
  مشابهة من نفس الدولة.
</div>
</div>
</section>

      <SearchBeforeBuyBanner />

      {relatedOffers.length > 0 && (
        <BpsMarketAdSection
          products={relatedOffers}
          country={offer.country || "sa"}
        />
      )}

      <section className="sameCountrySection">
        <div className="sectionHeader">
          <div>
            <h2>منتجات أخرى من {country}</h2>
            <p>عروض قريبة من نفس الدولة لزيادة فرصة التصفح والشراء.</p>
          </div>

          <Link href={`/customer-offers?country=${offer.country || "sa"}`}>
            مشاهدة كل عروض {country}
          </Link>
        </div>

        <div className="relatedGrid">
          {relatedOffers.map((item: any) => (
            <Link href={cardSeoUrl(item)} className="relatedCard" key={item.id}>
              <div className="relatedImage">
                <img src={item.image_url} alt={item.product_name} />
              </div>

              <div className="relatedContent">
                <small>{countryNames[item.country || ""] || "عرض مميز"}</small>
                <h3>{item.product_name}</h3>
                <strong>
                  {item.price} {currencies[item.country || ""] || ""}
                </strong>
                <span>{item.store_name || "BPS Market"}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="seoTextBox">
        <h2>كارت عرض {offer.product_name} داخل BPS Chat</h2>

        <p>
          هذه الصفحة تعرض كارت مختصر لمنتج <strong>{offer.product_name}</strong>{" "}
          في {country} بسعر <strong>{offer.price} {currency}</strong>. يمكنك
          الضغط على زر عرض المنتج للانتقال مباشرة إلى رابط المتجر الذي أضافه
          البائع، أو فتح صفحة المنتج داخل BPS Chat لمشاهدة تفاصيل أكثر.
        </p>

        <p>
          يساعدك BPS Chat Market في اكتشاف عروض العملاء والمتاجر في السعودية
          والإمارات والكويت وقطر والبحرين ومصر، مع صفحات مخصصة للمنتجات وروابط
          مباشرة للشراء ومنتجات مشابهة من نفس الدولة.
        </p>
      </section>

      <style>{`
        .cardSeoPage {
          min-height: 100vh;
          background: linear-gradient(180deg, #f4f7fb 0%, #eef2f7 100%);
          color: #111827;
          padding: 24px 14px 70px;
          overflow-x: hidden;
        }

        .topProductCard {
          max-width: 1120px;
          margin: 0 auto 22px;
          padding: 22px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
          border-radius: 34px;
          background:
            radial-gradient(circle at 15% 20%, rgba(34,197,94,0.10), transparent 28%),
            linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow:
            0 24px 70px rgba(15,23,42,0.16),
            0 0 0 6px rgba(34,197,94,0.04);
        }

        .productImageBox {
          position: relative;
          min-height: 430px;
          border-radius: 28px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          border: 1px solid #e5e7eb;
          box-shadow: inset 0 0 30px rgba(15,23,42,0.04);
        }

        .productImageBox img {
          max-width: 100%;
          max-height: 390px;
          object-fit: contain;
          transition: transform .3s ease;
        }

        .productImageBox:hover img {
          transform: scale(1.05);
        }

        .floatingLabel {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 8px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);
          color: #fff;
          font-size: 12px;
          font-weight: 950;
          box-shadow: 0 10px 24px rgba(37,99,235,0.25);
        }

        .productInfoBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px;
        }

        .countryBadge {
          width: fit-content;
          padding: 8px 14px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-weight: 950;
          margin-bottom: 14px;
        }

        .productInfoBox h1 {
          margin: 0 0 18px;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.45;
          color: #111827;
          font-weight: 950;
        }

        .priceBox {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .priceBox strong {
          color: #16a34a;
          font-size: 44px;
          font-weight: 950;
        }

        .priceBox span {
          padding: 7px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff;
          font-size: 12px;
          font-weight: 950;
        }

        .metaGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .metaGrid div {
          padding: 16px;
          border-radius: 20px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .metaGrid small {
          display: block;
          color: #64748b;
          margin-bottom: 6px;
          font-weight: 900;
        }

        .metaGrid b {
          color: #111827;
          word-break: break-word;
        }

        .affiliateBtn,
        .detailsBtn {
          display: block;
          text-align: center;
          text-decoration: none;
          font-weight: 950;
          border-radius: 16px;
          padding: 15px 18px;
          transition: all .25s ease;
          margin-bottom: 12px;
        }

        .affiliateBtn {
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: #fff;
          box-shadow: 0 14px 32px rgba(37,99,235,0.24);
        }

        .detailsBtn {
          background: #111827;
          color: #fff;
        }

        .affiliateBtn:hover,
        .detailsBtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px rgba(15,23,42,0.14);
        }

        .shareMiniText {
          margin-top: 6px;
          color: #64748b;
          line-height: 1.8;
          font-size: 13px;
          font-weight: 800;
        }

        .sameCountrySection,
        .seoTextBox {
          max-width: 1120px;
          margin: 24px auto 0;
          padding: 22px;
          border-radius: 30px;
          background:
            radial-gradient(circle at 15% 20%, rgba(37,99,235,0.08), transparent 28%),
            linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow:
            0 18px 45px rgba(15,23,42,0.08),
            0 0 0 6px rgba(34,197,94,0.035);
        }

        .sectionHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
        }

        .sectionHeader h2,
        .seoTextBox h2 {
          margin: 0;
          color: #111827;
          font-size: 24px;
          font-weight: 950;
        }

        .sectionHeader p,
        .seoTextBox p {
          margin: 6px 0 0;
          color: #64748b;
          line-height: 1.9;
          font-weight: 800;
        }

        .sectionHeader a {
          text-decoration: none;
          color: #16a34a;
          font-weight: 950;
          white-space: nowrap;
        }

        .relatedGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .relatedCard {
          overflow: hidden;
          border-radius: 22px;
          background: #fff;
          border: 1px solid #e5e7eb;
          text-decoration: none;
          color: #111827;
          box-shadow: 0 8px 22px rgba(15,23,42,0.05);
          transition: all .25s ease;
        }

        .relatedCard:hover {
          transform: translateY(-6px);
          border-color: rgba(34,197,94,0.45);
          box-shadow: 0 18px 38px rgba(15,23,42,0.13);
        }

        .relatedImage {
          height: 190px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          border-bottom: 1px solid #f1f5f9;
        }

        .relatedImage img {
          max-width: 100%;
          max-height: 165px;
          object-fit: contain;
          transition: transform .3s ease;
        }

        .relatedCard:hover .relatedImage img {
          transform: scale(1.06);
        }

        .relatedContent {
          padding: 14px;
        }

        .relatedContent small {
          color: #2563eb;
          font-weight: 950;
        }

        .relatedContent h3 {
          font-size: 14px;
          line-height: 1.7;
          min-height: 48px;
          margin: 8px 0;
          color: #111827;
          font-weight: 900;
        }

        .relatedContent strong {
          display: block;
          color: #16a34a;
          font-size: 18px;
          font-weight: 950;
          margin-bottom: 5px;
        }

        .relatedContent span {
          color: #64748b;
          font-size: 12px;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .topProductCard {
            grid-template-columns: 1fr;
            padding: 16px;
            border-radius: 26px;
          }

          .productImageBox {
            min-height: 300px;
          }

          .productImageBox img {
            max-height: 280px;
          }

          .metaGrid {
            grid-template-columns: 1fr;
          }

          .relatedGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sectionHeader {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 600px) {
          .cardSeoPage {
            padding: 12px 12px 60px;
          }

          .priceBox strong {
            font-size: 34px;
          }

          .relatedGrid {
            grid-template-columns: 1fr;
          }
        }
          .premiumShareBox {
  margin: 14px 0;
  padding: 18px;
  border-radius: 22px;
  background:
    radial-gradient(circle at 15% 20%, rgba(37,99,235,.08), transparent 30%),
    linear-gradient(135deg,#ffffff,#f8fafc);
  border: 1px solid #dbeafe;
}

.premiumShareBox h3 {
  margin: 0 0 14px;
  color: #111827;
  font-size: 17px;
  font-weight: 950;
}

.premiumShareButtons {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
}

.premiumShareBtn {
  text-decoration: none;
  color: #111827;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: .25s;
}

.premiumShareBtn:hover {
  transform: translateY(-3px);
}

.premiumShareBtn span {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
}

.whatsapp span {
  background: linear-gradient(135deg,#16a34a,#22c55e);
}

.facebook span {
  background: linear-gradient(135deg,#2563eb,#3b82f6);
}

.twitter span {
  background: linear-gradient(135deg,#111827,#000);
}

@media (max-width:700px) {
  .premiumShareButtons {
    grid-template-columns: 1fr;
  }
}
      `}</style>
    </main>
  );
}