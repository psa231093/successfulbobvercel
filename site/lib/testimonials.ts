import { defineQuery } from "next-sanity";
import { sanityClient, isSanityConfigured, urlFor } from "@/lib/sanity";
import initialTestimonials from "@/content/testimonials.json";

export type Testimonial = {
  _key: string;
  quote: string;
  name: string;
  role: string;
  imageUrl?: string;
};
type CmsTestimonial = Omit<Testimonial, "imageUrl"> & {
  photo?: {
    asset?: { _ref: string };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; width: number; height: number };
  };
};
export const homepageTestimonialsQuery = defineQuery(
  `*[_type == "homepageTestimonials" && _id == "homepageTestimonials"][0]{items[]{_key, quote, name, role, photo{asset, crop, hotspot}}}`,
);

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return initialTestimonials;
  // An absent singleton uses Bob's supplied quotes. An explicitly empty list
  // hides the section, so removed testimonials never reappear as fallbacks.
  let doc: { items?: CmsTestimonial[] } | null;
  try {
    doc = await sanityClient
      .withConfig({ useCdn: false })
      .fetch<{
        items?: CmsTestimonial[];
      } | null>(homepageTestimonialsQuery, {}, { next: { revalidate: 3600 } });
  } catch {
    // Keep the rest of the homepage available without reviving a quote Bob
    // might have removed. ISR will retry on a later regeneration.
    console.error("Could not load homepage testimonials from Sanity.");
    return [];
  }
  if (!doc) return initialTestimonials;
  return (doc.items ?? [])
    .filter((item) => item.quote?.trim() && item.name?.trim())
    .map((item) => ({
      _key: item._key,
      quote: item.quote,
      name: item.name,
      role: item.role ?? "",
      imageUrl: item.photo?.asset
        ? urlFor(item.photo)
            .width(640)
            .height(640)
            .fit("crop")
            .auto("format")
            .url()
        : undefined,
    }));
}
