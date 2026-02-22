import Link from "next/link"
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai"
import { portfolioContent } from "@/data/portfolio"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto w-full max-w-[1240px] px-4 pb-10 pt-4 sm:px-8 lg:px-12">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border-soft bg-surface-panel px-5 py-4 text-sm text-ink-soft md:flex-row">
        <p>
          &copy; {year} {portfolioContent.footer.owner}
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/yashwantreddy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface text-ink transition hover:-translate-y-0.5 hover:border-brand-cyan"
          >
            <AiOutlineGithub size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/yashwantjankay/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface text-ink transition hover:-translate-y-0.5 hover:border-brand-cyan"
          >
            <AiOutlineLinkedin size={24} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
