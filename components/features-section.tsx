import {
  FileText,
  Briefcase,
  TrendingUp,
  BookOpen,
} from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Resume Analyzer",
    description:
      "Upload your resume and AI extracts skills, education, and projects, then gives you a score with suggestions.",
    details: ["Skill extraction", "Education parsing", "Project analysis", "Resume score"],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Briefcase,
    title: "Job Match Engine",
    description:
      "Compares your resume with real job descriptions to surface the best-fit roles for your profile.",
    details: ["Data Analyst", "AI Engineer", "ML Intern", "More roles..."],
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Detection",
    description:
      "AI identifies which skills you're missing and recommends a learning path to close the gap.",
    details: ["Current: Python, C++", "Missing: Deep Learning", "Missing: TensorFlow", "Learning path"],
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: BookOpen,
    title: "Research Paper Recommender",
    description:
      "RAG-powered retrieval from arXiv to recommend the most relevant papers for your career goals.",
    details: ["Attention Is All You Need", "BERT", "GPT papers", "Domain-specific"],
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            Key Features
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Four powerful AI modules working together to accelerate your career.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {feature.details.map((detail) => (
                  <span
                    key={detail}
                    className="rounded-md bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {detail}
                  </span>
                ))}
              </div>

              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
