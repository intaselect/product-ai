"use client";

export default function VideoSharePanel({
  title,
  url,
  category,
  country,
}: {
  title: string;
  url: string;
  category?: string;
  country?: string;
}) {
  const countryNames: Record<string, string> = {
    sa: "السعودية",
    ae: "الإمارات",
    kw: "الكويت",
    qa: "قطر",
    bh: "البحرين",
    eg: "مصر",
  };

  const categoryNames: Record<string, string> = {
    mobiles: "الجوالات",
    electronics: "الإلكترونيات",
    computers: "اللابتوبات والكمبيوتر",
    beauty: "الجمال والعناية",
    fashion: "الموضة",
    home: "المنزل",
    gaming: "الألعاب والجيمينج",
    perfumes: "العطور",
    watches: "الساعات",
    phone_accessories: "إكسسوارات الجوال",
  };

  const countryName = countryNames[country || ""] || "مصر والخليج";
  const categoryName = categoryNames[category || ""] || "المنتجات";

  const shareText = `🔥 أفضل عروض ${categoryName} في ${countryName}

شاهد الفيديو واكتشف المنتجات والأسعار وروابط الشراء قبل ما تشتري 👇`;

  const text = encodeURIComponent(shareText);
  const pageUrl = encodeURIComponent(url);

  return (
    <div className="shareBox">
      <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}>
        فيسبوك
      </a>

      <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`}>
        X
      </a>

      <a target="_blank" rel="noopener noreferrer" href={`https://t.me/share/url?url=${pageUrl}&text=${text}`}>
        تيليجرام
      </a>

      <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${text}%20${pageUrl}`}>
        واتساب
      </a>

      <button onClick={() => navigator.clipboard.writeText(`${shareText}\n\n${url}`)}>
        نسخ الرابط
      </button>

      <style jsx>{`
        .shareBox {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 25px 0;
        }

        a,
        button {
          border: 0;
          cursor: pointer;
          text-decoration: none;
          color: white;
          font-weight: 900;
          padding: 10px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #10a37f, #18d6a3);
        }
      `}</style>
    </div>
  );
}