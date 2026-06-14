import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  eg: "مصر",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
};

const currencyNames: Record<string, string> = {
  sa: "ريال سعودي",
  ae: "درهم إماراتي",
  eg: "جنيه مصري",
  kw: "دينار كويتي",
  qa: "ريال قطري",
  bh: "دينار بحريني",
};

function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function cleanText(v: any) {
  return String(v || "").trim();
}

function getWords(query: string) {
  return cleanText(query)
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 5);
}

async function getPage(slug: string) {
  const supabase = supabaseServer();

  const { data } = await supabase
    .from("seo_landing_pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  return data;
}

async function getProducts(query: string, country: string) {
  const supabase = supabaseServer();
  const words = getWords(query);

  let allProducts: any[] = [];

  for (const word of words) {
    const { data } = await supabase
      .from("customer_offers")
      .select(
        "id, product_name, price, image_url, product_url, store_name, country, category, description, created_at"
      )
      .eq("status", "approved")
      .eq("country", country)
      .ilike("product_name", `%${word}%`)
      .not("image_url", "is", null)
      .order("created_at", { ascending: false })
      .limit(12);

    if (data?.length) allProducts.push(...data);
  }

  const unique = Array.from(
    new Map(allProducts.map((p) => [p.id, p])).values()
  );

  if (unique.length >= 4) return unique.slice(0, 24);

  const { data: fallback } = await supabase
    .from("customer_offers")
    .select(
      "id, product_name, price, image_url, product_url, store_name, country, category, description, created_at"
    )
    .eq("status", "approved")
    .eq("country", country)
    .not("image_url", "is", null)
    .order("created_at", { ascending: false })
    .limit(24);

  return fallback || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: "عروض ومنتجات BPS Chat",
      description: "اكتشف عروض ومنتجات من متجر BPS Chat وعالم المنتجات.",
    };
  }

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `${SITE_URL}/collections/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.meta_description,
      url: `${SITE_URL}/collections/${page.slug}`,
      siteName: "BPS Chat | عالم المنتجات",
      type: "website",
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) notFound();

  const country = page.country || "sa";
  const countryName = countryNames[country] || "السعودية";
  const currency = currencyNames[country] || "";
  const products = await getProducts(page.query, country);

  const faq = Array.isArray(page.faq) ? page.faq : [];
  const internalLinks = Array.isArray(page.internal_links)
    ? page.internal_links
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.title,
    description: page.meta_description,
    url: `${SITE_URL}/collections/${page.slug}`,
    mainEntity: products.slice(0, 12).map((p) => ({
      "@type": "Product",
      name: p.product_name,
      image: p.image_url,
      offers: {
        "@type": "Offer",
        price: String(p.price || "").replace(/[^\d.]/g, ""),
        priceCurrency:
          country === "eg"
            ? "EGP"
            : country === "ae"
            ? "AED"
            : country === "kw"
            ? "KWD"
            : country === "qa"
            ? "QAR"
            : country === "bh"
            ? "BHD"
            : "SAR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/customer-offers/product/${p.id}`,
      },
    })),
  };

  return (
    <main dir="rtl" style={{ maxWidth: 1180, margin: "0 auto", padding: 16 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        style={{
          padding: "28px 18px",
          borderRadius: 22,
          background:
            "linear-gradient(135deg, rgba(15,23,42,.95), rgba(30,41,59,.92))",
          color: "white",
          marginBottom: 22,
        }}
      >
        <p style={{ margin: 0, color: "#38bdf8", fontWeight: 800 }}>
          BPS Chat | عالم المنتجات
        </p>

        <h1 style={{ fontSize: 30, lineHeight: 1.6, margin: "8px 0" }}>
          {page.title}
        </h1>

        <p style={{ fontSize: 16, lineHeight: 2, maxWidth: 900 }}>
          {page.intro}
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            href={`/customer-offers?country=${country}`}
            style={{
              background: "#22c55e",
              color: "white",
              padding: "10px 16px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            شاهد عروض {countryName}
          </Link>

          <Link
            href={`/search/${encodeURIComponent(page.slug)}`}
            style={{
              background: "#0ea5e9",
              color: "white",
              padding: "10px 16px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            ابحث في BPS Chat
          </Link>

          <Link
            href={`/daily-deals?country=${country}`}
            style={{
              background: "#f97316",
              color: "white",
              padding: "10px 16px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            عروض اليوم
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: 26 }}>
        <h2>أفضل منتجات {page.query} من متجر العملاء</h2>

        {products.length === 0 ? (
          <p>
            لا توجد منتجات مطابقة حاليًا، لكن يمكنك متابعة{" "}
            <Link href={`/customer-offers?country=${country}`}>
              متجر BPS Chat
            </Link>{" "}
            لمشاهدة أحدث العروض.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
              gap: 14,
            }}
          >
            {products.map((p) => (
              <article
                key={p.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 10,
                  background: "white",
                  boxShadow: "0 8px 22px rgba(15,23,42,.08)",
                }}
              >
                <Link
                  href={`/customer-offers/product/${p.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: 150,
                      background: "#f8fafc",
                      borderRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.product_name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      minHeight: 66,
                      margin: "10px 0 6px",
                    }}
                  >
                    {p.product_name}
                  </h3>
                </Link>

                <p style={{ margin: "4px 0", fontWeight: 900 }}>
                  {p.price} {currency}
                </p>

                <p style={{ margin: "4px 0", color: "#64748b", fontSize: 13 }}>
                  المتجر: {p.store_name || "BPS Chat"}
                </p>

                <div style={{ display: "grid", gap: 7, marginTop: 10 }}>
                  <Link
                    href={`/customer-offers/product/${p.id}`}
                    style={{
                      textAlign: "center",
                      background: "#0f172a",
                      color: "white",
                      padding: "9px 10px",
                      borderRadius: 10,
                      textDecoration: "none",
                      fontWeight: 800,
                    }}
                  >
                    تفاصيل المنتج
                  </Link>

                  <Link
                    href={`/customer-offers/card/${p.id}`}
                    style={{
                      textAlign: "center",
                      background: "#2563eb",
                      color: "white",
                      padding: "9px 10px",
                      borderRadius: 10,
                      textDecoration: "none",
                      fontWeight: 800,
                    }}
                  >
                    صفحة الكارت
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        style={{
          padding: 18,
          borderRadius: 18,
          background: "#f8fafc",
          marginBottom: 24,
        }}
      >
        <h2>نصائح قبل شراء {page.query}</h2>
        <p style={{ lineHeight: 2 }}>{page.buying_tips}</p>

        <p style={{ lineHeight: 2 }}>
          في <strong>BPS Chat</strong> و<strong>عالم المنتجات</strong> نساعدك
          على مقارنة المنتجات والعروض داخل {countryName} والوصول إلى صفحات
          المنتجات وروابط الشراء بسهولة. تصفح أكثر من عرض، قارن السعر والمتجر،
          ثم اختر المنتج الأنسب لك.
        </p>
      </section>
      <section
  style={{
    padding: 18,
    borderRadius: 18,
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    marginBottom: 24,
  }}
>
  <h2>روابط تساعدك في شراء {page.query}</h2>

  <p style={{ lineHeight: 2 }}>
    لو لم تجد المنتج المناسب من أول مرة، يمكنك متابعة أحدث المنتجات والعروض
    داخل <strong>عالم المنتجات</strong> أو تصفح أقسام BPS Chat المختلفة.
    الروابط التالية تساعدك على الوصول لصفحات أكثر ارتباطًا ببحثك:
  </p>

  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
    }}
  >
    <Link
      href={`/customer-offers?country=${country}`}
      style={{
        color: "#fff",
        background: "#0f172a",
        padding: "10px 14px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      منتجات {countryName}
    </Link>

    <Link
      href="/customer-offers"
      style={{
        color: "#fff",
        background: "#0f172a",
        padding: "10px 14px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      كل منتجات العملاء
    </Link>

    <Link
      href={`/daily-deals?country=${country}`}
      style={{
        color: "#fff",
        background: "#0f172a",
        padding: "10px 14px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      عروض اليوم في {countryName}
    </Link>

    <Link
      href={`/search/${page.slug}`}
      style={{
        color: "#fff",
        background: "#0f172a",
        padding: "10px 14px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      نتائج بحث {page.query}
    </Link>

    <Link
      href="/smart-search"
      style={{
        color: "#fff",
        background: "#0f172a",
        padding: "10px 14px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      البحث الذكي
    </Link>

    <Link
      href="/comparisons"
      style={{
        color: "#fff",
        background: "#0f172a",
        padding: "10px 14px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      مقارنات المنتجات
    </Link>
  </div>
</section>
      

      {faq.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h2>أسئلة شائعة عن {page.query}</h2>
          {faq.map((item: any, i: number) => (
            <details
              key={i}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
                background: "white",
              }}
            >
              <summary style={{ fontWeight: 900, cursor: "pointer" }}>
                {item.q}
              </summary>
              <p style={{ lineHeight: 2 }}>{item.a}</p>
            </details>
          ))}
        </section>
      )}

      <section
        style={{
          padding: 18,
          borderRadius: 18,
          background: "#0f172a",
          color: "white",
          marginBottom: 30,
        }}
      >
        <h2>روابط داخلية مهمة</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/" style={linkStyle}>
            الرئيسية
          </Link>
          <Link href="/customer-offers" style={linkStyle}>
            متجر العملاء
          </Link>
          <Link href={`/customer-offers?country=${country}`} style={linkStyle}>
            عروض {countryName}
          </Link>
          <Link href="/daily-deals" style={linkStyle}>
            عروض اليوم
          </Link>
          <Link href="/comparisons" style={linkStyle}>
            المقارنات
          </Link>
          <Link href="/smart-search" style={linkStyle}>
            البحث الذكي
          </Link>

          {internalLinks.map((l: any, i: number) => (
            <Link key={i} href={l.url || "/"} style={linkStyle}>
              {l.title || "رابط مهم"}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

const linkStyle = {
  color: "white",
  background: "rgba(255,255,255,.12)",
  padding: "9px 12px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 800,
};