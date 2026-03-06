"use client"

import { useState, useRef, useEffect, useId } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  User,
  Send,
  Upload,
  FileText,
  Sparkles,
  Trash2,
  BookOpen,
  Lightbulb,
  Search,
  Quote,
  X,
  Loader2,
  MessageSquare,
  ChevronDown,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { cn } from "@/lib/utils"

function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

const suggestedQuestions = [
  { icon: BookOpen, text: "Summarize this paper", prompt: "Please provide a comprehensive summary of this research paper." },
  { icon: Lightbulb, text: "Key findings", prompt: "What are the main findings and contributions of this paper?" },
  { icon: Search, text: "Methodology", prompt: "Explain the methodology used in this research." },
  { icon: Quote, text: "Generate citation", prompt: "Generate an APA citation for this paper." },
]

export function PaperChatbot() {
  const sessionId = useId()
  const [paperContent, setPaperContent] = useState<string>("")
  const [paperName, setPaperName] = useState<string>("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/research-chat",
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages,
          paperContent: paperContent || undefined,
          sessionId,
        },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setPaperName(file.name)

    try {
      if (file.type === "application/pdf") {
        // For PDF files, we'll read as text (in production, use a PDF parser)
        const text = await file.text()
        // Basic PDF text extraction simulation
        const cleanedText = text
          .replace(/[^\x20-\x7E\n]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
        setPaperContent(cleanedText || `[PDF File: ${file.name}] - Content extracted from uploaded PDF.`)
      } else {
        // For text files
        const text = await file.text()
        setPaperContent(text)
      }
    } catch (error) {
      console.error("Error reading file:", error)
      setPaperContent(`[File: ${file.name}] - Error reading file content.`)
    }

    setIsUploading(false)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 500) {
      // Likely a paper paste
      setPaperContent(pastedText)
      setPaperName("Pasted Content")
    }
  }

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isLoading) return
    sendMessage({ text })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const text = textareaRef.current?.value || ""
      if (text.trim()) {
        handleSendMessage(text)
        if (textareaRef.current) {
          textareaRef.current.value = ""
        }
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = textareaRef.current?.value || ""
    if (text.trim()) {
      handleSendMessage(text)
      if (textareaRef.current) {
        textareaRef.current.value = ""
      }
    }
  }

  const clearChat = () => {
    setMessages([])
    setPaperContent("")
    setPaperName("")
  }

  return (
    <section id="paper-chatbot" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 gap-2 border-primary/30 bg-primary/10 px-4 py-2 text-primary">
            <MessageSquare className="h-4 w-4" />
            AI-Powered Chatbot
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Research Paper <span className="text-primary">Assistant</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Upload your research paper and ask questions. Powered by LLM and RAG with FAISS-style retrieval.
          </p>
        </div>

        <Card
          className={cn(
            "relative mx-auto overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300",
            isExpanded ? "h-[700px] max-w-5xl" : "h-[600px] max-w-4xl"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Paper Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  {paperName ? `Analyzing: ${paperName}` : "Upload a paper to get started"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={clearChat}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Upload Area */}
          {!paperContent && (
            <div className="border-b border-border/50 bg-secondary/20 px-4 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  className="gap-2 border-dashed border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Paper (PDF/TXT)
                </Button>
                <span className="text-sm text-muted-foreground">or paste paper content directly in the chat</span>
              </div>
            </div>
          )}

          {/* Paper Badge */}
          {paperContent && (
            <div className="border-b border-border/50 bg-chart-2/10 px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-chart-2" />
                  <span className="text-sm font-medium text-chart-2">{paperName}</span>
                  <Badge variant="outline" className="border-chart-2/30 bg-chart-2/10 text-xs text-chart-2">
                    {Math.ceil(paperContent.length / 1000)}k chars
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-chart-2/70 hover:text-destructive"
                  onClick={() => {
                    setPaperContent("")
                    setPaperName("")
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className={cn("px-4", isExpanded ? "h-[420px]" : "h-[320px]", !paperContent && "h-[calc(100%-200px)]")}>
            <div className="space-y-4 py-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">Start a Conversation</h4>
                  <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                    {paperContent
                      ? "Your paper is loaded! Ask questions about the content, methodology, or findings."
                      : "Upload a research paper or paste content to begin analyzing with AI."}
                  </p>
                  {paperContent && (
                    <div className="grid grid-cols-2 gap-2">
                      {suggestedQuestions.map((q) => (
                        <Button
                          key={q.text}
                          variant="outline"
                          className="h-auto justify-start gap-2 border-border/50 px-3 py-2 text-left text-xs hover:bg-secondary"
                          onClick={() => handleSendMessage(q.prompt)}
                        >
                          <q.icon className="h-3 w-3 shrink-0 text-primary" />
                          {q.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground"
                      )}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {getMessageText(message)}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Analyzing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-card/95 p-4 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                ref={textareaRef}
                placeholder={paperContent ? "Ask about the paper..." : "Paste paper content or ask a question..."}
                className="min-h-[44px] max-h-[120px] resize-none border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Powered by LLM + RAG with FAISS-style retrieval
              </p>
              <div className="flex items-center gap-1">
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Shift + Enter for new line</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
