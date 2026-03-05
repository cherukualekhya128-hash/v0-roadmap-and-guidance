import { AlertTriangle, Clock, Search } from "lucide-react"

const problems = [
  {
    icon: AlertTriangle,
    title: "Resume-Industry Mismatch",
    description:
      "Students don't know whether their resume matches what the industry actually requires, leading to missed opportunities.",
  },
  {
    icon: Search,
    title: "Scattered Resources",
    description:
      "Important research papers are spread across arXiv and learning resources across many websites, making discovery painful.",
  },
  {
    icon: Clock,
    title: "Time Wasted Searching",
    description:
      "Students spend hours searching for the right skills, papers, and career paths instead of actually learning and building.",
  },
]

export function ProblemSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            The Problem
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Why Students Struggle
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Navigating careers in tech is overwhelming. Here are the core challenges students face every day.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:bg-secondary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {problem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
