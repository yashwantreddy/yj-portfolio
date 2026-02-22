"use client"

import { useState } from "react"
import { Link } from "react-scroll/modules"
import { useTheme } from "next-themes"
import { RiMoonFill, RiSunLine } from "react-icons/ri"
import { IoMdClose, IoMdMenu } from "react-icons/io"
import { portfolioContent } from "@/data/portfolio"

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-soft bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-3 sm:px-8 lg:px-12">
        <Link
          to="home"
          smooth
          duration={500}
          offset={-96}
          className="cursor-pointer font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          {portfolioContent.hero.name}
        </Link>

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
                <Link
                  to={item.page}
                  smooth
                  duration={500}
                  offset={-96}
                  spy
                  activeClass="active-nav-link"
                  className="active-nav-link-target block cursor-pointer rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-2 md:mt-0 md:pl-2">
            <Link
              to="contact"
              smooth
              duration={500}
              offset={-96}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-cyan px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-brand-cyan-strong"
              onClick={() => setOpen(false)}
            >
              Hire Me
            </Link>
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
