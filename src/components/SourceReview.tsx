import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, FileText, Plus, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HelpTip from "./HelpTip";
import {
  sourceRegistry,
  reviewWorkflow,
  reviewBadges,
  canUpdateSafely,
  shouldBeReviewed,
  type SourceStatus,
  type UpdateMode,
  type ReviewStatus,
} from "@/data/sources";

type Variant = "full" | "methodology" | "analytics";

const sourceStatusClass: Record<SourceStatus, string> = {
  "Official source": "bg-primary/10 text-primary border-primary/20",
  "Needs checking": "bg-warning/10 text-warning border-warning/30",
  Archived: "bg-muted text-muted-foreground border-border",
};

const reviewBadgeClass: Record<ReviewStatus, string> = {
  Published: "bg-primary/10 text-primary border-primary/20",
  Reviewed: "bg-success/10 text-success border-success/30",
  "Needs review": "bg-warning/10 text-warning border-warning/30",
  "Auto-drafted": "bg-secondary text-secondary-foreground border-border",
  Outdated: "bg-destructive/10 text-destructive border-destructive/30",
};

function SectionHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4 max-w-3xl">
      {eyebrow && <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
      <h3 className="mt-1 text-xl font-semibold tracking-tight">{title}</h3>
      {children && <p className="mt-2 text-sm text-muted-foreground">{children}</p>}
    </div>
  );
}

function SourceRegistry() {
  return (
    <section>
      <SectionHeader eyebrow="Source Registry" title="Where context comes from">
        Each card tracks a public framework or report ModelAudit references. Status and metadata can refresh; wording
        about regions or AI literacy stays under manual review.
      </SectionHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {sourceRegistry.map((s) => {
          const id = `src-${s.id}`;
          return (
            <Card key={s.id} id={id}>
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-base leading-tight">{s.title}</CardTitle>
                    <CardDescription>{s.organization}</CardDescription>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${sourceStatusClass[s.status]}`}
                  >
                    {s.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider">Type</span>
                    <span className="font-medium text-foreground/80">{s.type}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider">Last checked</span>
                    <span className="font-medium text-foreground/80 tabular-nums">{s.lastChecked}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Used for</span>
                  <span className="text-foreground/80">{s.usedFor}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                    {s.updateMode}
                    <HelpTip term={s.updateMode as UpdateMode} highlightId={id} />
                  </span>
                  {s.url ? (
                    <Button size="sm" variant="outline" asChild>
                      <a href={s.url} target="_blank" rel="noreferrer">
                        Open source <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="text-muted-foreground" disabled>
                      <Plus className="h-3.5 w-3.5" /> Add source link
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Source cards track where context comes from. They are not claims by themselves.
      </p>
    </section>
  );
}

function ReviewWorkflowFlow() {
  return (
    <section>
      <SectionHeader eyebrow="Review Workflow" title="Source update → Published, with a person in the loop">
        Reports and source metadata can change over time. ModelAudit treats new information as a draft first, so
        public insight cards do not change automatically without review.
      </SectionHeader>
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
        {reviewWorkflow.map((s, i) => (
          <div key={s.step} className="flex flex-1 items-stretch gap-2">
            <div className="flex flex-1 flex-col rounded-lg border border-border bg-card p-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Step {i + 1}
              </span>
              <span className="mt-0.5 text-sm font-medium">{s.step}</span>
              <span className="mt-1 text-xs text-muted-foreground">{s.desc}</span>
            </div>
            {i < reviewWorkflow.length - 1 && (
              <ArrowRight className="my-auto hidden h-4 w-4 shrink-0 text-muted-foreground md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BadgeLegend() {
  return (
    <section>
      <SectionHeader eyebrow="Review Status" title="What each badge means">
        Badges show how far a piece of content has moved through the review workflow.
      </SectionHeader>
      <div className="grid gap-2 sm:grid-cols-2">
        {reviewBadges.map((b) => {
          const id = `badge-${b.status.replace(/\s+/g, "-").toLowerCase()}`;
          const isTipped = ["Auto-drafted", "Needs review"].includes(b.status);
          return (
            <div
              key={b.status}
              id={id}
              className="flex items-start gap-3 rounded-lg border border-border p-3"
            >
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${reviewBadgeClass[b.status]}`}
              >
                {b.status}
              </span>
              <p className="flex-1 text-xs text-muted-foreground">{b.help}</p>
              {isTipped && <HelpTip term={b.status} highlightId={id} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CanUpdate() {
  return (
    <section>
      <SectionHeader eyebrow="Safe to refresh" title="What can update safely?">
        Metadata can refresh automatically. Interpretation should be reviewed.
      </SectionHeader>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {canUpdateSafely.map((c) => (
          <Card key={c.title}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm">{c.title}</CardTitle>
              <CardDescription className="text-xs">{c.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Example. </span>
        If the OECD publishes a newer digital economy report, the source card can show that a new source is available.
        The regional insight text should stay unchanged until reviewed.
      </div>
    </section>
  );
}

function ShouldReview() {
  return (
    <section>
      <SectionHeader eyebrow="Needs human review" title="What should be reviewed first?">
        These are the places where automation would create misleading claims. They stay with a person.
      </SectionHeader>
      <div className="grid gap-3 md:grid-cols-2">
        {shouldBeReviewed.map((c) => (
          <Card key={c.title}>
            <CardHeader>
              <CardTitle className="text-base">{c.title}</CardTitle>
              <CardDescription>{c.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-dashed border-border bg-muted/30 p-2 text-xs">
                <span className="font-medium">Example. </span>
                <span className="text-muted-foreground">{c.example}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="mb-8 max-w-3xl">
      <Badge variant="secondary" className="mb-3 gap-1">
        <ShieldCheck className="h-3 w-3" /> Source Review
      </Badge>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        Source tracking and interpretation, separated.
        <span className="ml-2 inline-flex align-middle">
          <HelpTip term="Source-backed summary" />
        </span>
      </h2>
      <p className="mt-3 text-muted-foreground">
        ModelAudit keeps source tracking and interpretation separate. Source links and metadata can be refreshed
        automatically. Regional summaries and AI-readiness interpretations are reviewed before publication, so the
        site stays current without publishing unsupported claims.
      </p>
    </div>
  );
}

export default function SourceReview({ variant = "full" }: { variant?: Variant }) {
  if (variant === "analytics") {
    return (
      <section className="space-y-6">
        <Header />
        <BadgeLegend />
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-medium">See the full source registry on Insights</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Source cards, review workflow, and the full breakdown live with the AI Readiness section.
          </p>
          <Button size="sm" variant="outline" className="mt-3" asChild>
            <Link to="/insights">Open Insights</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (variant === "methodology") {
    return (
      <section className="space-y-10">
        <Header />
        <SourceRegistry />
        <ReviewWorkflowFlow />
        <BadgeLegend />
      </section>
    );
  }

  return (
    <section className="space-y-12">
      <Header />
      <SourceRegistry />
      <ReviewWorkflowFlow />
      <BadgeLegend />
      <CanUpdate />
      <ShouldReview />
    </section>
  );
}
