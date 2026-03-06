"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Sparkles, Code, Wrench, BookOpen, TrendingUp } from "lucide-react"

interface ExtractedSkill {
  name: string
  category: "language" | "framework" | "tool" | "concept"
  confidence: number
  industryRelevance: "high" | "medium" | "low"
}

const sampleExtraction: ExtractedSkill[] = [
  { name: "Python", category: "language", confidence: 95, industryRelevance: "high" },
  { name: "PyTorch", category: "framework", confidence: 90, industryRelevance: "high" },
  { name: "Transformer Architecture", category: "concept", confidence: 88, industryRelevance: "high" },
  { name: "Self-Attention", category: "concept", confidence: 92, industryRelevance: "medium" },
  { name: "TensorFlow", category: "framework", confidence: 75, industryRelevance: "high" },
  { name: "CUDA", category: "tool", confidence: 60, industryRelevance: "medium" },
  { name: "NumPy", category: "framework", confidence: 85, industryRelevance: "high" },
  { name: "Encoder-Decoder", category: "concept", confidence: 80, industryRelevance: "medium" },
]

const categoryIcons = {
  language: Code,
  framework: Wrench,
  tool: Wrench,
  concept: BookOpen,
}

const categoryColors = {
  language: "bg-blue-500/10 text-blue-500",
  framework: "bg-green-500/10 text-green-500",
  tool: "bg-orange-500/10 text-orange-500",
  concept: "bg-purple-500/10 text-purple-500",
}

const relevanceColors = {
  high: "text-green-500",
  medium: "text-amber-500",
  low: "text-red-500",
}

export function SkillExtractor() {
  const [text, setText] = useState("")
  const [isExtracting, setIsExtracting] = useState(false)
  const [results, setResults] = useState<ExtractedSkill[] | null>(null)

  const handleExtract = () => {
    setIsExtracting(true)
    setTimeout(() => {
      setResults(sampleExtraction)
      setIsExtracting(false)
    }, 2000)
  }

  const loadSample = () => {
    setText(`The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU.`)
  }

  if (results) {
    const byCategory = results.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, ExtractedSkill[]>)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Extracted Skills</h2>
            <p className="text-muted-foreground">{results.length} skills identified from the paper</p>
          </div>
          <Button variant="outline" onClick={() => setResults(null)}>
            Analyze Another
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skills by category */}
          {Object.entries(byCategory).map(([category, skills]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <Card key={category} className="border-border/50 bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <Icon className="h-5 w-5 text-primary" />
                    {category.charAt(0).toUpperCase() + category.slice(1)}s
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={categoryColors[skill.category]}>
                            {skill.name}
                          </Badge>
                          <span className={`text-xs ${relevanceColors[skill.industryRelevance]}`}>
                            {skill.industryRelevance} demand
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.confidence}%</span>
                      </div>
                      <Progress value={skill.confidence} className="h-1.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Industry insights */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Industry Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-green-500/10 p-4">
                <p className="text-2xl font-bold text-green-500">
                  {results.filter((s) => s.industryRelevance === "high").length}
                </p>
                <p className="text-sm text-muted-foreground">High-demand skills</p>
              </div>
              <div className="rounded-lg bg-amber-500/10 p-4">
                <p className="text-2xl font-bold text-amber-500">85%</p>
                <p className="text-sm text-muted-foreground">Job market coverage</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-2xl font-bold text-primary">$145k</p>
                <p className="text-sm text-muted-foreground">Avg. salary (US)</p>
              </div>
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
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Research to Skill Extractor</h2>
        <p className="mt-2 text-muted-foreground">
          Paste paper text to extract skills, technologies, and industry relevance
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste research paper abstract or methodology section here..."
              className="min-h-[200px] bg-background"
            />
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={loadSample}>
                Load Sample Text
              </Button>
              <Button onClick={handleExtract} disabled={!text.trim() || isExtracting}>
                {isExtracting ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Extract Skills
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
