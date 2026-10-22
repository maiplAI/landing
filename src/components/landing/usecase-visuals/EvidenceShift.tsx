import { VisualFrame } from "../UseCaseScene";

export function EvidenceShift() {
  return (
    <VisualFrame label="evidence behind this call" status="6 cited facts">
      <div className="min-h-[300px] rounded-md border border-border bg-background/45 p-4">
        <div className="relative mx-auto h-40 max-w-sm">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 150" aria-hidden="true">
            <path d="M160 75 L55 35 M160 75 L55 115 M160 75 L265 35 M160 75 L265 115" className="stroke-border" strokeWidth="1" />
          </svg>
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary bg-primary/10 text-center font-mono text-[8px] uppercase">AI trip<br />planner</span>
          <span className="absolute left-1 top-3 border border-border bg-card px-2 py-1.5 font-mono text-[8px]">Jira · 2</span>
          <span className="absolute bottom-2 left-1 border border-border bg-card px-2 py-1.5 font-mono text-[8px]">Brief · 2</span>
          <span className="absolute right-1 top-3 border border-primary/50 bg-primary/10 px-2 py-1.5 font-mono text-[8px]">Docs · 1</span>
          <span className="absolute bottom-2 right-1 border border-border bg-card px-2 py-1.5 font-mono text-[8px]">Amplitude · 1</span>
        </div>
        <div className="mt-3 border border-dashed border-warning/50 bg-warning/5 p-3">
          <div className="font-mono text-[8px] uppercase tracking-widest text-warning">what would settle this</div>
          <div className="mt-2 space-y-1.5 text-[10px] text-muted-foreground">
            <p>Usage signal — a prototype test with target travellers</p>
            <p>Return case — an adoption target and measurement window</p>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}
