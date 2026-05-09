export default function AboutPage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.badge}>BPS Chat</div>

        <h1 style={styles.title}>
          عن BPS Chat — محرك بحث ذكي لمقارنة أسعار المنتجات
        </h1>

        <p style={styles.subtitle}>
          BPS Chat يساعد المستخدمين في البحث عن المنتجات ومقارنة الأسعار حسب الدولة،
          مع صفحات مخصصة للعروض والمنتجات في السعودية والإمارات ومصر والكويت وقطر والبحرين.
        </p>

        <a href="/" style={styles.mainButton}>
          ابدأ البحث الآن
        </a>
      </section>

      <section style={styles.grid}>
        <div style={styles.card}>
          <h2>ماذا نقدم؟</h2>
          <p>
            نوفر تجربة بحث سهلة وسريعة لمساعدة المستخدم على الوصول إلى المنتجات
            والأسعار والصور والروابط من متاجر مختلفة في مكان واحد.
          </p>
        </div>

        <div style={styles.card}>
          <h2>لماذا BPS Chat؟</h2>
          <p>
            لأن المستخدم لا يريد إضاعة الوقت بين عشرات المواقع. هدفنا هو تبسيط
            رحلة البحث والشراء وتقديم نتائج منظمة حسب الدولة والسعر والمتجر.
          </p>
        </div>

        <div style={styles.card}>
          <h2>الدول المدعومة</h2>
          <p>
            نعمل على دعم البحث في السعودية، الإمارات، مصر، الكويت، قطر، والبحرين،
            مع تطوير مستمر لتحسين جودة النتائج.
          </p>
        </div>

        <div style={styles.card}>
          <h2>صفحات SEO للمنتجات</h2>
          <p>
            نقوم بإنشاء صفحات مخصصة لعمليات البحث الشائعة، مثل سعر آيفون في السعودية
            أو أفضل عروض اللابتوبات في الإمارات، لمساعدة المستخدمين في الوصول السريع
            للمعلومات.
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <h2>رؤيتنا</h2>
        <p>
          نطمح أن يكون BPS Chat واحدًا من أفضل مواقع البحث عن المنتجات ومقارنة الأسعار
          في الشرق الأوسط، مع تجربة استخدام بسيطة تشبه المحادثة وتناسب المستخدم العربي.
        </p>
      </section>

      <section style={styles.section}>
        <h2>للمعلنين والمتاجر</h2>
        <p>
          إذا كنت تملك متجرًا أو منتجًا وتريد الوصول إلى عملاء يبحثون بالفعل عن الشراء،
          يمكنك الإعلان داخل BPS Chat من خلال مواضع مميزة مثل سلايدر الإعلانات وصفحات المنتجات.
        </p>

        <a href="/advertise" style={styles.secondaryButton}>
          أعلن معنا
        </a>
      </section>

      <section style={styles.section}>
        <h2>كلمات بحث مرتبطة</h2>
        <p style={styles.tags}>
          مقارنة أسعار المنتجات - أفضل سعر في السعودية - عروض الإمارات - أسعار الموبايلات -
          أسعار اللابتوبات - بحث منتجات بالذكاء الاصطناعي - product search - price comparison -
          shopping search engine - BPS Chat
        </p>
      </section>

      <a href="/" style={styles.homeLink}>
        الرجوع للرئيسية
      </a>
    </main>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#212121",
    color: "#fff",
    padding: "50px 16px",
    direction: "rtl",
  },
  hero: {
    maxWidth: "900px",
    margin: "0 auto 35px",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "#2f2f2f",
    color: "#10a37f",
    padding: "8px 16px",
    borderRadius: "999px",
    marginBottom: "18px",
    border: "1px solid #3a3a3a",
  },
  title: {
    fontSize: "34px",
    lineHeight: "1.5",
    marginBottom: "14px",
  },
  subtitle: {
    color: "#ccc",
    lineHeight: "2",
    maxWidth: "760px",
    margin: "0 auto 24px",
  },
  mainButton: {
    display: "inline-block",
    background: "#10a37f",
    color: "#fff",
    padding: "13px 24px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  grid: {
    maxWidth: "1000px",
    margin: "0 auto 30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#2b2b2b",
    border: "1px solid #444",
    borderRadius: "18px",
    padding: "20px",
    lineHeight: "1.8",
  },
  section: {
    maxWidth: "900px",
    margin: "0 auto 22px",
    background: "#2b2b2b",
    border: "1px solid #444",
    borderRadius: "18px",
    padding: "22px",
    lineHeight: "2",
  },
  secondaryButton: {
    display: "inline-block",
    marginTop: "12px",
    background: "#10a37f",
    color: "#fff",
    padding: "11px 20px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  tags: {
    color: "#ccc",
  },
  homeLink: {
    display: "block",
    textAlign: "center",
    marginTop: "28px",
    color: "#10a37f",
    textDecoration: "none",
    fontWeight: "bold",
  },
};