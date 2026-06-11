"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number | string;
  product_name: string;
  price?: string;
  image_url?: string;
  image_url_2?: string;
  image_url_3?: string;
  product_url?: string;
  store_name?: string;
  country?: string;
  category?: string[] | string;
  status?: string;
  created_at?: string;
};

type Comparison = {
  id: number;
  slug: string;
  title: string;
  meta_description?: string;
  content?: string;
};

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
  
};

export default function ComparisonGeneratorPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");

  const [product1, setProduct1] = useState<Product | null>(null);
  const [product2, setProduct2] = useState<Product | null>(null);

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [comparison, setComparison] = useState<Comparison | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoadingProducts(true);
        const res = await fetch("/api/admin/comparison-products", {
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok || !data.ok) {
          setError(data.error || "فشل تحميل المنتجات");
          return;
        }

        setProducts(data.products || []);
      } catch {
        setError("حدث خطأ أثناء تحميل المنتجات");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchQuery =
        !q ||
        String(p.product_name || "").toLowerCase().includes(q) ||
        String(p.store_name || "").toLowerCase().includes(q) ||
        String(p.price || "").toLowerCase().includes(q);

      const matchCountry = country === "all" || p.country === country;

      return matchQuery && matchCountry;
    });
  }, [products, query, country]);

  async function generateComparison() {
    setError("");
    setComparison(null);

    if (!product1 || !product2) {
      setError("اختار المنتج الأول والمنتج الثاني الأول.");
      return;
    }

    if (product1.id === product2.id) {
      setError("لازم تختار منتجين مختلفين.");
      return;
    }

    try {
      setGenerating(true);

      const res = await fetch("/api/admin/generate-comparison", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product1,
          product2,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "فشل توليد المقارنة");
        return;
      }

      setComparison(data.comparison);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("حدث خطأ غير متوقع أثناء توليد المقارنة");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <main className="comparisonAdminPage" dir="rtl">
      <section className="adminHero">
        <Link href="/" className="backLink">
          ← الرجوع للرئيسية
        </Link>

        <div className="badge">🤖 مولد مقارنات BPS Chat</div>

        <h1>توليد صفحة مقارنة من منتجات متجر العملاء</h1>

        <p>
          اختار منتجين من العروض المعتمدة، وسيقوم Gemini بإنشاء مقال مقارنة SEO
          كامل وحفظه مباشرة في جدول المقارنات.
        </p>
      </section>

      {comparison && (
        <section className="resultBox">
          <h2>✅ تم إنشاء المقارنة بنجاح</h2>

          <div className="resultInfo">
            <strong>{comparison.title}</strong>
            <span>{comparison.meta_description}</span>
          </div>

          <div className="resultActions">
            <Link href={`/compare/${comparison.slug}`} target="_blank">
              🌍 فتح صفحة المقارنة
            </Link>

            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/compare/${comparison.slug}`
                )
              }
            >
              📋 نسخ الرابط
            </button>
          </div>
        </section>
      )}

      {error && <div className="errorBox">{error}</div>}

      <section className="controlsBox">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث باسم المنتج أو المتجر أو السعر..."
        />

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="all">كل الدول</option>
          <option value="sa">السعودية</option>
          <option value="ae">الإمارات</option>
          <option value="kw">الكويت</option>
          <option value="qa">قطر</option>
          <option value="bh">البحرين</option>
          <option value="eg">مصر</option>
        </select>
      </section>

      <section className="selectedGrid">
        <SelectedProductCard title="المنتج الأول" product={product1} />
        <SelectedProductCard title="المنتج الثاني" product={product2} />
      </section>

      <div className="generateWrap">
        <button
          type="button"
          className="generateBtn"
          onClick={generateComparison}
          disabled={generating || !product1 || !product2}
        >
          {generating
            ? "⏳ جاري توليد المقارنة..."
            : "🚀 توليد وحفظ صفحة المقارنة"}
        </button>
      </div>

      <section className="productsSection">
        <div className="sectionHead">
          <h2>المنتجات المتاحة</h2>
          <span>
            {loadingProducts
              ? "جاري التحميل..."
              : `${filteredProducts.length} منتج`}
          </span>
        </div>

        {loadingProducts ? (
          <div className="loadingBox">⏳ جاري تحميل المنتجات...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="loadingBox">لا توجد منتجات مطابقة.</div>
        ) : (
          <div className="productsGrid">
            {filteredProducts.map((product) => {
              const isFirst = product1?.id === product.id;
              const isSecond = product2?.id === product.id;

              return (
                <article
                  key={product.id}
                  className={`productCard ${
                    isFirst || isSecond ? "active" : ""
                  }`}
                >
                  <div className="imageWrap">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.product_name} />
                    ) : (
                      <span>🛍️</span>
                    )}
                  </div>

                  <div className="productBody">
                    <h3>{product.product_name}</h3>

                    <p className="price">{product.price || "بدون سعر"}</p>

                    <p className="meta">
                      {product.store_name || "متجر غير محدد"} •{" "}
                      {countryNames[product.country || ""] ||
                        product.country ||
                        "دولة غير محددة"}
                    </p>

                    <div className="pickActions">
                      <button
                        type="button"
                        onClick={() => setProduct1(product)}
                        className={isFirst ? "chosen" : ""}
                      >
                        {isFirst ? "✅ المنتج الأول" : "اختيار كأول"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setProduct2(product)}
                        className={isSecond ? "chosen" : ""}
                      >
                        {isSecond ? "✅ المنتج الثاني" : "اختيار كثاني"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <style>{styles}</style>
    </main>
  );
}

function SelectedProductCard({
  title,
  product,
}: {
  title: string;
  product: Product | null;
}) {
  return (
    <div className="selectedCard">
      <h2>{title}</h2>

      {!product ? (
        <p className="emptySelected">لم يتم الاختيار بعد</p>
      ) : (
        <div className="selectedContent">
          <div className="selectedImage">
            {product.image_url ? (
              <img src={product.image_url} alt={product.product_name} />
            ) : (
              <span>🛍️</span>
            )}
          </div>

          <div>
            <h3>{product.product_name}</h3>
            <p>{product.price || "بدون سعر"}</p>
            <span>
              {product.store_name || "متجر غير محدد"} •{" "}
              {countryNames[product.country || ""] ||
                product.country ||
                "دولة غير محددة"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = `
.comparisonAdminPage {
  min-height: 100vh;
  padding: 42px 16px 80px;
  color: white;
  background:
    radial-gradient(circle at 18% 8%, rgba(34,197,94,.18), transparent 28%),
    radial-gradient(circle at 80% 18%, rgba(37,99,235,.20), transparent 30%),
    linear-gradient(180deg, #151515 0%, #202020 55%, #0f0f0f 100%);
}

.adminHero {
  max-width: 1100px;
  margin: 0 auto 22px;
  text-align: center;
  padding: 36px 18px;
  border-radius: 30px;
  background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.08);
  box-shadow: 0 25px 80px rgba(0,0,0,.35);
}

.backLink {
  color: #bbf7d0;
  text-decoration: none;
  font-weight: 900;
}

.badge {
  display: inline-block;
  margin: 18px 0 14px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(34,197,94,.13);
  border: 1px solid rgba(34,197,94,.3);
  color: #bbf7d0;
  font-weight: 900;
}

.adminHero h1 {
  margin: 0;
  font-size: clamp(30px, 5vw, 54px);
  line-height: 1.25;
  font-weight: 950;
  background: linear-gradient(135deg, #fff, #86efac, #60a5fa);
  -webkit-background-clip: text;
  color: transparent;
}

.adminHero p {
  max-width: 760px;
  margin: 16px auto 0;
  color: #d1d5db;
  line-height: 1.9;
  font-size: 16px;
}

.resultBox,
.controlsBox,
.selectedGrid,
.productsSection,
.errorBox {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.resultBox {
  margin-bottom: 18px;
  padding: 20px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(34,197,94,.16), rgba(37,99,235,.12));
  border: 1px solid rgba(34,197,94,.35);
}

.resultBox h2 {
  margin: 0 0 12px;
}

.resultInfo {
  display: grid;
  gap: 8px;
  color: #e5e7eb;
}

.resultInfo span {
  color: #cbd5e1;
  line-height: 1.7;
}

.resultActions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.resultActions a,
.resultActions button {
  border: 0;
  cursor: pointer;
  text-decoration: none;
  color: white;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 950;
  background: linear-gradient(135deg, #16a34a, #2563eb);
}

.errorBox {
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: 18px;
  color: #fecaca;
  background: rgba(239,68,68,.14);
  border: 1px solid rgba(239,68,68,.35);
  font-weight: 900;
}

.controlsBox {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 12px;
  margin-bottom: 18px;
}

.controlsBox input,
.controlsBox select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(255,255,255,.12);
  background: #171717;
  color: white;
  border-radius: 18px;
  padding: 14px 15px;
  font-size: 15px;
  outline: none;
}

.controlsBox input:focus,
.controlsBox select:focus {
  border-color: rgba(34,197,94,.75);
  box-shadow: 0 0 0 4px rgba(34,197,94,.12);
}

.selectedGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.selectedCard {
  min-height: 170px;
  padding: 18px;
  border-radius: 24px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.09);
}

.selectedCard h2 {
  margin: 0 0 14px;
  color: #bbf7d0;
}

.emptySelected {
  color: #9ca3af;
  margin: 0;
}

.selectedContent {
  display: flex;
  gap: 14px;
  align-items: center;
}

.selectedImage {
  width: 92px;
  height: 92px;
  flex: 0 0 92px;
  border-radius: 18px;
  background: white;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.selectedImage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.selectedContent h3 {
  margin: 0 0 8px;
  line-height: 1.5;
}

.selectedContent p {
  margin: 0 0 7px;
  color: #86efac;
  font-weight: 950;
}

.selectedContent span {
  color: #cbd5e1;
  font-size: 13px;
}

.generateWrap {
  max-width: 1100px;
  margin: 0 auto 22px;
  text-align: center;
}

.generateBtn {
  width: min(100%, 520px);
  border: 0;
  cursor: pointer;
  padding: 16px 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #16a34a, #22c55e, #2563eb);
  color: white;
  font-weight: 950;
  font-size: 17px;
  box-shadow: 0 0 35px rgba(34,197,94,.35);
  transition: .25s;
}

.generateBtn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 55px rgba(34,197,94,.55);
}

.generateBtn:disabled {
  opacity: .55;
  cursor: not-allowed;
}

.productsSection {
  padding: 20px;
  border-radius: 28px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
}

.sectionHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.sectionHead h2 {
  margin: 0;
}

.sectionHead span {
  color: #bbf7d0;
  font-weight: 900;
}

.loadingBox {
  padding: 28px;
  text-align: center;
  border-radius: 20px;
  background: rgba(0,0,0,.18);
  color: #d1d5db;
  font-weight: 900;
}

.productsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.productCard {
  overflow: hidden;
  border-radius: 22px;
  background: rgba(255,255,255,.055);
  border: 1px solid rgba(255,255,255,.08);
  transition: .25s;
}

.productCard:hover {
  transform: translateY(-4px);
  border-color: rgba(34,197,94,.35);
}

.productCard.active {
  border-color: rgba(34,197,94,.8);
  box-shadow: 0 0 30px rgba(34,197,94,.18);
}

.imageWrap {
  height: 190px;
  background: white;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.imageWrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.imageWrap span {
  font-size: 42px;
}

.productBody {
  padding: 14px;
}

.productBody h3 {
  margin: 0 0 10px;
  line-height: 1.55;
  font-size: 15px;
  min-height: 70px;
}

.price {
  margin: 0 0 8px;
  color: #86efac;
  font-weight: 950;
}

.meta {
  margin: 0 0 12px;
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.6;
}

.pickActions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.pickActions button {
  border: 0;
  cursor: pointer;
  padding: 10px;
  border-radius: 14px;
  color: white;
  font-weight: 900;
  background: rgba(255,255,255,.10);
  transition: .2s;
}

.pickActions button:hover,
.pickActions button.chosen {
  background: linear-gradient(135deg, #16a34a, #2563eb);
}

@media (max-width: 900px) {
  .productsGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .controlsBox,
  .selectedGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .comparisonAdminPage {
    padding: 26px 12px 60px;
  }

  .productsGrid {
    grid-template-columns: 1fr;
  }

  .imageWrap {
    height: 210px;
  }

  .selectedContent {
    align-items: flex-start;
  }

  .selectedImage {
    width: 76px;
    height: 76px;
    flex-basis: 76px;
  }
}
`;