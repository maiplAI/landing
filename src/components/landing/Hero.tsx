import { GlobalContextMap } from "./GlobalContextMap";

export function Hero() {
  return (
    <section className="homepage-hero relative w-full overflow-hidden border-b border-border">
      <div className="hero-network pointer-events-none absolute inset-0" aria-hidden="true" inert><GlobalContextMap /></div>
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-16 md:pb-14 md:pt-20">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            private beta · early cohort forming
          </div>

          <h1 className="font-display text-5xl font-medium leading-none md:text-6xl">MAiPL<span className="text-primary">.</span></h1>
          <h2 className="mt-5 max-w-xl font-display text-2xl font-medium leading-tight text-balance md:text-3xl">Turn product chaos<br /><span className="text-primary">into shared clarity.</span></h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Your sources, their connections, and the evidence behind your next product decision. One context layer.</p>

          <p className="mt-8 font-mono text-[10px] text-muted-foreground">Private beta · approved emails can sign in.</p>
        </div>
        <div className="relative z-10 mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5 font-mono text-[10px] text-muted-foreground"><span className="text-primary">Context starts here</span>{['Jira', 'Notion', 'Google Docs', 'GitHub', 'Amplitude', 'PDFs'].map(source => <span key={source}>{source}</span>)}</div>
      </div>
    </section>
  );
}
