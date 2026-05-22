import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import { fetchRealProducts } from "@/lib/fetchRealProducts";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

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

  iq: { name: "العراق", currency: "دينار", minFactor: 0.7, maxFactor: 1.4 }, // جديد
  om: { name: "عُمان", currency: "ريال", minFactor: 0.75, maxFactor: 1.3 }, // جديد
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
const CACHE_DAYS = 10;
const DAILY_LIMIT = 10;
const MINUTE_LIMIT = 5;

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function cleanCacheText(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/[^\w\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ");
}

function makeCacheKey(query: string, country: string) {
  return `${String(country || "sa").toLowerCase().trim()}:${cleanCacheText(query)}`;
}

function getClientIP(headersList: Headers) {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

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
  const visitorId = String(params?.visitorId || "").trim();

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
    const apiQuery = hasSearch ? product : "";

let rawProducts: any[] = [];
let remainingSearches = DAILY_LIMIT;
let limitMessage = "";

if (hasSearch) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const ip = getClientIP(headersList);
  const realIp = ip && ip !== "unknown" ? ip : null;
const searchKey = realIp || (visitorId ? `visitor:${visitorId}` : "unknown");

  const isBot =
    userAgent.toLowerCase().includes("bot") ||
    userAgent.toLowerCase().includes("crawl") ||
    userAgent.toLowerCase().includes("spider") ||
    userAgent.toLowerCase().includes("google") ||
    userAgent.toLowerCase().includes("bing");

  if (!isBot) {
    const supabase = getSupabaseAdmin();
    const cacheKey = makeCacheKey(apiQuery, country);
    const now = new Date().toISOString();

    const today = new Date().toISOString().slice(0, 10);
    const todayStart = `${today}T00:00:00`;
    const minuteBucket = new Date().toISOString().slice(0, 16);

    const { data: cached } = await supabase
      .from("product_cache")
      .select("results")
      .eq("cache_key", cacheKey)
      .gt("expires_at", now)
      .maybeSingle();

    const { count: dailyCount } = await supabase
      .from("product_cache")
      .select("*", { count: "exact", head: true })
      .eq("ip", searchKey)
      .gte("created_at", todayStart);

    remainingSearches = Math.max(0, DAILY_LIMIT - (dailyCount || 0));

    if (cached?.results?.length) {
      rawProducts = cached.results;
    } else {
      const { count: minuteCount } = await supabase
        .from("search_rate_limits")
        .select("*", { count: "exact", head: true })
        .eq("ip", searchKey)
        .eq("minute_bucket", minuteBucket);

      if ((dailyCount || 0) >= DAILY_LIMIT) {
        limitMessage =
          "لقد وصلت للحد اليومي 10 عمليات بحث جديدة، جرّب غدًا أو استخدم نتائج الكاش.";
      } else if ((minuteCount || 0) >= MINUTE_LIMIT) {
        limitMessage = "طلبات سريعة جدًا، استنى دقيقة وجرب تاني.";
      } else {
       if (searchKey === "unknown") {
  limitMessage = "طلب غير موثوق. افتح الصفحة من الموقع وجرب مرة أخرى.";
} else {
  rawProducts = await fetchRealProducts(apiQuery, country);
}

        await supabase.from("search_rate_limits").insert({
          ip: searchKey,
          day: today,
          minute_bucket: minuteBucket,
          query: apiQuery,
          country,
        });

        remainingSearches = Math.max(0, DAILY_LIMIT - ((dailyCount || 0) + 1));

        if (Array.isArray(rawProducts) && rawProducts.length > 0) {
          await supabase.from("product_cache").upsert(
            {
              cache_key: cacheKey,
              query: cleanCacheText(apiQuery),
              country,
              results: rawProducts,
              ip: realIp || searchKey,
              updated_at: now,
              expires_at: new Date(
                Date.now() + CACHE_DAYS * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            { onConflict: "cache_key" }
          );
        }
      }
    }
  }
}
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
      var visitorInput = document.getElementById("smartVisitorId");
if (visitorInput) {
  var id = localStorage.getItem("bps_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("bps_visitor_id", id);
  }
  visitorInput.value = id;
}
        var form = document.getElementById("smartSearchForm");
        var overlay = document.getElementById("smartLoadingOverlay");

        if (form) {
          form.addEventListener("submit", function () {
            form.classList.add("loading");
            if (overlay) overlay.classList.add("show");
          });
          
        }
          var seoLinks = document.querySelectorAll(".seoLoadingLink");
seoLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (overlay) overlay.classList.add("show");
  });
});
      });
    `,
  }}
/>

      <SeoSearchBar />
<div id="smartLoadingOverlay" className="smartLoadingOverlay">
  <div className="aiLoaderBox">
    <div className="aiOrbit">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <strong>🤖 جاري تحليل المنتجات</strong>
    <p>بنقارن النتائج حسب الدولة والميزانية...</p>
  </div>
</div>
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
        <input type="hidden" name="visitorId" id="smartVisitorId" />
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
              <option value="iq">العراق</option>
<option value="om">عُمان</option>
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
        <div className={`smartCounter ${remainingSearches <= 3 ? "danger" : ""}`}>
  المتبقي اليوم: {remainingSearches} / 10 بحث جديد
</div>

{limitMessage && (
  <div className="smartLimitError">
    {limitMessage}
  </div>
)}
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

            <Link
  href={searchHref(
    `${product} في ${countryData.name} اقل من ${budget} ${countryData.currency}`,
    country
  )}
  className="secondaryBtn seoLoadingLink"
>
 تصفح كامل المنتجات في الصفحة الكاملة
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
  <Link
    href={searchHref(
      `${product} في ${countryData.name} اقل من ${budget} ${countryData.currency}`,
      country
    )}
  >
    {product} أقل من {budget} {countryData.currency}
  </Link>

  <Link
    href={searchHref(
      `أفضل ${product} في ${countryData.name} بسعر ${budget} ${countryData.currency}`,
      country
    )}
  >
    أفضل {product} بسعر {budget}
  </Link>

  <Link
    href={searchHref(
      `أرخص ${product} في ${countryData.name}`,
      country
    )}
  >
    أرخص {product} في {countryData.name}
  </Link>

  <Link
    href={searchHref(
      `عروض ${product} في ${countryData.name}`,
      country
    )}
  >
    عروض {product}
  </Link>

  {usage && (
    <Link
      href={searchHref(
        `أفضل ${product} لـ ${usage} في ${countryData.name} اقل من ${budget} ${countryData.currency}`,
        country
      )}
    >
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
.smartCounter {
  margin: 14px auto 0;
  width: fit-content;
  padding: 9px 14px;
  border-radius: 14px;
  color: #00ffd0;
  font-size: 14px;
  font-weight: 900;
  background: linear-gradient(135deg, rgba(0,255,200,0.15), rgba(0,180,255,0.15));
  border: 1px solid rgba(0,255,200,0.3);
  box-shadow:
    0 0 12px rgba(0,255,200,0.25),
    inset 0 0 6px rgba(0,255,200,0.08);
}

.smartCounter.danger {
  color: #ff4d4d;
  border-color: rgba(255,0,0,0.4);
  box-shadow:
    0 0 12px rgba(255,0,0,0.3),
    inset 0 0 6px rgba(255,0,0,0.1);
}

.smartLimitError {
  margin: 14px auto 0;
  max-width: 620px;
  padding: 12px 16px;
  border-radius: 16px;
  color: #ffb3b3;
  text-align: center;
  background: rgba(255,0,0,0.10);
  border: 1px solid rgba(255,80,80,0.35);
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
  .smartLoadingOverlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: none;
  place-items: center;
  background: rgba(5, 10, 14, 0.72);
  backdrop-filter: blur(12px);
}

.smartLoadingOverlay.show {
  display: grid;
}

.aiLoaderBox {
  width: min(90%, 360px);
  text-align: center;
  padding: 28px;
  border-radius: 28px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(0,255,200,0.25);
  box-shadow: 0 0 45px rgba(0,255,200,0.22);
}

.aiOrbit {
  position: relative;
  width: 88px;
  height: 88px;
  margin: 0 auto 18px;
  border-radius: 50%;
  border: 2px solid rgba(16,163,127,0.35);
  animation: spinAi 1.2s linear infinite;
}

.aiOrbit span {
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #18d6a3;
  box-shadow: 0 0 18px #18d6a3;
}

.aiOrbit span:nth-child(1) { top: -6px; left: 38px; }
.aiOrbit span:nth-child(2) { right: -6px; top: 38px; background: #00e5ff; }
.aiOrbit span:nth-child(3) { bottom: -6px; left: 38px; background: #7c3aed; }

.aiLoaderBox strong {
  display: block;
  font-size: 20px;
  margin-bottom: 8px;
}

.aiLoaderBox p {
  margin: 0;
  font-size: 14px;
  color: #b8c7d9;
}

@keyframes spinAi {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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