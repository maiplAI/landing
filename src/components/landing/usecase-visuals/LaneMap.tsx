import { VisualFrame } from "../UseCaseScene";

export function LaneMap() {
  const lanes = [
    { label: "build", tone: "border-success/40 bg-success/5", nodes: ["Activation tour", "Billing controls"] },
    { label: "validate", tone: "border-primary/40 bg-primary/5", nodes: ["Team spaces", "AI trip planner"] },
    { label: "hold", tone: "border-border bg-muted/20", nodes: ["Social sharing"] },
  ];
  return (
    <VisualFrame label="artifact ontology" status="5 read from your stack">
      <div className="grid min-h-[300px] grid-cols-3 gap-2 rounded-md border border-border bg-background/45 p-3">
        {lanes.map((lane) => (
          <div key={lane.label} className={`min-w-0 border p-2 ${lane.tone}`}>
            <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">{lane.label} · {lane.nodes.length}</div>
            <div className="mt-7 space-y-5">
              {lane.nodes.map((node, i) => (
                <div key={node} className="mx-auto flex flex-col items-center text-center">
                  <span className={`grid rounded-full border bg-card text-[9px] font-semibold ${i === 0 ? "h-14 w-14 border-primary/60" : "h-11 w-11 border-border"} place-items-center`}>
                    {node.split(" ").map((word) => word[0]).join("").slice(0, 2)}
                  </span>
                  <span className="mt-1.5 text-[9px] leading-tight text-foreground">{node}</span>
                  <span className="font-mono text-[7px] uppercase text-muted-foreground">{i === 0 ? "82% evidence" : "61% evidence"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
