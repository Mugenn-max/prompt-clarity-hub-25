import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { analyzePrompt } from "@/lib/clearv";
import { samplePrompts } from "@/data/prompts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClearVBar } from "@/components/ClearVBar";
import { Check, X, FlaskConical } from "lucide-react";

export default function PromptLab() {
  const [params] = useSearchParams();
  const seed = params.get("seed");
  const [text, setText] = useState("");

  useEffect(() => {
    if (seed) {
      const p = samplePrompts.find((x) => x.id === seed);
      if (p) setText(p.body);
    }
  }, [seed]);

  const live = useMemo(() => (text.trim() ? analyzePrompt(text) : null), [text]);

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3 gap-1"><FlaskConical className="h-3 w-3" /> PromptLab</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Build prompts that actually work.</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          PromptLab is your workspace for designing, testing, and refining prompts before you use them.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Draft</CardTitle>
            <CardDescription>Edit freely — the review updates as you type.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your prompt here. It can be a rough draft — that's what this is for."
              className="min-h-[320px] font-mono text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setText("")}>Clear</Button>
              <Button variant="outline" disabled>Compare versions <Badge variant="secondary" className="ml-2">Coming soon</Badge></Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">CLEAR-V Structure Review</CardTitle>
            <CardDescription>
              {live ? `Overall ${live.overall}/100` : "Paste a prompt and run an analysis to see its structure review here."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {live ? (
              <>
                <ClearVBar scores={live.scores} />
                <div className="space-y-2">
                  {live.feedback.map((f) => (
                    <div key={f.dim} className="flex items-start gap-2 rounded-md border border-border p-2 text-sm">
                      {f.ok
                        ? <Check className="mt-0.5 h-4 w-4 text-success shrink-0" />
                        : <X className="mt-0.5 h-4 w-4 text-destructive shrink-0" />}
                      <span><span className="font-medium capitalize">{f.dim}:</span> {f.note}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Empty state — start typing or paste a draft to see live feedback.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
