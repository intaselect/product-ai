import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import InternalLinksBoost from "@/app/components/InternalLinksBoost";
import SearchBeforeBuyBanner from "@/app/components/SearchBeforeBuyBanner";
import { merchantPosts } from "./merchantPosts";

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

export const metadata = {
  title: "دليل الشراء ومقارنة الأسعار | BPS Chat",
  description:
    "مقالات ودلائل شراء من BPS Chat لمقارنة أسعار المنتجات في السعودية والخليج ومصر.",
};

export default async function BlogPage() {
  const { data: cachePosts } = await supabase
    .from("product_cache")
    .select("query, country, updated_at, results")
    .order("updated_at", { ascending: false })
    .limit(220);

  const validPosts = (cachePosts || []).filter((item: any) => {
    return (
      item?.query &&
      item?.country &&
      Array.isArray(item?.results) &&
      item.results.length > 0
    );
  });

  const { data: offers } = await supabase
    .from("customer_offers")
    .select("product_name, country, updated_at")
    .eq("status", "approved")
    .order("updated_at", { ascending: false })
    .limit(30);

  return (
    <main dir="rtl" className="blogPage">
      <SeoSearchBar />

      <section className="blogHero">
        <span>📚 عالم المنتجات | BPS Chat Guides</span>
        <h1>دليل الشراء ومقارنة الأسعار في عالم المنتجات</h1>
        <p>
          مقالات ذكية تساعدك تختار المنتج المناسب، تقارن الأسعار، وتشوف عروض
          من المتاجر والعملاء داخل BPS Chat.
        </p>
      </section>

      <section className="blogGrid">
        {merchantPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} className="blogCard" key={post.slug}>
            <span>دليل للتجار</span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <small>اقرأ الدليل ←</small>
          </Link>
        ))}

        {validPosts.map((item: any) => {
          const country = item.country || "sa";
          const slug = makeBlogSlug(item.query, country);
          const countryName = countryNames[country] || "السعودية";

          return (
            <Link href={`/blog/${slug}`} className="blogCard" key={slug}>
              <span>دليل شراء</span>
              <h2>أفضل أسعار {item.query} في {countryName}</h2>
              <p>
                قارن أسعار {item.query}، شاهد أهم النصائح قبل الشراء، واعرف
                أفضل البدائل والعروض المتاحة.
              </p>
              <small>اقرأ المقال ←</small>
            </Link>
          );
        })}
      </section>

      {!!offers?.length && (
        <section className="offersLinks">
          <h2>🔥 مقالات من عروض العملاء</h2>

          <div>
            {offers.map((offer: any, i: number) => {
              const country = offer.country || "sa";
              const countryName = countryNames[country] || "السعودية";
              const slug = makeBlogSlug(offer.product_name, country);

              return (
                <Link href={`/blog/${slug}`} key={`${slug}-${i}`}>
                  أفضل سعر {offer.product_name} في {countryName}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <SearchBeforeBuyBanner />
      <PopularSearches />
      <InternalLinksBoost />

      <section className="authorBox">
        <div className="authorIcon">📝</div>

        <div>
          <h2>عن الكاتب</h2>

          <p>
            تم إعداد هذا الدليل بواسطة فريق BPS Chat المختص في مقارنة الأسعار
            وتحليل عروض المتاجر الإلكترونية في السعودية والإمارات والكويت وقطر
            والبحرين ومصر.
          </p>

          <p>
            يعتمد فريق BPS Chat على تحليل الأسعار والعروض ومراجعة نتائج البحث
            لمساعدة المستخدمين في اتخاذ قرارات شراء أفضل.
          </p>
        </div>
      </section>

      <style>{`
        .blogPage {
          background: #f8fafc;
          min-height: 100vh;
        }

        .blogHero {
          max-width: 1100px;
          margin: 30px auto;
          padding: 44px 22px;
          text-align: center;
          border-radius: 34px;
          background: linear-gradient(135deg, #0f172a, #1d4ed8);
          color: white;
        }

        .blogHero span {
          color: #86efac;
          font-weight: 950;
        }

        .blogHero h1 {
          font-size: clamp(32px, 5vw, 56px);
          margin: 12px 0;
          font-weight: 950;
        }

        .blogHero p {
          max-width: 760px;
          margin: auto;
          line-height: 2;
          color: #dbeafe;
        }

        .authorBox {
          max-width: 1100px;
          margin: 40px auto;
          padding: 24px;
          border-radius: 20px;
          background: #fff;
          border: 1px solid #e2e8f0;
        }

        .authorIcon {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .blogGrid {
          max-width: 1200px;
          margin: 30px auto;
          padding: 0 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .blogCard {
          background: white;
          border-radius: 24px;
          padding: 22px;
          text-decoration: none;
          color: #111827;
          border: 1px solid #e5e7eb;
          box-shadow: 0 16px 40px rgba(15,23,42,0.08);
          transition: all .25s ease;
        }

        .blogCard:hover {
          transform: translateY(-5px);
          border-color: #22c55e;
        }

        .blogCard span {
          color: #16a34a;
          font-weight: 950;
          font-size: 13px;
        }

        .blogCard h2 {
          font-size: 21px;
          line-height: 1.6;
          margin: 10px 0;
        }

        .blogCard p {
          color: #64748b;
          line-height: 1.9;
        }

        .blogCard small {
          color: #2563eb;
          font-weight: 950;
        }

        .offersLinks {
          max-width: 1200px;
          margin: 34px auto;
          padding: 24px;
          background: white;
          border-radius: 28px;
        }

        .offersLinks h2 {
          margin-top: 0;
          color: #111827;
        }

        .offersLinks div {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .offersLinks a {
          padding: 10px 14px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #111827;
          text-decoration: none;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .blogGrid {
            grid-template-columns: 1fr;
          }

          .authorBox {
            margin: 30px 18px;
          }
        }
      `}</style>
    </main>
  );
}