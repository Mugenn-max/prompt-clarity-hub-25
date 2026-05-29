import { Link } from "react-router-dom";
import {
  ArrowRight,
  Beaker,
  BookOpen,
  Compass,
  FileSearch,
  GitFork,
  LineChart,
  ListChecks,
  MessageSquareCode,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { starterPacks } from "@/data/packs";

const features = [
  { icon: ShieldCheck, title: "Prompt Audit", desc: "Score prompts against CLEAR-V before running them.", to: "/prompt-audit" },
  { icon: FileSearch, title: "Response Audit", desc: "Evaluate AI responses for completeness, evidence, framing, and format.", to: "/response-audit" },
  { icon: Compass, title: "Prompt Commons", desc: "Browse curated reusable prompt examples and workflow starters.", to: "/commons" },
  { icon: Beaker, title: "PromptLab", desc: "Practice, compare, and refine prompts before saving what works.", to: "/lab" },
  { icon: LineChart, title: "Analytics", desc: "Track your local audit history and improvement patterns.", to: "/analytics" },
  { icon: BookOpen, title: "Learn", desc: "Build prompt literacy and responsible AI habits.", to: "/learn" },
];

const whyMatters = [
  { title: "Weak instructions", desc: "Vague verbs and missing roles produce generic, drifting answers." },
  { title: "Missing evidence requests", desc: "Without a citation rule, models present guesses as facts." },
  { title: "Ambiguous outputs", desc: "No format means prose where you needed a list, JSON, or table." },
  { title: "Unsupported claims", desc: "Confident language hides the absence of any source." },
  { title: "Unsafe assumptions", desc: "Implicit audience and context lead to risky defaults." },
  { title: "Inconsistent AI outputs", desc: "Re-runs disagree because the prompt left room to drift." },
];

const chain = ["Role", "Task", "Context", "Constraints", "Output", "Validation"];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-surface">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-5 gap-1">
              <Sparkles className="h-3 w-3" /> Open-source AI workflow auditing
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Test prompts.{" "}
              <span className="gradient-text">Check responses.</span>{" "}
              Improve AI workflows.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              ModelAudit helps you audit prompts, evaluate AI responses, and build reusable AI workflows
              through transparent CLEAR-V feedback.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/prompt-audit">Start a Prompt Audit <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/commons">Explore Prompt Commons</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No signup. Local-first. Curated examples only — no scraped or leaked prompts.
            </p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.title} to={f.to} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {f.title}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why prompt auditing matters */}
      <section className="border-y border-border bg-muted/30">
        <div className="container py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Why prompt auditing matters</h2>
            <p className="mt-3 text-muted-foreground">
              Most bad AI output isn't a model problem — it's a prompt problem. CLEAR-V names the failures so you can fix them.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyMatters.map((w) => (
              <Card key={w.title}>
                <CardHeader>
                  <CardTitle className="text-base">{w.title}</CardTitle>
                  <CardDescription>{w.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Starter packs */}
      <section className="container py-16">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Starter packs</h2>
            <p className="mt-3 text-muted-foreground">
              Curated bundles of prompts, workflows, and learning notes for common use cases.
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link to="/commons">Browse all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {starterPacks.map((p) => (
            <Card key={p.id} className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-base">{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link to={`/commons?pack=${p.id}`}>Open pack</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prompt patterns preview */}
      <section className="border-y border-border bg-muted/30">
        <div className="container py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Prompt patterns</h2>
            <p className="mt-3 text-muted-foreground">
              Most strong prompts move through the same backbone. Learn it once, reuse it everywhere.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {chain.map((c, i) => (
              <div key={c} className="flex items-center gap-2">
                <div className="card-elevated px-4 py-3 text-sm font-medium">{c}</div>
                {i < chain.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
          <Button variant="outline" asChild className="mt-8">
            <Link to="/patterns">See all patterns</Link>
          </Button>
        </div>
      </section>

      {/* Open source */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Built in the open</h2>
            <p className="mt-3 text-muted-foreground">
              ModelAudit is an open-source project. The methodology is documented, the rubric is transparent, and the
              prompt examples are curated. Community submissions and contribution guidelines are part of the roadmap.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="https://github.com" target="_blank" rel="noreferrer">View on GitHub</a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/methodology">Read methodology</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: ListChecks, label: "Transparent rubric" },
              { icon: Workflow, label: "Reusable workflows" },
              { icon: GitFork, label: "Fork & adapt" },
              { icon: MessageSquareCode, label: "Contribution guidelines" },
            ].map((c) => (
              <Card key={c.label}>
                <CardHeader>
                  <c.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm">{c.label}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
