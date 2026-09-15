import HomePage from "./HomePage";
import { getTestimonials } from "@/lib/testimonials";

export const revalidate = 3600;

export default async function HomeRoute() {
  return <HomePage testimonials={await getTestimonials()} />;
}
