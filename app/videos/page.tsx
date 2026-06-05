import Link from "next/link";

export const dynamic = "force-dynamic";

async function getVideos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bpschat.com"}/api/videos`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.videos || [];
}

export const metadata = {
  title: "فيديوهات BPS Chat | عروض ومنتجات يومية",
  description:
    "شاهد أحدث فيديوهات BPS Chat للعروض والمنتجات ومقارنة الأسعار في مصر والخليج.",
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <main className="page">
      <section className="hero">
        <h1>🎬 فيديوهات BPS Chat</h1>
        <p>أحدث فيديوهات العروض والمنتجات من بي بي اس شات.</p>
      </section>

      <section className="grid">
        {videos.map((video: any) => (
          <Link key={video.id} href={`/videos/${video.slug}`} className="card">
            <div className="thumb">▶</div>
            <h2>{video.title}</h2>
            <span>{video.country?.toUpperCase()}</span>
          </Link>
        ))}
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 40px 16px;
          background: #0b0f14;
          color: white;
        }

        .hero {
          max-width: 900px;
          margin: auto;
          text-align: center;
        }

        .hero h1 {
          font-size: 34px;
        }

        .hero p {
          color: #aaa;
        }

        .grid {
          max-width: 1100px;
          margin: 35px auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 18px;
        }

        .card {
          text-decoration: none;
          color: white;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 18px;
          transition: 0.25s;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: #10a37f;
          box-shadow: 0 0 25px rgba(16,163,127,0.25);
        }

        .thumb {
          height: 150px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 44px;
          background: linear-gradient(135deg, rgba(16,163,127,0.25), rgba(37,99,235,0.18));
        }

        h2 {
          font-size: 16px;
          line-height: 1.6;
        }

        span {
          color: #10a37f;
          font-weight: bold;
        }
      `}</style>
    </main>
  );
}