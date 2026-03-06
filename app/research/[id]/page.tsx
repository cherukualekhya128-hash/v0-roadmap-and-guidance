"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Feature components
import { PaperChatbot } from "@/components/research/features/paper-chatbot"
import { KnowledgeGraph } from "@/components/research/features/knowledge-graph"
import { SkillExtractor } from "@/components/research/features/skill-extractor"
import { FutureSkillPredictor } from "@/components/research/features/future-skill-predictor"
import { TrendHeatmap } from "@/components/research/features/trend-heatmap"
import { LiteratureExplorer } from "@/components/research/features/literature-explorer"
import { ResumeTopicMapper } from "@/components/research/features/resume-topic-mapper"
import { InterviewSimulation } from "@/components/research/features/interview-simulation"
import { JobDescriptionSimplifier } from "@/components/research/features/job-description-simplifier"
import { ImpactScore } from "@/components/research/features/impact-score"
import { ProjectIdeaGenerator } from "@/components/research/features/project-idea-generator"
import { DatasetRecommender } from "@/components/research/features/dataset-recommender"
import { PaperTimeline } from "@/components/research/features/paper-timeline"
import { LearningRecommendation } from "@/components/research/features/learning-recommendation"
import { CompetitionAnalyzer } from "@/components/research/features/competition-analyzer"
import { PaperToCode } from "@/components/research/features/paper-to-code"
import { CollaborationFinder } from "@/components/research/features/collaboration-finder"
import { PatentDetector } from "@/components/research/features/patent-detector"
import { VisualizationGenerator } from "@/components/research/features/visualization-generator"
import { CareerAdvisor } from "@/components/research/features/career-advisor"

const featureComponents: Record<string, React.ComponentType> = {
  "1": KnowledgeGraph,
  "2": SkillExtractor,
  "3": FutureSkillPredictor,
  "4": TrendHeatmap,
  "5": PaperChatbot,
  "6": LiteratureExplorer,
  "7": ResumeTopicMapper,
  "8": InterviewSimulation,
  "9": JobDescriptionSimplifier,
  "10": ImpactScore,
  "11": ProjectIdeaGenerator,
  "12": DatasetRecommender,
  "13": PaperTimeline,
  "14": LearningRecommendation,
  "15": CompetitionAnalyzer,
  "16": PaperToCode,
  "17": CollaborationFinder,
  "18": PatentDetector,
  "19": VisualizationGenerator,
  "20": CareerAdvisor,
}

const featureNames: Record<string, string> = {
  "1": "Knowledge Graph",
  "2": "Skill Extractor",
  "3": "Future Skill Predictor",
  "4": "Trend Heatmap",
  "5": "Paper Chatbot",
  "6": "Literature Explorer",
  "7": "Resume Topic Mapper",
  "8": "Interview Simulation",
  "9": "Job Description Simplifier",
  "10": "Impact Score",
  "11": "Project Idea Generator",
  "12": "Dataset Recommender",
  "13": "Paper Timeline",
  "14": "Learning Recommendation",
  "15": "Competition Analyzer",
  "16": "Paper to Code",
  "17": "Collaboration Finder",
  "18": "Patent Detector",
  "19": "Visualization Generator",
  "20": "Career Advisor",
}

export default function FeaturePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const FeatureComponent = featureComponents[id]
  const featureName = featureNames[id]

  if (!FeatureComponent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="mb-4 text-2xl font-bold text-foreground">Feature not found</h1>
        <Button onClick={() => router.push("/research")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Research
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/research")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-semibold text-foreground">{featureName}</h1>
        </div>
      </header>

      {/* Feature content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <FeatureComponent />
      </main>
    </div>
  )
}
