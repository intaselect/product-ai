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

function makeSlug(title: string, id: string) {
  return `${title || "bps-chat-video"}-${id}`
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function getYoutubeId(url: string) {
  const match = url?.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{6,})/);
  return match?.[1] || "";
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
    .eq("status", "uploaded")
    .not("youtube_url", "is", null)
    .order("created_at", { ascending: false })
    .limit(150);

  return (data || []).map((v: any) => ({
    ...v,
    slug: makeSlug(v.title || "bps-chat-video", v.id),
  }));
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const videos = await getVideos();
  const video = videos.find((v: any) => v.slug === params.slug);

  if (!video) {
    return {
      title: "فيديو غير موجود | BPS Chat",
    };
  }

  const offerIds = getOfferIds(video.source_id);
  const offers = await getOffersByIds(offerIds);
  const desc = makeSeoDescription(video, offers);

  return {
    title: `${video.title || "فيديو عروض BPS Chat"} | BPS Chat`,
    description: desc,
    openGraph: {
      title: `${video.title || "فيديو عروض BPS Chat"} | BPS Chat`,
      description: desc,
      url: `https://www.bpschat.com/videos/${video.slug}`,
      siteName: "BPS Chat",
      type: "video.other",
    },
  };
}

export default async function VideoPage({ params }: { params: { slug: string } }) {
  const videos = await getVideos();
  const video = videos.find((v: any) => v.slug === params.slug);

  if (!video) notFound();

  const offerIds = getOfferIds(video.source_id);
  const offers = await getOffersByIds(offerIds);

  const youtubeId = getYoutubeId(video.youtube_url);
  const pageUrl = `https://www.bpschat.com/videos/${video.slug}`;
  const countryName = countryNames[video.country] || "مصر والخليج";
  const seoDescription = makeSeoDescription(video, offers);

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title || "فيديو عروض BPS Chat",
    description: seoDescription,
    uploadDate: video.created_at,
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
    name: `منتجات موجودة في فيديو ${video.title || "BPS Chat"}`,
    itemListElement: offers.map((offer: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: offer.product_url || `https://www.bpschat.com/customer-offers`,
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

        <h1 className={styles.mainTitle}>
          {video.title || `فيديو عروض BPS Chat في ${countryName}`}
        </h1>

        <p className={styles.leadText}>{seoDescription}</p>

        <div className={styles.videoBox}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.title || "BPS Chat Video"}
            allowFullScreen
          />
        </div>

        <VideoSharePanel title={video.title || "فيديو BPS Chat"} url={pageUrl} />

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
                        {currencyNames[offer.country] || currencyNames[video.country] || ""}
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