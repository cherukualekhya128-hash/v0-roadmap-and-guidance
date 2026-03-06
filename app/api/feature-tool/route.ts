import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { feature, input, fileName } = await req.json()

    if (!input?.trim()) {
      return Response.json({ error: "Input is required" }, { status: 400 })
    }

    // Get feature-specific prompt
    const systemPrompt = getSystemPrompt(feature)
    const userPrompt = getUserPrompt(feature, input, fileName)

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: userPrompt,
    })

    return Response.json({ result: text })
  } catch (error) {
    console.error("Feature tool error:", error)
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}

function getSystemPrompt(feature: string): string {
  const prompts: Record<string, string> = {
    "skill-extractor": `You are an expert at analyzing research papers and extracting technical skills. 
    Extract and categorize all technical skills, tools, programming languages, frameworks, methodologies, and technologies mentioned.
    Format the output clearly with categories like:
    - Programming Languages
    - Frameworks & Libraries
    - Tools & Platforms
    - Methodologies
    - Domain Knowledge
    Also suggest related industry skills that would complement these research skills.`,

    "skill-predictor": `You are a career futurist and tech industry analyst.
    Based on current tech trends, job market data, and emerging technologies, predict which skills will be most valuable in the next 5-10 years.
    Consider AI/ML advancements, industry shifts, and technological disruptions.
    Provide actionable recommendations for skill development priorities.`,

    "jd-simplifier": `You are an expert at translating corporate job descriptions into clear, actionable requirements.
    Simplify complex job descriptions by:
    - Identifying must-have vs nice-to-have skills
    - Translating corporate jargon into plain language
    - Highlighting the actual day-to-day responsibilities
    - Noting any red flags or unrealistic expectations
    - Suggesting how to address each requirement`,

    "idea-generator": `You are a creative project advisor who generates innovative project ideas.
    Based on the input, generate 5-7 diverse project ideas that could:
    - Demonstrate relevant skills to employers
    - Contribute to portfolio development
    - Be completed in 2-4 weeks
    - Show both technical depth and practical application
    Include brief descriptions, tech stack suggestions, and learning outcomes for each idea.`,

    "topic-mapper": `You are a research advisor who maps skills to research opportunities.
    Analyze the given skills and experience to suggest:
    - Relevant research areas and topics
    - Potential research questions
    - How existing skills can be applied to research
    - Skill gaps that need to be filled
    - Suggested reading and starting points`,

    "dataset-recommender": `You are a data science expert who knows datasets across domains.
    Based on the research topic, recommend:
    - Specific datasets from Kaggle, UCI, government sources, etc.
    - Dataset descriptions and sizes
    - Direct links or where to find them
    - Preprocessing considerations
    - Alternative datasets if primary ones are unavailable`,

    "learning-engine": `You are an expert learning advisor who creates personalized learning paths.
    Create a structured learning path including:
    - Recommended online courses (Coursera, Udemy, edX, etc.)
    - Free resources and tutorials
    - Books and documentation
    - Practice projects
    - Certifications to pursue
    - Timeline estimates for each milestone`,

    "career-advisor": `You are a senior career counselor with expertise in tech and research careers.
    Provide comprehensive career guidance including:
    - Suitable career paths based on background
    - Research opportunities aligned with interests
    - Industry roles that match the skill set
    - Short-term and long-term career goals
    - Networking and visibility strategies
    - Work-life balance considerations`,

    "paper-to-code": `You are an expert programmer who can implement research paper methodologies.
    Generate clean, well-documented Python code that implements the described methodology.
    Include:
    - Necessary imports
    - Function definitions with docstrings
    - Example usage
    - Comments explaining key concepts
    - Notes on potential improvements or variations`,

    "interview-sim": `You are an expert technical interviewer at a top tech company.
    Generate 5 realistic interview questions for the specified role, including:
    - 2 technical/coding questions
    - 1 system design question
    - 1 behavioral question
    - 1 role-specific question
    For each question, provide:
    - The question
    - What the interviewer is looking for
    - A sample strong answer framework
    - Common mistakes to avoid`,

    "impact-score": `You are a research impact analyst who evaluates paper potential.
    Analyze the paper and provide:
    - Estimated impact score (1-100) with justification
    - Novelty assessment
    - Industry relevance score
    - Citation potential
    - Strengths and weaknesses
    - Suggestions for increasing impact
    - Potential application areas`,

    "competition-analyzer": `You are a job market analyst who assesses job competition.
    Analyze the job listing and provide:
    - Estimated applicant pool size
    - Competition level (Low/Medium/High/Very High)
    - Required vs. preferred qualifications breakdown
    - Tips to stand out
    - Probability of getting an interview
    - Similar roles that might be less competitive`,

    "patent-detector": `You are a patent and innovation expert.
    Analyze the research idea for commercial potential:
    - Patentability assessment
    - Similar existing patents
    - Market opportunity analysis
    - Startup potential
    - Licensing possibilities
    - Steps to protect and commercialize the idea`,

    "collaboration-finder": `You are a research networking expert.
    Based on the research interests, suggest:
    - Types of researchers to collaborate with
    - Relevant conferences and workshops
    - Online communities and forums
    - How to approach potential collaborators
    - Collaboration best practices
    - Co-authorship considerations`,

    "visualization-generator": `You are an expert at creating visual representations of research concepts.
    Describe how to visualize the research methodology as:
    - A flowchart (describe nodes and connections)
    - An architecture diagram (describe components)
    - Key equations or formulas (if applicable)
    - Data flow representation
    Provide detailed descriptions that could be used to create diagrams.`,

    "literature-explorer": `You are a research librarian and literature review expert.
    For the given topic, provide:
    - Key seminal papers to read
    - Recent influential papers (2020-2024)
    - Main research themes and branches
    - Key researchers in the field
    - Suggested search terms for deeper exploration
    - Research gaps and opportunities`,

    "knowledge-graph": `You are an expert at mapping knowledge domains.
    Create a textual knowledge graph showing:
    - Core concepts and their relationships
    - Skills required for this domain
    - Related job roles
    - Technologies involved
    - Learning progression paths
    Format as a hierarchical structure with connections.`,

    "trend-heatmap": `You are a tech trend analyst.
    Analyze the field and provide:
    - Current hot topics (High Activity)
    - Emerging areas (Growing)
    - Mature/Stable areas
    - Declining interest areas
    - Predicted trends for next 2-3 years
    - Investment and job market correlation`,

    "paper-timeline": `You are a research historian.
    Create a timeline of major developments in the topic:
    - Key milestones and breakthroughs
    - Influential papers and their contributions
    - Paradigm shifts
    - Current state of the art
    - Predicted future directions
    Format chronologically with years and brief descriptions.`,
  }

  return prompts[feature] || `You are a helpful research assistant. Analyze the input and provide useful insights and recommendations.`
}

function getUserPrompt(feature: string, input: string, fileName?: string): string {
  const fileContext = fileName ? `\n\nFile uploaded: ${fileName}` : ""
  
  const prefixes: Record<string, string> = {
    "skill-extractor": "Analyze this research paper content and extract all technical skills:",
    "skill-predictor": "Based on these current skills, predict future valuable skills:",
    "jd-simplifier": "Simplify this job description:",
    "idea-generator": "Generate project ideas based on:",
    "topic-mapper": "Map research topics for someone with these skills:",
    "dataset-recommender": "Recommend datasets for this research project:",
    "learning-engine": "Create a learning path for:",
    "career-advisor": "Provide career guidance for:",
    "paper-to-code": "Generate implementation code for this methodology:",
    "interview-sim": "Generate interview questions for:",
    "impact-score": "Analyze the impact potential of this research:",
    "competition-analyzer": "Analyze job competition for:",
    "patent-detector": "Assess patent potential for:",
    "collaboration-finder": "Find collaboration opportunities for:",
    "visualization-generator": "Describe visualizations for this research:",
    "literature-explorer": "Explore literature for:",
    "knowledge-graph": "Build a knowledge graph for:",
    "trend-heatmap": "Analyze trends in:",
    "paper-timeline": "Create a research timeline for:",
  }

  const prefix = prefixes[feature] || "Analyze the following:"
  
  return `${prefix}${fileContext}\n\n${input}`
}
