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
  title: "Tsvetan Georgiev - Professional Video Editor | @DinamixoBG",
  description: "Transform your footage into scroll-stopping content. Professional video editing services for YouTube, Reels, TikToks, and more. Get viral-ready content that boosts engagement.",
  keywords: "video editing, YouTube editor, content creator, video production, DinamixoBG, Tsvetan Georgiev",
  openGraph: {
    title: "Tsvetan Georgiev - Professional Video Editor",
    description: "Transform your footage into scroll-stopping content",
    url: "https://dinamixobg.com",
    siteName: "@DinamixoBG Portfolio",
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
    title: 'Tsvetan Georgiev - Professional Video Editor',
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
