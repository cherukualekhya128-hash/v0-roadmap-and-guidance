"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Search, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react"

interface CompetitionAnalysis {
  jobTitle: string
  company: string
  estimatedApplicants: number
  competitionLevel: "low" | "medium" | "high" | "very high"
  yourChance: number
  insights: { type: "positive" | "warning" | "neutral"; text: string }[]
  tips: string[]
  bestTimeToApply: string
}

const sampleAnalysis: CompetitionAnalysis = {
  jobTitle: "Senior ML Engineer",
  company: "TechCorp",
  estimatedApplicants: 450,
  competitionLevel: "high",
  yourChance: 8.5,
  insights: [
    { type: "positive", text: "Your Python skills match the requirements exactly" },
    { type: "positive", text: "2+ years ML experience puts you in top 30% of applicants" },
    { type: "warning", text: "Missing Kubernetes experience (nice-to-have)" },
    { type: "neutral", text: "Remote position attracts 2x more applicants" },
    { type: "warning", text: "Posted 2 weeks ago - early applicants have advantage" },
  ],
  tips: [
    "Highlight any containerization/Docker experience as Kubernetes alternative",
    "Mention specific ML models you've deployed to production",
    "Apply within next 3 days for best visibility",
    "Tailor resume to emphasize PyTorch over TensorFlow",
  ],
  bestTimeToApply: "Tuesday or Wednesday morning (10 AM EST)",
}

const levelColors = {
  low: "bg-green-500/10 text-green-500",
  medium: "bg-amber-500/10 text-amber-500",
  high: "bg-orange-500/10 text-orange-500",
  "very high": "bg-red-500/10 text-red-500",
}

export function CompetitionAnalyzer() {
  const [jobUrl, setJobUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<CompetitionAnalysis | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult(sampleAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{result.jobTitle}</h2>
            <p className="text-muted-foreground">{result.company}</p>
          </div>
          <Button variant="outline" onClick={() => setResult(null)}>
            Analyze Another
          </Button>
        </div>

        {/* Key metrics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.estimatedApplicants}</p>
                  <p className="text-xs text-muted-foreground">Est. Applicants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <Badge className={levelColors[result.competitionLevel]}>
                    {result.competitionLevel}
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">Competition Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{result.yourChance}%</p>
                  <p className="text-xs text-muted-foreground">Your Chance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Insights */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Analysis Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3">
                  {insight.type === "positive" && (
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  )}
                  {insight.type === "warning" && (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  )}
                  {insight.type === "neutral" && (
                    <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-blue-500/10 p-1">
                      <div className="h-full w-full rounded-full bg-blue-500" />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">{insight.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Best time to apply */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Best Time to Apply</p>
              <p className="font-semibold text-foreground">{result.bestTimeToApply}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Job Competition Analyzer</h2>
        <p className="mt-2 text-muted-foreground">
          Estimate competition and your chances for any job posting
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAnalyze()
              }}
              className="space-y-4"
            >
              <Input
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="Paste job posting URL or title..."
                className="bg-background"
              />
              <Button type="submit" className="w-full" disabled={isAnalyzing}>
                {isAnalyzing ? "Analyzing..." : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Competition
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4">
              <p className="mb-2 text-sm text-muted-foreground">Or try a sample:</p>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setJobUrl("Senior ML Engineer at TechCorp")
                  handleAnalyze()
                }}
              >
                Senior ML Engineer at TechCorp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
