import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title:
    "المنتجات الأكثر بحثًا اليوم | ترندات السعودية ومصر والخليج | BPS Chat",
  description:
    "تابع المنتجات الأكثر بحثًا اليوم في السعودية ومصر والإمارات والكويت وقطر والبحرين مع BPS Chat بي بي اس شات: موبايلات، لابتوبات، عطور، إلكترونيات، عروض نون وأمازون وجوميا وجرير واكسترا.",
  keywords: [
    "المنتجات الأكثر بحثًا",
    "ترندات المنتجات",
    "ترندات السعودية",
    "ترندات مصر",
    "ترندات الإمارات",
    "ترندات الكويت",
    "ترندات قطر",
    "ترندات البحرين",
    "أكثر المنتجات بحثا",
    "أكثر المنتجات مبيعا",
    "عروض نون",
    "عروض أمازون",
    "عروض جوميا",
    "مقارنة أسعار",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

const countries = [
  {
    name: "السعودية",
    code: "sa",
    href: "/saudi-product-price-comparison",
    stores:
      "Noon Saudi، Amazon.sa، Jarir، Extra، Carrefour Saudi، Lulu Saudi، SACO، Namshi",
  },
  {
    name: "مصر",
    code: "eg",
    href: "/egypt-product-price-comparison",
    stores:
      "Jumia Egypt، Amazon.eg، Noon Egypt، Carrefour Egypt، B.TECH، Raya، 2B، Dream 2000",
  },
  {
    name: "الإمارات",
    code: "ae",
    href: "/uae-product-price-comparison",
    stores:
      "Noon UAE، Amazon.ae، Carrefour UAE، Sharaf DG، Lulu UAE، Jumbo، Emax، Namshi",
  },
  {
    name: "الكويت",
    code: "kw",
    href: "/kuwait-product-price-comparison",
    stores:
      "Xcite Kuwait، Best Al-Yousifi، Noon Kuwait، Lulu Kuwait، Carrefour Kuwait، Taw9eel، Blink، Eureka",
  },
  {
    name: "قطر",
    code: "qa",
    href: "/qatar-product-price-comparison",
    stores:
      "Carrefour Qatar، Lulu Qatar، Noon Qatar، Jarir Qatar، Virgin Megastore، Al Anees، Starlink، Safari",
  },
  {
    name: "البحرين",
    code: "bh",
    href: "/bahrain-product-price-comparison",
    stores:
      "Sharaf DG Bahrain، eXtra Bahrain، Lulu Bahrain، Carrefour Bahrain، Noon Bahrain، Virgin Megastore، Ashrafs",
  },
];

const seoCategories = [
  {
    title: "ترندات الموبايلات والجوالات",
    keywords: [
      "iPhone 17 Pro Max",
      "Samsung Galaxy S25 Ultra",
      "Xiaomi",
      "Oppo Reno",
      "Honor",
      "Infinix",
      "Realme",
      "Huawei",
    ],
  },
  {
    title: "ترندات اللابتوبات والكمبيوتر",
    keywords: [
      "MacBook",
      "HP Laptop",
      "Dell Laptop",
      "Lenovo Laptop",
      "Asus Laptop",
      "Gaming Laptop",
      "RTX",
      "Monitor",
    ],
  },
  {
    title: "ترندات العطور والجمال",
    keywords: [
      "عطور رجالي",
      "عطور نسائي",
      "Dior Perfume",
      "Chanel Perfume",
      "Tom Ford",
      "YSL",
      "Golden Scent",
      "Nice One",
    ],
  },
  {
    title: "ترندات الإلكترونيات والقيمنق",
    keywords: [
      "AirPods",
      "Apple Watch",
      "PS5",
      "PlayStation 5",
      "Nintendo Switch",
      "Smart Watch",
      "Power Bank",
      "Bluetooth Speaker",
    ],
  },
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

async function getCountryTrends(code: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bpschat.com";

  try {
    const res = await fetch(`${baseUrl}/api/trends?country=${code}&hours=24`, {
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.trends || [];
  } catch {
    return [];
  }
}

export default async function TrendsPage() {
  const trendResults = await Promise.all(
    countries.map(async (country) => ({
      ...country,
      trends: await getCountryTrends(country.code),
    }))
  );

  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          المنتجات الأكثر بحثًا اليوم
          <span>ترندات المنتجات في السعودية ومصر والإمارات والخليج</span>
        </h1>

        <p>
          صفحة <strong>المنتجات الأكثر بحثًا</strong> في{" "}
          <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> تساعدك
          تتابع ترندات البحث عن المنتجات والعروض في السعودية، مصر، الإمارات،
          الكويت، قطر والبحرين. اضغط على أي ترند للبحث عن أفضل سعر ومقارنة
          المتاجر مثل نون، أمازون، جوميا، جرير، اكسترا، كارفور، Xcite وSharaf
          DG.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن منتج الآن
          </Link>
          <Link href="/deals" className="secondaryBtn">
            العروض والخصومات
          </Link>
          <Link href="/categories" className="secondaryBtn">
            دليل الأقسام
          </Link>
          <Link href="/stores" className="secondaryBtn">
            دليل المتاجر
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا ترندات المنتجات مهمة؟</h2>

        <p>
          الترندات تساعدك تعرف الناس بتبحث عن إيه الآن: سعر ايفون، عروض سامسونج،
          أرخص لابتوب، عطور نون، عروض جوميا، PS5، AirPods، شاشات، أجهزة منزلية
          ومنتجات كثيرة. لذلك BPS Chat يجمع نية البحث مع مقارنة الأسعار حتى
          تقدر تنتقل من الترند مباشرة إلى صفحة بحث حقيقية داخل الموقع.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>ترند حسب الدولة</h3>
            <p>
              تابع المنتجات الأكثر بحثًا في السعودية، مصر، الإمارات، الكويت،
              قطر والبحرين.
            </p>
          </div>

          <div className="infoCard">
            <h3>ترند حسب المتجر</h3>
            <p>
              اربط الترندات بعروض نون وأمازون وجوميا وجرير واكسترا وكارفور
              وXcite وSharaf DG.
            </p>
          </div>

          <div className="infoCard">
            <h3>ترند يتحول لبحث</h3>
            <p>
              كل كلمة ترند تفتح بحث داخل BPS Chat لمقارنة الأسعار والعروض بدل
              الاكتفاء بمعلومة عامة.
            </p>
          </div>
        </div>

        <h2>ترندات المنتجات حسب الدولة</h2>

        {trendResults.map((country) => (
          <section key={country.code} className="countryBlock">
            <div className="countryHeader">
              <div>
                <h2>المنتجات الأكثر بحثًا في {country.name}</h2>
                <p>
                  ترندات {country.name} تساعدك تتابع المنتجات والعروض التي يبحث
                  عنها الناس الآن، ثم تقارن السعر داخل BPS Chat.
                </p>
              </div>

              <Link href={country.href} className="countryBtn">
                مقارنة أسعار {country.name}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة:</strong>
              <span>{country.stores}</span>
            </div>

            <div className="trendGrid">
              {country.trends.length === 0 ? (
                <p>لا توجد ترندات منتجات واضحة حاليًا لهذه الدولة.</p>
              ) : (
                country.trends.map((item: any, index: number) => {
                  const title = typeof item === "string" ? item : item.title;

                  return (
                    <Link
                      key={`${country.code}-${title}-${index}`}
                      href={searchHref(title, country.code)}
                      className="trendCard"
                    >
                      <strong>🔥 {title}</strong>
                      <small>
                        ابحث عن أفضل سعر {title} في {country.name}
                      </small>
                    </Link>
                  );
                })
              )}
            </div>
          </section>
        ))}

        <h2>ترندات حسب نوع المنتج</h2>

        {seoCategories.map((category) => (
          <section key={category.title} className="categoryBlock">
            <h2>{category.title}</h2>

            <p>
              استخدم BPS Chat لمتابعة {category.title} ومقارنة الأسعار بين
              المتاجر في السعودية ومصر والإمارات والكويت وقطر والبحرين.
            </p>

            <div className="productGrid">
              {category.keywords.map((keyword) => (
                <div key={keyword} className="productCard">
                  <strong>{keyword}</strong>

                  <div className="countryMiniLinks">
                    {countries.map((country) => (
                      <Link
                        key={`${keyword}-${country.code}`}
                        href={searchHref(keyword, country.code)}
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <h2>جدول سريع لأهم الترندات والمتاجر</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>أمثلة ترندات منتجات</th>
                <th>متاجر مهمة للمقارنة</th>
              </tr>
            </thead>

            <tbody>
              {countries.map((country) => (
                <tr key={`table-${country.code}`}>
                  <td>{country.name}</td>
                  <td>
                    iPhone، Samsung، Laptop، AirPods، PS5، Perfume، عروض اليوم
                  </td>
                  <td>{country.stores}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>كيف تستفيد من ترندات BPS Chat؟</h2>

        <p>
          عندما ترى منتجًا متصدرًا للبحث، اضغط عليه وافتح صفحة المقارنة. جرّب
          صيغ بحث مثل: سعر المنتج، عروض المنتج، أرخص سعر، اسم المنتج مع الدولة،
          أو اسم المنتج مع المتجر. مثال: “سعر ايفون في السعودية”، “عروض جوميا
          مصر”، “MacBook UAE”، “عروض Xcite الكويت”، “Samsung Qatar price”.
        </p>

        <h2>روابط مهمة داخل بي بي اس شات</h2>

        <div className="quickLinks">
          <Link href="/deals">العروض والخصومات</Link>
          <Link href="/categories">دليل الأقسام والمنتجات</Link>
          <Link href="/stores">دليل المتاجر</Link>
          <Link href="/brands">دليل الماركات</Link>
          <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ من الترند ثم قارن السعر</h2>
          <p>
            استخدم الترندات لمعرفة المنتجات التي يبحث عنها الناس اليوم، ثم ابحث
            داخل BPS Chat لمقارنة الأسعار والعروض بين المتاجر قبل الشراء.
          </p>

          <Link href="/" className="primaryBtn">
            ابحث في BPS Chat
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

        .hero {
          max-width: 1050px;
          margin: 0 auto;
          padding: 54px 18px 30px;
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
          font-weight: 700;
        }

        h1 {
          font-size: 42px;
          line-height: 1.35;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: 24px;
          color: #cfcfcf;
          margin-top: 8px;
        }

        .hero p {
          max-width: 880px;
          margin: 0 auto;
          color: #e8e8e8;
          font-size: 18px;
          line-height: 2;
        }

        .ctaBox {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .primaryBtn,
        .secondaryBtn,
        .countryBtn {
          display: inline-block;
          padding: 12px 18px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 800;
        }

        .primaryBtn {
          background: #10a37f;
          color: #fff;
        }

        .secondaryBtn,
        .countryBtn {
          background: #2f2f2f;
          color: #fff;
          border: 1px solid #444;
        }

        .countryBtn {
          height: fit-content;
          white-space: nowrap;
        }

        .content {
          max-width: 1120px;
          margin: 0 auto;
          padding: 25px 18px 50px;
          line-height: 2;
        }

        h2 {
          margin-top: 38px;
          font-size: 26px;
          color: #10a37f;
        }

        h3 {
          font-size: 20px;
          margin: 24px 0 10px;
          color: #fff;
        }

        p,
        li {
          font-size: 17px;
          color: #e8e8e8;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .infoCard,
        .countryBlock,
        .categoryBlock {
          background: rgba(40,40,40,0.62);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .countryBlock,
        .categoryBlock {
          margin-top: 28px;
        }

        .countryHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .countryHeader h2,
        .categoryBlock h2 {
          margin-top: 0;
        }

        .miniPanel {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          background: rgba(16, 163, 127, 0.09);
          border: 1px solid rgba(16, 163, 127, 0.25);
          border-radius: 16px;
          padding: 12px 14px;
          color: #e8e8e8;
          margin-top: 14px;
        }

        .miniPanel strong {
          color: #7fffe0;
        }

        .quickLinks,
        .trendGrid,
        .productGrid {
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
        }

        .trendCard,
        .productCard {
          width: calc(25% - 9px);
          background: #2f2f2f;
          border: 1px solid #444;
          border-radius: 18px;
          padding: 14px;
          text-decoration: none;
          color: white;
        }

        .trendCard strong,
        .productCard strong {
          display: block;
          margin-bottom: 6px;
          color: #fff;
        }

        .trendCard small {
          color: #aaa;
          line-height: 1.5;
        }

        .countryMiniLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .countryMiniLinks a {
          color: #ddd;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 3px 8px;
          text-decoration: none;
          font-size: 12px;
        }

        .quickLinks a:hover,
        .trendCard:hover,
        .productCard:hover,
        .countryMiniLinks a:hover,
        .countryBtn:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        .tableWrap {
          overflow-x: auto;
          margin-top: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        table {
          width: 100%;
          min-width: 850px;
          border-collapse: collapse;
          background: rgba(40,40,40,0.55);
        }

        th,
        td {
          padding: 15px;
          text-align: right;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #e8e8e8;
          vertical-align: top;
        }

        th {
          color: #7fffe0;
          background: rgba(16, 163, 127, 0.1);
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
          max-width: 780px;
          margin: 0 auto 22px;
        }

        @media (max-width: 1000px) {
          .trendCard,
          .productCard {
            width: calc(33.333% - 8px);
          }
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          .trendCard,
          .productCard {
            width: calc(50% - 6px);
          }

          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }
        }

        @media (max-width: 520px) {
          .trendCard,
          .productCard {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}