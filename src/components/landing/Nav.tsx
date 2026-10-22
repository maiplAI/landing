import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/maipl-logo.png";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logoAsset} alt="maipl" className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/how-it-works" hash="product" resetScroll className="hover:text-foreground transition-colors">Product</Link>
            <Link to="/use-cases" className="hover:text-foreground transition-colors">Use cases</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <Link
            to="/waitlist"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-primary text-primary-foreground text-xs font-mono font-medium hover:opacity-90 transition-opacity shadow-signal"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-background/70 animate-pulse-dot" />
            Access Platform
          </Link>
        </div>

      </div>
    </header>
  );
}
