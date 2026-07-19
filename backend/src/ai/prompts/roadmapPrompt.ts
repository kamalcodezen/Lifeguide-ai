export interface RoadmapPromptInput {
  track: string;
  hoursPerWeek: number;
  skillLevel: string;
  identifiedGaps: string[];
}

/**
 * Constructs the prompt template for the AI Learning Roadmap Generator.
 */
export function getRoadmapPrompt(input: RoadmapPromptInput): string {
  const gapsList = input.identifiedGaps.map((gap) => `- ${gap}`).join("\n");

  return `You are an expert technical curriculum designer. Generate a highly structured, week-by-week learning roadmap for a student on the **${input.track}** track.

Student Profile:
- Current Skill Level: ${input.skillLevel}
- Available Study Hours Per Week: ${input.hoursPerWeek} hours/week
- Identified Skill Gaps to Strengthen:
${gapsList}

Instructions:
1. Tailor the milestones to fit exactly the ${input.hoursPerWeek} weekly hours.
2. Structure the curriculum week-by-week. Each week must have a clear milestone, set of topics to cover, estimated hours required, and specific learning focus.
3. Keep the content gap-targeted, prioritizing the identified skill gaps.
4. Output the roadmap in a valid JSON schema conforming to the following structure:
{
  "title": "Roadmap Title",
  "track": "${input.track}",
  "skillLevel": "${input.skillLevel}",
  "durationWeeks": 4, 
  "weeks": [
    {
      "weekNumber": 1,
      "milestone": "Milestone Title",
      "estimatedHours": 10,
      "topics": ["Topic 1", "Topic 2"],
      "description": "Short explanation of focus area.",
      "suggestedResources": [
        {
          "name": "Resource Name",
          "type": "Article/Video/Documentation",
          "description": "What to study there."
        }
      ]
    }
  ]
}

Ensure the output is clean JSON only. Do not include markdown code block formatting (e.g. \`\`\`json).`;
}
