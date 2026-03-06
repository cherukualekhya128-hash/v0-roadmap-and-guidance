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
      // Dynamic import for pdf-parse
      const pdfParse = (await import("pdf-parse")).default
      const pdfData = await pdfParse(buffer)
      text = pdfData.text
    } else if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) {
      // Dynamic import for mammoth
      const mammoth = await import("mammoth")
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
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

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error parsing file:", error)
    return NextResponse.json(
      { error: "Failed to parse file. Please try again or paste text directly." },
      { status: 500 }
    )
  }
}
