import type { Metadata } from "next";
import AdvisoryWork from "./AdvisoryWork";

export const metadata: Metadata = {
  title: { absolute: "GTM Support | Go to Market Consultant for Technical Startups" },
  description:
    "Senior GTM counsel, hands-on project ownership, and fractional GTM leadership for technical companies.",
  alternates: { canonical: "/advisory-work" },
  openGraph: {
    title: "GTM Support | Go to Market Consultant for Technical Startups",
    description:
      "GTM Coach, GTM Partner, and Fractional GTM Leadership: the level of support that fits the problem.",
    url: "/advisory-work",
    images: ["/opengraph-image"],
  },
};

export default function AdvisoryWorkRoute() {
  return <AdvisoryWork />;
}
