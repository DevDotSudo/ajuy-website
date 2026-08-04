import {
  retrieveKnowledge,
  localAnswer,
  findLocation,
  type ChatLocation,
} from "@/lib/knowledge";

export const runtime = "nodejs";

const attempts = new Map<
  string,
  { count: number; resetAt: number }
>();

const windowMs = 60_000;
const maxRequests = 12;

function response(
  answer: string,
  status = 200,
  location?: ChatLocation,
) {
  return Response.json(
    {
      answer,
      ...(location ? { location } : {}),
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

function allowed(request: Request) {
  const forwarded =
    request.headers.get("x-forwarded-for") || "local";

  const key = forwarded.split(",")[0].trim();
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || now > current.resetAt) {
    attempts.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return true;
  }

  current.count += 1;

  return current.count <= maxRequests;
}

const greetings = [
  /\b(hi|hello|hey|good morning|good afternoon|good evening|greetings)\b/i,
  /\b(kamusta|kumusta|maayong|magandang)\b/i,
];

const gratitude = [
  /\b(thank you|thanks|salamat|appreciate)\b/i,
];

const farewell = [
  /\b(bye|goodbye|see you|paalam)\b/i,
];

function isGreeting(text: string): boolean {
  const lower = text.toLowerCase().trim();
  
  // Check if it's just a greeting without substantive questions
  const hasGreeting = greetings.some(pattern => pattern.test(lower));
  const hasGratitude = gratitude.some(pattern => pattern.test(lower));
  const hasFarewell = farewell.some(pattern => pattern.test(lower));
  
  // If it's short and matches greeting patterns
  if ((hasGreeting || hasGratitude || hasFarewell) && text.length < 50) {
    // Check if there's an actual question
    const hasQuestion = /\b(what|where|when|who|why|how|can|is|are|tell|show)\b/i.test(lower);
    return !hasQuestion;
  }
  
  return false;
}

export async function POST(request: Request) {
  if (!allowed(request)) {
    return response(
      "Too many questions. Please wait a minute and try again.",
      429,
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return response(
      "Please send a valid message.",
      400,
    );
  }

  const question =
    typeof body === "object" &&
    body &&
    "question" in body
      ? String(
          (body as { question: unknown }).question,
        ).trim()
      : "";

  if (!question) {
    return response(
      "Please enter a message.",
      400,
    );
  }

  if (question.length > 500) {
    return response(
      "Please keep your message under 500 characters.",
      400,
    );
  }

  try {
    // Handle greetings
    if (isGreeting(question)) {
      const greetingResponses = [
        "Hello! I'm the Ajuy Information Assistant. I can help you learn about Ajuy's barangays, attractions, population, culture, government, services, and locations. What would you like to know?",
        "Hi there! Welcome to the Ajuy Municipality website. Feel free to ask me about our barangays, tourist attractions, population data, local culture, government offices, or services.",
        "Good day! I'm here to help you with information about Ajuy, Iloilo. You can ask about barangays, attractions, culture, government services, emergency contacts, and more.",
      ];
      
      return response(
        greetingResponses[Math.floor(Math.random() * greetingResponses.length)]
      );
    }

    // Check for location queries first
    const location = findLocation(question);
    
    if (location) {
      const chunks = retrieveKnowledge(question, 3);
      const info = chunks.length > 0 
        ? chunks.map(c => c.text).join(" ")
        : `${location.name} is located in Ajuy, Iloilo.`;
      
      return response(
        `${info}\n\nYou can view ${location.name} on Google Maps for exact directions and location details.`,
        200,
        location
      );
    }

    // Retrieve knowledge for general questions
    const chunks = retrieveKnowledge(question);
    
    if (chunks.length === 0) {
      return response(
        "I can only answer questions about the Municipality of Ajuy, Iloilo. You may ask about Ajuy's barangays, population, attractions, culture, government, offices, services, contacts, history, or locations.",
      );
    }

    // Generate answer from local knowledge
    const answer = localAnswer(question, chunks);
    
    return response(answer);
  } catch (error) {
    console.error(
      "Ajuy chatbot error:",
      error,
    );

    return response(
      "I encountered an error processing your question. Please try again.",
      500,
    );
  }
}