import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import { fetchRealProducts } from "@/lib/fetchRealProducts";
import MarketPromoSection from "@/app/components/MarketPromoSection";
export const dynamic = "force-dynamic";

export const revalidate = 300;

export const metadata: Metadata = {
  title:
    "أفضل الموبايلات 2026 | قارن أسعار الهواتف في السعودية ومصر والخليج | BPS Chat",
  description:
    "دليل أفضل الموبايلات 2026 من BPS Chat بي بي اس شات: iPhone وSamsung Galaxy وXiaomi وOppo وHonor مع مقارنة أسعار السعودية ومصر والإمارات والكويت وقطر والبحرين.",
  keywords: [
    "أفضل الموبايلات 2026",
    "أفضل هاتف 2026",
    "أفضل جوال 2026",
    "best smartphones 2026",
    "best phones 2026",
    "سعر ايفون 17",
    "سعر Samsung S26 Ultra",
    "سعر Samsung S26",
    "مقارنة أسعار الموبايلات",
    "عروض الموبايلات",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

const countries = [
  {
    name: "السعودية",
    code: "sa",
    currency: "ريال سعودي",
    stores: ["Amazon.sa", "Noon Saudi", "Jarir", "Extra", "Carrefour Saudi", "Lulu Saudi"],
  },
  {
    name: "مصر",
    code: "eg",
    currency: "جنيه مصري",
    stores: ["Amazon.eg", "Noon Egypt", "Jumia Egypt", "B.TECH", "Raya", "2B Egypt"],
  },
  {
    name: "الإمارات",
    code: "ae",
    currency: "درهم إماراتي",
    stores: ["Amazon.ae", "Noon UAE", "Carrefour UAE", "Sharaf DG", "Jumbo", "Lulu UAE"],
  },
  {
    name: "الكويت",
    code: "kw",
    currency: "دينار كويتي",
    stores: ["Xcite Kuwait", "Best Al-Yousifi", "Noon Kuwait", "Lulu Kuwait", "Carrefour Kuwait", "Jarir Kuwait"],
  },
  {
    name: "قطر",
    code: "qa",
    currency: "ريال قطري",
    stores: ["Carrefour Qatar", "Lulu Qatar", "Noon Qatar", "Jarir Qatar", "Al Anees Qatar", "Starlink Qatar"],
  },
  {
    name: "البحرين",
    code: "bh",
    currency: "دينار بحريني",
    stores: ["Sharaf DG Bahrain", "eXtra Bahrain", "Lulu Bahrain", "Carrefour Bahrain", "Noon Bahrain", "Virgin Megastore Bahrain"],
  },
];

const phoneGroups = [
  {
    title: "أفضل هواتف فلاجشيب 2026",
    phones: ["iPhone 17 Pro Max", "iPhone 17 Pro", "Samsung Galaxy S26 Ultra", "Samsung Galaxy S26"],
    desc: "لمن يريد أقوى أداء وكاميرا وشاشة وتجربة استخدام ممتازة.",
  },
  {
    title: "أفضل هواتف بسعر مقابل قيمة",
    phones: ["iPhone 16 Pro Max", "Samsung Galaxy S25 Ultra", "Xiaomi 15 Ultra", "Honor Magic 7 Pro"],
    desc: "اختيارات قوية لمن يريد هاتف ممتاز بسعر أقل من أحدث إصدار.",
  },
  {
    title: "أفضل هواتف أندرويد 2026",
    phones: ["Samsung Galaxy S26 Ultra", "Samsung Galaxy S26", "Xiaomi 15 Ultra", "Oppo Find X8 Pro", "OnePlus 13"],
    desc: "هواتف أندرويد قوية للمقارنة بين سامسونج وشاومي وأوبو وون بلس.",
  },
  {
    title: "أفضل هواتف Apple",
    phones: ["iPhone 17 Pro Max", "iPhone 17", "iPhone 16 Pro Max", "iPhone 16"],
    desc: "اختيارات Apple الأكثر بحثًا في السعودية ومصر والإمارات والخليج.",
  },
];

const strongKeywords = [
  "أفضل موبايل 2026",
  "أفضل جوال 2026",
  "أفضل هاتف للتصوير",
  "أفضل هاتف للألعاب",
  "أفضل هاتف بطارية",
  "أفضل موبايل فئة عليا",
  "أفضل موبايل بسعر مناسب",
  "عروض الموبايلات",
  "أسعار الموبايلات اليوم",
  "مقارنة أسعار الموبايلات",
  "best phone 2026",
  "best smartphone 2026",
];

const internalLinks = [
  { label: "أسعار iPhone 16 و iPhone 17", href: "/products/iphone-16-17" },
  { label: "أسعار Samsung S26", href: "/products/samsung-s26" },
  { label: "أسعار Apple AirPods", href: "/products/apple-airpods" },
  { label: "مقارنة أسعار iPhone", href: "/iphone-price-comparison" },
  { label: "مقارنة أسعار Samsung", href: "/samsung-price-comparison" },
  { label: "دليل الماركات", href: "/brands" },
  { label: "دليل الأقسام والمنتجات", href: "/categories" },
  { label: "دليل المتاجر", href: "/stores" },
  { label: "العروض والخصومات", href: "/deals" },
  { label: "أفضل سعر أونلاين", href: "/best-price-online" },
  { label: "أرخص المنتجات", href: "/cheapest-products" },
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

function getStoreName(product: any) {
  const raw = String(product.source || product.store || product.merchant || "");
  const url = String(product.url || product.link || "");
  const text = `${raw} ${url}`.toLowerCase();

  if (text.includes("amazon")) return "Amazon";
  if (text.includes("noon")) return "Noon";
  if (text.includes("jumia")) return "Jumia";
  if (text.includes("jarir")) return "Jarir";
  if (text.includes("extra")) return "Extra";
  if (text.includes("carrefour")) return "Carrefour";
  if (text.includes("xcite")) return "Xcite";
  if (text.includes("sharaf")) return "Sharaf DG";
  if (text.includes("lulu")) return "Lulu";
  if (text.includes("btech")) return "B.TECH";
  if (text.includes("raya")) return "Raya";

  return raw || "متجر إلكتروني";
}

export default async function BestSmartphones2026Page() {
  const [iphone, samsung, xiaomi] = await Promise.all([
    fetchRealProducts("iPhone 17 Pro Max", "sa"),
    fetchRealProducts("Samsung Galaxy S26 Ultra", "sa"),
    fetchRealProducts("Xiaomi 15 Ultra", "sa"),
  ]);

  const products = [...(iphone || []), ...(samsung || []), ...(xiaomi || [])].slice(0, 24);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "أفضل الموبايلات 2026 | BPS Chat",
    description:
      "دليل مقارنة أفضل الموبايلات في 2026 وأسعار الهواتف في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
    publisher: {
      "@type": "Organization",
      name: "BPS Chat",
      alternateName: "بي بي اس شات",
      url: "https://www.bpschat.com",
    },
  };

  return (
    <main className="seoPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <div className="heroGrid">
          <div>
            <h1>
              أفضل الموبايلات 2026
              <span>
                قارن أسعار iPhone وSamsung وXiaomi وOppo وHonor في السعودية
                ومصر والإمارات والخليج
              </span>
            </h1>

            <p>
              صفحة <strong>أفضل الموبايلات 2026</strong> في{" "}
              <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> تساعدك
              تختار أفضل هاتف حسب السعر، الكاميرا، البطارية، الأداء، الألعاب
              والعروض. قارن أسعار iPhone 17 Pro Max وSamsung Galaxy S26 Ultra
              وSamsung Galaxy S26 وXiaomi وOppo وHonor في السعودية، مصر،
              الإمارات، الكويت، قطر والبحرين من متاجر مثل Amazon وNoon وJumia
              وJarir وExtra وCarrefour وXcite وSharaf DG.
            </p>

            <div className="ctaBox">
              <Link href={searchHref("iPhone 17 Pro Max", "sa")} className="primaryBtn">
                قارن iPhone 17 Pro Max
              </Link>
              <Link href={searchHref("Samsung Galaxy S26 Ultra", "sa")} className="secondaryBtn">
                قارن Samsung S26 Ultra
              </Link>
              <Link href="/products/iphone-16-17" className="secondaryBtn">
                Hub أسعار iPhone
              </Link>
              <Link href="/deals" className="secondaryBtn">
                عروض الموبايلات
              </Link>
            </div>
          </div>

          <div className="visualBox">
            <div className="phoneCard">
              <span>iPhone</span>
              <strong>17 / 16 Series</strong>
            </div>
            <div className="phoneCard glow">
              <span>Samsung</span>
              <strong>S26 / Ultra</strong>
            </div>
            <div className="phoneCard">
              <span>Android</span>
              <strong>Xiaomi / Oppo / Honor</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>اختيارات أفضل الموبايلات 2026</h2>

        {phoneGroups.map((group) => (
          <section key={group.title} className="groupBlock">
            <div className="groupHeader">
              <div>
                <h2>{group.title}</h2>
                <p>{group.desc}</p>
              </div>

              <Link href={searchHref(group.title, "sa")} className="countryBtn">
                ابحث في القسم
              </Link>
            </div>

            <div className="modelGrid">
              {group.phones.map((phone) => (
                <div key={`${group.title}-${phone}`} className="modelCard">
                  <h3>{phone}</h3>
                  <p>
                    قارن سعر {phone} في كل دولة، وشوف أفضل العروض والمتاجر قبل
                    الشراء.
                  </p>

                  <div className="quickLinks small">
                    {countries.map((country) => (
                      <Link key={`${phone}-${country.code}`} href={searchHref(phone, country.code)}>
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <h2>قارن أسعار أفضل الهواتف حسب الدولة</h2>

        {countries.map((country) => (
          <section key={country.code} className="countryBlock">
            <div className="countryHeader">
              <div>
                <h2>أفضل الموبايلات في {country.name}</h2>
                <p>
                  قارن أسعار أفضل الهواتف في {country.name} بالـ{" "}
                  {country.currency} واعرف أرخص سعر وأفضل عروض الموبايلات قبل
                  الشراء.
                </p>
              </div>

              <Link href={searchHref("أفضل موبايل 2026", country.code)} className="countryBtn">
                قارن في {country.name}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة في {country.name}:</strong>
              <span>{country.stores.join("، ")}</span>
            </div>

            <h3>روابط بحث قوية في {country.name}</h3>

            <div className="quickLinks">
              <Link href={searchHref("أفضل موبايل 2026", country.code)}>
                أفضل موبايل 2026 في {country.name}
              </Link>
              <Link href={searchHref("أفضل هاتف للتصوير", country.code)}>
                أفضل هاتف للتصوير في {country.name}
              </Link>
              <Link href={searchHref("أفضل هاتف للألعاب", country.code)}>
                أفضل هاتف للألعاب في {country.name}
              </Link>
              <Link href={searchHref("Samsung Galaxy S26 Ultra", country.code)}>
                Samsung S26 Ultra في {country.name}
              </Link>
              <Link href={searchHref("iPhone 17 Pro Max", country.code)}>
                iPhone 17 Pro Max في {country.name}
              </Link>
              <Link href={searchHref("عروض الموبايلات", country.code)}>
                عروض الموبايلات في {country.name}
              </Link>
            </div>

            <h3>بحث حسب المتجر في {country.name}</h3>

            <div className="storeGrid">
              {country.stores.map((store) => (
                <Link
                  key={`${country.code}-${store}`}
                  href={searchHref(`أفضل موبايلات ${store}`, country.code)}
                  className="storeCard"
                >
                  <strong>{store}</strong>
                  <small>
                    أسعار وعروض أفضل الموبايلات في {country.name}
                  </small>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2>نتائج حالية لأفضل الموبايلات</h2>

        <div className="productsGrid">
          {products.length > 0 ? (
            products.map((product: any, index: number) => (
              <div key={index} className="seoProductCard">
                {(product.image || product.thumbnail) && (
                  <img
                    src={product.image || product.thumbnail}
                    alt={`${product.title || "أفضل موبايل 2026"} - BPS Chat`}
                    loading="lazy"
                  />
                )}

                <div>
                  <h3>{product.title || product.name || "أفضل موبايل 2026"}</h3>
                  <p className="price">
                    {product.priceText || product.price || "السعر غير متوفر"}
                  </p>
                  <p className="store">المتجر: {getStoreName(product)}</p>

                  {(product.url || product.link) && (
                    <a
                      href={product.url || product.link}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                    >
                      عرض المنتج
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>
              لم تظهر نتائج مباشرة الآن. استخدم مربع البحث بالأعلى وابحث باسم
              الهاتف والدولة للحصول على أحدث الأسعار.
            </p>
          )}
        </div>

        <h2>كلمات مفتاحية قوية للبحث عن الموبايلات</h2>

        <div className="quickLinks">
          {strongKeywords.flatMap((keyword) =>
            countries.map((country) => (
              <Link key={`${keyword}-${country.code}`} href={searchHref(keyword, country.code)}>
                {keyword} - {country.name}
              </Link>
            ))
          )}
        </div>

        <h2>روابط داخلية مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          {internalLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/saudi-product-price-comparison">مقارنة أسعار السعودية</Link>
          <Link href="/egypt-product-price-comparison">مقارنة أسعار مصر</Link>
          <Link href="/uae-product-price-comparison">مقارنة أسعار الإمارات</Link>
          <Link href="/kuwait-product-price-comparison">مقارنة أسعار الكويت</Link>
          <Link href="/qatar-product-price-comparison">مقارنة أسعار قطر</Link>
          <Link href="/bahrain-product-price-comparison">مقارنة أسعار البحرين</Link>
        </div>

        <h2>أسئلة شائعة عن أفضل الموبايلات 2026</h2>

        <div className="faqGrid">
          <div className="faqCard">
            <h3>ما هو أفضل موبايل في 2026؟</h3>
            <p>
              الاختيار يعتمد على استخدامك: iPhone لعشاق Apple، وSamsung Ultra
              لمن يريد أندرويد فلاجشيب، وXiaomi/Oppo/Honor لمن يبحث عن قيمة
              قوية مقابل السعر.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل أشتري أحدث هاتف أم إصدار أقدم؟</h3>
            <p>
              لو السعر مهم، الإصدارات السابقة مثل iPhone 16 Pro Max أو Samsung
              S25 Ultra قد تكون صفقة ممتازة عند وجود خصومات.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل الأسعار تختلف بين السعودية ومصر والإمارات؟</h3>
            <p>
              نعم، السعر يختلف حسب العملة والضريبة والضمان والمتجر والعروض
              المتاحة في كل دولة.
            </p>
          </div>

          <div className="faqCard">
            <h3>هل BPS Chat يبيع الموبايلات؟</h3>
            <p>
              لا، BPS Chat يساعدك تقارن الأسعار والعروض ثم تنتقل للمتجر المناسب.
            </p>
          </div>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أفضل الموبايلات الآن</h2>
          <p>
            اكتب اسم الهاتف أو نوع الاستخدام مثل أفضل هاتف للتصوير أو أفضل هاتف
            للألعاب، اختار الدولة، وقارن الأسعار عبر بي بي اس شات.
          </p>

          <Link href={searchHref("أفضل موبايل 2026", "sa")} className="primaryBtn">
            قارن أفضل سعر الآن
          </Link>
        </div>
      </section>

      <PopularSearches />

      <style>{`
        .seoPage {
          color: white;
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
            #0b0f14;
        }

        .hero, .content {
          max-width: 1160px;
          margin: 0 auto;
          padding: 42px 18px;
        }

        .badge {
          display: inline-flex;
          padding: 8px 14px;
          border: 1px solid rgba(16,163,127,0.45);
          border-radius: 999px;
          color: #10a37f;
          background: rgba(16,163,127,0.08);
          margin-bottom: 18px;
          font-weight: 800;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1.35fr 0.85fr;
          gap: 28px;
          align-items: center;
        }

        h1 {
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.15;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: clamp(18px, 2vw, 28px);
          color: #b8c7d9;
          margin-top: 12px;
        }

        h2 {
          font-size: 30px;
          margin-top: 46px;
          margin-bottom: 16px;
        }

        p {
          color: #d7dee8;
          line-height: 2;
          font-size: 17px;
        }

        .ctaBox, .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }

        .primaryBtn, .secondaryBtn, .countryBtn, .quickLinks a {
          text-decoration: none;
          border-radius: 14px;
          padding: 12px 18px;
          font-weight: 800;
          transition: 0.2s ease;
        }

        .primaryBtn, .countryBtn {
          background: linear-gradient(135deg, #10a37f, #18d6a3);
          color: #06110e;
        }

        .secondaryBtn, .quickLinks a {
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
        }

        .primaryBtn:hover, .secondaryBtn:hover, .quickLinks a:hover, .countryBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(16,163,127,0.18);
        }

        .visualBox {
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.22), transparent 55%),
            rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 30px;
          padding: 24px;
          display: grid;
          gap: 16px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
        }

        .phoneCard {
          min-height: 115px;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035));
          display: grid;
          place-items: center;
          text-align: center;
          padding: 18px;
        }

        .phoneCard span {
          font-size: 27px;
          font-weight: 900;
        }

        .phoneCard strong {
          color: #18d6a3;
        }

        .glow {
          box-shadow: 0 0 45px rgba(16,163,127,0.22);
        }

        .groupBlock, .countryBlock, .modelCard, .storeCard, .seoProductCard, .faqCard, .finalCta {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.22);
        }

        .groupBlock, .countryBlock {
          margin-top: 18px;
        }

        .groupHeader, .countryHeader {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
        }

        .modelGrid, .storeGrid, .faqGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 18px;
        }

        .modelCard h3 {
          margin: 0 0 8px;
          color: #18d6a3;
        }

        .small a {
          padding: 8px 10px;
          font-size: 13px;
        }

        .miniPanel {
          margin-top: 14px;
          padding: 14px;
          border-radius: 16px;
          background: rgba(16,163,127,0.08);
          border: 1px solid rgba(16,163,127,0.2);
          color: #dcefe9;
          line-height: 2;
        }

        .miniPanel span {
          margin-right: 8px;
          color: #c7d2df;
        }

        .storeCard {
          display: grid;
          gap: 8px;
          color: white;
          text-decoration: none;
        }

        .storeCard small {
          color: #aeb8c6;
          line-height: 1.7;
        }

        .productsGrid {
          display: grid;
          gap: 16px;
          margin-top: 18px;
        }

        .seoProductCard {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 16px;
          align-items: center;
        }

        .seoProductCard img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 16px;
          background: white;
          padding: 8px;
        }

        .seoProductCard h3 {
          font-size: 17px;
          margin: 0 0 8px;
        }

        .price {
          color: #18d6a3;
          font-weight: 900;
          margin: 0;
        }

        .store {
          color: #aeb8c6;
          margin: 4px 0 10px;
          font-size: 14px;
        }

        .seoProductCard a {
          color: #10a37f;
          font-weight: 800;
        }

        .finalCta {
          margin-top: 44px;
          text-align: center;
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.18), transparent 50%),
            rgba(255,255,255,0.06);
        }

        @media (max-width: 950px) {
          .heroGrid,
          .modelGrid,
          .storeGrid,
          .faqGrid {
            grid-template-columns: 1fr;
          }

          .groupHeader,
          .countryHeader {
            align-items: flex-start;
            flex-direction: column;
          }

          .seoProductCard {
            grid-template-columns: 82px 1fr;
          }

          .seoProductCard img {
            width: 82px;
            height: 82px;
          }
        }
      `}</style>
    </main>
  );
}