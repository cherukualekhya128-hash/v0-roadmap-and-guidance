"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, Upload, Sparkles, FileText, Copy, Check } from "lucide-react"

interface FeatureToolProps {
  slug: string
  title: string
}

export function FeatureTool({ slug, title }: FeatureToolProps) {
  const [input, setInput] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = async () => {
    if (!input.trim() && !file) return
    
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/feature-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: slug,
          input: input.trim(),
          fileName: file?.name,
        }),
      })

      if (!response.ok) throw new Error("Failed to process")
      
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      setResult("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Read file content for text files
      if (selectedFile.type === "text/plain" || selectedFile.name.endsWith(".txt")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setInput(event.target?.result as string || "")
        }
        reader.readAsText(selectedFile)
      }
    }
  }

  // Different input configurations based on feature type
  const getFeatureConfig = () => {
    switch (slug) {
      case "skill-extractor":
        return {
          placeholder: "Paste research paper abstract or content here...",
          buttonText: "Extract Skills",
          showFileUpload: true,
        }
      case "skill-predictor":
        return {
          placeholder: "Enter your current skills (e.g., Python, Machine Learning, SQL)...",
          buttonText: "Predict Future Skills",
          showFileUpload: false,
        }
      case "jd-simplifier":
        return {
          placeholder: "Paste job description here...",
          buttonText: "Simplify JD",
          showFileUpload: false,
        }
      case "idea-generator":
        return {
          placeholder: "Enter job requirements or research topic...",
          buttonText: "Generate Ideas",
          showFileUpload: false,
        }
      case "topic-mapper":
        return {
          placeholder: "Enter your skills and experience...",
          buttonText: "Map Research Topics",
          showFileUpload: false,
        }
      case "dataset-recommender":
        return {
          placeholder: "Describe your research project or topic...",
          buttonText: "Find Datasets",
          showFileUpload: false,
        }
      case "learning-engine":
        return {
          placeholder: "Enter skills you want to learn or your target role...",
          buttonText: "Get Learning Path",
          showFileUpload: false,
        }
      case "career-advisor":
        return {
          placeholder: "Describe your background, skills, and career goals...",
          buttonText: "Get Career Advice",
          showFileUpload: false,
        }
      case "paper-to-code":
        return {
          placeholder: "Paste research paper methodology or algorithm description...",
          buttonText: "Generate Code",
          showFileUpload: true,
        }
      case "interview-sim":
        return {
          placeholder: "Enter the job role you're preparing for (e.g., Data Scientist at Google)...",
          buttonText: "Start Interview",
          showFileUpload: false,
        }
      case "impact-score":
        return {
          placeholder: "Paste paper title, abstract, or key findings...",
          buttonText: "Calculate Impact",
          showFileUpload: true,
        }
      case "competition-analyzer":
        return {
          placeholder: "Paste job listing URL or description...",
          buttonText: "Analyze Competition",
          showFileUpload: false,
        }
      case "patent-detector":
        return {
          placeholder: "Describe your research idea or paste paper abstract...",
          buttonText: "Detect Opportunities",
          showFileUpload: false,
        }
      case "collaboration-finder":
        return {
          placeholder: "Enter your research interests and areas of expertise...",
          buttonText: "Find Collaborators",
          showFileUpload: false,
        }
      case "visualization-generator":
        return {
          placeholder: "Paste research paper content or methodology...",
          buttonText: "Generate Visualization",
          showFileUpload: true,
        }
      case "literature-explorer":
        return {
          placeholder: "Enter paper title or research topic to explore...",
          buttonText: "Explore Literature",
          showFileUpload: false,
        }
      case "knowledge-graph":
        return {
          placeholder: "Enter job role or research topic to map...",
          buttonText: "Build Graph",
          showFileUpload: false,
        }
      case "trend-heatmap":
        return {
          placeholder: "Enter research field or technology area...",
          buttonText: "Show Trends",
          showFileUpload: false,
        }
      case "paper-timeline":
        return {
          placeholder: "Enter research topic (e.g., Deep Learning, Quantum Computing)...",
          buttonText: "Generate Timeline",
          showFileUpload: false,
        }
      default:
        return {
          placeholder: "Enter your query...",
          buttonText: "Process",
          showFileUpload: false,
        }
    }
  }

  const config = getFeatureConfig()

  return (
    <div className="space-y-4">
      {/* Input area */}
      <div className="space-y-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={config.placeholder}
          className="min-h-[120px] resize-none border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
        />
        
        {config.showFileUpload && (
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border/50 bg-secondary/20 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-secondary/40">
              <Upload className="h-4 w-4" />
              {file ? file.name : "Upload file"}
              <input
                type="file"
                accept=".txt,.pdf,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {file && (
              <Badge variant="secondary" className="gap-1">
                <FileText className="h-3 w-3" />
                {file.name}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || (!input.trim() && !file)}
        className="w-full gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            {config.buttonText}
          </>
        )}
      </Button>

      {/* Results */}
      {result && (
        <div className="relative rounded-lg border border-border/50 bg-secondary/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-primary">Result</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 gap-1 px-2 text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm text-foreground">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
