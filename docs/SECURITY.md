# Security

- Never place a Gemini API key in browser code, screenshots, commits, ZIP files, or public documentation.
- Rotate any API key that was pasted into a chat or exposed elsewhere.
- Store the new key in `.env.local` for development and the deployment platform's secret settings for production.
- Apply API-key restrictions and monitor usage in Google AI Studio or Google Cloud.
- Use durable distributed rate limiting for a public production deployment.
- Do not submit private citizen records, identification numbers, health information, legal records, passwords, or financial details to the chatbot.
- Verify emergency contacts and official office information regularly.
