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

// Comprehensive Indian company job data
const companies: Company[] = [
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
      { id: "inf11", title: "Salesforce Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 14 LPA", skills: ["Salesforce", "Apex", "Lightning", "SOQL", "Integration"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Develop and customize Salesforce solutions.", requirements: ["2+ years Salesforce experience", "Salesforce certifications", "Apex programming"], responsibilities: ["Salesforce development", "Customization", "Integration", "User support"] },
      { id: "inf12", title: "Network Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["Network Security", "Firewalls", "SIEM", "Penetration Testing", "CISSP"], posted: "5 days ago", isNew: false, category: "security", description: "Protect network infrastructure and implement security measures.", requirements: ["3+ years network security experience", "Security certifications", "Firewall expertise"], responsibilities: ["Network security", "Threat monitoring", "Incident response", "Security audits"] },
    ],
  },
  {
    name: "Wipro",
    logo: "https://logo.clearbit.com/wipro.com",
    industry: "IT Services & Consulting",
    description: "Wipro Limited is an Indian multinational corporation that provides IT, consulting and business process services. It is headquartered in Bangalore and is one of the Big Three IT services companies in India.",
    employees: "250,000+",
    headquarters: "Bangalore, India",
    indianOffices: ["Bangalore", "Chennai", "Hyderabad", "Pune", "Mumbai", "Kolkata", "Delhi NCR", "Kochi"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "ESOP", "Learning Programs", "Wellness Benefits", "Flexible Hours", "Career Growth"],
    color: "from-purple-600 to-purple-400",
    bgColor: "bg-purple-600/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "wip1", title: "Project Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.5 - 4.0 LPA", skills: ["Java", "Python", "SQL", "Aptitude", "Communication"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Begin your career journey with Wipro as a Project Engineer.", requirements: ["B.Tech/BE/MCA", "60% aggregate", "No backlogs"], responsibilities: ["Software development", "Testing", "Learning new technologies", "Team work"] },
      { id: "wip2", title: "Senior Software Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "10 - 18 LPA", skills: ["Java", "Spring", "Microservices", "Docker", "Kubernetes"], posted: "2 days ago", isNew: true, category: "backend", description: "Work on enterprise-level software solutions.", requirements: ["4+ years Java experience", "Microservices expertise", "Container knowledge"], responsibilities: ["Software development", "Code reviews", "Technical design", "Mentoring juniors"] },
      { id: "wip3", title: "Cloud Data Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Azure", "Databricks", "Spark", "Python", "SQL"], posted: "3 days ago", isNew: true, category: "data", description: "Build and maintain data pipelines on cloud platforms.", requirements: ["3+ years data engineering experience", "Azure/AWS experience", "Big data tools knowledge"], responsibilities: ["Data pipeline development", "ETL processes", "Data modeling", "Performance optimization"] },
      { id: "wip4", title: "Vue.js Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "5 - 12 LPA", skills: ["Vue.js", "JavaScript", "Vuex", "HTML/CSS", "REST APIs"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build modern web applications using Vue.js framework.", requirements: ["2+ years Vue.js experience", "JavaScript proficiency", "Frontend best practices"], responsibilities: ["Vue.js development", "Component design", "API integration", "Testing"] },
      { id: "wip5", title: "ServiceNow Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["ServiceNow", "JavaScript", "ITSM", "Workflow", "Integration"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Develop and configure ServiceNow solutions.", requirements: ["2+ years ServiceNow experience", "ServiceNow certifications", "JavaScript skills"], responsibilities: ["ServiceNow development", "Customization", "Workflow design", "User support"] },
      { id: "wip6", title: "DevSecOps Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["DevOps", "Security", "AWS", "Docker", "Kubernetes", "CI/CD"], posted: "1 week ago", isNew: false, category: "devops", description: "Implement security practices in DevOps pipelines.", requirements: ["3+ years DevOps experience", "Security knowledge", "Cloud expertise"], responsibilities: ["DevSecOps implementation", "Security automation", "Pipeline security", "Vulnerability management"] },
      { id: "wip7", title: "iOS Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Swift", "iOS SDK", "Xcode", "Core Data", "REST APIs"], posted: "3 days ago", isNew: true, category: "mobile", description: "Develop iOS applications for various clients.", requirements: ["2+ years iOS experience", "Swift proficiency", "Published apps preferred"], responsibilities: ["iOS development", "UI implementation", "App store deployment", "Bug fixing"] },
      { id: "wip8", title: "Big Data Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Hadoop", "Spark", "Hive", "Python", "Kafka"], posted: "6 days ago", isNew: false, category: "data", description: "Build and maintain big data infrastructure.", requirements: ["3+ years big data experience", "Hadoop ecosystem knowledge", "Programming skills"], responsibilities: ["Big data development", "Data processing", "Infrastructure maintenance", "Performance tuning"] },
      { id: "wip9", title: "NLP Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "10 - 18 LPA", skills: ["Python", "NLP", "BERT", "Transformers", "spaCy"], posted: "2 days ago", isNew: true, category: "ai", description: "Develop NLP solutions for text processing and understanding.", requirements: ["2+ years NLP experience", "Deep learning knowledge", "Python expertise"], responsibilities: ["NLP model development", "Text processing", "Model training", "API development"] },
      { id: "wip10", title: "Scrum Master", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "14 - 22 LPA", skills: ["Scrum", "Agile", "JIRA", "Kanban", "Team Management"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Lead agile teams and ensure successful project delivery.", requirements: ["5+ years Scrum Master experience", "CSM certification", "Team leadership"], responsibilities: ["Sprint planning", "Daily standups", "Retrospectives", "Impediment removal"] },
      { id: "wip11", title: "Pega Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 15 LPA", skills: ["Pega", "Java", "BPM", "Case Management", "Integration"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Develop workflow solutions using Pega platform.", requirements: ["2+ years Pega experience", "Pega certifications", "BPM knowledge"], responsibilities: ["Pega development", "Workflow design", "Integration", "Testing"] },
      { id: "wip12", title: "Application Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Application Security", "OWASP", "Penetration Testing", "SAST", "DAST"], posted: "5 days ago", isNew: false, category: "security", description: "Ensure security of applications throughout the development lifecycle.", requirements: ["3+ years app security experience", "Security certifications", "Penetration testing skills"], responsibilities: ["Security assessments", "Code reviews", "Vulnerability management", "Security training"] },
    ],
  },
  {
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    industry: "Consulting & Technology",
    description: "Accenture is a global professional services company specializing in IT services and consulting. With strong presence in India, it offers services across strategy, consulting, digital, technology and operations.",
    employees: "700,000+",
    headquarters: "Dublin, Ireland (India HQ: Mumbai)",
    indianOffices: ["Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Gurgaon", "Kolkata", "Coimbatore"],
    benefits: ["Competitive Salary", "Health Insurance", "Provident Fund", "Performance Bonus", "Learning Opportunities", "Global Exposure", "Flexible Working", "Employee Assistance Program"],
    color: "from-violet-600 to-fuchsia-500",
    bgColor: "bg-violet-600/10",
    textColor: "text-violet-600",
    jobs: [
      { id: "acc1", title: "Associate Software Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "4.5 - 5.5 LPA", skills: ["Java", "Python", "SQL", "Agile", "Problem Solving"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Join Accenture as an Associate Software Engineer and work with global teams.", requirements: ["B.Tech/BE/MCA", "65% aggregate", "Strong communication"], responsibilities: ["Software development", "Client interaction", "Agile practices", "Continuous learning"] },
      { id: "acc2", title: "Full Stack Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build end-to-end solutions for enterprise clients.", requirements: ["3+ years full stack experience", "MERN/MEAN stack", "Cloud experience"], responsibilities: ["Full stack development", "Architecture design", "Code reviews", "Client demos"] },
      { id: "acc3", title: "Data Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Python", "Spark", "AWS", "Snowflake", "Airflow"], posted: "3 days ago", isNew: true, category: "data", description: "Build robust data pipelines for analytics solutions.", requirements: ["3+ years data engineering", "Cloud data platforms", "ETL expertise"], responsibilities: ["Pipeline development", "Data modeling", "Performance optimization", "Data quality"] },
      { id: "acc4", title: "Consultant - Technology", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "18 - 28 LPA", skills: ["Architecture", "Cloud", "Microservices", "Consulting", "Leadership"], posted: "4 days ago", isNew: false, category: "fullstack", description: "Provide technology consulting to global clients.", requirements: ["5+ years technology experience", "Consulting background", "Client management skills"], responsibilities: ["Technology consulting", "Solution design", "Client presentations", "Team leadership"] },
      { id: "acc5", title: "RPA Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["UiPath", "Blue Prism", "Automation Anywhere", "Python", "SQL"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Develop robotic process automation solutions.", requirements: ["2+ years RPA experience", "RPA tool certifications", "Process understanding"], responsibilities: ["RPA development", "Process analysis", "Bot maintenance", "Documentation"] },
      { id: "acc6", title: "Google Cloud Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 20 LPA", skills: ["GCP", "BigQuery", "Kubernetes", "Terraform", "Python"], posted: "1 week ago", isNew: false, category: "devops", description: "Design and implement solutions on Google Cloud Platform.", requirements: ["3+ years GCP experience", "GCP certifications", "IaC experience"], responsibilities: ["GCP architecture", "Infrastructure management", "Cost optimization", "Security implementation"] },
      { id: "acc7", title: "Product Designer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Figma", "User Research", "Design Thinking", "Prototyping", "Usability Testing"], posted: "3 days ago", isNew: true, category: "design", description: "Design user-centered digital products and experiences.", requirements: ["3+ years product design", "Strong portfolio", "Design thinking expertise"], responsibilities: ["Product design", "User research", "Prototyping", "Design systems"] },
      { id: "acc8", title: "Blockchain Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "10 - 20 LPA", skills: ["Blockchain", "Solidity", "Ethereum", "Smart Contracts", "Web3.js"], posted: "6 days ago", isNew: false, category: "backend", description: "Develop blockchain solutions for enterprise use cases.", requirements: ["2+ years blockchain experience", "Smart contract development", "Cryptocurrency knowledge"], responsibilities: ["Blockchain development", "Smart contracts", "Integration", "Security audits"] },
      { id: "acc9", title: "Computer Vision Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "14 - 24 LPA", skills: ["Python", "OpenCV", "Deep Learning", "TensorFlow", "YOLO"], posted: "2 days ago", isNew: true, category: "ai", description: "Build computer vision solutions for various applications.", requirements: ["3+ years CV experience", "Deep learning expertise", "Image processing knowledge"], responsibilities: ["CV model development", "Image processing", "Model optimization", "Research"] },
      { id: "acc10", title: "Manager - Data Science", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "25 - 40 LPA", skills: ["Data Science", "Machine Learning", "Team Management", "Strategy", "Python"], posted: "1 week ago", isNew: false, category: "data", description: "Lead data science teams and drive analytics strategy.", requirements: ["8+ years data science", "Team management experience", "Business acumen"], responsibilities: ["Team leadership", "Strategy development", "Stakeholder management", "Project delivery"] },
      { id: "acc11", title: "Flutter Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["Flutter", "Dart", "Firebase", "REST APIs", "State Management"], posted: "4 days ago", isNew: false, category: "mobile", description: "Build cross-platform mobile applications using Flutter.", requirements: ["2+ years Flutter experience", "Published apps", "Dart proficiency"], responsibilities: ["Flutter development", "UI implementation", "API integration", "Testing"] },
      { id: "acc12", title: "Cyber Security Consultant", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "15 - 28 LPA", skills: ["Cybersecurity", "Risk Assessment", "Compliance", "SIEM", "Incident Response"], posted: "5 days ago", isNew: false, category: "security", description: "Provide cybersecurity consulting to enterprise clients.", requirements: ["5+ years security experience", "Security certifications", "Consulting background"], responsibilities: ["Security consulting", "Risk assessments", "Compliance audits", "Incident management"] },
    ],
  },
  {
    name: "Deloitte",
    logo: "https://logo.clearbit.com/deloitte.com",
    industry: "Consulting & Professional Services",
    description: "Deloitte is a multinational professional services network. The Indian practice offers audit, consulting, financial advisory, risk advisory, tax and related services to clients across various industries.",
    employees: "450,000+",
    headquarters: "London, UK (India HQ: Mumbai)",
    indianOffices: ["Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Delhi NCR", "Kolkata", "Ahmedabad"],
    benefits: ["Competitive Pay", "Health Insurance", "Retirement Benefits", "Learning & Development", "Flexible Work", "Wellness Programs", "Global Opportunities", "Performance Bonus"],
    color: "from-green-600 to-emerald-500",
    bgColor: "bg-green-600/10",
    textColor: "text-green-600",
    jobs: [
      { id: "del1", title: "Analyst - Technology Consulting", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "6 - 8 LPA", skills: ["Problem Solving", "Communication", "Technology", "Analytics", "Presentation"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Join Deloitte's Technology Consulting practice as an Analyst.", requirements: ["B.Tech/MBA", "Strong academics", "Analytical mindset"], responsibilities: ["Client projects", "Research", "Analysis", "Documentation"] },
      { id: "del2", title: "Senior Consultant - SAP", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "16 - 26 LPA", skills: ["SAP S/4HANA", "SAP FICO", "SAP MM", "Implementation", "Business Process"], posted: "2 days ago", isNew: true, category: "backend", description: "Lead SAP implementation projects for enterprise clients.", requirements: ["5+ years SAP experience", "S/4HANA implementation", "Client-facing experience"], responsibilities: ["SAP implementation", "Business process design", "Client management", "Team guidance"] },
      { id: "del3", title: "Data Analyst", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "6 - 12 LPA", skills: ["Python", "SQL", "Tableau", "Power BI", "Statistics"], posted: "3 days ago", isNew: true, category: "data", description: "Analyze data to provide business insights for clients.", requirements: ["2+ years data analysis", "Visualization skills", "Strong SQL"], responsibilities: ["Data analysis", "Report creation", "Dashboards", "Presentations"] },
      { id: "del4", title: "Java Microservices Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "12 - 20 LPA", skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "Kafka"], posted: "4 days ago", isNew: false, category: "backend", description: "Build microservices-based solutions for enterprise clients.", requirements: ["4+ years Java experience", "Microservices architecture", "Container orchestration"], responsibilities: ["Microservices development", "API design", "Code reviews", "Technical documentation"] },
      { id: "del5", title: "Oracle Functional Consultant", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Oracle EBS", "Oracle Cloud", "Finance", "SCM", "Implementation"], posted: "5 days ago", isNew: false, category: "backend", description: "Implement Oracle solutions for finance and supply chain.", requirements: ["3+ years Oracle experience", "EBS/Cloud implementation", "Functional knowledge"], responsibilities: ["Oracle implementation", "Configuration", "Testing", "User training"] },
      { id: "del6", title: "Azure Data Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 20 LPA", skills: ["Azure", "Data Factory", "Synapse", "Databricks", "Python", "SQL"], posted: "1 week ago", isNew: false, category: "data", description: "Build data solutions on Microsoft Azure platform.", requirements: ["3+ years Azure data experience", "Azure certifications", "ETL expertise"], responsibilities: ["Data pipeline development", "Azure architecture", "Data modeling", "Performance optimization"] },
      { id: "del7", title: "Interaction Designer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 15 LPA", skills: ["Figma", "Sketch", "Interaction Design", "Motion Design", "Prototyping"], posted: "3 days ago", isNew: true, category: "design", description: "Design interactive digital experiences for clients.", requirements: ["2+ years interaction design", "Strong portfolio", "Motion design skills"], responsibilities: ["Interaction design", "Prototyping", "Motion design", "User testing"] },
      { id: "del8", title: "Workday Consultant", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Workday", "HCM", "Integration", "Reporting", "Configuration"], posted: "6 days ago", isNew: false, category: "fullstack", description: "Implement Workday HCM solutions for clients.", requirements: ["3+ years Workday experience", "Workday certifications", "HCM knowledge"], responsibilities: ["Workday implementation", "Configuration", "Integration", "Support"] },
      { id: "del9", title: "AI Strategy Consultant", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "20 - 35 LPA", skills: ["AI/ML", "Strategy", "Business Development", "Consulting", "Python"], posted: "2 days ago", isNew: true, category: "ai", description: "Help clients develop and implement AI strategies.", requirements: ["5+ years AI/consulting experience", "Strategy development", "Client management"], responsibilities: ["AI strategy", "Client consulting", "Solution design", "Business development"] },
      { id: "del10", title: "Manager - Cyber Risk", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "8-12 years", salary: "25 - 40 LPA", skills: ["Cybersecurity", "Risk Management", "Compliance", "Team Leadership", "Strategy"], posted: "1 week ago", isNew: false, category: "security", description: "Lead cyber risk engagements and manage client relationships.", requirements: ["8+ years security experience", "Management experience", "Risk expertise"], responsibilities: ["Team leadership", "Client management", "Risk assessments", "Strategy development"] },
      { id: "del11", title: "React Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["React", "JavaScript", "TypeScript", "Redux", "GraphQL"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build modern web applications using React.", requirements: ["2+ years React experience", "JavaScript expertise", "State management knowledge"], responsibilities: ["React development", "Component design", "Testing", "Performance optimization"] },
      { id: "del12", title: "Site Reliability Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 20 LPA", skills: ["SRE", "Kubernetes", "Monitoring", "Automation", "Python", "Go"], posted: "5 days ago", isNew: false, category: "devops", description: "Ensure reliability and performance of systems.", requirements: ["3+ years SRE experience", "Kubernetes expertise", "Monitoring tools knowledge"], responsibilities: ["System reliability", "Automation", "Incident management", "Capacity planning"] },
    ],
  },
  {
    name: "Google India",
    logo: "https://logo.clearbit.com/google.com",
    industry: "Technology",
    description: "Google India is the local arm of Google LLC, providing services in search, advertising, cloud computing, and various consumer products. Google has major engineering centers in Bangalore and Hyderabad.",
    employees: "10,000+ in India",
    headquarters: "Mountain View, CA (India HQ: Bangalore)",
    indianOffices: ["Bangalore", "Hyderabad", "Gurgaon", "Mumbai"],
    benefits: ["Top-tier Compensation", "RSUs", "Health Insurance", "Free Meals", "On-site Gym", "Learning Budget", "Parental Leave", "Mental Health Support"],
    color: "from-blue-500 to-green-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "goo1", title: "Software Engineer III", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 55 LPA", skills: ["Java", "Python", "C++", "Distributed Systems", "Data Structures"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Work on Google's core products and infrastructure.", requirements: ["4+ years software engineering", "Strong CS fundamentals", "System design skills"], responsibilities: ["Product development", "Code reviews", "Technical design", "Mentoring"] },
      { id: "goo2", title: "Senior ML Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "45 - 70 LPA", skills: ["Python", "TensorFlow", "PyTorch", "LLMs", "Deep Learning"], posted: "2 days ago", isNew: true, category: "ai", description: "Build ML systems for Google products at scale.", requirements: ["5+ years ML experience", "PhD preferred", "Publications a plus"], responsibilities: ["ML system design", "Model development", "Research", "Production deployment"] },
      { id: "goo3", title: "Cloud Solutions Architect", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "40 - 60 LPA", skills: ["GCP", "Architecture", "Kubernetes", "BigQuery", "Terraform"], posted: "3 days ago", isNew: true, category: "devops", description: "Design cloud solutions for enterprise customers.", requirements: ["6+ years cloud architecture", "GCP certifications", "Customer-facing experience"], responsibilities: ["Architecture design", "Customer engagement", "Technical leadership", "Best practices"] },
      { id: "goo4", title: "Frontend Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 50 LPA", skills: ["JavaScript", "TypeScript", "Angular", "React", "Web Performance"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build world-class user experiences for Google products.", requirements: ["3+ years frontend experience", "JavaScript expertise", "Performance optimization skills"], responsibilities: ["Frontend development", "UX implementation", "Performance optimization", "Code quality"] },
      { id: "goo5", title: "Data Scientist - YouTube", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "35 - 55 LPA", skills: ["Python", "SQL", "Machine Learning", "Statistics", "A/B Testing"], posted: "5 days ago", isNew: false, category: "data", description: "Drive data-driven decisions for YouTube.", requirements: ["3+ years data science", "Strong statistics", "ML experience"], responsibilities: ["Data analysis", "ML modeling", "Experimentation", "Insights generation"] },
      { id: "goo6", title: "SRE - Cloud", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 55 LPA", skills: ["SRE", "Kubernetes", "Go", "Python", "Linux", "Monitoring"], posted: "1 week ago", isNew: false, category: "devops", description: "Ensure reliability of Google Cloud infrastructure.", requirements: ["4+ years SRE experience", "Strong Linux skills", "Automation expertise"], responsibilities: ["System reliability", "Automation", "Incident response", "Capacity planning"] },
      { id: "goo7", title: "UX Designer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 50 LPA", skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"], posted: "3 days ago", isNew: true, category: "design", description: "Design user experiences for Google products.", requirements: ["3+ years UX design", "Strong portfolio", "User research skills"], responsibilities: ["UX design", "User research", "Prototyping", "Accessibility"] },
      { id: "goo8", title: "Android Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 55 LPA", skills: ["Android", "Kotlin", "Java", "Jetpack", "Architecture Components"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build Android applications and features for Google apps.", requirements: ["4+ years Android", "Kotlin expertise", "Strong architecture skills"], responsibilities: ["Android development", "Feature implementation", "Code quality", "Performance"] },
      { id: "goo9", title: "Research Scientist - AI", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "50 - 80 LPA", skills: ["Deep Learning", "NLP", "Computer Vision", "Research", "Python"], posted: "2 days ago", isNew: true, category: "ai", description: "Conduct cutting-edge AI research.", requirements: ["PhD in ML/AI", "Publications required", "Strong research background"], responsibilities: ["AI research", "Paper publication", "Prototyping", "Collaboration"] },
      { id: "goo10", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "40 - 60 LPA", skills: ["Security", "Penetration Testing", "Code Review", "Cryptography", "Cloud Security"], posted: "1 week ago", isNew: false, category: "security", description: "Protect Google's infrastructure and products.", requirements: ["4+ years security experience", "Strong technical skills", "Security certifications a plus"], responsibilities: ["Security analysis", "Penetration testing", "Code reviews", "Incident response"] },
      { id: "goo11", title: "Backend Engineer - Ads", location: "Gurgaon, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 55 LPA", skills: ["Java", "C++", "Distributed Systems", "Ad Tech", "Low Latency"], posted: "4 days ago", isNew: false, category: "backend", description: "Build backend systems for Google Ads.", requirements: ["4+ years backend experience", "Distributed systems", "Ad tech experience a plus"], responsibilities: ["Backend development", "System optimization", "Performance tuning", "Technical design"] },
      { id: "goo12", title: "Technical Program Manager", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "40 - 65 LPA", skills: ["Program Management", "Technical Background", "Leadership", "Communication", "Agile"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Drive complex technical programs across teams.", requirements: ["6+ years TPM experience", "Technical background", "Strong leadership"], responsibilities: ["Program management", "Cross-team coordination", "Risk management", "Stakeholder communication"] },
    ],
  },
  {
    name: "Microsoft India",
    logo: "https://logo.clearbit.com/microsoft.com",
    industry: "Technology",
    description: "Microsoft India Development Center (IDC) is one of Microsoft's largest R&D centers outside the US. It works on core products like Azure, Microsoft 365, Bing, LinkedIn, and various enterprise solutions.",
    employees: "15,000+ in India",
    headquarters: "Redmond, WA (India HQ: Hyderabad)",
    indianOffices: ["Hyderabad", "Bangalore", "Noida", "Mumbai", "Pune"],
    benefits: ["Competitive Salary", "RSUs", "Health Benefits", "401(k)", "Parental Leave", "Learning Budget", "Wellness Programs", "Hybrid Work"],
    color: "from-blue-600 to-cyan-500",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "ms1", title: "Software Engineer II", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 40 LPA", skills: ["C#", ".NET", "Azure", "Distributed Systems", "SQL"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Work on Azure and Microsoft 365 products.", requirements: ["3+ years software engineering", "Strong .NET skills", "Cloud experience"], responsibilities: ["Product development", "Feature implementation", "Code reviews", "Testing"] },
      { id: "ms2", title: "Principal Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "10+ years", salary: "55 - 85 LPA", skills: ["Architecture", "Leadership", "Cloud", "Distributed Systems", "Mentoring"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Lead technical strategy and architecture.", requirements: ["10+ years experience", "Architecture expertise", "Technical leadership"], responsibilities: ["Technical leadership", "Architecture design", "Mentoring", "Strategy"] },
      { id: "ms3", title: "Data & Applied Scientist", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "35 - 55 LPA", skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Statistics"], posted: "3 days ago", isNew: true, category: "ai", description: "Build ML solutions for Microsoft products.", requirements: ["4+ years ML experience", "Strong math background", "Research experience preferred"], responsibilities: ["ML development", "Research", "Prototyping", "Production deployment"] },
      { id: "ms4", title: "Azure Cloud Engineer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "20 - 35 LPA", skills: ["Azure", "Kubernetes", "DevOps", "Terraform", "PowerShell"], posted: "4 days ago", isNew: false, category: "devops", description: "Design and implement Azure solutions.", requirements: ["3+ years Azure experience", "Azure certifications", "DevOps experience"], responsibilities: ["Azure architecture", "Infrastructure management", "Automation", "Customer support"] },
      { id: "ms5", title: "Frontend Engineer - Teams", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 40 LPA", skills: ["React", "TypeScript", "Node.js", "Web Performance", "Accessibility"], posted: "5 days ago", isNew: false, category: "frontend", description: "Build features for Microsoft Teams.", requirements: ["3+ years frontend experience", "React expertise", "Performance optimization skills"], responsibilities: ["Frontend development", "Feature implementation", "Performance optimization", "Accessibility"] },
      { id: "ms6", title: "SQL Server Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "25 - 40 LPA", skills: ["SQL Server", "T-SQL", "Azure SQL", "Performance Tuning", "Database Design"], posted: "1 week ago", isNew: false, category: "data", description: "Work on SQL Server and Azure SQL products.", requirements: ["4+ years SQL Server experience", "Strong database skills", "Performance tuning expertise"], responsibilities: ["Database development", "Performance optimization", "Feature development", "Testing"] },
      { id: "ms7", title: "Product Designer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "25 - 45 LPA", skills: ["Figma", "User Research", "Design Systems", "Accessibility", "Prototyping"], posted: "3 days ago", isNew: true, category: "design", description: "Design experiences for Microsoft products.", requirements: ["4+ years product design", "Strong portfolio", "Design systems experience"], responsibilities: ["Product design", "User research", "Design systems", "Prototyping"] },
      { id: "ms8", title: "iOS Engineer - Outlook", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 40 LPA", skills: ["Swift", "iOS", "Objective-C", "UIKit", "REST APIs"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build features for Outlook iOS app.", requirements: ["3+ years iOS experience", "Swift expertise", "Published apps"], responsibilities: ["iOS development", "Feature implementation", "Code reviews", "Testing"] },
      { id: "ms9", title: "Applied Scientist - NLP", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "45 - 70 LPA", skills: ["NLP", "Deep Learning", "Transformers", "Python", "Research"], posted: "2 days ago", isNew: true, category: "ai", description: "Build NLP solutions for Microsoft products.", requirements: ["PhD in NLP/ML", "Publications", "Strong research background"], responsibilities: ["NLP research", "Model development", "Paper publication", "Product integration"] },
      { id: "ms10", title: "Security Response Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "30 - 50 LPA", skills: ["Incident Response", "Threat Analysis", "Forensics", "Security Tools", "Automation"], posted: "1 week ago", isNew: false, category: "security", description: "Respond to security incidents across Microsoft.", requirements: ["4+ years security experience", "IR experience", "Forensics skills"], responsibilities: ["Incident response", "Threat analysis", "Automation", "Documentation"] },
      { id: "ms11", title: "Backend Engineer - LinkedIn", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 50 LPA", skills: ["Java", "Scala", "Kafka", "Microservices", "REST APIs"], posted: "4 days ago", isNew: false, category: "backend", description: "Build backend services for LinkedIn.", requirements: ["3+ years backend experience", "Java/Scala expertise", "Distributed systems knowledge"], responsibilities: ["Backend development", "API design", "Performance optimization", "Code reviews"] },
      { id: "ms12", title: "Program Manager", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "30 - 50 LPA", skills: ["Product Management", "Technical Background", "Communication", "Agile", "Data Analysis"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Drive product development for Azure.", requirements: ["5+ years PM experience", "Technical background", "Strong communication"], responsibilities: ["Product management", "Feature planning", "Stakeholder management", "Data analysis"] },
    ],
  },
  {
    name: "Amazon India",
    logo: "https://logo.clearbit.com/amazon.com",
    industry: "E-commerce & Cloud",
    description: "Amazon India includes both the retail marketplace and Amazon Web Services (AWS). It has major development centers in Bangalore, Hyderabad, Chennai, and other cities working on core Amazon and AWS products.",
    employees: "100,000+ in India",
    headquarters: "Seattle, WA (India HQ: Bangalore)",
    indianOffices: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Delhi NCR", "Mumbai"],
    benefits: ["Competitive Pay", "RSUs", "Sign-on Bonus", "Health Benefits", "Career Choice", "Parental Leave", "Employee Discounts", "Learning Programs"],
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    jobs: [
      { id: "amz1", title: "SDE I", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "0-2 years", salary: "18 - 28 LPA", skills: ["Java", "Data Structures", "Algorithms", "Problem Solving", "OOP"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career at Amazon as a Software Development Engineer.", requirements: ["B.Tech/MS in CS", "Strong DS/Algo", "Coding proficiency"], responsibilities: ["Software development", "Code reviews", "Testing", "Documentation"] },
      { id: "amz2", title: "SDE II", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "30 - 50 LPA", skills: ["Java", "Distributed Systems", "AWS", "System Design", "Microservices"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build scalable systems for Amazon.", requirements: ["3+ years experience", "System design skills", "AWS knowledge"], responsibilities: ["System design", "Development", "Mentoring", "Code reviews"] },
      { id: "amz3", title: "SDE III - AWS", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "6-10 years", salary: "45 - 70 LPA", skills: ["Java", "Architecture", "AWS Services", "Leadership", "System Design"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Lead engineering for AWS services.", requirements: ["6+ years experience", "AWS expertise", "Technical leadership"], responsibilities: ["Technical leadership", "Architecture", "Mentoring", "Cross-team collaboration"] },
      { id: "amz4", title: "Applied Scientist", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD + 2 years", salary: "50 - 80 LPA", skills: ["Machine Learning", "Deep Learning", "Python", "Research", "Statistics"], posted: "4 days ago", isNew: false, category: "ai", description: "Build ML solutions for Amazon products.", requirements: ["PhD in ML/AI", "Publications", "Strong research background"], responsibilities: ["ML research", "Model development", "Production deployment", "Paper publication"] },
      { id: "amz5", title: "Data Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 40 LPA", skills: ["Python", "Spark", "AWS", "Redshift", "ETL"], posted: "5 days ago", isNew: false, category: "data", description: "Build data pipelines for Amazon.", requirements: ["3+ years data engineering", "AWS data services", "Big data experience"], responsibilities: ["Pipeline development", "Data modeling", "ETL processes", "Performance optimization"] },
      { id: "amz6", title: "Solutions Architect - AWS", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 55 LPA", skills: ["AWS", "Architecture", "Customer Facing", "Solution Design", "Cloud Migration"], posted: "1 week ago", isNew: false, category: "devops", description: "Design cloud solutions for AWS customers.", requirements: ["5+ years architecture", "AWS certifications", "Customer-facing experience"], responsibilities: ["Solution design", "Customer engagement", "Technical leadership", "Best practices"] },
      { id: "amz7", title: "UX Designer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 40 LPA", skills: ["Figma", "User Research", "E-commerce", "Prototyping", "A/B Testing"], posted: "3 days ago", isNew: true, category: "design", description: "Design experiences for Amazon retail.", requirements: ["3+ years UX design", "E-commerce experience preferred", "Strong portfolio"], responsibilities: ["UX design", "User research", "A/B testing", "Prototyping"] },
      { id: "amz8", title: "Android Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "25 - 40 LPA", skills: ["Android", "Kotlin", "Java", "MVVM", "Performance"], posted: "6 days ago", isNew: false, category: "mobile", description: "Build Android features for Amazon Shopping app.", requirements: ["3+ years Android", "Kotlin expertise", "Published apps"], responsibilities: ["Android development", "Feature implementation", "Performance optimization", "Testing"] },
      { id: "amz9", title: "ML Engineer - Alexa", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "40 - 60 LPA", skills: ["Python", "NLP", "Deep Learning", "TensorFlow", "Speech Recognition"], posted: "2 days ago", isNew: true, category: "ai", description: "Build ML models for Alexa.", requirements: ["4+ years ML experience", "NLP expertise", "Deep learning skills"], responsibilities: ["ML development", "NLP modeling", "Production deployment", "Research"] },
      { id: "amz10", title: "Security Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-8 years", salary: "35 - 55 LPA", skills: ["AWS Security", "Cloud Security", "IAM", "Security Automation", "Threat Modeling"], posted: "1 week ago", isNew: false, category: "security", description: "Protect Amazon's infrastructure and services.", requirements: ["4+ years security experience", "AWS security expertise", "Strong technical skills"], responsibilities: ["Security engineering", "Threat modeling", "Security automation", "Incident response"] },
      { id: "amz11", title: "Frontend Engineer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "20 - 35 LPA", skills: ["React", "JavaScript", "TypeScript", "Web Performance", "A11y"], posted: "4 days ago", isNew: false, category: "frontend", description: "Build frontend for Amazon retail.", requirements: ["2+ years frontend", "React expertise", "Performance skills"], responsibilities: ["Frontend development", "Performance optimization", "Accessibility", "Testing"] },
      { id: "amz12", title: "Technical Program Manager", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "35 - 55 LPA", skills: ["Program Management", "Technical Background", "Leadership", "AWS", "Agile"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Drive complex programs across AWS teams.", requirements: ["5+ years TPM experience", "Technical background", "Strong leadership"], responsibilities: ["Program management", "Cross-team coordination", "Risk management", "Delivery"] },
    ],
  },
  {
    name: "IBM India",
    logo: "https://logo.clearbit.com/ibm.com",
    industry: "Technology & Consulting",
    description: "IBM India is one of the largest subsidiaries of IBM, engaged in software development, IT services, consulting, and research. IBM India Software Labs is the largest IBM software lab outside the US.",
    employees: "130,000+ in India",
    headquarters: "Armonk, NY (India HQ: Bangalore)",
    indianOffices: ["Bangalore", "Hyderabad", "Pune", "Chennai", "Delhi NCR", "Mumbai", "Kolkata"],
    benefits: ["Health Insurance", "Retirement Benefits", "Learning Programs", "Flexible Work", "Employee Stock Purchase", "Wellness Programs", "Global Opportunities", "Parental Leave"],
    color: "from-blue-700 to-blue-500",
    bgColor: "bg-blue-700/10",
    textColor: "text-blue-700",
    jobs: [
      { id: "ibm1", title: "Associate Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "4 - 6 LPA", skills: ["Java", "Python", "SQL", "Problem Solving", "Communication"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career with IBM as an Associate Developer.", requirements: ["B.Tech/BE", "Strong fundamentals", "Good communication"], responsibilities: ["Development", "Testing", "Documentation", "Learning"] },
      { id: "ibm2", title: "Watson AI Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Watson", "Python", "NLP", "Machine Learning", "APIs"], posted: "2 days ago", isNew: true, category: "ai", description: "Build AI solutions using IBM Watson.", requirements: ["3+ years AI experience", "Watson platform knowledge", "Python expertise"], responsibilities: ["AI development", "Watson integration", "Model training", "API development"] },
      { id: "ibm3", title: "Cloud Pak Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 20 LPA", skills: ["Kubernetes", "OpenShift", "Docker", "Cloud Pak", "Java"], posted: "3 days ago", isNew: true, category: "devops", description: "Develop solutions on IBM Cloud Pak.", requirements: ["3+ years container experience", "Kubernetes expertise", "OpenShift knowledge"], responsibilities: ["Cloud Pak development", "Container orchestration", "Migration", "Support"] },
      { id: "ibm4", title: "Mainframe Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 14 LPA", skills: ["COBOL", "JCL", "DB2", "CICS", "Mainframe"], posted: "4 days ago", isNew: false, category: "backend", description: "Maintain and modernize mainframe applications.", requirements: ["2+ years mainframe experience", "COBOL proficiency", "DB2 knowledge"], responsibilities: ["Mainframe development", "Code modernization", "Testing", "Documentation"] },
      { id: "ibm5", title: "Data Scientist - Analytics", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Python", "R", "Machine Learning", "Statistics", "SQL"], posted: "5 days ago", isNew: false, category: "data", description: "Build analytics solutions for clients.", requirements: ["3+ years data science", "Statistical modeling", "Business analytics"], responsibilities: ["Data analysis", "Model development", "Insights generation", "Client presentations"] },
      { id: "ibm6", title: "Quantum Computing Researcher", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "PhD", salary: "25 - 45 LPA", skills: ["Quantum Computing", "Python", "Qiskit", "Physics", "Research"], posted: "1 week ago", isNew: false, category: "ai", description: "Research quantum computing applications.", requirements: ["PhD in Physics/CS", "Quantum computing knowledge", "Research experience"], responsibilities: ["Research", "Algorithm development", "Paper publication", "Collaboration"] },
      { id: "ibm7", title: "UX Researcher", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["User Research", "Usability Testing", "Interviews", "Data Analysis", "Presentation"], posted: "3 days ago", isNew: true, category: "design", description: "Conduct user research for IBM products.", requirements: ["3+ years UX research", "Strong portfolio", "Research methods expertise"], responsibilities: ["User research", "Usability testing", "Data analysis", "Insights presentation"] },
      { id: "ibm8", title: "Security Consultant", location: "Delhi NCR, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "16 - 28 LPA", skills: ["Cybersecurity", "Risk Assessment", "Compliance", "SIEM", "Consulting"], posted: "6 days ago", isNew: false, category: "security", description: "Provide security consulting to enterprise clients.", requirements: ["5+ years security experience", "Consulting background", "Security certifications"], responsibilities: ["Security consulting", "Risk assessments", "Compliance audits", "Client management"] },
      { id: "ibm9", title: "Full Stack Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["React", "Node.js", "Java", "MongoDB", "REST APIs"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build full stack applications for clients.", requirements: ["3+ years full stack", "Frontend and backend skills", "Database knowledge"], responsibilities: ["Full stack development", "API design", "Database design", "Testing"] },
      { id: "ibm10", title: "Blockchain Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "10 - 20 LPA", skills: ["Hyperledger", "Blockchain", "Go", "Node.js", "Smart Contracts"], posted: "1 week ago", isNew: false, category: "backend", description: "Develop blockchain solutions using Hyperledger.", requirements: ["2+ years blockchain", "Hyperledger knowledge", "Smart contract development"], responsibilities: ["Blockchain development", "Smart contracts", "Integration", "Testing"] },
      { id: "ibm11", title: "iOS Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Swift", "iOS", "UIKit", "Core Data", "REST APIs"], posted: "4 days ago", isNew: false, category: "mobile", description: "Develop iOS applications for enterprise.", requirements: ["2+ years iOS", "Swift expertise", "Enterprise app experience"], responsibilities: ["iOS development", "Feature implementation", "Testing", "App store deployment"] },
      { id: "ibm12", title: "Technical Architect", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "10+ years", salary: "30 - 50 LPA", skills: ["Architecture", "Cloud", "Microservices", "Leadership", "Solution Design"], posted: "5 days ago", isNew: false, category: "fullstack", description: "Lead technical architecture for large projects.", requirements: ["10+ years experience", "Architecture expertise", "Technical leadership"], responsibilities: ["Architecture design", "Technical leadership", "Client engagement", "Team guidance"] },
    ],
  },
  {
    name: "HCL Technologies",
    logo: "https://logo.clearbit.com/hcltech.com",
    industry: "IT Services & Consulting",
    description: "HCL Technologies is a next-generation global technology company that helps enterprises reimagine their businesses for the digital age. It operates across infrastructure, digital, consulting, and software services.",
    employees: "220,000+",
    headquarters: "Noida, India",
    indianOffices: ["Noida", "Chennai", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Lucknow", "Nagpur"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "ESOP", "Learning Programs", "Wellness Benefits", "Flexible Work", "Career Development"],
    color: "from-indigo-600 to-indigo-400",
    bgColor: "bg-indigo-600/10",
    textColor: "text-indigo-600",
    jobs: [
      { id: "hcl1", title: "Graduate Engineer Trainee", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.5 - 4.25 LPA", skills: ["Programming", "SQL", "Problem Solving", "Communication", "Aptitude"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Begin your IT career with HCL Technologies.", requirements: ["B.Tech/BE/MCA", "60% aggregate", "Good communication"], responsibilities: ["Training", "Development", "Testing", "Team collaboration"] },
      { id: "hcl2", title: "Java Full Stack Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["Java", "Spring Boot", "Angular", "Microservices", "AWS"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build enterprise applications using Java stack.", requirements: ["3+ years Java experience", "Full stack skills", "Cloud experience"], responsibilities: ["Full stack development", "API design", "Code reviews", "Mentoring"] },
      { id: "hcl3", title: "Salesforce Admin", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "6 - 12 LPA", skills: ["Salesforce", "Admin", "Configuration", "Workflows", "Reports"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Manage and configure Salesforce for clients.", requirements: ["2+ years Salesforce admin", "Salesforce certifications", "Configuration expertise"], responsibilities: ["Salesforce administration", "Configuration", "User support", "Reporting"] },
      { id: "hcl4", title: "SAP BW Consultant", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "12 - 22 LPA", skills: ["SAP BW", "SAP HANA", "BOBJ", "Data Modeling", "ETL"], posted: "4 days ago", isNew: false, category: "data", description: "Implement SAP BW solutions for data analytics.", requirements: ["4+ years SAP BW", "HANA experience", "Data modeling skills"], responsibilities: ["SAP BW implementation", "Data modeling", "ETL development", "Reporting"] },
      { id: "hcl5", title: "Network Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "5 - 10 LPA", skills: ["Networking", "Cisco", "Routing", "Switching", "Firewall"], posted: "5 days ago", isNew: false, category: "devops", description: "Manage network infrastructure for clients.", requirements: ["2+ years networking", "CCNA/CCNP", "Firewall experience"], responsibilities: ["Network management", "Troubleshooting", "Configuration", "Monitoring"] },
      { id: "hcl6", title: "DXP Developer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["AEM", "Adobe Experience Manager", "Java", "JavaScript", "HTML/CSS"], posted: "1 week ago", isNew: false, category: "frontend", description: "Build digital experiences using Adobe AEM.", requirements: ["3+ years AEM experience", "Java skills", "Frontend expertise"], responsibilities: ["AEM development", "Component development", "Integration", "Support"] },
      { id: "hcl7", title: "Product Owner", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "5-8 years", salary: "16 - 28 LPA", skills: ["Product Management", "Agile", "Scrum", "Backlog Management", "Stakeholder Management"], posted: "3 days ago", isNew: true, category: "fullstack", description: "Own product backlog and drive delivery.", requirements: ["5+ years product ownership", "Agile expertise", "Domain knowledge"], responsibilities: ["Backlog management", "Sprint planning", "Stakeholder management", "Feature prioritization"] },
      { id: "hcl8", title: "AI/ML Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "12 - 22 LPA", skills: ["Python", "Machine Learning", "TensorFlow", "PyTorch", "NLP"], posted: "6 days ago", isNew: false, category: "ai", description: "Build AI/ML solutions for enterprise clients.", requirements: ["3+ years AI/ML", "Python expertise", "Deep learning knowledge"], responsibilities: ["ML development", "Model training", "Deployment", "Research"] },
      { id: "hcl9", title: "QA Automation Engineer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Selenium", "Java", "TestNG", "API Testing", "CI/CD"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build and maintain test automation frameworks.", requirements: ["2+ years automation", "Selenium expertise", "Java skills"], responsibilities: ["Test automation", "Framework development", "CI/CD integration", "Test execution"] },
      { id: "hcl10", title: "ServiceNow Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 14 LPA", skills: ["ServiceNow", "JavaScript", "ITSM", "ITOM", "Integration"], posted: "1 week ago", isNew: false, category: "fullstack", description: "Develop ServiceNow solutions for IT operations.", requirements: ["2+ years ServiceNow", "ITSM/ITOM experience", "JavaScript skills"], responsibilities: ["ServiceNow development", "Configuration", "Integration", "Support"] },
      { id: "hcl11", title: "React Native Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 14 LPA", skills: ["React Native", "JavaScript", "Redux", "Native Modules", "REST APIs"], posted: "4 days ago", isNew: false, category: "mobile", description: "Build cross-platform mobile apps.", requirements: ["2+ years React Native", "Published apps", "Native development knowledge"], responsibilities: ["Mobile development", "Cross-platform coding", "API integration", "Testing"] },
      { id: "hcl12", title: "Cloud Security Engineer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "4-7 years", salary: "14 - 24 LPA", skills: ["Cloud Security", "AWS", "Azure", "IAM", "Compliance"], posted: "5 days ago", isNew: false, category: "security", description: "Implement security for cloud environments.", requirements: ["4+ years cloud security", "Multi-cloud experience", "Security certifications"], responsibilities: ["Cloud security", "IAM management", "Compliance", "Security automation"] },
    ],
  },
  {
    name: "Tech Mahindra",
    logo: "https://logo.clearbit.com/techmahindra.com",
    industry: "IT Services & Consulting",
    description: "Tech Mahindra is an Indian multinational technology company, providing IT and business process outsourcing services. It is part of the Mahindra Group and specializes in digital transformation and consulting services.",
    employees: "150,000+",
    headquarters: "Pune, India",
    indianOffices: ["Pune", "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Noida", "Kolkata", "Bhubaneswar"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Performance Bonus", "Learning Programs", "Flexible Hours", "Employee Discounts", "Wellness Programs"],
    color: "from-rose-600 to-red-500",
    bgColor: "bg-rose-600/10",
    textColor: "text-rose-600",
    jobs: [
      { id: "tm1", title: "Associate Software Engineer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "Fresher", salary: "3.25 - 4 LPA", skills: ["Java", "Python", "C++", "SQL", "Aptitude"], posted: "1 day ago", isNew: true, category: "fullstack", description: "Start your career with Tech Mahindra.", requirements: ["B.Tech/BE/MCA", "60% aggregate", "Strong fundamentals"], responsibilities: ["Development", "Testing", "Learning", "Team collaboration"] },
      { id: "tm2", title: "5G Network Engineer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["5G", "LTE", "Network Architecture", "Telecom", "Python"], posted: "2 days ago", isNew: true, category: "devops", description: "Work on 5G network solutions for telecom clients.", requirements: ["3+ years telecom experience", "5G knowledge", "Network architecture"], responsibilities: ["5G implementation", "Network optimization", "Troubleshooting", "Documentation"] },
      { id: "tm3", title: "Python Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Python", "Django", "FastAPI", "PostgreSQL", "REST APIs"], posted: "3 days ago", isNew: true, category: "backend", description: "Build backend services using Python.", requirements: ["2+ years Python", "Django/FastAPI", "Database experience"], responsibilities: ["Python development", "API design", "Database management", "Testing"] },
      { id: "tm4", title: "Tibco Developer", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["TIBCO", "BW", "EMS", "Integration", "XML"], posted: "4 days ago", isNew: false, category: "backend", description: "Develop integration solutions using TIBCO.", requirements: ["3+ years TIBCO", "BW expertise", "Integration experience"], responsibilities: ["TIBCO development", "Integration design", "Testing", "Support"] },
      { id: "tm5", title: "Tableau Developer", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "6 - 12 LPA", skills: ["Tableau", "SQL", "Data Visualization", "Python", "ETL"], posted: "5 days ago", isNew: false, category: "data", description: "Build data visualizations and dashboards.", requirements: ["2+ years Tableau", "Strong SQL", "Visualization skills"], responsibilities: ["Dashboard development", "Data analysis", "Report creation", "Stakeholder interaction"] },
      { id: "tm6", title: "Azure DevOps Engineer", location: "Noida, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Azure DevOps", "CI/CD", "ARM Templates", "PowerShell", "Docker"], posted: "1 week ago", isNew: false, category: "devops", description: "Build and manage Azure DevOps pipelines.", requirements: ["3+ years Azure DevOps", "CI/CD experience", "Azure certifications"], responsibilities: ["Pipeline development", "Infrastructure management", "Automation", "Support"] },
      { id: "tm7", title: "UI Developer", location: "Mumbai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-4 years", salary: "5 - 10 LPA", skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"], posted: "3 days ago", isNew: true, category: "frontend", description: "Build user interfaces for web applications.", requirements: ["2+ years frontend", "Strong HTML/CSS", "JavaScript knowledge"], responsibilities: ["UI development", "Responsive design", "Cross-browser compatibility", "Testing"] },
      { id: "tm8", title: "Conversational AI Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 16 LPA", skills: ["Chatbots", "NLP", "Dialogflow", "Python", "APIs"], posted: "6 days ago", isNew: false, category: "ai", description: "Build conversational AI solutions.", requirements: ["2+ years chatbot development", "NLP knowledge", "Python skills"], responsibilities: ["Chatbot development", "NLP implementation", "Integration", "Training"] },
      { id: "tm9", title: "Appian Developer", location: "Hyderabad, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "7 - 14 LPA", skills: ["Appian", "BPM", "Low-code", "Integration", "SQL"], posted: "2 days ago", isNew: true, category: "fullstack", description: "Build low-code applications using Appian.", requirements: ["2+ years Appian", "Appian certifications", "BPM knowledge"], responsibilities: ["Appian development", "Workflow design", "Integration", "Support"] },
      { id: "tm10", title: "Ethical Hacker", location: "Chennai, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "10 - 18 LPA", skills: ["Penetration Testing", "VAPT", "Kali Linux", "OWASP", "Security Tools"], posted: "1 week ago", isNew: false, category: "security", description: "Conduct security assessments and penetration testing.", requirements: ["3+ years security testing", "CEH/OSCP certification", "VAPT expertise"], responsibilities: ["Penetration testing", "Vulnerability assessment", "Security reporting", "Remediation guidance"] },
      { id: "tm11", title: "Kotlin Developer", location: "Bangalore, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "2-5 years", salary: "8 - 15 LPA", skills: ["Kotlin", "Android", "Coroutines", "MVVM", "Jetpack"], posted: "4 days ago", isNew: false, category: "mobile", description: "Build Android applications using Kotlin.", requirements: ["2+ years Kotlin", "Android expertise", "Published apps"], responsibilities: ["Android development", "Feature implementation", "Code quality", "Testing"] },
      { id: "tm12", title: "Business Analyst", location: "Pune, India", locationType: "Hybrid", type: "Full-time", experienceLevel: "3-6 years", salary: "8 - 16 LPA", skills: ["Business Analysis", "Requirements", "Agile", "SQL", "Documentation"], posted: "5 days ago", isNew: false, category: "data", description: "Gather and analyze business requirements.", requirements: ["3+ years BA experience", "Strong documentation", "Domain knowledge"], responsibilities: ["Requirements gathering", "Analysis", "Documentation", "Stakeholder management"] },
    ],
  },
]

// Get all jobs from all companies
const getAllJobs = () => {
  const allJobs: (CompanyJob & { companyName: string; companyLogo: string; companyColor: string })[] = []
  companies.forEach((company) => {
    company.jobs.forEach((job) => {
      allJobs.push({
        ...job,
        companyName: company.name,
        companyLogo: company.logo,
        companyColor: company.textColor,
      })
    })
  })
  return allJobs
}

export function TopCompaniesSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeIndustry, setActiveIndustry] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [selectedJob, setSelectedJob] = useState<CompanyJob | null>(null)
  const [selectedJobCompany, setSelectedJobCompany] = useState<Company | null>(null)
  const [subscribedCompanies, setSubscribedCompanies] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState<{ id: string; company: string; job: string; time: Date }[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [showApplications, setShowApplications] = useState(false)
  const [applyingJob, setApplyingJob] = useState<{ job: CompanyJob; company: Company } | null>(null)
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

  // Get unique industries
  const industries = ["all", ...Array.from(new Set(companies.map((c) => c.industry)))]

  // Filter companies
  const filteredCompanies = companies.filter((company) => {
    const matchesIndustry = activeIndustry === "all" || company.industry === activeIndustry
    const matchesSearch =
      searchQuery === "" ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.jobs.some(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    return matchesIndustry && matchesSearch
  })

  // Get jobs for selected company with category filter
  const getFilteredJobs = (company: Company) => {
    return company.jobs.filter((job) => {
      const matchesCategory = activeCategory === "all" || job.category === activeCategory
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }

  // Toggle subscription
  const toggleSubscription = (companyName: string) => {
    setSubscribedCompanies((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(companyName)) {
        newSet.delete(companyName)
      } else {
        newSet.add(companyName)
        // Add notification
        const company = companies.find((c) => c.name === companyName)
        if (company && company.jobs.length > 0) {
          const randomJob = company.jobs[Math.floor(Math.random() * company.jobs.length)]
          setNotifications((prev) => [
            { id: Date.now().toString(), company: companyName, job: randomJob.title, time: new Date() },
            ...prev,
          ])
        }
      }
      return newSet
    })
  }

  // Simulate new job notifications for subscribed companies
  useEffect(() => {
    const interval = setInterval(() => {
      subscribedCompanies.forEach((companyName) => {
        const company = companies.find((c) => c.name === companyName)
        if (company && Math.random() > 0.7) {
          const randomJob = company.jobs[Math.floor(Math.random() * company.jobs.length)]
          setNotifications((prev) => [
            { id: Date.now().toString(), company: companyName, job: randomJob.title, time: new Date() },
            ...prev.slice(0, 9),
          ])
        }
      })
    }, 45000) // Every 45 seconds

    return () => clearInterval(interval)
  }, [subscribedCompanies])

  // Calculate stats
  const totalJobs = companies.reduce((sum, company) => sum + company.jobs.length, 0)
  const newJobs = companies.reduce((sum, company) => sum + company.jobs.filter((j) => j.isNew).length, 0)

  // Handle job application
  const handleApplyJob = (job: CompanyJob, company: Company) => {
    setApplyingJob({ job, company })
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
      jobId: applyingJob.job.id,
      companyName: applyingJob.company.name,
      jobTitle: applyingJob.job.title,
      status: "applied",
      appliedDate: new Date(),
    }

    setApplications((prev) => [newApplication, ...prev])
    setIsSubmitting(false)
    setApplicationStep(4) // Success step
  }

  // Schedule interview
  const scheduleInterview = () => {
    if (!interviewScheduling || !interviewDate || !interviewTime) return

    setApplications((prev) =>
      prev.map((app) =>
        app.id === interviewScheduling.id
          ? {
              ...app,
              status: "interview_scheduled",
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
      case "applied":
        return "bg-blue-500/10 text-blue-500"
      case "screening":
        return "bg-yellow-500/10 text-yellow-500"
      case "interview_scheduled":
        return "bg-purple-500/10 text-purple-500"
      case "interview_completed":
        return "bg-cyan-500/10 text-cyan-500"
      case "offer":
        return "bg-green-500/10 text-green-500"
      case "rejected":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  // Get status label
  const getStatusLabel = (status: Application["status"]) => {
    switch (status) {
      case "applied":
        return "Applied"
      case "screening":
        return "Under Review"
      case "interview_scheduled":
        return "Interview Scheduled"
      case "interview_completed":
        return "Interview Completed"
      case "offer":
        return "Offer Received"
      case "rejected":
        return "Not Selected"
      default:
        return status
    }
  }

  return (
    <section id="top-companies" className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary">
              <Building2 className="mr-1 h-3 w-3" />
              Top Indian Companies
            </Badge>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Jobs at Leading <span className="text-primary">Indian Companies</span>
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Explore {totalJobs}+ job opportunities across {companies.length} top Indian IT companies.
              Apply directly and schedule interviews.
            </p>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="flex items-center gap-6 rounded-xl border border-border/50 bg-card/50 p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{totalJobs}</p>
                <p className="text-xs text-muted-foreground">Open Jobs</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-2xl font-bold text-green-500">{newJobs}</p>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">New This Week</p>
              </div>
            </div>

            {/* My Applications */}
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowApplications(true)}
            >
              <FileText className="h-4 w-4" />
              My Applications
              {applications.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {applications.length}
                </Badge>
              )}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {notifications.length > 9 ? "9+" : notifications.length}
                  </span>
                )}
              </Button>

              {showNotifications && (
                <Card className="absolute right-0 top-full z-50 mt-2 w-80 border-border/50 bg-card shadow-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-sm">
                      Job Alerts
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowNotifications(false)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      {notifications.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                          No notifications yet. Subscribe to companies to receive job alerts.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className="rounded-lg border border-border/50 bg-secondary/30 p-3"
                            >
                              <p className="text-sm font-medium text-foreground">{notif.job}</p>
                              <p className="text-xs text-muted-foreground">
                                {notif.company} - {notif.time.toLocaleTimeString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
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

          {/* Industry Filter */}
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={activeIndustry === industry ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveIndustry(industry)}
                className="capitalize"
              >
                {industry === "all" ? "All Industries" : industry}
              </Button>
            ))}
          </div>

          {/* Skill Category Filter */}
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="gap-1"
              >
                <category.icon className="h-3 w-3" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCompanies.map((company) => {
            const filteredJobs = getFilteredJobs(company)
            const newJobsCount = filteredJobs.filter((j) => j.isNew).length

            return (
              <Card
                key={company.name}
                className="group cursor-pointer border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-lg"
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
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random`
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{company.name}</h3>
                        <p className="text-xs text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
                    {subscribedCompanies.has(company.name) && (
                      <Bell className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  {/* Stats */}
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {filteredJobs.length} Jobs
                    </span>
                    {newJobsCount > 0 && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                        {newJobsCount} New
                      </Badge>
                    )}
                  </div>

                  {/* Sample Jobs */}
                  <div className="space-y-2">
                    {filteredJobs.slice(0, 3).map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between rounded-lg bg-secondary/30 p-2 text-sm"
                      >
                        <span className="truncate text-foreground">{job.title}</span>
                        {job.isNew && (
                          <Badge variant="secondary" className="ml-2 shrink-0 bg-green-500/10 text-green-500 text-[10px]">
                            New
                          </Badge>
                        )}
                      </div>
                    ))}
                    {filteredJobs.length > 3 && (
                      <p className="text-center text-xs text-muted-foreground">
                        +{filteredJobs.length - 3} more jobs
                      </p>
                    )}
                  </div>

                  {/* View Button */}
                  <Button variant="outline" className="mt-4 w-full gap-2 group-hover:border-primary group-hover:text-primary">
                    View All Jobs
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Company Detail Dialog */}
        <Dialog open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-border/50 bg-background">
            {selectedCompany && (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${selectedCompany.bgColor}`}>
                        <img
                          src={selectedCompany.logo}
                          alt={selectedCompany.name}
                          className="h-10 w-10 rounded object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCompany.name)}&background=random`
                          }}
                        />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl">{selectedCompany.name}</DialogTitle>
                        <p className="text-sm text-muted-foreground">{selectedCompany.industry}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {selectedCompany.employees}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {selectedCompany.headquarters}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Job Alerts</span>
                        <Switch
                          checked={subscribedCompanies.has(selectedCompany.name)}
                          onCheckedChange={() => toggleSubscription(selectedCompany.name)}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogDescription className="mt-4 text-muted-foreground">
                    {selectedCompany.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Indian Offices */}
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium">Offices in India</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.indianOffices.map((office) => (
                      <Badge key={office} variant="outline" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {office}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium">Employee Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Jobs List */}
                <div className="mt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold">
                      Open Positions ({getFilteredJobs(selectedCompany).length})
                    </h4>
                  </div>

                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3 pr-4">
                      {getFilteredJobs(selectedCompany).map((job) => (
                        <Card
                          key={job.id}
                          className="cursor-pointer border-border/50 transition-all hover:border-primary/50"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedJob(job)
                            setSelectedJobCompany(selectedCompany)
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-semibold text-foreground">{job.title}</h5>
                                  {job.isNew && (
                                    <Badge className="bg-green-500/10 text-green-500">New</Badge>
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
                                    {job.posted}
                                  </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <Badge variant="outline" className="gap-1">
                                    <IndianRupee className="h-3 w-3" />
                                    {job.salary}
                                  </Badge>
                                  <Badge variant="secondary">{job.locationType}</Badge>
                                  <Badge variant="secondary">{job.experienceLevel}</Badge>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {job.skills.slice(0, 4).map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="outline"
                                      className="text-xs bg-primary/5 text-primary"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                  {job.skills.length > 4 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{job.skills.length - 4}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleApplyJob(job, selectedCompany)
                                }}
                                className="shrink-0"
                              >
                                Apply Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Job Detail Dialog */}
        <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border/50 bg-background">
            {selectedJob && selectedJobCompany && (
              <>
                <DialogHeader>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${selectedJobCompany.bgColor}`}>
                      <img
                        src={selectedJobCompany.logo}
                        alt={selectedJobCompany.name}
                        className="h-8 w-8 rounded object-contain"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedJobCompany.name)}&background=random`
                        }}
                      />
                    </div>
                    <div>
                      <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
                      <p className="text-sm text-muted-foreground">{selectedJobCompany.name}</p>
                    </div>
                  </div>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                  {/* Job Details */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedJob.location}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Briefcase className="h-3 w-3" />
                      {selectedJob.type}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {selectedJob.salary}
                    </Badge>
                    <Badge variant="secondary">{selectedJob.locationType}</Badge>
                    <Badge variant="secondary">{selectedJob.experienceLevel}</Badge>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="mb-2 font-semibold">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="mb-2 font-semibold">Requirements</h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="mb-2 font-semibold">Responsibilities</h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {selectedJob.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="mb-2 font-semibold">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={() => handleApplyJob(selectedJob, selectedJobCompany)}
                  >
                    <Send className="h-4 w-4" />
                    Apply for this Position
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Application Dialog */}
        <Dialog open={!!applyingJob} onOpenChange={(open) => !open && setApplyingJob(null)}>
          <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto border-border/50 bg-background">
            {applyingJob && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {applicationStep === 4 ? "Application Submitted!" : `Apply for ${applyingJob.job.title}`}
                  </DialogTitle>
                  <DialogDescription>
                    {applicationStep === 4
                      ? `Your application has been submitted to ${applyingJob.company.name}.`
                      : `${applyingJob.company.name} - Step ${applicationStep} of 3`}
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
                      <Label htmlFor="resume">Resume *</Label>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files?.[0] || null })}
                      />
                      <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
                    </div>
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
                      <Button className="flex-1" onClick={() => setApplicationStep(3)} disabled={!applicationForm.resume}>
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
                          <span className="text-muted-foreground">Name:</span>
                          <span>{applicationForm.name}</span>
                          <span className="text-muted-foreground">Email:</span>
                          <span>{applicationForm.email}</span>
                          <span className="text-muted-foreground">Phone:</span>
                          <span>{applicationForm.phone}</span>
                          <span className="text-muted-foreground">Resume:</span>
                          <span>{applicationForm.resume?.name}</span>
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
                        Your application for <strong>{applyingJob.job.title}</strong> at{" "}
                        <strong>{applyingJob.company.name}</strong> has been submitted.
                        You can track your application status in "My Applications".
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setApplyingJob(null)} className="flex-1">
                        Close
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setApplyingJob(null)
                          setShowApplications(true)
                        }}
                      >
                        View Applications
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
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border/50 bg-background">
            <DialogHeader>
              <DialogTitle>My Applications</DialogTitle>
              <DialogDescription>Track your job applications and schedule interviews</DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              {applications.length === 0 ? (
                <div className="py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No applications yet. Start applying to jobs!</p>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3 pr-4">
                    {applications.map((app) => (
                      <Card key={app.id} className="border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-foreground">{app.jobTitle}</h4>
                              <p className="text-sm text-muted-foreground">{app.companyName}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Applied on {app.appliedDate.toLocaleDateString()}
                              </p>
                              {app.interviewDate && (
                                <div className="mt-2 flex items-center gap-2 text-sm">
                                  <CalendarIcon className="h-4 w-4 text-primary" />
                                  <span>
                                    Interview: {app.interviewDate.toLocaleDateString()} at {app.interviewTime}
                                  </span>
                                  <Badge variant="outline" className="ml-2">
                                    {app.interviewType === "video" ? (
                                      <Video className="mr-1 h-3 w-3" />
                                    ) : app.interviewType === "phone" ? (
                                      <MessageSquare className="mr-1 h-3 w-3" />
                                    ) : (
                                      <Building2 className="mr-1 h-3 w-3" />
                                    )}
                                    {app.interviewType}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className={getStatusColor(app.status)}>{getStatusLabel(app.status)}</Badge>
                              {app.status === "screening" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setInterviewScheduling(app)}
                                  className="gap-1"
                                >
                                  <CalendarIcon className="h-3 w-3" />
                                  Schedule Interview
                                </Button>
                              )}
                              {app.status === "interview_scheduled" && (
                                <Button size="sm" variant="default" className="gap-1">
                                  <Video className="h-3 w-3" />
                                  Join Interview
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Interview Scheduling Dialog */}
        <Dialog open={!!interviewScheduling} onOpenChange={(open) => !open && setInterviewScheduling(null)}>
          <DialogContent className="max-w-md border-border/50 bg-background">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Choose a date and time for your interview at{" "}
                {interviewScheduling?.companyName}
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
                    Video Call
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
                <Label htmlFor="time">Select Time Slot</Label>
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
    </section>
  )
}
