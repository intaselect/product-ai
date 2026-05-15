
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

  title: "BPS Chat | بي بي اس شات - أفضل محرك بحث منتجات ومقارنة أسعار",
  description:
    "بي بي اس شات (BPS Chat) هو موقع لمقارنة أسعار المنتجات في السعودية، الإمارات، الكويت، قطر، البحرين ومصر. ابحث عن أي منتج وقارن بين المتاجر ووفر فلوسك.",

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
  ],

icons: {
  icon: "/favicon-v2.ico",
  shortcut: "/favicon-v2.ico",
  apple: "/og-image.png",
},

  openGraph: {
    title: "BPS Chat | بي بي اس شات - قارن الأسعار ووفر فلوسك",
    description:
      "بي بي اس شات (BPS Chat) يساعدك تبحث عن المنتجات وتقارن الأسعار بين المتاجر في السعودية والخليج ومصر بسهولة.",
    url: "https://www.bpschat.com",
    siteName: "BPS Chat | بي بي اس شات",
    images: [
      {
        url: "/og-image.png",
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
  images: ["/og-image.png"],
},
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
          alternateName: "بي بي اس شات",
          url: "https://www.bpschat.com",
          logo: "https://www.bpschat.com/logo-icon.png",
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
        },
      ],
    }),
  }}
/>
</head>

      <body className="min-h-full flex flex-col">
        <Navbar />
        
        {children}
        <Analytics />
        <SpeedInsights />
        
      </body>
    </html>
  );
}