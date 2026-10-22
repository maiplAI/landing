import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    step: "01",
    tag: "absorb",
    title: "Signals become evidence.",
    body: "maipl notices movement across your connected stack and turns it into cited facts.",
    detail: "4 sources · 18 facts",
  },
  {
    step: "02",
    tag: "audit",
    title: "Claims face the context.",
    body: "Related facts connect while weak, stale, or conflicting evidence stays visible.",
    detail: "cited · linked · challenged",
  },
  {
    step: "03",
    tag: "action",
    title: "The evidence makes the call.",
    body: "Every initiative resolves into Build, Validate, or Hold—with its reasoning attached.",
    detail: "build · validate · hold",
  },
] as const;

function AbsorbVisual() {
  return (
    <div className="relative flex h-52 items-center justify-center overflow-hidden" aria-hidden="true">
      <div className="absolute left-[13%] top-5 grid gap-3">
        {["JIRA", "DOCS", "GITHUB", "PDF"].map((source, index) => (
          <div key={source} className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground">
            <span className={cn("h-2 w-2 rounded-full", index === 1 ? "bg-warning" : "bg-primary")} />
            {source}
          </div>
        ))}
      </div>
      <svg viewBox="0 0 360 208" className="absolute inset-0 h-full w-full">
        {[44, 83, 122, 161].map((y, index) => (
          <path
            key={y}
            d={`M 95 ${y} C 150 ${y}, 153 104, 210 104`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className={cn("animate-flow", index === 1 ? "text-warning/60" : "text-primary/50")}
          />
        ))}
      </svg>
      <div className="absolute left-[58%] grid h-20 w-20 place-items-center rounded-full border border-primary/50 bg-primary/10 shadow-signal">
        <div className="text-center font-mono">
          <div className="text-xl font-semibold text-primary">18</div>
          <div className="text-[8px] uppercase text-muted-foreground">cited facts</div>
        </div>
      </div>
    </div>
  );
}

function AuditVisual() {
  return (
    <div className="relative h-52 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 360 208" className="h-full w-full">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M80 54 L180 104 L282 50" className="text-primary/60" />
          <path d="M80 154 L180 104 L282 157" className="text-primary/35" />
          <path d="M80 54 L80 154" strokeDasharray="4 6" className="text-warning/60 animate-flow" />
        </g>
        {[[80,54],[80,154],[180,104],[282,50],[282,157]].map(([x,y], index) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={index === 2 ? 23 : 15} className={index === 4 ? "fill-warning/10 stroke-warning" : "fill-card stroke-primary/70"} />
            <text x={x} y={y + 3} textAnchor="middle" className={index === 4 ? "fill-warning" : "fill-primary"} fontSize="8" fontFamily="JetBrains Mono">
              {index === 2 ? "CLAIM" : index === 4 ? "GAP" : `F${index + 1}`}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-warning/40 bg-warning/10 px-2 py-1 font-mono text-[8px] uppercase text-warning">
        conflicting signal found
      </div>
    </div>
  );
}

function ActionVisual() {
  return (
    <div className="flex h-52 items-center justify-center px-5" aria-hidden="true">
      <div className="grid w-full max-w-sm grid-cols-3 gap-2">
        {[
          { name: "BUILD", count: "6", active: true },
          { name: "VALIDATE", count: "3", active: false },
          { name: "HOLD", count: "2", active: false },
        ].map((lane) => (
          <div key={lane.name} className={cn("relative overflow-hidden rounded-md border p-3 text-center", lane.active ? "border-primary bg-primary/10" : "border-border bg-background/60")}>
            <div className={cn("font-mono text-[8px]", lane.active ? "text-primary" : "text-muted-foreground")}>{lane.name}</div>
            <div className="mt-3 text-2xl font-semibold tabular-nums">{lane.count}</div>
            <div className="mx-auto mt-3 h-1 w-8 rounded-full bg-muted">
              <div className={cn("h-full rounded-full", lane.active ? "w-full bg-primary" : "w-1/2 bg-muted-foreground/40")} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VISUALS = [AbsorbVisual, AuditVisual, ActionVisual];

export function TheCall() {
  const [active, setActive] = useState(0);

  const selectStage = (index: number) => {
    setActive(index);
  };

  const ActiveVisual = VISUALS[active];
  const current = STAGES[active];

  return (
    <section id="how" className="scroll-mt-16 border-b border-border bg-card/30">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground border border-border rounded-full px-2.5 py-1">
            the context engine
          </span>
          <h2 className="mt-6 font-display text-2xl md:text-4xl font-semibold tracking-tight text-balance">
            From scattered signals to{" "}
            <span className="text-primary italic">a call you can defend.</span>
          </h2>
        </div>

        <div className="mt-10 rounded-lg border border-border bg-background shadow-card">
          <div className="relative grid grid-cols-3 border-b border-border p-2 md:p-3" role="tablist" aria-label="How maipl works">
            <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-1/2 h-px bg-border" />
            {STAGES.map((stage, index) => (
              <Button
                key={stage.tag}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="how-stage-panel"
                onClick={() => selectStage(index)}
                variant="ghost"
                className={cn(
                  "relative z-10 h-auto min-w-0 flex-col gap-1 rounded-md px-1 py-3 font-mono hover:bg-card md:py-4",
                  active === index ? "bg-card text-primary" : "text-muted-foreground",
                )}
              >
                <span className={cn("grid h-7 w-7 place-items-center rounded-full border bg-background text-[9px] tabular-nums transition-colors", active === index ? "border-primary shadow-signal" : "border-border")}>
                  {stage.step}
                </span>
                <span className="max-w-full truncate text-[9px] uppercase md:text-[10px]">{stage.tag}</span>
              </Button>
            ))}
          </div>

          <div id="how-stage-panel" role="tabpanel" className="grid min-h-[300px] md:grid-cols-2 md:items-center">
            <div key={`copy-${current.tag}`} className="animate-fade-in p-6 md:p-10">
              <div className="font-mono text-[10px] uppercase text-primary">{current.step} · {current.tag}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">{current.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{current.body}</p>
              <div className="mt-6 inline-flex rounded border border-border bg-card px-2.5 py-1.5 font-mono text-[9px] uppercase text-muted-foreground">
                {current.detail}
              </div>
            </div>
            <div key={`visual-${current.tag}`} className="animate-scale-in border-t border-border bg-card/40 md:border-l md:border-t-0">
              <ActiveVisual />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 font-mono text-[10px] uppercase text-muted-foreground">
          <span>absorb</span>
          <span className="text-primary">→</span>
          <span>audit</span>
          <span className="text-primary">→</span>
          <span className="text-foreground">action</span>
        </div>
      </div>
    </section>
  );
}
