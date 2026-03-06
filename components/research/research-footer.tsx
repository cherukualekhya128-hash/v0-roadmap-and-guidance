import Link from "next/link"
import { BookOpen, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResearchFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      {/* CTA Section */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl text-balance text-2xl font-bold text-foreground sm:text-3xl">
            Ready to transform how you explore research?
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Join researchers and students who are using AI to navigate the academic landscape 
            and connect research to real-world career opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary">
                Back to CareerGPT
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Research Assistant</span>
            <span className="text-xs text-muted-foreground">by CareerGPT</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <span className="text-xs text-muted-foreground">
              Built for Hackathon 2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
