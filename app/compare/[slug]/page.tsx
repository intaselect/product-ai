import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

import InternalLinksBoost from "@/app/components/InternalLinksBoost";
import PopularSearches from "@/app/components/PopularSearches";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import TrustedSourcesBar from "@/app/components/TrustedSourcesBar";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getComparison(slug: string) {
  const decodedSlug = decodeURIComponent(slug);

  const { data, error } = await supabaseAdmin
    .from("comparisons")
    .select("*")
    .eq("slug", decodedSlug)
    .maybeSingle();

  if (error) {
    console.error("COMPARISON_FETCH_ERROR:", error.message);
    return null;
  }

  return data;
}

async function getRelatedOffers(product1: string, product2: string) {
  const p1 = product1.split(" ").slice(0, 2).join(" ");
  const p2 = product2.split(" ").slice(0, 2).join(" ");

  const { data } = await supabaseAdmin
    .from("customer_offers")
    .select("*")
    .eq("status", "approved")
    .or(`product_name.ilike.%${p1}%,product_name.ilike.%${p2}%`)
    .limit(12);

  return data || [];
}

async function getLatestCountryOffers() {
  const { data } = await supabaseAdmin
    .from("customer_offers")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(24);

  return data || [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparison(slug);

  if (!comparison) {
    return {
      title: "مقارنة غير موجودة | BPS Chat",
    };
  }

  return {
    title: comparison.title,
    description: comparison.meta_description,
    alternates: {
      canonical: `${SITE_URL}/compare/${comparison.slug}`,
    },
    openGraph: {
      title: comparison.title,
      description: comparison.meta_description,
      url: `${SITE_URL}/compare/${comparison.slug}`,
      siteName: "BPS Chat",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.title,
      description: comparison.meta_description,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = await getComparison(slug);

  if (!comparison) notFound();

  const relatedOffers = await getRelatedOffers(
    comparison.product1_name || "",
    comparison.product2_name || ""
  );

const latestOffers = await getLatestCountryOffers();
const product1Offer = await getOfferByName(comparison.product1_name || "");
const product2Offer = await getOfferByName(comparison.product2_name || "");
async function getOfferByName(productName: string) {
  if (!productName) return null;

  const { data } = await supabaseAdmin
    .from("customer_offers")
    .select("*")
    .eq("status", "approved")
    .eq("product_name", productName)
    .maybeSingle();

  return data;
}
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.meta_description,
    mainEntityOfPage: `${SITE_URL}/compare/${comparison.slug}`,
    author: {
      "@type": "Organization",
      name: "BPS Chat",
    },
    publisher: {
      "@type": "Organization",
      name: "BPS Chat",
      url: SITE_URL,
    },
    datePublished: comparison.created_at,
    dateModified: comparison.created_at,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "مقارنات المنتجات",
        item: `${SITE_URL}/compare/${comparison.slug}`,
      },
    ],
  };

  return (
    <main className="comparePage" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="compareHero">
        <Link href="/" className="backLink">
          ← الرجوع للرئيسية
        </Link>

        <div className="badge">⚔️ مقارنة منتجات BPS Chat</div>

        <h1>{comparison.title}</h1>

        <p>{comparison.meta_description}</p>

        <div className="compareProductsBox">
  <div className="compareProductCard">
    {product1Offer?.image_url && (
      <img src={product1Offer.image_url} alt={comparison.product1_name} />
    )}

    <h2>{comparison.product1_name}</h2>

    {product1Offer?.price && <strong>{product1Offer.price}</strong>}

    <div className="productActions">
      <Link href={`/search/${encodeURIComponent(comparison.product1_name || "")}`}>
        🔎 ابحث عنه
      </Link>

      {product1Offer?.id && (
        <a
          href={`/api/customer-offers/click/${product1Offer.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          🛒 ادخل للمنتج
        </a>
      )}
    </div>
  </div>

  <b className="vsBadge">VS</b>

  <div className="compareProductCard">
    {product2Offer?.image_url && (
      <img src={product2Offer.image_url} alt={comparison.product2_name} />
    )}

    <h2>{comparison.product2_name}</h2>

    {product2Offer?.price && <strong>{product2Offer.price}</strong>}

    <div className="productActions">
      <Link href={`/search/${encodeURIComponent(comparison.product2_name || "")}`}>
        🔎 ابحث عنه
      </Link>

      {product2Offer?.id && (
        <a
          href={`/api/customer-offers/click/${product2Offer.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          🛒 ادخل للمنتج
        </a>
      )}
    </div>
  </div>
</div>
      </section>

      <section className="quickActions">
        <Link
          href={`/search/${encodeURIComponent(comparison.product1_name || "")}`}
        >
          🔎 ابحث عن {comparison.product1_name}
        </Link>

        <Link
          href={`/search/${encodeURIComponent(comparison.product2_name || "")}`}
        >
          🔎 ابحث عن {comparison.product2_name}
        </Link>

        <Link href="/customer-offers">🛍️ متجر العملاء</Link>
      </section>

      <article
        className="compareArticle"
        dangerouslySetInnerHTML={{ __html: comparison.content || "" }}
      />

    {relatedOffers.length > 0 && (
  <section className="relatedOffers">
    <div className="sectionHead">
      <h2>عروض مرتبطة بالمقارنة</h2>
      <p>منتجات قريبة من نفس المقارنة ومتاحة داخل متجر عملاء BPS Chat.</p>
    </div>

    <div className="offersGrid">
      {relatedOffers.map((offer: any) => (
        <article className="offerCard" key={offer.id}>
          <div className="offerImage">
            {offer.image_url ? (
              <img src={offer.image_url} alt={offer.product_name} />
            ) : (
              <span>🛍️</span>
            )}
          </div>

          <div className="offerBody">
            <h3>{offer.product_name}</h3>
            <strong>{offer.price}</strong>
            <p>{offer.store_name || "متجر غير محدد"}</p>

            <a
              href={`/api/customer-offers/click/${offer.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              الذهاب للعرض
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
)}

<section className="storeCtaBox">
  <h2>🛍️ تصفح عروض ومنتجات BPS Chat</h2>
  <p>
    بعد قراءة المقارنة، تقدر تشوف أحدث عروض المتاجر في السعودية والإمارات
    ومصر والكويت وقطر والبحرين داخل متجر عملاء BPS Chat.
  </p>

  <div className="storeCtaActions">
    <Link href="/customer-offers">ادخل متجر العملاء</Link>
    <Link href="/customer-offers/add">أضف منتجك مجانًا</Link>
    <Link href="/">ابحث عن أفضل سعر</Link>
  </div>
</section>
        
      
{latestOffers.length > 0 && (
  <section className="latestOffers">
    <div className="sectionHead">
      <h2>أحدث المنتجات من كل الدول</h2>
      <p>
        منتجات وعروض حديثة من متاجر العملاء داخل BPS Chat.
      </p>
    </div>

    <div className="offersGrid">
      {latestOffers.map((offer: any) => (
        <article className="offerCard" key={offer.id}>
          <div className="offerImage">
            {offer.image_url ? (
              <img src={offer.image_url} alt={offer.product_name} />
            ) : (
              <span>🛍️</span>
            )}
          </div>

          <div className="offerBody">
            <h3>{offer.product_name}</h3>
            <strong>{offer.price}</strong>
            <p>
              {offer.store_name || "متجر غير محدد"} • {offer.country}
            </p>

            <a
              href={`/api/customer-offers/click/${offer.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ادخل المتجر
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
)}
      <section className="seoBoost">
        <SearchBeforeBuyBanner />
        <TrustedSourcesBar />
        <InternalLinksBoost />
        <PopularSearches />
      </section>

      <style>{styles}</style>
    </main>
  );
}

const styles = `
.comparePage {
  min-height: 100vh;
  padding: 42px 16px 80px;
  color: white;
  background:
    radial-gradient(circle at 18% 8%, rgba(34,197,94,.18), transparent 28%),
    radial-gradient(circle at 80% 18%, rgba(37,99,235,.20), transparent 30%),
    linear-gradient(180deg, #151515 0%, #202020 55%, #0f0f0f 100%);
}

.compareHero {
  max-width: 1050px;
  margin: 0 auto 22px;
  text-align: center;
  padding: 42px 20px;
  border-radius: 32px;
  background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.09);
  box-shadow: 0 25px 80px rgba(0,0,0,.35);
}
.storeCtaBox {
  max-width: 1050px;
  margin: 0 auto 26px;
  padding: 28px;
  text-align: center;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(34,197,94,.18), rgba(37,99,235,.14));
  border: 1px solid rgba(34,197,94,.35);
  box-shadow: 0 0 45px rgba(34,197,94,.15);
}
.compareProductsBox {
  margin-top: 26px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: stretch;
}

.compareProductCard {
  padding: 16px;
  border-radius: 22px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  display: grid;
  gap: 12px;
  align-content: start;
}

.compareProductCard img {
  width: 100%;
  height: 190px;
  object-fit: contain;
  background: white;
  border-radius: 18px;
  padding: 8px;
}

.compareProductCard h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 17px;
  line-height: 1.7;
}

.compareProductCard strong {
  color: #86efac;
  font-size: 22px;
  font-weight: 950;
}

.vsBadge {
  align-self: center;
  color: #86efac;
  font-size: 24px;
  font-weight: 950;
}

.productActions {
  display: grid;
  gap: 8px;
  margin-top: 4px;
}

.productActions a {
  display: block;
  text-align: center;
  text-decoration: none;
  color: white;
  padding: 11px 14px;
  border-radius: 999px;
  font-weight: 940;
  background: linear-gradient(135deg, #16a34a, #2563eb);
}

@media (max-width: 900px) {
  .compareProductsBox {
    grid-template-columns: 1fr;
  }

  .vsBadge {
    text-align: center;
  }
}
.storeCtaBox h2 {
  margin: 0 0 10px;
  font-size: 32px;
  color: #bbf7d0;
}

.storeCtaBox p {
  max-width: 760px;
  margin: 0 auto 18px;
  color: #e5e7eb;
  line-height: 1.9;
}

.storeCtaActions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.storeCtaActions a {
  text-decoration: none;
  color: white;
  padding: 13px 20px;
  border-radius: 999px;
  font-weight: 950;
  background: linear-gradient(135deg, #16a34a, #2563eb);
}

.latestOffers {
  max-width: 1050px;
  margin: 0 auto 26px;
  padding: 24px;
  border-radius: 30px;
  background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.08);
}
.backLink {
  color: #bbf7d0;
  text-decoration: none;
  font-weight: 900;
}

.badge {
  display: inline-block;
  margin: 18px 0 14px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(34,197,94,.13);
  border: 1px solid rgba(34,197,94,.3);
  color: #bbf7d0;
  font-weight: 900;
}

.compareHero h1 {
  margin: 0;
  font-size: clamp(30px, 5vw, 54px);
  line-height: 1.35;
  font-weight: 950;
  background: linear-gradient(135deg, #fff, #86efac, #60a5fa);
  -webkit-background-clip: text;
  color: transparent;
}

.compareHero p {
  max-width: 800px;
  margin: 16px auto 0;
  color: #d1d5db;
  line-height: 1.9;
}

.compareNames {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: center;
}

.compareNames span {
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  color: #f8fafc;
  font-weight: 900;
  line-height: 1.6;
}

.compareNames b {
  color: #86efac;
  font-size: 22px;
}

.quickActions {
  max-width: 1050px;
  margin: 0 auto 22px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.quickActions a {
  text-decoration: none;
  color: white;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 950;
  background: linear-gradient(135deg, #16a34a, #2563eb);
  box-shadow: 0 0 25px rgba(34,197,94,.22);
}

.compareArticle {
  max-width: 1050px;
  margin: 0 auto 26px;
  padding: 30px;
  border-radius: 30px;
  background: rgba(255,255,255,.055);
  border: 1px solid rgba(255,255,255,.09);
  box-shadow: 0 20px 60px rgba(0,0,0,.3);
  color: #f3f4f6;
  line-height: 2.05;
  font-size: 17px;
}

.compareArticle h2 {
  margin: 34px 0 14px;
  color: #86efac;
  font-size: 28px;
  line-height: 1.4;
}

.compareArticle h2:first-child {
  margin-top: 0;
}

.compareArticle p {
  margin: 0 0 16px;
  color: #e5e7eb;
}

.compareArticle ul,
.compareArticle ol {
  padding-right: 22px;
  margin: 14px 0 20px;
}

.compareArticle li {
  margin-bottom: 10px;
}

.compareArticle table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  overflow: hidden;
  border-radius: 16px;
}

.compareArticle th,
.compareArticle td {
  border: 1px solid rgba(255,255,255,.12);
  padding: 12px;
  text-align: right;
}

.compareArticle th {
  background: rgba(34,197,94,.18);
  color: #bbf7d0;
}

.relatedOffers {
  max-width: 1050px;
  margin: 0 auto 26px;
  padding: 24px;
  border-radius: 30px;
  background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.08);
}

.sectionHead {
  text-align: center;
  margin-bottom: 20px;
}

.sectionHead h2 {
  margin: 0 0 8px;
  color: #bbf7d0;
  font-size: 30px;
}

.sectionHead p {
  margin: 0;
  color: #cbd5e1;
}

.offersGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.offerCard {
  overflow: hidden;
  border-radius: 22px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.09);
}

.offerImage {
  height: 170px;
  background: white;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.offerImage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.offerImage span {
  font-size: 42px;
}

.offerBody {
  padding: 14px;
}

.offerBody h3 {
  margin: 0 0 10px;
  line-height: 1.55;
  font-size: 14px;
  min-height: 64px;
}

.offerBody strong {
  display: block;
  color: #86efac;
  margin-bottom: 7px;
  font-size: 17px;
}

.offerBody p {
  margin: 0 0 12px;
  color: #cbd5e1;
  font-size: 13px;
}

.offerBody a {
  display: block;
  text-align: center;
  text-decoration: none;
  color: white;
  padding: 11px;
  border-radius: 999px;
  font-weight: 950;
  background: linear-gradient(135deg, #16a34a, #2563eb);
}

.seoBoost {
  max-width: 1050px;
  margin: 0 auto;
  display: grid;
  gap: 18px;
}

@media (max-width: 900px) {
  .compareNames {
    grid-template-columns: 1fr;
  }

  .offersGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .compareArticle {
    padding: 22px;
  }
}

@media (max-width: 560px) {
  .comparePage {
    padding: 26px 12px 60px;
  }

  .offersGrid {
    grid-template-columns: 1fr;
  }

  .compareArticle {
    font-size: 16px;
    border-radius: 22px;
  }

  .compareArticle h2 {
    font-size: 24px;
  }
}
`;