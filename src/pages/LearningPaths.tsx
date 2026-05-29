import { learningPaths } from "@/data/learn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LearningPaths() {
  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3">Learn</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Learning Paths</h1>
        <p className="mt-3 text-muted-foreground">
          Five paths from prompt basics to responsible AI use. Short modules, plain language, real examples.
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {learningPaths.map((path) => (
          <section key={path.id}>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{path.title}</h2>
              <p className="text-sm text-muted-foreground">{path.summary}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {path.modules.map((m) => (
                <Card key={m.title}>
                  <CardHeader>
                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{m.level}</Badge>
                      <span>{m.minutes} min read</span>
                    </div>
                    <CardTitle className="text-base">{m.title}</CardTitle>
                    <CardDescription>{m.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs text-muted-foreground">Module preview — full content coming soon.</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
