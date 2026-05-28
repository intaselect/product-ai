"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import MarketPromoSection from "@/app/components/MarketPromoSection";

const countries: any = {
  sa: { name: "السعودية", currency: "ريال", market: "حراج، فيسبوك، واتساب، إنستجرام" },
  eg: { name: "مصر", currency: "جنيه", market: "OLX، فيسبوك ماركت، واتساب، جروبات البيع" },
  ae: { name: "الإمارات", currency: "درهم", market: "Dubizzle، فيسبوك، واتساب، إنستجرام" },
  kw: { name: "الكويت", currency: "دينار", market: "فيسبوك، واتساب، إنستجرام، مواقع الإعلانات" },
  qa: { name: "قطر", currency: "ريال", market: "فيسبوك، واتساب، إنستجرام، مواقع الإعلانات" },
  bh: { name: "البحرين", currency: "دينار", market: "فيسبوك، واتساب، إنستجرام، مواقع الإعلانات" },
};

function buildKeywords(product: string, countryName: string, condition: string) {
  return [
    product,
    `${product} للبيع`,
    `سعر ${product}`,
    `${product} ${countryName}`,
    `${product} ${condition}`,
    `أفضل سعر ${product}`,
    `شراء ${product}`,
    `بيع ${product}`,
    `إعلان ${product}`,
    `منتج للبيع في ${countryName}`,
    "BPS Chat",
    "بي بي اس شات",
  ];
}

function buildHashtags(product: string, countryName: string, condition: string) {
  const cleanProduct = product.replace(/\s+/g, "");
  return [
    `#${cleanProduct}`,
    "#للبيع",
    "#عروض",
    "#سعر_مناسب",
    `#${countryName}`,
    `#${condition}`,
    "#تسوق",
    "#بيع_وشراء",
    "#BPSChat",
    "#بي_بي_اس_شات",
  ];
}

export default function SellerToolsPage() {
  const [product, setProduct] = useState("");
  const [country, setCountry] = useState("sa");
  const [condition, setCondition] = useState("جديد");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  const result = useMemo(() => {
    const countryData = countries[country];
    const name = product.trim() || "اسم المنتج";
    const priceText = price ? `${price} ${countryData.currency}` : "بسعر مناسب";
    const detailsText = details.trim() || "مواصفات ممتازة وحالة جيدة وجاهز للاستخدام.";

    const title = `🔥 ${name} ${condition} في ${countryData.name} - ${priceText}`;

    const description = `للبيع ${name} ${condition} في ${countryData.name}. ${detailsText}

السعر: ${priceText}
المكان: ${countryData.name}
مناسب للنشر على: ${countryData.market}

ملاحظة: يفضل التواصل بسرعة لأن السعر والعروض قد تتغير حسب الطلب.`;

    const shortAd = `${name} ${condition} للبيع في ${countryData.name} بسعر ${priceText}. ${detailsText}`;

    const whatsappAd = `🔥 ${name} ${condition} للبيع

📍 الدولة: ${countryData.name}
💰 السعر: ${priceText}
✅ التفاصيل: ${detailsText}

للمهتمين، تواصل معي.`;

    const facebookAd = `📢 فرصة للبيع

${name} ${condition} في ${countryData.name}

${detailsText}

💰 السعر: ${priceText}

مناسب لمن يبحث عن ${name} بسعر جيد داخل ${countryData.name}.
راسلني للاتفاق أو لمعرفة التفاصيل.`;

    const keywords = buildKeywords(name, countryData.name, condition);
    const hashtags = buildHashtags(name, countryData.name, condition);

    return {
      title,
      description,
      shortAd,
      whatsappAd,
      facebookAd,
      keywords,
      hashtags,
    };
  }, [product, country, condition, price, details]);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    alert("تم النسخ ✅");
  }

  return (
    <main className="sellerPage">
      <SeoSearchBar />


      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat Seller Tools</div>

        <h1>
          أداة كتابة إعلان بيع منتج
          <span>اكتب المنتج والسعر والمواصفات وخلي بي بي اس شات يجهزلك الإعلان</span>
        </h1>

        <p>
          أداة مجانية من <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong>{" "}
          تساعدك تجهز عنوان بيع قوي، وصف احترافي، كلمات مفتاحية، تاجات،
          هاشتاجات، إعلان فيسبوك، ورسالة واتساب لأي منتج في السعودية، مصر،
          الإمارات، الكويت، قطر والبحرين.
        </p>
      </section>

      <section className="toolWrap" dir="rtl">
        <div className="formCard">
          <h2>بيانات المنتج</h2>

          <label>اسم المنتج</label>
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="مثال: iPhone 16 Pro Max 256GB"
          />

          <label>الدولة</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="sa">السعودية</option>
            <option value="eg">مصر</option>
            <option value="ae">الإمارات</option>
            <option value="kw">الكويت</option>
            <option value="qa">قطر</option>
            <option value="bh">البحرين</option>
          </select>

          <label>الحالة</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option>جديد</option>
            <option>مستعمل</option>
            <option>كسر زيرو</option>
            <option>مفتوح للتجربة</option>
            <option>بحالة ممتازة</option>
          </select>

          <label>السعر</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="مثال: 3500"
          />

          <label>المواصفات أو معلومات إضافية</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="مثال: بطارية ممتازة، بدون خدوش، مع العلبة والشاحن، ضمان محلي..."
          />
        </div>

        <div className="resultCard">
          <h2>المحتوى الجاهز</h2>

          <div className="outputBox">
            <div className="outputHead">
              <h3>عنوان الإعلان</h3>
              <button onClick={() => copy(result.title)}>نسخ</button>
            </div>
            <p>{result.title}</p>
          </div>

          <div className="outputBox">
            <div className="outputHead">
              <h3>وصف المنتج</h3>
              <button onClick={() => copy(result.description)}>نسخ</button>
            </div>
            <pre>{result.description}</pre>
          </div>

          <div className="outputBox">
            <div className="outputHead">
              <h3>إعلان فيسبوك</h3>
              <button onClick={() => copy(result.facebookAd)}>نسخ</button>
            </div>
            <pre>{result.facebookAd}</pre>
          </div>

          <div className="outputBox">
            <div className="outputHead">
              <h3>رسالة واتساب</h3>
              <button onClick={() => copy(result.whatsappAd)}>نسخ</button>
            </div>
            <pre>{result.whatsappAd}</pre>
          </div>

          <div className="outputBox">
            <div className="outputHead">
              <h3>الكلمات المفتاحية</h3>
              <button onClick={() => copy(result.keywords.join("، "))}>نسخ</button>
            </div>
            <div className="chips">
              {result.keywords.map((k) => (
                <span key={k}>{k}</span>
              ))}
            </div>
          </div>

          <div className="outputBox">
            <div className="outputHead">
              <h3>الهاشتاجات</h3>
              <button onClick={() => copy(result.hashtags.join(" "))}>نسخ</button>
            </div>
            <div className="chips">
              {result.hashtags.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="seoContent" dir="rtl">
        <h2>لماذا تستخدم أداة Seller Tools من BPS Chat؟</h2>
        <p>
          كتابة إعلان بيع قوي لا تعتمد على السعر فقط. العنوان، الوصف، الكلمات
          المفتاحية، الهاشتاجات، ووضوح المواصفات يساعدوا إعلانك يظهر أكثر ويجذب
          مشتري جاد. لذلك توفر أداة BPS Chat نصوص جاهزة تناسب البيع على فيسبوك،
          واتساب، OLX، حراج، Dubizzle وجروبات البيع.
        </p>

        <div className="quickLinks">
          <Link href="/smart-search">البحث الذكي حسب الميزانية</Link>
          <Link href="/deals">العروض والخصومات</Link>
          <Link href="/stores">دليل المتاجر</Link>
          <Link href="/categories">دليل الأقسام</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
        </div>
      </section>

      <style jsx>{`
        .sellerPage {
          min-height: 100vh;
          color: white;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
            #0b0f14;
        }

        .hero,
        .toolWrap,
        .seoContent {
          max-width: 1150px;
          margin: 0 auto;
          padding: 40px 18px;
        }

        .badge {
          display: inline-flex;
          padding: 8px 14px;
          border: 1px solid rgba(16,163,127,0.45);
          border-radius: 999px;
          color: #10ffd0;
          background: rgba(16,163,127,0.08);
          font-weight: 900;
          text-shadow: 0 0 12px rgba(16,163,127,0.45);
        }

        h1 {
          font-size: clamp(34px, 5vw, 62px);
          line-height: 1.15;
          margin: 18px 0;
        }

        h1 span {
          display: block;
          font-size: clamp(18px, 2vw, 27px);
          color: #b8c7d9;
          margin-top: 12px;
        }

        p {
          color: #d7dee8;
          line-height: 2;
          font-size: 17px;
        }

        .toolWrap {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 20px;
          align-items: start;
        }

        .formCard,
        .resultCard,
        .seoContent,
        .outputBox {
          background:
            linear-gradient(135deg, rgba(16,163,127,0.08), rgba(0,180,255,0.04)),
            rgba(255,255,255,0.055);
          border: 1px solid rgba(16,163,127,0.18);
          border-radius: 24px;
          padding: 20px;
          box-shadow:
            0 0 24px rgba(16,163,127,0.08),
            0 20px 60px rgba(0,0,0,0.25);
        }

        label {
          display: block;
          margin: 16px 0 8px;
          color: #dffaf2;
          font-weight: 800;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.13);
          background: #111821;
          color: white;
          border-radius: 14px;
          padding: 13px 14px;
          font-size: 15px;
          outline: none;
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #10a37f;
          box-shadow: 0 0 0 3px rgba(16,163,127,0.13);
        }

        .resultCard {
          display: grid;
          gap: 14px;
        }

        .outputHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .outputHead h3 {
          margin: 0;
          color: #18d6a3;
        }

        button {
          border: 0;
          border-radius: 999px;
          padding: 8px 13px;
          background: linear-gradient(135deg, #10a37f, #18d6a3);
          color: #06110e;
          font-weight: 900;
          cursor: pointer;
        }

        pre {
          white-space: pre-wrap;
          color: #d7dee8;
          line-height: 1.9;
          font-family: inherit;
          margin: 12px 0 0;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .chips span,
        .quickLinks a {
          border-radius: 999px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #dffaf2;
          text-decoration: none;
          font-size: 13px;
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .quickLinks a:hover {
          border-color: #10a37f;
          color: #10ffd0;
        }

        @media (max-width: 900px) {
          .toolWrap {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}