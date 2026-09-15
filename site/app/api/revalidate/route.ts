import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

/* Sanity webhook: publishes a content change to the live page without waiting
   for the hourly revalidation or a redeploy.

   Configure in Sanity under API / Webhooks:
     URL      https://successfulbob.com/api/revalidate
     Trigger  create, update, delete
     Filter   _type in ["workshop", "workshopSettings", "homepageTestimonials"]
     Secret   the same value as SANITY_REVALIDATE_SECRET

   revalidatePath rather than revalidateTag: the cached artifact here is the
   rendered route, produced by `export const revalidate` on the page, and there
   are no tagged fetches to invalidate. */

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  // Without a secret the signature cannot be checked, and an open revalidation
  // endpoint is a cheap way for anyone to force repeated rebuilds.
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 500 });
  }

  let parsed;
  try {
    // The third argument waits for Content Lake to become consistent. Without
    // it the regeneration can outrun the write and re-cache the old document,
    // which looks exactly like a broken webhook.
    parsed = await parseBody<{ _type?: string; _id?: string }>(req, secret, true);
  } catch {
    return NextResponse.json({ error: "Could not read the request body." }, { status: 400 });
  }

  if (parsed.isValidSignature !== true) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const type = parsed.body?._type;
  if (type === "homepageTestimonials") {
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, paths: ["/"], type });
  }
  if (type !== "workshop" && type !== "workshopSettings") {
    // Not an error: the webhook filter may be broader than this route needs.
    return NextResponse.json({ revalidated: false, reason: `Ignored type: ${type ?? "unknown"}` });
  }

  revalidatePath("/workshops");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({
    revalidated: true,
    paths: ["/workshops", "/sitemap.xml"],
    type,
  });
}
