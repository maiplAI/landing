import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/CTA";
import { Button } from "@/components/ui/button";
import { PLAN_PRICING, annualSavings, contributorPrice, formatInr, type BillingPeriod } from "@/lib/pricing";

const title = "Pricing & plans | MAiPL";
const description = "Compare MAiPL Team, Business and Enterprise pricing in INR, with three-month quarterly commitments and annual plans for evidence-led product teams.";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://maipltech.com/pricing" }],
  }),
});

type Plan = {
  name: string;
  line: string;
  summary: string;
  price: Record<BillingPeriod, string>;
  capacity: string;
  details: string[];
  level: number;
};

const plans: Plan[] = [
  {
    name: "Team",
    line: "MAiPL connects the dots.",
    summary: "Bring a team's sources into one context map, trace evidence back to its origin, and make a more informed call.",
    price: { quarterly: formatInr(PLAN_PRICING.Team.quarterly), annually: formatInr(PLAN_PRICING.Team.annually) },
    capacity: "1 team · 4 contributors included · unlimited viewers",
    details: ["Core integrations and context map", "Evidence Graph with source citations", "Agentic retrieval and Verdict Matrix", "Basic evidence governance"],
    level: 2,
  },
  {
    name: "Business",
    line: "MAiPL tests the evidence.",
    summary: "Work across five teams and go further: surface contradictions, see what evidence is missing, and follow what changed between runs.",
    price: { quarterly: formatInr(PLAN_PRICING.Business.quarterly), annually: formatInr(PLAN_PRICING.Business.annually) },
    capacity: "5 teams · 30 contributors included (6 per team) · unlimited viewers",
    details: ["Everything in Team", "Contradiction detection and evidence gap analysis", "Run-to-run evidence changes", "Advanced governance and priority support"],
    level: 3,
  },
  {
    name: "Enterprise",
    line: "MAiPL fits your organization.",
    summary: "Carry the evidence-led workflow across your organization with a tailored team footprint and enterprise controls.",
    price: { quarterly: "Custom pricing", annually: "Custom pricing" },
    capacity: "Custom teams and contributors · unlimited viewers",
    details: ["Everything in Business", "SSO and SCIM", "Enterprise governance and audit controls", "Dedicated support and custom deployment"],
    level: 4,
  },
];

function ContextMapGlyph() {
  return (
    <svg viewBox="0 0 120 40" className="mx-auto h-7 w-auto text-primary" aria-hidden="true">
      <line x1="12" y1="8" x2="58" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <line x1="12" y1="32" x2="58" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <line x1="62" y1="20" x2="108" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <line x1="62" y1="20" x2="108" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="12" cy="8" r="3" fill="currentColor" opacity="0.65" />
      <circle cx="12" cy="32" r="3" fill="currentColor" opacity="0.65" />
      <circle cx="60" cy="20" r="4.5" fill="currentColor" />
      <circle cx="108" cy="12" r="3" fill="currentColor" opacity="0.65" />
      <circle cx="108" cy="30" r="3" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

function Visual({ index }: { index: number }) {
  const plan = plans[index];
  return (
    <div className="rounded-lg border border-border bg-gradient-to-br from-secondary/30 to-transparent" aria-label={`${plan.name} conceptual workflow`}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        <span>MAiPL / {plan.name}</span>
        <span>Conceptual view</span>
      </div>
      <div className="px-4 py-4 sm:px-5">
        {index === 0 && (
          <div className="grid gap-3 sm:grid-cols-[auto_auto_auto_auto_auto] sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              {["Documents", "Work signals", "PDFs & imports"].map((source) => (
                <div key={source} className="border border-border bg-background px-3 py-1 text-xs">{source}</div>
              ))}
            </div>
            <ArrowRight size={13} className="mx-auto hidden text-primary sm:block" />
            <div className="border border-primary/50 bg-primary/5 px-4 py-2.5 text-center">
              <ContextMapGlyph />
              <p className="mt-0.5 font-display text-xs font-semibold">Context Map</p>
              <p className="text-[10px] text-muted-foreground">provenance on every link</p>
            </div>
            <ArrowRight size={13} className="mx-auto hidden text-primary sm:block" />
            <div className="border border-border bg-background px-4 py-2.5 text-center">
              <p className="font-display text-xs font-semibold">Decision</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">verdict → source, one click</p>
            </div>
          </div>
        )}
        {index === 1 && (
          <div className="grid gap-3 sm:grid-cols-[auto_auto_auto] sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <div className="border border-border bg-background px-3 py-1 text-xs">
                <span className="font-mono text-[9px] uppercase text-muted-foreground">Evidence A</span>
                <span className="ml-2">Supports the claim</span>
              </div>
              <div className="border border-border bg-background px-3 py-1 text-xs">
                <span className="font-mono text-[9px] uppercase text-muted-foreground">Evidence B</span>
                <span className="ml-2">Challenges it — newer revision</span>
              </div>
            </div>
            <ArrowRight size={13} className="mx-auto hidden text-primary sm:block" />
            <div className="border border-primary/50 bg-primary/5 px-4 py-2.5">
              <div className="grid gap-1.5 sm:grid-cols-2">
                <div className="border-l-2 border-warning bg-background px-2 py-1 text-xs">Contradiction found</div>
                <div className="border-l-2 border-primary bg-background px-2 py-1 text-xs">Claim left without a source</div>
              </div>
              <div className="mt-2 space-y-1 border-t border-border pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 font-mono text-[9px] uppercase text-muted-foreground">Run 1</span>
                  <span className="flex h-1 flex-1 gap-0.5"><span className="flex-1 bg-primary/70" /><span className="flex-1 bg-primary/70" /><span className="flex-1 bg-primary/70" /><span className="flex-1 bg-primary/70" /></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 font-mono text-[9px] uppercase text-muted-foreground">Run 2</span>
                  <span className="flex h-1 flex-1 gap-0.5"><span className="flex-1 bg-primary/70" /><span className="flex-1 bg-primary/70" /><span className="flex-1 bg-warning" /><span className="flex-1 bg-primary/70" /></span>
                </div>
                <p className="font-mono text-[9px] uppercase text-muted-foreground">one source changed · verdict re-tested</p>
              </div>
            </div>
          </div>
        )}
        {index === 2 && (
          <div className="grid gap-3 sm:grid-cols-[auto_auto_auto_auto_auto] sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              {["Team 01", "Team 02", "More teams"].map((team, i) => (
                <div key={team} className={`px-3 py-1 text-xs ${i === 2 ? "border border-dashed border-border text-muted-foreground" : "border border-border bg-background"}`}>{team}</div>
              ))}
            </div>
            <ArrowRight size={13} className="mx-auto hidden text-primary sm:block" />
            <div className="border border-primary/50 bg-primary/5 px-4 py-2.5 text-center">
              <p className="font-display text-xs font-semibold">Shared context</p>
              <p className="text-[10px] text-muted-foreground">one evidence standard</p>
            </div>
            <ArrowRight size={13} className="mx-auto hidden text-primary sm:block" />
            <div className="border border-border bg-background px-4 py-2.5 text-center">
              <p className="font-display text-xs font-semibold">Controls</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">SSO · SCIM · Audit</p>
            </div>
          </div>
        )}
        <p className="mt-3 border-t border-border pt-2.5 text-xs leading-relaxed text-muted-foreground">
          {index === 0 && <>Every decision keeps its receipts. Trace any verdict back to the exact document, note, or commit that produced it — before you defend it in a room.</>}
          {index === 1 && <>When two sources disagree, MAiPL shows you the disagreement, not an average of it. And when evidence shifts between runs, you see exactly what moved.</>}
          {index === 2 && <>One evidence standard across every team — and audit can replay how any decision was reached, step by step.</>}
        </p>
      </div>
    </div>
  );
}

function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>("quarterly");
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-12 md:pt-20">
          <div className="mb-10 md:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-wide text-primary">Plans & pricing</p>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl">Choose how far MAiPL goes with your team.</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">Build context across a quarter. Carry it forward across the year.</p>
            <div className="mt-6 inline-flex border border-border bg-secondary p-1" role="group" aria-label="Billing period">
              <Button type="button" size="sm" variant={billing === "quarterly" ? "default" : "ghost"} onClick={() => setBilling("quarterly")} aria-pressed={billing === "quarterly"}>Quarterly · 3 months</Button>
              <Button type="button" size="sm" variant={billing === "annually" ? "default" : "ghost"} onClick={() => setBilling("annually")} aria-pressed={billing === "annually"}>Annually</Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {billing === "quarterly" ? "Billed upfront for three months." : "Billed upfront for twelve months · save approximately 17% compared with four quarters."}
            </p>
          </div>

          <div className="border-y border-border">
            {plans.map((plan, index) => (
              <section key={plan.name} aria-labelledby={`plan-${index}`} className={index > 0 ? "border-t border-border" : undefined}>
                <Button
                  type="button"
                  variant="ghost"
                  aria-expanded={expanded === index}
                  aria-controls={`plan-detail-${index}`}
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className={`h-auto w-full flex-col items-start gap-3 whitespace-normal rounded-none px-4 py-6 text-left transition-colors md:grid md:grid-cols-[2.5rem_7rem_minmax(0,1fr)_auto_8.5rem_1.5rem] md:items-center md:gap-6 md:py-7 ${expanded === index ? "bg-secondary/30" : "hover:bg-secondary/20"}`}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{plan.name}</span>
                  <span id={`plan-${index}`} className="min-w-0 font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">{plan.line}</span>
                  <span className="flex items-center gap-1" aria-hidden="true">
                    {Array.from({ length: 4 }, (_, segment) => <span key={segment} className={`h-1.5 w-4 rounded-full ${segment < plan.level ? "bg-primary" : "bg-secondary"}`} />)}
                  </span>
                  <span className="whitespace-nowrap text-right">
                    <span className="block font-display text-lg font-medium text-foreground md:text-xl">{plan.price[billing]}</span>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{index < 2 ? (billing === "quarterly" ? "/ quarter" : "/ year") : "talk to us"}</span>
                  </span>
                  <ChevronDown size={16} className={`shrink-0 justify-self-end text-muted-foreground transition-transform ${expanded === index ? "rotate-180" : ""}`} />
                </Button>
                {expanded === index && (
                  <div id={`plan-detail-${index}`} className="animate-fade-in px-4 pb-9 pt-1">
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{plan.summary}</p>
                    <div className="mt-5 grid gap-8 lg:grid-cols-12">
                      <div className="lg:col-span-7">
                        <Visual index={index} />
                      </div>
                      <div className="flex flex-col gap-6 lg:col-span-5">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">People included</p>
                          <p className="mt-2 text-sm leading-relaxed">{plan.capacity}</p>
                          {index < 2 && <>
                            <p className="mt-1.5 text-xs text-muted-foreground">Additional team member: {formatInr(contributorPrice(index === 0 ? "Team" : "Business", billing))} / {billing === "quarterly" ? "quarter" : "year"}</p>
                            {billing === "annually" && <p className="mt-1.5 text-xs text-primary">Save {annualSavings(index === 0 ? "Team" : "Business")}% versus four quarters.</p>}
                          </>}
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">What's included</p>
                          <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
                            {plan.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />{detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-auto">
                          <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90 md:w-auto md:px-8">
                            <Link to="/contact" className="text-xs font-medium uppercase tracking-widest">Talk about {plan.name} <ArrowRight /></Link>
                          </Button>
                          {index === 1 && <p className="mt-2.5 text-xs text-muted-foreground">Advanced integrations are subject to availability.</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
