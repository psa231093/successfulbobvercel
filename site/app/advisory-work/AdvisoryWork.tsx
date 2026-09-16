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
import {
  DesignPanel,
  DesignIcon,
  OfferPrice,
  SupportLevelsVisual,
} from "@/components/MarketingDesign";
import { PointerGlow } from "@/components/Primitives";
import styles from "@/components/MarketingDesign.module.css";

export default function AdvisoryWork() {
  return (
    <>
      <MarketingHero
        {...copy.hero}
        secondaryHref="#engagement-levels"
        visual={<SupportLevelsVisual items={copy.levels.items} />}
      />
      <MarketingSection
        eyebrow={copy.when.eyebrow}
        title={copy.when.title}
        aside={
          <DesignPanel dark className="p-7 md:p-8">
            <CheckList items={copy.when.checklist} dark />
          </DesignPanel>
        }
      >
        <Copy paragraphs={copy.when.paragraphs} />
      </MarketingSection>
      <MarketingSection
        id="engagement-levels"
        eyebrow={copy.levels.eyebrow}
        title={copy.levels.title}
        tone="dark"
      >
        <div className="space-y-6">
          {copy.levels.items.map((item, i) => (
            <article
              id={item.id}
              key={item.id}
              className={`${styles.card} ${i === 1 ? styles.cardDark : "text-[#111827]"} scroll-mt-24 grid lg:grid-cols-[0.65fr_1.35fr] gap-7 lg:gap-12 p-7 md:p-10`}
            >
              <PointerGlow strength={i === 1 ? 0.13 : 0.05} />
              {i === 1 && (
                <div aria-hidden="true" className={styles.topAccent} />
              )}
              <div className="relative">
                <span className={styles.icon}>
                  <DesignIcon kind={[1, 3, 5][i]} />
                </span>
                <h3 className="text-2xl font-bold mt-3 mb-4">{item.title}</h3>
                <OfferPrice text={item.price} />
                <div className="mt-6">
                  <FitCallButton>Discuss {item.title}</FitCallButton>
                </div>
              </div>
              <div className="relative">
                <Copy paragraphs={item.paragraphs} dark={i === 1} />
                <p
                  className={`mt-6 pt-6 border-t text-sm leading-relaxed ${i === 1 ? "border-white/15 text-white/65" : "border-[#e5e7eb] text-[#526078]"}`}
                >
                  {item.fit}
                </p>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>
      <MarketingSection eyebrow={copy.topics.eyebrow} title={copy.topics.title}>
        <ul className="grid sm:grid-cols-2 gap-4">
          {copy.topics.items.map((item, i) => (
            <li
              key={item}
              className={`${styles.card} flex gap-5 items-center p-5 text-base font-medium`}
            >
              <span className={styles.icon}>
                <DesignIcon kind={i} />
              </span>
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
