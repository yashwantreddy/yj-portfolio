import SlideUp from "@/components/SlideUp"
import type { MetricItem } from "@/data/portfolio"

interface ImpactSectionProps {
  metrics: {
    heading: string
    intro: string
    items: MetricItem[]
  }
}

export default function ImpactSection({ metrics }: ImpactSectionProps) {
  return (
    <section className="py-20 md:py-24" aria-labelledby="impact-heading">
      <SlideUp offset="-120px 0px -120px 0px">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand-cyan">{metrics.heading}</p>
          <h2 id="impact-heading" className="font-display text-4xl font-bold text-ink sm:text-5xl">
            Recruiter quick scan
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">{metrics.intro}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {metrics.items.map((item) => (
            <article key={item.label} className="rounded-2xl border border-border-soft bg-surface-panel p-6">
              <p className="font-display text-5xl font-extrabold leading-none text-brand-cyan">{item.value}</p>
              <h3 className="mt-3 text-xl font-semibold text-ink">{item.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{item.detail}</p>
            </article>
          ))}
        </div>
      </SlideUp>
    </section>
  )
}
