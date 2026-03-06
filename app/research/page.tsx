import { Metadata } from "next"
import { ResearchNavbar } from "@/components/research/research-navbar"
import { ResearchHero } from "@/components/research/research-hero"
import { PaperChatbot } from "@/components/research/paper-chatbot"
import { FeaturesGrid } from "@/components/research/features-grid"
import { ResearchFooter } from "@/components/research/research-footer"

export const metadata: Metadata = {
  title: "Research Paper Assistant - CareerGPT",
  description: "AI-powered research assistant with 20+ features including knowledge graphs, paper chatbot, skill extraction, and more.",
}

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <ResearchNavbar />
      <ResearchHero />
      <PaperChatbot />
      <FeaturesGrid />
      <ResearchFooter />
    </main>
  )
}
