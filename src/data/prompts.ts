export type ClearV = {
  clarity: number;
  evidence: number;
  audience: number;
  risk: number;
  validation: number;
  limits: number;
};

export type PromptCard = {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  clearV: number; // 0-100
  source: string;
  license: string;
  tags: string[];
  body: string;
};

export const promptCategories = [
  "Research",
  "Coding",
  "Data Analysis",
  "Academic Writing",
  "Product Development",
  "Business Strategy",
  "Marketing",
  "Customer Support",
  "Learning & Tutoring",
  "Creative Writing",
  "Productivity",
  "Career & Job Search",
  "No-Code / App Building",
  "Content Creation",
];

export const samplePrompts: PromptCard[] = [
  {
    id: "research-literature-scan",
    title: "Structured literature scan",
    category: "Research",
    description: "Summarize a body of research with evidence citations and gaps highlighted.",
    difficulty: "Intermediate",
    clearV: 82,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["research", "summary", "evidence"],
    body: "You are a research assistant. Summarize the following sources for a {audience}. For every claim, cite the source. End with: 1) consensus findings, 2) disagreements, 3) gaps. Sources: {input}",
  },
  {
    id: "coding-debug-walkthrough",
    title: "Step-by-step debugger",
    category: "Coding",
    description: "Walk through a bug methodically with hypothesis-test loops.",
    difficulty: "Beginner",
    clearV: 78,
    source: "ModelAudit sample",
    license: "CC0 sample",
    tags: ["debugging", "tutor"],
    body: "Act as a senior engineer pair-programming with me. Given this error and code, propose hypotheses ranked by likelihood, then suggest the smallest test to confirm each. Code: {code} Error: {error}",
  },
  {
    id: "data-analysis-planner",
    title: "Analysis plan before SQL",
    category: "Data Analysis",
    description: "Force a written analysis plan before any query is generated.",
    difficulty: "Intermediate",
    clearV: 84,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["sql", "planning"],
    body: "Before writing any SQL, state: question, metric definition, grain, filters, joins, and validation. Then write the query. Schema: {schema}. Question: {question}",
  },
  {
    id: "academic-thesis-outline",
    title: "Thesis section outliner",
    category: "Academic Writing",
    description: "Generate a defensible outline with claims, evidence, and counter-arguments.",
    difficulty: "Advanced",
    clearV: 80,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["thesis", "outline"],
    body: "Draft an outline for a section on {topic} aimed at {audience}. For each point list: claim, supporting evidence, likely counter-argument, and what would falsify it.",
  },
  {
    id: "mvp-spec-writer",
    title: "Lean MVP spec",
    category: "Product Development",
    description: "Translate an idea into a one-page MVP brief with cut lines.",
    difficulty: "Beginner",
    clearV: 76,
    source: "ModelAudit sample",
    license: "CC0 sample",
    tags: ["mvp", "spec"],
    body: "Write a 1-page MVP spec for: {idea}. Sections: user, problem, success metric, must-have, explicitly cut, risks. Keep under 300 words.",
  },
  {
    id: "marketing-positioning",
    title: "Positioning statement",
    category: "Marketing",
    description: "Draft a positioning statement and three competing angles.",
    difficulty: "Intermediate",
    clearV: 74,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["positioning"],
    body: "Draft three positioning statements for {product} targeting {segment}. For each include: promise, proof, and the segment it does NOT serve.",
  },
  {
    id: "support-empathy-reply",
    title: "Empathetic support reply",
    category: "Customer Support",
    description: "Generate a calm, accurate response that names the issue and next step.",
    difficulty: "Beginner",
    clearV: 72,
    source: "ModelAudit sample",
    license: "CC0 sample",
    tags: ["support"],
    body: "Reply to this customer message. Tone: calm, specific, no apologies-without-action. Structure: acknowledge → what we know → next step → ETA. Message: {message}",
  },
  {
    id: "tutor-socratic",
    title: "Socratic tutor",
    category: "Learning & Tutoring",
    description: "Teach by questions, not lectures, with checkpoints.",
    difficulty: "Beginner",
    clearV: 77,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["tutor", "socratic"],
    body: "Tutor me on {topic}. Ask one question at a time. After three of my answers, summarize what I got right and one misconception to correct.",
  },
  {
    id: "creative-flash-fiction",
    title: "Flash fiction constraint",
    category: "Creative Writing",
    description: "Write tight 200-word fiction under specific constraints.",
    difficulty: "Beginner",
    clearV: 70,
    source: "ModelAudit sample",
    license: "CC0 sample",
    tags: ["fiction"],
    body: "Write a 200-word story. Constraints: {constraints}. No adverbs. End with an image, not a moral.",
  },
  {
    id: "productivity-weekly-review",
    title: "Weekly review prompt",
    category: "Productivity",
    description: "Structured Friday review with honest signal extraction.",
    difficulty: "Beginner",
    clearV: 73,
    source: "ModelAudit sample",
    license: "CC0 sample",
    tags: ["review"],
    body: "Run my weekly review. Ask me: what shipped, what stalled, what surprised me, what to drop. Then propose 3 priorities for next week and what to say no to.",
  },
  {
    id: "career-resume-tightener",
    title: "Resume bullet tightener",
    category: "Career & Job Search",
    description: "Rewrite resume bullets using action-impact-evidence structure.",
    difficulty: "Beginner",
    clearV: 75,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["resume"],
    body: "Rewrite these bullets in the form: action verb → measurable impact → method/evidence. Keep each under 24 words. Bullets: {bullets}",
  },
  {
    id: "nocode-app-flow",
    title: "No-code app flow planner",
    category: "No-Code / App Building",
    description: "Outline screens, data, and automations before building.",
    difficulty: "Intermediate",
    clearV: 79,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["nocode"],
    body: "I want to build {app}. Before tools, define: core entities, screens, user actions, and the 3 automations that matter most. Then suggest a stack.",
  },
  {
    id: "content-repurpose",
    title: "Long-form repurposer",
    category: "Content Creation",
    description: "Turn one essay into varied formats without losing nuance.",
    difficulty: "Intermediate",
    clearV: 74,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["repurpose"],
    body: "Repurpose this essay into: 1 thread, 1 newsletter intro, 1 LinkedIn post, 1 talk outline. Preserve nuance; cut hedges; do not invent stats. Essay: {essay}",
  },
  {
    id: "business-strategy-jtbd",
    title: "Jobs-to-be-done interview",
    category: "Business Strategy",
    description: "Conduct a structured JTBD discovery interview.",
    difficulty: "Advanced",
    clearV: 81,
    source: "ModelAudit sample",
    license: "CC BY 4.0 sample",
    tags: ["jtbd", "strategy"],
    body: "Interview me about a recent purchase. Use JTBD timeline: first thought → trigger → search → choice → use. Ask follow-ups, do not summarize until I say stop.",
  },
];
