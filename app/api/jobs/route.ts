import { NextRequest, NextResponse } from "next/server"

// Mock jobs database - in production, this would come from a database
const jobsDatabase = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    posted: "2024-01-15",
    category: "frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    description: "Join our team to build beautiful, performant user interfaces.",
    requirements: [
      "5+ years of frontend development experience",
      "Expert-level React and TypeScript skills",
      "Experience with modern CSS and design systems",
    ],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataFlow Systems",
    location: "New York, NY",
    salary: "$130,000 - $170,000",
    type: "Full-time",
    posted: "2024-01-14",
    category: "backend",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
    description: "Design and implement scalable backend services.",
    requirements: [
      "4+ years of backend development experience",
      "Proficiency in Node.js or Python",
      "Experience with cloud services",
    ],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Infosys",
    location: "Hyderabad, Telangana, India",
    salary: "₹8,00,000 - ₹15,00,000",
    type: "Full-time",
    posted: "2024-01-13",
    category: "fullstack",
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    description: "Work on end-to-end application development using MERN stack.",
    requirements: [
      "3-6 years of full stack experience",
      "Proficiency in MERN stack",
      "Experience with cloud services",
    ],
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    company: "Google",
    location: "Hyderabad, Telangana, India",
    salary: "₹25,00,000 - ₹45,00,000",
    type: "Full-time",
    posted: "2024-01-12",
    category: "ai",
    skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "NLP"],
    description: "Design and implement machine learning models for products used by billions.",
    requirements: [
      "4+ years of ML experience",
      "Strong Python skills",
      "Deep learning expertise",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Accenture",
    location: "Pune, Maharashtra, India",
    salary: "₹10,00,000 - ₹18,00,000",
    type: "Full-time",
    posted: "2024-01-11",
    category: "devops",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    description: "Implement CI/CD pipelines, manage cloud infrastructure.",
    requirements: [
      "4-7 years of DevOps experience",
      "Strong AWS/Azure expertise",
      "Infrastructure as Code experience",
    ],
  },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")

  let filteredJobs = [...jobsDatabase]

  // Filter by category
  if (category && category !== "all") {
    filteredJobs = filteredJobs.filter(job => job.category === category)
  }

  // Filter by search query
  if (search) {
    const query = search.toLowerCase()
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.skills.some(skill => skill.toLowerCase().includes(query)) ||
      job.location.toLowerCase().includes(query)
    )
  }

  // Pagination
  const total = filteredJobs.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  return NextResponse.json({
    jobs: paginatedJobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: endIndex < total,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { jobId, applicantData } = body

    // In production, this would save to a database
    console.log("Job application received:", { jobId, applicantData })

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: `APP-${Date.now()}`,
    })
  } catch (error) {
    console.error("Application error:", error)
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    )
  }
}
