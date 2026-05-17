import Link from "next/link";

type Video = {
  title: string;
  link: string;
  thumbnail?: string;
  channel?: string;
  views?: string;
  published?: string;
  description?: string;
};

async function getVideos(query: string, country: string): Promise<Video[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bpschat.com";

  try {
    const res = await fetch(
      `${baseUrl}/api/youtube-reviews?q=${encodeURIComponent(query)}&country=${country}`,
      { next: { revalidate: 60 * 60 * 24 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.videos || [];
  } catch {
    return [];
  }
}

export default async function ProductVideos({
  query,
  country = "sa",
}: {
  query: string;
  country?: string;
}) {
  const videos = await getVideos(query, country);

  if (!videos.length) return null;

  return (
    <section className="productVideos" dir="rtl">
      <div className="videosHeader">
        <div>
          <h2>فيديوهات مراجعة {query}</h2>
          <p>
            شاهد مراجعات وتجارب ومقارنات تساعدك قبل شراء {query}، ثم قارن السعر
            داخل BPS Chat - بي بي اس شات.
          </p>
        </div>
      </div>

      <div className="videosGrid">
        {videos.map((video, index) => (
          <a
            key={`${video.link}-${index}`}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="videoCard"
          >
            {video.thumbnail ? (
              <img src={video.thumbnail} alt={video.title} />
            ) : (
              <div className="videoPlaceholder">▶</div>
            )}

            <div className="videoBody">
              <strong>{video.title}</strong>

              <small>
                {video.channel}
                {video.views ? ` • ${video.views}` : ""}
                {video.published ? ` • ${video.published}` : ""}
              </small>

              {video.description ? <p>{video.description}</p> : null}
            </div>
          </a>
        ))}
      </div>

      <div className="quickLinks">
        <Link href={`/search/${encodeURIComponent(`${query} سعر`)}-${country}`}>
          سعر {query}
        </Link>
        <Link href={`/search/${encodeURIComponent(`${query} عروض`)}-${country}`}>
          عروض {query}
        </Link>
        <Link href={`/search/${encodeURIComponent(`${query} مقارنة`)}-${country}`}>
          مقارنة {query}
        </Link>
      </div>

      <style>{`
        .productVideos {
          margin-top: 34px;
          background: rgba(40,40,40,0.62);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .videosHeader h2 {
          margin-top: 0;
          font-size: 26px;
          color: #10a37f;
        }

        .videosHeader p {
          color: #e8e8e8;
          line-height: 2;
          font-size: 17px;
        }

        .videosGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 16px;
        }

        .videoCard {
          display: block;
          overflow: hidden;
          background: #2f2f2f;
          border: 1px solid #444;
          border-radius: 18px;
          color: white;
          text-decoration: none;
        }

        .videoCard:hover {
          border-color: #10a37f;
        }

        .videoCard img,
        .videoPlaceholder {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          background: #111;
        }

        .videoPlaceholder {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          color: #10a37f;
        }

        .videoBody {
          padding: 14px;
        }

        .videoBody strong {
          display: block;
          line-height: 1.7;
          margin-bottom: 8px;
        }

        .videoBody small {
          color: #aaa;
          display: block;
          line-height: 1.6;
        }

        .videoBody p {
          color: #cfcfcf;
          font-size: 14px;
          line-height: 1.7;
          margin: 8px 0 0;
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .quickLinks a {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
        }

        .quickLinks a:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        @media (max-width: 900px) {
          .videosGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .videosGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}