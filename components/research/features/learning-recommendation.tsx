"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Search, Clock, Star, Play, CheckCircle, ExternalLink } from "lucide-react"

interface Resource {
  title: string
  platform: string
  type: "course" | "tutorial" | "documentation" | "certification"
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  rating: number
  url: string
  free: boolean
}

interface LearningPath {
  skill: string
  currentLevel: number
  targetLevel: number
  resources: Resource[]
}

const samplePath: LearningPath = {
  skill: "PyTorch",
  currentLevel: 20,
  targetLevel: 80,
  resources: [
    { title: "PyTorch for Deep Learning", platform: "Coursera", type: "course", duration: "40 hours", level: "beginner", rating: 4.8, url: "#", free: false },
    { title: "Official PyTorch Tutorials", platform: "PyTorch", type: "documentation", duration: "10 hours", level: "beginner", rating: 4.9, url: "#", free: true },
    { title: "Building Neural Networks from Scratch", platform: "YouTube", type: "tutorial", duration: "5 hours", level: "intermediate", rating: 4.7, url: "#", free: true },
    { title: "PyTorch Lightning Masterclass", platform: "Udemy", type: "course", duration: "15 hours", level: "intermediate", rating: 4.6, url: "#", free: false },
    { title: "Advanced PyTorch Techniques", platform: "Fast.ai", type: "course", duration: "20 hours", level: "advanced", rating: 4.9, url: "#", free: true },
  ],
}

const typeColors = {
  course: "bg-blue-500/10 text-blue-500",
  tutorial: "bg-green-500/10 text-green-500",
  documentation: "bg-purple-500/10 text-purple-500",
  certification: "bg-amber-500/10 text-amber-500",
}

const levelColors = {
  beginner: "bg-green-500/10 text-green-500",
  intermediate: "bg-amber-500/10 text-amber-500",
  advanced: "bg-red-500/10 text-red-500",
}

export function LearningRecommendation() {
  const [skill, setSkill] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<LearningPath | null>(null)
  const [completedResources, setCompletedResources] = useState<number[]>([])

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setResult(samplePath)
      setIsSearching(false)
    }, 1500)
  }

  const toggleComplete = (index: number) => {
    if (completedResources.includes(index)) {
      setCompletedResources(completedResources.filter(i => i !== index))
    } else {
      setCompletedResources([...completedResources, index])
    }
  }

  if (result) {
    const progress = (completedResources.length / result.resources.length) * 100
    const estimatedLevel = result.currentLevel + (result.targetLevel - result.currentLevel) * (progress / 100)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Learning Path: {result.skill}</h2>
            <p className="text-muted-foreground">{result.resources.length} resources curated for you</p>
          </div>
          <Button variant="outline" onClick={() => setResult(null)}>
            New Skill
          </Button>
        </div>

        {/* Progress overview */}
        <Card className="border-border/50 bg-card/50">
          <CardContent className="py-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Your Level</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-foreground">{Math.round(estimatedLevel)}%</span>
                  <span className="text-sm text-green-500">+{Math.round(estimatedLevel - result.currentLevel)}%</span>
                </div>
                <Progress value={estimatedLevel} className="mt-2 h-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-foreground">{completedResources.length}</span>
                  <span className="text-sm text-muted-foreground">/ {result.resources.length}</span>
                </div>
                <Progress value={progress} className="mt-2 h-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Est. Time Remaining</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {result.resources
                      .filter((_, i) => !completedResources.includes(i))
                      .reduce((acc, r) => acc + parseInt(r.duration), 0)}
                  </span>
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources list */}
        <div className="space-y-4">
          {result.resources.map((resource, i) => (
            <Card 
              key={i} 
              className={`border-border/50 transition-colors ${completedResources.includes(i) ? "bg-green-500/5 border-green-500/20" : "bg-card/50"}`}
            >
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(i)}
                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      completedResources.includes(i) 
                        ? "border-green-500 bg-green-500" 
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {completedResources.includes(i) && <CheckCircle className="h-4 w-4 text-white" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${completedResources.includes(i) ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {resource.title}
                      </h3>
                      {resource.free && <Badge className="bg-green-500/10 text-green-500 text-xs">Free</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{resource.platform}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className={typeColors[resource.type]}>{resource.type}</Badge>
                      <Badge className={levelColors[resource.level]}>{resource.level}</Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {resource.duration}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        {resource.rating}
                      </Badge>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="shrink-0">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                </div>
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
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Skill Learning Recommendation</h2>
        <p className="mt-2 text-muted-foreground">
          Get a personalized learning path with courses and tutorials
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
              }}
              className="flex gap-2"
            >
              <Input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="What skill do you want to learn?"
                className="flex-1 bg-background"
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Searching..." : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {["PyTorch", "TensorFlow", "LangChain", "MLOps"].map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSkill(s)
                    setIsSearching(true)
                    setTimeout(() => {
                      setResult(samplePath)
                      setIsSearching(false)
                    }, 1500)
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
