import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon, ShieldIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { emergencyContacts } from "@/data/emergency";

export const metadata: Metadata = { title: "Emergency Contacts", description: "Verified emergency and published municipal contact numbers for Ajuy." };

export default function EmergencyPage() {
  return (
    <><PageHero eyebrow="Emergency contacts" title="Get help quickly" description="For immediate danger, call the national emergency hotline. The chatbot and contact form are not emergency channels."><ShieldIcon className="page-hero-icon" /></PageHero><section className="section"><div className="container emergency-layout"><div className="emergency-primary"><span>Life-threatening emergency</span><strong>911</strong><a className="button button-yellow" href="tel:911"><PhoneIcon /> Call 911</a><p>Give your name, exact location, nearby landmark, type of emergency, number of people affected, and a callback number.</p></div><div className="emergency-cards">{emergencyContacts.slice(1).map((contact) => <article key={contact.name}><div className="verified-label">Published contact</div><h2>{contact.name}</h2><strong>{contact.number}</strong><p>{contact.description}</p><a className="button button-outline" href={contact.href}><PhoneIcon /> Call number</a></article>)}</div></div></section><section className="section section-soft"><div className="container emergency-steps"><h2>When reporting an emergency</h2><ol><li><strong>Stay as calm as possible.</strong><span>Move away from immediate danger only when safe.</span></li><li><strong>State your exact location.</strong><span>Include barangay, sitio or purok, street, and nearest landmark.</span></li><li><strong>Describe what happened.</strong><span>Say whether police, fire, medical, or rescue help is needed.</span></li><li><strong>Follow instructions.</strong><span>Keep the phone available in case responders call back.</span></li></ol></div></section><section className="section"><div className="container warning-card"><h2>Local responder directory needs official verification</h2><p>No unverified MDRRMO, police, fire, hospital, or barangay hotline numbers are published in this starter. Add them only after the Municipality of Ajuy confirms each number and responsible office.</p><Link className="text-link" href="/contact">Use the municipal contact page</Link></div></section></>
  );
}
