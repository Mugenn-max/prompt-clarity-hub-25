// Lightweight CLEAR-V heuristic analyzer. Pure client-side, transparent rules.
// NOT a real grader — flags structural signals to teach the rubric.

export type ClearVResult = {
  scores: {
    clarity: number;
    evidence: number;
    audience: number;
    risk: number;
    validation: number;
    limits: number;
  };
  overall: number;
  feedback: { dim: keyof ClearVResult["scores"]; ok: boolean; note: string }[];
};

export const clearVDimensions = [
  { key: "clarity", label: "Clarity", desc: "communication precision" },
  { key: "evidence", label: "Evidence", desc: "critical verification" },
  { key: "audience", label: "Audience", desc: "contextual reasoning" },
  { key: "risk", label: "Risk", desc: "responsible AI use" },
  { key: "validation", label: "Validation", desc: "reflective thinking" },
  { key: "limits", label: "Limits & Format", desc: "structured communication" },
] as const;

export function analyzePrompt(text: string): ClearVResult {
  const t = text.trim();
  const lower = t.toLowerCase();
  const wc = t ? t.split(/\s+/).length : 0;

  const hasRole = /\b(you are|act as|role:)/i.test(t);
  const hasTask = /\b(write|generate|summari[sz]e|analyz|draft|explain|design|propose|list|compare|translate|review|evaluate|plan)\b/i.test(t);
  const hasFormat = /\b(format|bullet|list|json|table|markdown|sections?|return as|structure)\b/i.test(t);
  const hasAudience = /\b(audience|for a|aimed at|reader|grade level|beginner|expert|child|colleague)\b/i.test(t);
  const hasEvidence = /\b(cite|source|reference|evidence|footnote|link)\b/i.test(t);
  const hasConstraints = /\b(under \d+|no more than|max(imum)?|do not|avoid|must|only|word limit)\b/i.test(lower);
  const hasValidation = /\b(verify|check|self-check|validate|before answering|sanity)\b/i.test(lower);
  const hasRisk = /\b(unsupported|unverified|do not invent|do not fabricate|safety|harm|sensitive)\b/i.test(lower);

  const clarity = clamp((hasRole ? 30 : 0) + (hasTask ? 40 : 0) + (wc > 20 ? 20 : wc) + (wc > 8 ? 10 : 0));
  const limits = clamp((hasFormat ? 55 : 0) + (hasConstraints ? 45 : 0));
  const audience = clamp(hasAudience ? 85 : 25);
  const evidence = clamp(hasEvidence ? 85 : 20);
  const validation = clamp(hasValidation ? 80 : 25);
  const risk = clamp(hasRisk ? 80 : hasEvidence ? 55 : 30);

  const scores = { clarity, evidence, audience, risk, validation, limits };
  const overall = Math.round(
    (clarity + evidence + audience + risk + validation + limits) / 6
  );

  const feedback = [
    { dim: "clarity" as const, ok: clarity >= 60, note: hasRole && hasTask ? "Role and task are present." : "Missing role or task. Try: 'You are … Your task is …'." },
    { dim: "limits" as const, ok: limits >= 60, note: hasFormat ? "Output format specified." : "No output format. Say: 'Return as a bulleted list / JSON / table.'" },
    { dim: "audience" as const, ok: audience >= 60, note: hasAudience ? "Audience is named." : "No audience. Add: 'for a {audience}'." },
    { dim: "evidence" as const, ok: evidence >= 60, note: hasEvidence ? "Asks for sources." : "No evidence requirement. Add: 'For every claim, cite the source.'" },
    { dim: "validation" as const, ok: validation >= 60, note: hasValidation ? "Includes a self-check." : "No validation step. Add: 'Before answering, verify {checklist}.'" },
    { dim: "risk" as const, ok: risk >= 60, note: hasRisk ? "Acknowledges unsupported claims." : "No risk handling. Add: 'Mark unsupported claims as [unverified].'" },
  ];

  return { scores, overall, feedback };
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export type ResponseAuditResult = {
  completeness: { score: number; note: string };
  evidence: { score: number; note: string };
  framing: { score: number; note: string };
  format: { score: number; note: string };
  confidence: { score: number; note: string };
  overall: number;
};

export function analyzeResponse(prompt: string, response: string): ResponseAuditResult {
  const r = response.trim();
  const wc = r ? r.split(/\s+/).length : 0;
  const hasCitations = /(\[\d+\]|https?:\/\/|\bsource[s]?\b|\baccording to\b)/i.test(r);
  const hasHedges = /\b(may|might|could|likely|possibly|approximately|appears|seems)\b/i.test(r);
  const hasAbsolutes = /\b(always|never|definitely|undoubtedly|guaranteed)\b/i.test(r);
  const hasStructure = /(\n\s*[-*\d]|\n#|\n\*\*)/.test(r);
  const promptAsks = prompt ? prompt.toLowerCase() : "";
  const asksList = /(list|bullet|steps?)/.test(promptAsks);
  const asksJson = /\bjson\b/.test(promptAsks);

  const completeness = {
    score: clamp(wc > 40 ? 80 : wc * 2),
    note: wc < 40 ? "Response is short — check that every part of the question is answered." : "Length suggests the question was addressed; verify each sub-part is covered.",
  };
  const evidence = {
    score: clamp(hasCitations ? 80 : 30),
    note: hasCitations ? "Some sources or citations are present." : "Potentially unsupported claims — no citations or sources detected.",
  };
  const framing = {
    score: clamp(hasAbsolutes ? 35 : hasHedges ? 75 : 55),
    note: hasAbsolutes
      ? "Contains absolute language ('always', 'never'). Re-check for overstatement."
      : hasHedges
        ? "Uses appropriate hedging."
        : "Tone is neutral; verify the framing matches the evidence.",
  };
  const format = {
    score: clamp((asksList && !hasStructure) || (asksJson && !/[{\[]/.test(r)) ? 30 : hasStructure ? 80 : 60),
    note: asksList && !hasStructure
      ? "You asked for a list, but the response is prose."
      : asksJson && !/[{\[]/.test(r)
        ? "You asked for JSON, but no JSON block was returned."
        : "Format roughly matches the request.",
  };
  const confidence = {
    score: clamp(hasAbsolutes && !hasCitations ? 30 : 65),
    note: hasAbsolutes && !hasCitations
      ? "High confidence with no citations — treat as potentially unsupported."
      : "Confidence appears reasonable given the supporting detail.",
  };

  const overall = Math.round(
    (completeness.score + evidence.score + framing.score + format.score + confidence.score) / 5
  );

  return { completeness, evidence, framing, format, confidence, overall };
}
