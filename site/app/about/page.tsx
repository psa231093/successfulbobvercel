import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: { absolute: "About Bob Hart | Founder of Successfulbob LLC" },
  description:
    "Robert \"Bob\" Hart is the founder of Successfulbob LLC and a technical GTM advisor with experience across Field CTO, product marketing, partner enablement, executive narrative, and enterprise technology.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Bob Hart | Founder of Successfulbob LLC",
    description:
      "Technical GTM advisor with 20+ years across Field CTO work, product marketing, partner enablement, and executive narrative.",
    url: "/about",
    images: ["/opengraph-image"],
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
