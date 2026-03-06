import { generateText, Output } from "ai"
import { z } from "zod"

export const maxDuration = 60

const comprehensiveAnalysisSchema = z.object({
  // Resume Analysis
  resumeAnalysis: z.object({
    overallScore: z.number().min(0).max(100),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
    primaryDomain: z.string(),
    yearsOfExperience: z.number(),
  }),
  
  // Skills extracted
  extractedSkills: z.array(z.object({
    skill: z.string(),
    category: z.enum(["technical", "soft", "tool", "certification", "domain"]),
    proficiencyLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  })),
  
  // ATS Score (if job description provided)
  atsScore: z.object({
    score: z.number().min(0).max(100),
    matchedKeywords: z.array(z.string()),
    missingKeywords: z.array(z.string()),
    suggestions: z.array(z.string()),
  }).nullable(),
  
  // Job Recommendations
  recommendedJobs: z.array(z.object({
    title: z.string(),
    matchScore: z.number().min(0).max(100),
    reason: z.string(),
    salaryRange: z.string(),
    requiredSkills: z.array(z.string()),
    growthPotential: z.enum(["low", "medium", "high"]),
  })),
  
  // Skill Improvements
  skillImprovements: z.array(z.object({
    skill: z.string(),
    currentLevel: z.enum(["none", "beginner", "intermediate", "advanced"]),
    targetLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    importance: z.enum(["critical", "important", "nice-to-have"]),
    learningPath: z.array(z.string()),
    estimatedTime: z.string(),
    resources: z.array(z.object({
      name: z.string(),
      type: z.enum(["course", "book", "tutorial", "certification", "project"]),
      url: z.string().nullable(),
    })),
  })),
  
  // Research Papers
  researchPapers: z.array(z.object({
    title: z.string(),
    authors: z.string(),
    year: z.number(),
    abstract: z.string(),
    relevance: z.string(),
    keyTopics: z.array(z.string()),
    applicationToCareer: z.string(),
  })),
  
  // Career Path
  careerPath: z.object({
    currentRole: z.string(),
    nextSteps: z.array(z.object({
      role: z.string(),
      timeframe: z.string(),
      requiredSkills: z.array(z.string()),
      salaryIncrease: z.string(),
    })),
    longTermGoal: z.string(),
  }),
  
  // Summary
  summary: z.string(),
})

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json()

    if (!resumeText) {
      return Response.json(
        { error: "Resume text is required" },
        { status: 400 }
      )
    }

    const jobContext = jobDescription 
      ? `\n\nTARGET JOB DESCRIPTION:\n${jobDescription}\n\nCalculate ATS score based on this job description.`
      : "\n\nNo specific job description provided. Set atsScore to null and recommend jobs based on skills."

    const result = await generateText({
      model: "openai/gpt-5-mini",
      output: Output.object({ schema: comprehensiveAnalysisSchema }),
      prompt: `You are CareerGPT, an advanced AI career assistant. Perform a comprehensive analysis of the following resume and provide detailed insights.

RESUME:
${resumeText}
${jobContext}

Provide a comprehensive analysis including:

1. RESUME ANALYSIS:
   - Overall quality score (0-100)
   - Key strengths and weaknesses
   - Experience level and primary domain
   
2. SKILLS EXTRACTION:
   - Extract ALL skills mentioned (technical, soft, tools, certifications)
   - Estimate proficiency level based on context
   
3. ATS SCORE (if job description provided):
   - Calculate match score
   - List matched and missing keywords
   - Provide specific improvement suggestions
   
4. JOB RECOMMENDATIONS:
   - Suggest 5 relevant job titles based on skills
   - Include match score, reasons, and salary ranges
   - Consider growth potential
   
5. SKILL IMPROVEMENTS:
   - Identify 5 most important skills to develop
   - Provide learning paths with specific resources
   - Include courses, books, tutorials, certifications
   - Estimate time to achieve proficiency
   
6. RESEARCH PAPERS:
   - Suggest 3-5 relevant academic papers
   - Topics should align with career goals and skill gaps
   - Include papers on emerging technologies in their field
   - Explain how each paper can help their career
   
7. CAREER PATH:
   - Suggest next career steps with timeframes
   - Include required skills for each step
   - Provide long-term career goal suggestion

Be specific, actionable, and data-driven in your analysis. Use real course names, actual research paper topics relevant to their field, and realistic salary expectations.`,
    })

    return Response.json(result.output)
  } catch (error) {
    console.error("Comprehensive analysis error:", error)
    return Response.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    )
  }
}
