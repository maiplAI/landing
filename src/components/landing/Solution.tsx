const FEATURES = [
  {
    k: "01",
    title: "A typed model, not a transcript.",
    body: "Epics, PRDs, threads and owners parsed into structured entities with relationships — queryable the way a schema is, not searchable the way a wiki is.",
  },
  {
    k: "02",
    title: "Agents with jobs, not vibes.",
    body: "Context, intelligence, decision, governance, communication — each agent has an input contract, an output contract, and something to lose if it's wrong.",
  },
  {
    k: "03",
    title: "Every answer shows its work.",
    body: "No verdict without citations. Trace any ranking back to the ticket, doc or thread it leaned on, and re-run it when the underlying evidence changes.",
  },
];

export function Solution() {
  return (
    <section id="how" className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground border border-border rounded-full px-2.5 py-1">
            the substrate
          </span>
          <h2 className="mt-6 font-display text-2xl md:text-4xl font-semibold tracking-tight text-balance">
            The layer under{" "}
            <span className="text-primary italic">every product call.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg text-balance">
            Not another surface to check. A model your existing tools sit on top
            of, so the reasoning survives the person who wrote it.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
          {FEATURES.map((f) => (
            <div
              key={f.k}
              className="bg-background p-6 md:p-8 hover:bg-card transition-colors"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {f.k}
              </div>
              <h3 className="mt-3 font-display text-lg md:text-xl font-medium tracking-tight text-balance">
                {f.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
