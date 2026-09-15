# September copy refresh

## Website refresh

Bob's supplied copy is applied to Home, Production Ready, GTM Support, and About Bob. Content lives in `site/content/` with the page components rendering it. Editorial notes, field labels, and the sentence addressed to the copy editor about a “unique value proposition” are excluded from visitor-facing copy.

The existing `/advisory-work` URL remains valid and is labeled GTM Support throughout navigation and Contact. The three homepage support cards link to the relevant sections on that page.

Bob confirmed Workshops should be closed, including direct links. The local `/workshops` route now returns 404 before fetching CMS content. Navigation and sitemap omit it. Restore availability through `site/lib/siteVisibility.ts` only when a relaunch is approved. Closing the website route does not disable independently hosted Luma event URLs; registration must also be closed in Luma if those links should stop accepting bookings.

All five supplied portraits are 640 × 640 WebP images in `site/public/testimonials/`. Combined file size is 156,754 bytes, down from 9,722,394 bytes. The original PNGs in Downloads are untouched.

## Testimonials in Sanity

The new Homepage Testimonials singleton contains an ordered array of names, roles, quotes, and portrait images. Drag to reorder. Emptying the list hides the section. The carousel has previous/next buttons, person selectors, keyboard-operable controls, and horizontal touch gestures. It advances every seven seconds with a fading slide transition and a progress bar. Autoplay pauses on hover, keyboard focus, offscreen, or in a hidden tab. There is no playback button; reduced-motion users browse manually. All slides remain in the HTML; inactive slides are hidden from assistive technology.

Until the singleton exists, the local supplied quotes and optimized portraits render. Once published, the CMS list fully replaces that initial content. A failed CMS request hides testimonials rather than restoring possibly removed endorsements.

## Before publication

The website refresh is approved for a push to successfulbobvercel/main. The separate Studio deployment, initial testimonial upload, and live webhook update remain pending; no live Sanity content has been modified.

To complete the Sanity editing rollout:

1. Deploy the updated Studio schema.
2. From `studio-succesfulbob`, run `npx sanity exec scripts/seed-homepage-testimonials.js --with-user-token`. This uploads only optimized portraits and creates the initial singleton. It leaves an existing published or draft singleton untouched.
3. Add `homepageTestimonials` to the existing signed Sanity webhook filter: `_type in ["workshop", "workshopSettings", "homepageTestimonials"]`. The local handler already supports this type. Hourly revalidation works without that filter change, but immediate updates require it.
4. Verify the deployed homepage and Studio editing after the GitHub/Vercel deployment.

## Review points

The local Production Ready page uses the new $10,000 Assessment price, $95,000 Production Ready starting price, and $195,000 Complete starting price. Bob confirmed $10,000 is the new Assessment price across the board. The remaining $20,000/month prices are for Fractional GTM Leadership, a separate offer. Historical workshop CMS content is retained but no longer served by the closed website route.

The copy supplied no replacement for Insights, Privacy, or the main Contact copy. Contact offer names were updated for consistency; those pages otherwise retain their existing content.

The Sanity build currently reports local Sanity packages at 6.0.0 while its hosted auto-update runtime is 6.14.0. Local typechecking and build succeeded; verify the new editor after Studio deployment.

## Local verification

Site production build, Studio build, both TypeScript checks, focused ESLint, seed-script syntax check, and Git whitespace checks passed. All 190 non-accordion copy fields were found in rendered HTML. The eight FAQ answers were verified by opening their controls. Browser checks covered carousel arrows, wraparound, direct selection by keyboard, portrait loading, booking-modal opening and closing, and anchor navigation. No horizontal overflow was found on the four refreshed pages at 320px and 768px, with additional 390px and desktop checks. The earlier unlisted workshop behavior has been superseded by Bob’s confirmation to close direct access; verify the route returns 404 and no registration links before publication. Live CMS mutations and deployment have not been tested or performed.
