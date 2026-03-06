import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesSection } from "@/components/features-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { CareerGuidanceSection } from "@/components/career-guidance-section"
import { TopCompaniesSection } from "@/components/top-companies-section"
import { ArchitectureSection } from "@/components/architecture-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { JobsSection } from "@/components/jobs-section"
import { ATSScoreSection } from "@/components/ats-score-section"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <RoadmapSection />
      <CareerGuidanceSection />
      <TopCompaniesSection />
      <ArchitectureSection />
      <TechStackSection />
      <JobsSection />
      <ATSScoreSection />
      <DemoSection />
      <Footer />
    </main>
  )
}
