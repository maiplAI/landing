import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

/**
 * A Supabase client with the public (publishable) key, for the site's server
 * functions. Node 20 has no global WebSocket and supabase-js refuses to create
 * a client without one, even though these functions never use realtime; `ws`
 * gives it a transport, so the site runs on Node 20 and 22 alike.
 */
export function publicSupabase(url: string, publishableKey: string) {
  return createClient(url, publishableKey, {
    auth: { persistSession: false },
    realtime: { transport: WebSocket as never },
  });
}
