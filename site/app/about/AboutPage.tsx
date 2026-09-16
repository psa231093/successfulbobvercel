import Image from "next/image";
import { DesignPanel, SystemMotif } from "@/components/MarketingDesign";
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
          <div className="max-w-[280px] lg:max-w-full mx-auto">
            <Image
              src="/bob-headshot-portrait.webp"
              loading="eager"
              alt="Bob Hart"
              width={480}
              height={600}
              sizes="(max-width: 1023px) 280px, 380px"
              className="rounded-2xl w-full max-w-[280px] lg:max-w-full h-auto mx-auto"
            />
          </div>
        }
      />
      <MarketingSection
        eyebrow={copy.background.eyebrow}
        title={copy.background.title}
        aside={
          <DesignPanel dark className="p-7 md:p-8">
            <CheckList items={copy.background.checklist} dark />
          </DesignPanel>
        }
      >
        <Copy paragraphs={copy.background.paragraphs} />
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.why.eyebrow}
        title={copy.why.title}
        tone="dark"
      >
        <div className="grid md:grid-cols-[1.35fr_0.65fr] gap-12 items-center">
          <Copy paragraphs={copy.why.paragraphs} dark />
          <SystemMotif />
        </div>
      </MarketingSection>
      <MarketingSection eyebrow={copy.human.eyebrow} title={copy.human.title}>
        <div className="max-w-3xl border-l-[3px] border-[#8b5cf6]/60 pl-6 md:pl-8 py-2">
          <Copy paragraphs={copy.human.paragraphs} />
        </div>
      </MarketingSection>
      <MarketingClose {...copy.close} />
    </>
  );
}
