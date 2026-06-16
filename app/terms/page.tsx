import Link from "next/link";

export const metadata = {
  title: "الشروط والأحكام | BPS Chat",
  description: "شروط استخدام منصة BPS Chat للبحث عن المنتجات ومقارنة الأسعار والعروض.",
};

export default function TermsPage() {
  return (
    <main style={styles.page} dir="rtl">
      <section style={styles.card}>
        <h1 style={styles.title}>الشروط والأحكام</h1>

        <p>
          BPS Chat منصة للبحث عن المنتجات ومقارنة الأسعار واكتشاف العروض من
          متاجر وبائعين مختلفين.
        </p>

        <h2>طبيعة الخدمة</h2>
        <p>
          لا يقوم BPS Chat ببيع المنتجات أو تحصيل المدفوعات أو شحن الطلبات
          مباشرة. تتم عمليات الشراء من خلال المتجر أو البائع المسؤول عن المنتج.
        </p>

        <h2>الأسعار والعروض</h2>
        <p>
          نحاول عرض معلومات دقيقة ومحدثة، لكن قد تتغير الأسعار أو التوفر أو
          تفاصيل المنتج في أي وقت لدى المتجر أو البائع.
        </p>

        <h2>الروابط الخارجية</h2>
        <p>
          قد يحتوي الموقع على روابط لمتاجر خارجية مثل أمازون أو نون أو متاجر
          وبائعين آخرين. عند الانتقال لهذه المواقع، تخضع عملية الشراء لسياساتهم.
        </p>

        <h2>مسؤولية المستخدم</h2>
        <p>
          يجب على المستخدم مراجعة السعر النهائي، تفاصيل المنتج، الشحن، وسياسة
          الاسترجاع داخل موقع المتجر قبل إتمام الشراء.
        </p>

        <h2>التواصل</h2>
        <p>
          لأي استفسار يمكنك التواصل معنا عبر صفحة التواصل أو البريد:
          support@bpschat.com
        </p>

        <Link href="/" style={styles.button}>الرجوع للرئيسية</Link>
      </section>
    </main>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#0b0f14",
    color: "#fff",
    padding: "60px 16px",
  },
  card: {
    maxWidth: "900px",
    margin: "auto",
    background: "rgba(31,41,55,.9)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "22px",
    padding: "28px",
    lineHeight: "2",
  },
  title: {
    fontSize: "32px",
    marginBottom: "18px",
    color: "#10a37f",
  },
  button: {
    display: "inline-block",
    marginTop: "24px",
    background: "#10a37f",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};