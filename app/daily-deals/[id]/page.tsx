import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Deal = {
  id: number;
  title: string;
  image_url: string | null;
  product_url: string;
  store_name: string | null;
  country: string | null;
  category: string[] | null;
  old_price: number | null;
  new_price: number | null;
  discount_percent: number | null;
  created_at: string;
};

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

function money(value?: number | null, country?: string | null) {
  if (!value) return "-";
  return `${Number(value).toLocaleString("en-US")} ${
    currencies[country || ""] || ""
  }`;
}
function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function customerOfferSeoUrl(offer: any) {
  return `/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}
async function getDeal(id: string) {
  const { data } = await supabase
    .from("daily_deals")
    .select("*")
    .eq("id", Number(id))
    .eq("status", "approved")
    .single();

  return data as Deal | null;
}

async function getRelatedDeals(
  country?: string | null,
  category?: string[] | null,
  currentId?: number
) {
  let query = supabase
    .from("daily_deals")
    .select("id,title,image_url,discount_percent")
    .eq("status", "approved")
    .neq("id", currentId || 0)
    .limit(8);

  if (country) {
    query = query.eq("country", country);
  }

  const { data } = await query;

  return data || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const deal = await getDeal(id);

  if (!deal) {
    return {
      title: "عرض غير موجود | BPS Chat",
    };
  }

  const discount = Math.round(Number(deal.discount_percent || 0));

  return {
    title: `${deal.title} | خصم ${discount}% | BPS Chat`,
    description: `شاهد عرض ${deal.title} من ${
      deal.store_name || "المتجر"
    } بسعر ${money(deal.new_price, deal.country)} على BPS Chat.`,
    openGraph: {
      title: `${deal.title} | BPS Chat`,
      description: `خصم ${discount}% - السعر الآن ${money(
        deal.new_price,
        deal.country
      )}`,
      images: deal.image_url ? [deal.image_url] : [],
    },
  };
}

export default async function DailyDealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deal = await getDeal(id);

  if (!deal) notFound();

  const discount = Math.round(Number(deal.discount_percent || 0));
  const saving =
    deal.old_price && deal.new_price
      ? Number(deal.old_price) - Number(deal.new_price)
      : 0;
      const { data: relatedOffers } = await supabase
  .from("customer_offers")
  .select("id,product_name,image_url,price,country")
  .eq("status", "approved")
  .eq("country", deal.country || "sa")
  .limit(12);
const relatedDeals = await getRelatedDeals(
  deal.country,
  deal.category,
  deal.id
);
  return (
    <main className="dealDetailsPage" dir="rtl">
      <section className="dealHero">
        <Link href="/daily-deals" className="backLink">
          ← رجوع لعروض اليوم
        </Link>

        <div className="dealGrid">
          <div className="imageBox">
            {discount > 0 && <div className="discountBadge">🔥 خصم {discount}%</div>}

            {deal.image_url ? (
              <img src={deal.image_url} alt={deal.title} />
            ) : (
              <div className="noImage">BPS Chat</div>
            )}
          </div>

          <div className="infoBox">
            <div className="storeBadge">
              {deal.store_name || "متجر"} ·{" "}
              {countryNames[deal.country || ""] || "السوق"}
            </div>

            <h1>{deal.title}</h1>

            <p className="intro">
              عرض مختار ضمن أقوى عروض اليوم على BPS Chat لمساعدة المستخدم في
              الوصول لأفضل الخصومات من المتاجر الكبيرة بسرعة.
            </p>

            <div className="pricesCard">
              {deal.old_price ? (
                <span className="oldPrice">
                  السعر قبل الخصم: {money(deal.old_price, deal.country)}
                </span>
              ) : null}

              <strong className="newPrice">
                السعر الآن: {money(deal.new_price, deal.country)}
              </strong>

              {saving > 0 && (
                <small>التوفير التقريبي: {money(saving, deal.country)}</small>
              )}
            </div>

            <a
              href={`/api/daily-deals/click/${deal.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="buyBtn"
            >
              🛒 الذهاب للعرض
            </a>

            <Link href="/daily-deals" className="moreBtn">
              🔥 مشاهدة المزيد من عروض اليوم
            </Link>
          </div>
        </div>
      </section>

      <section className="seoBox">
        <h2>تفاصيل عرض اليوم على BPS Chat</h2>

        <p>
          هذا العرض ضمن صفحة عروض اليوم في بي بي اس شات، حيث نعرض خصومات
          مختارة من المتاجر الكبيرة مثل نون وأمازون وجرير وإكسترا وغيرها.
          يمكنك مقارنة السعر قبل وبعد الخصم ومعرفة قيمة التوفير قبل الانتقال
          إلى المتجر.
        </p>
      </section>
<section className="relatedDealsBox">

  <h2>
    🔥 عروض مشابهة في {countryNames[deal.country || ""] || "بلدك"}
  </h2>

  <div className="relatedGrid">
    {relatedDeals.map((item: any) => (
      <Link
        key={item.id}
        href={`/daily-deals/${item.id}`}
        className="relatedCard"
      >
        {item.image_url && (
          <img src={item.image_url} alt={item.title} />
        )}

        <span>{item.title}</span>

        {Number(item.discount_percent || 0) > 0 && (
          <b>خصم {Math.round(item.discount_percent)}%</b>
        )}
      </Link>
    ))}
  </div>

</section>
<section className="relatedDealsBox">
  <h2>
    🛍️ منتجات مقترحة من BPS Market في {countryNames[deal.country || ""] || "بلدك"}
  </h2>

  <div className="relatedGrid">
    {(relatedOffers || []).map((item: any) => (
      <Link
        key={item.id}
        href={customerOfferSeoUrl(item)}
        className="relatedCard"
      >
        {item.image_url && (
          <img src={item.image_url} alt={item.product_name} />
        )}

        <span>{item.product_name}</span>

        {item.price && <b>{item.price}</b>}
      </Link>
    ))}
  </div>
</section>

<section className="internalLinksBox">

  <h2>
    🛍️ تصفح المزيد في {countryNames[deal.country || ""] || "بلدك"}
  </h2>

  <div className="internalLinksGrid">

    <Link href={`/daily-deals?country=${deal.country}`}>
      عروض {countryNames[deal.country || ""] || ""}
    </Link>

    <Link href={`/customer-offers?country=${deal.country}`}>
      منتجات {countryNames[deal.country || ""] || ""}
    </Link>

    <Link href="/">
      مقارنة الأسعار
    </Link>

    <Link href="/smart-search">
      البحث الذكي
    </Link>

    <Link href="/customer-offers">
      متجر العملاء
    </Link>

  </div>

</section>
      <style>{`
        .dealDetailsPage {
          min-height: 100vh;
          background: linear-gradient(180deg,#f8fafc,#eef2f7);
          color: #111827;
          padding: 36px 16px 80px;
        }

        .dealHero,
        .seoBox {
          max-width: 1180px;
          margin: 0 auto 24px;
          border-radius: 34px;
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 55px rgba(15,23,42,.10);
        }

        .dealHero {
          padding: 24px;
        }

        .backLink {
          display: inline-block;
          margin-bottom: 20px;
          color: #16a34a;
          text-decoration: none;
          font-weight: 950;
        }

        .dealGrid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 28px;
          align-items: center;
        }

        .imageBox {
          position: relative;
          min-height: 420px;
          border-radius: 28px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border: 1px solid #e5e7eb;
        }

        .imageBox img {
          max-width: 100%;
          max-height: 380px;
          object-fit: contain;
        }

        .discountBadge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg,#ef4444,#f97316);
          color: white;
          padding: 9px 14px;
          border-radius: 999px;
          font-weight: 950;
          box-shadow: 0 10px 20px rgba(239,68,68,.25);
        }

        .noImage {
          font-weight: 950;
          color: #94a3b8;
        }

        .storeBadge {
          display: inline-flex;
          padding: 8px 13px;
          border-radius: 999px;
          background: #ecfdf5;
          color: #16a34a;
          font-weight: 950;
          margin-bottom: 14px;
        }

        h1 {
          margin: 0;
          font-size: clamp(30px,4vw,48px);
          line-height: 1.35;
          font-weight: 950;
        }

        .intro {
          color: #64748b;
          line-height: 1.9;
          font-weight: 800;
          margin: 16px 0;
        }

        .pricesCard {
          display: grid;
          gap: 10px;
          margin: 20px 0;
          padding: 18px;
          border-radius: 24px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .oldPrice {
          color: #ef4444;
          text-decoration: line-through;
          font-weight: 900;
        }

        .newPrice {
          color: #16a34a;
          font-size: 28px;
          font-weight: 950;
        }

        .pricesCard small {
          color: #64748b;
          font-weight: 900;
        }

        .buyBtn,
        .moreBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 950;
          margin-top: 10px;
        }

        .buyBtn {
          background: linear-gradient(135deg,#16a34a,#2563eb);
          color: white;
          box-shadow: 0 12px 28px rgba(37,99,235,.20);
        }

        .moreBtn {
          background: #fff7ed;
          color: #f97316;
          border: 1px solid #fed7aa;
        }

        .seoBox {
          padding: 26px;
        }

        .seoBox h2 {
          margin: 0 0 12px;
          font-size: 26px;
          font-weight: 950;
        }

        .seoBox p {
          margin: 0;
          color: #64748b;
          line-height: 2;
          font-weight: 800;
        }
          .relatedDealsBox,
.internalLinksBox{
  max-width:1180px;
  margin:0 auto 24px;
  padding:26px;
  border-radius:30px;
  background:#fff;
  border:1px solid #e5e7eb;
  box-shadow:0 18px 45px rgba(15,23,42,.08);
}

.relatedDealsBox h2,
.internalLinksBox h2{
  margin:0 0 18px;
  font-size:28px;
  font-weight:950;
}

.relatedGrid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
  gap:16px;
}

.relatedCard{
  text-decoration:none;
  color:#111827;
  border:1px solid #e5e7eb;
  border-radius:20px;
  overflow:hidden;
  background:#fff;
}

.relatedCard img{
  width:100%;
  height:160px;
  object-fit:contain;
  background:#f8fafc;
}

.relatedCard span{
  display:block;
  padding:12px;
  font-size:13px;
  font-weight:900;
}

.relatedCard b{
  display:block;
  color:#16a34a;
  padding:0 12px 12px;
}

.internalLinksGrid{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
}

.internalLinksGrid a{
  text-decoration:none;
  padding:12px 18px;
  border-radius:999px;
  background:#ecfdf5;
  color:#16a34a;
  font-weight:950;
}

        @media (max-width: 800px) {
          .dealDetailsPage {
            padding: 24px 12px 60px;
          }

          .dealGrid {
            grid-template-columns: 1fr;
          }

          .imageBox {
            min-height: 280px;
          }

          .imageBox img {
            max-height: 250px;
          }
        }
      `}</style>
    </main>
  );
}