import { AGENTS } from "./agents";

// Context remains an internal pipeline stage; publicly it is the shared layer.
export const PUBLIC_AGENTS = AGENTS.filter(agent => agent.id !== "context");
export const AGENT_CONTEXT_CONNECTIONS = PUBLIC_AGENTS.map(agent => ({
  agentId: agent.id,
  layerId: "context",
  direction: "bidirectional" as const,
}));