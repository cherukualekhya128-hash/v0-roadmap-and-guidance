import { NextRequest, NextResponse } from "next/server"
import { jobsDatabase, JobListing } from "@/lib/jobs-data"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const location = searchParams.get("location")
  const locationType = searchParams.get("locationType")
  const employmentType = searchParams.get("employmentType")
  const experienceLevel = searchParams.get("experienceLevel")
  const company = searchParams.get("company")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "20")

  let filteredJobs = [...jobsDatabase]

  // Filter by category
  if (category && category !== "all") {
    filteredJobs = filteredJobs.filter(job => job.category === category)
  }

  // Filter by location type (Remote, Hybrid, On-site)
  if (locationType && locationType !== "all") {
    filteredJobs = filteredJobs.filter(job => job.locationType === locationType)
  }

  // Filter by employment type
  if (employmentType && employmentType !== "all") {
    filteredJobs = filteredJobs.filter(job => job.employmentType === employmentType)
  }

  // Filter by experience level
  if (experienceLevel && experienceLevel !== "all") {
    filteredJobs = filteredJobs.filter(job => job.experienceLevel === experienceLevel)
  }

  // Filter by company
  if (company) {
    const companyQuery = company.toLowerCase()
    filteredJobs = filteredJobs.filter(job => 
      job.company.toLowerCase().includes(companyQuery)
    )
  }

  // Filter by location (city/country)
  if (location) {
    const locationQuery = location.toLowerCase()
    filteredJobs = filteredJobs.filter(job =>
      job.location.toLowerCase().includes(locationQuery)
    )
  }

  // Filter by search query (title, company, skills, description)
  if (search) {
    const query = search.toLowerCase()
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.skills.some(skill => skill.toLowerCase().includes(query)) ||
      job.location.toLowerCase().includes(query) ||
      job.aboutJob.toLowerCase().includes(query) ||
      job.industry.toLowerCase().includes(query)
    )
  }

  // Pagination
  const total = filteredJobs.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  // Get unique values for filters
  const categories = [...new Set(jobsDatabase.map(job => job.category))]
  const locations = [...new Set(jobsDatabase.map(job => job.location))].slice(0, 50)
  const companies = [...new Set(jobsDatabase.map(job => job.company))].slice(0, 100)
  const industries = [...new Set(jobsDatabase.map(job => job.industry))]

  return NextResponse.json({
    jobs: paginatedJobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: endIndex < total,
    },
    filters: {
      categories,
      locations,
      companies,
      industries,
      locationTypes: ["Remote", "Hybrid", "On-site"],
      employmentTypes: ["Full-time", "Part-time", "Contract", "Internship", "Unpaid Internship", "Freelance"],
      experienceLevels: ["Fresher/Student", "Entry level", "Associate", "Mid-Senior level", "Director", "Executive"]
    },
    stats: {
      totalJobs: jobsDatabase.length,
      paidInternships: jobsDatabase.filter(j => j.employmentType === "Internship").length,
      unpaidInternships: jobsDatabase.filter(j => j.employmentType === "Unpaid Internship").length,
    }
  })
}

// Get single job by ID
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // If requesting a specific job
    if (body.jobId) {
      const job = jobsDatabase.find(j => j.id === body.jobId)
      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 })
      }
      return NextResponse.json({ job })
    }
    
    // If submitting a job application
    if (body.applicantData) {
      const { jobId, applicantData } = body
      console.log("Job application received:", { jobId, applicantData })
      
      return NextResponse.json({
        success: true,
        message: "Application submitted successfully",
        applicationId: `APP-${Date.now()}`,
      })
    }
    
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
