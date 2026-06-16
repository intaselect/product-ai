import Link from "next/link";

export const metadata = {
  title: "سياسة الاستبدال والاسترجاع | BPS Chat",
  description: "سياسة الاستبدال والاسترجاع في BPS Chat باعتباره منصة مقارنة أسعار وليس بائعاً مباشراً.",
};

export default function RefundPolicyPage() {
  return (
    <main style={styles.page} dir="rtl">
      <section style={styles.card}>
        <h1 style={styles.title}>سياسة الاستبدال والاسترجاع</h1>

        <p>
          BPS Chat لا يبيع المنتجات مباشرة ولا يستلم المدفوعات ولا يدير عمليات
          الشحن أو الاسترجاع بنفسه.
        </p>

        <h2>من المسؤول عن الاستبدال والاسترجاع؟</h2>
        <p>
          جميع طلبات الاستبدال أو الاسترجاع تتم من خلال المتجر أو البائع الذي
          تم الشراء منه مباشرة.
        </p>

        <h2>قبل إتمام الشراء</h2>
        <p>
          ننصح المستخدم بمراجعة سياسة الاسترجاع والاستبدال الخاصة بالمتجر أو
          البائع قبل إتمام عملية الشراء.
        </p>

        <h2>اختلاف السياسات</h2>
        <p>
          قد تختلف مدة الاسترجاع، شروط الاستبدال، وطريقة رد المبلغ حسب الدولة
          والمتجر ونوع المنتج.
        </p>

        <h2>دور BPS Chat</h2>
        <p>
          دور BPS Chat هو مساعدة المستخدم في اكتشاف المنتجات ومقارنة الأسعار
          والعروض، وليس تنفيذ عمليات البيع أو الاسترجاع.
        </p>

        <h2>التواصل</h2>
        <p>
          لو كان لديك استفسار عام يمكنك التواصل معنا عبر support@bpschat.com
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