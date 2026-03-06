"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Search, ChevronRight, ExternalLink, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Paper {
  id: string
  title: string
  authors: string
  year: number
  citations: number
  relevance: number
  type: "main" | "cited" | "similar"
}

const sampleTree: Paper[] = [
  { id: "1", title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, citations: 95000, relevance: 100, type: "main" },
  { id: "2", title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: 2018, citations: 78000, relevance: 95, type: "cited" },
  { id: "3", title: "GPT-3: Language Models are Few-Shot Learners", authors: "Brown et al.", year: 2020, citations: 15000, relevance: 90, type: "cited" },
  { id: "4", title: "Sequence to Sequence Learning with Neural Networks", authors: "Sutskever et al.", year: 2014, citations: 25000, relevance: 85, type: "cited" },
  { id: "5", title: "Neural Machine Translation by Jointly Learning to Align", authors: "Bahdanau et al.", year: 2014, citations: 35000, relevance: 88, type: "cited" },
  { id: "6", title: "Vision Transformer (ViT)", authors: "Dosovitskiy et al.", year: 2020, citations: 18000, relevance: 82, type: "similar" },
  { id: "7", title: "Swin Transformer", authors: "Liu et al.", year: 2021, citations: 8000, relevance: 75, type: "similar" },
  { id: "8", title: "PaLM: Scaling Language Modeling with Pathways", authors: "Chowdhery et al.", year: 2022, citations: 3000, relevance: 78, type: "similar" },
]

const typeColors = {
  main: "border-primary bg-primary/10",
  cited: "border-blue-500 bg-blue-500/10",
  similar: "border-green-500 bg-green-500/10",
}

export function LiteratureExplorer() {
  const [query, setQuery] = useState("")
  const [showTree, setShowTree] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)

  const mainPaper = sampleTree.find(p => p.type === "main")!
  const citedPapers = sampleTree.filter(p => p.type === "cited")
  const similarPapers = sampleTree.filter(p => p.type === "similar")

  if (!showTree) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <GitBranch className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Smart Literature Explorer</h2>
          <p className="mt-2 text-muted-foreground">
            Build a research tree from citations and similar papers
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (query.trim()) setShowTree(true)
                }}
                className="flex gap-2"
              >
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter paper title or DOI..."
                  className="flex-1 bg-background"
                />
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Explore
                </Button>
              </form>

              <div className="mt-4">
                <p className="mb-2 text-sm text-muted-foreground">Try a sample:</p>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setQuery("Attention Is All You Need")
                    setShowTree(true)
                  }}
                >
                  <Star className="mr-2 h-4 w-4 text-amber-500" />
                  Attention Is All You Need (Vaswani et al., 2017)
                </Button>
              </div>
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
          <h2 className="text-2xl font-bold text-foreground">Literature Tree</h2>
          <p className="text-muted-foreground">Found {sampleTree.length} related papers</p>
        </div>
        <Button variant="outline" onClick={() => setShowTree(false)}>
          New Search
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tree visualization */}
        <Card className="border-border/50 bg-card/50 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Research Tree</CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-primary/10 text-primary">Main</Badge>
                <Badge className="bg-blue-500/10 text-blue-500">Cited</Badge>
                <Badge className="bg-green-500/10 text-green-500">Similar</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Main paper */}
            <button
              onClick={() => setSelectedPaper(mainPaper)}
              className={cn(
                "mb-6 w-full rounded-lg border-2 p-4 text-left transition-all hover:shadow-md",
                typeColors.main,
                selectedPaper?.id === mainPaper.id && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{mainPaper.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {mainPaper.authors} • {mainPaper.year}
                  </p>
                </div>
                <Badge variant="secondary">{mainPaper.citations.toLocaleString()} citations</Badge>
              </div>
            </button>

            {/* Branches */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Cited papers */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-foreground">Key Citations</span>
                </div>
                <div className="space-y-2">
                  {citedPapers.map((paper) => (
                    <button
                      key={paper.id}
                      onClick={() => setSelectedPaper(paper)}
                      className={cn(
                        "w-full rounded-lg border p-3 text-left transition-all hover:bg-secondary/50",
                        typeColors.cited,
                        selectedPaper?.id === paper.id && "ring-2 ring-blue-500"
                      )}
                    >
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {paper.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {paper.year} • {paper.citations.toLocaleString()} citations
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Similar papers */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-foreground">Similar Work</span>
                </div>
                <div className="space-y-2">
                  {similarPapers.map((paper) => (
                    <button
                      key={paper.id}
                      onClick={() => setSelectedPaper(paper)}
                      className={cn(
                        "w-full rounded-lg border p-3 text-left transition-all hover:bg-secondary/50",
                        typeColors.similar,
                        selectedPaper?.id === paper.id && "ring-2 ring-green-500"
                      )}
                    >
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {paper.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {paper.year} • {paper.relevance}% relevance
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paper details */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Paper Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPaper ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">{selectedPaper.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedPaper.authors}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedPaper.year}</Badge>
                  <Badge className={typeColors[selectedPaper.type]}>
                    {selectedPaper.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">Citations</p>
                    <p className="text-xl font-bold text-foreground">
                      {selectedPaper.citations.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <p className="text-xs text-muted-foreground">Relevance</p>
                    <p className="text-xl font-bold text-primary">{selectedPaper.relevance}%</p>
                  </div>
                </div>

                <Button className="w-full gap-2" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                  View Paper
                </Button>

                <Button className="w-full" onClick={() => setSelectedPaper({ ...selectedPaper, type: "main" })}>
                  Explore This Paper
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click on a paper in the tree to see details.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
