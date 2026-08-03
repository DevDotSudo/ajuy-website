export function GET() {
  return Response.json({ status: "ok", service: "ajuy-municipality-website", chatbotConfigured: Boolean(process.env.GEMINI_API_KEY) }, { headers: { "Cache-Control": "no-store" } });
}
