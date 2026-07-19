export interface ProjectPromptInput {
  track: string;
  skillLevel: string;
  identifiedGaps: string[];
  techStack: string[];
}

/**
 * Constructs the prompt template for the AI Project Recommendation engine.
 */
export function getProjectPrompt(input: ProjectPromptInput): string {
  const gapsList = input.identifiedGaps.map((g) => `- ${g}`).join("\n");
  const stackList = input.techStack.map((s) => `- ${s}`).join("\n");

  return `You are a world-class senior software architect and project mentor. Analyze the candidate's career track, skill level, and stack, and recommend 2-3 highly specific portfolio projects designed to target their identified skill gaps.

Candidate Profile:
- Career Track: ${input.track}
- Skill Level: ${input.skillLevel}
- Target Tech Stack:
${stackList}
- Identified Skill Gaps to Bridge:
${gapsList}

Instructions:
1. Suggest exactly 2 or 3 distinct projects of varying difficulty matching their skill level (e.g. entry-level users should get entry/mid difficulty, intermediate should get mid/senior, advanced should get senior difficulty).
2. For each project, define the project title, difficulty rating (entry, mid, or senior), a short summary of what it does, the tech stack used, the specific requirements (minimum 4 checklist items), a business case / real-world context, and a set of user stories (minimum 3 checklist items).
3. Ensure that the project suggestions specifically target the identified skill gaps (e.g. if their gap is state management, the project must emphasize complex client-side state).
4. Output the recommendations in a valid JSON schema conforming to the following structure:
{
  "projects": [
    {
      "title": "Project Title",
      "difficultyRating": "entry/mid/senior",
      "summary": "Brief description of the project.",
      "techStack": ["React", "Tailwind CSS", etc.],
      "requirements": [
        "Requirement 1",
        "Requirement 2"
      ],
      "businessCase": "Real-world utility or customer problem solved by this project.",
      "userStories": [
        "As a user, I want to..."
      ]
    }
  ]
}

Ensure the output is clean JSON only. Do not include markdown code block formatting (e.g. \`\`\`json).`;
}
