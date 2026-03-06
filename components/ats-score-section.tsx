"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Briefcase, 
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Target,
  Upload,
  FileUp,
  Loader2
} from "lucide-react"

interface KeywordMatch {
  keyword: string
  inResume: boolean
  inJobAd: boolean
  category: "technical" | "soft" | "tool" | "certification"
  importance: "high" | "medium" | "low"
}

// Demo data for initial display
const demoKeywords: KeywordMatch[] = [
  { keyword: "Python", inResume: true, inJobAd: true, category: "technical", importance: "high" },
  { keyword: "Machine Learning", inResume: true, inJobAd: true, category: "technical", importance: "high" },
  { keyword: "TensorFlow", inResume: false, inJobAd: true, category: "tool", importance: "high" },
  { keyword: "Data Analysis", inResume: true, inJobAd: true, category: "technical", importance: "medium" },
  { keyword: "SQL", inResume: true, inJobAd: true, category: "technical", importance: "medium" },
  { keyword: "AWS", inResume: false, inJobAd: true, category: "tool", importance: "high" },
  { keyword: "Docker", inResume: false, inJobAd: true, category: "tool", importance: "medium" },
  { keyword: "Communication", inResume: true, inJobAd: true, category: "soft", importance: "medium" },
  { keyword: "Problem Solving", inResume: true, inJobAd: true, category: "soft", importance: "medium" },
  { keyword: "Git", inResume: true, inJobAd: true, category: "tool", importance: "low" },
  { keyword: "Deep Learning", inResume: false, inJobAd: true, category: "technical", importance: "high" },
  { keyword: "PyTorch", inResume: true, inJobAd: true, category: "tool", importance: "high" },
  { keyword: "NLP", inResume: true, inJobAd: true, category: "technical", importance: "medium" },
  { keyword: "Agile", inResume: false, inJobAd: true, category: "soft", importance: "low" },
  { keyword: "Leadership", inResume: true, inJobAd: false, category: "soft", importance: "medium" },
]

function calculateATSScore(keywords: KeywordMatch[]): number {
  if (keywords.length === 0) return 0
  
  const jobAdKeywords = keywords.filter(kw => kw.inJobAd)
  if (jobAdKeywords.length === 0) return 0
  
  const weightedScore = keywords.reduce((acc, kw) => {
    const weight = kw.importance === "high" ? 3 : kw.importance === "medium" ? 2 : 1
    if (kw.inResume && kw.inJobAd) {
      return acc + weight
    }
    return acc
  }, 0)

  const maxScore = keywords.reduce((acc, kw) => {
    const weight = kw.importance === "high" ? 3 : kw.importance === "medium" ? 2 : 1
    if (kw.inJobAd) {
      return acc + weight
    }
    return acc
  }, 0)

  if (maxScore === 0) return 0
  return Math.round((weightedScore / maxScore) * 100)
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  return "text-red-500"
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

function getImportanceBadge(importance: string) {
  switch (importance) {
    case "high":
      return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">High</Badge>
    case "medium":
      return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Medium</Badge>
    default:
      return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Low</Badge>
  }
}

function getCategoryBadge(category: string) {
  switch (category) {
    case "technical":
      return <Badge variant="outline" className="border-primary/50 text-primary">Technical</Badge>
    case "tool":
      return <Badge variant="outline" className="border-cyan-500/50 text-cyan-500">Tool</Badge>
    case "soft":
      return <Badge variant="outline" className="border-purple-500/50 text-purple-500">Soft Skill</Badge>
    default:
      return <Badge variant="outline" className="border-orange-500/50 text-orange-500">Certification</Badge>
  }
}

export function ATSScoreSection() {
  const [resumeText, setResumeText] = useState("")
  const [jobAdText, setJobAdText] = useState("")
  const [keywords, setKeywords] = useState<KeywordMatch[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false) // Start with no analysis
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedFileName(file.name)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to parse file")
      }

      const data = await response.json()
      setResumeText(data.text)
      
      // Auto-analyze if job description is already provided
      if (jobAdText.trim()) {
        setIsUploading(false)
        await runAnalysis(data.text, jobAdText)
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadedFileName(null)
      alert(error instanceof Error ? error.message : "Failed to parse file")
    } finally {
      setIsUploading(false)
    }
  }

  const atsScore = calculateATSScore(keywords)
  const matchedKeywords = keywords.filter(k => k.inResume && k.inJobAd)
  const missingKeywords = keywords.filter(k => !k.inResume && k.inJobAd)
  const extraKeywords = keywords.filter(k => k.inResume && !k.inJobAd)

  // Comprehensive keyword database with categories and importance
  const keywordDatabase: { keyword: string; variants: string[]; category: KeywordMatch["category"]; importance: KeywordMatch["importance"] }[] = [
    // Programming Languages - High importance
    { keyword: "Python", variants: ["python", "py"], category: "technical", importance: "high" },
    { keyword: "JavaScript", variants: ["javascript", "js", "ecmascript"], category: "technical", importance: "high" },
    { keyword: "TypeScript", variants: ["typescript", "ts"], category: "technical", importance: "high" },
    { keyword: "Java", variants: ["java"], category: "technical", importance: "high" },
    { keyword: "C++", variants: ["c++", "cpp"], category: "technical", importance: "medium" },
    { keyword: "C#", variants: ["c#", "csharp"], category: "technical", importance: "medium" },
    { keyword: "Go", variants: ["golang", "go lang"], category: "technical", importance: "medium" },
    { keyword: "Rust", variants: ["rust"], category: "technical", importance: "medium" },
    { keyword: "Ruby", variants: ["ruby"], category: "technical", importance: "medium" },
    { keyword: "PHP", variants: ["php"], category: "technical", importance: "medium" },
    { keyword: "Swift", variants: ["swift"], category: "technical", importance: "medium" },
    { keyword: "Kotlin", variants: ["kotlin"], category: "technical", importance: "medium" },
    { keyword: "Scala", variants: ["scala"], category: "technical", importance: "medium" },
    { keyword: "R", variants: [" r ", "r programming", "rstudio"], category: "technical", importance: "medium" },
    
    // AI/ML - High importance
    { keyword: "Machine Learning", variants: ["machine learning", "ml", "machine-learning"], category: "technical", importance: "high" },
    { keyword: "Deep Learning", variants: ["deep learning", "dl", "deep-learning"], category: "technical", importance: "high" },
    { keyword: "Natural Language Processing", variants: ["nlp", "natural language processing", "natural language"], category: "technical", importance: "high" },
    { keyword: "Computer Vision", variants: ["computer vision", "cv", "image recognition"], category: "technical", importance: "high" },
    { keyword: "TensorFlow", variants: ["tensorflow", "tf"], category: "tool", importance: "high" },
    { keyword: "PyTorch", variants: ["pytorch", "torch"], category: "tool", importance: "high" },
    { keyword: "Scikit-learn", variants: ["scikit-learn", "sklearn", "scikit learn"], category: "tool", importance: "medium" },
    { keyword: "Keras", variants: ["keras"], category: "tool", importance: "medium" },
    { keyword: "OpenAI", variants: ["openai", "gpt", "chatgpt", "gpt-4", "gpt-3"], category: "tool", importance: "high" },
    { keyword: "LangChain", variants: ["langchain", "lang chain"], category: "tool", importance: "medium" },
    { keyword: "Hugging Face", variants: ["hugging face", "huggingface", "transformers"], category: "tool", importance: "medium" },
    { keyword: "BERT", variants: ["bert"], category: "technical", importance: "medium" },
    { keyword: "Neural Networks", variants: ["neural network", "neural networks", "nn", "ann"], category: "technical", importance: "medium" },
    { keyword: "RAG", variants: ["rag", "retrieval augmented generation", "retrieval-augmented"], category: "technical", importance: "medium" },
    
    // Data - High importance
    { keyword: "SQL", variants: ["sql", "mysql", "postgresql", "postgres", "sqlite"], category: "technical", importance: "high" },
    { keyword: "NoSQL", variants: ["nosql", "mongodb", "cassandra", "couchdb"], category: "technical", importance: "medium" },
    { keyword: "Data Analysis", variants: ["data analysis", "data analytics", "analytics"], category: "technical", importance: "high" },
    { keyword: "Data Science", variants: ["data science", "data scientist"], category: "technical", importance: "high" },
    { keyword: "Big Data", variants: ["big data", "bigdata"], category: "technical", importance: "medium" },
    { keyword: "ETL", variants: ["etl", "extract transform load"], category: "technical", importance: "medium" },
    { keyword: "Pandas", variants: ["pandas"], category: "tool", importance: "medium" },
    { keyword: "NumPy", variants: ["numpy"], category: "tool", importance: "medium" },
    { keyword: "Spark", variants: ["spark", "apache spark", "pyspark"], category: "tool", importance: "medium" },
    { keyword: "Hadoop", variants: ["hadoop"], category: "tool", importance: "low" },
    { keyword: "Tableau", variants: ["tableau"], category: "tool", importance: "medium" },
    { keyword: "Power BI", variants: ["power bi", "powerbi"], category: "tool", importance: "medium" },
    
    // Web Development - High importance
    { keyword: "React", variants: ["react", "reactjs", "react.js"], category: "tool", importance: "high" },
    { keyword: "Angular", variants: ["angular", "angularjs"], category: "tool", importance: "high" },
    { keyword: "Vue.js", variants: ["vue", "vuejs", "vue.js"], category: "tool", importance: "high" },
    { keyword: "Next.js", variants: ["next.js", "nextjs", "next js"], category: "tool", importance: "high" },
    { keyword: "Node.js", variants: ["node", "nodejs", "node.js"], category: "tool", importance: "high" },
    { keyword: "Express", variants: ["express", "expressjs"], category: "tool", importance: "medium" },
    { keyword: "Django", variants: ["django"], category: "tool", importance: "medium" },
    { keyword: "Flask", variants: ["flask"], category: "tool", importance: "medium" },
    { keyword: "FastAPI", variants: ["fastapi", "fast api"], category: "tool", importance: "medium" },
    { keyword: "HTML", variants: ["html", "html5"], category: "technical", importance: "medium" },
    { keyword: "CSS", variants: ["css", "css3", "sass", "scss", "less"], category: "technical", importance: "medium" },
    { keyword: "REST API", variants: ["rest", "restful", "rest api", "api"], category: "technical", importance: "high" },
    { keyword: "GraphQL", variants: ["graphql"], category: "technical", importance: "medium" },
    { keyword: "Tailwind", variants: ["tailwind", "tailwindcss"], category: "tool", importance: "medium" },
    
    // Cloud & DevOps - High importance
    { keyword: "AWS", variants: ["aws", "amazon web services", "ec2", "s3", "lambda"], category: "tool", importance: "high" },
    { keyword: "Azure", variants: ["azure", "microsoft azure"], category: "tool", importance: "high" },
    { keyword: "Google Cloud", variants: ["gcp", "google cloud", "google cloud platform"], category: "tool", importance: "high" },
    { keyword: "Docker", variants: ["docker", "dockerfile", "containers"], category: "tool", importance: "high" },
    { keyword: "Kubernetes", variants: ["kubernetes", "k8s"], category: "tool", importance: "high" },
    { keyword: "CI/CD", variants: ["ci/cd", "cicd", "continuous integration", "continuous deployment"], category: "technical", importance: "high" },
    { keyword: "Git", variants: ["git", "github", "gitlab", "bitbucket"], category: "tool", importance: "high" },
    { keyword: "Jenkins", variants: ["jenkins"], category: "tool", importance: "medium" },
    { keyword: "Terraform", variants: ["terraform"], category: "tool", importance: "medium" },
    { keyword: "Linux", variants: ["linux", "ubuntu", "centos", "redhat"], category: "technical", importance: "medium" },
    { keyword: "DevOps", variants: ["devops"], category: "technical", importance: "high" },
    { keyword: "Microservices", variants: ["microservices", "microservice", "micro-services"], category: "technical", importance: "medium" },
    
    // Soft Skills - Medium importance
    { keyword: "Communication", variants: ["communication", "communicate", "communicating"], category: "soft", importance: "medium" },
    { keyword: "Leadership", variants: ["leadership", "leader", "leading", "lead teams"], category: "soft", importance: "high" },
    { keyword: "Teamwork", variants: ["teamwork", "team work", "team player", "collaborate", "collaboration"], category: "soft", importance: "medium" },
    { keyword: "Problem Solving", variants: ["problem solving", "problem-solving", "troubleshoot", "troubleshooting"], category: "soft", importance: "high" },
    { keyword: "Analytical", variants: ["analytical", "analyze", "analysis"], category: "soft", importance: "medium" },
    { keyword: "Project Management", variants: ["project management", "project manager", "pm"], category: "soft", importance: "medium" },
    { keyword: "Agile", variants: ["agile", "scrum", "kanban", "sprint"], category: "soft", importance: "medium" },
    { keyword: "Time Management", variants: ["time management", "deadline", "deadlines"], category: "soft", importance: "low" },
    { keyword: "Critical Thinking", variants: ["critical thinking", "critical-thinking"], category: "soft", importance: "medium" },
    { keyword: "Presentation", variants: ["presentation", "presenting", "public speaking"], category: "soft", importance: "low" },
    
    // Certifications - High importance
    { keyword: "AWS Certified", variants: ["aws certified", "aws certification"], category: "certification", importance: "high" },
    { keyword: "Google Certified", variants: ["google certified", "google certification"], category: "certification", importance: "high" },
    { keyword: "Azure Certified", variants: ["azure certified", "azure certification"], category: "certification", importance: "high" },
    { keyword: "PMP", variants: ["pmp", "project management professional"], category: "certification", importance: "medium" },
    { keyword: "Scrum Master", variants: ["scrum master", "csm", "certified scrum master"], category: "certification", importance: "medium" },
    { keyword: "Six Sigma", variants: ["six sigma", "lean six sigma"], category: "certification", importance: "low" },
    
    // Experience level keywords
    { keyword: "Bachelor's Degree", variants: ["bachelor", "bachelors", "b.s.", "b.a.", "bs ", "ba ", "undergraduate"], category: "certification", importance: "medium" },
    { keyword: "Master's Degree", variants: ["master", "masters", "m.s.", "m.a.", "ms ", "ma ", "graduate degree"], category: "certification", importance: "medium" },
    { keyword: "PhD", variants: ["phd", "ph.d", "doctorate", "doctoral"], category: "certification", importance: "medium" },
  ]

  const checkKeywordPresence = (text: string, variants: string[]): boolean => {
    const lowerText = text.toLowerCase()
    return variants.some(variant => {
      const regex = new RegExp(`\\b${variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      return regex.test(lowerText) || lowerText.includes(variant.toLowerCase())
    })
  }

  // Reusable analysis function that can be called with custom text
  const runAnalysis = async (resume: string, jobAd: string) => {
    if (!resume.trim() || !jobAd.trim()) return
    
    setIsAnalyzing(true)
    // Brief processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Analyze keywords from both documents
    const analyzedKeywords: KeywordMatch[] = []
    
    for (const kw of keywordDatabase) {
      const inResume = checkKeywordPresence(resume, [kw.keyword.toLowerCase(), ...kw.variants])
      const inJobAd = checkKeywordPresence(jobAd, [kw.keyword.toLowerCase(), ...kw.variants])
      
      // Only include if keyword appears in at least one document
      if (inResume || inJobAd) {
        analyzedKeywords.push({
          keyword: kw.keyword,
          inResume,
          inJobAd,
          category: kw.category,
          importance: kw.importance,
        })
      }
    }
    
    // Sort by importance (high first), then by status (missing first for visibility)
    const sortedKeywords = analyzedKeywords.sort((a, b) => {
      const importanceOrder = { high: 0, medium: 1, low: 2 }
      const aOrder = importanceOrder[a.importance]
      const bOrder = importanceOrder[b.importance]
      if (aOrder !== bOrder) return aOrder - bOrder
      
      // Then by status: missing in resume but in job ad first
      if (!a.inResume && a.inJobAd && (b.inResume || !b.inJobAd)) return -1
      if (!b.inResume && b.inJobAd && (a.inResume || !a.inJobAd)) return 1
      
      return 0
    })
    
    setKeywords(sortedKeywords)
    setHasAnalyzed(true)
    setIsAnalyzing(false)
  }

  // Button click handler uses current state
  const handleAnalyze = async () => {
    await runAnalysis(resumeText, jobAdText)
  }

  return (
    <section id="ats-score" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            ATS Analyzer
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Check Your ATS Score
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Compare your resume against job descriptions to see keyword matches and get an accurate ATS compatibility score.
          </p>
        </div>

        {/* Input Section */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <label className="font-medium text-foreground">Your Resume</label>
              </div>
              <span className="text-xs text-muted-foreground">PDF, DOC, DOCX, or TXT</span>
            </div>
            
            {/* File Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-6 transition-colors hover:border-primary/50 hover:bg-card"
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
                  <span className="text-xs text-muted-foreground">Click to upload a different file</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Upload Resume</span>
                  <span className="text-xs text-muted-foreground">Click or drag and drop</span>
                </div>
              )}
            </div>

            {/* Or divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or paste text</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Textarea
              placeholder="Paste your resume text here..."
              className="min-h-[150px] resize-none border-border bg-card text-foreground placeholder:text-muted-foreground"
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value)
                if (e.target.value !== resumeText) setUploadedFileName(null)
              }}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <label className="font-medium text-foreground">Job Description</label>
            </div>
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-[200px] resize-none border-border bg-card text-foreground placeholder:text-muted-foreground"
              value={jobAdText}
              onChange={(e) => setJobAdText(e.target.value)}
            />
          </div>
        </div>

        {/* Initial Score Display - Before Analysis */}
        {!hasAnalyzed && (
          <div className="mt-12">
            <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-8 text-center">
              <div className="text-6xl font-bold text-muted-foreground">0%</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload your resume and paste a job description to calculate your ATS score
              </p>
              <Progress value={0} className="mt-4 h-3" />
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center gap-2">
          <Button 
            size="lg" 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeText.trim() || !jobAdText.trim()}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze ATS Score"}
          </Button>
          {(!resumeText.trim() || !jobAdText.trim()) && !hasAnalyzed && (
            <p className="text-xs text-muted-foreground">
              {!resumeText.trim() && !jobAdText.trim() 
                ? "Please provide your resume and a job description"
                : !resumeText.trim() 
                  ? "Please upload or paste your resume"
                  : "Please paste a job description"}
            </p>
          )}
        </div>

        {/* Results Section */}
        {hasAnalyzed && (
          <div className="mt-12 space-y-8">
            {/* Score Overview */}
            <div className="grid gap-6 md:grid-cols-4">
              {/* Main Score Card */}
              <div className="col-span-full rounded-xl border border-border bg-card p-6 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">ATS Compatibility Score</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Based on keyword matching and importance weighting</p>
                  </div>
                  <div className={`text-5xl font-bold ${getScoreColor(atsScore)}`}>
                    {atsScore}%
                  </div>
                </div>
                <Progress value={atsScore} className={`mt-4 h-3 ${getScoreBgColor(atsScore)}`} />
                <div className="mt-4 flex items-center gap-2 text-sm">
                  {atsScore >= 80 ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Excellent match! High chance of passing ATS.</span>
                    </>
                  ) : atsScore >= 60 ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-500">Good match. Consider adding missing keywords.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-500">Low match. Resume needs optimization.</span>
                    </>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{matchedKeywords.length}</div>
                    <div className="text-sm text-muted-foreground">Matched</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{missingKeywords.length}</div>
                    <div className="text-sm text-muted-foreground">Missing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-secondary/30 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Keyword Analysis</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Keyword</TableHead>
                      <TableHead className="text-center text-muted-foreground">In Resume</TableHead>
                      <TableHead className="text-center text-muted-foreground">In Job Ad</TableHead>
                      <TableHead className="text-muted-foreground">Category</TableHead>
                      <TableHead className="text-muted-foreground">Importance</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywords.map((keyword, index) => (
                      <TableRow key={index} className="border-border">
                        <TableCell className="font-medium text-foreground">{keyword.keyword}</TableCell>
                        <TableCell className="text-center">
                          {keyword.inResume ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto h-5 w-5 text-red-500/50" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {keyword.inJobAd ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto h-5 w-5 text-muted-foreground/50" />
                          )}
                        </TableCell>
                        <TableCell>{getCategoryBadge(keyword.category)}</TableCell>
                        <TableCell>{getImportanceBadge(keyword.importance)}</TableCell>
                        <TableCell>
                          {keyword.inResume && keyword.inJobAd ? (
                            <Badge className="bg-green-500/10 text-green-500">Match</Badge>
                          ) : keyword.inJobAd && !keyword.inResume ? (
                            <Badge className="bg-red-500/10 text-red-500">Missing</Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">Extra</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Recommendations */}
            {missingKeywords.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Recommendations</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add these high-priority keywords to improve your ATS score:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {missingKeywords
                    .sort((a, b) => {
                      const order = { high: 0, medium: 1, low: 2 }
                      return order[a.importance] - order[b.importance]
                    })
                    .map((kw, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className={`${
                          kw.importance === "high"
                            ? "border-red-500/50 text-red-500"
                            : kw.importance === "medium"
                            ? "border-yellow-500/50 text-yellow-500"
                            : "border-blue-500/50 text-blue-500"
                        }`}
                      >
                        {kw.keyword}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
