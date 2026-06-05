import Link from "next/link";
import { notFound } from "next/navigation";
import VideoSharePanel from "@/app/components/VideoSharePanel";

export const dynamic = "force-dynamic";

function getYoutubeId(url: string) {
  const match = url?.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{6,})/);
  return match?.[1] || "";
}

async function getVideos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bpschat.com"}/api/videos`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.videos || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const videos = await getVideos();
  const video = videos.find((v: any) => v.slug === params.slug);

  if (!video) {
    return {
      title: "فيديو غير موجود | BPS Chat",
    };
  }

  return {
    title: `${video.title} | BPS Chat`,
    description:
      "شاهد فيديو عروض ومنتجات من BPS Chat مع روابط داخلية لمقارنة الأسعار والتسوق.",
  };
}

export default async function VideoPage({ params }: { params: { slug: string } }) {
  const videos = await getVideos();
  const video = videos.find((v: any) => v.slug === params.slug);

  if (!video) notFound();

  const youtubeId = getYoutubeId(video.youtube_url);
  const pageUrl = `https://www.bpschat.com/videos/${video.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: "فيديو عروض ومنتجات من BPS Chat.",
    uploadDate: video.created_at,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    url: pageUrl,
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="content">
        <Link href="/videos" className="back">← كل الفيديوهات</Link>

        <h1>{video.title}</h1>

        <div className="videoBox">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.title}
            allowFullScreen
          />
        </div>

        <VideoSharePanel title={video.title} url={pageUrl} />

        <section className="seoBox">
          <h2>عن هذا الفيديو</h2>
          <p>
            هذا الفيديو من BPS Chat يعرض مجموعة مختارة من المنتجات والعروض مع روابط تساعدك
            على مقارنة الأسعار واكتشاف أفضل المنتجات في مصر والخليج.
          </p>

          {video.page_url && (
            <a href={video.page_url} className="cta">
              شاهد المنتجات المرتبطة بالفيديو ↗
            </a>
          )}
        </section>

        <section className="links">
          <Link href="/customer-offers">🛍️ متجر BPS</Link>
          <Link href="/smart-search">⚡ البحث الذكي</Link>
          <Link href="/">🔎 ابحث عن منتج</Link>
        </section>
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #0b0f14;
          color: white;
          padding: 40px 16px;
        }

        .content {
          max-width: 900px;
          margin: auto;
        }

        .back {
          color: #10a37f;
          text-decoration: none;
          font-weight: bold;
        }

        h1 {
          font-size: 30px;
          line-height: 1.5;
        }

        .videoBox {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          border-radius: 22px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
        }

        iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .seoBox {
          margin-top: 25px;
          padding: 22px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .seoBox p {
          color: #ccc;
          line-height: 1.8;
        }

        .cta {
          display: inline-block;
          margin-top: 10px;
          color: white;
          text-decoration: none;
          background: #10a37f;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: bold;
        }

        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 25px;
        }

        .links a {
          color: white;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>
    </main>
  );
}