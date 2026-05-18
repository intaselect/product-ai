import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import { fetchRealProducts } from "@/lib/fetchRealProducts";

export const revalidate = 86400; // يوم

export const metadata: Metadata = {
  title: "Smart Search | ابحث حسب الميزانية والاستخدام | BPS Chat",
  description:
    "استخدم Smart Search من BPS Chat للبحث عن منتجات حسب الدولة والميزانية والاستخدام في السعودية ومصر والإمارات والكويت وقطر والبحرين.",
  keywords: [
    "Smart Search",
    "بحث ذكي",
    "منتج حسب الميزانية",
    "جوال بسعر 1000 ريال",
    "لابتوب بسعر مناسب",
    "BPS Chat",
    "بي بي اس شات",
    "مقارنة أسعار",
  ],
};

const countries: any = {
  sa: { name: "السعودية", currency: "ريال", minFactor: 0.75, maxFactor: 1.25 },
  eg: { name: "مصر", currency: "جنيه", minFactor: 0.75, maxFactor: 1.3 },
  ae: { name: "الإمارات", currency: "درهم", minFactor: 0.75, maxFactor: 1.25 },
  kw: { name: "الكويت", currency: "دينار", minFactor: 0.7, maxFactor: 1.35 },
  qa: { name: "قطر", currency: "ريال", minFactor: 0.75, maxFactor: 1.25 },
  bh: { name: "البحرين", currency: "دينار", minFactor: 0.7, maxFactor: 1.35 },
};

const productTypes = [
  "جوال",
  "موبايل",
  "لابتوب",
  "سماعات",
  "ساعة ذكية",
  "عطر",
  "شاشة",
  "بلايستيشن",
  "تابلت",
  "جهاز منزلي",
];

const usages = [
  "تصوير",
  "ألعاب",
  "دراسة",
  "شغل",
  "بطارية قوية",
  "أرخص سعر",
  "أفضل قيمة مقابل السعر",
  "استخدام يومي",
];

function parsePrice(product: any) {
  const raw = String(product.price || product.priceText || "");
  const cleaned = raw.replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) && num > 0 ? num : null;
}

function getStoreName(product: any) {
  const raw = String(product.source || product.store || product.merchant || "");
  const url = String(product.url || product.link || "");
  const text = `${raw} ${url}`.toLowerCase();

  if (text.includes("amazon")) return "Amazon";
  if (text.includes("noon")) return "Noon";
  if (text.includes("jumia")) return "Jumia";
  if (text.includes("jarir")) return "Jarir";
  if (text.includes("extra")) return "Extra";
  if (text.includes("carrefour")) return "Carrefour";
  if (text.includes("xcite")) return "Xcite";
  if (text.includes("sharaf")) return "Sharaf DG";
  if (text.includes("lulu")) return "Lulu";
  if (text.includes("btech")) return "B.TECH";
  if (text.includes("raya")) return "Raya";

  return raw || "متجر إلكتروني";
}

function searchHref(query: string, country: string) {
  return `/search/${encodeURIComponent(query)}-${country}`;
}

export default async function SmartSearchPage({ searchParams }: any) {
  const params = await searchParams;

  const product = String(params?.product || "").trim();
  const country = String(params?.country || "sa");
  const budget = Number(params?.budget || 0);
  const usage = String(params?.usage || "").trim();
  const extra = String(params?.extra || "").trim();

  const countryData = countries[country] || countries.sa;

  const hasSearch = product && budget > 0;

  const query = hasSearch
    ? [
        `أفضل ${product}`,
        usage ? `لـ ${usage}` : "",
        `بسعر ${budget} ${countryData.currency}`,
        extra,
      ]
        .filter(Boolean)
        .join(" ")
    : "";
    const apiQuery = hasSearch
  ? [product, usage, extra].filter(Boolean).join(" ")
  : "";

  const rawProducts = hasSearch
  ? await fetchRealProducts(apiQuery, country)
  : [];

  const minPrice = budget ? Math.floor(budget * countryData.minFactor) : 0;
  const maxPrice = budget ? Math.ceil(budget * countryData.maxFactor) : 0;

  const productsWithPrice =
    rawProducts?.map((p: any) => ({
      ...p,
      numericPrice: parsePrice(p),
      storeName: getStoreName(p),
    })) || [];

  const filteredProducts = productsWithPrice.filter(
    (p: any) => p.numericPrice && p.numericPrice >= minPrice && p.numericPrice <= maxPrice
  );

  const sortedByBudget = [...productsWithPrice].sort((a: any, b: any) => {
  const da = a.numericPrice ? Math.abs(a.numericPrice - budget) : 999999999;
  const db = b.numericPrice ? Math.abs(b.numericPrice - budget) : 999999999;
  return da - db;
});

const finalProducts =
  filteredProducts.length >= 6
    ? filteredProducts.slice(0, 18)
    : sortedByBudget.slice(0, 18);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Smart Search | BPS Chat",
    description:
      "صفحة بحث ذكي تساعد المستخدم على إيجاد منتجات حسب الدولة والميزانية والاستخدام.",
    publisher: {
      "@type": "Organization",
      name: "BPS Chat",
      alternateName: "بي بي اس شات",
      url: "https://www.bpschat.com",
    },
  };

  return (
    <main className="seoPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
  dangerouslySetInnerHTML={{
    __html: `
      document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("smartSearchForm");
        if (form) {
          form.addEventListener("submit", function () {
            form.classList.add("loading");
          });
        }
      });
    `,
  }}
/>

      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat Smart Search</div>

        <h1>
          البحث الذكي حسب الميزانية
          <span>اكتب المنتج والدولة والميزانية، والاستخدام اختياري</span>
        </h1>

        <p>
          Smart Search من <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong>{" "}
          يساعدك تبحث عن منتج مناسب حسب ميزانيتك في السعودية، مصر، الإمارات،
          الكويت، قطر والبحرين بدون ما تغيّر نظام البحث الأساسي في الموقع.
        </p>

        <form id="smartSearchForm" className="smartForm" action="/smart-search" method="get">
          <div className="field">
            <label>المنتج</label>
            <input
              name="product"
              defaultValue={product}
              placeholder="مثال: جوال، لابتوب، AirPods، شاشة"
              required
            />
          </div>

          <div className="field">
            <label>الدولة</label>
            <select name="country" defaultValue={country} required>
              <option value="sa">السعودية</option>
              <option value="eg">مصر</option>
              <option value="ae">الإمارات</option>
              <option value="kw">الكويت</option>
              <option value="qa">قطر</option>
              <option value="bh">البحرين</option>
            </select>
          </div>

          <div className="field">
            <label>الميزانية</label>
            <input
              name="budget"
              type="number"
              defaultValue={budget || ""}
              placeholder="مثال: 1000"
              min="1"
              required
            />
          </div>

          <div className="field">
            <label>الاستخدامات ومعلومات أخرى — اختياري</label>
            <input
              name="usage"
              defaultValue={usage}
              placeholder="مثال: تصوير، ألعاب، دراسة، بطارية قوية"
            />
          </div>

          <div className="field full">
            <label>تفاصيل إضافية — اختياري</label>
            <textarea
              name="extra"
              defaultValue={extra}
              placeholder="مثال: أفضل كاميرا، شاشة كبيرة، مناسب للأطفال، جديد فقط"
            />
          </div>

          <button type="submit" className="smartSubmit">
  <span className="normalText">اعرض المنتجات المناسبة</span>
  <span className="loadingText">🤖 جاري تحليل المنتجات...</span>
</button>
        </form>
      </section>

      {hasSearch && (
        <section className="content" dir="rtl">
          <h2>
            نتائج مناسبة لـ {product} في {countryData.name}
          </h2>

          <div className="summaryBox">
            <p>
              بحثنا عن: <strong>{query}</strong>
            </p>
            <p>
              نطاق السعر المستهدف: من{" "}
              <strong>
                {minPrice.toLocaleString()} إلى {maxPrice.toLocaleString()}{" "}
                {countryData.currency}
              </strong>
            </p>

            {filteredProducts.length === 0 && (
              <p>
                لم نجد نتائج كثيرة داخل نطاق الميزانية بالضبط، لذلك نعرض لك أقرب
                نتائج متاحة من البحث.
              </p>
            )}

            <Link href={searchHref(query, country)} className="secondaryBtn">
              افتح صفحة البحث الكاملة
            </Link>
          </div>

          <div className="productsGrid">
            {finalProducts.length > 0 ? (
              finalProducts.slice(0, 18).map((product: any, index: number) => (
                <div key={index} className="seoProductCard">
                  {(product.image || product.thumbnail) && (
                    <img
                      src={product.image || product.thumbnail}
                      alt={product.title || product.name || "منتج من BPS Chat"}
                      loading="lazy"
                    />
                  )}

                  <div>
                    <h3>{product.title || product.name || "منتج"}</h3>

                    <p className="price">
                      {product.priceText || product.price || "السعر غير متوفر"}
                    </p>

                    <p className="store">المتجر: {product.storeName}</p>

                    {product.numericPrice && (
                      <p className="match">
                        السعر المقروء: {product.numericPrice.toLocaleString()}{" "}
                        {countryData.currency}
                      </p>
                    )}

                    {(product.url || product.link) && (
                      <a
                        href={product.url || product.link}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                      >
                        عرض المنتج
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>
                لم تظهر نتائج الآن. جرّب تغيير الميزانية أو كتابة اسم منتج أوضح.
              </p>
            )}
          </div>

          <h2>روابط بحث سريعة</h2>

          <div className="quickLinks">
            <Link href={searchHref(`أفضل ${product} بسعر ${budget}`, country)}>
              أفضل {product} بسعر {budget}
            </Link>
            <Link href={searchHref(`أرخص ${product}`, country)}>
              أرخص {product}
            </Link>
            <Link href={searchHref(`عروض ${product}`, country)}>
              عروض {product}
            </Link>
            {usage && (
              <Link href={searchHref(`أفضل ${product} لـ ${usage}`, country)}>
                أفضل {product} لـ {usage}
              </Link>
            )}
          </div>
        </section>
      )}

      <section className="content" dir="rtl">
        <h2>أمثلة جاهزة</h2>

        <div className="quickLinks">
          <Link href="/smart-search?product=جوال&country=sa&budget=1000&usage=تصوير">
            جوال للتصوير بسعر 1000 ريال
          </Link>
          <Link href="/smart-search?product=لابتوب&country=eg&budget=25000&usage=دراسة">
            لابتوب للدراسة بسعر 25000 جنيه
          </Link>
          <Link href="/smart-search?product=سماعات&country=ae&budget=500&usage=عزل ضوضاء">
            سماعات بعزل ضوضاء في الإمارات
          </Link>
          <Link href="/smart-search?product=عطر&country=kw&budget=30">
            عطر بسعر 30 دينار في الكويت
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

        .hero, .content {
          max-width: 1120px;
          margin: 0 auto;
          padding: 42px 18px;
        }

        .badge {
          display: inline-flex;
          padding: 8px 14px;
          border: 1px solid rgba(16,163,127,0.45);
          border-radius: 999px;
          color: #10a37f;
          background: rgba(16,163,127,0.08);
          margin-bottom: 18px;
          font-weight: 800;
        }

        h1 {
          font-size: clamp(34px, 5vw, 62px);
          line-height: 1.15;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: clamp(18px, 2vw, 27px);
          color: #b8c7d9;
          margin-top: 12px;
        }

        h2 {
          font-size: 30px;
          margin-top: 36px;
          margin-bottom: 16px;
        }

        p {
          color: #d7dee8;
          line-height: 2;
          font-size: 17px;
        }

        .smartForm {
          margin-top: 26px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.22);
        }

        .field {
          display: grid;
          gap: 8px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        label {
          color: #eaf5f1;
          font-weight: 800;
        }

        input, select, textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.14);
          background: #111821;
          color: white;
          border-radius: 14px;
          padding: 13px 14px;
          font-size: 15px;
          outline: none;
        }

        textarea {
          min-height: 88px;
          resize: vertical;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #10a37f;
          box-shadow: 0 0 0 3px rgba(16,163,127,0.15);
        }

        button {
          grid-column: 1 / -1;
          border: 0;
          border-radius: 16px;
          padding: 15px 20px;
          background: linear-gradient(135deg, #10a37f, #18d6a3);
          color: #06110e;
          font-weight: 900;
          cursor: pointer;
          font-size: 16px;
        }

        .summaryBox, .seoProductCard {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.22);
        }

        .summaryBox {
          border-color: rgba(16,163,127,0.25);
          background:
            radial-gradient(circle at top, rgba(16,163,127,0.13), transparent 55%),
            rgba(255,255,255,0.055);
        }

        .productsGrid {
          display: grid;
          gap: 16px;
          margin-top: 18px;
        }

        .seoProductCard {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 16px;
          align-items: center;
        }

        .seoProductCard img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 16px;
          background: white;
          padding: 8px;
        }

        .seoProductCard h3 {
          font-size: 17px;
          margin: 0 0 8px;
        }

        .price {
          color: #18d6a3;
          font-weight: 900;
          margin: 0;
        }

        .store, .match {
          color: #aeb8c6;
          margin: 4px 0;
          font-size: 14px;
        }

        .seoProductCard a {
          color: #10a37f;
          font-weight: 800;
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 18px;
        }

        .quickLinks a, .secondaryBtn {
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          text-decoration: none;
          border-radius: 14px;
          padding: 11px 14px;
          font-weight: 800;
          display: inline-flex;
        }

        .quickLinks a:hover, .secondaryBtn:hover {
          border-color: #10a37f;
          color: #10a37f;
        }
.smartSubmit {
  position: relative;
  overflow: hidden;
}

.loadingText {
  display: none;
}

.smartForm.loading .normalText {
  display: none;
}

.smartForm.loading .loadingText {
  display: inline-block;
  animation: pulseAi 1s infinite ease-in-out;
}

.smartForm.loading .smartSubmit {
  pointer-events: none;
  background: linear-gradient(135deg, #10a37f, #00e5ff, #7c3aed);
  background-size: 220% 220%;
  animation: aiGradient 1.4s infinite linear;
}

@keyframes aiGradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes pulseAi {
  0%, 100% { opacity: 0.65; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
}
        @media (max-width: 800px) {
          .smartForm {
            grid-template-columns: 1fr;
          }

          .seoProductCard {
            grid-template-columns: 82px 1fr;
          }

          .seoProductCard img {
            width: 82px;
            height: 82px;
          }
        }
      `}</style>
    </main>
  );
}