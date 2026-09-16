import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { CalendarModalProvider } from "@/components/CalendarModal";
import ScrollRestorer from "@/components/ScrollRestorer";
import { UtmProvider } from "@/components/UtmProvider";
import { ConsentProvider } from "@/components/ConsentProvider";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://successfulbob.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Successfulbob LLC | GTM Help for Technical Companies",
    template: "%s | Successfulbob",
  },
  description:
    "Successfulbob helps technical companies diagnose GTM problems and move forward with senior counsel, hands-on support, and fractional leadership.",
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
    title: "Successfulbob LLC | GTM Help for Technical Companies",
    description:
      "Turn product depth into a market story buyers, sales teams, partners, and executives can understand, trust, and repeat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Successfulbob LLC | GTM Help for Technical Companies",
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

/* Consent Mode v2 bootstrap. Must exist before gtag.js executes, and gtag.js is
   loaded by a client component, so this lives here as a server-rendered inline
   script: it runs during document parse, ahead of any bundle. next/script's
   beforeInteractive cannot do this job — it is only supported in the root
   layout as a component, and rendering it from a nested client component makes
   React log an error and skip execution on client-side navigations. */
const consentBootstrap = `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('js',new Date());`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script dangerouslySetInnerHTML={{ __html: consentBootstrap }} />
        )}
        {/* ConsentProvider is outermost so the banner, the footer link and the
            privacy page can all read and change the choice. */}
        <ConsentProvider>
          <UtmProvider>
            <MotionProvider>
              <CalendarModalProvider>
                <ScrollRestorer />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </CalendarModalProvider>
            </MotionProvider>
            <Analytics />
            <CookieBanner />
          </UtmProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
