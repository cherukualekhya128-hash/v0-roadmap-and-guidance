"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, BarChart3, AlertCircle, BookOpen, ChevronRight } from "lucide-react"

const demoSteps = [
  {
    step: 1,
    icon: Upload,
    title: "Upload Resume",
    description: "Drop in your resume in PDF or text format.",
    preview: (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-secondary/50 p-12">
        <Upload className="h-10 w-10 text-primary" />
        <span className="font-mono text-sm text-muted-foreground">resume_john_doe.pdf</span>
        <span className="text-xs text-primary">Uploaded successfully</span>
      </div>
    ),
  },
  {
    step: 2,
    icon: BarChart3,
    title: "AI Analyzes Resume",
    description: "NLP extracts skills, education, and project data.",
    preview: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
          <span className="text-sm text-foreground">Resume Score</span>
          <span className="font-mono text-lg font-bold text-primary">78/100</span>
        </div>
        <div className="rounded-lg bg-secondary p-3">
          <span className="text-xs text-muted-foreground">Extracted Skills</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Python", "C++", "Machine Learning", "SQL", "Git"].map((s) => (
              <span key={s} className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-secondary p-3">
          <span className="text-xs text-muted-foreground">Education</span>
          <p className="mt-1 text-sm text-foreground">B.Tech Computer Science - 2024</p>
        </div>
      </div>
    ),
  },
  {
    step: 3,
    icon: AlertCircle,
    title: "Skill Gaps & Jobs",
    description: "Identifies missing skills and matching job roles.",
    preview: (
      <div className="flex flex-col gap-3">
        <div className="rounded-lg bg-secondary p-3">
          <span className="text-xs text-muted-foreground">Missing Skills</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Deep Learning", "TensorFlow", "Docker", "AWS"].map((s) => (
              <span key={s} className="rounded bg-destructive/10 px-2 py-0.5 font-mono text-xs text-destructive">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-secondary p-3">
          <span className="text-xs text-muted-foreground">Best Job Matches</span>
          <div className="mt-2 flex flex-col gap-1.5">
            {["Data Analyst - 92% match", "AI Engineer - 85% match", "ML Intern - 88% match"].map((j) => (
              <div key={j} className="flex items-center gap-2 text-sm text-foreground">
                <ChevronRight className="h-3 w-3 text-primary" />
                {j}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    step: 4,
    icon: BookOpen,
    title: "Paper Recommendations",
    description: "RAG retrieves relevant research papers from arXiv.",
    preview: (
      <div className="flex flex-col gap-3">
        {[
          { title: "Attention Is All You Need", authors: "Vaswani et al.", year: "2017" },
          { title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: "2019" },
          { title: "Language Models are Few-Shot Learners", authors: "Brown et al.", year: "2020" },
        ].map((paper) => (
          <div key={paper.title} className="rounded-lg bg-secondary p-3 transition-colors hover:bg-secondary/80">
            <h4 className="text-sm font-medium text-foreground">{paper.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {paper.authors} - {paper.year}
            </p>
          </div>
        ))}
      </div>
    ),
  },
]

export function DemoSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="demo" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            Live Demo
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            See It In Action
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Walk through the complete demo flow — from resume upload to AI-powered career insights.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Step selector */}
          <div className="flex flex-row gap-2 overflow-x-auto lg:col-span-2 lg:flex-col lg:gap-3">
            {demoSteps.map((step, index) => (
              <Button
                key={step.step}
                variant={activeStep === index ? "default" : "outline"}
                className={`flex w-full shrink-0 items-center justify-start gap-3 px-4 py-6 text-left ${
                  activeStep === index
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-secondary"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                    activeStep === index
                      ? "bg-primary-foreground text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step.step}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className={`text-xs ${activeStep === index ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {step.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Preview panel */}
          <div className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/50" />
              <div className="h-3 w-3 rounded-full bg-chart-4/50" />
              <div className="h-3 w-3 rounded-full bg-primary/50" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                careergpt-demo
              </span>
            </div>
            <div className="min-h-[300px]">
              {demoSteps[activeStep].preview}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
