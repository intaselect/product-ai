import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" dir="rtl">
      <div className="footerInner">
        <div>
          <h3>BPS Chat</h3>
          <p>محرك بحث ومقارنة أسعار المنتجات في السعودية والخليج ومصر</p>
        </div>

        <div className="footerLinks">
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
          <Link href="/is-bps-chat-safe">هل BPS Chat موثوق؟</Link>
          <Link href="/is-bps-chat-free">هل BPS Chat مجاني؟</Link>
          <Link href="/how-bps-chat-works">كيف يعمل؟</Link>
          <Link href="/bps-vs-google">BPS vs Google</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link> 
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
<Link href="/bps-vs-jumia">BPS vs Jumia</Link> 
        <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
        <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
        <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
        <Link href="/cheapest-products">أرخص المنتجات</Link>
        <Link href="/best-price-online">أفضل سعر أونلاين</Link>
        <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
        <Link href="/saudi-product-price-comparison">مقارنة أسعار السعودية</Link>
        <Link href="/uae-product-price-comparison">مقارنة أسعار الإمارات</Link>
        <Link href="/qatar-product-price-comparison">مقارنة أسعار قطر</Link>
        
        </div>
      </div>

      <style>{`
        .footer {
          width: 100%;
          background: #111;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 18px 16px;
          margin-top: 0;
          color: white;
        }

        .footerInner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer h3 {
          margin: 0 0 4px;
          font-size: 18px;
          color: #10a37f;
        }

        .footer p {
          margin: 0;
          color: #aaa;
          font-size: 14px;
          line-height: 1.7;
        }

        .footerLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .footerLinks a {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 7px 10px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 13px;
          white-space: nowrap;
        }

        .footerLinks a:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        @media (max-width: 700px) {
          .footer {
            padding: 16px 12px;
          }

          .footerInner {
            justify-content: center;
            text-align: center;
          }

          .footerLinks {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}