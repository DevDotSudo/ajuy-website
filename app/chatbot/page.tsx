import { ChatWidget } from "@/components/chat-widget";
import { PageHero } from "@/components/page-hero";

export default function ChatbotPage() {
  return (
    <>
      <PageHero
        eyebrow="Ajuy AI Chatbot"
        title="Ask about the municipality"
        description="Use simple questions about Ajuy history, barangays, population, attractions, culture, government, services, and emergency contacts."
      />

      <section className="section chat-page-section">
        <div className="container chat-page-grid">
          <ChatWidget fullPage />

          <aside className="chat-guide">
            <h2>What you can ask</h2>

            <ul>
              <li>What is Ajuy&apos;s 2024 population?</li>
              <li>How many people live in Culasi?</li>
              <li>Who are the published mayor and vice mayor?</li>
              <li>Which attractions are listed?</li>
              <li>What municipal service should I contact?</li>
              <li>What is the emergency hotline?</li>
            </ul>

            <div className="chat-boundary">
              <strong>Important</strong>

              <p>
                The assistant is not an official approval system. Do not send
                private citizen data. Confirm transactions, requirements, fees,
                schedules, and changing contacts with the municipality.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}