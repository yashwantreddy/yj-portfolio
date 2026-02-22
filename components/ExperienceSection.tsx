import SlideUp from "@/components/SlideUp"
import type { TimelineEntry } from "@/data/portfolio"

interface ExperienceSectionProps {
  experience: {
    heading: string
    intro: string
    entries: TimelineEntry[]
  }
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-28 py-20 md:py-24">
      <SlideUp offset="-120px 0px -120px 0px">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand-cyan">{experience.heading}</p>
          <h2 className="font-display text-balance text-4xl font-bold text-ink sm:text-5xl">
            Experience and foundation
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">{experience.intro}</p>
        </div>

        <div className="mt-10 grid gap-5">
          {experience.entries.map((entry) => (
            <article
              key={entry.title}
              className="rounded-2xl border border-border-soft bg-surface-panel p-6 transition hover:border-brand-cyan/60"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink">{entry.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base">{entry.detail}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan md:pt-2">{entry.period}</p>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-semibold text-ink-soft"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SlideUp>
    </section>
  )
}
