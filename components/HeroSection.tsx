"use client"

import Image from "next/image"
import { Link } from "react-scroll/modules"
import type { CredibilityItem, HeroContent } from "@/data/portfolio"
import { HiArrowDown } from "react-icons/hi"

interface HeroSectionProps {
  hero: HeroContent
  credibility: CredibilityItem[]
}

export default function HeroSection({ hero, credibility }: HeroSectionProps) {
  return (
    <section id="home" className="relative scroll-mt-28 pt-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6 animate-fade-in-up [animation-delay:120ms]">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-brand-cyan">
            {hero.role}
          </p>
          <h1 className="font-display text-balance text-5xl font-extrabold leading-[0.95] text-ink sm:text-6xl md:text-7xl">
            {hero.name}
          </h1>
          <p className="max-w-2xl text-2xl font-semibold leading-tight text-ink/90 sm:text-3xl">
            {hero.statement}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">{hero.summary}</p>
          <div className="inline-flex items-center gap-3 rounded-full border border-border-soft bg-surface-panel px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-brand-lime shadow-[0_0_20px_rgba(162,255,82,0.9)]" />
            <span className="font-mono uppercase tracking-wider text-ink-soft">{hero.location}</span>
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              to={hero.primaryCta.page}
              smooth
              duration={500}
              offset={-96}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-cyan px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-brand-cyan-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              to={hero.secondaryCta.page}
              smooth
              duration={500}
              offset={-96}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border-soft bg-surface-panel px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand-cyan"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-in-up [animation-delay:240ms]">
          <div className="absolute -left-8 -top-10 hidden h-32 w-32 rounded-full bg-brand-cyan/30 blur-3xl md:block" />
          <div className="absolute -bottom-10 -right-6 hidden h-40 w-40 rounded-full bg-brand-lime/20 blur-3xl md:block" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-border-soft bg-surface-panel p-3 shadow-soft-xl">
            <Image
              src={hero.portrait.src}
              alt={hero.portrait.alt}
              width={1123}
              height={701}
              priority
              className="aspect-[16/11] w-full rounded-[1.6rem] object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] border border-white/10" />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-4 rounded-2xl border border-border-soft bg-surface-panel p-5 sm:grid-cols-2 xl:grid-cols-4">
        {credibility.map((item) => (
          <div key={item.label} className="rounded-xl border border-border-soft bg-surface/60 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-cyan">{item.label}</p>
            <p className="mt-2 text-sm font-semibold leading-snug text-ink sm:text-base">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="about"
          smooth
          duration={500}
          offset={-96}
          aria-label="Scroll to about section"
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border-soft bg-surface-panel p-3 text-ink transition hover:border-brand-cyan"
        >
          <HiArrowDown className="animate-float text-xl" />
        </Link>
      </div>
    </section>
  )
}
