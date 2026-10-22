const BLOCKS = [
  {
    label: "The cost",
    title: "Your most expensive decisions are made with the least context.",
    body: "PMs, engineers, and leadership all pull from different sources — Jira, docs, chat, memory. By the time a decision is made, half the room is still guessing.",
  },
  {
    label: "The drag",
    title: "Every week, you rebuild the same shared understanding.",
    body: "Roadmap reviews, stand-ups, escalation threads — they repeat the same questions because the reasoning behind past calls never became a reusable asset.",
  },
  {
    label: "The edge",
    title: "The teams that win write their product memory down.",
    body: "maipl turns your scattered product context into a single, cite-able source of truth — so decisions ship faster, with fewer meetings, and with a record everyone trusts.",
  },
];

export function Problem() {
  return (
    <section id="why" className="scroll-mt-16 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground border border-border rounded-full px-2.5 py-1">
            why now
          </span>
          <h2 className="mt-6 font-display text-2xl md:text-4xl font-semibold tracking-tight text-balance">
            Product context is your most valuable asset.{" "}
            <span className="text-primary italic">Most teams lose it.</span>
          </h2>
        </div>

        <div className="mt-16 space-y-12 md:space-y-16">
          {BLOCKS.map((b, i) => (
            <div
              key={b.label}
              className="grid md:grid-cols-12 gap-6 md:gap-10 items-start"
            >
              <div className="md:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  0{i + 1} · {b.label}
                </div>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-balance">
                  {b.title}
                </h3>
                <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                  {b.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
