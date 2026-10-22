import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export const TRAP_SOURCE_IDS = [
  "jira",
  "slack",
  "analytics",
  "docs",
  "feedback",
  "email",
] as const;

export type TrapSourceId = (typeof TRAP_SOURCE_IDS)[number];

export const TRAP_LABELS = [
  "Context Curious",
  "Context Fragmented",
  "Deep in the Context Trap",
  "Context Everywhere",
] as const;

const InputSchema = z.object({
  sources: z.array(z.enum(TRAP_SOURCE_IDS)).min(1).max(6),
  label: z.enum(TRAP_LABELS),
});

export type ContextTrapStats = {
  total: number;
  sources: Record<string, number>;
  labels: Record<string, number>;
};

export const CONTEXT_TRAP_STATS_QUERY_KEY = ["context-trap-stats"] as const;

function publicClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PUBLISHABLE_KEY) {
    return null;
  }
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false } },
  );
}

export const recordContextTrap = createServerFn({ method: "POST" })
  .inputValidator((data) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    if (!supabase) {
      throw new Error(
        "Backend not configured: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.",
      );
    }
    const { error } = await supabase.from("context_trap_submissions").insert({
      sources: Array.from(new Set(data.sources)),
      label: data.label,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const getContextTrapStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<ContextTrapStats> => {
    const supabase = publicClient();
    // Stats are additive: without a backend the section renders as empty
    // instead of breaking the page.
    if (!supabase) {
      return { total: 0, sources: {}, labels: {} };
    }
    const { data, error } = await supabase.rpc("context_trap_stats");
    if (error) throw new Error(error.message);
    const raw = (data ?? {}) as Partial<ContextTrapStats>;
    return {
      total: Number(raw.total ?? 0),
      sources: (raw.sources ?? {}) as Record<string, number>,
      labels: (raw.labels ?? {}) as Record<string, number>,
    };
  },
);
