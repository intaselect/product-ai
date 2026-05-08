import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        url: "/logo-icon.png",
        width: 512,
        height: 512,
        alt: "BPS Chat Logo",
      },
    ],
    locale: "ar_AR",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
