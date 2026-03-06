"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
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
} from "lucide-react"

interface JobOffer {
  id: string
  title: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  salary: string
  posted: string
  isNew: boolean
}

interface Company {
  name: string
  logo: string
  industry: string
  description: string
  employees: string
  headquarters: string
  openRoles: string[]
  benefits: string[]
  careerUrl: string
  color: string
  bgColor: string
  textColor: string
  jobs: JobOffer[]
}

const companies: Company[] = [
  {
    name: "Google",
    logo: "G",
    industry: "Technology",
    description: "Leading tech giant in search, cloud, AI, and software development.",
    employees: "180,000+",
    headquarters: "Mountain View, CA",
    openRoles: ["Software Engineer", "ML Engineer", "Data Scientist", "Product Manager"],
    benefits: ["Competitive salary", "Stock options", "Health benefits", "Learning budget"],
    careerUrl: "https://careers.google.com",
    color: "from-blue-500 to-green-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "g1", title: "Senior Software Engineer", location: "Mountain View, CA", type: "Full-time", salary: "$180K - $250K", posted: "2 days ago", isNew: true },
      { id: "g2", title: "ML Engineer - LLMs", location: "New York, NY", type: "Full-time", salary: "$200K - $280K", posted: "1 week ago", isNew: false },
      { id: "g3", title: "Cloud Solutions Architect", location: "Remote", type: "Full-time", salary: "$160K - $220K", posted: "3 days ago", isNew: true },
      { id: "g4", title: "Product Manager - AI", location: "San Francisco, CA", type: "Full-time", salary: "$170K - $240K", posted: "5 days ago", isNew: false },
    ],
  },
  {
    name: "Microsoft",
    logo: "M",
    industry: "Technology",
    description: "Global leader in software, cloud computing, and enterprise solutions.",
    employees: "220,000+",
    headquarters: "Redmond, WA",
    openRoles: ["Azure Engineer", "AI Researcher", "Full Stack Developer", "DevOps Engineer"],
    benefits: ["Hybrid work", "401k matching", "Wellness programs", "Career growth"],
    careerUrl: "https://careers.microsoft.com",
    color: "from-blue-600 to-cyan-500",
    bgColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    jobs: [
      { id: "m1", title: "Azure DevOps Engineer", location: "Redmond, WA", type: "Full-time", salary: "$150K - $200K", posted: "1 day ago", isNew: true },
      { id: "m2", title: "Senior .NET Developer", location: "Remote", type: "Full-time", salary: "$140K - $180K", posted: "4 days ago", isNew: false },
      { id: "m3", title: "AI Research Scientist", location: "Redmond, WA", type: "Full-time", salary: "$180K - $260K", posted: "2 days ago", isNew: true },
      { id: "m4", title: "Product Designer", location: "Seattle, WA", type: "Full-time", salary: "$130K - $170K", posted: "1 week ago", isNew: false },
    ],
  },
  {
    name: "Amazon",
    logo: "A",
    industry: "E-commerce & Cloud",
    description: "World's largest e-commerce and cloud infrastructure company.",
    employees: "1,500,000+",
    headquarters: "Seattle, WA",
    openRoles: ["SDE", "Solutions Architect", "Data Engineer", "Operations Manager"],
    benefits: ["Sign-on bonus", "RSUs", "Career mobility", "Innovation culture"],
    careerUrl: "https://amazon.jobs",
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    jobs: [
      { id: "a1", title: "SDE II - AWS", location: "Seattle, WA", type: "Full-time", salary: "$160K - $220K", posted: "1 day ago", isNew: true },
      { id: "a2", title: "Solutions Architect", location: "Remote", type: "Full-time", salary: "$150K - $200K", posted: "3 days ago", isNew: true },
      { id: "a3", title: "Data Engineer - Redshift", location: "Austin, TX", type: "Full-time", salary: "$140K - $190K", posted: "1 week ago", isNew: false },
      { id: "a4", title: "Technical Program Manager", location: "Arlington, VA", type: "Full-time", salary: "$145K - $195K", posted: "5 days ago", isNew: false },
    ],
  },
  {
    name: "Apple",
    logo: "A",
    industry: "Consumer Electronics",
    description: "Innovative tech company known for iPhone, Mac, and software ecosystem.",
    employees: "160,000+",
    headquarters: "Cupertino, CA",
    openRoles: ["iOS Developer", "Hardware Engineer", "ML Researcher", "UX Designer"],
    benefits: ["Product discounts", "Health coverage", "Fitness centers", "Education support"],
    careerUrl: "https://jobs.apple.com",
    color: "from-gray-600 to-gray-800",
    bgColor: "bg-gray-500/10",
    textColor: "text-gray-500",
    jobs: [
      { id: "ap1", title: "iOS Software Engineer", location: "Cupertino, CA", type: "Full-time", salary: "$170K - $230K", posted: "2 days ago", isNew: true },
      { id: "ap2", title: "Machine Learning Engineer", location: "Cupertino, CA", type: "Full-time", salary: "$180K - $250K", posted: "4 days ago", isNew: false },
      { id: "ap3", title: "Hardware Design Engineer", location: "Austin, TX", type: "Full-time", salary: "$160K - $220K", posted: "1 week ago", isNew: false },
    ],
  },
  {
    name: "IBM",
    logo: "IBM",
    industry: "Enterprise Technology",
    description: "Pioneer in enterprise computing, AI, and hybrid cloud solutions.",
    employees: "280,000+",
    headquarters: "Armonk, NY",
    openRoles: ["Cloud Architect", "AI Consultant", "Security Analyst", "Data Scientist"],
    benefits: ["Remote-first", "Learning platforms", "Diverse teams", "Global projects"],
    careerUrl: "https://ibm.com/careers",
    color: "from-blue-700 to-blue-500",
    bgColor: "bg-blue-700/10",
    textColor: "text-blue-700",
    jobs: [
      { id: "ib1", title: "Cloud Solutions Architect", location: "Remote", type: "Full-time", salary: "$140K - $180K", posted: "3 days ago", isNew: true },
      { id: "ib2", title: "Watson AI Developer", location: "New York, NY", type: "Full-time", salary: "$130K - $170K", posted: "5 days ago", isNew: false },
      { id: "ib3", title: "Cybersecurity Consultant", location: "Washington, DC", type: "Full-time", salary: "$125K - $165K", posted: "1 week ago", isNew: false },
    ],
  },
  {
    name: "Intel",
    logo: "I",
    industry: "Semiconductors",
    description: "World leader in semiconductor chips and computing innovation.",
    employees: "130,000+",
    headquarters: "Santa Clara, CA",
    openRoles: ["Chip Designer", "Firmware Engineer", "AI Hardware Engineer", "Process Engineer"],
    benefits: ["Sabbatical program", "Tuition assistance", "Patent bonuses", "Relocation support"],
    careerUrl: "https://intel.com/jobs",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-600",
    jobs: [
      { id: "in1", title: "ASIC Design Engineer", location: "Santa Clara, CA", type: "Full-time", salary: "$150K - $200K", posted: "2 days ago", isNew: true },
      { id: "in2", title: "Firmware Developer", location: "Portland, OR", type: "Full-time", salary: "$130K - $170K", posted: "4 days ago", isNew: false },
    ],
  },
  {
    name: "Oracle",
    logo: "O",
    industry: "Enterprise Software",
    description: "Leading provider of database, cloud, and enterprise software solutions.",
    employees: "140,000+",
    headquarters: "Austin, TX",
    openRoles: ["Database Admin", "Cloud Engineer", "Java Developer", "Sales Engineer"],
    benefits: ["Flexible work", "Stock purchase plan", "Health benefits", "Training programs"],
    careerUrl: "https://oracle.com/careers",
    color: "from-red-600 to-red-500",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    jobs: [
      { id: "o1", title: "Oracle DBA", location: "Austin, TX", type: "Full-time", salary: "$120K - $160K", posted: "1 day ago", isNew: true },
      { id: "o2", title: "Java Cloud Developer", location: "Remote", type: "Full-time", salary: "$130K - $175K", posted: "3 days ago", isNew: true },
      { id: "o3", title: "OCI Solutions Architect", location: "Chicago, IL", type: "Full-time", salary: "$140K - $185K", posted: "1 week ago", isNew: false },
    ],
  },
  {
    name: "Meta",
    logo: "M",
    industry: "Social Media & VR",
    description: "Social media giant building the future of virtual and augmented reality.",
    employees: "70,000+",
    headquarters: "Menlo Park, CA",
    openRoles: ["React Developer", "VR Engineer", "ML Scientist", "Research Scientist"],
    benefits: ["Generous PTO", "Parental leave", "Free meals", "Wellness stipend"],
    careerUrl: "https://metacareers.com",
    color: "from-blue-600 to-purple-600",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "me1", title: "React Native Engineer", location: "Menlo Park, CA", type: "Full-time", salary: "$175K - $240K", posted: "1 day ago", isNew: true },
      { id: "me2", title: "VR/AR Software Engineer", location: "Burlingame, CA", type: "Full-time", salary: "$180K - $250K", posted: "3 days ago", isNew: true },
      { id: "me3", title: "ML Infrastructure Engineer", location: "Remote", type: "Full-time", salary: "$170K - $230K", posted: "5 days ago", isNew: false },
    ],
  },
  {
    name: "NVIDIA",
    logo: "N",
    industry: "GPU & AI Computing",
    description: "Leading GPU manufacturer powering AI, gaming, and data centers worldwide.",
    employees: "26,000+",
    headquarters: "Santa Clara, CA",
    openRoles: ["CUDA Developer", "AI Researcher", "Graphics Engineer", "Deep Learning Engineer"],
    benefits: ["Top compensation", "RSUs", "Cutting-edge projects", "Innovation labs"],
    careerUrl: "https://nvidia.com/careers",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    jobs: [
      { id: "n1", title: "CUDA Software Engineer", location: "Santa Clara, CA", type: "Full-time", salary: "$180K - $260K", posted: "1 day ago", isNew: true },
      { id: "n2", title: "Deep Learning Researcher", location: "Remote", type: "Full-time", salary: "$200K - $300K", posted: "2 days ago", isNew: true },
      { id: "n3", title: "Graphics Driver Developer", location: "Austin, TX", type: "Full-time", salary: "$160K - $220K", posted: "4 days ago", isNew: false },
    ],
  },
  {
    name: "Tesla",
    logo: "T",
    industry: "Electric Vehicles & Energy",
    description: "Revolutionary EV and clean energy company transforming transportation.",
    employees: "130,000+",
    headquarters: "Austin, TX",
    openRoles: ["Autopilot Engineer", "Battery Engineer", "Robotics Engineer", "Manufacturing Lead"],
    benefits: ["Stock options", "EV discounts", "Mission-driven work", "Rapid growth"],
    careerUrl: "https://tesla.com/careers",
    color: "from-red-600 to-red-700",
    bgColor: "bg-red-600/10",
    textColor: "text-red-600",
    jobs: [
      { id: "t1", title: "Autopilot Software Engineer", location: "Palo Alto, CA", type: "Full-time", salary: "$170K - $240K", posted: "2 days ago", isNew: true },
      { id: "t2", title: "Battery Systems Engineer", location: "Austin, TX", type: "Full-time", salary: "$140K - $190K", posted: "4 days ago", isNew: false },
      { id: "t3", title: "Robotics Engineer - Optimus", location: "Fremont, CA", type: "Full-time", salary: "$160K - $220K", posted: "1 week ago", isNew: false },
    ],
  },
  {
    name: "Accenture",
    logo: "Ac",
    industry: "Consulting",
    description: "Global professional services company with expertise in digital transformation.",
    employees: "700,000+",
    headquarters: "Dublin, Ireland",
    openRoles: ["Tech Consultant", "Strategy Analyst", "Cloud Specialist", "AI Developer"],
    benefits: ["Global mobility", "Training programs", "Flexible work", "Diverse projects"],
    careerUrl: "https://accenture.com/careers",
    color: "from-purple-600 to-purple-500",
    bgColor: "bg-purple-600/10",
    textColor: "text-purple-600",
    jobs: [
      { id: "ac1", title: "Technology Consultant", location: "New York, NY", type: "Full-time", salary: "$90K - $140K", posted: "1 day ago", isNew: true },
      { id: "ac2", title: "Cloud Migration Specialist", location: "Chicago, IL", type: "Full-time", salary: "$100K - $150K", posted: "3 days ago", isNew: true },
      { id: "ac3", title: "Data Analytics Manager", location: "Remote", type: "Full-time", salary: "$120K - $170K", posted: "5 days ago", isNew: false },
    ],
  },
  {
    name: "Deloitte",
    logo: "D",
    industry: "Professional Services",
    description: "Big Four firm providing audit, consulting, and advisory services.",
    employees: "415,000+",
    headquarters: "London, UK",
    openRoles: ["Tech Consultant", "Cyber Analyst", "Data Analyst", "Risk Advisor"],
    benefits: ["Career development", "Global exposure", "Work-life balance", "Mentorship"],
    careerUrl: "https://deloitte.com/careers",
    color: "from-green-600 to-green-500",
    bgColor: "bg-green-600/10",
    textColor: "text-green-600",
    jobs: [
      { id: "d1", title: "Cyber Security Consultant", location: "Washington, DC", type: "Full-time", salary: "$95K - $145K", posted: "2 days ago", isNew: true },
      { id: "d2", title: "SAP Implementation Lead", location: "Dallas, TX", type: "Full-time", salary: "$110K - $160K", posted: "4 days ago", isNew: false },
    ],
  },
  {
    name: "TCS",
    logo: "TCS",
    industry: "IT Services",
    description: "India's largest IT services company with global consulting presence.",
    employees: "600,000+",
    headquarters: "Mumbai, India",
    openRoles: ["Software Developer", "Business Analyst", "Cloud Engineer", "QA Engineer"],
    benefits: ["Job security", "Learning platforms", "Global projects", "Employee programs"],
    careerUrl: "https://tcs.com/careers",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-600",
    jobs: [
      { id: "tcs1", title: "Java Full Stack Developer", location: "Bangalore, India", type: "Full-time", salary: "INR 8-15 LPA", posted: "1 day ago", isNew: true },
      { id: "tcs2", title: "Cloud DevOps Engineer", location: "Hyderabad, India", type: "Full-time", salary: "INR 10-18 LPA", posted: "3 days ago", isNew: true },
      { id: "tcs3", title: "Data Scientist", location: "Chennai, India", type: "Full-time", salary: "INR 12-20 LPA", posted: "1 week ago", isNew: false },
    ],
  },
  {
    name: "Infosys",
    logo: "I",
    industry: "IT Services",
    description: "Global leader in next-gen digital services and consulting.",
    employees: "340,000+",
    headquarters: "Bangalore, India",
    openRoles: ["Full Stack Developer", "DevOps Engineer", "SAP Consultant", "Data Engineer"],
    benefits: ["Training programs", "Internal mobility", "Innovation hubs", "Health benefits"],
    careerUrl: "https://infosys.com/careers",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    jobs: [
      { id: "inf1", title: "Python Developer", location: "Pune, India", type: "Full-time", salary: "INR 7-14 LPA", posted: "2 days ago", isNew: true },
      { id: "inf2", title: "SAP ABAP Consultant", location: "Bangalore, India", type: "Full-time", salary: "INR 10-18 LPA", posted: "5 days ago", isNew: false },
    ],
  },
  {
    name: "Wipro",
    logo: "W",
    industry: "IT Services",
    description: "Leading global IT, consulting, and business process services company.",
    employees: "250,000+",
    headquarters: "Bangalore, India",
    openRoles: ["Java Developer", "Cloud Architect", "AI Engineer", "Project Manager"],
    benefits: ["Flexible work", "Skill development", "Global exposure", "Wellness programs"],
    careerUrl: "https://wipro.com/careers",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    jobs: [
      { id: "w1", title: "React.js Developer", location: "Hyderabad, India", type: "Full-time", salary: "INR 6-12 LPA", posted: "1 day ago", isNew: true },
      { id: "w2", title: "AWS Cloud Engineer", location: "Bangalore, India", type: "Full-time", salary: "INR 9-16 LPA", posted: "4 days ago", isNew: false },
    ],
  },
]

interface Notification {
  id: string
  company: string
  job: string
  time: string
}

export function TopCompaniesSection() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [subscribedCompanies, setSubscribedCompanies] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasNewNotifications, setHasNewNotifications] = useState(false)

  const industries = ["all", ...new Set(companies.map((c) => c.industry))]

  const filteredCompanies =
    filter === "all"
      ? companies
      : companies.filter((c) => c.industry === filter)

  const totalJobs = companies.reduce((acc, c) => acc + c.jobs.length, 0)
  const newJobs = companies.reduce((acc, c) => acc + c.jobs.filter(j => j.isNew).length, 0)

  const toggleSubscription = (companyName: string) => {
    setSubscribedCompanies(prev => {
      const newSet = new Set(prev)
      if (newSet.has(companyName)) {
        newSet.delete(companyName)
      } else {
        newSet.add(companyName)
        // Add a notification for subscribing
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          company: companyName,
          job: "You will receive alerts for new job postings",
          time: "Just now"
        }
        setNotifications(prev => [newNotification, ...prev])
        setHasNewNotifications(true)
      }
      return newSet
    })
  }

  // Simulate new job notifications for subscribed companies
  useEffect(() => {
    const interval = setInterval(() => {
      if (subscribedCompanies.size > 0) {
        const subscribedArray = Array.from(subscribedCompanies)
        const randomCompany = subscribedArray[Math.floor(Math.random() * subscribedArray.length)]
        const company = companies.find(c => c.name === randomCompany)
        if (company && company.jobs.length > 0) {
          const randomJob = company.jobs[Math.floor(Math.random() * company.jobs.length)]
          const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            company: company.name,
            job: `New opening: ${randomJob.title}`,
            time: "Just now"
          }
          setNotifications(prev => [newNotification, ...prev.slice(0, 9)])
          setHasNewNotifications(true)
        }
      }
    }, 30000) // Every 30 seconds for demo purposes

    return () => clearInterval(interval)
  }, [subscribedCompanies])

  return (
    <section id="top-companies" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
              Dream Companies
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Top 15 MNCs Hiring Now
            </h2>
            <p className="mt-2 text-muted-foreground">
              {totalJobs} open positions across {companies.length} companies
              <span className="ml-2 inline-flex items-center gap-1 text-green-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                {newJobs} new this week
              </span>
            </p>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setHasNewNotifications(false)
              }}
            >
              <Bell className="h-5 w-5" />
              {hasNewNotifications && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-border bg-card shadow-xl">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <h3 className="font-semibold text-foreground">Job Alerts</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      <BellOff className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p>No notifications yet</p>
                      <p className="mt-1 text-xs">Subscribe to companies to get job alerts</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="border-b border-border/50 p-3 transition-colors hover:bg-secondary/50"
                      >
                        <p className="text-sm font-medium text-foreground">{notif.company}</p>
                        <p className="text-xs text-muted-foreground">{notif.job}</p>
                        <p className="mt-1 text-xs text-muted-foreground/70">{notif.time}</p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="border-t border-border p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setNotifications([])}
                    >
                      Clear all notifications
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Subscribed Companies Quick View */}
        {subscribedCompanies.size > 0 && (
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Bell className="h-4 w-4" />
              <span className="font-medium">Subscribed to job alerts from:</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from(subscribedCompanies).map((name) => (
                <Badge
                  key={name}
                  variant="secondary"
                  className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20"
                  onClick={() => toggleSubscription(name)}
                >
                  {name}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Industry Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={filter === industry ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(industry)}
              className="capitalize"
            >
              {industry === "all" ? "All Industries" : industry}
            </Button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Card
              key={company.name}
              className="group cursor-pointer border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-lg"
              onClick={() => setSelectedCompany(company)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${company.color} text-lg font-bold text-white shadow-md`}
                    >
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {company.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {company.industry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {subscribedCompanies.has(company.name) && (
                      <Bell className="h-4 w-4 text-primary" />
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                  {company.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {company.employees}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-green-500 font-medium">{company.jobs.length} jobs</span>
                  </span>
                </div>

                {/* New Jobs Indicator */}
                {company.jobs.some(j => j.isNew) && (
                  <div className="mt-3">
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                      {company.jobs.filter(j => j.isNew).length} new opening{company.jobs.filter(j => j.isNew).length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {company.openRoles.slice(0, 2).map((role) => (
                    <Badge
                      key={role}
                      variant="secondary"
                      className="text-xs"
                    >
                      {role}
                    </Badge>
                  ))}
                  {company.openRoles.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{company.openRoles.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Detail Modal with Jobs */}
        {selectedCompany && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedCompany(null)}
          >
            <Card
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-border/50 bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start gap-6">
                  <div
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedCompany.color} text-2xl font-bold text-white shadow-lg`}
                  >
                    {selectedCompany.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-foreground">
                        {selectedCompany.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCompany(null)}
                      >
                        Close
                      </Button>
                    </div>
                    <Badge className={`mt-2 ${selectedCompany.bgColor} ${selectedCompany.textColor} border-0`}>
                      {selectedCompany.industry}
                    </Badge>
                    <p className="mt-3 text-muted-foreground">
                      {selectedCompany.description}
                    </p>
                  </div>
                </div>

                {/* Notification Toggle */}
                <div className="mt-6 flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4">
                  <div className="flex items-center gap-3">
                    <Bell className={`h-5 w-5 ${subscribedCompanies.has(selectedCompany.name) ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">Job Alerts</p>
                      <p className="text-xs text-muted-foreground">Get notified when new jobs are posted</p>
                    </div>
                  </div>
                  <Switch
                    checked={subscribedCompanies.has(selectedCompany.name)}
                    onCheckedChange={() => toggleSubscription(selectedCompany.name)}
                  />
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Employees
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {selectedCompany.employees}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Headquarters
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {selectedCompany.headquarters.split(",")[0]}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      Open Jobs
                    </div>
                    <p className="mt-1 text-lg font-semibold text-green-500">
                      {selectedCompany.jobs.length}
                    </p>
                  </div>
                </div>

                {/* Job Listings */}
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Current Job Openings
                  </h4>
                  <div className="mt-4 space-y-3">
                    {selectedCompany.jobs.map((job) => (
                      <div
                        key={job.id}
                        className="group/job rounded-lg border border-border/50 bg-secondary/20 p-4 transition-all hover:border-primary/50 hover:bg-secondary/40"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-foreground">{job.title}</h5>
                              {job.isNew && (
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.salary}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{job.posted}</span>
                            <Button size="sm" variant="outline" className="opacity-0 transition-opacity group-hover/job:opacity-100" asChild>
                              <a href={selectedCompany.careerUrl} target="_blank" rel="noopener noreferrer">
                                Apply
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-6">
                  <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Sparkles className="h-4 w-4 text-chart-2" />
                    Employee Benefits
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCompany.benefits.map((benefit) => (
                      <Badge
                        key={benefit}
                        variant="outline"
                        className="border-chart-2/30 text-muted-foreground"
                      >
                        <Check className="mr-1 h-3 w-3 text-chart-2" />
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex gap-3">
                  <Button asChild className="flex-1 gap-2">
                    <a
                      href={selectedCompany.careerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-4 w-4" />
                      View All Jobs on Careers Page
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      setSelectedCompany(null)
                      document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Browse All Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
