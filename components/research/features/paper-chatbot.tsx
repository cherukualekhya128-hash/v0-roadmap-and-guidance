"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Upload, FileText, Sparkles, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const samplePaper = {
  title: "Attention Is All You Need",
  authors: "Vaswani et al.",
  year: 2017,
  abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...",
}

const suggestedQuestions = [
  "What is the main contribution of this paper?",
  "Explain the self-attention mechanism",
  "What are the limitations mentioned?",
  "How does this compare to RNNs?",
]

export function PaperChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [paperLoaded, setPaperLoaded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const loadSamplePaper = () => {
    setPaperLoaded(true)
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `I've loaded "${samplePaper.title}" by ${samplePaper.authors} (${samplePaper.year}). This is one of the most influential papers in deep learning, introducing the Transformer architecture. What would you like to know about it?`,
      },
    ])
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "What is the main contribution of this paper?":
          "The main contribution is the **Transformer architecture**, which relies entirely on self-attention mechanisms, dispensing with recurrence and convolutions entirely. Key innovations include:\n\n1. **Multi-Head Attention** - Allows the model to attend to information from different representation subspaces\n2. **Positional Encoding** - Injects sequence order information since there's no recurrence\n3. **Scaled Dot-Product Attention** - Efficient attention computation\n\nThis architecture achieved state-of-the-art results on machine translation while being more parallelizable and requiring significantly less time to train.",
        "Explain the self-attention mechanism":
          "**Self-attention** (or intra-attention) is a mechanism that computes a representation of a sequence by relating different positions of a single sequence.\n\n**How it works:**\n1. Each position creates three vectors: Query (Q), Key (K), and Value (V)\n2. Attention scores = softmax(QK^T / √d_k)\n3. Output = weighted sum of Values\n\n**Why √d_k?** Scaling prevents dot products from growing too large, which would push softmax into regions with extremely small gradients.\n\nThe beauty is that all positions can attend to all other positions in a single step, unlike RNNs which process sequentially.",
        "What are the limitations mentioned?":
          "The paper mentions several limitations:\n\n1. **Fixed context window** - Self-attention is O(n²) in sequence length, limiting practical context sizes\n2. **No explicit recurrence** - May struggle with tasks requiring very long-range dependencies\n3. **Positional encoding** - The sinusoidal encoding might not optimally capture position information\n\nModern research has addressed some of these: sparse attention, relative position encodings, and various efficient transformer variants.",
        "How does this compare to RNNs?":
          "**Transformers vs RNNs:**\n\n| Aspect | Transformer | RNN |\n|--------|-------------|-----|\n| Parallelization | ✅ Fully parallel | ❌ Sequential |\n| Long-range deps | ✅ Direct connections | ❌ Vanishing gradients |\n| Training speed | ✅ Much faster | ❌ Slower |\n| Memory | ⚠️ O(n²) attention | ✅ O(1) per step |\n\nThe key advantage is parallelization. While RNNs must process tokens one-by-one, Transformers process entire sequences simultaneously, enabling much faster training on modern GPUs.",
      }

      const response = responses[input] || 
        `Based on the paper, ${input.toLowerCase().includes("attention") ? 
          "the attention mechanism is fundamental to the Transformer architecture. It allows the model to weigh the importance of different parts of the input when producing each part of the output." : 
          "that's an interesting question. The paper discusses how the Transformer achieves state-of-the-art results while being more efficient to train than previous sequence-to-sequence models."}`

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        },
      ])
      setIsLoading(false)
    }, 1500)
  }

  const handleQuestionClick = (question: string) => {
    setInput(question)
  }

  if (!paperLoaded) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Paper Chatbot</h2>
          <p className="mt-2 text-muted-foreground">
            Chat with any research paper using AI. Ask questions and get instant, contextual answers.
          </p>
        </div>

        <div className="mx-auto max-w-xl space-y-4">
          <Card className="border-dashed border-border/50 bg-card/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="mb-4 text-center text-muted-foreground">
                Upload a PDF or paste a paper URL
              </p>
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload PDF
                </Button>
                <Button onClick={loadSamplePaper}>
                  <FileText className="mr-2 h-4 w-4" />
                  Try Sample Paper
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground">Sample Paper</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{samplePaper.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {samplePaper.authors} • {samplePaper.year}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Paper info */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{samplePaper.title}</h3>
            <p className="text-sm text-muted-foreground">
              {samplePaper.authors} • {samplePaper.year}
            </p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Ready
          </Badge>
        </CardContent>
      </Card>

      {/* Chat area */}
      <Card className="border-border/50 bg-card/50">
        <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    message.role === "assistant"
                      ? "bg-primary/10"
                      : "bg-secondary"
                  )}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "assistant"
                      ? "bg-secondary text-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl bg-secondary px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested questions */}
        {messages.length === 1 && (
          <div className="border-t border-border/50 p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <Button
                  key={q}
                  variant="outline"
                  size="sm"
                  className="h-auto whitespace-normal py-1.5 text-left text-xs"
                  onClick={() => handleQuestionClick(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border/50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about the paper..."
              className="flex-1 bg-background"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
