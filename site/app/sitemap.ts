import type { MetadataRoute } from "next";
import { workshopsListed } from "@/lib/siteVisibility";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { allPostSlugsQuery, activeWorkshopExistsQuery } from "@/lib/queries";

const SITE_URL = "https://successfulbob.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/production-ready`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/advisory-work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/insights`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  if (!isSanityConfigured) return staticEntries;

  // A CMS outage must degrade to the static entries, not turn /sitemap.xml
  // into a 500 — Search Console treats an unfetchable sitemap as an error
  // against the whole site.
  let slugs: { slug: string }[] = [];
  let hasWorkshop = false;
  try {
    [slugs, hasWorkshop] = await Promise.all([
      sanityClient.fetch<{ slug: string }[]>(allPostSlugsQuery),
      sanityClient.fetch<boolean>(activeWorkshopExistsQuery),
    ]);
  } catch {
    return staticEntries;
  }

  // Only advertise /workshops when a workshop is actually selected. Without a
  // live one the route renders a noindex placeholder, which should not be in
  // the sitemap. Weekly, because seat status changes during a selling window.
  const workshopEntries: MetadataRoute.Sitemap = hasWorkshop && workshopsListed
    ? [{ url: `${SITE_URL}/workshops`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 }]
    : [];

  const articleEntries: MetadataRoute.Sitemap = (slugs ?? []).map((s) => ({
    url: `${SITE_URL}/insights/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...workshopEntries, ...articleEntries];
}
