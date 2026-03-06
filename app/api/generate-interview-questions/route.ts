import { generateText, Output } from 'ai'
import { z } from 'zod'

const interviewQuestionsSchema = z.object({
  technicalQuestions: z.array(z.object({
    question: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    category: z.string(),
    expectedAnswer: z.string(),
    tips: z.string(),
  })),
  behavioralQuestions: z.array(z.object({
    question: z.string(),
    category: z.string(),
    starFormat: z.object({
      situation: z.string(),
      task: z.string(),
      action: z.string(),
      result: z.string(),
    }),
    tips: z.string(),
  })),
  situationalQuestions: z.array(z.object({
    question: z.string(),
    scenario: z.string(),
    keyPointsToAddress: z.array(z.string()),
    tips: z.string(),
  })),
  roleSpecificQuestions: z.array(z.object({
    question: z.string(),
    context: z.string(),
    idealResponse: z.string(),
    tips: z.string(),
  })),
})

export async function POST(req: Request) {
  try {
    const { resumeText, jobRole, jobDescription, experienceLevel } = await req.json()

    if (!resumeText) {
      return Response.json({ error: "Resume text is required" }, { status: 400 })
    }

    const prompt = `You are an expert interview coach. Based on the following resume and job details, generate personalized interview questions.

RESUME:
${resumeText}

JOB ROLE: ${jobRole || "Software Developer"}
EXPERIENCE LEVEL: ${experienceLevel || "Mid-level"}
${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : ""}

Generate a comprehensive set of interview questions tailored to this candidate's background and the target role. Include:

1. TECHNICAL QUESTIONS (5 questions): Based on the skills mentioned in the resume. Vary difficulty levels.
2. BEHAVIORAL QUESTIONS (4 questions): Using STAR format, based on experiences mentioned in the resume.
3. SITUATIONAL QUESTIONS (3 questions): Hypothetical scenarios relevant to the job role.
4. ROLE-SPECIFIC QUESTIONS (3 questions): Questions specific to the job role and industry.

For each question, provide helpful tips and expected/ideal answers to help the candidate prepare.`

    const { output } = await generateText({
      model: 'openai/gpt-4o-mini',
      prompt,
      output: Output.object({ schema: interviewQuestionsSchema }),
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    return Response.json({
      success: true,
      questions: output,
      totalQuestions: 
        (output?.technicalQuestions?.length || 0) + 
        (output?.behavioralQuestions?.length || 0) + 
        (output?.situationalQuestions?.length || 0) + 
        (output?.roleSpecificQuestions?.length || 0),
    })
  } catch (error) {
    console.error("Interview questions generation error:", error)
    return Response.json(
      { error: "Failed to generate interview questions" },
      { status: 500 }
    )
  }
}
