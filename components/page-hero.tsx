type PageHeroProps = { eyebrow: string; title: string; description: string; children?: React.ReactNode };

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></div>
        {children && <div className="page-hero-side">{children}</div>}
      </div>
    </section>
  );
}
