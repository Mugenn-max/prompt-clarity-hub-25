export type SourceStatus = "Official source" | "Needs checking" | "Archived";
export type UpdateMode = "Metadata refresh" | "Dataset refresh" | "Manual review";
export type ReviewStatus = "Auto-drafted" | "Needs review" | "Reviewed" | "Published" | "Outdated";

export type SourceCard = {
  id: string;
  title: string;
  organization: string;
  type: "Report" | "Framework" | "Dataset" | "Policy resource";
  usedFor: string;
  status: SourceStatus;
  lastChecked: string;
  updateMode: UpdateMode;
  url?: string;
};

export const sourceRegistry: SourceCard[] = [
  {
    id: "oecd-deo",
    title: "OECD Digital Economy Outlook",
    organization: "OECD",
    type: "Report",
    usedFor: "digital economy and AI policy context",
    status: "Official source",
    lastChecked: "2025-11-01",
    updateMode: "Metadata refresh",
  },
  {
    id: "unesco-ai-comp",
    title: "UNESCO AI Competency Frameworks",
    organization: "UNESCO",
    type: "Framework",
    usedFor: "AI literacy and education methodology",
    status: "Official source",
    lastChecked: "2025-10-20",
    updateMode: "Metadata refresh",
  },
  {
    id: "eu-digcomp",
    title: "EU DigComp 2.2",
    organization: "European Commission / EU",
    type: "Framework",
    usedFor: "digital competence and information literacy grounding",
    status: "Official source",
    lastChecked: "2025-09-15",
    updateMode: "Manual review",
  },
  {
    id: "wef-fjr",
    title: "World Economic Forum Future of Jobs",
    organization: "WEF",
    type: "Report",
    usedFor: "future-of-work and skills context",
    status: "Official source",
    lastChecked: "2025-11-05",
    updateMode: "Metadata refresh",
  },
];

export const reviewWorkflow = [
  { step: "Source update", desc: "Metadata or dataset change detected from a tracked source." },
  { step: "Draft note", desc: "An internal draft is created — never auto-published." },
  { step: "Needs review", desc: "Flagged for a person to check wording and source fit." },
  { step: "Reviewed", desc: "Checked for overclaiming and accuracy against the source." },
  { step: "Published", desc: "Goes live as a public insight card." },
];

export const reviewBadges: { status: ReviewStatus; help: string }[] = [
  { status: "Auto-drafted", help: "Created from updated source notes, not yet approved." },
  { status: "Needs review", help: "A person should check the wording before publishing." },
  { status: "Reviewed", help: "Checked for wording, source fit, and overclaiming." },
  { status: "Published", help: "Visible as a public insight." },
  { status: "Outdated", help: "Source or wording may need an update." },
];

export type RegionCard = {
  region: string;
  summary: string;
  sourceBase: string;
  status: string;
  lastReviewed: string;
};

export const regionCards: RegionCard[] = [
  {
    region: "MENA",
    summary:
      "Public sources point to growing interest in AI education and digital skills, while access, infrastructure, and implementation may vary widely across countries.",
    sourceBase: "UNESCO, OECD, WEF, regional policy sources",
    status: "Reviewed contextual summary",
    lastReviewed: "2025-11-10",
  },
  {
    region: "Europe",
    summary:
      "European sources often emphasize digital competence, AI governance, data protection, and education frameworks. Implementation still varies across countries and institutions.",
    sourceBase: "EU DigComp, OECD, UNESCO",
    status: "Reviewed contextual summary",
    lastReviewed: "2025-11-10",
  },
  {
    region: "Latin America",
    summary:
      "Regional AI and digital skills activity is growing, with important differences in infrastructure, education access, and institutional readiness.",
    sourceBase: "UNESCO, OECD, WEF, regional policy sources",
    status: "Reviewed contextual summary",
    lastReviewed: "2025-11-10",
  },
  {
    region: "North America",
    summary:
      "North America shows strong AI adoption and experimentation in education and work, while responsible use, verification habits, and access gaps remain important concerns.",
    sourceBase: "OECD, WEF, UNESCO, national policy sources",
    status: "Reviewed contextual summary",
    lastReviewed: "2025-11-10",
  },
  {
    region: "Asia-Pacific",
    summary:
      "Asia-Pacific includes highly diverse AI education and digital skills ecosystems, from advanced policy environments to regions still expanding access and infrastructure.",
    sourceBase: "UNESCO, OECD, WEF, regional policy sources",
    status: "Reviewed contextual summary",
    lastReviewed: "2025-11-10",
  },
];

export const canUpdateSafely = [
  { title: "Source title", desc: "Renames or republished editions." },
  { title: "Source URL", desc: "When a tracked source moves to a new canonical link." },
  { title: "Publication year", desc: "Edition or release year metadata." },
  { title: "DOI or official identifier", desc: "When available from the publishing organization." },
  { title: "Last checked date", desc: "Timestamp of the most recent metadata check." },
  { title: "Dataset values", desc: "Only when a reliable data connection exists." },
  { title: "Source availability", desc: "Whether the source still resolves and is accessible." },
  { title: "New report detection", desc: "Surface that a newer edition exists, without rewriting insights." },
];

export const shouldBeReviewed = [
  {
    title: "Regional summaries",
    desc: "Regional summaries need context. A source update should not automatically become a claim like “Region A is ahead of Region B.”",
    example: "Better: “Digital skills programs are expanding, but access varies.”",
  },
  {
    title: "AI literacy interpretations",
    desc: "AI literacy depends on education, access, policy, and usage habits. These summaries should be reviewed before publication.",
    example: "Better: “Growing interest with uneven implementation,” not “low AI literacy.”",
  },
  {
    title: "Readiness comparisons",
    desc: "ModelAudit should avoid ranking regions unless a clear method and dataset are defined.",
    example: "Use dimension cards instead: digital skills, education policy, responsible AI guidance, and access.",
  },
  {
    title: "Model guidance",
    desc: "Specific model behavior changes quickly. ModelAudit should give general guidance instead of ranking models.",
    example: "Better: “Smaller models benefit from narrower tasks and examples,” not “Model X is worse than Model Y.”",
  },
];

export const helpTips: Record<string, string> = {
  "Metadata refresh":
    "Checks whether the source title, year, link, or publication information changed. It does not rewrite insight conclusions automatically.",
  "Dataset refresh":
    "Updates values from a trusted dataset when a reliable data connection exists. The explanation text still needs review.",
  "Manual review":
    "A person checks whether the source still supports the wording shown on the site.",
  "Auto-drafted":
    "A draft created from updated source notes. It is not public until reviewed.",
  "Needs review":
    "This item may be useful, but someone should check the wording before it is published.",
  "Reviewed contextual summary":
    "A short explanation based on sources, checked to avoid overclaiming.",
  "Not a ranking":
    "This card compares context. It does not say one region is officially better or worse than another.",
  "Source-backed summary":
    "This text is based on named sources, but it is still a summary written by ModelAudit.",
  "Model profile guidance":
    "General advice for types of AI models. These are not official model rankings.",
  "Local-only analytics":
    "Your progress data is based on checks run in this browser. It is not a global usage metric.",
};
