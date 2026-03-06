"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Search,
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
  GraduationCap,
  Wrench,
  CheckCircle2,
  BookOpen,
  Heart,
  Share2,
  Bookmark,
  Filter,
} from "lucide-react"
import type { JobListing } from "@/lib/jobs-data"

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

const getCategoryIcon = (category: string) => {
  const cat = jobCategories.find(c => c.id === category)
  return cat?.icon || Briefcase
}

export function JobsSection() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedLocationType, setSelectedLocationType] = useState("all")
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const loaderRef = useRef<HTMLDivElement>(null)

  // Fetch jobs from API
  const fetchJobs = useCallback(async (pageNum: number, reset: boolean = false) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "20",
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery }),
        ...(selectedLocation !== "all" && { location: selectedLocation }),
        ...(selectedLocationType !== "all" && { locationType: selectedLocationType }),
        ...(selectedEmploymentType !== "all" && { employmentType: selectedEmploymentType }),
      })
      
      const response = await fetch(`/api/jobs?${params}`)
      const data = await response.json()
      
      if (reset) {
        setJobs(data.jobs)
      } else {
        setJobs(prev => [...prev, ...data.jobs])
      }
      
      setTotalJobs(data.pagination.total)
      setHasMore(data.pagination.hasMore)
      
      // Select first job if none selected
      if (data.jobs.length > 0 && (reset || !selectedJob)) {
        setSelectedJob(data.jobs[0])
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory, searchQuery, selectedLocation, selectedLocationType, selectedEmploymentType, selectedJob])

  // Initial fetch
  useEffect(() => {
    setPage(1)
    fetchJobs(1, true)
  }, [selectedCategory, searchQuery, selectedLocation, selectedLocationType, selectedEmploymentType])

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prev => prev + 1)
          fetchJobs(page + 1, false)
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, page, fetchJobs])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <section id="jobs" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Briefcase className="mr-2 h-3 w-3" />
            {totalJobs.toLocaleString()}+ Job Opportunities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find Your Dream Job
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Browse thousands of tech jobs across India and worldwide. Filter by category, location, and more.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid gap-3 rounded-lg border border-border/50 bg-card/50 p-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Location Type</label>
                <Select value={selectedLocationType} onValueChange={setSelectedLocationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Employment Type</label>
                <Select value={selectedEmploymentType} onValueChange={setSelectedEmploymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Employment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Noida">Noida</SelectItem>
                    <SelectItem value="Gurugram">Gurugram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedLocation("all")
                    setSelectedLocationType("all")
                    setSelectedEmploymentType("all")
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {jobCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className="shrink-0 gap-1.5"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Jobs Layout - List + Detail */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Jobs List */}
          <div className="lg:col-span-2">
            <ScrollArea className="h-[700px] pr-4">
              <div className="space-y-3">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`cursor-pointer border transition-all duration-200 hover:border-primary/50 hover:shadow-md ${
                      selectedJob?.id === job.id ? "border-primary bg-primary/5" : "border-border/50"
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        {/* Company Logo */}
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-background">
                          <Image
                            src={job.companyLogo}
                            alt={job.company}
                            fill
                            className="object-contain p-1"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&size=48`
                            }}
                          />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location.split(",")[0]}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.posted}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {job.locationType}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {job.employmentType}
                            </Badge>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSaveJob(job.id)
                          }}
                        >
                          <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-primary text-primary" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Loader */}
                <div ref={loaderRef} className="flex justify-center py-4">
                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Loading more jobs...</span>
                    </div>
                  )}
                  {!hasMore && jobs.length > 0 && (
                    <p className="text-sm text-muted-foreground">No more jobs to load</p>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Job Detail */}
          <div className="lg:col-span-3">
            {selectedJob ? (
              <Card className="sticky top-4 border-border/50">
                <ScrollArea className="h-[700px]">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="mb-6 flex items-start gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-background">
                        <Image
                          src={selectedJob.companyLogo}
                          alt={selectedJob.company}
                          fill
                          className="object-contain p-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedJob.company)}&background=random&size=64`
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-foreground">{selectedJob.title}</h2>
                        <p className="text-muted-foreground">{selectedJob.company}</p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{selectedJob.location}</span>
                          <span>•</span>
                          <span>{selectedJob.posted}</span>
                          <span>•</span>
                          <span>{selectedJob.applicants} applicants</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5" />
                          Employment
                        </div>
                        <p className="mt-1 font-medium text-foreground">{selectedJob.employmentType}</p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          Location
                        </div>
                        <p className="mt-1 font-medium text-foreground">{selectedJob.locationType}</p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5" />
                          Salary
                        </div>
                        <p className="mt-1 text-sm font-medium text-foreground">{selectedJob.salary}</p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          Experience
                        </div>
                        <p className="mt-1 text-sm font-medium text-foreground">{selectedJob.experienceLevel}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6 flex gap-3">
                      <Button className="flex-1 gap-2" asChild>
                        <a href={selectedJob.applyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Apply Now
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => toggleSaveJob(selectedJob.id)}>
                        <Bookmark className={`h-4 w-4 ${savedJobs.includes(selectedJob.id) ? "fill-primary text-primary" : ""}`} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="responsibilities">Role</TabsTrigger>
                        <TabsTrigger value="qualifications">Skills</TabsTrigger>
                        <TabsTrigger value="company">Company</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-4 space-y-6">
                        {/* About */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <BookOpen className="h-4 w-4 text-primary" />
                            About the Job
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{selectedJob.aboutJob}</p>
                        </div>

                        {/* Position Overview */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <Briefcase className="h-4 w-4 text-primary" />
                            Position Overview
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{selectedJob.positionOverview}</p>
                        </div>

                        {/* Tools & Technologies */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <Wrench className="h-4 w-4 text-primary" />
                            Tools & Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedJob.toolsAndTechnologies.map((tool, i) => (
                              <Badge key={i} variant="secondary">{tool}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <Heart className="h-4 w-4 text-primary" />
                            Benefits
                          </h3>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {selectedJob.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="responsibilities" className="mt-4 space-y-6">
                        {/* Key Responsibilities */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Key Responsibilities
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.keyResponsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Function & Industry */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                            <p className="text-xs text-muted-foreground">Function</p>
                            <p className="mt-1 font-medium text-foreground">{selectedJob.function}</p>
                          </div>
                          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                            <p className="text-xs text-muted-foreground">Industry</p>
                            <p className="mt-1 font-medium text-foreground">{selectedJob.industry}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="qualifications" className="mt-4 space-y-6">
                        {/* Preferred Qualifications */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Preferred Qualifications
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.preferredQualifications.map((qual, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                {qual}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Educational Requirements */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            Educational Requirements
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.educationalRequirements.map((edu, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                {edu}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <Wrench className="h-4 w-4 text-primary" />
                            Required Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedJob.skills.map((skill, i) => (
                              <Badge key={i}>{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="company" className="mt-4 space-y-6">
                        {/* Company Info */}
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-background">
                            <Image
                              src={selectedJob.companyLogo}
                              alt={selectedJob.company}
                              fill
                              className="object-contain p-2"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedJob.company)}&background=random&size=64`
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{selectedJob.company}</h3>
                            <p className="text-sm text-muted-foreground">{selectedJob.industry}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{selectedJob.companySize}</p>
                          </div>
                        </div>

                        {/* About Company */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <Building2 className="h-4 w-4 text-primary" />
                            About {selectedJob.company}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{selectedJob.companyDescription}</p>
                        </div>

                        {/* Company Details */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                            <p className="text-xs text-muted-foreground">Company Size</p>
                            <p className="mt-1 font-medium text-foreground">{selectedJob.companySize}</p>
                          </div>
                          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                            <p className="text-xs text-muted-foreground">Industry</p>
                            <p className="mt-1 font-medium text-foreground">{selectedJob.industry}</p>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full gap-2" asChild>
                          <a href={selectedJob.companyWebsite} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Visit Company Website
                          </a>
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </ScrollArea>
              </Card>
            ) : (
              <Card className="flex h-[700px] items-center justify-center border-border/50">
                <div className="text-center text-muted-foreground">
                  <Briefcase className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-4">Select a job to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
