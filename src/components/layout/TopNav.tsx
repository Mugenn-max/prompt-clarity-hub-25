import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Github, Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Item = { label: string; to?: string; children?: { label: string; to: string; desc?: string }[] };

const nav: Item[] = [
  {
    label: "Audit",
    children: [
      { label: "Prompt Audit", to: "/prompt-audit", desc: "Test your prompt before you run it." },
      { label: "Response Audit", to: "/response-audit", desc: "Evaluate an AI response." },
    ],
  },
  { label: "Prompt Commons", to: "/commons" },
  { label: "PromptLab", to: "/lab" },
  {
    label: "Learn",
    children: [
      { label: "Learning Paths", to: "/learn", desc: "Five curated paths." },
      { label: "Methodology", to: "/methodology", desc: "How CLEAR-V works." },
      { label: "Prompt Patterns", to: "/patterns", desc: "Reusable prompt structures." },
    ],
  },
  { label: "Insights", to: "/insights" },
  { label: "Analytics", to: "/analytics" },
];

export default function TopNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="tracking-tight">ModelAudit</span>
          <span className="ml-1 hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
            open-source
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {item.children.map((c) => (
                    <DropdownMenuItem key={c.to} asChild>
                      <Link to={c.to} className="flex flex-col items-start gap-0.5">
                        <span className="font-medium">{c.label}</span>
                        {c.desc && <span className="text-xs text-muted-foreground">{c.desc}</span>}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink
                key={item.to}
                to={item.to!}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                    isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link to="/prompt-audit">Start a Prompt Audit</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container flex flex-col py-2">
            {nav.flatMap((i) =>
              i.children
                ? i.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      {c.label}
                    </Link>
                  ))
                : [
                    <Link
                      key={i.to}
                      to={i.to!}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      {i.label}
                    </Link>,
                  ]
            )}
            <Button size="sm" className="my-2" asChild>
              <Link to="/prompt-audit" onClick={() => setOpen(false)}>
                Start a Prompt Audit
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
