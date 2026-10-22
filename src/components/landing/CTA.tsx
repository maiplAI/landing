import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/maipl-logo.png";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-border bg-card/60 font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
          private beta · early cohort forming
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.08] text-balance">
          Turn product chaos
          <br />
          <span className="text-primary italic">into shared clarity.</span>
        </h2>
        <p className="mt-6 text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Early cohorts are small on purpose. Get in line, and help decide what
          the reasoning layer for product teams should actually do.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/waitlist"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-signal"
          >
            Access Platform
            <span className="font-mono transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
        <p className="mt-6 text-xs font-mono text-muted-foreground">
          join the waitlist — approved emails can sign in from there.
        </p>

      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
        <div className="flex items-center gap-2">
          <img src={logoAsset} alt="maipl" className="h-5 w-auto" />
          <span>© 2026</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link to="/how-it-works" hash="product" className="hover:text-foreground">product</Link>
          <Link to="/context-trap" className="hover:text-foreground">context trap</Link>
          <Link to="/security" className="hover:text-foreground">security</Link>
          <Link to="/pricing" className="hover:text-foreground">pricing</Link>
          <Link to="/waitlist" className="hover:text-foreground">waitlist</Link>
          <Link to="/contact" className="hover:text-foreground">contact</Link>
        </div>
      </div>
    </footer>
  );
}
