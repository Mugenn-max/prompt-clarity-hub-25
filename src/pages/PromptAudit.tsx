import { useMemo, useState } from "react";
import { analyzePrompt } from "@/lib/clearv";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClearVBar } from "@/components/ClearVBar";
import { Check, X, Sparkles, Lock } from "lucide-react";

export default function PromptAudit() {
  const [text, setText] = useState("");
  const [ran, setRan] = useState(false);
  const result = useMemo(() => (ran ? analyzePrompt(text) : null), [text, ran]);
  const short = text.trim().length > 0 && text.trim().split(/\s+/).length < 5;

  function run() {
    if (!text.trim()) return;
    setRan(true);
    try {
      const stored = JSON.parse(localStorage.getItem("ma_audits") || "[]");
      stored.unshift({ ts: Date.now(), kind: "prompt", overall: analyzePrompt(text).overall, len: text.length });
      localStorage.setItem("ma_audits", JSON.stringify(stored.slice(0, 100)));
    } catch {}
  }

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3">Prompt Audit</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Test your prompt before you run it.</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Paste a prompt and get a structural CLEAR-V review. This is a heuristic structural check — not a guarantee
          of model output quality.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Your prompt</CardTitle>
            <CardDescription>Paste a draft. Rough is fine — that's what this is for.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="You are a research assistant. Summarize the following sources for a non-expert reader. For every claim, cite the source..."
              className="min-h-[260px] font-mono text-sm"
            />
            {!text.trim() && (
              <p className="text-xs text-muted-foreground">Empty prompt — paste or type something to audit.</p>
            )}
            {short && (
              <p className="text-xs text-warning">Prompt looks short. Try adding a role, audience, and output format.</p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={run} disabled={!text.trim()}>Analyze Structure</Button>
              <Button variant="outline" disabled className="gap-1">
                <Lock className="h-3.5 w-3.5" /> AI Rewrite <Badge variant="secondary" className="ml-1">Coming soon</Badge>
              </Button>
              <Button variant="ghost" onClick={() => { setText(""); setRan(false); }}>Clear</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> CLEAR-V Structure Review
            </CardTitle>
            <CardDescription>
              {result ? `Overall ${result.overall}/100` : "Paste a prompt and run an analysis to see its structure review here."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {result ? (
              <>
                <ClearVBar scores={result.scores} />
                <div className="space-y-2">
                  {result.feedback.map((f) => (
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
                Empty state — the review will appear here after you click Analyze.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
