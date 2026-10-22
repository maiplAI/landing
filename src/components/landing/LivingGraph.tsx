import { useEffect, useRef, useState } from "react";
import { FileText, GitBranch, Layers, Network, Target, ArrowRight, ListTodo, MessageSquare, ChartNoAxesCombined } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLUSTERS = [
  { name: "Connected stacks", icon: Layers, x: 275, y: 180, title: "Context comes from across the stack.", detail: "PM tools, documents and code repositories contribute tickets, requirements and implementation evidence. Available connectors include Jira, Notion, Google Docs, PDF upload and GitHub." },
  { name: "Customer signals", icon: ChartNoAxesCombined, x: 275, y: 380, title: "Product usage and customer feedback matter too.", detail: "Amplitude provides product-usage evidence. Customer-feedback connectors such as Intercom and Zendesk are planned, not live." },
  { name: "Strong artifact", icon: Target, x: 650, y: 280, title: "The artifact other work leans on.", detail: "A production-heavy cluster brings related evidence and dependencies into focus. This is a conceptual view, not live organizational data." },
  { name: "Decisions", icon: Layers, x: 865, y: 280, title: "Keep the why connected.", detail: "Decisions stay connected to the evidence that supports them, rather than disappearing into a conversation." },
  { name: "Context", icon: Network, x: 495, y: 70, title: "One shared layer around the work.", detail: "PM tools, docs, code repositories, customer signals, artifacts and decisions connect back to shared context. The loop is conceptual—not live ingestion or organizational data." },
];
const STACKS = [
  { name: "PM tools", tools: "Jira", icon: ListTodo, planned: false },
  { name: "Docs & briefs", tools: "Notion · Google Docs · PDFs", icon: FileText, planned: false },
  { name: "Code repositories", tools: "GitHub", icon: GitBranch, planned: false },
  { name: "Customer feedback", tools: "Intercom · Zendesk", icon: MessageSquare, planned: true },
  { name: "Analytics", tools: "Amplitude", icon: ChartNoAxesCombined, planned: false },
];
const CONTEXT_LOOP = "M560 70H944Q960 70 960 86V474Q960 490 944 490H48Q32 490 32 474V86Q32 70 48 70H430";
const ROUTES = [
  { d: "M100 130H150V180H210", group: 0 },
  { d: "M100 180H210", group: 0 },
  { d: "M100 230H150V180H210", group: 0 },
  { d: "M100 330H150V380H210", group: 1 },
  { d: "M100 380H210", group: 1 },
  { d: "M100 430H150V380H210", group: 1 },
  { d: "M340 180H410V280H575", group: 0 },
  { d: "M340 380H410V280H575", group: 1 },
  { d: "M725 280H800", group: 2 },
  { d: "M275 144V70", group: 4 },
  { d: "M275 416V490", group: 4 },
  { d: "M650 244V70", group: 4 },
  { d: "M930 280H960", group: 4 },
];

export function LivingGraph() {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.5);
  const [selected, setSelected] = useState(2);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = root.current?.getBoundingClientRect();
      if (box) setProgress(Math.max(0, Math.min(1, (window.innerHeight - box.top) / (window.innerHeight + box.height))));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const preference = () => setReduced(media.matches);
    preference(); update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", preference);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", preference);
    };
  }, []);
  const active = hovered ?? selected;
  const current = CLUSTERS[active];
  const scanX = 60 + progress * 880;
  return (
    <div ref={root} className="living-graph architectural-graph relative mx-auto mt-10 w-full" data-scroll-progress={progress.toFixed(3)}>
      <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[10px] text-muted-foreground">
        <span>ORGANIZATIONAL KNOWLEDGE</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary" />Conceptual view</span>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-b border-border py-5 sm:grid-cols-3 lg:grid-cols-5">
        {STACKS.map(stack => { const Icon = stack.icon; return <div key={stack.name} className="min-w-0"><div className="flex items-center gap-2 text-xs text-foreground"><Icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" /><span>{stack.name}</span></div><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{stack.tools}</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">{stack.planned ? "Planned connectors" : "Available connectors"}</p></div>; })}
      </div>
      <div className="relative aspect-[1000/560] w-full">
        <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="architecture-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="var(--border)" strokeWidth=".5" opacity=".4" /></pattern>
            <filter id="architecture-glow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <rect x="50" y="115" width="885" height="345" fill="url(#architecture-grid)" />
          <path d={CONTEXT_LOOP} fill="none" stroke="var(--primary)" strokeWidth={active === 4 ? 2 : 1.4} strokeOpacity={active === 4 ? .9 : .45} />
          {!reduced && <>
            <path d={CONTEXT_LOOP} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="32 2860" strokeDashoffset={-progress * 1200}>
              <animate attributeName="stroke-dashoffset" from={-progress * 1200} to={-progress * 1200 - 2892} dur="18s" repeatCount="indefinite" />
            </path>
            {[0, 6, 12].map(delay => <circle key={delay} r="3" fill="var(--primary)"><animateMotion path={CONTEXT_LOOP} dur="18s" begin={`-${delay}s`} repeatCount="indefinite" /></circle>)}
            <path d={`M${scanX} 115V460`} stroke="var(--primary)" strokeOpacity=".12" strokeWidth="1" />
          </>}
          {ROUTES.map((route, i) => {
            const strong = route.group === 2;
            const lit = route.group === active || active === 4;
            return <g key={route.d}>
              <path d={route.d} fill="none" stroke={strong ? "var(--neon)" : lit ? "var(--primary)" : "var(--muted-foreground)"} strokeWidth={strong ? 1.8 : 1.2} strokeOpacity={strong ? .8 : lit ? .85 : .3} strokeLinejoin="round" />
              {!reduced && <rect width="4" height="4" x="-2" y="-2" fill={strong ? "var(--neon)" : "var(--primary)"} opacity={strong ? 1 : .65}><animateMotion path={route.d} dur={`${3.5 + i % 3}s`} begin={`${-i * .6}s`} repeatCount="indefinite" /></rect>}
            </g>;
          })}
          {[130, 180, 230, 330, 380, 430].map((y, i) => <g key={y}>
            <rect x="64" y={y - 18} width="36" height="36" rx="3" fill="var(--background)" stroke={i < 3 && active === 0 || i >= 3 && active === 1 ? "var(--primary)" : "var(--border)"} />
            <path d={`M74 ${y - 7}H85L90 ${y - 2}V${y + 9}H74ZM85 ${y - 7}V${y - 2}H90M78 ${y + 2}H86M78 ${y + 6}H84`} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" />
          </g>)}
          {[{x:150,y:180},{x:150,y:380},{x:410,y:280},{x:765,y:280}].map(n => <rect key={`${n.x}-${n.y}`} x={n.x-3} y={n.y-3} width="6" height="6" fill={n.x > 500 ? "var(--neon)" : "var(--primary)"} />)}
          {CLUSTERS.map((cluster, i) => <g key={cluster.name}>
            <rect x={cluster.x - (i === 2 ? 75 : 65)} y={cluster.y - 36} width={i === 2 ? 150 : 130} height="72" rx="4" fill="var(--background)" stroke={i === 2 ? "var(--neon)" : active === i ? "var(--primary)" : "var(--border)"} strokeWidth={i === 2 ? 2 : 1} filter={i === 2 ? "url(#architecture-glow)" : undefined} />
            <g className="sm:hidden" stroke={i === 2 ? "var(--neon)" : "var(--primary)"} strokeWidth="3"><path d={`M${cluster.x-18} ${cluster.y-12}H${cluster.x+18}M${cluster.x-18} ${cluster.y}H${cluster.x+18}M${cluster.x-18} ${cluster.y+12}H${cluster.x+5}`} /></g>
          </g>)}
        </svg>
        {CLUSTERS.map((cluster, i) => {
          const Icon = cluster.icon;
          return <Button key={cluster.name} variant="ghost" aria-pressed={selected === i} aria-controls="graph-detail" onClick={() => setSelected(i)} onPointerEnter={() => setHovered(i)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(i)} onBlur={() => setHovered(null)} style={{ left: `${cluster.x / 10}%`, top: `${cluster.y / 5.6}%` }} className={`architecture-tile absolute hidden -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-sm p-0 font-mono text-[11px] hover:bg-transparent sm:flex ${i === 2 ? "text-neon hover:text-neon" : active === i ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-primary"}`}><Icon aria-hidden="true" /><span>{cluster.name}</span></Button>;
        })}
      </div>
      <div className="flex flex-wrap gap-1 border-t border-border py-3 sm:hidden">
        {CLUSTERS.map((cluster, i) => { const Icon = cluster.icon; return <Button key={cluster.name} size="sm" variant="ghost" aria-pressed={selected === i} aria-controls="graph-detail" onClick={() => setSelected(i)} className={`gap-1.5 px-2 text-[11px] ${i === 2 ? "text-neon" : selected === i ? "text-primary bg-accent/40" : "text-muted-foreground"}`}><Icon aria-hidden="true" />{cluster.name}</Button>; })}
      </div>
      <div id="graph-detail" aria-live="polite" className="grid min-h-32 gap-3 border-t border-border py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-12">
        <h3 className={`flex items-start gap-3 font-display text-base font-medium ${active === 2 ? "text-neon" : "text-foreground"}`}><ArrowRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />{current?.title}</h3>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{current?.detail}</p>
      </div>
    </div>
  );
}
