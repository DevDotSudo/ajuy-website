import type { Metadata } from "next";
import { ChatWidget } from "@/components/chat-widget";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Municipality of Ajuy", template: "%s | Municipality of Ajuy" },
  description: "Ajuy municipal information, barangays, local government, culture, attractions, maps, emergency contacts, and population data.",
  applicationName: "Municipality of Ajuy",
  category: "Government",
  icons: {
    icon: [
      { url: "/images/ajuy-seal.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/images/ajuy-seal.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/ajuy-seal.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Municipality of Ajuy",
    title: "Municipality of Ajuy",
    description: "Public information and local resources for Ajuy, Iloilo.",
    images: [{ url: "/images/ajuy-seal.png", width: 1000, height: 1000, alt: "Seal of the Municipality of Ajuy" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PH">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/ajuy-seal.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/ajuy-seal.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/ajuy-seal.png" />
        <link rel="shortcut icon" href="/images/ajuy-seal.png" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <ChatWidget />
        <ScrollReveal />
      </body>
    </html>
  );
}
