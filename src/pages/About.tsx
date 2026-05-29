import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3">About</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">About ModelAudit</h1>
        <p className="mt-3 text-muted-foreground">
          ModelAudit is an open-source AI workflow auditing platform for testing prompts, checking AI responses,
          learning prompt literacy, and improving reusable AI workflows. The methodology is transparent and the
          examples are curated.
        </p>
      </header>
      <div className="mx-auto mt-8 grid max-w-3xl gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">What we don't do</CardTitle>
            <CardDescription>
              We don't host leaked prompts, scrape paid prompt packs, fabricate user counts, or claim verification we
              can't deliver. We don't run real multi-model tests today, and we don't claim human-expert review.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">What we do</CardTitle>
            <CardDescription>
              Provide a clear rubric, curated examples, learning paths, and local-first auditing tools. Treat external
              references as inspiration or citations, not as content to copy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild><a href="https://github.com" target="_blank" rel="noreferrer">View on GitHub</a></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
