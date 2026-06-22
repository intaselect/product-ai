
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import SidebarMenu from "@/app/components/SidebarMenu";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/Footer";
import InternalLinksBoost from "./components/InternalLinksBoost";
import TrustedSourcesBar from "@/app/components/TrustedSourcesBar";
import AnalyticsTracker from "@/app/components/AnalyticsTracker";
import InstallAppButton from "@/app/components/InstallAppButton";
import GlobalAdsSlider from "@/app/components/GlobalAdsSlider";
import TrustBanner from "@/app/components/TrustBanner";
import DailyDealsBanner from "@/app/components/DailyDealsBanner";
import BrandSplash from "@/app/components/BrandSplash";
import { GoogleTagManager } from "@next/third-parties/google";
import SidebarMarketProducts from "./components/SidebarMarketProducts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bpschat.com"),

  

  title: "BPS Chat | بي بي اس شات | عالم المنتجات | مقارنة الأسعار والعروض",
description:
"BPS Chat | بي بي اس شات | عالم المنتجات - منصة ذكية لمقارنة الأسعار والبحث عن المنتجات واكتشاف العروض اليومية بين Amazon و Noon و Jumia و Jarir و Extra و Carrefour و Sharaf DG و Xcite و Namshi و Trendyol و AliExpress و Temu و Shein وغيرها في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
  keywords: [
    "BPS Chat",
    "بي بي اس شات",
    "بي بي اس",
    "بي بي اس شات موقع",
    "bpschat",
    "bps chat",
    "موقع بي بي اس شات",
    "مقارنة أسعار",
    "مقارنة اسعار",
    "مقارنة أسعار المنتجات",
    "بحث منتجات",
    "محرك بحث منتجات",
    "أفضل أسعار",
    "وفر فلوسك",
    "قارن بين المتاجر",
    "منتجات السعودية",
    "منتجات الإمارات",
    "منتجات الكويت",
    "منتجات قطر",
    "منتجات البحرين",
    "منتجات مصر",
    "عروض السعودية",
    "عروض الخليج",
    "Amazon",
"Noon",
"Jumia",
"Jarir",
"Extra",
"Carrefour",
"Sharaf DG",
"Xcite",
"Namshi",
"Trendyol",
"AliExpress",
"Temu",
"Shein",
"B.TECH",
"Homzmart",
"Breadfast",
"OpenSooq",
"Blink",
"Best Al Yousifi",
"Eureka",
"Lulu",
"Mumzworld",
"Dubizzle",
"D4D Online",
"مقارنة أسعار أمازون",
"مقارنة أسعار نون",
"مقارنة أسعار جوميا",
"مقارنة أسعار جرير",
"مقارنة أسعار اكسترا",
"مقارنة أسعار كارفور",
"عالم المنتجات",
"عالم المنتجات من BPS Chat",
"عالم المنتجات بي بي اس شات",
"متجر عالم المنتجات",
"عروض عالم المنتجات",
"عروض عالم المنتجات اليومية",
"أفضل المنتجات",
"البحث عن المنتجات",
"دليل المنتجات",
"عالم التسوق",
"تسوق ذكي",
"مقارنة المنتجات",
"مقارنة المتاجر",
"البحث الذكي عن المنتجات",
"اكتشف المنتجات",
"قارن المنتجات",
"Product World",
"Product World BPS Chat",
"BPS Chat Product World",
"Online Product Search",
"Product Comparison",
"Shopping Search Engine",
"Best Product Prices",
"Product Discovery",
"Smart Shopping",
"عالم المنتجات",
"عالم المنتجات من بي بي اس شات",
"عالم المنتجات من BPS Chat",
"عالم المنتجات بي بي اس شات",
"بي بي اس شات عالم المنتجات",

"Product World",
"Product World by BPS Chat",
"BPS Chat Product World",
"World of Products",
"World of Products by BPS Chat",

"BPS Chat",
"bps chat",
"bpschat",
"بي بي اس شات",
  ],
icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: "/apple-touch-icon.png",
},

 openGraph: {
  title: "BPS Chat | بي بي اس شات - قارن الأسعار ووفر فلوسك",
  description:
    "بي بي اس شات (BPS Chat) يساعدك تبحث عن المنتجات وتقارن الأسعار بين المتاجر في السعودية والخليج ومصر بسهولة.",
  url: "https://www.bpschat.com",
  siteName: "BPS Chat | بي بي اس شات",
  images: [
    {
      url: "https://www.bpschat.com/og-image.png",
      width: 1200,
      height: 630,
      alt: "BPS Chat - بي بي اس شات",
    },
  ],
  locale: "ar_AR",
  type: "website",
},


 twitter: {
  card: "summary_large_image",
  title: "BPS Chat | بي بي اس شات - أفضل محرك بحث منتجات",
  description:
    "بي بي اس شات (BPS Chat) يساعدك تقارن الأسعار حسب الدولة بسهولة.",
  images: ["https://www.bpschat.com/og-image.png"],
},
manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
  <head>
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#0ea5e9" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="BPS Chat" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4886224668719787"
    crossOrigin="anonymous"
  ></script>

 <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.bpschat.com/#organization",
          name: "BPS Chat",
          alternateName: ["بي بي اس شات", "bpschat", "BPSChat"],
          url: "https://www.bpschat.com",
          foundingDate: "2026",
          areaServed: [
  "SA",
  "AE",
  "KW",
  "QA",
  "BH",
  "EG",
],
          logo: {
            "@type": "ImageObject",
            url: "https://www.bpschat.com/android-chrome-512x512.png",
            width: 512,
            height: 512,
          },
          image: "https://www.bpschat.com/og-image.png",
          description:
            "BPS Chat | بي بي اس شات هو محرك بحث لمقارنة أسعار المنتجات في السعودية والإمارات والكويت وقطر والبحرين ومصر.",
          sameAs: [
            "https://www.facebook.com/bpschat",
            "https://www.instagram.com/bpschat",
            "https://www.tiktok.com/@bpschat",
            "https://www.youtube.com/@bpschat"
          ],
        },
        {
          "@type": "WebSite",
          "@id": "https://www.bpschat.com/#website",
          name: "BPS Chat",
          alternateName: "بي بي اس شات",
          url: "https://www.bpschat.com",
          publisher: {
            "@id": "https://www.bpschat.com/#organization",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.bpschat.com/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
      ],
    }),
  }}
/>
</head>

 <body className="min-h-screen flex flex-col">
  <BrandSplash />
 <Navbar />
 
 <div className="mobileFloatingStoreCard">
    <a href="/customer-offers" className="mobileFloatingItem">
      <span>🛒</span>
      <b>المتجر عالم المنتجات</b>
    </a>
    <a href="/customer-offers/add" className="mobileFloatingItem highlight">
      <span>🎁</span>
      <b>أضف منتجك</b>
    </a>
  </div>
<TrustedSourcesBar />
<TrustBanner />
<GlobalAdsSlider />
<DailyDealsBanner />

<div className="storesPromoBanner">
  <a href="/bps-for-stores" className="storesPromoLink">
    <span className="storesPromoIcon">🎁</span>
    <span className="storesPromoText">
     للتجار: أضف أول منتج مجاناً داخل عالم المنتجات من BPS Chat
    </span>
    <span className="storesPromoBtn">ابدأ الآن 🚀</span>
  </a>
</div>

<InstallAppButton />



<SidebarMenu />

{/* الحاوية المرنة الجديدة للديسكتوب */}
<div className="flex-1 w-full max-w-[1650px] mx-auto px-4 lg:flex lg:gap-6">
  
  {/* العمود الجانبي: يظهر ديسكتوب فقط ومخفي تماماً على الموبايل */}
  <aside className="hidden lg:block lg:w-[280px] shrink-0 sticky top-24 h-fit">
    <SidebarMarketProducts products={[]} country="sa" />
  </aside>

  {/* المحتوى الأساسي للموقع */}
  <main className="flex-1 min-w-0">
    {children}
  </main>
  
</div>

<InternalLinksBoost />
  <Footer />

  <Analytics />
<SpeedInsights />
<AnalyticsTracker />

<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=AW-433499662"
/>

<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-433499662');
    `,
  }}
/>

<GoogleTagManager gtmId="GTM-5D25SDWK" />
</body>
    </html>
  );
}