import { clearVDimensions } from "@/lib/clearv";
import { cn } from "@/lib/utils";

export function ClearVBar({
  scores,
  compact = false,
}: {
  scores: Record<string, number>;
  compact?: boolean;
}) {
  return (
    <div className={cn("space-y-2", compact && "space-y-1.5")}>
      {clearVDimensions.map((d) => {
        const v = scores[d.key] ?? 0;
        return (
          <div key={d.key} className="flex items-center gap-3">
            <div className={cn("w-28 shrink-0 text-xs font-medium", compact && "w-20 text-[11px]")}>
              {d.label}
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${v}%`,
                  background: "var(--gradient-primary)",
                }}
              />
            </div>
            <div className="w-8 text-right text-xs tabular-nums text-muted-foreground">{v}</div>
          </div>
        );
      })}
    </div>
  );
}

export function ScorePill({ value }: { value: number }) {
  const tone =
    value >= 75 ? "bg-success/10 text-success" :
    value >= 55 ? "bg-warning/10 text-warning" :
    "bg-destructive/10 text-destructive";
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums", tone)}>
      CLEAR-V {value}
    </span>
  );
}
