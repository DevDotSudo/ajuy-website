"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CloseIcon, MapIcon, SendIcon, SparkIcon } from "@/components/icons";

type ChatLocation = {
  id: string;
  name: string;
  kind: "Barangay" | "Attraction" | "Place";
  query: string;
  detail: string;
  placeId?: string;
  mapsUrl?: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  location?: ChatLocation;
};

type MapStyle = "roadmap" | "satellite";

const starters = ["Where is Nasidman Island?", "Locate Barangay Culasi", "What is Ajuy's population?", "What are the emergency contacts?"];

function embedUrl(
  location: ChatLocation,
  mapStyle: MapStyle,
) {
  const apiKey =
    process.env
      .NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  if (!apiKey) {
    return "";
  }

  const query = location.placeId
    ? `place_id:${location.placeId}`
    : `${location.name}, Ajuy, Iloilo, Philippines`;

  return (
    "https://www.google.com/maps/embed/v1/place" +
    `?key=${encodeURIComponent(apiKey)}` +
    `&q=${encodeURIComponent(query)}` +
    "&zoom=16" +
    `&maptype=${mapStyle}` +
    "&language=en" +
    "&region=PH"
  );
}

function mapsUrl(
  location: ChatLocation,
) {
  if (location.mapsUrl) {
    return location.mapsUrl;
  }

  const base =
    "https://www.google.com/maps/search/?api=1" +
    `&query=${encodeURIComponent(
      location.query,
    )}`;

  if (!location.placeId) {
    return base;
  }

  return (
    base +
    `&query_place_id=${encodeURIComponent(
      location.placeId,
    )}`
  );
}


function ChatLocationCard({
  location,
}: {
  location: ChatLocation;
}) {
  const [mapStyle, setMapStyle] =
    useState<MapStyle>("roadmap");

  const mapSource = embedUrl(
    location,
    mapStyle,
  );

  const googleMapsUrl =
    mapsUrl(location);

  return (
    <div className="chat-location-card">
      <div className="chat-location-head">
        <div>
          <span>{location.kind}</span>
          <strong>
            {location.name}
          </strong>
          <small>
            {location.detail}
          </small>
        </div>

        <div
          className="chat-map-switch"
          role="group"
          aria-label={`Map style for ${location.name}`}
        >
          <button
            type="button"
            className={
              mapStyle === "roadmap"
                ? "active"
                : ""
            }
            onClick={() =>
              setMapStyle("roadmap")
            }
            aria-pressed={
              mapStyle === "roadmap"
            }
          >
            Map
          </button>

          <button
            type="button"
            className={
              mapStyle === "satellite"
                ? "active"
                : ""
            }
            onClick={() =>
              setMapStyle("satellite")
            }
            aria-pressed={
              mapStyle === "satellite"
            }
          >
            Satellite
          </button>
        </div>
      </div>

      {mapSource ? (
        <iframe
          key={`${location.id}-${mapStyle}`}
          title={`Map of ${location.name}`}
          src={mapSource}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="chat-map-unavailable">
          Add your Google Maps Embed API
          key to display this map.
        </div>
      )}

      <div className="chat-location-actions">
        {!location.id.startsWith(
          "gemini-",
        ) && (
          <a
            href={`/map?place=${encodeURIComponent(
              location.id,
            )}`}
          >
            <MapIcon />
            View on Ajuy Map
          </a>
        )}

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Google Maps
        </a>
      </div>

      <a
        className="chat-map-attribution"
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Source:{" "}
        <span translate="no">
          Google Maps
        </span>
      </a>
    </div>
  );
}

type ChatWidgetProps = {
  fullPage?: boolean;
};

export function ChatWidget({ fullPage = false }: ChatWidgetProps) {
  const [open, setOpen] = useState(fullPage);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! Ask me about Ajuy's barangays, population, attractions, culture, government services, offices, emergency contacts, or the location of a place." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = () => {
      setOpen(true);
      window.setTimeout(() => inputRef.current?.focus(), 120);
    };
    window.addEventListener("open-ajuy-chat", show);
    return () => window.removeEventListener("open-ajuy-chat", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  async function ask(question: string) {
    const clean = question.trim();
    if (!clean || loading) return;
    setMessages((current) => [...current, { role: "user", content: clean }]);
    setInput("");
    setLoading(true);
    try {
      const result = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: clean }),
      });
      const data = await result.json() as { answer?: string; location?: ChatLocation };
      setMessages((current) => [...current, { role: "assistant", content: data.answer || "I could not answer that right now.", location: data.location }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "The assistant is temporarily unavailable. Please use the Contact page for verified help." }]);
    } finally {
      setLoading(false);
      window.setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 50);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void ask(input);
  }

  if (!open) return null;

  return (
    <div className="chat-panel chat-panel-popup" role="dialog" aria-modal="false" aria-label="Ajuy AI Assistant">
      <div className="chat-header">
        <div className="chat-avatar"><SparkIcon /></div>
        <div><strong>Ajuy AI Assistant</strong><span><i /> Online municipal guide</span></div>
        <button onClick={() => setOpen(false)} aria-label="Close chatbot"><CloseIcon /></button>
      </div>
      <div className="chat-notice">Public information only. Do not enter private records, passwords, identification numbers, or confidential case details.</div>
      <div className="chat-messages" ref={listRef} aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`chat-message-group ${message.role}`}>
            <div className={`chat-message ${message.role}`}>{message.content}</div>
            {message.role === "assistant" && message.location && <ChatLocationCard location={message.location} />}
          </div>
        ))}
        {loading && <div className="chat-message assistant typing"><span className="typing-dots"><i /><i /><i /></span> Checking Ajuy information</div>}
      </div>
      {messages.length < 3 && <div className="chat-starters">{starters.map((item) => <button key={item} onClick={() => void ask(item)}>{item}</button>)}</div>}
      <form className="chat-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="chat-input-widget">Ask a question about Ajuy</label>
        <input ref={inputRef} id="chat-input-widget" value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask about Ajuy or a location…" />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send question"><SendIcon /></button>
      </form>
      <div className="chat-footer-note">AI answers and map pins may be incomplete. Verify changing details with the municipality.</div>
    </div>
  );
}
