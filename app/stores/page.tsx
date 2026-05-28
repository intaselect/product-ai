import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "أفضل المتاجر الإلكترونية في السعودية ومصر والإمارات والخليج | BPS Chat",
  description:
    "دليل شامل لأهم المتاجر الإلكترونية في السعودية ومصر والإمارات والكويت وقطر والبحرين، مع مقارنة الأسعار والعروض عبر BPS Chat بي بي اس شات.",
  keywords: [
    "أفضل المتاجر الإلكترونية",
    "متاجر إلكترونية",
    "متاجر السعودية",
    "متاجر مصر",
    "متاجر الإمارات",
    "متاجر الكويت",
    "متاجر قطر",
    "متاجر البحرين",
    "عروض نون",
    "عروض أمازون",
    "عروض جوميا",
    "عروض جرير",
    "عروض اكسترا",
    "عروض كارفور",
    "Xcite Kuwait",
    "Sharaf DG",
    "Lulu Hypermarket",
    "B.TECH",
    "Raya",
    "مقارنة أسعار",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

const countries = [
  {
    name: "السعودية",
    href: "/saudi-product-price-comparison",
    intro:
      "أهم متاجر السعودية للبحث عن الجوالات، اللابتوبات، العطور، الأجهزة المنزلية، الشاشات، السماعات، الملابس والعروض اليومية.",
    stores: [
      "Amazon.sa",
      "Noon Saudi",
      "Jarir Bookstore",
      "Extra Stores",
      "Carrefour Saudi",
      "Lulu Saudi",
      "Panda",
      "Hyper Panda",
      "Danube",
      "Tamimi Markets",
      "SACO",
      "Namshi",
      "Sivvi",
      "Shein Saudi",
      "Centrepoint",
      "Max Fashion",
      "H&M Saudi",
      "IKEA Saudi",
      "Nice One",
      "Golden Scent",
      "Almanea",
      "Axiom Telecom",
      "eXtra Electronics",
      "Othaim Markets",
      "Virgin Megastore Saudi",
      "Microless Saudi",
      "Desertcart Saudi",
      "AliExpress Saudi",
      "Temu Saudi",
      "Trendyol Saudi",
    ],
    keywords: [
      "عروض نون السعودية",
      "عروض أمازون السعودية",
      "عروض جرير",
      "عروض اكسترا",
      "أفضل سعر في السعودية",
      "أرخص سعر في السعودية",
    ],
  },
  {
    name: "مصر",
    href: "/egypt-product-price-comparison",
    intro:
      "أهم متاجر مصر للبحث عن أسعار الموبايلات، اللابتوبات، الأجهزة الكهربائية، الشاشات، العطور، الملابس والمنتجات اليومية.",
    stores: [
      "Amazon.eg",
      "Jumia Egypt",
      "Noon Egypt",
      "Carrefour Egypt",
      "B.TECH",
      "Raya Shop",
      "2B Egypt",
      "Dream 2000",
      "ElAraby Group",
      "Fresh Electronics",
      "Zanussi Egypt",
      "LG Egypt",
      "Samsung Egypt",
      "Tradeline",
      "iPlus",
      "Switch Plus",
      "Mobile Shop",
      "CompuMe",
      "H&M Egypt",
      "DeFacto Egypt",
      "LC Waikiki Egypt",
      "Max Fashion Egypt",
      "Centrepoint Egypt",
      "IKEA Egypt",
      "Talabat Mart",
      "Metro Markets",
      "Seoudi Market",
      "Gourmet Egypt",
      "Hedeya Store",
      "Hobby Egypt",
    ],
    keywords: [
      "عروض جوميا",
      "عروض أمازون مصر",
      "عروض نون مصر",
      "عروض بي تك",
      "عروض راية",
      "أسعار الموبايلات في مصر",
    ],
  },
  {
    name: "الإمارات",
    href: "/uae-product-price-comparison",
    intro:
      "أهم متاجر الإمارات للبحث عن الإلكترونيات، الجوالات، العطور، الموضة، الأجهزة المنزلية، اللابتوبات والعروض.",
    stores: [
      "Amazon.ae",
      "Noon UAE",
      "Carrefour UAE",
      "Sharaf DG",
      "Lulu UAE",
      "Jumbo Electronics",
      "Emax",
      "Virgin Megastore UAE",
      "Dubai Store",
      "Namshi UAE",
      "Sivvi UAE",
      "Ounass",
      "6thStreet",
      "Centrepoint UAE",
      "Max Fashion UAE",
      "H&M UAE",
      "IKEA UAE",
      "ACE UAE",
      "Microless",
      "Desertcart UAE",
      "Mumzworld",
      "FirstCry UAE",
      "Kibsons",
      "Union Coop",
      "Spinneys",
      "Choithrams",
      "Golden Scent UAE",
      "Nice One UAE",
      "AliExpress UAE",
      "Temu UAE",
    ],
    keywords: [
      "Amazon UAE offers",
      "Noon UAE deals",
      "عروض نون الإمارات",
      "عروض كارفور الإمارات",
      "عروض Sharaf DG",
      "أفضل سعر في الإمارات",
    ],
  },
  {
    name: "الكويت",
    href: "/kuwait-product-price-comparison",
    intro:
      "أهم متاجر الكويت للبحث عن الجوالات، الإلكترونيات، الأجهزة المنزلية، العطور، المنتجات اليومية والعروض.",
    stores: [
      "Xcite Kuwait",
      "Best Al-Yousifi",
      "Taw9eel",
      "Lulu Kuwait",
      "Carrefour Kuwait",
      "HyperMax Kuwait",
      "Noon Kuwait",
      "Blink Kuwait",
      "Eureka Kuwait",
      "Jarir Kuwait",
      "Grand Hyper Kuwait",
      "Nesto Kuwait",
      "Sultan Center",
      "City Centre Kuwait",
      "Oncost Kuwait",
      "LuLu Webstore Kuwait",
      "Boutiqaat",
      "Namshi Kuwait",
      "Sivvi Kuwait",
      "IKEA Kuwait",
      "Centrepoint Kuwait",
      "Max Fashion Kuwait",
      "H&M Kuwait",
      "Mothercare Kuwait",
      "Mamas & Papas Kuwait",
      "Ubuy Kuwait",
      "Desertcart Kuwait",
      "AliExpress Kuwait",
      "Temu Kuwait",
      "Microless Kuwait",
    ],
    keywords: [
      "عروض Xcite الكويت",
      "عروض الغانم",
      "عروض Best Al-Yousifi",
      "عروض لولو الكويت",
      "عروض الكويت",
      "أفضل سعر في الكويت",
    ],
  },
  {
    name: "قطر",
    href: "/qatar-product-price-comparison",
    intro:
      "أهم متاجر قطر للبحث عن الإلكترونيات، الجوالات، اللابتوبات، العطور، الأجهزة المنزلية، المنتجات اليومية والعروض.",
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
      "Spar Qatar",
      "Al Meera",
      "Ansar Gallery Qatar",
      "IKEA Qatar",
      "Centrepoint Qatar",
      "Max Fashion Qatar",
      "H&M Qatar",
      "Namshi Qatar",
      "Sivvi Qatar",
      "Desertcart Qatar",
      "Ubuy Qatar",
      "AliExpress Qatar",
      "Temu Qatar",
      "Microless Qatar",
      "Lulu Webstore Qatar",
      "Carrefour Online Qatar",
      "Babyshop Qatar",
      "Mothercare Qatar",
      "Homes R Us Qatar",
      "ACE Qatar",
    ],
    keywords: [
      "Qatar deals",
      "Qatar offers",
      "عروض قطر",
      "عروض كارفور قطر",
      "عروض لولو قطر",
      "أفضل سعر في قطر",
    ],
  },
  {
    name: "البحرين",
    href: "/bahrain-product-price-comparison",
    intro:
      "أهم متاجر البحرين للبحث عن الجوالات، اللابتوبات، الإلكترونيات، الأجهزة المنزلية، العطور، الملابس والعروض.",
    stores: [
      "Sharaf DG Bahrain",
      "eXtra Bahrain",
      "Lulu Bahrain",
      "Carrefour Bahrain",
      "HyperMax Bahrain",
      "Noon Bahrain",
      "Virgin Megastore Bahrain",
      "Ashrafs Bahrain",
      "Ansar Gallery Bahrain",
      "Sharaf DG Online Bahrain",
      "LuLu Webstore Bahrain",
      "Centrepoint Bahrain",
      "Max Fashion Bahrain",
      "H&M Bahrain",
      "Namshi Bahrain",
      "Sivvi Bahrain",
      "IKEA Bahrain",
      "Home Centre Bahrain",
      "Babyshop Bahrain",
      "Mothercare Bahrain",
      "Ubuy Bahrain",
      "Desertcart Bahrain",
      "AliExpress Bahrain",
      "Temu Bahrain",
      "Microless Bahrain",
      "Lulu Hypermarket Bahrain",
      "Carrefour Online Bahrain",
      "Jashanmal Bahrain",
      "Sharaf DG Electronics",
      "eXtra Electronics Bahrain",
    ],
    keywords: [
      "عروض البحرين",
      "عروض Sharaf DG البحرين",
      "عروض eXtra البحرين",
      "عروض لولو البحرين",
      "Bahrain deals",
      "أفضل سعر في البحرين",
    ],
  },
];

const productLinks = [
  { label: "مقارنة أسعار iPhone", href: "/iphone-price-comparison" },
  { label: "مقارنة أسعار Samsung", href: "/samsung-price-comparison" },
  { label: "مقارنة أسعار Laptop", href: "/laptop-price-comparison" },
  { label: "مقارنة أسعار العطور", href: "/perfume-price-comparison" },
  { label: "أرخص المنتجات", href: "/cheapest-products" },
  { label: "أفضل سعر أونلاين", href: "/best-price-online" },
  { label: "مقارنة الأسعار أونلاين", href: "/compare-prices-online" },
];

export default function StoresPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          أفضل المتاجر الإلكترونية في السعودية ومصر والإمارات والخليج
          <span>دليل شامل للمتاجر والعروض ومقارنة الأسعار قبل الشراء</span>
        </h1>

        <p>
          صفحة <strong>المتاجر</strong> في <strong>BPS Chat</strong> أو{" "}
          <strong>بي بي اس شات</strong> تجمع أهم متاجر التسوق أونلاين في
          السعودية، مصر، الإمارات، الكويت، قطر والبحرين، حتى تقدر تعرف أين تبحث
          عن أفضل سعر، عروض اليوم، أرخص المنتجات، ومقارنة الأسعار بين المتاجر.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن منتج الآن
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            مقارنة الأسعار أونلاين
          </Link>
          <Link href="/best-online-stores-egypt-gulf" className="secondaryBtn">
            دليل المتاجر الإلكترونية
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا صفحة المتاجر مهمة في BPS Chat؟</h2>

        <p>
          عند البحث عن منتج مثل iPhone أو Samsung أو Laptop أو عطر أو شاشة أو
          سماعات، المستخدم غالبًا يفتح Amazon وNoon وJumia وJarir وExtra
          وCarrefour وXcite وSharaf DG وLulu ومتاجر أخرى. لكن BPS Chat يساعدك
          تربط البحث بالمتجر والدولة والمنتج، فتقارن الأسعار بشكل أسرع بدل فتح
          كل متجر يدويًا.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>متاجر كثيرة</h3>
            <p>
              جمعنا أسماء متاجر كثيرة في كل دولة حتى ترتبط الصفحة بكلمات بحث
              قوية مثل عروض نون، عروض أمازون، عروض جوميا، عروض جرير، Xcite وSharaf DG.
            </p>
          </div>

          <div className="infoCard">
            <h3>كل دولة لوحدها</h3>
            <p>
              السعودية ومصر والإمارات والكويت وقطر والبحرين لكل دولة متاجر
              مختلفة وعروض مختلفة، لذلك نظمنا الصفحة حسب الدولة.
            </p>
          </div>

          <div className="infoCard">
            <h3>منتجات وعروض</h3>
            <p>
              الصفحة مرتبطة بصفحات iPhone وSamsung وLaptop والعطور وأرخص
              المنتجات وأفضل سعر أونلاين.
            </p>
          </div>
        </div>

        <h2>روابط سريعة للمنتجات والمقارنات</h2>

        <div className="quickLinks">
          {productLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        {countries.map((country) => (
          <section key={country.name} className="countryBlock">
            <div className="countryHeader">
              <h2>أفضل المتاجر الإلكترونية في {country.name}</h2>
              <Link href={country.href} className="countryBtn">
                صفحة مقارنة أسعار {country.name}
              </Link>
            </div>

            <p>{country.intro}</p>

            <h3>متاجر {country.name}</h3>

            <div className="storesGrid">
              {country.stores.map((store) => (
                <Link
                  key={`${country.name}-${store}`}
                  href={`/search/${encodeURIComponent(store)}-${country.href.includes("saudi") ? "sa" : country.href.includes("egypt") ? "eg" : country.href.includes("uae") ? "ae" : country.href.includes("kuwait") ? "kw" : country.href.includes("qatar") ? "qa" : "bh"}`}
                  className="storeCard"
                >
                  <span>{store}</span>
                  <small>عروض وأسعار {store}</small>
                </Link>
              ))}
            </div>

            <h3>كلمات بحث قوية في {country.name}</h3>

            <div className="quickLinks">
              {country.keywords.map((keyword) => (
                <Link
                  key={`${country.name}-${keyword}`}
                  href={`/search/${encodeURIComponent(keyword)}-${country.href.includes("saudi") ? "sa" : country.href.includes("egypt") ? "eg" : country.href.includes("uae") ? "ae" : country.href.includes("kuwait") ? "kw" : country.href.includes("qatar") ? "qa" : "bh"}`}
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2>أشهر أنواع المنتجات التي يمكنك مقارنتها بين المتاجر</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>نوع المنتج</th>
                <th>أمثلة بحث</th>
                <th>متاجر مهمة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>الجوالات</td>
                <td>سعر iPhone، سعر Samsung، أرخص جوال، عروض الجوالات</td>
                <td>Amazon، Noon، Jarir، Extra، Jumia، Xcite، Sharaf DG</td>
              </tr>
              <tr>
                <td>اللابتوبات</td>
                <td>سعر Laptop، عروض HP، Dell، Lenovo، MacBook</td>
                <td>Jarir، Extra، Amazon، Noon، B.TECH، Raya، 2B، Sharaf DG</td>
              </tr>
              <tr>
                <td>العطور</td>
                <td>عطور رجالي، عطور نسائي، عروض عطور، Perfume offers</td>
                <td>Noon، Amazon، Jumia، Golden Scent، Nice One، Boutiqaat</td>
              </tr>
              <tr>
                <td>الأجهزة المنزلية</td>
                <td>سعر غسالة، ثلاجة، تكييف، شاشة، ميكروويف</td>
                <td>Extra، Carrefour، B.TECH، Raya، Lulu، Xcite، eXtra Bahrain</td>
              </tr>
              <tr>
                <td>الموضة والملابس</td>
                <td>عروض ملابس، أحذية، عبايات، شنط، Fashion offers</td>
                <td>Namshi، Sivvi، H&M، Max، Centrepoint، DeFacto، LC Waikiki</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>كيف تستخدم BPS Chat مع المتاجر؟</h2>

        <p>
          اكتب اسم المنتج أو اسم المتجر مثل “عروض نون السعودية” أو “سعر ايفون في
          أمازون مصر” أو “عروض Xcite الكويت”، ثم اختر الدولة المناسبة. بعدها
          يمكنك مقارنة النتائج ومراجعة المتجر الأصلي قبل الشراء.
        </p>

        <div className="finalCta">
          <h2>ابدأ مقارنة المتاجر والأسعار الآن</h2>
          <p>
            استخدم BPS Chat للبحث عن المنتجات والعروض داخل السعودية ومصر
            والإمارات والكويت وقطر والبحرين، وقارن بين المتاجر قبل الشراء.
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
          max-width: 860px;
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
          padding: 9px 13px;
          font-size: 13px;
        }

        .content {
          max-width: 1100px;
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
        .countryBlock {
          background: rgba(40,40,40,0.62);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .countryBlock {
          margin-top: 28px;
        }

        .countryHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .countryHeader h2 {
          margin-top: 0;
        }

        .quickLinks,
        .storesGrid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .quickLinks a,
        .storeCard {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
        }

        .storeCard {
          width: calc(25% - 9px);
          border-radius: 16px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .storeCard span {
          font-weight: 800;
        }

        .storeCard small {
          color: #aaa;
          line-height: 1.5;
        }

        .quickLinks a:hover,
        .storeCard:hover,
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
          min-width: 760px;
          border-collapse: collapse;
          background: rgba(40,40,40,0.55);
        }

        th,
        td {
          padding: 15px;
          text-align: right;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #e8e8e8;
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
          max-width: 760px;
          margin: 0 auto 22px;
        }

        @media (max-width: 900px) {
          .storeCard {
            width: calc(50% - 6px);
          }
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }
        }

        @media (max-width: 520px) {
          .storeCard {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}