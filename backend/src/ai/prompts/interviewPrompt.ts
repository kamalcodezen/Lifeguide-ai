export interface InterviewPromptInput {
  targetRole: string;
  chatHistory: { role: "user" | "model"; content: string }[];
  currentTurn: number;
  maxTurns: number;
}

/**
 * Constructs the prompt template for the AI Mock Interview Simulator.
 */
export function getInterviewPrompt(input: InterviewPromptInput): string {
  const historyString = input.chatHistory
    .map((msg) => `${msg.role === "user" ? "Candidate" : "Interviewer"}: ${msg.content}`)
    .join("\n");

  const isFinalTurn = input.currentTurn >= input.maxTurns;

  return `You are a Senior Technical Interviewer conducting a mock interview for the role of ${input.targetRole}.
You will conduct a professional, realistic interview consisting of a mix of behavioral and technical questions.
The interview will last exactly ${input.maxTurns} turns. This is turn ${input.currentTurn}.

Chat History:
${historyString}

Instructions:
1. If this is not the final turn (isCompleted: false), you should ask a follow-up question or present a new question relevant to the role. Keep your reply concise (1-3 paragraphs) as in a real conversation.
2. If this is the final turn (isCompleted: true) or the candidate explicitly ends the interview early, you must provide a final wrap-up message AND a detailed evaluation scorecard.
3. The evaluation must include a score out of 100 and specific, actionable feedback on communication, technical accuracy, and problem solving.
4. Output your response as valid JSON ONLY, strictly conforming to the following structure:

{
  "isCompleted": ${isFinalTurn},
  "aiReply": "Your response to the candidate...",
  "evaluation": ${isFinalTurn ? `{
    "score": 85,
    "communicationFeedback": "Detailed feedback on clarity, structure, and articulation.",
    "technicalAccuracyFeedback": "Detailed feedback on the correctness of technical concepts mentioned.",
    "problemSolvingFeedback": "Detailed feedback on their approach to problems.",
    "overallFeedback": "Overall impression and next steps.",
    "strengths": ["Strength 1", "Strength 2"],
    "areasForImprovement": ["Area 1", "Area 2"]
  }` : "null"}
}

Ensure the output is clean JSON only. Do not include markdown code block formatting (e.g. \`\`\`json).`;
}
