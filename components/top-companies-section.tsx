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

// All 15 MNCs with comprehensive job listings
const companies: Company[] = [
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    industry: "Technology",
    description: "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and artificial intelligence.",
    employees: "190,000+",
    headquarters: "Mountain View, California",
    indianOffices: ["Bangalore", "Hyderabad", "Mumbai", "Gurgaon"],
    benefits: ["Health Insurance", "Life Insurance", "401k Matching", "Free Meals", "Gym Membership", "Parental Leave", "Education Reimbursement", "Stock Options", "Remote Work", "Mental Health Support"],
    color: "from-blue-500 to-green-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "ggl1", title: "Software Engineer L3", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "25 - 45 LPA", skills: ["Java", "Python", "Go", "Distributed Systems", "Data Structures"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Build next-generation products that help users organize the world's information.", requirements: ["BS in Computer Science or equivalent", "2+ years coding experience", "Strong problem-solving skills"], responsibilities: ["Design and implement software solutions", "Write high-quality code", "Collaborate with cross-functional teams", "Participate in code reviews"] },
      { id: "ggl2", title: "Software Engineer L4", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "40 - 70 LPA", skills: ["C++", "Python", "Machine Learning", "System Design", "Leadership"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Lead technical initiatives and mentor junior engineers.", requirements: ["MS/BS in CS or equivalent", "4+ years experience", "Technical leadership experience"], responsibilities: ["Lead technical projects", "Design complex systems", "Mentor team members", "Drive technical decisions"] },
      { id: "ggl3", title: "Machine Learning Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 60 LPA", skills: ["TensorFlow", "PyTorch", "Python", "Deep Learning", "NLP"], posted: "3 days ago", isNew: true, category: "ai", description: "Build ML models that power Google's AI products.", requirements: ["MS/PhD in ML/AI", "Strong ML fundamentals", "Published research preferred"], responsibilities: ["Develop ML models", "Train and deploy models", "Research new techniques", "Collaborate with researchers"] },
      { id: "ggl4", title: "Frontend Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "22 - 42 LPA", skills: ["JavaScript", "TypeScript", "React", "Angular", "Web Performance"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build beautiful, responsive web applications for billions of users.", requirements: ["Strong JavaScript skills", "Experience with modern frameworks", "Performance optimization experience"], responsibilities: ["Develop frontend applications", "Optimize performance", "Implement responsive designs", "Write maintainable code"] },
      { id: "ggl5", title: "Site Reliability Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 65 LPA", skills: ["Linux", "Kubernetes", "Go", "Python", "Distributed Systems"], posted: "5 days ago", isNew: false, category: "devops", description: "Keep Google's services running 24/7 for billions of users.", requirements: ["4+ years SRE/DevOps experience", "Strong Linux skills", "Kubernetes expertise"], responsibilities: ["Ensure service reliability", "Automate operations", "Incident response", "Capacity planning"] },
      { id: "ggl6", title: "Data Scientist", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["Python", "SQL", "Statistics", "Machine Learning", "BigQuery"], posted: "1 week ago", isNew: false, category: "data", description: "Extract insights from massive datasets to drive product decisions.", requirements: ["MS in Statistics/Math/CS", "Strong SQL skills", "Statistical modeling experience"], responsibilities: ["Analyze large datasets", "Build statistical models", "Present insights", "Drive data-informed decisions"] },
      { id: "ggl7", title: "Android Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "28 - 50 LPA", skills: ["Kotlin", "Java", "Android SDK", "Jetpack Compose", "MVVM"], posted: "4 days ago", isNew: false, category: "mobile", description: "Build Android apps used by billions of people worldwide.", requirements: ["3+ years Android experience", "Kotlin proficiency", "Published apps"], responsibilities: ["Develop Android applications", "Implement Material Design", "Optimize performance", "Write unit tests"] },
      { id: "ggl8", title: "Cloud Solutions Architect", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "45 - 80 LPA", skills: ["GCP", "AWS", "Architecture", "Kubernetes", "Terraform"], posted: "1 week ago", isNew: false, category: "devops", description: "Design cloud solutions for enterprise customers.", requirements: ["6+ years cloud experience", "GCP certifications", "Architecture experience"], responsibilities: ["Design cloud architectures", "Customer consultations", "Technical presentations", "Solution implementation"] },
      { id: "ggl9", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 60 LPA", skills: ["Security", "Penetration Testing", "Python", "Network Security", "Cloud Security"], posted: "5 days ago", isNew: false, category: "security", description: "Protect Google's infrastructure and users from security threats.", requirements: ["4+ years security experience", "Security certifications", "Coding skills"], responsibilities: ["Security assessments", "Vulnerability research", "Incident response", "Security tooling development"] },
      { id: "ggl10", title: "UX Designer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"], posted: "6 days ago", isNew: false, category: "design", description: "Design intuitive experiences for Google's products.", requirements: ["3+ years UX experience", "Strong portfolio", "Research skills"], responsibilities: ["User research", "Interface design", "Prototyping", "Usability testing"] },
      { id: "ggl11", title: "Technical Program Manager", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "38 - 65 LPA", skills: ["Program Management", "Technical Background", "Agile", "Communication", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive complex technical programs across Google.", requirements: ["5+ years TPM experience", "Technical background", "Strong communication"], responsibilities: ["Program management", "Cross-functional coordination", "Risk management", "Stakeholder communication"] },
      { id: "ggl12", title: "Research Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "50 - 90 LPA", skills: ["Machine Learning", "Deep Learning", "Research", "Python", "Publications"], posted: "3 days ago", isNew: true, category: "ai", description: "Conduct cutting-edge research in AI/ML at Google Research.", requirements: ["PhD in ML/AI", "Strong publication record", "Research experience"], responsibilities: ["Conduct original research", "Publish papers", "Prototype new ideas", "Collaborate with teams"] },
    ],
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    industry: "Technology",
    description: "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services.",
    employees: "220,000+",
    headquarters: "Redmond, Washington",
    indianOffices: ["Hyderabad", "Bangalore", "Noida", "Pune"],
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Awards", "Parental Leave", "Education Benefits", "Wellness Programs", "Remote Work", "Employee Discounts"],
    color: "from-blue-600 to-cyan-500",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "ms1", title: "Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "20 - 40 LPA", skills: ["C#", ".NET", "Azure", "SQL Server", "Microservices"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Build software solutions using Microsoft technologies.", requirements: ["BS in CS or equivalent", "2+ years experience", ".NET expertise"], responsibilities: ["Develop software solutions", "Design systems", "Code reviews", "Team collaboration"] },
      { id: "ms2", title: "Senior Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 60 LPA", skills: ["C++", "Azure", "Distributed Systems", "System Design", "Leadership"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Lead development of Azure services.", requirements: ["5+ years experience", "Distributed systems knowledge", "Leadership experience"], responsibilities: ["Lead development", "Architecture design", "Mentor engineers", "Drive technical decisions"] },
      { id: "ms3", title: "Azure Cloud Engineer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 35 LPA", skills: ["Azure", "ARM Templates", "PowerShell", "Kubernetes", "Terraform"], posted: "3 days ago", isNew: true, category: "devops", description: "Design and implement Azure cloud solutions.", requirements: ["3+ years Azure experience", "Azure certifications", "IaC experience"], responsibilities: ["Cloud architecture", "Infrastructure automation", "Cost optimization", "Security implementation"] },
      { id: "ms4", title: "Data Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 38 LPA", skills: ["Azure Data Factory", "Databricks", "Python", "SQL", "Spark"], posted: "4 days ago", isNew: false, category: "data", description: "Build data pipelines and analytics solutions.", requirements: ["3+ years data engineering experience", "Azure data services knowledge", "Big data experience"], responsibilities: ["Build data pipelines", "Data modeling", "ETL processes", "Performance optimization"] },
      { id: "ms5", title: "AI Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "28 - 50 LPA", skills: ["Python", "Azure ML", "TensorFlow", "NLP", "Computer Vision"], posted: "5 days ago", isNew: false, category: "ai", description: "Build AI solutions using Azure AI services.", requirements: ["3+ years AI/ML experience", "Azure ML knowledge", "Deep learning experience"], responsibilities: ["Develop AI models", "Azure AI implementation", "Model deployment", "Research and prototyping"] },
      { id: "ms6", title: "React Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "15 - 30 LPA", skills: ["React", "TypeScript", "Redux", "GraphQL", "Azure DevOps"], posted: "1 week ago", isNew: false, category: "frontend", description: "Build modern web applications using React.", requirements: ["2+ years React experience", "TypeScript proficiency", "State management knowledge"], responsibilities: ["Frontend development", "Component design", "Performance optimization", "Testing"] },
      { id: "ms7", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 35 LPA", skills: ["Azure DevOps", "Kubernetes", "Docker", "CI/CD", "PowerShell"], posted: "4 days ago", isNew: false, category: "devops", description: "Build and maintain CI/CD pipelines.", requirements: ["3+ years DevOps experience", "Azure DevOps expertise", "Container orchestration experience"], responsibilities: ["CI/CD implementation", "Infrastructure automation", "Monitoring", "Incident management"] },
      { id: "ms8", title: "Product Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 60 LPA", skills: ["Product Management", "Agile", "Data Analysis", "Technical Background", "Communication"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive product strategy for Microsoft products.", requirements: ["5+ years PM experience", "Technical background", "Strong communication"], responsibilities: ["Product strategy", "Roadmap planning", "Stakeholder management", "Data-driven decisions"] },
      { id: "ms9", title: "Security Analyst", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "15 - 30 LPA", skills: ["Azure Security", "SIEM", "Incident Response", "Threat Analysis", "Compliance"], posted: "5 days ago", isNew: false, category: "security", description: "Protect Microsoft's cloud infrastructure.", requirements: ["2+ years security experience", "Azure security knowledge", "Security certifications"], responsibilities: ["Security monitoring", "Incident response", "Threat analysis", "Security reporting"] },
      { id: "ms10", title: "iOS Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 40 LPA", skills: ["Swift", "Objective-C", "iOS SDK", "Core Data", "SwiftUI"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build iOS apps for Microsoft's mobile products.", requirements: ["3+ years iOS experience", "Swift proficiency", "Published apps"], responsibilities: ["iOS development", "Feature implementation", "Performance optimization", "App Store deployment"] },
      { id: "ms11", title: "Power BI Developer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "12 - 25 LPA", skills: ["Power BI", "DAX", "SQL", "Data Modeling", "ETL"], posted: "3 days ago", isNew: true, category: "data", description: "Build business intelligence solutions using Power BI.", requirements: ["2+ years Power BI experience", "DAX proficiency", "SQL skills"], responsibilities: ["Dashboard development", "Report creation", "Data modeling", "Performance tuning"] },
      { id: "ms12", title: "Principal Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "10+ years", salary: "55 - 95 LPA", skills: ["Architecture", "C++", "Azure", "Leadership", "System Design"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Lead architecture for critical Microsoft services.", requirements: ["10+ years experience", "Architecture expertise", "Technical leadership"], responsibilities: ["Architecture leadership", "Technical strategy", "Team mentorship", "Cross-team collaboration"] },
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
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Awards", "Parental Leave", "Career Development", "Employee Discounts", "Relocation Assistance"],
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    jobs: [
      { id: "amz1", title: "SDE I", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "0-2 years", salary: "18 - 30 LPA", skills: ["Java", "Python", "Data Structures", "Algorithms", "AWS"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Build scalable systems for Amazon's services.", requirements: ["BS in CS or equivalent", "Strong coding skills", "Problem-solving ability"], responsibilities: ["Software development", "Code reviews", "Testing", "Documentation"] },
      { id: "amz2", title: "SDE II", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "28 - 50 LPA", skills: ["Java", "Distributed Systems", "AWS", "System Design", "Microservices"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Design and implement features for Amazon's platforms.", requirements: ["2+ years experience", "Strong CS fundamentals", "Distributed systems knowledge"], responsibilities: ["Feature development", "System design", "Mentoring", "Operational excellence"] },
      { id: "amz3", title: "SDE III", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "45 - 75 LPA", skills: ["Java", "Architecture", "Leadership", "AWS", "Large-scale Systems"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Lead technical initiatives for Amazon's critical systems.", requirements: ["5+ years experience", "Technical leadership", "Architecture experience"], responsibilities: ["Technical leadership", "Architecture design", "Team mentorship", "Cross-team collaboration"] },
      { id: "amz4", title: "AWS Solutions Architect", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "25 - 50 LPA", skills: ["AWS", "Architecture", "Terraform", "Kubernetes", "Networking"], posted: "4 days ago", isNew: false, category: "devops", description: "Design AWS solutions for enterprise customers.", requirements: ["4+ years AWS experience", "AWS certifications", "Customer-facing experience"], responsibilities: ["Solution design", "Customer engagement", "Technical presentations", "Best practices guidance"] },
      { id: "amz5", title: "Data Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 42 LPA", skills: ["Python", "Spark", "AWS", "Redshift", "ETL"], posted: "5 days ago", isNew: false, category: "data", description: "Build data pipelines at Amazon scale.", requirements: ["3+ years data engineering", "Big data experience", "AWS data services"], responsibilities: ["Data pipeline development", "ETL processes", "Data quality", "Performance optimization"] },
      { id: "amz6", title: "Applied Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "40 - 80 LPA", skills: ["Machine Learning", "Deep Learning", "Python", "Research", "NLP"], posted: "1 week ago", isNew: false, category: "ai", description: "Apply ML to solve Amazon's complex problems.", requirements: ["PhD in ML/AI", "Research experience", "Publication record"], responsibilities: ["ML research", "Model development", "Collaboration with teams", "Publishing papers"] },
      { id: "amz7", title: "Frontend Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "20 - 40 LPA", skills: ["React", "JavaScript", "TypeScript", "Node.js", "Web Performance"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build customer-facing experiences for Amazon.", requirements: ["2+ years frontend experience", "React expertise", "Performance optimization"], responsibilities: ["Frontend development", "User experience", "Performance optimization", "Cross-browser compatibility"] },
      { id: "amz8", title: "DevOps Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 38 LPA", skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Python"], posted: "1 week ago", isNew: false, category: "devops", description: "Build and maintain deployment pipelines.", requirements: ["3+ years DevOps experience", "AWS expertise", "Container orchestration"], responsibilities: ["CI/CD pipelines", "Infrastructure automation", "Monitoring", "Incident response"] },
      { id: "amz9", title: "Security Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["AWS Security", "Penetration Testing", "Python", "Security Automation", "Compliance"], posted: "5 days ago", isNew: false, category: "security", description: "Protect Amazon's infrastructure and customer data.", requirements: ["3+ years security experience", "AWS security knowledge", "Coding skills"], responsibilities: ["Security assessments", "Automation", "Incident response", "Security tooling"] },
      { id: "amz10", title: "Android Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-5 years", salary: "22 - 40 LPA", skills: ["Kotlin", "Java", "Android SDK", "MVVM", "Jetpack"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build Android apps for Amazon's services.", requirements: ["3+ years Android experience", "Kotlin proficiency", "Published apps"], responsibilities: ["Android development", "Feature implementation", "Testing", "Performance optimization"] },
      { id: "amz11", title: "Business Analyst", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "15 - 30 LPA", skills: ["SQL", "Excel", "Tableau", "Data Analysis", "Communication"], posted: "3 days ago", isNew: true, category: "data", description: "Drive data-informed business decisions.", requirements: ["2+ years BA experience", "Strong SQL skills", "Analytical mindset"], responsibilities: ["Data analysis", "Reporting", "Stakeholder management", "Process improvement"] },
      { id: "amz12", title: "Technical Program Manager", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 60 LPA", skills: ["Program Management", "Technical Background", "AWS", "Agile", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive large-scale technical programs.", requirements: ["5+ years TPM experience", "Technical background", "Strong communication"], responsibilities: ["Program management", "Cross-team coordination", "Risk management", "Stakeholder communication"] },
    ],
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    industry: "Consumer Electronics",
    description: "Apple Inc. is an American multinational technology company specializing in consumer electronics, software and online services headquartered in Cupertino, California.",
    employees: "160,000+",
    headquarters: "Cupertino, California",
    indianOffices: ["Hyderabad", "Bangalore"],
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Purchase Plan", "Education Reimbursement", "Wellness Programs", "Product Discounts", "Parental Leave"],
    color: "from-gray-700 to-gray-500",
    bgColor: "bg-gray-700/10",
    textColor: "text-gray-700",
    jobs: [
      { id: "apl1", title: "iOS Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["Swift", "Objective-C", "iOS SDK", "Core Data", "UIKit"], posted: "1 day ago", isNew: true, category: "mobile", description: "Build iOS features used by billions of users.", requirements: ["3+ years iOS experience", "Swift expertise", "Deep iOS knowledge"], responsibilities: ["iOS development", "Feature implementation", "Performance optimization", "Code quality"] },
      { id: "apl2", title: "macOS Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 60 LPA", skills: ["Swift", "Objective-C", "macOS", "Cocoa", "AppKit"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Develop macOS applications and frameworks.", requirements: ["4+ years macOS experience", "Strong Swift/Obj-C skills", "Deep macOS knowledge"], responsibilities: ["macOS development", "Framework development", "System integration", "Performance optimization"] },
      { id: "apl3", title: "Machine Learning Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "40 - 70 LPA", skills: ["Python", "TensorFlow", "Core ML", "Deep Learning", "Computer Vision"], posted: "3 days ago", isNew: true, category: "ai", description: "Build ML models for Apple's products.", requirements: ["4+ years ML experience", "Deep learning expertise", "iOS/macOS experience preferred"], responsibilities: ["ML model development", "On-device optimization", "Research", "Production deployment"] },
      { id: "apl4", title: "Siri Data Scientist", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 60 LPA", skills: ["Python", "NLP", "Statistics", "Machine Learning", "SQL"], posted: "4 days ago", isNew: false, category: "data", description: "Improve Siri through data analysis and ML.", requirements: ["3+ years data science experience", "NLP expertise", "Strong statistics"], responsibilities: ["NLP research", "Data analysis", "Model improvement", "Metric development"] },
      { id: "apl5", title: "Backend Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "28 - 50 LPA", skills: ["Java", "Scala", "Distributed Systems", "Cloud", "Microservices"], posted: "5 days ago", isNew: false, category: "backend", description: "Build backend services for Apple's platforms.", requirements: ["3+ years backend experience", "Distributed systems knowledge", "Cloud experience"], responsibilities: ["Backend development", "System design", "Scalability", "Reliability engineering"] },
      { id: "apl6", title: "Security Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 60 LPA", skills: ["Security", "Cryptography", "Penetration Testing", "iOS Security", "Python"], posted: "1 week ago", isNew: false, category: "security", description: "Protect Apple's products and user privacy.", requirements: ["4+ years security experience", "Cryptography knowledge", "Mobile security experience"], responsibilities: ["Security research", "Vulnerability assessment", "Security architecture", "Privacy engineering"] },
      { id: "apl7", title: "Hardware Integration Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 52 LPA", skills: ["C", "C++", "Embedded Systems", "Hardware Integration", "Testing"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Integrate hardware and software for Apple devices.", requirements: ["3+ years embedded experience", "Strong C/C++ skills", "Hardware knowledge"], responsibilities: ["Hardware-software integration", "Driver development", "Testing", "Performance optimization"] },
      { id: "apl8", title: "UX Designer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "28 - 50 LPA", skills: ["Sketch", "Figma", "Prototyping", "User Research", "iOS Design"], posted: "1 week ago", isNew: false, category: "design", description: "Design intuitive experiences for Apple products.", requirements: ["4+ years UX experience", "Strong portfolio", "Apple platform experience"], responsibilities: ["UX design", "User research", "Prototyping", "Design system contribution"] },
      { id: "apl9", title: "DevOps Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["Kubernetes", "Docker", "CI/CD", "Python", "Automation"], posted: "5 days ago", isNew: false, category: "devops", description: "Build and maintain Apple's development infrastructure.", requirements: ["3+ years DevOps experience", "Kubernetes expertise", "Automation skills"], responsibilities: ["CI/CD pipelines", "Infrastructure automation", "Tooling development", "Reliability engineering"] },
      { id: "apl10", title: "QA Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "18 - 35 LPA", skills: ["Testing", "Automation", "Swift", "XCTest", "CI/CD"], posted: "6 days ago", isNew: false, category: "fullstack", description: "Ensure quality of Apple's software products.", requirements: ["2+ years QA experience", "Automation experience", "iOS testing experience"], responsibilities: ["Test automation", "Manual testing", "Bug investigation", "Quality metrics"] },
      { id: "apl11", title: "Cloud Infrastructure Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "32 - 55 LPA", skills: ["Cloud", "Kubernetes", "Terraform", "Python", "Networking"], posted: "3 days ago", isNew: true, category: "devops", description: "Build Apple's cloud infrastructure.", requirements: ["4+ years cloud experience", "Kubernetes expertise", "IaC experience"], responsibilities: ["Infrastructure design", "Automation", "Scalability", "Cost optimization"] },
      { id: "apl12", title: "Firmware Engineer", location: "Hyderabad, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "28 - 48 LPA", skills: ["C", "Assembly", "RTOS", "Embedded Systems", "Low-level Programming"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Develop firmware for Apple devices.", requirements: ["3+ years firmware experience", "Strong C skills", "RTOS experience"], responsibilities: ["Firmware development", "Hardware bring-up", "Power optimization", "Debugging"] },
    ],
  },
  {
    name: "IBM",
    logo: "https://logo.clearbit.com/ibm.com",
    industry: "Technology & Consulting",
    description: "International Business Machines Corporation is an American multinational technology company headquartered in Armonk, New York. IBM produces and sells computer hardware, middleware and software.",
    employees: "280,000+",
    headquarters: "Armonk, New York",
    indianOffices: ["Bangalore", "Pune", "Hyderabad", "Delhi NCR", "Kolkata", "Chennai"],
    benefits: ["Health Insurance", "Life Insurance", "Retirement Plans", "Education Assistance", "Flexible Work", "Employee Assistance", "Wellness Programs", "Stock Options"],
    color: "from-blue-700 to-blue-500",
    bgColor: "bg-blue-700/10",
    textColor: "text-blue-700",
    jobs: [
      { id: "ibm1", title: "Application Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 18 LPA", skills: ["Java", "Python", "REST APIs", "SQL", "Git"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Develop enterprise applications for IBM clients.", requirements: ["2+ years development experience", "Strong coding skills", "Client-facing skills"], responsibilities: ["Application development", "Testing", "Documentation", "Client support"] },
      { id: "ibm2", title: "Cloud Solution Architect", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "25 - 45 LPA", skills: ["IBM Cloud", "AWS", "Kubernetes", "Architecture", "Terraform"], posted: "2 days ago", isNew: true, category: "devops", description: "Design cloud solutions using IBM and hybrid cloud platforms.", requirements: ["6+ years cloud experience", "Architecture experience", "IBM Cloud knowledge"], responsibilities: ["Solution architecture", "Client consultations", "Technical leadership", "Best practices"] },
      { id: "ibm3", title: "Data Scientist", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 25 LPA", skills: ["Python", "Watson", "Machine Learning", "SQL", "Statistics"], posted: "3 days ago", isNew: true, category: "data", description: "Build AI solutions using IBM Watson.", requirements: ["3+ years data science experience", "ML expertise", "Watson experience preferred"], responsibilities: ["ML model development", "Data analysis", "Watson integration", "Client delivery"] },
      { id: "ibm4", title: "SAP Consultant", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "15 - 30 LPA", skills: ["SAP", "ABAP", "S/4HANA", "SAP Fiori", "Integration"], posted: "4 days ago", isNew: false, category: "backend", description: "Implement SAP solutions for enterprise clients.", requirements: ["4+ years SAP experience", "ABAP expertise", "Implementation experience"], responsibilities: ["SAP implementation", "Customization", "Client training", "Support"] },
      { id: "ibm5", title: "Cybersecurity Consultant", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "15 - 32 LPA", skills: ["Security", "IBM QRadar", "SIEM", "Incident Response", "Risk Assessment"], posted: "5 days ago", isNew: false, category: "security", description: "Provide cybersecurity consulting services.", requirements: ["4+ years security experience", "Security certifications", "Consulting experience"], responsibilities: ["Security assessments", "Solution design", "Implementation", "Client training"] },
      { id: "ibm6", title: "Full Stack Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 22 LPA", skills: ["React", "Node.js", "Python", "MongoDB", "Docker"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Build full stack applications for various projects.", requirements: ["3+ years full stack experience", "React and Node.js", "Database experience"], responsibilities: ["Full stack development", "API design", "Testing", "Deployment"] },
      { id: "ibm7", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "14 - 28 LPA", skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Watson"], posted: "4 days ago", isNew: false, category: "ai", description: "Develop AI solutions using IBM Watson and open-source tools.", requirements: ["3+ years AI/ML experience", "Deep learning knowledge", "Python expertise"], responsibilities: ["AI model development", "Watson integration", "Research", "Client delivery"] },
      { id: "ibm8", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 22 LPA", skills: ["Jenkins", "Docker", "Kubernetes", "Ansible", "IBM Cloud"], posted: "1 week ago", isNew: false, category: "devops", description: "Implement DevOps practices for IBM projects.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Container experience"], responsibilities: ["CI/CD pipelines", "Automation", "Infrastructure management", "Monitoring"] },
      { id: "ibm9", title: "Mainframe Developer", location: "Kolkata, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 15 LPA", skills: ["COBOL", "JCL", "DB2", "CICS", "z/OS"], posted: "5 days ago", isNew: false, category: "backend", description: "Maintain and modernize mainframe applications.", requirements: ["2+ years mainframe experience", "COBOL proficiency", "DB2 knowledge"], responsibilities: ["Mainframe development", "Maintenance", "Modernization", "Documentation"] },
      { id: "ibm10", title: "Business Analyst", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Requirements Analysis", "SQL", "Agile", "Communication", "Documentation"], posted: "6 days ago", isNew: false, category: "data", description: "Bridge business and technology for IBM projects.", requirements: ["2+ years BA experience", "Strong communication", "Technical understanding"], responsibilities: ["Requirements gathering", "Analysis", "Documentation", "Stakeholder management"] },
      { id: "ibm11", title: "Quantum Computing Researcher", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "30 - 60 LPA", skills: ["Quantum Computing", "Qiskit", "Python", "Physics", "Research"], posted: "3 days ago", isNew: true, category: "ai", description: "Research quantum computing at IBM Research.", requirements: ["PhD in Physics/CS", "Quantum computing knowledge", "Research experience"], responsibilities: ["Quantum research", "Algorithm development", "Publications", "Collaboration"] },
      { id: "ibm12", title: "Technical Consultant", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "18 - 35 LPA", skills: ["Consulting", "Technical Background", "Communication", "Problem Solving", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Provide technical consulting to IBM clients.", requirements: ["5+ years technical experience", "Consulting skills", "Client management"], responsibilities: ["Client consulting", "Solution design", "Technical leadership", "Delivery management"] },
    ],
  },
  {
    name: "Intel",
    logo: "https://logo.clearbit.com/intel.com",
    industry: "Semiconductors",
    description: "Intel Corporation is an American multinational corporation and technology company. It is the world's largest semiconductor chip manufacturer by revenue.",
    employees: "130,000+",
    headquarters: "Santa Clara, California",
    indianOffices: ["Bangalore", "Hyderabad"],
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Purchase Plan", "Education Reimbursement", "Sabbatical Program", "Wellness Programs", "Flexible Work"],
    color: "from-blue-600 to-cyan-400",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "intl1", title: "Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "15 - 30 LPA", skills: ["C++", "Python", "Linux", "Debugging", "Performance"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Develop software for Intel's computing platforms.", requirements: ["2+ years experience", "Strong C++ skills", "Linux experience"], responsibilities: ["Software development", "Performance optimization", "Testing", "Documentation"] },
      { id: "intl2", title: "Firmware Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 35 LPA", skills: ["C", "Assembly", "BIOS/UEFI", "Embedded Systems", "Debugging"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Develop firmware for Intel processors.", requirements: ["3+ years firmware experience", "Strong C skills", "Low-level programming"], responsibilities: ["Firmware development", "BIOS/UEFI development", "Hardware bring-up", "Debugging"] },
      { id: "intl3", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 40 LPA", skills: ["Python", "PyTorch", "OpenVINO", "Deep Learning", "Computer Vision"], posted: "3 days ago", isNew: true, category: "ai", description: "Optimize AI workloads for Intel hardware.", requirements: ["3+ years AI/ML experience", "Deep learning expertise", "Hardware optimization experience"], responsibilities: ["AI optimization", "Model development", "Benchmarking", "Performance tuning"] },
      { id: "intl4", title: "Validation Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "12 - 25 LPA", skills: ["Testing", "Python", "Automation", "Hardware Testing", "Debugging"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Validate Intel's hardware and software products.", requirements: ["2+ years validation experience", "Automation skills", "Hardware knowledge"], responsibilities: ["Test development", "Automation", "Bug investigation", "Validation reporting"] },
      { id: "intl5", title: "Platform Architect", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "35 - 65 LPA", skills: ["Architecture", "C++", "Hardware", "System Design", "Leadership"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Define architecture for Intel platforms.", requirements: ["8+ years experience", "Architecture experience", "Strong technical leadership"], responsibilities: ["Platform architecture", "Technical leadership", "Cross-team collaboration", "Innovation"] },
      { id: "intl6", title: "Graphics Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 35 LPA", skills: ["C++", "OpenGL", "Vulkan", "Graphics", "GPU Programming"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Develop graphics drivers and software.", requirements: ["3+ years graphics experience", "GPU programming", "Driver development experience"], responsibilities: ["Driver development", "Graphics optimization", "Debugging", "Performance analysis"] },
      { id: "intl7", title: "Security Researcher", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "25 - 45 LPA", skills: ["Security", "Cryptography", "Hardware Security", "Reverse Engineering", "C/C++"], posted: "4 days ago", isNew: false, category: "security", description: "Research security for Intel's products.", requirements: ["4+ years security experience", "Hardware security knowledge", "Research experience"], responsibilities: ["Security research", "Vulnerability analysis", "Security architecture", "Publications"] },
      { id: "intl8", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "14 - 28 LPA", skills: ["Jenkins", "Docker", "Kubernetes", "Python", "Linux"], posted: "1 week ago", isNew: false, category: "devops", description: "Build CI/CD infrastructure for Intel's software.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Automation skills"], responsibilities: ["CI/CD pipelines", "Infrastructure automation", "Tooling development", "Support"] },
      { id: "intl9", title: "Compiler Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 40 LPA", skills: ["Compilers", "LLVM", "C++", "Optimization", "Assembly"], posted: "5 days ago", isNew: false, category: "backend", description: "Develop and optimize compilers for Intel architectures.", requirements: ["3+ years compiler experience", "LLVM knowledge", "Strong C++ skills"], responsibilities: ["Compiler development", "Optimization", "Performance analysis", "Documentation"] },
      { id: "intl10", title: "Machine Learning Systems Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "25 - 45 LPA", skills: ["Python", "C++", "TensorFlow", "System Design", "Performance"], posted: "6 days ago", isNew: false, category: "ai", description: "Build ML systems optimized for Intel hardware.", requirements: ["4+ years ML systems experience", "Performance optimization", "C++ and Python"], responsibilities: ["ML systems design", "Performance optimization", "Benchmarking", "Customer engagement"] },
      { id: "intl11", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "25 - 45 LPA", skills: ["Program Management", "Technical Background", "Agile", "Communication", "Leadership"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Manage complex technical programs at Intel.", requirements: ["5+ years TPM experience", "Technical background", "Strong communication"], responsibilities: ["Program management", "Cross-functional coordination", "Risk management", "Stakeholder communication"] },
      { id: "intl12", title: "Data Scientist", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 35 LPA", skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"], posted: "1 week ago", isNew: false, category: "data", description: "Apply data science to Intel's business challenges.", requirements: ["3+ years data science experience", "Strong statistics", "ML expertise"], responsibilities: ["Data analysis", "ML models", "Insights generation", "Stakeholder presentations"] },
    ],
  },
  {
    name: "Oracle",
    logo: "https://logo.clearbit.com/oracle.com",
    industry: "Enterprise Software",
    description: "Oracle Corporation is an American multinational computer technology company. The company sells database software and technology, cloud engineered systems, and enterprise software products.",
    employees: "140,000+",
    headquarters: "Austin, Texas",
    indianOffices: ["Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi NCR"],
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Purchase Plan", "Education Reimbursement", "Flexible Work", "Employee Assistance", "Wellness Programs"],
    color: "from-red-600 to-red-400",
    bgColor: "bg-red-600/10",
    textColor: "text-red-600",
    jobs: [
      { id: "orc1", title: "Software Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "12 - 25 LPA", skills: ["Java", "Oracle DB", "SQL", "REST APIs", "Microservices"], posted: "1 day ago", isNew: true, category: "backend", description: "Develop enterprise software using Oracle technologies.", requirements: ["2+ years Java experience", "Oracle DB knowledge", "Strong SQL skills"], responsibilities: ["Software development", "Database design", "Testing", "Documentation"] },
      { id: "orc2", title: "Cloud Infrastructure Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "15 - 30 LPA", skills: ["OCI", "Terraform", "Kubernetes", "Linux", "Networking"], posted: "2 days ago", isNew: true, category: "devops", description: "Build and manage Oracle Cloud Infrastructure.", requirements: ["3+ years cloud experience", "OCI knowledge", "Infrastructure automation"], responsibilities: ["Cloud infrastructure", "Automation", "Monitoring", "Troubleshooting"] },
      { id: "orc3", title: "Database Administrator", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 26 LPA", skills: ["Oracle DB", "RAC", "Data Guard", "Performance Tuning", "Backup/Recovery"], posted: "3 days ago", isNew: true, category: "data", description: "Manage and optimize Oracle databases.", requirements: ["3+ years Oracle DBA experience", "RAC experience", "Performance tuning"], responsibilities: ["Database administration", "Performance tuning", "Backup/recovery", "Security"] },
      { id: "orc4", title: "Java Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "10 - 22 LPA", skills: ["Java", "Spring Boot", "Microservices", "Oracle DB", "REST"], posted: "4 days ago", isNew: false, category: "backend", description: "Develop Java applications for Oracle products.", requirements: ["2+ years Java experience", "Spring Boot knowledge", "Database experience"], responsibilities: ["Java development", "API development", "Unit testing", "Code reviews"] },
      { id: "orc5", title: "NetSuite Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "10 - 22 LPA", skills: ["NetSuite", "SuiteScript", "JavaScript", "ERP", "Workflows"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Customize and develop NetSuite solutions.", requirements: ["2+ years NetSuite experience", "SuiteScript proficiency", "ERP knowledge"], responsibilities: ["NetSuite customization", "Workflow development", "Integration", "Client support"] },
      { id: "orc6", title: "Senior Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "22 - 40 LPA", skills: ["Java", "Distributed Systems", "OCI", "System Design", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Lead development of Oracle cloud services.", requirements: ["5+ years experience", "Distributed systems knowledge", "Technical leadership"], responsibilities: ["Technical leadership", "System design", "Mentoring", "Code reviews"] },
      { id: "orc7", title: "DevOps Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 25 LPA", skills: ["OCI", "Docker", "Kubernetes", "Jenkins", "Ansible"], posted: "4 days ago", isNew: false, category: "devops", description: "Implement DevOps practices for Oracle projects.", requirements: ["3+ years DevOps experience", "OCI knowledge", "Container orchestration"], responsibilities: ["CI/CD pipelines", "Infrastructure automation", "Monitoring", "Support"] },
      { id: "orc8", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "15 - 30 LPA", skills: ["Security", "Cloud Security", "Penetration Testing", "Compliance", "SIEM"], posted: "1 week ago", isNew: false, category: "security", description: "Ensure security of Oracle's cloud and products.", requirements: ["3+ years security experience", "Cloud security knowledge", "Security certifications"], responsibilities: ["Security assessments", "Vulnerability management", "Incident response", "Compliance"] },
      { id: "orc9", title: "Data Scientist", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "14 - 28 LPA", skills: ["Python", "Machine Learning", "Oracle ML", "SQL", "Statistics"], posted: "5 days ago", isNew: false, category: "data", description: "Build ML solutions using Oracle's data platform.", requirements: ["3+ years data science experience", "ML expertise", "Oracle knowledge preferred"], responsibilities: ["ML model development", "Data analysis", "Oracle ML implementation", "Insights generation"] },
      { id: "orc10", title: "Frontend Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "10 - 22 LPA", skills: ["React", "JavaScript", "TypeScript", "Oracle JET", "CSS"], posted: "6 days ago", isNew: false, category: "frontend", description: "Build frontend applications for Oracle products.", requirements: ["2+ years frontend experience", "React expertise", "TypeScript knowledge"], responsibilities: ["Frontend development", "UI implementation", "Testing", "Performance optimization"] },
      { id: "orc11", title: "Technical Consultant", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "16 - 35 LPA", skills: ["Oracle EBS", "Technical", "SQL", "PL/SQL", "Client Facing"], posted: "3 days ago", isNew: true, category: "backend", description: "Provide technical consulting for Oracle EBS.", requirements: ["4+ years Oracle EBS experience", "Strong technical skills", "Consulting experience"], responsibilities: ["Technical consulting", "Customization", "Client training", "Support"] },
      { id: "orc12", title: "Product Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "28 - 50 LPA", skills: ["Product Management", "Cloud", "Technical Background", "Agile", "Communication"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive product strategy for Oracle Cloud.", requirements: ["5+ years PM experience", "Cloud/SaaS experience", "Technical background"], responsibilities: ["Product strategy", "Roadmap planning", "Customer engagement", "Go-to-market"] },
    ],
  },
  {
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    industry: "Technology & Social Media",
    description: "Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate. The company owns and operates Facebook, Instagram, WhatsApp, and Threads.",
    employees: "70,000+",
    headquarters: "Menlo Park, California",
    indianOffices: ["Hyderabad", "Bangalore", "Gurgaon"],
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Awards", "Free Meals", "Fitness Benefits", "Parental Leave", "Education Reimbursement", "Remote Work"],
    color: "from-blue-600 to-indigo-500",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "meta1", title: "Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "28 - 50 LPA", skills: ["Hack/PHP", "Python", "React", "MySQL", "Distributed Systems"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Build products that connect billions of people.", requirements: ["2+ years experience", "Strong coding skills", "System design knowledge"], responsibilities: ["Feature development", "Code reviews", "System design", "On-call support"] },
      { id: "meta2", title: "Production Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 60 LPA", skills: ["Python", "Linux", "Distributed Systems", "Automation", "Debugging"], posted: "2 days ago", isNew: true, category: "devops", description: "Keep Meta's infrastructure running at scale.", requirements: ["3+ years experience", "Linux expertise", "Automation skills"], responsibilities: ["Infrastructure reliability", "Automation", "Incident response", "Performance optimization"] },
      { id: "meta3", title: "Machine Learning Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "40 - 70 LPA", skills: ["PyTorch", "Python", "Deep Learning", "NLP", "Recommendation Systems"], posted: "3 days ago", isNew: true, category: "ai", description: "Build ML systems that power Meta's products.", requirements: ["3+ years ML experience", "PyTorch expertise", "Production ML experience"], responsibilities: ["ML model development", "Training infrastructure", "A/B testing", "Model deployment"] },
      { id: "meta4", title: "Frontend Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "25 - 45 LPA", skills: ["React", "JavaScript", "TypeScript", "GraphQL", "Web Performance"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build user interfaces for Meta's products.", requirements: ["2+ years frontend experience", "React expertise", "Performance optimization"], responsibilities: ["UI development", "Component design", "Performance optimization", "Accessibility"] },
      { id: "meta5", title: "Data Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["Python", "Spark", "Presto", "SQL", "Data Pipelines"], posted: "5 days ago", isNew: false, category: "data", description: "Build data infrastructure at Meta scale.", requirements: ["3+ years data engineering", "Big data experience", "SQL expertise"], responsibilities: ["Data pipeline development", "ETL processes", "Data quality", "Performance optimization"] },
      { id: "meta6", title: "iOS Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["Swift", "Objective-C", "iOS SDK", "React Native", "Performance"], posted: "1 week ago", isNew: false, category: "mobile", description: "Build iOS features for Facebook, Instagram, WhatsApp.", requirements: ["3+ years iOS experience", "Swift proficiency", "Large-scale app experience"], responsibilities: ["iOS development", "Feature implementation", "Performance optimization", "Code reviews"] },
      { id: "meta7", title: "Android Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["Kotlin", "Java", "Android SDK", "MVVM", "Performance"], posted: "4 days ago", isNew: false, category: "mobile", description: "Build Android features for Meta's apps.", requirements: ["3+ years Android experience", "Kotlin proficiency", "Large-scale app experience"], responsibilities: ["Android development", "Feature implementation", "Performance optimization", "Testing"] },
      { id: "meta8", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "38 - 65 LPA", skills: ["Security", "Python", "Penetration Testing", "Security Architecture", "Incident Response"], posted: "1 week ago", isNew: false, category: "security", description: "Protect Meta's users and infrastructure.", requirements: ["4+ years security experience", "Security certifications", "Coding skills"], responsibilities: ["Security assessments", "Vulnerability research", "Incident response", "Security tooling"] },
      { id: "meta9", title: "Research Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "55 - 100 LPA", skills: ["Machine Learning", "Deep Learning", "Research", "Python", "Publications"], posted: "5 days ago", isNew: false, category: "ai", description: "Conduct AI research at Meta AI.", requirements: ["PhD in ML/AI", "Strong publication record", "Research experience"], responsibilities: ["Original research", "Publications", "Collaboration", "Prototyping"] },
      { id: "meta10", title: "Product Designer", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "28 - 50 LPA", skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Mobile Design"], posted: "6 days ago", isNew: false, category: "design", description: "Design experiences for Meta's products.", requirements: ["3+ years product design experience", "Strong portfolio", "Mobile design experience"], responsibilities: ["Product design", "User research", "Prototyping", "Design system contribution"] },
      { id: "meta11", title: "AR/VR Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 60 LPA", skills: ["C++", "Unity", "Computer Vision", "3D Graphics", "AR/VR"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Build the metaverse with Reality Labs.", requirements: ["3+ years AR/VR experience", "C++ expertise", "Graphics experience"], responsibilities: ["AR/VR development", "Graphics optimization", "Research prototyping", "Performance tuning"] },
      { id: "meta12", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "40 - 70 LPA", skills: ["Program Management", "Technical Background", "Cross-functional", "Communication", "Agile"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive large-scale technical programs.", requirements: ["5+ years TPM experience", "Technical background", "Strong communication"], responsibilities: ["Program management", "Cross-team coordination", "Risk management", "Stakeholder communication"] },
    ],
  },
  {
    name: "NVIDIA",
    logo: "https://logo.clearbit.com/nvidia.com",
    industry: "Semiconductors & AI",
    description: "NVIDIA Corporation is an American multinational technology company. It is a fabless company which designs graphics processing units (GPUs), APIs for data science and high-performance computing.",
    employees: "26,000+",
    headquarters: "Santa Clara, California",
    indianOffices: ["Bangalore", "Pune", "Hyderabad"],
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Purchase Plan", "Education Reimbursement", "Wellness Programs", "Flexible Work", "Gaming Benefits"],
    color: "from-green-500 to-green-400",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    jobs: [
      { id: "nvd1", title: "CUDA Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 50 LPA", skills: ["CUDA", "C++", "GPU Programming", "Parallel Computing", "Performance"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Develop CUDA libraries and tools.", requirements: ["3+ years CUDA experience", "Strong C++ skills", "GPU programming expertise"], responsibilities: ["CUDA development", "Performance optimization", "Library development", "Documentation"] },
      { id: "nvd2", title: "Deep Learning Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["PyTorch", "TensorFlow", "CUDA", "Deep Learning", "Python"], posted: "2 days ago", isNew: true, category: "ai", description: "Optimize deep learning frameworks for NVIDIA GPUs.", requirements: ["3+ years DL experience", "Framework expertise", "CUDA knowledge"], responsibilities: ["DL optimization", "Framework development", "Benchmarking", "Customer support"] },
      { id: "nvd3", title: "Graphics Software Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 45 LPA", skills: ["OpenGL", "Vulkan", "C++", "GPU Architecture", "Graphics"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Develop graphics drivers and APIs.", requirements: ["3+ years graphics experience", "OpenGL/Vulkan knowledge", "C++ proficiency"], responsibilities: ["Driver development", "API implementation", "Performance optimization", "Debugging"] },
      { id: "nvd4", title: "AI Research Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "45 - 85 LPA", skills: ["Deep Learning", "Research", "Python", "Publications", "Computer Vision"], posted: "4 days ago", isNew: false, category: "ai", description: "Conduct AI research at NVIDIA Research.", requirements: ["PhD in ML/AI", "Publication record", "Research experience"], responsibilities: ["Original research", "Publications", "Collaboration", "Prototyping"] },
      { id: "nvd5", title: "System Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 42 LPA", skills: ["C", "Linux Kernel", "Device Drivers", "System Programming", "Debugging"], posted: "5 days ago", isNew: false, category: "backend", description: "Develop system software for NVIDIA products.", requirements: ["3+ years system software experience", "Linux kernel knowledge", "C proficiency"], responsibilities: ["Driver development", "Kernel programming", "Performance optimization", "Debugging"] },
      { id: "nvd6", title: "Solutions Architect", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "35 - 65 LPA", skills: ["AI/ML", "CUDA", "Architecture", "Customer Facing", "Deep Learning"], posted: "1 week ago", isNew: false, category: "ai", description: "Help customers adopt NVIDIA AI solutions.", requirements: ["6+ years AI experience", "CUDA knowledge", "Customer-facing experience"], responsibilities: ["Solution architecture", "Customer engagement", "Technical presentations", "Proof of concepts"] },
      { id: "nvd7", title: "Compiler Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 48 LPA", skills: ["Compilers", "LLVM", "C++", "GPU", "Optimization"], posted: "4 days ago", isNew: false, category: "backend", description: "Develop compilers for NVIDIA GPUs.", requirements: ["3+ years compiler experience", "LLVM knowledge", "GPU architecture understanding"], responsibilities: ["Compiler development", "Optimization", "Performance analysis", "Testing"] },
      { id: "nvd8", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "18 - 35 LPA", skills: ["Kubernetes", "Docker", "CI/CD", "Python", "Cloud"], posted: "1 week ago", isNew: false, category: "devops", description: "Build infrastructure for NVIDIA's software teams.", requirements: ["3+ years DevOps experience", "Container orchestration", "CI/CD expertise"], responsibilities: ["CI/CD pipelines", "Infrastructure automation", "GPU cluster management", "Monitoring"] },
      { id: "nvd9", title: "Autonomous Vehicles Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "30 - 55 LPA", skills: ["C++", "Computer Vision", "Deep Learning", "ROS", "Sensor Fusion"], posted: "5 days ago", isNew: false, category: "ai", description: "Build AI for autonomous vehicles.", requirements: ["4+ years AV experience", "Computer vision expertise", "C++ proficiency"], responsibilities: ["AV algorithm development", "Perception systems", "Testing", "Integration"] },
      { id: "nvd10", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "30 - 55 LPA", skills: ["Program Management", "Technical Background", "GPU/AI", "Communication", "Agile"], posted: "6 days ago", isNew: false, category: "fullstack", description: "Manage complex technical programs.", requirements: ["5+ years TPM experience", "Technical background", "Strong communication"], responsibilities: ["Program management", "Cross-team coordination", "Risk management", "Stakeholder communication"] },
      { id: "nvd11", title: "Data Scientist", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 42 LPA", skills: ["Python", "Machine Learning", "GPU", "Statistics", "RAPIDS"], posted: "3 days ago", isNew: true, category: "data", description: "Apply data science using NVIDIA's tools.", requirements: ["3+ years data science experience", "GPU computing knowledge", "ML expertise"], responsibilities: ["Data analysis", "ML models", "RAPIDS development", "Customer support"] },
      { id: "nvd12", title: "Robotics Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 48 LPA", skills: ["ROS", "C++", "Python", "Computer Vision", "Deep Learning"], posted: "1 week ago", isNew: false, category: "ai", description: "Build AI for NVIDIA's robotics platform.", requirements: ["3+ years robotics experience", "ROS expertise", "AI knowledge"], responsibilities: ["Robotics development", "AI integration", "Simulation", "Testing"] },
    ],
  },
  {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    industry: "Electric Vehicles & Clean Energy",
    description: "Tesla, Inc. is an American electric vehicle and clean energy company. Tesla designs and manufactures electric cars, battery energy storage, solar panels and related products and services.",
    employees: "130,000+",
    headquarters: "Austin, Texas",
    indianOffices: ["Bangalore"],
    benefits: ["Health Insurance", "Life Insurance", "401k", "Stock Options", "Employee Discounts", "Parental Leave", "Education Benefits", "Free EV Charging"],
    color: "from-red-600 to-red-500",
    bgColor: "bg-red-600/10",
    textColor: "text-red-600",
    jobs: [
      { id: "tsl1", title: "Autopilot Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["C++", "Python", "Computer Vision", "Deep Learning", "Sensor Fusion"], posted: "1 day ago", isNew: true, category: "ai", description: "Build autonomous driving software.", requirements: ["3+ years AV experience", "Computer vision expertise", "C++ proficiency"], responsibilities: ["Autopilot development", "Algorithm design", "Testing", "Performance optimization"] },
      { id: "tsl2", title: "Embedded Software Engineer", location: "Bangalore, India", locationType: "On-site", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["C", "C++", "Embedded Systems", "RTOS", "CAN Bus"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Develop embedded software for Tesla vehicles.", requirements: ["3+ years embedded experience", "C/C++ expertise", "Automotive experience preferred"], responsibilities: ["Embedded development", "Driver development", "Testing", "Integration"] },
      { id: "tsl3", title: "Machine Learning Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 60 LPA", skills: ["PyTorch", "TensorFlow", "Computer Vision", "Python", "Neural Networks"], posted: "3 days ago", isNew: true, category: "ai", description: "Train neural networks for Tesla's AI.", requirements: ["3+ years ML experience", "Deep learning expertise", "Computer vision experience"], responsibilities: ["Model training", "Data pipeline development", "Optimization", "Deployment"] },
      { id: "tsl4", title: "Backend Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["Python", "Go", "Distributed Systems", "PostgreSQL", "Kubernetes"], posted: "4 days ago", isNew: false, category: "backend", description: "Build backend services for Tesla's products.", requirements: ["3+ years backend experience", "Distributed systems knowledge", "Cloud experience"], responsibilities: ["Backend development", "API design", "Scalability", "Performance optimization"] },
      { id: "tsl5", title: "Frontend Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "20 - 38 LPA", skills: ["React", "TypeScript", "JavaScript", "Web Performance", "Mobile Web"], posted: "5 days ago", isNew: false, category: "frontend", description: "Build web interfaces for Tesla's products.", requirements: ["2+ years frontend experience", "React expertise", "Performance optimization"], responsibilities: ["Frontend development", "UI implementation", "Testing", "Cross-browser compatibility"] },
      { id: "tsl6", title: "Data Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["Python", "Spark", "Kafka", "SQL", "Data Pipelines"], posted: "1 week ago", isNew: false, category: "data", description: "Build data infrastructure for Tesla's AI.", requirements: ["3+ years data engineering", "Big data experience", "Python proficiency"], responsibilities: ["Data pipeline development", "ETL processes", "Data quality", "Infrastructure"] },
      { id: "tsl7", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "30 - 52 LPA", skills: ["Security", "Automotive Security", "Penetration Testing", "Python", "Network Security"], posted: "4 days ago", isNew: false, category: "security", description: "Secure Tesla's vehicles and infrastructure.", requirements: ["4+ years security experience", "Automotive security knowledge", "Coding skills"], responsibilities: ["Security assessments", "Vulnerability research", "Security architecture", "Incident response"] },
      { id: "tsl8", title: "DevOps Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "22 - 40 LPA", skills: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD"], posted: "1 week ago", isNew: false, category: "devops", description: "Build infrastructure for Tesla's software teams.", requirements: ["3+ years DevOps experience", "Container orchestration", "Cloud experience"], responsibilities: ["Infrastructure automation", "CI/CD pipelines", "Monitoring", "Scalability"] },
      { id: "tsl9", title: "Computer Vision Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 55 LPA", skills: ["Computer Vision", "Deep Learning", "Python", "C++", "OpenCV"], posted: "5 days ago", isNew: false, category: "ai", description: "Build vision systems for Tesla's vehicles.", requirements: ["3+ years CV experience", "Deep learning knowledge", "Real-time systems experience"], responsibilities: ["Vision algorithm development", "Model training", "Optimization", "Testing"] },
      { id: "tsl10", title: "Simulation Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["Python", "C++", "Simulation", "Physics", "Computer Graphics"], posted: "6 days ago", isNew: false, category: "fullstack", description: "Build simulation systems for Tesla's AI.", requirements: ["3+ years simulation experience", "Physics background", "Graphics experience"], responsibilities: ["Simulation development", "Scenario generation", "Testing infrastructure", "Performance optimization"] },
      { id: "tsl11", title: "Mobile Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 45 LPA", skills: ["React Native", "Swift", "Kotlin", "iOS", "Android"], posted: "3 days ago", isNew: true, category: "mobile", description: "Build Tesla's mobile apps.", requirements: ["3+ years mobile experience", "Cross-platform development", "Native development experience"], responsibilities: ["Mobile app development", "Feature implementation", "Testing", "Performance optimization"] },
      { id: "tsl12", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 60 LPA", skills: ["Program Management", "Automotive", "Technical Background", "Agile", "Communication"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Drive Tesla's software programs.", requirements: ["5+ years TPM experience", "Technical background", "Automotive experience preferred"], responsibilities: ["Program management", "Cross-functional coordination", "Risk management", "Delivery"] },
    ],
  },
  {
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    industry: "IT Services & Consulting",
    description: "Accenture plc is an Irish-American professional services company specializing in information technology services and consulting. It is a Fortune Global 500 company.",
    employees: "730,000+",
    headquarters: "Dublin, Ireland",
    indianOffices: ["Bangalore", "Mumbai", "Hyderabad", "Chennai", "Pune", "Delhi NCR", "Kolkata", "Gurgaon"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Stock Options", "Learning & Development", "Flexible Work", "Parental Leave", "Employee Assistance"],
    color: "from-purple-600 to-purple-400",
    bgColor: "bg-purple-600/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "acc1", title: "Associate Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "4.5 - 6 LPA", skills: ["Java", "Python", "SQL", "Problem Solving", "Communication"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Begin your career with Accenture's technology practice.", requirements: ["B.Tech/BE/MCA", "Good academic record", "Strong communication"], responsibilities: ["Software development", "Testing", "Documentation", "Learning and development"] },
      { id: "acc2", title: "Java Full Stack Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 18 LPA", skills: ["Java", "Spring Boot", "Angular", "Microservices", "AWS"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build full stack applications for enterprise clients.", requirements: ["3+ years Java experience", "Angular/React knowledge", "Cloud experience"], responsibilities: ["Full stack development", "Client delivery", "Code reviews", "Technical documentation"] },
      { id: "acc3", title: "Cloud Architect", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "25 - 45 LPA", skills: ["AWS", "Azure", "Architecture", "Terraform", "Microservices"], posted: "3 days ago", isNew: true, category: "devops", description: "Design cloud solutions for enterprise clients.", requirements: ["8+ years experience", "Cloud certifications", "Architecture experience"], responsibilities: ["Cloud architecture", "Client consulting", "Technical leadership", "Best practices"] },
      { id: "acc4", title: "Data Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 18 LPA", skills: ["Python", "Spark", "Azure", "SQL", "ETL"], posted: "4 days ago", isNew: false, category: "data", description: "Build data solutions for Accenture clients.", requirements: ["3+ years data engineering", "Big data experience", "Cloud platform knowledge"], responsibilities: ["Data pipeline development", "ETL processes", "Client delivery", "Documentation"] },
      { id: "acc5", title: "Salesforce Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 15 LPA", skills: ["Salesforce", "Apex", "Lightning", "Integration", "SOQL"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Implement Salesforce solutions for clients.", requirements: ["2+ years Salesforce experience", "Salesforce certifications", "Integration experience"], responsibilities: ["Salesforce development", "Customization", "Integration", "Client support"] },
      { id: "acc6", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 22 LPA", skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"], posted: "1 week ago", isNew: false, category: "ai", description: "Build AI solutions for Accenture clients.", requirements: ["3+ years AI/ML experience", "Deep learning knowledge", "Python expertise"], responsibilities: ["AI model development", "Client delivery", "Research", "Documentation"] },
      { id: "acc7", title: "Security Consultant", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "12 - 28 LPA", skills: ["Security", "Penetration Testing", "SIEM", "Compliance", "Risk Assessment"], posted: "4 days ago", isNew: false, category: "security", description: "Provide security consulting to enterprise clients.", requirements: ["4+ years security experience", "Security certifications", "Consulting experience"], responsibilities: ["Security assessments", "Risk analysis", "Compliance consulting", "Client training"] },
      { id: "acc8", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 18 LPA", skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"], posted: "1 week ago", isNew: false, category: "devops", description: "Implement DevOps for Accenture projects.", requirements: ["3+ years DevOps experience", "Container orchestration", "CI/CD expertise"], responsibilities: ["CI/CD implementation", "Infrastructure automation", "Client delivery", "Support"] },
      { id: "acc9", title: "SAP Consultant", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "12 - 28 LPA", skills: ["SAP", "S/4HANA", "ABAP", "Fiori", "Integration"], posted: "5 days ago", isNew: false, category: "backend", description: "Implement SAP solutions for enterprise clients.", requirements: ["4+ years SAP experience", "S/4HANA knowledge", "Implementation experience"], responsibilities: ["SAP implementation", "Customization", "Client training", "Go-live support"] },
      { id: "acc10", title: "Business Analyst", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Business Analysis", "Requirements", "Agile", "SQL", "Communication"], posted: "6 days ago", isNew: false, category: "data", description: "Bridge business and technology for clients.", requirements: ["2+ years BA experience", "Strong communication", "Domain knowledge"], responsibilities: ["Requirements gathering", "Analysis", "Documentation", "Stakeholder management"] },
      { id: "acc11", title: "React Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 15 LPA", skills: ["React", "JavaScript", "TypeScript", "Redux", "REST APIs"], posted: "3 days ago", isNew: true, category: "frontend", description: "Build frontend applications for clients.", requirements: ["2+ years React experience", "TypeScript knowledge", "State management"], responsibilities: ["React development", "Component design", "Testing", "Client delivery"] },
      { id: "acc12", title: "Project Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "20 - 40 LPA", skills: ["Project Management", "Agile", "Client Management", "Technical Background", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Manage delivery of technology projects.", requirements: ["8+ years PM experience", "PMP/Agile certifications", "Client management"], responsibilities: ["Project delivery", "Team management", "Client relationship", "Risk management"] },
    ],
  },
  {
    name: "Deloitte",
    logo: "https://logo.clearbit.com/deloitte.com",
    industry: "Consulting & Professional Services",
    description: "Deloitte Touche Tohmatsu Limited is an international professional services network. Deloitte is one of the 'Big Four' accounting organizations and the largest professional services network in the world.",
    employees: "415,000+",
    headquarters: "London, UK",
    indianOffices: ["Mumbai", "Bangalore", "Hyderabad", "Delhi NCR", "Chennai", "Pune", "Kolkata"],
    benefits: ["Health Insurance", "Life Insurance", "Retirement Benefits", "Learning & Development", "Flexible Work", "Parental Leave", "Wellness Programs", "Employee Assistance"],
    color: "from-green-600 to-green-400",
    bgColor: "bg-green-600/10",
    textColor: "text-green-600",
    jobs: [
      { id: "del1", title: "Analyst", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "6 - 10 LPA", skills: ["Analytical Skills", "Excel", "SQL", "Communication", "Problem Solving"], posted: "1 day ago", isNew: true, category: "data", description: "Start your consulting career at Deloitte.", requirements: ["Bachelor's degree", "Strong analytical skills", "Excellent communication"], responsibilities: ["Data analysis", "Research", "Documentation", "Client support"] },
      { id: "del2", title: "Technology Consultant", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 25 LPA", skills: ["Java", "Cloud", "Consulting", "Communication", "Problem Solving"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Provide technology consulting to clients.", requirements: ["3+ years technology experience", "Consulting skills", "Strong communication"], responsibilities: ["Technology consulting", "Solution design", "Client delivery", "Knowledge sharing"] },
      { id: "del3", title: "Cloud & Infrastructure Consultant", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "15 - 32 LPA", skills: ["AWS", "Azure", "GCP", "Infrastructure", "Consulting"], posted: "3 days ago", isNew: true, category: "devops", description: "Help clients with cloud transformation.", requirements: ["4+ years cloud experience", "Multi-cloud knowledge", "Consulting experience"], responsibilities: ["Cloud consulting", "Architecture design", "Migration planning", "Client training"] },
      { id: "del4", title: "Data Scientist", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 26 LPA", skills: ["Python", "Machine Learning", "Statistics", "SQL", "Visualization"], posted: "4 days ago", isNew: false, category: "data", description: "Apply data science to solve business problems.", requirements: ["3+ years data science experience", "ML expertise", "Business acumen"], responsibilities: ["Data analysis", "ML modeling", "Insights generation", "Client presentations"] },
      { id: "del5", title: "Cybersecurity Consultant", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "14 - 30 LPA", skills: ["Security", "Risk Assessment", "Compliance", "SIEM", "Consulting"], posted: "5 days ago", isNew: false, category: "security", description: "Help clients manage cyber risks.", requirements: ["4+ years security experience", "Security certifications", "Consulting experience"], responsibilities: ["Security assessments", "Risk management", "Compliance", "Client advisory"] },
      { id: "del6", title: "SAP S/4HANA Consultant", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-9 years", salary: "16 - 35 LPA", skills: ["SAP S/4HANA", "ABAP", "Fiori", "Implementation", "Migration"], posted: "1 week ago", isNew: false, category: "backend", description: "Lead SAP S/4HANA implementations.", requirements: ["5+ years SAP experience", "S/4HANA implementations", "Migration experience"], responsibilities: ["SAP consulting", "Implementation", "Client training", "Go-live support"] },
      { id: "del7", title: "AI & Cognitive Consultant", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 26 LPA", skills: ["AI/ML", "NLP", "Python", "Consulting", "Problem Solving"], posted: "4 days ago", isNew: false, category: "ai", description: "Help clients adopt AI technologies.", requirements: ["3+ years AI experience", "Consulting skills", "Business acumen"], responsibilities: ["AI consulting", "Solution design", "Implementation", "Client training"] },
      { id: "del8", title: "Full Stack Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 22 LPA", skills: ["React", "Node.js", "Python", "AWS", "MongoDB"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Build applications for Deloitte projects.", requirements: ["3+ years full stack experience", "Cloud experience", "Agile methodology"], responsibilities: ["Full stack development", "API design", "Testing", "Documentation"] },
      { id: "del9", title: "RPA Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 15 LPA", skills: ["UiPath", "Blue Prism", "Automation Anywhere", "Process Automation", "Python"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Implement RPA solutions for clients.", requirements: ["2+ years RPA experience", "RPA certifications", "Process analysis skills"], responsibilities: ["RPA development", "Bot design", "Testing", "Client support"] },
      { id: "del10", title: "Business Analyst", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Business Analysis", "Requirements", "Agile", "Communication", "Documentation"], posted: "6 days ago", isNew: false, category: "data", description: "Analyze business needs for Deloitte projects.", requirements: ["2+ years BA experience", "Strong communication", "Analytical skills"], responsibilities: ["Requirements analysis", "Documentation", "Stakeholder management", "Testing support"] },
      { id: "del11", title: "Senior Manager - Technology", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "10-15 years", salary: "35 - 60 LPA", skills: ["Technology", "Leadership", "Client Management", "Strategy", "Delivery"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Lead technology practice and client engagements.", requirements: ["10+ years experience", "Leadership experience", "Client management"], responsibilities: ["Practice leadership", "Client relationships", "Team management", "Business development"] },
      { id: "del12", title: "ServiceNow Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 22 LPA", skills: ["ServiceNow", "JavaScript", "ITSM", "Integration", "Workflows"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Implement ServiceNow for enterprise clients.", requirements: ["3+ years ServiceNow experience", "ServiceNow certifications", "ITSM knowledge"], responsibilities: ["ServiceNow development", "Customization", "Integration", "Client training"] },
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
      { id: "tcs1", title: "Associate Software Engineer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.5 - 4.5 LPA", skills: ["Java", "Python", "SQL", "Problem Solving"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Join our team as an Associate Software Engineer.", requirements: ["B.Tech/BE in CS/IT", "Strong programming fundamentals", "Good communication skills"], responsibilities: ["Develop software solutions", "Write clean, maintainable code", "Participate in code reviews", "Collaborate with team members"] },
      { id: "tcs2", title: "Java Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "MySQL"], posted: "2 days ago", isNew: true, category: "backend", description: "Build scalable enterprise applications.", requirements: ["2+ years Java experience", "Strong Spring Boot knowledge", "Experience with databases"], responsibilities: ["Design and develop Java applications", "Build REST APIs", "Write unit tests", "Mentor junior developers"] },
      { id: "tcs3", title: "React.js Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "5 - 10 LPA", skills: ["React.js", "JavaScript", "TypeScript", "Redux", "HTML/CSS"], posted: "3 days ago", isNew: true, category: "frontend", description: "Build modern web applications using React.js.", requirements: ["2+ years React experience", "Strong JavaScript skills", "Knowledge of state management"], responsibilities: ["Develop React components", "Implement responsive designs", "Optimize performance", "Write clean code"] },
      { id: "tcs4", title: "Data Analyst", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "1-3 years", salary: "4 - 8 LPA", skills: ["Python", "SQL", "Tableau", "Power BI", "Excel"], posted: "4 days ago", isNew: false, category: "data", description: "Analyze data to provide business insights.", requirements: ["1+ years data analysis experience", "Strong SQL skills", "Visualization tool experience"], responsibilities: ["Analyze large datasets", "Create dashboards", "Generate reports", "Present insights to stakeholders"] },
      { id: "tcs5", title: "DevOps Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"], posted: "5 days ago", isNew: false, category: "devops", description: "Build and maintain CI/CD pipelines and cloud infrastructure.", requirements: ["3+ years DevOps experience", "Strong AWS knowledge", "Container orchestration experience"], responsibilities: ["Manage cloud infrastructure", "Build CI/CD pipelines", "Automate deployments", "Monitor systems"] },
      { id: "tcs6", title: "Python Developer", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Python", "Django", "Flask", "REST APIs", "PostgreSQL"], posted: "1 week ago", isNew: false, category: "backend", description: "Develop backend services and APIs using Python.", requirements: ["2+ years Python experience", "Django/Flask knowledge", "Database experience"], responsibilities: ["Build Python applications", "Design APIs", "Write tests", "Code reviews"] },
      { id: "tcs7", title: "ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"], posted: "3 days ago", isNew: true, category: "ai", description: "Build and deploy machine learning models.", requirements: ["3+ years ML experience", "Strong Python skills", "Experience with ML frameworks"], responsibilities: ["Develop ML models", "Train and optimize models", "Deploy to production", "Research new techniques"] },
      { id: "tcs8", title: "Full Stack Developer", location: "Kochi, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 15 LPA", skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Work on end-to-end development of web applications.", requirements: ["3+ years full stack experience", "MERN stack proficiency", "Strong problem-solving skills"], responsibilities: ["Full stack development", "API design", "Database management", "Technical documentation"] },
      { id: "tcs9", title: "Cloud Architect", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "25 - 40 LPA", skills: ["AWS", "Azure", "GCP", "Architecture", "Microservices"], posted: "1 week ago", isNew: false, category: "devops", description: "Design and implement cloud solutions for enterprise clients.", requirements: ["8+ years experience", "Cloud certifications", "Architecture experience"], responsibilities: ["Design cloud architectures", "Lead technical teams", "Client consultations", "Best practices implementation"] },
      { id: "tcs10", title: "Angular Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "5 - 11 LPA", skills: ["Angular", "TypeScript", "RxJS", "NgRx", "HTML/CSS"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build enterprise web applications using Angular.", requirements: ["2+ years Angular experience", "TypeScript proficiency", "Understanding of RxJS"], responsibilities: ["Develop Angular applications", "Component development", "State management", "Unit testing"] },
      { id: "tcs11", title: "Security Analyst", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Cybersecurity", "SIEM", "Vulnerability Assessment", "Incident Response"], posted: "5 days ago", isNew: false, category: "security", description: "Monitor and protect organization's IT infrastructure.", requirements: ["2+ years security experience", "Security certifications preferred", "Knowledge of security tools"], responsibilities: ["Security monitoring", "Incident response", "Vulnerability assessments", "Security reporting"] },
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
      { id: "inf1", title: "Systems Engineer", location: "Mysore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.6 - 4.2 LPA", skills: ["Java", "Python", "C++", "SQL", "Problem Solving"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your IT career with Infosys.", requirements: ["B.Tech/BE/MCA", "60% aggregate", "Strong analytical skills"], responsibilities: ["Software development", "Testing", "Documentation", "Team collaboration"] },
      { id: "inf2", title: "Senior Java Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "12 - 20 LPA", skills: ["Java", "Spring Boot", "Microservices", "Kafka", "AWS"], posted: "2 days ago", isNew: true, category: "backend", description: "Lead Java development for enterprise applications.", requirements: ["5+ years Java experience", "Microservices architecture", "Cloud experience"], responsibilities: ["Lead development", "Code reviews", "Architecture design", "Mentoring"] },
      { id: "inf3", title: "Data Scientist", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Python", "Machine Learning", "SQL", "Statistics", "TensorFlow"], posted: "3 days ago", isNew: true, category: "data", description: "Apply data science techniques to solve business problems.", requirements: ["3+ years data science experience", "Strong statistics background", "ML expertise"], responsibilities: ["Build ML models", "Data analysis", "Insights generation", "Stakeholder presentations"] },
      { id: "inf4", title: "React Native Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Native Modules"], posted: "4 days ago", isNew: false, category: "mobile", description: "Build cross-platform mobile applications.", requirements: ["2+ years React Native experience", "Published apps", "Native development knowledge"], responsibilities: ["Mobile app development", "Cross-platform coding", "Performance optimization", "App store deployment"] },
      { id: "inf5", title: "Power Platform Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "5 - 10 LPA", skills: ["Power Apps", "Power Automate", "Power BI", "SharePoint", "Azure"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Build low-code solutions using Microsoft Power Platform.", requirements: ["2+ years Power Platform experience", "Microsoft certifications preferred", "SharePoint knowledge"], responsibilities: ["Power Apps development", "Workflow automation", "Dashboard creation", "User training"] },
      { id: "inf6", title: "AWS Cloud Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["AWS", "Terraform", "CloudFormation", "Python", "Linux"], posted: "1 week ago", isNew: false, category: "devops", description: "Design and manage AWS cloud infrastructure.", requirements: ["3+ years AWS experience", "AWS certifications", "IaC experience"], responsibilities: ["Cloud architecture", "Infrastructure management", "Cost optimization", "Security implementation"] },
      { id: "inf7", title: "UI/UX Designer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"], posted: "3 days ago", isNew: true, category: "design", description: "Design user-centered experiences for digital products.", requirements: ["2+ years UI/UX experience", "Strong portfolio", "User research skills"], responsibilities: ["UI design", "User research", "Prototyping", "Design system maintenance"] },
      { id: "inf8", title: "SAP ABAP Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["SAP ABAP", "SAP S/4HANA", "ODATA", "Fiori", "HANA DB"], posted: "6 days ago", isNew: false, category: "backend", description: "Develop and maintain SAP solutions for enterprise clients.", requirements: ["3+ years SAP ABAP experience", "S/4HANA knowledge", "Fiori development experience"], responsibilities: ["ABAP development", "SAP customization", "Technical design", "Testing and debugging"] },
      { id: "inf9", title: "AI/ML Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"], posted: "2 days ago", isNew: true, category: "ai", description: "Develop AI/ML solutions for various business domains.", requirements: ["2+ years AI/ML experience", "Strong Python skills", "Deep learning knowledge"], responsibilities: ["ML model development", "Data preprocessing", "Model deployment", "Research and prototyping"] },
      { id: "inf10", title: "Technical Lead", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "20 - 35 LPA", skills: ["Java", "Microservices", "AWS", "Architecture", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Lead technical teams and drive architecture decisions.", requirements: ["8+ years development experience", "Team leadership experience", "Strong architecture skills"], responsibilities: ["Technical leadership", "Architecture design", "Team mentoring", "Stakeholder management"] },
      { id: "inf11", title: ".NET Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "7 - 15 LPA", skills: ["C#", ".NET Core", "ASP.NET", "SQL Server", "Azure"], posted: "4 days ago", isNew: false, category: "backend", description: "Build enterprise applications using .NET technologies.", requirements: ["3+ years .NET experience", ".NET Core proficiency", "SQL Server experience"], responsibilities: [".NET development", "API design", "Database design", "Unit testing"] },
      { id: "inf12", title: "Automation Test Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "5 - 12 LPA", skills: ["Selenium", "Java", "TestNG", "API Testing", "CI/CD"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Develop and maintain automated test frameworks.", requirements: ["2+ years automation experience", "Selenium expertise", "Programming skills"], responsibilities: ["Test automation", "Framework development", "CI/CD integration", "Bug reporting"] },
    ],
  },
  {
    name: "Wipro",
    logo: "https://logo.clearbit.com/wipro.com",
    industry: "IT Services & Consulting",
    description: "Wipro Limited is an Indian multinational corporation that provides information technology, consulting and business process services. It is headquartered in Bangalore, India.",
    employees: "250,000+",
    headquarters: "Bangalore, India",
    indianOffices: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai", "Delhi NCR", "Kolkata", "Kochi"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Gratuity", "Learning & Development", "Flexible Work", "Parental Leave", "Employee Assistance"],
    color: "from-purple-600 to-blue-500",
    bgColor: "bg-purple-600/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "wip1", title: "Project Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.5 - 4.5 LPA", skills: ["Java", "Python", "C++", "SQL", "Problem Solving"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career at Wipro as a Project Engineer.", requirements: ["B.Tech/BE/MCA", "Good academic record", "Strong fundamentals"], responsibilities: ["Software development", "Testing", "Documentation", "Learning and growth"] },
      { id: "wip2", title: "Senior Software Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "10 - 18 LPA", skills: ["Java", "Spring Boot", "Microservices", "AWS", "SQL"], posted: "2 days ago", isNew: true, category: "backend", description: "Lead development of enterprise applications.", requirements: ["4+ years Java experience", "Microservices knowledge", "Cloud experience"], responsibilities: ["Development leadership", "Code reviews", "Technical design", "Mentoring"] },
      { id: "wip3", title: "Data Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["Python", "Spark", "Hadoop", "SQL", "Azure"], posted: "3 days ago", isNew: true, category: "data", description: "Build data pipelines for enterprise clients.", requirements: ["3+ years data engineering", "Big data experience", "Cloud knowledge"], responsibilities: ["Data pipeline development", "ETL processes", "Data quality", "Performance optimization"] },
      { id: "wip4", title: "Cloud Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 17 LPA", skills: ["AWS", "Azure", "Terraform", "Kubernetes", "Linux"], posted: "4 days ago", isNew: false, category: "devops", description: "Design and manage cloud infrastructure.", requirements: ["3+ years cloud experience", "Cloud certifications", "IaC experience"], responsibilities: ["Cloud infrastructure", "Automation", "Monitoring", "Security"] },
      { id: "wip5", title: "Salesforce Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Salesforce", "Apex", "Lightning", "Integration", "SOQL"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Implement Salesforce solutions for clients.", requirements: ["2+ years Salesforce experience", "Salesforce certifications", "Integration experience"], responsibilities: ["Salesforce development", "Customization", "Integration", "Support"] },
      { id: "wip6", title: "React Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 13 LPA", skills: ["React", "JavaScript", "TypeScript", "Redux", "REST APIs"], posted: "1 week ago", isNew: false, category: "frontend", description: "Build frontend applications using React.", requirements: ["2+ years React experience", "TypeScript knowledge", "State management"], responsibilities: ["React development", "Component design", "Performance optimization", "Testing"] },
      { id: "wip7", title: "DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["Jenkins", "Docker", "Kubernetes", "Ansible", "AWS"], posted: "4 days ago", isNew: false, category: "devops", description: "Implement DevOps practices for projects.", requirements: ["3+ years DevOps experience", "CI/CD expertise", "Container orchestration"], responsibilities: ["CI/CD pipelines", "Infrastructure automation", "Monitoring", "Support"] },
      { id: "wip8", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 20 LPA", skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Deep Learning"], posted: "1 week ago", isNew: false, category: "ai", description: "Build AI solutions for Wipro clients.", requirements: ["3+ years AI/ML experience", "Deep learning knowledge", "Python expertise"], responsibilities: ["AI model development", "Research", "Implementation", "Client delivery"] },
      { id: "wip9", title: "Security Consultant", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "12 - 25 LPA", skills: ["Security", "Penetration Testing", "SIEM", "Compliance", "Risk Assessment"], posted: "5 days ago", isNew: false, category: "security", description: "Provide security consulting to clients.", requirements: ["4+ years security experience", "Security certifications", "Consulting experience"], responsibilities: ["Security assessments", "Risk analysis", "Compliance", "Client advisory"] },
      { id: "wip10", title: "Business Analyst", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "5 - 12 LPA", skills: ["Business Analysis", "Requirements", "Agile", "SQL", "Communication"], posted: "6 days ago", isNew: false, category: "data", description: "Bridge business and technology.", requirements: ["2+ years BA experience", "Strong communication", "Analytical skills"], responsibilities: ["Requirements gathering", "Analysis", "Documentation", "Stakeholder management"] },
      { id: "wip11", title: "ServiceNow Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["ServiceNow", "JavaScript", "ITSM", "Integration", "Workflows"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Implement ServiceNow for enterprise clients.", requirements: ["2+ years ServiceNow experience", "ServiceNow certifications", "ITSM knowledge"], responsibilities: ["ServiceNow development", "Customization", "Integration", "Support"] },
      { id: "wip12", title: "Technical Architect", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "10-15 years", salary: "28 - 50 LPA", skills: ["Architecture", "Java", "Cloud", "Microservices", "Leadership"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Lead architecture for enterprise solutions.", requirements: ["10+ years experience", "Architecture expertise", "Technical leadership"], responsibilities: ["Architecture design", "Technical leadership", "Client engagement", "Team mentoring"] },
    ],
  },
]

export function TopCompaniesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [subscribedCompanies, setSubscribedCompanies] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState<{ id: string; company: string; job: string; location: string; time: Date }[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [applyingJob, setApplyingJob] = useState<{ company: Company; job: CompanyJob } | null>(null)
  const [applicationStep, setApplicationStep] = useState(1)
  const [schedulingInterview, setSchedulingInterview] = useState<Application | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showApplications, setShowApplications] = useState(false)

  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    experience: "",
    noticePeriod: "",
    expectedSalary: "",
    coverLetter: "",
  })

  const industries = ["all", ...Array.from(new Set(companies.map((c) => c.industry)))]

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.jobs.some(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    const matchesIndustry = selectedIndustry === "all" || company.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  const getFilteredJobs = (company: Company) => {
    if (selectedSkill === "all") return company.jobs
    return company.jobs.filter((job) => job.category === selectedSkill)
  }

  const toggleSubscription = (companyName: string) => {
    setSubscribedCompanies((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(companyName)) {
        newSet.delete(companyName)
      } else {
        newSet.add(companyName)
      }
      return newSet
    })
  }

  // Simulate new job notifications for subscribed companies
  useEffect(() => {
    const interval = setInterval(() => {
      if (subscribedCompanies.size > 0) {
        const subscribedArray = Array.from(subscribedCompanies)
        const randomCompanyName = subscribedArray[Math.floor(Math.random() * subscribedArray.length)]
        const company = companies.find((c) => c.name === randomCompanyName)
        if (company && company.jobs.length > 0) {
          const randomJob = company.jobs[Math.floor(Math.random() * company.jobs.length)]
          setNotifications((prev) => [
            {
              id: `notif-${Date.now()}`,
              company: company.name,
              job: randomJob.title,
              location: randomJob.location,
              time: new Date(),
            },
            ...prev.slice(0, 9),
          ])
        }
      }
    }, 45000) // Every 45 seconds

    return () => clearInterval(interval)
  }, [subscribedCompanies])

  const totalJobs = companies.reduce((acc, company) => acc + company.jobs.length, 0)
  const newJobsCount = companies.reduce((acc, company) => acc + company.jobs.filter((j) => j.isNew).length, 0)

  const handleApply = (company: Company, job: CompanyJob) => {
    setApplyingJob({ company, job })
    setApplicationStep(1)
    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      linkedIn: "",
      portfolio: "",
      experience: "",
      noticePeriod: "",
      expectedSalary: "",
      coverLetter: "",
    })
  }

  const submitApplication = () => {
    if (!applyingJob) return

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId: applyingJob.job.id,
      companyName: applyingJob.company.name,
      jobTitle: applyingJob.job.title,
      status: "applied",
      appliedDate: new Date(),
    }

    setApplications((prev) => [newApplication, ...prev])
    setApplyingJob(null)
    setApplicationStep(1)
  }

  const scheduleInterview = (interviewType: "video" | "phone" | "onsite", time: string) => {
    if (!schedulingInterview || !selectedDate) return

    setApplications((prev) =>
      prev.map((app) =>
        app.id === schedulingInterview.id
          ? {
              ...app,
              status: "interview_scheduled",
              interviewDate: selectedDate,
              interviewTime: time,
              interviewType,
            }
          : app
      )
    )
    setSchedulingInterview(null)
    setSelectedDate(undefined)
  }

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "applied":
        return "bg-blue-500/20 text-blue-400"
      case "screening":
        return "bg-yellow-500/20 text-yellow-400"
      case "interview_scheduled":
        return "bg-purple-500/20 text-purple-400"
      case "interview_completed":
        return "bg-cyan-500/20 text-cyan-400"
      case "offer":
        return "bg-green-500/20 text-green-400"
      case "rejected":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusLabel = (status: Application["status"]) => {
    switch (status) {
      case "applied":
        return "Applied"
      case "screening":
        return "Under Review"
      case "interview_scheduled":
        return "Interview Scheduled"
      case "interview_completed":
        return "Interview Done"
      case "offer":
        return "Offer Received"
      case "rejected":
        return "Not Selected"
      default:
        return status
    }
  }

  return (
    <section id="top-companies" className="relative overflow-hidden bg-background py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 px-4 py-1.5 text-primary">
            <Building2 className="mr-2 h-3.5 w-3.5" />
            Top Hiring Companies
          </Badge>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Top 15 MNCs Hiring Now
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Explore job opportunities at the world's leading technology companies with offices in India
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{companies.length} Companies</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{totalJobs}+ Open Positions</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2">
            <Sparkles className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">{newJobsCount} New This Week</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="relative gap-2"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {notifications.length}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-background shadow-lg">
                <div className="border-b border-border p-3">
                  <h4 className="font-semibold text-foreground">Job Alerts</h4>
                </div>
                <ScrollArea className="h-64">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications yet. Subscribe to companies to receive job alerts.
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-3 hover:bg-secondary/50">
                          <p className="text-sm font-medium text-foreground">{notif.job}</p>
                          <p className="text-xs text-muted-foreground">
                            {notif.company} - {notif.location}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(notif.time).toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}
          </div>

          {/* My Applications */}
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowApplications(true)}>
            <FileText className="h-4 w-4" />
            My Applications
            {applications.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {applications.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search companies, jobs, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry === "all" ? "All Industries" : industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-48">
                <Code2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Job Category" />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => {
            const filteredJobs = getFilteredJobs(company)
            const newJobsInCompany = filteredJobs.filter((j) => j.isNew).length

            return (
              <Card
                key={company.name}
                className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
                onClick={() => setSelectedCompany(company)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${company.bgColor}`}>
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-8 w-8 rounded object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{company.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
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
                        <Bell className="h-4 w-4 text-primary" />
                      ) : (
                        <BellOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Users className="mr-1 h-3 w-3" />
                      {company.employees}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <MapPin className="mr-1 h-3 w-3" />
                      {company.indianOffices.length} Offices
                    </Badge>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{filteredJobs.length} Open Jobs</span>
                    </div>
                    {newJobsInCompany > 0 && (
                      <Badge className="bg-green-500/20 text-green-500">
                        <Sparkles className="mr-1 h-3 w-3" />
                        {newJobsInCompany} New
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    {filteredJobs.slice(0, 3).map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{job.title}</p>
                          <p className="text-xs text-muted-foreground">{job.salary}</p>
                        </div>
                        {job.isNew && (
                          <Badge variant="outline" className="ml-2 border-green-500/30 text-green-500 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    ))}
                    {filteredJobs.length > 3 && (
                      <p className="text-center text-xs text-muted-foreground">
                        +{filteredJobs.length - 3} more positions
                      </p>
                    )}
                  </div>

                  <Button variant="outline" className="mt-4 w-full gap-2" size="sm">
                    View All Jobs
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="py-12 text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No companies found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Company Detail Dialog */}
      <Dialog open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          {selectedCompany && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${selectedCompany.bgColor}`}>
                    <img
                      src={selectedCompany.logo}
                      alt={selectedCompany.name}
                      className="h-10 w-10 rounded object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedCompany.name}</DialogTitle>
                    <DialogDescription>{selectedCompany.industry}</DialogDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Switch
                      checked={subscribedCompanies.has(selectedCompany.name)}
                      onCheckedChange={() => toggleSubscription(selectedCompany.name)}
                    />
                    <Label className="text-sm">Job Alerts</Label>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="jobs" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="jobs">Open Jobs ({getFilteredJobs(selectedCompany).length})</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>

                <TabsContent value="jobs" className="mt-4">
                  <div className="mb-4">
                    <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3 pr-4">
                      {getFilteredJobs(selectedCompany).map((job) => (
                        <Card key={job.id} className="border-border/50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-foreground">{job.title}</h4>
                                  {job.isNew && (
                                    <Badge className="bg-green-500/20 text-green-500 text-xs">New</Badge>
                                  )}
                                </div>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {job.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Briefcase className="h-3 w-3" />
                                    {job.type}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {job.experienceLevel}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <IndianRupee className="h-3 w-3" />
                                    {job.salary}
                                  </span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {job.skills.slice(0, 5).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="ml-4"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleApply(selectedCompany, job)
                                }}
                              >
                                Apply Now
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-secondary/30 p-4">
                        <h4 className="mb-2 font-semibold text-foreground">Headquarters</h4>
                        <p className="text-sm text-muted-foreground">{selectedCompany.headquarters}</p>
                      </div>
                      <div className="rounded-lg bg-secondary/30 p-4">
                        <h4 className="mb-2 font-semibold text-foreground">Employees</h4>
                        <p className="text-sm text-muted-foreground">{selectedCompany.employees}</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-4">
                      <h4 className="mb-2 font-semibold text-foreground">India Offices</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.indianOffices.map((office) => (
                          <Badge key={office} variant="outline">
                            <MapPin className="mr-1 h-3 w-3" />
                            {office}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCompany.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 rounded-lg bg-secondary/30 p-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Dialog */}
      <Dialog open={!!applyingJob} onOpenChange={(open) => !open && setApplyingJob(null)}>
        <DialogContent className="max-w-2xl">
          {applyingJob && (
            <>
              <DialogHeader>
                <DialogTitle>Apply for {applyingJob.job.title}</DialogTitle>
                <DialogDescription>
                  {applyingJob.company.name} - {applyingJob.job.location}
                </DialogDescription>
              </DialogHeader>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm">
                  <span className={applicationStep >= 1 ? "text-primary" : "text-muted-foreground"}>
                    Personal Info
                  </span>
                  <span className={applicationStep >= 2 ? "text-primary" : "text-muted-foreground"}>
                    Documents
                  </span>
                  <span className={applicationStep >= 3 ? "text-primary" : "text-muted-foreground"}>
                    Review
                  </span>
                </div>
                <Progress value={(applicationStep / 3) * 100} className="mt-2" />
              </div>

              {applicationStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        value={applicationForm.fullName}
                        onChange={(e) => setApplicationForm({ ...applicationForm, fullName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Phone *</Label>
                      <Input
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <Label>LinkedIn Profile</Label>
                      <Input
                        value={applicationForm.linkedIn}
                        onChange={(e) => setApplicationForm({ ...applicationForm, linkedIn: e.target.value })}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Portfolio/GitHub</Label>
                    <Input
                      value={applicationForm.portfolio}
                      onChange={(e) => setApplicationForm({ ...applicationForm, portfolio: e.target.value })}
                      placeholder="github.com/johndoe"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setApplicationStep(2)}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {applicationStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Total Experience *</Label>
                      <Select
                        value={applicationForm.experience}
                        onValueChange={(value) => setApplicationForm({ ...applicationForm, experience: value })}
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
                          <SelectItem value="8+">8+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Notice Period *</Label>
                      <Select
                        value={applicationForm.noticePeriod}
                        onValueChange={(value) => setApplicationForm({ ...applicationForm, noticePeriod: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select notice period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="15days">15 days</SelectItem>
                          <SelectItem value="30days">30 days</SelectItem>
                          <SelectItem value="60days">60 days</SelectItem>
                          <SelectItem value="90days">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Expected Salary (LPA)</Label>
                    <Input
                      value={applicationForm.expectedSalary}
                      onChange={(e) => setApplicationForm({ ...applicationForm, expectedSalary: e.target.value })}
                      placeholder="e.g., 12-15 LPA"
                    />
                  </div>
                  <div>
                    <Label>Cover Letter</Label>
                    <Textarea
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                      placeholder="Tell us why you're a great fit for this role..."
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setApplicationStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setApplicationStep(3)}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {applicationStep === 3 && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-secondary/30 p-4">
                    <h4 className="mb-3 font-semibold text-foreground">Review Your Application</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Position:</span>
                        <span className="text-foreground">{applyingJob.job.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="text-foreground">{applyingJob.company.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground">{applicationForm.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-foreground">{applicationForm.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="text-foreground">{applicationForm.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Notice Period:</span>
                        <span className="text-foreground">{applicationForm.noticePeriod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setApplicationStep(2)}>
                      Back
                    </Button>
                    <Button onClick={submitApplication} className="gap-2">
                      <Send className="h-4 w-4" />
                      Submit Application
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* My Applications Dialog */}
      <Dialog open={showApplications} onOpenChange={setShowApplications}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Applications</DialogTitle>
            <DialogDescription>Track your job applications and schedule interviews</DialogDescription>
          </DialogHeader>

          {applications.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">No applications yet</h3>
              <p className="text-muted-foreground">Apply to jobs to track your applications here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{app.jobTitle}</h4>
                        <p className="text-sm text-muted-foreground">{app.companyName}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Applied on {app.appliedDate.toLocaleDateString()}
                        </p>
                        {app.interviewDate && (
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            <span className="text-foreground">
                              Interview: {app.interviewDate.toLocaleDateString()} at {app.interviewTime}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {app.interviewType === "video" && <Video className="mr-1 h-3 w-3" />}
                              {app.interviewType === "phone" && <MessageSquare className="mr-1 h-3 w-3" />}
                              {app.interviewType}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(app.status)}>{getStatusLabel(app.status)}</Badge>
                        {app.status === "screening" && (
                          <Button size="sm" variant="outline" onClick={() => setSchedulingInterview(app)}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Schedule Interview
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Interview Dialog */}
      <Dialog open={!!schedulingInterview} onOpenChange={(open) => !open && setSchedulingInterview(null)}>
        <DialogContent className="max-w-md">
          {schedulingInterview && (
            <>
              <DialogHeader>
                <DialogTitle>Schedule Interview</DialogTitle>
                <DialogDescription>
                  {schedulingInterview.jobTitle} at {schedulingInterview.companyName}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label>Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <Label>Interview Type & Time</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"].map((time) => (
                        <div key={time} className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => scheduleInterview("video", time)}
                          >
                            <Video className="mr-1 h-3 w-3" />
                            {time}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Click on a time slot to schedule a video interview
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
