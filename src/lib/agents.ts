// The five agents, as a first-class product concept. Client-safe: imported by
// /workflows and /connect. Selecting agents changes what a user *reads*, not
// what the engine runs — every run still executes the full pipeline.

export type AgentId =
  | "context"
  | "intelligence"
  | "decision"
  | "governance"
  | "communication";

export const ALL_AGENTS: AgentId[] = [
  "context",
  "intelligence",
  "decision",
  "governance",
  "communication",
];

/** Context is always on — every recipe needs it. It is never a user choice. */
export const ALWAYS_ON: AgentId[] = ["context"];

/** The agents a user actually picks between. */
export const SELECTABLE_AGENTS: AgentId[] = ALL_AGENTS.filter(
  (a) => !ALWAYS_ON.includes(a),
);


export type AgentDef = {
  id: AgentId;
  num: string;
  name: string;
  /** One line: what this agent does. */
  role: string;
  /** One line: what it puts in front of you after a run. */
  produces: string;
  /** Sources that make this agent sharper (ids from the sources catalog). */
  feeds: string[];
};

export const AGENTS: AgentDef[] = [
  {
    id: "context",
    num: "01",
    name: "Context",
    role: "ingests and unifies your sources into one planning graph",
    produces: "what was actually read — sources, documents, fact count",
    feeds: ["jira", "notion", "github", "gdocs", "pdf"],
  },
  {
    id: "intelligence",
    num: "02",
    name: "Intelligence",
    role: "genuine insight on what has been done, and what may or may not work",
    produces: "what this run learned, and what changed since last time",
    feeds: ["amplitude", "notion", "github"],
  },
  {
    id: "decision",
    num: "03",
    name: "Decision",
    role: "the core verdict — takes the most of the context layer",
    produces: "the call — build now / next / not now, with loss reasons",
    feeds: ["jira", "amplitude", "pdf"],
  },
  {
    id: "governance",
    num: "04",
    name: "Governance",
    role: "keeps the code in check — flags possible merge issues before they land",
    produces: "merge-risk reads from PR churn and stale branches",
    feeds: ["github"],
  },
  {
    id: "communication",
    num: "05",
    name: "Communication",
    role: "the door to the team — opens the discussion panel and invites",
    produces: "a shared panel on a run where teammates react and stake positions",
    feeds: ["jira", "notion"],
  },
];

export function agentDef(id: string): AgentDef | undefined {
  return AGENTS.find((a) => a.id === id);
}

export function agentName(id: string): string {
  return agentDef(id)?.name ?? id;
}

export type AgentPreset = {
  id: string;
  label: string;
  blurb: string;
  agents: AgentId[];
};

export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: "full",
    label: "full loop",
    blurb: "everything, end to end",
    agents: ALL_AGENTS,
  },
  {
    id: "call",
    label: "just the call",
    blurb: "read the sources, give me the ranking",
    agents: ["context", "decision"],
  },
  {
    id: "signal",
    label: "signal read",
    blurb: "what's in the data, no verdict pressure",
    agents: ["context", "intelligence"],
  },
  {
    id: "track",
    label: "track record",
    blurb: "the call plus how past calls held up",
    agents: ["context", "decision", "governance"],
  },
];

/** Coerces anything stored on a workflow row into a valid, ordered focus set. */
export function normalizeFocus(value: unknown): AgentId[] {
  const raw = Array.isArray(value) ? value : [];
  const set = new Set(raw.filter((v): v is AgentId => ALL_AGENTS.includes(v as AgentId)));
  for (const a of ALWAYS_ON) set.add(a);
  if (set.size === ALWAYS_ON.length) return [...ALL_AGENTS];
  return ALL_AGENTS.filter((a) => set.has(a));
}

function key(ids: AgentId[]): string {
  return [...new Set([...ids, ...ALWAYS_ON])].sort().join(",");
}

export function presetFor(focus: AgentId[]): AgentPreset | null {
  return AGENT_PRESETS.find((p) => key(p.agents) === key(focus)) ?? null;
}

