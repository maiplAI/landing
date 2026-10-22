import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  BarChart3,
  Check,
  FileText,
  Mail,
  MessageSquare,
  PanelsTopLeft,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CONTEXT_TRAP_STATS_QUERY_KEY,
  getContextTrapStats,
  recordContextTrap,
  type ContextTrapStats,
  type TrapSourceId,
} from "@/lib/context-trap.functions";

const SOURCES: ReadonlyArray<{
  id: TrapSourceId;
  name: string;
  icon: typeof PanelsTopLeft;
}> = [
  { id: "jira", name: "PM tools", icon: PanelsTopLeft },
  { id: "slack", name: "Team chat", icon: MessageSquare },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "docs", name: "Documents", icon: FileText },
  { id: "feedback", name: "Customer feedback", icon: Users },
  { id: "email", name: "Email", icon: Mail },
];

const ALL_IDS: TrapSourceId[] = SOURCES.map((s) => s.id);
const STORAGE_KEY = "maipl.context-trap.result";

type VerdictLabel =
  | "Context Curious"
  | "Context Fragmented"
  | "Deep in the Context Trap"
  | "Context Everywhere";

type Verdict = {
  label: VerdictLabel;
  emoji: string;
  tone: string;
  ring: string;
  line: string;
};

function verdictFor(count: number, everywhere: boolean): Verdict {
  if (everywhere)
    return {
      label: "Context Everywhere",
      emoji: "🪤",
      tone: "text-primary",
      ring: "border-primary/40 bg-primary/10",
      line: "Context lives in every tool and belongs to none of them.",
    };
  if (count <= 2)
    return {
      label: "Context Curious",
      emoji: "🟢",
      tone: "text-success",
      ring: "border-success/40 bg-success/10",
      line: "Still contained — but it spreads faster than teams expect.",
    };
  if (count <= 4)
    return {
      label: "Context Fragmented",
      emoji: "🟡",
      tone: "text-warning",
      ring: "border-warning/40 bg-warning/10",
      line: "Each tool holds a piece. Nothing holds the connection.",
    };
  return {
    label: "Deep in the Context Trap",
    emoji: "🔴",
    tone: "text-danger",
    ring: "border-danger/40 bg-danger/10",
    line: "Your team knows everything and can prove nothing in one place.",
  };
}

type StoredResult = { count: number; everywhere: boolean };

export function ContextTrap() {
  const queryClient = useQueryClient();
  const record = useServerFn(recordContextTrap);
  const loadStats = useServerFn(getContextTrapStats);

  const [selected, setSelected] = useState<Set<TrapSourceId>>(new Set());
  const [everywhere, setEverywhere] = useState(false);
  const [locked, setLocked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState<ContextTrapStats | null>(null);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // One check per visitor: restore a previous result and never offer a retake.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const prev = JSON.parse(raw) as StoredResult;
        if (typeof prev?.count === "number") {
          setEverywhere(Boolean(prev.everywhere));
          setSelected(new Set(ALL_IDS.slice(0, Math.min(prev.count, ALL_IDS.length))));
          setLocked(true);
          setRevealed(true);
          loadStats({})
            .then(setStats)
            .catch(() => {});
        }
      }
    } catch {
      /* storage unavailable — treat as a fresh visit */
    }
    setHydrated(true);
  }, [loadStats]);

  const count = everywhere ? ALL_IDS.length : selected.size;
  const verdict = verdictFor(count, everywhere);
  const canReveal = count > 0 && !locked;

  function toggle(id: TrapSourceId) {
    if (locked) return;
    setEverywhere(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleEverywhere() {
    if (locked) return;
    if (everywhere) {
      setEverywhere(false);
      setSelected(new Set());
    } else {
      setEverywhere(true);
      setSelected(new Set(ALL_IDS));
    }
  }

  async function reveal() {
    if (!canReveal) return;
    setLocked(true);
    setRevealed(true);
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ count, everywhere } satisfies StoredResult),
      );
    } catch {
      /* ignore */
    }
    try {
      await record({
        data: { sources: Array.from(selected), label: verdict.label },
      });
      await queryClient.invalidateQueries({
        queryKey: CONTEXT_TRAP_STATS_QUERY_KEY,
      });
    } catch {
      /* the result still shows even if recording fails */
    }
    try {
      setStats(await loadStats({}));
    } catch {
      /* tally is optional */
    }
  }

  const shareText = `I discovered I'm ${verdict.label} ${verdict.emoji} — Escape the Context Trap at maipltech.com/context-trap #ContextTrap`;

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        /* fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="text-center">
          <div className="inline-flex h-7 items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            🪤 the context trap
          </div>
          <h1 className="mt-8 font-display text-3xl font-semibold leading-[1.05] text-balance md:text-5xl">
            Are you in a{" "}
            <span className="italic text-primary">Context Trap?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Where does the context behind your product decisions live? Select
            every source your team relies on.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            one check · one result
          </p>
        </div>

        {/* selector */}
        <div
          className={`mt-12 transition-all duration-500 ${
            revealed ? "pointer-events-none opacity-45 blur-[1px]" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {SOURCES.map(({ id, name, icon: Icon }) => {
              const active = selected.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  disabled={locked}
                  onClick={() => toggle(id)}
                  aria-pressed={active}
                  className={`group relative flex h-28 flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    active
                      ? "border-primary/60 bg-primary/10 shadow-signal"
                      : "border-border/70 bg-card/40 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/70"
                  } disabled:cursor-default disabled:hover:translate-y-0`}
                >
                  <span
                    className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl transition-opacity duration-300 ${
                      active ? "bg-primary/25 opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex w-full items-start justify-between">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                        active
                          ? "border-primary/50 bg-primary/15 text-primary"
                          : "border-border bg-secondary/60 text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                        active
                          ? "scale-100 border-primary bg-primary text-primary-foreground"
                          : "scale-90 border-border/80 text-transparent"
                      }`}
                    >
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="text-sm font-medium">{name}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4">
            <button
              type="button"
              disabled={locked}
              onClick={toggleEverywhere}
              aria-pressed={everywhere}
              className={`inline-flex h-10 items-center gap-2 rounded-full border border-dashed px-5 text-xs transition-colors ${
                everywhere
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span aria-hidden="true">🪤</span>
              Honestly? Everywhere
            </button>

            {!revealed && hydrated && (
              <Button
                type="button"
                onClick={reveal}
                disabled={!canReveal}
                className="h-12 w-full rounded-xl shadow-signal disabled:shadow-none"
              >
                Reveal my result
                <span className="font-mono">→</span>
              </Button>
            )}
          </div>
        </div>

        {/* result */}
        {revealed && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 md:mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/50 p-8 backdrop-blur md:p-12">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                aria-hidden="true"
              />
              <div className="text-center">
                <div
                  className={`mx-auto inline-flex flex-col items-center rounded-2xl border px-10 py-7 ${verdict.ring}`}
                >
                  <span className="text-2xl">{verdict.emoji}</span>
                  <span
                    className={`mt-3 font-display text-xl font-semibold tracking-tight md:text-3xl ${verdict.tone}`}
                  >
                    {verdict.label}
                  </span>
                  <span className="mt-2 max-w-xs text-xs text-muted-foreground">
                    {verdict.line}
                  </span>
                </div>

                <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Your product context isn't missing. It's fragmented. And every
                  AI tool you add can retrieve more of it without necessarily
                  understanding how it connects.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/waitlist"
                    className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 font-medium text-primary-foreground shadow-signal transition hover:opacity-90"
                  >
                    Escape the Context Trap
                    <span className="font-mono transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={share}
                    className="h-12 rounded-xl bg-card px-5 font-mono text-xs"
                  >
                    {copied ? "copied to clipboard" : "share my result"}
                  </Button>
                </div>
              </div>

              {stats && stats.total >= 5 ? (
                <div className="mx-auto mt-14 max-w-2xl border-t border-border/60 pt-10">
                  <div className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    what {stats.total} visitors reported
                  </div>
                  <div className="mt-6 space-y-3">
                    {SOURCES.map((s) => {
                      const n = stats.sources[s.id] ?? 0;
                      const pct = Math.round((n / stats.total) * 100);
                      return (
                        <div key={s.id} className="flex items-center gap-3">
                          <span className="w-32 shrink-0 font-mono text-xs text-muted-foreground md:w-36">
                            {s.name}
                          </span>
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                            <span
                              className="block h-full rounded-full bg-primary transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </span>
                          <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {Object.entries(stats.labels).map(([label, n]) => (
                      <span
                        key={label}
                        className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {label} · {n}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-12 text-center font-mono text-[10px] text-muted-foreground">
                  results appear as more people take it.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
