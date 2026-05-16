import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "BPS Chat vs Amazon | مقارنة بي بي اس شات مع أمازون",
  description:
    "مقارنة بين BPS Chat و Amazon لمعرفة أفضل طريقة للبحث عن المنتجات ومقارنة الأسعار في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
  keywords: [
    "BPS Chat vs Amazon",
    "بي بي اس شات ضد أمازون",
    "مقارنة أسعار أمازون",
    "بديل أمازون",
    "بحث منتجات",
    "مقارنة أسعار",
    "أفضل سعر",
    "أرخص سعر",
    "عروض السعودية",
    "عروض الإمارات",
    "عروض مصر",
    "Amazon",
    "Noon",
    "Jumia",
    "Jarir",
    "Extra",
    "Carrefour",
  ],
};

export default function BpsVsAmazonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          BPS Chat vs Amazon
          <span>هل تبحث في متجر واحد أم تقارن الأسعار بين أكثر من متجر؟</span>
        </h1>

        <p>
          أمازون متجر إلكتروني قوي ومشهور، لكن{" "}
          <strong>BPS Chat (بي بي اس شات)</strong> يساعدك على البحث عن المنتج
          ومقارنة الأسعار بين أكثر من متجر ودولة بدل الاعتماد على نتيجة واحدة فقط.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            جرّب البحث الآن
          </Link>
          <Link href="/bps-chat" className="secondaryBtn">
            ما هو BPS Chat؟
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>ما الفرق بين BPS Chat و Amazon؟</h2>

        <div className="compareGrid">
          <div className="compareCard old">
            <h3>البحث داخل Amazon</h3>
            <ul>
              <li>يعرض لك منتجات موجودة داخل أمازون فقط.</li>
              <li>مناسب لو أنت قررت الشراء من Amazon تحديدًا.</li>
              <li>قد لا يوضح لك هل السعر هو الأرخص في السوق أم لا.</li>
              <li>تحتاج تفتح متاجر أخرى بنفسك للمقارنة.</li>
            </ul>
          </div>

          <div className="compareCard new">
            <h3>البحث في BPS Chat</h3>
            <ul>
              <li>تكتب اسم المنتج مرة واحدة.</li>
              <li>تختار الدولة المناسبة لك.</li>
              <li>تشاهد نتائج وأسعار من متاجر مختلفة في مكان واحد.</li>
              <li>تقدر تقارن قبل ما تشتري وتختار العرض الأنسب.</li>
            </ul>
          </div>
        </div>

        <h2>لماذا BPS Chat مفيد قبل الشراء من Amazon؟</h2>

        <p>
          عندما تبحث عن منتج مثل ايفون، سامسونج، لابتوب، سماعات، شاشة، عطر،
          ميكب، شاحن أو جهاز منزلي، قد تجد المنتج على Amazon بسعر معين، لكن نفس
          المنتج قد يكون موجودًا في متجر آخر بسعر أقل أو عرض أفضل. لذلك يساعدك
          BPS Chat على رؤية الصورة الأكبر قبل اتخاذ قرار الشراء.
        </p>

        <p>
          بدل ما تبحث يدويًا في Amazon و Noon و Jumia و Jarir و Extra و Carrefour
          ومتاجر أخرى، يمكنك استخدام بي بي اس شات كمحرك بحث منتجات عربي لمقارنة
          الأسعار حسب الدولة.
        </p>

        <h2>مقارنة سريعة بين BPS Chat و Amazon</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>نقطة المقارنة</th>
                <th>BPS Chat</th>
                <th>Amazon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>نوع الخدمة</td>
                <td>محرك بحث ومقارنة أسعار</td>
                <td>متجر إلكتروني</td>
              </tr>
              <tr>
                <td>طريقة الاستخدام</td>
                <td>تبحث وتقارن بين أكثر من مصدر</td>
                <td>تبحث داخل أمازون فقط</td>
              </tr>
              <tr>
                <td>أفضل استخدام</td>
                <td>معرفة أفضل سعر قبل الشراء</td>
                <td>شراء مباشر من Amazon</td>
              </tr>
              <tr>
                <td>الدول</td>
                <td>السعودية، الإمارات، الكويت، قطر، البحرين، مصر</td>
                <td>حسب موقع Amazon المحلي</td>
              </tr>
              <tr>
                <td>المتاجر</td>
                <td>قد يعرض نتائج من متاجر مختلفة</td>
                <td>Amazon فقط</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>متى تستخدم BPS Chat بدل Amazon؟</h2>

        <p>
          استخدم BPS Chat عندما تريد معرفة أفضل سعر للمنتج قبل الشراء، أو عندما
          تريد مقارنة عروض المتاجر في السعودية أو الإمارات أو مصر أو الخليج. أما
          إذا كنت تريد الشراء من Amazon فقط بدون مقارنة، فيمكنك استخدام Amazon
          مباشرة.
        </p>

        <h2>هل BPS Chat بديل Amazon؟</h2>

        <p>
          BPS Chat ليس متجرًا بديلًا لأمازون، لكنه أداة تساعدك على البحث والمقارنة.
          يعني يمكنك استخدام BPS Chat أولًا لمعرفة السعر والمتجر المناسب، وبعدها
          تنتقل إلى المتجر الأصلي لإتمام الشراء أو مراجعة تفاصيل المنتج.
        </p>

        <h2>أمثلة بحث قوية يمكنك تجربتها</h2>

        <div className="quickLinks">
          <Link href="/search/ايفون-15-sa">سعر ايفون 15 في السعودية</Link>
          <Link href="/search/samsung-sa">أسعار سامسونج في السعودية</Link>
          <Link href="/search/لابتوب-ae">عروض لابتوب في الإمارات</Link>
          <Link href="/search/airpods-sa">سعر AirPods في السعودية</Link>
          <Link href="/search/عطور-ae">عروض عطور في الإمارات</Link>
          <Link href="/search/موبايل-eg">أسعار الموبايلات في مصر</Link>
        </div>

        <h2>الدول التي يدعمها BPS Chat</h2>

        <div className="countries">
          <span>السعودية</span>
          <span>الإمارات</span>
          <span>الكويت</span>
          <span>قطر</span>
          <span>البحرين</span>
          <span>مصر</span>
        </div>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
          <Link href="/is-bps-chat-safe">هل BPS Chat آمن؟</Link>
          <Link href="/is-bps-chat-free">هل BPS Chat مجاني؟</Link>
          <Link href="/how-bps-chat-works">كيف يعمل BPS Chat؟</Link>
          <Link href="/bps-vs-google">BPS Chat vs Google</Link>
        </div>

        <h2>أسئلة شائعة</h2>

        <div className="faq">
          <div>
            <h3>هل BPS Chat يبيع المنتجات مباشرة؟</h3>
            <p>
              لا، BPS Chat يساعدك على البحث والمقارنة فقط، ثم يمكنك الانتقال إلى
              المتجر الأصلي لمراجعة السعر والشراء.
            </p>
          </div>

          <div>
            <h3>هل BPS Chat أفضل من Amazon؟</h3>
            <p>
              يعتمد على هدفك. لو تريد الشراء من Amazon فقط فاستخدم Amazon. أما لو
              تريد مقارنة الأسعار بين أكثر من متجر، فـ BPS Chat أفضل كبداية.
            </p>
          </div>

          <div>
            <h3>هل يمكن البحث عن منتجات Amazon داخل BPS Chat؟</h3>
            <p>
              حسب الدولة والمنتج، قد تظهر نتائج مرتبطة بمتاجر مختلفة، وقد تكون
              Amazon ضمن النتائج عندما تكون متاحة ومناسبة للبحث.
            </p>
          </div>
        </div>

        <div className="finalCta">
          <h2>جرّب BPS Chat قبل الشراء</h2>
          <p>
            اكتب اسم المنتج الذي تبحث عنه، واختر الدولة، وشاهد النتائج المتاحة
            بدل الاعتماد على متجر واحد فقط.
          </p>

          <Link href="/" className="primaryBtn">
            ابدأ البحث في BPS Chat
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
          max-width: 760px;
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

        .compareGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .compareCard {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          backdrop-filter: blur(8px);
        }

        .compareCard.old {
          border-color: rgba(255, 120, 120, 0.25);
        }

        .compareCard.new {
          border-color: rgba(16, 163, 127, 0.45);
          box-shadow: 0 0 25px rgba(16,163,127,0.12);
        }

        .tableWrap {
          overflow-x: auto;
          margin-top: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        table {
          width: 100%;
          min-width: 720px;
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

        .countries,
        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .countries span,
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

        .faq {
          display: grid;
          gap: 16px;
          margin-top: 16px;
        }

        .faq div,
        .finalCta {
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 18px;
        }

        .finalCta {
          margin-top: 38px;
          text-align: center;
          box-shadow: 0 0 30px rgba(16,163,127,0.12);
        }

        .finalCta p {
          max-width: 720px;
          margin: 0 auto 22px;
        }

        @media (max-width: 700px) {
          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }

          .compareGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}