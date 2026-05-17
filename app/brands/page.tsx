import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "دليل الماركات | قارن أسعار Apple وSamsung وNike وDyson عبر BPS Chat",
  description:
    "دليل شامل لأشهر الماركات في BPS Chat: Apple، Samsung، Xiaomi، Oppo، HP، Dell، Lenovo، Sony، LG، Dyson، Nike، Adidas، Dior، Chanel والمزيد في السعودية ومصر والإمارات والخليج.",
  keywords: [
    "دليل الماركات",
    "أسعار الماركات",
    "Apple price",
    "Samsung price",
    "Xiaomi price",
    "Oppo price",
    "HP laptop price",
    "Dell laptop price",
    "Nike offers",
    "Adidas offers",
    "Dyson price",
    "Dior perfume",
    "Chanel perfume",
    "BPS Chat",
    "بي بي اس شات",
    "مقارنة أسعار الماركات",
  ],
};

const countries = [
  { name: "السعودية", code: "sa", href: "/saudi-product-price-comparison" },
  { name: "مصر", code: "eg", href: "/egypt-product-price-comparison" },
  { name: "الإمارات", code: "ae", href: "/uae-product-price-comparison" },
  { name: "الكويت", code: "kw", href: "/kuwait-product-price-comparison" },
  { name: "قطر", code: "qa", href: "/qatar-product-price-comparison" },
  { name: "البحرين", code: "bh", href: "/bahrain-product-price-comparison" },
];

const brandGroups = [
  {
    title: "ماركات الجوالات والموبايلات",
    intro:
      "قارن أسعار أشهر ماركات الجوالات مثل Apple وSamsung وXiaomi وOppo وHuawei وHonor وInfinix في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
    brands: [
      "Apple",
      "iPhone",
      "Samsung",
      "Xiaomi",
      "Oppo",
      "Huawei",
      "Honor",
      "Realme",
      "Infinix",
      "Tecno",
      "Vivo",
      "OnePlus",
      "Motorola",
      "Nokia",
      "Nothing Phone",
    ],
    stores:
      "Amazon، Noon، Jumia، Jarir، Extra، Carrefour، Xcite، Sharaf DG، B.TECH، Raya، 2B",
    links: [
      { label: "مقارنة أسعار iPhone", href: "/iphone-price-comparison" },
      { label: "مقارنة أسعار Samsung", href: "/samsung-price-comparison" },
    ],
  },
  {
    title: "ماركات اللابتوبات والكمبيوتر",
    intro:
      "قارن أسعار HP وDell وLenovo وAsus وAcer وApple MacBook وMSI وRazer واللابتوبات المخصصة للدراسة والشغل والقيمنق.",
    brands: [
      "HP",
      "Dell",
      "Lenovo",
      "Asus",
      "Acer",
      "Apple MacBook",
      "MSI",
      "Razer",
      "Microsoft Surface",
      "Gigabyte",
      "Alienware",
      "Huawei MateBook",
      "Samsung Laptop",
      "LG Gram",
      "Intel",
      "AMD",
      "NVIDIA",
    ],
    stores:
      "Jarir، Extra، Amazon، Noon، B.TECH، Raya، 2B، Sharaf DG، Xcite، Lulu، Carrefour",
    links: [{ label: "مقارنة أسعار Laptop", href: "/laptop-price-comparison" }],
  },
  {
    title: "ماركات الإلكترونيات والسماعات والساعات",
    intro:
      "قارن أسعار AirPods وApple Watch وSony وJBL وBose وAnker وBaseus وXiaomi وHuawei وسماعات وساعات ذكية واكسسوارات.",
    brands: [
      "Apple AirPods",
      "Apple Watch",
      "Sony",
      "JBL",
      "Bose",
      "Anker",
      "Baseus",
      "Belkin",
      "Ugreen",
      "Samsung Buds",
      "Huawei Watch",
      "Xiaomi Watch",
      "Garmin",
      "GoPro",
      "Canon",
      "Nikon",
      "Logitech",
      "TP-Link",
    ],
    stores:
      "Amazon، Noon، Jarir، Extra، Carrefour، Sharaf DG، Xcite، Lulu، B.TECH، Raya",
    links: [{ label: "مقارنة الأسعار أونلاين", href: "/compare-prices-online" }],
  },
  {
    title: "ماركات الأجهزة المنزلية والشاشات",
    intro:
      "قارن أسعار LG وSamsung وSony وToshiba وSharp وBosch وDyson وPhilips وBlack+Decker وTefal في الأجهزة المنزلية والشاشات.",
    brands: [
      "LG",
      "Samsung TV",
      "Sony TV",
      "Toshiba",
      "Sharp",
      "Bosch",
      "Dyson",
      "Philips",
      "Tefal",
      "Black+Decker",
      "Moulinex",
      "Kenwood",
      "Braun",
      "Midea",
      "Hisense",
      "Tornado",
      "Fresh",
      "ElAraby",
      "Zanussi",
      "Beko",
    ],
    stores:
      "Extra، Carrefour، B.TECH، Raya، Amazon، Noon، Jumia، Lulu، Xcite، eXtra Bahrain، Sharaf DG",
    links: [{ label: "أفضل سعر أونلاين", href: "/best-price-online" }],
  },
  {
    title: "ماركات العطور والجمال",
    intro:
      "قارن عروض Dior وChanel وGucci وYSL وArmani وVersace وTom Ford وCalvin Klein والعطور الأصلية ومنتجات التجميل.",
    brands: [
      "Dior",
      "Chanel",
      "Gucci",
      "YSL",
      "Armani",
      "Versace",
      "Tom Ford",
      "Calvin Klein",
      "Hugo Boss",
      "Paco Rabanne",
      "Carolina Herrera",
      "Burberry",
      "Victoria's Secret",
      "Sephora",
      "L'Oreal",
      "Maybelline",
      "Nivea",
      "The Ordinary",
      "CeraVe",
      "La Roche-Posay",
    ],
    stores:
      "Noon، Amazon، Jumia، Golden Scent، Nice One، Boutiqaat، Sephora، Carrefour، Lulu",
    links: [{ label: "مقارنة أسعار العطور", href: "/perfume-price-comparison" }],
  },
  {
    title: "ماركات الموضة والملابس والأحذية",
    intro:
      "قارن أسعار وعروض Nike وAdidas وPuma وNew Balance وSkechers وH&M وZara وLC Waikiki وShein وNamshi.",
    brands: [
      "Nike",
      "Adidas",
      "Puma",
      "New Balance",
      "Skechers",
      "Reebok",
      "Under Armour",
      "H&M",
      "Zara",
      "LC Waikiki",
      "DeFacto",
      "Shein",
      "Namshi",
      "Sivvi",
      "Max Fashion",
      "Centrepoint",
      "6thStreet",
      "Ounass",
      "Ray-Ban",
      "Tommy Hilfiger",
    ],
    stores:
      "Namshi، Sivvi، Shein، H&M، Max، Centrepoint، DeFacto، LC Waikiki، 6thStreet، Ounass، Jumia، Noon",
    links: [{ label: "دليل المتاجر", href: "/stores" }],
  },
  {
    title: "ماركات الألعاب والقيمنق",
    intro:
      "قارن أسعار PlayStation وXbox وNintendo وRazer وLogitech وMSI وASUS ROG وكراسي وشاشات وأجهزة قيمنق.",
    brands: [
      "PlayStation",
      "Sony PS5",
      "Xbox",
      "Nintendo",
      "Razer",
      "Logitech",
      "ASUS ROG",
      "MSI Gaming",
      "Acer Predator",
      "Alienware",
      "HyperX",
      "SteelSeries",
      "Corsair",
      "Cooler Master",
      "Redragon",
      "Meta Quest",
      "Steam Deck",
    ],
    stores:
      "Amazon، Noon، Jarir، Extra، Virgin Megastore، Xcite، Sharaf DG، Lulu، Carrefour",
    links: [{ label: "أرخص المنتجات", href: "/cheapest-products" }],
  },
  {
    title: "ماركات الأطفال والبيت والمنتجات اليومية",
    intro:
      "قارن أسعار Pampers وHuggies وJohnson's وBabyshop وMothercare وIKEA وHome Centre ومنتجات الأطفال والبيت.",
    brands: [
      "Pampers",
      "Huggies",
      "Johnson's",
      "Babyshop",
      "Mothercare",
      "FirstCry",
      "Mumzworld",
      "IKEA",
      "Home Centre",
      "Homes R Us",
      "ACE",
      "SACO",
      "Dettol",
      "Persil",
      "Ariel",
      "Nescafe",
      "Nestle",
      "Dove",
      "Head & Shoulders",
    ],
    stores:
      "Amazon، Noon، Jumia، Babyshop، Mothercare، Carrefour، Lulu، Panda، Othaim، Danube، Talabat Mart",
    links: [{ label: "وفر فلوسك عند الشراء أونلاين", href: "/save-money-online-shopping" }],
  },
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

export default function BrandsPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          دليل الماركات
          <span>قارن أسعار أشهر البراندات في السعودية ومصر والإمارات والخليج</span>
        </h1>

        <p>
          صفحة <strong>الماركات</strong> في <strong>BPS Chat</strong> أو{" "}
          <strong>بي بي اس شات</strong> تساعدك تبحث عن أسعار وعروض أشهر
          البراندات مثل Apple وSamsung وXiaomi وHP وDell وNike وAdidas وDyson
          وDior وChanel في السعودية، مصر، الإمارات، الكويت، قطر والبحرين.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن ماركة الآن
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
        <h2>لماذا صفحة الماركات مهمة؟</h2>

        <p>
          كثير من المستخدمين لا يبحثون باسم المنتج فقط، بل يبحثون باسم الماركة:
          سعر Apple، عروض Samsung، لابتوب HP، عطر Dior، حذاء Nike، مكنسة Dyson،
          شاشة LG، سماعات Sony. لذلك جمعنا الماركات المهمة مع الدول والمتاجر
          حتى تساعدك BPS Chat على مقارنة الأسعار والوصول لأفضل عرض.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>ماركات مشهورة</h3>
            <p>Apple، Samsung، Nike، Adidas، HP، Dell، Dior، Chanel، Dyson وأكثر.</p>
          </div>

          <div className="infoCard">
            <h3>كل الدول المدعومة</h3>
            <p>السعودية، مصر، الإمارات، الكويت، قطر والبحرين.</p>
          </div>

          <div className="infoCard">
            <h3>ربط بالمتاجر</h3>
            <p>Amazon، Noon، Jumia، Jarir، Extra، Carrefour، Xcite، Sharaf DG.</p>
          </div>
        </div>

        <h2>اختار الدولة</h2>

        <div className="quickLinks">
          {countries.map((country) => (
            <Link key={country.code} href={country.href}>
              ماركات ومنتجات في {country.name}
            </Link>
          ))}
        </div>

        {brandGroups.map((group) => (
          <section key={group.title} className="brandBlock">
            <div className="brandHeader">
              <div>
                <h2>{group.title}</h2>
                <p>{group.intro}</p>
              </div>

              <Link href={searchHref(group.title, "sa")} className="brandBtn">
                ابحث في هذا القسم
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مرتبطة:</strong>
              <span>{group.stores}</span>
            </div>

            <h3>أشهر الماركات</h3>

            <div className="brandGrid">
              {group.brands.map((brand) => (
                <div key={`${group.title}-${brand}`} className="brandCard">
                  <strong>{brand}</strong>

                  <div className="countryMiniLinks">
                    {countries.map((country) => (
                      <Link
                        key={`${brand}-${country.code}`}
                        href={searchHref(brand, country.code)}
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h3>روابط مرتبطة</h3>

            <div className="quickLinks">
              {group.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
              <Link href="/best-price-online">أفضل سعر أونلاين</Link>
              <Link href="/cheapest-products">أرخص المنتجات</Link>
            </div>
          </section>
        ))}

        <h2>أمثلة بحث قوية للماركات</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>نوع البحث</th>
                <th>أمثلة</th>
                <th>دول مناسبة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>سعر ماركة</td>
                <td>سعر iPhone، سعر Samsung، سعر Dyson، سعر HP Laptop</td>
                <td>السعودية، مصر، الإمارات، الكويت، قطر، البحرين</td>
              </tr>
              <tr>
                <td>عروض ماركة</td>
                <td>عروض Nike، عروض Adidas، عروض Dior، عروض Apple</td>
                <td>كل الدول المدعومة</td>
              </tr>
              <tr>
                <td>ماركة + متجر</td>
                <td>iPhone Noon، Samsung Amazon، HP Jarir، Dyson Extra</td>
                <td>السعودية، الإمارات، مصر والخليج</td>
              </tr>
              <tr>
                <td>ماركة + منتج</td>
                <td>Apple Watch، Samsung TV، Sony Headphones، Dior Perfume</td>
                <td>كل الدول المدعومة</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/categories">دليل الأقسام والمنتجات</Link>
          <Link href="/stores">دليل المتاجر</Link>
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/best-online-stores-egypt-gulf">أفضل المتاجر الإلكترونية</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ البحث عن أي ماركة</h2>
          <p>
            اكتب اسم الماركة أو المنتج، اختر الدولة، وقارن الأسعار بين المتاجر
            قبل الشراء باستخدام BPS Chat.
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
        .brandBtn {
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
        .brandBtn {
          background: #2f2f2f;
          color: #fff;
          border: 1px solid #444;
        }

        .brandBtn {
          white-space: nowrap;
          height: fit-content;
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
        .brandBlock {
          background: rgba(40,40,40,0.62);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .brandBlock {
          margin-top: 28px;
        }

        .brandHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .brandHeader h2 {
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
        .brandGrid {
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

        .brandCard {
          width: calc(25% - 9px);
          background: #2f2f2f;
          border: 1px solid #444;
          border-radius: 18px;
          padding: 14px;
        }

        .brandCard strong {
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
        .brandCard:hover,
        .countryMiniLinks a:hover,
        .brandBtn:hover {
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
          min-width: 820px;
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
          .brandCard {
            width: calc(33.333% - 8px);
          }
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          .brandCard {
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
          .brandCard {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}