"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MapIcon, MenuIcon, PhoneIcon, SparkIcon } from "@/components/icons";

const primaryLinks = [
  ["/", "Home"],
  ["/about", "Ajuy Profile"],
  ["/barangays", "Barangays"],
  ["/government", "Government"],
  ["/population", "Population"],
  ["/map", "Map"],
] as const;

const exploreLinks = [
  ["/attractions", "Attractions"],
  ["/culture", "Culture & Festivals"],
  ["/gallery", "Gallery"],
] as const;

const mobileLinks = [...primaryLinks, ...exploreLinks, ["/emergency", "Emergency"], ["/contact", "Contact"]] as const;

function openChat() {
  window.dispatchEvent(new CustomEvent("open-ajuy-chat"));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const exploreActive = exploreLinks.some(([href]) => pathname === href);

  return (
    <header className="site-header">
      <div className="government-bar">
        <div className="container government-bar-inner">
          <div><span className="status-dot" />Official information portal of the Municipality of Ajuy</div>
          <div className="government-shortcuts"><Link href="/emergency"><PhoneIcon /> Emergency help</Link><Link href="/contact">Contact municipal offices</Link></div>
        </div>
      </div>
      <div className="container nav-shell">
        <Link href="/" className="brand" aria-label="Municipality of Ajuy home">
          <span className="brand-seal"><Image src="/images/ajuy-seal.png" alt="Seal of the Municipality of Ajuy" width={58} height={58} priority /></span>
          <span><strong>Municipality of Ajuy</strong><small>Banwa sang Ajuy · Iloilo</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {primaryLinks.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}
          <div className={`nav-dropdown ${exploreActive ? "active" : ""}`}>
            <button type="button">Explore <span>⌄</span></button>
            <div className="nav-dropdown-menu">{exploreLinks.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div>
          </div>
        </nav>
        <div className="header-actions">
          <Link className="header-map-button" href="/map" aria-label="Open Ajuy map"><MapIcon /></Link>
          <button className="button button-small header-ai-button" type="button" onClick={openChat}><SparkIcon /> Ask Ajuy AI</button>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <CloseIcon /> : <MenuIcon />}</button>
        </div>
      </div>
      <div className={`mobile-nav ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav className="container mobile-nav-grid" aria-label="Mobile navigation">
          {mobileLinks.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}
          <button className="button button-yellow" type="button" onClick={() => { setOpen(false); openChat(); }}><SparkIcon /> Ask Ajuy AI</button>
        </nav>
      </div>
    </header>
  );
}
