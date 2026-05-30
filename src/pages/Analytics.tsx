import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import HelpTip from "@/components/HelpTip";
import SourceReview from "@/components/SourceReview";

type Audit = { ts: number; kind: "prompt" | "response"; overall: number; len?: number };

export default function Analytics() {
  const [audits, setAudits] = useState<Audit[]>([]);

  useEffect(() => {
    try {
      setAudits(JSON.parse(localStorage.getItem("ma_audits") || "[]"));
    } catch {}
  }, []);

  const stats = useMemo(() => {
    if (!audits.length) return null;
    const avg = Math.round(audits.reduce((a, b) => a + b.overall, 0) / audits.length);
    return { count: audits.length, avg };
  }, [audits]);

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3 gap-1"><BarChart2 className="h-3 w-3" /> Analytics</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Your local analytics</h1>
        <p className="mt-3 text-muted-foreground">
          Personal stats stored in your browser only. No server, no tracking. AI-literacy context below.
        </p>
      </header>

      <section className="mt-10" id="how-this-data-works">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              How this data works
              <HelpTip term="Local-only analytics" highlightId="how-this-data-works" />
            </CardTitle>
            <CardDescription>
              Personal stats and public insights update on different rhythms — on purpose.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm md:grid-cols-2">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Personal analytics are local-only — stored in your browser.</li>
              <li>• Public insight cards use source-backed summaries.</li>
              <li>• Source metadata can refresh automatically.</li>
              <li>• Interpretations are reviewed before publication.</li>
            </ul>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-xs">
              <span className="font-medium text-foreground">Example. </span>
              <span className="text-muted-foreground">
                Your prompt scores update instantly because they come from your own checks. Regional AI literacy
                summaries update only after review because public sources require context.
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Personal</h2>
        <div className="grid gap-4 md:grid-cols-5">
          <StatCard label="Audits run" value={stats?.count ?? "—"} />
          <StatCard label="Avg. Clarity" value={stats?.avg ?? "—"} />
          <StatCard label="Best dimension" value="—" hint="Unlocked after first audit" />
          <StatCard label="Lowest dimension" value="—" hint="Unlocked after first audit" />
          <StatCard label="Top category" value="—" hint="Unlocked after first audit" />
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Trend</CardTitle>
            <CardDescription>
              {stats ? "Recent audits below. Charts coming as you accumulate data." : "No local audits yet."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!stats ? (
              <div className="rounded-lg border border-dashed border-border p-10 text-center">
                <p className="font-medium">No local audits yet.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Run your first Prompt Audit to unlock local readiness trends and workflow analytics.
                </p>
                <Button asChild className="mt-4">
                  <Link to="/prompt-audit">Start a Prompt Audit</Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {audits.slice(0, 10).map((a) => (
                  <li key={a.ts} className="flex items-center justify-between py-2 text-sm">
                    <span className="capitalize text-muted-foreground">{a.kind} audit</span>
                    <span className="tabular-nums">{new Date(a.ts).toLocaleString()}</span>
                    <span className="font-medium">{a.overall}/100</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-16">
        <SourceReview variant="analytics" />
      </section>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      {hint && <CardContent className="pt-0 text-xs text-muted-foreground">{hint}</CardContent>}
    </Card>
  );
}
