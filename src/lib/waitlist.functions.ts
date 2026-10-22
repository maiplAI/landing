import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { publicSupabase } from "./supabase-public";

const LINKEDIN_RE =
  /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_\-%-]+\/?$/;

const InputSchema = z.object({
  email: z.string().email().max(255),
  linkedin_url: z.string().max(255).regex(LINKEDIN_RE),
  name: z.string().max(100).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  note: z.string().max(1000).optional().nullable(),
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !publishableKey) {
      throw new Error(
        "Waitlist backend not configured: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.",
      );
    }
    const supabase = publicSupabase(url, publishableKey);
    const email = data.email.trim().toLowerCase();
    const linkedin_url = data.linkedin_url.trim();
    const name = data.name?.trim() || null;
    const company = data.company?.trim() || null;
    const note = data.note?.trim() || null;

    const { error } = await supabase.from("waitlist").insert({
      email,
      linkedin_url,
      name,
      company,
      note,
    });
    if (error) {
      if (error.code === "23505") {
        return { ok: true, duplicate: true as const };
      }
      throw new Error(error.message);
    }

    return { ok: true, duplicate: false as const };
  });
