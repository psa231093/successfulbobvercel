import ReadinessPanel from "@/components/ReadinessPanel";
import copy from "@/content/production-ready.json";
import {
  MarketingHero,
  MarketingSection,
  MarketingClose,
  Copy,
  CheckList,
} from "@/components/MarketingSections";
import { FitCallButton } from "@/components/Primitives";
import {
  DesignPanel,
  DesignIcon,
  PricingPaths,
} from "@/components/MarketingDesign";
import { AnimateIn } from "@/components/AnimateIn";
import styles from "@/components/MarketingDesign.module.css";

export default function ProductionReadyPage() {
  return (
    <>
      <MarketingHero
        {...copy.hero}
        primaryHref="#assessment"
        visual={<ReadinessPanel />}
      />
      <MarketingSection
        eyebrow={copy.means.eyebrow}
        title={copy.means.title}
        aside={
          <DesignPanel dark className="p-7 md:p-8">
            <h3 className="text-xs font-semibold text-[#a4b9ff] tracking-wide mb-6">
              {copy.means.checklistHeading}
            </h3>
            <CheckList items={copy.means.checklist} dark />
          </DesignPanel>
        }
      >
        <Copy paragraphs={copy.means.paragraphs} />
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.creates.eyebrow}
        title={copy.creates.title}
        tone="soft"
      >
        <div className="max-w-3xl">
          <Copy paragraphs={copy.creates.paragraphs} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {copy.creates.outputs.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.05} className="h-full">
              <div className={`${styles.card} h-full p-7`}>
                <div className="flex items-center justify-between mb-6">
                  <span className={styles.icon}>
                    <DesignIcon kind={i} />
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-[#526078] text-[15px] leading-relaxed">
                  {item.body}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.paths.eyebrow}
        title={copy.paths.title}
        tone="dark"
      >
        <PricingPaths items={copy.paths.items} />
      </MarketingSection>
      <MarketingSection
        id="assessment"
        eyebrow={copy.assessment.eyebrow}
        title={copy.assessment.title}
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <Copy paragraphs={copy.assessment.paragraphs} />
            <p className="text-2xl text-[#3f6bff] font-bold my-7">
              {copy.assessment.price}
            </p>
            <div className="inline-flex">
              <FitCallButton>{copy.assessment.cta}</FitCallButton>
            </div>
          </div>
          <DesignPanel dark className="p-7 md:p-8">
            <h3 className="text-xs uppercase tracking-widest text-[#a4b9ff] font-semibold mb-6">
              What you get
            </h3>
            <CheckList items={copy.assessment.checklist} dark />
          </DesignPanel>
        </div>
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.outcomes.eyebrow}
        title={copy.outcomes.title}
        tone="soft"
      >
        <div className="space-y-4">
          {copy.outcomes.items.map((item, i) => (
            <div
              key={item.title}
              className={`${styles.card} grid md:grid-cols-[0.75fr_1.25fr] gap-4 md:gap-12 p-6 items-center`}
            >
              <div className="flex gap-5 items-center">
                <span className={styles.icon}>
                  <DesignIcon kind={i + 1} />
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-[#526078] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </MarketingSection>
      <MarketingClose {...copy.close} />
    </>
  );
}
