import type { ReactNode } from "react";
import { VisualFrame } from "../UseCaseScene";

type Tone = "signal" | "warning" | "danger" | "success" | "muted";

const toneClasses: Record<Tone, string> = {
  signal: "border-primary/50 bg-primary/10 text-primary shadow-signal",
  warning: "border-warning/50 bg-warning/10 text-warning",
  danger: "border-danger/50 bg-danger/10 text-danger",
  success: "border-success/50 bg-success/10 text-success",
  muted: "border-border bg-card text-muted-foreground",
};

export function AgentNetwork({
  label,
  status,
  children,
  action,
  actionTone = "signal",
}: {
  label: string;
  status: string;
  children: ReactNode;
  action: string;
  actionTone?: Tone;
}) {
  return (
    <VisualFrame label={label} status={status}>
      <div className="relative h-[300px] overflow-hidden rounded-md border border-border bg-background/45 md:h-[330px]">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:28px_28px]" />
        {children}
        <div className={`absolute inset-x-3 bottom-3 z-20 border px-3 py-2 ${toneClasses[actionTone]}`}>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current animate-pulse-dot" />
            <span className="font-mono text-[8px] uppercase tracking-widest">agent intervention</span>
          </div>
          <p className="mt-1 text-[11px] font-medium leading-snug text-foreground">{action}</p>
        </div>
      </div>
    </VisualFrame>
  );
}

export function NetworkLines({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {children}
    </svg>
  );
}

export function FlowLine({
  d,
  tone = "signal",
  dashed = false,
}: {
  d: string;
  tone?: Tone;
  dashed?: boolean;
}) {
  const stroke = {
    signal: "stroke-primary",
    warning: "stroke-warning",
    danger: "stroke-danger",
    success: "stroke-success",
    muted: "stroke-border",
  }[tone];
  return (
    <path
      d={d}
      fill="none"
      className={`${stroke} ${dashed ? "animate-flow" : ""}`}
      strokeWidth="0.45"
      strokeDasharray={dashed ? "3 3" : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
}

export function NetworkNode({
  className,
  eyebrow,
  label,
  detail,
  tone = "muted",
  active = false,
}: {
  className: string;
  eyebrow: string;
  label: string;
  detail?: string;
  tone?: Tone;
  active?: boolean;
}) {
  return (
    <div className={`absolute z-10 ${className}`}>
      {active && <span className="absolute inset-0 animate-pulse rounded-full border border-primary/50" />}
      <div className={`relative min-w-[78px] max-w-[118px] border px-2.5 py-2 ${toneClasses[tone]}`}>
        <span className="block font-mono text-[7px] uppercase tracking-widest opacity-70">{eyebrow}</span>
        <span className="mt-0.5 block text-[10px] font-medium leading-tight text-foreground">{label}</span>
        {detail && <span className="mt-1 block font-mono text-[8px] leading-tight opacity-75">{detail}</span>}
      </div>
    </div>
  );
}

export function AgentHub({
  className,
  label,
  state,
  tone = "signal",
}: {
  className: string;
  label: string;
  state: string;
  tone?: Tone;
}) {
  return (
    <div className={`absolute z-10 ${className}`}>
      <div className={`relative flex h-20 w-20 items-center justify-center rounded-full border ${toneClasses[tone]}`}>
        <span className="absolute inset-2 rounded-full border border-current/30" />
        <div className="relative text-center">
          <span className="block font-mono text-[7px] uppercase tracking-wider opacity-70">agent</span>
          <span className="mt-0.5 block text-[10px] font-semibold leading-tight text-foreground">{label}</span>
          <span className="mt-1 block font-mono text-[7px] uppercase">{state}</span>
        </div>
      </div>
    </div>
  );
}

export function EdgeLabel({ className, children, tone = "muted" }: { className: string; children: ReactNode; tone?: Tone }) {
  return (
    <span className={`absolute z-10 bg-background/90 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-wide ${
      tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : tone === "signal" ? "text-primary" : "text-muted-foreground"
    } ${className}`}>
      {children}
    </span>
  );
}