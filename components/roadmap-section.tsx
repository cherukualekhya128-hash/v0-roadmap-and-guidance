"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Map,
  Code2,
  Database,
  Brain,
  Server,
  Palette,
  Smartphone,
  Cloud,
  Shield,
  BarChart3,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react"

const skillRoadmaps = [
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: Palette,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    duration: "4-6 months",
    difficulty: "Beginner Friendly",
    description: "Build interactive user interfaces and web applications",
    stages: [
      {
        name: "Foundation",
        skills: ["HTML5", "CSS3", "JavaScript ES6+"],
        duration: "4 weeks",
        resources: ["MDN Web Docs", "freeCodeCamp", "JavaScript.info"],
      },
      {
        name: "Styling & Layout",
        skills: ["Flexbox", "CSS Grid", "Tailwind CSS", "Responsive Design"],
        duration: "3 weeks",
        resources: ["Tailwind Docs", "CSS Tricks", "Kevin Powell YouTube"],
      },
      {
        name: "Framework",
        skills: ["React.js", "State Management", "Hooks", "Context API"],
        duration: "6 weeks",
        resources: ["React Docs", "Scrimba", "Traversy Media"],
      },
      {
        name: "Advanced",
        skills: ["TypeScript", "Next.js", "Testing", "Performance"],
        duration: "4 weeks",
        resources: ["Next.js Docs", "TypeScript Handbook", "Testing Library"],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: Server,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    duration: "5-7 months",
    difficulty: "Intermediate",
    description: "Design and build server-side applications and APIs",
    stages: [
      {
        name: "Programming Basics",
        skills: ["Python/Node.js", "Data Structures", "Algorithms"],
        duration: "5 weeks",
        resources: ["Python Docs", "LeetCode", "Codecademy"],
      },
      {
        name: "Databases",
        skills: ["SQL", "PostgreSQL", "MongoDB", "Redis"],
        duration: "4 weeks",
        resources: ["SQLBolt", "MongoDB University", "Redis Docs"],
      },
      {
        name: "API Development",
        skills: ["REST APIs", "Express/FastAPI", "Authentication", "JWT"],
        duration: "5 weeks",
        resources: ["Postman Learning", "FastAPI Docs", "Auth0 Docs"],
      },
      {
        name: "Deployment",
        skills: ["Docker", "CI/CD", "Cloud Services", "Monitoring"],
        duration: "4 weeks",
        resources: ["Docker Docs", "GitHub Actions", "AWS Free Tier"],
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Scientist",
    icon: BarChart3,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    duration: "6-8 months",
    difficulty: "Intermediate",
    description: "Analyze data and extract insights using statistical methods",
    stages: [
      {
        name: "Python & Math",
        skills: ["Python", "NumPy", "Statistics", "Linear Algebra"],
        duration: "5 weeks",
        resources: ["Khan Academy", "3Blue1Brown", "NumPy Docs"],
      },
      {
        name: "Data Analysis",
        skills: ["Pandas", "Data Cleaning", "Visualization", "Matplotlib"],
        duration: "4 weeks",
        resources: ["Kaggle Learn", "Pandas Docs", "Seaborn Gallery"],
      },
      {
        name: "Machine Learning",
        skills: ["Scikit-learn", "Supervised Learning", "Model Evaluation"],
        duration: "6 weeks",
        resources: ["Scikit-learn Docs", "StatQuest", "Fast.ai"],
      },
      {
        name: "Advanced Analytics",
        skills: ["Deep Learning Basics", "NLP Intro", "Model Deployment"],
        duration: "5 weeks",
        resources: ["TensorFlow Tutorials", "Hugging Face", "Streamlit"],
      },
    ],
  },
  {
    id: "ai-ml",
    title: "AI/ML Engineer",
    icon: Brain,
    color: "text-primary",
    bgColor: "bg-primary/10",
    duration: "8-12 months",
    difficulty: "Advanced",
    description: "Build intelligent systems using machine learning and AI",
    stages: [
      {
        name: "ML Foundations",
        skills: ["Linear Algebra", "Calculus", "Probability", "Python"],
        duration: "6 weeks",
        resources: ["MIT OCW", "3Blue1Brown", "StatQuest"],
      },
      {
        name: "Deep Learning",
        skills: ["Neural Networks", "CNNs", "RNNs", "PyTorch/TensorFlow"],
        duration: "8 weeks",
        resources: ["Deep Learning Book", "PyTorch Tutorials", "Fast.ai"],
      },
      {
        name: "Specialized AI",
        skills: ["NLP", "Computer Vision", "Transformers", "LLMs"],
        duration: "8 weeks",
        resources: ["Hugging Face Course", "CS231n", "Attention Paper"],
      },
      {
        name: "MLOps",
        skills: ["Model Deployment", "MLflow", "Kubernetes", "Monitoring"],
        duration: "5 weeks",
        resources: ["MLOps Guide", "Kubernetes Docs", "Weights & Biases"],
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    icon: Smartphone,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    duration: "5-7 months",
    difficulty: "Intermediate",
    description: "Create native and cross-platform mobile applications",
    stages: [
      {
        name: "Programming Basics",
        skills: ["JavaScript/Dart", "OOP Concepts", "Mobile UI Basics"],
        duration: "4 weeks",
        resources: ["JavaScript.info", "Dart Docs", "UI Design Basics"],
      },
      {
        name: "Framework",
        skills: ["React Native/Flutter", "State Management", "Navigation"],
        duration: "6 weeks",
        resources: ["React Native Docs", "Flutter Docs", "Academind"],
      },
      {
        name: "Native Features",
        skills: ["Device APIs", "Storage", "Push Notifications", "Permissions"],
        duration: "4 weeks",
        resources: ["Expo Docs", "Firebase Docs", "Platform Guides"],
      },
      {
        name: "Publishing",
        skills: ["App Store Guidelines", "Testing", "CI/CD", "Analytics"],
        duration: "3 weeks",
        resources: ["Apple Developer", "Google Play Console", "Fastlane"],
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    icon: Cloud,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    duration: "6-9 months",
    difficulty: "Intermediate to Advanced",
    description: "Automate and streamline software delivery pipelines",
    stages: [
      {
        name: "Linux & Scripting",
        skills: ["Linux Administration", "Bash", "Python", "Networking"],
        duration: "5 weeks",
        resources: ["Linux Journey", "Bash Academy", "NetworkChuck"],
      },
      {
        name: "Containerization",
        skills: ["Docker", "Docker Compose", "Container Orchestration"],
        duration: "4 weeks",
        resources: ["Docker Docs", "Play with Docker", "Kubernetes Basics"],
      },
      {
        name: "CI/CD & IaC",
        skills: ["GitHub Actions", "Jenkins", "Terraform", "Ansible"],
        duration: "5 weeks",
        resources: ["GitHub Learning", "Terraform Docs", "Ansible Docs"],
      },
      {
        name: "Cloud & Monitoring",
        skills: ["AWS/GCP/Azure", "Prometheus", "Grafana", "ELK Stack"],
        duration: "6 weeks",
        resources: ["AWS Training", "Cloud Guru", "Grafana Tutorials"],
      },
    ],
  },
]

export function RoadmapSection() {
  const [selectedRoadmap, setSelectedRoadmap] = useState(skillRoadmaps[0])
  const [expandedStage, setExpandedStage] = useState<number | null>(0)

  return (
    <section id="roadmap" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-1/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Map className="mr-2 h-3 w-3" />
            Learning Roadmaps
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skill-Based Learning Paths
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Structured roadmaps designed for beginners to master in-demand tech skills. 
            Each path includes curated resources, timelines, and milestone checkpoints.
          </p>
        </div>

        {/* Roadmap Selection */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {skillRoadmaps.map((roadmap) => {
            const Icon = roadmap.icon
            return (
              <Button
                key={roadmap.id}
                variant={selectedRoadmap.id === roadmap.id ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => {
                  setSelectedRoadmap(roadmap)
                  setExpandedStage(0)
                }}
              >
                <Icon className="h-4 w-4" />
                {roadmap.title}
              </Button>
            )
          })}
        </div>

        {/* Selected Roadmap Details */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Roadmap Overview */}
          <Card className="border-border/50 lg:col-span-1">
            <CardContent className="p-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${selectedRoadmap.bgColor}`}>
                <selectedRoadmap.icon className={`h-7 w-7 ${selectedRoadmap.color}`} />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-foreground">{selectedRoadmap.title}</h3>
              <p className="mt-2 text-muted-foreground">{selectedRoadmap.description}</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium text-foreground">{selectedRoadmap.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Level:</span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedRoadmap.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Stages:</span>
                  <span className="font-medium text-foreground">{selectedRoadmap.stages.length} phases</span>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-mono text-foreground">0/{selectedRoadmap.stages.length}</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Start your journey by clicking on each stage
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Stages */}
          <div className="space-y-4 lg:col-span-2">
            {selectedRoadmap.stages.map((stage, index) => (
              <Card
                key={stage.name}
                className={`cursor-pointer border transition-all hover:border-primary/50 ${
                  expandedStage === index ? "border-primary bg-primary/5" : "border-border/50"
                }`}
                onClick={() => setExpandedStage(expandedStage === index ? null : index)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Stage Number */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                        expandedStage === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Stage Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{stage.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {stage.duration}
                        </Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {stage.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                        {stage.skills.length > 3 && (
                          <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                            +{stage.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                        expandedStage === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* Expanded Content */}
                  {expandedStage === index && (
                    <div className="mt-4 border-t border-border/50 pt-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Skills to Learn */}
                        <div>
                          <h5 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <Code2 className="h-4 w-4 text-primary" />
                            Skills to Learn
                          </h5>
                          <ul className="space-y-1.5">
                            {stage.skills.map((skill) => (
                              <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-3.5 w-3.5 text-chart-4" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h5 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <BookOpen className="h-4 w-4 text-chart-2" />
                            Recommended Resources
                          </h5>
                          <ul className="space-y-1.5">
                            {stage.resources.map((resource) => (
                              <li key={resource} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
