"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Upload, Sparkles, BookOpen, Code, Trophy } from "lucide-react"

interface ResearchTopic {
  title: string
  description: string
  matchScore: number
  difficulty: "beginner" | "intermediate" | "advanced"
  requiredSkills: string[]
  yourSkills: string[]
}

const sampleTopics: ResearchTopic[] = [
  {
    title: "Sentiment Analysis with Deep Learning",
    description: "Build a sentiment classifier using transformer models on social media data",
    matchScore: 92,
    difficulty: "intermediate",
    requiredSkills: ["Python", "PyTorch", "NLP", "Transformers"],
    yourSkills: ["Python", "PyTorch"],
  },
  {
    title: "Time Series Forecasting with LSTMs",
    description: "Predict stock prices or weather patterns using recurrent neural networks",
    matchScore: 85,
    difficulty: "intermediate",
    requiredSkills: ["Python", "TensorFlow", "Statistics", "Data Analysis"],
    yourSkills: ["Python", "Statistics"],
  },
  {
    title: "Image Classification Pipeline",
    description: "Build an end-to-end CNN pipeline for medical image classification",
    matchScore: 78,
    difficulty: "advanced",
    requiredSkills: ["Python", "PyTorch", "Computer Vision", "CNNs"],
    yourSkills: ["Python", "PyTorch"],
  },
  {
    title: "Recommendation System Design",
    description: "Create a collaborative filtering recommendation engine",
    matchScore: 72,
    difficulty: "beginner",
    requiredSkills: ["Python", "SQL", "Linear Algebra", "Machine Learning"],
    yourSkills: ["Python", "SQL"],
  },
]

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500",
  intermediate: "bg-amber-500/10 text-amber-500",
  advanced: "bg-red-500/10 text-red-500",
}

export function ResumeTopicMapper() {
  const [resumeText, setResumeText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ResearchTopic[] | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResults(sampleTopics)
      setIsAnalyzing(false)
    }, 2000)
  }

  const loadSample = () => {
    setResumeText(`Skills: Python, PyTorch, SQL, Statistics, Data Analysis, Machine Learning
Experience: 2 years as Data Analyst at Tech Corp
Education: B.S. in Computer Science
Projects: Built a customer churn prediction model, Created data dashboards with Python`)
  }

  if (results) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Recommended Research Topics</h2>
            <p className="text-muted-foreground">{results.length} topics matched to your profile</p>
          </div>
          <Button variant="outline" onClick={() => setResults(null)}>
            Analyze Another
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {results.map((topic, i) => (
            <Card key={i} className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">{topic.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                  <Badge className={difficultyColors[topic.difficulty]}>
                    {topic.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Match Score</span>
                    <span className="font-medium text-primary">{topic.matchScore}%</span>
                  </div>
                  <Progress value={topic.matchScore} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Your Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.yourSkills.map((skill) => (
                        <Badge key={skill} className="bg-green-500/10 text-green-500 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">To Learn</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.requiredSkills
                        .filter((s) => !topic.yourSkills.includes(s))
                        .map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="secondary">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Learning Path
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
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Resume to Research Topic Mapper</h2>
        <p className="mt-2 text-muted-foreground">
          Discover research topics that match your skills and experience
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume or list your skills, experience, and education..."
              className="min-h-[200px] bg-background"
            />
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={loadSample}>
                Load Sample
              </Button>
              <Button onClick={handleAnalyze} disabled={!resumeText.trim() || isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Find Topics
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-border/50 bg-card/30">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Or upload a PDF resume (coming soon)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
