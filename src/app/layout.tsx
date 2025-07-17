import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://editing.bg' : 'http://localhost:3000'),
  title: "editing.bg",
  description: "Transform your footage into scroll-stopping content. Professional video editing services for YouTube, Reels, TikToks, and more. Get viral-ready content that boosts engagement.",
  keywords: "video editing, YouTube editor, content creator, video production, DinamixoBG, Tsvetan Georgiev",
  icons: {
    icon: '/32x32logo.png',
    shortcut: '/32x32logo.png',
    apple: '/32x32logo.png',
  },
  openGraph: {
    title: "editing.bg",
    description: "Transform your footage into scroll-stopping content",
    url: "https://dinamixobg.com",
    siteName: "editing.bg",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tsvetan Georgiev - Video Editor Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'editing.bg',
    description: 'Transform your footage into scroll-stopping content',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className="scroll-smooth">
      <head>
        <link rel="preload" href="/Editing.png" as="image" />
        <link rel="preload" href="/32x32logo.png" as="image" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
