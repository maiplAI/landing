export function Signals() {
  const sources = [
    {
      name: "Jira",
      status: "soon",
      k: "epics, issues, sprints, capacity, support themes — indexed end-to-end",
    },
    {
      name: "Notion",
      status: "soon",
      k: "strategy docs, PRDs, OKRs, research — connector in flight",
    },
    {
      name: "Monday",
      status: "soon",
      k: "boards, items, workload — on the roadmap",
    },

  ];
  return (
    <section id="how" className="border-b border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Signals in</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Your planning graph, read end-to-end.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Epics, child issues, sprint state, labels, components and linked support themes
            — indexed as a typed graph with embeddings. Structured fields and semantic
            retrieval feed every agent.
          </p>

        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
            {sources.map((s, i) => (
              <div key={`${s.name}-${i}`} className="bg-background p-5 hover:bg-secondary transition-colors">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm">{s.name}</div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      s.status === "live"
                        ? "bg-success/15 text-success border border-success/30"
                        : "bg-muted/40 text-muted-foreground border border-border"
                    }`}
                  >
                    {s.status === "live" ? "live" : "soon"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
