import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import VideoSharePanel from "@/app/components/VideoSharePanel";
import styles from "../videos.module.css";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};

const currencyNames: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
  eg: "جنيه مصري",
};

function getYoutubeId(url: string) {
  const match = url?.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{6,})/);
  return match?.[1] || "";
}

function cleanTitle(title: string) {
  return String(title || "فيديو BPS Chat")
    .trim()
    .replace(/\s+/g, " ");
}

function makeSlug(title: string, id: string) {
  return `${title || "bps-chat-video"}-${id}`
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150);
}

function cleanText(v: any) {
  return String(v || "").trim().replace(/\s+/g, " ");
}

function shortText(v: any, max = 140) {
  const t = cleanText(v);
  return t.length > max ? t.slice(0, max - 3) + "..." : t;
}

function getOfferIds(sourceId: string) {
  return String(sourceId || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

async function getVideos() {
  const { data } = await supabase
    .from("youtube_shorts_log")
    .select("*")
    .in("source_type", ["store_country_short", "store_promo_video"])
    .eq("status", "uploaded")
    .order("created_at", { ascending: false })
    .limit(1000);

  return (data || [])
    .filter((v: any) => v.youtube_url || v.youtube_video_id)
    .map((v: any) => {
      const youtubeUrl =
        v.youtube_url ||
        (v.youtube_video_id
          ? `https://www.youtube.com/watch?v=${v.youtube_video_id}`
          : "");

      const youtubeId = getYoutubeId(youtubeUrl) || v.youtube_video_id || "";
      const displayTitle = cleanTitle(v.title);

      return {
        ...v,
        youtube_url: youtubeUrl,
        displayTitle,
        youtubeId,
        thumbnail: youtubeId
          ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
          : "",
        slug: makeSlug(displayTitle, v.id),
      };
    });
}

async function getOffersByIds(ids: string[]) {
  if (!ids.length) return [];

  const { data } = await supabase
    .from("customer_offers")
    .select(
      "id, product_name, price, image_url, product_url, store_name, country, category, created_at"
    )
    .in("id", ids);

  const order = new Map(ids.map((id, i) => [id, i]));

  return (data || []).sort(
    (a: any, b: any) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999)
  );
}

function makeSeoDescription(video: any, offers: any[]) {
  const countryName = countryNames[video.country] || "مصر والخليج";

  const names = offers
    .slice(0, 4)
    .map((o: any) => cleanText(o.product_name))
    .filter(Boolean)
    .join("، ");

  if (names) {
    return `شاهد فيديو BPS Chat عن عروض ${countryName} ويضم منتجات مثل ${names}. قارن الأسعار والمتاجر وروابط الشراء واكتشف أفضل المنتجات في مصر والخليج.`;
  }

  return `شاهد فيديو عروض ومنتجات من BPS Chat لمقارنة الأسعار واكتشاف أفضل العروض في ${countryName} ومصر والخليج.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const videos = await getVideos();
  const video = videos.find((v: any) => v.slug === slug);

  if (!video) {
    return {
      title: "فيديو غير موجود | BPS Chat",
    };
  }

  const offerIds = getOfferIds(video.source_id);
  const offers = await getOffersByIds(offerIds);
  const desc = makeSeoDescription(video, offers);

  return {
    title: `${video.displayTitle} | BPS Chat`,
    description: desc,
    openGraph: {
      title: `${video.displayTitle} | BPS Chat`,
      description: desc,
      url: `https://www.bpschat.com/videos/${video.slug}`,
      siteName: "BPS Chat",
      type: "video.other",
      images: video.thumbnail ? [{ url: video.thumbnail }] : [],
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const videos = await getVideos();
  const video = videos.find((v: any) => v.slug === slug);

  if (!video) notFound();

  const offerIds = getOfferIds(video.source_id);
  const offers = await getOffersByIds(offerIds);

  const youtubeId = video.youtubeId || getYoutubeId(video.youtube_url);
  const pageUrl = `https://www.bpschat.com/videos/${video.slug}`;
  const countryName = countryNames[video.country] || "مصر والخليج";
  const seoDescription = makeSeoDescription(video, offers);

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.displayTitle,
    description: seoDescription,
    uploadDate: video.created_at,
    thumbnailUrl: video.thumbnail ? [video.thumbnail] : undefined,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "BPS Chat",
      url: "https://www.bpschat.com",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `منتجات موجودة في فيديو ${video.displayTitle}`,
    itemListElement: offers.map((offer: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: offer.product_url || "https://www.bpschat.com/customer-offers",
      name: offer.product_name,
    })),
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {offers.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <section className={styles.content}>
        <Link href="/videos" className={styles.back}>
          ← كل الفيديوهات
        </Link>

        <h1 className={styles.mainTitle}>{video.displayTitle}</h1>

        <p className={styles.leadText}>{seoDescription}</p>

        <div className={styles.videoBox}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.displayTitle}
            allowFullScreen
          />
        </div>

        <VideoSharePanel title={video.displayTitle} url={pageUrl} />

        <section className={styles.seoBox}>
          <h2>عن هذا الفيديو</h2>
          <p>
            هذا الفيديو من <strong>BPS Chat</strong> يعرض أفضل عروض{" "}
            <strong>{countryName}</strong> من متجر بي بي اس شات، مع أسعار المنتجات
            والمتاجر وروابط الشراء، لمساعدتك على مقارنة الأسعار قبل الشراء.
          </p>

          {video.page_url && (
            <a href={video.page_url} className={styles.cta}>
              شاهد كل عروض {countryName} ↗
            </a>
          )}
        </section>

        {offers.length > 0 && (
          <section className={styles.productsSection}>
            <h2>🛒 المنتجات الموجودة في الفيديو</h2>
            <p>
              هذه المنتجات ظهرت داخل الفيديو، ويمكنك فتح كل عرض ومقارنة السعر مباشرة.
            </p>

            <div className={styles.productsGrid}>
              {offers.map((offer: any) => (
                <article key={offer.id} className={styles.productCard}>
                  <img
                    src={offer.image_url}
                    alt={offer.product_name || "منتج من BPS Chat"}
                    className={styles.productImage}
                  />

                  <div className={styles.productInfo}>
                    <h3>{shortText(offer.product_name, 90)}</h3>

                    <div className={styles.productMeta}>
                      <span>
                        💰 {offer.price}{" "}
                        {currencyNames[offer.country] ||
                          currencyNames[video.country] ||
                          ""}
                      </span>

                      <span>🏬 {offer.store_name || "BPS Chat Store"}</span>
                      <span>🌍 {countryNames[offer.country] || countryName}</span>
                    </div>

                    <a
                      href={offer.product_url || "/customer-offers"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.productBtn}
                    >
                      عرض المنتج ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={styles.links}>
          <Link href="/customer-offers">🛍️ متجر BPS</Link>
          <Link href={`/customer-offers?country=${video.country || "sa"}`}>
            🔥 عروض {countryName}
          </Link>
          <Link href="/smart-search">⚡ البحث الذكي</Link>
          <Link href="/">🔎 ابحث عن منتج</Link>
        </section>
      </section>
    </main>
  );
}