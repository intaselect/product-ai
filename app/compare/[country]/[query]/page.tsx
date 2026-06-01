import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

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

function cleanText(text: string) {
  return decodeURIComponent(String(text || ""))
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ");
}

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function getPriceNumber(value: any) {
  const raw = String(value || "");
  const num = Number(raw.replace(/[^\d.]/g, ""));
  return Number.isFinite(num) ? num : null;
}

function getProductTitle(p: any) {
  return p.title || p.name || p.product_name || "منتج";
}

function getProductPrice(p: any) {
  return p.priceText || p.price || "السعر غير متوفر";
}

function getProductImage(p: any) {
  return p.image || p.thumbnail || p.image_url || "";
}

function getProductUrl(p: any) {
  return p.url || p.link || p.product_url || "";
}

function getStoreName(p: any) {
  const raw = String(p.source || p.store || p.merchant || p.seller || p.store_name || "");
  const url = String(p.url || p.link || p.product_url || "");

  if (raw.toLowerCase().includes("amazon") || url.includes("amazon.")) return "Amazon";
  if (raw.toLowerCase().includes("noon") || url.includes("noon.")) return "Noon";
  if (raw.toLowerCase().includes("jumia") || url.includes("jumia.")) return "Jumia";
  if (raw.toLowerCase().includes("jarir") || url.includes("jarir.")) return "Jarir";
  if (raw.toLowerCase().includes("extra") || url.includes("extra.")) return "Extra";

  return raw || "BPS Market";
}

function productSeoUrl(offer: any) {
  return `/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; query: string }>;
}): Promise<Metadata> {
  const { country, query } = await params;
  const cleanQuery = cleanText(query);
  const countryName = countryNames[country] || country;

  return {
    title: `مقارنة أسعار ${cleanQuery} في ${countryName} | BPS Chat`,
    description: `قارن أسعار ${cleanQuery} في ${countryName} من نتائج البحث ومنتجات BPS Market في صفحة واحدة قوية.`,
    alternates: {
      canonical: `${SITE_URL}/compare/${country}/${slugify(cleanQuery)}`,
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ country: string; query: string }>;
}) {
  const { country, query } = await params;

  const countryCode = country || "sa";
  const countryName = countryNames[countryCode] || countryCode;
  const currency = currencies[countryCode] || "";
  const cleanQuery = cleanText(query);

  const { data: cacheRows } = await supabase
    .from("product_cache")
    .select("query, country, results, updated_at")
    .eq("country", countryCode)
    .ilike("query", `%${cleanQuery}%`)
    .order("updated_at", { ascending: false })
    .limit(20);

  const searchProducts =
    (cacheRows || [])
      .flatMap((row: any) => Array.isArray(row.results) ? row.results : [])
      .filter((p: any) => {
        const title = cleanText(getProductTitle(p));
        return title.includes(cleanQuery);
      })
      .slice(0, 40);

  const { data: marketRows } = await supabase
    .from("customer_offers")
    .select("id, product_name, price, image_url, product_url, store_name, country, created_at")
    .eq("status", "approved")
    .eq("country", countryCode)
    .ilike("product_name", `%${cleanQuery}%`)
    .order("created_at", { ascending: false })
    .limit(40);

  const marketProducts = marketRows || [];

  const combined = [
    ...searchProducts.map((p: any) => ({
      type: "search",
      title: getProductTitle(p),
      price: getProductPrice(p),
      image: getProductImage(p),
      url: getProductUrl(p),
      store: getStoreName(p),
      numericPrice: getPriceNumber(getProductPrice(p)),
    })),
    ...marketProducts.map((p: any) => ({
      type: "market",
      title: p.product_name,
      price: p.price,
      image: p.image_url,
      url: productSeoUrl(p),
      store: p.store_name || "BPS Market",
      numericPrice: getPriceNumber(p.price),
    })),
  ].filter((p) => p.title && p.numericPrice);

  const sorted = [...combined].sort((a, b) => a.numericPrice! - b.numericPrice!);
  const cheapest = sorted[0];
  const highest = sorted[sorted.length - 1];

  return (
    <main className="comparePage" dir="rtl">
      <section className="hero">
        <div className="badge">🔥 مقارنة أسعار BPS Chat</div>

        <h1>مقارنة أسعار {cleanQuery} في {countryName}</h1>

        <p>
          صفحة تجمع نتائج بحث BPS Chat مع منتجات BPS Market لنفس الكلمة داخل
          {countryName}، علشان تشوف أرخص سعر وأفضل العروض في مكان واحد.
        </p>
      </section>

      <SearchBeforeBuyBanner />

      <section className="statsBox">
        <div>
          <strong>{combined.length}</strong>
          <span>نتيجة مقارنة</span>
        </div>

        <div>
          <strong>{searchProducts.length}</strong>
          <span>من صلاج سيرش</span>
        </div>

        <div>
          <strong>{marketProducts.length}</strong>
          <span>من BPS Market</span>
        </div>

        {cheapest && (
          <div>
            <strong>{cheapest.price}</strong>
            <span>أرخص سعر</span>
          </div>
        )}
      </section>

      {cheapest && highest && (
        <section className="analysisBox">
          <h2>تحليل سريع لسعر {cleanQuery} في {countryName}</h2>

          <p>
            أقل سعر ظاهر حاليًا هو <strong>{cheapest.price}</strong> من{" "}
            <strong>{cheapest.store}</strong>، بينما أعلى سعر ظاهر هو{" "}
            <strong>{highest.price}</strong> من <strong>{highest.store}</strong>.
          </p>

          <p>
            لذلك مقارنة أسعار {cleanQuery} قبل الشراء قد تساعدك في اختيار العرض
            الأنسب وتوفير فرق السعر بين المتاجر.
          </p>
        </section>
      )}

      <section className="productsGrid">
        {sorted.map((item, index) => (
          <article className="productCard" key={`${item.title}-${index}`}>
            <div className="imageBox">
              {item.image && <img src={item.image} alt={item.title} />}
              <span>{item.type === "market" ? "BPS Market" : "Search"}</span>
            </div>

            <div className="content">
              <small>{item.store}</small>
              <h2>{item.title}</h2>

              <div className="price">
                <strong>{item.price}</strong>
                <span>{currency}</span>
              </div>

              {item.url && (
                <a
                  href={item.url}
                  target={item.type === "market" ? "_self" : "_blank"}
                  rel={item.type === "market" ? "" : "nofollow sponsored noopener noreferrer"}
                >
                  {item.type === "market" ? "شاهد صفحة المنتج" : "عرض المنتج"}
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="seoText">
        <h2>أفضل طريقة لمقارنة أسعار {cleanQuery} في {countryName}</h2>

        <p>
          تساعدك هذه الصفحة على مقارنة أسعار {cleanQuery} في {countryName} من
          أكثر من مصدر داخل BPS Chat، حيث يتم عرض نتائج البحث المخزنة من صلاج
          سيرش بجانب منتجات BPS Market المعتمدة.
        </p>

        <h2>كلمات بحث مرتبطة</h2>
        <p>
          سعر {cleanQuery} في {countryName} - أرخص {cleanQuery} - عروض{" "}
          {cleanQuery} - مقارنة أسعار {cleanQuery} - شراء {cleanQuery} أونلاين -
          أفضل سعر {cleanQuery} اليوم.
        </p>
      </section>

      <style>{`
        .comparePage {
          min-height: 100vh;
          background: linear-gradient(180deg,#f4f7fb,#eef2f7);
          color: #111827;
          padding-bottom: 70px;
        }

        .hero {
          max-width: 1120px;
          margin: 0 auto;
          padding: 55px 18px 25px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          padding: 9px 16px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-weight: 950;
          margin-bottom: 16px;
        }

        .hero h1 {
          font-size: clamp(30px, 4vw, 48px);
          margin: 0 0 14px;
          font-weight: 950;
        }

        .hero p {
          max-width: 780px;
          margin: 0 auto;
          color: #475569;
          line-height: 2;
          font-weight: 800;
        }

        .statsBox {
          max-width: 1120px;
          margin: 20px auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          padding: 0 14px;
        }

        .statsBox div,
        .analysisBox,
        .seoText {
          background: white;
          border: 1px solid #dbeafe;
          border-radius: 24px;
          box-shadow: 0 14px 35px rgba(15,23,42,.08);
        }

        .statsBox div {
          padding: 18px;
          text-align: center;
        }

        .statsBox strong {
          display: block;
          color: #16a34a;
          font-size: 24px;
          font-weight: 950;
        }

        .statsBox span {
          color: #64748b;
          font-weight: 850;
        }

        .analysisBox,
        .seoText {
          max-width: 1120px;
          margin: 22px auto;
          padding: 24px;
          line-height: 2;
        }

        .productsGrid {
          max-width: 1120px;
          margin: 22px auto;
          padding: 0 14px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .productCard {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(15,23,42,.07);
          transition: .25s;
        }

        .productCard:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 42px rgba(15,23,42,.13);
        }

        .imageBox {
          position: relative;
          height: 210px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #f1f5f9;
        }

        .imageBox img {
          max-width: 100%;
          max-height: 185px;
          object-fit: contain;
        }

        .imageBox span {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #0f172a;
          color: white;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 950;
        }

        .content {
          padding: 15px;
        }

        .content small {
          color: #2563eb;
          font-weight: 900;
        }

        .content h2 {
          font-size: 15px;
          line-height: 1.7;
          min-height: 78px;
          margin: 8px 0;
        }

        .price strong {
          color: #16a34a;
          font-size: 21px;
          font-weight: 950;
        }

        .price span {
          margin-right: 6px;
          color: #64748b;
          font-size: 12px;
          font-weight: 850;
        }

        .content a {
          display: block;
          margin-top: 12px;
          text-align: center;
          text-decoration: none;
          background: linear-gradient(135deg,#16a34a,#2563eb);
          color: white;
          padding: 12px;
          border-radius: 14px;
          font-weight: 950;
        }

        @media (max-width: 900px) {
          .statsBox,
          .productsGrid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .statsBox,
          .productsGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}