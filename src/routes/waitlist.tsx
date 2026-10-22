import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { joinWaitlist } from "@/lib/waitlist.functions";
import logoAsset from "@/assets/maipl-logo.png";
import { PLATFORM_URL } from "@/lib/platform";

export const Route = createFileRoute("/waitlist")({
  component: WaitlistPage,
  head: () => ({
    meta: [
      { title: "Join the waitlist · maipl" },
      {
        name: "description",
        content:
          "Get early access to maipl — the context engine for product and engineering teams. Be first when the MVP goes live.",
      },
      { property: "og:title", content: "Join the maipl waitlist" },
      {
        property: "og:description",
        content: "Early access to the context engine for product and engineering teams.",
      },
    ],
  }),
});

function WaitlistPage() {
  const join = useServerFn(joinWaitlist);
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const res = await join({
        data: {
          email,
          linkedin_url: linkedin.trim(),
          name: name || null,
          company: company || null,
          note: note || null,
        },
      });
      setState("done");
      setMessage(
        res.duplicate
          ? "You're already on the list — we'll be in touch."
          : "You're on the list. We'll email you when maipl is live.",
      );
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background px-6 py-16">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <img src={logoAsset} alt="maipl" className="h-7 w-auto" />
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="inline-flex items-center gap-2 h-6 px-2 rounded-full border border-primary/30 bg-primary/10 font-mono text-[10px] uppercase tracking-wider text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
            early access
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Join the waitlist</h1>
          <p className="text-sm text-muted-foreground mt-1">
            maipl is the context engine for product and engineering teams. Drop your details —
            we'll email you the moment the MVP goes live.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="email" required>
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-mono focus:border-primary/60 outline-none"
              />
            </Field>
            <Field label="linkedin profile url" required>
              <input
                type="url"
                required
                maxLength={255}
                placeholder="https://linkedin.com/in/your-name"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-mono focus:border-primary/60 outline-none"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="name">
                <input
                  type="text"
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-mono focus:border-primary/60 outline-none"
                />
              </Field>
              <Field label="company">
                <input
                  type="text"
                  maxLength={100}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-mono focus:border-primary/60 outline-none"
                />
              </Field>
            </div>
            <Field label="what would you use maipl for? (optional)">
              <textarea
                maxLength={1000}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono resize-y focus:border-primary/60 outline-none"
              />
            </Field>

            {message && (
              <div
                className={`text-xs font-mono ${
                  state === "error" ? "text-danger" : "text-primary"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={state === "loading" || state === "done"}
              className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-mono font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {state === "loading"
                ? "submitting…"
                : state === "done"
                  ? "on the list"
                  : "join the waitlist"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs font-mono text-muted-foreground">
            Already approved?{" "}
            <a href={`${PLATFORM_URL}/login`} className="hover:text-foreground underline underline-offset-4">
              Sign in →
            </a>
          </p>
          <p className="mt-3 text-center text-xs font-mono text-muted-foreground">
            <Link to="/security" className="hover:text-foreground underline underline-offset-4">
              security &amp; data handling
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-mono text-muted-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
