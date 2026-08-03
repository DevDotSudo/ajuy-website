"use client";

import { FormEvent, useState } from "react";
import { municipality } from "@/data/municipality";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const topic = String(form.get("topic") || "General inquiry");
    const message = String(form.get("message") || "");
    const email = String(form.get("email") || "");
    const subject = encodeURIComponent(`[Ajuy Website] ${topic}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    window.location.href = `mailto:${municipality.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>Full name<input name="name" required autoComplete="name" /></label><label>Email address<input name="email" type="email" required autoComplete="email" /></label></div>
      <label>Topic<select name="topic"><option>General inquiry</option><option>Municipal service</option><option>Barangay information</option><option>Tourism and culture</option><option>Website correction</option></select></label>
      <label>Message<textarea name="message" rows={7} required maxLength={2000} /></label>
      <label className="checkbox-row"><input type="checkbox" required /><span>I understand this form opens my email app and is not for emergencies.</span></label>
      <button className="button" type="submit">Prepare email</button>
      {sent && <p className="form-success">Your email application should open. Review the message before sending.</p>}
    </form>
  );
}
