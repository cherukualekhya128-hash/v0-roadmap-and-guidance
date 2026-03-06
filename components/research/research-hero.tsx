import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Brain, Network, MessageSquare, TrendingUp } from "lucide-react"

export function ResearchHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-chart-2/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 gap-2 border-primary/30 bg-primary/10 px-4 py-2 text-primary">
            <Sparkles className="h-4 w-4" />
            20+ AI-Powered Features
          </Badge>

          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            AI Research Paper{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Assistant
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            From knowledge graphs to paper chatbots, skill extraction to career mapping. 
            Everything you need to navigate research and connect it to your career goals.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Explore Features
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary">
              View Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Network, label: "Knowledge Graphs", count: "5" },
              { icon: MessageSquare, label: "AI Chatbots", count: "3" },
              { icon: Brain, label: "Skill Analysis", count: "6" },
              { icon: TrendingUp, label: "Predictions", count: "6" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground">{item.count}</span>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
