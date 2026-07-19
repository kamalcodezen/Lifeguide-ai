/**
 * Utility to strip markdown code fences from AI JSON response strings.
 * Gemini sometimes wraps JSON outputs in ```json ... ``` blocks.
 */
export function cleanJsonString(str: string): string {
  let cleaned = str.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*/, '').replace(/```$/, '');
  }
  return cleaned.trim();
}
