import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countryNames: any = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const categoryNames: any = {
  electronics: "إلكترونيات",
  mobiles: "موبايلات",
  mobile_accessories: "إكسسوارات جوالات",
  smart_watch: "ساعات ذكية",
  power_bank: "باور بانك",
  chargers: "شواحن وكابلات",
  headphones: "سماعات",
  computers: "كمبيوتر ولابتوب",
  computer_accessories: "إكسسوارات كمبيوتر",
  gaming: "ألعاب وجيمينج",
  home: "المنزل والمطبخ",
  fashion: "ملابس",
  shoes: "أحذية",
  bags: "شنط",
  beauty: "جمال وعناية",
  cars: "سيارات وإكسسوارات",
  kids: "أطفال",
  sports: "رياضة",
  other: "عروض متنوعة",
};

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; category: string }>;
}): Promise<Metadata> {
  const { country, category } = await params;

  const countryName = countryNames[country];
  const categoryName = categoryNames[category];

  if (!countryName || !categoryName) {
    return { title: "صفحة غير موجودة | BPS Chat" };
  }

  const url = `${SITE_URL}/customer-offers/${country}/${category}`;

  return {
    title: `أفضل عروض ${categoryName} في ${countryName} | BPS Chat بي بي اس شات`,
    description: `تصفح أفضل عروض ${categoryName} في ${countryName} عبر BPS Chat بي بي اس شات، محرك بحث ومقارنة أسعار المنتجات وأفضل مكان للإعلان عن منتجاتك والوصول لعملاء يبحثون عن الشراء.`,
    keywords: [
      `BPS Chat`,
      `بي بي اس شات`,
      `أفضل عروض ${categoryName} في ${countryName}`,
      `مقارنة أسعار ${categoryName}`,
      `أرخص ${categoryName} في ${countryName}`,
      `متجر بي بي اس شات`,
      `اعلن عن منتجاتك`,
      `أفضل موقع مقارنة أسعار`,
      `${categoryName} online ${countryName}`,
      `product price comparison ${countryName}`,
    ],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: `أفضل عروض ${categoryName} في ${countryName} | BPS Chat`,
      description: `BPS Chat بي بي اس شات يساعدك على مقارنة الأسعار واكتشاف أفضل عروض المنتجات والإعلان عن منتجاتك في ${countryName}.`,
      url,
      type: "website",
    },
  };
}

export default async function CategoryCountryOffersPage({
  params,
}: {
  params: Promise<{ country: string; category: string }>;
}) {
  const { country, category } = await params;

  const countryName = countryNames[country];
  const categoryName = categoryNames[category];

  if (!countryName || !categoryName) notFound();

  const { data: offers } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, store_name, country, category, updated_at")
    .eq("status", "approved")
    .eq("country", country)
    .overlaps("category", [category])
    .order("updated_at", { ascending: false })
    .limit(1000);

  const list = offers || [];

  return (
    <main className="catPage" dir="rtl">
      <section className="hero">
        <Link href="/customer-offers" className="backLink">
          ← رجوع لمتجر العملاء
        </Link>

        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          أفضل عروض {categoryName} في {countryName}
        </h1>

        <p>
          تصفح أحدث منتجات وعروض {categoryName} داخل {countryName} عبر متجر
          عملاء BPS Chat. روابط مباشرة وأسعار واضحة من البائعين والمتاجر.
        </p>
      </section>

      {list.length === 0 ? (
        <section className="emptyBox">
          <h2>لا توجد عروض حاليًا</h2>
          <p>سيتم إضافة عروض {categoryName} في {countryName} قريبًا.</p>
        </section>
      ) : (
        <section className="grid">
          {list.map((item: any) => (
            <Link key={item.id} href={offerSeoUrl(item)} className="card">
              <div className="imageBox">
                <img src={item.image_url} alt={item.product_name} />
              </div>

              <div className="info">
                <span className="country">🌍 {countryName}</span>
                <h2>{item.product_name}</h2>
                <strong>{item.price}</strong>
                <small>{item.store_name || "عرض عميل BPS Chat"}</small>
              </div>
            </Link>
          ))}
        </section>
      )}

      <section className="seoText">
  <h2>
    أفضل عروض {categoryName} في {countryName} عبر BPS Chat بي بي اس شات
  </h2>

  <p>
    في هذه الصفحة من <strong>BPS Chat (بي بي اس شات)</strong> يمكنك تصفح
    أفضل عروض <strong>{categoryName}</strong> في <strong>{countryName}</strong>
    من متجر عملاء بي بي اس شات، مع أسعار واضحة وصور وروابط مباشرة للشراء.
  </p>

  <p>
    يعتبر <strong>BPS Chat</strong> محرك بحث ذكي لمقارنة أسعار المنتجات
    في السعودية والإمارات والكويت وقطر والبحرين ومصر، ويساعد المستخدمين
    على الوصول إلى أرخص سعر وأفضل عرض قبل الشراء أونلاين.
  </p>

  <p>
    إذا كنت صاحب متجر أو بائع، يمكنك استخدام <strong>متجر بي بي اس شات</strong>
    للإعلان عن منتجاتك والوصول إلى عملاء يبحثون فعليًا عن منتجات مثل
    <strong> {categoryName}</strong> داخل <strong>{countryName}</strong>.
  </p>

  <h2>كلمات بحث مرتبطة</h2>

  <p>
    أفضل عروض {categoryName} في {countryName} - أرخص أسعار {categoryName} -
    مقارنة أسعار {categoryName} أونلاين - شراء {categoryName} في {countryName} -
    متجر BPS Chat - بي بي اس شات - أفضل موقع مقارنة أسعار - أعلن عن منتجاتك -
    product price comparison - best deals online.
  </p>

  <div className="links">
    <Link href="/customer-offers">كل عروض العملاء</Link>
    <Link href="/">البحث عن منتج</Link>
    <Link href="/advertise">أعلن معنا</Link>
    <Link href="/seller-tools">أدوات البائع</Link>
  </div>
</section>

      <style>{`
        .catPage {
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            #0b0f14;
          color: white;
          padding-bottom: 60px;
        }

        .hero {
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
          padding: 50px 18px 24px;
        }

        .backLink {
          color: #7fffe0;
          text-decoration: none;
          font-weight: 900;
        }

        .badge {
          width: fit-content;
          margin: 18px auto;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(16,163,127,0.15);
          border: 1px solid rgba(16,163,127,0.35);
          color: #7fffe0;
          font-weight: 900;
        }

        h1 {
          font-size: clamp(30px, 5vw, 48px);
          margin: 0 0 16px;
        }

        .hero p {
          max-width: 760px;
          margin: auto;
          color: #d1d5db;
          line-height: 2;
          font-size: 17px;
        }

        .grid {
          max-width: 1100px;
          margin: 20px auto;
          padding: 0 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .card {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          color: white;
          transition: .25s;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: rgba(16,163,127,0.5);
          box-shadow: 0 0 30px rgba(16,163,127,0.16);
        }

        .imageBox {
          height: 190px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }

        .imageBox img {
          max-width: 100%;
          max-height: 165px;
          object-fit: contain;
        }

        .info {
          padding: 14px;
        }

        .country {
          color: #7fffe0;
          font-size: 12px;
          font-weight: 900;
        }

        .info h2 {
          font-size: 15px;
          line-height: 1.7;
          min-height: 52px;
        }

        .info strong {
          display: block;
          color: #22c55e;
          font-size: 20px;
          margin-bottom: 6px;
        }

        .info small {
          color: #cfcfcf;
        }

        .emptyBox,
        .seoText {
          max-width: 980px;
          margin: 30px auto;
          padding: 22px;
          border-radius: 20px;
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.08);
          line-height: 2;
        }

        .seoText h2 {
          color: #10a37f;
        }

        .links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .links a {
          color: white;
          text-decoration: none;
          background: #10a37f;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 900;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}