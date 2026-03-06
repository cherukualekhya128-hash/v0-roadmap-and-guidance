"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Network, Search, Zap, GitBranch, Code, Database } from "lucide-react"
import { cn } from "@/lib/utils"

interface Node {
  id: string
  label: string
  type: "job" | "skill" | "paper" | "tech"
  x: number
  y: number
}

interface Edge {
  from: string
  to: string
}

const sampleGraph: { nodes: Node[]; edges: Edge[] } = {
  nodes: [
    { id: "1", label: "ML Engineer", type: "job", x: 50, y: 50 },
    { id: "2", label: "Python", type: "skill", x: 25, y: 30 },
    { id: "3", label: "TensorFlow", type: "tech", x: 75, y: 30 },
    { id: "4", label: "Deep Learning", type: "skill", x: 50, y: 15 },
    { id: "5", label: "Attention Paper", type: "paper", x: 30, y: 70 },
    { id: "6", label: "BERT Paper", type: "paper", x: 70, y: 70 },
    { id: "7", label: "NLP", type: "skill", x: 15, y: 55 },
    { id: "8", label: "PyTorch", type: "tech", x: 85, y: 55 },
  ],
  edges: [
    { from: "1", to: "2" },
    { from: "1", to: "3" },
    { from: "1", to: "4" },
    { from: "4", to: "5" },
    { from: "4", to: "6" },
    { from: "5", to: "7" },
    { from: "6", to: "7" },
    { from: "3", to: "8" },
    { from: "2", to: "7" },
  ],
}

const typeColors = {
  job: "bg-blue-500",
  skill: "bg-green-500",
  paper: "bg-amber-500",
  tech: "bg-purple-500",
}

const typeLabels = {
  job: "Job Role",
  skill: "Skill",
  paper: "Paper",
  tech: "Technology",
}

export function KnowledgeGraph() {
  const [query, setQuery] = useState("")
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [showGraph, setShowGraph] = useState(false)

  const handleSearch = () => {
    if (query.trim()) {
      setShowGraph(true)
    }
  }

  if (!showGraph) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Network className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Job-Research Knowledge Graph</h2>
          <p className="mt-2 text-muted-foreground">
            Explore connections between jobs, skills, technologies, and research papers
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
                  placeholder="Enter a job title or skill (e.g., Machine Learning Engineer)"
                  className="flex-1 bg-background"
                />
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Explore
                </Button>
              </form>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Try:</span>
                {["ML Engineer", "Data Scientist", "NLP Researcher"].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(suggestion)
                      setShowGraph(true)
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
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
          <h2 className="text-2xl font-bold text-foreground">Knowledge Graph: {query}</h2>
          <p className="text-muted-foreground">Click on nodes to explore connections</p>
        </div>
        <Button variant="outline" onClick={() => setShowGraph(false)}>
          New Search
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Graph visualization */}
        <Card className="border-border/50 bg-card/50 lg:col-span-2">
          <CardContent className="p-6">
            <div className="relative h-[400px] w-full rounded-lg bg-background/50">
              {/* SVG for edges */}
              <svg className="absolute inset-0 h-full w-full">
                {sampleGraph.edges.map((edge, i) => {
                  const from = sampleGraph.nodes.find((n) => n.id === edge.from)!
                  const to = sampleGraph.nodes.find((n) => n.id === edge.to)!
                  return (
                    <line
                      key={i}
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border"
                    />
                  )
                })}
              </svg>

              {/* Nodes */}
              {sampleGraph.nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-transform hover:scale-110",
                    selectedNode?.id === node.id && "scale-110"
                  )}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg",
                      typeColors[node.type],
                      selectedNode?.id === node.id && "ring-2 ring-white ring-offset-2 ring-offset-background"
                    )}
                  >
                    {node.type === "job" && <Zap className="h-5 w-5" />}
                    {node.type === "skill" && <GitBranch className="h-5 w-5" />}
                    {node.type === "paper" && <Database className="h-5 w-5" />}
                    {node.type === "tech" && <Code className="h-5 w-5" />}
                  </div>
                  <span className="max-w-20 truncate text-xs font-medium text-foreground">
                    {node.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", color)} />
                  <span className="text-xs text-muted-foreground">
                    {typeLabels[type as keyof typeof typeLabels]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details panel */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              {selectedNode ? selectedNode.label : "Node Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <Badge className={cn("text-white", typeColors[selectedNode.type])}>
                    {typeLabels[selectedNode.type]}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Connected to:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleGraph.edges
                      .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                      .map((e) => {
                        const connectedId = e.from === selectedNode.id ? e.to : e.from
                        const connectedNode = sampleGraph.nodes.find((n) => n.id === connectedId)!
                        return (
                          <Badge
                            key={connectedId}
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => setSelectedNode(connectedNode)}
                          >
                            {connectedNode.label}
                          </Badge>
                        )
                      })}
                  </div>
                </div>
                {selectedNode.type === "skill" && (
                  <div className="rounded-lg bg-primary/5 p-3">
                    <p className="text-sm text-foreground">
                      <strong>Learning Resources:</strong> Found 12 courses and 8 tutorials for this skill
                    </p>
                  </div>
                )}
                {selectedNode.type === "paper" && (
                  <div className="rounded-lg bg-primary/5 p-3">
                    <p className="text-sm text-foreground">
                      <strong>Citations:</strong> 15,000+
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Highly influential paper in the field
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click on a node in the graph to see its details and connections.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
