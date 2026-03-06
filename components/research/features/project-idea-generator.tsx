"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Sparkles, Clock, Code, BookOpen, RefreshCw } from "lucide-react"

interface ProjectIdea {
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  timeEstimate: string
  technologies: string[]
  learningOutcomes: string[]
  type: "portfolio" | "hackathon" | "research"
}

const sampleIdeas: ProjectIdea[] = [
  {
    title: "Sentiment Analysis Dashboard",
    description: "Build a real-time sentiment analyzer for social media posts with visualizations",
    difficulty: "intermediate",
    timeEstimate: "2-3 weeks",
    technologies: ["Python", "Transformers", "Streamlit", "Twitter API"],
    learningOutcomes: ["NLP fundamentals", "API integration", "Data visualization"],
    type: "portfolio",
  },
  {
    title: "AI-Powered Resume Matcher",
    description: "Create a tool that matches resumes to job descriptions using semantic similarity",
    difficulty: "intermediate",
    timeEstimate: "1-2 weeks",
    technologies: ["Python", "Sentence-BERT", "FastAPI", "React"],
    learningOutcomes: ["Embeddings", "Similarity search", "Full-stack development"],
    type: "hackathon",
  },
  {
    title: "Paper Summarization Tool",
    description: "Build a tool that automatically summarizes research papers using LLMs",
    difficulty: "advanced",
    timeEstimate: "3-4 weeks",
    technologies: ["Python", "LangChain", "GPT-4", "PDF parsing"],
    learningOutcomes: ["LLM integration", "Prompt engineering", "Document processing"],
    type: "portfolio",
  },
  {
    title: "Stock Price Predictor with LSTM",
    description: "Implement a time series forecasting model for stock prices",
    difficulty: "beginner",
    timeEstimate: "1 week",
    technologies: ["Python", "TensorFlow", "Pandas", "yfinance"],
    learningOutcomes: ["RNNs/LSTMs", "Time series analysis", "Financial data"],
    type: "portfolio",
  },
]

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500",
  intermediate: "bg-amber-500/10 text-amber-500",
  advanced: "bg-red-500/10 text-red-500",
}

const typeColors = {
  portfolio: "bg-blue-500/10 text-blue-500",
  hackathon: "bg-purple-500/10 text-purple-500",
  research: "bg-green-500/10 text-green-500",
}

export function ProjectIdeaGenerator() {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [ideas, setIdeas] = useState<ProjectIdea[] | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIdeas(sampleIdeas)
      setIsGenerating(false)
    }, 2000)
  }

  if (ideas) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Project Ideas</h2>
            <p className="text-muted-foreground">{ideas.length} ideas generated for you</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleGenerate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
            <Button variant="outline" onClick={() => setIdeas(null)}>
              New Search
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {ideas.map((idea, i) => (
            <Card key={i} className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">{idea.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{idea.description}</p>
                  </div>
                  <Badge className={typeColors[idea.type]}>{idea.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={difficultyColors[idea.difficulty]}>{idea.difficulty}</Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {idea.timeEstimate}
                  </Badge>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Technologies</p>
                  <div className="flex flex-wrap gap-1">
                    {idea.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        <Code className="mr-1 h-3 w-3" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">You'll Learn</p>
                  <div className="flex flex-wrap gap-1">
                    {idea.learningOutcomes.map((outcome) => (
                      <Badge key={outcome} className="bg-primary/10 text-primary text-xs">
                        <BookOpen className="mr-1 h-3 w-3" />
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="secondary">
                  Start Building
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Lightbulb className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Project Idea Generator</h2>
        <p className="mt-2 text-muted-foreground">
          Get personalized project ideas based on skills you want to learn
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleGenerate()
              }}
              className="space-y-4"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What do you want to learn? (e.g., NLP, Computer Vision)"
                className="bg-background"
              />
              <div className="flex flex-wrap gap-2">
                {["Machine Learning", "NLP", "Computer Vision", "LLMs"].map((skill) => (
                  <Button
                    key={skill}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating Ideas...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
