export type Pattern = {
  id: string;
  name: string;
  what: string;
  when: string;
  template: string;
  strengths: string[];
  failure: string;
};

export const patterns: Pattern[] = [
  {
    id: "role-task-context",
    name: "Role + Task + Context",
    what: "Anchor the model with who it is, what to do, and the situation.",
    when: "Almost always. The minimum viable prompt.",
    template: "You are {role}. Your task is {task}. Context: {context}.",
    strengths: ["Clarity", "Audience"],
    failure: "Without role + context, outputs drift toward generic safe text.",
  },
  {
    id: "constraints-format",
    name: "Constraints + Output Format",
    what: "Tell the model exactly what shape the answer must take.",
    when: "When you need to parse, compare, or paste the output somewhere.",
    template: "Return as: {format}. Constraints: {constraints}.",
    strengths: ["Limits & Format"],
    failure: "Without format, you get prose where you needed a list or table.",
  },
  {
    id: "evidence-grounded",
    name: "Evidence-Grounded Answer",
    what: "Force the model to cite sources or mark unsupported claims.",
    when: "Research, fact-sensitive writing, analysis.",
    template: "For every claim, cite the source. If unsupported, mark [unverified].",
    strengths: ["Evidence", "Validation"],
    failure: "Plausible answers presented with no traceable basis.",
  },
  {
    id: "validation-checklist",
    name: "Validation Checklist",
    what: "End the prompt with a self-check the model must run.",
    when: "Anything you will act on without re-reading carefully.",
    template: "Before answering, verify: {checklist}. If any fails, revise.",
    strengths: ["Validation", "Risk"],
    failure: "Confident but inconsistent answers.",
  },
  {
    id: "step-by-step-tutor",
    name: "Step-by-Step Tutor",
    what: "Teach via one question at a time with checkpoints.",
    when: "Learning, onboarding, complex how-tos.",
    template: "Tutor me on {topic}. Ask one question at a time. Every 3 turns, summarize and correct.",
    strengths: ["Audience", "Clarity"],
    failure: "Wall-of-text lectures the user does not absorb.",
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    what: "Structured scan with consensus / disagreement / gaps.",
    when: "Synthesizing multiple sources.",
    template: "Summarize sources. End with: consensus, disagreements, gaps. Cite each claim.",
    strengths: ["Evidence", "Validation"],
    failure: "Vague summaries that hide where sources disagree.",
  },
  {
    id: "coding-debugger",
    name: "Coding Debugger",
    what: "Hypothesis-test loops instead of guessed fixes.",
    when: "Bugs you don't yet understand.",
    template: "Propose ranked hypotheses. Suggest the smallest test for each.",
    strengths: ["Validation", "Risk"],
    failure: "Confident wrong fixes; no way to know if it worked.",
  },
  {
    id: "data-planner",
    name: "Data Analysis Planner",
    what: "Force a plan before any SQL or chart.",
    when: "Any non-trivial analysis.",
    template: "State: question, metric, grain, filters, joins, validation. Then query.",
    strengths: ["Clarity", "Validation"],
    failure: "Queries that answer the wrong question.",
  },
  {
    id: "response-evaluator",
    name: "Response Evaluator",
    what: "Audit an AI response against CLEAR-V before using it.",
    when: "Before pasting AI output into anything important.",
    template: "Evaluate this response for completeness, evidence, framing, format, confidence.",
    strengths: ["Validation", "Risk"],
    failure: "Acting on plausible but unsupported output.",
  },
  {
    id: "agentic-planner",
    name: "Agentic Workflow Planner",
    what: "Break a goal into ordered steps with checkpoints and stop-conditions.",
    when: "Multi-step tasks involving tools or long horizons.",
    template: "Goal: {goal}. List steps, tools per step, success check, stop-condition.",
    strengths: ["Clarity", "Limits & Format", "Risk"],
    failure: "Runaway loops or unfinished work with no clear handoff.",
  },
];
