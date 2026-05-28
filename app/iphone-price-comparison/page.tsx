import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "مقارنة أسعار iPhone | أفضل سعر ايفون في السعودية والخليج ومصر",
  description:
    "قارن أسعار ايفون iPhone في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat وشاهد عروض iPhone 15 و iPhone 14 و iPhone 13 و iPhone 16.",
  keywords: [
    "سعر ايفون",
    "سعر iPhone",
    "مقارنة أسعار ايفون",
    "أفضل سعر ايفون",
    "عروض ايفون",
    "ايفون تقسيط",
    "iPhone price comparison",
    "iPhone offers",
    "iPhone deals",
    "سعر ايفون 15",
    "سعر ايفون 15 برو max",
    "سعر ايفون 16",
    "سعر ايفون 16 برو max",
    "سعر ايفون 14",
    "سعر ايفون 13",
    "سعر ايفون في السعودية",
    "سعر ايفون في الإمارات",
    "سعر ايفون في مصر",
    "سعر ايفون في الكويت",
    "سعر ايفون في قطر",
    "سعر ايفون في البحرين",
    "BPS Chat",
    "بي بي اس شات",
    "Amazon",
    "Noon",
    "Jarir",
    "Extra",
    "Jumia",
    "Carrefour",
  ],
};

export default function IphonePriceComparisonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار iPhone
          <span>اعرف أفضل سعر ايفون في السعودية والخليج ومصر قبل الشراء</span>
        </h1>

        <p>
          لو بتبحث عن <strong>سعر ايفون</strong> أو <strong>عروض iPhone</strong>{" "}
          في السعودية أو الإمارات أو الكويت أو قطر أو البحرين أو مصر، يمكنك استخدام{" "}
          <strong>BPS Chat</strong> لمقارنة الأسعار بين المتاجر بدل فتح كل متجر
          لوحده.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن سعر ايفون الآن
          </Link>
          <Link href="/bps-chat" className="secondaryBtn">
            ما هو BPS Chat؟
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تبحث عن سعر ايفون من خلال BPS Chat؟</h2>

        <p>
          أسعار الايفون تختلف من متجر لمتجر ومن دولة لدولة. ممكن تلاقي سعر iPhone
          في Amazon مختلف عن Noon أو Jarir أو Extra أو Jumia أو Carrefour. لذلك
          المقارنة قبل الشراء مهمة جدًا، خصوصًا مع موديلات مثل iPhone 16 Pro Max،
          iPhone 15 Pro Max، iPhone 15، iPhone 14، iPhone 13 و iPhone SE.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن بين المتاجر</h3>
            <p>
              شاهد عروض ايفون من متاجر مختلفة مثل Amazon، Noon، Jarir، Extra،
              Jumia، Carrefour حسب الدولة والمنتج.
            </p>
          </div>

          <div className="infoCard">
            <h3>اختار الدولة</h3>
            <p>
              ابحث عن سعر ايفون في السعودية، الإمارات، الكويت، قطر، البحرين أو
              مصر وشاهد النتائج المناسبة لكل سوق.
            </p>
          </div>

          <div className="infoCard">
            <h3>وفّر وقت البحث</h3>
            <p>
              بدل ما تفتح أكثر من موقع يدويًا، اكتب اسم الايفون مرة واحدة وقارن
              الأسعار والعروض بسرعة.
            </p>
          </div>
        </div>

        <h2>موديلات ايفون التي يبحث عنها الناس</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-16-pro-max-sa">سعر ايفون 16 Pro Max في السعودية</Link>
          <Link href="/search/ايفون-16-sa">سعر ايفون 16</Link>
          <Link href="/search/ايفون-15-pro-max-sa">سعر ايفون 15 Pro Max</Link>
          <Link href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</Link>
          <Link href="/search/ايفون-14-ae">سعر ايفون 14 في الإمارات</Link>
          <Link href="/search/ايفون-13-eg">سعر ايفون 13 في مصر</Link>
          <Link href="/search/iphone-se-sa">سعر iPhone SE</Link>
        </div>

        <h2>كلمات بحث قوية عن عروض الايفون</h2>

        <p>
          كثير من المستخدمين يبحثون عن: عروض ايفون، أرخص سعر ايفون، سعر ايفون
          اليوم، ايفون تقسيط، iPhone deals، iPhone offers، سعر ايفون في نون،
          سعر ايفون في امازون، عروض جرير ايفون، عروض اكسترا ايفون، أفضل سعر
          iPhone في السعودية، وأرخص iPhone في مصر.
        </p>

        <div className="quickLinks">
          <Link href="/search/عروض-ايفون-sa">عروض ايفون في السعودية</Link>
          <Link href="/search/ايفون-تقسيط-sa">ايفون تقسيط</Link>
          <Link href="/search/ارخص-ايفون-ae">أرخص ايفون في الإمارات</Link>
          <Link href="/search/عروض-ايفون-نون-sa">عروض ايفون نون</Link>
          <Link href="/search/عروض-ايفون-امازون-sa">عروض ايفون أمازون</Link>
          <Link href="/search/عروض-جرير-ايفون-sa">عروض جرير ايفون</Link>
        </div>

        <h2>مقارنة أسعار ايفون حسب الدولة</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>أمثلة بحث</th>
                <th>متاجر قد تظهر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>السعودية</td>
                <td>سعر ايفون 15، ايفون 16 برو max، عروض ايفون</td>
                <td>Amazon.sa، Noon، Jarir، Extra، Carrefour</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>iPhone price UAE، ايفون 14، AirPods مع ايفون</td>
                <td>Amazon.ae، Noon، Sharaf DG، Carrefour</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>سعر ايفون في مصر، ايفون 13، ايفون تقسيط</td>
                <td>Amazon.eg، Jumia، Noon Egypt، متاجر محلية</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>سعر ايفون في الكويت، iPhone deals Kuwait</td>
                <td>Xcite، Lulu، متاجر إلكترونية محلية</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>سعر ايفون في قطر، عروض iPhone Qatar</td>
                <td>Lulu، Carrefour، متاجر قطرية</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>سعر ايفون في البحرين، iPhone offers Bahrain</td>
                <td>متاجر البحرين الإلكترونية والمتاجر الكبرى</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>هل BPS Chat يبيع الايفون مباشرة؟</h2>

        <p>
          لا. BPS Chat ليس متجرًا، لكنه يساعدك على البحث والمقارنة. بعد ما تجد
          نتيجة مناسبة، يمكنك الانتقال إلى المتجر الأصلي لمراجعة السعر النهائي،
          الشحن، التوفر، الضمان، اللون، المساحة، والتقييمات قبل الشراء.
        </p>

        <h2>نصائح قبل شراء iPhone</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الشراء.</li>
          <li>راجع مساحة التخزين: 128GB أو 256GB أو 512GB أو 1TB.</li>
          <li>تأكد من الضمان وبلد النسخة.</li>
          <li>راجع تكلفة الشحن ومدة التوصيل.</li>
          <li>قارن بين iPhone جديد و iPhone مستعمل أو مجدد إذا كان مناسبًا لك.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
          <Link href="/bps-vs-google">BPS vs Google</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
          <Link href="/bps-vs-jumia">BPS vs Jumia</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار الايفون الآن</h2>
          <p>
            اكتب موديل الايفون الذي تبحث عنه واختر الدولة، وشاهد النتائج بدل
            الاعتماد على متجر واحد فقط.
          </p>

          <Link href="/" className="primaryBtn">
            ابحث في BPS Chat
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

        .hero {
          max-width: 980px;
          margin: 0 auto;
          padding: 54px 18px 30px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          background: rgba(16, 163, 127, 0.14);
          border: 1px solid rgba(16, 163, 127, 0.35);
          color: #7fffe0;
          padding: 8px 16px;
          border-radius: 999px;
          margin-bottom: 18px;
          font-weight: 700;
        }

        h1 {
          font-size: 42px;
          line-height: 1.35;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: 24px;
          color: #cfcfcf;
          margin-top: 8px;
        }

        .hero p {
          max-width: 800px;
          margin: 0 auto;
          color: #e8e8e8;
          font-size: 18px;
          line-height: 2;
        }

        .ctaBox {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .primaryBtn,
        .secondaryBtn {
          display: inline-block;
          padding: 12px 18px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 800;
        }

        .primaryBtn {
          background: #10a37f;
          color: #fff;
        }

        .secondaryBtn {
          background: #2f2f2f;
          color: #fff;
          border: 1px solid #444;
        }

        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 25px 18px 50px;
          line-height: 2;
        }

        h2 {
          margin-top: 38px;
          font-size: 26px;
          color: #10a37f;
        }

        h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        p,
        li {
          font-size: 17px;
          color: #e8e8e8;
        }

        ul {
          padding-right: 22px;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .infoCard {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .quickLinks a {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
        }

        .quickLinks a:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        .tableWrap {
          overflow-x: auto;
          margin-top: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        table {
          width: 100%;
          min-width: 760px;
          border-collapse: collapse;
          background: rgba(40,40,40,0.55);
        }

        th,
        td {
          padding: 15px;
          text-align: right;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #e8e8e8;
        }

        th {
          color: #7fffe0;
          background: rgba(16, 163, 127, 0.1);
        }

        .finalCta {
          margin-top: 38px;
          text-align: center;
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 0 30px rgba(16,163,127,0.12);
        }

        .finalCta p {
          max-width: 720px;
          margin: 0 auto 22px;
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }
        }
      `}</style>
    </main>
  );
}