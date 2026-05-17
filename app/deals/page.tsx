import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "العروض والخصومات | عروض نون وأمازون وجوميا في السعودية ومصر والخليج",
  description:
    "دليل العروض والخصومات من BPS Chat لمقارنة عروض نون وأمازون وجوميا وجرير واكسترا وكارفور وXcite وSharaf DG في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
  keywords: [
    "عروض",
    "خصومات",
    "تخفيضات",
    "كود خصم",
    "عروض اليوم",
    "عروض نون",
    "عروض أمازون",
    "عروض جوميا",
    "عروض جرير",
    "عروض اكسترا",
    "عروض كارفور",
    "عروض Xcite",
    "عروض Sharaf DG",
    "عروض السعودية",
    "عروض مصر",
    "عروض الإمارات",
    "عروض الكويت",
    "عروض قطر",
    "عروض البحرين",
    "White Friday",
    "Black Friday",
    "Ramadan deals",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

const countries = [
  {
    name: "السعودية",
    code: "sa",
    href: "/saudi-product-price-comparison",
    stores: [
      "Noon Saudi",
      "Amazon.sa",
      "Jarir",
      "Extra",
      "Carrefour Saudi",
      "Lulu Saudi",
      "SACO",
      "Namshi",
      "Sivvi",
      "Golden Scent",
      "Nice One",
      "Panda",
      "Othaim",
      "Danube",
      "IKEA Saudi",
    ],
    keywords: [
      "عروض نون السعودية",
      "عروض أمازون السعودية",
      "عروض جرير",
      "عروض اكسترا",
      "عروض كارفور السعودية",
      "خصومات السعودية",
      "أفضل عروض السعودية",
      "أرخص سعر في السعودية",
    ],
  },
  {
    name: "مصر",
    code: "eg",
    href: "/egypt-product-price-comparison",
    stores: [
      "Jumia Egypt",
      "Amazon.eg",
      "Noon Egypt",
      "Carrefour Egypt",
      "B.TECH",
      "Raya",
      "2B Egypt",
      "Dream 2000",
      "ElAraby",
      "Fresh",
      "Samsung Egypt",
      "Tradeline",
      "LC Waikiki Egypt",
      "Max Fashion Egypt",
      "DeFacto Egypt",
    ],
    keywords: [
      "عروض جوميا",
      "عروض أمازون مصر",
      "عروض نون مصر",
      "عروض بي تك",
      "عروض راية",
      "خصومات مصر",
      "أسعار الموبايلات في مصر",
      "أفضل عروض مصر",
    ],
  },
  {
    name: "الإمارات",
    code: "ae",
    href: "/uae-product-price-comparison",
    stores: [
      "Noon UAE",
      "Amazon.ae",
      "Carrefour UAE",
      "Sharaf DG",
      "Lulu UAE",
      "Jumbo Electronics",
      "Emax",
      "Virgin Megastore UAE",
      "Namshi UAE",
      "Sivvi UAE",
      "Ounass",
      "6thStreet",
      "IKEA UAE",
      "Mumzworld",
      "Kibsons",
    ],
    keywords: [
      "عروض نون الإمارات",
      "عروض أمازون الإمارات",
      "Amazon UAE offers",
      "Noon UAE deals",
      "عروض كارفور الإمارات",
      "عروض Sharaf DG",
      "خصومات الإمارات",
      "أفضل سعر في الإمارات",
    ],
  },
  {
    name: "الكويت",
    code: "kw",
    href: "/kuwait-product-price-comparison",
    stores: [
      "Xcite Kuwait",
      "Best Al-Yousifi",
      "Noon Kuwait",
      "Lulu Kuwait",
      "Carrefour Kuwait",
      "Taw9eel",
      "Blink Kuwait",
      "Eureka Kuwait",
      "Jarir Kuwait",
      "Sultan Center",
      "City Centre Kuwait",
      "Boutiqaat",
      "Namshi Kuwait",
      "IKEA Kuwait",
      "Ubuy Kuwait",
    ],
    keywords: [
      "عروض Xcite الكويت",
      "عروض الغانم",
      "عروض Best Al-Yousifi",
      "عروض لولو الكويت",
      "عروض كارفور الكويت",
      "خصومات الكويت",
      "أفضل عروض الكويت",
      "أرخص سعر في الكويت",
    ],
  },
  {
    name: "قطر",
    code: "qa",
    href: "/qatar-product-price-comparison",
    stores: [
      "Carrefour Qatar",
      "Lulu Qatar",
      "Noon Qatar",
      "Jarir Qatar",
      "Virgin Megastore Qatar",
      "Al Anees Qatar",
      "Starlink Qatar",
      "Jumbo Qatar",
      "Safari Hypermarket Qatar",
      "Monoprix Qatar",
      "Al Meera",
      "Ansar Gallery Qatar",
      "IKEA Qatar",
      "Centrepoint Qatar",
      "Ubuy Qatar",
    ],
    keywords: [
      "عروض قطر",
      "عروض قطر اليوم",
      "Qatar deals",
      "Qatar offers",
      "عروض كارفور قطر",
      "عروض لولو قطر",
      "خصومات قطر",
      "أفضل سعر في قطر",
    ],
  },
  {
    name: "البحرين",
    code: "bh",
    href: "/bahrain-product-price-comparison",
    stores: [
      "Sharaf DG Bahrain",
      "eXtra Bahrain",
      "Lulu Bahrain",
      "Carrefour Bahrain",
      "Noon Bahrain",
      "Virgin Megastore Bahrain",
      "Ashrafs Bahrain",
      "Ansar Gallery Bahrain",
      "Centrepoint Bahrain",
      "Max Fashion Bahrain",
      "Namshi Bahrain",
      "IKEA Bahrain",
      "Home Centre Bahrain",
      "Ubuy Bahrain",
      "Desertcart Bahrain",
    ],
    keywords: [
      "عروض البحرين",
      "عروض البحرين اليوم",
      "عروض Sharaf DG البحرين",
      "عروض eXtra البحرين",
      "عروض لولو البحرين",
      "Bahrain deals",
      "خصومات البحرين",
      "أفضل سعر في البحرين",
    ],
  },
];

const dealCategories = [
  {
    title: "عروض الجوالات والموبايلات",
    products: [
      "iPhone 17",
      "iPhone 17 Pro Max",
      "Samsung Galaxy S25 Ultra",
      "Samsung Galaxy S26",
      "Xiaomi",
      "Oppo",
      "Honor",
      "Huawei",
      "Infinix",
      "Realme",
    ],
    stores:
      "Amazon، Noon، Jumia، Jarir، Extra، Carrefour، Xcite، Sharaf DG، B.TECH، Raya",
    links: [
      { label: "مقارنة أسعار iPhone", href: "/iphone-price-comparison" },
      { label: "مقارنة أسعار Samsung", href: "/samsung-price-comparison" },
    ],
  },
  {
    title: "عروض اللابتوبات والكمبيوتر",
    products: [
      "HP Laptop",
      "Dell Laptop",
      "Lenovo Laptop",
      "MacBook",
      "Asus",
      "Acer",
      "MSI Gaming Laptop",
      "RTX",
      "Gaming PC",
      "Monitor",
    ],
    stores:
      "Jarir، Extra، Amazon، Noon، B.TECH، Raya، 2B، Xcite، Sharaf DG، Lulu",
    links: [{ label: "مقارنة أسعار Laptop", href: "/laptop-price-comparison" }],
  },
  {
    title: "عروض العطور والجمال",
    products: [
      "Dior Perfume",
      "Chanel Perfume",
      "Gucci Perfume",
      "Tom Ford",
      "YSL",
      "Armani",
      "عطور رجالي",
      "عطور نسائي",
      "ميكب",
      "Skincare",
    ],
    stores:
      "Noon، Amazon، Jumia، Golden Scent، Nice One، Boutiqaat، Sephora، Carrefour، Lulu",
    links: [{ label: "مقارنة أسعار العطور", href: "/perfume-price-comparison" }],
  },
  {
    title: "عروض الأجهزة المنزلية والشاشات",
    products: [
      "شاشة",
      "ثلاجة",
      "غسالة",
      "تكييف",
      "Air Fryer",
      "Coffee Machine",
      "Vacuum Cleaner",
      "Microwave",
      "LG",
      "Dyson",
    ],
    stores:
      "Extra، Carrefour، B.TECH، Raya، Amazon، Noon، Jumia، Lulu، Xcite، Sharaf DG",
    links: [{ label: "أفضل سعر أونلاين", href: "/best-price-online" }],
  },
  {
    title: "عروض الموضة والملابس",
    products: [
      "Nike",
      "Adidas",
      "Puma",
      "ملابس رجالي",
      "ملابس نسائي",
      "ملابس أطفال",
      "أحذية",
      "شنط",
      "نظارات شمس",
      "عبايات",
    ],
    stores:
      "Namshi، Sivvi، Shein، H&M، Max، Centrepoint، LC Waikiki، DeFacto، 6thStreet، Jumia، Noon",
    links: [{ label: "دليل الأقسام والمنتجات", href: "/categories" }],
  },
  {
    title: "عروض الأطفال والسوبرماركت",
    products: [
      "حفاضات",
      "حليب أطفال",
      "ألعاب أطفال",
      "تابلت أطفال",
      "Babyshop",
      "Mothercare",
      "قهوة",
      "منظفات",
      "منتجات يومية",
      "سوبرماركت",
    ],
    stores:
      "Carrefour، Lulu، Panda، Othaim، Danube، Talabat Mart، Amazon، Noon، Jumia، Babyshop، Mothercare",
    links: [{ label: "وفر فلوسك عند الشراء أونلاين", href: "/save-money-online-shopping" }],
  },
];

const seasons = [
  "عروض اليوم",
  "عروض الأسبوع",
  "عروض الجمعة البيضاء",
  "Black Friday",
  "White Friday",
  "عروض رمضان",
  "عروض العيد",
  "عروض العودة للمدارس",
  "عروض نهاية السنة",
  "تخفيضات الصيف",
  "تخفيضات الشتاء",
  "كود خصم",
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

export default function DealsPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          العروض والخصومات
          <span>قارن عروض نون وأمازون وجوميا والمتاجر في كل الدول</span>
        </h1>

        <p>
          صفحة <strong>العروض والخصومات</strong> في{" "}
          <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> تساعدك
          تتابع كلمات البحث المهمة مثل عروض اليوم، خصومات، تخفيضات، كود خصم،
          عروض نون، عروض أمازون، عروض جوميا، عروض جرير، عروض اكسترا، عروض
          كارفور، عروض Xcite وSharaf DG في السعودية، مصر، الإمارات، الكويت، قطر
          والبحرين.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن عرض الآن
          </Link>
          <Link href="/stores" className="secondaryBtn">
            دليل المتاجر
          </Link>
          <Link href="/categories" className="secondaryBtn">
            دليل الأقسام
          </Link>
          <Link href="/brands" className="secondaryBtn">
            دليل الماركات
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا صفحة العروض مهمة؟</h2>

        <p>
          كثير من الناس لا يبحثون عن المنتج فقط، بل يبحثون عن العرض: “عروض
          ايفون”، “خصومات نون”، “عروض جوميا”، “أرخص لابتوب”، “كود خصم”، “عروض
          رمضان” أو “Black Friday”. لذلك هذه الصفحة تجمع نية الشراء المباشرة مع
          أسماء المتاجر والدول والمنتجات، حتى تساعد BPS Chat على الظهور في
          عمليات البحث المرتبطة بالعروض.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>عروض حسب الدولة</h3>
            <p>
              السعودية، مصر، الإمارات، الكويت، قطر والبحرين، وكل دولة لها متاجر
              وكلمات بحث مختلفة.
            </p>
          </div>

          <div className="infoCard">
            <h3>عروض حسب المتجر</h3>
            <p>
              Noon، Amazon، Jumia، Jarir، Extra، Carrefour، Xcite، Sharaf DG،
              Lulu، B.TECH وRaya.
            </p>
          </div>

          <div className="infoCard">
            <h3>عروض حسب المنتج</h3>
            <p>
              جوالات، لابتوبات، عطور، شاشات، أجهزة منزلية، ملابس، أطفال
              وسوبرماركت.
            </p>
          </div>
        </div>

        <h2>مواسم وكلمات عروض قوية</h2>

        <div className="quickLinks">
          {seasons.map((season) => (
            <Link key={season} href={searchHref(season, "sa")}>
              {season}
            </Link>
          ))}
        </div>

        <h2>العروض حسب الدولة</h2>

        {countries.map((country) => (
          <section key={country.code} className="countryBlock">
            <div className="countryHeader">
              <div>
                <h2>عروض وخصومات {country.name}</h2>
                <p>
                  تابع عروض {country.name} من المتاجر المهمة، وقارن السعر قبل
                  الشراء عن طريق BPS Chat لمعرفة أفضل عرض وأرخص سعر.
                </p>
              </div>

              <Link href={country.href} className="countryBtn">
                مقارنة أسعار {country.name}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة:</strong>
              <span>{country.stores.join("، ")}</span>
            </div>

            <h3>كلمات بحث قوية في {country.name}</h3>

            <div className="quickLinks">
              {country.keywords.map((keyword) => (
                <Link key={keyword} href={searchHref(keyword, country.code)}>
                  {keyword}
                </Link>
              ))}
            </div>

            <h3>عروض متاجر {country.name}</h3>

            <div className="storeGrid">
              {country.stores.map((store) => (
                <Link
                  href={searchHref(`عروض ${store}`, country.code)}
                  key={`${country.code}-${store}`}
                  className="storeCard"
                >
                  <strong>{store}</strong>
                  <small>عروض وأسعار وخصومات {store}</small>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2>العروض حسب نوع المنتج</h2>

        {dealCategories.map((category) => (
          <section key={category.title} className="dealBlock">
            <div className="dealHeader">
              <div>
                <h2>{category.title}</h2>
                <p>
                  قارن {category.title} بين المتاجر والدول، وابحث عن أفضل سعر،
                  أرخص عرض، خصومات اليوم، وكود الخصم إن وجد.
                </p>
              </div>

              <Link href={searchHref(category.title, "sa")} className="countryBtn">
                ابحث في القسم
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مرتبطة:</strong>
              <span>{category.stores}</span>
            </div>

            <h3>منتجات وعروض شائعة</h3>

            <div className="productGrid">
              {category.products.map((product) => (
                <div key={`${category.title}-${product}`} className="productCard">
                  <strong>{product}</strong>
                  <div className="countryMiniLinks">
                    {countries.map((country) => (
                      <Link
                        key={`${product}-${country.code}`}
                        href={searchHref(`عروض ${product}`, country.code)}
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h3>صفحات مرتبطة</h3>

            <div className="quickLinks">
              {category.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/best-price-online">أفضل سعر أونلاين</Link>
              <Link href="/cheapest-products">أرخص المنتجات</Link>
              <Link href="/best-time-to-buy-online">أفضل وقت للشراء أونلاين</Link>
            </div>
          </section>
        ))}

        <h2>جدول سريع لأهم العروض والمتاجر</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>نوع العرض</th>
                <th>أمثلة منتجات</th>
                <th>متاجر مهمة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>عروض الجوالات</td>
                <td>iPhone، Samsung، Xiaomi، Oppo، Honor</td>
                <td>Amazon، Noon، Jarir، Extra، Jumia، Xcite، Sharaf DG</td>
              </tr>
              <tr>
                <td>عروض اللابتوبات</td>
                <td>HP، Dell، Lenovo، MacBook، Gaming Laptop</td>
                <td>Jarir، Extra، Amazon، Noon، B.TECH، Raya، 2B</td>
              </tr>
              <tr>
                <td>عروض العطور</td>
                <td>Dior، Chanel، Gucci، Tom Ford، عطور رجالي ونسائي</td>
                <td>Noon، Amazon، Jumia، Golden Scent، Nice One، Boutiqaat</td>
              </tr>
              <tr>
                <td>عروض الأجهزة المنزلية</td>
                <td>شاشات، ثلاجات، غسالات، تكييف، قلاية هوائية</td>
                <td>Extra، Carrefour، B.TECH، Raya، Lulu، Xcite، Sharaf DG</td>
              </tr>
              <tr>
                <td>عروض الموضة</td>
                <td>Nike، Adidas، ملابس، أحذية، شنط، عبايات</td>
                <td>Namshi، Sivvi، Shein، H&M، Max، Centrepoint، Jumia</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>كيف تستخدم BPS Chat للعثور على أفضل عرض؟</h2>

        <p>
          اكتب اسم المنتج مع كلمة “عروض” أو “خصم” أو “أرخص سعر”، واختر الدولة
          المناسبة. مثال: “عروض ايفون السعودية”، “عروض جوميا مصر”، “عروض لابتوب
          الإمارات”، “عروض Xcite الكويت”، “Qatar deals”، “Bahrain offers”.
          بعدها راجع النتائج وقارن السعر النهائي داخل المتجر الأصلي قبل الشراء.
        </p>

        <h2>روابط مهمة داخل بي بي اس شات</h2>

        <div className="quickLinks">
          <Link href="/stores">دليل المتاجر</Link>
          <Link href="/categories">دليل الأقسام والمنتجات</Link>
          <Link href="/brands">دليل الماركات</Link>
          <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
          <Link href="/save-money-online-shopping">وفر فلوسك عند الشراء أونلاين</Link>
          <Link href="/online-shopping-safety-guide">دليل الشراء الآمن</Link>
          <Link href="/best-online-stores-egypt-gulf">أفضل المتاجر الإلكترونية</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ البحث عن العروض الآن</h2>
          <p>
            ابحث عن المنتج أو المتجر أو الماركة، واختر الدولة، وقارن العروض
            والخصومات في BPS Chat قبل الشراء.
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
        .dealBlock {
          background: rgba(40,40,40,0.62);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .countryBlock,
        .dealBlock {
          margin-top: 28px;
        }

        .countryHeader,
        .dealHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .countryHeader h2,
        .dealHeader h2 {
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
        .storeGrid,
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

        .storeCard,
        .productCard {
          width: calc(25% - 9px);
          background: #2f2f2f;
          border: 1px solid #444;
          border-radius: 18px;
          padding: 14px;
          text-decoration: none;
          color: white;
        }

        .storeCard strong,
        .productCard strong {
          display: block;
          margin-bottom: 6px;
          color: #fff;
        }

        .storeCard small {
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
        .storeCard:hover,
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
          .storeCard,
          .productCard {
            width: calc(33.333% - 8px);
          }
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          .storeCard,
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
          .storeCard,
          .productCard {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}