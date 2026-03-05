import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">CareerGPT</span>
        </div>

        <p className="text-sm text-muted-foreground">
          Built with NLP + LLM + RAG. Solving real student problems with AI innovation.
        </p>

        <div className="flex gap-6">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Architecture
          </a>
          <a href="#demo" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Demo
          </a>
        </div>
      </div>
    </footer>
  )
}
