import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

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

const currencyCodes: Record<string, string> = {
  sa: "SAR",
  ae: "AED",
  kw: "KWD",
  qa: "QAR",
  bh: "BHD",
  eg: "EGP",
};

function getIdFromSlug(slug: string) {
  const parts = slug.split("-");
  const id = Number(parts[parts.length - 1]);
  return Number.isFinite(id) ? id : null;
}

function cleanPrice(price: string) {
  const number = String(price || "").replace(/[^\d.]/g, "");
  return number || "0";
}

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function offerSeoUrl(offer: any) {
  return `/customer-offers/product/bps-chat-${slugify(
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

async function getRelatedOffers(offer: any) {
  const category = Array.isArray(offer.category) ? offer.category : [];

  if (category.length > 0) {
    const { data } = await supabase
      .from("customer_offers")
      .select("id, product_name, price, image_url, store_name, country, category")
      .eq("status", "approved")
      .neq("id", offer.id)
      .overlaps("category", category)
      .limit(6);

    if (data && data.length > 0) return data;
  }

  const { data } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, store_name, country, category")
    .eq("status", "approved")
    .eq("country", offer.country || "sa")
    .neq("id", offer.id)
    .limit(6);

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
    return {
      title: "عرض غير موجود | BPS Chat",
    };
  }

  const country = countryNames[offer.country || ""] || "السوق العربي";
  const currency = currencies[offer.country || ""] || "";
  const pageUrl = `${SITE_URL}/customer-offers/product/${slug}`;

  return {
    title: `${offer.product_name} | أفضل سعر في ${country} | BPS Chat بي بي اس شات`,
    description: `أفضل سعر ${offer.product_name} في ${country} عبر BPS Chat (بي بي اس شات). شاهد العرض بسعر ${offer.price} ${currency} من ${
      offer.store_name || "متجر موثوق"
    } مع رابط شراء مباشر.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${offer.product_name} | BPS Chat بي بي اس شات`,
      description: `أفضل عرض ${offer.product_name} في ${country} بسعر ${offer.price} ${currency}.`,
      url: pageUrl,
      images: offer.image_url ? [offer.image_url] : [],
      type: "website",
    },
  };
}

export default async function ProductSeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = await getOffer(slug);

  if (!offer) notFound();

  const relatedOffers = await getRelatedOffers(offer);

  const country = countryNames[offer.country || ""] || "غير محدد";
  const currency = currencies[offer.country || ""] || "";
  const currencyCode = currencyCodes[offer.country || ""] || "USD";
  const pageUrl = `${SITE_URL}/customer-offers/product/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: offer.product_name,
    image: [offer.image_url, offer.image_url_2, offer.image_url_3].filter(
      Boolean
    ),
    description: `أفضل سعر ${offer.product_name} في ${country} عبر BPS Chat بي بي اس شات بسعر ${offer.price} ${currency}.`,
    brand: {
      "@type": "Brand",
      name: offer.store_name || "BPS Chat Customer Offer",
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: currencyCode,
      price: cleanPrice(offer.price),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="seoProductPage" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="hero">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          {offer.product_name}
          <span>أفضل سعر عبر BPS Chat (بي بي اس شات) في {country}</span>
        </h1>

        <p>
          يعرض لك <strong>BPS Chat (بي بي اس شات)</strong> أفضل سعر لمنتج{" "}
          <strong>{offer.product_name}</strong> في {country} مع رابط مباشر من
          البائع. يمكنك من خلال <strong>بي بي اس شات</strong> مقارنة الأسعار
          والوصول لأفضل العروض بسهولة.
        </p>
      </section>

      <section className="productBox">
        <div className="imageBox">
          <img src={offer.image_url} alt={offer.product_name} />
        </div>

        <div className="detailsBox">
          <span className="countryBadge">🌍 {country}</span>

          <h2>{offer.product_name}</h2>

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
            className="buyBtn"
          >
            🔥 عرض المنتج الآن
          </a>

          <Link href="/customer-offers" className="backBtn">
            مشاهدة باقي عروض العملاء
          </Link>
        </div>
      </section>

      <section className="content">
        <h2>أفضل سعر {offer.product_name} في {country}</h2>

        <p>
          يعتبر موقع <strong>BPS Chat</strong> من أفضل المواقع لمقارنة أسعار
          المنتجات في السعودية والإمارات ومصر، حيث يوفر لك{" "}
          <strong>بي بي اس شات</strong> عروض حقيقية من المتاجر والعملاء مع
          روابط مباشرة للشراء.
        </p>

        <p>
          إذا كنت تبحث عن <strong>{offer.product_name}</strong> في {country}،
          فهذه الصفحة تساعدك على الوصول إلى عرض مباشر من{" "}
          <strong>{offer.store_name || "أحد عملاء بي بي اس شات"}</strong> بسعر{" "}
          <strong>
            {offer.price} {currency}
          </strong>
          .
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>سعر واضح</h3>
            <p>
              السعر المعروض هو السعر الذي أضافه البائع، ويمكنك زيارة رابط المنتج
              للتأكد من السعر النهائي والتوفر والشحن.
            </p>
          </div>

          <div className="infoCard">
            <h3>رابط مباشر</h3>
            <p>
              اضغط على زر عرض المنتج للانتقال مباشرة إلى صفحة الشراء أو صفحة
              المنتج الأصلية التي أضافها البائع.
            </p>
          </div>

          <div className="infoCard">
            <h3>ضمن عروض BPS Chat</h3>
            <p>
              يظهر هذا المنتج ضمن متجر عروض العملاء في بي بي اس شات بعد
              المراجعة للمساعدة في عرض منتجات وأسعار مميزة.
            </p>
          </div>
        </div>

        <h2>قبل شراء {offer.product_name}</h2>
        <ul>
          <li>راجع السعر النهائي داخل موقع البائع قبل إتمام الشراء.</li>
          <li>تأكد من حالة المنتج، الضمان، وتكلفة الشحن.</li>
          <li>قارن العرض مع منتجات مشابهة داخل BPS Chat قبل اتخاذ القرار.</li>
          <li>تأكد أن رابط المنتج والمتجر مناسبين لك قبل الدفع.</li>
        </ul>

        {relatedOffers.length > 0 && (
          <>
            <h2>منتجات مشابهة قد تهمك</h2>

            <div className="relatedGrid">
              {relatedOffers.map((item: any) => {
                const itemCountry = countryNames[item.country || ""] || "";
                const itemCurrency = currencies[item.country || ""] || "";

                return (
                  <Link
                    key={item.id}
                    href={offerSeoUrl(item)}
                    className="relatedCard"
                  >
                    <div className="relatedImage">
                      <img src={item.image_url} alt={item.product_name} />
                    </div>

                    <div className="relatedContent">
                      <small>{itemCountry}</small>
                      <h3>{item.product_name}</h3>
                      <strong>
                        {item.price} {itemCurrency}
                      </strong>
                      <span>{item.store_name || "عرض عميل BPS Chat"}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        <h2>روابط مفيدة داخل BPS Chat</h2>
        <div className="quickLinks">
          <Link href="/customer-offers">أفضل عروض العملاء</Link>
          <Link href="/">البحث عن منتج</Link>
          <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/deals">العروض والخصومات</Link>
        </div>

        <div className="finalCta">
          <h2>هل تريد مقارنة منتجات أكثر؟</h2>
          <p>
            استخدم BPS Chat للبحث عن أفضل الأسعار والعروض في السعودية،
            الإمارات، الكويت، قطر، البحرين ومصر.
          </p>

          <h2>عن BPS Chat</h2>

          <p>
            موقع <strong>BPS Chat (بي بي اس شات)</strong> هو محرك بحث متخصص في
            مقارنة أسعار المنتجات في الدول العربية مثل السعودية، الإمارات،
            الكويت، قطر، البحرين ومصر. يساعدك الموقع في العثور على أفضل سعر لأي
            منتج بسهولة وسرعة.
          </p>

          <Link href="/" className="primaryBtn">
            ابحث في BPS Chat
          </Link>
        </div>
      </section>

      <style>{`
        .seoProductPage {
          color: white;
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
            #0b0f14;
          padding-bottom: 60px;
        }

        .hero {
          max-width: 980px;
          margin: 0 auto;
          padding: 54px 18px 24px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          background: rgba(16, 163, 127, 0.14);
          border: 1px solid rgba(16, 163, 127, 0.35);
          color: #7fffe0;
          padding: 8px 16px;
          border-radius: 999px;
          margin-bottom: 18px;
          font-weight: 800;
        }

        h1 {
          font-size: 42px;
          line-height: 1.35;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: 21px;
          color: #cfcfcf;
          margin-top: 8px;
        }

        .hero p {
          max-width: 800px;
          margin: 0 auto;
          color: #e8e8e8;
          font-size: 18px;
          line-height: 2;
        }

        .productBox {
          max-width: 980px;
          margin: 10px auto 0;
          padding: 18px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          border-radius: 26px;
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 0 35px rgba(16,163,127,0.1);
        }

        .imageBox {
          min-height: 390px;
          border-radius: 22px;
          background:
            radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 60%),
            #0f0f0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .imageBox img {
          max-width: 100%;
          max-height: 360px;
          object-fit: contain;
        }

        .detailsBox {
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .countryBadge {
          width: fit-content;
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(16,163,127,0.13);
          border: 1px solid rgba(16,163,127,0.32);
          color: #7fffe0;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .detailsBox h2 {
          margin: 0 0 16px;
          font-size: 26px;
          line-height: 1.55;
          color: #fff;
        }

        .priceBox {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .priceBox strong {
          font-size: 36px;
          color: #22c55e;
          font-weight: 950;
        }

        .priceBox span {
          padding: 5px 10px;
          border-radius: 999px;
          color: #bbf7d0;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.25);
          font-weight: 900;
        }

        .metaGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 18px;
        }

        .metaGrid div {
          padding: 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .metaGrid small {
          display: block;
          color: #9ca3af;
          margin-bottom: 5px;
          font-weight: 800;
        }

        .metaGrid b {
          color: #e8e8e8;
          word-break: break-word;
        }

        .buyBtn,
        .backBtn,
        .primaryBtn {
          display: block;
          text-align: center;
          text-decoration: none;
          font-weight: 950;
          border-radius: 14px;
          padding: 13px 16px;
          transition: all .25s ease;
        }

        .buyBtn {
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: #fff;
          box-shadow: 0 0 28px rgba(34,197,94,0.25);
          margin-bottom: 10px;
        }

        .buyBtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 40px rgba(34,197,94,0.45);
        }

        .backBtn {
          background: #2f2f2f;
          color: #fff;
          border: 1px solid #444;
        }

        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 26px 18px 50px;
          line-height: 2;
        }

        .content h2 {
          margin-top: 38px;
          font-size: 26px;
          color: #10a37f;
        }

        .content p,
        .content li {
          font-size: 17px;
          color: #e8e8e8;
        }

        ul {
          padding-right: 22px;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .infoCard {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .infoCard h3 {
          font-size: 20px;
          margin: 0 0 10px;
        }

        .relatedGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .relatedCard {
          overflow: hidden;
          border-radius: 20px;
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          text-decoration: none;
          color: white;
          transition: all .25s ease;
        }

        .relatedCard:hover {
          transform: translateY(-5px);
          border-color: rgba(16,163,127,0.5);
          box-shadow: 0 0 30px rgba(16,163,127,0.16);
        }

        .relatedImage {
          height: 170px;
          background: #0f0f0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }

        .relatedImage img {
          max-width: 100%;
          max-height: 145px;
          object-fit: contain;
        }

        .relatedContent {
          padding: 14px;
        }

        .relatedContent small {
          color: #7fffe0;
          font-weight: 900;
        }

        .relatedContent h3 {
          font-size: 15px;
          line-height: 1.6;
          min-height: 48px;
          margin: 8px 0;
        }

        .relatedContent strong {
          display: block;
          color: #22c55e;
          font-size: 18px;
          margin-bottom: 5px;
        }

        .relatedContent span {
          color: #cfcfcf;
          font-size: 12px;
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .quickLinks a {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 800;
        }

        .quickLinks a:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        .finalCta {
          margin-top: 38px;
          text-align: center;
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 0 30px rgba(16,163,127,0.12);
        }

        .finalCta p {
          max-width: 720px;
          margin: 0 auto 22px;
        }

        .primaryBtn {
          display: inline-block;
          background: #10a37f;
          color: #fff;
        }

        @media (max-width: 850px) {
          .productBox {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 31px;
          }

          h1 span {
            font-size: 18px;
          }

          .cardsGrid,
          .relatedGrid {
            grid-template-columns: 1fr;
          }

          .imageBox {
            min-height: 280px;
          }

          .imageBox img {
            max-height: 260px;
          }
        }

        @media (max-width: 520px) {
          .metaGrid {
            grid-template-columns: 1fr;
          }

          .priceBox {
            flex-wrap: wrap;
          }

          .priceBox strong {
            font-size: 30px;
          }
        }
      `}</style>
    </main>
  );
}