import { useState, useEffect, useRef } from "react";
import { MOCK_TESTS, MOCK_QUESTIONS, Question, SEEDED_CUET_REGISTRATIONS, CUETRegistration } from "../lib/data";
import { useLocalStorage } from "../hooks/use-local-storage";
import { CuetAuthScreen, CuetWelcomeBanner } from "../components/CuetRegistration";

type ExamState = "list" | "instructions" | "active" | "result";
type QStatus = "not-visited" | "answered" | "marked" | "not-answered";

interface ExamResult {
  testId: string;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  pct: number;
  answers: Record<number, number>;
}

const SUBJECT_FILTERS = ["All", "Physics", "Chemistry", "Biology", "Mathematics", "English", "General Test", "Reasoning"];

const DIFF_COLORS: Record<string, string> = {
  "Easy": "#16a34a",
  "Medium": "#d97706",
  "Hard": "#dc2626",
  "JEE Level": "#6c3fc7",
};

const SECTION_COLORS: Record<string, { bg: string; text: string }> = {
  "Section IA": { bg: "#dbeafe", text: "#1d4ed8" },
  "Section II": { bg: "#f3e8ff", text: "#7c3aed" },
  "Section III": { bg: "#fef3c7", text: "#92400e" },
};

function cuetPercentile(pct: number): string {
  if (pct >= 95) return "99+ (Top 1%)";
  if (pct >= 85) return "95–99 (Top 5%)";
  if (pct >= 75) return "85–95 (Top 15%)";
  if (pct >= 60) return "70–85 (Top 30%)";
  if (pct >= 40) return "50–70 (Average)";
  return "Below 50";
}

function getGrade(pct: number) {
  if (pct >= 90) return { grade: "A+", label: "Outstanding — NTA Top Scorer!", color: "#7a5500", bg: "#fffbea" };
  if (pct >= 75) return { grade: "A", label: "Excellent — Well above average", color: "#0a1f5c", bg: "#dbeafe" };
  if (pct >= 60) return { grade: "B+", label: "Good — Above CUET average", color: "#166534", bg: "#dcfce7" };
  if (pct >= 40) return { grade: "B", label: "Average — Needs improvement", color: "#92400e", bg: "#fef3c7" };
  if (pct >= 20) return { grade: "C", label: "Below average — Revise syllabus", color: "#374151", bg: "#f3f4f6" };
  return { grade: "D", label: "Needs significant revision", color: "#dc2626", bg: "#fee2e2" };
}

const ICON: Record<string, string> = {
  Physics: "⚡", Chemistry: "🧪", Biology: "🧬", Mathematics: "📐",
  English: "📖", "General Test": "🌍", Reasoning: "🧠",
};

export function MockTestsPanel() {
  const [filter, setFilter] = useState("All");
  const [examState, setExamState] = useState<ExamState>("list");
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [violations, setViolations] = useState(0);
  const [showViolation, setShowViolation] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [, setResults] = useLocalStorage<ExamResult[]>("mock_results", []);
  const [cuetActiveId, setCuetActiveId] = useLocalStorage("cuet_active_id", "");
  const [cuetRegs] = useLocalStorage<CUETRegistration[]>("cuet_registrations", SEEDED_CUET_REGISTRATIONS);
  const cuetCandidate = cuetRegs.find(r => r.id === cuetActiveId) ?? null;

  const filtered = MOCK_TESTS.filter(t => filter === "All" || t.subject === filter);
  const activeTest = MOCK_TESTS.find(t => t.id === activeTestId);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && examState === "active") {
        setViolations(v => { const nv = v + 1; setShowViolation(true); setTimeout(() => setShowViolation(false), 3000); return nv; });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [examState]);

  const openInstructions = (testId: string) => {
    const qs = MOCK_QUESTIONS[testId] || [];
    setActiveTestId(testId);
    setQuestions(qs);
    setCurrentQ(0);
    setAnswers({});
    setVisited({});
    setMarked({});
    setViolations(0);
    setExamState("instructions");
  };

  const startTest = () => {
    if (!activeTestId) return;
    const test = MOCK_TESTS.find(t => t.id === activeTestId)!;
    setTimeLeft(test.durationMinutes * 60);
    setVisited({ 0: true });
    setExamState("active");

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current!); doSubmit(); return 0; } return t - 1; });
    }, 1000);
  };

  const doSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const test = MOCK_TESTS.find(t => t.id === activeTestId)!;
    let correct = 0, wrong = 0, skipped = 0;
    questions.forEach((q, i) => {
      const ans = answers[i];
      if (ans === undefined) skipped++;
      else if (ans === q.correctOption) correct++;
      else wrong++;
    });
    const score = correct * 5 - wrong * 1;
    const maxScore = test.attemptCount * 5;
    const pct = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
    const r: ExamResult = { testId: activeTestId!, correct, wrong, skipped, score, maxScore, pct, answers };
    setResult(r);
    setResults(prev => [...prev, r]);
    setShowSubmitWarning(false);
    setExamState("result");
  };

  const trySubmit = () => {
    const attempted = Object.keys(answers).length;
    const test = MOCK_TESTS.find(t => t.id === activeTestId)!;
    if (attempted < test.attemptCount) { setShowSubmitWarning(true); return; }
    doSubmit();
  };

  const navigateTo = (i: number) => {
    setCurrentQ(i);
    setVisited(v => ({ ...v, [i]: true }));
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const timerPct = activeTest ? (timeLeft / (activeTest.durationMinutes * 60)) * 100 : 100;

  const qStatus = (i: number): QStatus => {
    if (answers[i] !== undefined) return "answered";
    if (marked[i]) return "marked";
    if (visited[i]) return "not-answered";
    return "not-visited";
  };

  const q = questions[currentQ];
  const attemptedCount = Object.keys(answers).length;

  /* ─── INSTRUCTIONS SCREEN ─── */
  if (examState === "instructions" && activeTest) {
    const sc = SECTION_COLORS[activeTest.cuetSection] || { bg: "#f3e8ff", text: "#7c3aed" };
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="p-5 text-white" style={{ background: "linear-gradient(135deg,#0a1f5c,#4c1d95)" }}>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest" style={{ background: sc.bg, color: sc.text }}>{activeTest.cuetSection}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">CUET 2026 Pattern</span>
            </div>
            <h3 className="font-serif font-black text-xl text-white mb-1">{activeTest.name}</h3>
            <p className="text-xs text-white/50">Paper Code: {activeTest.cuetCode}</p>
          </div>
          <div className="p-5">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { l: "Total Questions", v: `${activeTest.questionsCount}` },
                { l: "Attempt Any", v: `${activeTest.attemptCount}` },
                { l: "Time Allotted", v: `${activeTest.durationMinutes} Min` },
                { l: "Max Marks", v: `${activeTest.marks}` },
              ].map(s => (
                <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: "#f5f0ff" }}>
                  <div className="font-serif font-black text-xl text-[#4c1d95]">{s.v}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Marking scheme */}
            <div className="flex gap-2 mb-5 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                <span>✓</span> Correct: <span>+5 Marks</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                <span>✗</span> Incorrect: <span>−1 Mark</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                <span>—</span> Unattempted: <span>0 Marks</span>
              </div>
            </div>

            {/* Legend */}
            <div className="mb-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Question Status Legend</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { color: "#6b7280", border: "#e5e7eb", label: "Not Visited" },
                  { color: "#7c3aed", border: "#7c3aed", label: "Answered" },
                  { color: "#d97706", border: "#d97706", label: "Marked for Review" },
                  { color: "#ef4444", border: "#ef4444", label: "Visited but Not Answered" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md border-2 flex-shrink-0" style={{ background: s.color === "#6b7280" ? "#f3f4f6" : s.color, borderColor: s.border, opacity: s.color === "#6b7280" ? 1 : 0.9 }} />
                    <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="mb-5 space-y-1.5">
              {[
                `You must attempt any ${activeTest.attemptCount} of the ${activeTest.questionsCount} questions. Attempting more than ${activeTest.attemptCount} is allowed but only first ${activeTest.attemptCount} extra attempts may matter — strategise!`,
                "Marking Scheme: +5 for each correct answer, −1 for each incorrect answer, 0 for unattempted.",
                "Do NOT switch browser tabs or minimize the window. Every violation is recorded.",
                `The timer is set to ${activeTest.durationMinutes} minutes. The exam auto-submits when the timer ends.`,
                "You can mark questions for review and return to them. Use the navigator panel.",
                "Your result and CUET estimated percentile will be shown immediately after submission.",
              ].map((rule, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5" style={{ background: "#0a1f5c" }}>{i + 1}</div>
                  <p className="text-xs text-gray-700 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setExamState("list")} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">← Back</button>
              <button onClick={startTest} data-testid="btn-start-exam" className="flex-1 py-2.5 rounded-xl text-sm font-extrabold text-white" style={{ background: "linear-gradient(90deg,#0a1f5c,#4c1d95)" }}>
                Start Exam →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── ACTIVE EXAM ─── */
  if (examState === "active" && q && activeTest) {
    const isOverAttempted = attemptedCount > activeTest.attemptCount;
    const isAR = q.type === "AR";
    const hasPassage = !!q.passage;

    return (
      <div>
        {/* Violation Overlay */}
        {showViolation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(120,0,0,0.88)" }}>
            <div className="text-white text-center p-8 max-w-sm">
              <div className="text-5xl mb-3">⚠️</div>
              <div className="text-xl font-bold mb-2">Tab Switch Detected!</div>
              <div className="text-sm opacity-75">This is Violation #{violations}. Continued violations may be reported to the exam authority.</div>
            </div>
          </div>
        )}

        {/* Submit Warning Modal */}
        {showSubmitWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
              <div className="text-3xl mb-3 text-center">⚠️</div>
              <h3 className="font-bold text-center text-gray-900 mb-2">Insufficient Attempts</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                You have attempted <strong>{attemptedCount}</strong> of <strong>{activeTest.attemptCount}</strong> required questions.<br />
                Submitting now may reduce your score significantly. Continue anyway?
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowSubmitWarning(false)} className="flex-1 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-200">Continue Exam</button>
                <button onClick={doSubmit} className="flex-1 py-2 rounded-lg text-sm font-bold text-white" style={{ background: "#dc2626" }}>Submit Anyway</button>
              </div>
            </div>
          </div>
        )}

        {/* Exam Header */}
        <div className="rounded-xl p-4 mb-3 border-2 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a1f5c,#4c1d95)", borderColor: "rgba(201,168,76,0.25)" }}>
          <div className="flex justify-between items-start flex-wrap gap-3 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: "#c9a84c", color: "#0a1f5c" }}>NTA CUET 2026</span>
                <span className="text-[10px] text-white/50 font-semibold">{activeTest.cuetCode}</span>
              </div>
              <div className="text-white font-bold text-sm mb-0.5">{activeTest.name}</div>
              <div className="text-xs text-white/50">{activeTest.cuetSection} · +5 / −1 Marking</div>
            </div>
            <div className="text-right">
              <div className="font-serif font-black text-3xl" style={{ color: timeLeft < 300 ? "#fca5a5" : "#f0d060", fontFeatureSettings: '"tnum"' }}>{fmt(timeLeft)}</div>
              <div className="text-[10px] text-white/50">Time Remaining</div>
            </div>
          </div>

          {/* Attempt progress bar */}
          <div className="mt-3 flex items-center gap-3 relative z-10">
            <div className="text-xs font-bold" style={{ color: isOverAttempted ? "#fca5a5" : attemptedCount >= activeTest.attemptCount ? "#86efac" : "#f0d060" }}>
              Answered: {attemptedCount} / {activeTest.attemptCount} required
              {isOverAttempted && <span className="ml-1">(⚠ over-attempted)</span>}
            </div>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (attemptedCount / activeTest.attemptCount) * 100)}%`, background: attemptedCount >= activeTest.attemptCount ? "#86efac" : "#c9a84c" }} />
            </div>
          </div>

          {/* Timer bar */}
          <div className="mt-1.5 h-1 rounded-full overflow-hidden relative z-10" style={{ background: "rgba(255,255,255,0.10)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${timerPct}%`, background: timeLeft < 300 ? "#ef4444" : "rgba(240,208,96,0.6)" }} />
          </div>
        </div>

        <div className={`flex gap-3 ${hasPassage ? "flex-col lg:flex-row" : "flex-col"}`}>
          {/* Passage pane */}
          {hasPassage && (
            <div className="lg:w-[45%] bg-white border border-blue-200 rounded-xl p-5 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Reading Passage</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{q.passage}</p>
            </div>
          )}

          <div className="flex-1 space-y-3">
            {/* Navigator */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Navigator</span>
                <div className="flex gap-3 text-[10px] text-gray-400">
                  {[{ color: "#7c3aed", label: `${Object.keys(answers).length} Answered` }, { color: "#d97706", label: `${Object.keys(marked).filter(k => marked[+k]).length} Marked` }].map(s => (
                    <span key={s.label} className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: s.color }} />
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((_, i) => {
                  const st = qStatus(i);
                  return (
                    <button key={i} onClick={() => navigateTo(i)} data-testid={`qnav-${i}`}
                      className="w-8 h-8 rounded-lg text-xs font-bold transition"
                      style={{
                        background: st === "answered" ? "#7c3aed" : st === "marked" ? "#d97706" : st === "not-answered" ? "#fee2e2" : "#f3f4f6",
                        color: st === "answered" ? "#fff" : st === "marked" ? "#fff" : st === "not-answered" ? "#dc2626" : "#6b7280",
                        border: i === currentQ ? "2.5px solid #c9a84c" : "1.5px solid transparent",
                        transform: i === currentQ ? "scale(1.1)" : "scale(1)",
                      }}>
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-extrabold tracking-wider" style={{ color: "#c9a84c" }}>Q.{currentQ + 1} of {questions.length}</span>
                {isAR && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wide">Assertion-Reason Type</span>}
                {hasPassage && !isAR && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">Reading Comprehension</span>}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: DIFF_COLORS[q.difficulty] }}>{q.difficulty}</span>
                <span className="px-2 py-0.5 rounded-lg text-[10px] text-gray-500 bg-gray-100">{q.section}</span>
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-green-700 bg-green-50">+5 marks</span>
              </div>

              {/* AR question style */}
              {isAR ? (
                <div className="mb-4 space-y-2">
                  {q.text.split("\n").map((line, li) => (
                    <div key={li} className={`p-3 rounded-lg text-sm font-medium leading-relaxed ${li === 0 ? "bg-indigo-50 text-indigo-900 border border-indigo-200" : "bg-amber-50 text-amber-900 border border-amber-200"}`}>
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-gray-900 leading-relaxed mb-4">{q.text}</p>
              )}

              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button key={oi} onClick={() => setAnswers(a => ({ ...a, [currentQ]: oi }))} data-testid={`opt-${oi}`}
                    className="w-full flex items-start gap-3 px-4 py-3 rounded-xl border-[1.5px] text-sm text-left transition"
                    style={{
                      borderColor: answers[currentQ] === oi ? "#7c3aed" : "#e5e7eb",
                      background: answers[currentQ] === oi ? "#f5f0ff" : "#fff",
                      color: answers[currentQ] === oi ? "#4c1d95" : "#374151",
                      fontWeight: answers[currentQ] === oi ? 600 : 400
                    }}>
                    <span className="w-6 h-6 min-w-[24px] rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ borderColor: "currentColor" }}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => navigateTo(Math.max(0, currentQ - 1))} disabled={currentQ === 0} data-testid="btn-prev" className="px-3 py-2 rounded-lg border text-xs font-semibold text-gray-600 border-gray-300 disabled:opacity-40">← Prev</button>
              <button onClick={() => setMarked(m => ({ ...m, [currentQ]: !m[currentQ] }))} data-testid="btn-mark"
                className="px-3 py-2 rounded-lg border text-xs font-semibold"
                style={{ background: marked[currentQ] ? "#fef3c7" : "#fff", borderColor: marked[currentQ] ? "#d97706" : "#e5e7eb", color: marked[currentQ] ? "#92400e" : "#6b7280" }}>
                {marked[currentQ] ? "⭐ Marked" : "☆ Mark for Review"}
              </button>
              <div className="flex-1" />
              <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQ + 1))} disabled={currentQ === questions.length - 1} data-testid="btn-next" className="px-3 py-2 rounded-lg border text-xs font-semibold text-gray-600 border-gray-300 disabled:opacity-40">Next →</button>
              <button onClick={trySubmit} data-testid="btn-submit" className="px-5 py-2 rounded-lg text-xs font-bold text-[#0a1f5c]" style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)" }}>Submit Paper ✓</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── RESULT ─── */
  if (examState === "result" && result && activeTest) {
    const g = getGrade(result.pct);
    const sections: Record<string, { correct: number; wrong: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!sections[q.section]) sections[q.section] = { correct: 0, wrong: 0, total: 0 };
      sections[q.section].total++;
      const ans = result.answers[i];
      if (ans === q.correctOption) sections[q.section].correct++;
      else if (ans !== undefined) sections[q.section].wrong++;
    });

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow">
          {/* Header */}
          <div className="p-5 text-white text-center" style={{ background: "linear-gradient(135deg,#0a1f5c,#4c1d95)" }}>
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">NTA CUET 2026 — Result</div>
            <div className="font-bold text-sm text-white">{activeTest.name}</div>
            <div className="text-[10px] text-white/40 mt-0.5">{activeTest.cuetSection} · {activeTest.cuetCode}</div>
          </div>

          <div className="p-6">
            {/* Score ring */}
            <div className="flex flex-col items-center mb-5">
              <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-3 border-[6px]" style={{ borderColor: result.pct >= 60 ? "#7c3aed" : result.pct >= 40 ? "#d97706" : "#dc2626" }}>
                <div className="font-serif font-black text-3xl" style={{ color: "#0a1f5c" }}>{result.pct}%</div>
                <div className="text-[10px] text-gray-400">Score</div>
              </div>
              <div className="inline-block px-5 py-1 rounded-full text-sm font-bold mb-1" style={{ background: g.bg, color: g.color }}>{g.grade} — {g.label}</div>
              <div className="text-xs text-gray-400">CUET Estimated Percentile: <strong className="text-gray-700">{cuetPercentile(result.pct)}</strong></div>
            </div>

            {/* Marks breakdown */}
            <div className="rounded-xl p-4 mb-5 text-sm" style={{ background: "#f8f9ff", border: "1px solid #e0e7ff" }}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Marks Breakdown (+5 / −1)</div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-green-700">✓ {result.correct} Correct × 5</span>
                  <span className="font-bold text-green-700">+{result.correct * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">✗ {result.wrong} Wrong × 1</span>
                  <span className="font-bold text-red-600">−{result.wrong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">— {result.skipped} Unattempted</span>
                  <span className="font-bold text-gray-400">0</span>
                </div>
                <div className="border-t border-gray-200 pt-1.5 flex justify-between">
                  <span className="font-bold text-gray-800">Net Score</span>
                  <span className="font-serif font-black text-[#0a1f5c]">{result.score} / {result.maxScore}</span>
                </div>
              </div>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[{ num: result.correct, label: "Correct", color: "#16a34a" }, { num: result.wrong, label: "Wrong", color: "#dc2626" }, { num: result.skipped, label: "Skipped", color: "#d97706" }].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center bg-gray-50">
                  <div className="font-serif font-bold text-2xl" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Section-wise */}
            <div className="mb-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Section-wise Performance</div>
              {Object.entries(sections).map(([sec, data]) => (
                <div key={sec} className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-0.5">
                    <span className="font-medium">{sec}</span>
                    <span>{data.correct}/{data.total} correct</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="h-full rounded-l-full" style={{ width: `${(data.correct / data.total) * 100}%`, background: "#7c3aed" }} />
                    <div className="h-full" style={{ width: `${(data.wrong / data.total) * 100}%`, background: "#fca5a5" }} />
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-[#7c3aed]" /> Correct</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-[#fca5a5]" /> Wrong</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-gray-200" /> Skipped</span>
              </div>
            </div>

            {result.pct >= 60 && (
              <div className="rounded-xl p-4 flex items-center gap-3 mb-5" style={{ background: "linear-gradient(135deg,#c9a84c,#e8b840)" }}>
                <span className="text-2xl">🏆</span>
                <div className="text-sm font-semibold text-[#0a1f5c]">
                  Great score! You may qualify for <strong>SIU Scholarship</strong>. Register for SIUAT to claim your merit award.
                </div>
              </div>
            )}

            <button onClick={() => setExamState("list")} data-testid="btn-back-list" className="w-full py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "#0a1f5c" }}>
              ← Back to Mock Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── TEST LIST ─── */

  // Show registration / login gate if no CUET candidate logged in
  if (!cuetCandidate) {
    return (
      <div>
        <CuetAuthScreen onLogin={setCuetActiveId} />
      </div>
    );
  }

  return (
    <div>
      {/* Logged-in candidate banner */}
      <CuetWelcomeBanner candidate={cuetCandidate} onLogout={() => setCuetActiveId("")} />

      {/* CUET Pattern Banner */}
      <div className="rounded-xl p-4 mb-5 flex items-center gap-4" style={{ background: "linear-gradient(135deg,#0a1f5c,#1e3a8a)" }}>
        <div className="text-3xl">📋</div>
        <div className="flex-1">
          <div className="text-white font-bold text-sm mb-0.5">CUET 2026 — NTA Official Pattern</div>
          <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            All mock tests follow the official NTA CUET pattern · Section II Domain Subjects · Section III General Test · Section IA Language
          </div>
        </div>
        <div className="flex-shrink-0 space-y-1 text-right text-[11px]">
          <div className="font-bold text-green-300">+5 Correct</div>
          <div className="font-bold text-red-300">−1 Wrong</div>
          <div className="text-white/40">0 Skipped</div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-5">
        {SUBJECT_FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} data-testid={`filter-${f}`}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
            style={{ background: filter === f ? "#0a1f5c" : "#fff", color: filter === f ? "#fff" : "#6b7280", border: `1.5px solid ${filter === f ? "#0a1f5c" : "#e5e7eb"}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* Test Cards */}
      <div className="space-y-3">
        {filtered.map(test => {
          const sc = SECTION_COLORS[test.cuetSection] || { bg: "#f3e8ff", text: "#7c3aed" };
          return (
            <div key={test.id} data-testid={`test-card-${test.id}`}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0a1f5c] hover:shadow-md transition group">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${test.iconColor}`}>
                  {ICON[test.subject] || "📚"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: sc.bg, color: sc.text }}>{test.cuetSection}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: DIFF_COLORS[test.difficulty] }}>{test.difficulty}</span>
                  </div>
                  <div className="font-bold text-gray-900 text-sm mb-1.5">{test.name}</div>
                  <div className="flex items-center gap-3 flex-wrap text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">⏱ <strong>{test.durationMinutes} min</strong></span>
                    <span>·</span>
                    <span>❓ <strong>{test.questionsCount}</strong> Qs</span>
                    <span>·</span>
                    <span>✏️ Attempt any <strong>{test.attemptCount}</strong></span>
                    <span>·</span>
                    <span>📊 Max <strong>{test.marks}</strong> marks</span>
                  </div>
                  {/* Marking pills */}
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700">+5 Correct</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600">−1 Wrong</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500">0 Skipped</span>
                    {test.questionsCount > test.attemptCount && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">Choice-based</span>
                    )}
                  </div>
                </div>
                <button onClick={() => openInstructions(test.id)} data-testid={`start-${test.id}`}
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold text-white transition hover:brightness-110 self-center"
                  style={{ background: "linear-gradient(135deg,#0a1f5c,#4c1d95)" }}>
                  Start →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📚</div>
          <div className="font-semibold">No tests found for this filter</div>
        </div>
      )}
    </div>
  );
}
