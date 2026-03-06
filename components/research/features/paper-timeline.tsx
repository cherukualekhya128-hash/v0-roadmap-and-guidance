"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, Search, Star, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  year: number
  title: string
  authors: string
  description: string
  citations: number
  milestone: boolean
}

const sampleTimeline: TimelineEvent[] = [
  { year: 2012, title: "AlexNet", authors: "Krizhevsky et al.", description: "Deep CNNs achieve breakthrough in ImageNet, sparking deep learning revolution", citations: 120000, milestone: true },
  { year: 2014, title: "GAN", authors: "Goodfellow et al.", description: "Generative Adversarial Networks introduce adversarial training", citations: 58000, milestone: true },
  { year: 2014, title: "Seq2Seq with Attention", authors: "Bahdanau et al.", description: "Attention mechanism for neural machine translation", citations: 35000, milestone: true },
  { year: 2015, title: "ResNet", authors: "He et al.", description: "Residual connections enable training of very deep networks", citations: 180000, milestone: true },
  { year: 2017, title: "Transformer", authors: "Vaswani et al.", description: "Attention Is All You Need - self-attention replaces recurrence", citations: 95000, milestone: true },
  { year: 2018, title: "BERT", authors: "Devlin et al.", description: "Bidirectional pre-training revolutionizes NLP", citations: 78000, milestone: true },
  { year: 2020, title: "GPT-3", authors: "Brown et al.", description: "Large language models show emergent few-shot capabilities", citations: 15000, milestone: true },
  { year: 2020, title: "Vision Transformer", authors: "Dosovitskiy et al.", description: "Transformers achieve SOTA on image classification", citations: 18000, milestone: false },
  { year: 2021, title: "CLIP", authors: "Radford et al.", description: "Contrastive learning connects vision and language", citations: 12000, milestone: false },
  { year: 2022, title: "ChatGPT", authors: "OpenAI", description: "RLHF-trained model achieves human-like conversation", citations: 5000, milestone: true },
]

export function PaperTimeline() {
  const [topic, setTopic] = useState("")
  const [showTimeline, setShowTimeline] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  const handleSearch = () => {
    if (topic.trim()) setShowTimeline(true)
  }

  if (!showTimeline) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Research Paper Timeline</h2>
          <p className="mt-2 text-muted-foreground">
            Visualize how research evolved over time for any topic
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
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a research topic (e.g., Deep Learning)"
                  className="flex-1 bg-background"
                />
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </form>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Deep Learning", "NLP", "Computer Vision", "Transformers"].map((t) => (
                  <Button
                    key={t}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTopic(t)
                      setShowTimeline(true)
                    }}
                  >
                    {t}
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
          <h2 className="text-2xl font-bold text-foreground">{topic} Timeline</h2>
          <p className="text-muted-foreground">2012 - 2022 • {sampleTimeline.length} key papers</p>
        </div>
        <Button variant="outline" onClick={() => setShowTimeline(false)}>
          New Topic
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline */}
        <Card className="border-border/50 bg-card/50 lg:col-span-2">
          <CardContent className="py-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />

              <div className="space-y-6">
                {sampleTimeline.map((event, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedEvent(event)}
                    className={cn(
                      "relative flex w-full gap-4 rounded-lg p-3 text-left transition-colors hover:bg-secondary/50",
                      selectedEvent?.title === event.title && "bg-primary/5 ring-1 ring-primary"
                    )}
                  >
                    {/* Year marker */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2",
                        event.milestone 
                          ? "border-primary bg-primary text-primary-foreground" 
                          : "border-border bg-background"
                      )}>
                        {event.milestone && <Star className="h-4 w-4" />}
                      </div>
                      <span className="mt-1 text-xs font-medium text-muted-foreground">
                        {event.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        {event.milestone && (
                          <Badge className="bg-amber-500/10 text-amber-500 text-xs">Milestone</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{event.authors}</p>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    {/* Citations */}
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary">
                        {(event.citations / 1000).toFixed(0)}k
                      </span>
                      <p className="text-xs text-muted-foreground">citations</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details panel */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              {selectedEvent ? selectedEvent.title : "Paper Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{selectedEvent.authors}</p>
                  <Badge variant="secondary" className="mt-2">{selectedEvent.year}</Badge>
                </div>

                <p className="text-sm text-foreground">{selectedEvent.description}</p>

                <div className="rounded-lg bg-primary/10 p-4">
                  <p className="text-2xl font-bold text-primary">
                    {selectedEvent.citations.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total citations</p>
                </div>

                {selectedEvent.milestone && (
                  <div className="rounded-lg bg-amber-500/10 p-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium text-amber-500">Milestone Paper</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      This paper marked a significant breakthrough in the field
                    </p>
                  </div>
                )}

                <Button className="w-full gap-2" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                  View Paper
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click on a paper in the timeline to see details.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
