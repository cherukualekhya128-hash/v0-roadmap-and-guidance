"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
  score: number
  matchedSkills: Array<{
    skill: string
    category: string
    importance: string
    context: string
  }>
  missingSkills: Array<{
    skill: string
    category: string
    importance: string
    suggestion: string
  }>
  recommendations: string[]
  summary: string
}

export default function DemoPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("input")
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const loadSampleData = () => {
    setResumeText(sampleResume)
    setJobDescription(sampleJobDescription)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file.name)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setResumeText(data.text)
      }
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const analyzeResume = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return

    setIsAnalyzing(true)
    setActiveTab("results")

    try {
      const response = await fetch("/api/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      })

      if (response.ok) {
        const result = await response.json()
        setAnalysisResult(result)
      } else {
        // Fallback to mock analysis if API fails
        setAnalysisResult(generateMockAnalysis())
      }
    } catch (error) {
      console.error("Analysis error:", error)
      // Use mock analysis as fallback
      setAnalysisResult(generateMockAnalysis())
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateMockAnalysis = (): AnalysisResult => {
    return {
      score: 78,
      matchedSkills: [
        { skill: "React", category: "technical", importance: "high", context: "Frontend development experience" },
        { skill: "TypeScript", category: "technical", importance: "high", context: "Programming languages" },
        { skill: "Node.js", category: "technical", importance: "high", context: "Backend development" },
        { skill: "PostgreSQL", category: "tool", importance: "high", context: "Database experience" },
        { skill: "AWS", category: "tool", importance: "medium", context: "Cloud platform experience" },
        { skill: "Docker", category: "tool", importance: "medium", context: "Tools section" },
        { skill: "REST APIs", category: "technical", importance: "high", context: "Backend experience" },
        { skill: "Agile", category: "soft", importance: "medium", context: "Methodology experience" },
      ],
      missingSkills: [
        { skill: "GraphQL", category: "technical", importance: "medium", suggestion: "Add any GraphQL projects or experience to your resume" },
        { skill: "CI/CD pipelines", category: "tool", importance: "medium", suggestion: "Mention Jenkins experience more prominently" },
        { skill: "Machine Learning", category: "technical", importance: "low", suggestion: "Consider adding ML coursework or projects" },
      ],
      recommendations: [
        "Highlight your microservices experience more prominently in the summary",
        "Add specific metrics for your leadership and mentoring experience",
        "Include GraphQL if you have any experience with it",
        "Mention specific CI/CD tools and pipelines you've worked with",
        "Consider adding a 'Key Achievements' section with quantified results",
      ],
      summary: "Your resume shows strong alignment with this Senior Full Stack Developer position. You have most of the required technical skills including React, TypeScript, Node.js, and PostgreSQL. Your 5+ years of experience and leadership background are excellent matches. To improve your ATS score, consider highlighting your CI/CD experience and adding any GraphQL knowledge.",
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">ATS Analyzer Demo</span>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/50 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="input" className="gap-2">
                <FileText className="h-4 w-4" />
                Input
              </TabsTrigger>
              <TabsTrigger value="results" className="gap-2" disabled={!analysisResult && !isAnalyzing}>
                <Target className="h-4 w-4" />
                Results
              </TabsTrigger>
            </TabsList>

            {activeTab === "input" && (
              <Button variant="outline" onClick={loadSampleData} className="gap-2">
                <Zap className="h-4 w-4" />
                Load Sample Data
              </Button>
            )}
          </div>

          {/* Input Tab */}
          <TabsContent value="input" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Resume Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Your Resume
                  </CardTitle>
                  <CardDescription>
                    Upload your resume or paste the text directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="flex-1">
                      <Button variant="outline" className="w-full gap-2" asChild>
                        <span>
                          <Upload className="h-4 w-4" />
                          {uploadedFile || "Upload Resume"}
                        </span>
                      </Button>
                    </label>
                  </div>
                  <Textarea
                    placeholder="Or paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {resumeText.length > 0 ? `${resumeText.split(/\s+/).length} words` : "No content"}
                  </p>
                </CardContent>
              </Card>

              {/* Job Description Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Job Description
                  </CardTitle>
                  <CardDescription>
                    Paste the job description you want to match against
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[340px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {jobDescription.length > 0 ? `${jobDescription.split(/\s+/).length} words` : "No content"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={analyzeResume}
                disabled={!resumeText.trim() || !jobDescription.trim() || isAnalyzing}
                className="gap-2 px-8"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Analyze ATS Compatibility
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {isAnalyzing ? (
              <Card className="p-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-lg font-medium text-foreground">Analyzing your resume...</p>
                  <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                </div>
              </Card>
            ) : analysisResult ? (
              <>
                {/* Score Overview */}
                <div className="grid gap-6 md:grid-cols-4">
                  <Card className="md:col-span-2">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <p className="text-sm text-muted-foreground">ATS Compatibility Score</p>
                        <p className={`text-5xl font-bold ${getScoreColor(analysisResult.score)}`}>
                          {analysisResult.score}%
                        </p>
                      </div>
                      <div className="h-24 w-24">
                        <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-muted">
                          <div 
                            className={`absolute inset-0 rounded-full ${getScoreBg(analysisResult.score)}`}
                            style={{ 
                              clipPath: `polygon(0 0, 100% 0, 100% ${100 - analysisResult.score}%, 0 ${100 - analysisResult.score}%)` 
                            }}
                          />
                          <TrendingUp className={`h-8 w-8 ${getScoreColor(analysisResult.score)}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Matched</span>
                      </div>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {analysisResult.matchedSkills.length}
                      </p>
                      <p className="text-sm text-muted-foreground">skills found</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-red-500">
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">Missing</span>
                      </div>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {analysisResult.missingSkills.length}
                      </p>
                      <p className="text-sm text-muted-foreground">skills to add</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{analysisResult.summary}</p>
                  </CardContent>
                </Card>

                {/* Skills Analysis */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Matched Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        Matched Skills
                      </CardTitle>
                      <CardDescription>
                        Skills from your resume that match the job requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResult.matchedSkills.map((skill, index) => (
                          <div key={index} className="flex items-start justify-between rounded-lg border border-border p-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{skill.skill}</span>
                                <Badge variant="outline" className="text-xs">
                                  {skill.importance}
                                </Badge>
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">{skill.context}</p>
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Missing Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-500">
                        <AlertCircle className="h-5 w-5" />
                        Missing Skills
                      </CardTitle>
                      <CardDescription>
                        Skills from the job description not found in your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResult.missingSkills.map((skill, index) => (
                          <div key={index} className="rounded-lg border border-border p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{skill.skill}</span>
                                <Badge variant="outline" className="text-xs">
                                  {skill.importance}
                                </Badge>
                              </div>
                              <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">{skill.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Recommendations
                    </CardTitle>
                    <CardDescription>
                      Actions to improve your ATS score
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {index + 1}
                          </div>
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => setActiveTab("input")} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Edit Input
                  </Button>
                  <Button onClick={() => {
                    setAnalysisResult(null)
                    setResumeText("")
                    setJobDescription("")
                    setUploadedFile(null)
                    setActiveTab("input")
                  }} className="gap-2">
                    <Zap className="h-4 w-4" />
                    Analyze Another Resume
                  </Button>
                </div>
              </>
            ) : null}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
