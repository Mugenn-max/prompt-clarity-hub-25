import { patterns } from "@/data/patterns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PromptPatterns() {
  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3">Patterns</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Prompt Pattern Library</h1>
        <p className="mt-3 text-muted-foreground">
          Reusable structures that solve recurring prompt problems. Mix, match, and adapt to your task.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {patterns.map((p) => (
          <Card key={p.id} className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="text-base">{p.name}</CardTitle>
              <CardDescription>{p.what}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">When to use</div>
                <p className="mt-1">{p.when}</p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Template</div>
                <pre className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-3 font-mono text-xs">{p.template}</pre>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Strengthens:</span>
                {p.strengths.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">If missing</div>
                <p className="mt-1 text-muted-foreground">{p.failure}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
