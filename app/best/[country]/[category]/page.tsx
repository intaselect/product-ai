import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Link from "next/link";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const revalidate = 86400;
export const dynamicParams = true;

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

const categoryNames: Record<string, string> = {
  electronics: "الإلكترونيات",
  mobiles: "الموبايلات",
  mobile_accessories: "إكسسوارات الجوال",
  smart_watch: "الساعات الذكية",
  power_bank: "الباور بانك",
  chargers: "الشواحن والكابلات",
  headphones: "السماعات",
  computers: "اللابتوبات والكمبيوتر",
  computer_accessories: "إكسسوارات الكمبيوتر",
  gaming: "الجيمينج والألعاب",
  home: "المنزل والمطبخ",
  fashion: "الملابس",
  shoes: "الأحذية",
  bags: "الشنط",
  beauty: "الجمال والعناية",
  cars: "السيارات والإكسسوارات",
  kids: "منتجات الأطفال",
  sports: "الرياضة",
  cameras: "الكاميرات",
  camera_accessories: "ملحقات الكاميرات",
  other: "منتجات متنوعة",
};

function productUrl(item: any) {
  const name = String(item.product_name || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");

  return `/customer-offers/product/${name}-${item.country || "sa"}-${item.id}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; category: string }>;
}): Promise<Metadata> {
  const { country, category } = await params;

  const countryName = countryNames[country] || "السوق العربي";
  const categoryName = categoryNames[category] || "المنتجات";

  return {
    title: `أفضل ${categoryName} في ${countryName} | عروض وأسعار | BPS Chat`,
    description: `اكتشف أفضل ${categoryName} في ${countryName} من عروض العملاء والمتاجر على BPS Chat بي بي اس شات، وقارن الأسعار قبل الشراء.`,
    keywords: [
      `أفضل ${categoryName} في ${countryName}`,
      `عروض ${categoryName}`,
      `سعر ${categoryName}`,
      "BPS Chat",
      "بي بي اس شات",
    ],
  };
}

export default async function BestCategoryPage({
  params,
}: {
  params: Promise<{ country: string; category: string }>;
}) {
  const { country, category } = await params;

  const safeCountry = countryNames[country] ? country : "sa";
  const safeCategory = categoryNames[category] ? category : "electronics";

  const countryName = countryNames[safeCountry];
  const categoryName = categoryNames[safeCategory];
  const currency = currencies[safeCountry];

  const { data: offers } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, store_name, country, category, created_at")
    .eq("status", "approved")
    .eq("country", safeCountry)
    .overlaps("category", [safeCategory])
    .order("created_at", { ascending: false })
    .limit(400);

  const products = offers || [];

  return (
    <main className="bestPage" dir="rtl">
      <section className="hero">
        <div className="badge">🔥 Best Products | BPS Chat</div>

        <h1>
          أفضل {categoryName} في {countryName}
          <span>عروض ومنتجات مختارة تلقائيًا حسب الدولة والقسم</span>
        </h1>

        <p>
          صفحة تلقائية من <strong>BPS Chat</strong> تعرض أفضل عروض{" "}
          <strong>{categoryName}</strong> في {countryName} من متجر العملاء،
          مع روابط مباشرة للمنتجات ومقارنة أسعار تساعدك تختار أفضل عرض.
        </p>

        <div className="heroBtns">
          <Link href={`/customer-offers?country=${safeCountry}&category=${safeCategory}`}>
            تصفح عروض {categoryName}
          </Link>
          <Link href="/">ابحث عن منتج</Link>
        </div>
      </section>

      <MarketPromoSection countryCode={safeCountry} />

      <section className="content">
        <div className="sectionHead">
          <div>
            <h2>🔥 أفضل عروض {categoryName}</h2>
            <p>
              أحدث المنتجات المتاحة في {countryName} حسب قسم {categoryName}
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="productsGrid">
            {products.map((item: any) => (
              <Link href={productUrl(item)} className="productCard" key={item.id}>
                <div className="imageBox">
                  <img src={item.image_url} alt={item.product_name} loading="lazy" />
                  <span>{countryName}</span>
                </div>

                <div className="cardBody">
                  <small>{item.store_name || "عرض عميل BPS Chat"}</small>
                  <h3>{item.product_name}</h3>

                  <div className="priceRow">
                    <strong>{item.price}</strong>
                    <b>{currency}</b>
                  </div>

                  <em>عرض المنتج</em>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="emptyBox">
            <h2>لا توجد منتجات كافية حاليًا</h2>
            <p>
              سيتم عرض أفضل {categoryName} في {countryName} تلقائيًا عند إضافة
              عروض جديدة لهذا القسم.
            </p>
            <Link href="/customer-offers/add">أضف أول عرض</Link>
          </div>
        )}

        <section className="seoBox">
          <h2>لماذا هذه الصفحة مهمة قبل الشراء؟</h2>
          <p>
            عند البحث عن أفضل {categoryName} في {countryName}، قد تختلف الأسعار
            والعروض حسب المتجر والتوفر والشحن. لذلك تساعدك هذه الصفحة على
            اكتشاف عروض حقيقية من العملاء والمتاجر داخل BPS Chat، مع إمكانية
            الانتقال لصفحة كل منتج ومراجعة السعر والتفاصيل.
          </p>

          <p>
            يتم تحديث هذه الصفحة تلقائيًا بناءً على المنتجات المعتمدة داخل متجر
            BPS Chat، مما يجعلها مناسبة لمعرفة أحدث عروض {categoryName} في{" "}
            {countryName}.
          </p>
        </section>

        <section className="linksBox">
          <h2>روابط مفيدة</h2>
          <div>
            <Link href={`/customer-offers?country=${safeCountry}`}>
              عروض {countryName}
            </Link>
            <Link href={`/customer-offers?country=${safeCountry}&category=${safeCategory}`}>
              كل عروض {categoryName}
            </Link>
            <Link href={`/search/أفضل-${safeCategory}-${safeCountry}`}>
              مقارنة أسعار {categoryName}
            </Link>
            <Link href="/trending">المنتجات الأكثر بحثًا</Link>
          </div>
        </section>
      </section>

      <style>{`
        .bestPage {
          min-height: 100vh;
          color: white;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
            #0b0f14;
          padding-bottom: 60px;
        }

        .hero {
          max-width: 1050px;
          margin: 0 auto;
          padding: 56px 18px 30px;
          text-align: center;
        }

        .badge {
          display: inline-flex;
          padding: 8px 15px;
          border-radius: 999px;
          background: rgba(34,197,94,0.14);
          border: 1px solid rgba(34,197,94,0.35);
          color: #bbf7d0;
          font-size: 12px;
          font-weight: 950;
          margin-bottom: 14px;
        }

        .hero h1 {
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.2;
          margin: 0 0 16px;
          font-weight: 950;
        }

        .hero h1 span {
          display: block;
          font-size: clamp(18px, 2.4vw, 26px);
          color: #cbd5e1;
          margin-top: 10px;
        }

        .hero p {
          max-width: 850px;
          margin: 0 auto;
          color: #e5e7eb;
          line-height: 2;
          font-size: 17px;
        }

        .heroBtns {
          margin-top: 22px;
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .heroBtns a {
          text-decoration: none;
          padding: 13px 22px;
          border-radius: 15px;
          font-weight: 950;
          color: #fff;
          background: linear-gradient(135deg, #16a34a, #2563eb);
        }

        .heroBtns a:last-child {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.16);
        }

        .content {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .sectionHead {
          margin: 30px 0 18px;
        }

        .sectionHead h2 {
          margin: 0;
          font-size: 30px;
          font-weight: 950;
        }

        .sectionHead p {
          margin: 6px 0 0;
          color: #94a3b8;
          font-weight: 800;
        }

        .productsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .productCard {
          background: #fff;
          color: #111827;
          border-radius: 24px;
          overflow: hidden;
          text-decoration: none;
          box-shadow: 0 16px 38px rgba(0,0,0,0.18);
          transition: all .25s ease;
        }

        .productCard:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 55px rgba(0,0,0,0.26);
        }

        .imageBox {
          position: relative;
          height: 230px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          border-bottom: 1px solid #f1f5f9;
        }

        .imageBox img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .imageBox span {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 7px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f172a, #2563eb, #22c55e);
          color: #fff;
          font-size: 11px;
          font-weight: 950;
        }

        .cardBody {
          padding: 15px;
        }

        .cardBody small {
          color: #64748b;
          font-weight: 850;
        }

        .cardBody h3 {
          font-size: 15px;
          line-height: 1.7;
          min-height: 52px;
          margin: 8px 0 12px;
        }

        .priceRow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .priceRow strong {
          color: #16a34a;
          font-size: 24px;
          font-weight: 950;
        }

        .priceRow b {
          background: #dcfce7;
          color: #166534;
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 11px;
        }

        .cardBody em {
          display: block;
          text-align: center;
          font-style: normal;
          background: #111827;
          color: #fff;
          padding: 12px;
          border-radius: 14px;
          font-weight: 950;
        }

        .seoBox,
        .linksBox,
        .emptyBox {
          margin-top: 34px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 24px;
        }

        .seoBox h2,
        .linksBox h2,
        .emptyBox h2 {
          margin-top: 0;
          color: #22c55e;
        }

        .seoBox p,
        .emptyBox p {
          color: #e5e7eb;
          line-height: 2;
          font-size: 17px;
        }

        .linksBox div {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .linksBox a,
        .emptyBox a {
          text-decoration: none;
          background: #fff;
          color: #111827;
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 900;
        }

        @media (max-width: 1000px) {
          .productsGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .productsGrid {
            grid-template-columns: 1fr;
          }

          .content {
            padding: 0 12px;
          }
        }
      `}</style>
    </main>
  );
}