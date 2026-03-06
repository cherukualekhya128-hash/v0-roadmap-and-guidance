"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileSearch, Sparkles, CheckCircle, AlertTriangle, Info } from "lucide-react"

interface SimplifiedJob {
  title: string
  company: string
  mustHave: string[]
  niceToHave: string[]
  dailyTasks: string[]
  redFlags: string[]
  salary: string
  culture: string
}

const sampleResult: SimplifiedJob = {
  title: "Senior Machine Learning Engineer",
  company: "TechCorp Inc.",
  mustHave: [
    "Python (3+ years)",
    "PyTorch or TensorFlow experience",
    "ML model deployment (MLOps basics)",
    "SQL for data querying",
  ],
  niceToHave: [
    "Kubernetes experience",
    "Spark/distributed computing",
    "PhD in related field",
    "AWS/GCP certifications",
  ],
  dailyTasks: [
    "Building and training ML models",
    "Collaborating with data engineers",
    "Code reviews and documentation",
    "A/B testing and model evaluation",
  ],
  redFlags: [
    "\"Fast-paced environment\" - likely long hours",
    "\"Wear many hats\" - unclear role boundaries",
  ],
  salary: "$150,000 - $200,000 (estimated from market data)",
  culture: "Remote-first, startup mentality, emphasis on ownership",
}

export function JobDescriptionSimplifier() {
  const [jobText, setJobText] = useState("")
  const [isSimplifying, setIsSimplifying] = useState(false)
  const [result, setResult] = useState<SimplifiedJob | null>(null)

  const handleSimplify = () => {
    setIsSimplifying(true)
    setTimeout(() => {
      setResult(sampleResult)
      setIsSimplifying(false)
    }, 2000)
  }

  const loadSample = () => {
    setJobText(`Senior Machine Learning Engineer - TechCorp Inc.

We're looking for a rockstar ML engineer to join our fast-paced, innovative team! You'll be wearing many hats and driving impact across the organization.

Requirements:
- 5+ years experience in a relevant field
- Strong proficiency in Python and deep learning frameworks
- Experience with cloud platforms (AWS/GCP/Azure)
- Excellent communication skills
- PhD preferred
- Experience with Kubernetes and distributed systems a plus

You will:
- Design and implement state-of-the-art ML solutions
- Collaborate cross-functionally with stakeholders
- Drive technical excellence and mentor junior engineers
- Deploy models at scale

We offer competitive compensation, unlimited PTO, and a dynamic work environment.`)
  }

  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{result.title}</h2>
            <p className="text-muted-foreground">{result.company}</p>
          </div>
          <Button variant="outline" onClick={() => setResult(null)}>
            Analyze Another
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Must have */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Must Have Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.mustHave.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Nice to have */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Info className="h-5 w-5 text-blue-500" />
                Nice to Have
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.niceToHave.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Daily tasks */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-foreground">What You'll Actually Do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.dailyTasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    {task}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Red flags */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Things to Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-600">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {flag}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <span className="text-lg">💰</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Salary</p>
                <p className="font-semibold text-foreground">{result.salary}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <span className="text-lg">🏢</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Culture</p>
                <p className="font-semibold text-foreground">{result.culture}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <FileSearch className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Job Description Simplifier</h2>
        <p className="mt-2 text-muted-foreground">
          Cut through the jargon and understand what jobs really require
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <Textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste a job description here..."
              className="min-h-[250px] bg-background"
            />
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={loadSample}>
                Load Sample
              </Button>
              <Button onClick={handleSimplify} disabled={!jobText.trim() || isSimplifying}>
                {isSimplifying ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Simplifying...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Simplify
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
