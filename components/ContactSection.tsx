import Link from "next/link"
import SlideUp from "@/components/SlideUp"
import type { SocialLink } from "@/data/portfolio"
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai"

interface ContactSectionProps {
  contact: {
    heading: string
    intro: string
    availability: string
    email?: string
    socialLinks: SocialLink[]
  }
}

function IconForSocial({ icon }: { icon: SocialLink["icon"] }) {
  if (icon === "linkedin") {
    return <AiOutlineLinkedin size={26} />
  }

  if (icon === "email") {
    return <AiOutlineMail size={26} />
  }

  return <AiOutlineGithub size={26} />
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const links: SocialLink[] = contact.email
    ? [
        ...contact.socialLinks,
        {
          label: "Email",
          href: `mailto:${contact.email}`,
          icon: "email",
        },
      ]
    : contact.socialLinks

  return (
    <section id="contact" className="scroll-mt-28 py-20 md:py-24">
      <SlideUp offset="-120px 0px -120px 0px">
        <div className="rounded-3xl border border-border-soft bg-surface-panel p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand-cyan">{contact.heading}</p>
          <h2 className="mt-4 font-display text-balance text-4xl font-bold text-ink sm:text-5xl">
            Let&apos;s build meaningful AI products
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">{contact.intro}</p>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">{contact.availability}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand-cyan"
              >
                <IconForSocial icon={link.icon} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </SlideUp>
    </section>
  )
}
