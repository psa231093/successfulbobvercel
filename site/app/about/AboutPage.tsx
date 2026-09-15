import Image from "next/image";
import copy from "@/content/about.json";
import {
  MarketingHero,
  MarketingSection,
  MarketingClose,
  Copy,
  CheckList,
} from "@/components/MarketingSections";

export default function AboutPage() {
  return (
    <>
      <MarketingHero
        {...copy.hero}
        secondaryHref="mailto:bob@successfulbob.com"
        visual={
          <Image
            src="/bob-headshot-portrait.webp"
            loading="eager"
            alt="Bob Hart"
            width={480}
            height={600}
            sizes="(max-width: 1023px) 280px, 380px"
            className="rounded-2xl w-full max-w-[280px] lg:max-w-full h-auto mx-auto"
          />
        }
      />
      <MarketingSection
        eyebrow={copy.background.eyebrow}
        title={copy.background.title}
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <Copy paragraphs={copy.background.paragraphs} />
          <CheckList items={copy.background.checklist} />
        </div>
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.why.eyebrow}
        title={copy.why.title}
        tone="soft"
      >
        <div className="max-w-3xl">
          <Copy paragraphs={copy.why.paragraphs} />
        </div>
      </MarketingSection>
      <MarketingSection eyebrow={copy.human.eyebrow} title={copy.human.title}>
        <div className="max-w-3xl">
          <Copy paragraphs={copy.human.paragraphs} />
        </div>
      </MarketingSection>
      <MarketingClose {...copy.close} />
    </>
  );
}
