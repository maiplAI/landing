import type { ReactNode } from "react";

interface UseCaseSceneProps {
  index: number;
  time: string;
  title: string;
  situation: string;
  moment: string;
  visual: ReactNode;
  flip?: boolean;
}

export function UseCaseScene({
  index,
  time,
  title,
  situation,
  moment,
  visual,
  flip = false,
}: UseCaseSceneProps) {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className={flip ? "md:order-2" : ""}>
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">{String(index).padStart(2, "0")}</span>
              <span className="h-px w-6 bg-border" />
              <span>{time}</span>
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
              {title}
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              {situation}
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed border-l-2 border-primary/50 pl-4">
              {moment}
            </p>
          </div>
          <div className={flip ? "md:order-1" : ""}>{visual}</div>
        </div>
      </div>
    </section>
  );
}

export function VisualFrame({ label, status, children }: { label: string; status?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card transition-colors duration-300 hover:border-primary/35">
      <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/30 px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        {status && <span className="ml-auto font-mono text-[8px] uppercase tracking-widest text-primary">{status}</span>}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export function AgentPath({
  steps,
  active = steps.length - 1,
}: {
  steps: string[];
  active?: number;
}) {
  return (
    <div className="mb-4 flex items-center gap-1.5 overflow-hidden" aria-label={`Agent progress: ${steps.join(", ")}`}>
      {steps.map((step, index) => (
        <div key={step} className="flex min-w-0 flex-1 items-center gap-1.5">
          <div className="flex min-w-0 items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${index <= active ? "bg-primary" : "bg-border"}`}
            />
            <span
              className={`truncate font-mono text-[8px] uppercase ${index === active ? "text-primary" : "text-muted-foreground"}`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && <span className="h-px min-w-2 flex-1 bg-border" />}
        </div>
      ))}
    </div>
  );
}
