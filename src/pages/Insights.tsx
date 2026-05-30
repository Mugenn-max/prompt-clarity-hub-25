import { Badge } from "@/components/ui/badge";
import { Globe2 } from "lucide-react";
import RegionGrid from "@/components/RegionGrid";
import SourceReview from "@/components/SourceReview";

export default function Insights() {
  return (
    <div className="container space-y-16 py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3 gap-1">
          <Globe2 className="h-3 w-3" /> Insights
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI Readiness Around the World</h1>
        <p className="mt-3 text-muted-foreground">
          Contextual ecosystem observations, not rankings. We do not invent percentages or compare nations.
        </p>
      </header>

      <RegionGrid />

      <SourceReview variant="full" />
    </div>
  );
}
