import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpDown, Check, FileSearch, GitBranch, MessageSquare, Network, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PUBLIC_AGENTS as AGENTS } from "@/lib/public-agents";
import productImage from "@/assets/product/step3.png";

const ICONS = [FileSearch, Scale, GitBranch, MessageSquare];

export function HomepageProof() {
  const [selected, setSelected] = useState(0);
  const agent = AGENTS[selected];
  return (
    <>
      <section className="w-full border-b border-border bg-background" aria-labelledby="call-heading">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid items-end gap-6 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase text-warning">From context to a call</p>
              <h2 id="call-heading" className="mt-4 max-w-lg font-display text-2xl font-medium leading-tight md:text-3xl">Know what deserves<br />your next move.</h2>
            </div>
            <div>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">Build, validate or hold. A decision connected to the evidence behind it — not another score to take on faith.</p>
              <Button asChild variant="link" className="mt-3 h-auto px-0 text-xs"><Link to="/how-it-works">See the product <ArrowRight /></Link></Button>
            </div>
          </div>
          <figure className="mt-10 overflow-hidden rounded-md border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[9px] uppercase text-muted-foreground"><span>MAiPL / artifact map</span><span className="text-primary">Product view</span></div>
            <img src={productImage} alt="MAiPL artifact map showing build, validate and hold lanes" loading="lazy" className="block h-auto w-full" />
          </figure>
          <div className="mt-6 grid gap-4 text-xs text-muted-foreground sm:grid-cols-3">
            {["Evidence attached to the call", "Sources you can trace back to", "Unchanged evidence. Unchanged verdict."].map(text => <div key={text} className="flex items-center gap-2"><Check className="size-3.5 shrink-0 text-primary" />{text}</div>)}
          </div>
        </div>
      </section>
      <section className="w-full border-b border-border bg-card/30" aria-labelledby="agents-heading">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="font-mono text-[10px] uppercase text-primary">Four agents. One context layer.</p><h2 id="agents-heading" className="mt-4 font-display text-2xl font-medium md:text-3xl">Different jobs.<br />A shared understanding.</h2></div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Intelligence, Decision, Governance and Communication — each reads from and returns to the same context layer.</p>
          </div>
          <div role="tablist" aria-label="MAiPL agents" className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AGENTS.map((item, index) => {
              const Icon = ICONS[index] ?? Network;
              return <Button key={item.id} id={`agent-tab-${item.id}`} role="tab" aria-selected={selected === index} aria-controls="agent-panel" variant="ghost" onClick={() => setSelected(index)} onKeyDown={event => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  const next = (selected + (event.key === 'ArrowRight' ? 1 : -1) + AGENTS.length) % AGENTS.length;
                  setSelected(next);
                  document.getElementById(`agent-tab-${AGENTS[next]?.id}`)?.focus();
                }
                  }} className={`h-auto min-h-24 flex-col items-start gap-3 rounded-none border-b px-3 py-4 ${selected === index ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground'}`}><span className="flex w-full items-center justify-between"><Icon /><span className="font-mono text-[9px]">0{index + 1}</span></span><span className="text-xs">{item.name}</span></Button>;
            })}
          </div>
          <div aria-label="Each of the four agents connects back to the context layer" className="mt-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {AGENTS.map(item => <div key={item.id} className="flex flex-col items-center gap-2 py-2 text-primary"><ArrowUpDown className="size-5" aria-hidden="true" /><span className="font-mono text-[9px] text-muted-foreground sm:hidden">{item.name} ↔ Context</span></div>)}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 border-y border-primary/30 bg-primary/5 px-4 py-5"><Network className="size-5 text-primary" /><span className="font-display text-base">Context layer</span><span className="text-xs text-muted-foreground">Shared evidence · provenance · connections</span></div>
          </div>
          {agent && <div id="agent-panel" role="tabpanel" aria-labelledby={`agent-tab-${agent.id}`} className="mt-8 grid min-h-40 gap-6 border-b border-border pb-8 md:grid-cols-2 md:gap-16">
            <h3 className="max-w-lg font-display text-lg leading-relaxed">{agent.role.charAt(0).toUpperCase() + agent.role.slice(1)}.</h3>
            <div><p className="font-mono text-[9px] uppercase text-primary">What it brings to the call</p><p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{agent.produces.charAt(0).toUpperCase() + agent.produces.slice(1)}.</p></div>
          </div>}
        </div>
      </section>
    </>
  );
}