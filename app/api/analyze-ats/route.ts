import { generateText, Output } from "ai"
import { z } from "zod"

export const maxDuration = 60

const atsAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  matchedSkills: z.array(z.object({
    skill: z.string(),
    category: z.enum(["technical", "soft", "tool", "certification"]),
    importance: z.enum(["high", "medium", "low"]),
    context: z.string(),
  })),
  missingSkills: z.array(z.object({
    skill: z.string(),
    category: z.enum(["technical", "soft", "tool", "certification"]),
    importance: z.enum(["high", "medium", "low"]),
    suggestion: z.string(),
  })),
  recommendations: z.array(z.string()),
  summary: z.string(),
})

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json()

    if (!resumeText || !jobDescription) {
      return Response.json(
        { error: "Both resume and job description are required" },
        { status: 400 }
      )
    }

    const result = await generateText({
      model: "openai/gpt-5-mini",
      output: Output.object({ schema: atsAnalysisSchema }),
      prompt: `You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume against the job description and provide a detailed ATS compatibility analysis.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze the resume and provide:
1. An ATS compatibility score (0-100) based on keyword matching, skill alignment, and overall fit
2. A list of skills from the resume that match the job requirements (with category, importance, and context where found)
3. A list of important skills from the job description that are missing from the resume (with suggestions on how to add them)
4. 3-5 specific recommendations to improve the resume's ATS score
5. A brief summary of the analysis

Be thorough and specific in your analysis. Consider:
- Exact keyword matches
- Related skills and synonyms
- Experience level requirements
- Technical skills vs soft skills
- Industry-specific terminology`,
    })

    return Response.json(result.output)
  } catch (error) {
    console.error("ATS analysis error:", error)
    return Response.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    )
  }
}
