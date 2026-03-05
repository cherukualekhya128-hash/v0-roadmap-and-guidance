import { Monitor, Server, Cpu, Database } from "lucide-react"

const categories = [
  {
    icon: Monitor,
    title: "Frontend",
    items: ["React", "Streamlit"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Python", "FastAPI"],
  },
  {
    icon: Cpu,
    title: "AI Tools",
    items: ["OpenAI / LLM", "LangChain", "FAISS"],
  },
  {
    icon: Database,
    title: "Data Sources",
    items: ["Job Descriptions DB", "arXiv Papers"],
  },
]

export function TechStackSection() {
  return (
    <section id="tech-stack" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            Technology
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Built with modern, production-ready tools optimized for rapid development.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <cat.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{cat.title}</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
