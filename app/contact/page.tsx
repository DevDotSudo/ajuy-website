import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { MailIcon, MapIcon, PhoneIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { municipality } from "@/data/municipality";

export const metadata: Metadata = { title: "Contact", description: "Contact the Municipality of Ajuy using published phone and email information." };

export default function ContactPage() {
  return (
    <><PageHero eyebrow="Contact" title="Connect with the Municipality of Ajuy" description="Use the published directory details or prepare an email inquiry. For emergencies, call 911." /><section className="section"><div className="container contact-layout"><div className="contact-details"><p className="eyebrow">Municipal directory</p><h2>Contact information</h2><div className="contact-item"><MapIcon /><div><span>Office location</span><strong>{municipality.address}</strong></div></div><div className="contact-item"><MailIcon /><div><span>Email</span><a href={`mailto:${municipality.email}`}>{municipality.email}</a></div></div>{municipality.phones.map((phone) => <div className="contact-item" key={phone}><PhoneIcon /><div><span>Phone</span><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></div></div>)}<div className="contact-warning"><strong>Not an emergency channel</strong><p>For immediate police, fire, medical, or disaster response, call 911.</p></div></div><div className="form-card"><h2>Prepare an inquiry</h2><p>This form opens your email application. It does not store the message on this website.</p><ContactForm /></div></div></section></>
  );
}
