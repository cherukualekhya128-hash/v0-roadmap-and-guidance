import { generateText } from 'ai'

// Fallback questions when AI generation fails
const fallbackQuestions = {
  technicalQuestions: [
    {
      question: "Can you explain the difference between REST and GraphQL APIs?",
      difficulty: "medium",
      category: "API Design",
      expectedAnswer: "REST uses fixed endpoints with HTTP methods, while GraphQL uses a single endpoint with queries that let clients specify exactly what data they need.",
      tips: "Focus on practical trade-offs and when you'd choose one over the other."
    },
    {
      question: "What is the time complexity of common data structure operations?",
      difficulty: "easy",
      category: "Data Structures",
      expectedAnswer: "Arrays: O(1) access, O(n) search. Hash tables: O(1) average for insert/search. Trees: O(log n) for balanced trees.",
      tips: "Be ready to explain why these complexities exist."
    },
    {
      question: "How would you optimize a slow database query?",
      difficulty: "hard",
      category: "Database",
      expectedAnswer: "Add indexes, analyze query execution plan, optimize joins, use caching, consider denormalization for read-heavy workloads.",
      tips: "Give specific examples from your experience."
    },
    {
      question: "Explain the concept of closures in JavaScript.",
      difficulty: "medium",
      category: "Programming",
      expectedAnswer: "A closure is a function that has access to variables from its outer scope, even after the outer function has returned.",
      tips: "Provide a code example to illustrate your explanation."
    },
    {
      question: "What are the SOLID principles in software design?",
      difficulty: "medium",
      category: "Software Design",
      expectedAnswer: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.",
      tips: "Give real-world examples for each principle."
    }
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a time when you had to deal with a difficult team member.",
      category: "Teamwork",
      starFormat: {
        situation: "Describe the context and the difficult behavior you encountered.",
        task: "Explain your role and what needed to be accomplished.",
        action: "Detail the specific steps you took to address the situation.",
        result: "Share the outcome and what you learned from the experience."
      },
      tips: "Focus on your actions and the positive resolution, not blame."
    },
    {
      question: "Describe a project where you had to learn a new technology quickly.",
      category: "Learning",
      starFormat: {
        situation: "Set the scene - what was the project and technology?",
        task: "What was your specific responsibility?",
        action: "How did you approach learning the new technology?",
        result: "What was the outcome and how quickly did you become proficient?"
      },
      tips: "Highlight your learning strategies and adaptability."
    },
    {
      question: "Tell me about a time you missed a deadline. How did you handle it?",
      category: "Accountability",
      starFormat: {
        situation: "What was the project and what caused the delay?",
        task: "What were the expectations and your responsibilities?",
        action: "How did you communicate and what steps did you take?",
        result: "What was the final outcome and what did you learn?"
      },
      tips: "Show accountability and focus on lessons learned."
    },
    {
      question: "Describe a situation where you had to make a decision with incomplete information.",
      category: "Decision Making",
      starFormat: {
        situation: "What was the context and what information was missing?",
        task: "What decision needed to be made and why was it urgent?",
        action: "How did you gather what information you could and make the decision?",
        result: "What was the outcome and would you do anything differently?"
      },
      tips: "Emphasize your analytical thinking and risk assessment."
    }
  ],
  situationalQuestions: [
    {
      question: "If you discovered a critical bug in production on a Friday afternoon, what would you do?",
      scenario: "You find a bug that's affecting 10% of users but isn't causing data loss.",
      keyPointsToAddress: [
        "Assess the severity and impact",
        "Communicate with stakeholders",
        "Decide on immediate action vs. scheduled fix",
        "Document and prevent similar issues"
      ],
      tips: "Show you can balance urgency with thoughtful decision-making."
    },
    {
      question: "How would you handle a disagreement with a senior developer about technical approach?",
      scenario: "You believe your approach is better but the senior developer insists on their way.",
      keyPointsToAddress: [
        "Listen and understand their perspective",
        "Present your case with data/examples",
        "Find common ground or compromise",
        "Know when to defer to experience"
      ],
      tips: "Demonstrate respect while showing confidence in your abilities."
    },
    {
      question: "What would you do if you realized you couldn't meet a sprint commitment?",
      scenario: "Mid-sprint, you realize the task is more complex than estimated.",
      keyPointsToAddress: [
        "Early communication with the team",
        "Identify what can be descoped",
        "Propose solutions or alternatives",
        "Learn from the estimation error"
      ],
      tips: "Emphasize proactive communication and problem-solving."
    }
  ],
  roleSpecificQuestions: [
    {
      question: "How do you stay updated with the latest technologies and industry trends?",
      context: "Technology evolves rapidly, and employers want to know you're committed to continuous learning.",
      idealResponse: "I follow tech blogs, take online courses, contribute to open source, attend meetups, and build side projects to experiment with new technologies.",
      tips: "Be specific about resources you actually use."
    },
    {
      question: "How do you approach code reviews?",
      context: "Code reviews are essential for code quality and team collaboration.",
      idealResponse: "I focus on readability, maintainability, and potential bugs. I provide constructive feedback and am open to learning from others' code.",
      tips: "Show you value both giving and receiving feedback."
    },
    {
      question: "What's your approach to testing and ensuring code quality?",
      context: "Quality assurance is crucial for reliable software delivery.",
      idealResponse: "I write unit tests alongside code, use integration tests for critical paths, and believe in testing early and often. I aim for meaningful coverage, not just high numbers.",
      tips: "Mention specific testing frameworks and methodologies you use."
    }
  ]
}

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

Generate interview questions in the following JSON format. Return ONLY valid JSON, no other text:

{
  "technicalQuestions": [
    {"question": "...", "difficulty": "easy|medium|hard", "category": "...", "expectedAnswer": "...", "tips": "..."}
  ],
  "behavioralQuestions": [
    {"question": "...", "category": "...", "starFormat": {"situation": "...", "task": "...", "action": "...", "result": "..."}, "tips": "..."}
  ],
  "situationalQuestions": [
    {"question": "...", "scenario": "...", "keyPointsToAddress": ["..."], "tips": "..."}
  ],
  "roleSpecificQuestions": [
    {"question": "...", "context": "...", "idealResponse": "...", "tips": "..."}
  ]
}

Generate:
- 5 technical questions based on resume skills
- 4 behavioral questions with STAR format
- 3 situational questions
- 3 role-specific questions`

    try {
      const { text } = await generateText({
        model: 'openai/gpt-4o-mini',
        prompt,
        maxOutputTokens: 4000,
        temperature: 0.7,
      })

      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const output = JSON.parse(jsonMatch[0])
        
        return Response.json({
          success: true,
          questions: output,
          totalQuestions: 
            (output?.technicalQuestions?.length || 0) + 
            (output?.behavioralQuestions?.length || 0) + 
            (output?.situationalQuestions?.length || 0) + 
            (output?.roleSpecificQuestions?.length || 0),
        })
      }
    } catch (aiError) {
      console.error("AI generation failed, using fallback:", aiError)
    }

    // Return fallback questions if AI fails
    return Response.json({
      success: true,
      questions: fallbackQuestions,
      totalQuestions: 15,
      usedFallback: true
    })

  } catch (error) {
    console.error("Interview questions generation error:", error)
    
    // Still return fallback questions on error
    return Response.json({
      success: true,
      questions: fallbackQuestions,
      totalQuestions: 15,
      usedFallback: true
    })
  }
}
