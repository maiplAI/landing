import { createFileRoute, Link } from "@tanstack/react-router";

import { Footer } from "@/components/landing/CTA";
import { Nav } from "@/components/landing/Nav";

export const Route = createFileRoute("/security")({
  component: SecurityPage,
  head: () => ({
    meta: [
      { title: "Security & data handling · MAiPL" },
      {
        name: "description",
        content:
          "How MAiPL reads connected sources, what it stores, who can see it, and how evidence stays traceable to its origin.",
      },
      { property: "og:title", content: "Security & data handling · MAiPL" },
      {
        property: "og:description",
        content:
          "Read-only sources, cited evidence, per-account separation, and pilot limits — written for security reviewers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const SECTIONS: Array<{ n: string; title: string; body: string[] }> = [
  {
    n: "01",
    title: "What MAiPL reads",
    body: [
      "Only the sources an account explicitly connects — a project tracker, a docs workspace, a code repository, a product-analytics workspace, or documents shared with it.",
      "Access is read-only. MAiPL does not write back to a connected source, and it does not execute code from a repository.",
      "Reading is event-driven, not scheduled scraping. MAiPL watches for genuine movement in a connected source and reads only when something actually changed.",
    ],
  },
  {
    n: "02",
    title: "What is stored",
    body: [
      "Short extracted statements of fact, each kept with a link back to the exact place it came from, so any claim can be opened at its origin.",
      "The relationships between those facts, the initiatives they support, and the decision history — which call was made, when, and on what evidence.",
      "Usage counters for the pilot limits. Connection credentials are held in encrypted form and are never displayed back in readable text.",
      "MAiPL does not keep full copies of source repositories, and does not build a hidden profile of individuals.",
    ],
  },
  {
    n: "03",
    title: "Who can see it",
    body: [
      "Each account's data is separated in the database and enforced at the row level: an account can read only its own rows.",
      "Server-side code reaches data only on behalf of an authenticated account. The browser never holds another account's data.",
      "There is no self-serve deletion button because there is no hidden store to reclaim: everything MAiPL holds is visible and cited inside the product, and disconnecting a source stops the reading. If you want an account's working data removed, ask and it is removed.",
    ],
  },
  {
    n: "04",
    title: "Model use",
    body: [
      "Extracted material is sent to a model provider for reasoning only, through a single server-side gateway. It is not used to train models.",
      "No verdict is generated from the model's general knowledge alone. Every call is grounded in cited evidence you can open, and where an attribute has no evidence behind it, MAiPL says so and holds the call back rather than guessing.",
    ],
  },
  {
    n: "05",
    title: "Pilot limits and supervision",
    body: [
      "Each pilot account has a ceiling on connected sources, on monthly reads, and on artifact updates, enforced on the server — reading stops when a ceiling is reached.",
      "Access is granted per email address by an administrator. There is no open sign-up into the platform.",
      "An administrator view shows, per person, connected sources, reads and artifact updates consumed, and the decision history can be exported for your own records.",
    ],
  },
];

function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28 md:pt-32">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          security &amp; data handling
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
          What MAiPL reads, what it keeps,
          <br className="hidden md:block" /> and what it never does.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Written for the person on the other side of a security review. Everything below
          describes how the platform behaves today in pilot.
        </p>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.n} className="rounded-lg border border-border bg-card/40 p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                <h2 className="text-lg font-semibold tracking-tight">{s.title}</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {s.body.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold tracking-tight">Questions from your security team</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Certifications, data-processing agreements and deployment arrangements are handled per
            engagement during the pilot conversation.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Talk to us
            </Link>
            <Link
              to="/waitlist"
              className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm transition hover:bg-secondary"
            >
              Request pilot access
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
