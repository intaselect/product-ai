import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import MarketPromoSection from "@/app/components/MarketPromoSection";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import ComparePricesSection from "@/app/components/ComparePricesSection";

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
  const country = offer.country || "sa";

  if (category.length > 0) {
    const { data } = await supabase
      .from("customer_offers")
      .select("id, product_name, price, image_url, store_name, country, category")
      .eq("status", "approved")
      .eq("country", country)
      .neq("id", offer.id)
      .overlaps("category", category)
      .limit(6);

    if (data && data.length > 0) return data;
  }

  const { data } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, store_name, country, category")
    .eq("status", "approved")
    .eq("country", country)
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
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${offer.product_name} | BPS Chat بي بي اس شات`,
      description: `أفضل عرض ${offer.product_name} في ${country} بسعر ${offer.price} ${currency}.`,
      url: pageUrl,
      images: offer.image_url
        ? [
            {
              url: offer.image_url,
              width: 1200,
              height: 630,
            },
          ]
        : [],
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

  const galleryImages = Array.isArray(offer.gallery_images)
    ? offer.gallery_images.filter(Boolean)
    : [];

  const productImages = [
    offer.image_url,
    ...galleryImages,
    offer.image_url_2,
    offer.image_url_3,
  ].filter(Boolean);

  const productFeatures = Array.isArray(offer.features)
    ? offer.features.filter(Boolean)
    : [];

  const productSpecs =
    offer.specifications && typeof offer.specifications === "object"
      ? Object.entries(offer.specifications).filter(([key, value]) => key && value)
      : [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: offer.product_name,

    image: productImages.length > 0 ? productImages : [offer.image_url].filter(Boolean),

    description:
      offer.description ||
      `أفضل سعر ${offer.product_name} في ${country} عبر BPS Chat بي بي اس شات بسعر ${offer.price} ${currency}.`,

    brand: {
      "@type": "Brand",
      name: offer.source_brand || offer.store_name || "BPS Chat Customer Offer",
    },

    seller: {
      "@type": "Organization",
      name: offer.store_name || "BPS Chat",
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.4",
      reviewCount: "87",
    },

    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: currencyCode,
      price: cleanPrice(offer.price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
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
        name: "عروض العملاء",
        item: `${SITE_URL}/customer-offers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: offer.product_name,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `ما هو سعر ${offer.product_name} في ${country}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `السعر المعروض لمنتج ${offer.product_name} هو ${offer.price} ${currency}، وقد يختلف السعر النهائي حسب المتجر والتوفر والشحن.`,
        },
      },
      {
        "@type": "Question",
        name: `أين أشتري ${offer.product_name} في ${country}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `يمكنك الضغط على زر عرض المنتج داخل صفحة BPS Chat للانتقال إلى رابط الشراء المباشر من ${offer.store_name || "البائع"}.`,
        },
      },
      {
        "@type": "Question",
        name: `هل عرض ${offer.product_name} موثوق؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `هذا العرض يظهر ضمن عروض العملاء في BPS Chat بعد المراجعة، لكن يجب دائمًا مراجعة السعر النهائي والتوفر وسياسة الشحن داخل موقع البائع قبل الشراء.`,
        },
      },
    ],
  };

  return (
    <main className="seoProductPage" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

      <SearchBeforeBuyBanner />

      <section className="premiumProductBox">
        <div className="premiumImageBox">
          <img src={offer.image_url} alt={offer.product_name} />
          <span className="imageBadge">🔥 عرض مميز</span>

          {productImages.length > 1 && (
            <div className="productGalleryMini">
              {productImages.slice(0, 5).map((image: string, index: number) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${offer.product_name} صورة ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="premiumDetailsBox">
          <span className="premiumCountryBadge">🌍 {country}</span>

          <h2>{offer.product_name}</h2>

          <div className="premiumPriceBox">
            <strong>{offer.price}</strong>
            <span>{currency}</span>
          </div>

          <div className="premiumMetaGrid">
            <div>
              <small>المتجر</small>
              <b>{offer.store_name || "عرض عميل BPS Chat"}</b>
            </div>

            <div>
              <small>الدولة</small>
              <b>{country}</b>
            </div>

            {offer.source_brand && (
              <div>
                <small>العلامة التجارية</small>
                <b>{offer.source_brand}</b>
              </div>
            )}
          </div>

          <a
            href={`/api/customer-offers/click/${offer.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="premiumBuyBtn"
          >
            🔥 عرض المنتج الآن
          </a>

          <Link href="/customer-offers" className="premiumBackBtn">
            مشاهدة باقي عروض العملاء
          </Link>

          <div className="premiumShareBox">
            <h3>📢 شارك المنتج</h3>

            <div className="premiumShareButtons">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${offer.product_name} - ${pageUrl}`
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
                  pageUrl
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
                  pageUrl
                )}&text=${encodeURIComponent(offer.product_name)}`}
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
        </div>
      </section>

      <MarketPromoSection />

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

        <p>
          يمكنك أيضًا معرفة المزيد عن الأسعار من خلال:
          <a
            href={`/search/${offer.product_name}-${offer.country}`}
            style={{ color: "#22c55e", marginRight: "6px" }}
          >
            مقارنة أسعار {offer.product_name} في {country}
          </a>
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

        {offer.description && (
          <>
            <h2>وصف {offer.product_name}</h2>
            <p>{offer.description}</p>
          </>
        )}

        {productFeatures.length > 0 && (
          <>
            <h2>مميزات {offer.product_name}</h2>
            <ul className="featuresList">
              {productFeatures.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {productSpecs.length > 0 && (
          <>
            <h2>مواصفات {offer.product_name}</h2>
            <div className="specsTable">
              {productSpecs.map(([key, value]: any) => (
                <div key={key}>
                  <strong>{key}</strong>
                  <span>{String(value)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <h2>قبل شراء {offer.product_name}</h2>
        <ul>
          <li>راجع السعر النهائي داخل موقع البائع قبل إتمام الشراء.</li>
          <li>تأكد من حالة المنتج، الضمان، وتكلفة الشحن.</li>
          <li>قارن العرض مع منتجات مشابهة داخل BPS Chat قبل اتخاذ القرار.</li>
          <li>تأكد أن رابط المنتج والمتجر مناسبين لك قبل الدفع.</li>
        </ul>

        <h2>معلومات عن عرض {offer.product_name}</h2>

        <p>
          صفحة <strong>{offer.product_name}</strong> على BPS Chat مصممة لمساعدة
          المستخدمين في الوصول إلى سعر واضح ورابط مباشر للمنتج داخل {country}.
          يظهر هذا العرض ضمن قسم عروض العملاء في <strong>بي بي اس شات</strong>{" "}
          حتى يتمكن الزوار من اكتشاف منتجات وأسعار من متاجر وبائعين مختلفين.
        </p>

        <p>
          عند البحث عن <strong>سعر {offer.product_name} في {country}</strong> قد
          تجد اختلافًا بين المتاجر حسب حالة المنتج، التوفر، الضمان، الشحن،
          والعروض الحالية. لذلك ننصح دائمًا بمراجعة تفاصيل المنتج داخل موقع
          البائع قبل إتمام الشراء.
        </p>

        <h2>كلمات بحث مرتبطة بـ {offer.product_name}</h2>

        <p>
          سعر {offer.product_name} في {country} - شراء {offer.product_name}{" "}
          أونلاين - أفضل عرض {offer.product_name} - أرخص سعر{" "}
          {offer.product_name} - عروض {offer.product_name} في {country} -{" "}
          {offer.product_name} من {offer.store_name || "متجر موثوق"} - مقارنة
          سعر {offer.product_name} عبر BPS Chat - بي بي اس شات.
        </p>

        <h2>أسئلة شائعة عن {offer.product_name}</h2>

        <div className="faqBox">
          <div>
            <h3>هل السعر المعروض نهائي؟</h3>
            <p>
              السعر المعروض هو السعر الذي أضافه البائع، وقد يختلف السعر النهائي
              حسب الشحن أو التوفر أو تحديثات المتجر.
            </p>
          </div>

          <div>
            <h3>هل يمكن مقارنة هذا المنتج مع منتجات أخرى؟</h3>
            <p>
              نعم، يمكنك الرجوع إلى صفحة عروض العملاء أو استخدام بحث BPS Chat
              لمقارنة منتجات وأسعار أخرى في {country}.
            </p>
          </div>

          <div>
            <h3>هل BPS Chat يبيع المنتج مباشرة؟</h3>
            <p>
              لا، BPS Chat يساعدك على الوصول للعرض ورابط المنتج، والشراء يتم من
              خلال البائع أو المتجر صاحب الرابط.
            </p>
          </div>
        </div>

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
<ComparePricesSection />
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

        .faqBox {
          display: grid;
          gap: 14px;
          margin-top: 18px;
        }

        .faqBox div {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 18px;
        }

        .faqBox h3 {
          margin: 0 0 8px;
          color: #fff;
        }

        .premiumProductBox {
          max-width: 1120px;
          margin: 18px auto 0;
          padding: 22px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
          border-radius: 34px;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #dbeafe;
          box-shadow:
            0 24px 70px rgba(15,23,42,0.16),
            0 0 0 6px rgba(34,197,94,0.04);
        }

        .premiumImageBox {
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

        .premiumImageBox img {
          max-width: 100%;
          max-height: 390px;
          object-fit: contain;
          transition: transform .3s ease;
        }

        .premiumImageBox:hover img {
          transform: scale(1.05);
        }

        .imageBadge {
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

        .premiumDetailsBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px;
          color: #111827;
        }

        .premiumCountryBadge {
          width: fit-content;
          padding: 8px 14px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-weight: 950;
          margin-bottom: 14px;
        }

        .premiumDetailsBox h2 {
          margin: 0 0 18px;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.45;
          color: #111827;
          font-weight: 950;
        }

        .premiumPriceBox {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .premiumPriceBox strong {
          color: #16a34a;
          font-size: 44px;
          font-weight: 950;
        }

        .premiumPriceBox span {
          padding: 7px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff;
          font-size: 12px;
          font-weight: 950;
        }

        .premiumMetaGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .premiumMetaGrid div {
          padding: 16px;
          border-radius: 20px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .premiumMetaGrid small {
          display: block;
          color: #64748b;
          margin-bottom: 6px;
          font-weight: 900;
        }

        .premiumMetaGrid b {
          color: #111827;
          word-break: break-word;
        }

        .premiumBuyBtn,
        .premiumBackBtn {
          display: block;
          text-align: center;
          text-decoration: none;
          font-weight: 950;
          border-radius: 16px;
          padding: 15px 18px;
          transition: all .25s ease;
        }

        .premiumBuyBtn {
          background: linear-gradient(135deg, #16a34a, #2563eb);
          color: #fff;
          box-shadow: 0 14px 32px rgba(37,99,235,0.24);
          margin-bottom: 12px;
        }

        .premiumBuyBtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 44px rgba(37,99,235,0.35);
        }

        .premiumBackBtn {
          background: #111827;
          color: #fff;
        }

        .premiumBackBtn:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }

        @media (max-width: 850px) {
          .premiumProductBox {
            grid-template-columns: 1fr;
            margin: 14px 12px 0;
            padding: 16px;
            border-radius: 26px;
          }

          .premiumImageBox {
            min-height: 300px;
          }

          .premiumImageBox img {
            max-height: 280px;
          }

          .premiumMetaGrid {
            grid-template-columns: 1fr;
          }

          .premiumPriceBox {
            flex-wrap: wrap;
          }

          .premiumPriceBox strong {
            font-size: 34px;
          }
        }

        .premiumShareBox {
          margin-top: 18px;
          padding: 18px;
          border-radius: 22px;
          background:
            radial-gradient(circle at 15% 20%, rgba(37,99,235,.08), transparent 30%),
            linear-gradient(135deg,#ffffff,#f8fafc);
          border: 1px solid #dbeafe;
          box-shadow:
            0 12px 35px rgba(15,23,42,.08),
            0 0 0 4px rgba(34,197,94,.03);
        }

        .premiumShareBox h3 {
          margin: 0 0 14px;
          color: #111827;
          font-size: 18px;
          font-weight: 950;
        }

        .premiumShareButtons {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 12px;
        }

        .premiumShareBtn {
          text-decoration: none;
          color: #111827;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all .25s ease;
          box-shadow: 0 8px 22px rgba(15,23,42,.05);
        }

        .premiumShareBtn:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 36px rgba(15,23,42,.12);
        }

        .premiumShareBtn span {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          font-weight: 900;
        }

        .premiumShareBtn strong {
          display: block;
          font-size: 14px;
          font-weight: 950;
        }

        .premiumShareBtn small {
          color: #64748b;
          font-size: 12px;
          font-weight: 800;
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

        @media (max-width: 700px) {
          .premiumShareButtons {
            grid-template-columns: 1fr;
          }
        }

        .productGalleryMini {
          position: absolute;
          left: 16px;
          bottom: 16px;
          display: flex;
          gap: 8px;
          max-width: calc(100% - 32px);
          overflow-x: auto;
        }

        .productGalleryMini img {
          width: 58px;
          height: 58px;
          object-fit: contain;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 4px;
        }

        .featuresList {
          display: grid;
          gap: 10px;
          padding-right: 22px;
        }

        .featuresList li {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 10px 14px;
        }

        .specsTable {
          display: grid;
          gap: 10px;
          margin-top: 16px;
        }

        .specsTable div {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 12px;
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 12px 14px;
        }

        .specsTable strong {
          color: #7fffe0;
        }

        .specsTable span {
          color: #e8e8e8;
        }

        @media (max-width: 700px) {
          .specsTable div {
            grid-template-columns: 1fr;
          }

          .productGalleryMini {
            position: static;
            margin-top: 12px;
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
}