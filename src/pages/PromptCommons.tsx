import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { promptCategories, samplePrompts, type PromptCard } from "@/data/prompts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScorePill } from "@/components/ClearVBar";
import { Copy, Eye, GitFork, Play, Search } from "lucide-react";
import { toast } from "sonner";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const sorts = [
  { v: "score-desc", label: "CLEAR-V high → low" },
  { v: "score-asc", label: "CLEAR-V low → high" },
  { v: "title", label: "Title A→Z" },
];

export default function PromptCommons() {
  const [params] = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [diff, setDiff] = useState<string>("All");
  const [sort, setSort] = useState("score-desc");
  const packFilter = params.get("pack");

  const filtered = useMemo(() => {
    let list: PromptCard[] = [...samplePrompts];
    if (q) {
      const lo = q.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(lo) ||
        p.description.toLowerCase().includes(lo) ||
        p.tags.some((t) => t.includes(lo))
      );
    }
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (diff !== "All") list = list.filter((p) => p.difficulty === diff);
    if (sort === "score-desc") list.sort((a, b) => b.clearV - a.clearV);
    if (sort === "score-asc") list.sort((a, b) => a.clearV - b.clearV);
    if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [q, cat, diff, sort]);

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-3xl">
        <Badge variant="secondary" className="mb-3">Prompt Commons</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Curated, reusable prompt examples.</h1>
        <p className="mt-3 text-muted-foreground">
          A growing library of CLEAR-V reviewed starter prompts. Original or openly licensed only.
        </p>
        {packFilter && (
          <p className="mt-2 text-xs text-muted-foreground">
            Filtering by pack: <span className="font-medium">{packFilter}</span> — pack filtering UI coming soon.
          </p>
        )}
      </header>

      {/* Filters */}
      <div className="mt-8 grid gap-3 md:grid-cols-12">
        <div className="relative md:col-span-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts, tags..." className="pl-9" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="md:col-span-3"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All categories</SelectItem>
            {promptCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={diff} onValueChange={setDiff}>
          <SelectTrigger className="md:col-span-2"><SelectValue placeholder="Difficulty" /></SelectTrigger>
          <SelectContent>
            {difficulties.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="md:col-span-2"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            {sorts.map((s) => <SelectItem key={s.v} value={s.v}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Categories quick chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setCat("All")} className={chip(cat === "All")}>All</button>
        {promptCategories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-12 text-center">
          <p className="font-medium">No prompts match those filters.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try clearing the search or picking a different category.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PromptCardView key={p.id} p={p} />
          ))}
        </div>
      )}

      {/* Policy */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Allowed</CardTitle>
            <CardDescription>
              Original prompts, user-submitted prompts with permission, openly licensed prompts with attribution.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Not allowed</CardTitle>
            <CardDescription>
              Leaked system prompts, proprietary internal prompts, paid prompt-pack content, jailbreak prompts, prompts
              requesting harmful or illegal outputs.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}

function chip(active: boolean) {
  return `rounded-full border px-3 py-1 text-xs transition ${
    active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground/70 hover:bg-muted"
  }`;
}

function PromptCardView({ p }: { p: PromptCard }) {
  function copy() {
    navigator.clipboard.writeText(p.body);
    toast.success("Prompt copied to clipboard");
  }
  function fork() {
    try {
      const forks = JSON.parse(localStorage.getItem("ma_forks") || "[]");
      forks.unshift({ ts: Date.now(), id: p.id, body: p.body, title: p.title });
      localStorage.setItem("ma_forks", JSON.stringify(forks.slice(0, 50)));
      toast.success("Forked locally");
    } catch {
      toast.error("Could not fork locally");
    }
  }
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{p.title}</CardTitle>
          <ScorePill value={p.clearV} />
        </div>
        <CardDescription>{p.description}</CardDescription>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="secondary">{p.category}</Badge>
          <Badge variant="outline">{p.difficulty}</Badge>
          {p.tags.slice(0, 3).map((t) => <Badge key={t} variant="outline" className="text-[10px]">#{t}</Badge>)}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <pre className="overflow-hidden rounded-md bg-muted p-3 text-xs text-foreground/80 line-clamp-4 whitespace-pre-wrap">{p.body}</pre>
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{p.source}</span>
          <span>{p.license}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={copy}><Copy className="mr-1 h-3 w-3" /> Copy</Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={`/prompt-audit?seed=${p.id}`}><Play className="mr-1 h-3 w-3" /> Run Audit</Link>
        </Button>
        <Button size="sm" variant="outline" onClick={fork}><GitFork className="mr-1 h-3 w-3" /> Fork</Button>
        <Button size="sm" variant="ghost" asChild>
          <Link to={`/lab?seed=${p.id}`}><Eye className="mr-1 h-3 w-3" /> View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
