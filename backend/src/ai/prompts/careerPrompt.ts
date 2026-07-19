export interface CareerPromptInput {
  skills: string[];
  interests: string[];
  experienceYears: number;
  education: string;
}

/**
 * Constructs the prompt template for the AI Career Recommendation engine.
 */
export function getCareerPrompt(input: CareerPromptInput): string {
  const skillsList = input.skills.map((s) => `- ${s}`).join("\n");
  const interestsList = input.interests.map((i) => `- ${i}`).join("\n");

  return `You are an elite career counselor and industry talent partner. Analyze the candidate's profile below and provide tailored, data-backed career recommendations.

Candidate Profile:
- Skills:
${skillsList}
- Interests:
${interestsList}
- Years of Experience: ${input.experienceYears}
- Education Background: ${input.education}

Instructions:
1. Identify 2-3 specific job roles that fit this profile.
2. For each recommended role, provide a match percentage score, reasons for the recommendation, key skills they already have, and critical upskilling gaps they must bridge to land the role.
3. Keep the output highly specific, avoiding generic advice.
4. Output the recommendations in a valid JSON schema conforming to the following structure:
{
  "recommendations": [
    {
      "role": "Software Engineer/Product Manager etc.",
      "matchScore": 85,
      "summary": "High level reason why they fit.",
      "reasons": [
        "Reason 1 detailed",
        "Reason 2 detailed"
      ],
      "existingStrengths": [
        "Matched Skill A",
        "Matched Skill B"
      ],
      "requiredUpskilling": [
        "Gap C to learn",
        "Skill D to acquire"
      ]
    }
  ]
}

Ensure the output is clean JSON only. Do not include markdown code block formatting (e.g. \`\`\`json).`;
}
