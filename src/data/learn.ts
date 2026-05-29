export type LearningModule = {
  title: string;
  level: "Intro" | "Core" | "Applied";
  minutes: number;
  description: string;
};

export type LearningPath = {
  id: string;
  title: string;
  summary: string;
  modules: LearningModule[];
};

export const learningPaths: LearningPath[] = [
  {
    id: "prompt-literacy",
    title: "Prompt Literacy",
    summary: "Learn how to write prompts that produce reliable, usable answers.",
    modules: [
      { title: "What a prompt actually is", level: "Intro", minutes: 4, description: "Frame prompts as instructions, not magic spells." },
      { title: "The CLEAR-V dimensions", level: "Core", minutes: 6, description: "Walk through each axis with worked examples." },
      { title: "Common failure modes", level: "Core", minutes: 5, description: "Spot ambiguity, missing audience, unsafe assumptions." },
      { title: "Patterns you will reuse", level: "Applied", minutes: 7, description: "Three patterns to keep in your back pocket." },
    ],
  },
  {
    id: "ai-literacy",
    title: "AI Literacy",
    summary: "Build a mental model of what current AI systems can and cannot do.",
    modules: [
      { title: "How LLMs generate text", level: "Intro", minutes: 5, description: "Token-by-token, not 'thinking'." },
      { title: "Hallucinations and confidence", level: "Core", minutes: 6, description: "Why confident-sounding output isn't proof." },
      { title: "Context windows and memory", level: "Core", minutes: 4, description: "What the model actually sees." },
    ],
  },
  {
    id: "response-evaluation",
    title: "Response Evaluation",
    summary: "Don't just read AI answers — interrogate them.",
    modules: [
      { title: "Completeness vs. confidence", level: "Intro", minutes: 4, description: "Long answers are not complete answers." },
      { title: "Evidence quality", level: "Core", minutes: 6, description: "Citations, hedges, and unsupported claims." },
      { title: "Framing and format", level: "Applied", minutes: 5, description: "How shape changes meaning." },
    ],
  },
  {
    id: "responsible-ai",
    title: "Responsible AI Use",
    summary: "Use AI in ways you would defend to a colleague, a regulator, or your future self.",
    modules: [
      { title: "Risk-aware prompting", level: "Intro", minutes: 5, description: "Where the harm could land." },
      { title: "Attribution and consent", level: "Core", minutes: 5, description: "Whose work, whose data." },
      { title: "Disclosure norms", level: "Applied", minutes: 4, description: "When to say 'AI helped me write this'." },
    ],
  },
  {
    id: "human-ai-collab",
    title: "Human-AI Collaboration",
    summary: "Design workflows where AI assists judgment instead of replacing it.",
    modules: [
      { title: "Handoffs and checkpoints", level: "Intro", minutes: 5, description: "Where the human stays in the loop." },
      { title: "Reusable workflows", level: "Core", minutes: 6, description: "Turn one good prompt into a tool." },
      { title: "When not to use AI", level: "Applied", minutes: 4, description: "Tasks where it makes things worse." },
    ],
  },
];

export type RegionInsight = {
  region: string;
  observation: string;
  sources: string;
};

export const regionInsights: RegionInsight[] = [
  {
    region: "MENA",
    observation: "Rapid public-sector interest in AI strategies, with uneven access to formal AI-literacy curricula across the region.",
    sources: "Contextual synthesis from OECD/UNESCO/WEF/EU digital-skills sources",
  },
  {
    region: "Europe",
    observation: "Strong regulatory framing (EU AI Act, DigComp) is shaping how AI literacy is taught and required in workplaces.",
    sources: "Contextual synthesis from OECD/UNESCO/WEF/EU digital-skills sources",
  },
  {
    region: "Latin America",
    observation: "Growing grassroots and university-led prompt-literacy efforts, often outpacing official curriculum updates.",
    sources: "Contextual synthesis from OECD/UNESCO/WEF/EU digital-skills sources",
  },
  {
    region: "North America",
    observation: "Heavy enterprise adoption alongside ongoing debate about disclosure, evaluation, and student use in education.",
    sources: "Contextual synthesis from OECD/UNESCO/WEF/EU digital-skills sources",
  },
  {
    region: "Asia-Pacific",
    observation: "Wide variance: some economies are integrating AI into national skills frameworks; others remain in pilot stages.",
    sources: "Contextual synthesis from OECD/UNESCO/WEF/EU digital-skills sources",
  },
];

export const citations = [
  { org: "OECD", topic: "AI and the future of skills" },
  { org: "UNESCO", topic: "AI competency frameworks for teachers and students" },
  { org: "World Economic Forum", topic: "Future of Jobs reports" },
  { org: "EU DigComp", topic: "Digital Competence Framework for Citizens" },
  { org: "AI literacy research", topic: "Long et al. and related academic work on AI literacy constructs" },
];
