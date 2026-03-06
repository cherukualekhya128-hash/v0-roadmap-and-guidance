import { generateText, Output } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const resumeAnalysisSchema = z.object({
  skills: z.array(z.string()).describe("List of technical and soft skills extracted from the resume"),
  experience: z.string().describe("Brief summary of work experience"),
  education: z.string().describe("Education background summary"),
  suggestedRoles: z.array(z.string()).describe("Job roles that would be a good fit based on the resume"),
  skillGaps: z.array(z.string()).describe("Skills the candidate should learn to improve their profile"),
})

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json()

    if (!resumeText || resumeText.length < 20) {
      return NextResponse.json(
        { error: "Resume text is too short or empty" },
        { status: 400 }
      )
    }

    const result = await generateText({
      model: "openai/gpt-4o-mini",
      output: Output.object({ schema: resumeAnalysisSchema }),
      prompt: `Analyze the following resume and extract key information. Focus on:
1. Technical skills (programming languages, frameworks, tools)
2. Soft skills (communication, leadership, etc.)
3. Work experience summary
4. Education background
5. Suggest 5-7 job roles that would be a good fit
6. Identify 4-6 skills the candidate should learn to enhance their career prospects

Resume:
${resumeText}

Provide a comprehensive analysis focusing on making the candidate employable in the tech industry.`,
    })

    const analysis = result.object

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Resume analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    )
  }
}
