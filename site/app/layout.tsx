import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { CalendarModalProvider } from "@/components/CalendarModal";
import ScrollRestorer from "@/components/ScrollRestorer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://successfulbob.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Successfulbob LLC | Go to Market Strategy for Technical Startups",
    template: "%s | Successfulbob",
  },
  description:
    "Successfulbob LLC helps technical startups turn product depth into clear market stories, stronger demos, partner messaging, and go to market strategy the team can repeat.",
  keywords: [
    "go to market strategy for startups",
    "technical product marketing",
    "GTM consultant",
    "startup GTM",
    "product messaging framework",
    "partner enablement",
    "Bob Hart",
    "Successfulbob",
  ],
  authors: [{ name: "Robert \"Bob\" Hart", url: `${SITE_URL}/about` }],
  creator: "Successfulbob LLC",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Successfulbob LLC",
    title: "Successfulbob LLC | Go to Market Strategy for Technical Startups",
    description:
      "Turn product depth into a market story buyers, sales teams, partners, and executives can understand, trust, and repeat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Successfulbob LLC | Go to Market Strategy for Technical Startups",
    description:
      "Turn product depth into a market story buyers, sales teams, partners, and executives can understand, trust, and repeat.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061126",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: "Successfulbob LLC",
      url: SITE_URL,
      description:
        "Go to market strategy, product messaging, demo coaching, partner enablement, and executive narrative for technical startups.",
      founder: { "@id": `${SITE_URL}/#person` },
      email: "bob@successfulbob.com",
      areaServed: "Worldwide",
      sameAs: [],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Robert Hart",
      alternateName: "Bob Hart",
      jobTitle: "Founder & Technical GTM Advisor",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/about`,
      email: "bob@successfulbob.com",
      knowsAbout: [
        "Go to market strategy",
        "Technical product marketing",
        "Partner enablement",
        "Executive narrative",
        "Demo coaching",
        "Field CTO",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Successfulbob",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <CalendarModalProvider>
            <ScrollRestorer />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CalendarModalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
