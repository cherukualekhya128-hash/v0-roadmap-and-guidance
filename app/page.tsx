import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesSection } from "@/components/features-section"
import { ArchitectureSection } from "@/components/architecture-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <ArchitectureSection />
      <TechStackSection />
      <DemoSection />
      <Footer />
    </main>
  )
}
