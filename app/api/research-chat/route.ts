import { streamText, convertToModelMessages, tool } from "ai"
import { z } from "zod"

export const maxDuration = 60

// In-memory store for paper content (in production, use a proper vector DB with FAISS)
const paperStore = new Map<string, { content: string; chunks: string[] }>()

// Simple text chunking for RAG simulation
function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
  const chunks: string[] = []
  let start = 0
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    start = end - overlap
    if (start >= text.length - overlap) break
  }
  
  return chunks
}

// Simple similarity search (in production, use FAISS or similar)
function searchChunks(query: string, chunks: string[], topK: number = 3): string[] {
  const queryTerms = query.toLowerCase().split(/\s+/)
  
  const scored = chunks.map((chunk, index) => {
    const chunkLower = chunk.toLowerCase()
    let score = 0
    
    for (const term of queryTerms) {
      if (chunkLower.includes(term)) {
        score += (chunkLower.match(new RegExp(term, 'g')) || []).length
      }
    }
    
    return { chunk, score, index }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk)
}

export async function POST(req: Request) {
  try {
    const { messages, paperContent, sessionId } = await req.json()

    // Store paper content if provided
    if (paperContent && sessionId) {
      const chunks = chunkText(paperContent)
      paperStore.set(sessionId, { content: paperContent, chunks })
    }

    // Get stored paper data
    const storedPaper = sessionId ? paperStore.get(sessionId) : null
    
    // Build context from the last user message for RAG
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop()
    let relevantContext = ""
    
    if (storedPaper && lastUserMessage) {
      const userQuery = lastUserMessage.parts?.find((p: { type: string }) => p.type === 'text')?.text || ''
      if (userQuery) {
        const relevantChunks = searchChunks(userQuery, storedPaper.chunks)
        relevantContext = relevantChunks.join('\n\n---\n\n')
      }
    }

    const systemPrompt = `You are an advanced Research Paper Assistant powered by AI. You help users understand, analyze, and extract insights from research papers.

${storedPaper ? `PAPER CONTEXT (Retrieved via RAG):
${relevantContext}

FULL PAPER AVAILABLE: Yes - The user has uploaded a research paper. Use the relevant context above to answer their questions accurately.` : 'NO PAPER UPLOADED: The user has not uploaded a paper yet. Encourage them to upload a PDF or paste paper content to get started.'}

Your capabilities include:
1. **Paper Analysis**: Summarize papers, explain methodology, discuss findings
2. **Concept Explanation**: Break down complex concepts in simple terms
3. **Citation Help**: Help format citations and find related work
4. **Critical Analysis**: Identify strengths, weaknesses, and gaps
5. **Knowledge Extraction**: Extract key findings, methods, and contributions
6. **Q&A**: Answer specific questions about the paper content

Guidelines:
- Be precise and cite specific sections when possible
- Use academic language but explain jargon
- Highlight limitations and future research directions
- Connect findings to broader research context
- If unsure, acknowledge limitations and suggest what additional information would help

Format your responses with clear structure using markdown when appropriate.`

    const result = streamText({
      model: "openai/gpt-5-mini",
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      tools: {
        summarizePaper: tool({
          description: "Generate a comprehensive summary of the uploaded research paper",
          inputSchema: z.object({
            summaryType: z.enum(["brief", "detailed", "abstract"]).describe("Type of summary to generate"),
          }),
          execute: async ({ summaryType }) => {
            if (!storedPaper) {
              return { error: "No paper uploaded. Please upload a paper first." }
            }
            return {
              type: summaryType,
              status: "Paper content available for summarization",
              contentLength: storedPaper.content.length,
              chunkCount: storedPaper.chunks.length,
            }
          },
        }),
        extractKeyFindings: tool({
          description: "Extract the main findings and contributions from the paper",
          inputSchema: z.object({
            focus: z.enum(["methodology", "results", "contributions", "all"]).describe("What aspect to focus on"),
          }),
          execute: async ({ focus }) => {
            if (!storedPaper) {
              return { error: "No paper uploaded. Please upload a paper first." }
            }
            return {
              focus,
              status: "Ready to extract key findings",
              paperAvailable: true,
            }
          },
        }),
        findRelatedConcepts: tool({
          description: "Find and explain related concepts mentioned in the paper",
          inputSchema: z.object({
            concept: z.string().describe("The concept to explore"),
          }),
          execute: async ({ concept }) => {
            return {
              concept,
              status: "Searching for related concepts",
              paperAvailable: !!storedPaper,
            }
          },
        }),
        generateCitation: tool({
          description: "Generate a citation for the paper in various formats",
          inputSchema: z.object({
            format: z.enum(["APA", "MLA", "Chicago", "IEEE", "BibTeX"]).describe("Citation format"),
          }),
          execute: async ({ format }) => {
            return {
              format,
              status: "Ready to generate citation",
              note: "Please provide paper details (title, authors, year, journal) for accurate citation",
            }
          },
        }),
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Research chat error:", error)
    return Response.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    )
  }
}
