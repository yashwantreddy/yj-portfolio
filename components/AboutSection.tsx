import Image from "next/image"
import type { AboutContent } from "@/data/portfolio"
import SlideUp from "@/components/SlideUp"

interface AboutSectionProps {
  about: AboutContent
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-28 py-20 md:py-24">
      <SlideUp offset="-120px 0px -120px 0px">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand-cyan">{about.heading}</p>
            <h2 className="font-display text-balance text-4xl font-bold text-ink sm:text-5xl">{about.title}</h2>
            <div className="space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-border-soft bg-surface-panel p-6">
            <div className="overflow-hidden rounded-2xl border border-border-soft">
              <Image
                src={about.visual.src}
                alt={about.visual.alt}
                width={1024}
                height={1024}
                className="h-52 w-full object-cover"
              />
            </div>

            <div className="space-y-5">
              {about.skills.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-semibold text-ink-soft"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideUp>
    </section>
  )
}
