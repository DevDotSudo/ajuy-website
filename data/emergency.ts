import { municipality } from "./municipality";

export const emergencyContacts = [
  {
    name: "National Emergency Hotline",
    number: "911",
    href: "tel:911",
    description: "For life-threatening emergencies requiring police, fire, medical, or disaster response.",
    verified: true,
  },
  {
    name: "Municipality of Ajuy",
    number: municipality.phones[0],
    href: "tel:+63333920408",
    description: "Published municipal contact for routing non-immediate public concerns and office inquiries.",
    verified: true,
  },
  {
    name: "Municipality of Ajuy alternate line",
    number: municipality.phones[1],
    href: "tel:+63333930342",
    description: "Alternate published municipal contact number.",
    verified: true,
  },
];
