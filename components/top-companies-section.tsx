"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Building2,
  ExternalLink,
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
  // Frontend
  "Frontend Developer": "frontend",
  "Senior Frontend Developer": "frontend",
  "React Developer": "frontend",
  "React.js Developer": "frontend",
  "Vue.js Developer": "frontend",
  "Angular Developer": "frontend",
  "UI Developer": "frontend",
  "Web Developer": "frontend",
  
  // Backend
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
  
  // Full Stack
  "Full Stack Developer": "fullstack",
  "Senior Full Stack Developer": "fullstack",
  "MERN Stack Developer": "fullstack",
  "Software Engineer": "fullstack",
  "Senior Software Engineer": "fullstack",
  "SDE": "fullstack",
  "SDE II - AWS": "fullstack",
  
  // Data
  "Data Scientist": "data",
  "Senior Data Scientist": "data",
  "Data Analyst": "data",
  "Data Engineer": "data",
  "Data Engineer - Redshift": "data",
  "BI Developer": "data",
  "Analytics Engineer": "data",
  "Data Analytics Manager": "data",
  
  // AI/ML
  "ML Engineer": "ai",
  "ML Engineer - LLMs": "ai",
  "Machine Learning Engineer": "ai",
  "AI Engineer": "ai",
  "AI Research Scientist": "ai",
  "Deep Learning Engineer": "ai",
  "Deep Learning Researcher": "ai",
  "NLP Engineer": "ai",
  "Computer Vision Engineer": "ai",
  "Watson AI Developer": "ai",
  "ML Infrastructure Engineer": "ai",
  
  // DevOps
  "DevOps Engineer": "devops",
  "Senior DevOps Engineer": "devops",
  "Cloud DevOps Engineer": "devops",
  "SRE": "devops",
  "Platform Engineer": "devops",
  "Cloud Engineer": "devops",
  "AWS Engineer": "devops",
  "Azure Engineer": "devops",
  "Azure DevOps Engineer": "devops",
  "Cloud Solutions Architect": "devops",
  "Solutions Architect": "devops",
  "OCI Solutions Architect": "devops",
  "Cloud Migration Specialist": "devops",
  "AWS Cloud Engineer": "devops",
  
  // Mobile
  "iOS Developer": "mobile",
  "iOS Software Engineer": "mobile",
  "Android Developer": "mobile",
  "React Native Developer": "mobile",
  "React Native Engineer": "mobile",
  "Flutter Developer": "mobile",
  "Mobile Developer": "mobile",
  
  // Security
  "Security Engineer": "security",
  "Cybersecurity Analyst": "security",
  "Cybersecurity Consultant": "security",
  "Cyber Security Consultant": "security",
  "Penetration Tester": "security",
  "SOC Analyst": "security",
  "Security Architect": "security",
  
  // Design
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
  applyUrl: string
}

interface Company {
  name: string
  logo: string
  industry: string
  description: string
  employees: string
  headquarters: string
  benefits: string[]
  careerUrl: string
  linkedinUrl: string
  color: string
  bgColor: string
  textColor: string
  jobs: CompanyJob[]
}

// Comprehensive company data with LinkedIn-style job listings
const companies: Company[] = [
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    industry: "Technology",
    description: "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and artificial intelligence.",
    employees: "180,000+",
    headquarters: "Mountain View, CA",
    benefits: ["Competitive salary & equity", "Health & wellness benefits", "Free meals & snacks", "Learning & development", "Parental leave", "Remote work options"],
    careerUrl: "https://careers.google.com",
    linkedinUrl: "https://www.linkedin.com/company/google/jobs/",
    color: "from-blue-500 to-green-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "g1", title: "Senior Software Engineer", location: "Mountain View, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$180,000 - $280,000", skills: ["Python", "Go", "Kubernetes", "GCP", "System Design"], posted: "2 days ago", isNew: true, category: "fullstack", applyUrl: "https://careers.google.com" },
      { id: "g2", title: "ML Engineer - LLMs", location: "New York, NY", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$200,000 - $320,000", skills: ["Python", "TensorFlow", "PyTorch", "LLMs", "Transformers"], posted: "1 day ago", isNew: true, category: "ai", applyUrl: "https://careers.google.com" },
      { id: "g3", title: "Cloud Solutions Architect", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$170,000 - $260,000", skills: ["GCP", "AWS", "Terraform", "Kubernetes", "Architecture"], posted: "3 days ago", isNew: true, category: "devops", applyUrl: "https://careers.google.com" },
      { id: "g4", title: "Frontend Developer", location: "San Francisco, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$150,000 - $230,000", skills: ["React", "TypeScript", "Angular", "Web Performance"], posted: "5 days ago", isNew: false, category: "frontend", applyUrl: "https://careers.google.com" },
      { id: "g5", title: "Data Scientist", location: "Seattle, WA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$160,000 - $250,000", skills: ["Python", "SQL", "BigQuery", "Machine Learning", "Statistics"], posted: "4 days ago", isNew: false, category: "data", applyUrl: "https://careers.google.com" },
      { id: "g6", title: "Android Developer", location: "Mountain View, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$165,000 - $255,000", skills: ["Kotlin", "Android SDK", "Jetpack Compose", "MVVM"], posted: "1 week ago", isNew: false, category: "mobile", applyUrl: "https://careers.google.com" },
      { id: "g7", title: "Security Engineer", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$175,000 - $270,000", skills: ["Cybersecurity", "Penetration Testing", "Cloud Security", "SIEM"], posted: "3 days ago", isNew: true, category: "security", applyUrl: "https://careers.google.com" },
      { id: "g8", title: "UX Designer", location: "New York, NY", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$140,000 - $210,000", skills: ["Figma", "User Research", "Prototyping", "Design Systems"], posted: "6 days ago", isNew: false, category: "design", applyUrl: "https://careers.google.com" },
    ],
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    industry: "Technology",
    description: "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services. Known for Windows, Office, Azure, and LinkedIn.",
    employees: "220,000+",
    headquarters: "Redmond, WA",
    benefits: ["Competitive compensation", "401(k) matching", "Health benefits", "Hybrid work", "Career growth", "Employee discounts"],
    careerUrl: "https://careers.microsoft.com",
    linkedinUrl: "https://www.linkedin.com/company/microsoft/jobs/",
    color: "from-blue-600 to-cyan-500",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "m1", title: "Azure DevOps Engineer", location: "Redmond, WA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$150,000 - $220,000", skills: ["Azure", "DevOps", "CI/CD", "Terraform", "Kubernetes"], posted: "1 day ago", isNew: true, category: "devops", applyUrl: "https://careers.microsoft.com" },
      { id: "m2", title: "Senior .NET Developer", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$145,000 - $200,000", skills: ["C#", ".NET Core", "Azure", "SQL Server", "Microservices"], posted: "2 days ago", isNew: true, category: "backend", applyUrl: "https://careers.microsoft.com" },
      { id: "m3", title: "AI Research Scientist", location: "Redmond, WA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$190,000 - $290,000", skills: ["Python", "Deep Learning", "NLP", "Computer Vision", "Research"], posted: "3 days ago", isNew: true, category: "ai", applyUrl: "https://careers.microsoft.com" },
      { id: "m4", title: "Product Designer", location: "Seattle, WA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$130,000 - $190,000", skills: ["Figma", "User Research", "UI/UX", "Design Systems"], posted: "5 days ago", isNew: false, category: "design", applyUrl: "https://careers.microsoft.com" },
      { id: "m5", title: "Full Stack Developer", location: "Austin, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$140,000 - $195,000", skills: ["React", "Node.js", "TypeScript", "Azure", "SQL"], posted: "4 days ago", isNew: false, category: "fullstack", applyUrl: "https://careers.microsoft.com" },
      { id: "m6", title: "Data Engineer", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$155,000 - $215,000", skills: ["Python", "Spark", "Azure Data Factory", "SQL", "ETL"], posted: "1 week ago", isNew: false, category: "data", applyUrl: "https://careers.microsoft.com" },
      { id: "m7", title: "iOS Developer", location: "Cupertino, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$145,000 - $205,000", skills: ["Swift", "iOS SDK", "SwiftUI", "Objective-C"], posted: "6 days ago", isNew: false, category: "mobile", applyUrl: "https://careers.microsoft.com" },
    ],
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    industry: "E-commerce & Cloud",
    description: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence. World's largest online marketplace.",
    employees: "1,500,000+",
    headquarters: "Seattle, WA",
    benefits: ["Sign-on bonus", "RSUs", "Career choice program", "Health benefits", "Parental leave", "Employee discounts"],
    careerUrl: "https://amazon.jobs",
    linkedinUrl: "https://www.linkedin.com/company/amazon/jobs/",
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    jobs: [
      { id: "a1", title: "SDE II - AWS", location: "Seattle, WA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$160,000 - $240,000", skills: ["Java", "AWS", "Distributed Systems", "Microservices"], posted: "1 day ago", isNew: true, category: "fullstack", applyUrl: "https://amazon.jobs" },
      { id: "a2", title: "Solutions Architect", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$150,000 - $220,000", skills: ["AWS", "Architecture", "Cloud Migration", "Terraform"], posted: "2 days ago", isNew: true, category: "devops", applyUrl: "https://amazon.jobs" },
      { id: "a3", title: "Data Engineer - Redshift", location: "Austin, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$155,000 - $210,000", skills: ["Python", "Redshift", "Spark", "AWS", "ETL"], posted: "4 days ago", isNew: false, category: "data", applyUrl: "https://amazon.jobs" },
      { id: "a4", title: "ML Engineer", location: "New York, NY", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$175,000 - $260,000", skills: ["Python", "TensorFlow", "SageMaker", "MLOps"], posted: "3 days ago", isNew: true, category: "ai", applyUrl: "https://amazon.jobs" },
      { id: "a5", title: "Frontend Developer", location: "San Francisco, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$145,000 - $200,000", skills: ["React", "TypeScript", "Redux", "AWS"], posted: "5 days ago", isNew: false, category: "frontend", applyUrl: "https://amazon.jobs" },
      { id: "a6", title: "Security Engineer", location: "Arlington, VA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$165,000 - $235,000", skills: ["AWS Security", "IAM", "Penetration Testing", "Compliance"], posted: "1 week ago", isNew: false, category: "security", applyUrl: "https://amazon.jobs" },
      { id: "a7", title: "Backend Developer", location: "Seattle, WA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$155,000 - $225,000", skills: ["Java", "Python", "DynamoDB", "Lambda", "API Gateway"], posted: "3 days ago", isNew: true, category: "backend", applyUrl: "https://amazon.jobs" },
    ],
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    industry: "Consumer Electronics",
    description: "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. Known for iPhone, Mac, iPad, and Apple Watch.",
    employees: "160,000+",
    headquarters: "Cupertino, CA",
    benefits: ["Product discounts", "Health & wellness", "Fitness centers", "Education support", "Stock purchase plan", "Commuter benefits"],
    careerUrl: "https://jobs.apple.com",
    linkedinUrl: "https://www.linkedin.com/company/apple/jobs/",
    color: "from-gray-600 to-gray-800",
    bgColor: "bg-gray-500/10",
    textColor: "text-gray-500",
    jobs: [
      { id: "ap1", title: "iOS Software Engineer", location: "Cupertino, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$175,000 - $260,000", skills: ["Swift", "iOS SDK", "SwiftUI", "Core Data", "Xcode"], posted: "2 days ago", isNew: true, category: "mobile", applyUrl: "https://jobs.apple.com" },
      { id: "ap2", title: "Machine Learning Engineer", location: "Cupertino, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$185,000 - $280,000", skills: ["Python", "PyTorch", "Core ML", "On-device ML"], posted: "3 days ago", isNew: true, category: "ai", applyUrl: "https://jobs.apple.com" },
      { id: "ap3", title: "Hardware Design Engineer", location: "Austin, TX", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$165,000 - $240,000", skills: ["Verilog", "ASIC", "Circuit Design", "Signal Processing"], posted: "1 week ago", isNew: false, category: "fullstack", applyUrl: "https://jobs.apple.com" },
      { id: "ap4", title: "Backend Engineer - Services", location: "Seattle, WA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$170,000 - $250,000", skills: ["Java", "Scala", "Distributed Systems", "Cloud"], posted: "4 days ago", isNew: false, category: "backend", applyUrl: "https://jobs.apple.com" },
      { id: "ap5", title: "UX Designer - Apple TV", location: "Cupertino, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$145,000 - $210,000", skills: ["Figma", "Sketch", "Prototyping", "Motion Design"], posted: "5 days ago", isNew: false, category: "design", applyUrl: "https://jobs.apple.com" },
      { id: "ap6", title: "Security Researcher", location: "Cupertino, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$180,000 - $270,000", skills: ["Reverse Engineering", "Exploit Development", "iOS Security"], posted: "1 day ago", isNew: true, category: "security", applyUrl: "https://jobs.apple.com" },
    ],
  },
  {
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    industry: "Social Media & VR",
    description: "Meta Platforms, Inc. (formerly Facebook) is an American multinational technology conglomerate. The company owns Facebook, Instagram, WhatsApp, and is building the metaverse.",
    employees: "70,000+",
    headquarters: "Menlo Park, CA",
    benefits: ["Generous PTO", "Parental leave", "Free meals", "Wellness stipend", "RSUs", "Learning & development"],
    careerUrl: "https://metacareers.com",
    linkedinUrl: "https://www.linkedin.com/company/meta/jobs/",
    color: "from-blue-600 to-purple-600",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "me1", title: "React Native Engineer", location: "Menlo Park, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$180,000 - $260,000", skills: ["React Native", "JavaScript", "iOS", "Android", "GraphQL"], posted: "1 day ago", isNew: true, category: "mobile", applyUrl: "https://metacareers.com" },
      { id: "me2", title: "VR/AR Software Engineer", location: "Burlingame, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$185,000 - $275,000", skills: ["C++", "Unity", "3D Graphics", "Computer Vision"], posted: "2 days ago", isNew: true, category: "fullstack", applyUrl: "https://metacareers.com" },
      { id: "me3", title: "ML Infrastructure Engineer", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$175,000 - $255,000", skills: ["Python", "PyTorch", "Distributed Systems", "MLOps"], posted: "4 days ago", isNew: false, category: "ai", applyUrl: "https://metacareers.com" },
      { id: "me4", title: "Frontend Developer", location: "New York, NY", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$155,000 - $225,000", skills: ["React", "TypeScript", "GraphQL", "Relay"], posted: "3 days ago", isNew: true, category: "frontend", applyUrl: "https://metacareers.com" },
      { id: "me5", title: "Data Scientist - Ads", location: "Menlo Park, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$170,000 - $250,000", skills: ["Python", "SQL", "Machine Learning", "A/B Testing"], posted: "5 days ago", isNew: false, category: "data", applyUrl: "https://metacareers.com" },
      { id: "me6", title: "Backend Engineer - WhatsApp", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$165,000 - $245,000", skills: ["Erlang", "Elixir", "Distributed Systems", "Messaging"], posted: "1 week ago", isNew: false, category: "backend", applyUrl: "https://metacareers.com" },
    ],
  },
  {
    name: "NVIDIA",
    logo: "https://logo.clearbit.com/nvidia.com",
    industry: "GPU & AI Computing",
    description: "NVIDIA Corporation is an American multinational technology company. Known for designing graphics processing units (GPUs), system on a chip units, and AI computing platforms.",
    employees: "26,000+",
    headquarters: "Santa Clara, CA",
    benefits: ["Top compensation", "RSUs", "Health benefits", "Cutting-edge projects", "Innovation labs", "Flexible work"],
    careerUrl: "https://nvidia.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/nvidia/jobs/",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    jobs: [
      { id: "n1", title: "CUDA Software Engineer", location: "Santa Clara, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$185,000 - $290,000", skills: ["CUDA", "C++", "GPU Programming", "Parallel Computing"], posted: "1 day ago", isNew: true, category: "fullstack", applyUrl: "https://nvidia.com/careers" },
      { id: "n2", title: "Deep Learning Researcher", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$200,000 - $320,000", skills: ["Python", "PyTorch", "Deep Learning", "Research", "LLMs"], posted: "2 days ago", isNew: true, category: "ai", applyUrl: "https://nvidia.com/careers" },
      { id: "n3", title: "Graphics Driver Developer", location: "Austin, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$165,000 - $245,000", skills: ["C++", "OpenGL", "Vulkan", "Driver Development"], posted: "4 days ago", isNew: false, category: "fullstack", applyUrl: "https://nvidia.com/careers" },
      { id: "n4", title: "AI Infrastructure Engineer", location: "Santa Clara, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$175,000 - $265,000", skills: ["Python", "Kubernetes", "TensorRT", "MLOps"], posted: "3 days ago", isNew: true, category: "devops", applyUrl: "https://nvidia.com/careers" },
      { id: "n5", title: "Data Scientist - Autonomous Vehicles", location: "Redmond, WA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$170,000 - $255,000", skills: ["Python", "Computer Vision", "Sensor Fusion", "Deep Learning"], posted: "1 week ago", isNew: false, category: "data", applyUrl: "https://nvidia.com/careers" },
    ],
  },
  {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    industry: "Electric Vehicles & Energy",
    description: "Tesla, Inc. is an American electric vehicle and clean energy company. Tesla designs and manufactures electric cars, battery energy storage, solar panels, and related products.",
    employees: "130,000+",
    headquarters: "Austin, TX",
    benefits: ["Stock options", "EV discounts", "Health benefits", "Mission-driven work", "Rapid growth", "Innovation culture"],
    careerUrl: "https://tesla.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/tesla-motors/jobs/",
    color: "from-red-600 to-red-700",
    bgColor: "bg-red-600/10",
    textColor: "text-red-600",
    jobs: [
      { id: "t1", title: "Autopilot Software Engineer", location: "Palo Alto, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$175,000 - $265,000", skills: ["C++", "Python", "Computer Vision", "Neural Networks", "Embedded"], posted: "2 days ago", isNew: true, category: "ai", applyUrl: "https://tesla.com/careers" },
      { id: "t2", title: "Battery Systems Engineer", location: "Austin, TX", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$145,000 - $210,000", skills: ["Battery Technology", "MATLAB", "System Modeling", "Electronics"], posted: "4 days ago", isNew: false, category: "fullstack", applyUrl: "https://tesla.com/careers" },
      { id: "t3", title: "Full Stack Developer - Energy", location: "Fremont, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$150,000 - $220,000", skills: ["React", "Python", "Django", "AWS", "PostgreSQL"], posted: "3 days ago", isNew: true, category: "fullstack", applyUrl: "https://tesla.com/careers" },
      { id: "t4", title: "Data Engineer", location: "Austin, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$155,000 - $225,000", skills: ["Python", "Spark", "Kafka", "AWS", "Data Pipelines"], posted: "5 days ago", isNew: false, category: "data", applyUrl: "https://tesla.com/careers" },
      { id: "t5", title: "Robotics Engineer - Optimus", location: "Palo Alto, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$165,000 - $250,000", skills: ["C++", "ROS", "Motion Planning", "Control Systems"], posted: "1 day ago", isNew: true, category: "fullstack", applyUrl: "https://tesla.com/careers" },
    ],
  },
  {
    name: "IBM",
    logo: "https://logo.clearbit.com/ibm.com",
    industry: "Enterprise Technology",
    description: "IBM (International Business Machines Corporation) is an American multinational technology company. Pioneer in enterprise computing, AI (Watson), hybrid cloud, and quantum computing.",
    employees: "280,000+",
    headquarters: "Armonk, NY",
    benefits: ["Remote-first culture", "Learning platforms", "Diverse teams", "Global projects", "Health benefits", "Retirement plans"],
    careerUrl: "https://ibm.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/ibm/jobs/",
    color: "from-blue-700 to-blue-500",
    bgColor: "bg-blue-700/10",
    textColor: "text-blue-700",
    jobs: [
      { id: "ib1", title: "Cloud Solutions Architect", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$145,000 - $200,000", skills: ["IBM Cloud", "Kubernetes", "OpenShift", "Architecture"], posted: "2 days ago", isNew: true, category: "devops", applyUrl: "https://ibm.com/careers" },
      { id: "ib2", title: "Watson AI Developer", location: "New York, NY", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$135,000 - $185,000", skills: ["Python", "Watson", "NLP", "AI/ML", "APIs"], posted: "4 days ago", isNew: false, category: "ai", applyUrl: "https://ibm.com/careers" },
      { id: "ib3", title: "Cybersecurity Consultant", location: "Washington, DC", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$140,000 - $195,000", skills: ["Security", "SIEM", "Incident Response", "Compliance"], posted: "5 days ago", isNew: false, category: "security", applyUrl: "https://ibm.com/careers" },
      { id: "ib4", title: "Full Stack Developer", location: "Austin, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$130,000 - $180,000", skills: ["React", "Node.js", "Java", "Kubernetes", "IBM Cloud"], posted: "3 days ago", isNew: true, category: "fullstack", applyUrl: "https://ibm.com/careers" },
      { id: "ib5", title: "Data Scientist - Quantum", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$155,000 - $215,000", skills: ["Python", "Qiskit", "Quantum Computing", "Machine Learning"], posted: "1 week ago", isNew: false, category: "data", applyUrl: "https://ibm.com/careers" },
    ],
  },
  {
    name: "Intel",
    logo: "https://logo.clearbit.com/intel.com",
    industry: "Semiconductors",
    description: "Intel Corporation is an American multinational corporation and technology company. World leader in semiconductor chip manufacturing and computing innovation.",
    employees: "130,000+",
    headquarters: "Santa Clara, CA",
    benefits: ["Sabbatical program", "Tuition assistance", "Patent bonuses", "Relocation support", "Health benefits", "Stock purchase"],
    careerUrl: "https://intel.com/jobs",
    linkedinUrl: "https://www.linkedin.com/company/intel-corporation/jobs/",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-600",
    jobs: [
      { id: "in1", title: "ASIC Design Engineer", location: "Santa Clara, CA", locationType: "On-site", type: "Full-time", experienceLevel: "Senior", salary: "$155,000 - $225,000", skills: ["Verilog", "ASIC", "RTL Design", "SystemVerilog"], posted: "2 days ago", isNew: true, category: "fullstack", applyUrl: "https://intel.com/jobs" },
      { id: "in2", title: "Firmware Developer", location: "Portland, OR", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$140,000 - $195,000", skills: ["C", "Embedded Systems", "BIOS/UEFI", "Assembly"], posted: "4 days ago", isNew: false, category: "backend", applyUrl: "https://intel.com/jobs" },
      { id: "in3", title: "AI Software Engineer", location: "Santa Clara, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$160,000 - $235,000", skills: ["Python", "OpenVINO", "Deep Learning", "Model Optimization"], posted: "3 days ago", isNew: true, category: "ai", applyUrl: "https://intel.com/jobs" },
      { id: "in4", title: "Cloud Platform Engineer", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$135,000 - $190,000", skills: ["Kubernetes", "Docker", "Terraform", "CI/CD"], posted: "1 week ago", isNew: false, category: "devops", applyUrl: "https://intel.com/jobs" },
    ],
  },
  {
    name: "Oracle",
    logo: "https://logo.clearbit.com/oracle.com",
    industry: "Enterprise Software",
    description: "Oracle Corporation is an American multinational computer technology corporation. Leading provider of database software, cloud infrastructure (OCI), and enterprise software solutions.",
    employees: "140,000+",
    headquarters: "Austin, TX",
    benefits: ["Flexible work", "Stock purchase plan", "Health benefits", "Training programs", "Career mobility", "Wellness programs"],
    careerUrl: "https://oracle.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/oracle/jobs/",
    color: "from-red-600 to-red-500",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    jobs: [
      { id: "o1", title: "Oracle DBA", location: "Austin, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$125,000 - $175,000", skills: ["Oracle Database", "PL/SQL", "RAC", "Performance Tuning"], posted: "1 day ago", isNew: true, category: "data", applyUrl: "https://oracle.com/careers" },
      { id: "o2", title: "Java Cloud Developer", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$140,000 - $195,000", skills: ["Java", "Spring Boot", "OCI", "Microservices", "Kubernetes"], posted: "3 days ago", isNew: true, category: "backend", applyUrl: "https://oracle.com/careers" },
      { id: "o3", title: "OCI Solutions Architect", location: "Chicago, IL", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$150,000 - $210,000", skills: ["OCI", "Cloud Architecture", "Terraform", "Networking"], posted: "5 days ago", isNew: false, category: "devops", applyUrl: "https://oracle.com/careers" },
      { id: "o4", title: "Frontend Developer", location: "Seattle, WA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$130,000 - $180,000", skills: ["React", "JavaScript", "Oracle JET", "REST APIs"], posted: "4 days ago", isNew: false, category: "frontend", applyUrl: "https://oracle.com/careers" },
    ],
  },
  {
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    industry: "Consulting",
    description: "Accenture plc is an Irish-American professional services company. Global leader in digital transformation, consulting, technology, and operations services.",
    employees: "700,000+",
    headquarters: "Dublin, Ireland",
    benefits: ["Global mobility", "Training programs", "Flexible work", "Diverse projects", "Health benefits", "Career development"],
    careerUrl: "https://accenture.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/accenture/jobs/",
    color: "from-purple-600 to-purple-500",
    bgColor: "bg-purple-600/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "ac1", title: "Technology Consultant", location: "New York, NY", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$95,000 - $155,000", skills: ["Consulting", "Cloud", "Agile", "Client Management"], posted: "1 day ago", isNew: true, category: "fullstack", applyUrl: "https://accenture.com/careers" },
      { id: "ac2", title: "Cloud Migration Specialist", location: "Chicago, IL", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$110,000 - $170,000", skills: ["AWS", "Azure", "Cloud Migration", "DevOps"], posted: "3 days ago", isNew: true, category: "devops", applyUrl: "https://accenture.com/careers" },
      { id: "ac3", title: "Data Analytics Manager", location: "Remote", locationType: "Remote", type: "Full-time", experienceLevel: "Senior", salary: "$125,000 - $185,000", skills: ["Data Analytics", "Tableau", "Python", "SQL", "Leadership"], posted: "5 days ago", isNew: false, category: "data", applyUrl: "https://accenture.com/careers" },
      { id: "ac4", title: "AI/ML Consultant", location: "San Francisco, CA", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$130,000 - $190,000", skills: ["Python", "Machine Learning", "Consulting", "AI Strategy"], posted: "2 days ago", isNew: true, category: "ai", applyUrl: "https://accenture.com/careers" },
      { id: "ac5", title: "Full Stack Developer", location: "Dallas, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$100,000 - $150,000", skills: ["React", "Node.js", "Java", "AWS", "Agile"], posted: "4 days ago", isNew: false, category: "fullstack", applyUrl: "https://accenture.com/careers" },
    ],
  },
  {
    name: "Deloitte",
    logo: "https://logo.clearbit.com/deloitte.com",
    industry: "Professional Services",
    description: "Deloitte Touche Tohmatsu Limited is a British multinational professional services network. One of the Big Four accounting organizations providing audit, consulting, and advisory services.",
    employees: "415,000+",
    headquarters: "London, UK",
    benefits: ["Career development", "Global exposure", "Work-life balance", "Mentorship", "Health benefits", "Flexible work"],
    careerUrl: "https://deloitte.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/deloitte/jobs/",
    color: "from-green-600 to-green-500",
    bgColor: "bg-green-600/10",
    textColor: "text-green-600",
    jobs: [
      { id: "d1", title: "Cyber Security Consultant", location: "Washington, DC", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$100,000 - $160,000", skills: ["Cybersecurity", "Risk Assessment", "Compliance", "SIEM"], posted: "2 days ago", isNew: true, category: "security", applyUrl: "https://deloitte.com/careers" },
      { id: "d2", title: "SAP Implementation Lead", location: "Dallas, TX", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$115,000 - $175,000", skills: ["SAP", "ERP", "Project Management", "Integration"], posted: "4 days ago", isNew: false, category: "fullstack", applyUrl: "https://deloitte.com/careers" },
      { id: "d3", title: "Data Engineer", location: "New York, NY", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "$95,000 - $145,000", skills: ["Python", "SQL", "Spark", "Data Warehousing"], posted: "3 days ago", isNew: true, category: "data", applyUrl: "https://deloitte.com/careers" },
      { id: "d4", title: "Cloud Architect", location: "Chicago, IL", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "$120,000 - $180,000", skills: ["AWS", "Azure", "GCP", "Architecture", "DevOps"], posted: "5 days ago", isNew: false, category: "devops", applyUrl: "https://deloitte.com/careers" },
    ],
  },
  {
    name: "TCS",
    logo: "https://logo.clearbit.com/tcs.com",
    industry: "IT Services",
    description: "Tata Consultancy Services (TCS) is an Indian multinational IT services and consulting company. Part of the Tata Group and largest IT employer in India.",
    employees: "600,000+",
    headquarters: "Mumbai, India",
    benefits: ["Job security", "Learning platforms", "Global projects", "Employee programs", "Health benefits", "Internal mobility"],
    careerUrl: "https://tcs.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/tata-consultancy-services/jobs/",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-600",
    jobs: [
      { id: "tcs1", title: "Java Full Stack Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 10-20 LPA", skills: ["Java", "Spring Boot", "React", "Microservices", "SQL"], posted: "1 day ago", isNew: true, category: "fullstack", applyUrl: "https://tcs.com/careers" },
      { id: "tcs2", title: "Cloud DevOps Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "INR 12-22 LPA", skills: ["AWS", "Azure", "DevOps", "Kubernetes", "Terraform"], posted: "2 days ago", isNew: true, category: "devops", applyUrl: "https://tcs.com/careers" },
      { id: "tcs3", title: "Data Scientist", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 14-25 LPA", skills: ["Python", "Machine Learning", "SQL", "Tableau"], posted: "4 days ago", isNew: false, category: "data", applyUrl: "https://tcs.com/careers" },
      { id: "tcs4", title: "Python Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 8-16 LPA", skills: ["Python", "Django", "FastAPI", "REST APIs", "PostgreSQL"], posted: "3 days ago", isNew: true, category: "backend", applyUrl: "https://tcs.com/careers" },
      { id: "tcs5", title: "React Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 9-18 LPA", skills: ["React", "TypeScript", "Redux", "REST APIs"], posted: "5 days ago", isNew: false, category: "frontend", applyUrl: "https://tcs.com/careers" },
    ],
  },
  {
    name: "Infosys",
    logo: "https://logo.clearbit.com/infosys.com",
    industry: "IT Services",
    description: "Infosys Limited is an Indian multinational IT services and consulting company. Known for digital transformation, IT consulting, and business process outsourcing services.",
    employees: "340,000+",
    headquarters: "Bangalore, India",
    benefits: ["Training programs", "Internal mobility", "Innovation hubs", "Health benefits", "Global exposure", "Work-life balance"],
    careerUrl: "https://infosys.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/infosys/jobs/",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "inf1", title: "Python Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 8-15 LPA", skills: ["Python", "Django", "Flask", "REST APIs", "SQL"], posted: "2 days ago", isNew: true, category: "backend", applyUrl: "https://infosys.com/careers" },
      { id: "inf2", title: "SAP ABAP Consultant", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "INR 12-22 LPA", skills: ["SAP ABAP", "SAP Fiori", "S/4HANA", "Integration"], posted: "4 days ago", isNew: false, category: "fullstack", applyUrl: "https://infosys.com/careers" },
      { id: "inf3", title: "ML Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "INR 15-28 LPA", skills: ["Python", "TensorFlow", "PyTorch", "NLP", "MLOps"], posted: "3 days ago", isNew: true, category: "ai", applyUrl: "https://infosys.com/careers" },
      { id: "inf4", title: "Angular Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 7-14 LPA", skills: ["Angular", "TypeScript", "RxJS", "REST APIs"], posted: "5 days ago", isNew: false, category: "frontend", applyUrl: "https://infosys.com/careers" },
    ],
  },
  {
    name: "Wipro",
    logo: "https://logo.clearbit.com/wipro.com",
    industry: "IT Services",
    description: "Wipro Limited is an Indian multinational IT, consulting, and business process services company. Known for IT services, digital transformation, and sustainability initiatives.",
    employees: "250,000+",
    headquarters: "Bangalore, India",
    benefits: ["Flexible work", "Skill development", "Global exposure", "Wellness programs", "Health benefits", "Career growth"],
    careerUrl: "https://wipro.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/wipro/jobs/",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    jobs: [
      { id: "w1", title: "React.js Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 7-14 LPA", skills: ["React", "JavaScript", "Redux", "REST APIs", "HTML/CSS"], posted: "1 day ago", isNew: true, category: "frontend", applyUrl: "https://wipro.com/careers" },
      { id: "w2", title: "AWS Cloud Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Senior", salary: "INR 12-20 LPA", skills: ["AWS", "Terraform", "Kubernetes", "CI/CD", "Python"], posted: "3 days ago", isNew: true, category: "devops", applyUrl: "https://wipro.com/careers" },
      { id: "w3", title: "Data Analyst", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Entry-Mid", salary: "INR 5-10 LPA", skills: ["SQL", "Python", "Tableau", "Excel", "Power BI"], posted: "4 days ago", isNew: false, category: "data", applyUrl: "https://wipro.com/careers" },
      { id: "w4", title: "Java Backend Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Mid-Senior", salary: "INR 9-17 LPA", skills: ["Java", "Spring Boot", "Hibernate", "MySQL", "Microservices"], posted: "5 days ago", isNew: false, category: "backend", applyUrl: "https://wipro.com/careers" },
    ],
  },
]

interface Notification {
  id: string
  company: string
  job: string
  time: string
  isRead: boolean
}

export function TopCompaniesSection() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [industryFilter, setIndustryFilter] = useState<string>("all")
  const [skillFilter, setSkillFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [subscribedCompanies, setSubscribedCompanies] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasNewNotifications, setHasNewNotifications] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const industries = ["all", ...new Set(companies.map((c) => c.industry))]

  // Filter companies by industry
  const industryFilteredCompanies = industryFilter === "all"
    ? companies
    : companies.filter((c) => c.industry === industryFilter)

  // Filter companies that have jobs matching the skill filter
  const filteredCompanies = industryFilteredCompanies.filter((company) => {
    const matchesSkill = skillFilter === "all" || company.jobs.some(job => job.category === skillFilter)
    const matchesSearch = searchQuery === "" || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.jobs.some(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    return matchesSkill && matchesSearch
  })

  // Get jobs for selected company filtered by skill
  const getFilteredJobs = (company: Company) => {
    if (skillFilter === "all") return company.jobs
    return company.jobs.filter(job => job.category === skillFilter)
  }

  // Calculate totals
  const totalJobs = filteredCompanies.reduce((acc, c) => acc + getFilteredJobs(c).length, 0)
  const newJobs = filteredCompanies.reduce((acc, c) => acc + getFilteredJobs(c).filter(j => j.isNew).length, 0)

  const toggleSubscription = useCallback((companyName: string) => {
    setSubscribedCompanies(prev => {
      const newSet = new Set(prev)
      if (newSet.has(companyName)) {
        newSet.delete(companyName)
        // Add unsubscribe notification
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          company: companyName,
          job: "You have unsubscribed from job alerts",
          time: "Just now",
          isRead: false
        }
        setNotifications(prevNotifs => [newNotification, ...prevNotifs.slice(0, 19)])
      } else {
        newSet.add(companyName)
        // Add subscribe notification
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          company: companyName,
          job: "You will receive alerts for new job postings",
          time: "Just now",
          isRead: false
        }
        setNotifications(prevNotifs => [newNotification, ...prevNotifs.slice(0, 19)])
        setHasNewNotifications(true)
      }
      return newSet
    })
  }, [])

  // Simulate new job notifications for subscribed companies
  useEffect(() => {
    const interval = setInterval(() => {
      if (subscribedCompanies.size > 0) {
        const subscribedArray = Array.from(subscribedCompanies)
        const randomCompanyName = subscribedArray[Math.floor(Math.random() * subscribedArray.length)]
        const company = companies.find(c => c.name === randomCompanyName)
        if (company && company.jobs.length > 0) {
          const randomJob = company.jobs[Math.floor(Math.random() * company.jobs.length)]
          const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            company: company.name,
            job: `New opening: ${randomJob.title} - ${randomJob.location}`,
            time: "Just now",
            isRead: false
          }
          setNotifications(prev => [newNotification, ...prev.slice(0, 19)])
          setHasNewNotifications(true)
        }
      }
    }, 45000) // Every 45 seconds for demo

    return () => clearInterval(interval)
  }, [subscribedCompanies])

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    setHasNewNotifications(false)
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <section id="top-companies" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
              Career Opportunities
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Top Companies Hiring Now
            </h2>
            <p className="mt-2 text-muted-foreground">
              {totalJobs} open positions across {filteredCompanies.length} companies
              {newJobs > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-green-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  {newJobs} new this week
                </span>
              )}
            </p>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setShowNotifications(!showNotifications)
                if (!showNotifications) markAllAsRead()
              }}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {hasNewNotifications && unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-border bg-background shadow-lg">
                <div className="flex items-center justify-between border-b border-border p-3">
                  <h4 className="font-semibold text-foreground">Notifications</h4>
                  {notifications.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                      Mark all read
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-72">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <BellOff className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">No notifications yet</p>
                      <p className="text-xs text-muted-foreground">Subscribe to companies to get job alerts</p>
                    </div>
                  ) : (
                    <div className="space-y-1 p-1">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`rounded-md p-3 transition-colors ${
                            notif.isRead ? "bg-transparent" : "bg-primary/5"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <Briefcase className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{notif.company}</p>
                              <p className="text-xs text-muted-foreground truncate">{notif.job}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search companies, jobs, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4">
            {/* Industry Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Industry:</span>
              {industries.map((industry) => (
                <Badge
                  key={industry}
                  variant={industryFilter === industry ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setIndustryFilter(industry)}
                >
                  {industry === "all" ? "All Industries" : industry}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skill Categories */}
          <ScrollArea className="w-full pb-2">
            <div className="flex gap-2">
              {skillCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={skillFilter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSkillFilter(category.id)}
                  className="shrink-0 gap-2"
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => {
            const filteredJobs = getFilteredJobs(company)
            const newJobsCount = filteredJobs.filter(j => j.isNew).length
            
            return (
              <Card
                key={company.name}
                className="group cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
                onClick={() => setSelectedCompany(company)}
              >
                <CardContent className="p-6">
                  {/* Company Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${company.bgColor}`}>
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-8 w-8 rounded object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.parentElement!.innerHTML = `<span class="text-lg font-bold ${company.textColor}">${company.name.charAt(0)}</span>`
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{company.name}</h3>
                        <p className="text-xs text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
                    {newJobsCount > 0 && (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        {newJobsCount} new
                      </Badge>
                    )}
                  </div>

                  {/* Company Info */}
                  <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{company.employees}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{company.headquarters}</span>
                    </div>
                  </div>

                  {/* Jobs Preview */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {filteredJobs.length} Open Position{filteredJobs.length !== 1 ? "s" : ""}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-1">
                      {filteredJobs.slice(0, 2).map((job) => (
                        <div key={job.id} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground truncate max-w-[60%]">{job.title}</span>
                          {job.isNew && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 border-green-500/30 text-green-500">
                              New
                            </Badge>
                          )}
                        </div>
                      ))}
                      {filteredJobs.length > 2 && (
                        <span className="text-xs text-primary">+{filteredJobs.length - 2} more</span>
                      )}
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <span className="text-xs text-muted-foreground">Get job alerts</span>
                    <Switch
                      checked={subscribedCompanies.has(company.name)}
                      onCheckedChange={(e) => {
                        e.stopPropagation?.()
                        toggleSubscription(company.name)
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No companies found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Company Detail Dialog */}
        <Dialog open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden border-border/50 bg-background/95 backdrop-blur-xl p-0">
            {selectedCompany && (
              <>
                {/* Header */}
                <div className={`bg-gradient-to-r ${selectedCompany.color} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                        <img
                          src={selectedCompany.logo}
                          alt={selectedCompany.name}
                          className="h-10 w-10 rounded object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.parentElement!.innerHTML = `<span class="text-2xl font-bold text-white">${selectedCompany.name.charAt(0)}</span>`
                          }}
                        />
                      </div>
                      <div className="text-white">
                        <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                        <p className="text-white/80">{selectedCompany.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toggleSubscription(selectedCompany.name)}
                        className="gap-2"
                      >
                        {subscribedCompanies.has(selectedCompany.name) ? (
                          <>
                            <Check className="h-4 w-4" />
                            Subscribed
                          </>
                        ) : (
                          <>
                            <Bell className="h-4 w-4" />
                            Get Alerts
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedCompany(null)} className="text-white hover:bg-white/20">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                  <Tabs defaultValue="jobs" className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-6">
                      <TabsTrigger value="jobs" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                        <Briefcase className="h-4 w-4" />
                        Open Jobs ({getFilteredJobs(selectedCompany).length})
                      </TabsTrigger>
                      <TabsTrigger value="about" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                        <Building2 className="h-4 w-4" />
                        About
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="jobs" className="p-6 space-y-4">
                      {/* Jobs List */}
                      {getFilteredJobs(selectedCompany).length === 0 ? (
                        <div className="text-center py-8">
                          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No jobs match the selected skill filter</p>
                          <Button variant="outline" className="mt-4" onClick={() => setSkillFilter("all")}>
                            Show All Jobs
                          </Button>
                        </div>
                      ) : (
                        getFilteredJobs(selectedCompany).map((job) => (
                          <Card key={job.id} className="border-border/50 hover:border-primary/30 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-semibold text-foreground">{job.title}</h4>
                                    {job.isNew && (
                                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                        New
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                      {job.locationType}
                                    </Badge>
                                  </div>
                                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3.5 w-3.5" />
                                      {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Briefcase className="h-3.5 w-3.5" />
                                      {job.type}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <DollarSign className="h-3.5 w-3.5" />
                                      {job.salary}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      {job.posted}
                                    </span>
                                  </div>
                                  <div className="mt-3 flex flex-wrap gap-1.5">
                                    {job.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Button asChild className="shrink-0 gap-2">
                                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                                    Apply Now
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}

                      {/* LinkedIn Jobs Link */}
                      <div className="pt-4 border-t border-border">
                        <Button asChild variant="outline" className="w-full gap-2">
                          <a href={selectedCompany.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            View All Jobs on LinkedIn
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="about" className="p-6 space-y-6">
                      {/* Description */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">About {selectedCompany.name}</h4>
                        <p className="text-muted-foreground leading-relaxed">{selectedCompany.description}</p>
                      </div>

                      {/* Company Info */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Employees</p>
                            <p className="font-medium text-foreground">{selectedCompany.employees}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Headquarters</p>
                            <p className="font-medium text-foreground">{selectedCompany.headquarters}</p>
                          </div>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Employee Benefits</h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {selectedCompany.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="h-4 w-4 text-green-500" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Career Page Link */}
                      <div className="pt-4 border-t border-border">
                        <Button asChild className="w-full gap-2">
                          <a href={selectedCompany.careerUrl} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            Visit Career Page
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
