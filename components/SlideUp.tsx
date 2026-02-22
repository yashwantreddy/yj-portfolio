"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface SlideUpProps {
  offset?: string
  children?: ReactNode
}

export default function SlideUp({ children, offset = "0px" }: SlideUpProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      element.classList.remove("opacity-0", "translate-y-8")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8")
            entry.target.classList.add("animate-slide-up")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: offset }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [offset])

  return (
    <div ref={ref} className="relative translate-y-8 opacity-0">
      {children}
    </div>
  )
}
