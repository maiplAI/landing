export function AgentWorkflow() {
  const cx = 350;
  const cy = 230;
  const r = 175;
  const centerR = 52;

  const agents = [
    { id: "context", name: "Context", label: "graph.v1", angle: -130 },
    { id: "intelligence", name: "Intelligence", label: "signals.v1", angle: -50 },
    { id: "communication", name: "Communication", label: "digest.v1", angle: 50 },
    { id: "governance", name: "Governance", label: "record.v1", angle: 150 },
  ];

  const toEdge = (tx: number, ty: number, radius: number) => {
    const dx = tx - cx;
    const dy = ty - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x: cx, y: cy };
    return { x: cx + (dx / dist) * radius, y: cy + (dy / dist) * radius };
  };

  return (
    <section id="agents" className="py-24 md:py-32 border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 h-7 px-2.5 rounded-full border border-border bg-card/60 font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
            agent topology · v1
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            One decision core.
            <br />
            <span className="text-primary">Four agents feeding in.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Context and Intelligence supply signal. Governance feeds back memory.
            Communication carries the verdict out. Everything converges on Decision.
          </p>
        </div>

        {/* Desktop: animated SVG hub */}
        <div className="hidden md:flex justify-center">
          <svg viewBox="0 0 700 460" className="w-full max-w-[700px]">
            <defs>
              <radialGradient id="coreGlow">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </radialGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit ring */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--primary)" strokeOpacity={0.06} strokeWidth={1} strokeDasharray="3 5" />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--primary)" strokeOpacity={0.14} strokeWidth={2} strokeDasharray="28 400" style={{ transformOrigin: `${cx}px ${cy}px`, animation: "spin 12s linear infinite" }} />

            {/* Core glow */}
            <circle cx={cx} cy={cy} r={r * 0.35} fill="url(#coreGlow)" />

            {/* Feedback arc */}
            <path
              d={`M ${cx - r * 0.35} ${cy + r * 0.55} A ${r * 0.45} ${r * 0.45} 0 0 0 ${cx + r * 0.55} ${cy - r * 0.35}`}
              fill="none"
              stroke="var(--primary)"
              strokeOpacity={0.12}
              strokeWidth={1}
              strokeDasharray="3 5"
            />
            <text x={cx - 8} y={cy + 8} fill="var(--primary)" fillOpacity={0.35} fontSize={9} fontFamily="var(--font-mono)" textAnchor="middle" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
              memory loop
            </text>

            {/* Lines, particles, and satellite nodes */}
            {agents.map((a) => {
              const rad = (a.angle * Math.PI) / 180;
              const nx = cx + r * Math.cos(rad);
              const ny = cy + r * Math.sin(rad);
              const inbound = a.id !== "communication";
              const edge = toEdge(nx, ny, centerR + 6);
              const x1 = inbound ? nx : edge.x;
              const y1 = inbound ? ny : edge.y;
              const x2 = inbound ? edge.x : nx;
              const y2 = inbound ? edge.y : ny;

              return (
                <g key={a.id}>
                  {/* Base line */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeOpacity={0.12} strokeWidth={1} />
                  {/* Animated dash */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="5 10" style={{ animation: inbound ? "dashFlow 2s linear infinite" : "dashFlowReverse 2s linear infinite" }} />
                  {/* Traveling dot */}
                  <circle r={2.5} fill="var(--primary)">
                    <animateMotion dur={`${1.6 + Math.random() * 0.8}s`} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} />
                  </circle>

                  {/* Satellite node circle */}
                  <circle cx={nx} cy={ny} r={22} fill="var(--background)" stroke="var(--primary)" strokeOpacity={0.25} strokeWidth={1} />
                  <text x={nx} y={ny + 1} fill="var(--foreground)" fontSize={10} fontWeight={600} fontFamily="var(--font-sans)" textAnchor="middle" dominantBaseline="middle">
                    {a.name}
                  </text>
                  {/* Label below node */}
                  <text x={nx} y={ny + 36} fill="var(--primary)" fillOpacity={0.6} fontSize={9} fontFamily="var(--font-mono)" textAnchor="middle" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {a.label}
                  </text>
                </g>
              );
            })}

            {/* Center Decision node */}
            <circle cx={cx} cy={cy} r={centerR} fill="var(--background)" stroke="var(--primary)" strokeOpacity={0.35} strokeWidth={1.5} filter="url(#softGlow)" />
            <circle cx={cx} cy={cy} r={centerR - 6} fill="none" stroke="var(--primary)" strokeOpacity={0.12} strokeWidth={1} strokeDasharray="4 4" style={{ transformOrigin: `${cx}px ${cy}px`, animation: "spin 6s linear infinite" }} />
            <text x={cx} y={cy - 6} fill="var(--foreground)" fontSize={13} fontWeight={700} fontFamily="var(--font-display)" textAnchor="middle">Decision</text>
            <text x={cx} y={cy + 10} fill="var(--primary)" fillOpacity={0.7} fontSize={9} fontFamily="var(--font-mono)" textAnchor="middle" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>verdict.v1</text>
          </svg>
        </div>

        {/* Agent cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-6">
          {agents.map((a) => (
            <AgentCard key={a.id} {...a} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dashFlow { to { stroke-dashoffset: -30; } }
        @keyframes dashFlowReverse { to { stroke-dashoffset: 30; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

const details: Record<string, { role: string; detail: string }> = {
  context: { role: "Ingest & unify", detail: "Builds the planning graph from your stack." },
  intelligence: { role: "Enrich & understand", detail: "Reads themes, risks, confidence on the graph." },
  communication: { role: "Deliver & answer", detail: "Pushes summaries, comments, Slack digests." },
  governance: { role: "Memory & audit", detail: "Tracks outcomes vs. predictions. Keeps org memory queryable." },
};

function AgentCard({ id, name }: { id: string; name: string }) {
  const d = details[id];
  if (!d) return null;
  return (
    <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-5 hover:border-primary/30 transition-colors">
      <div className="text-sm font-semibold tracking-tight">{name}</div>
      <div className="text-[11px] text-muted-foreground">{d.role}</div>
      <p className="mt-3 text-xs text-foreground/80 leading-relaxed">{d.detail}</p>
    </div>
  );
}
