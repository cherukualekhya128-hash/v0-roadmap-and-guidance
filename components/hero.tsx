import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background glow effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            AI-Powered Career Intelligence
          </span>
        </div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl">
          Your AI Career &{" "}
          <span className="text-primary">Research</span>{" "}
          Assistant
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Upload your resume and let AI analyze your skills, match you with jobs,
          detect skill gaps, and recommend cutting-edge research papers.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Upload Resume
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
            See How It Works
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: "NLP", label: "Skill Extraction" },
            { value: "LLM", label: "AI Analysis" },
            { value: "RAG", label: "Paper Retrieval" },
            { value: "FAISS", label: "Vector Search" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-2xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
