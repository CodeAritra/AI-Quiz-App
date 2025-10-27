// backend/src/utils/cleanJson.ts
export function cleanJsonText(text: string): string {
  if (!text) return "";

  // Remove markdown fences
  let t = text.replace(/```json/i, "").replace(/```/g, "");

  // Normalize smart quotes and whitespace
  t = t.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

  // Replace CRLF/newlines with spaces (we'll slice brackets later)
  t = t.replace(/\r?\n|\r/g, " ");

  t = t.trim();

  // If there is an array, extract between the first `[` and last `]`
  const start = t.indexOf("[");
  const end = t.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) {
    t = t.slice(start, end + 1);
  }

  return t;
}
