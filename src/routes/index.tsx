import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/Hero";
import { LivingGraph } from "@/components/landing/LivingGraph";
import { Footer } from "@/components/landing/CTA";
import { HomepageProof } from "@/components/landing/HomepageProof";
import { ContextTrap } from "@/components/landing/ContextTrap";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MAiPL — Turn product chaos into shared clarity" },
      {
        name: "description",
        content:
          "Explore MAiPL's shared context layer, four agents and evidence-backed product decisions. Discover whether you're in a Context Trap.",
      },
      { property: "og:title", content: "MAiPL — Turn product chaos into shared clarity" },
      {
        property: "og:description",
        content:
          "Explore MAiPL's shared context layer, four agents and evidence-backed product decisions. Discover whether you're in a Context Trap.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://maipltech.com/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://maipltech.com/" }],
  }),
});

function Index() {
  const [trapOpen, setTrapOpen] = useState(false);
  const trapRef = useRef<HTMLDivElement>(null);
  const openTrap = () => {
    setTrapOpen(true);
    window.requestAnimationFrame(() =>
      trapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <section className="relative w-full overflow-hidden border-b border-border bg-background" aria-labelledby="graph-heading">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-14 md:pt-20">
            <div className="grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
              <div><p className="font-mono text-[10px] uppercase text-primary">The Living Graph</p><h2 id="graph-heading" className="mt-4 font-display text-2xl font-medium leading-tight md:text-3xl">The work changes.<br />The connections matter.</h2></div>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">PM tools, docs, code repositories, customer feedback and analytics all shape the work. Their artifacts connect through shared context, bringing production-heavy work into focus.</p>
            </div>
            <LivingGraph />
          </div>
        </section>
        <HomepageProof />
        {trapOpen ? (
          <div ref={trapRef}>
            <ContextTrap />
          </div>
        ) : (
          <section className="w-full border-b border-border bg-background" aria-labelledby="trap-teaser-heading">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-6 py-16 text-center md:py-20">
              <p className="font-mono text-[10px] uppercase text-primary">Self check</p>
              <h2 id="trap-teaser-heading" className="font-display text-2xl font-medium leading-tight md:text-3xl">Are you in a Context Trap?</h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Five quick questions about how your team handles context — and what it might be costing you.</p>
              <Button size="lg" onClick={openTrap}>Reveal the check</Button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
