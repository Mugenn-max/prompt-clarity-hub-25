export type StarterPack = {
  id: string;
  title: string;
  description: string;
  learn: string[];
  workflows: string[];
  examples: string[];
};

export const starterPacks: StarterPack[] = [
  {
    id: "research",
    title: "Research Starter Pack",
    description: "Move from open questions to structured, evidence-backed answers.",
    learn: ["Framing research questions", "Source triangulation", "Summarization with citations"],
    workflows: ["Literature scan", "Source comparison", "Gap analysis"],
    examples: ["Structured literature scan", "Compare two papers", "Find what is missing"],
  },
  {
    id: "coding",
    title: "Coding Starter Pack",
    description: "Use AI as a pair, not an oracle: debug, refactor, and explain code.",
    learn: ["Hypothesis-driven debugging", "Reading unfamiliar code", "Writing safer prompts"],
    workflows: ["Bug walkthrough", "Refactor plan", "Test scaffold"],
    examples: ["Step-by-step debugger", "Refactor with intent", "Explain this function"],
  },
  {
    id: "data",
    title: "Data Analysis Starter Pack",
    description: "Plan analyses before queries so your numbers actually mean something.",
    learn: ["Metric definitions", "Grain and joins", "Result validation"],
    workflows: ["Analysis plan", "SQL drafting", "Result sanity-check"],
    examples: ["Analysis plan before SQL", "Validate a metric", "Explain a chart"],
  },
  {
    id: "academic",
    title: "Academic Writing Pack",
    description: "Build defensible arguments and outlines instead of vague prose.",
    learn: ["Claim-evidence structure", "Counter-arguments", "Citation discipline"],
    workflows: ["Section outliner", "Argument stress-test", "Abstract drafting"],
    examples: ["Thesis section outliner", "Counter-argument generator", "Abstract from outline"],
  },
  {
    id: "mvp",
    title: "MVP Builder Pack",
    description: "Turn vague ideas into one-page specs and ruthless cut-lines.",
    learn: ["Scoping", "Cutting features", "Defining success"],
    workflows: ["1-page spec", "Risk listing", "Cut-line drafting"],
    examples: ["Lean MVP spec", "Risk register", "Anti-roadmap"],
  },
  {
    id: "marketing",
    title: "Marketing Pack",
    description: "Sharpen positioning, copy, and audience reasoning.",
    learn: ["Positioning", "Audience clarity", "Honest copy"],
    workflows: ["Positioning draft", "Channel-fit copy", "Message testing"],
    examples: ["Positioning statement", "Cold email rewriter", "Headline A/B prompts"],
  },
  {
    id: "support",
    title: "Customer Support Pack",
    description: "Write replies that respect the customer and the truth.",
    learn: ["Acknowledgement", "Specificity", "Action over apology"],
    workflows: ["Reply drafting", "Macro tuning", "Escalation framing"],
    examples: ["Empathetic support reply", "Refund explainer", "Outage note"],
  },
  {
    id: "learning",
    title: "Learning & Tutoring Pack",
    description: "Use AI as a tutor that questions you, not one that hands you answers.",
    learn: ["Socratic prompting", "Checkpointing", "Misconception spotting"],
    workflows: ["Socratic tutor", "Concept stress-test", "Spaced review"],
    examples: ["Socratic tutor", "Quiz me on", "Explain like a skeptic"],
  },
];
