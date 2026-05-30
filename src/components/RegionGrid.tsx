import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { regionCards } from "@/data/sources";
import HelpTip from "./HelpTip";

export default function RegionGrid() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {regionCards.map((r) => {
          const id = `region-${r.region.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <Card key={r.region} id={id} className="transition-shadow">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{r.region}</CardTitle>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Not a ranking
                    <HelpTip term="Not a ranking" highlightId={id} />
                  </span>
                </div>
                <CardDescription>{r.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-muted-foreground">Source base:</span>
                  <span className="font-medium text-foreground/80">{r.sourceBase}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="secondary" className="gap-1 font-normal">
                    {r.status}
                    <HelpTip term="Reviewed contextual summary" highlightId={id} />
                  </Badge>
                  <span className="text-muted-foreground">Last reviewed {r.lastReviewed}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        These cards are source-backed summaries, not official rankings or live measurements.
      </p>
    </div>
  );
}
