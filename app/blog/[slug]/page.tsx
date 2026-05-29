import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import SeoSearchBar from "@/app/components/SeoSearchBar";
import ProductVideos from "@/app/components/ProductVideos";
import MarketPromoSection from "@/app/components/MarketPromoSection";
import InternalLinksBoost from "@/app/components/InternalLinksBoost";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";

export const dynamic = "force-dynamic";

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

function slugify(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function makeBlogSlug(query: string, country: string) {
  return `${slugify(query)}-${country || "sa"}`;
}

function parseSlug(slug: string) {
  const parts = String(slug || "").split("-");
  const country = parts.pop() || "sa";
  const query = decodeURIComponent(parts.join(" ")).replace(/-/g, " ");
  return { query, country };
}

function productTitle(p: any) {
  return p?.title || p?.name || p?.product_name || "منتج";
}

function productImage(p: any) {
  return p?.image || p?.thumbnail || p?.image_url || "";
}

function productPrice(p: any) {
  return p?.priceText || p?.price || p?.extracted_price || "شاهد السعر";
}

function productStore(p: any) {
  return p?.store || p?.source || p?.seller || p?.store_name || "متجر موثوق";
}

function productLink(p: any) {
  return p?.link || p?.product_url || p?.url || "#";
}

async function getPost(slug: string) {
  const { data: cacheData } = await supabase
    .from("product_cache")
    .select("query, country, updated_at, results")
    .order("updated_at", { ascending: false })
    .limit(1000);

  const found = (cacheData || []).find((item: any) => {
    return (
      item?.query &&
      item?.country &&
      Array.isArray(item?.results) &&
      item.results.length > 0 &&
      makeBlogSlug(item.query, item.country) === slug
    );
  });

  if (found) return found;

  const parsed = parseSlug(slug);

  const { data: offers } = await supabase
    .from("customer_offers")
    .select(
      "id, product_name, price, image_url, product_url, store_name, country, updated_at"
    )
    .eq("status", "approved")
    .eq("country", parsed.country)
    .ilike("product_name", `%${parsed.query}%`)
    .limit(12);

  if (offers && offers.length > 0) {
    return {
      query: parsed.query,
      country: parsed.country,
      updated_at: offers[0].updated_at,
      results: offers,
    };
  }

  return null;
}

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const parsed = parseSlug(slug);
  const countryName = countryNames[parsed.country] || "السعودية";

  return {
    title: `أفضل أسعار ${parsed.query} في ${countryName} | BPS Chat`,
    description: `دليل شراء ${parsed.query} في ${countryName}: قارن الأسعار، شاهد أفضل المنتجات، نصائح قبل الشراء، وعروض BPS Market.`,
    alternates: {
      canonical: `https://www.bpschat.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: any) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  const query = post.query || "منتج";
  const country = post.country || "sa";
  const countryName = countryNames[country] || "السعودية";
  const currency = currencies[country] || "ريال سعودي";
  const products = Array.isArray(post.results) ? post.results.slice(0, 12) : [];
  const stores = [
  ...new Set(
    products
      .map((p: any) => productStore(p))
      .filter(Boolean)
      .slice(0, 8)
  ),
];

const relatedProducts = products
  .slice(0, 6)
  .map((p: any) => productTitle(p))
  .filter(Boolean);

  return (
    <main className="postPage" dir="rtl">
      <SeoSearchBar />

      <article className="postArticle">
        <div className="postBadge">دليل شراء من BPS Chat</div>

        <h1>أفضل أسعار {query} في {countryName}</h1>

        <p className="lead">
          لو بتدور على {query} في {countryName}، فالمقال ده معمول علشان يساعدك
          تقارن الأسعار، تشوف أشهر المنتجات، وتاخد قرار شراء أذكى من غير ما
          تضيع وقتك بين المتاجر.
        </p>

        <div className="quickActions">
          <Link href={`/?q=${encodeURIComponent(query)}&country=${country}`}>
            🔎 ابحث عن {query}
          </Link>

          <Link href={`/customer-offers?country=${country}`}>
            🛒 عروض {countryName}
          </Link>

          <Link href="/smart-search">⚡ البحث الذكي</Link>
        </div>

        <h2>لماذا تقارن سعر {query} قبل الشراء؟</h2>

        <p>
          أسعار المنتجات تتغير باستمرار بين المتاجر. أحيانًا نفس المنتج يكون
          بسعر مختلف حسب المتجر، الدولة، رسوم الشحن، أو العروض اليومية. لذلك
          مقارنة السعر قبل الشراء تساعدك توفر فلوسك وتختار المتجر الأنسب.
        </p>

        <p>
          BPS Chat يجمع لك فكرة واضحة عن المنتجات والأسعار والعروض في مكان
          واحد، مع روابط داخلية للبحث والمتجر، حتى تقدر تنتقل بسرعة من مرحلة
          المقارنة إلى قرار الشراء.
        </p>

        {products.length > 0 && (
          <>
            <h2>أفضل منتجات {query} المتاحة الآن</h2>

            <div className="productsGrid">
              {products.map((p: any, i: number) => {
                const price = productPrice(p);

                return (
                  <a
                    className="productCard"
                    href={productLink(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`${productTitle(p)}-${i}`}
                  >
                    {productImage(p) ? (
                      <img src={productImage(p)} alt={productTitle(p)} />
                    ) : (
                      <div className="noImage">BPS</div>
                    )}

                    <div>
                      <span>{productStore(p)}</span>
                      <h3>{productTitle(p)}</h3>
                      <strong>
                        {price} {typeof price === "number" ? currency : ""}
                      </strong>
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}
        <h2>تحليل أسعار {query} في {countryName}</h2>

<p>
  تختلف أسعار {query} في {countryName} حسب المتجر والبائع والعروض الموسمية.
  لذلك من المهم مقارنة الأسعار بشكل مستمر قبل اتخاذ قرار الشراء.
</p>

<p>
  يساعدك BPS Chat في اكتشاف الفروقات بين الأسعار والعروض المتاحة، مما يمنحك
  فرصة أفضل للحصول على قيمة أعلى مقابل المال.
</p>

<p>
  كما أن بعض المتاجر تقدم شحنًا أسرع أو ضمانًا أفضل، لذلك لا يجب الاعتماد
  على السعر فقط عند المقارنة.
</p>

<h2>أشهر المتاجر التي تعرض {query}</h2>

<p>
  أثناء تحليل نتائج البحث الخاصة بـ {query} في {countryName} ظهرت متاجر متعددة
  توفر المنتج بأسعار مختلفة.
</p>

<div className="storesGrid">
  {stores.map((store) => (
    <span key={store} className="storeBadge">
      {store}
    </span>
  ))}
</div>

<p>
  مقارنة الأسعار بين هذه المتاجر تساعد المستخدم في الوصول إلى أفضل عرض متاح
  بدلًا من الاعتماد على متجر واحد فقط.
</p>

        <h2>نصائح قبل شراء {query}</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الدفع.</li>
          <li>راجع تكلفة الشحن ومدة التوصيل داخل {countryName}.</li>
          <li>تأكد من الضمان وسياسة الاسترجاع.</li>
          <li>لا تعتمد على السعر فقط، راجع تقييمات المنتج والمتجر.</li>
          <li>لو المنتج غالي، استخدم البحث الذكي لتحديد ميزانيتك.</li>
        </ul>

        <h2>هل أرخص سعر هو الاختيار الأفضل؟</h2>

        <p>
          ليس دائمًا. أحيانًا يكون السعر الأقل بدون ضمان واضح أو من متجر غير
          معروف. الأفضل هو التوازن بين السعر، الثقة، سرعة التوصيل، وخدمة ما بعد
          البيع. لذلك نعرض في BPS Chat روابط بحث وعروض تساعدك تشوف الصورة
          الكاملة قبل الشراء.
        </p>
<h2>منتجات وبدائل مشابهة</h2>

<p>
  إذا لم تجد المنتج المناسب، يمكنك أيضًا مقارنة المنتجات المشابهة أو البدائل
  المتوفرة في نفس الفئة السعرية.
</p>

<div className="relatedGrid">
  {relatedProducts.map((item) => (
    <Link
      key={item}
      href={`/?q=${encodeURIComponent(item)}&country=${country}`}
      className="relatedItem"
    >
      {item}
    </Link>
  ))}
</div>

<p>
  مراجعة البدائل المختلفة قبل الشراء تساعد في اختيار المنتج الأفضل حسب
  الميزانية والاحتياجات الفعلية.
</p>
        <h2>أسئلة شائعة عن {query}</h2>

     <div className="faq">

  <h3>كيف أجد أفضل سعر لـ {query}؟</h3>
  <p>قارن بين أكثر من متجر ولا تعتمد على أول نتيجة تظهر لك.</p>

  <h3>هل تختلف الأسعار بين المتاجر؟</h3>
  <p>نعم، وقد يكون الفرق كبيرًا في بعض المنتجات.</p>

  <h3>هل السعر الأقل هو الأفضل دائمًا؟</h3>
  <p>ليس بالضرورة، يجب مراجعة الضمان وخدمة ما بعد البيع.</p>

  <h3>هل يمكن أن تتغير الأسعار يوميًا؟</h3>
  <p>نعم، خاصة أثناء العروض والمواسم.</p>

  <h3>هل BPS Chat يبيع المنتجات مباشرة؟</h3>
  <p>لا، يساعدك في المقارنة والوصول إلى أفضل العروض.</p>

  <h3>هل يمكن مقارنة أكثر من منتج؟</h3>
  <p>نعم، ويمكنك البحث عن أي منتج ومقارنة نتائجه.</p>

  <h3>هل توجد عروض خاصة من العملاء؟</h3>
  <p>نعم، عبر BPS Market ومتجر العملاء.</p>

  <h3>هل الأسعار تشمل الشحن؟</h3>
  <p>يعتمد ذلك على المتجر وسياسة البيع الخاصة به.</p>

  <h3>هل توجد مراجعات للمنتجات؟</h3>
  <p>يمكنك مشاهدة الفيديوهات والمراجعات قبل الشراء.</p>

  <h3>كيف أستفيد من البحث الذكي؟</h3>
  <p>حدد ميزانيتك وسيعرض لك المنتجات المناسبة لها.</p>

</div>

        <ProductVideos query={query} country={country} />

        <MarketPromoSection
          countryCode={country}
          query={query}
          title={`عروض قريبة من ${query} في ${countryName}`}
        />

        <SearchBeforeBuyBanner />
      </article>

      <InternalLinksBoost />

      <style>{`
        .postPage {
          background: #f8fafc;
          min-height: 100vh;
        }

        .postArticle {
          max-width: 1050px;
          margin: 30px auto;
          padding: 28px;
          background: #fff;
          border-radius: 30px;
          box-shadow: 0 18px 50px rgba(15,23,42,0.08);
        }

        .postBadge {
          display: inline-flex;
          padding: 9px 15px;
          border-radius: 999px;
          background: #ecfdf5;
          color: #16a34a;
          font-weight: 950;
        }

        h1 {
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.35;
          margin: 18px 0;
          color: #111827;
        }

        .lead {
          font-size: 19px;
          line-height: 2.1;
          color: #334155;
        }

        h2 {
          margin-top: 34px;
          color: #111827;
          font-size: 30px;
        }

        p,
        li {
          color: #334155;
          line-height: 2.1;
          font-size: 17px;
        }

        .quickActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin: 22px 0;
        }

        .quickActions a {
          text-decoration: none;
          padding: 13px 18px;
          border-radius: 16px;
          color: white;
          font-weight: 950;
          background: linear-gradient(135deg, #16a34a, #2563eb);
        }

        .productsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .productCard {
          display: block;
          text-decoration: none;
          color: #111827;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 22px;
          overflow: hidden;
          transition: all .25s ease;
        }

        .productCard:hover {
          transform: translateY(-5px);
          border-color: #22c55e;
        }

        .productCard img,
        .noImage {
          width: 100%;
          height: 190px;
          object-fit: contain;
          background: white;
        }

        .noImage {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          font-weight: 950;
          color: #16a34a;
        }

        .productCard div {
          padding: 14px;
        }

        .productCard span {
          color: #64748b;
          font-size: 13px;
          font-weight: 800;
        }

        .productCard h3 {
          font-size: 16px;
          line-height: 1.7;
          min-height: 82px;
        }

        .productCard strong {
          color: #16a34a;
          font-size: 18px;
        }

        .faq {
          padding: 20px;
          border-radius: 22px;
          background: #f1f5f9;
        }

        .faq h3 {
          margin-bottom: 5px;
          color: #111827;
        }
.storesGrid,
.relatedGrid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 18px 0;
}

.storeBadge,
.relatedItem {
  padding: 10px 14px;
  border-radius: 999px;
  background: #ecfdf5;
  color: #166534;
  text-decoration: none;
  font-weight: 900;
  border: 1px solid #bbf7d0;
}

.relatedItem:hover {
  background: #dbeafe;
  color: #1d4ed8;
}
        @media (max-width: 900px) {
          .postArticle {
            padding: 18px;
            margin: 18px 12px;
          }

          .productsGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}