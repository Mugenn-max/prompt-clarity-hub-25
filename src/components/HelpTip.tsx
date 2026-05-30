import { useId, useRef } from "react";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { helpTips } from "@/data/sources";
import { cn } from "@/lib/utils";

type Props = {
  term: keyof typeof helpTips | string;
  /** id of the related element to highlight when opened */
  highlightId?: string;
  className?: string;
  label?: string;
};

export function highlightEl(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("ma-highlight");
  // force reflow to restart animation
  void (el as HTMLElement).offsetWidth;
  el.classList.add("ma-highlight");
  window.setTimeout(() => el.classList.remove("ma-highlight"), 1100);
}

export default function HelpTip({ term, highlightId, className, label }: Props) {
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);
  const text = helpTips[term] ?? "";

  const onOpen = (open: boolean) => {
    if (open && highlightId) highlightEl(highlightId);
  };

  return (
    <Popover onOpenChange={onOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          aria-label={`What does “${label ?? term}” mean?`}
          aria-describedby={id}
          onMouseEnter={() => highlightId && highlightEl(highlightId)}
          onFocus={() => highlightId && highlightEl(highlightId)}
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent id={id} side="top" align="start" className="w-72 text-sm">
        <p className="mb-1 font-medium">{label ?? term}</p>
        <p className="text-muted-foreground">{text}</p>
      </PopoverContent>
    </Popover>
  );
}
