import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: { absolute: "Contact Bob Hart | Successfulbob LLC" },
  description:
    "Contact Robert \"Bob\" Hart at Successfulbob LLC to discuss Production Ready, advisory work, technical GTM strategy, speaking, interviews, podcasts, or other opportunities.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Bob Hart | Successfulbob LLC",
    description:
      "Schedule a 30-minute fit call or email bob@successfulbob.com to discuss Production Ready, GTM Support, speaking, or interviews.",
    url: "/contact",
    images: ["/opengraph-image"],
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
