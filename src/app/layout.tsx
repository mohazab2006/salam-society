import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
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
    "Ottawa mosque programs",
    "Muslim programs Ontario",
  ],
  authors: [{ name: "Salam Society" }],
  openGraph: {
    siteName: "Salam Society",
    locale: "en_CA",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-black">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
