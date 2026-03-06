"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Search,
  Filter,
  ChevronRight,
  Loader2,
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Cloud,
  Brain,
  Palette,
  Shield,
  BarChart3,
} from "lucide-react"

// Job categories with their icons
const jobCategories = [
  { id: "all", label: "All Jobs", icon: Briefcase },
  { id: "frontend", label: "Frontend", icon: Palette },
  { id: "backend", label: "Backend", icon: Server },
  { id: "fullstack", label: "Full Stack", icon: Code2 },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "devops", label: "DevOps", icon: Cloud },
  { id: "data", label: "Data Science", icon: BarChart3 },
  { id: "ai", label: "AI/ML", icon: Brain },
  { id: "security", label: "Security", icon: Shield },
]

// Comprehensive job database
const jobsDatabase = [
  // Frontend Jobs
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$140,000 - $180,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    description: "We're looking for a Senior Frontend Developer to lead our web application development. You'll work on building scalable, performant user interfaces using modern React patterns and best practices.",
    requirements: [
      "5+ years of experience with React and modern JavaScript",
      "Strong understanding of TypeScript and type-safe development",
      "Experience with state management (Redux, Zustand, or similar)",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
      "Excellent problem-solving and communication skills"
    ],
  },
  {
    id: 2,
    title: "React Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "frontend",
    skills: ["React", "JavaScript", "CSS", "REST API", "Git"],
    description: "Join our fast-growing startup as a React Developer. You'll be building user-facing features for our SaaS platform, collaborating closely with designers and backend engineers.",
    requirements: [
      "3+ years of experience with React",
      "Proficiency in JavaScript ES6+ and CSS/SCSS",
      "Experience with RESTful APIs and async programming",
      "Knowledge of responsive design principles",
      "Ability to work in a fast-paced startup environment"
    ],
  },
  {
    id: 3,
    title: "UI Engineer",
    company: "DesignTech",
    location: "New York, NY",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "frontend",
    skills: ["Vue.js", "JavaScript", "SCSS", "Figma", "Storybook"],
    description: "As a UI Engineer, you'll bridge the gap between design and development. Create pixel-perfect implementations of our design system and ensure consistent user experiences across our platform.",
    requirements: [
      "4+ years of frontend development experience",
      "Strong eye for design and attention to detail",
      "Experience building and maintaining component libraries",
      "Proficiency with design tools like Figma",
      "Understanding of accessibility standards (WCAG)"
    ],
  },

  // Backend Jobs
  {
    id: 4,
    title: "Senior Backend Engineer",
    company: "DataFlow Systems",
    location: "Seattle, WA",
    salary: "$150,000 - $190,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "backend",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    description: "Lead backend development for our data processing platform. Design and implement scalable APIs, optimize database performance, and mentor junior developers.",
    requirements: [
      "6+ years of backend development experience",
      "Expert-level Python and Django knowledge",
      "Strong database design and optimization skills",
      "Experience with microservices architecture",
      "Leadership and mentoring experience"
    ],
  },
  {
    id: 5,
    title: "Node.js Developer",
    company: "CloudNative Inc.",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "4 days ago",
    category: "backend",
    skills: ["Node.js", "Express", "MongoDB", "AWS", "TypeScript"],
    description: "Build and maintain our Node.js microservices. Work with AWS services to create scalable, resilient backend systems that power our customer-facing applications.",
    requirements: [
      "4+ years of Node.js development experience",
      "Strong understanding of async programming patterns",
      "Experience with NoSQL databases (MongoDB preferred)",
      "AWS certification or equivalent experience",
      "Knowledge of containerization and orchestration"
    ],
  },
  {
    id: 6,
    title: "Java Backend Developer",
    company: "Enterprise Solutions",
    location: "Chicago, IL",
    salary: "$125,000 - $155,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "backend",
    skills: ["Java", "Spring Boot", "MySQL", "Kafka", "Kubernetes"],
    description: "Develop enterprise-grade backend services using Java and Spring Boot. Work on high-throughput systems processing millions of transactions daily.",
    requirements: [
      "5+ years of Java development experience",
      "Strong Spring Boot and Spring Cloud knowledge",
      "Experience with message queues (Kafka, RabbitMQ)",
      "Understanding of distributed systems",
      "Experience with CI/CD pipelines"
    ],
  },

  // Full Stack Jobs
  {
    id: 7,
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Remote",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    posted: "Just now",
    category: "fullstack",
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS"],
    description: "Own features end-to-end as a Full Stack Developer. Build complete solutions from database design to user interface, working across our entire tech stack.",
    requirements: [
      "4+ years of full stack development experience",
      "Strong React and Node.js skills",
      "Database design and optimization experience",
      "Cloud platform experience (AWS preferred)",
      "Ability to work independently and drive projects"
    ],
  },
  {
    id: 8,
    title: "Senior Full Stack Engineer",
    company: "ScaleUp Ventures",
    location: "Boston, MA",
    salary: "$155,000 - $195,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "fullstack",
    skills: ["Next.js", "Python", "FastAPI", "MongoDB", "Docker"],
    description: "Lead full stack development for our venture-backed startup. Architect and build scalable systems while mentoring a growing engineering team.",
    requirements: [
      "7+ years of software development experience",
      "Experience with modern JavaScript frameworks",
      "Backend expertise in Python or Node.js",
      "System design and architecture experience",
      "Startup experience preferred"
    ],
  },
  {
    id: 9,
    title: "MERN Stack Developer",
    company: "WebAgency Pro",
    location: "Los Angeles, CA",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "5 days ago",
    category: "fullstack",
    skills: ["MongoDB", "Express", "React", "Node.js", "Redux"],
    description: "Join our agency team building web applications for diverse clients. Work with the MERN stack to deliver high-quality projects on schedule.",
    requirements: [
      "3+ years of MERN stack experience",
      "Strong JavaScript fundamentals",
      "Experience with multiple projects simultaneously",
      "Client communication skills",
      "Portfolio of completed projects"
    ],
  },

  // Mobile Jobs
  {
    id: 10,
    title: "iOS Developer",
    company: "MobileFirst Apps",
    location: "San Francisco, CA",
    salary: "$140,000 - $175,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "mobile",
    skills: ["Swift", "SwiftUI", "iOS SDK", "Xcode", "Core Data"],
    description: "Build beautiful, performant iOS applications. Work with our design team to create intuitive mobile experiences used by millions of users.",
    requirements: [
      "5+ years of iOS development experience",
      "Expert SwiftUI and UIKit knowledge",
      "App Store publishing experience",
      "Understanding of iOS design guidelines",
      "Experience with CI/CD for mobile"
    ],
  },
  {
    id: 11,
    title: "React Native Developer",
    company: "CrossPlatform Co.",
    location: "Remote",
    salary: "$115,000 - $145,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "mobile",
    skills: ["React Native", "TypeScript", "Redux", "iOS", "Android"],
    description: "Develop cross-platform mobile applications using React Native. Maintain a single codebase that delivers native experiences on both iOS and Android.",
    requirements: [
      "4+ years of mobile development experience",
      "Strong React Native expertise",
      "Understanding of native iOS and Android",
      "Experience with app performance optimization",
      "Published apps in both stores"
    ],
  },
  {
    id: 12,
    title: "Android Developer",
    company: "GooglePartner Tech",
    location: "Seattle, WA",
    salary: "$130,000 - $165,000",
    type: "Full-time",
    posted: "4 days ago",
    category: "mobile",
    skills: ["Kotlin", "Android SDK", "Jetpack Compose", "Firebase", "MVVM"],
    description: "Create cutting-edge Android applications using Kotlin and modern Android architecture. Collaborate with cross-functional teams to deliver exceptional mobile experiences.",
    requirements: [
      "5+ years of Android development experience",
      "Expert Kotlin and Java knowledge",
      "Experience with Jetpack libraries",
      "Understanding of Material Design",
      "Performance profiling experience"
    ],
  },

  // DevOps Jobs
  {
    id: 13,
    title: "Senior DevOps Engineer",
    company: "InfraScale",
    location: "Denver, CO",
    salary: "$145,000 - $185,000",
    type: "Full-time",
    posted: "Just now",
    category: "devops",
    skills: ["Kubernetes", "Terraform", "AWS", "Python", "CI/CD"],
    description: "Lead our DevOps transformation. Design and implement infrastructure as code, automate deployments, and ensure 99.99% uptime for our production systems.",
    requirements: [
      "6+ years of DevOps/SRE experience",
      "Expert Kubernetes and container orchestration",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Multi-cloud experience (AWS, GCP, Azure)",
      "On-call and incident management experience"
    ],
  },
  {
    id: 14,
    title: "Cloud Engineer",
    company: "CloudMasters",
    location: "Remote",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "devops",
    skills: ["AWS", "Azure", "Docker", "Linux", "Bash"],
    description: "Design and manage cloud infrastructure for enterprise clients. Implement best practices for security, cost optimization, and scalability.",
    requirements: [
      "4+ years of cloud engineering experience",
      "AWS Solutions Architect certification",
      "Strong Linux administration skills",
      "Scripting proficiency (Python, Bash)",
      "Understanding of networking and security"
    ],
  },
  {
    id: 15,
    title: "Site Reliability Engineer",
    company: "HighAvailability Inc.",
    location: "New York, NY",
    salary: "$160,000 - $200,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "devops",
    skills: ["Go", "Prometheus", "Grafana", "Kubernetes", "PostgreSQL"],
    description: "Ensure our systems are reliable, scalable, and efficient. Build observability tools, automate operations, and drive engineering excellence across the organization.",
    requirements: [
      "5+ years of SRE or DevOps experience",
      "Strong programming skills (Go, Python)",
      "Experience with monitoring and alerting systems",
      "Database administration experience",
      "Incident response and post-mortem expertise"
    ],
  },

  // Data Science Jobs
  {
    id: 16,
    title: "Senior Data Scientist",
    company: "DataDriven Analytics",
    location: "San Francisco, CA",
    salary: "$165,000 - $210,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "data",
    skills: ["Python", "SQL", "TensorFlow", "Spark", "Tableau"],
    description: "Lead data science initiatives to drive business decisions. Build predictive models, conduct A/B tests, and present insights to stakeholders across the organization.",
    requirements: [
      "6+ years of data science experience",
      "Advanced degree in quantitative field",
      "Expert Python and SQL skills",
      "Experience with big data technologies",
      "Strong communication and presentation skills"
    ],
  },
  {
    id: 17,
    title: "Data Engineer",
    company: "PipelineData",
    location: "Austin, TX",
    salary: "$130,000 - $165,000",
    type: "Full-time",
    posted: "4 days ago",
    category: "data",
    skills: ["Python", "Spark", "Airflow", "Snowflake", "dbt"],
    description: "Build and maintain data pipelines that power our analytics platform. Design data models, optimize query performance, and ensure data quality across the organization.",
    requirements: [
      "5+ years of data engineering experience",
      "Strong Python and SQL skills",
      "Experience with modern data stack",
      "ETL/ELT pipeline development",
      "Data warehousing expertise"
    ],
  },
  {
    id: 18,
    title: "Business Intelligence Analyst",
    company: "InsightCorp",
    location: "Chicago, IL",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "data",
    skills: ["SQL", "Tableau", "Power BI", "Excel", "Python"],
    description: "Transform data into actionable insights. Create dashboards, automate reporting, and partner with business teams to drive data-informed decision making.",
    requirements: [
      "3+ years of BI/analytics experience",
      "Advanced SQL skills",
      "Expertise with visualization tools",
      "Strong business acumen",
      "Experience with stakeholder management"
    ],
  },

  // AI/ML Jobs
  {
    id: 19,
    title: "Machine Learning Engineer",
    company: "AILabs",
    location: "Remote",
    salary: "$170,000 - $220,000",
    type: "Full-time",
    posted: "Just now",
    category: "ai",
    skills: ["Python", "PyTorch", "TensorFlow", "MLOps", "AWS SageMaker"],
    description: "Build and deploy machine learning models at scale. Work on cutting-edge problems in NLP, computer vision, and recommendation systems.",
    requirements: [
      "5+ years of ML engineering experience",
      "Strong Python and deep learning frameworks",
      "MLOps and model deployment experience",
      "Published research or patents preferred",
      "Experience with large-scale distributed training"
    ],
  },
  {
    id: 20,
    title: "NLP Engineer",
    company: "LanguageAI",
    location: "New York, NY",
    salary: "$155,000 - $195,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "ai",
    skills: ["Python", "Transformers", "BERT", "LangChain", "OpenAI API"],
    description: "Develop state-of-the-art NLP solutions. Work with large language models to build conversational AI, text analysis, and content generation systems.",
    requirements: [
      "4+ years of NLP experience",
      "Deep understanding of transformer architectures",
      "Experience fine-tuning LLMs",
      "Knowledge of prompt engineering",
      "Strong research background"
    ],
  },
  {
    id: 21,
    title: "Computer Vision Engineer",
    company: "VisionTech",
    location: "Boston, MA",
    salary: "$145,000 - $185,000",
    type: "Full-time",
    posted: "5 days ago",
    category: "ai",
    skills: ["Python", "PyTorch", "OpenCV", "CUDA", "TensorRT"],
    description: "Build computer vision systems for real-time applications. Develop object detection, image segmentation, and video analysis solutions.",
    requirements: [
      "5+ years of computer vision experience",
      "Strong deep learning fundamentals",
      "Experience with edge deployment",
      "GPU optimization experience",
      "Published papers preferred"
    ],
  },

  // Security Jobs
  {
    id: 22,
    title: "Security Engineer",
    company: "SecureFirst",
    location: "Washington, DC",
    salary: "$140,000 - $180,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "security",
    skills: ["Python", "AWS Security", "Penetration Testing", "SIEM", "Compliance"],
    description: "Protect our infrastructure and applications from security threats. Conduct security assessments, implement controls, and respond to security incidents.",
    requirements: [
      "5+ years of security engineering experience",
      "CISSP, CEH, or similar certifications",
      "Experience with security tools and frameworks",
      "Cloud security expertise",
      "Incident response experience"
    ],
  },
  {
    id: 23,
    title: "Application Security Engineer",
    company: "AppSecure",
    location: "Remote",
    salary: "$130,000 - $165,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "security",
    skills: ["OWASP", "Burp Suite", "SAST", "DAST", "DevSecOps"],
    description: "Integrate security into our software development lifecycle. Conduct code reviews, vulnerability assessments, and security training for development teams.",
    requirements: [
      "4+ years of application security experience",
      "Strong programming background",
      "Experience with security testing tools",
      "Knowledge of secure coding practices",
      "DevSecOps implementation experience"
    ],
  },
  {
    id: 24,
    title: "Cloud Security Architect",
    company: "CloudDefense",
    location: "San Francisco, CA",
    salary: "$175,000 - $225,000",
    type: "Full-time",
    posted: "4 days ago",
    category: "security",
    skills: ["AWS", "Azure", "Zero Trust", "IAM", "Terraform"],
    description: "Design and implement cloud security architecture for enterprise clients. Define security standards, assess risks, and guide cloud migrations.",
    requirements: [
      "7+ years of security architecture experience",
      "Multi-cloud security expertise",
      "Experience with compliance frameworks",
      "Strong stakeholder management skills",
      "Relevant certifications required"
    ],
  },

  // Additional jobs for variety
  {
    id: 25,
    title: "Frontend Team Lead",
    company: "TechGiant",
    location: "Remote",
    salary: "$160,000 - $200,000",
    type: "Full-time",
    posted: "Just now",
    category: "frontend",
    skills: ["React", "TypeScript", "Leadership", "System Design", "Agile"],
    description: "Lead a team of frontend developers building next-generation web applications. Set technical direction, mentor team members, and deliver exceptional products.",
    requirements: [
      "8+ years of frontend experience",
      "3+ years of leadership experience",
      "Expert React and TypeScript skills",
      "Strong system design abilities",
      "Experience scaling frontend applications"
    ],
  },
  {
    id: 26,
    title: "Staff Backend Engineer",
    company: "FinTech Pro",
    location: "New York, NY",
    salary: "$200,000 - $250,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "backend",
    skills: ["Go", "Kubernetes", "PostgreSQL", "gRPC", "Microservices"],
    description: "Shape the technical direction of our backend systems. Design high-throughput, low-latency services that power our financial platform.",
    requirements: [
      "10+ years of software engineering experience",
      "Expert-level Go or similar language",
      "Financial services experience preferred",
      "System design and architecture expertise",
      "Track record of technical leadership"
    ],
  },
  {
    id: 27,
    title: "Principal Full Stack Engineer",
    company: "Innovation Labs",
    location: "Seattle, WA",
    salary: "$185,000 - $235,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "fullstack",
    skills: ["React", "Go", "PostgreSQL", "AWS", "System Design"],
    description: "Drive technical excellence across our engineering organization. Lead complex projects, establish best practices, and mentor senior engineers.",
    requirements: [
      "12+ years of software engineering experience",
      "Full stack development expertise",
      "Proven track record of leading large projects",
      "Strong mentoring and communication skills",
      "Experience with high-scale systems"
    ],
  },
  {
    id: 28,
    title: "Flutter Developer",
    company: "MobileApps Co.",
    location: "Remote",
    salary: "$105,000 - $135,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "mobile",
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "Git"],
    description: "Build beautiful cross-platform mobile applications using Flutter. Deliver high-quality apps that work seamlessly on iOS and Android.",
    requirements: [
      "3+ years of mobile development experience",
      "Strong Flutter and Dart skills",
      "Published apps in app stores",
      "Experience with state management",
      "Understanding of mobile UX patterns"
    ],
  },
  {
    id: 29,
    title: "Platform Engineer",
    company: "Platform.io",
    location: "Austin, TX",
    salary: "$140,000 - $175,000",
    type: "Full-time",
    posted: "4 days ago",
    category: "devops",
    skills: ["Kubernetes", "Go", "Terraform", "ArgoCD", "GitOps"],
    description: "Build and maintain our internal developer platform. Create tools and infrastructure that enable teams to ship faster and more reliably.",
    requirements: [
      "5+ years of platform/DevOps experience",
      "Strong programming skills",
      "Kubernetes expertise",
      "Developer experience focus",
      "Infrastructure as Code experience"
    ],
  },
  {
    id: 30,
    title: "MLOps Engineer",
    company: "ML Platform Inc.",
    location: "San Francisco, CA",
    salary: "$150,000 - $190,000",
    type: "Full-time",
    posted: "5 days ago",
    category: "ai",
    skills: ["Python", "Kubeflow", "MLflow", "Docker", "AWS"],
    description: "Build infrastructure for machine learning at scale. Create pipelines for model training, deployment, and monitoring.",
    requirements: [
      "4+ years of MLOps experience",
      "Strong Python and infrastructure skills",
      "Experience with ML frameworks",
      "Kubernetes and containerization",
      "Model serving experience"
    ],
  },
]

// Function to get more jobs (simulates infinite scroll)
function generateMoreJobs(existingCount: number, category: string): typeof jobsDatabase {
  const baseJobs = category === "all" 
    ? jobsDatabase 
    : jobsDatabase.filter(job => job.category === category)
  
  return baseJobs.map((job, index) => ({
    ...job,
    id: existingCount + index + 1,
    posted: `${Math.floor(Math.random() * 7) + 1} days ago`,
  }))
}

export function JobsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [jobs, setJobs] = useState(jobsDatabase)
  const [displayedJobs, setDisplayedJobs] = useState<typeof jobsDatabase>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedJob, setSelectedJob] = useState<typeof jobsDatabase[0] | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const JOBS_PER_PAGE = 6

  // Filter jobs based on category and search
  useEffect(() => {
    let filtered = jobsDatabase

    if (selectedCategory !== "all") {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query)) ||
        job.description.toLowerCase().includes(query)
      )
    }

    setJobs(filtered)
    setDisplayedJobs(filtered.slice(0, JOBS_PER_PAGE))
    setHasMore(filtered.length > JOBS_PER_PAGE)
  }, [selectedCategory, searchQuery])

  // Infinite scroll handler
  const loadMoreJobs = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const currentLength = displayedJobs.length
      const moreJobs = jobs.slice(currentLength, currentLength + JOBS_PER_PAGE)
      
      if (moreJobs.length === 0) {
        // Generate more jobs for infinite effect
        const newJobs = generateMoreJobs(currentLength, selectedCategory)
        setDisplayedJobs(prev => [...prev, ...newJobs.slice(0, JOBS_PER_PAGE)])
      } else {
        setDisplayedJobs(prev => [...prev, ...moreJobs])
      }
      
      setIsLoading(false)
    }, 800)
  }, [displayedJobs, jobs, isLoading, hasMore, selectedCategory])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreJobs()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [loadMoreJobs, hasMore, isLoading])

  const getCategoryIcon = (category: string) => {
    const cat = jobCategories.find(c => c.id === category)
    return cat ? cat.icon : Briefcase
  }

  return (
    <section id="jobs" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Briefcase className="mr-2 h-3 w-3" />
            Job Opportunities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find Your Dream Job
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Browse thousands of tech jobs across all skill levels. Filter by category, search by skills, and find the perfect match for your career.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {jobCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }
                >
                  <Icon className="mr-1.5 h-3.5 w-3.5" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Job Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{displayedJobs.length}</span> jobs
            {selectedCategory !== "all" && (
              <> in <span className="font-medium text-primary">{jobCategories.find(c => c.id === selectedCategory)?.label}</span></>
            )}
          </p>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Filter className="mr-1.5 h-3.5 w-3.5" />
            More Filters
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedJobs.length === 0 && !isLoading && (
            <div className="col-span-full py-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No jobs found matching your criteria</p>
            </div>
          )}
          {displayedJobs.map((job) => {
            const CategoryIcon = getCategoryIcon(job.category)
            return (
              <Card
                key={`${job.id}-${job.title}`}
                className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                onClick={() => setSelectedJob(job)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      {job.posted}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    <DollarSign className="h-3.5 w-3.5" />
                    {job.salary}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary/50 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="secondary" className="bg-secondary/50 text-xs">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedJob(job)
                      }}
                    >
                      View Details
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedJob(job)
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Loading Indicator */}
        <div ref={loaderRef} className="mt-8 flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading more jobs...</span>
            </div>
          )}
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedJob(null)}
          >
            <div 
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl border border-border bg-card p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      {(() => {
                        const Icon = getCategoryIcon(selectedJob.category)
                        return <Icon className="h-6 w-6 text-primary" />
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{selectedJob.title}</h3>
                      <p className="text-muted-foreground">{selectedJob.company}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {selectedJob.type}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-primary">
                    <DollarSign className="h-4 w-4" />
                    {selectedJob.salary}
                  </span>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill) => (
                      <Badge key={skill} className="bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Job Description</h4>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="flex-1 border-border">
                    Save Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
