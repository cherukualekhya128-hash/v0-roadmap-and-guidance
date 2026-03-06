"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Sparkles,
  Code2,
  Users,
  Lightbulb,
  Target,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Clock,
  Star,
  Play,
  RotateCcw,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  BookOpen,
} from "lucide-react"

interface TechnicalQuestion {
  question: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  expectedAnswer: string
  tips: string
}

interface BehavioralQuestion {
  question: string
  category: string
  starFormat: {
    situation: string
    task: string
    action: string
    result: string
  }
  tips: string
}

interface SituationalQuestion {
  question: string
  scenario: string
  keyPointsToAddress: string[]
  tips: string
}

interface RoleSpecificQuestion {
  question: string
  context: string
  idealResponse: string
  tips: string
}

interface InterviewQuestions {
  technicalQuestions: TechnicalQuestion[]
  behavioralQuestions: BehavioralQuestion[]
  situationalQuestions: SituationalQuestion[]
  roleSpecificQuestions: RoleSpecificQuestion[]
}

interface InterviewPracticeSectionProps {
  resumeText: string
  isVisible: boolean
}

export function InterviewPracticeSection({ resumeText, isVisible }: InterviewPracticeSectionProps) {
  const [jobRole, setJobRole] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("mid-level")
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<InterviewQuestions | null>(null)
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({})
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [practiceMode, setPracticeMode] = useState(false)
  const [currentTab, setCurrentTab] = useState("technical")
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set())

  if (!isVisible) return null

  const [error, setError] = useState<string | null>(null)

  const generateQuestions = async () => {
    if (!resumeText) return

    setIsGenerating(true)
    setError(null)
    
    try {
      const response = await fetch("/api/generate-interview-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobRole: jobRole || "Software Developer",
          jobDescription,
          experienceLevel,
        }),
      })

      const data = await response.json()
      
      if (data.questions) {
        setQuestions(data.questions)
        setPracticeMode(true)
      } else {
        throw new Error(data.error || "Failed to generate questions")
      }
    } catch (err) {
      console.error("Error generating questions:", err)
      setError("Failed to generate questions. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleAnswer = (questionId: string) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const markAsCompleted = (questionId: string) => {
    setCompletedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
      case "hard":
        return "bg-red-500/10 text-red-600 border-red-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  const totalQuestions = questions
    ? questions.technicalQuestions.length +
      questions.behavioralQuestions.length +
      questions.situationalQuestions.length +
      questions.roleSpecificQuestions.length
    : 0

  const completionPercentage = totalQuestions > 0
    ? Math.round((completedQuestions.size / totalQuestions) * 100)
    : 0

  const resetPractice = () => {
    setPracticeMode(false)
    setQuestions(null)
    setShowAnswer({})
    setUserAnswers({})
    setCompletedQuestions(new Set())
    setActiveQuestion(0)
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Interview Practice Generator</h3>
            <p className="text-sm text-muted-foreground">
              Generate personalized interview questions based on your resume
            </p>
          </div>
        </div>

        {!practiceMode ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Target Job Role
                </label>
                <Input
                  placeholder="e.g., Full Stack Developer, Data Scientist"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Experience Level
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="fresher">Fresher / Entry Level</option>
                  <option value="junior">Junior (1-2 years)</option>
                  <option value="mid-level">Mid Level (3-5 years)</option>
                  <option value="senior">Senior (5-8 years)</option>
                  <option value="lead">Lead / Principal (8+ years)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Job Description (Optional)
              </label>
              <Textarea
                placeholder="Paste the job description here for more targeted questions..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={3}
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              onClick={generateQuestions}
              disabled={isGenerating}
              className="w-full gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Interview Questions...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Interview Questions
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Practice Progress</span>
                <span className="font-medium text-foreground">
                  {completedQuestions.size} / {totalQuestions} completed
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Card className="border-border/50">
                <CardContent className="p-3 text-center">
                  <Code2 className="mx-auto h-5 w-5 text-blue-500" />
                  <p className="mt-1 text-lg font-semibold">{questions?.technicalQuestions.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Technical</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3 text-center">
                  <Users className="mx-auto h-5 w-5 text-purple-500" />
                  <p className="mt-1 text-lg font-semibold">{questions?.behavioralQuestions.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Behavioral</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3 text-center">
                  <Lightbulb className="mx-auto h-5 w-5 text-yellow-500" />
                  <p className="mt-1 text-lg font-semibold">{questions?.situationalQuestions.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Situational</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3 text-center">
                  <Target className="mx-auto h-5 w-5 text-green-500" />
                  <p className="mt-1 text-lg font-semibold">{questions?.roleSpecificQuestions.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Role-Specific</p>
                </CardContent>
              </Card>
            </div>

            {/* Questions Tabs */}
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="technical" className="gap-1 text-xs sm:text-sm">
                  <Code2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Technical</span>
                </TabsTrigger>
                <TabsTrigger value="behavioral" className="gap-1 text-xs sm:text-sm">
                  <Users className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Behavioral</span>
                </TabsTrigger>
                <TabsTrigger value="situational" className="gap-1 text-xs sm:text-sm">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Situational</span>
                </TabsTrigger>
                <TabsTrigger value="role" className="gap-1 text-xs sm:text-sm">
                  <Target className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Role</span>
                </TabsTrigger>
              </TabsList>

              {/* Technical Questions */}
              <TabsContent value="technical" className="mt-4 space-y-4">
                {questions?.technicalQuestions.map((q, idx) => {
                  const questionId = `tech-${idx}`
                  return (
                    <Card key={idx} className={`border-border/50 transition-all ${completedQuestions.has(questionId) ? "border-green-500/50 bg-green-500/5" : ""}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge className={getDifficultyColor(q.difficulty)}>
                                {q.difficulty}
                              </Badge>
                              <Badge variant="outline">{q.category}</Badge>
                              {completedQuestions.has(questionId) && (
                                <Badge className="bg-green-500/10 text-green-600">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-base font-medium leading-relaxed">
                              Q{idx + 1}: {q.question}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-muted-foreground">
                            Your Answer
                          </label>
                          <Textarea
                            placeholder="Type your answer here to practice..."
                            value={userAnswers[questionId] || ""}
                            onChange={(e) => setUserAnswers(prev => ({ ...prev, [questionId]: e.target.value }))}
                            rows={3}
                            className="text-sm"
                          />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAnswer(questionId)}
                            className="gap-1"
                          >
                            {showAnswer[questionId] ? (
                              <><EyeOff className="h-3.5 w-3.5" /> Hide Answer</>
                            ) : (
                              <><Eye className="h-3.5 w-3.5" /> Show Answer</>
                            )}
                          </Button>
                          <Button
                            variant={completedQuestions.has(questionId) ? "secondary" : "default"}
                            size="sm"
                            onClick={() => markAsCompleted(questionId)}
                            className="gap-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {completedQuestions.has(questionId) ? "Mark Incomplete" : "Mark Complete"}
                          </Button>
                        </div>

                        {showAnswer[questionId] && (
                          <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                            <div>
                              <h5 className="mb-1 text-sm font-semibold text-primary">Expected Answer:</h5>
                              <p className="text-sm text-foreground/80">{q.expectedAnswer}</p>
                            </div>
                            <div>
                              <h5 className="mb-1 text-sm font-semibold text-yellow-600">Tips:</h5>
                              <p className="text-sm text-foreground/80">{q.tips}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              {/* Behavioral Questions */}
              <TabsContent value="behavioral" className="mt-4 space-y-4">
                {questions?.behavioralQuestions.map((q, idx) => {
                  const questionId = `behav-${idx}`
                  return (
                    <Card key={idx} className={`border-border/50 transition-all ${completedQuestions.has(questionId) ? "border-green-500/50 bg-green-500/5" : ""}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="border-purple-500/50 text-purple-500">
                                {q.category}
                              </Badge>
                              <Badge variant="outline" className="border-blue-500/50 text-blue-500">
                                STAR Format
                              </Badge>
                              {completedQuestions.has(questionId) && (
                                <Badge className="bg-green-500/10 text-green-600">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-base font-medium leading-relaxed">
                              Q{idx + 1}: {q.question}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-muted-foreground">
                            Your Answer (Use STAR Format)
                          </label>
                          <Textarea
                            placeholder="Situation: ...\nTask: ...\nAction: ...\nResult: ..."
                            value={userAnswers[questionId] || ""}
                            onChange={(e) => setUserAnswers(prev => ({ ...prev, [questionId]: e.target.value }))}
                            rows={5}
                            className="text-sm"
                          />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAnswer(questionId)}
                            className="gap-1"
                          >
                            {showAnswer[questionId] ? (
                              <><EyeOff className="h-3.5 w-3.5" /> Hide Guide</>
                            ) : (
                              <><Eye className="h-3.5 w-3.5" /> Show STAR Guide</>
                            )}
                          </Button>
                          <Button
                            variant={completedQuestions.has(questionId) ? "secondary" : "default"}
                            size="sm"
                            onClick={() => markAsCompleted(questionId)}
                            className="gap-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {completedQuestions.has(questionId) ? "Mark Incomplete" : "Mark Complete"}
                          </Button>
                        </div>

                        {showAnswer[questionId] && (
                          <div className="space-y-3 rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                            <h5 className="text-sm font-semibold text-purple-600">STAR Format Guide:</h5>
                            <div className="grid gap-2 text-sm">
                              <div className="rounded bg-background/50 p-2">
                                <span className="font-medium text-blue-500">S - Situation:</span>
                                <p className="text-foreground/80">{q.starFormat.situation}</p>
                              </div>
                              <div className="rounded bg-background/50 p-2">
                                <span className="font-medium text-green-500">T - Task:</span>
                                <p className="text-foreground/80">{q.starFormat.task}</p>
                              </div>
                              <div className="rounded bg-background/50 p-2">
                                <span className="font-medium text-yellow-500">A - Action:</span>
                                <p className="text-foreground/80">{q.starFormat.action}</p>
                              </div>
                              <div className="rounded bg-background/50 p-2">
                                <span className="font-medium text-purple-500">R - Result:</span>
                                <p className="text-foreground/80">{q.starFormat.result}</p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <h5 className="mb-1 text-sm font-semibold text-yellow-600">Tips:</h5>
                              <p className="text-sm text-foreground/80">{q.tips}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              {/* Situational Questions */}
              <TabsContent value="situational" className="mt-4 space-y-4">
                {questions?.situationalQuestions.map((q, idx) => {
                  const questionId = `sit-${idx}`
                  return (
                    <Card key={idx} className={`border-border/50 transition-all ${completedQuestions.has(questionId) ? "border-green-500/50 bg-green-500/5" : ""}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">
                                Hypothetical Scenario
                              </Badge>
                              {completedQuestions.has(questionId) && (
                                <Badge className="bg-green-500/10 text-green-600">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-base font-medium leading-relaxed">
                              Q{idx + 1}: {q.question}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="rounded-lg bg-muted/50 p-3">
                          <p className="text-sm italic text-muted-foreground">
                            Scenario: {q.scenario}
                          </p>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-muted-foreground">
                            Your Response
                          </label>
                          <Textarea
                            placeholder="How would you handle this situation?"
                            value={userAnswers[questionId] || ""}
                            onChange={(e) => setUserAnswers(prev => ({ ...prev, [questionId]: e.target.value }))}
                            rows={4}
                            className="text-sm"
                          />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAnswer(questionId)}
                            className="gap-1"
                          >
                            {showAnswer[questionId] ? (
                              <><EyeOff className="h-3.5 w-3.5" /> Hide Key Points</>
                            ) : (
                              <><Eye className="h-3.5 w-3.5" /> Show Key Points</>
                            )}
                          </Button>
                          <Button
                            variant={completedQuestions.has(questionId) ? "secondary" : "default"}
                            size="sm"
                            onClick={() => markAsCompleted(questionId)}
                            className="gap-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {completedQuestions.has(questionId) ? "Mark Incomplete" : "Mark Complete"}
                          </Button>
                        </div>

                        {showAnswer[questionId] && (
                          <div className="space-y-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                            <div>
                              <h5 className="mb-2 text-sm font-semibold text-yellow-600">Key Points to Address:</h5>
                              <ul className="list-inside list-disc space-y-1 text-sm text-foreground/80">
                                {q.keyPointsToAddress.map((point, i) => (
                                  <li key={i}>{point}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="mb-1 text-sm font-semibold text-blue-600">Tips:</h5>
                              <p className="text-sm text-foreground/80">{q.tips}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              {/* Role-Specific Questions */}
              <TabsContent value="role" className="mt-4 space-y-4">
                {questions?.roleSpecificQuestions.map((q, idx) => {
                  const questionId = `role-${idx}`
                  return (
                    <Card key={idx} className={`border-border/50 transition-all ${completedQuestions.has(questionId) ? "border-green-500/50 bg-green-500/5" : ""}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant="outline" className="border-green-500/50 text-green-500">
                                Role-Specific
                              </Badge>
                              {completedQuestions.has(questionId) && (
                                <Badge className="bg-green-500/10 text-green-600">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-base font-medium leading-relaxed">
                              Q{idx + 1}: {q.question}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="rounded-lg bg-muted/50 p-3">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Context:</span> {q.context}
                          </p>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-muted-foreground">
                            Your Answer
                          </label>
                          <Textarea
                            placeholder="Type your answer here..."
                            value={userAnswers[questionId] || ""}
                            onChange={(e) => setUserAnswers(prev => ({ ...prev, [questionId]: e.target.value }))}
                            rows={4}
                            className="text-sm"
                          />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAnswer(questionId)}
                            className="gap-1"
                          >
                            {showAnswer[questionId] ? (
                              <><EyeOff className="h-3.5 w-3.5" /> Hide Ideal Response</>
                            ) : (
                              <><Eye className="h-3.5 w-3.5" /> Show Ideal Response</>
                            )}
                          </Button>
                          <Button
                            variant={completedQuestions.has(questionId) ? "secondary" : "default"}
                            size="sm"
                            onClick={() => markAsCompleted(questionId)}
                            className="gap-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {completedQuestions.has(questionId) ? "Mark Incomplete" : "Mark Complete"}
                          </Button>
                        </div>

                        {showAnswer[questionId] && (
                          <div className="space-y-3 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                            <div>
                              <h5 className="mb-1 text-sm font-semibold text-green-600">Ideal Response:</h5>
                              <p className="text-sm text-foreground/80">{q.idealResponse}</p>
                            </div>
                            <div>
                              <h5 className="mb-1 text-sm font-semibold text-blue-600">Tips:</h5>
                              <p className="text-sm text-foreground/80">{q.tips}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>
            </Tabs>

            {/* Reset Button */}
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={resetPractice} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Generate New Questions
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
