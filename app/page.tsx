"use client";
import { useEffect, useRef, useState } from "react";
import { saveSearch } from "@/lib/saveSearch";
import { supabase } from "@/lib/supabase";
import PopularSearches from "@/app/components/PopularSearches";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("sa");
  const [menuOpen, setMenuOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
useEffect(() => {
  const slider = sliderRef.current;
  if (!slider) return;

  let direction = 1;
  let isPaused = false;

  const handleMouseEnter = () => {
    isPaused = true;
  };

  const handleMouseLeave = () => {
    isPaused = false;
  };

  slider.addEventListener("mouseenter", handleMouseEnter);
  slider.addEventListener("mouseleave", handleMouseLeave);

  const interval = setInterval(() => {
    if (isPaused) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScrollLeft - 2) {
      direction = -1;
    }

    if (slider.scrollLeft <= 2) {
      direction = 1;
    }

    slider.scrollLeft += 0.5 * direction;
  }, 50);

  return () => {
    clearInterval(interval);
    slider.removeEventListener("mouseenter", handleMouseEnter);
    slider.removeEventListener("mouseleave", handleMouseLeave);
  };
}, []);
useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data?.user || null);
  });

  const { data: listener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setUser(session?.user || null);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);
  // 🔥 Ads حسب الدولة
  const adsByCountry: any = {
    sa: [
         {
         title: "  ابل - ايفون 16 برو ماكس، 5 جي،6.9 بوصة، بسعة 256 جيجا، الوان متعددة ",
          price: "4999 ريال",
        image: "https://cdn.salla.sa/XnEj/ec192eee-4b7c-450e-bb33-59760386b80b-1000x1000-2hFDNYNVi8WffASJvRTIOzmEb9AnZNRiTYHsOEUr.jpg",
        url: "https://iblackstores.com/EXlWDyR",
      },
      {
         title: "خصم السعودية على الإلكترونيات",
          price: "199 ريال",
        image: "https://cdn.salla.sa/GpOOa/0ca44fd0-a8b3-495b-94da-d0729acca047-1000x750-oQfz8hc466b562etmzyz1w7g2Dco3FjqK2hrAcXC.png",
        url: "https://store-3.com/qGpOyXN",
      },
      {
        title: "هاتف M-HORSE M17 Pro Max بشريحة NFC",
         price: "640 ريال",
        image: "https://f.nooncdn.com/p/pzsku/Z8624F7B143240BB93FE8Z/45/_/1776758597/0344f741-c522-4be7-a941-e224e31da88d.jpg?width=800",
        url: "https://www.noon.com/saudi-ar/m-horse-m17-pro-max-smartphone-with-nfc-6-6-hd-display-12gb-ram-256gb-storage-5000mah-battery-4g-lte-orange/Z8624F7B143240BB93FE8Z/p/?o=ec9dffd89856be8e&shareId=179b3563-6d3c-431c-b36a-8a6cb1575c5a",
      },
      {
        title: "  ايمالا بني فاتح ",
         price: "65 ريال",
        image: "https://f.nooncdn.com/p/pzsku/Z790903813A6E938BD103Z/45/_/1774181456/fa477ac5-a671-4c72-b790-17db19878dc6.jpg?width=800",
        url: "https://www.noon.com/saudi-ar/aymala-lenses-milk-tea/Z790903813A6E938BD103Z/p/?o=bbfa478ebae78e7a&shareId=cd8114c0-34d4-407d-9537-ccf927cdeb15",
      },
      {
        title: " بروتين مصل الحليب بنسبة 100% من Gold Standard   ",
         price: "390 ريال",
        image: "https://f.nooncdn.com/p/pzsku/ZFBF8D70FD73EB9D7E4D0Z/45/_/1772091006/411bfd34-493e-49b6-803c-09eff6e75bd6.jpg?width=800",
        url: "https://www.noon.com/saudi-ar/on-100-wgs-gf-french-van-creme-5lb/N53418656A/p/?o=ac6859087cfa841a&shareId=7e532f52-14c6-4a2b-999a-9af49f0a379c",
      },
      {
        title: "   باور بانك من إينيو 10000 مللي امبير بشحن 3 ساعات",
         price: "79 ريال",
        image: "https://m.media-amazon.com/images/I/71z6XmCKqZL._AC_SX679_.jpg",
        url: "https://www.amazon.sa/%D8%A5%D9%8A%D9%86%D9%8A%D9%88-10000-%D8%AA%D8%A7%D9%8A%D8%A8-C-%D9%84%D9%84%D9%87%D9%88%D8%A7%D8%AA%D9%81-%D8%A7%D9%84%D8%AA%D8%A7%D8%A8%D9%84%D8%AA/dp/B08VD632WJ/ref=sr_1_5?dib=eyJ2IjoiMSJ9.GxmG0Lmdi9Wv3f3N9RcEJXyNm_qhs-zY6pktVC4nMgJc9uzzX14Yz_YOlTDocfa84V_z4QcifkplHCgkC8GF18cPT2gDmPpRZ9Kq_VceBPmxtloffa-WmDosxYBWr899W9oDIAM-VDFE_tjrU6BuQCNpvca4_rG7eD9iDKZRuO4JYLDYki2YYTtpfayIHj_mh27Vvzx5tnBBRf5G0W3MRdYfmY0RoTMgaZBgSTy0QjPcSLvbsQg4anXLHTXNJZCb25xmQSwg2t2PBNiX1B-OG8PDyYpJ2czPUAcYgrUZNgg.LOYzW8E-XwUq1j5jJPlnP6oWYgYuo4SC2BZySAC3txQ&dib_tag=se&keywords=power+bank&qid=1778353921&sr=8-5",
      },
      {
        title: " لعبة سيارة ركوب للاطفال مع عجلة قيادة ومسند ظهر (اسود)",
         price: "52 ريال",
        image: "https://m.media-amazon.com/images/I/61YTh19mDoL._AC_SY879_.jpg",
        url: "https://www.amazon.sa/%D9%84%D8%B9%D8%A8%D8%A9-%D8%B3%D9%8A%D8%A7%D8%B1%D8%A9-%D9%84%D9%84%D8%A7%D8%B7%D9%81%D8%A7%D9%84-%D9%82%D9%8A%D8%A7%D8%AF%D8%A9-%D9%88%D9%85%D8%B3%D9%86%D8%AF/dp/B0FDB74W9H?ref_=Oct_d_obs_d_26389385031_0&pd_rd_w=uVBxv&content-id=amzn1.sym.a03c59ad-4247-4645-9aa2-b2c6679c3cac&pf_rd_p=a03c59ad-4247-4645-9aa2-b2c6679c3cac&pf_rd_r=926MSE7C010T3MWBMJCP&pd_rd_wg=bfEz2&pd_rd_r=b81fb790-f337-4d42-932f-1365fd37c5bc&pd_rd_i=B0FDB74W9H&th=1",
      },
       {
        title: " حقيبة ظهر FASHION عصرية مضادة للسرقة متعدد الالوان ",
         price: "9 ريال",
        image: "https://cdn.salla.sa/XnEj/b8c44af5-0acd-440d-a3e2-4ac202477e3a-1000x1000-7LbXb8CsyvHm6MlntIKOMfdbCG2hblrznHjoPPPL.jpg",
        url: "https://iblackstores.com/DpeNvnY",
      },
    ],
    ae: [
      {
        title: "جوغر بقصة واسعة مطبع بكتابة",
        price: "25 درهم",
        image: "https://f.nooncdn.com/p/pzsku/Z7398083D99F0DE4A4F90Z/45/1741263201/1873c96b-385c-4e41-a768-b3740a527db6.jpg?width=800",
        url: "https://www.noon.com/uae-ar/slogan-print-oversized-fit-jogger-with-slip-pocket/Z7398083D99F0DE4A4F90Z/p/?o=z7398083d99f0de4a4f90z-3&shareId=5145fb64-18f1-4295-a36a-a94de9cd46d2",
      },
      {
        title: " آيفون 16 برو ماكس من أبل (256 جيجابايت) مزود بخدمة فيس تايم لون تيتانيوم صحراوي إصدار الشرق الأوسط",
        price: "4475 درهم",
        image: "https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad,format=webp,quality=70/images/iphone_16_pro_max_desert_titanium_1?1761653713?g=0",
        url: "https://uae.sharafdg.com/ar/product/apple-iphone-16-pro-max-256gb-desert-titanium/?promo=3525334&dg=false",
      },
      {
        title: "جوغر بقصة واسعة مطبع بكتابةانكر باور بانك، شاحن محمول فائق السرعة 25,000 مللي أمبير في الساعة 165 واط لأجهزة اللابتوب المزدوجة، حزمة بطارية شحن سريع مع كيبلات مدمجة وقابلة للسحب، لسلسلة آيفون 17/16، سامسونج، وأكثر",
        price: "329 درهم",
        image: "https://m.media-amazon.com/images/I/61CxDvB+76L._AC_SY300_SX300_QL70_ML2_.jpg",
        url: "https://www.amazon.ae/%D8%A7%D9%86%D9%83%D8%B1-%D8%A7%D9%84%D8%B3%D8%B1%D8%B9%D8%A9-%D8%A7%D9%84%D9%84%D8%A7%D8%A8%D8%AA%D9%88%D8%A8-%D8%A7%D9%84%D9%85%D8%B2%D8%AF%D9%88%D8%AC%D8%A9%D8%8C-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%D8%AC%D8%8C/dp/B0DCBB2YTR/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.lHbLA0UqdkQK2AP6m8d-pL5ENGUW-5GkP6kbZEca9gszZnrR3Nei8Hvt7Gbl9dTs7HodzTfnTKtOrZ1z9QpPEOGOgv8ZkSM3vwlDDWTJe_dQzn1WaLNjJZrKQU6usYGnYy3MQHGjcB-t3Q7renBAHG9pCJVEnY6D38se1Pmraj56MQxiDywOIjvhtmt_Oe70HdFRtHnttLMQNZu4e-1fRCCqAL-1OuyuCeDRY5ftinfcUrBkWes4NeNiMunvBBw_TDRgQVnEPh5SnbmLonj-OwLEy7GS8ZGhUIH3EKTp-kw.gCKCJB5np1v1yeef7XSC7s09slT3U3wel6Skow5_le8&dib_tag=se&keywords=power%2Bbank&qid=1778356027&sr=8-1-spons&aref=d1K7xJs6Ow&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
      },
      {
        title: "جوغر بقصة واسعة مطبع بكتابةماك بوك برو M5 الجديد 2025 MDE04 لابتوب بشاشة ريتينا XDR مقاس 14 بوصة، شريحة M5 مع معالج 10 نواة، معالج رسومي 10 نواة/ 16 جيجابايت ذاكرة عشوائية/ 512 جيجابايت SSD/ ماك أو إس/ نسخة دولية",
        price: "5819 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N70248386V/45/_/1764242114/a46b0fdb-72db-4bc1-a5aa-569022495a78.jpg?width=800",
        url: "https://www.noon.com/uae-ar/macbook-pro-mde04-14-inch-display-apple-m5-chip-10-core-cpu-and-10-core-gpu-16gb-ram-512gb-ssd-macos-english-keyboard-international-version-english-space-black/N70248386V/p/?o=d90a817a02a43f5a&shareId=07f73e94-5f58-4a86-9fec-c9643c289725",
      },
      {
        title: "جوغر بقصة واسعة مطبع بكتابةصندوق الهدايا وايت",
        price: "470 درهم",
        image: "https://emiratespride.com/ae/wp-content/uploads/sites/10/2023/10/White-gift-set-scaled.webp",
        url: "https://emiratespride.com/ae/caballo-white-gift-set/?lang=ar",
      },
       {
        title: "مجفف ومصفف متعدد الاستخدامات Airwrap Co-anda2x - مستقيم + مموج (وردي سيراميك / ذهب وردي)",
        price: "2199 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N70270683V/45/_/1766474451/2107bb28-eebf-45bb-a921-730459a31860.jpg?width=800",
        url: "https://www.noon.com/uae-ar/airwrap-co-anda2x-multi-styler-and-dryer-straight-wavy-ceramic-pink-rose-gold-ceramic-pink-rose-gold/N70270683V/p/?o=edae37f8bec648ab&shareId=d6641fc8-6fbe-45e0-bcb9-11c249f11047",
      },
      {
        title: "جوغر بقصة واسعة مطبع بكتابةسماعة رأس كلاود II سلكية للألعاب بتصميم يغطي الأذن لأجهزة بلايستيشن 4 وبلايستيشن 5 وإكس بوكس ون وإكس بوكس سيريس إكس ونينتندو سويتش/ جهاز الكمبيوتر",
        price: "178 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N16659460A/45/_/1766380489/5451288e-47f9-4bac-9a0f-8aba6f0ecce2.jpg?width=800",
        url: "https://www.noon.com/uae-ar/cloud-ii-gaming-headset-for-pc-and-ps4-and-xbox-one-nintendo-switch-red-wired-black/N16659460A/p/?o=fc7125647a74078c&shareId=f16f063c-1e28-4b7b-b155-d8e17decbf58",
      },
      {
        title: "جوغر بقصة واسعة مطبع بكتابةإصدار قرص وحدة تحكم PlayStation 5 Slim مع وحدة تحكم - موديل جديد 2023 (الإصدار الدولي)",
        price: "2399 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N70022609V/45/_/1777031875/250d2a92-7d57-4cea-981a-a1cdb471e921.jpg?width=800",
        url: "https://www.noon.com/uae-ar/playstation-5-slim-console-international-version-disc-version-with-controller-new-model-2023/N70022609V/p/?o=ea15ab4f06975d3f&shareId=3cff6abe-0cb8-4e84-8a99-c1d1eeb9fb0f",
      },
   
    ],
    kw: [
      {
        title: "🔥 عروض الكويت",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/kw",
      },
      {
        title: "خصم الكويت على الموبايلات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/kw-mobiles",
      },
      {
        title: "أفضل منتجات الكويت",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/kw-products",
      },
    ],
    qa: [
      {
        title: "🔥 عروض قطر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/qa",
      },
      {
        title: "خصم قطر على الإلكترونيات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/qa-electronics",
      },
      {
        title: "أفضل منتجات قطر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/qa-products",
      },
    ],
    bh: [
      {
        title: "🔥 عروض البحرين",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/bh",
      },
      {
        title: "خصم البحرين على الموبايلات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/bh-mobiles",
      },
      {
        title: "أفضل منتجات البحرين",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/bh-products",
      },
    ],
    eg: [
      {
        title: "🔥 عروض مصر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/eg",
      },
      {
        title: "خصم مصر على اللابتوبات",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/eg-laptops",
      },
      {
        title: "أفضل منتجات مصر",
        image: "https://via.placeholder.com/300x200",
        url: "https://example.com/eg-products",
      },
    ],
  };

  const ads = adsByCountry[country] || [];

  async function handleSearch() {
  if (loading) return;

  setLoading(true);

  try {

    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query.trim() === "" ? "*" : query,
        country: country,
      }),
    });

    const data = await res.json();

    console.log("API RESULT:", data);

    setResults(data?.value || data?.products || data || []);
  } catch (err) {
    console.error("Search error:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="page">
      <button className="menuButton" onClick={() => setMenuOpen(true)}>
  ☰
</button>

{menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

<aside className={`sidebar ${menuOpen ? "open" : ""}`}>
  <div className="sidebarHeader">
    <strong>BPS Chat</strong>
    <button className="closeButton" onClick={() => setMenuOpen(false)}>
      ×
    </button>
  </div>

  {user ? (
  <div className="menuItem" style={{ cursor: "default", opacity: 0.9 }}>
    👤 {user.email.split("@")[0]}
  </div>
) : (
  <a href="/login" className="menuItem">تسجيل الدخول</a>
)}
<a href="/advertise" className="menuItem">أعلن معنا</a>
<a href="/about" className="menuItem">عن الموقع</a>
<a href="/contact" className="menuItem">تواصل معنا</a>
{user && (
  <button
    className="menuItem"
    onClick={async () => {
      await supabase.auth.signOut();
      setUser(null);
    }}
  >
    تسجيل الخروج
  </button>
)}
</aside>
      <main className="container">
       <section className="hero">
  
  <div className="badge">Best Product Search AI</div>
  <h1 className="titleWithLogo">
  <img src="/logo-icon.png" className="inlineLogo leftLogo" />
  <span className="typingText">
    best Product Search chat V:1.1.6
  </span>
  <img src="/logo-icon.png" className="inlineLogo rightLogo" />
</h1>
  <p className="subtitle">ابحث عن المنتجات حسب الدولة</p>
</section>

        {/* 🔥 Ads Slider */}
        <div className="adsWrapper" ref={sliderRef}>
          {ads.map((ad: any, i: number) => (
            <a
              key={i}
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="adCard"
            >
             <img src={ad.image} className="adImage" alt={ad.title} />

<div className="adInfo">
  <div className="adTitle">{ad.title}</div>

  {ad.price && (
    <div className="adPrice">{ad.price}</div>
  )}

  <div className="adFooter">
    <span className="adTag">إعلان</span>
  </div>
</div>
            </a>
          ))}
        </div>

        <section className="composer">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="select"
          >
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
            <option value="kw">الكويت</option>
            <option value="qa">قطر</option>
            <option value="bh">البحرين</option>
            <option value="eg">مصر</option>
          </select>

          <div className="searchBox">
            <input
              placeholder="اكتب اسم المنتج..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="input"
            />

            <button onClick={handleSearch} className="button" disabled={loading}>
              {loading ? "..." : "بحث"}
            </button>
          </div>
        </section>

        <section className="results">
          {loading && (
            <div className="loadingCard">
              <div className="dot" />
              <span>جاري البحث عن أفضل النتائج...</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <p className="empty">ابدأ البحث أو جرّب اسم منتج آخر</p>
          )}

          {!loading &&
            results.map((item, i) => {
              const data = item as any;

              return (
                <article key={i} className="card">
                  <img
                    src={data.image}
                    className="image"
                    alt={data.title || data.name || "Product image"}
                  />

                  <div className="info">
                    <div className="name">
                      {data.title || data.name || "No title"}
                    </div>

                    <div className="meta">
                      <span>💰 {data.priceText || "No price"}</span>
                      <span>🏬 {data.store || "Unknown store"}</span>
                    </div>

                    <a
                      href={data.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      عرض المنتج ↗
                    </a>
                  </div>
                </article>
              );
            })}
        </section>
        <PopularSearches />
      </main>

<style jsx>{`
.page {
  min-height: 100vh;
  background: #212121;
  color: #ececec;
}
.adPrice {
  color: #10a37f;
  font-weight: bold;
  font-size: 16px;
  margin-top: 4px;
}
/* 🔥 Title */
.titleWithLogo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  margin: 10px 0;
}
  /* ✍️ Typing (مظبوط من غير ما يبوّظ العرض) */
.typingText {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  
  padding-right: 5px;
  animation: typing 2.5s steps(30, end) forwards, blink 0.8s infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  50% { border-color: transparent }
}
/* 🤖 Logo base */
.inlineLogo {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

/* 👈 الشمال يهتز */
.leftLogo {
  animation: logoWave 2.5s ease-in-out infinite;
  transform-origin: bottom center;
}

/* 👉 اليمين حركة خفيفة مختلفة */
.rightLogo {
  animation: logoFloat 3s ease-in-out infinite;
}

/* 🔄 حركة الشمال */
@keyframes logoWave {
  0%, 100% { transform: rotate(0deg) translateY(0) }
  20% { transform: rotate(-8deg) translateY(-2px) }
  40% { transform: rotate(8deg) translateY(-2px) }
  60% { transform: rotate(-5deg) }
  80% { transform: rotate(5deg) }
}

/* 🔄 حركة اليمين */
@keyframes logoFloat {
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-4px) }
}



/* 📦 Container */
.container {
  max-width: 900px;
  margin: auto;
  padding: 40px 16px;
}

.hero {
  text-align: center;
}

.badge {
  background: #2f2f2f;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: #aaa;
}

/* 🍔 Menu */
.menuButton {
  position: fixed;
  top: 76px;
  left: 18px;
  z-index: 50;
  width: 42px;
  height: 42px;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  background: #2f2f2f;
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
}
.menuButton:hover {
  background: #383838;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 60;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 260px;
  height: 100vh;
  background: #171717;
  border-right: 1px solid #2f2f2f;
  z-index: 70;
  padding: 18px;
  transition: left 0.25s ease;
}

.sidebar.open {
  left: 0;
}

.sidebarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-bottom: 22px;
  font-size: 18px;
}

.closeButton {
  background: transparent;
  border: none;
  color: #ececec;
  font-size: 28px;
  cursor: pointer;
}

.menuItem {
  display: block;
  padding: 13px 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  color: #ececec;
  text-decoration: none;
}

.menuItem:hover {
  background: #2f2f2f;
}

/* 📱 Mobile */
@media (max-width: 600px) {
  .menuButton {
    top: 70px;
    left: 12px;
    width: 40px;
    height: 40px;
  }

  .sidebar {
    width: 82%;
    left: -85%;
  }

  .sidebar.open {
    left: 0;
  }
}

/* 🧾 Text */
.title {
  font-size: 32px;
  margin: 10px 0;
}

.subtitle {
  color: #aaa;
}

.adsWrapper {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 12px 6px 18px;
  margin: 22px 0;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #10a37f #2f2f2f;
}

.adsWrapper::-webkit-scrollbar {
  height: 6px;
}

.adsWrapper::-webkit-scrollbar-track {
  background: #2f2f2f;
  border-radius: 999px;
}

.adsWrapper::-webkit-scrollbar-thumb {
  background: #10a37f;
  border-radius: 999px;
}
.adCard {
  min-width: 230px;
  background: #2f2f2f;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  position: relative;
  transition: all 0.25s ease;
  border: 1px solid #3a3a3a;
}

/* ✨ hover احترافي */
.adCard:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: #10a37f;
  box-shadow: 0 10px 30px rgba(16, 163, 127, 0.2);
}

.adImage {
  width: 100%;
  height: 130px;
  object-fit: contain;
  background: #fff;
}
  .adCard::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transition: 0.6s;
}

.adCard:hover::before {
  left: 100%;
}

.adInfo {
  padding: 10px;
}

.adTitle {
  font-size: 14px;
  margin-bottom: 4px;
}

.adTag {
  font-size: 12px;
  color: #10a37f;
}

/* 🔥 Composer */
.composer {
  position: sticky;
  top: 0;
  background: #212121;
  padding: 10px 0;
}

.select {
  display: block;
  margin: auto;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #2f2f2f;
  color: white;
}

/* 🔥 SEARCH (FINAL FIX) */
.searchBox {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 15px auto;
}

.input {
  flex: 1;
  height: 46px;
  padding: 0 14px;
  border-radius: 14px;
  background: #2f2f2f;
  border: 1px solid #444;
  color: white;
  outline: none;
  font-size: 14px;
}

.input::placeholder {
  color: #9b9b9b;
}

.input:focus {
  border-color: #10a37f;
}

.button {
  height: 46px;
  background: #10a37f;
  border: none;
  padding: 0 18px;
  border-radius: 14px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.button:hover {
  background: #0e8f6e;
}

/* 📦 Results */
.results {
  margin-top: 20px;
}

.card {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #2f2f2f;
  border-radius: 12px;
  margin-bottom: 10px;
}

.image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}

.name {
  font-weight: bold;
}

.meta {
  font-size: 14px;
}

.link {
  color: #10a37f;
}

.loadingCard {
  text-align: center;
}

.empty {
  text-align: center;
}
`}</style>
    </div>
  );
}