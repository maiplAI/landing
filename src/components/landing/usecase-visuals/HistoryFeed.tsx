import { VisualFrame } from "../UseCaseScene";

export function HistoryFeed() {
  return (
    <VisualFrame label="AI trip planner · decision ready" status="evidence 81%">
      <div className="min-h-[300px] rounded-md border border-border bg-background/45 p-4">
        <div className="border border-success/50 bg-success/10 px-4 py-3">
          <div className="font-mono text-[8px] uppercase tracking-widest text-success">verdict · build it</div>
          <div className="mt-1 text-sm font-medium">AI-assisted trip planning</div>
          <div className="mt-1 text-[10px] text-muted-foreground">The case holds and the evidence backs it.</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[['build', '78'], ['cost', '64'], ['return', '73']].map(([label, score]) => (
            <div key={label} className="border border-border bg-card p-2">
              <div className="font-mono text-[8px] uppercase text-muted-foreground">{label}</div>
              <div className="mt-1 text-base font-semibold">{score}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex-1">
            <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">destination</div>
            <div className="mt-1 text-[10px]">Jira ticket · verdict + evidence + gaps</div>
          </div>
          <div className="rounded-md bg-primary px-3 py-2 text-[10px] font-medium text-primary-foreground">affirm &amp; ship to team</div>
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[8px] uppercase text-success"><span className="h-1.5 w-1.5 rounded-full bg-success" /> shipped to the stack</div>
      </div>
    </VisualFrame>
  );
}
