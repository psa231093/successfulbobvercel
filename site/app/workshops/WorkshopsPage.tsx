"use client";

import Image from "next/image";
import { SectionLabel, AccentBar, PointerGlow, GhostButtonInline, OutlineButton } from "@/components/Primitives";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";
import FAQAccordion from "@/components/FAQAccordion";
import RichText from "@/components/RichText";
import TrackedCta from "@/components/TrackedCta";
import VideoFacade from "@/components/VideoFacade";
import WorkshopHero from "./WorkshopHero";
import OverflowSection from "./OverflowSection";
import { youTubeIdFrom, type Workshop, type WorkshopView } from "@/lib/workshop";
import { useMobileReveal } from "@/lib/useMobileReveal";

/* Section order and backgrounds.

   Backgrounds alternate white -> soft -> dark and never place two dark sections
   next to each other. The two conditional sections (second session, testimonials)
   are positioned so the sequence stays valid whether or not they render:
   pricing(soft) -> [overflow(dark)] -> credit(white) works either way, and
   faq(soft) -> [testimonials(white)] -> final(dark) does too.

   Every section guards on its own data, so a half-filled workshop renders a
   shorter page rather than an empty one. */

function Section({
  id,
  tone = "white",
  density = "normal",
  flushTop = false,
  children,
  className,
}: {
  id?: string;
  tone?: "white" | "soft" | "dark" | "midnight";
  density?: "normal" | "compact";
  /* Drops the top padding for a section that directly follows another section
     of the same tone, where two full paddings would read as one huge gap. */
  flushTop?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const bg =
    tone === "soft" ? "bg-[#f5f7fb]" : tone === "dark" ? "bg-[#061126] text-white" : tone === "midnight" ? "bg-[#0B1734] text-white" : "bg-white";
  const padding =
    density === "compact"
      ? flushTop
        ? "pt-0 pb-14 md:pb-20"
        : "py-14 md:py-20"
      : flushTop
        ? "pt-0 pb-20 md:pb-28"
        : "py-20 md:py-28";
  return (
    <section id={id} className={`${padding} ${bg} ${className ?? ""}`}>
      {children}
    </section>
  );
}

function ShowMoreToggle({
  expanded,
  remaining,
  onClick,
  dark,
}: {
  expanded: boolean;
  remaining: number;
  onClick: () => void;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`md:hidden mt-5 flex items-center gap-1.5 text-[13.5px] font-semibold ${
        dark ? "text-[#9db4ff]" : "text-[#3f6bff]"
      }`}
    >
      {expanded ? "Show less" : `Show ${remaining} more`}
      <svg
        className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

function Heading({
  eyebrow,
  children,
  dark,
}: {
  eyebrow?: string | null;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <AnimateIn>
      {eyebrow &&
        (dark ? (
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-3">{eyebrow}</p>
        ) : (
          <SectionLabel>{eyebrow}</SectionLabel>
        ))}
      <AccentBar />
      <h2
        className={`text-[26px] md:text-[36px] font-bold mb-6 leading-[1.2] tracking-[-0.01em] ${
          dark ? "text-white" : "text-[#111827]"
        }`}
      >
        {children}
      </h2>
    </AnimateIn>
  );
}

// Sanity returns [] for an array field the editor emptied, and [] is truthy,
// so a bare `w.problemBody` guard renders a section around nothing.
function hasBlocks(v: unknown): boolean {
  return Array.isArray(v) && v.length > 0;
}

export default function WorkshopsPage({ workshop, view }: { workshop: Workshop; view: WorkshopView }) {
  const w = workshop;
  // Null for a missing or unparseable URL, which removes the section entirely.
  // "Works without the video" is a property of the structure, not a promise.
  const videoId = youTubeIdFrom(w.videoUrl);

  // Long lists collapse to a couple of items on mobile with a "show more"
  // toggle. Every item stays in the DOM (hidden via CSS, not omitted), so
  // this never affects SEO or no-JS rendering.
  const notForReveal = useMobileReveal(w.notFor?.length ?? 0, 2);
  const agendaReveal = useMobileReveal(w.agenda?.length ?? 0, 2);

  return (
    <>
      <WorkshopHero w={w} view={view} />

      {/* -- 2. Free previews (white) -- */}
      {view.showPreviews && w.previews?.length ? (
        <Section id="previews">
          <div className="max-w-4xl mx-auto px-6">
            <Heading eyebrow={w.previewEyebrow}>{w.previewHeadline ?? "Join a free preview"}</Heading>
            {w.previewBody && (
              <AnimateIn delay={0.05}>
                <p className="text-[16px] md:text-[17px] text-[#526078] leading-[1.8] mb-10 max-w-2xl">
                  {w.previewBody}
                </p>
              </AnimateIn>
            )}

            <Stagger className="grid sm:grid-cols-2 gap-5 items-stretch" stagger={0.08}>
              {w.previews.map((p, i) => (
                // Both fields are nullable mid-authoring; the index suffix keeps
                // two half-filled previews from colliding on the same key.
                <StaggerItem key={`${p.registrationUrl ?? p.dateDisplay ?? "preview"}-${i}`} className="h-full">
                  <div className="relative h-full flex flex-col rounded-2xl p-6 bg-white border border-[#e5e7eb]">
                    <PointerGlow />
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#3f6bff] mb-2">
                      {p.priceLabel ?? "Free"}
                    </p>
                    <p className="text-[17px] font-bold text-[#111827] leading-snug mb-1">{p.dateDisplay}</p>
                    {p.timeDisplay && <p className="text-[14px] text-[#526078] mb-5">{p.timeDisplay}</p>}
                    <div className="mt-auto">
                      {p.registrationUrl && (
                        <TrackedCta
                          variant="outline"
                          cta={{
                            kind: "external",
                            label: "Save my spot",
                            href: p.registrationUrl,
                            track: "preview_cta_click",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {w.previewDisclaimer && (
              <AnimateIn delay={0.1}>
                <p className="mt-6 text-[13.5px] text-[#9ca3af] leading-[1.7]">{w.previewDisclaimer}</p>
              </AnimateIn>
            )}
          </div>
        </Section>
      ) : null}

      {/* -- Video (white). Conditional. White deliberately: it can end up next
             to the dark hero (previews hidden in closed/next-cohort) or next to
             the dark what-you-do section (problem empty), and only a light tone
             keeps the no-adjacent-dark rule true in every combination.
             When the previews section (also white) renders above it, the top
             padding collapses so the two read as one continuous block instead
             of being separated by two stacked section paddings. -- */}
      {videoId && (
        <Section flushTop={Boolean(view.showPreviews && w.previews?.length)}>
          <div className="max-w-4xl mx-auto px-6">
            <AnimateIn>
              <VideoFacade
                videoId={videoId}
                title={w.videoTitle}
                poster={w.videoPoster?.url ?? null}
                posterAlt={w.videoPoster?.alt ?? null}
                duration={w.videoDuration}
              />
            </AnimateIn>
            {w.videoCaption && (
              <AnimateIn delay={0.06}>
                <p className="mt-5 text-center text-[14px] text-[#9ca3af] leading-[1.7]">{w.videoCaption}</p>
              </AnimateIn>
            )}
          </div>
        </Section>
      )}

      {/* -- 3. The problem (soft) -- */}
      {(w.problemHeadline || hasBlocks(w.problemBody)) && (
        <Section tone="soft">
          <div className="relative max-w-3xl mx-auto px-6">
            <Heading eyebrow={w.problemEyebrow}>{w.problemHeadline}</Heading>
            <AnimateIn delay={0.05}>
              <RichText value={w.problemBody} />
            </AnimateIn>
            {w.problemPullQuote && (
              <AnimateIn delay={0.1}>
                <blockquote className="mt-8 pl-5 border-l-[3px] border-[#3f6bff] text-[18px] md:text-[20px] font-semibold text-[#111827] leading-[1.5]">
                  {w.problemPullQuote}
                </blockquote>
              </AnimateIn>
            )}
          </div>
        </Section>
      )}

      {/* -- 4. What you will do + what you leave with, merged (dark).
             Previously two full sections of stacked cards; combined into one
             two-column read (sequential steps left, checklist right) so the
             "do this / get this" promise reads as one idea instead of two
             back-to-back card grids. Uses only the existing whatYouDo* and
             outcomes* fields -- outcomesHeadline becomes the right column's
             sub-label rather than a second H2. -- */}
      {w.whatYouDoItems?.length || w.outcomes?.length ? (
        <Section tone="midnight">
          <div className="relative max-w-4xl mx-auto px-6">
            <Heading eyebrow={w.whatYouDoEyebrow} dark>
              {w.whatYouDoHeadline ?? "What you will do"}
            </Heading>
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 mt-10">
              {/* The right column runs taller (more items, longer descriptions,
                  plus its eyebrow label), so on desktop the steps distribute
                  across the full row height rather than bunching at the top
                  above a block of dead space. */}
              {w.whatYouDoItems?.length ? (
                <Stagger className="space-y-5 md:space-y-0 md:flex md:flex-col md:justify-between" stagger={0.07}>
                  {w.whatYouDoItems.map((item, i) => (
                    <StaggerItem key={item.title ?? i}>
                      <div className="flex items-start gap-3.5">
                        <span
                          className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold text-white"
                          style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="text-[15px] font-bold text-white mb-1 leading-snug">{item.title}</h3>
                          {item.description && (
                            <p className="text-[14px] text-white/55 leading-[1.65]">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : null}

              {w.outcomes?.length ? (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9db4ff] mb-4">
                    {w.outcomesHeadline ?? "What you will leave with"}
                  </p>
                  <Stagger className="space-y-4" stagger={0.07}>
                    {w.outcomes.map((o, i) => (
                      <StaggerItem key={o.title ?? i}>
                        <div className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full mt-0.5"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                          >
                            <svg className="w-3.5 h-3.5 text-[#9db4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <div>
                            <h3 className="text-[15px] font-bold text-white mb-1 leading-snug">{o.title}</h3>
                            {o.description && (
                              <p className="text-[14px] text-white/55 leading-[1.65]">{o.description}</p>
                            )}
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ) : null}
            </div>
          </div>
        </Section>
      ) : null}

      {/* -- 5. Who it is for (soft). Roles render as a horizontal strip with
             hairline dividers rather than another card grid, so the page
             isn't seven consecutive sections of the same bordered-card
             recipe. -- */}
      {(w.audienceRoles?.length || w.audienceIntro) && (
        <Section tone="soft">
          <div className="relative max-w-4xl mx-auto px-6">
            <Heading eyebrow={w.audienceEyebrow}>{w.audienceHeadline ?? "Who it is for"}</Heading>
            {w.audienceIntro && (
              <AnimateIn delay={0.05}>
                <p className="text-[16px] md:text-[17px] text-[#526078] leading-[1.8] mb-10 max-w-2xl">
                  {w.audienceIntro}
                </p>
              </AnimateIn>
            )}
            {w.audienceRoles?.length ? (
              <Stagger className="grid sm:grid-cols-3 gap-8 sm:gap-6" stagger={0.09}>
                {w.audienceRoles.map((r, i) => (
                  <StaggerItem key={r.role ?? ""}>
                    <div className={i > 0 ? "sm:pl-6 sm:border-l sm:border-[#e5e7eb]" : ""}>
                      <h3 className="text-[15px] font-bold text-[#111827] mb-2">{r.role}</h3>
                      <p className="text-[14px] text-[#526078] leading-[1.7]">{r.reason}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}
          </div>
        </Section>
      )}

      {/* -- 6. Who it is not for (white) -- */}
      {w.notFor?.length ? (
        <Section density="compact">
          <div className="max-w-3xl mx-auto px-6">
            <Heading>{w.notForHeadline ?? "Who it is not for"}</Heading>
            <Stagger className="space-y-3 mt-8" stagger={0.06}>
              {w.notFor.map((n, i) => (
                <StaggerItem key={n} className={notForReveal.isMobileHidden(i) ? "hidden md:block" : ""}>
                  <div className="flex gap-3.5 items-start">
                    <span
                      className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full mt-0.5"
                      style={{ background: "rgba(248,113,113,0.10)" }}
                    >
                      <svg className="w-3.5 h-3.5 text-[#f87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <p className="text-[15.5px] text-[#526078] leading-[1.7]">{n}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            {notForReveal.hasMore && (
              <ShowMoreToggle
                expanded={notForReveal.expanded}
                remaining={notForReveal.remaining}
                onClick={notForReveal.toggle}
              />
            )}
          </div>
        </Section>
      ) : null}

      {/* -- 7. Format and agenda (dark) -- */}
      {(w.agenda?.length || w.formatSummary) && (
        <Section tone="midnight">
          <div className="max-w-3xl mx-auto px-6">
            <Heading eyebrow={w.formatEyebrow} dark>
              {w.formatHeadline ?? "Format"}
            </Heading>
            {w.formatSummary && (
              <AnimateIn delay={0.05}>
                <p className="text-[16px] md:text-[17px] text-white/65 leading-[1.8] mb-3 max-w-2xl">
                  {w.formatSummary}
                </p>
              </AnimateIn>
            )}
            {w.platformNote && (
              <AnimateIn delay={0.08}>
                <p className="text-[14px] text-white/40 mb-10">{w.platformNote}</p>
              </AnimateIn>
            )}

            {w.agenda?.length ? (
              <Stagger className="space-y-0" stagger={0.08}>
                {w.agenda.map((a, i) => {
                  const hiddenOnMobile = agendaReveal.isMobileHidden(i);
                  // The connector line trails from this item toward the next.
                  // If this item is visible but the next one is collapsed,
                  // the line has nothing to point to on mobile -- hide just
                  // that segment rather than leaving it dangling.
                  const lineHiddenOnMobile = !hiddenOnMobile && agendaReveal.isMobileHidden(i + 1);
                  return (
                    <StaggerItem key={a.title ?? i} className={hiddenOnMobile ? "hidden md:block" : ""}>
                      <div className="relative flex gap-5 pb-8 last:pb-0">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <span
                            className="w-3 h-3 rounded-full mt-1.5"
                            style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                          />
                          {i < (w.agenda?.length ?? 0) - 1 && (
                            <span
                              className={`w-px flex-1 mt-2 ${lineHiddenOnMobile ? "hidden md:block" : ""}`}
                              style={{ background: "rgba(255,255,255,0.12)" }}
                            />
                          )}
                        </div>
                        <div className="pb-2">
                          {a.time && (
                            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9db4ff] mb-1.5">
                              {a.time}
                            </p>
                          )}
                          <h3 className="text-[16.5px] font-bold text-white mb-1.5 leading-snug">{a.title}</h3>
                          {a.description && (
                            <p className="text-[14.5px] text-white/60 leading-[1.7] max-w-xl">{a.description}</p>
                          )}
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            ) : null}
            {agendaReveal.hasMore && (
              <ShowMoreToggle
                expanded={agendaReveal.expanded}
                remaining={agendaReveal.remaining}
                onClick={agendaReveal.toggle}
                dark
              />
            )}
          </div>
        </Section>
      )}

      {/* -- 8. Pre-work and follow-up (white). Left-border accent instead of
             full bordered cards -- a lighter, distinct treatment from the
             card-grid sections elsewhere on the page. -- */}
      {(w.preWorkBody || w.followUpBody) && (
        <Section density="compact">
          <div className="max-w-4xl mx-auto px-6">
            <Stagger className="grid md:grid-cols-2 gap-8 md:gap-10" stagger={0.09}>
              {w.preWorkBody && (
                <StaggerItem>
                  <div className="border-l-[3px] border-[#3f6bff] pl-5">
                    <h3 className="text-[16px] font-bold text-[#111827] mb-2">
                      {w.preWorkHeadline ?? "Pre-work"}
                    </h3>
                    <p className="text-[14.5px] text-[#526078] leading-[1.75]">{w.preWorkBody}</p>
                  </div>
                </StaggerItem>
              )}
              {w.followUpBody && (
                <StaggerItem>
                  <div className="border-l-[3px] border-[#8b5cf6] pl-5">
                    <h3 className="text-[16px] font-bold text-[#111827] mb-2">
                      {w.followUpHeadline ?? "Follow-up"}
                    </h3>
                    <p className="text-[14.5px] text-[#526078] leading-[1.75]">{w.followUpBody}</p>
                  </div>
                </StaggerItem>
              )}
            </Stagger>
          </div>
        </Section>
      )}

      {/* -- 9. Pricing and seat rules (soft) -- */}
      {(w.seatRules?.length || w.refundPolicy) && (
        <Section tone="soft">
          <div className="relative max-w-4xl mx-auto px-6">
            <Heading eyebrow={w.pricingEyebrow}>{w.pricingHeadline ?? "Pricing and seats"}</Heading>

            <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-6 items-start mt-10">
              {w.primarySession && (
                <AnimateIn>
                  <div className="relative rounded-2xl p-7 bg-[#061126] text-white" style={{ border: "1px solid rgba(63,107,255,0.4)", boxShadow: "0 20px 50px rgba(63,107,255,0.18)" }}>
                    <PointerGlow color="139,92,246" strength={0.16} />
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9db4ff] mb-3">
                      {w.primarySession.label ?? "The workshop"}
                    </p>
                    <div className="flex items-baseline gap-1 mb-5 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <span
                        className="text-[38px] font-bold bg-clip-text text-transparent leading-none"
                        style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
                      >
                        {w.primarySession.priceDisplay}
                      </span>
                      <span className="text-[15px] text-white/45">per seat</span>
                    </div>
                    <p className="text-[14px] text-white/60 leading-[1.7]">
                      {[w.primarySession.dateDisplay, w.primarySession.timeDisplay].filter(Boolean).join(" · ")}
                    </p>
                    {/* Informational only -- deliberately no button here.
                        The page already offers two reserve CTAs (hero and
                        the final block); repeating a third here just for
                        this card was redundant with both. */}
                  </div>
                </AnimateIn>
              )}

              <AnimateIn delay={0.08}>
                <div className="space-y-3">
                  {w.seatRules?.map((rule) => (
                    <div key={rule} className="flex gap-3 items-start">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                      />
                      <p className="text-[15px] text-[#526078] leading-[1.7]">{rule}</p>
                    </div>
                  ))}
                  {w.refundPolicy && (
                    <div className="pt-4 mt-4 border-t border-[#e5e7eb]">
                      <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#3f6bff] mb-2">
                        Refunds
                      </p>
                      <p className="text-[15px] text-[#526078] leading-[1.7]">{w.refundPolicy}</p>
                    </div>
                  )}
                </div>
              </AnimateIn>
            </div>
          </div>
        </Section>
      )}

      {/* -- Second session (dark). Conditional; the sequence stays valid without it. -- */}
      <OverflowSection w={w} view={view} />

      {/* -- 11. Assessment credit (white) -- */}
      {w.assessmentCreditBody && (
        <Section density="compact">
          <div className="max-w-3xl mx-auto px-6">
            <div className="relative rounded-2xl p-8 md:p-10 bg-[#f5f7fb] border border-[#e5e7eb]">
              <PointerGlow />
              <h2 className="text-[22px] md:text-[28px] font-bold text-[#111827] mb-4 leading-[1.25]">
                {w.assessmentCreditHeadline ?? "Your fee is credited"}
              </h2>
              <p className="text-[16px] text-[#526078] leading-[1.8] mb-6">{w.assessmentCreditBody}</p>
              {w.assessmentCreditHref && (
                <div className="sm:max-w-[240px]">
                  <OutlineButton href={w.assessmentCreditHref}>
                    {w.assessmentCreditLinkLabel ?? "See the Assessment"}
                  </OutlineButton>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* -- 12. Credibility (dark) --
             Asymmetric photo + bio, not another stacked card grid: this is the
             one section on the page that is inherently about a single person,
             so it is the natural place to break the repeated grid-of-cards
             rhythm used everywhere else. Falls back to the text-only layout
             when no photo is uploaded, so it never renders an empty frame. -- */}
      {(hasBlocks(w.bobBody) || w.bobHeadline) && (
        <Section tone="midnight">
          <div className="max-w-4xl mx-auto px-6">
            <div className={w.bobPhoto?.url ? "grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-12 items-center" : ""}>
              {w.bobPhoto?.url && (
                <AnimateIn>
                  <div
                    className="relative w-full max-w-[280px] md:max-w-none mx-auto aspect-[4/5] rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(63,107,255,0.28)", boxShadow: "0 24px 60px rgba(2,8,23,0.35)" }}
                  >
                    <Image
                      src={w.bobPhoto.url}
                      alt={w.bobPhoto.alt ?? w.bobHeadline ?? "Photo"}
                      fill
                      sizes="(max-width: 768px) 280px, 360px"
                      className="object-cover"
                    />
                  </div>
                </AnimateIn>
              )}

              <div>
                <Heading eyebrow={w.bobEyebrow} dark>
                  {w.bobHeadline ?? "Who runs it"}
                </Heading>
                <AnimateIn delay={0.05}>
                  <div className={w.bobPhoto?.url ? "" : "max-w-2xl"}>
                    <RichText value={w.bobBody} tone="dark" />
                  </div>
                </AnimateIn>
                {w.bobStats?.length ? (
                  <Stagger className="flex flex-wrap gap-x-12 gap-y-6 mt-10" stagger={0.08}>
                    {w.bobStats.map((s) => (
                      <StaggerItem key={s.label ?? ""}>
                        <div>
                          <p
                            className="text-[34px] font-bold bg-clip-text text-transparent leading-none mb-1.5"
                            style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
                          >
                            {s.value}
                          </p>
                          <p className="text-[13px] text-white/45">{s.label}</p>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                ) : null}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* -- 13. FAQs (soft) -- */}
      {w.faqs?.length ? (
        <FAQAccordion faqs={w.faqs} headline={w.faqHeadline ?? "Common questions"} background="soft" />
      ) : null}

      {/* -- 14. Testimonials (white). Hidden until there is at least one. -- */}
      {w.testimonials?.length ? (
        <Section>
          <div className="max-w-5xl mx-auto px-6">
            <Heading eyebrow="From past cohorts">What participants said</Heading>
            <Stagger className="grid md:grid-cols-2 gap-5 items-stretch mt-10" stagger={0.09}>
              {w.testimonials.map((t) => (
                <StaggerItem key={`${t.name}-${t.quote?.slice(0, 20)}`} className="h-full">
                  <figure className="relative h-full rounded-2xl p-7 bg-white border border-[#e5e7eb] flex flex-col">
                    <PointerGlow />
                    <div className="w-8 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5" />
                    <blockquote className="text-[16px] text-[#111827] leading-[1.7] mb-5 flex-1">
                      {t.quote}
                    </blockquote>
                    <figcaption className="text-[14px] text-[#526078]">
                      <span className="font-semibold text-[#111827]">{t.name}</span>
                      {(t.role || t.company) && (
                        <span>, {[t.role, t.company].filter(Boolean).join(", ")}</span>
                      )}
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Section>
      ) : null}

      {/* -- 15. Final registration block (dark) -- */}
      <Section tone="dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.015em] mb-5">
            {/* closedMessage is copy authored for the closed state; the other
                fit-call path here is sold-out-with-no-second-session, which is
                full, not closed, and saying "closed" beneath a "sold out" hero
                would contradict it. */}
            {view.finalBlock === "next-cohort"
              ? w.nextCohortHeadline ?? "The next cohort"
              : view.finalBlock === "fit-call"
                ? view.state === "closed"
                  ? w.closedMessage ?? "Registration is closed"
                  : "This cohort is full. Let's talk about the next one."
                : w.finalBlockHeadline ?? "Reserve your seat"}
          </h2>

          {view.finalBlock === "next-cohort" && w.nextCohortDateDisplay && (
            <p className="text-[16px] text-white/60 leading-[1.7] mb-8">{w.nextCohortDateDisplay}</p>
          )}

          {view.finalBlock !== "fit-call" && view.finalBlock !== "next-cohort" && w.finalBlockBody && (
            <p className="text-[16px] md:text-[17px] text-white/60 leading-[1.7] mb-8 max-w-xl mx-auto">
              {w.finalBlockBody}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCta cta={view.primaryCta} fitCallIcon={view.primaryCta.kind === "fit-call"} />
            {view.showPreviews && w.previews?.length ? (
              <GhostButtonInline href="#previews">Join a free preview</GhostButtonInline>
            ) : null}
          </div>

          {view.seatLine && (
            <p className="mt-6 text-[13px] text-white/40">
              {view.seatLine}
              {view.seatAsOf ? ` (as of ${view.seatAsOf})` : ""}
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
