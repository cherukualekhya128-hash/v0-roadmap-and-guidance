"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Network,
  FileText,
  TrendingUp,
  Flame,
  MessageSquare,
  GitBranch,
  MapPin,
  Mic,
  FileSearch,
  BarChart3,
  Lightbulb,
  Database,
  Clock,
  GraduationCap,
  Users,
  Award,
  Shield,
  Image,
  Compass,
  Brain,
} from "lucide-react"

const categories = [
  { id: "all", label: "All Features" },
  { id: "knowledge", label: "Knowledge Tools" },
  { id: "analysis", label: "Analysis Tools" },
  { id: "career", label: "Career Tools" },
  { id: "visualization", label: "Visualization" },
]

const features = [
  {
    id: 1,
    title: "Job-Research Knowledge Graph",
    description: "Create a knowledge graph connecting job roles, required skills, technologies, and related research papers. Visually explore how research connects to real jobs.",
    icon: Network,
    category: "knowledge",
    tags: ["Graph DB", "Neo4j", "Visualization"],
  },
  {
    id: 2,
    title: "Research → Skill Extractor",
    description: "AI reads research papers and extracts tools used, programming languages, frameworks, and technical skills. Then recommends skills needed for industry jobs.",
    icon: FileText,
    category: "analysis",
    tags: ["NLP", "Skill Mapping", "Extraction"],
  },
  {
    id: 3,
    title: "Future Skill Predictor",
    description: "Use job market data to predict skills that will be in demand in the next 5-10 years. Stay ahead of the curve with AI-powered forecasting.",
    icon: TrendingUp,
    category: "career",
    tags: ["ML", "Forecasting", "Trends"],
  },
  {
    id: 4,
    title: "Research Trend Heatmap",
    description: "Visual dashboard showing trending research areas, popular keywords, and emerging technologies. Spot opportunities before they go mainstream.",
    icon: Flame,
    category: "visualization",
    tags: ["Heatmap", "Trends", "Dashboard"],
  },
  {
    id: 5,
    title: "Paper Chatbot",
    description: "Chat with any research paper and ask questions like 'Explain the methodology' or 'What problem does this paper solve?' Get instant, contextual answers.",
    icon: MessageSquare,
    category: "knowledge",
    tags: ["RAG", "LLM", "Q&A"],
  },
  {
    id: 6,
    title: "Smart Literature Explorer",
    description: "Automatically finds related papers and builds a research tree showing main papers, cited papers, and similar research. Never miss a relevant paper.",
    icon: GitBranch,
    category: "knowledge",
    tags: ["Citation Graph", "Discovery", "Tree"],
  },
  {
    id: 7,
    title: "Resume to Research Topic Mapper",
    description: "Analyzes your skills and suggests research topics you can work on. Example: Python + Data Analysis → Machine Learning research projects.",
    icon: MapPin,
    category: "career",
    tags: ["Matching", "Recommendations", "Skills"],
  },
  {
    id: 8,
    title: "Job Interview Simulation",
    description: "Creates mock interviews using AI with real-time feedback. Practice with questions tailored to your target role and get actionable improvement tips.",
    icon: Mic,
    category: "career",
    tags: ["Simulation", "Feedback", "Practice"],
  },
  {
    id: 9,
    title: "Job Description Simplifier",
    description: "Converts complex job descriptions into easy-to-understand requirements. Know exactly what skills you need without parsing corporate jargon.",
    icon: FileSearch,
    category: "career",
    tags: ["NLP", "Simplification", "Parsing"],
  },
  {
    id: 10,
    title: "Research Impact Score",
    description: "Predicts research impact based on citations, novelty, and industry relevance. Identify high-impact papers before they become famous.",
    icon: BarChart3,
    category: "analysis",
    tags: ["Scoring", "Prediction", "Metrics"],
  },
  {
    id: 11,
    title: "Project Idea Generator",
    description: "From job requirements or research papers, generate project ideas, portfolio projects, and hackathon ideas. Never run out of things to build.",
    icon: Lightbulb,
    category: "career",
    tags: ["Generation", "Ideas", "Portfolio"],
  },
  {
    id: 12,
    title: "Dataset Recommender",
    description: "Suggests datasets for research projects based on paper topics. Find the perfect data to validate your research or build your next project.",
    icon: Database,
    category: "analysis",
    tags: ["Datasets", "Kaggle", "Recommendations"],
  },
  {
    id: 13,
    title: "Research Paper Timeline",
    description: "Shows how research evolved over time for a topic. Example: Deep Learning timeline from 2012-2025 with key milestones and breakthroughs.",
    icon: Clock,
    category: "visualization",
    tags: ["Timeline", "History", "Evolution"],
  },
  {
    id: 14,
    title: "Skill Learning Recommendation Engine",
    description: "Recommends courses, tutorials, and certifications based on missing skills. Get a personalized learning path to bridge your skill gaps.",
    icon: GraduationCap,
    category: "career",
    tags: ["Learning", "Courses", "Upskilling"],
  },
  {
    id: 15,
    title: "Job Competition Analyzer",
    description: "Estimates number of applicants, competition level, and probability of getting selected. Apply smarter, not harder.",
    icon: Users,
    category: "analysis",
    tags: ["Competition", "Statistics", "Probability"],
  },
  {
    id: 16,
    title: "Paper-to-Code Generator",
    description: "Reads research methodology and generates basic implementation code. Go from paper to prototype in minutes, not weeks.",
    icon: Brain,
    category: "analysis",
    tags: ["Code Gen", "Implementation", "LLM"],
  },
  {
    id: 17,
    title: "Research Collaboration Finder",
    description: "Suggests researchers or institutions working on similar topics. Find collaborators, mentors, or labs aligned with your research interests.",
    icon: Users,
    category: "knowledge",
    tags: ["Networking", "Collaboration", "Discovery"],
  },
  {
    id: 18,
    title: "Patent Opportunity Detector",
    description: "Finds research ideas that could become patents or startups. Identify commercialization opportunities in academic research.",
    icon: Award,
    category: "analysis",
    tags: ["Patents", "Innovation", "Startups"],
  },
  {
    id: 19,
    title: "Research Visualization Generator",
    description: "Converts research papers into diagrams, flowcharts, and architecture diagrams. Understand complex papers at a glance.",
    icon: Image,
    category: "visualization",
    tags: ["Diagrams", "Flowcharts", "Visual"],
  },
  {
    id: 20,
    title: "Career + Research Advisor",
    description: "Suggests both career paths and research topics based on your profile. Get holistic guidance that bridges academia and industry.",
    icon: Compass,
    category: "career",
    tags: ["Advisory", "Paths", "Guidance"],
  },
]

export function FeaturesGrid() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredFeatures = activeCategory === "all" 
    ? features 
    : features.filter(f => f.category === activeCategory)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Category filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Section anchors for navigation */}
        <div id="knowledge" className="scroll-mt-24" />
        <div id="analysis" className="scroll-mt-24" />
        <div id="career" className="scroll-mt-24" />
        <div id="visualization" className="scroll-mt-24" />

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFeatures.map((feature, index) => (
            <Card
              key={feature.id}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    #{feature.id}
                  </span>
                </div>
                <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-muted-foreground">
                  {feature.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-secondary/80 text-xs text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              {/* Hover gradient effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "20+", label: "AI Features" },
              { value: "5", label: "Category Areas" },
              { value: "50+", label: "Tech Integrations" },
              { value: "∞", label: "Possibilities" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
