import { NextRequest, NextResponse } from "next/server"
import { jobsDatabase, JobListing } from "@/lib/jobs-data"

interface MatchedJob extends JobListing {
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
}

// Normalize skill names for better matching
function normalizeSkill(skill: string): string {
  return skill.toLowerCase().trim()
    .replace(/\.js$/i, "")
    .replace(/\.py$/i, "")
    .replace(/\s+/g, " ")
}

// Check if two skills match (with some flexibility)
function skillsMatch(userSkill: string, jobSkill: string): boolean {
  const normalizedUser = normalizeSkill(userSkill)
  const normalizedJob = normalizeSkill(jobSkill)
  
  // Direct match
  if (normalizedUser === normalizedJob) return true
  
  // Partial match (one contains the other)
  if (normalizedUser.includes(normalizedJob) || normalizedJob.includes(normalizedUser)) return true
  
  // Common aliases
  const aliases: Record<string, string[]> = {
    "javascript": ["js", "es6", "es2015", "ecmascript"],
    "typescript": ["ts"],
    "python": ["py", "python3"],
    "react": ["reactjs", "react.js"],
    "vue": ["vuejs", "vue.js"],
    "angular": ["angularjs", "angular.js"],
    "node": ["nodejs", "node.js"],
    "sql": ["mysql", "postgresql", "postgres", "sqlite", "mssql"],
    "nosql": ["mongodb", "mongo", "dynamodb", "cassandra", "redis"],
    "aws": ["amazon web services", "cloud"],
    "gcp": ["google cloud", "google cloud platform"],
    "azure": ["microsoft azure"],
    "machine learning": ["ml", "deep learning", "dl"],
    "artificial intelligence": ["ai"],
    "ci/cd": ["continuous integration", "continuous deployment", "jenkins", "github actions"],
    "docker": ["containerization", "containers"],
    "kubernetes": ["k8s"],
  }
  
  for (const [key, values] of Object.entries(aliases)) {
    const allTerms = [key, ...values]
    const userMatches = allTerms.some(t => normalizedUser.includes(t) || t.includes(normalizedUser))
    const jobMatches = allTerms.some(t => normalizedJob.includes(t) || t.includes(normalizedJob))
    if (userMatches && jobMatches) return true
  }
  
  return false
}

// Calculate match score between user skills and job requirements
function calculateMatchScore(
  userSkills: string[],
  jobSkills: string[],
  suggestedRoles: string[],
  jobTitle: string
): { score: number; matchedSkills: string[]; missingSkills: string[] } {
  const matchedSkills: string[] = []
  const missingSkills: string[] = []
  
  // Check skill matches
  for (const jobSkill of jobSkills) {
    const isMatched = userSkills.some(userSkill => skillsMatch(userSkill, jobSkill))
    if (isMatched) {
      matchedSkills.push(jobSkill)
    } else {
      missingSkills.push(jobSkill)
    }
  }
  
  // Base score from skill matching
  let skillScore = jobSkills.length > 0 
    ? (matchedSkills.length / jobSkills.length) * 70 // Skills contribute up to 70%
    : 35
  
  // Role relevance bonus (up to 30%)
  let roleBonus = 0
  const normalizedTitle = jobTitle.toLowerCase()
  for (const role of suggestedRoles) {
    const normalizedRole = role.toLowerCase()
    if (normalizedTitle.includes(normalizedRole) || normalizedRole.includes(normalizedTitle.split(" ")[0])) {
      roleBonus = 30
      break
    }
    // Partial match
    const roleWords = normalizedRole.split(" ")
    const titleWords = normalizedTitle.split(" ")
    const commonWords = roleWords.filter(w => titleWords.some(tw => tw.includes(w) || w.includes(tw)))
    if (commonWords.length > 0) {
      roleBonus = Math.max(roleBonus, 15 * (commonWords.length / roleWords.length))
    }
  }
  
  const totalScore = Math.min(100, Math.round(skillScore + roleBonus))
  
  return {
    score: totalScore,
    matchedSkills,
    missingSkills: missingSkills.slice(0, 5), // Limit missing skills shown
  }
}

export async function POST(req: NextRequest) {
  try {
    const { skills, suggestedRoles } = await req.json()

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: "Skills array is required" },
        { status: 400 }
      )
    }

    // Score all jobs
    const scoredJobs: MatchedJob[] = jobsDatabase.map(job => {
      const { score, matchedSkills, missingSkills } = calculateMatchScore(
        skills,
        job.skills,
        suggestedRoles || [],
        job.title
      )
      return {
        ...job,
        matchScore: score,
        matchedSkills,
        missingSkills,
      }
    })

    // Sort by match score and take top results
    const matchedJobs = scoredJobs
      .filter(job => job.matchScore >= 30) // Minimum 30% match
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20) // Return top 20 matches

    return NextResponse.json({
      matchedJobs,
      totalMatches: matchedJobs.length,
      userSkillsCount: skills.length,
    })
  } catch (error) {
    console.error("Job matching error:", error)
    return NextResponse.json(
      { error: "Failed to match jobs. Please try again." },
      { status: 500 }
    )
  }
}
