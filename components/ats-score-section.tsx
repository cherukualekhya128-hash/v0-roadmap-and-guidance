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
  const [keywords, setKeywords] = useState<KeywordMatch[]>(demoKeywords)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(true) // Start with demo data shown
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

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobAdText.trim()) return
    
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would call an API to extract and compare keywords
    // For demo, we'll generate sample results based on input length
    const newKeywords: KeywordMatch[] = [
      { keyword: "Python", inResume: resumeText.toLowerCase().includes("python"), inJobAd: jobAdText.toLowerCase().includes("python"), category: "technical", importance: "high" },
      { keyword: "JavaScript", inResume: resumeText.toLowerCase().includes("javascript"), inJobAd: jobAdText.toLowerCase().includes("javascript"), category: "technical", importance: "high" },
      { keyword: "React", inResume: resumeText.toLowerCase().includes("react"), inJobAd: jobAdText.toLowerCase().includes("react"), category: "tool", importance: "high" },
      { keyword: "Machine Learning", inResume: resumeText.toLowerCase().includes("machine learning") || resumeText.toLowerCase().includes("ml"), inJobAd: jobAdText.toLowerCase().includes("machine learning") || jobAdText.toLowerCase().includes("ml"), category: "technical", importance: "high" },
      { keyword: "SQL", inResume: resumeText.toLowerCase().includes("sql"), inJobAd: jobAdText.toLowerCase().includes("sql"), category: "technical", importance: "medium" },
      { keyword: "AWS", inResume: resumeText.toLowerCase().includes("aws"), inJobAd: jobAdText.toLowerCase().includes("aws"), category: "tool", importance: "high" },
      { keyword: "Docker", inResume: resumeText.toLowerCase().includes("docker"), inJobAd: jobAdText.toLowerCase().includes("docker"), category: "tool", importance: "medium" },
      { keyword: "Communication", inResume: resumeText.toLowerCase().includes("communication"), inJobAd: jobAdText.toLowerCase().includes("communication"), category: "soft", importance: "medium" },
      { keyword: "Teamwork", inResume: resumeText.toLowerCase().includes("team"), inJobAd: jobAdText.toLowerCase().includes("team"), category: "soft", importance: "medium" },
      { keyword: "Git", inResume: resumeText.toLowerCase().includes("git"), inJobAd: jobAdText.toLowerCase().includes("git"), category: "tool", importance: "low" },
      { keyword: "TypeScript", inResume: resumeText.toLowerCase().includes("typescript"), inJobAd: jobAdText.toLowerCase().includes("typescript"), category: "technical", importance: "medium" },
      { keyword: "Node.js", inResume: resumeText.toLowerCase().includes("node"), inJobAd: jobAdText.toLowerCase().includes("node"), category: "tool", importance: "medium" },
    ]

    // Filter to only show keywords that appear in at least one document
    const relevantKeywords = newKeywords.filter(k => k.inResume || k.inJobAd)
    
    setKeywords(relevantKeywords.length > 0 ? relevantKeywords : demoKeywords)
    setHasAnalyzed(true)
    setIsAnalyzing(false)
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

        <div className="mt-6 flex justify-center">
          <Button 
            size="lg" 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze ATS Score"}
          </Button>
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
