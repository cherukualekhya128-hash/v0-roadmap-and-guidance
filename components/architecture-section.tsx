import { Upload, FileSearch, Brain, Database, BookOpen, Sparkles, ArrowDown } from "lucide-react"

const steps = [
  {
    icon: Upload,
    label: "User uploads resume",
    detail: "PDF or text format",
  },
  {
    icon: FileSearch,
    label: "Resume parser",
    detail: "Extract structured data",
  },
  {
    icon: Brain,
    label: "Skill extraction (NLP)",
    detail: "Identify technologies & competencies",
  },
  {
    icon: Database,
    label: "Job description database",
    detail: "Match against real listings",
  },
  {
    icon: BookOpen,
    label: "RAG retriever",
    detail: "Search arXiv papers via FAISS",
  },
  {
    icon: Sparkles,
    label: "LLM generates suggestions",
    detail: "Personalized career guidance",
  },
]

export function ArchitectureSection() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            System Architecture
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            A streamlined pipeline from resume upload to personalized AI-powered career recommendations.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Vertical line connector */}
          <div className="absolute left-6 top-8 bottom-8 hidden w-px bg-border md:left-1/2 md:block" />

          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <div key={step.label} className="relative">
                {/* Arrow between steps (mobile) */}
                {index > 0 && (
                  <div className="mb-4 flex justify-center md:hidden">
                    <ArrowDown className="h-5 w-5 text-primary/50" />
                  </div>
                )}

                <div
                  className={`flex items-start gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex flex-1 ${
                      index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    <div className="w-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 md:max-w-xs">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{step.label}</h3>
                          <p className="text-sm text-muted-foreground">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 hidden h-10 w-10 shrink-0 items-center justify-center md:flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <span className="font-mono text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
