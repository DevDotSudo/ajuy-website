import { attractions } from "@/data/attractions";
import { barangays } from "@/data/barangays";
import { cultureHighlights } from "@/data/culture";
import { emergencyContacts } from "@/data/emergency";
import { municipality } from "@/data/municipality";
import { populationHistory } from "@/data/population";
import { services } from "@/data/services";

export type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  keywords: string[];
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const common = new Set([
  "the", "a", "an", "is", "are", "of", "in", "on", "to", "for", "and", "or",
  "what", "where", "who", "how", "can", "i", "me", "please", "about", "tell",
]);


export type ChatLocation = {
  id: string;
  name: string;
  kind:
    | "Barangay"
    | "Attraction"
    | "Place";
  query: string;
  detail: string;
  placeId?: string;
  mapsUrl?: string;
};

const locationIntent = /\b(where|location|located|locate|map|direction|directions|route|how to get|how do i get|show me)\b/i;

const normalizeLocation = (value: string) =>
  value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

export function findLocation(question: string): ChatLocation | undefined {
  if (!locationIntent.test(question)) return undefined;

  const clean = normalizeLocation(question);
  const candidates: Array<{ aliases: string[]; location: ChatLocation }> = [
    ...attractions.map((item) => ({
      aliases: [item.name, item.shortName, item.mapQuery.split(",")[0]].map(normalizeLocation),
      location: {
        id: item.slug,
        name: item.name,
        kind: "Attraction" as const,
        query: item.mapQuery,
        detail: `${item.area} · ${item.category}`,
      },
    })),
    ...barangays.map((item) => ({
      aliases: [`barangay ${item.name}`, item.name].map(normalizeLocation),
      location: {
        id: `barangay-${item.psgc}`,
        name: `Barangay ${item.name}`,
        kind: "Barangay" as const,
        query: `${item.name}, Ajuy, Iloilo, Philippines`,
        detail: `${item.classification} barangay · ${item.population.toLocaleString()} people in 2024`,
      },
    })),
  ];

  const matches = candidates
    .flatMap((candidate) => candidate.aliases.map((alias) => ({ alias, location: candidate.location })))
    .filter((candidate) => clean.includes(candidate.alias))
    .sort((a, b) => b.alias.length - a.alias.length);

  return matches[0]?.location;
}

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "municipality-profile",
    title: "Ajuy municipal profile",
    text: `${municipality.name}, also called ${municipality.localName}, is in ${municipality.province}, ${municipality.region}. It is a ${municipality.classification} in the ${municipality.district}. Its PSGC code is ${municipality.psgc}. The 2024 POPCEN population is ${municipality.population2024.toLocaleString()} across ${municipality.barangayCount} barangays.`,
    keywords: ["ajuy", "profile", "municipality", "population", "psgc", "iloilo", "barangays"],
  },
  {
    id: "history-boundary",
    title: "Ajuy history and historical record",
    text: "The verified website record currently traces Ajuy through official population observations beginning in 1903 and its present profile as a coastal municipality of Iloilo. A detailed founding history, name origin, and complete municipal timeline have not yet been approved by the Municipality of Ajuy, so the assistant must not invent them. Contact the municipality for an official local history.",
    keywords: ["history", "historical", "founded", "founding", "origin", "name", "past", "timeline"],
  },
  {
    id: "local-government",
    title: "Local government",
    text: `The published provincial directory lists Mayor ${municipality.mayor} and Vice Mayor ${municipality.viceMayor}. The published municipal email is ${municipality.email}. The published phone numbers are ${municipality.phones.join(" and ")}. Confirm time-sensitive details directly with the municipality.`,
    keywords: ["mayor", "vice", "government", "official", "email", "phone", "contact", "office"],
  },
  ...barangays.map((item) => ({
    id: `barangay-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
    title: `Barangay ${item.name}`,
    text: `${item.name} is a ${item.classification.toLowerCase()} barangay of Ajuy. Its 2024 POPCEN population is ${item.population.toLocaleString()}. Its 10-digit PSGC code is ${item.psgc}.`,
    keywords: ["barangay", item.name.toLowerCase(), "population", "psgc", item.classification.toLowerCase()],
  })),
  ...populationHistory.map((item) => ({
    id: `population-${item.year}`,
    title: `Ajuy population in ${item.year}`,
    text: `Ajuy recorded ${item.population.toLocaleString()} people in the ${item.year} ${item.type}. This is a census or POPCEN observation, not an estimate for every year between censuses.`,
    keywords: ["population", "census", "popcen", String(item.year), "people", "residents"],
  })),
  ...attractions.map((item) => ({
    id: `attraction-${item.slug}`,
    title: item.name,
    text: `${item.name} is an Ajuy ${item.category.toLowerCase()} place or experience in ${item.area}. ${item.description} Highlights include ${item.highlights.join(", ")}. ${item.notice}`,
    keywords: ["attraction", "tourist", "tourism", "visit", item.category.toLowerCase(), ...normalize(item.name)],
  })),
  ...cultureHighlights.map((item, index) => ({
    id: `culture-${index + 1}`,
    title: item.title,
    text: `${item.title}: ${item.text}`,
    keywords: ["culture", "festival", "tradition", "community", ...normalize(item.title)],
  })),
  ...services.map((item, index) => ({
    id: `service-${index + 1}`,
    title: item.title,
    text: `${item.title}: ${item.description} Contact the Municipality of Ajuy to confirm current requirements, fees, and processing times.`,
    keywords: ["service", "municipal", "office", "requirement", ...normalize(item.title)],
  })),
  ...emergencyContacts.map((item, index) => ({
    id: `emergency-${index + 1}`,
    title: item.name,
    text: `${item.name}: ${item.number}. ${item.description}`,
    keywords: ["emergency", "hotline", "help", "police", "fire", "medical", ...normalize(item.name)],
  })),
];

export function retrieveKnowledge(question: string, limit = 6) {
  const words = normalize(question).filter((word) => !common.has(word));
  const ajuyRelated = words.some((word) =>
    ["ajuy", "barangay", "mayor", "municipal", "population", "census", "tourist", "festival", "emergency", "office", "service", "culture", "iloilo", "map", "location", "island", "attraction"].includes(word),
  ) || knowledgeChunks.some((chunk) => chunk.keywords.some((keyword) => question.toLowerCase().includes(keyword)));

  if (!ajuyRelated) return [];

  return knowledgeChunks
    .map((chunk) => {
      const haystack = `${chunk.title} ${chunk.text} ${chunk.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      for (const word of words) {
        if (haystack.includes(word)) score += word.length > 5 ? 3 : 2;
      }
      if (haystack.includes(question.toLowerCase().trim())) score += 8;
      return { ...chunk, score };
    })
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function localAnswer(question: string, chunks: ReturnType<typeof retrieveKnowledge>) {
  if (chunks.length === 0) {
    return "I can only answer questions about Ajuy, Iloilo. Ask about its barangays, population, government, services, culture, attractions, or emergency contacts.";
  }
  const direct = chunks.slice(0, 3).map((chunk) => chunk.text).join("\n\n");
  return `${direct}\n\nPlease confirm changing details such as fees, schedules, officials, and emergency information through the Municipality of Ajuy.`;
}
