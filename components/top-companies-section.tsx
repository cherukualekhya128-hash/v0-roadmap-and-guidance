"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
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
  Building2,
  Users,
  MapPin,
  Briefcase,
  TrendingUp,
  ChevronRight,
  Globe,
  Sparkles,
  Bell,
  BellOff,
  Check,
  DollarSign,
  Clock,
  X,
  Search,
  Filter,
  Code2,
  Database,
  Brain,
  Shield,
  Server,
  Smartphone,
  Palette,
  BarChart3,
  Loader2,
  CheckCircle,
  FileText,
  Calendar as CalendarIcon,
  Video,
  MessageSquare,
  Send,
  ArrowRight,
  GraduationCap,
  Award,
  Star,
  IndianRupee,
} from "lucide-react"

// Skill categories for filtering
const skillCategories = [
  { id: "all", name: "All Roles", icon: Briefcase },
  { id: "frontend", name: "Frontend", icon: Code2 },
  { id: "backend", name: "Backend", icon: Server },
  { id: "fullstack", name: "Full Stack", icon: Code2 },
  { id: "data", name: "Data Science", icon: Database },
  { id: "ai", name: "AI/ML", icon: Brain },
  { id: "devops", name: "DevOps", icon: Server },
  { id: "mobile", name: "Mobile", icon: Smartphone },
  { id: "security", name: "Security", icon: Shield },
  { id: "design", name: "Design", icon: Palette },
]

// Job role to category mapping
const roleToCategory: Record<string, string> = {
  "Frontend Developer": "frontend",
  "Senior Frontend Developer": "frontend",
  "React Developer": "frontend",
  "React.js Developer": "frontend",
  "Vue.js Developer": "frontend",
  "Angular Developer": "frontend",
  "UI Developer": "frontend",
  "Web Developer": "frontend",
  "Backend Developer": "backend",
  "Senior Backend Developer": "backend",
  "Node.js Developer": "backend",
  "Python Developer": "backend",
  "Java Developer": "backend",
  "Java Full Stack Developer": "backend",
  "Go Developer": "backend",
  ".NET Developer": "backend",
  "Senior .NET Developer": "backend",
  "API Developer": "backend",
  "Full Stack Developer": "fullstack",
  "Senior Full Stack Developer": "fullstack",
  "MERN Stack Developer": "fullstack",
  "Software Engineer": "fullstack",
  "Senior Software Engineer": "fullstack",
  "Associate Software Engineer": "fullstack",
  "Systems Engineer": "fullstack",
  "SDE": "fullstack",
  "SDE II": "fullstack",
  "SDE III": "fullstack",
  "Technical Lead": "fullstack",
  "Tech Lead": "fullstack",
  "Data Scientist": "data",
  "Senior Data Scientist": "data",
  "Data Analyst": "data",
  "Data Engineer": "data",
  "BI Developer": "data",
  "Analytics Engineer": "data",
  "Business Analyst": "data",
  "ML Engineer": "ai",
  "Machine Learning Engineer": "ai",
  "AI Engineer": "ai",
  "AI Research Scientist": "ai",
  "Deep Learning Engineer": "ai",
  "NLP Engineer": "ai",
  "Computer Vision Engineer": "ai",
  "AI/ML Developer": "ai",
  "DevOps Engineer": "devops",
  "Senior DevOps Engineer": "devops",
  "Cloud Engineer": "devops",
  "AWS Engineer": "devops",
  "Azure Engineer": "devops",
  "Cloud Architect": "devops",
  "Solutions Architect": "devops",
  "Site Reliability Engineer": "devops",
  "SRE": "devops",
  "Platform Engineer": "devops",
  "iOS Developer": "mobile",
  "Android Developer": "mobile",
  "React Native Developer": "mobile",
  "Flutter Developer": "mobile",
  "Mobile Developer": "mobile",
  "Security Engineer": "security",
  "Cybersecurity Analyst": "security",
  "Cybersecurity Consultant": "security",
  "Information Security Analyst": "security",
  "SOC Analyst": "security",
  "Security Architect": "security",
  "UI/UX Designer": "design",
  "Product Designer": "design",
  "UX Designer": "design",
  "Visual Designer": "design",
}

interface CompanyJob {
  id: string
  title: string
  location: string
  locationType: "Remote" | "On-site" | "Hybrid"
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  experienceLevel: string
  salary: string
  skills: string[]
  posted: string
  isNew: boolean
  category: string
  description: string
  requirements: string[]
  responsibilities: string[]
}

interface Company {
  name: string
  logo: string
  industry: string
  description: string
  employees: string
  headquarters: string
  indianOffices: string[]
  benefits: string[]
  color: string
  bgColor: string
  textColor: string
  jobs: CompanyJob[]
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
  notes?: string
}

// Comprehensive job data for all 15 MNCs
const companies: Company[] = [
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    industry: "Technology",
    description: "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and artificial intelligence.",
    employees: "190,000+",
    headquarters: "Mountain View, California",
    indianOffices: ["Bangalore", "Hyderabad", "Mumbai", "Gurgaon"],
    benefits: ["Health Insurance", "401(k)", "Free Meals", "Gym Membership", "Parental Leave", "Stock Options", "Learning Budget", "Work from Home"],
    color: "from-blue-500 to-green-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "goog1", title: "Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "25 - 45 LPA", skills: ["Python", "Java", "C++", "Algorithms", "Data Structures"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Join Google's engineering team to build products used by billions.", requirements: ["BS/MS in Computer Science", "Strong coding skills", "System design knowledge"], responsibilities: ["Design and develop software", "Code reviews", "Technical documentation", "Collaborate with teams"] },
      { id: "goog2", title: "Senior Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "40 - 65 LPA", skills: ["Go", "Kubernetes", "Distributed Systems", "Cloud", "gRPC"], posted: "2 days ago", isNew: true, category: "backend", description: "Lead backend development for Google Cloud services.", requirements: ["5+ years experience", "Distributed systems expertise", "Leadership skills"], responsibilities: ["Lead technical projects", "Mentor engineers", "Architecture design", "Performance optimization"] },
      { id: "goog3", title: "Machine Learning Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 60 LPA", skills: ["TensorFlow", "Python", "Deep Learning", "NLP", "Computer Vision"], posted: "3 days ago", isNew: true, category: "ai", description: "Build ML models powering Google's AI products.", requirements: ["MS/PhD in ML/AI", "Strong ML fundamentals", "Research experience"], responsibilities: ["Develop ML models", "Research new techniques", "Production deployment", "Cross-team collaboration"] },
      { id: "goog4", title: "Frontend Engineer", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "22 - 40 LPA", skills: ["Angular", "TypeScript", "JavaScript", "HTML/CSS", "RxJS"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build beautiful user interfaces for Google products.", requirements: ["2+ years frontend experience", "Angular expertise", "Performance optimization skills"], responsibilities: ["UI development", "Component design", "Testing", "Accessibility implementation"] },
      { id: "goog5", title: "Site Reliability Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 55 LPA", skills: ["Linux", "Python", "Kubernetes", "Monitoring", "Automation"], posted: "5 days ago", isNew: false, category: "devops", description: "Ensure reliability of Google's infrastructure.", requirements: ["4+ years SRE/DevOps", "Strong Linux skills", "Automation expertise"], responsibilities: ["Incident management", "Automation", "Capacity planning", "On-call rotation"] },
      { id: "goog6", title: "Data Scientist", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 50 LPA", skills: ["Python", "SQL", "Statistics", "BigQuery", "Machine Learning"], posted: "1 week ago", isNew: false, category: "data", description: "Analyze data to drive product decisions.", requirements: ["MS in Statistics/CS", "Strong analytical skills", "ML knowledge"], responsibilities: ["Data analysis", "A/B testing", "Insights generation", "Stakeholder presentations"] },
      { id: "goog7", title: "Android Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "28 - 48 LPA", skills: ["Kotlin", "Android", "Jetpack Compose", "MVVM", "Coroutines"], posted: "3 days ago", isNew: true, category: "mobile", description: "Build Android apps used by billions of users.", requirements: ["3+ years Android experience", "Kotlin expertise", "Published apps"], responsibilities: ["Android development", "Performance optimization", "Code reviews", "Feature development"] },
      { id: "goog8", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 60 LPA", skills: ["Security", "Penetration Testing", "Python", "Network Security", "Cloud Security"], posted: "6 days ago", isNew: false, category: "security", description: "Protect Google's infrastructure and users.", requirements: ["4+ years security experience", "Security certifications", "Coding skills"], responsibilities: ["Security assessments", "Vulnerability research", "Security tooling", "Incident response"] },
      { id: "goog9", title: "UX Designer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 42 LPA", skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"], posted: "1 week ago", isNew: false, category: "design", description: "Design user experiences for Google products.", requirements: ["3+ years UX experience", "Strong portfolio", "Research skills"], responsibilities: ["User research", "Wireframing", "Prototyping", "Design system contribution"] },
      { id: "goog10", title: "Cloud Solutions Architect", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "45 - 75 LPA", skills: ["GCP", "Architecture", "Kubernetes", "Terraform", "Networking"], posted: "5 days ago", isNew: false, category: "devops", description: "Design cloud solutions for enterprise customers.", requirements: ["6+ years cloud experience", "GCP certifications", "Customer-facing experience"], responsibilities: ["Solution design", "Customer engagement", "Technical presentations", "Best practices"] },
      { id: "goog11", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-9 years", salary: "40 - 65 LPA", skills: ["Program Management", "Technical Background", "Communication", "Agile", "Stakeholder Management"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Drive complex technical programs at Google.", requirements: ["5+ years TPM experience", "Technical background", "Leadership skills"], responsibilities: ["Program planning", "Cross-team coordination", "Risk management", "Stakeholder communication"] },
      { id: "goog12", title: "Research Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD", salary: "50 - 80 LPA", skills: ["Machine Learning", "Research", "Python", "Publications", "Deep Learning"], posted: "1 week ago", isNew: false, category: "ai", description: "Conduct cutting-edge AI research at Google.", requirements: ["PhD in ML/AI", "Strong publication record", "Research leadership"], responsibilities: ["Research", "Paper publications", "Prototype development", "Team collaboration"] },
    ],
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    industry: "Technology",
    description: "Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.",
    employees: "220,000+",
    headquarters: "Redmond, Washington",
    indianOffices: ["Bangalore", "Hyderabad", "Noida", "Pune"],
    benefits: ["Health Insurance", "401(k)", "Stock Purchase Plan", "Parental Leave", "Wellness Programs", "Learning Opportunities", "Flexible Work", "Employee Discounts"],
    color: "from-blue-600 to-cyan-500",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "ms1", title: "Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "22 - 40 LPA", skills: ["C#", ".NET", "Azure", "SQL Server", "REST APIs"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Build enterprise software solutions at Microsoft.", requirements: ["BS in Computer Science", "Strong C# skills", "Cloud experience"], responsibilities: ["Software development", "Code reviews", "Testing", "Documentation"] },
      { id: "ms2", title: "Azure Cloud Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 32 LPA", skills: ["Azure", "Terraform", "PowerShell", "ARM Templates", "Networking"], posted: "2 days ago", isNew: true, category: "devops", description: "Design and implement Azure cloud solutions.", requirements: ["3+ years Azure experience", "Azure certifications", "IaC experience"], responsibilities: ["Cloud architecture", "Automation", "Cost optimization", "Security implementation"] },
      { id: "ms3", title: "Senior Software Engineer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 55 LPA", skills: ["C++", "Windows", "System Programming", "Performance", "Debugging"], posted: "3 days ago", isNew: true, category: "backend", description: "Work on Windows OS and core Microsoft products.", requirements: ["5+ years C++ experience", "System programming", "Performance optimization"], responsibilities: ["Core development", "Bug fixing", "Performance tuning", "Code reviews"] },
      { id: "ms4", title: "Data Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["Python", "Azure ML", "SQL", "Statistics", "Power BI"], posted: "4 days ago", isNew: false, category: "data", description: "Apply data science to improve Microsoft products.", requirements: ["MS in Data Science", "Azure ML experience", "Strong statistics"], responsibilities: ["ML model development", "Data analysis", "Insights generation", "Stakeholder collaboration"] },
      { id: "ms5", title: "React Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "18 - 35 LPA", skills: ["React", "TypeScript", "Redux", "GraphQL", "Jest"], posted: "5 days ago", isNew: false, category: "frontend", description: "Build web applications for Microsoft 365.", requirements: ["2+ years React experience", "TypeScript proficiency", "Testing skills"], responsibilities: ["Frontend development", "Component design", "Testing", "Performance optimization"] },
      { id: "ms6", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "30 - 55 LPA", skills: ["Python", "PyTorch", "Azure ML", "NLP", "Computer Vision"], posted: "1 week ago", isNew: false, category: "ai", description: "Develop AI solutions for Microsoft products.", requirements: ["3+ years ML experience", "Strong Python skills", "Production ML experience"], responsibilities: ["ML model development", "Model deployment", "Research", "Cross-team collaboration"] },
      { id: "ms7", title: "Product Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 60 LPA", skills: ["Product Management", "Analytics", "Agile", "User Research", "Strategy"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Drive product strategy for Microsoft products.", requirements: ["4+ years PM experience", "Technical background", "Leadership skills"], responsibilities: ["Product strategy", "Roadmap planning", "Stakeholder management", "Data-driven decisions"] },
      { id: "ms8", title: "iOS Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 40 LPA", skills: ["Swift", "iOS", "UIKit", "SwiftUI", "Core Data"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build iOS apps for Microsoft products.", requirements: ["3+ years iOS experience", "Swift expertise", "Published apps"], responsibilities: ["iOS development", "Feature implementation", "Bug fixing", "Code reviews"] },
      { id: "ms9", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "30 - 50 LPA", skills: ["Security", "Azure Security", "Threat Modeling", "Penetration Testing", "SIEM"], posted: "1 week ago", isNew: false, category: "security", description: "Protect Microsoft's cloud infrastructure.", requirements: ["4+ years security experience", "Cloud security expertise", "Security certifications"], responsibilities: ["Security assessments", "Threat modeling", "Incident response", "Security automation"] },
      { id: "ms10", title: "DevOps Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 32 LPA", skills: ["Azure DevOps", "Kubernetes", "Docker", "CI/CD", "PowerShell"], posted: "5 days ago", isNew: false, category: "devops", description: "Build and maintain CI/CD pipelines.", requirements: ["3+ years DevOps experience", "Azure DevOps expertise", "Container experience"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure management"] },
      { id: "ms11", title: "Full Stack Developer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 38 LPA", skills: ["React", "Node.js", "TypeScript", "SQL Server", "Azure"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Build end-to-end web applications.", requirements: ["3+ years full stack experience", "JavaScript/TypeScript", "Cloud experience"], responsibilities: ["Full stack development", "API design", "Database management", "Testing"] },
      { id: "ms12", title: "UX Researcher", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 38 LPA", skills: ["User Research", "Usability Testing", "Surveys", "Analytics", "Prototyping"], posted: "1 week ago", isNew: false, category: "design", description: "Conduct user research for Microsoft products.", requirements: ["3+ years UX research", "Strong research skills", "Data analysis"], responsibilities: ["User research", "Usability testing", "Insights generation", "Stakeholder presentations"] },
    ],
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    industry: "E-commerce & Cloud",
    description: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.",
    employees: "1,500,000+",
    headquarters: "Seattle, Washington",
    indianOffices: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Delhi NCR"],
    benefits: ["Health Insurance", "401(k)", "Stock Options", "Parental Leave", "Career Development", "Employee Discounts", "Relocation Assistance", "Wellness Programs"],
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    jobs: [
      { id: "amz1", title: "SDE I", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "0-2 years", salary: "18 - 28 LPA", skills: ["Java", "Python", "Data Structures", "Algorithms", "AWS"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career as a Software Development Engineer at Amazon.", requirements: ["BS in Computer Science", "Strong DSA skills", "Coding proficiency"], responsibilities: ["Software development", "Code reviews", "Testing", "Documentation"] },
      { id: "amz2", title: "SDE II", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-5 years", salary: "28 - 45 LPA", skills: ["Java", "AWS", "Microservices", "System Design", "DynamoDB"], posted: "2 days ago", isNew: true, category: "backend", description: "Build scalable systems for Amazon's e-commerce platform.", requirements: ["3+ years experience", "System design skills", "AWS knowledge"], responsibilities: ["System design", "Development", "Mentoring", "On-call"] },
      { id: "amz3", title: "SDE III", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "45 - 70 LPA", skills: ["Java", "Distributed Systems", "AWS", "Leadership", "Architecture"], posted: "3 days ago", isNew: true, category: "backend", description: "Lead technical initiatives and mentor teams.", requirements: ["6+ years experience", "Leadership skills", "Strong architecture skills"], responsibilities: ["Technical leadership", "Architecture design", "Mentoring", "Cross-team collaboration"] },
      { id: "amz4", title: "AWS Solutions Architect", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 55 LPA", skills: ["AWS", "Architecture", "Networking", "Security", "Terraform"], posted: "4 days ago", isNew: false, category: "devops", description: "Design cloud solutions for enterprise customers.", requirements: ["5+ years AWS experience", "AWS certifications", "Customer-facing experience"], responsibilities: ["Solution design", "Customer engagement", "Technical presentations", "Best practices"] },
      { id: "amz5", title: "Data Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 42 LPA", skills: ["Python", "Spark", "AWS", "Redshift", "ETL"], posted: "5 days ago", isNew: false, category: "data", description: "Build data pipelines for Amazon's analytics.", requirements: ["3+ years data engineering", "Big data experience", "AWS knowledge"], responsibilities: ["Pipeline development", "Data modeling", "Performance optimization", "Data quality"] },
      { id: "amz6", title: "Applied Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "35 - 60 LPA", skills: ["Machine Learning", "Python", "Deep Learning", "NLP", "Recommendation Systems"], posted: "1 week ago", isNew: false, category: "ai", description: "Apply ML to improve customer experience.", requirements: ["MS/PhD in ML", "Strong research skills", "Production ML experience"], responsibilities: ["ML model development", "Research", "Experimentation", "Production deployment"] },
      { id: "amz7", title: "Frontend Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "20 - 35 LPA", skills: ["React", "JavaScript", "TypeScript", "CSS", "Testing"], posted: "3 days ago", isNew: true, category: "frontend", description: "Build user interfaces for Amazon's websites.", requirements: ["2+ years frontend experience", "React proficiency", "Performance optimization"], responsibilities: ["UI development", "Component design", "Testing", "Accessibility"] },
      { id: "amz8", title: "Android Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 42 LPA", skills: ["Kotlin", "Android", "MVVM", "Dagger", "Coroutines"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build Amazon's Android shopping app.", requirements: ["3+ years Android experience", "Kotlin proficiency", "Published apps"], responsibilities: ["Android development", "Feature implementation", "Bug fixing", "Performance optimization"] },
      { id: "amz9", title: "Security Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "30 - 50 LPA", skills: ["Security", "AWS Security", "Penetration Testing", "Threat Modeling", "Incident Response"], posted: "1 week ago", isNew: false, category: "security", description: "Protect Amazon's infrastructure and customer data.", requirements: ["4+ years security experience", "AWS security knowledge", "Security certifications"], responsibilities: ["Security assessments", "Threat modeling", "Incident response", "Security automation"] },
      { id: "amz10", title: "DevOps Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 38 LPA", skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Python"], posted: "5 days ago", isNew: false, category: "devops", description: "Build and maintain deployment infrastructure.", requirements: ["3+ years DevOps experience", "AWS expertise", "Container experience"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure management"] },
      { id: "amz11", title: "Business Analyst", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "15 - 28 LPA", skills: ["SQL", "Excel", "Data Analysis", "Tableau", "Communication"], posted: "4 days ago", isNew: false, category: "data", description: "Analyze business data to drive decisions.", requirements: ["2+ years BA experience", "Strong SQL skills", "Analytical mindset"], responsibilities: ["Data analysis", "Reporting", "Stakeholder presentations", "Process improvement"] },
      { id: "amz12", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-9 years", salary: "40 - 65 LPA", skills: ["Program Management", "Technical Background", "Communication", "Agile", "Risk Management"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive complex technical programs at Amazon.", requirements: ["5+ years TPM experience", "Technical background", "Leadership skills"], responsibilities: ["Program planning", "Cross-team coordination", "Risk management", "Stakeholder communication"] },
    ],
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    industry: "Consumer Electronics",
    description: "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
    employees: "160,000+",
    headquarters: "Cupertino, California",
    indianOffices: ["Bangalore", "Hyderabad"],
    benefits: ["Health Insurance", "401(k)", "Stock Purchase Plan", "Employee Discount", "Parental Leave", "Wellness Programs", "Learning Opportunities", "Commuter Benefits"],
    color: "from-gray-700 to-gray-500",
    bgColor: "bg-gray-500/10",
    textColor: "text-gray-600",
    jobs: [
      { id: "apl1", title: "iOS Developer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 50 LPA", skills: ["Swift", "iOS", "UIKit", "SwiftUI", "Core Data"], posted: "1 day ago", isNew: true, category: "mobile", description: "Build iOS apps for Apple's ecosystem.", requirements: ["3+ years iOS experience", "Swift expertise", "Deep iOS knowledge"], responsibilities: ["iOS development", "Feature implementation", "Code reviews", "Performance optimization"] },
      { id: "apl2", title: "Machine Learning Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "4-8 years", salary: "40 - 70 LPA", skills: ["Python", "CoreML", "Deep Learning", "NLP", "Computer Vision"], posted: "2 days ago", isNew: true, category: "ai", description: "Build ML models for Apple's products.", requirements: ["4+ years ML experience", "Strong Python skills", "Production ML experience"], responsibilities: ["ML model development", "Research", "Production deployment", "Cross-team collaboration"] },
      { id: "apl3", title: "Software Engineer", location: "Hyderabad, India", locationType: "On-site", type: "Full-time", experienceLevel: "2-5 years", salary: "25 - 45 LPA", skills: ["C++", "Python", "Algorithms", "System Design", "iOS/macOS"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Work on Apple's software products.", requirements: ["BS in Computer Science", "Strong C++ skills", "System design knowledge"], responsibilities: ["Software development", "Code reviews", "Testing", "Documentation"] },
      { id: "apl4", title: "Data Scientist", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "35 - 55 LPA", skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"], posted: "4 days ago", isNew: false, category: "data", description: "Analyze data to improve Apple's services.", requirements: ["MS in Data Science", "Strong analytical skills", "ML knowledge"], responsibilities: ["Data analysis", "ML modeling", "Insights generation", "Stakeholder presentations"] },
      { id: "apl5", title: "Security Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "5-9 years", salary: "40 - 65 LPA", skills: ["Security", "iOS Security", "Cryptography", "Penetration Testing", "Secure Coding"], posted: "5 days ago", isNew: false, category: "security", description: "Protect Apple's products and user data.", requirements: ["5+ years security experience", "iOS security knowledge", "Cryptography skills"], responsibilities: ["Security assessments", "Vulnerability research", "Secure design", "Incident response"] },
      { id: "apl6", title: "Hardware Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 60 LPA", skills: ["VLSI", "Verilog", "FPGA", "RTL Design", "Verification"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Design hardware for Apple's products.", requirements: ["4+ years hardware experience", "VLSI knowledge", "Chip design experience"], responsibilities: ["Hardware design", "Verification", "Testing", "Documentation"] },
      { id: "apl7", title: "SRE", location: "Hyderabad, India", locationType: "On-site", type: "Full-time", experienceLevel: "4-7 years", salary: "30 - 50 LPA", skills: ["Linux", "Python", "Kubernetes", "Monitoring", "Automation"], posted: "3 days ago", isNew: true, category: "devops", description: "Ensure reliability of Apple's services.", requirements: ["4+ years SRE experience", "Strong Linux skills", "Automation expertise"], responsibilities: ["Incident management", "Automation", "Capacity planning", "On-call rotation"] },
      { id: "apl8", title: "Product Designer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 55 LPA", skills: ["Sketch", "Figma", "Prototyping", "User Research", "Visual Design"], posted: "6 days ago", isNew: false, category: "design", description: "Design user experiences for Apple products.", requirements: ["4+ years design experience", "Strong portfolio", "User research skills"], responsibilities: ["UI/UX design", "Prototyping", "User research", "Design system"] },
      { id: "apl9", title: "Backend Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "28 - 48 LPA", skills: ["Java", "Scala", "Distributed Systems", "Kafka", "Cassandra"], posted: "1 week ago", isNew: false, category: "backend", description: "Build backend services for Apple's platforms.", requirements: ["3+ years backend experience", "Distributed systems knowledge", "Strong coding skills"], responsibilities: ["Backend development", "API design", "Performance optimization", "Documentation"] },
      { id: "apl10", title: "Siri ML Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "38 - 65 LPA", skills: ["NLP", "Deep Learning", "Python", "Speech Recognition", "Transformers"], posted: "5 days ago", isNew: false, category: "ai", description: "Improve Siri's natural language capabilities.", requirements: ["3+ years NLP experience", "Deep learning expertise", "Research experience"], responsibilities: ["NLP model development", "Research", "Experimentation", "Production deployment"] },
      { id: "apl11", title: "QA Engineer", location: "Hyderabad, India", locationType: "On-site", type: "Full-time", experienceLevel: "2-5 years", salary: "18 - 32 LPA", skills: ["Testing", "Automation", "iOS Testing", "XCUITest", "Python"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Ensure quality of Apple's software products.", requirements: ["2+ years QA experience", "Automation skills", "iOS testing knowledge"], responsibilities: ["Test planning", "Automation", "Bug reporting", "Quality assurance"] },
      { id: "apl12", title: "DevOps Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 42 LPA", skills: ["CI/CD", "Kubernetes", "Docker", "Jenkins", "Python"], posted: "1 week ago", isNew: false, category: "devops", description: "Build and maintain CI/CD infrastructure.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Container experience"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure management"] },
    ],
  },
  {
    name: "IBM",
    logo: "https://logo.clearbit.com/ibm.com",
    industry: "Technology & Consulting",
    description: "International Business Machines Corporation is an American multinational technology company headquartered in Armonk, New York, with operations in over 171 countries.",
    employees: "280,000+",
    headquarters: "Armonk, New York",
    indianOffices: ["Bangalore", "Hyderabad", "Pune", "Delhi NCR", "Chennai", "Kolkata"],
    benefits: ["Health Insurance", "401(k)", "Flexible Work", "Learning Programs", "Employee Assistance", "Parental Leave", "Wellness Programs", "Retirement Benefits"],
    color: "from-blue-700 to-blue-500",
    bgColor: "bg-blue-700/10",
    textColor: "text-blue-700",
    jobs: [
      { id: "ibm1", title: "Associate Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "4 - 6 LPA", skills: ["Java", "Python", "SQL", "Problem Solving", "Communication"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career at IBM as an Associate Software Engineer.", requirements: ["BE/BTech in CS/IT", "Strong fundamentals", "Good communication"], responsibilities: ["Software development", "Testing", "Documentation", "Team collaboration"] },
      { id: "ibm2", title: "Cloud Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["IBM Cloud", "AWS", "Kubernetes", "Docker", "Terraform"], posted: "2 days ago", isNew: true, category: "devops", description: "Design and implement cloud solutions on IBM Cloud.", requirements: ["3+ years cloud experience", "Cloud certifications", "IaC experience"], responsibilities: ["Cloud architecture", "Automation", "Migration", "Support"] },
      { id: "ibm3", title: "Data Scientist", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "14 - 25 LPA", skills: ["Python", "Watson", "Machine Learning", "SQL", "Statistics"], posted: "3 days ago", isNew: true, category: "data", description: "Apply data science using IBM Watson.", requirements: ["3+ years data science", "Watson experience", "Strong statistics"], responsibilities: ["ML model development", "Watson integration", "Data analysis", "Client presentations"] },
      { id: "ibm4", title: "Java Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "MySQL"], posted: "4 days ago", isNew: false, category: "backend", description: "Develop Java applications for enterprise clients.", requirements: ["2+ years Java experience", "Spring Boot knowledge", "Database experience"], responsibilities: ["Java development", "API development", "Testing", "Code reviews"] },
      { id: "ibm5", title: "AI Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "15 - 28 LPA", skills: ["Python", "TensorFlow", "Watson AI", "NLP", "Deep Learning"], posted: "5 days ago", isNew: false, category: "ai", description: "Build AI solutions using IBM Watson.", requirements: ["3+ years AI experience", "Watson knowledge", "Deep learning skills"], responsibilities: ["AI model development", "Watson integration", "Research", "Client solutions"] },
      { id: "ibm6", title: "Security Consultant", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-9 years", salary: "18 - 35 LPA", skills: ["Security", "QRadar", "SIEM", "Penetration Testing", "Compliance"], posted: "1 week ago", isNew: false, category: "security", description: "Provide security consulting services to clients.", requirements: ["5+ years security experience", "QRadar knowledge", "Security certifications"], responsibilities: ["Security assessments", "SIEM implementation", "Compliance", "Client consulting"] },
      { id: "ibm7", title: "React Developer", location: "Kolkata, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "6 - 12 LPA", skills: ["React", "JavaScript", "TypeScript", "Redux", "HTML/CSS"], posted: "3 days ago", isNew: true, category: "frontend", description: "Build web applications using React.", requirements: ["2+ years React experience", "JavaScript proficiency", "State management"], responsibilities: ["Frontend development", "Component design", "Testing", "Performance optimization"] },
      { id: "ibm8", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 20 LPA", skills: ["Jenkins", "Docker", "Kubernetes", "Ansible", "Linux"], posted: "6 days ago", isNew: false, category: "devops", description: "Build and maintain CI/CD pipelines.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Container experience"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure management"] },
      { id: "ibm9", title: "SAP Consultant", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "12 - 25 LPA", skills: ["SAP", "ABAP", "SAP HANA", "SAP Fiori", "Integration"], posted: "1 week ago", isNew: false, category: "backend", description: "Implement SAP solutions for enterprise clients.", requirements: ["4+ years SAP experience", "ABAP knowledge", "S/4HANA experience"], responsibilities: ["SAP implementation", "Customization", "Integration", "Support"] },
      { id: "ibm10", title: "Blockchain Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "15 - 28 LPA", skills: ["Hyperledger", "Blockchain", "Smart Contracts", "Node.js", "Go"], posted: "5 days ago", isNew: false, category: "backend", description: "Build blockchain solutions using Hyperledger.", requirements: ["3+ years blockchain experience", "Hyperledger knowledge", "Smart contract development"], responsibilities: ["Blockchain development", "Smart contracts", "Integration", "Documentation"] },
      { id: "ibm11", title: "UX Designer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 20 LPA", skills: ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"], posted: "4 days ago", isNew: false, category: "design", description: "Design user experiences for IBM products.", requirements: ["3+ years UX experience", "Strong portfolio", "Research skills"], responsibilities: ["UX design", "User research", "Prototyping", "Design system"] },
      { id: "ibm12", title: "Mainframe Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "10 - 22 LPA", skills: ["COBOL", "JCL", "DB2", "CICS", "Mainframe"], posted: "1 week ago", isNew: false, category: "backend", description: "Develop and maintain mainframe applications.", requirements: ["3+ years mainframe experience", "COBOL proficiency", "DB2 knowledge"], responsibilities: ["Mainframe development", "Maintenance", "Testing", "Documentation"] },
    ],
  },
  {
    name: "Intel",
    logo: "https://logo.clearbit.com/intel.com",
    industry: "Semiconductors",
    description: "Intel Corporation is an American multinational corporation and technology company headquartered in Santa Clara, California. It is the world's largest semiconductor chip manufacturer.",
    employees: "130,000+",
    headquarters: "Santa Clara, California",
    indianOffices: ["Bangalore", "Hyderabad"],
    benefits: ["Health Insurance", "401(k)", "Stock Purchase Plan", "Sabbatical Program", "Parental Leave", "Education Assistance", "Flexible Work", "Wellness Programs"],
    color: "from-blue-600 to-cyan-400",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "int1", title: "Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "15 - 28 LPA", skills: ["C++", "Python", "Linux", "Algorithms", "System Programming"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Develop software for Intel's platforms.", requirements: ["BS in Computer Science", "Strong C++ skills", "System programming"], responsibilities: ["Software development", "Testing", "Performance optimization", "Documentation"] },
      { id: "int2", title: "VLSI Design Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "18 - 35 LPA", skills: ["Verilog", "VLSI", "RTL Design", "Synthesis", "Verification"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Design circuits for Intel's processors.", requirements: ["3+ years VLSI experience", "RTL design skills", "Verification knowledge"], responsibilities: ["RTL design", "Verification", "Synthesis", "Timing closure"] },
      { id: "int3", title: "AI Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 38 LPA", skills: ["Python", "OpenVINO", "Deep Learning", "Computer Vision", "TensorFlow"], posted: "3 days ago", isNew: true, category: "ai", description: "Optimize AI models for Intel hardware.", requirements: ["3+ years AI experience", "OpenVINO knowledge", "Deep learning skills"], responsibilities: ["AI optimization", "Model deployment", "Performance tuning", "Documentation"] },
      { id: "int4", title: "Firmware Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "16 - 30 LPA", skills: ["C", "Assembly", "UEFI", "BIOS", "Embedded Systems"], posted: "4 days ago", isNew: false, category: "backend", description: "Develop firmware for Intel platforms.", requirements: ["3+ years firmware experience", "C programming", "BIOS/UEFI knowledge"], responsibilities: ["Firmware development", "Testing", "Debugging", "Documentation"] },
      { id: "int5", title: "Validation Engineer", location: "Hyderabad, India", locationType: "On-site", type: "Full-time", experienceLevel: "2-5 years", salary: "12 - 24 LPA", skills: ["Validation", "Python", "C++", "Automation", "Testing"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Validate Intel's hardware and software.", requirements: ["2+ years validation experience", "Strong programming", "Automation skills"], responsibilities: ["Test development", "Validation", "Bug reporting", "Automation"] },
      { id: "int6", title: "Security Researcher", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "25 - 45 LPA", skills: ["Security", "Reverse Engineering", "Vulnerability Research", "Hardware Security", "Cryptography"], posted: "1 week ago", isNew: false, category: "security", description: "Research security vulnerabilities in Intel products.", requirements: ["4+ years security research", "Hardware security knowledge", "Reverse engineering skills"], responsibilities: ["Security research", "Vulnerability analysis", "Mitigations", "Publications"] },
      { id: "int7", title: "Data Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 32 LPA", skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"], posted: "3 days ago", isNew: true, category: "data", description: "Apply data science to improve Intel's products.", requirements: ["3+ years data science", "Strong statistics", "ML knowledge"], responsibilities: ["Data analysis", "ML modeling", "Insights generation", "Stakeholder presentations"] },
      { id: "int8", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "14 - 26 LPA", skills: ["Jenkins", "Docker", "Kubernetes", "Ansible", "Linux"], posted: "6 days ago", isNew: false, category: "devops", description: "Build and maintain CI/CD infrastructure.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Container experience"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure management"] },
      { id: "int9", title: "Graphics Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "20 - 38 LPA", skills: ["C++", "OpenGL", "Vulkan", "Graphics", "GPU Programming"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Develop graphics drivers and software.", requirements: ["3+ years graphics experience", "GPU programming", "Graphics APIs"], responsibilities: ["Driver development", "Performance optimization", "Testing", "Documentation"] },
      { id: "int10", title: "Technical Lead", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "35 - 55 LPA", skills: ["Leadership", "Architecture", "C++", "System Design", "Project Management"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Lead technical teams at Intel.", requirements: ["8+ years experience", "Leadership skills", "Strong architecture skills"], responsibilities: ["Technical leadership", "Architecture design", "Mentoring", "Project management"] },
      { id: "int11", title: "Performance Engineer", location: "Hyderabad, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "16 - 30 LPA", skills: ["Performance Analysis", "C++", "Profiling", "Linux", "Optimization"], posted: "4 days ago", isNew: false, category: "backend", description: "Optimize performance of Intel's software.", requirements: ["3+ years performance engineering", "Profiling skills", "Strong C++"], responsibilities: ["Performance analysis", "Optimization", "Benchmarking", "Documentation"] },
      { id: "int12", title: "Compiler Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "22 - 40 LPA", skills: ["LLVM", "Compilers", "C++", "Optimization", "Code Generation"], posted: "1 week ago", isNew: false, category: "backend", description: "Develop compilers for Intel architectures.", requirements: ["4+ years compiler experience", "LLVM knowledge", "Strong C++"], responsibilities: ["Compiler development", "Optimization", "Testing", "Documentation"] },
    ],
  },
  {
    name: "Oracle",
    logo: "https://logo.clearbit.com/oracle.com",
    industry: "Enterprise Software",
    description: "Oracle Corporation is an American multinational computer technology corporation. The company sells database software and technology, cloud engineered systems, and enterprise software products.",
    employees: "140,000+",
    headquarters: "Austin, Texas",
    indianOffices: ["Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi NCR"],
    benefits: ["Health Insurance", "401(k)", "Stock Purchase Plan", "Parental Leave", "Learning Programs", "Employee Assistance", "Flexible Work", "Wellness Programs"],
    color: "from-red-600 to-red-400",
    bgColor: "bg-red-600/10",
    textColor: "text-red-600",
    jobs: [
      { id: "ora1", title: "Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "14 - 26 LPA", skills: ["Java", "Oracle DB", "PL/SQL", "REST APIs", "Microservices"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Develop enterprise software at Oracle.", requirements: ["BS in Computer Science", "Strong Java skills", "Database knowledge"], responsibilities: ["Software development", "Database design", "Testing", "Documentation"] },
      { id: "ora2", title: "Cloud Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "16 - 30 LPA", skills: ["OCI", "Terraform", "Kubernetes", "Docker", "Linux"], posted: "2 days ago", isNew: true, category: "devops", description: "Build and manage Oracle Cloud Infrastructure.", requirements: ["3+ years cloud experience", "OCI certification", "IaC experience"], responsibilities: ["Cloud architecture", "Automation", "Migration", "Support"] },
      { id: "ora3", title: "Database Administrator", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "18 - 35 LPA", skills: ["Oracle DB", "RAC", "Performance Tuning", "Backup/Recovery", "SQL"], posted: "3 days ago", isNew: true, category: "backend", description: "Manage and optimize Oracle databases.", requirements: ["4+ years DBA experience", "Oracle certification", "Performance tuning skills"], responsibilities: ["Database management", "Performance tuning", "Backup/recovery", "Security"] },
      { id: "ora4", title: "Java Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "10 - 20 LPA", skills: ["Java", "Spring Boot", "Hibernate", "REST APIs", "MySQL"], posted: "4 days ago", isNew: false, category: "backend", description: "Develop Java applications for enterprise clients.", requirements: ["2+ years Java experience", "Spring Boot knowledge", "Database experience"], responsibilities: ["Java development", "API development", "Testing", "Code reviews"] },
      { id: "ora5", title: "Data Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "15 - 28 LPA", skills: ["Python", "Oracle DB", "ETL", "Data Warehousing", "SQL"], posted: "5 days ago", isNew: false, category: "data", description: "Build data pipelines using Oracle technologies.", requirements: ["3+ years data engineering", "Oracle DB experience", "ETL skills"], responsibilities: ["Pipeline development", "Data modeling", "Performance optimization", "Data quality"] },
      { id: "ora6", title: "Full Stack Developer", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 24 LPA", skills: ["React", "Node.js", "Oracle DB", "JavaScript", "REST APIs"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Build end-to-end web applications.", requirements: ["3+ years full stack experience", "JavaScript proficiency", "Database knowledge"], responsibilities: ["Full stack development", "API design", "Database management", "Testing"] },
      { id: "ora7", title: "Security Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "20 - 38 LPA", skills: ["Security", "Oracle Security", "IAM", "Encryption", "Compliance"], posted: "3 days ago", isNew: true, category: "security", description: "Implement security for Oracle products.", requirements: ["4+ years security experience", "Oracle security knowledge", "Compliance experience"], responsibilities: ["Security implementation", "IAM management", "Compliance", "Auditing"] },
      { id: "ora8", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 32 LPA", skills: ["Python", "Oracle AI", "Machine Learning", "Deep Learning", "NLP"], posted: "6 days ago", isNew: false, category: "ai", description: "Develop AI solutions using Oracle AI platform.", requirements: ["3+ years AI experience", "Oracle AI knowledge", "ML skills"], responsibilities: ["AI model development", "Oracle AI integration", "Research", "Client solutions"] },
      { id: "ora9", title: "Technical Consultant", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-9 years", salary: "20 - 40 LPA", skills: ["Oracle Apps", "ERP", "Consulting", "Implementation", "Support"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Implement Oracle applications for clients.", requirements: ["5+ years Oracle Apps experience", "Consulting experience", "Strong communication"], responsibilities: ["Implementation", "Configuration", "Training", "Support"] },
      { id: "ora10", title: "DevOps Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "14 - 26 LPA", skills: ["OCI", "Jenkins", "Docker", "Kubernetes", "Ansible"], posted: "5 days ago", isNew: false, category: "devops", description: "Build CI/CD pipelines using Oracle Cloud.", requirements: ["3+ years DevOps experience", "OCI knowledge", "CI/CD expertise"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure management"] },
      { id: "ora11", title: "Frontend Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "8 - 16 LPA", skills: ["React", "JavaScript", "TypeScript", "CSS", "Oracle JET"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build user interfaces using Oracle JET.", requirements: ["2+ years frontend experience", "JavaScript proficiency", "Oracle JET knowledge"], responsibilities: ["Frontend development", "Component design", "Testing", "Performance optimization"] },
      { id: "ora12", title: "QA Engineer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 15 LPA", skills: ["Testing", "Automation", "Selenium", "Java", "Oracle Apps"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Ensure quality of Oracle products.", requirements: ["2+ years QA experience", "Automation skills", "Oracle Apps knowledge"], responsibilities: ["Test planning", "Automation", "Bug reporting", "Quality assurance"] },
    ],
  },
  {
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    industry: "Social Media & Technology",
    description: "Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate. The company owns and operates Facebook, Instagram, Threads, and WhatsApp.",
    employees: "86,000+",
    headquarters: "Menlo Park, California",
    indianOffices: ["Bangalore", "Hyderabad", "Gurgaon"],
    benefits: ["Health Insurance", "401(k)", "Free Meals", "Wellness Programs", "Parental Leave", "Stock Options", "Learning Budget", "Work from Home"],
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "meta1", title: "Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "30 - 50 LPA", skills: ["Python", "C++", "Algorithms", "Data Structures", "System Design"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Build products connecting billions of people.", requirements: ["BS in Computer Science", "Strong coding skills", "System design knowledge"], responsibilities: ["Software development", "Code reviews", "Technical documentation", "Team collaboration"] },
      { id: "meta2", title: "Machine Learning Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "40 - 70 LPA", skills: ["PyTorch", "Python", "Deep Learning", "NLP", "Recommendation Systems"], posted: "2 days ago", isNew: true, category: "ai", description: "Build ML systems powering Meta's products.", requirements: ["MS/PhD in ML", "Strong research skills", "Production ML experience"], responsibilities: ["ML model development", "Research", "Experimentation", "Production deployment"] },
      { id: "meta3", title: "Data Scientist", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 55 LPA", skills: ["Python", "SQL", "Statistics", "A/B Testing", "Machine Learning"], posted: "3 days ago", isNew: true, category: "data", description: "Analyze data to improve user experience.", requirements: ["MS in Statistics/CS", "Strong analytical skills", "ML knowledge"], responsibilities: ["Data analysis", "A/B testing", "Insights generation", "Product recommendations"] },
      { id: "meta4", title: "Frontend Engineer", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "28 - 45 LPA", skills: ["React", "JavaScript", "TypeScript", "GraphQL", "Performance"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build user interfaces for Meta's products.", requirements: ["2+ years frontend experience", "React expertise", "Performance optimization"], responsibilities: ["UI development", "Component design", "Testing", "Accessibility"] },
      { id: "meta5", title: "iOS Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "32 - 52 LPA", skills: ["Swift", "iOS", "Objective-C", "UIKit", "Core Data"], posted: "5 days ago", isNew: false, category: "mobile", description: "Build iOS apps for Facebook and Instagram.", requirements: ["3+ years iOS experience", "Swift expertise", "Published apps"], responsibilities: ["iOS development", "Feature implementation", "Code reviews", "Performance optimization"] },
      { id: "meta6", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "40 - 65 LPA", skills: ["Security", "Penetration Testing", "Python", "Network Security", "Incident Response"], posted: "1 week ago", isNew: false, category: "security", description: "Protect Meta's infrastructure and users.", requirements: ["4+ years security experience", "Penetration testing skills", "Incident response"], responsibilities: ["Security assessments", "Vulnerability research", "Incident response", "Security automation"] },
      { id: "meta7", title: "Production Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 55 LPA", skills: ["Linux", "Python", "Automation", "Monitoring", "Distributed Systems"], posted: "3 days ago", isNew: true, category: "devops", description: "Ensure reliability of Meta's infrastructure.", requirements: ["3+ years production engineering", "Strong Linux skills", "Automation expertise"], responsibilities: ["Incident management", "Automation", "Capacity planning", "On-call rotation"] },
      { id: "meta8", title: "Android Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 50 LPA", skills: ["Kotlin", "Android", "Java", "MVVM", "Dagger"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build Android apps for Facebook and Instagram.", requirements: ["3+ years Android experience", "Kotlin proficiency", "Published apps"], responsibilities: ["Android development", "Feature implementation", "Bug fixing", "Performance optimization"] },
      { id: "meta9", title: "AR/VR Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "40 - 65 LPA", skills: ["Unity", "C++", "3D Graphics", "AR/VR", "Computer Vision"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Build immersive AR/VR experiences.", requirements: ["3+ years AR/VR experience", "Unity expertise", "3D graphics knowledge"], responsibilities: ["AR/VR development", "Prototyping", "Performance optimization", "Research"] },
      { id: "meta10", title: "Product Designer", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "30 - 50 LPA", skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Interaction Design"], posted: "5 days ago", isNew: false, category: "design", description: "Design products used by billions.", requirements: ["3+ years product design", "Strong portfolio", "User research skills"], responsibilities: ["Product design", "User research", "Prototyping", "Design system contribution"] },
      { id: "meta11", title: "Backend Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 55 LPA", skills: ["Python", "C++", "Distributed Systems", "Databases", "APIs"], posted: "4 days ago", isNew: false, category: "backend", description: "Build backend services for Meta's products.", requirements: ["3+ years backend experience", "Distributed systems knowledge", "Strong coding skills"], responsibilities: ["Backend development", "API design", "Performance optimization", "Documentation"] },
      { id: "meta12", title: "Research Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD", salary: "55 - 90 LPA", skills: ["Machine Learning", "Research", "Python", "Publications", "Deep Learning"], posted: "1 week ago", isNew: false, category: "ai", description: "Conduct cutting-edge AI research at Meta.", requirements: ["PhD in ML/AI", "Strong publication record", "Research leadership"], responsibilities: ["Research", "Paper publications", "Prototype development", "Team collaboration"] },
    ],
  },
  {
    name: "NVIDIA",
    logo: "https://logo.clearbit.com/nvidia.com",
    industry: "Semiconductors & AI",
    description: "NVIDIA Corporation is an American multinational technology company. It designs graphics processing units (GPUs) for gaming and professional markets, as well as system on a chip units for mobile computing and automotive markets.",
    employees: "26,000+",
    headquarters: "Santa Clara, California",
    indianOffices: ["Bangalore", "Pune", "Hyderabad"],
    benefits: ["Health Insurance", "401(k)", "Stock Purchase Plan", "Parental Leave", "Learning Programs", "Wellness Programs", "Employee Discounts", "Flexible Work"],
    color: "from-green-600 to-green-400",
    bgColor: "bg-green-600/10",
    textColor: "text-green-600",
    jobs: [
      { id: "nv1", title: "CUDA Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "25 - 45 LPA", skills: ["CUDA", "C++", "GPU Programming", "Parallel Computing", "Optimization"], posted: "1 day ago", isNew: true, category: "backend", description: "Develop CUDA libraries for GPU acceleration.", requirements: ["3+ years CUDA experience", "Strong C++ skills", "GPU programming"], responsibilities: ["CUDA development", "Optimization", "Testing", "Documentation"] },
      { id: "nv2", title: "Deep Learning Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "CUDA"], posted: "2 days ago", isNew: true, category: "ai", description: "Build deep learning solutions using NVIDIA GPUs.", requirements: ["3+ years DL experience", "Strong Python skills", "GPU optimization"], responsibilities: ["DL model development", "Optimization", "Research", "Production deployment"] },
      { id: "nv3", title: "Graphics Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "22 - 40 LPA", skills: ["C++", "OpenGL", "Vulkan", "DirectX", "Graphics Programming"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Develop graphics drivers and software.", requirements: ["3+ years graphics experience", "Graphics APIs", "Strong C++"], responsibilities: ["Driver development", "Performance optimization", "Testing", "Documentation"] },
      { id: "nv4", title: "AI Research Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD", salary: "45 - 80 LPA", skills: ["Machine Learning", "Research", "Python", "Publications", "Deep Learning"], posted: "4 days ago", isNew: false, category: "ai", description: "Conduct cutting-edge AI research at NVIDIA.", requirements: ["PhD in ML/AI", "Strong publication record", "Research skills"], responsibilities: ["Research", "Paper publications", "Prototype development", "Collaboration"] },
      { id: "nv5", title: "Autonomous Vehicle Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 60 LPA", skills: ["C++", "ROS", "Computer Vision", "Deep Learning", "CUDA"], posted: "5 days ago", isNew: false, category: "ai", description: "Build software for autonomous vehicles.", requirements: ["4+ years AV experience", "Computer vision", "Strong C++"], responsibilities: ["AV software development", "Perception algorithms", "Testing", "Integration"] },
      { id: "nv6", title: "Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "18 - 32 LPA", skills: ["C++", "Python", "Linux", "Algorithms", "Data Structures"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Develop software for NVIDIA's platforms.", requirements: ["BS in Computer Science", "Strong C++ skills", "Linux experience"], responsibilities: ["Software development", "Testing", "Documentation", "Code reviews"] },
      { id: "nv7", title: "VLSI Design Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "22 - 42 LPA", skills: ["Verilog", "VLSI", "RTL Design", "Synthesis", "Verification"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Design circuits for NVIDIA's GPUs.", requirements: ["3+ years VLSI experience", "RTL design skills", "Verification knowledge"], responsibilities: ["RTL design", "Verification", "Synthesis", "Timing closure"] },
      { id: "nv8", title: "DevOps Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "16 - 30 LPA", skills: ["Jenkins", "Docker", "Kubernetes", "Ansible", "Linux"], posted: "6 days ago", isNew: false, category: "devops", description: "Build CI/CD infrastructure for NVIDIA.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Container experience"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure management"] },
      { id: "nv9", title: "Data Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 40 LPA", skills: ["Python", "SQL", "Machine Learning", "RAPIDS", "Data Analysis"], posted: "1 week ago", isNew: false, category: "data", description: "Apply data science using NVIDIA's tools.", requirements: ["3+ years data science", "GPU computing", "Strong analytics"], responsibilities: ["Data analysis", "ML modeling", "RAPIDS development", "Insights generation"] },
      { id: "nv10", title: "Computer Vision Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-7 years", salary: "28 - 50 LPA", skills: ["Python", "OpenCV", "Deep Learning", "Computer Vision", "CUDA"], posted: "5 days ago", isNew: false, category: "ai", description: "Develop computer vision solutions.", requirements: ["3+ years CV experience", "Deep learning", "CUDA knowledge"], responsibilities: ["CV algorithm development", "Model optimization", "Testing", "Deployment"] },
      { id: "nv11", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "25 - 45 LPA", skills: ["Security", "Hardware Security", "Cryptography", "Penetration Testing", "Secure Coding"], posted: "4 days ago", isNew: false, category: "security", description: "Ensure security of NVIDIA's products.", requirements: ["4+ years security experience", "Hardware security", "Cryptography"], responsibilities: ["Security assessments", "Vulnerability research", "Secure design", "Incident response"] },
      { id: "nv12", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-9 years", salary: "30 - 55 LPA", skills: ["Program Management", "Technical Background", "Communication", "Agile", "Hardware/Software"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive complex programs at NVIDIA.", requirements: ["5+ years TPM experience", "Technical background", "Leadership skills"], responsibilities: ["Program planning", "Cross-team coordination", "Risk management", "Stakeholder communication"] },
    ],
  },
  {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    industry: "Electric Vehicles & Energy",
    description: "Tesla, Inc. is an American multinational automotive and clean energy company. Tesla designs and manufactures electric vehicles, battery energy storage, solar panels and related products and services.",
    employees: "130,000+",
    headquarters: "Austin, Texas",
    indianOffices: ["Bangalore", "Pune"],
    benefits: ["Health Insurance", "401(k)", "Stock Options", "Parental Leave", "Employee Discounts", "Wellness Programs", "Learning Opportunities", "Free EV Charging"],
    color: "from-red-500 to-red-400",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    jobs: [
      { id: "ts1", title: "Autopilot Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 60 LPA", skills: ["C++", "Python", "Computer Vision", "Deep Learning", "Autonomous Vehicles"], posted: "1 day ago", isNew: true, category: "ai", description: "Build Tesla's Autopilot system.", requirements: ["4+ years AV experience", "Computer vision", "Deep learning"], responsibilities: ["Autopilot development", "Perception algorithms", "Testing", "Optimization"] },
      { id: "ts2", title: "Embedded Software Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "25 - 45 LPA", skills: ["C", "C++", "Embedded Systems", "RTOS", "Firmware"], posted: "2 days ago", isNew: true, category: "backend", description: "Develop embedded software for Tesla vehicles.", requirements: ["3+ years embedded experience", "Strong C/C++", "RTOS knowledge"], responsibilities: ["Embedded development", "Firmware", "Testing", "Integration"] },
      { id: "ts3", title: "Full Stack Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 38 LPA", skills: ["React", "Python", "PostgreSQL", "REST APIs", "AWS"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Build web applications for Tesla.", requirements: ["3+ years full stack experience", "React proficiency", "Backend skills"], responsibilities: ["Full stack development", "API design", "Database management", "Testing"] },
      { id: "ts4", title: "Data Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 40 LPA", skills: ["Python", "Spark", "Kafka", "Data Pipelines", "AWS"], posted: "4 days ago", isNew: false, category: "data", description: "Build data pipelines for Tesla's analytics.", requirements: ["3+ years data engineering", "Big data experience", "Python skills"], responsibilities: ["Pipeline development", "Data modeling", "Performance optimization", "Data quality"] },
      { id: "ts5", title: "Machine Learning Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "30 - 55 LPA", skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "Computer Vision"], posted: "5 days ago", isNew: false, category: "ai", description: "Build ML models for Tesla's products.", requirements: ["3+ years ML experience", "Deep learning", "Production ML"], responsibilities: ["ML model development", "Training", "Deployment", "Optimization"] },
      { id: "ts6", title: "DevOps Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 35 LPA", skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"], posted: "1 week ago", isNew: false, category: "devops", description: "Build infrastructure for Tesla's software.", requirements: ["3+ years DevOps experience", "AWS expertise", "Container experience"], responsibilities: ["Infrastructure management", "Automation", "Monitoring", "Security"] },
      { id: "ts7", title: "Security Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "4-8 years", salary: "30 - 52 LPA", skills: ["Security", "Automotive Security", "Penetration Testing", "Cryptography", "Embedded Security"], posted: "3 days ago", isNew: true, category: "security", description: "Ensure security of Tesla's vehicles.", requirements: ["4+ years security experience", "Automotive security", "Embedded systems"], responsibilities: ["Security assessments", "Vulnerability research", "Secure design", "Incident response"] },
      { id: "ts8", title: "Frontend Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "16 - 30 LPA", skills: ["React", "TypeScript", "CSS", "Testing", "Performance"], posted: "6 days ago", isNew: false, category: "frontend", description: "Build user interfaces for Tesla's apps.", requirements: ["2+ years React experience", "TypeScript proficiency", "Testing skills"], responsibilities: ["Frontend development", "Component design", "Testing", "Performance optimization"] },
      { id: "ts9", title: "Battery Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "4-8 years", salary: "28 - 50 LPA", skills: ["Battery Technology", "MATLAB", "Python", "Electrochemistry", "Simulation"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Work on Tesla's battery technology.", requirements: ["4+ years battery experience", "Electrochemistry", "Simulation skills"], responsibilities: ["Battery development", "Testing", "Simulation", "Optimization"] },
      { id: "ts10", title: "QA Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "14 - 26 LPA", skills: ["Testing", "Automation", "Python", "Selenium", "CI/CD"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Ensure quality of Tesla's software.", requirements: ["2+ years QA experience", "Automation skills", "Python knowledge"], responsibilities: ["Test planning", "Automation", "Bug reporting", "Quality assurance"] },
      { id: "ts11", title: "Power Electronics Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "22 - 42 LPA", skills: ["Power Electronics", "PCB Design", "MATLAB", "Simulation", "Testing"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Design power electronics for Tesla vehicles.", requirements: ["3+ years power electronics", "PCB design", "Simulation skills"], responsibilities: ["Circuit design", "PCB layout", "Testing", "Documentation"] },
      { id: "ts12", title: "Robotics Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-7 years", salary: "28 - 50 LPA", skills: ["ROS", "C++", "Python", "Computer Vision", "Motion Planning"], posted: "1 week ago", isNew: false, category: "ai", description: "Work on Tesla Bot and manufacturing robots.", requirements: ["3+ years robotics experience", "ROS expertise", "Motion planning"], responsibilities: ["Robotics development", "Motion planning", "Testing", "Integration"] },
    ],
  },
  {
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    industry: "Consulting & Technology",
    description: "Accenture plc is an Irish-American professional services company. A Fortune Global 500 company, it provides consulting, technology, and outsourcing services.",
    employees: "720,000+",
    headquarters: "Dublin, Ireland",
    indianOffices: ["Bangalore", "Mumbai", "Chennai", "Hyderabad", "Pune", "Delhi NCR", "Kolkata"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Stock Purchase Plan", "Parental Leave", "Learning Programs", "Flexible Work", "Wellness Programs"],
    color: "from-purple-600 to-purple-400",
    bgColor: "bg-purple-600/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "acc1", title: "Associate Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "4.5 - 6 LPA", skills: ["Java", "Python", "SQL", "Problem Solving", "Communication"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career at Accenture.", requirements: ["BE/BTech in CS/IT", "Strong fundamentals", "Good communication"], responsibilities: ["Software development", "Testing", "Documentation", "Client interaction"] },
      { id: "acc2", title: "Java Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "MySQL"], posted: "2 days ago", isNew: true, category: "backend", description: "Develop Java applications for clients.", requirements: ["2+ years Java experience", "Spring Boot knowledge", "Database experience"], responsibilities: ["Java development", "API development", "Testing", "Code reviews"] },
      { id: "acc3", title: "Data Analyst", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "1-3 years", salary: "5 - 10 LPA", skills: ["SQL", "Python", "Tableau", "Power BI", "Excel"], posted: "3 days ago", isNew: true, category: "data", description: "Analyze data for business insights.", requirements: ["1+ years data analysis", "SQL proficiency", "Visualization skills"], responsibilities: ["Data analysis", "Reporting", "Dashboard creation", "Presentations"] },
      { id: "acc4", title: "Cloud Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 20 LPA", skills: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes"], posted: "4 days ago", isNew: false, category: "devops", description: "Build cloud solutions for clients.", requirements: ["3+ years cloud experience", "Cloud certifications", "IaC experience"], responsibilities: ["Cloud architecture", "Migration", "Automation", "Support"] },
      { id: "acc5", title: "React Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "6 - 12 LPA", skills: ["React", "JavaScript", "TypeScript", "Redux", "HTML/CSS"], posted: "5 days ago", isNew: false, category: "frontend", description: "Build web applications using React.", requirements: ["2+ years React experience", "JavaScript proficiency", "State management"], responsibilities: ["Frontend development", "Component design", "Testing", "Performance"] },
      { id: "acc6", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 24 LPA", skills: ["Python", "TensorFlow", "Machine Learning", "NLP", "Deep Learning"], posted: "1 week ago", isNew: false, category: "ai", description: "Build AI solutions for clients.", requirements: ["3+ years AI experience", "Strong Python", "ML frameworks"], responsibilities: ["ML model development", "Deployment", "Client solutions", "Research"] },
      { id: "acc7", title: "SAP Consultant", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "12 - 25 LPA", skills: ["SAP", "ABAP", "S/4HANA", "Fiori", "Integration"], posted: "3 days ago", isNew: true, category: "backend", description: "Implement SAP solutions for clients.", requirements: ["4+ years SAP experience", "Module expertise", "Client-facing skills"], responsibilities: ["SAP implementation", "Configuration", "Training", "Support"] },
      { id: "acc8", title: "Security Consultant", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "14 - 28 LPA", skills: ["Security", "SIEM", "Penetration Testing", "Compliance", "Risk Assessment"], posted: "6 days ago", isNew: false, category: "security", description: "Provide security consulting to clients.", requirements: ["4+ years security experience", "Security certifications", "Consulting experience"], responsibilities: ["Security assessments", "Compliance", "Risk management", "Client presentations"] },
      { id: "acc9", title: "Full Stack Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Build end-to-end applications.", requirements: ["3+ years full stack experience", "MERN stack", "Database skills"], responsibilities: ["Full stack development", "API design", "Database management", "Testing"] },
      { id: "acc10", title: "DevOps Engineer", location: "Kolkata, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "9 - 18 LPA", skills: ["Jenkins", "Docker", "Kubernetes", "Ansible", "AWS"], posted: "5 days ago", isNew: false, category: "devops", description: "Build CI/CD pipelines for clients.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Container experience"], responsibilities: ["Pipeline development", "Automation", "Monitoring", "Infrastructure"] },
      { id: "acc11", title: "Business Analyst", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 14 LPA", skills: ["Requirements Gathering", "Documentation", "Agile", "SQL", "Communication"], posted: "4 days ago", isNew: false, category: "data", description: "Bridge business and technology.", requirements: ["2+ years BA experience", "Strong communication", "Analytical skills"], responsibilities: ["Requirements gathering", "Documentation", "Stakeholder management", "Process improvement"] },
      { id: "acc12", title: "Technical Lead", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "22 - 40 LPA", skills: ["Java", "Architecture", "Leadership", "Agile", "Client Management"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Lead technical teams at Accenture.", requirements: ["8+ years experience", "Leadership skills", "Architecture expertise"], responsibilities: ["Technical leadership", "Architecture", "Mentoring", "Client interaction"] },
    ],
  },
  {
    name: "Deloitte",
    logo: "https://logo.clearbit.com/deloitte.com",
    industry: "Consulting & Professional Services",
    description: "Deloitte Touche Tohmatsu Limited is a British multinational professional services network. Deloitte is one of the Big Four accounting organizations and the largest professional services network in the world by revenue and number of professionals.",
    employees: "415,000+",
    headquarters: "London, UK",
    indianOffices: ["Bangalore", "Mumbai", "Hyderabad", "Chennai", "Pune", "Delhi NCR", "Kolkata"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Parental Leave", "Learning Programs", "Flexible Work", "Wellness Programs", "Performance Bonus"],
    color: "from-green-700 to-green-500",
    bgColor: "bg-green-700/10",
    textColor: "text-green-700",
    jobs: [
      { id: "del1", title: "Analyst", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "6 - 8 LPA", skills: ["Excel", "SQL", "PowerPoint", "Analytics", "Communication"], posted: "1 day ago", isNew: true, category: "data", description: "Start your consulting career at Deloitte.", requirements: ["MBA/BE/BTech", "Strong analytics", "Good communication"], responsibilities: ["Data analysis", "Research", "Presentations", "Client support"] },
      { id: "del2", title: "Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Java", "Python", "SQL", "Cloud", "Agile"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build technology solutions for clients.", requirements: ["2+ years experience", "Strong coding skills", "Cloud knowledge"], responsibilities: ["Software development", "Testing", "Documentation", "Client interaction"] },
      { id: "del3", title: "Data Scientist", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Python", "Machine Learning", "SQL", "Statistics", "Visualization"], posted: "3 days ago", isNew: true, category: "data", description: "Apply data science to solve business problems.", requirements: ["3+ years data science", "Strong statistics", "ML expertise"], responsibilities: ["ML model development", "Data analysis", "Client presentations", "Research"] },
      { id: "del4", title: "Cloud Consultant", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "14 - 28 LPA", skills: ["AWS", "Azure", "GCP", "Architecture", "Migration"], posted: "4 days ago", isNew: false, category: "devops", description: "Provide cloud consulting to clients.", requirements: ["4+ years cloud experience", "Certifications", "Consulting experience"], responsibilities: ["Cloud architecture", "Migration", "Client consulting", "Best practices"] },
      { id: "del5", title: "Cybersecurity Consultant", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "14 - 30 LPA", skills: ["Security", "Risk Assessment", "Compliance", "SIEM", "Incident Response"], posted: "5 days ago", isNew: false, category: "security", description: "Provide security consulting to clients.", requirements: ["4+ years security experience", "Certifications", "Consulting skills"], responsibilities: ["Security assessments", "Risk management", "Compliance", "Client presentations"] },
      { id: "del6", title: "SAP Consultant", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "12 - 26 LPA", skills: ["SAP", "S/4HANA", "Module Expertise", "Integration", "Implementation"], posted: "1 week ago", isNew: false, category: "backend", description: "Implement SAP solutions for clients.", requirements: ["4+ years SAP experience", "Module expertise", "Client-facing skills"], responsibilities: ["SAP implementation", "Configuration", "Training", "Support"] },
      { id: "del7", title: "React Developer", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 14 LPA", skills: ["React", "JavaScript", "TypeScript", "Redux", "Testing"], posted: "3 days ago", isNew: true, category: "frontend", description: "Build web applications for clients.", requirements: ["2+ years React experience", "JavaScript proficiency", "Testing skills"], responsibilities: ["Frontend development", "Component design", "Testing", "Code reviews"] },
      { id: "del8", title: "AI Consultant", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "16 - 32 LPA", skills: ["AI/ML", "Python", "Consulting", "Strategy", "Implementation"], posted: "6 days ago", isNew: false, category: "ai", description: "Provide AI consulting to clients.", requirements: ["4+ years AI experience", "Consulting experience", "Strong communication"], responsibilities: ["AI strategy", "Implementation", "Client presentations", "Research"] },
      { id: "del9", title: "Business Analyst", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Requirements", "Documentation", "Agile", "SQL", "Communication"], posted: "1 week ago", isNew: false, category: "data", description: "Bridge business and technology.", requirements: ["2+ years BA experience", "Strong communication", "Analytical skills"], responsibilities: ["Requirements gathering", "Documentation", "Stakeholder management", "Analysis"] },
      { id: "del10", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 20 LPA", skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"], posted: "5 days ago", isNew: false, category: "devops", description: "Build DevOps solutions for clients.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Cloud knowledge"], responsibilities: ["Pipeline development", "Automation", "Infrastructure", "Client support"] },
      { id: "del11", title: "Manager - Technology", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "25 - 45 LPA", skills: ["Leadership", "Architecture", "Client Management", "Strategy", "Delivery"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Lead technology engagements at Deloitte.", requirements: ["8+ years experience", "Leadership skills", "Client management"], responsibilities: ["Team leadership", "Client management", "Delivery", "Business development"] },
      { id: "del12", title: "RPA Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["UiPath", "Automation Anywhere", "Blue Prism", "Python", "Process Automation"], posted: "1 week ago", isNew: false, category: "backend", description: "Build RPA solutions for clients.", requirements: ["2+ years RPA experience", "Certification", "Process understanding"], responsibilities: ["RPA development", "Bot deployment", "Maintenance", "Documentation"] },
    ],
  },
  {
    name: "TCS",
    logo: "https://logo.clearbit.com/tcs.com",
    industry: "IT Services & Consulting",
    description: "Tata Consultancy Services is an Indian multinational IT services and consulting company headquartered in Mumbai. It is part of the Tata Group and operates in 150 locations across 46 countries.",
    employees: "600,000+",
    headquarters: "Mumbai, India",
    indianOffices: ["Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Delhi NCR", "Kochi"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Gratuity", "Employee Stock Options", "Learning & Development", "Work from Home", "Paid Time Off"],
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    jobs: [
      { id: "tcs1", title: "Associate Software Engineer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.5 - 4.5 LPA", skills: ["Java", "Python", "SQL", "Problem Solving"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Join our team as an Associate Software Engineer and work on cutting-edge projects for global clients.", requirements: ["B.Tech/BE in CS/IT", "Strong programming fundamentals", "Good communication skills"], responsibilities: ["Develop software solutions", "Write clean, maintainable code", "Participate in code reviews", "Collaborate with team members"] },
      { id: "tcs2", title: "Java Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "MySQL"], posted: "2 days ago", isNew: true, category: "backend", description: "Looking for experienced Java developers to build scalable enterprise applications.", requirements: ["2+ years Java experience", "Strong Spring Boot knowledge", "Experience with databases"], responsibilities: ["Design and develop Java applications", "Build REST APIs", "Write unit tests", "Mentor junior developers"] },
      { id: "tcs3", title: "React.js Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "5 - 10 LPA", skills: ["React.js", "JavaScript", "TypeScript", "Redux", "HTML/CSS"], posted: "3 days ago", isNew: true, category: "frontend", description: "Join our frontend team to build modern web applications using React.js.", requirements: ["2+ years React experience", "Strong JavaScript skills", "Knowledge of state management"], responsibilities: ["Develop React components", "Implement responsive designs", "Optimize performance", "Write clean code"] },
      { id: "tcs4", title: "Data Analyst", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "1-3 years", salary: "4 - 8 LPA", skills: ["Python", "SQL", "Tableau", "Power BI", "Excel"], posted: "4 days ago", isNew: false, category: "data", description: "Analyze data to provide business insights and support decision-making processes.", requirements: ["1+ years data analysis experience", "Strong SQL skills", "Visualization tool experience"], responsibilities: ["Analyze large datasets", "Create dashboards", "Generate reports", "Present insights to stakeholders"] },
      { id: "tcs5", title: "DevOps Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"], posted: "5 days ago", isNew: false, category: "devops", description: "Build and maintain CI/CD pipelines and cloud infrastructure.", requirements: ["3+ years DevOps experience", "Strong AWS knowledge", "Container orchestration experience"], responsibilities: ["Manage cloud infrastructure", "Build CI/CD pipelines", "Automate deployments", "Monitor systems"] },
      { id: "tcs6", title: "Python Developer", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Python", "Django", "Flask", "REST APIs", "PostgreSQL"], posted: "1 week ago", isNew: false, category: "backend", description: "Develop backend services and APIs using Python frameworks.", requirements: ["2+ years Python experience", "Django/Flask knowledge", "Database experience"], responsibilities: ["Build Python applications", "Design APIs", "Write tests", "Code reviews"] },
      { id: "tcs7", title: "ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"], posted: "3 days ago", isNew: true, category: "ai", description: "Build and deploy machine learning models for enterprise solutions.", requirements: ["3+ years ML experience", "Strong Python skills", "Experience with ML frameworks"], responsibilities: ["Develop ML models", "Train and optimize models", "Deploy to production", "Research new techniques"] },
      { id: "tcs8", title: "Full Stack Developer", location: "Kochi, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 15 LPA", skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Work on end-to-end development of web applications.", requirements: ["3+ years full stack experience", "MERN stack proficiency", "Strong problem-solving skills"], responsibilities: ["Full stack development", "API design", "Database management", "Technical documentation"] },
      { id: "tcs9", title: "Cloud Architect", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "25 - 40 LPA", skills: ["AWS", "Azure", "GCP", "Architecture", "Microservices"], posted: "1 week ago", isNew: false, category: "devops", description: "Design and implement cloud solutions for enterprise clients.", requirements: ["8+ years experience", "Cloud certifications", "Architecture experience"], responsibilities: ["Design cloud architectures", "Lead technical teams", "Client consultations", "Best practices implementation"] },
      { id: "tcs10", title: "Angular Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "5 - 11 LPA", skills: ["Angular", "TypeScript", "RxJS", "NgRx", "HTML/CSS"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build enterprise web applications using Angular framework.", requirements: ["2+ years Angular experience", "TypeScript proficiency", "Understanding of RxJS"], responsibilities: ["Develop Angular applications", "Component development", "State management", "Unit testing"] },
      { id: "tcs11", title: "Security Analyst", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Cybersecurity", "SIEM", "Vulnerability Assessment", "Incident Response"], posted: "5 days ago", isNew: false, category: "security", description: "Monitor and protect organization's IT infrastructure from security threats.", requirements: ["2+ years security experience", "Security certifications preferred", "Knowledge of security tools"], responsibilities: ["Security monitoring", "Incident response", "Vulnerability assessments", "Security reporting"] },
      { id: "tcs12", title: "Android Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "6 - 12 LPA", skills: ["Android", "Kotlin", "Java", "MVVM", "REST APIs"], posted: "6 days ago", isNew: false, category: "mobile", description: "Develop and maintain Android mobile applications.", requirements: ["2+ years Android experience", "Kotlin proficiency", "Published apps preferred"], responsibilities: ["Android app development", "UI implementation", "API integration", "Play Store deployment"] },
    ],
  },
  {
    name: "Infosys",
    logo: "https://logo.clearbit.com/infosys.com",
    industry: "IT Services & Consulting",
    description: "Infosys Limited is an Indian multinational IT company that provides business consulting, information technology and outsourcing services. Headquartered in Bangalore, it is one of the largest IT companies in India.",
    employees: "340,000+",
    headquarters: "Bangalore, India",
    indianOffices: ["Bangalore", "Pune", "Chennai", "Hyderabad", "Mumbai", "Mysore", "Bhubaneswar", "Mangalore"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Stock Options", "Onsite Opportunities", "Training Programs", "Flexible Work", "Wellness Programs"],
    color: "from-blue-600 to-blue-400",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "inf1", title: "Systems Engineer", location: "Mysore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.6 - 4.2 LPA", skills: ["Java", "Python", "C++", "SQL", "Problem Solving"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your IT career with Infosys as a Systems Engineer.", requirements: ["B.Tech/BE/MCA", "60% aggregate", "Strong analytical skills"], responsibilities: ["Software development", "Testing", "Documentation", "Team collaboration"] },
      { id: "inf2", title: "Senior Java Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "12 - 20 LPA", skills: ["Java", "Spring Boot", "Microservices", "Kafka", "AWS"], posted: "2 days ago", isNew: true, category: "backend", description: "Lead Java development for enterprise applications.", requirements: ["5+ years Java experience", "Microservices architecture", "Cloud experience"], responsibilities: ["Lead development", "Code reviews", "Architecture design", "Mentoring"] },
      { id: "inf3", title: "Data Scientist", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Python", "Machine Learning", "SQL", "Statistics", "TensorFlow"], posted: "3 days ago", isNew: true, category: "data", description: "Apply data science techniques to solve business problems.", requirements: ["3+ years data science experience", "Strong statistics background", "ML expertise"], responsibilities: ["Build ML models", "Data analysis", "Insights generation", "Stakeholder presentations"] },
      { id: "inf4", title: "React Native Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Native Modules"], posted: "4 days ago", isNew: false, category: "mobile", description: "Build cross-platform mobile applications using React Native.", requirements: ["2+ years React Native experience", "Published apps", "Native development knowledge"], responsibilities: ["Mobile app development", "Cross-platform coding", "Performance optimization", "App store deployment"] },
      { id: "inf5", title: "Power Platform Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "5 - 10 LPA", skills: ["Power Apps", "Power Automate", "Power BI", "SharePoint", "Azure"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Build low-code solutions using Microsoft Power Platform.", requirements: ["2+ years Power Platform experience", "Microsoft certifications preferred", "SharePoint knowledge"], responsibilities: ["Power Apps development", "Workflow automation", "Dashboard creation", "User training"] },
      { id: "inf6", title: "AWS Cloud Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["AWS", "Terraform", "CloudFormation", "Python", "Linux"], posted: "1 week ago", isNew: false, category: "devops", description: "Design and manage AWS cloud infrastructure.", requirements: ["3+ years AWS experience", "AWS certifications", "IaC experience"], responsibilities: ["Cloud architecture", "Infrastructure management", "Cost optimization", "Security implementation"] },
      { id: "inf7", title: "UI/UX Designer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"], posted: "3 days ago", isNew: true, category: "design", description: "Design user-centered experiences for digital products.", requirements: ["2+ years UI/UX experience", "Strong portfolio", "User research skills"], responsibilities: ["UI design", "User research", "Prototyping", "Design system maintenance"] },
      { id: "inf8", title: "SAP ABAP Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["SAP ABAP", "SAP S/4HANA", "ODATA", "Fiori", "HANA DB"], posted: "6 days ago", isNew: false, category: "backend", description: "Develop and maintain SAP solutions for enterprise clients.", requirements: ["3+ years SAP ABAP experience", "S/4HANA knowledge", "Fiori development experience"], responsibilities: ["ABAP development", "SAP customization", "Technical design", "Testing and debugging"] },
      { id: "inf9", title: "AI/ML Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"], posted: "2 days ago", isNew: true, category: "ai", description: "Develop AI/ML solutions for various business domains.", requirements: ["2+ years AI/ML experience", "Strong Python skills", "Deep learning knowledge"], responsibilities: ["ML model development", "Data preprocessing", "Model deployment", "Research and prototyping"] },
      { id: "inf10", title: "Technical Lead", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "20 - 35 LPA", skills: ["Java", "Microservices", "AWS", "Architecture", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Lead technical teams and drive architecture decisions.", requirements: ["8+ years development experience", "Team leadership experience", "Strong architecture skills"], responsibilities: ["Technical leadership", "Architecture design", "Team mentoring", "Stakeholder management"] },
      { id: "inf11", title: "Automation Tester", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "5 - 10 LPA", skills: ["Selenium", "Java", "TestNG", "Cucumber", "CI/CD"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Develop and maintain automated test suites.", requirements: ["2+ years automation experience", "Selenium proficiency", "Programming skills"], responsibilities: ["Test automation", "Framework development", "CI/CD integration", "Test reporting"] },
      { id: "inf12", title: "Blockchain Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Blockchain", "Solidity", "Ethereum", "Smart Contracts", "Web3"], posted: "1 week ago", isNew: false, category: "backend", description: "Build blockchain solutions for enterprise clients.", requirements: ["3+ years blockchain experience", "Smart contract development", "Web3 knowledge"], responsibilities: ["Blockchain development", "Smart contract coding", "Integration", "Documentation"] },
    ],
  },
  {
    name: "Wipro",
    logo: "https://logo.clearbit.com/wipro.com",
    industry: "IT Services & Consulting",
    description: "Wipro Limited is an Indian multinational corporation that provides information technology, consulting and business process services. It is headquartered in Bangalore, Karnataka, India.",
    employees: "250,000+",
    headquarters: "Bangalore, India",
    indianOffices: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai", "Delhi NCR", "Kolkata", "Kochi"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Stock Options", "Learning Programs", "Flexible Work", "Wellness Programs", "Parental Leave"],
    color: "from-purple-500 to-purple-400",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    jobs: [
      { id: "wip1", title: "Project Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.5 - 4.5 LPA", skills: ["Java", "Python", "SQL", "Problem Solving", "Communication"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career at Wipro as a Project Engineer.", requirements: ["B.Tech/BE/MCA", "Strong fundamentals", "Good communication"], responsibilities: ["Software development", "Testing", "Documentation", "Team collaboration"] },
      { id: "wip2", title: ".NET Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: [".NET", "C#", "ASP.NET", "SQL Server", "Azure"], posted: "2 days ago", isNew: true, category: "backend", description: "Develop .NET applications for enterprise clients.", requirements: ["2+ years .NET experience", "C# proficiency", "Database skills"], responsibilities: [".NET development", "API development", "Testing", "Code reviews"] },
      { id: "wip3", title: "Data Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["Python", "Spark", "Hadoop", "SQL", "ETL"], posted: "3 days ago", isNew: true, category: "data", description: "Build data pipelines for analytics.", requirements: ["3+ years data engineering", "Big data experience", "Python skills"], responsibilities: ["Pipeline development", "Data modeling", "Performance optimization", "Data quality"] },
      { id: "wip4", title: "ServiceNow Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["ServiceNow", "JavaScript", "ITSM", "ITOM", "Workflow"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Develop ServiceNow solutions for clients.", requirements: ["2+ years ServiceNow experience", "JavaScript skills", "ITSM knowledge"], responsibilities: ["ServiceNow development", "Customization", "Integration", "Support"] },
      { id: "wip5", title: "Salesforce Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 15 LPA", skills: ["Salesforce", "Apex", "Lightning", "SOQL", "Integration"], posted: "5 days ago", isNew: false, category: "backend", description: "Build Salesforce solutions for clients.", requirements: ["2+ years Salesforce experience", "Apex proficiency", "Lightning development"], responsibilities: ["Salesforce development", "Customization", "Integration", "Support"] },
      { id: "wip6", title: "Cloud Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes"], posted: "1 week ago", isNew: false, category: "devops", description: "Build cloud solutions for clients.", requirements: ["3+ years cloud experience", "Certifications", "IaC experience"], responsibilities: ["Cloud architecture", "Migration", "Automation", "Support"] },
      { id: "wip7", title: "Angular Developer", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "5 - 10 LPA", skills: ["Angular", "TypeScript", "RxJS", "HTML/CSS", "REST APIs"], posted: "3 days ago", isNew: true, category: "frontend", description: "Build web applications using Angular.", requirements: ["2+ years Angular experience", "TypeScript proficiency", "REST API knowledge"], responsibilities: ["Frontend development", "Component design", "Testing", "Performance optimization"] },
      { id: "wip8", title: "Cybersecurity Analyst", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Security", "SIEM", "Vulnerability Assessment", "Incident Response", "Compliance"], posted: "6 days ago", isNew: false, category: "security", description: "Protect client infrastructure from threats.", requirements: ["2+ years security experience", "Security tools knowledge", "Certifications preferred"], responsibilities: ["Security monitoring", "Incident response", "Vulnerability assessments", "Reporting"] },
      { id: "wip9", title: "AI Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 20 LPA", skills: ["Python", "TensorFlow", "Machine Learning", "NLP", "Deep Learning"], posted: "1 week ago", isNew: false, category: "ai", description: "Build AI solutions for clients.", requirements: ["3+ years AI experience", "Strong Python", "ML frameworks"], responsibilities: ["AI model development", "Deployment", "Client solutions", "Research"] },
      { id: "wip10", title: "Full Stack Developer", location: "Kolkata, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 15 LPA", skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Build end-to-end applications.", requirements: ["3+ years full stack experience", "MERN stack", "Database skills"], responsibilities: ["Full stack development", "API design", "Database management", "Testing"] },
      { id: "wip11", title: "QA Lead", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "12 - 22 LPA", skills: ["Test Management", "Automation", "Selenium", "Agile", "Leadership"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Lead QA teams and ensure quality.", requirements: ["5+ years QA experience", "Leadership skills", "Automation expertise"], responsibilities: ["QA leadership", "Test strategy", "Team management", "Process improvement"] },
      { id: "wip12", title: "iOS Developer", location: "Kochi, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Swift", "iOS", "UIKit", "Core Data", "REST APIs"], posted: "1 week ago", isNew: false, category: "mobile", description: "Develop iOS applications for clients.", requirements: ["2+ years iOS experience", "Swift proficiency", "Published apps preferred"], responsibilities: ["iOS development", "Feature implementation", "Bug fixing", "App Store deployment"] },
    ],
  },
]

export function TopCompaniesSection() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [selectedJob, setSelectedJob] = useState<CompanyJob | null>(null)
  const [activeSkillFilter, setActiveSkillFilter] = useState("all")
  const [activeIndustryFilter, setActiveIndustryFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [subscribedCompanies, setSubscribedCompanies] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState<Array<{ id: string; company: string; job: string; location: string; time: Date; read: boolean }>>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [applicationStep, setApplicationStep] = useState(1)
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    experience: "",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    coverLetter: "",
    resume: null as File | null,
  })
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false)
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(undefined)
  const [interviewTime, setInterviewTime] = useState("")
  const [interviewType, setInterviewType] = useState<"video" | "phone" | "onsite">("video")
  const [showMyApplications, setShowMyApplications] = useState(false)

  // Get unique industries
  const industries = Array.from(new Set(companies.map(c => c.industry)))

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const matchesIndustry = activeIndustryFilter === "all" || company.industry === activeIndustryFilter
    const matchesSearch = searchQuery === "" || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.jobs.some(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    return matchesIndustry && matchesSearch
  })

  // Get total jobs count
  const totalJobs = companies.reduce((acc, company) => acc + company.jobs.length, 0)
  const newJobsCount = companies.reduce((acc, company) => acc + company.jobs.filter(j => j.isNew).length, 0)

  // Toggle company subscription
  const toggleSubscription = useCallback((companyName: string) => {
    setSubscribedCompanies(prev => {
      const newSet = new Set(prev)
      if (newSet.has(companyName)) {
        newSet.delete(companyName)
      } else {
        newSet.add(companyName)
      }
      return newSet
    })
  }, [])

  // Simulate new job notifications for subscribed companies
  useEffect(() => {
    if (subscribedCompanies.size === 0) return

    const interval = setInterval(() => {
      const subscribedList = Array.from(subscribedCompanies)
      const randomCompanyName = subscribedList[Math.floor(Math.random() * subscribedList.length)]
      const company = companies.find(c => c.name === randomCompanyName)
      if (company) {
        const randomJob = company.jobs[Math.floor(Math.random() * company.jobs.length)]
        setNotifications(prev => [{
          id: `notif-${Date.now()}`,
          company: company.name,
          job: randomJob.title,
          location: randomJob.location,
          time: new Date(),
          read: false,
        }, ...prev.slice(0, 9)])
      }
    }, 30000) // Every 30 seconds for demo

    return () => clearInterval(interval)
  }, [subscribedCompanies])

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length

  // Mark all notifications as read
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  // Filter jobs within a company
  const getFilteredJobs = (company: Company) => {
    return company.jobs.filter(job => {
      const matchesSkill = activeSkillFilter === "all" || job.category === activeSkillFilter
      return matchesSkill
    })
  }

  // Handle job application
  const handleApply = (job: CompanyJob, company: Company) => {
    setSelectedJob(job)
    setSelectedCompany(company)
    setShowApplicationModal(true)
    setApplicationStep(1)
  }

  // Submit application
  const submitApplication = () => {
    if (!selectedJob || !selectedCompany) return

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId: selectedJob.id,
      companyName: selectedCompany.name,
      jobTitle: selectedJob.title,
      status: "applied",
      appliedDate: new Date(),
    }

    setApplications(prev => [newApplication, ...prev])
    setShowApplicationModal(false)
    setApplicationStep(1)
    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      portfolio: "",
      experience: "",
      currentCompany: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      coverLetter: "",
      resume: null,
    })

    // Show success notification
    setNotifications(prev => [{
      id: `notif-${Date.now()}`,
      company: selectedCompany.name,
      job: `Application submitted for ${selectedJob.title}`,
      location: selectedJob.location,
      time: new Date(),
      read: false,
    }, ...prev])
  }

  // Schedule interview
  const scheduleInterview = (applicationId: string) => {
    if (!interviewDate || !interviewTime) return

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: "interview_scheduled",
          interviewDate,
          interviewTime,
          interviewType,
        }
      }
      return app
    }))

    setShowInterviewScheduler(false)
    setInterviewDate(undefined)
    setInterviewTime("")
  }

  return (
    <section id="top-companies" className="relative overflow-hidden bg-background py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 px-4 py-1.5 text-primary">
            <Building2 className="mr-2 h-4 w-4" />
            Top 15 MNCs Hiring Now
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Dream Companies, Real Opportunities
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore {totalJobs}+ job openings from the world&apos;s leading companies. Apply directly and track your applications.
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">{companies.length}</span> Companies
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">{totalJobs}</span> Open Positions
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-foreground">{newJobsCount}</span> New This Week
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowMyApplications(true)}
            >
              <FileText className="h-4 w-4" />
              My Applications ({applications.length})
            </Button>
            {/* Notifications Bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <Card className="absolute right-0 top-full z-50 mt-2 w-80 border-border/50 bg-background shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllRead}>
                        Mark all read
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="max-h-80 overflow-y-auto p-0">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-sm text-muted-foreground">
                        No notifications yet. Subscribe to companies to get job alerts!
                      </p>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`border-b border-border/50 p-3 last:border-0 ${!notif.read ? "bg-primary/5" : ""}`}
                        >
                          <p className="text-sm font-medium">{notif.company}</p>
                          <p className="text-xs text-muted-foreground">{notif.job}</p>
                          <p className="text-xs text-muted-foreground">{notif.location}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies, jobs, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={activeIndustryFilter} onValueChange={setActiveIndustryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skill Filters */}
          <div className="flex flex-wrap gap-2">
            {skillCategories.map(cat => (
              <Button
                key={cat.id}
                variant={activeSkillFilter === cat.id ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => setActiveSkillFilter(cat.id)}
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map(company => {
            const filteredJobs = getFilteredJobs(company)
            const newJobsInCompany = filteredJobs.filter(j => j.isNew).length

            return (
              <Card
                key={company.name}
                className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                onClick={() => setSelectedCompany(company)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${company.bgColor}`}>
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-8 w-8 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${company.name}&background=random`
                          }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {newJobsInCompany > 0 && (
                        <Badge className="bg-green-500/10 text-green-500">
                          {newJobsInCompany} New
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSubscription(company.name)
                        }}
                      >
                        {subscribedCompanies.has(company.name) ? (
                          <BellOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Bell className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {company.employees}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {company.indianOffices.slice(0, 3).join(", ")}
                      {company.indianOffices.length > 3 && ` +${company.indianOffices.length - 3}`}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-foreground">
                      {filteredJobs.length} Open Positions
                    </p>
                    <div className="mt-2 space-y-1">
                      {filteredJobs.slice(0, 3).map(job => (
                        <div key={job.id} className="flex items-center justify-between text-xs">
                          <span className="truncate text-muted-foreground">{job.title}</span>
                          <span className="ml-2 text-primary">{job.salary}</span>
                        </div>
                      ))}
                      {filteredJobs.length > 3 && (
                        <p className="text-xs text-primary">
                          +{filteredJobs.length - 3} more positions
                        </p>
                      )}
                    </div>
                  </div>

                  <Button className="w-full gap-2" size="sm">
                    View All Jobs
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Company Detail Modal */}
        <Dialog open={!!selectedCompany && !showApplicationModal} onOpenChange={(open) => !open && setSelectedCompany(null)}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            {selectedCompany && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${selectedCompany.bgColor}`}>
                      <img
                        src={selectedCompany.logo}
                        alt={selectedCompany.name}
                        className="h-10 w-10 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedCompany.name}&background=random`
                        }}
                      />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedCompany.name}</DialogTitle>
                      <DialogDescription>{selectedCompany.industry}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="jobs" className="mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="jobs">Jobs ({getFilteredJobs(selectedCompany).length})</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  </TabsList>

                  <TabsContent value="jobs" className="mt-4">
                    {/* Skill Filter for Jobs */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {skillCategories.map(cat => (
                        <Button
                          key={cat.id}
                          variant={activeSkillFilter === cat.id ? "default" : "outline"}
                          size="sm"
                          className="gap-1 text-xs"
                          onClick={() => setActiveSkillFilter(cat.id)}
                        >
                          <cat.icon className="h-3 w-3" />
                          {cat.name}
                        </Button>
                      ))}
                    </div>

                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3 pr-4">
                        {getFilteredJobs(selectedCompany).map(job => (
                          <Card key={job.id} className="border-border/50">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">{job.title}</h4>
                                    {job.isNew && (
                                      <Badge className="bg-green-500/10 text-green-500">New</Badge>
                                    )}
                                  </div>
                                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Briefcase className="h-3 w-3" />
                                      {job.type}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <GraduationCap className="h-3 w-3" />
                                      {job.experienceLevel}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <IndianRupee className="h-3 w-3" />
                                      {job.salary}
                                    </span>
                                  </div>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {job.skills.slice(0, 5).map(skill => (
                                      <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                    {job.skills.length > 5 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{job.skills.length - 5}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    Posted {job.posted}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  className="ml-4 gap-1"
                                  onClick={() => handleApply(job, selectedCompany)}
                                >
                                  Apply Now
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="about" className="mt-4">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{selectedCompany.description}</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="font-semibold">Headquarters</h4>
                          <p className="text-sm text-muted-foreground">{selectedCompany.headquarters}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Employees</h4>
                          <p className="text-sm text-muted-foreground">{selectedCompany.employees}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <h4 className="font-semibold">Indian Offices</h4>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {selectedCompany.indianOffices.map(office => (
                              <Badge key={office} variant="secondary">{office}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="benefits" className="mt-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedCompany.benefits.map(benefit => (
                        <div key={benefit} className="flex items-center gap-2 rounded-lg border border-border/50 p-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => toggleSubscription(selectedCompany.name)}
                  >
                    {subscribedCompanies.has(selectedCompany.name) ? (
                      <>
                        <BellOff className="h-4 w-4" />
                        Unsubscribe from Alerts
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4" />
                        Subscribe to Job Alerts
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" onClick={() => setSelectedCompany(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Application Modal */}
        <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Apply for {selectedJob?.title}
              </DialogTitle>
              <DialogDescription>
                {selectedCompany?.name} - {selectedJob?.location}
              </DialogDescription>
            </DialogHeader>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm">
                <span className={applicationStep >= 1 ? "text-primary" : "text-muted-foreground"}>Personal Info</span>
                <span className={applicationStep >= 2 ? "text-primary" : "text-muted-foreground"}>Documents</span>
                <span className={applicationStep >= 3 ? "text-primary" : "text-muted-foreground"}>Review</span>
              </div>
              <Progress value={(applicationStep / 3) * 100} className="mt-2" />
            </div>

            {applicationStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={applicationForm.fullName}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn Profile</Label>
                    <Input
                      value={applicationForm.linkedin}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Experience *</Label>
                    <Select
                      value={applicationForm.experience}
                      onValueChange={(value) => setApplicationForm(prev => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-4">2-4 years</SelectItem>
                        <SelectItem value="4-6">4-6 years</SelectItem>
                        <SelectItem value="6-8">6-8 years</SelectItem>
                        <SelectItem value="8-10">8-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notice Period *</Label>
                    <Select
                      value={applicationForm.noticePeriod}
                      onValueChange={(value) => setApplicationForm(prev => ({ ...prev, noticePeriod: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="15-days">15 Days</SelectItem>
                        <SelectItem value="30-days">30 Days</SelectItem>
                        <SelectItem value="60-days">60 Days</SelectItem>
                        <SelectItem value="90-days">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Current CTC (LPA)</Label>
                    <Input
                      value={applicationForm.currentCTC}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, currentCTC: e.target.value }))}
                      placeholder="e.g., 8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected CTC (LPA) *</Label>
                    <Input
                      value={applicationForm.expectedCTC}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, expectedCTC: e.target.value }))}
                      placeholder="e.g., 12"
                    />
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setApplicationStep(2)}
                  disabled={!applicationForm.fullName || !applicationForm.email || !applicationForm.phone || !applicationForm.experience || !applicationForm.noticePeriod || !applicationForm.expectedCTC}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {applicationStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Resume *</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-8">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop your resume or click to browse
                      </p>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="mt-4"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setApplicationForm(prev => ({ ...prev, resume: e.target.files![0] }))
                          }
                        }}
                      />
                      {applicationForm.resume && (
                        <p className="mt-2 text-sm text-green-500">
                          Selected: {applicationForm.resume.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cover Letter (Optional)</Label>
                  <Textarea
                    value={applicationForm.coverLetter}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                    placeholder="Tell us why you're a great fit for this role..."
                    rows={5}
                  />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setApplicationStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setApplicationStep(3)}
                    disabled={!applicationForm.resume}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {applicationStep === 3 && (
              <div className="space-y-4">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold">Application Summary</h4>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{applicationForm.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{applicationForm.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{applicationForm.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span>{applicationForm.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Notice Period:</span>
                        <span>{applicationForm.noticePeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expected CTC:</span>
                        <span>{applicationForm.expectedCTC} LPA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Resume:</span>
                        <span>{applicationForm.resume?.name}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-semibold text-green-500">Ready to Submit</h4>
                        <p className="text-sm text-muted-foreground">
                          Your application will be sent to {selectedCompany?.name} for the {selectedJob?.title} position.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setApplicationStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-1 gap-2" onClick={submitApplication}>
                    <Send className="h-4 w-4" />
                    Submit Application
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* My Applications Modal */}
        <Dialog open={showMyApplications} onOpenChange={setShowMyApplications}>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>My Applications</DialogTitle>
              <DialogDescription>
                Track your job applications and schedule interviews
              </DialogDescription>
            </DialogHeader>

            {applications.length === 0 ? (
              <div className="py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">No applications yet</p>
                <p className="text-sm text-muted-foreground">Start applying to jobs to track them here</p>
              </div>
            ) : (
              <ScrollArea className="h-[500px]">
                <div className="space-y-4 pr-4">
                  {applications.map(app => (
                    <Card key={app.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{app.jobTitle}</h4>
                            <p className="text-sm text-muted-foreground">{app.companyName}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Applied on {app.appliedDate.toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            className={
                              app.status === "applied" ? "bg-blue-500/10 text-blue-500" :
                              app.status === "screening" ? "bg-yellow-500/10 text-yellow-500" :
                              app.status === "interview_scheduled" ? "bg-purple-500/10 text-purple-500" :
                              app.status === "interview_completed" ? "bg-cyan-500/10 text-cyan-500" :
                              app.status === "offer" ? "bg-green-500/10 text-green-500" :
                              "bg-red-500/10 text-red-500"
                            }
                          >
                            {app.status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        </div>

                        {app.status === "interview_scheduled" && app.interviewDate && (
                          <div className="mt-3 rounded-lg bg-purple-500/10 p-3">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="h-4 w-4 text-purple-500" />
                              <span>Interview on {app.interviewDate.toLocaleDateString()} at {app.interviewTime}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm">
                              {app.interviewType === "video" && <Video className="h-4 w-4 text-purple-500" />}
                              {app.interviewType === "phone" && <MessageSquare className="h-4 w-4 text-purple-500" />}
                              {app.interviewType === "onsite" && <Building2 className="h-4 w-4 text-purple-500" />}
                              <span className="capitalize">{app.interviewType} Interview</span>
                            </div>
                          </div>
                        )}

                        {app.status === "applied" && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => {
                                setApplications(prev => prev.map(a =>
                                  a.id === app.id ? { ...a, status: "screening" } : a
                                ))
                              }}
                            >
                              <Loader2 className="h-4 w-4" />
                              Simulate: Move to Screening
                            </Button>
                          </div>
                        )}

                        {app.status === "screening" && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              className="gap-2"
                              onClick={() => {
                                setShowInterviewScheduler(true)
                                setSelectedJob({ id: app.jobId } as CompanyJob)
                              }}
                            >
                              <CalendarIcon className="h-4 w-4" />
                              Schedule Interview
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>

        {/* Interview Scheduler Modal */}
        <Dialog open={showInterviewScheduler} onOpenChange={setShowInterviewScheduler}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Select your preferred date, time, and interview type
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Interview Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={interviewType === "video" ? "default" : "outline"}
                    className="gap-2"
                    onClick={() => setInterviewType("video")}
                  >
                    <Video className="h-4 w-4" />
                    Video
                  </Button>
                  <Button
                    variant={interviewType === "phone" ? "default" : "outline"}
                    className="gap-2"
                    onClick={() => setInterviewType("phone")}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Phone
                  </Button>
                  <Button
                    variant={interviewType === "onsite" ? "default" : "outline"}
                    className="gap-2"
                    onClick={() => setInterviewType("onsite")}
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
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={interviewTime} onValueChange={setInterviewTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full gap-2"
                disabled={!interviewDate || !interviewTime}
                onClick={() => {
                  const appToUpdate = applications.find(a => a.jobId === selectedJob?.id && a.status === "screening")
                  if (appToUpdate) {
                    scheduleInterview(appToUpdate.id)
                  }
                }}
              >
                <Check className="h-4 w-4" />
                Confirm Interview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
