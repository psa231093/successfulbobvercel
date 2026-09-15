import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workshopsEnabled, workshopsListed } from "@/lib/siteVisibility";
import { getActiveWorkshop, buildWorkshopView } from "@/lib/workshop";
import { buildWorkshopJsonLd } from "@/lib/workshopJsonLd";
import WorkshopsPage from "./WorkshopsPage";
import WorkshopPlaceholder from "./WorkshopPlaceholder";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  if (!workshopsEnabled) {
    return {
      title: { absolute: "Page not found | Successfulbob" },
      robots: { index: false, follow: true },
    };
  }
  const w = await getActiveWorkshop();

  if (!w) {
    return {
      title: { absolute: "Workshops | Successfulbob" },
      description: "Live working sessions for technical founders and product leaders.",
      alternates: { canonical: "/workshops" },
      robots: { index: false, follow: true },
    };
  }

  const title = w.metaTitle ?? `${w.title} | Successfulbob`;
  const description = w.metaDescription ?? "";
  const image = w.ogImageUrl ?? "/opengraph-image";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/workshops" },
    robots: w.noIndex || !workshopsListed ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: "/workshops",
      images: [image],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function WorkshopsRoute() {
  // Check before fetching CMS content: a direct link must not expose the old
  // registration buttons, workshop data, or Event structured data.
  if (!workshopsEnabled) notFound();
  const workshop = await getActiveWorkshop();

  // No CMS, or nothing selected in Workshop Settings. Renders a real page
  // rather than a 404: this URL is linked from the nav, and a 404 there would
  // throw away whatever ranking the page has accumulated.
  if (!workshop) return <WorkshopPlaceholder />;

  const view = buildWorkshopView(workshop);
  const jsonLd = buildWorkshopJsonLd(workshop, view);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // The escape matters: this JSON carries CMS-authored text, and a
          // literal "</script>" inside it would terminate the tag and hand the
          // rest of the payload to the HTML parser.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <WorkshopsPage workshop={workshop} view={view} />
    </>
  );
}
