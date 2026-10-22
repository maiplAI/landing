import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { CTA, Footer } from "@/components/landing/CTA";
import { UseCaseScene } from "@/components/landing/UseCaseScene";
import { LaneMap } from "@/components/landing/usecase-visuals/LaneMap";
import { LifecycleStrip } from "@/components/landing/usecase-visuals/LifecycleStrip";
import { DecisionCard } from "@/components/landing/usecase-visuals/DecisionCard";
import { EvidenceShift } from "@/components/landing/usecase-visuals/EvidenceShift";
import { HistoryFeed } from "@/components/landing/usecase-visuals/HistoryFeed";

const TITLE = "Product decision workflows | MAiPL use cases";
const DESCRIPTION =
  "See how MAiPL turns connected product evidence into clear build, validate, hold, and drop decisions.";

export const Route = createFileRoute("/use-cases")({
  component: UseCasesPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://maipltech.com/use-cases" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://maipltech.com/use-cases" }],
  }),
});

function UseCasesPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
              use cases
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
              From scattered evidence to a decision your team can act on.
            </h1>
            <p className="mt-5 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
              MAiPL reads connected product sources, detects changes, weighs each initiative and
              shows the evidence behind every call.
            </p>
          </div>
        </section>

        <UseCaseScene
          index={1}
          time="Portfolio review"
          title="Decide which initiatives deserve the next sprint"
          situation="Your roadmap is split across Jira epics, planning briefs and product documents. Each initiative sounds important when reviewed on its own."
          moment="MAiPL reads them together and places every initiative into Build, Validate or Hold, with confidence and shared-evidence links visible at a glance."
          visual={<LaneMap />}
        />

        <UseCaseScene
          index={2}
          time="A source changes"
          title="See exactly why a verdict moved"
          situation="A Google Doc, Jira epic or other connected source changes. The team needs to know whether that change altered the evidence or the recommendation."
          moment="MAiPL detects the source movement, re-reads the stack and shows a compact run-to-run view of added, removed and unchanged facts alongside any verdict shift."
          visual={<LifecycleStrip />}
          flip
        />

        <UseCaseScene
          index={3}
          time="Initiative review"
          title="Pressure-test one product bet before committing"
          situation="A proposal has a persuasive narrative, but the team cannot tell whether demand, delivery cost and expected return are equally well supported."
          moment="MAiPL gives the initiative a clear call, evidence confidence and a three-axis read of the build case, cost case and return case, with its rationale beside it."
          visual={<DecisionCard />}
        />

        <UseCaseScene
          index={4}
          time="Evidence is thin"
          title="Turn uncertainty into a concrete validation plan"
          situation="A team is debating a promising idea, but the available material does not yet justify a confident build decision."
          moment="MAiPL traces the facts used in the call, exposes the blind spots and names what evidence would settle the build, cost or return question."
          visual={<EvidenceShift />}
          flip
        />

        <UseCaseScene
          index={5}
          time="Decision made"
          title="Carry the decision back into delivery"
          situation="The review is complete, but the reasoning will be lost if the team only receives a one-line recommendation in a meeting."
          moment="The PM affirms the call and MAiPL posts the verdict, supporting evidence and remaining gaps back onto the Jira ticket for the delivery team."
          visual={<HistoryFeed />}
        />

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
