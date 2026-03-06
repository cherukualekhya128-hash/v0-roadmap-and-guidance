"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Database, Search, Download, Star, ExternalLink } from "lucide-react"

interface Dataset {
  name: string
  source: "Kaggle" | "HuggingFace" | "UCI" | "Papers With Code"
  description: string
  size: string
  format: string
  relevance: number
  downloads: string
  rating: number
  tags: string[]
}

const sampleDatasets: Dataset[] = [
  {
    name: "IMDB Movie Reviews",
    source: "HuggingFace",
    description: "50,000 movie reviews for sentiment analysis with binary labels",
    size: "84 MB",
    format: "CSV/Parquet",
    relevance: 95,
    downloads: "2.5M",
    rating: 4.8,
    tags: ["NLP", "Sentiment", "Text Classification"],
  },
  {
    name: "Amazon Product Reviews",
    source: "Kaggle",
    description: "Multi-domain product reviews with ratings and helpfulness scores",
    size: "1.2 GB",
    format: "JSON",
    relevance: 88,
    downloads: "890K",
    rating: 4.6,
    tags: ["NLP", "E-commerce", "Reviews"],
  },
  {
    name: "Twitter Sentiment140",
    source: "Kaggle",
    description: "1.6 million tweets with sentiment labels for social media analysis",
    size: "240 MB",
    format: "CSV",
    relevance: 82,
    downloads: "1.2M",
    rating: 4.5,
    tags: ["Twitter", "Sentiment", "Social Media"],
  },
  {
    name: "Stanford Sentiment Treebank",
    source: "Papers With Code",
    description: "Fine-grained sentiment labels on parse trees of sentences",
    size: "32 MB",
    format: "Text",
    relevance: 78,
    downloads: "450K",
    rating: 4.7,
    tags: ["NLP", "Fine-grained", "Research"],
  },
]

const sourceColors = {
  "Kaggle": "bg-blue-500/10 text-blue-500",
  "HuggingFace": "bg-yellow-500/10 text-yellow-500",
  "UCI": "bg-green-500/10 text-green-500",
  "Papers With Code": "bg-purple-500/10 text-purple-500",
}

export function DatasetRecommender() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<Dataset[] | null>(null)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setResults(sampleDatasets)
      setIsSearching(false)
    }, 1500)
  }

  if (results) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Recommended Datasets</h2>
            <p className="text-muted-foreground">{results.length} datasets found for your topic</p>
          </div>
          <Button variant="outline" onClick={() => setResults(null)}>
            New Search
          </Button>
        </div>

        <div className="space-y-4">
          {results.map((dataset, i) => (
            <Card key={i} className="border-border/50 bg-card/50">
              <CardContent className="py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{dataset.name}</h3>
                      <Badge className={sourceColors[dataset.source]}>{dataset.source}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{dataset.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {dataset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="font-medium text-foreground">{dataset.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Download className="mr-1 inline h-3 w-3" />
                      {dataset.downloads}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Size: {dataset.size}</span>
                    <span>Format: {dataset.format}</span>
                    <span className="text-primary">{dataset.relevance}% match</span>
                  </div>
                  <Button size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Dataset
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
          <Database className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Dataset Recommender</h2>
        <p className="mt-2 text-muted-foreground">
          Find the perfect datasets for your research or ML projects
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your research topic..."
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
              {["Sentiment Analysis", "Image Classification", "NLP", "Time Series"].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery(topic)
                    setIsSearching(true)
                    setTimeout(() => {
                      setResults(sampleDatasets)
                      setIsSearching(false)
                    }, 1500)
                  }}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
