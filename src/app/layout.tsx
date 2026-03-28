import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { getRequestSiteOrigin } from "@/lib/request-site-origin";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function buildJsonLd(baseUrl: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "Salam Society",
      alternateName: "Salam Society Canada",
      url: baseUrl,
      logo: `${baseUrl}/images/logo-orange.png`,
      image: `${baseUrl}/images/hero-bg.jpg`,
      description:
        "Crafting a space for Muslim youth to confidently embrace their identity. Events, programs, and community initiatives in Ottawa, Ontario.",
      foundingLocation: {
        "@type": "Place",
        name: "Ottawa, Ontario, Canada",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ottawa",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      areaServed: [
        { "@type": "City", name: "Ottawa" },
        { "@type": "AdministrativeArea", name: "Ontario" },
      ],
      email: "SalamSocietyCanada@gmail.com",
      knowsLanguage: ["en", "fr"],
      sameAs: [
        "https://www.instagram.com/salamsociety.ca",
        "https://chat.whatsapp.com/Bdwcs9euaZI3UnfKDrhtHL",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Salam Society",
      url: baseUrl,
      description: "Muslim community events, programs, and initiatives in Ottawa.",
      inLanguage: ["en", "fr"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/events?category={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = await getRequestSiteOrigin();
  const metadataBase = new URL(BASE_URL);
  const ogImage = new URL("/opengraph-image", metadataBase).href;

  return {
    metadataBase,
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
          url: ogImage,
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
      images: [ogImage],
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

    verification: {},
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const baseUrl = await getRequestSiteOrigin();
  const jsonLd = buildJsonLd(baseUrl);
  const ogLogoUrl = new URL("/images/clear-logo.png", baseUrl).href;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* OG expects property= not name= (metadata.other would be wrong). */}
        <meta property="og:logo" content={ogLogoUrl} />
        <link rel="preconnect" href="https://xcnkiwizosklxgsasksc.supabase.co" />
        <link rel="dns-prefetch" href="https://xcnkiwizosklxgsasksc.supabase.co" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Ottawa, Ontario, Canada" />
        <meta name="geo.position" content="45.4215;-75.6972" />
        <meta name="ICBM" content="45.4215, -75.6972" />

        <meta httpEquiv="content-language" content="en, fr" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-white text-black">
        {/* Must run before paint / scroll restore — useEffect in a client component is too late (orange logo on hero). */}
        <Script
          id="scroll-restoration-manual"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "try{history.scrollRestoration='manual'}catch(e){}",
          }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
