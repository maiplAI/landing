const AGENTS = [
  {
    id: "01",
    key: "context",
    name: "Context Agent",
    role: "ingest · unify",
    tag: "the graph builder",
    summary:
      "Pulls epics, PRDs, OKRs, conversations and analytics into one typed planning graph. Normalizes IDs, owners, dates, status.",
    sources: ["jira", "notion", "slack", "productboard", "amplitude"],
    emits: "context.graph.v1",
    color: "primary",
  },
  {
    id: "02",
    key: "intelligence",
    name: "Intelligence Agent",
    role: "enrich · understand",
    tag: "the signal reader",
    summary:
      "Reads customers, eng constraints and business goals on top of the graph. Extracts themes, risks, dependencies and confidence.",
    sources: ["context.graph", "embeddings", "LLM"],
    emits: "signals.enriched.v1",
    color: "accent",
  },
  {
    id: "03",
    key: "decision",
    name: "Decision Agent",
    role: "prioritize · simulate",
    tag: "the trade-off engine",
    summary:
      "Scores ideas against the live roadmap. Produces comparative verdicts — build / test / kill / swap — with cited rationale.",
    sources: ["signals.enriched", "roadmap", "capacity"],
    emits: "verdict.comparative.v1",
    color: "primary",
  },
  {
    id: "04",
    key: "governance",
    name: "Governance Agent",
    role: "memory · audit",
    tag: "the org brain",
    summary:
      "Documents every decision, tracks outcomes vs. predictions, monitors roadmap health and keeps organizational memory queryable.",
    sources: ["verdicts", "outcomes", "history"],
    emits: "decision.record.v1",
    color: "accent",
  },
  {
    id: "05",
    key: "communication",
    name: "Communication Agent",
    role: "deliver · answer",
    tag: "the messenger",
    summary:
      "Pushes exec summaries, Slack digests and stakeholder reports. Answers conversational queries against the graph and history.",
    sources: ["decision.record", "graph", "user.query"],
    emits: "digest · reply · comment",
    color: "primary",
  },
];

export function Agents() {
  return (
    <section id="agents" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 h-7 px-2.5 rounded-full border border-border bg-card/60 font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
            agent topology · v1
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Five agents.
            <br />
            <span className="text-muted-foreground">One decision loop.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Not one monolithic LLM. A typed pipeline of specialists — each with its own input
            contract, output schema, and place in the loop.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {AGENTS.map((a, i) => (
            <AgentCard key={a.key} agent={a} last={i === AGENTS.length - 1} />
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card/40 p-5 font-mono text-xs text-muted-foreground overflow-x-auto">
          <span className="text-foreground">pipeline</span>
          {" "}context
          <span className="text-primary"> → </span>intelligence
          <span className="text-primary"> → </span>decision
          <span className="text-primary"> → </span>governance
          <span className="text-primary"> → </span>communication
          <span className="text-foreground/50"> · feedback edges: governance → intelligence, communication → context</span>
        </div>
      </div>
    </section>
  );
}

function AgentCard({ agent, last }: { agent: (typeof AGENTS)[number]; last: boolean }) {
  const accent =
    agent.color === "accent" ? "text-accent border-accent/30" : "text-primary border-primary/30";
  return (
    <div className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-wider ${accent.split(" ")[0]}`}>
            agent.{agent.id} · {agent.role}
          </div>
          <div className="mt-1 text-lg font-semibold">{agent.name}</div>
          <div className="text-xs text-muted-foreground">{agent.tag}</div>
        </div>
        <div
          className={`shrink-0 w-10 h-10 rounded-md border ${accent} grid place-items-center font-mono text-xs`}
        >
          {agent.id}
        </div>
      </div>

      <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{agent.summary}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[11px]">
        <div>
          <div className="text-muted-foreground uppercase tracking-wider text-[9px] mb-1">
            reads
          </div>
          <div className="flex flex-wrap gap-1">
            {agent.sources.map((s) => (
              <span
                key={s}
                className="px-1.5 py-0.5 rounded border border-border bg-background/40 text-foreground/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground uppercase tracking-wider text-[9px] mb-1">
            emits
          </div>
          <div className="px-1.5 py-0.5 rounded border border-primary/30 bg-primary/5 text-primary inline-block">
            {agent.emits}
          </div>
        </div>
      </div>

      {!last && (
        <div className="absolute -bottom-px right-6 font-mono text-[10px] text-muted-foreground">
          ↓ pipe
        </div>
      )}
    </div>
  );
}
