import Image from "next/image"
import Link from "next/link"
import SlideUp from "@/components/SlideUp"
import type { PortfolioProject } from "@/data/portfolio"
import { BsArrowUpRightSquare, BsGithub } from "react-icons/bs"

interface ProjectsSectionProps {
  projects: {
    heading: string
    intro: string
    items: PortfolioProject[]
  }
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-28 py-20 md:py-24">
      <div className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand-cyan">{projects.heading}</p>
        <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">Case studies in applied AI</h2>
        <p className="max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">{projects.intro}</p>
      </div>

      <div className="mt-10 grid gap-8">
        {projects.items.map((project, index) => (
          <SlideUp key={project.name} offset="-160px 0px -120px 0px">
            <article className="group overflow-hidden rounded-3xl border border-border-soft bg-surface-panel transition hover:border-brand-cyan/60">
              <div className="grid gap-6 p-5 md:grid-cols-[1.05fr_0.95fr] md:p-7">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden rounded-2xl border border-border-soft"
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="flex flex-col">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">Project {index + 1}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">{project.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{project.description}</p>
                  <p className="mt-4 rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm leading-relaxed text-ink-soft">
                    {project.outcome}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-semibold text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand-cyan"
                    >
                      <BsGithub />
                      GitHub
                    </Link>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand-cyan"
                    >
                      <BsArrowUpRightSquare />
                      Open Project
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </SlideUp>
        ))}
      </div>
    </section>
  )
}
