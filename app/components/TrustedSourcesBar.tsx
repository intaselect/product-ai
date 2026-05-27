export default function TrustedSourcesBar() {
 const sources = [
  "Amazon Saudi",
  "Noon Saudi",
  "Jarir",
  "Extra",
  "SACO",
  "Namshi",
  "Amazon UAE",
  "Noon UAE",
  "Sharaf DG",
  "Carrefour UAE",
  "DubaiStore",
  "Lulu Hypermarket",
  "Best Al-Yousifi Kuwait",
  "Blink Kuwait",
  "Xcite Kuwait",
  "Eureka Kuwait",
  "Noon Kuwait",
  "Jumia Egypt",
  "Amazon Egypt",
  "Noon Egypt",
  "B.TECH",
  "2B Egypt",
  "Raya Shop",
  "Carrefour Egypt",
  "AliExpress",
  "Temu",
  "Alibaba",
  "Google Shopping",
  "ChatGPT AI",
  "BPS Market",
];
  return (
    <section className="trustedSourcesBar">
      <div className="trustedText">
        <strong>مصادر تسوق موثوقة</strong>
        <span>Trusted Shopping Sources</span>
      </div>

      <div className="trustedTrack">
        {[...sources, ...sources].map((name, i) => (
          <span key={i} className="trustedLogo">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}