"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Sparkles, Clock, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillPrediction {
  name: string
  currentDemand: number
  predictedDemand: number
  trend: "rising" | "stable" | "declining"
  timeframe: string
  confidence: number
}

const predictions: SkillPrediction[] = [
  { name: "LLM Fine-tuning", currentDemand: 65, predictedDemand: 95, trend: "rising", timeframe: "2026-2028", confidence: 89 },
  { name: "MLOps", currentDemand: 70, predictedDemand: 92, trend: "rising", timeframe: "2026-2028", confidence: 85 },
  { name: "Prompt Engineering", currentDemand: 80, predictedDemand: 75, trend: "declining", timeframe: "2026-2028", confidence: 72 },
  { name: "RAG Systems", currentDemand: 55, predictedDemand: 88, trend: "rising", timeframe: "2026-2028", confidence: 91 },
  { name: "Edge AI", currentDemand: 40, predictedDemand: 78, trend: "rising", timeframe: "2026-2028", confidence: 82 },
  { name: "AutoML", currentDemand: 50, predictedDemand: 65, trend: "rising", timeframe: "2026-2028", confidence: 75 },
  { name: "Traditional ML", currentDemand: 85, predictedDemand: 70, trend: "declining", timeframe: "2026-2028", confidence: 80 },
  { name: "AI Safety", currentDemand: 30, predictedDemand: 72, trend: "rising", timeframe: "2026-2028", confidence: 88 },
]

const trendIcons = {
  rising: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
}

const trendColors = {
  rising: "text-green-500",
  stable: "text-amber-500",
  declining: "text-red-500",
}

export function FutureSkillPredictor() {
  const [selectedSkill, setSelectedSkill] = useState<SkillPrediction | null>(null)
  const [showPredictions, setShowPredictions] = useState(false)

  const risingSkills = predictions.filter((p) => p.trend === "rising").sort((a, b) => (b.predictedDemand - b.currentDemand) - (a.predictedDemand - a.currentDemand))
  const decliningSkills = predictions.filter((p) => p.trend === "declining")

  if (!showPredictions) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Future Skill Predictor</h2>
          <p className="mt-2 text-muted-foreground">
            AI-powered predictions for skills that will be in demand over the next 5-10 years
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex flex-col items-center py-12">
              <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-6 text-center text-muted-foreground">
                Our model analyzes job postings, research trends, and technology adoption to forecast skill demand
              </p>
              <Button onClick={() => setShowPredictions(true)} size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Predictions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Skill Demand Forecast</h2>
          <p className="text-muted-foreground">Predictions for 2026-2028 based on current trends</p>
        </div>
        <Button variant="outline" onClick={() => setShowPredictions(false)}>
          Refresh Analysis
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Rising skills */}
        <Card className="border-border/50 bg-card/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Rising Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {risingSkills.map((skill) => {
                const growth = skill.predictedDemand - skill.currentDemand
                return (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    className={cn(
                      "w-full rounded-lg border border-border/50 p-4 text-left transition-colors hover:bg-secondary/50",
                      selectedSkill?.name === skill.name && "border-primary bg-primary/5"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.timeframe}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-500">+{growth}%</p>
                        <p className="text-xs text-muted-foreground">{skill.confidence}% confidence</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-muted-foreground"
                          style={{ width: `${skill.currentDemand}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">Now</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${skill.predictedDemand}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">2028</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected skill details */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                {selectedSkill ? selectedSkill.name : "Skill Details"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSkill ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = trendIcons[selectedSkill.trend]
                      return <Icon className={cn("h-5 w-5", trendColors[selectedSkill.trend])} />
                    })()}
                    <Badge className={cn(
                      selectedSkill.trend === "rising" && "bg-green-500/10 text-green-500",
                      selectedSkill.trend === "declining" && "bg-red-500/10 text-red-500"
                    )}>
                      {selectedSkill.trend}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="text-xs text-muted-foreground">Current</p>
                      <p className="text-xl font-bold text-foreground">{selectedSkill.currentDemand}%</p>
                    </div>
                    <div className="rounded-lg bg-green-500/10 p-3">
                      <p className="text-xs text-muted-foreground">Predicted</p>
                      <p className="text-xl font-bold text-green-500">{selectedSkill.predictedDemand}%</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Action Items</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Start learning now for best positioning</li>
                      <li>• Build portfolio projects</li>
                      <li>• Get certified if available</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click on a skill to see detailed predictions and recommendations.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Declining skills warning */}
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm text-red-500">
                <TrendingDown className="h-4 w-4" />
                Skills to Watch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {decliningSkills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-red-500">-{skill.currentDemand - skill.predictedDemand}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
