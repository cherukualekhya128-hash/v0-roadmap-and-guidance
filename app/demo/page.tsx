"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Upload,
  FileText,
  Briefcase,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Brain,
  Target,
  TrendingUp,
  Zap,
  BookOpen,
  GraduationCap,
  Rocket,
  ChevronRight,
  ExternalLink,
  Clock,
  DollarSign,
  Star,
  FileUp,
  RefreshCw,
} from "lucide-react"

// Sample resume text for demo
const sampleResume = `John Doe
Senior Software Engineer

SUMMARY
Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading development teams.

SKILLS
- Programming: JavaScript, TypeScript, Python, Java
- Frontend: React, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express, Django, REST APIs, GraphQL
- Database: PostgreSQL, MongoDB, Redis
- Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
- Tools: Git, Jenkins, Jira, Agile/Scrum

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2021 - Present
- Led development of customer-facing web application serving 100K+ users
- Implemented microservices architecture reducing latency by 40%
- Mentored junior developers and conducted code reviews

Software Engineer | StartupXYZ | 2019 - 2021
- Built RESTful APIs handling 1M+ daily requests
- Developed real-time features using WebSockets
- Improved application performance by 60%

EDUCATION
B.S. Computer Science | State University | 2019`

const sampleJobDescription = `Senior Full Stack Developer

We are looking for a Senior Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.

Requirements:
- 5+ years of experience in software development
- Strong proficiency in React, TypeScript, and Node.js
- Experience with PostgreSQL or similar databases
- Familiarity with AWS or other cloud platforms
- Experience with Docker and container orchestration
- Strong understanding of REST APIs and microservices
- Excellent problem-solving and communication skills
- Experience with Agile methodologies

Nice to have:
- Experience with GraphQL
- Knowledge of CI/CD pipelines
- Machine Learning background
- Leadership experience

Benefits:
- Competitive salary $150,000 - $200,000
- Remote work flexibility
- Health insurance
- 401k matching`

interface AnalysisResult {
  resumeAnalysis: {
    overallScore: number
    strengths: string[]
    weaknesses: string[]
    experienceLevel: string
    primaryDomain: string
    yearsOfExperience: number
  }
  extractedSkills: Array<{
    skill: string
    category: string
    proficiencyLevel: string
  }>
  atsScore: {
    score: number
    matchedKeywords: string[]
    missingKeywords: string[]
    suggestions: string[]
  } | null
  recommendedJobs: Array<{
    title: string
    matchScore: number
    reason: string
    salaryRange: string
    requiredSkills: string[]
    growthPotential: string
  }>
  skillImprovements: Array<{
    skill: string
    currentLevel: string
    targetLevel: string
    importance: string
    learningPath: string[]
    estimatedTime: string
    resources: Array<{
      name: string
      type: string
      url: string | null
    }>
  }>
  researchPapers: Array<{
    title: string
    authors: string
    year: number
    abstract: string
    relevance: string
    keyTopics: string[]
    applicationToCareer: string
  }>
  careerPath: {
    currentRole: string
    nextSteps: Array<{
      role: string
      timeframe: string
      requiredSkills: string[]
      salaryIncrease: string
    }>
    longTermGoal: string
  }
  summary: string
}

export default function DemoPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedFileName(file.name)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Failed to parse file")
      }

      const data = await response.json()
      setResumeText(data.text)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file")
      setUploadedFileName(null)
    } finally {
      setIsUploading(false)
    }
  }

  const loadSampleData = () => {
    setResumeText(sampleResume)
    setJobDescription(sampleJobDescription)
    setUploadedFileName(null)
    setResult(null)
    setError(null)
  }

  const handleReset = () => {
    setResumeText("")
    setJobDescription("")
    setResult(null)
    setError(null)
    setUploadedFileName(null)
    setActiveTab("overview")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please provide your resume text")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/comprehensive-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription: jobDescription.trim() || null,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Analysis failed")
      }

      const data = await response.json()
      setResult(data)
      setActiveTab("overview")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500/10 border-green-500/30"
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30"
    return "bg-red-500/10 border-red-500/30"
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "important": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">CareerGPT Demo</span>
          </div>
          <Button variant="outline" size="sm" onClick={loadSampleData}>
            Load Sample Data
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Input Section */}
        {!result && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">AI Career Analysis</h1>
              <p className="mt-2 text-muted-foreground">
                Upload your resume to get ATS score, job recommendations, skill improvements, and research papers
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Resume Input */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    Your Resume
                  </CardTitle>
                  <CardDescription>Upload a file or paste your resume text</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* File Upload */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 transition-colors hover:border-primary/50 hover:bg-muted/50"
                  >
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Parsing resume...</span>
                      </div>
                    ) : uploadedFileName ? (
                      <div className="flex flex-col items-center gap-2">
                        <FileUp className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium text-foreground">{uploadedFileName}</span>
                        <span className="text-xs text-muted-foreground">Click to upload different file</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Upload Resume</span>
                        <span className="text-xs text-muted-foreground">PDF, DOC, DOCX, or TXT</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">or paste text</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <Textarea
                    placeholder="Paste your resume text here..."
                    className="min-h-[200px] resize-none border-border bg-background text-foreground"
                    value={resumeText}
                    onChange={(e) => {
                      setResumeText(e.target.value)
                      if (e.target.value !== resumeText) setUploadedFileName(null)
                    }}
                  />
                </CardContent>
              </Card>

              {/* Job Description Input */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Job Description
                    <Badge variant="outline" className="ml-2 text-xs">Optional</Badge>
                  </CardTitle>
                  <CardDescription>Add a job description for ATS score calculation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the job description here for ATS matching..."
                    className="min-h-[280px] resize-none border-border bg-background text-foreground"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Error Display */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
                <AlertCircle className="mx-auto mb-2 h-6 w-6" />
                {error}
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !resumeText.trim()}
                className="gap-2 px-8"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze Resume
                  </>
                )}
              </Button>
              {!resumeText.trim() && (
                <p className="text-sm text-muted-foreground">
                  Upload or paste your resume to get started
                </p>
              )}
            </div>

            {/* Features Preview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Target, label: "ATS Score", desc: "Match against job requirements" },
                { icon: Briefcase, label: "Job Recommendations", desc: "AI-matched opportunities" },
                { icon: TrendingUp, label: "Skill Improvements", desc: "Personalized learning paths" },
                { icon: BookOpen, label: "Research Papers", desc: "Relevant academic resources" },
              ].map((feature) => (
                <div key={feature.label} className="rounded-lg border border-border bg-card/50 p-4 text-center">
                  <feature.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <h3 className="font-medium text-foreground">{feature.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Header with Reset */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Analysis Results</h1>
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Analyze Another Resume
              </Button>
            </div>

            {/* Score Overview Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className={`border ${getScoreBg(result.resumeAnalysis.overallScore)}`}>
                <CardContent className="p-6 text-center">
                  <Target className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className={`text-4xl font-bold ${getScoreColor(result.resumeAnalysis.overallScore)}`}>
                    {result.resumeAnalysis.overallScore}%
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Resume Score</p>
                </CardContent>
              </Card>

              {result.atsScore && (
                <Card className={`border ${getScoreBg(result.atsScore.score)}`}>
                  <CardContent className="p-6 text-center">
                    <Zap className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
                    <div className={`text-4xl font-bold ${getScoreColor(result.atsScore.score)}`}>
                      {result.atsScore.score}%
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">ATS Score</p>
                  </CardContent>
                </Card>
              )}

              <Card className="border border-border">
                <CardContent className="p-6 text-center">
                  <Briefcase className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                  <div className="text-4xl font-bold text-foreground">
                    {result.recommendedJobs.length}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Job Matches</p>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-6 text-center">
                  <BookOpen className="mx-auto mb-2 h-8 w-8 text-purple-500" />
                  <div className="text-4xl font-bold text-foreground">
                    {result.researchPapers.length}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Papers Found</p>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
              </CardContent>
            </Card>

            {/* Tabs for detailed results */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-muted">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="papers">Papers</TabsTrigger>
                <TabsTrigger value="career">Career Path</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Strengths */}
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.resumeAnalysis.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Weaknesses */}
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-500">
                        <AlertCircle className="h-5 w-5" />
                        Areas to Improve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.resumeAnalysis.weaknesses.map((weakness, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Extracted Skills */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Extracted Skills</CardTitle>
                    <CardDescription>Skills identified from your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.extractedSkills.map((skill, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className={
                            skill.category === "technical" ? "border-blue-500/50 bg-blue-500/10 text-blue-400" :
                            skill.category === "tool" ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400" :
                            skill.category === "soft" ? "border-purple-500/50 bg-purple-500/10 text-purple-400" :
                            "border-orange-500/50 bg-orange-500/10 text-orange-400"
                          }
                        >
                          {skill.skill}
                          <span className="ml-1 opacity-60">({skill.proficiencyLevel})</span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* ATS Analysis */}
                {result.atsScore && (
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        ATS Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-green-500">Matched Keywords</h4>
                          <div className="flex flex-wrap gap-1">
                            {result.atsScore.matchedKeywords.map((kw, i) => (
                              <Badge key={i} variant="outline" className="border-green-500/50 bg-green-500/10 text-green-400">
                                {kw}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-red-500">Missing Keywords</h4>
                          <div className="flex flex-wrap gap-1">
                            {result.atsScore.missingKeywords.map((kw, i) => (
                              <Badge key={i} variant="outline" className="border-red-500/50 bg-red-500/10 text-red-400">
                                {kw}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-foreground">Suggestions</h4>
                        <ul className="space-y-1">
                          {result.atsScore.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Recommended Jobs for You</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {result.recommendedJobs.map((job, i) => (
                    <Card key={i} className="border-border">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-foreground">{job.title}</CardTitle>
                          <Badge className={getScoreBg(job.matchScore)}>
                            {job.matchScore}% match
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{job.reason}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-green-500">
                            <DollarSign className="h-4 w-4" />
                            {job.salaryRange}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <TrendingUp className="h-4 w-4" />
                            {job.growthPotential} growth
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {job.requiredSkills.slice(0, 5).map((skill, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Skill Development Plan</h3>
                <div className="space-y-4">
                  {result.skillImprovements.map((skill, i) => (
                    <Card key={i} className="border-border">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-foreground">{skill.skill}</CardTitle>
                          <Badge className={getImportanceColor(skill.importance)}>
                            {skill.importance}
                          </Badge>
                        </div>
                        <CardDescription>
                          {skill.currentLevel} → {skill.targetLevel} | Estimated: {skill.estimatedTime}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-foreground">Learning Path</h4>
                          <ol className="space-y-1">
                            {skill.learningPath.map((step, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                                  {j + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-foreground">Recommended Resources</h4>
                          <div className="flex flex-wrap gap-2">
                            {skill.resources.map((resource, j) => (
                              <Badge key={j} variant="outline" className="gap-1">
                                {resource.type === "course" && <GraduationCap className="h-3 w-3" />}
                                {resource.type === "book" && <BookOpen className="h-3 w-3" />}
                                {resource.type === "certification" && <Star className="h-3 w-3" />}
                                {resource.name}
                                {resource.url && <ExternalLink className="h-3 w-3" />}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Papers Tab */}
              <TabsContent value="papers" className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Relevant Research Papers</h3>
                <div className="space-y-4">
                  {result.researchPapers.map((paper, i) => (
                    <Card key={i} className="border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-foreground">{paper.title}</CardTitle>
                        <CardDescription>
                          {paper.authors} ({paper.year})
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{paper.abstract}</p>
                        <div className="flex flex-wrap gap-1">
                          {paper.keyTopics.map((topic, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                          <h4 className="mb-1 text-sm font-medium text-primary">Why this matters for your career</h4>
                          <p className="text-sm text-muted-foreground">{paper.applicationToCareer}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Career Tab */}
              <TabsContent value="career" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-primary" />
                      Your Career Path
                    </CardTitle>
                    <CardDescription>
                      Current Role: {result.careerPath.currentRole}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Career Steps */}
                      <div className="relative">
                        {result.careerPath.nextSteps.map((step, i) => (
                          <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                            {/* Timeline line */}
                            {i < result.careerPath.nextSteps.length - 1 && (
                              <div className="absolute left-4 top-8 h-full w-px bg-border" />
                            )}
                            {/* Timeline dot */}
                            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              {i + 1}
                            </div>
                            {/* Content */}
                            <div className="flex-1 rounded-lg border border-border bg-card/50 p-4">
                              <div className="flex items-start justify-between">
                                <h4 className="font-semibold text-foreground">{step.role}</h4>
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {step.timeframe}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-green-500">{step.salaryIncrease}</p>
                              <div className="mt-3 flex flex-wrap gap-1">
                                {step.requiredSkills.map((skill, j) => (
                                  <Badge key={j} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Long-term Goal */}
                      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                        <h4 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                          <Star className="h-5 w-5" />
                          Long-term Goal
                        </h4>
                        <p className="text-muted-foreground">{result.careerPath.longTermGoal}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}
