import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="font-semibold">ModelAudit</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Open-source AI workflow auditing. Test prompts. Check responses. Improve workflows.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Audit</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/prompt-audit" className="hover:text-foreground text-foreground/70">Prompt Audit</Link></li>
            <li><Link to="/response-audit" className="hover:text-foreground text-foreground/70">Response Audit</Link></li>
            <li><Link to="/lab" className="hover:text-foreground text-foreground/70">PromptLab</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Learn</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/learn" className="hover:text-foreground text-foreground/70">Learning Paths</Link></li>
            <li><Link to="/methodology" className="hover:text-foreground text-foreground/70">Methodology</Link></li>
            <li><Link to="/patterns" className="hover:text-foreground text-foreground/70">Prompt Patterns</Link></li>
            <li><Link to="/insights" className="hover:text-foreground text-foreground/70">Insights</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground text-foreground/70">GitHub</a></li>
            <li><Link to="/changelog" className="hover:text-foreground text-foreground/70">Changelog</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-foreground/70">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} ModelAudit. Curated open-source examples. No fake metrics, no scraped proprietary content.
        </div>
      </div>
    </footer>
  );
}
