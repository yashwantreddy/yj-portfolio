import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import ExperienceSection from "@/components/ExperienceSection"
import HeroSection from "@/components/HeroSection"
import ImpactSection from "@/components/ImpactSection"
import ProjectsSection from "@/components/ProjectsSection"
import { portfolioContent } from "@/data/portfolio"

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-28 sm:px-8 lg:px-12">
      <HeroSection hero={portfolioContent.hero} credibility={portfolioContent.credibility} />
      <AboutSection about={portfolioContent.about} />
      <ExperienceSection experience={portfolioContent.experience} />
      <ImpactSection metrics={portfolioContent.metrics} />
      <ProjectsSection projects={portfolioContent.projects} />
      <ContactSection contact={portfolioContent.contact} />
    </main>
  )
}
