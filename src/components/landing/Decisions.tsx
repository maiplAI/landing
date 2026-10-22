export function Decisions() {
  const verdicts = [
    {
      tone: "ok",
      label: "Build · swap in",
      idea: "AI onboarding tour",
      summary: "Higher strategic fit than EPIC-412. Swap recommended.",
      badge: "rank 1 of 7",
    },
    {
      tone: "warn",
      label: "Defer · queue",
      idea: "Dark mode for dashboard",
      summary: "No strategic anchor this quarter. Holds rank 5 — revisit Q4.",
      badge: "rank 5 of 7",
    },
    {
      tone: "bad",
      label: "Kill · no fit",
      idea: "Public API marketplace",
      summary: "Conflicts with stated Q3 focus on activation. No grounding evidence.",
      badge: "rank 7 of 7",
    },
  ];

  const tones: Record<string, string> = {
    ok: "border-success/30 bg-success/5",
    warn: "border-warning/30 bg-warning/5",
    bad: "border-danger/30 bg-danger/5",
  };
  const dots: Record<string, string> = {
    ok: "bg-success",
    warn: "bg-warning",
    bad: "bg-danger",
  };

  return (
    <section id="decisions" className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Verdicts out</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Three verdicts. Always comparative.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {verdicts.map((v) => (
            <div key={v.idea} className={`rounded-xl border ${tones[v.tone]} p-6 backdrop-blur-sm`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dots[v.tone]} animate-pulse-dot`} />
                  <span className="font-mono text-sm uppercase tracking-wider">{v.label}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{v.badge}</span>
              </div>
              <div className="mt-6 font-mono text-xs text-muted-foreground">idea · {v.idea}</div>
              <p className="mt-2 text-sm leading-relaxed">{v.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
