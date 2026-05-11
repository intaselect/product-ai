import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

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

  title: "BPS Chat | أفضل محرك بحث منتجات في السعودية والخليج",
  description:
    "ابحث عن أفضل المنتجات والأسعار في السعودية، الإمارات، الكويت، قطر، البحرين ومصر بسهولة.",
  keywords: [
    "بحث منتجات",
    "مقارنة أسعار",
    "أفضل أسعار",
    "منتجات السعودية",
    "منتجات الإمارات",
    "منتجات مصر",
    "BPS Chat",
  ],

  openGraph: {
    title: "BPS Chat | أفضل محرك بحث منتجات",
    description:
      "ابحث عن المنتجات وقارن الأسعار حسب الدولة بسهولة من خلال BPS Chat.",
    url: "https://www.bpschat.com",
    siteName: "BPS Chat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BPS Chat - Best Product Search",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BPS Chat | أفضل محرك بحث منتجات",
    description:
      "ابحث عن المنتجات وقارن الأسعار حسب الدولة بسهولة من خلال BPS Chat.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4886224668719787"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}