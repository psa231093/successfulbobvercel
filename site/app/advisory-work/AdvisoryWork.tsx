import Link from "next/link";
import copy from "@/content/gtm-support.json";
import {
  MarketingHero,
  MarketingSection,
  MarketingClose,
  Copy,
  CheckList,
} from "@/components/MarketingSections";
import { FitCallButton } from "@/components/Primitives";
import FAQAccordion from "@/components/FAQAccordion";

export default function AdvisoryWork() {
  return (
    <>
      <MarketingHero
        {...copy.hero}
        secondaryHref="#engagement-levels"
        visual={
          <div className="space-y-4" aria-label="GTM support levels">
            {copy.levels.items.map((item, i) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="block rounded-2xl border border-white/15 bg-white/5 p-6 hover:border-[#8b5cf6]"
              >
                <span className="text-xs text-[#a4b9ff]">0{i + 1}</span>
                <h2 className="font-semibold text-xl mt-2">{item.title}</h2>
                <p className="text-white/65 mt-2">{item.price}</p>
              </Link>
            ))}
          </div>
        }
      />
      <MarketingSection eyebrow={copy.when.eyebrow} title={copy.when.title}>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <Copy paragraphs={copy.when.paragraphs} />
          <CheckList items={copy.when.checklist} />
        </div>
      </MarketingSection>
      <MarketingSection
        id="engagement-levels"
        eyebrow={copy.levels.eyebrow}
        title={copy.levels.title}
        tone="soft"
      >
        <div className="space-y-6">
          {copy.levels.items.map((item, i) => (
            <article
              id={item.id}
              key={item.id}
              className="scroll-mt-24 grid lg:grid-cols-[0.65fr_1.35fr] gap-7 lg:gap-12 rounded-2xl border border-[#dce2ed] bg-white p-7 md:p-10"
            >
              <div>
                <span className="text-[#3f6bff] text-xs font-semibold">
                  0{i + 1}
                </span>
                <h3 className="text-2xl font-bold mt-3 mb-4">{item.title}</h3>
                <p className="text-[#3f6bff] font-semibold text-xl">
                  {item.price}
                </p>
                <div className="mt-6">
                  <FitCallButton>Discuss {item.title}</FitCallButton>
                </div>
              </div>
              <div>
                <Copy paragraphs={item.paragraphs} />
                <p className="mt-6 pt-6 border-t border-[#e5e7eb] text-sm text-[#526078] leading-relaxed">
                  {item.fit}
                </p>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>
      <MarketingSection eyebrow={copy.topics.eyebrow} title={copy.topics.title}>
        <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
          {copy.topics.items.map((item) => (
            <li key={item} className="text-lg border-b border-[#e5e7eb] pb-5">
              {item}
            </li>
          ))}
        </ul>
      </MarketingSection>
      <FAQAccordion {...copy.faq} />
      <MarketingClose {...copy.close} />
    </>
  );
}
