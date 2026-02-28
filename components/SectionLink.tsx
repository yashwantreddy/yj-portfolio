"use client"

import type { AnchorHTMLAttributes, MouseEvent } from "react"
import { scrollToSection } from "@/lib/sectionNavigation"

interface SectionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string
  onNavigate?: () => void
}

export default function SectionLink({
  to,
  onClick,
  onNavigate,
  ...props
}: SectionLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()
    scrollToSection(to)
    onNavigate?.()
  }

  return <a {...props} href={`#${to}`} onClick={handleClick} />
}
