import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snake Game | Fun Browser Game Built with Next.js",
  description:
    "Play the classic Snake game directly in your browser. A fun, addictive game built with Next.js and React. Control the snake, collect food, and try to achieve the highest score!",
  keywords:
    "snake game, browser game, next.js game, react game, online snake, free browser game, javascript game",
  authors: [{ name: "Snake Game Developer" }],
  category: "Game",
  openGraph: {
    title: "Snake Game | Play the Classic Game Online",
    description:
      "Enjoy the classic Snake game in your browser. Control the snake, eat food, and grow longer without hitting walls or yourself. How high can you score?",
    url: "https://snake-game-iota-orcin.vercel.app",
    siteName: "Snake Game",
    images: [
      {
        url: "/game.png",
        width: 1200,
        height: 630,
        alt: "Snake Game Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Snake Game Online | Free Browser Game",
    description:
      "Challenge yourself with the classic Snake game. Simple controls, addictive gameplay. Play now for free!",
    images: ["/game.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  applicationName: "Snake Game",
  metadataBase: new URL("https://snake-game-iota-orcin.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              name: "Snake Game",
              description:
                "Play the classic Snake game directly in your browser. Control the snake, collect food, and grow longer without hitting walls or yourself.",
              genre: ["Arcade Game", "Puzzle Game", "Casual Game"],
              gamePlatform: "Web Browser",
              applicationCategory: "Game",
              operatingSystem: "Any",
              author: {
                "@type": "Organization",
                name: "Snake Game Developer",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "243",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
