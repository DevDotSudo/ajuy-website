import { findLocation, localAnswer, retrieveKnowledge, type ChatLocation } from "@/lib/knowledge";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 60_000;
const maxRequests = 12;

function response(answer: string, status = 200, location?: ChatLocation) {
  return Response.json(
    { answer, ...(location ? { location } : {}) },
    { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } },
  );
}

function allowed(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "local";
  const key = forwarded.split(",")[0].trim();
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || now > current.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= maxRequests;
}

export async function POST(request: Request) {
  if (!allowed(request)) return response("Too many questions. Please wait a minute and try again.", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return response("Please send a valid question.", 400);
  }

  const question = typeof body === "object" && body && "question" in body ? String((body as { question: unknown }).question).trim() : "";
  if (!question) return response("Please enter a question about Ajuy.", 400);
  if (question.length > 500) return response("Please keep your question under 500 characters.", 400);

  const location = findLocation(question);
  const chunks = retrieveKnowledge(question);
  const fallback = localAnswer(question, chunks);
  if (chunks.length === 0) return response(fallback, 200, location);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return response(fallback, 200, location);

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const context = chunks.map((chunk) => `[${chunk.title}]\n${chunk.text}`).join("\n\n");
  const mapInstruction = location
    ? `A verified map card for ${location.name} will be shown below your answer. Briefly explain the place, but do not provide invented coordinates or claim the map pin has been municipally surveyed.`
    : "Do not claim that a map is being shown.";
  const prompt = `You are the Ajuy Information Assistant for a municipal public-information website.\n\nAnswer only questions related to the Municipality of Ajuy, Iloilo, using only the supplied AJUY KNOWLEDGE CONTEXT. Never invent officials, telephone numbers, fees, schedules, requirements, emergency details, statistics, tourism availability, coordinates, or dates. If the context is insufficient, say so and direct the visitor to contact the Municipality of Ajuy for confirmation. Do not request or repeat private citizen data. Clearly distinguish census counts from estimates. Use simple, direct English. Keep the answer under 180 words. ${mapInstruction}\n\nAJUY KNOWLEDGE CONTEXT:\n${context}\n\nQUESTION:\n${question}`;

  try {
    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.15, maxOutputTokens: 700 } }),
      cache: "no-store",
    });
    if (!result.ok) return response(fallback, 200, location);
    const data = await result.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const answer = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
    return response(answer || fallback, 200, location);
  } catch {
    return response(fallback, 200, location);
  }
}
