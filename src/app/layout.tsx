import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://salamsociety.ca";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Salam Society — Muslim Community in Ottawa",
    template: "%s | Salam Society",
  },
  description:
    "Crafting a space for Muslim youth to confidently embrace their identity. Events, programs, and community initiatives for the Ottawa Muslim community.",
  keywords: [
    "Salam Society",
    "Muslim community Ottawa",
    "Islamic events Ottawa",
    "Muslim youth Ottawa",
    "Ottawa Muslim youth",
    "Ottawa mosque programs",
    "Muslim programs Ontario",
    "Islamic community Ottawa",
    "halal events Ottawa",
    "Muslim organization Ottawa",
  ],
  authors: [{ name: "Salam Society" }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    siteName: "Salam Society",
    locale: "en_CA",
    type: "website",
    url: BASE_URL,
    title: "Salam Society — Muslim Community in Ottawa",
    description:
      "Crafting a space for Muslim youth to confidently embrace their identity. Events, programs, and community initiatives in Ottawa.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Salam Society — Muslim Community in Ottawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salam Society — Muslim Community in Ottawa",
    description:
      "Events, programs, and community initiatives for Muslim youth and families in Ottawa.",
    images: ["/opengraph-image"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Add your Google Search Console verification code here when you have it:
    // google: "your-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Salam Society",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo-orange.png`,
  description:
    "Crafting a space for Muslim youth to confidently embrace their identity. Events, programs, and community initiatives in Ottawa, Ontario.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: {
    "@type": "City",
    name: "Ottawa",
  },
  email: "SalamSocietyCanada@gmail.com",
  sameAs: [
    "https://www.instagram.com/salamsociety.ca",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-white text-black">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
