import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityClient, urlFor } from "@/lib/sanity";
import { postBySlugQuery, allPostSlugsQuery } from "@/lib/queries";
import { GradientButton, GhostButton, FitCallButton } from "@/components/Primitives";
import ArticleClientShell from "./ArticleClientShell";

export const revalidate = 3600;

/* -- Types -------------------------------------------------------- */

type FaqItem = { question: string; answer: string };

type Author = {
  name: string;
  photoUrl: string | null;
  photoAlt: string | null;
  linkedinUrl: string | null;
};

type RelatedPost = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string | null;
};

type Post = {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  excerpt: string | null;
  publishedAt: string | null;
  openGraphTitle: string | null;
  openGraphDescription: string | null;
  openGraphImageUrl: string | null;
  featuredImage: { asset: { url: string }; alt: string } | null;
  body: unknown[];
  faqs: FaqItem[] | null;
  author: Author | null;
  relatedPosts: RelatedPost[] | null;
};

/* -- Static params ------------------------------------------------ */

export async function generateStaticParams() {
  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id-here";

  if (!isSanityConfigured) return [];

  const slugs = await sanityClient.fetch<{ slug: string }[]>(allPostSlugsQuery);
  return (slugs ?? []).map((s) => ({ slug: s.slug }));
}

/* -- Metadata ----------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id-here";

  if (!isSanityConfigured) {
    return {
      title: "Article Coming Soon",
      robots: { index: false, follow: true },
    };
  }

  const post = await sanityClient.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) return { title: "Not Found", robots: { index: false, follow: true } };

  const ogTitle = post.openGraphTitle ?? post.title;
  const ogDesc = post.openGraphDescription ?? post.excerpt ?? "";
  const ogImage = post.openGraphImageUrl ?? post.featuredImage?.asset?.url ?? "/opengraph-image";

  return {
    title: { absolute: `${post.title} | Successfulbob Insights` },
    description: ogDesc,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: `/insights/${slug}`,
      images: [ogImage],
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDesc, images: [ogImage] },
  };
}

/* -- Portable Text components ------------------------------------- */

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-[17px] text-[#374151] leading-[1.85]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-5 text-[26px] md:text-[30px] font-bold text-[#111827] leading-[1.2] tracking-[-0.01em]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-4 text-[20px] md:text-[22px] font-bold text-[#111827] leading-[1.25]">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-7 mb-3 text-[17px] font-bold text-[#111827]">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-5 border-l-4 border-[#3f6bff] text-[18px] italic text-[#526078] leading-[1.75]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#111827]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded text-[14px] font-mono bg-[#f3f4f6] text-[#3f6bff]">{children}</code>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith("http");
      return isExternal ? (
        <a href={value.href} target={value.blank ? "_blank" : undefined} rel="noopener noreferrer"
          className="text-[#3f6bff] underline underline-offset-3 hover:text-[#5580ff] transition-colors">
          {children}
        </a>
      ) : (
        <Link href={value.href} className="text-[#3f6bff] underline underline-offset-3 hover:text-[#5580ff] transition-colors">
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 space-y-2 pl-1">{children}</ul>,
    number: ({ children }) => <ol className="mb-5 space-y-2 pl-1 list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-[17px] text-[#374151] leading-[1.75]">
        <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[17px] text-[#374151] leading-[1.75] pl-1">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url && !value?.asset?._ref) return null;
      const src = value.asset.url ?? urlFor(value).width(900).url();
      return (
        <figure className="my-10">
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#f5f7fb]" style={{ aspectRatio: "16/9" }}>
            <Image src={src} alt={value.alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-[#9ca3af]">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

/* -- Helpers ------------------------------------------------------ */

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/* -- Page --------------------------------------------------------- */

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id-here";

  if (!isSanityConfigured) {
    return <PlaceholderPage slug={slug} />;
  }

  const post = await sanityClient.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) notFound();

  return (
    <>
      {/* -- ARTICLE HERO -- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 72%)",
          }} />
        <div className="absolute -top-24 right-1/3 w-[600px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }} />

        <div className="relative max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-white/40 mb-8">
            <Link href="/insights" className="hover:text-white/70 transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-[#9db4ff]">{post.category}</span>
          </div>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
            style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">{post.category}</span>
          </div>

          <h1 className="text-[30px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-[17px] md:text-[19px] text-white/60 leading-[1.7] mb-8 max-w-2xl">
              {post.excerpt}
            </p>
          )}

          {/* Author + date row */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            {post.author?.photoUrl && (
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/15">
                <Image src={post.author.photoUrl} alt={post.author.photoAlt ?? post.author.name} width={40} height={40} className="object-cover w-full h-full" />
              </div>
            )}
            <div>
              <p className="text-[14px] font-semibold text-white/90">{post.author?.name ?? "Bob Hart"}</p>
              {post.publishedAt && (
                <p className="text-[13px] text-white/45">{formatDate(post.publishedAt)}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -- FEATURED IMAGE -- */}
      {post.featuredImage?.asset?.url && (
        <div className="bg-[#061126] pb-0">
          <div className="max-w-3xl mx-auto px-6">
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* -- ARTICLE BODY -- */}
      <article className="relative bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} components={ptComponents} />
          ) : (
            <p className="text-[#526078] text-[17px] leading-[1.8]">Article content coming soon.</p>
          )}
        </div>
      </article>

      {/* -- FAQ (if present) -- */}
      {post.faqs && post.faqs.length > 0 && (
        <ArticleClientShell faqs={post.faqs} />
      )}

      {/* -- RELATED POSTS -- */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="relative py-20 md:py-24 bg-[#f5f7fb] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-[24px] md:text-[30px] font-bold text-[#111827] mb-10 leading-[1.2] tracking-[-0.01em]">
              Related reading
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {post.relatedPosts.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="group block h-full">
                  <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]">
                    <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }} />
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#3f6bff] mb-3 block">{p.category}</span>
                      <h3 className="text-[17px] font-bold text-[#111827] mb-2.5 leading-snug group-hover:text-[#3f6bff] transition-colors duration-200">{p.title}</h3>
                      <p className="text-[#526078] text-[14px] leading-[1.65] mb-4">{p.excerpt}</p>
                      <div className="mt-auto flex items-center justify-end pt-4 border-t border-[#f0f1f4]">
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3f6bff]">
                          Read more
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -- NEWSLETTER CTA -- */}
      <section className="relative py-20 md:py-24 bg-[#061126] text-white overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #061126 0%, #0d1a3a 50%, #061126 100%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.14) 0%, transparent 70%)" }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-4">Stay sharp</p>
          <h2 className="text-2xl md:text-[34px] font-bold mb-5 leading-[1.2] tracking-[-0.01em]">
            Get practical GTM thinking in your inbox.
          </h2>
          <p className="text-white/55 text-[16px] leading-[1.75] mb-8">
            Useful ideas for technical founders, GTM leaders, and partner teams. Not generic startup advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <GradientButton href="/insights#subscribe">Subscribe to Insights</GradientButton>
            <GhostButton href="/insights">Browse All Articles</GhostButton>
          </div>
        </div>
      </section>

      {/* -- PRODUCTION READY SOFT CTA -- */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0b1734 0%, #061126 100%)", border: "1px solid rgba(63,107,255,0.2)" }}>
            <div className="absolute -right-16 -top-16 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />
            <div className="relative md:flex md:items-center md:justify-between gap-8">
              <div className="mb-6 md:mb-0 md:max-w-xl">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-3">Production Ready</p>
                <h2 className="text-2xl md:text-[30px] font-bold text-white mb-4 leading-[1.2] tracking-[-0.01em]">
                  Is this problem showing up in your sales calls or demos?
                </h2>
                <p className="text-white/60 text-[15px] md:text-[16px] leading-[1.7]">
                  Production Ready is the Successfulbob framework for making your GTM as production-ready as your product. Schedule a 30-minute call to see if it fits.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:flex-shrink-0 md:w-56">
                <FitCallButton fitCall>
                  Schedule a Fit Call
                </FitCallButton>
                <GhostButton href="/production-ready">Explore Production Ready</GhostButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* -- Placeholder (shown before Sanity is configured) -------------- */

function PlaceholderPage({ slug }: { slug: string }) {
  const title = slug
    .split("-")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

  return (
    <section className="relative bg-[#061126] text-white min-h-[70vh] flex items-center overflow-hidden py-28">
      <div className="absolute inset-0 opacity-[0.55] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 72%)",
        }} />
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
          style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">Insights · Coming soon</span>
        </div>
        <h1 className="text-[30px] md:text-[42px] font-bold leading-[1.12] tracking-[-0.02em] mb-5">
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}>
            {title}
          </span>{" "}
          is being written.
        </h1>
        <p className="text-white/60 text-[16px] md:text-[17px] leading-[1.75] mb-9 max-w-xl mx-auto">
          This article isn&apos;t published yet. Subscribe on the Insights page and you&apos;ll get it the moment it lands.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <GradientButton href="/insights#subscribe">Subscribe to Insights</GradientButton>
          <GhostButton href="/insights">Back to Insights</GhostButton>
        </div>
      </div>
    </section>
  );
}
