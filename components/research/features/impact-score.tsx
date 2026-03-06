"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Search, TrendingUp, Users, Star, Award } from "lucide-react"

interface PaperScore {
  title: string
  authors: string
  year: number
  impactScore: number
  citationVelocity: number
  noveltyScore: number
  industryRelevance: number
  prediction: string
  factors: { label: string; score: number }[]
}

const sampleScore: PaperScore = {
  title: "Attention Is All You Need",
  authors: "Vaswani et al.",
  year: 2017,
  impactScore: 98,
  citationVelocity: 95,
  noveltyScore: 92,
  industryRelevance: 99,
  prediction: "This paper is predicted to be a landmark contribution with lasting impact on the field.",
  factors: [
    { label: "Citation Growth Rate", score: 95 },
    { label: "Author H-Index", score: 88 },
    { label: "Venue Prestige", score: 96 },
    { label: "Topic Novelty", score: 92 },
    { label: "Industry Adoption", score: 99 },
    { label: "Open Source Impact", score: 97 },
  ],
}

export function ImpactScore() {
  const [query, setQuery] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<PaperScore | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult(sampleScore)
      setIsAnalyzing(false)
    }, 2000)
  }

  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{result.title}</h2>
            <p className="text-muted-foreground">{result.authors} • {result.year}</p>
          </div>
          <Button variant="outline" onClick={() => setResult(null)}>
            Analyze Another
          </Button>
        </div>

        {/* Main score */}
        <Card className="border-border/50 bg-card/50">
          <CardContent className="py-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary bg-primary/10">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{result.impactScore}</div>
                    <div className="text-xs text-muted-foreground">Impact Score</div>
                  </div>
                </div>
                <div className="absolute -right-2 -top-2 rounded-full bg-amber-500 p-2">
                  <Award className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="mt-4 max-w-md text-center text-sm text-muted-foreground">
                {result.prediction}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Score breakdown */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.citationVelocity}</p>
                  <p className="text-xs text-muted-foreground">Citation Velocity</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Star className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.noveltyScore}</p>
                  <p className="text-xs text-muted-foreground">Novelty Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.industryRelevance}</p>
                  <p className="text-xs text-muted-foreground">Industry Relevance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed factors */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Score Factors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.factors.map((factor) => (
              <div key={factor.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{factor.label}</span>
                  <span className="font-medium text-foreground">{factor.score}/100</span>
                </div>
                <Progress value={factor.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Research Impact Score</h2>
        <p className="mt-2 text-muted-foreground">
          Predict the impact of any research paper using AI analysis
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
              className="flex gap-2"
            >
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter paper title or DOI..."
                className="flex-1 bg-background"
              />
              <Button type="submit" disabled={!query.trim() || isAnalyzing}>
                {isAnalyzing ? "Analyzing..." : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4">
              <p className="mb-2 text-sm text-muted-foreground">Try a sample:</p>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setQuery("Attention Is All You Need")
                  handleAnalyze()
                }}
              >
                <Star className="mr-2 h-4 w-4 text-amber-500" />
                Attention Is All You Need
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
