import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name.toLowerCase()
    let text = ""

    if (fileName.endsWith(".pdf")) {
      try {
        // Dynamic import for pdf-parse
        const pdfParse = (await import("pdf-parse")).default
        const pdfData = await pdfParse(buffer)
        text = pdfData.text
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError)
        // Fallback: try to extract text from PDF buffer directly
        const textContent = buffer.toString("utf-8")
        // Extract readable text patterns from PDF
        const matches = textContent.match(/[\x20-\x7E\n\r\t]+/g)
        if (matches) {
          text = matches.join(" ").replace(/\s+/g, " ").trim()
        }
        if (!text || text.length < 50) {
          return NextResponse.json(
            { error: "Could not extract text from PDF. Please try uploading a DOCX or TXT file, or paste your resume text directly." },
            { status: 400 }
          )
        }
      }
    } else if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) {
      try {
        // Dynamic import for mammoth
        const mammoth = await import("mammoth")
        const result = await mammoth.extractRawText({ buffer })
        text = result.value
      } catch (docError) {
        console.error("DOCX parsing error:", docError)
        return NextResponse.json(
          { error: "Could not parse DOCX file. Please try uploading a different format or paste your resume text directly." },
          { status: 400 }
        )
      }
    } else if (fileName.endsWith(".txt")) {
      text = buffer.toString("utf-8")
    } else {
      return NextResponse.json(
        { error: "Unsupported file format. Please upload PDF, DOC, DOCX, or TXT." },
        { status: 400 }
      )
    }

    // Clean up the text
    text = text
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .trim()

    if (!text || text.length < 20) {
      return NextResponse.json(
        { error: "Could not extract enough text from the file. Please paste your resume text directly." },
        { status: 400 }
      )
    }

    return NextResponse.json({ text, fileName: file.name })
  } catch (error) {
    console.error("Error parsing file:", error)
    return NextResponse.json(
      { error: "Failed to parse file. Please try uploading a different format or paste your resume text directly." },
      { status: 500 }
    )
  }
}
