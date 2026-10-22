import { VisualFrame } from "../UseCaseScene";

export function DecisionCard() {
  const axes = [
    { label: "build case", score: 72, width: "72%" },
    { label: "cost case", score: 48, width: "48%" },
    { label: "return case", score: 64, width: "64%" },
  ];
  return (
    <VisualFrame label="AI trip planner · evidence 67%" status="initiative read">
      <div className="min-h-[300px] rounded-md border border-border bg-background/45 p-4">
        <div className="border border-primary/50 bg-primary/10 px-3 py-2">
          <div className="font-mono text-[8px] uppercase tracking-widest text-primary">verdict · validate first</div>
          <p className="mt-1 text-[10px]">Strong on intent, thin on proof — close the gap before committing.</p>
        </div>
        <div className="mt-6 grid grid-cols-[92px_1fr_28px] gap-x-3 gap-y-5 items-center">
          {axes.map((axis) => (
            <div key={axis.label} className="contents">
              <span className="font-mono text-[8px] uppercase text-muted-foreground">{axis.label}</span>
              <span className="h-2 bg-muted"><span className="block h-full bg-primary" style={{ width: axis.width }} /></span>
              <span className="font-mono text-[9px]">{axis.score}</span>
            </div>
          ))}
        </div>
        <p className="mt-7 border-l-2 border-primary/50 pl-3 text-[10px] leading-relaxed text-muted-foreground">Customer need appears real, but expected adoption is not yet supported by observed usage.</p>
      </div>
    </VisualFrame>
  );
}
