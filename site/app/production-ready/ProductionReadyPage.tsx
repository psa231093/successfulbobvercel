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

export default function ProductionReadyPage() {
  return (
    <>
      <MarketingHero
        {...copy.hero}
        primaryHref="#assessment"
        visual={<ReadinessPanel />}
      />
      <MarketingSection eyebrow={copy.means.eyebrow} title={copy.means.title}>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <Copy paragraphs={copy.means.paragraphs} />
          <div className="rounded-2xl bg-[#f5f7fb] p-7">
            <h3 className="text-xs font-semibold text-[#3f6bff] tracking-wide mb-6">
              {copy.means.checklistHeading}
            </h3>
            <CheckList items={copy.means.checklist} />
          </div>
        </div>
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.creates.eyebrow}
        title={copy.creates.title}
        tone="dark"
      >
        <div className="max-w-3xl">
          <Copy paragraphs={copy.creates.paragraphs} dark />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {copy.creates.outputs.map((item, i) => (
            <div key={item.title} className="border-t border-white/20 pt-5">
              <span className="text-xs text-[#a4b9ff]">0{i + 1}</span>
              <h3 className="text-lg font-semibold mt-3 mb-3">{item.title}</h3>
              <p className="text-white/65 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.paths.eyebrow}
        title={copy.paths.title}
        tone="soft"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {copy.paths.items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl bg-white border border-[#dce2ed] p-7 flex flex-col"
            >
              <h3 className="font-bold text-xl mb-4">{item.title}</h3>
              <p className="text-[#526078] leading-relaxed mb-7">{item.body}</p>
              <p className="text-[#3f6bff] font-semibold text-xl mt-auto">
                {item.price}
              </p>
            </article>
          ))}
        </div>
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
          <div>
            <h3 className="text-sm uppercase tracking-wide font-semibold mb-6">
              What you get
            </h3>
            <CheckList items={copy.assessment.checklist} />
          </div>
        </div>
      </MarketingSection>
      <MarketingSection
        eyebrow={copy.outcomes.eyebrow}
        title={copy.outcomes.title}
        tone="soft"
      >
        <div className="divide-y divide-[#dce2ed]">
          {copy.outcomes.items.map((item) => (
            <div
              key={item.title}
              className="grid md:grid-cols-[0.65fr_1.35fr] gap-3 md:gap-12 py-6 first:pt-0"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-[#526078] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </MarketingSection>
      <MarketingClose {...copy.close} />
    </>
  );
}
