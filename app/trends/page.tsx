import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title:
    "المنتجات الأكثر بحثًا اليوم | ترندات المنتجات في السعودية ومصر والخليج | BPS Chat",
  description:
    "صفحة ترندات المنتجات من BPS Chat بي بي اس شات: اكتشف أكثر المنتجات بحثًا في السعودية ومصر والإمارات والكويت وقطر والبحرين، وقارن أسعار ايفون وسامسونج ولابتوب وعطور وPS5 وعروض نون وأمازون وجوميا وجرير واكسترا.",
  keywords: [
    "المنتجات الأكثر بحثًا اليوم",
    "ترندات المنتجات",
    "منتجات ترند",
    "أكثر المنتجات بحثا",
    "أكثر المنتجات مبيعا",
    "ترندات السعودية",
    "ترندات مصر",
    "ترندات الإمارات",
    "ترندات الكويت",
    "ترندات قطر",
    "ترندات البحرين",
    "سعر ايفون",
    "سعر سامسونج",
    "سعر لابتوب",
    "عروض نون",
    "عروض أمازون",
    "عروض جوميا",
    "عروض جرير",
    "عروض اكسترا",
    "عروض كارفور",
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
      "Noon Saudi، Amazon.sa، Jarir، Extra، Carrefour Saudi، Lulu Saudi، SACO، Namshi، Nice One، Golden Scent",
    trends: [
      "سعر iPhone 16 Pro Max في السعودية",
      "سعر iPhone 15 في السعودية",
      "Samsung Galaxy S25 Ultra السعودية",
      "عروض نون السعودية",
      "عروض أمازون السعودية",
      "عروض جرير",
      "عروض اكسترا",
      "AirPods Pro السعودية",
      "PS5 السعودية",
      "MacBook Air السعودية",
      "لابتوب HP السعودية",
      "عطور رجالي السعودية",
      "Apple Watch السعودية",
      "سماعات بلوتوث السعودية",
      "شاشة سامسونج السعودية",
      "قلاية هوائية السعودية",
      "باور بانك السعودية",
      "عروض كارفور السعودية",
    ],
  },
  {
    name: "مصر",
    code: "eg",
    href: "/egypt-product-price-comparison",
    stores:
      "Jumia Egypt، Amazon.eg، Noon Egypt، Carrefour Egypt، B.TECH، Raya، 2B، Dream 2000، Tradeline، Samsung Egypt",
    trends: [
      "سعر ايفون في مصر",
      "سعر Samsung في مصر",
      "سعر Oppo في مصر",
      "سعر Xiaomi في مصر",
      "سعر Realme في مصر",
      "عروض جوميا",
      "عروض أمازون مصر",
      "عروض نون مصر",
      "لابتوب HP في مصر",
      "سعر PS5 في مصر",
      "AirPods في مصر",
      "عطور في مصر",
      "شاشة LG في مصر",
      "غسالة في مصر",
      "تكييف في مصر",
      "باور بانك في مصر",
      "تابلت أطفال في مصر",
      "قلاية هوائية في مصر",
    ],
  },
  {
    name: "الإمارات",
    code: "ae",
    href: "/uae-product-price-comparison",
    stores:
      "Noon UAE، Amazon.ae، Carrefour UAE، Sharaf DG، Lulu UAE، Jumbo، Emax، Virgin Megastore، Namshi، Ounass",
    trends: [
      "iPhone 16 Pro Max UAE price",
      "Samsung Galaxy UAE",
      "Noon UAE deals",
      "Amazon UAE offers",
      "MacBook UAE",
      "AirPods UAE",
      "PS5 UAE",
      "Apple Watch UAE",
      "Sharaf DG offers",
      "Carrefour UAE offers",
      "Dyson Airwrap UAE",
      "Perfume UAE",
      "Gaming laptop UAE",
      "Power bank UAE",
      "Smart watch UAE",
      "iPad UAE",
      "Nike shoes UAE",
      "Samsung TV UAE",
    ],
  },
  {
    name: "الكويت",
    code: "kw",
    href: "/kuwait-product-price-comparison",
    stores:
      "Xcite Kuwait، Best Al-Yousifi، Noon Kuwait، Lulu Kuwait، Carrefour Kuwait، Taw9eel، Blink، Eureka، Jarir Kuwait",
    trends: [
      "عروض Xcite الكويت",
      "iPhone Kuwait price",
      "Samsung Kuwait",
      "Lulu Kuwait offers",
      "Jarir Kuwait",
      "PS5 Kuwait",
      "AirPods Kuwait",
      "MacBook Kuwait",
      "Apple Watch Kuwait",
      "Laptop Kuwait",
      "Perfume Kuwait",
      "Power bank Kuwait",
      "Smart watch Kuwait",
      "Samsung TV Kuwait",
      "Gaming laptop Kuwait",
      "Nintendo Switch Kuwait",
      "Noon Kuwait offers",
      "Carrefour Kuwait offers",
    ],
  },
  {
    name: "قطر",
    code: "qa",
    href: "/qatar-product-price-comparison",
    stores:
      "Carrefour Qatar، Lulu Qatar، Noon Qatar، Jarir Qatar، Virgin Megastore Qatar، Al Anees، Starlink، Safari Hypermarket",
    trends: [
      "iPhone Qatar price",
      "Samsung Qatar",
      "Carrefour Qatar offers",
      "Lulu Qatar offers",
      "Jarir Qatar",
      "Al Anees Qatar",
      "PS5 Qatar",
      "MacBook Qatar",
      "AirPods Qatar",
      "Apple Watch Qatar",
      "Laptop Qatar",
      "Perfume Qatar",
      "Power bank Qatar",
      "Smart watch Qatar",
      "Samsung TV Qatar",
      "Gaming laptop Qatar",
      "Noon Qatar offers",
      "iPad Qatar",
    ],
  },
  {
    name: "البحرين",
    code: "bh",
    href: "/bahrain-product-price-comparison",
    stores:
      "Sharaf DG Bahrain، eXtra Bahrain، Lulu Bahrain، Carrefour Bahrain، Noon Bahrain، Virgin Megastore Bahrain، Ashrafs، Ansar Gallery",
    trends: [
      "iPhone Bahrain price",
      "Samsung Bahrain",
      "Sharaf DG Bahrain",
      "eXtra Bahrain offers",
      "Lulu Bahrain offers",
      "Carrefour Bahrain",
      "PS5 Bahrain",
      "AirPods Bahrain",
      "MacBook Bahrain",
      "Apple Watch Bahrain",
      "Laptop Bahrain",
      "Perfume Bahrain",
      "Power bank Bahrain",
      "Smart watch Bahrain",
      "Samsung TV Bahrain",
      "Gaming laptop Bahrain",
      "Noon Bahrain offers",
      "Bluetooth headphones Bahrain",
    ],
  },
];

const sections = [
  {
    title: "ترندات الموبايلات والجوالات",
    description:
      "أكثر عمليات البحث عن المنتجات تدور حول أسعار الموبايلات والجوالات، خصوصًا iPhone وSamsung وXiaomi وOppo وHonor وHuawei.",
    keywords: [
      "iPhone 16 Pro Max",
      "iPhone 15",
      "Samsung Galaxy S25 Ultra",
      "Samsung A55",
      "Xiaomi Redmi",
      "Oppo Reno",
      "Honor",
      "Huawei",
      "Realme",
      "Infinix",
    ],
  },
  {
    title: "ترندات اللابتوبات والكمبيوتر",
    description:
      "كلمات مثل سعر لابتوب، أفضل لابتوب للدراسة، Gaming Laptop، MacBook وHP Laptop من أهم كلمات البحث في الخليج ومصر.",
    keywords: [
      "MacBook Air",
      "MacBook Pro",
      "HP Laptop",
      "Dell Laptop",
      "Lenovo Laptop",
      "Asus Laptop",
      "Acer Laptop",
      "Gaming Laptop",
      "RTX Laptop",
      "Monitor",
    ],
  },
  {
    title: "ترندات العطور والجمال",
    description:
      "العطور ومنتجات الجمال من أقوى المنتجات بحثًا في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
    keywords: [
      "عطور رجالي",
      "عطور نسائي",
      "Dior Perfume",
      "Chanel Perfume",
      "Tom Ford",
      "YSL",
      "Golden Scent",
      "Nice One",
      "Sephora",
      "عود وبخور",
    ],
  },
  {
    title: "ترندات الإلكترونيات والقيمنق",
    description:
      "الناس تبحث يوميًا عن AirPods وApple Watch وPS5 وNintendo Switch وسماعات وPower Bank ومنتجات القيمنق.",
    keywords: [
      "AirPods Pro",
      "Apple Watch",
      "PS5",
      "PlayStation 5",
      "Nintendo Switch",
      "Smart Watch",
      "Power Bank",
      "Bluetooth Speaker",
      "Gaming Headset",
      "iPad",
    ],
  },
  {
    title: "ترندات الأجهزة المنزلية",
    description:
      "الشاشات والغسالات والثلاجات والتكييف والقلايات الهوائية وماكينات القهوة من المنتجات التي يبحث عنها المستخدم قبل الشراء.",
    keywords: [
      "شاشة سامسونج",
      "شاشة LG",
      "غسالة LG",
      "ثلاجة سامسونج",
      "تكييف",
      "Air Fryer",
      "Coffee Machine",
      "Vacuum Cleaner",
      "Microwave",
      "Dyson",
    ],
  },
];

const stores = [
  "Noon",
  "Amazon",
  "Jumia",
  "Jarir",
  "Extra",
  "Carrefour",
  "Xcite",
  "Sharaf DG",
  "Lulu",
  "B.TECH",
  "Raya",
  "2B",
  "Best Al-Yousifi",
  "Virgin Megastore",
  "Namshi",
  "Golden Scent",
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

export default function TrendsPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          المنتجات الأكثر بحثًا اليوم
          <span>ترندات المنتجات في السعودية ومصر والإمارات والكويت وقطر والبحرين</span>
        </h1>

        <p>
          صفحة <strong>ترندات المنتجات</strong> في <strong>BPS Chat</strong> أو{" "}
          <strong>بي بي اس شات</strong> تساعدك تكتشف أهم كلمات البحث والمنتجات
          الرائجة التي يبحث عنها المستخدمون قبل الشراء: أسعار ايفون، سامسونج،
          لابتوب، عطور، سماعات، PS5، أجهزة منزلية، عروض نون، عروض أمازون، عروض
          جوميا، جرير، اكسترا، كارفور، Xcite وSharaf DG في السعودية ومصر
          والإمارات والكويت وقطر والبحرين.
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
        <section className="introBox">
          <h2>ما فائدة صفحة الترندات في BPS Chat؟</h2>
          <p>
            بدل ما تبحث عشوائيًا، هذه الصفحة تجمع لك كلمات ترند ومنتجات يبحث
            عنها الناس كثيرًا، وكل كلمة تتحول إلى رابط بحث داخل BPS Chat لمقارنة
            الأسعار والعروض. الهدف إنك تبدأ من المنتج الرائج ثم تنتقل مباشرة إلى
            مقارنة الأسعار بين المتاجر والدول.
          </p>

          <div className="cardsGrid">
            <div className="infoCard">
              <h3>ترندات حسب الدولة</h3>
              <p>
                السعودية، مصر، الإمارات، الكويت، قطر والبحرين، وكل دولة لها
                متاجر وكلمات بحث مختلفة.
              </p>
            </div>

            <div className="infoCard">
              <h3>ترندات حسب المنتج</h3>
              <p>
                iPhone، Samsung، Laptop، AirPods، PS5، Perfume، أجهزة منزلية
                ومنتجات يومية.
              </p>
            </div>

            <div className="infoCard">
              <h3>ترند يتحول لبحث</h3>
              <p>
                كل رابط يفتح صفحة بحث داخل BPS Chat حتى تقارن السعر بدل قراءة
                معلومة فقط.
              </p>
            </div>
          </div>
        </section>

        <h2>🔥 المنتجات والكلمات الأكثر بحثًا حسب الدولة</h2>

        {countries.map((country) => (
          <section key={country.code} className="countryBlock">
            <div className="countryHeader">
              <div>
                <h2>ترندات المنتجات في {country.name}</h2>
                <p>
                  هذه أهم كلمات بحث ومنتجات رائجة يمكن استخدامها للبحث عن أفضل
                  سعر ومقارنة العروض في {country.name} عبر BPS Chat.
                </p>
              </div>

              <Link href={country.href} className="countryBtn">
                مقارنة أسعار {country.name}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة في {country.name}:</strong>
              <span>{country.stores}</span>
            </div>

            <div className="trendList">
              {country.trends.map((trend, index) => (
                <Link
                  key={`${country.code}-${trend}`}
                  href={searchHref(trend, country.code)}
                  className="liveTrendRow"
                >
                  <span className="trendNumber">#{index + 1}</span>

                  <div className="trendText">
                    <strong>{trend}</strong>
                    <small>
                      اضغط للبحث عن {trend} ومقارنة الأسعار في {country.name}
                    </small>
                  </div>

                  <span className="searchNow">بحث ↗</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2>ترندات حسب نوع المنتج</h2>

        {sections.map((section) => (
          <section key={section.title} className="categoryBlock">
            <h2>{section.title}</h2>
            <p>{section.description}</p>

            <div className="productGrid">
              {section.keywords.map((keyword) => (
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

        <h2>ترندات حسب المتجر</h2>

        <p>
          بعض المستخدمين لا يبحثون عن المنتج فقط، بل يبحثون عن المنتج داخل متجر
          معين مثل عروض نون، عروض أمازون، عروض جوميا، عروض جرير، عروض اكسترا،
          عروض كارفور، عروض Xcite أو عروض Sharaf DG.
        </p>

        <div className="storeGrid">
          {stores.map((store) => (
            <div key={store} className="storeCard">
              <strong>{store}</strong>
              <div className="countryMiniLinks">
                {countries.map((country) => (
                  <Link
                    key={`${store}-${country.code}`}
                    href={searchHref(`عروض ${store}`, country.code)}
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>جدول سريع لأهم الترندات والمتاجر</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>منتجات وكلمات ترند</th>
                <th>متاجر مهمة للمقارنة</th>
              </tr>
            </thead>

            <tbody>
              {countries.map((country) => (
                <tr key={`table-${country.code}`}>
                  <td>{country.name}</td>
                  <td>{country.trends.slice(0, 8).join("، ")}</td>
                  <td>{country.stores}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>كيف تستخدم ترندات BPS Chat؟</h2>

        <p>
          اختر الدولة، ثم اضغط على المنتج أو الكلمة الرائجة. سيأخذك BPS Chat إلى
          صفحة بحث داخلية تساعدك على مقارنة الأسعار والعروض. جرّب صيغ بحث مختلفة
          مثل: سعر المنتج، عروض المنتج، أرخص سعر، اسم المنتج مع اسم الدولة، أو
          اسم المنتج مع اسم المتجر.
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
          <Link href="/smart-search">البحث الذكي حسب الميزانية</Link>
          <Link href="/seller-tools">أدوات البائع</Link>
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ من الترند ثم قارن السعر</h2>
          <p>
            استخدم هذه الصفحة لاكتشاف المنتجات والكلمات الأكثر بحثًا، ثم انتقل
            إلى BPS Chat لمقارنة الأسعار والعروض في السعودية ومصر والإمارات
            والكويت وقطر والبحرين.
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
          max-width: 900px;
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

        .introBox,
        .infoCard,
        .countryBlock,
        .categoryBlock,
        .storeCard,
        .productCard {
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

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
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

        .trendList {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }

        .liveTrendRow {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #2f2f2f;
          border: 1px solid #444;
          color: white;
          padding: 13px 14px;
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .liveTrendRow:hover {
          border-color: #10a37f;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(16,163,127,0.16);
        }

        .trendNumber {
          background: linear-gradient(135deg, #f97316, #10a37f);
          color: white;
          min-width: 44px;
          height: 34px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }

        .trendText strong {
          display: block;
          font-size: 16px;
          margin-bottom: 3px;
          color: white;
        }

        .trendText small {
          color: #aaa;
          line-height: 1.6;
        }

        .searchNow {
          margin-inline-start: auto;
          color: #7fffe0;
          white-space: nowrap;
          font-weight: 800;
        }

        .quickLinks,
        .productGrid,
        .storeGrid {
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

        .productCard,
        .storeCard {
          width: calc(25% - 9px);
        }

        .productCard strong,
        .storeCard strong {
          display: block;
          margin-bottom: 8px;
          color: #fff;
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
        .productCard:hover,
        .storeCard:hover,
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
          .productCard,
          .storeCard {
            width: calc(33.333% - 8px);
          }
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          .productCard,
          .storeCard {
            width: calc(50% - 6px);
          }

          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }
        }

        @media (max-width: 600px) {
          .liveTrendRow {
            align-items: flex-start;
          }

          .searchNow {
            display: none;
          }
        }

        @media (max-width: 520px) {
          .productCard,
          .storeCard {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}