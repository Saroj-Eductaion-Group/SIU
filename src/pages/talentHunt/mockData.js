export const MOCK_TESTS = [
  { id: "p1", subject: "Physics",      name: "CUET Physics — Section II Full Mock",       cuetSection: "Section II",  cuetCode: "PHYS101", difficulty: "Hard",      durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-blue-100 text-blue-700" },
  { id: "c1", subject: "Chemistry",    name: "CUET Chemistry — Organic & Inorganic",      cuetSection: "Section II",  cuetCode: "CHEM101", difficulty: "Medium",    durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-green-100 text-green-700" },
  { id: "b1", subject: "Biology",      name: "CUET Biology — Genetics & Biotech",         cuetSection: "Section II",  cuetCode: "BIO101",  difficulty: "Medium",    durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-emerald-100 text-emerald-700" },
  { id: "m1", subject: "Mathematics",  name: "CUET Mathematics — Calculus & Algebra",     cuetSection: "Section II",  cuetCode: "MATH101", difficulty: "JEE Level", durationMinutes: 60, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-red-100 text-red-700" },
  { id: "e1", subject: "English",      name: "CUET English Core — Section IA",            cuetSection: "Section IA",  cuetCode: "ENG101",  difficulty: "Medium",    durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-purple-100 text-purple-700" },
  { id: "g1", subject: "General Test", name: "CUET General Test — Section III",           cuetSection: "Section III", cuetCode: "GT101",   difficulty: "Medium",    durationMinutes: 60, questionsCount: 16, attemptCount: 13, marks: 65, iconColor: "bg-amber-100 text-amber-700" },
  { id: "r1", subject: "Reasoning",    name: "CUET Logical Reasoning — Section III",      cuetSection: "Section III", cuetCode: "LR101",   difficulty: "Hard",      durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-indigo-100 text-indigo-700" },
  { id: "p2", subject: "Physics",      name: "CUET Physics Basics — Practice Set",        cuetSection: "Section II",  cuetCode: "PHYS001", difficulty: "Easy",      durationMinutes: 30, questionsCount: 10, attemptCount: 10, marks: 50, iconColor: "bg-sky-100 text-sky-700" },
];

export const SUBJECT_FILTERS = ["All","Physics","Chemistry","Biology","Mathematics","English","General Test","Reasoning","Botany","Zoology"];

export const DIFF_COLORS = {
  "Easy":      "#16a34a",
  "Medium":    "#d97706",
  "Hard":      "#dc2626",
  "JEE Level": "#6c3fc7",
};

export const SECTION_COLORS = {
  "Section IA":  { bg: "#dbeafe", text: "#1d4ed8" },
  "Section II":  { bg: "#f3e8ff", text: "#7c3aed" },
  "Section III": { bg: "#fef3c7", text: "#92400e" },
};

export const SUBJECT_ICONS = {
  Physics: "⚡", Chemistry: "🧪", Biology: "🧬", Mathematics: "📐",
  English: "📖", "General Test": "🌍", Reasoning: "🧠",
};

export function getMockGrade(pct) {
  if (pct >= 90) return { grade: "A+", label: "Outstanding — NTA Top Scorer!",      color: "#7a5500", bg: "#fffbea" };
  if (pct >= 75) return { grade: "A",  label: "Excellent — Well above average",     color: "#0a1f5c", bg: "#dbeafe" };
  if (pct >= 60) return { grade: "B+", label: "Good — Above CUET average",          color: "#166534", bg: "#dcfce7" };
  if (pct >= 40) return { grade: "B",  label: "Average — Needs improvement",        color: "#92400e", bg: "#fef3c7" };
  if (pct >= 20) return { grade: "C",  label: "Below average — Revise syllabus",    color: "#374151", bg: "#f3f4f6" };
  return               { grade: "D",  label: "Needs significant revision",          color: "#dc2626", bg: "#fee2e2" };
}

export function cuetPercentile(pct) {
  if (pct >= 95) return "99+ (Top 1%)";
  if (pct >= 85) return "95–99 (Top 5%)";
  if (pct >= 75) return "85–95 (Top 15%)";
  if (pct >= 60) return "70–85 (Top 30%)";
  if (pct >= 40) return "50–70 (Average)";
  return "Below 50";
}
