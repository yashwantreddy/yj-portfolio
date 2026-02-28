export const SECTION_SCROLL_OFFSET = 96

export function scrollToSection(id: string) {
  if (typeof window === "undefined") {
    return
  }

  const target = document.getElementById(id)
  if (!target) {
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  })
}
