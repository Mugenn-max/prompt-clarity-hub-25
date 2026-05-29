import { regionInsights, citations } from "@/data/learn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2 } from "lucide-react";

export default function Insights() {
  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3 gap-1"><Globe2 className="h-3 w-3" /> Insights</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI Readiness Around the World</h1>
        <p className="mt-3 text-muted-foreground">
          Contextual ecosystem observations, not rankings. We do not invent percentages or compare nations.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {regionInsights.map((r) => (
          <Card key={r.region}>
            <CardHeader>
              <CardTitle className="text-base">{r.region}</CardTitle>
              <CardDescription>{r.observation}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.sources}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Sources</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {citations.map((c) => (
            <Card key={c.org}>
              <CardHeader>
                <CardTitle className="text-sm">{c.org}</CardTitle>
                <CardDescription>{c.topic}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
