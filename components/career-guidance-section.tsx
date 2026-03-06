"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Compass,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Building2,
  Globe,
  Users,
  Target,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Award,
  Zap,
  Heart,
  Code2,
  Brain,
  BarChart3,
  Shield,
} from "lucide-react"

const careerPaths = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    icon: Code2,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    avgSalary: "$70K - $150K",
    growth: "+25%",
    demand: "Very High",
    description: "Design, develop, and maintain software applications and systems.",
    skills: ["Programming Languages", "Data Structures", "System Design", "Problem Solving"],
    companies: ["Google", "Microsoft", "Amazon", "Meta", "Startups"],
    entryRoles: ["Junior Developer", "Associate Engineer", "Graduate Developer"],
    seniorRoles: ["Senior Engineer", "Staff Engineer", "Principal Engineer", "CTO"],
    tips: [
      "Build a strong portfolio with diverse projects",
      "Contribute to open-source projects",
      "Practice coding challenges on LeetCode/HackerRank",
      "Learn system design for senior roles",
      "Network through tech meetups and conferences",
    ],
    certifications: ["AWS Certified", "Google Cloud Professional", "Azure Developer"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: BarChart3,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    avgSalary: "$80K - $160K",
    growth: "+35%",
    demand: "Very High",
    description: "Extract insights from data using statistical methods and machine learning.",
    skills: ["Python/R", "Statistics", "Machine Learning", "Data Visualization", "SQL"],
    companies: ["Netflix", "Airbnb", "Uber", "LinkedIn", "Research Labs"],
    entryRoles: ["Data Analyst", "Junior Data Scientist", "ML Engineer Intern"],
    seniorRoles: ["Senior Data Scientist", "Lead ML Engineer", "Head of Data", "Chief Data Officer"],
    tips: [
      "Master Python and its data science libraries",
      "Work on Kaggle competitions",
      "Build end-to-end ML projects",
      "Learn to communicate insights effectively",
      "Stay updated with latest research papers",
    ],
    certifications: ["Google Data Analytics", "IBM Data Science", "TensorFlow Developer"],
  },
  {
    id: "ai-engineer",
    title: "AI/ML Engineer",
    icon: Brain,
    color: "text-primary",
    bgColor: "bg-primary/10",
    avgSalary: "$100K - $200K",
    growth: "+40%",
    demand: "Extremely High",
    description: "Build and deploy artificial intelligence and machine learning systems.",
    skills: ["Deep Learning", "NLP/CV", "MLOps", "PyTorch/TensorFlow", "Cloud ML"],
    companies: ["OpenAI", "DeepMind", "NVIDIA", "Anthropic", "AI Startups"],
    entryRoles: ["ML Engineer", "AI Research Intern", "Applied Scientist"],
    seniorRoles: ["Senior ML Engineer", "Research Scientist", "AI Architect", "VP of AI"],
    tips: [
      "Build strong math foundations (linear algebra, calculus)",
      "Implement papers from scratch",
      "Specialize in one area (NLP, CV, RL)",
      "Contribute to ML open-source projects",
      "Consider research publications",
    ],
    certifications: ["Deep Learning Specialization", "MLOps Certification", "AWS ML Specialty"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    icon: Shield,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    avgSalary: "$75K - $140K",
    growth: "+32%",
    demand: "High",
    description: "Protect systems and data from cyber threats and vulnerabilities.",
    skills: ["Network Security", "Penetration Testing", "SIEM Tools", "Compliance", "Scripting"],
    companies: ["CrowdStrike", "Palo Alto", "IBM Security", "Government Agencies", "Banks"],
    entryRoles: ["Security Analyst", "SOC Analyst", "IT Security Intern"],
    seniorRoles: ["Security Engineer", "Penetration Tester", "Security Architect", "CISO"],
    tips: [
      "Get hands-on with CTF challenges",
      "Learn networking fundamentals deeply",
      "Pursue industry certifications early",
      "Stay updated with latest threats",
      "Build a home lab for practice",
    ],
    certifications: ["CompTIA Security+", "CEH", "CISSP", "OSCP"],
  },
]

const industryInsights = [
  {
    title: "Remote Work Opportunities",
    description: "70% of tech companies now offer remote or hybrid positions, expanding job opportunities globally.",
    icon: Globe,
    stat: "70%",
  },
  {
    title: "AI Industry Growth",
    description: "The AI market is expected to grow at 37% CAGR, creating massive demand for AI-skilled professionals.",
    icon: TrendingUp,
    stat: "37%",
  },
  {
    title: "Skill Premium",
    description: "Engineers with cloud and AI skills earn 20-40% more than their peers on average.",
    icon: DollarSign,
    stat: "+40%",
  },
  {
    title: "Startup Opportunities",
    description: "Tech startups raised $300B+ in funding, creating thousands of new positions for skilled developers.",
    icon: Zap,
    stat: "$300B+",
  },
]

const interviewTips = [
  {
    category: "Technical Prep",
    tips: [
      "Practice data structures and algorithms daily",
      "Solve at least 200+ LeetCode problems",
      "Focus on medium difficulty problems",
      "Learn to explain your thought process",
      "Time yourself while solving problems",
    ],
  },
  {
    category: "System Design",
    tips: [
      "Study common system design patterns",
      "Understand scalability and trade-offs",
      "Practice designing real systems (Twitter, Uber)",
      "Learn about databases, caching, and load balancing",
      "Draw clear diagrams during interviews",
    ],
  },
  {
    category: "Behavioral",
    tips: [
      "Prepare STAR format stories",
      "Research the company culture",
      "Practice common behavioral questions",
      "Have questions ready for interviewers",
      "Show enthusiasm and cultural fit",
    ],
  },
]

export function CareerGuidanceSection() {
  const [selectedCareer, setSelectedCareer] = useState(careerPaths[0])

  return (
    <section id="career-guidance" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-2/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Compass className="mr-2 h-3 w-3" />
            Career Guidance
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Navigate Your Tech Career
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore career paths, salary insights, growth opportunities, and actionable tips 
            to accelerate your journey in the tech industry.
          </p>
        </div>

        <Tabs defaultValue="career-paths" className="space-y-8">
          <TabsList className="mx-auto flex w-fit flex-wrap justify-center gap-2 bg-transparent">
            <TabsTrigger value="career-paths" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase className="h-4 w-4" />
              Career Paths
            </TabsTrigger>
            <TabsTrigger value="industry-insights" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
              Industry Insights
            </TabsTrigger>
            <TabsTrigger value="interview-prep" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Target className="h-4 w-4" />
              Interview Prep
            </TabsTrigger>
          </TabsList>

          {/* Career Paths Tab */}
          <TabsContent value="career-paths" className="space-y-6">
            {/* Career Selection */}
            <div className="flex flex-wrap justify-center gap-3">
              {careerPaths.map((career) => {
                const Icon = career.icon
                return (
                  <Button
                    key={career.id}
                    variant={selectedCareer.id === career.id ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                    onClick={() => setSelectedCareer(career)}
                  >
                    <Icon className="h-4 w-4" />
                    {career.title}
                  </Button>
                )
              })}
            </div>

            {/* Career Details */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Overview Card */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${selectedCareer.bgColor}`}>
                    <selectedCareer.icon className={`h-7 w-7 ${selectedCareer.color}`} />
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-foreground">{selectedCareer.title}</h3>
                  <p className="mt-2 text-muted-foreground">{selectedCareer.description}</p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-chart-4" />
                        <span className="text-sm text-muted-foreground">Avg Salary</span>
                      </div>
                      <span className="font-semibold text-foreground">{selectedCareer.avgSalary}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-chart-1" />
                        <span className="text-sm text-muted-foreground">Job Growth</span>
                      </div>
                      <span className="font-semibold text-chart-1">{selectedCareer.growth}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-chart-2" />
                        <span className="text-sm text-muted-foreground">Demand</span>
                      </div>
                      <Badge variant="secondary">{selectedCareer.demand}</Badge>
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-medium text-foreground">Key Skills Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Career Progression */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <GraduationCap className="h-5 w-5 text-chart-2" />
                    Career Progression
                  </h4>

                  <div className="mt-6 space-y-6">
                    {/* Entry Level */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-chart-4" />
                        <span className="text-sm font-medium text-foreground">Entry Level (0-2 years)</span>
                      </div>
                      <div className="ml-4 flex flex-wrap gap-2">
                        {selectedCareer.entryRoles.map((role) => (
                          <Badge key={role} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground" />
                    </div>

                    {/* Senior Level */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Senior Level (5+ years)</span>
                      </div>
                      <div className="ml-4 flex flex-wrap gap-2">
                        {selectedCareer.seniorRoles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Companies */}
                  <div className="mt-8">
                    <h5 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Top Hiring Companies
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.companies.map((company) => (
                        <span
                          key={company}
                          className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-6">
                    <h5 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Award className="h-4 w-4 text-chart-4" />
                      Recommended Certifications
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="border-chart-4/50 text-xs text-chart-4">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Tips */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Lightbulb className="h-5 w-5 text-chart-4" />
                    Success Tips
                  </h4>

                  <ul className="mt-6 space-y-3">
                    {selectedCareer.tips.map((tip, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-1" />
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <h5 className="font-medium text-foreground">Pro Tip</h5>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Focus on building real projects and contributing to open source. 
                          Practical experience often matters more than certifications alone.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Industry Insights Tab */}
          <TabsContent value="industry-insights">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industryInsights.map((insight) => (
                <Card key={insight.title} className="border-border/50 transition-all hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <insight.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-chart-1">{insight.stat}</span>
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{insight.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Insights */}
            <Card className="mt-8 border-border/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground">2024-2025 Tech Industry Outlook</h3>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                      <TrendingUp className="h-4 w-4 text-chart-1" />
                      Fastest Growing Roles
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>- AI/ML Engineers (+40%)</li>
                      <li>- Cloud Architects (+32%)</li>
                      <li>- Data Engineers (+30%)</li>
                      <li>- DevOps Engineers (+28%)</li>
                      <li>- Cybersecurity Analysts (+25%)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                      <Zap className="h-4 w-4 text-chart-4" />
                      Hot Skills in Demand
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>- LLMs & Generative AI</li>
                      <li>- Kubernetes & Docker</li>
                      <li>- TypeScript & React</li>
                      <li>- Python for Data/AI</li>
                      <li>- Cloud (AWS/GCP/Azure)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                      <Globe className="h-4 w-4 text-chart-2" />
                      Industry Trends
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>- AI integration everywhere</li>
                      <li>- Remote-first companies</li>
                      <li>- Focus on developer experience</li>
                      <li>- Security-first development</li>
                      <li>- Low-code/no-code growth</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interview Prep Tab */}
          <TabsContent value="interview-prep">
            <div className="grid gap-6 md:grid-cols-3">
              {interviewTips.map((section) => (
                <Card key={section.category} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      {section.category === "Technical Prep" && <Code2 className="h-5 w-5 text-chart-1" />}
                      {section.category === "System Design" && <Building2 className="h-5 w-5 text-chart-2" />}
                      {section.category === "Behavioral" && <Users className="h-5 w-5 text-chart-4" />}
                      {section.category}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {section.tips.map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resources */}
            <Card className="mt-8 border-border/50">
              <CardContent className="p-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">Recommended Interview Resources</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { name: "LeetCode", desc: "Coding challenges", type: "Coding" },
                    { name: "System Design Primer", desc: "GitHub resource", type: "System Design" },
                    { name: "Pramp", desc: "Mock interviews", type: "Practice" },
                    { name: "Glassdoor", desc: "Interview questions", type: "Research" },
                  ].map((resource) => (
                    <div key={resource.name} className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {resource.type}
                      </Badge>
                      <h4 className="font-medium text-foreground">{resource.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{resource.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
