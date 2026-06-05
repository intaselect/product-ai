import Link from "next/link";
import styles from "./videos.module.css";

export const dynamic = "force-dynamic";

async function getVideos() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bpschat.com"}/api/videos`,
    { cache: "no-store" }
  );

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
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>🎬 فيديوهات BPS Chat</h1>
        <p>أحدث فيديوهات العروض والمنتجات ومقارنة الأسعار من بي بي اس شات.</p>
      </section>

      <section className={styles.grid}>
        {videos.map((video: any) => (
          <Link key={video.id} href={`/videos/${video.slug}`} className={styles.card}>
            <div className={styles.thumb}>
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.displayTitle} />
              ) : (
                <span>▶</span>
              )}

              <div className={styles.playIcon}>▶</div>
            </div>

            <h2 className={styles.videoTitle}>{video.displayTitle}</h2>

            <span className={styles.country}>
              {video.country?.toUpperCase() || "BPS"}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}