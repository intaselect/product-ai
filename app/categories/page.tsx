import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title:
    "دليل الأقسام والمنتجات | قارن أسعار كل المنتجات في السعودية ومصر والخليج",
  description:
    "دليل شامل لأهم أقسام المنتجات في BPS Chat: موبايلات، لابتوبات، عطور، إلكترونيات، أجهزة منزلية، ملابس، ألعاب، أطفال، سيارات، ميكب وسوبرماركت في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
  keywords: [
    "دليل المنتجات",
    "أقسام المنتجات",
    "مقارنة أسعار المنتجات",
    "سعر موبايل",
    "سعر ايفون",
    "سعر سامسونج",
    "سعر لابتوب",
    "عروض عطور",
    "أجهزة منزلية",
    "ملابس اونلاين",
    "عروض إلكترونيات",
    "عروض سوبرماركت",
    "ألعاب أطفال",
    "اكسسوارات سيارات",
    "مقارنة أسعار السعودية",
    "مقارنة أسعار مصر",
    "مقارنة أسعار الإمارات",
    "مقارنة أسعار الكويت",
    "مقارنة أسعار قطر",
    "مقارنة أسعار البحرين",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

const countryCodes = [
  { name: "السعودية", code: "sa", href: "/saudi-product-price-comparison" },
  { name: "مصر", code: "eg", href: "/egypt-product-price-comparison" },
  { name: "الإمارات", code: "ae", href: "/uae-product-price-comparison" },
  { name: "الكويت", code: "kw", href: "/kuwait-product-price-comparison" },
  { name: "قطر", code: "qa", href: "/qatar-product-price-comparison" },
  { name: "البحرين", code: "bh", href: "/bahrain-product-price-comparison" },
];

const categories = [
  {
    title: "الجوالات والموبايلات",
    slug: "mobiles",
    description:
      "قارن أسعار iPhone وSamsung وXiaomi وOppo وHuawei وHonor وInfinix وRealme في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
    products: [
      "iPhone 17",
      "iPhone 17 Pro Max",
      "iPhone 16",
      "Samsung Galaxy S26",
      "Samsung Galaxy S25 Ultra",
      "Galaxy Z Fold",
      "Galaxy Z Flip",
      "Xiaomi",
      "Oppo Reno",
      "Realme",
      "Honor",
      "Huawei",
      "Infinix",
      "Tecno",
      "Nokia",
      "Motorola",
    ],
    stores:
      "Amazon, Noon, Jumia, Jarir, Extra, Carrefour, Xcite, Sharaf DG, B.TECH, Raya, 2B",
    intents: [
      "سعر ايفون",
      "أرخص موبايل",
      "عروض الجوالات",
      "مقارنة أسعار الموبايلات",
      "أفضل جوال للفئة المتوسطة",
    ],
    mainLinks: [
      { label: "مقارنة أسعار iPhone", href: "/iphone-price-comparison" },
      { label: "مقارنة أسعار Samsung", href: "/samsung-price-comparison" },
    ],
  },
  {
    title: "اللابتوبات والكمبيوتر",
    slug: "laptops",
    description:
      "قارن أسعار Laptop وMacBook وHP وDell وLenovo وAsus وAcer وGaming Laptop والشاشات وقطع الكمبيوتر.",
    products: [
      "MacBook",
      "HP Laptop",
      "Dell Laptop",
      "Lenovo Laptop",
      "Asus Laptop",
      "Acer Laptop",
      "MSI Gaming Laptop",
      "Gaming PC",
      "RTX 4090",
      "RTX 4080",
      "Monitor",
      "Keyboard",
      "Mouse",
      "Printer",
      "Router",
      "SSD",
    ],
    stores:
      "Jarir, Extra, Amazon, Noon, B.TECH, Raya, 2B, Sharaf DG, Xcite, Lulu, Carrefour",
    intents: [
      "سعر لابتوب",
      "أفضل لابتوب للدراسة",
      "أفضل لابتوب قيمنق",
      "عروض لابتوب",
      "لابتوب تقسيط",
    ],
    mainLinks: [{ label: "مقارنة أسعار Laptop", href: "/laptop-price-comparison" }],
  },
  {
    title: "الإلكترونيات والسماعات والساعات الذكية",
    slug: "electronics",
    description:
      "قارن أسعار AirPods وسماعات بلوتوث وApple Watch وSmart Watch وباور بانك وشواحن وكاميرات وأجهزة ذكية.",
    products: [
      "AirPods",
      "Apple Watch",
      "Samsung Buds",
      "Smart Watch",
      "Huawei Watch",
      "Xiaomi Watch",
      "Bluetooth Speaker",
      "Power Bank",
      "iPhone Charger",
      "USB-C Cable",
      "Camera",
      "Dash Cam",
      "Projector",
      "Smart Home",
      "Router",
      "Tablet",
    ],
    stores:
      "Amazon, Noon, Jarir, Extra, Carrefour, Sharaf DG, Xcite, Lulu, B.TECH, Raya",
    intents: [
      "سعر AirPods",
      "أفضل سماعات بلوتوث",
      "سعر ساعة أبل",
      "عروض إلكترونيات",
      "أفضل باور بانك",
    ],
    mainLinks: [{ label: "مقارنة الأسعار أونلاين", href: "/compare-prices-online" }],
  },
  {
    title: "العطور والجمال والعناية",
    slug: "perfume-beauty",
    description:
      "قارن عروض العطور الرجالي والنسائي، الميكب، منتجات العناية، skincare، hair care، العود والبخور والهدايا.",
    products: [
      "عطور رجالي",
      "عطور نسائي",
      "Perfume",
      "Oud",
      "Bakhoor",
      "Golden Scent",
      "Nice One",
      "Sephora",
      "Makeup",
      "Foundation",
      "Lipstick",
      "Skincare",
      "Hair Dryer",
      "Hair Straightener",
      "Men Grooming",
      "Body Care",
    ],
    stores:
      "Noon, Amazon, Jumia, Golden Scent, Nice One, Boutiqaat, Sephora, Carrefour, Lulu",
    intents: [
      "عروض عطور",
      "أرخص عطر",
      "عطور أصلية",
      "عطور رجالي فخمة",
      "أفضل عطر نسائي",
    ],
    mainLinks: [{ label: "مقارنة أسعار العطور", href: "/perfume-price-comparison" }],
  },
  {
    title: "الأجهزة المنزلية والمطبخ",
    slug: "home-appliances",
    description:
      "قارن أسعار الثلاجات والغسالات والتكييفات والشاشات والميكروويف والقلايات الهوائية وماكينات القهوة وأجهزة المطبخ.",
    products: [
      "ثلاجة",
      "غسالة",
      "تكييف",
      "شاشة",
      "Microwave",
      "Air Fryer",
      "Coffee Machine",
      "Vacuum Cleaner",
      "Dishwasher",
      "Cooker",
      "Oven",
      "Water Dispenser",
      "Heater",
      "Air Purifier",
      "Blender",
      "Kitchen Machine",
    ],
    stores:
      "Extra, Carrefour, B.TECH, Raya, Amazon, Noon, Jumia, Lulu, Xcite, eXtra Bahrain, Sharaf DG",
    intents: [
      "سعر غسالة",
      "سعر ثلاجة",
      "عروض أجهزة منزلية",
      "أفضل قلاية هوائية",
      "سعر شاشة",
    ],
    mainLinks: [{ label: "أفضل سعر أونلاين", href: "/best-price-online" }],
  },
  {
    title: "الألعاب والقيمنق",
    slug: "gaming",
    description:
      "قارن أسعار PlayStation وXbox وNintendo وكراسي قيمنق وشاشات قيمنق وكيبورد وماوس وتجميعات PC Gaming.",
    products: [
      "PS5",
      "PlayStation 5",
      "Xbox Series X",
      "Nintendo Switch",
      "Gaming Laptop",
      "Gaming Chair",
      "Gaming Monitor",
      "Mechanical Keyboard",
      "Gaming Mouse",
      "Headset",
      "Controller",
      "Games",
      "Digital Cards",
      "PC Gaming",
      "RTX",
      "Streaming Microphone",
    ],
    stores:
      "Amazon, Noon, Jarir, Extra, Virgin Megastore, Xcite, Sharaf DG, Lulu, Carrefour",
    intents: [
      "سعر PS5",
      "أرخص بلايستيشن 5",
      "عروض قيمنق",
      "أفضل شاشة قيمنق",
      "تجميعة PC Gaming",
    ],
    mainLinks: [{ label: "أرخص المنتجات", href: "/cheapest-products" }],
  },
  {
    title: "الموضة والملابس والأحذية",
    slug: "fashion",
    description:
      "قارن عروض الملابس الرجالي والنسائي والأطفال، الأحذية، الشنط، العبايات، الساعات، النظارات والاكسسوارات.",
    products: [
      "ملابس رجالي",
      "ملابس نسائي",
      "ملابس أطفال",
      "Shoes",
      "Sneakers",
      "عبايات",
      "Dresses",
      "Bags",
      "Watches",
      "Sunglasses",
      "Ray-Ban",
      "Jackets",
      "Sportswear",
      "Hoodies",
      "Kids Fashion",
      "Luxury Fashion",
    ],
    stores:
      "Namshi, Sivvi, Shein, H&M, Max Fashion, Centrepoint, DeFacto, LC Waikiki, 6thStreet, Ounass, Jumia, Noon",
    intents: [
      "عروض ملابس",
      "أحذية رجالي",
      "عبايات أونلاين",
      "نظارات شمس",
      "عروض ملابس أطفال",
    ],
    mainLinks: [{ label: "دليل المتاجر", href: "/stores" }],
  },
  {
    title: "الأطفال والرضع والألعاب التعليمية",
    slug: "baby-kids",
    description:
      "قارن أسعار ألعاب الأطفال، حفاضات، حليب أطفال، عربات أطفال، كراسي سيارة، ملابس أطفال وتابلت أطفال.",
    products: [
      "حليب أطفال",
      "حفاضات أطفال",
      "Baby Diapers",
      "Baby Formula",
      "تابلت أطفال",
      "ألعاب تعليمية",
      "عربة أطفال",
      "كرسي سيارة للأطفال",
      "ملابس أطفال",
      "Baby Toys",
      "Baby Monitor",
      "Kids Tablet",
      "School Bags",
      "Lunch Box",
      "Babyshop",
      "Mothercare",
    ],
    stores:
      "Amazon, Noon, Jumia, Babyshop, Mothercare, FirstCry, Mumzworld, Carrefour, Lulu, Centrepoint",
    intents: [
      "أفضل حفاضات أطفال",
      "حليب أطفال",
      "تابلت أطفال",
      "ألعاب تعليمية",
      "عربة أطفال",
    ],
    mainLinks: [{ label: "وفر فلوسك عند الشراء أونلاين", href: "/save-money-online-shopping" }],
  },
  {
    title: "السوبرماركت والبقالة والمنتجات اليومية",
    slug: "grocery",
    description:
      "قارن عروض السوبرماركت والمنتجات اليومية مثل القهوة، المنظفات، الطعام، المشروبات، العناية المنزلية ومستلزمات البيت.",
    products: [
      "قهوة",
      "قهوة تركي",
      "منظفات",
      "حفاضات",
      "مشروبات",
      "أطعمة",
      "Supermarket",
      "Grocery",
      "Rice",
      "Oil",
      "Milk",
      "Snacks",
      "Household Essentials",
      "Cleaning Products",
      "Personal Care",
      "Pet Supplies",
    ],
    stores:
      "Carrefour, Lulu, Panda, Hyper Panda, Othaim, Danube, Tamimi, Spinneys, Choithrams, Metro, Seoudi, Talabat Mart",
    intents: [
      "عروض سوبرماركت",
      "عروض كارفور",
      "عروض لولو",
      "عروض بنده",
      "خصومات البقالة",
    ],
    mainLinks: [{ label: "أفضل وقت للشراء أونلاين", href: "/best-time-to-buy-online" }],
  },
  {
    title: "السيارات والاكسسوارات",
    slug: "car-accessories",
    description:
      "قارن أسعار اكسسوارات السيارات، كاميرا سيارة، داش كام، شاحن سيارة، ديكور سيارة، باور بنك للسيارة وقطع بسيطة.",
    products: [
      "Dash Cam",
      "كاميرا سيارة",
      "شاحن سيارة",
      "Car Charger",
      "Jump Starter",
      "باور بنك سيارة",
      "Car Accessories",
      "Car Vacuum",
      "Phone Holder",
      "Tyre Inflator",
      "Seat Covers",
      "Car Perfume",
      "LED Lights",
      "Car Mats",
      "Car Care",
      "OBD Scanner",
    ],
    stores:
      "Amazon, Noon, Extra, Carrefour, SACO, ACE, Lulu, AliExpress, Temu, Desertcart",
    intents: [
      "اكسسوارات سيارات",
      "داش كام",
      "شاحن سيارة",
      "كاميرا سيارة",
      "باور بنك للسيارة",
    ],
    mainLinks: [{ label: "أرخص المنتجات", href: "/cheapest-products" }],
  },
  {
    title: "الرياضة والصحة واللياقة",
    slug: "sports-health",
    description:
      "قارن أسعار الساعات الرياضية، السير الكهربائي، الدراجات الرياضية، أجهزة اللياقة، البروتين، أدوات المساج ومنتجات الصحة.",
    products: [
      "ساعة رياضية",
      "Smart Band",
      "Treadmill",
      "سير كهربائي",
      "دراجة رياضية",
      "Protein",
      "Creatine",
      "Massage Gun",
      "Fitness Equipment",
      "Yoga Mat",
      "Dumbbells",
      "Home Gym",
      "Medical Devices",
      "Blood Pressure Monitor",
      "Thermometer",
      "Scale",
    ],
    stores:
      "Amazon, Noon, Extra, Decathlon, Carrefour, Lulu, Xcite, Sharaf DG, Jumia",
    intents: [
      "أفضل ساعة رياضية",
      "سعر بروتين",
      "شراء سير كهربائي",
      "دراجة رياضية",
      "أجهزة رياضية منزلية",
    ],
    mainLinks: [{ label: "دليل الشراء الآمن أونلاين", href: "/online-shopping-safety-guide" }],
  },
];

function searchHref(query: string, code: string) {
  return `/search/${encodeURIComponent(query)}-${code}`;
}

export default function CategoriesPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          دليل الأقسام والمنتجات
          <span>قارن أسعار أي منتج في السعودية ومصر والإمارات والخليج</span>
        </h1>

        <p>
          صفحة <strong>الأقسام</strong> في <strong>BPS Chat</strong> أو{" "}
          <strong>بي بي اس شات</strong> تجمع أهم أنواع المنتجات التي يبحث عنها
          المستخدمون: موبايلات، لابتوبات، عطور، إلكترونيات، أجهزة منزلية،
          ملابس، ألعاب، أطفال، سيارات، سوبرماركت، رياضة وصحة. الهدف إنك توصل
          بسرعة إلى أفضل سعر وعروض المتاجر في السعودية، مصر، الإمارات، الكويت،
          قطر والبحرين.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن منتج الآن
          </Link>
          <Link href="/stores" className="secondaryBtn">
            دليل المتاجر
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            مقارنة الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا صفحة الأقسام مهمة؟</h2>

        <p>
          أي شخص يبحث في جوجل عن منتج غالبًا يستخدم كلمات مثل: سعر، عروض، أرخص،
          أفضل، مقارنة، تقسيط، اليوم، أو اسم متجر مثل نون، أمازون، جوميا، جرير،
          اكسترا، كارفور، Xcite، Sharaf DG، Lulu، B.TECH وRaya. لذلك جمعنا
          الأقسام والمنتجات والمتاجر والدول في صفحة واحدة تساعد جوجل والمستخدم
          يفهموا إن BPS Chat موقع متخصص في مقارنة أسعار المنتجات.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>منتجات كثيرة</h3>
            <p>
              من الموبايلات واللابتوبات إلى العطور والملابس والأجهزة المنزلية
              والسوبرماركت.
            </p>
          </div>

          <div className="infoCard">
            <h3>كل الدول المدعومة</h3>
            <p>
              السعودية، مصر، الإمارات، الكويت، قطر والبحرين مع روابط بحث مباشرة
              لكل دولة.
            </p>
          </div>

          <div className="infoCard">
            <h3>ربط بالمتاجر</h3>
            <p>
              Amazon وNoon وJumia وJarir وExtra وCarrefour وXcite وSharaf DG
              وغيرها.
            </p>
          </div>
        </div>

        <h2>اختار الدولة للمقارنة</h2>

        <div className="quickLinks">
          {countryCodes.map((country) => (
            <Link key={country.code} href={country.href}>
              مقارنة أسعار {country.name}
            </Link>
          ))}
        </div>

        <h2>روابط المنتجات الرئيسية</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
          <Link href="/stores">دليل المتاجر</Link>
        </div>

        {categories.map((category) => (
          <section key={category.slug} className="categoryBlock">
            <div className="categoryHeader">
              <div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
              <Link href={searchHref(category.title, "sa")} className="categoryBtn">
                ابحث عن {category.title}
              </Link>
            </div>

            <div className="miniPanel">
              <strong>متاجر مهمة:</strong>
              <span>{category.stores}</span>
            </div>

            <h3>أمثلة منتجات داخل قسم {category.title}</h3>

            <div className="productGrid">
              {category.products.map((product) => (
                <div key={`${category.slug}-${product}`} className="productCard">
                  <strong>{product}</strong>
                  <div className="countryMiniLinks">
                    {countryCodes.map((country) => (
                      <Link
                        key={`${product}-${country.code}`}
                        href={searchHref(product, country.code)}
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h3>كلمات بحث قوية لهذا القسم</h3>

            <div className="quickLinks">
              {category.intents.map((intent) =>
                countryCodes.map((country) => (
                  <Link
                    key={`${category.slug}-${intent}-${country.code}`}
                    href={searchHref(intent, country.code)}
                  >
                    {intent} - {country.name}
                  </Link>
                ))
              )}
            </div>

            <h3>صفحات مفيدة مرتبطة</h3>

            <div className="quickLinks">
              {category.mainLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/stores">أفضل المتاجر الإلكترونية</Link>
              <Link href="/save-money-online-shopping">
                وفر فلوسك عند الشراء أونلاين
              </Link>
            </div>
          </section>
        ))}

        <h2>جدول سريع لأهم الأقسام والمتاجر</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>القسم</th>
                <th>منتجات يبحث عنها الناس</th>
                <th>متاجر مرتبطة</th>
              </tr>
            </thead>
            <tbody>
              {categories.slice(0, 8).map((category) => (
                <tr key={`table-${category.slug}`}>
                  <td>{category.title}</td>
                  <td>{category.products.slice(0, 6).join("، ")}</td>
                  <td>{category.stores}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>كيف تستخدم BPS Chat للبحث عن أي منتج؟</h2>

        <p>
          اكتب اسم المنتج في شريط البحث، اختر الدولة المناسبة، ثم قارن النتائج
          بين المتاجر. جرب صيغ بحث مختلفة مثل: سعر المنتج، عروض المنتج، أرخص
          منتج، أفضل سعر، اسم المنتج مع اسم المتجر، أو اسم المنتج مع الدولة.
          مثلًا: “سعر ايفون في السعودية”، “عروض جوميا مصر”، “لابتوب HP في
          الإمارات”، “عروض Xcite الكويت”، “عطور نون السعودية”.
        </p>

        <div className="finalCta">
          <h2>ابدأ من هنا</h2>
          <p>
            سواء كنت تبحث عن جوال، لابتوب، عطر، جهاز منزلي، ملابس، لعبة أطفال،
            منتج سوبرماركت أو اكسسوار سيارة، استخدم BPS Chat لمقارنة الأسعار
            والعروض في الدول المدعومة قبل الشراء.
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
        .categoryBtn {
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
        .categoryBtn {
          background: #2f2f2f;
          color: #fff;
          border: 1px solid #444;
        }

        .categoryBtn {
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
        .categoryBlock {
          background: rgba(40,40,40,0.62);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .categoryBlock {
          margin-top: 28px;
        }

        .categoryHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .categoryHeader h2 {
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

        .productCard {
          width: calc(25% - 9px);
          background: #2f2f2f;
          border: 1px solid #444;
          border-radius: 18px;
          padding: 14px;
        }

        .productCard strong {
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
        .countryMiniLinks a:hover,
        .categoryBtn:hover {
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
          min-width: 860px;
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
          .productCard {
            width: calc(33.333% - 8px);
          }
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

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
          .productCard {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}