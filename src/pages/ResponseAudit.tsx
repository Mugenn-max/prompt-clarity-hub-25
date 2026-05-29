import { useMemo, useState } from "react";
import { analyzeResponse } from "@/lib/clearv";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResponseAudit() {
  const [prompt, setPrompt] = useState("");
  const [resp, setResp] = useState("");
  const [ran, setRan] = useState(false);
  const result = useMemo(() => (ran ? analyzeResponse(prompt, resp) : null), [prompt, resp, ran]);

  function run() {
    if (!resp.trim()) return;
    setRan(true);
    try {
      const stored = JSON.parse(localStorage.getItem("ma_audits") || "[]");
      stored.unshift({ ts: Date.now(), kind: "response", overall: analyzeResponse(prompt, resp).overall });
      localStorage.setItem("ma_audits", JSON.stringify(stored.slice(0, 100)));
    } catch {}
  }

  const sections = result ? [
    { k: "completeness", label: "Completeness" },
    { k: "evidence", label: "Evidence" },
    { k: "framing", label: "Framing" },
    { k: "format", label: "Format" },
    { k: "confidence", label: "Confidence" },
  ] as const : [];

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3">Response Audit</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Don't just read it. Evaluate it.</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Paste an AI response and run it through a structured evaluation for completeness, evidence quality,
          framing issues, confidence, and format consistency.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Original prompt</CardTitle>
              <CardDescription>Optional, but recommended for better evaluation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="The prompt you originally sent..."
                className="min-h-[120px] font-mono text-sm"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI response</CardTitle>
              <CardDescription>Paste the model's full answer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={resp}
                onChange={(e) => setResp(e.target.value)}
                placeholder="Paste the AI response here..."
                className="min-h-[220px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={run} disabled={!resp.trim()}>Run Response Audit</Button>
                <Button variant="ghost" onClick={() => { setResp(""); setPrompt(""); setRan(false); }}>Clear</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Evaluation</CardTitle>
            <CardDescription>
              {result ? `Overall ${result.overall}/100` : "Paste a response and run the audit to see results."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {result ? sections.map((s) => {
              const v = (result as any)[s.k];
              return (
                <div key={s.k} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>{s.label}</span>
                    <span className="tabular-nums text-muted-foreground">{v.score}/100</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{v.note}</p>
                </div>
              );
            }) : (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Empty state — the evaluation appears here after you click Run Response Audit.
              </div>
            )}
            {result && (
              <p className="pt-2 text-xs text-muted-foreground">
                Note: this surfaces structural signals such as potentially unsupported claims. It does not fact-check.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
