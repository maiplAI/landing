import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Product } from "@/components/landing/Product";
import { TheCall } from "@/components/landing/TheCall";
import { Footer } from "@/components/landing/CTA";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: "How MAiPL works — Evidence to product decisions" },
      {
        name: "description",
        content:
          "See how MAiPL connects product sources, reads changes, audits evidence, and turns context into build, validate, or hold decisions.",
      },
      { property: "og:title", content: "How MAiPL works — Evidence to product decisions" },
      {
        property: "og:description",
        content:
          "See how MAiPL connects product sources, reads changes, audits evidence, and turns context into build, validate, or hold decisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://maipltech.com/how-it-works" }],
  }),
});

function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
              How MAiPL works
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              From scattered evidence to a call your team can defend.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              MAiPL reads the sources your team already uses, follows what changed,
              and shows the evidence behind every build, validate, or hold decision.
            </p>
          </div>
        </section>
        <Product />
        <TheCall />
      </main>
      <Footer />
    </div>
  );
}