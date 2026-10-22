import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/maipl-logo.png";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact support · maipl" },
      { name: "description", content: "Get in touch with the maipl team." },
    ],
  }),
});

const SUPPORT_EMAIL = "crjoshi@maipltech.com";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[maipl support] message from ${name || email}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background px-6 py-16">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <img src={logoAsset} alt="maipl" className="h-7 w-auto" />
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h1 className="text-2xl font-semibold tracking-tight">Contact support</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tell us what you're trying to do. We'll get back to you at the email you provide.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground">name</label>
              <input
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground">email</label>
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground">message</label>
              <textarea
                required
                minLength={5}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono resize-y"
              />
            </div>

            {sent && (
              <div className="text-xs text-muted-foreground font-mono">
                Your email client should have opened. If not, email us directly at{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline">
                  {SUPPORT_EMAIL}
                </a>
                .
              </div>
            )}

            <button
              type="submit"
              className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-mono font-medium hover:opacity-90 transition"
            >
              $ send-message
            </button>
          </form>

          <div className="mt-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground text-center">
            or email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-foreground hover:text-primary">{SUPPORT_EMAIL}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
