import { VisualFrame } from "../UseCaseScene";

export function LifecycleStrip() {
  const rows = [
    { name: "documents", same: "55%", added: "+2", gone: "−10" },
    { name: "brief", same: "78%", added: "+2", gone: "−2" },
    { name: "jira", same: "100%", added: "0", gone: "0" },
  ];
  return (
    <VisualFrame label="since last read" status="triggered by google docs">
      <div className="min-h-[300px] rounded-md border border-border bg-background/45 p-4">
        <div className="space-y-5 pt-3">
          {rows.map((row) => (
            <div key={row.name}>
              <div className="mb-1.5 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest">
                <span>{row.name}</span><span className="text-muted-foreground">{row.added} / {row.gone}</span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-sm bg-muted">
                <span className="bg-muted-foreground/30" style={{ width: row.same }} />
                <span className="min-w-2 flex-1 bg-primary/70" />
                {row.gone !== "0" && <span className="w-[14%] bg-warning/70" />}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-7 border-t border-border pt-4">
          <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">calls</div>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-primary" /><span className="text-[10px]">AI trip planner</span>
            <span className="font-mono text-[9px] text-warning">hold → validate</span>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}
