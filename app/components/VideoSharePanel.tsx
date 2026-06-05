"use client";

export default function VideoSharePanel({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const text = encodeURIComponent(title);
  const pageUrl = encodeURIComponent(url);

  return (
    <div className="shareBox">
      <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}>
        فيسبوك
      </a>

      <a target="_blank" href={`https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`}>
        X
      </a>

      <a target="_blank" href={`https://t.me/share/url?url=${pageUrl}&text=${text}`}>
        تيليجرام
      </a>

      <a target="_blank" href={`https://wa.me/?text=${text}%20${pageUrl}`}>
        واتساب
      </a>

      <button onClick={() => navigator.clipboard.writeText(url)}>
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