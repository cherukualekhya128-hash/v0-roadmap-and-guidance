"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  ChevronRight,
  Building2,
  Code2,
  Server,
  Palette,
  Smartphone,
  Cloud,
  BarChart3,
  Brain,
  Shield,
  Globe,
  Database,
  X,
  Loader2,
  Users,
  ExternalLink,
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
  { id: "hr", label: "HR", icon: Users },
  { id: "sales", label: "Sales", icon: Globe },
  { id: "intern", label: "Internship", icon: Database },
]

// Jobs database
const jobsDatabase = [
  // US Jobs
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    description: "Join our team to build beautiful, performant user interfaces for our flagship product. Work with cutting-edge technologies and collaborate with a talented team of engineers.",
    requirements: [
      "5+ years of frontend development experience",
      "Expert-level React and TypeScript skills",
      "Experience with modern CSS and design systems",
      "Strong understanding of web performance optimization",
      "Excellent communication and collaboration skills"
    ],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataFlow Systems",
    location: "New York, NY",
    salary: "$130,000 - $170,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "backend",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
    description: "Design and implement scalable backend services that power our data platform. Work with distributed systems and handle millions of requests daily.",
    requirements: [
      "4+ years of backend development experience",
      "Proficiency in Node.js or Python",
      "Experience with relational and NoSQL databases",
      "Understanding of cloud services (AWS/GCP)",
      "Strong problem-solving abilities"
    ],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    salary: "$100,000 - $140,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "fullstack",
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    description: "Build end-to-end features for our SaaS platform. Own the entire development lifecycle from design to deployment.",
    requirements: [
      "3+ years of full stack development",
      "Experience with MERN or similar stack",
      "Understanding of CI/CD pipelines",
      "Ability to work in fast-paced startup environment",
      "Self-motivated and proactive"
    ],
  },
  {
    id: 4,
    title: "iOS Developer",
    company: "MobileFirst Labs",
    location: "Seattle, WA",
    salary: "$115,000 - $155,000",
    type: "Full-time",
    posted: "4 days ago",
    category: "mobile",
    skills: ["Swift", "SwiftUI", "iOS SDK", "Core Data", "Combine"],
    description: "Create beautiful, intuitive iOS applications used by millions. Work closely with designers to deliver pixel-perfect implementations.",
    requirements: [
      "4+ years of iOS development",
      "Expert Swift and SwiftUI skills",
      "Published apps on App Store",
      "Experience with iOS design patterns",
      "Strong attention to detail"
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudNative Co.",
    location: "Remote",
    salary: "$125,000 - $165,000",
    type: "Full-time",
    posted: "1 week ago",
    category: "devops",
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Python"],
    description: "Build and maintain our cloud infrastructure. Implement automation and ensure high availability of our services.",
    requirements: [
      "5+ years of DevOps experience",
      "Strong Kubernetes and container expertise",
      "Infrastructure as Code experience",
      "Scripting skills in Python or Bash",
      "On-call rotation participation"
    ],
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    salary: "$110,000 - $150,000",
    type: "Full-time",
    posted: "5 days ago",
    category: "data",
    skills: ["Python", "SQL", "Machine Learning", "Pandas", "TensorFlow"],
    description: "Extract insights from large datasets and build predictive models. Work with stakeholders to drive data-informed decisions.",
    requirements: [
      "3+ years of data science experience",
      "Strong Python and SQL skills",
      "Experience with ML frameworks",
      "Statistical analysis expertise",
      "Excellent presentation skills"
    ],
  },
  {
    id: 7,
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "San Jose, CA",
    salary: "$140,000 - $190,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "ai",
    skills: ["Python", "PyTorch", "TensorFlow", "MLOps", "NLP"],
    description: "Develop and deploy machine learning models at scale. Work on cutting-edge AI projects that impact millions of users.",
    requirements: [
      "4+ years of ML engineering experience",
      "Deep learning framework expertise",
      "Production ML deployment experience",
      "Strong software engineering skills",
      "MS or PhD in related field preferred"
    ],
  },
  {
    id: 8,
    title: "Security Engineer",
    company: "SecureNet",
    location: "Washington, DC",
    salary: "$130,000 - $175,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "security",
    skills: ["Security", "Python", "AWS", "Penetration Testing", "SIEM"],
    description: "Protect our infrastructure and customer data. Conduct security assessments and implement security controls.",
    requirements: [
      "5+ years of security experience",
      "Security certifications (CISSP, CEH)",
      "Cloud security expertise",
      "Incident response experience",
      "Strong analytical skills"
    ],
  },
  // India Jobs - HR
  {
    id: 9,
    title: "HR Coordinator",
    company: "PhonePe",
    location: "Bengaluru, Karnataka, India",
    salary: "₹6,00,000 - ₹10,00,000",
    type: "Full-time",
    posted: "2 hours ago",
    category: "hr",
    skills: ["HR Management", "Recruitment", "Employee Relations", "HRIS", "Communication"],
    description: "Join PhonePe as an HR Coordinator in Bangalore. Support HR team in daily operations, coordinate recruitment activities, and manage employee records.",
    requirements: [
      "2+ years of HR experience",
      "Bachelor's degree in HR or related field",
      "Strong organizational and communication skills",
      "Experience with HRIS systems",
      "Ability to handle confidential information"
    ],
  },
  {
    id: 10,
    title: "HR Associate Partner",
    company: "Amazon",
    location: "Hyderabad, Telangana, India",
    salary: "₹8,00,000 - ₹14,00,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "hr",
    skills: ["HR Strategy", "Employee Engagement", "Performance Management", "Data Analysis", "Leadership"],
    description: "Amazon is seeking an HR Associate Partner to support business leaders in HR strategies, talent management, and organizational development.",
    requirements: [
      "4+ years of HR experience",
      "MBA in HR preferred",
      "Strong analytical skills",
      "Experience in fast-paced environment",
      "Excellent stakeholder management"
    ],
  },
  // India Jobs - Sales
  {
    id: 11,
    title: "Sales Manager",
    company: "Swiggy",
    location: "Hyderabad, Telangana, India",
    salary: "₹10,00,000 - ₹15,00,000",
    type: "Full-time",
    posted: "14 hours ago",
    category: "sales",
    skills: ["Sales Strategy", "Team Leadership", "B2B Sales", "CRM", "Negotiation"],
    description: "Swiggy is hiring a Sales Manager to drive business growth. Lead a team of sales executives and achieve revenue targets for the region.",
    requirements: [
      "5+ years of sales experience with 2+ years in management",
      "Proven track record of achieving sales targets",
      "Strong leadership and team management skills",
      "Experience in food tech or e-commerce preferred",
      "Excellent negotiation skills"
    ],
  },
  {
    id: 12,
    title: "Sales Advisor",
    company: "H&M",
    location: "Hyderabad, Telangana, India",
    salary: "₹2,50,000 - ₹4,00,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "sales",
    skills: ["Retail Sales", "Customer Service", "Visual Merchandising", "Fashion", "Communication"],
    description: "Join H&M as a Sales Advisor. Provide exceptional customer service, maintain store standards, and contribute to sales targets.",
    requirements: [
      "1+ years of retail experience preferred",
      "Passion for fashion and customer service",
      "Strong communication skills",
      "Ability to work flexible hours",
      "Team player with positive attitude"
    ],
  },
  // India Jobs - Internships
  {
    id: 13,
    title: "HTML, CSS & JavaScript Intern",
    company: "Inficore Soft",
    location: "India (Remote)",
    salary: "₹10,000 - ₹15,000/month",
    type: "Internship",
    posted: "Today",
    category: "intern",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
    description: "Remote internship for aspiring web developers. Learn and apply HTML, CSS, and JavaScript to build real-world projects.",
    requirements: [
      "Currently pursuing degree in CS/IT",
      "Basic understanding of HTML, CSS, JavaScript",
      "Eagerness to learn and grow",
      "Good problem-solving skills",
      "Available for 3-6 months"
    ],
  },
  {
    id: 14,
    title: "HR Intern (Work From Home)",
    company: "Naukripay Group",
    location: "India (Remote)",
    salary: "₹8,000 - ₹12,000/month",
    type: "Internship",
    posted: "1 day ago",
    category: "intern",
    skills: ["Recruitment", "MS Office", "Communication", "Screening", "Coordination"],
    description: "Work from home HR internship. Assist in recruitment activities, screen resumes, and coordinate interviews.",
    requirements: [
      "Pursuing or completed degree in HR/MBA",
      "Strong communication skills",
      "Proficiency in MS Office",
      "Self-motivated and organized",
      "Available for minimum 2 months"
    ],
  },
  // India Jobs - Tech
  {
    id: 15,
    title: "React Developer",
    company: "TCS",
    location: "Bengaluru, Karnataka, India",
    salary: "₹6,00,000 - ₹12,00,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "frontend",
    skills: ["React", "JavaScript", "TypeScript", "Redux", "REST API"],
    description: "TCS is hiring React Developers for their Bangalore development center. Build and maintain web applications using React.",
    requirements: [
      "2-5 years of React development experience",
      "Strong JavaScript/TypeScript skills",
      "Experience with state management",
      "Knowledge of REST APIs",
      "Good problem-solving abilities"
    ],
  },
  {
    id: 16,
    title: "Full Stack Developer",
    company: "Infosys",
    location: "Hyderabad, Telangana, India",
    salary: "₹8,00,000 - ₹15,00,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "fullstack",
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    description: "Infosys is seeking Full Stack Developers for enterprise projects. Work on end-to-end application development using MERN stack.",
    requirements: [
      "3-6 years of full stack experience",
      "Proficiency in MERN stack",
      "Experience with cloud services",
      "Strong problem-solving skills",
      "Excellent communication"
    ],
  },
  {
    id: 17,
    title: "Python Developer",
    company: "Wipro",
    location: "Chennai, Tamil Nadu, India",
    salary: "₹5,00,000 - ₹10,00,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "backend",
    skills: ["Python", "Django", "Flask", "PostgreSQL", "REST API"],
    description: "Wipro is hiring Python Developers. Develop backend services, build APIs, and work with databases.",
    requirements: [
      "2-4 years of Python experience",
      "Experience with Django or Flask",
      "Database design skills",
      "API development experience",
      "Knowledge of Git"
    ],
  },
  {
    id: 18,
    title: "DevOps Engineer",
    company: "Accenture",
    location: "Pune, Maharashtra, India",
    salary: "₹10,00,000 - ₹18,00,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "devops",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    description: "Accenture is looking for DevOps Engineers. Implement CI/CD pipelines, manage cloud infrastructure, and automate deployments.",
    requirements: [
      "4-7 years of DevOps experience",
      "Strong AWS/Azure expertise",
      "Containerization skills",
      "Infrastructure as Code experience",
      "Scripting skills"
    ],
  },
  {
    id: 19,
    title: "Data Scientist",
    company: "Flipkart",
    location: "Bengaluru, Karnataka, India",
    salary: "₹15,00,000 - ₹25,00,000",
    type: "Full-time",
    posted: "Today",
    category: "data",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
    description: "Flipkart is hiring Data Scientists. Build ML models for recommendations, pricing, and logistics.",
    requirements: [
      "3-5 years of data science experience",
      "Strong ML and statistics background",
      "Proficiency in Python and SQL",
      "Experience with big data tools",
      "Master's or PhD preferred"
    ],
  },
  {
    id: 20,
    title: "Machine Learning Engineer",
    company: "Google",
    location: "Hyderabad, Telangana, India",
    salary: "₹25,00,000 - ₹45,00,000",
    type: "Full-time",
    posted: "3 days ago",
    category: "ai",
    skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "NLP"],
    description: "Google is seeking ML Engineers. Design and implement machine learning models for products used by billions.",
    requirements: [
      "4+ years of ML experience",
      "Strong Python skills",
      "Deep learning expertise",
      "Published research preferred",
      "MS/PhD in CS or related field"
    ],
  },
  {
    id: 21,
    title: "Android Developer",
    company: "Paytm",
    location: "Noida, Uttar Pradesh, India",
    salary: "₹8,00,000 - ₹16,00,000",
    type: "Full-time",
    posted: "2 days ago",
    category: "mobile",
    skills: ["Kotlin", "Java", "Android SDK", "MVVM", "REST API"],
    description: "Paytm is hiring Android Developers. Build and maintain the Paytm app used by millions.",
    requirements: [
      "3-5 years of Android development",
      "Proficiency in Kotlin and Java",
      "Experience with Android architecture",
      "API integration experience",
      "Play Store deployment experience"
    ],
  },
  {
    id: 22,
    title: "iOS Developer",
    company: "Ola",
    location: "Bengaluru, Karnataka, India",
    salary: "₹10,00,000 - ₹18,00,000",
    type: "Full-time",
    posted: "1 day ago",
    category: "mobile",
    skills: ["Swift", "iOS SDK", "Core Data", "SwiftUI", "REST API"],
    description: "Ola is looking for iOS Developers for their ride-hailing app. Develop new features and improve performance.",
    requirements: [
      "3-6 years of iOS development",
      "Strong Swift skills",
      "Experience with Core Location and MapKit",
      "App Store publishing experience",
      "Knowledge of CI/CD"
    ],
  },
  {
    id: 23,
    title: "Security Engineer",
    company: "Razorpay",
    location: "Bengaluru, Karnataka, India",
    salary: "₹12,00,000 - ₹22,00,000",
    type: "Full-time",
    posted: "4 days ago",
    category: "security",
    skills: ["Security", "Penetration Testing", "OWASP", "Cloud Security", "Python"],
    description: "Razorpay is hiring Security Engineers to protect payment infrastructure and ensure PCI-DSS compliance.",
    requirements: [
      "4+ years of security experience",
      "Penetration testing expertise",
      "Cloud security knowledge",
      "Payment security understanding",
      "Security certifications preferred"
    ],
  },
  {
    id: 24,
    title: "Backend Engineer",
    company: "Zomato",
    location: "Gurugram, Haryana, India",
    salary: "₹12,00,000 - ₹20,00,000",
    type: "Full-time",
    posted: "Today",
    category: "backend",
    skills: ["Go", "Python", "MySQL", "Redis", "Microservices"],
    description: "Zomato is seeking Backend Engineers. Build scalable backend services for millions of users.",
    requirements: [
      "3-6 years of backend development",
      "Experience with Go or Python",
      "Database optimization skills",
      "Microservices experience",
      "High-scale system design"
    ],
  },
]

export function JobsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedJobs, setDisplayedJobs] = useState(jobsDatabase.slice(0, 6))
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedJob, setSelectedJob] = useState<typeof jobsDatabase[0] | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const JOBS_PER_PAGE = 6

  // Filter and reset displayed jobs when filters change
  useEffect(() => {
    let filtered = [...jobsDatabase]

    if (selectedCategory !== "all") {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query)) ||
        job.location.toLowerCase().includes(query)
      )
    }

    setDisplayedJobs(filtered.slice(0, JOBS_PER_PAGE))
    setHasMore(filtered.length > JOBS_PER_PAGE)
  }, [selectedCategory, searchQuery])

  // Load more jobs function
  const loadMoreJobs = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // Get filtered jobs
    let filtered = [...jobsDatabase]
    if (selectedCategory !== "all") {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query)) ||
        job.location.toLowerCase().includes(query)
      )
    }

    setTimeout(() => {
      const currentLength = displayedJobs.length
      const nextJobs = filtered.slice(currentLength, currentLength + JOBS_PER_PAGE)
      
      if (nextJobs.length > 0) {
        setDisplayedJobs(prev => [...prev, ...nextJobs])
      }
      
      setHasMore(currentLength + nextJobs.length < filtered.length)
      setIsLoading(false)
    }, 500)
  }, [displayedJobs.length, selectedCategory, searchQuery, isLoading, hasMore])

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
            Browse tech jobs across all skill levels. Filter by category, search by skills, and find the perfect match for your career.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, skills, or location..."
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
          <Badge variant="outline" className="text-xs">
            {jobsDatabase.length} total jobs
          </Badge>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedJobs.length === 0 && !isLoading && (
            <div className="col-span-full py-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No jobs found matching your criteria</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
          
          {displayedJobs.map((job) => {
            const CategoryIcon = getCategoryIcon(job.category)
            return (
              <Card
                key={job.id}
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
                  <div className="flex items-center justify-between pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary"
                      onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                    >
                      View Details
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Load More / Loading Indicator */}
        <div ref={loaderRef} className="mt-8 flex justify-center">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading more jobs...
            </div>
          )}
          {!hasMore && displayedJobs.length > 0 && (
            <p className="text-sm text-muted-foreground">You have viewed all available jobs</p>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="pr-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {(() => {
                      const Icon = getCategoryIcon(selectedJob.category)
                      return <Icon className="h-6 w-6 text-primary" />
                    })()}
                  </div>
                  <Badge variant="outline">{selectedJob.type}</Badge>
                  <Badge variant="secondary">{selectedJob.posted}</Badge>
                </div>
                <h2 className="text-2xl font-bold text-foreground">{selectedJob.title}</h2>
                <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {selectedJob.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedJob.location}
                  </span>
                </div>
                <div className="mt-3 text-xl font-semibold text-primary">
                  {selectedJob.salary}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Job Description</h3>
                <p className="text-muted-foreground">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button className="flex-1 gap-2" size="lg">
                  <ExternalLink className="h-4 w-4" />
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" onClick={() => setSelectedJob(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
