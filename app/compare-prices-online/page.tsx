import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "مقارنة الأسعار أونلاين | قارن أسعار المنتجات مع BPS Chat",
  description:
    "قارن أسعار المنتجات أونلاين في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat واعرف أفضل سعر بين Amazon وNoon وJumia وJarir وExtra وCarrefour.",
  keywords: [
    "مقارنة أسعار",
    "مقارنة اسعار المنتجات",
    "مقارنة الأسعار أونلاين",
    "compare prices",
    "price comparison",
    "online price comparison",
    "أفضل سعر",
    "أرخص سعر",
    "عروض أونلاين",
    "مقارنة أسعار السعودية",
    "مقارنة أسعار الإمارات",
    "مقارنة أسعار مصر",
    "سعر ايفون",
    "سعر سامسونج",
    "سعر لابتوب",
    "عروض عطور",
    "Amazon",
    "Noon",
    "Jumia",
    "Jarir",
    "Extra",
    "Carrefour",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function ComparePricesOnlinePage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة الأسعار أونلاين
          <span>قارن أسعار المنتجات واعرف أفضل سعر قبل الشراء</span>
        </h1>

        <p>
          لو بتبحث عن <strong>مقارنة أسعار</strong> أو{" "}
          <strong>compare prices online</strong> في السعودية أو الإمارات أو
          الكويت أو قطر أو البحرين أو مصر، استخدم <strong>BPS Chat</strong>{" "}
          لمقارنة أسعار المنتجات بين المتاجر في مكان واحد.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابدأ مقارنة الأسعار الآن
          </Link>
          <Link href="/best-price-online" className="secondaryBtn">
            أفضل سعر أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تحتاج إلى مقارنة الأسعار قبل الشراء؟</h2>

        <p>
          نفس المنتج قد يظهر بأسعار مختلفة بين Amazon وNoon وJumia وJarir وExtra
          وCarrefour. لذلك مقارنة الأسعار أونلاين تساعدك تعرف أفضل سعر، أرخص
          عرض، والمتجر المناسب قبل الشراء، خصوصًا في منتجات مثل iPhone وSamsung
          وLaptop والعطور والسماعات والشاشات والأجهزة المنزلية.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن بين المتاجر</h3>
            <p>
              ابحث مرة واحدة وشاهد نتائج من متاجر مختلفة بدل فتح كل متجر يدويًا.
            </p>
          </div>

          <div className="infoCard">
            <h3>اختار الدولة</h3>
            <p>
              مقارنة أسعار في السعودية، الإمارات، الكويت، قطر، البحرين ومصر.
            </p>
          </div>

          <div className="infoCard">
            <h3>اعرف أفضل عرض</h3>
            <p>
              قارن السعر، التوفر، المتجر، والشحن قبل الانتقال للشراء.
            </p>
          </div>
        </div>

        <h2>منتجات شائعة للمقارنة</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/search/airpods-sa">مقارنة أسعار AirPods</Link>
          <Link href="/search/شاشة-sa">مقارنة أسعار الشاشات</Link>
          <Link href="/search/بلايستيشن-sa">مقارنة أسعار PlayStation</Link>
          <Link href="/search/ملابس-ae">مقارنة أسعار الملابس</Link>
        </div>

        <h2>كلمات بحث قوية تخدم صفحة مقارنة الأسعار</h2>

        <p>
          هذه الصفحة تستهدف كلمات مهمة مثل: مقارنة أسعار، مقارنة اسعار المنتجات،
          مقارنة الأسعار أونلاين، price comparison، compare prices، online price
          comparison، أفضل سعر، أرخص سعر، عروض اليوم، خصومات أونلاين، مقارنة
          أسعار السعودية، مقارنة أسعار الإمارات، مقارنة أسعار مصر، عروض نون،
          عروض أمازون، عروض جوميا، عروض جرير، وعروض اكسترا.
        </p>

        <div className="quickLinks">
          <Link href="/search/مقارنة-اسعار-ايفون-sa">مقارنة أسعار ايفون</Link>
          <Link href="/search/مقارنة-اسعار-سامسونج-sa">مقارنة أسعار سامسونج</Link>
          <Link href="/search/مقارنة-اسعار-لابتوب-ae">مقارنة أسعار لابتوب</Link>
          <Link href="/search/مقارنة-اسعار-عطور-sa">مقارنة أسعار عطور</Link>
          <Link href="/search/افضل-سعر-sa">أفضل سعر في السعودية</Link>
          <Link href="/search/ارخص-سعر-eg">أرخص سعر في مصر</Link>
        </div>

        <h2>مقارنة الأسعار حسب الدولة</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>أمثلة بحث قوية</th>
                <th>متاجر قد تظهر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>السعودية</td>
                <td>مقارنة أسعار ايفون، سامسونج، لابتوب، عروض نون</td>
                <td>Amazon.sa، Noon، Jarir، Extra، Carrefour</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>compare prices UAE، عروض Amazon، أفضل سعر لابتوب</td>
                <td>Amazon.ae، Noon، Carrefour، Sharaf DG</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>مقارنة أسعار مصر، عروض جوميا، سعر موبايل، سعر لابتوب</td>
                <td>Jumia، Amazon.eg، Noon Egypt، متاجر محلية</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>مقارنة أسعار الكويت، عروض إلكترونيات، أفضل سعر</td>
                <td>Xcite، Lulu، متاجر محلية</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>price comparison Qatar، عروض أونلاين قطر</td>
                <td>Carrefour، Lulu، متاجر قطرية</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>مقارنة أسعار البحرين، عروض اليوم، أفضل سعر</td>
                <td>متاجر البحرين الإلكترونية والمتاجر الكبرى</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>الفرق بين البحث العادي ومقارنة الأسعار</h2>

        <p>
          البحث العادي يجعلك تفتح أكثر من موقع بنفسك وتجمع الأسعار يدويًا. أما
          مقارنة الأسعار من خلال BPS Chat فتساعدك على كتابة اسم المنتج مرة واحدة
          ثم مشاهدة نتائج متعددة حسب الدولة، وهذا يجعل تجربة الشراء أسرع وأسهل
          وأكثر فائدة.
        </p>

        <h2>نصائح قبل شراء أي منتج أونلاين</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الشراء.</li>
          <li>راجع السعر النهائي بعد الشحن والضريبة إن وجدت.</li>
          <li>تأكد من التوفر ومدة التوصيل.</li>
          <li>راجع تقييمات المتجر والمنتج.</li>
          <li>لا تعتمد على أول نتيجة، فقد تجد عرضًا أفضل في متجر آخر.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
          <Link href="/bps-vs-jumia">BPS vs Jumia</Link>
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة الأسعار الآن</h2>
          <p>
            اكتب اسم المنتج، اختر الدولة، وقارن الأسعار أونلاين قبل الشراء.
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