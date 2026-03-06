"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
} from "lucide-react"

const companies = [
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
  },
]

export function TopCompaniesSection() {
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const industries = ["all", ...new Set(companies.map((c) => c.industry))]

  const filteredCompanies =
    filter === "all"
      ? companies
      : companies.filter((c) => c.industry === filter)

  return (
    <section id="top-companies" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            Dream Companies
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Top 15 MNCs Hiring Now
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Explore career opportunities at the world's leading technology and consulting companies.
          </p>
        </div>

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
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
                    <MapPin className="h-3.5 w-3.5" />
                    {company.headquarters.split(",")[0]}
                  </span>
                </div>

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

        {/* Company Detail Modal */}
        {selectedCompany && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedCompany(null)}
          >
            <Card
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-border/50 bg-card"
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

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
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
                      {selectedCompany.headquarters}
                    </p>
                  </div>
                </div>

                {/* Open Roles */}
                <div className="mt-8">
                  <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Popular Roles
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCompany.openRoles.map((role) => (
                      <Badge
                        key={role}
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        {role}
                      </Badge>
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
                      Visit Careers Page
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
                    Browse Jobs
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
