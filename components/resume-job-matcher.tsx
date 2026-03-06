"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  IndianRupee,
  Send,
  Calendar as CalendarIcon,
  Video,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Indian company jobs database
const indianCompanyJobs = [
  // TCS Jobs
  { id: "tcs1", title: "Associate Software Engineer", company: "TCS", location: "Mumbai, India", salary: "3.5 - 4.5 LPA", skills: ["Java", "Python", "SQL", "Problem Solving"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "tcs2", title: "Java Developer", company: "TCS", location: "Bangalore, India", salary: "6 - 12 LPA", skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "MySQL"], experience: "2-5 years", type: "Hybrid", category: "backend" },
  { id: "tcs3", title: "React.js Developer", company: "TCS", location: "Chennai, India", salary: "5 - 10 LPA", skills: ["React.js", "JavaScript", "TypeScript", "Redux", "HTML/CSS"], experience: "2-4 years", type: "Hybrid", category: "frontend" },
  { id: "tcs4", title: "Data Analyst", company: "TCS", location: "Hyderabad, India", salary: "4 - 8 LPA", skills: ["Python", "SQL", "Tableau", "Power BI", "Excel"], experience: "1-3 years", type: "Hybrid", category: "data" },
  { id: "tcs5", title: "DevOps Engineer", company: "TCS", location: "Pune, India", salary: "8 - 16 LPA", skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"], experience: "3-6 years", type: "Hybrid", category: "devops" },
  { id: "tcs6", title: "ML Engineer", company: "TCS", location: "Bangalore, India", salary: "12 - 22 LPA", skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"], experience: "3-6 years", type: "Hybrid", category: "ai" },
  { id: "tcs7", title: "Full Stack Developer", company: "TCS", location: "Kochi, India", salary: "8 - 15 LPA", skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"], experience: "3-6 years", type: "Hybrid", category: "fullstack" },
  { id: "tcs8", title: "Cloud Architect", company: "TCS", location: "Mumbai, India", salary: "25 - 40 LPA", skills: ["AWS", "Azure", "GCP", "Architecture", "Microservices"], experience: "8-12 years", type: "Hybrid", category: "devops" },
  
  // Infosys Jobs
  { id: "inf1", title: "Systems Engineer", company: "Infosys", location: "Mysore, India", salary: "3.6 - 4.2 LPA", skills: ["Java", "Python", "C++", "SQL", "Problem Solving"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "inf2", title: "Senior Java Developer", company: "Infosys", location: "Bangalore, India", salary: "12 - 20 LPA", skills: ["Java", "Spring Boot", "Microservices", "Kafka", "AWS"], experience: "5-8 years", type: "Hybrid", category: "backend" },
  { id: "inf3", title: "Data Scientist", company: "Infosys", location: "Pune, India", salary: "10 - 18 LPA", skills: ["Python", "Machine Learning", "SQL", "Statistics", "TensorFlow"], experience: "3-6 years", type: "Hybrid", category: "data" },
  { id: "inf4", title: "React Native Developer", company: "Infosys", location: "Chennai, India", salary: "6 - 14 LPA", skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Native Modules"], experience: "2-5 years", type: "Hybrid", category: "mobile" },
  { id: "inf5", title: "AWS Cloud Engineer", company: "Infosys", location: "Bangalore, India", salary: "10 - 18 LPA", skills: ["AWS", "Terraform", "CloudFormation", "Python", "Linux"], experience: "3-6 years", type: "Hybrid", category: "devops" },
  { id: "inf6", title: "UI/UX Designer", company: "Infosys", location: "Pune, India", salary: "6 - 12 LPA", skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"], experience: "2-5 years", type: "Hybrid", category: "design" },
  { id: "inf7", title: "AI/ML Developer", company: "Infosys", location: "Bangalore, India", salary: "8 - 16 LPA", skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"], experience: "2-5 years", type: "Hybrid", category: "ai" },
  { id: "inf8", title: "Technical Lead", company: "Infosys", location: "Hyderabad, India", salary: "20 - 35 LPA", skills: ["Java", "Microservices", "AWS", "Architecture", "Leadership"], experience: "8-12 years", type: "Hybrid", category: "fullstack" },
  
  // Wipro Jobs
  { id: "wip1", title: "Project Engineer", company: "Wipro", location: "Bangalore, India", salary: "3.5 - 4.0 LPA", skills: ["Java", "Python", "SQL", "Aptitude", "Communication"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "wip2", title: "Senior Software Engineer", company: "Wipro", location: "Chennai, India", salary: "10 - 18 LPA", skills: ["Java", "Spring", "Microservices", "Docker", "Kubernetes"], experience: "4-7 years", type: "Hybrid", category: "backend" },
  { id: "wip3", title: "Cloud Data Engineer", company: "Wipro", location: "Hyderabad, India", salary: "10 - 18 LPA", skills: ["Azure", "Databricks", "Spark", "Python", "SQL"], experience: "3-6 years", type: "Hybrid", category: "data" },
  { id: "wip4", title: "Vue.js Developer", company: "Wipro", location: "Pune, India", salary: "5 - 12 LPA", skills: ["Vue.js", "JavaScript", "Vuex", "HTML/CSS", "REST APIs"], experience: "2-5 years", type: "Hybrid", category: "frontend" },
  { id: "wip5", title: "DevSecOps Engineer", company: "Wipro", location: "Bangalore, India", salary: "10 - 18 LPA", skills: ["DevOps", "Security", "AWS", "Docker", "Kubernetes", "CI/CD"], experience: "3-6 years", type: "Hybrid", category: "devops" },
  { id: "wip6", title: "iOS Developer", company: "Wipro", location: "Chennai, India", salary: "6 - 14 LPA", skills: ["Swift", "iOS SDK", "Xcode", "Core Data", "REST APIs"], experience: "2-5 years", type: "Hybrid", category: "mobile" },
  { id: "wip7", title: "NLP Engineer", company: "Wipro", location: "Bangalore, India", salary: "10 - 18 LPA", skills: ["Python", "NLP", "BERT", "Transformers", "spaCy"], experience: "2-5 years", type: "Hybrid", category: "ai" },
  
  // Accenture Jobs
  { id: "acc1", title: "Associate Software Engineer", company: "Accenture", location: "Bangalore, India", salary: "4.5 - 5.5 LPA", skills: ["Java", "Python", "SQL", "Agile", "Problem Solving"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "acc2", title: "Full Stack Developer", company: "Accenture", location: "Mumbai, India", salary: "10 - 18 LPA", skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"], experience: "3-6 years", type: "Hybrid", category: "fullstack" },
  { id: "acc3", title: "Data Engineer", company: "Accenture", location: "Chennai, India", salary: "10 - 18 LPA", skills: ["Python", "Spark", "AWS", "Snowflake", "Airflow"], experience: "3-6 years", type: "Hybrid", category: "data" },
  { id: "acc4", title: "Google Cloud Engineer", company: "Accenture", location: "Bangalore, India", salary: "12 - 20 LPA", skills: ["GCP", "BigQuery", "Kubernetes", "Terraform", "Python"], experience: "3-6 years", type: "Hybrid", category: "devops" },
  { id: "acc5", title: "Product Designer", company: "Accenture", location: "Pune, India", salary: "10 - 18 LPA", skills: ["Figma", "User Research", "Design Thinking", "Prototyping", "Usability Testing"], experience: "3-6 years", type: "Hybrid", category: "design" },
  { id: "acc6", title: "Computer Vision Engineer", company: "Accenture", location: "Bangalore, India", salary: "14 - 24 LPA", skills: ["Python", "OpenCV", "Deep Learning", "TensorFlow", "YOLO"], experience: "3-6 years", type: "Hybrid", category: "ai" },
  { id: "acc7", title: "Flutter Developer", company: "Accenture", location: "Hyderabad, India", salary: "6 - 14 LPA", skills: ["Flutter", "Dart", "Firebase", "REST APIs", "State Management"], experience: "2-5 years", type: "Hybrid", category: "mobile" },
  
  // Google India Jobs
  { id: "goo1", title: "Software Engineer III", company: "Google India", location: "Bangalore, India", salary: "35 - 55 LPA", skills: ["Java", "Python", "C++", "Distributed Systems", "Data Structures"], experience: "4-7 years", type: "Hybrid", category: "fullstack" },
  { id: "goo2", title: "Senior ML Engineer", company: "Google India", location: "Hyderabad, India", salary: "45 - 70 LPA", skills: ["Python", "TensorFlow", "PyTorch", "LLMs", "Deep Learning"], experience: "5-8 years", type: "Hybrid", category: "ai" },
  { id: "goo3", title: "Cloud Solutions Architect", company: "Google India", location: "Gurgaon, India", salary: "40 - 60 LPA", skills: ["GCP", "Architecture", "Kubernetes", "BigQuery", "Terraform"], experience: "6-10 years", type: "Hybrid", category: "devops" },
  { id: "goo4", title: "Frontend Engineer", company: "Google India", location: "Bangalore, India", salary: "30 - 50 LPA", skills: ["JavaScript", "TypeScript", "Angular", "React", "Web Performance"], experience: "3-6 years", type: "Hybrid", category: "frontend" },
  { id: "goo5", title: "UX Designer", company: "Google India", location: "Bangalore, India", salary: "30 - 50 LPA", skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"], experience: "3-6 years", type: "Hybrid", category: "design" },
  
  // Microsoft India Jobs
  { id: "ms1", title: "Software Engineer II", company: "Microsoft India", location: "Hyderabad, India", salary: "25 - 40 LPA", skills: ["C#", ".NET", "Azure", "Distributed Systems", "SQL"], experience: "3-6 years", type: "Hybrid", category: "fullstack" },
  { id: "ms2", title: "Data & Applied Scientist", company: "Microsoft India", location: "Hyderabad, India", salary: "35 - 55 LPA", skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Statistics"], experience: "4-7 years", type: "Hybrid", category: "ai" },
  { id: "ms3", title: "Azure Cloud Engineer", company: "Microsoft India", location: "Noida, India", salary: "20 - 35 LPA", skills: ["Azure", "Kubernetes", "DevOps", "Terraform", "PowerShell"], experience: "3-6 years", type: "Hybrid", category: "devops" },
  { id: "ms4", title: "Frontend Engineer - Teams", company: "Microsoft India", location: "Bangalore, India", salary: "25 - 40 LPA", skills: ["React", "TypeScript", "Node.js", "Web Performance", "Accessibility"], experience: "3-6 years", type: "Hybrid", category: "frontend" },
  { id: "ms5", title: "Product Designer", company: "Microsoft India", location: "Bangalore, India", salary: "25 - 45 LPA", skills: ["Figma", "User Research", "Design Systems", "Accessibility", "Prototyping"], experience: "4-7 years", type: "Hybrid", category: "design" },
  
  // Amazon India Jobs
  { id: "amz1", title: "SDE I", company: "Amazon India", location: "Bangalore, India", salary: "18 - 28 LPA", skills: ["Java", "Data Structures", "Algorithms", "Problem Solving", "OOP"], experience: "0-2 years", type: "Hybrid", category: "fullstack" },
  { id: "amz2", title: "SDE II", company: "Amazon India", location: "Hyderabad, India", salary: "30 - 50 LPA", skills: ["Java", "Distributed Systems", "AWS", "System Design", "Microservices"], experience: "3-6 years", type: "Hybrid", category: "fullstack" },
  { id: "amz3", title: "Data Engineer", company: "Amazon India", location: "Chennai, India", salary: "25 - 40 LPA", skills: ["Python", "Spark", "AWS", "Redshift", "ETL"], experience: "3-6 years", type: "Hybrid", category: "data" },
  { id: "amz4", title: "ML Engineer - Alexa", company: "Amazon India", location: "Bangalore, India", salary: "40 - 60 LPA", skills: ["Python", "NLP", "Deep Learning", "TensorFlow", "Speech Recognition"], experience: "4-7 years", type: "Hybrid", category: "ai" },
  { id: "amz5", title: "Frontend Engineer", company: "Amazon India", location: "Chennai, India", salary: "20 - 35 LPA", skills: ["React", "JavaScript", "TypeScript", "Web Performance", "A11y"], experience: "2-5 years", type: "Hybrid", category: "frontend" },
  
  // HCL Jobs
  { id: "hcl1", title: "Graduate Engineer Trainee", company: "HCL Technologies", location: "Noida, India", salary: "3.5 - 4.25 LPA", skills: ["Programming", "SQL", "Problem Solving", "Communication", "Aptitude"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "hcl2", title: "Java Full Stack Developer", company: "HCL Technologies", location: "Chennai, India", salary: "8 - 16 LPA", skills: ["Java", "Spring Boot", "Angular", "Microservices", "AWS"], experience: "3-6 years", type: "Hybrid", category: "fullstack" },
  { id: "hcl3", title: "AI/ML Engineer", company: "HCL Technologies", location: "Bangalore, India", salary: "12 - 22 LPA", skills: ["Python", "Machine Learning", "TensorFlow", "PyTorch", "NLP"], experience: "3-6 years", type: "Hybrid", category: "ai" },
  { id: "hcl4", title: "Cloud Security Engineer", company: "HCL Technologies", location: "Noida, India", salary: "14 - 24 LPA", skills: ["Cloud Security", "AWS", "Azure", "IAM", "Compliance"], experience: "4-7 years", type: "Hybrid", category: "security" },
  
  // Tech Mahindra Jobs
  { id: "tm1", title: "Associate Software Engineer", company: "Tech Mahindra", location: "Pune, India", salary: "3.25 - 4 LPA", skills: ["Java", "Python", "C++", "SQL", "Aptitude"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "tm2", title: "5G Network Engineer", company: "Tech Mahindra", location: "Bangalore, India", salary: "10 - 18 LPA", skills: ["5G", "LTE", "Network Architecture", "Telecom", "Python"], experience: "3-6 years", type: "Hybrid", category: "devops" },
  { id: "tm3", title: "Python Developer", company: "Tech Mahindra", location: "Hyderabad, India", salary: "6 - 12 LPA", skills: ["Python", "Django", "FastAPI", "PostgreSQL", "REST APIs"], experience: "2-5 years", type: "Hybrid", category: "backend" },
  { id: "tm4", title: "Conversational AI Developer", company: "Tech Mahindra", location: "Bangalore, India", salary: "8 - 16 LPA", skills: ["Chatbots", "NLP", "Dialogflow", "Python", "APIs"], experience: "2-5 years", type: "Hybrid", category: "ai" },
  
  // IBM India Jobs
  { id: "ibm1", title: "Associate Developer", company: "IBM India", location: "Bangalore, India", salary: "4 - 6 LPA", skills: ["Java", "Python", "SQL", "Problem Solving", "Communication"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "ibm2", title: "Watson AI Developer", company: "IBM India", location: "Bangalore, India", salary: "12 - 22 LPA", skills: ["Watson", "Python", "NLP", "Machine Learning", "APIs"], experience: "3-6 years", type: "Hybrid", category: "ai" },
  { id: "ibm3", title: "Cloud Pak Developer", company: "IBM India", location: "Hyderabad, India", salary: "12 - 20 LPA", skills: ["Kubernetes", "OpenShift", "Docker", "Cloud Pak", "Java"], experience: "3-6 years", type: "Hybrid", category: "devops" },
  { id: "ibm4", title: "Security Consultant", company: "IBM India", location: "Delhi NCR, India", salary: "16 - 28 LPA", skills: ["Cybersecurity", "Risk Assessment", "Compliance", "SIEM", "Consulting"], experience: "5-8 years", type: "Hybrid", category: "security" },
  
  // Deloitte India Jobs
  { id: "del1", title: "Analyst - Technology Consulting", company: "Deloitte India", location: "Mumbai, India", salary: "6 - 8 LPA", skills: ["Problem Solving", "Communication", "Technology", "Analytics", "Presentation"], experience: "Fresher", type: "Hybrid", category: "fullstack" },
  { id: "del2", title: "Java Microservices Developer", company: "Deloitte India", location: "Chennai, India", salary: "12 - 20 LPA", skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "Kafka"], experience: "4-7 years", type: "Hybrid", category: "backend" },
  { id: "del3", title: "Azure Data Engineer", company: "Deloitte India", location: "Bangalore, India", salary: "12 - 20 LPA", skills: ["Azure", "Data Factory", "Synapse", "Databricks", "Python", "SQL"], experience: "3-6 years", type: "Hybrid", category: "data" },
  { id: "del4", title: "AI Strategy Consultant", company: "Deloitte India", location: "Bangalore, India", salary: "20 - 35 LPA", skills: ["AI/ML", "Strategy", "Business Development", "Consulting", "Python"], experience: "5-8 years", type: "Hybrid", category: "ai" },
]

interface ResumeAnalysis {
  skills: string[]
  experience: string
  education: string
  suggestedRoles: string[]
  skillGaps: string[]
}

interface MatchedJob {
  id: string
  title: string
  company: string
  location: string
  salary: string
  skills: string[]
  experience: string
  type: string
  category: string
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
}

interface Application {
  id: string
  jobId: string
  companyName: string
  jobTitle: string
  status: "applied" | "screening" | "interview_scheduled" | "interview_completed" | "offer" | "rejected"
  appliedDate: Date
  interviewDate?: Date
  interviewTime?: string
  interviewType?: "video" | "phone" | "onsite"
}

interface ResumeJobMatcherProps {
  onJobSelect?: (job: any) => void
}

export function ResumeJobMatcher({ onJobSelect }: ResumeJobMatcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [resumeText, setResumeText] = useState("")
  const [fileName, setFileName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([])
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Application flow states
  const [applications, setApplications] = useState<Application[]>([])
  const [applyingJob, setApplyingJob] = useState<MatchedJob | null>(null)
  const [applicationStep, setApplicationStep] = useState(1)
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
    portfolio: "",
    linkedIn: "",
    noticePeriod: "",
    expectedSalary: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [interviewScheduling, setInterviewScheduling] = useState<Application | null>(null)
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(undefined)
  const [interviewTime, setInterviewTime] = useState("")
  const [interviewType, setInterviewType] = useState<"video" | "phone" | "onsite">("video")
  const [showApplications, setShowApplications] = useState(false)

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

      // Match with Indian company jobs locally
      const userSkills = analysisData.skills.map((s: string) => s.toLowerCase())
      
      const matched: MatchedJob[] = indianCompanyJobs.map(job => {
        const jobSkillsLower = job.skills.map(s => s.toLowerCase())
        const matchedSkills = job.skills.filter(skill => 
          userSkills.some((us: string) => 
            us.includes(skill.toLowerCase()) || 
            skill.toLowerCase().includes(us) ||
            getSkillAlias(us).includes(skill.toLowerCase()) ||
            getSkillAlias(skill.toLowerCase()).includes(us)
          )
        )
        const missingSkills = job.skills.filter(skill => !matchedSkills.includes(skill))
        const matchScore = Math.round((matchedSkills.length / job.skills.length) * 100)

        return {
          ...job,
          matchScore,
          matchedSkills,
          missingSkills,
        }
      })
      .filter(job => job.matchScore >= 30)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20)

      setMatchedJobs(matched)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Skill aliases for better matching
  const getSkillAlias = (skill: string): string[] => {
    const aliases: Record<string, string[]> = {
      "javascript": ["js", "es6", "es2015"],
      "typescript": ["ts"],
      "python": ["py", "python3"],
      "react": ["reactjs", "react.js"],
      "node": ["nodejs", "node.js"],
      "vue": ["vuejs", "vue.js"],
      "angular": ["angularjs", "angular.js"],
      "aws": ["amazon web services"],
      "gcp": ["google cloud", "google cloud platform"],
      "docker": ["containerization"],
      "kubernetes": ["k8s"],
      "machine learning": ["ml"],
      "deep learning": ["dl"],
      "artificial intelligence": ["ai"],
      "natural language processing": ["nlp"],
      "sql": ["mysql", "postgresql", "sql server"],
    }
    return aliases[skill] || [skill]
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

  // Handle job application
  const handleApplyJob = (job: MatchedJob) => {
    setApplyingJob(job)
    setApplicationStep(1)
    setApplicationForm({
      name: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
      portfolio: "",
      linkedIn: "",
      noticePeriod: "",
      expectedSalary: "",
    })
  }

  // Submit application
  const submitApplication = async () => {
    if (!applyingJob) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newApplication: Application = {
      id: Date.now().toString(),
      jobId: applyingJob.id,
      companyName: applyingJob.company,
      jobTitle: applyingJob.title,
      status: "applied",
      appliedDate: new Date(),
    }

    setApplications((prev) => [newApplication, ...prev])
    setIsSubmitting(false)
    setApplicationStep(4) // Success step
    
    // Simulate status change after some time
    setTimeout(() => {
      setApplications(prev => 
        prev.map(app => 
          app.id === newApplication.id 
            ? { ...app, status: "screening" as const }
            : app
        )
      )
    }, 5000)
  }

  // Schedule interview
  const scheduleInterview = () => {
    if (!interviewScheduling || !interviewDate || !interviewTime) return

    setApplications((prev) =>
      prev.map((app) =>
        app.id === interviewScheduling.id
          ? {
              ...app,
              status: "interview_scheduled" as const,
              interviewDate,
              interviewTime,
              interviewType,
            }
          : app
      )
    )

    setInterviewScheduling(null)
    setInterviewDate(undefined)
    setInterviewTime("")
  }

  // Get application status color
  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "applied": return "bg-blue-500/10 text-blue-500"
      case "screening": return "bg-yellow-500/10 text-yellow-500"
      case "interview_scheduled": return "bg-purple-500/10 text-purple-500"
      case "interview_completed": return "bg-cyan-500/10 text-cyan-500"
      case "offer": return "bg-green-500/10 text-green-500"
      case "rejected": return "bg-red-500/10 text-red-500"
      default: return "bg-gray-500/10 text-gray-500"
    }
  }

  const getStatusLabel = (status: Application["status"]) => {
    switch (status) {
      case "applied": return "Applied"
      case "screening": return "Under Review"
      case "interview_scheduled": return "Interview Scheduled"
      case "interview_completed": return "Interview Completed"
      case "offer": return "Offer Received"
      case "rejected": return "Not Selected"
      default: return status
    }
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
              <h3 className="font-semibold text-foreground">Get Personalized Job Recommendations from Indian Companies</h3>
              <p className="text-sm text-muted-foreground">
                Upload your resume and get matched with jobs at TCS, Infosys, Wipro, Google India, Microsoft India & more
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
              AI Job Matcher - Indian Companies
            </CardTitle>
            <div className="flex items-center gap-2">
              {applications.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApplications(!showApplications)}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  My Applications ({applications.length})
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Applications Panel */}
            {showApplications && applications.length > 0 && (
              <Card className="border-border/50 bg-secondary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Your Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <div className="space-y-2 pr-4">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-3"
                        >
                          <div>
                            <p className="font-medium text-sm">{app.jobTitle}</p>
                            <p className="text-xs text-muted-foreground">{app.companyName}</p>
                            {app.interviewDate && (
                              <p className="text-xs text-primary mt-1">
                                Interview: {app.interviewDate.toLocaleDateString()} at {app.interviewTime}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(app.status)}>{getStatusLabel(app.status)}</Badge>
                            {app.status === "screening" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setInterviewScheduling(app)}
                              >
                                Schedule
                              </Button>
                            )}
                            {app.status === "interview_scheduled" && (
                              <Button size="sm" variant="default" className="gap-1">
                                <Video className="h-3 w-3" />
                                Join
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

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
                      <p className="text-sm text-muted-foreground">Analyzing your resume & matching with Indian company jobs...</p>
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
                    Analyze & Find Jobs in Indian Companies
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

                {/* Matched Jobs from Indian Companies */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-sm font-medium">
                    <Zap className="h-4 w-4 text-primary" />
                    Best Matching Jobs from Indian Companies ({matchedJobs.length})
                  </h4>

                  {matchedJobs.length > 0 ? (
                    <ScrollArea className="h-[350px]">
                      <div className="space-y-2 pr-4">
                        {matchedJobs.map((job) => (
                          <Card
                            key={job.id}
                            className={`border transition-all hover:shadow-md ${getMatchScoreBg(job.matchScore)}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-semibold text-foreground">{job.title}</h5>
                                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Building2 className="h-3 w-3" />
                                    {job.company}
                                  </p>
                                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <IndianRupee className="h-3 w-3" />
                                      {job.salary}
                                    </span>
                                  </div>
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
                                <div className="flex flex-col items-end gap-2">
                                  <div className={`flex items-center gap-1 text-lg font-bold ${getMatchScoreColor(job.matchScore)}`}>
                                    <Star className="h-4 w-4" />
                                    {job.matchScore}%
                                  </div>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApplyJob(job)}
                                    className="gap-1"
                                  >
                                    <Send className="h-3 w-3" />
                                    Apply
                                  </Button>
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

      {/* Application Dialog */}
      <Dialog open={!!applyingJob} onOpenChange={(open) => !open && setApplyingJob(null)}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto border-border/50 bg-background">
          {applyingJob && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {applicationStep === 4 ? "Application Submitted!" : `Apply for ${applyingJob.title}`}
                </DialogTitle>
                <DialogDescription>
                  {applicationStep === 4
                    ? `Your application has been submitted to ${applyingJob.company}.`
                    : `${applyingJob.company} - Step ${applicationStep} of 3`}
                </DialogDescription>
              </DialogHeader>

              {/* Progress */}
              {applicationStep < 4 && (
                <div className="mt-4">
                  <Progress value={(applicationStep / 3) * 100} className="h-2" />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span className={applicationStep >= 1 ? "text-primary" : ""}>Personal Info</span>
                    <span className={applicationStep >= 2 ? "text-primary" : ""}>Documents</span>
                    <span className={applicationStep >= 3 ? "text-primary" : ""}>Review</span>
                  </div>
                </div>
              )}

              {/* Step 1: Personal Info */}
              {applicationStep === 1 && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      value={applicationForm.linkedIn}
                      onChange={(e) => setApplicationForm({ ...applicationForm, linkedIn: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setApplicationStep(2)}
                    disabled={!applicationForm.name || !applicationForm.email || !applicationForm.phone}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Documents */}
              {applicationStep === 2 && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                      placeholder="Write a brief cover letter..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio URL</Label>
                    <Input
                      id="portfolio"
                      value={applicationForm.portfolio}
                      onChange={(e) => setApplicationForm({ ...applicationForm, portfolio: e.target.value })}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="noticePeriod">Notice Period</Label>
                      <Select
                        value={applicationForm.noticePeriod}
                        onValueChange={(value) => setApplicationForm({ ...applicationForm, noticePeriod: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="15days">15 Days</SelectItem>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="60days">60 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">Expected Salary</Label>
                      <Input
                        id="expectedSalary"
                        value={applicationForm.expectedSalary}
                        onChange={(e) => setApplicationForm({ ...applicationForm, expectedSalary: e.target.value })}
                        placeholder="e.g., 10 LPA"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setApplicationStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button className="flex-1" onClick={() => setApplicationStep(3)}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {applicationStep === 3 && (
                <div className="mt-4 space-y-4">
                  <Card className="border-border/50">
                    <CardContent className="p-4 space-y-3">
                      <h4 className="font-semibold">Application Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Position:</span>
                        <span>{applyingJob.title}</span>
                        <span className="text-muted-foreground">Company:</span>
                        <span>{applyingJob.company}</span>
                        <span className="text-muted-foreground">Name:</span>
                        <span>{applicationForm.name}</span>
                        <span className="text-muted-foreground">Email:</span>
                        <span>{applicationForm.email}</span>
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{applicationForm.phone}</span>
                        <span className="text-muted-foreground">Notice Period:</span>
                        <span>{applicationForm.noticePeriod || "Not specified"}</span>
                        <span className="text-muted-foreground">Expected Salary:</span>
                        <span>{applicationForm.expectedSalary || "Not specified"}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setApplicationStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button className="flex-1 gap-2" onClick={submitApplication} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {applicationStep === 4 && (
                <div className="mt-4 space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Application Submitted Successfully!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your application for <strong>{applyingJob.title}</strong> at{" "}
                      <strong>{applyingJob.company}</strong> has been submitted.
                      Track your application status in "My Applications".
                    </p>
                  </div>
                  <Button onClick={() => setApplyingJob(null)} className="w-full">
                    Close
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Interview Scheduling Dialog */}
      <Dialog open={!!interviewScheduling} onOpenChange={(open) => !open && setInterviewScheduling(null)}>
        <DialogContent className="max-w-md border-border/50 bg-background">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Choose a date and time for your interview at {interviewScheduling?.companyName}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Interview Type</Label>
              <div className="flex gap-2">
                <Button
                  variant={interviewType === "video" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInterviewType("video")}
                  className="flex-1 gap-1"
                >
                  <Video className="h-4 w-4" />
                  Video
                </Button>
                <Button
                  variant={interviewType === "phone" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInterviewType("phone")}
                  className="flex-1 gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  Phone
                </Button>
                <Button
                  variant={interviewType === "onsite" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInterviewType("onsite")}
                  className="flex-1 gap-1"
                >
                  <Building2 className="h-4 w-4" />
                  On-site
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={interviewDate}
                onSelect={setInterviewDate}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Time Slot</Label>
              <Select value={interviewTime} onValueChange={setInterviewTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                  <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                  <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                  <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full gap-2"
              onClick={scheduleInterview}
              disabled={!interviewDate || !interviewTime}
            >
              <CalendarIcon className="h-4 w-4" />
              Confirm Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
