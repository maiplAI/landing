import { useEffect, useRef, useState } from "react";
import step1 from "@/assets/product/step1.png";
import step2 from "@/assets/product/step2.png";
import step3 from "@/assets/product/step3.png";

type Step = {
  n: string;
  label: string;
  title: string;
  line: string;
  src: string;
  alt: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    label: "connect",
    title: "Connect what your team already uses",
    line: "Jira, Google Docs, GitHub and PDFs — the sources of truth you already keep.",
    src: step1,
    alt: "maipl sources catalog showing Jira, Google Docs, PDF upload and GitHub connected",
  },
  {
    n: "02",
    label: "read on movement",
    title: "It reads only when something moves",
    line: "Edit a doc, move a ticket — maipl notices, then re-reads what changed.",
    src: step2,
    alt: "Since last read panel with per-source bars for documents, brief and Jira",
  },
  {
    n: "03",
    label: "the call",
    title: "Every initiative lands in a call",
    line: "Build, validate or hold — and the call goes back where the work happens.",
    src: step3,
    alt: "Artifact ontology map with build it, validate first and hold lanes",
  },
];

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="w-full block" />
    </div>
  );
}

export function Product() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const onChange = () => (reduceMotion.current = mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most-visible intersecting step
        let best: { index: number; ratio: number } | null = null;
        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.index);
          if (e.isIntersecting && (!best || e.intersectionRatio > best.ratio)) {
            best = { index: idx, ratio: e.intersectionRatio };
          }
        }
        if (best) setActive(best.index);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-30% 0px -30% 0px" }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="product" className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Mobile: stacked, no pinning */}
        <div className="md:hidden space-y-16">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-muted-foreground">{step.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {step.label}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight leading-snug">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.line}</p>
              <div className="mt-5">
                <Shot src={step.src} alt={step.alt} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: sticky scroll focus */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-12">
          {/* Pinned left column */}
          <div className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <div className="relative min-h-[420px]">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-all duration-500 ${
                    active === i
                      ? "opacity-100 translate-y-0"
                      : reduceMotion.current
                        ? "opacity-0"
                        : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground">{step.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.line}</p>
                </div>
              ))}
            </div>
            {/* step rail */}
            <div className="mt-8 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <span
                  key={s.n}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    active === i ? "w-10 bg-primary" : "w-5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scrolling right column */}
          <div className="md:col-span-7">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={i === 0 ? "pt-0" : "pt-28"}
              >
                <div className={i === STEPS.length - 1 ? "pb-0" : "pb-28"}>
                  <Shot src={step.src} alt={step.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
