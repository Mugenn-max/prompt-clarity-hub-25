## Goal

Add a shared **Source Review** module across `/insights`, `/methodology`, and `/analytics`, plus a reusable `HelpTip` and a refreshed AI Readiness section. Keep the existing site, theme, and content; only add and lightly modify the three target pages.

## Already scaffolded (from prior turn, before plan mode)
- `src/data/sources.ts` — source registry, review workflow, badges, region cards, "what can update / what needs review" data, and HelpTip dictionary.
- `src/components/HelpTip.tsx` — accessible Popover trigger with a 1s `.ma-highlight` pulse on the related card.
- `src/index.css` — `.ma-highlight` class + `ma-pulse` keyframes.

These are already on disk and will be reused, not rewritten.

## New components to add

1. **`src/components/SourceReview.tsx`** — the shared section. Accepts a `variant` prop:
   - `"full"` (Insights): all subsections.
   - `"methodology"`: Source Registry + Review Workflow + Status Badges legend (skips regional cards, which belong on Insights).
   - `"analytics"`: compact "How this data works" panel + Status Badges legend + link to full Source Review on Insights.

   Subsections inside `SourceReview`:
   - **Header** with the main copy paragraph and a small "Source-backed summary" HelpTip.
   - **Source Registry** — grid of cards built from `sourceRegistry`. Each card shows title, organization, type, "Used for", status pill, last checked date, update-mode chip with a `HelpTip` (Metadata refresh / Dataset refresh / Manual review). Button: "Open source" when `url` exists, otherwise "Add source link" (disabled/ghost). Footnote: "Source cards track where context comes from. They are not claims by themselves."
   - **Review Workflow** — horizontal 5-step flow (`Source update → Draft note → Needs review → Reviewed → Published`) using arrows on desktop, stacked on mobile, with the explanation copy.
   - **Review Status badges** — legend listing each badge with its help text, each name also wired to a `HelpTip` so hovering the info icon highlights its row.
   - **What can update safely?** — card grid from `canUpdateSafely`, intro copy + OECD example callout.
   - **What should be reviewed first?** — card grid from `shouldBeReviewed` with title, body, and an "Example" line.

2. **`src/components/RegionGrid.tsx`** *(optional split; otherwise inline in Insights)* — renders `regionCards` with: region name, summary, source base, review-status badge (with HelpTip on "Reviewed contextual summary"), last reviewed date, and a small "Contextual summary, not a ranking" chip with a HelpTip on "Not a ranking". Below the grid: disclaimer "These cards are source-backed summaries, not official rankings or live measurements."

## Page changes

- **`src/pages/Insights.tsx`**
  - Keep the existing header + region cards intro, but replace the current region cards with the new `RegionGrid` driven by `regionCards` from `sources.ts`.
  - Replace the existing "Sources" citation grid with `<SourceReview variant="full" />` mounted below the region grid.

- **`src/pages/Methodology.tsx`**
  - Keep CLEAR-V content untouched.
  - Replace the existing "References" block with `<SourceReview variant="methodology" />`.

- **`src/pages/Analytics.tsx`**
  - Add a "How this data works" panel above the Personal stats grid, with bullets covering: local-only analytics (HelpTip on "Local-only analytics"), source-backed insight cards, metadata refresh, and review-before-publish. Include the prompt-scores vs regional-summaries example.
  - At the bottom (replacing or following the existing "AI literacy context" block), add `<SourceReview variant="analytics" />` plus a link to `/insights` for the full registry.

## HelpTip wiring

- Each `HelpTip` accepts `term` (matches `helpTips` keys) and optional `highlightId`. The trigger pulses the related element for ~1s on hover, focus, and click.
- Terms wired: Metadata refresh, Dataset refresh, Manual review, Auto-drafted, Needs review, Reviewed contextual summary, Not a ranking, Source-backed summary, Model profile guidance (used in Methodology limitations note), Local-only analytics (Analytics panel).

## Design

- Reuse existing `Card`, `Badge`, `Button` primitives and semantic tokens — no new colors.
- Status pills: Official source = default/primary tint, Needs checking = warning-tinted outline, Archived = muted outline. Review badges: Published = primary, Reviewed = success-tinted, Needs review = warning-tinted, Auto-drafted = secondary, Outdated = destructive outline. All via existing tokens / `bg-*/10 text-*` utility combos already used in the project.
- Workflow arrow row uses `lucide-react`'s `ArrowRight` (or `ChevronRight` on mobile) and `border` + `bg-muted/40` chips.
- Clean, practical layout; section spacing matches existing pages (`space-y-12`, container).

## Out of scope

- No backend, no real source-fetching, no auth, no new routes.
- No edits to data already in `src/data/learn.ts` beyond Insights swapping its source.
- No changes to PromptAudit, ResponseAudit, Commons, Lab, Learn, Patterns, About, Changelog, or Index.

## Files touched

- Create: `src/components/SourceReview.tsx`, `src/components/RegionGrid.tsx`.
- Edit: `src/pages/Insights.tsx`, `src/pages/Methodology.tsx`, `src/pages/Analytics.tsx`.
- Already created earlier this turn: `src/data/sources.ts`, `src/components/HelpTip.tsx`, `src/index.css` (highlight class).
