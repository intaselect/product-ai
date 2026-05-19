"use client";

type Props = {
  query: string;
  countryName: string;
  countryCode: string;
  slug: string;
};

export default function ShareSlugVideo({
  query,
  countryName,
  countryCode,
  slug,
}: Props) {
  const pageUrl = `https://www.bpschat.com/search/${slug}`;

  const videoUrl = `https://www.bpschat.com/api/slug-video?query=${encodeURIComponent(
    query
  )}&country=${countryCode}`;

  const text = `انتهى زمن البحث اليدوي عن ${query} في ${countryName}

بدل ما تفتح Amazon و Noon و Jumia و Jarir و Extra وتقارن بنفسك، جرب BPS Chat بي بي اس شات.

بحث واحد يعرض لك الأسعار والعروض من المتاجر في مكان واحد.

${pageUrl}`;

  async function copyPost() {
    await navigator.clipboard.writeText(text);
    alert("تم نسخ نص البوست");
  }

  function shareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      "_blank"
    );
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  async function nativeShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `أفضل سعر ${query} في ${countryName}`,
          text,
          url: pageUrl,
        });
      } else {
        await copyPost();
      }
    } catch (e) {
      console.log(e);
    }
  }
function shareWhatsApp() {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}

function shareMessenger() {
  window.open(
    `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
      pageUrl
    )}&app_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${encodeURIComponent(pageUrl)}`,
    "_blank"
  );
}
  return (
  <div id="share-section" className="shareBox">
    <h3>شارك نتائج البحث</h3>

    <p>
      شارك صفحة المقارنة مع صورة نتائج البحث والكلمات الخاصة بالمنتج و BPS Chat.
    </p>

    <div className="shareButtons">
      <button onClick={shareFacebook}>Facebook</button>
      <button onClick={shareTwitter}>X / Twitter</button>
      <button onClick={shareWhatsApp}>WhatsApp</button>
      <button onClick={nativeShare}>Messenger</button>
      <button onClick={nativeShare}>Instagram / TikTok / YouTube</button>
      <button onClick={copyPost}>نسخ نص البوست</button>
    </div>

    <style jsx>{`
      .shareBox {
        margin: 26px auto;
        padding: 18px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(0, 255, 200, 0.18);
        text-align: center;
        box-shadow: 0 0 24px rgba(0, 255, 200, 0.08);
      }

      .shareBox h3 {
        margin: 0 0 8px;
        color: white;
      }

      .shareBox p {
        color: #aaa;
        line-height: 1.8;
        margin-bottom: 16px;
      }

      .shareButtons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }

      .shareButtons button {
        border: none;
        border-radius: 14px;
        padding: 12px 16px;
        cursor: pointer;
        color: white;
        text-decoration: none;
        font-weight: bold;
        background: linear-gradient(135deg, #10a37f, #2563eb);
        transition: 0.25s ease;
      }

      .shareButtons button:hover {
        transform: translateY(-2px);
        filter: brightness(1.1);
      }
    `}</style>
  </div>
);
}