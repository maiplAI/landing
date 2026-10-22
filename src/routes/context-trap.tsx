import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/CTA";
import { ContextTrap } from "@/components/landing/ContextTrap";

const TITLE = "The Context Trap — Where does your product context live?";
const DESC =
  "Your product context isn't missing, it's fragmented. Take the 30-second Context Trap check and find out how scattered your team's product context really is.";

export const Route = createFileRoute("/context-trap")({
  component: ContextTrapPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://maipltech.com/context-trap" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://maipltech.com/context-trap" }],
  }),
});

function ContextTrapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <ContextTrap />
      </main>
      <Footer />
    </div>
  );
}
