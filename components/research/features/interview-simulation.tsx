"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, Play, CheckCircle, XCircle, AlertCircle, Send, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  text: string
  type: "behavioral" | "technical" | "situational"
  difficulty: "easy" | "medium" | "hard"
}

interface Feedback {
  score: number
  strengths: string[]
  improvements: string[]
  sampleAnswer: string
}

const sampleQuestions: Question[] = [
  { id: 1, text: "Tell me about yourself and your experience with machine learning.", type: "behavioral", difficulty: "easy" },
  { id: 2, text: "Explain the difference between supervised and unsupervised learning.", type: "technical", difficulty: "easy" },
  { id: 3, text: "Describe a challenging ML project you worked on and how you overcame obstacles.", type: "situational", difficulty: "medium" },
  { id: 4, text: "How would you handle a situation where your model performs well on training data but poorly on test data?", type: "technical", difficulty: "medium" },
  { id: 5, text: "What's your approach to feature engineering for a new dataset?", type: "technical", difficulty: "hard" },
]

const sampleFeedback: Feedback = {
  score: 75,
  strengths: [
    "Clear structure in your response",
    "Good use of specific examples",
    "Demonstrated technical knowledge",
  ],
  improvements: [
    "Could quantify achievements more (metrics, percentages)",
    "Consider mentioning teamwork aspects",
    "Add more context about the business impact",
  ],
  sampleAnswer: "A strong answer would include: specific project details, your role, technologies used, challenges faced, how you solved them, and measurable outcomes.",
}

const typeColors = {
  behavioral: "bg-blue-500/10 text-blue-500",
  technical: "bg-green-500/10 text-green-500",
  situational: "bg-purple-500/10 text-purple-500",
}

export function InterviewSimulation() {
  const [jobRole, setJobRole] = useState("")
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([])

  const handleStart = () => {
    if (jobRole.trim()) setStarted(true)
  }

  const handleSubmitAnswer = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setFeedback(sampleFeedback)
      setIsAnalyzing(false)
    }, 1500)
  }

  const handleNextQuestion = () => {
    setCompletedQuestions([...completedQuestions, currentQuestion])
    setCurrentQuestion(currentQuestion + 1)
    setAnswer("")
    setFeedback(null)
  }

  if (!started) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Mic className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Job Interview Simulation</h2>
          <p className="mt-2 text-muted-foreground">
            Practice with AI-generated questions and get instant feedback
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleStart()
                }}
                className="space-y-4"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Target Job Role
                  </label>
                  <Input
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Machine Learning Engineer"
                    className="bg-background"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["ML Engineer", "Data Scientist", "AI Researcher", "NLP Engineer"].map((role) => (
                    <Button
                      key={role}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setJobRole(role)}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
                <Button type="submit" className="w-full" disabled={!jobRole.trim()}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Interview
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = sampleQuestions[currentQuestion]
  const progress = ((completedQuestions.length) / sampleQuestions.length) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{jobRole} Interview</h2>
          <p className="text-muted-foreground">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
        </div>
        <Button variant="outline" onClick={() => setStarted(false)}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart
        </Button>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Question panel */}
        <Card className="border-border/50 bg-card/50 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className={typeColors[question.type]}>{question.type}</Badge>
              <Badge variant="secondary">{question.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-medium text-foreground">{question.text}</p>

            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[150px] bg-background"
              disabled={!!feedback}
            />

            {!feedback ? (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" disabled>
                  <Mic className="mr-2 h-4 w-4" />
                  Voice (Coming Soon)
                </Button>
                <Button
                  onClick={handleSubmitAnswer}
                  className="flex-1"
                  disabled={!answer.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    "Analyzing..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Answer
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="w-full"
                disabled={currentQuestion >= sampleQuestions.length - 1}
              >
                Next Question
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Feedback panel */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {feedback ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{feedback.score}</div>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>

                <div className="rounded-lg bg-green-500/10 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">Strengths</span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {feedback.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-amber-500/10 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-500">To Improve</span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {feedback.improvements.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-primary/10 p-3">
                  <p className="text-sm text-muted-foreground">{feedback.sampleAnswer}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Submit your answer to receive AI-powered feedback on content, structure, and delivery.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Question navigator */}
      <div className="flex justify-center gap-2">
        {sampleQuestions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => {
              setCurrentQuestion(i)
              setAnswer("")
              setFeedback(null)
            }}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              i === currentQuestion && "bg-primary text-primary-foreground",
              completedQuestions.includes(i) && "bg-green-500 text-white",
              i !== currentQuestion && !completedQuestions.includes(i) && "bg-secondary text-muted-foreground"
            )}
          >
            {completedQuestions.includes(i) ? <CheckCircle className="h-4 w-4" /> : i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
