"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { RiMoonFill, RiSunLine } from "react-icons/ri"
import { IoMdClose, IoMdMenu } from "react-icons/io"
import SectionLink from "@/components/SectionLink"
import { portfolioContent } from "@/data/portfolio"
import { SECTION_SCROLL_OFFSET } from "@/lib/sectionNavigation"

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const sectionIds = portfolioContent.navItems.map((item) => item.page)
    let frame = 0

    function updateActiveSection() {
      const anchorLine = window.scrollY + SECTION_SCROLL_OFFSET + window.innerHeight * 0.2
      let nextSection = sectionIds[0]

      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= anchorLine) {
          nextSection = id
        }
      }

      setActiveSection(nextSection)
    }

    function queueUpdate() {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        updateActiveSection()
        frame = 0
      })
    }

    updateActiveSection()
    window.addEventListener("scroll", queueUpdate, { passive: true })
    window.addEventListener("resize", queueUpdate)

    return () => {
      window.removeEventListener("scroll", queueUpdate)
      window.removeEventListener("resize", queueUpdate)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-soft bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-3 sm:px-8 lg:px-12">
        <SectionLink
          to="home"
          className="cursor-pointer font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
          onNavigate={() => setOpen(false)}
        >
          {portfolioContent.hero.name}
        </SectionLink>

        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((state) => !state)}
          className="inline-flex items-center justify-center rounded-lg border border-border-soft bg-surface-panel p-2 text-ink md:hidden"
        >
          {open ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
        </button>

        <nav
          className={`absolute left-0 right-0 top-full border-b border-border-soft bg-surface/95 px-4 pb-5 pt-3 backdrop-blur-xl transition md:static md:flex md:w-auto md:items-center md:gap-3 md:border-none md:bg-transparent md:p-0 ${
            open ? "block" : "hidden md:flex"
          }`}
        >
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
            {portfolioContent.navItems.map((item) => (
              <li key={item.page}>
                <SectionLink
                  to={item.page}
                  aria-current={activeSection === item.page ? "page" : undefined}
                  className={`active-nav-link-target block cursor-pointer rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink ${
                    activeSection === item.page ? "active-nav-link" : ""
                  }`}
                  onNavigate={() => setOpen(false)}
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-2 md:mt-0 md:pl-2">
            <SectionLink
              to="contact"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-cyan px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-brand-cyan-strong"
              onNavigate={() => setOpen(false)}
            >
              Hire Me
            </SectionLink>
            <button
              aria-label={currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-panel text-ink transition hover:border-brand-cyan"
            >
              {currentTheme === "dark" ? <RiSunLine size={18} /> : <RiMoonFill size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
