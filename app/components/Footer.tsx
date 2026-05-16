import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerBrand">
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
        </div>
      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} BPS Chat - جميع الحقوق محفوظة
      </div>

      <style>{`
  .footer {
    margin-top: 60px;
    background: rgba(15,15,15,0.9);
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 40px 20px 20px;

    position: sticky;
    bottom: 0;
  }

        .footerContainer {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          gap: 30px;
          flex-wrap: wrap;
        }

        .footerBrand h3 {
          margin-bottom: 10px;
        }

        .footerBrand p {
          color: #aaa;
          max-width: 300px;
          line-height: 1.8;
        }

        .footerLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footerLinks a {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 8px 12px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
        }

        .footerLinks a:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        .footerBottom {
          text-align: center;
          margin-top: 30px;
          color: #777;
          font-size: 14px;
        }
      `}</style>
    </footer>
  );
}