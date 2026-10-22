import {
  BarChart3,
  FileText,
  Mail,
  MessageSquare,
  PanelsTopLeft,
  Users,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import logoAsset from "@/assets/maipl-logo.png";
import { Button } from "@/components/ui/button";
import {
  CONTEXT_TRAP_STATS_QUERY_KEY,
  getContextTrapStats,
  type TrapSourceId,
} from "@/lib/context-trap.functions";

const SIGNALS = [
  { id: "jira", label: "PM tools", icon: PanelsTopLeft, position: "context-node-nw" },
  { id: "slack", label: "Team chat", icon: MessageSquare, position: "context-node-n" },
  { id: "analytics", label: "Analytics", icon: BarChart3, position: "context-node-ne" },
  { id: "docs", label: "Documents", icon: FileText, position: "context-node-e" },
  { id: "feedback", label: "Customer feedback", icon: Users, position: "context-node-se" },
  { id: "email", label: "Email", icon: Mail, position: "context-node-sw" },
] as const;

const PATHS = [
  "M116 220 C205 216 266 252 340 315",
  "M223 82 C249 166 288 242 340 315",
  "M486 86 C466 172 415 243 340 315",
  "M602 232 C514 236 430 270 340 315",
  "M500 505 C467 425 407 356 340 315",
  "M151 494 C216 430 274 360 340 315",
] as const;

export function GlobalContextMap() {
  const loadStats = useServerFn(getContextTrapStats);
  const { data: stats } = useQuery({
    queryKey: CONTEXT_TRAP_STATS_QUERY_KEY,
    queryFn: () => loadStats({}),
    staleTime: 15_000,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });
  const canShowStats = Boolean(stats && stats.total >= 5);

  function percentageFor(id: TrapSourceId) {
    if (!stats || !canShowStats) return null;
    return Math.round(((stats.sources[id] ?? 0) / stats.total) * 100);
  }

  return (
    <div className="global-context-map relative isolate mx-auto aspect-[1.08] w-full max-w-[680px] overflow-hidden md:overflow-visible" aria-label="MAiPL connecting product context across global sources">
      <div className="context-map-halo absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <svg viewBox="0 0 680 630" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="map-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity=".2" />
            <stop offset="65%" stopColor="var(--primary)" stopOpacity=".04" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="map-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="map-signal-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity=".15" />
            <stop offset="52%" stopColor="var(--primary)" stopOpacity=".9" />
            <stop offset="100%" stopColor="var(--success)" stopOpacity=".3" />
          </linearGradient>
        </defs>

        <ellipse cx="340" cy="315" rx="286" ry="286" fill="url(#map-core-glow)" />
        <g className="context-map-globe" fill="none" stroke="var(--border)" strokeWidth="1">
          <ellipse cx="340" cy="315" rx="271" ry="271" strokeOpacity=".8" />
          <ellipse cx="340" cy="315" rx="271" ry="184" strokeOpacity=".55" />
          <ellipse cx="340" cy="315" rx="271" ry="88" strokeOpacity=".38" />
          <ellipse cx="340" cy="315" rx="112" ry="271" strokeOpacity=".5" />
          <ellipse cx="340" cy="315" rx="205" ry="271" strokeOpacity=".28" />
          <path d="M69 315h542" strokeOpacity=".65" />
        </g>

        <g className="context-map-orbits" fill="none" stroke="var(--primary)" strokeWidth="1">
          <ellipse cx="340" cy="315" rx="288" ry="112" transform="rotate(-24 340 315)" strokeOpacity=".24" />
          <ellipse cx="340" cy="315" rx="292" ry="126" transform="rotate(32 340 315)" strokeOpacity=".2" />
          <ellipse cx="340" cy="315" rx="255" ry="288" transform="rotate(72 340 315)" strokeOpacity=".16" />
        </g>

        <g fill="none" stroke="url(#map-signal-fade)" strokeWidth="1.35" strokeLinecap="round" filter="url(#map-glow)">
          {PATHS.map((path) => <path key={path} d={path} strokeDasharray="3 9" className="context-map-flow" />)}
        </g>

        <g className="context-map-packets" fill="var(--primary)" filter="url(#map-glow)">
          {PATHS.map((path, index) => (
            <circle key={path} r="2.6">
              <animateMotion dur={`${3.8 + index * 0.32}s`} begin={`${index * -0.7}s`} repeatCount="indefinite" path={path} />
            </circle>
          ))}
        </g>

        <g className="context-map-satellites" fill="var(--success)" filter="url(#map-glow)">
          <circle cx="340" cy="43" r="2.6" />
          <circle cx="610" cy="315" r="2.6" />
          <circle cx="340" cy="585" r="2.6" />
          <circle cx="70" cy="315" r="2.6" />
        </g>
      </svg>

      <div className="context-map-core absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/45 bg-background/90 shadow-signal backdrop-blur-md sm:h-28 sm:w-28 md:h-32 md:w-32">
        <span className="absolute inset-[-13%] rounded-full border border-primary/20" aria-hidden="true" />
        <img src={logoAsset} alt="MAiPL" className="h-auto w-[76%]" />
      </div>

      {SIGNALS.map(({ id, label, icon: Icon, position }) => {
        const percentage = percentageFor(id);
        return (
        <div
          key={label}
          className={`context-map-node group ${position} absolute z-10 -translate-x-1/2 -translate-y-1/2`}
        >
          <Button
            type="button"
            variant="outline"
            aria-label={percentage === null ? label : `${label}: selected by ${percentage}% of Context Trap respondents`}
            className="relative h-auto gap-2 overflow-visible rounded-md border-border bg-background/88 px-2.5 py-2 shadow-card backdrop-blur-md transition-colors hover:border-primary/55 hover:bg-background focus-visible:border-primary/55 focus-visible:ring-primary/40"
          >
            <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="whitespace-nowrap font-mono text-[9px] uppercase text-muted-foreground md:text-[10px]">{label}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <span
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-primary/35 bg-popover px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase text-popover-foreground opacity-0 shadow-card transition-all duration-200 group-hover:translate-y-0.5 group-hover:opacity-100 group-focus-within:translate-y-0.5 group-focus-within:opacity-100"
            >
              {percentage === null ? "Gathering responses" : `${label} — ${percentage}%`}
            </span>
          </Button>
        </div>
        );
      })}

      <div className="absolute bottom-[2%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 whitespace-nowrap">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          One connected context layer
        </div>
        {canShowStats && (() => {
          const trapped = (stats!.labels["Context Fragmented"] ?? 0)
            + (stats!.labels["Deep in the Context Trap"] ?? 0)
            + (stats!.labels["Context Everywhere"] ?? 0);
          return (
            <div className="font-mono text-[9px] uppercase text-primary/80">
              {trapped} teams already in the Context Trap
            </div>
          );
        })()}
      </div>
    </div>
  );
}