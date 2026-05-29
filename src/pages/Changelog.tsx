import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const items = [
  { v: "0.1.0", date: "Initial", notes: ["Prompt Audit and Response Audit (heuristic)", "Prompt Commons with curated samples", "Patterns, Learning Paths, Methodology", "Local-only analytics"] },
];

export default function Changelog() {
  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3">Changelog</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">What's new</h1>
        <p className="mt-3 text-muted-foreground">A short, honest log of project changes.</p>
      </header>
      <div className="mx-auto mt-10 max-w-3xl space-y-4">
        {items.map((i) => (
          <Card key={i.v}>
            <CardHeader>
              <CardTitle className="text-base">v{i.v}</CardTitle>
              <CardDescription>{i.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="ml-5 list-disc text-sm text-muted-foreground">
                {i.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
