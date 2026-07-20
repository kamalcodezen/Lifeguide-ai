export interface AssessmentGenerationInput {
  trackCategory: string;
  difficultyTier: string;
}

export function getAssessmentGenerationPrompt(input: AssessmentGenerationInput): string {
  return `You are an expert technical interviewer and test creator. Generate a multiple-choice diagnostic assessment for a software engineer.
Track: ${input.trackCategory}
Difficulty: ${input.difficultyTier}

Instructions:
1. Create exactly 5 multiple choice questions that test core concepts of this track and difficulty.
2. Each question must have exactly 4 options.
3. Do NOT indicate which option is correct in the output (the user will answer them and we will evaluate later).
4. Output the result in a valid JSON schema conforming to the following structure:
{
  "title": "Title of the Assessment",
  "questions": [
    {
      "id": "q1",
      "questionText": "What is the primary purpose of...",
      "options": ["Option A", "Option B", "Option C", "Option D"]
    }
  ]
}

Ensure the output is clean JSON only. Do not include markdown code block formatting (e.g. \`\`\`json).`;
}

export interface AssessmentEvaluationInput {
  trackCategory: string;
  difficultyTier: string;
  qaPairs: Array<{ questionText: string; selectedOption: string }>;
}

export function getAssessmentEvaluationPrompt(input: AssessmentEvaluationInput): string {
  const qaFormatted = input.qaPairs
    .map((qa, i) => `Q${i + 1}: ${qa.questionText}\nUser's Answer: ${qa.selectedOption}`)
    .join("\n\n");

  return `You are an expert technical evaluator. Evaluate the following answers provided by a student taking a diagnostic test.
Track: ${input.trackCategory}
Difficulty: ${input.difficultyTier}

Questions and User's Answers:
${qaFormatted}

Instructions:
1. Determine if each of the user's answers is correct.
2. Calculate the overall score (0-100).
3. Provide a skills breakdown mapping specific topics tested in the questions to a score (0-100). For example: {"React": 80, "State Management": 60}.
4. Identify key strengths and weaknesses based on their answers.
5. Provide actionable recommendations to improve.
6. Provide a short summary evaluation of their performance.
7. Output the result in a valid JSON schema conforming to the following structure:
{
  "overallScore": 80,
  "skillsBreakdown": { "Topic1": 100, "Topic2": 50 },
  "strengths": ["Strength 1"],
  "weaknesses": ["Weakness 1"],
  "recommendations": ["Recommendation 1"],
  "summaryEvaluation": "You did well but need to focus on..."
}

Ensure the output is clean JSON only. Do not include markdown code block formatting (e.g. \`\`\`json).`;
}
