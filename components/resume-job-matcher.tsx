"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Upload,
  FileText,
  X,
  Loader2,
  Sparkles,
  Briefcase,
  Target,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  MapPin,
  Building2,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react"
import type { JobListing } from "@/lib/jobs-data"

interface ResumeAnalysis {
  skills: string[]
  experience: string
  education: string
  suggestedRoles: string[]
  skillGaps: string[]
}

interface MatchedJob extends JobListing {
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
}

interface ResumeJobMatcherProps {
  onJobSelect?: (job: JobListing) => void
}

export function ResumeJobMatcher({ onJobSelect }: ResumeJobMatcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [resumeText, setResumeText] = useState("")
  const [fileName, setFileName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([])
  const [isLoadingJobs, setIsLoadingJobs] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setFileName(file.name)
    setIsAnalyzing(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const parseResponse = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      })

      const parseData = await parseResponse.json()

      if (!parseResponse.ok) {
        throw new Error(parseData.error || "Failed to parse resume")
      }

      setResumeText(parseData.text)
      await analyzeAndMatchJobs(parseData.text)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process resume")
      setIsAnalyzing(false)
    }
  }

  const handlePasteResume = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text first")
      return
    }

    setError("")
    setFileName("Pasted Resume")
    await analyzeAndMatchJobs(resumeText)
  }

  const analyzeAndMatchJobs = async (text: string) => {
    setIsAnalyzing(true)
    setError("")

    try {
      // Analyze resume with AI
      const analysisResponse = await fetch("/api/analyze-resume-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text }),
      })

      const analysisData = await analysisResponse.json()

      if (!analysisResponse.ok) {
        throw new Error(analysisData.error || "Failed to analyze resume")
      }

      setAnalysis(analysisData)

      // Now fetch matching jobs
      setIsLoadingJobs(true)
      const jobsResponse = await fetch("/api/match-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: analysisData.skills,
          suggestedRoles: analysisData.suggestedRoles,
        }),
      })

      const jobsData = await jobsResponse.json()

      if (jobsResponse.ok) {
        setMatchedJobs(jobsData.matchedJobs || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume")
    } finally {
      setIsAnalyzing(false)
      setIsLoadingJobs(false)
    }
  }

  const resetAll = () => {
    setResumeText("")
    setFileName("")
    setAnalysis(null)
    setMatchedJobs([])
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-orange-500"
  }

  const getMatchScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500/10 border-green-500/30"
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30"
    return "bg-orange-500/10 border-orange-500/30"
  }

  return (
    <div className="mb-6">
      {/* Toggle Button */}
      {!isOpen && (
        <Card 
          className="cursor-pointer border-dashed border-primary/50 bg-primary/5 transition-all hover:border-primary hover:bg-primary/10"
          onClick={() => setIsOpen(true)}
        >
          <CardContent className="flex items-center justify-center gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">Get Personalized Job Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Upload your resume and let AI match you with the best jobs based on your skills
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <Card className="border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              AI Job Matcher
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            {!analysis && (
              <div className="space-y-4">
                <div
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors ${
                    isAnalyzing
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const file = e.dataTransfer.files[0]
                    if (file && fileInputRef.current) {
                      const dt = new DataTransfer()
                      dt.items.add(file)
                      fileInputRef.current.files = dt.files
                      handleFileUpload({ target: { files: dt.files } } as React.ChangeEvent<HTMLInputElement>)
                    }
                  }}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Analyzing your resume...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <div className="text-center">
                        <p className="font-medium text-foreground">Drop your resume here or click to upload</p>
                        <p className="text-sm text-muted-foreground">Supports PDF, DOCX, DOC, TXT</p>
                      </div>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <FileText className="mr-2 h-4 w-4" />
                        Select File
                      </Button>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isAnalyzing}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    rows={4}
                    disabled={isAnalyzing}
                    className="resize-none"
                  />
                  <Button
                    onClick={handlePasteResume}
                    disabled={isAnalyzing || !resumeText.trim()}
                    className="w-full"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze & Find Matching Jobs
                  </Button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <div className="space-y-4">
                {/* Resume Info */}
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{fileName}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetAll}>
                    <X className="mr-1 h-3 w-3" />
                    Clear
                  </Button>
                </div>

                {/* Skills Extracted */}
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Your Skills ({analysis.skills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Suggested Roles */}
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-sm font-medium">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Suggested Roles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.suggestedRoles.map((role, i) => (
                      <Badge key={i} variant="outline" className="border-primary/50">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skill Gaps */}
                {analysis.skillGaps.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      Skills to Learn
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.skillGaps.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-orange-500/50 text-orange-600">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Jobs */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-sm font-medium">
                    <Zap className="h-4 w-4 text-primary" />
                    Best Matching Jobs ({matchedJobs.length})
                  </h4>

                  {isLoadingJobs ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : matchedJobs.length > 0 ? (
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2 pr-4">
                        {matchedJobs.map((job) => (
                          <Card
                            key={job.id}
                            className={`cursor-pointer border transition-all hover:shadow-md ${getMatchScoreBg(job.matchScore)}`}
                            onClick={() => onJobSelect?.(job)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-semibold text-foreground">{job.title}</h5>
                                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Building2 className="h-3 w-3" />
                                    {job.company}
                                  </p>
                                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {job.location.split(",")[0]}
                                  </p>
                                  {/* Matched Skills */}
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {job.matchedSkills.slice(0, 4).map((skill, i) => (
                                      <Badge key={i} variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                                        {skill}
                                      </Badge>
                                    ))}
                                    {job.matchedSkills.length > 4 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{job.matchedSkills.length - 4}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className={`flex items-center gap-1 text-lg font-bold ${getMatchScoreColor(job.matchScore)}`}>
                                    <Star className="h-4 w-4" />
                                    {job.matchScore}%
                                  </div>
                                  <span className="text-xs text-muted-foreground">match</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Briefcase className="h-10 w-10 text-muted-foreground/50" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        No matching jobs found. Try updating your skills or check back later.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
