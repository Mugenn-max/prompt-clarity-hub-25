import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clearVDimensions } from "@/lib/clearv";
import { citations } from "@/data/learn";

const map = [
  { dim: "Clarity", maps: "communication precision" },
  { dim: "Evidence", maps: "critical verification" },
  { dim: "Validation", maps: "reflective thinking" },
  { dim: "Risk", maps: "responsible AI use" },
  { dim: "Audience", maps: "contextual reasoning" },
  { dim: "Limits & Format", maps: "structured communication" },
];

export default function Methodology() {
  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3">Methodology</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">How ModelAudit evaluates prompts and responses.</h1>
        <p className="mt-3 text-muted-foreground">
          A transparent rubric beats a black-box score. Here's how CLEAR-V works, what it does, and what it does not.
        </p>
      </header>

      <section className="mx-auto mt-10 max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>The CLEAR-V rubric</CardTitle>
            <CardDescription>Six dimensions covering structure, reasoning, and responsibility.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {clearVDimensions.map((d) => (
              <div key={d.key} className="rounded-md border border-border p-3">
                <div className="font-medium">{d.label}</div>
                <div className="text-xs text-muted-foreground">{d.desc}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why a rubric matters</CardTitle>
            <CardDescription>
              Without shared criteria, "good prompt" means different things to different people. A rubric makes the
              conversation specific and the feedback teachable.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How scores are generated</CardTitle>
            <CardDescription>
              Scores come from transparent client-side heuristics that look for structural signals: role, task,
              audience, output format, evidence requirements, validation steps, and risk handling. Every score is
              accompanied by the rule that triggered it.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
            <CardDescription>
              CLEAR-V analyzes structure, not factual accuracy or model output quality. It is a teaching and review
              tool. It does not run the model, does not fact-check, and does not certify prompts. There is no
              human-expert review and no multi-model testing today.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CLEAR-V and AI literacy</CardTitle>
            <CardDescription>How each dimension maps to broader AI-literacy competencies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {map.map((m) => (
              <div key={m.dim} className="flex items-center justify-between rounded-md border border-border p-2 text-sm">
                <span className="font-medium">{m.dim}</span>
                <span className="text-muted-foreground">→ {m.maps}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-3 text-lg font-semibold">References</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            ModelAudit draws on widely cited AI-literacy and digital-skills frameworks. No statistics or claims are
            invented; sources are listed for transparency.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {citations.map((c) => (
              <Card key={c.org}>
                <CardHeader>
                  <CardTitle className="text-sm">{c.org}</CardTitle>
                  <CardDescription>{c.topic}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
