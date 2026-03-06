"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, ArrowUp, ArrowDown, Minus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrendTopic {
  name: string
  category: string
  heat: number // 0-100
  papers: number
  growth: number // percentage
  trend: "hot" | "rising" | "stable" | "cooling"
}

const trendData: TrendTopic[] = [
  { name: "Large Language Models", category: "NLP", heat: 98, papers: 4500, growth: 340, trend: "hot" },
  { name: "Diffusion Models", category: "Vision", heat: 92, papers: 2800, growth: 280, trend: "hot" },
  { name: "Retrieval Augmented Gen.", category: "NLP", heat: 88, papers: 1200, growth: 450, trend: "hot" },
  { name: "Multimodal Learning", category: "General", heat: 85, papers: 2100, growth: 180, trend: "rising" },
  { name: "AI Agents", category: "Systems", heat: 82, papers: 890, growth: 520, trend: "hot" },
  { name: "Federated Learning", category: "Privacy", heat: 65, papers: 1800, growth: 45, trend: "stable" },
  { name: "Graph Neural Networks", category: "General", heat: 62, papers: 2400, growth: 30, trend: "stable" },
  { name: "Reinforcement Learning", category: "General", heat: 55, papers: 3200, growth: -5, trend: "cooling" },
  { name: "Neural Architecture Search", category: "AutoML", heat: 45, papers: 980, growth: -15, trend: "cooling" },
  { name: "Transformers", category: "Architecture", heat: 70, papers: 5200, growth: 25, trend: "stable" },
  { name: "Vision Transformers", category: "Vision", heat: 75, papers: 1900, growth: 85, trend: "rising" },
  { name: "Self-Supervised Learning", category: "General", heat: 68, papers: 2100, growth: 40, trend: "stable" },
]

const heatColors = [
  "bg-blue-900",
  "bg-blue-700",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-red-500",
  "bg-red-600",
  "bg-red-700",
]

function getHeatColor(heat: number): string {
  const index = Math.floor((heat / 100) * (heatColors.length - 1))
  return heatColors[index]
}

const categories = ["All", "NLP", "Vision", "General", "Systems", "Privacy", "AutoML", "Architecture"]

export function TrendHeatmap() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTopic, setSelectedTopic] = useState<TrendTopic | null>(null)

  const filteredData = selectedCategory === "All" 
    ? trendData 
    : trendData.filter(t => t.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Research Trend Heatmap</h2>
          <p className="text-muted-foreground">Visualizing research activity and growth</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Heatmap grid */}
        <Card className="border-border/50 bg-card/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Flame className="h-5 w-5 text-primary" />
              Topic Heat Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {filteredData.map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => setSelectedTopic(topic)}
                  className={cn(
                    "relative rounded-lg p-3 text-left transition-all hover:scale-105",
                    getHeatColor(topic.heat),
                    selectedTopic?.name === topic.name && "ring-2 ring-white"
                  )}
                >
                  <p className="text-xs font-medium text-white/90 line-clamp-2">
                    {topic.name}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {topic.trend === "hot" && <Flame className="h-3 w-3 text-white" />}
                    {topic.trend === "rising" && <ArrowUp className="h-3 w-3 text-white" />}
                    {topic.trend === "stable" && <Minus className="h-3 w-3 text-white/70" />}
                    {topic.trend === "cooling" && <ArrowDown className="h-3 w-3 text-white/70" />}
                    <span className="text-xs text-white/80">{topic.heat}%</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Heat scale legend */}
            <div className="mt-6">
              <p className="mb-2 text-xs text-muted-foreground">Heat Scale</p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Cold</span>
                <div className="flex h-4 flex-1 overflow-hidden rounded">
                  {heatColors.map((color, i) => (
                    <div key={i} className={cn("flex-1", color)} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Hot</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topic details */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              {selectedTopic ? selectedTopic.name : "Topic Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTopic ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedTopic.category}</Badge>
                  <Badge className={cn(
                    selectedTopic.trend === "hot" && "bg-red-500 text-white",
                    selectedTopic.trend === "rising" && "bg-orange-500 text-white",
                    selectedTopic.trend === "stable" && "bg-blue-500 text-white",
                    selectedTopic.trend === "cooling" && "bg-gray-500 text-white"
                  )}>
                    {selectedTopic.trend}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">Heat Score</p>
                    <p className="text-2xl font-bold text-foreground">{selectedTopic.heat}%</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">Papers (2025)</p>
                    <p className="text-2xl font-bold text-foreground">{selectedTopic.papers.toLocaleString()}</p>
                  </div>
                </div>

                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">YoY Growth</span>
                    <span className={cn(
                      "flex items-center gap-1 text-lg font-bold",
                      selectedTopic.growth > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {selectedTopic.growth > 0 && <ArrowUp className="h-4 w-4" />}
                      {selectedTopic.growth < 0 && <ArrowDown className="h-4 w-4" />}
                      {Math.abs(selectedTopic.growth)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Related Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {["Deep Learning", "Neural Networks", "AI"].map((topic) => (
                      <Badge key={topic} variant="outline" className="cursor-pointer">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click on a topic tile to see detailed analytics and trends.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
