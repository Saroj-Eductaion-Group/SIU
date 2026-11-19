import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { MOCK_TESTS, MOCK_QUESTIONS } from "../lib/data";

const BASE =
  import.meta.env.VITE_API_URL &&
  import.meta.env.VITE_API_URL !== "http://localhost:5000/api"
    ? import.meta.env.VITE_API_URL
    : typeof window !== "undefined" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1" &&
      !window.location.hostname.startsWith("192.168.") &&
      !window.location.hostname.startsWith("10.") &&
      !window.location.hostname.startsWith("172.")
    ? "/api"
    : `http://${
        typeof window !== "undefined" ? window.location.hostname : "localhost"
      }:5000/api`;

type MockResult = {
  testId: string;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  pct: number;
  savedAt?: string;
  mockTitle?: string;
  subject?: string;
  answers?: Record<number, number>;
  sectionBreakdown?: Record<string, { correct: number; wrong: number; total: number }>;
  difficultyBreakdown?: Record<string, { correct: number; wrong: number; total: number }>;
};

type Candidate = {
  _id: string;
  neetId: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  mockResults: MockResult[];
};

type LocalResult = {
  testId: string;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  pct: number;
  answers?: Record<number, number>;
  sectionBreakdown?: Record<string, { correct: number; wrong: number; total: number }>;
  difficultyBreakdown?: Record<string, { correct: number; wrong: number; total: number }>;
};

function getTestTitle(testId: string) {
  const t = MOCK_TESTS.find((m) => m.id === testId);
  return t ? t.name : testId;
}

function getTestSubject(testId: string) {
  const t = MOCK_TESTS.find((m) => m.id === testId);
  return t ? t.subject : "";
}

function scoreColor(pct: number) {
  return pct >= 75 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";
}

function ScoreBar({ pct }: { pct: number }) {
  const color = scoreColor(pct);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.max(pct, 2)}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold w-9 text-right tabular-nums" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

function RankBadge({ idx }: { idx: number }) {
  if (idx === 0) return <span className="text-xl">🥇</span>;
  if (idx === 1) return <span className="text-xl">🥈</span>;
  if (idx === 2) return <span className="text-xl">🥉</span>;
  return <span className="text-xs font-bold text-gray-500 tabular-nums">#{idx + 1}</span>;
}

function StatCard({ val, label, color }: { val: string | number; label: string; color: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
      <div className="font-serif font-black text-2xl" style={{ color }}>{val}</div>
      <div className="text-[11px] text-gray-400 mt-1 font-medium">{label}</div>
    </div>
  );
}

// ── Detailed Report Modal ──────────────────────────────────────────────────────
function DetailedReport({ result, onClose }: { result: MockResult; onClose: () => void }) {
  const [showReview, setShowReview] = useState(false);
  const pct = result.pct ?? 0;
  const color = scoreColor(pct);
  const testTitle = getTestTitle(result.testId);
  const questions = MOCK_QUESTIONS[result.testId] ?? [];

  // Build section breakdown from stored data or recompute from answers+questions
  const sectionData: Record<string, { correct: number; wrong: number; total: number }> =
    result.sectionBreakdown ?? (() => {
      const data: Record<string, { correct: number; wrong: number; total: number }> = {};
      if (result.answers && questions.length > 0) {
        questions.forEach((q, i) => {
          const sec = q.section;
          if (!data[sec]) data[sec] = { correct: 0, wrong: 0, total: 0 };
          data[sec].total++;
          const ans = result.answers![i];
          if (ans !== undefined) {
            if (ans === q.correctOption) data[sec].correct++;
            else data[sec].wrong++;
          }
        });
      }
      return data;
    })();

  // Difficulty breakdown
  const diffData: Record<string, { correct: number; wrong: number; total: number }> =
    result.difficultyBreakdown ?? (() => {
      const data: Record<string, { correct: number; wrong: number; total: number }> = {};
      if (result.answers && questions.length > 0) {
        questions.forEach((q, i) => {
          const diff = q.difficulty;
          if (!data[diff]) data[diff] = { correct: 0, wrong: 0, total: 0 };
          data[diff].total++;
          const ans = result.answers![i];
          if (ans !== undefined) {
            if (ans === q.correctOption) data[diff].correct++;
            else data[diff].wrong++;
          }
        });
      }
      return data;
    })();

  const secEntries = Object.entries(sectionData);
  const weakest = secEntries.length
    ? secEntries.reduce((a, b) =>
        (a[1].total ? a[1].correct / a[1].total : 0) < (b[1].total ? b[1].correct / b[1].total : 0) ? a : b
      )[0]
    : null;
  const strongest = secEntries.length
    ? secEntries.reduce((a, b) =>
        (a[1].total ? a[1].correct / a[1].total : 0) > (b[1].total ? b[1].correct / b[1].total : 0) ? a : b
      )[0]
    : null;

  const DIFF_ORDER = ["Easy", "Medium", "Hard", "JEE Level"];
  const DIFF_COLOR: Record<string, string> = {
    Easy: "#16a34a", Medium: "#2563eb", Hard: "#ea580c", "JEE Level": "#7c3aed",
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 py-6 px-3"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#022c22,#064e3b)" }} className="px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">
                NEET Mock · Saroj International University
              </p>
              <h2 className="text-white font-bold text-lg mt-1 leading-tight">{testTitle}</h2>
              {result.savedAt && (
                <p className="text-white/40 text-xs mt-0.5">
                  {new Date(result.savedAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-black text-white font-outfit">{pct}%</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest">Score</div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { val: result.correct, label: "Correct", bg: "#f0fdf4", color: "#16a34a" },
              { val: result.wrong, label: "Wrong", bg: "#fef2f2", color: "#dc2626" },
              { val: result.skipped, label: "Skipped", bg: "#fef3c7", color: "#d97706" },
              { val: `${result.score}/${result.maxScore}`, label: "Marks", bg: "#eff6ff", color: "#1d4ed8" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
                <div className="font-black text-lg font-outfit" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Score progress */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-gray-600">Overall Performance</span>
              <span className="text-xs font-bold" style={{ color }}>
                {pct >= 75 ? "Strong 💪" : pct >= 50 ? "Average 📈" : "Needs Work ⚠"}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(pct, 2)}%`, background: color }} />
            </div>
          </div>

          {/* Subject-wise breakdown */}
          {secEntries.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="font-bold text-sm text-gray-800">📊 Subject-wise Breakdown</p>
                {weakest && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600">
                    ⚠ Weakest: {weakest}
                  </span>
                )}
              </div>
              <div className="divide-y divide-gray-50">
                {secEntries.map(([sec, d]) => {
                  const sp = d.total ? Math.round((d.correct / d.total) * 100) : 0;
                  const sc = sp >= 75 ? "#16a34a" : sp >= 50 ? "#1d4ed8" : sp >= 35 ? "#d97706" : "#dc2626";
                  const sbg = sp >= 75 ? "#f0fdf4" : sp >= 50 ? "#eff6ff" : sp >= 35 ? "#fef3c7" : "#fef2f2";
                  const status = sp >= 75 ? "Strong" : sp >= 50 ? "Average" : sp >= 35 ? "Weak" : "Critical";
                  return (
                    <div key={sec} className="px-4 py-3"
                      style={{ background: sec === weakest ? "#fff5f5" : sec === strongest ? "#f0fdf4" : "#fff" }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-gray-900">{sec}</p>
                          <div className="flex gap-1">
                            {sec === weakest && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">WEAKEST</span>
                            )}
                            {sec === strongest && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">STRONGEST</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: sbg, color: sc }}>{status}</span>
                          <span className="font-black text-base font-outfit" style={{ color: sc }}>{sp}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div className="h-full rounded-full" style={{ width: `${Math.max(sp, 2)}%`, background: sc }} />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg px-2 py-1.5 text-center bg-green-50">
                          <div className="font-bold text-sm text-green-700">{d.correct}</div>
                          <div className="text-[9px] text-gray-400">Correct</div>
                        </div>
                        <div className="rounded-lg px-2 py-1.5 text-center bg-red-50">
                          <div className="font-bold text-sm text-red-600">{d.wrong}</div>
                          <div className="text-[9px] text-gray-400">Wrong</div>
                        </div>
                        <div className="rounded-lg px-2 py-1.5 text-center bg-gray-50">
                          <div className="font-bold text-sm text-gray-500">{d.total - d.correct - d.wrong}</div>
                          <div className="text-[9px] text-gray-400">Skipped</div>
                        </div>
                      </div>
                      {sp < 50 && (
                        <div className="mt-2 rounded-lg px-3 py-2 text-[11px] text-amber-800 font-medium"
                          style={{ background: "#fef3c7", border: "1px solid #fde68a" }}>
                          💡 Focus area: Revise {sec} — attempt more practice questions.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Difficulty-wise breakdown */}
          {Object.keys(diffData).length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-800">🎯 Difficulty-wise Analysis</p>
              </div>
              <div className="divide-y divide-gray-50">
                {DIFF_ORDER.filter((d) => diffData[d]?.total > 0).map((diff) => {
                  const d = diffData[diff];
                  const dp = Math.round((d.correct / d.total) * 100);
                  const dc = DIFF_COLOR[diff];
                  return (
                    <div key={diff} className="px-4 py-3 flex items-center gap-3">
                      <span className="text-xs font-bold w-20 shrink-0" style={{ color: dc }}>{diff}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.max(dp, 2)}%`, background: dc }} />
                      </div>
                      <div className="shrink-0 flex items-center gap-2 text-xs text-gray-500">
                        <span>{d.correct}/{d.total}</span>
                        <span className="font-bold text-white px-1.5 py-0.5 rounded-full text-[10px]"
                          style={{ background: dc }}>{dp}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question-wise review (only if answers stored) */}
          {questions.length > 0 && result.answers && (
            <div>
              <button
                onClick={() => setShowReview((r) => !r)}
                className="w-full py-3 rounded-xl text-sm font-bold transition"
                style={{
                  background: showReview ? "#f5f0ff" : "#eff6ff",
                  color: showReview ? "#4c1d95" : "#1d4ed8",
                  border: "1.5px solid " + (showReview ? "#c4b5fd" : "#bfdbfe"),
                }}
              >
                {showReview ? "▲ Hide Question Review" : "▼ Review All Questions with Answers"}
              </button>

              {showReview && (
                <div className="mt-3 space-y-2 max-h-[500px] overflow-y-auto">
                  {questions.map((q, i) => {
                    const userAns = result.answers![i];
                    const isCorrect = userAns === q.correctOption;
                    const isSkipped = userAns === undefined;
                    const borderColor = isSkipped ? "#e5e7eb" : isCorrect ? "#86efac" : "#fca5a5";
                    const bgColor = isSkipped ? "#f9fafb" : isCorrect ? "#f0fdf4" : "#fff5f5";
                    const statusLabel = isCorrect ? "✓ Correct" : isSkipped ? "— Skipped" : "✗ Wrong";
                    const statusBg = isCorrect ? "#16a34a" : isSkipped ? "#9ca3af" : "#dc2626";
                    return (
                      <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor }}>
                        <div className="flex items-center gap-2 px-3 py-2 flex-wrap" style={{ background: bgColor }}>
                          <span className="font-bold text-xs text-orange-500">Q.{i + 1}</span>
                          <span className="px-1.5 py-0.5 rounded text-white text-[10px] font-bold" style={{ background: statusBg }}>
                            {statusLabel}
                          </span>
                          <span className="text-[10px] text-gray-400">{q.section} · {q.marks} marks · {q.difficulty}</span>
                        </div>
                        <div className="p-3" style={{ background: bgColor }}>
                          <p className="font-medium text-gray-900 mb-2 text-xs leading-relaxed">{q.text}</p>
                          <div className="space-y-1">
                            {q.options.map((opt, j) => {
                              const isSel = userAns === j;
                              const isAns = j === q.correctOption;
                              return (
                                <div key={j} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs"
                                  style={{
                                    background: isAns ? "#dcfce7" : isSel && !isAns ? "#fee2e2" : "#f9fafb",
                                    border: "1px solid " + (isAns ? "#86efac" : isSel && !isAns ? "#fca5a5" : "#e5e7eb"),
                                    fontWeight: isAns || isSel ? 600 : 400,
                                    color: isAns ? "#166534" : isSel && !isAns ? "#991b1b" : "#374151",
                                  }}>
                                  <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0">
                                    {String.fromCharCode(65 + j)}
                                  </span>
                                  <span className="flex-1">{opt}</span>
                                  {isAns && <span className="text-[10px] font-bold text-green-700">✓ Correct</span>}
                                  {isSel && !isAns && <span className="text-[10px] font-bold text-red-600">Your Answer</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button onClick={onClose}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ResultsPanel ──────────────────────────────────────────────────────────
export function ResultsPanel() {
  const [cuetActiveId] = useLocalStorage("cuet_active_id", "");
  const [localResults] = useLocalStorage<LocalResult[]>("mock_results", []);
  const [tab, setTab] = useState<"leaderboard" | "mine">("leaderboard");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reportResult, setReportResult] = useState<MockResult | null>(null);

  useEffect(() => {
    fetch(`${BASE}/neet/admin/all`)
      .then((r) => r.json())
      .then((d) =>
        setCandidates(
          Array.isArray(d) ? d.filter((c: any) => c.mockResults?.length > 0) : []
        )
      )
      .catch(() => setCandidates([]))
      .finally(() => setLoading(false));
  }, []);

  const leaderboard = candidates
    .map((c) => {
      const pcts = c.mockResults.map((r) => r.pct ?? 0);
      const best = pcts.length ? Math.max(...pcts) : 0;
      const avg = pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : 0;
      return { ...c, best, avg, attempts: c.mockResults.length };
    })
    .sort((a, b) => b.best - a.best);

  const myDbCandidate = candidates.find(
    (c) => cuetActiveId && c.neetId.toUpperCase() === cuetActiveId.toUpperCase()
  );
  const myResults: MockResult[] = myDbCandidate?.mockResults.length
    ? myDbCandidate.mockResults
    : localResults.map((r) => ({
        ...r,
        mockTitle: getTestTitle(r.testId),
        subject: getTestSubject(r.testId),
      }));

  const myBest = myResults.length ? Math.max(...myResults.map((r) => r.pct ?? 0)) : null;
  const myAvg = myResults.length
    ? Math.round(myResults.reduce((a, b) => a + (b.pct ?? 0), 0) / myResults.length)
    : null;

  const totalAttempts = candidates.reduce((s, c) => s + c.mockResults.length, 0);

  return (
    <div className="space-y-5">
      {reportResult && (
        <DetailedReport result={reportResult} onClose={() => setReportResult(null)} />
      )}

      {/* Hero Header */}
      <div className="rounded-2xl p-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#022c22 0%,#064e3b 60%,#0d9488 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
        <div className="relative z-10">
          <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}>
            Saroj International University
          </span>
          <h2 className="font-serif font-black text-2xl text-white mb-1">NEET 2026 — Mock Test Results</h2>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {loading ? (
              <span className="animate-pulse">Fetching data…</span>
            ) : (
              <>
                <strong className="text-white">{candidates.length}</strong> candidates &nbsp;·&nbsp;{" "}
                <strong className="text-white">{totalAttempts}</strong> total attempts
              </>
            )}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {(["leaderboard", "mine"] as const).map((id) => (
          <button key={id} onClick={() => setTab(id)}
            className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all"
            style={{
              background: tab === id ? "#fff" : "transparent",
              color: tab === id ? "#064e3b" : "#9ca3af",
              boxShadow: tab === id ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
            }}>
            {id === "leaderboard" ? "🏆 Leaderboard" : "📊 My Results"}
          </button>
        ))}
      </div>

      {/* LEADERBOARD TAB */}
      {tab === "leaderboard" && (
        <div>
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />)}
            </div>
          )}

          {!loading && leaderboard.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="font-bold text-gray-700 mb-2 text-lg">No Results Yet</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">
                Go to the <strong className="text-gray-600">Mock Tests</strong> tab, login with your NEET ID and attempt a test.
              </p>
            </div>
          )}

          {!loading && leaderboard.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid text-[10px] font-extrabold uppercase tracking-widest text-white px-4 py-3"
                style={{
                  background: "linear-gradient(90deg,#022c22,#064e3b)",
                  gridTemplateColumns: "48px 1fr 72px 140px 140px 44px",
                }}>
                <span>Rank</span>
                <span>Candidate</span>
                <span className="text-center">Tests</span>
                <span>Best Score</span>
                <span>Avg Score</span>
                <span />
              </div>

              <div className="divide-y divide-gray-100">
                {leaderboard.map((c, idx) => (
                  <div key={c._id}>
                    <div className="grid items-center px-4 py-3 hover:bg-gray-50/70 transition-colors"
                      style={{
                        gridTemplateColumns: "48px 1fr 72px 140px 140px 44px",
                        background: idx < 3 ? "rgba(254,243,199,0.25)" : undefined,
                      }}>
                      <div className="flex items-center justify-center"><RankBadge idx={idx} /></div>
                      <div className="min-w-0 pr-3">
                        <div className="font-semibold text-sm text-gray-900 truncate">{c.firstName} {c.lastName}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{c.neetId}</div>
                        {c.city && <div className="text-[10px] text-gray-300 mt-0.5">{c.city}, {c.state}</div>}
                      </div>
                      <div className="text-center font-bold text-gray-600 text-sm">{c.attempts}</div>
                      <div className="pr-4"><ScoreBar pct={c.best} /></div>
                      <div className="pr-4"><ScoreBar pct={c.avg} /></div>
                      <div className="flex items-center justify-center">
                        <button onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold transition hover:brightness-110"
                          style={{ background: "#064e3b" }}>
                          {expanded === c._id ? "▲" : "▼"}
                        </button>
                      </div>
                    </div>

                    {expanded === c._id && (
                      <div className="px-4 pb-4 pt-2 bg-emerald-50/40 border-t border-emerald-100">
                        <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                          Attempt History
                        </div>
                        <div className="space-y-2">
                          {c.mockResults.map((r, i) => (
                            <div key={i}
                              className="flex flex-wrap items-center gap-x-4 gap-y-1 bg-white border border-gray-100 rounded-xl px-3 py-2.5">
                              <span className="font-semibold text-gray-800 text-xs flex-1 min-w-0 truncate">
                                {getTestTitle(r.testId)}
                              </span>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-green-600 font-semibold">✓ {r.correct}</span>
                                <span className="text-red-500 font-semibold">✗ {r.wrong}</span>
                                <span className="text-amber-600 font-semibold">— {r.skipped}</span>
                                <span className="font-bold tabular-nums" style={{ color: scoreColor(r.pct) }}>{r.pct}%</span>
                                <span className="text-gray-400 tabular-nums text-[10px]">{r.score}/{r.maxScore} marks</span>
                                {r.savedAt && (
                                  <span className="text-gray-300 text-[10px]">
                                    {new Date(r.savedAt).toLocaleDateString("en-IN", {
                                      day: "numeric", month: "short", year: "numeric",
                                    })}
                                  </span>
                                )}
                                <button onClick={() => setReportResult(r)}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold text-white transition hover:brightness-110"
                                  style={{ background: "#064e3b" }}>
                                  📄 Report
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MY RESULTS TAB */}
      {tab === "mine" && (
        <div>
          {!cuetActiveId && myResults.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">🔑</div>
              <h3 className="font-bold text-gray-700 mb-2 text-lg">Not Logged In</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">
                Go to <strong className="text-gray-600">Mock Tests</strong> tab, login with your NEET ID, then attempt a test.
              </p>
            </div>
          )}

          {myResults.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <StatCard val={myResults.length} label="Tests Attempted" color="#064e3b" />
                <StatCard val={myBest !== null ? `${myBest}%` : "—"} label="Best Score"
                  color={myBest !== null ? scoreColor(myBest) : "#6b7280"} />
                <StatCard val={myAvg !== null ? `${myAvg}%` : "—"} label="Avg Score"
                  color={myAvg !== null ? scoreColor(myAvg) : "#6b7280"} />
              </div>

              <div className="space-y-3">
                {myResults.map((r, idx) => {
                  const pct = r.pct ?? 0;
                  const color = scoreColor(pct);
                  return (
                    <div key={idx}
                      className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-900 text-sm leading-tight">
                            {getTestTitle(r.testId)}
                          </div>
                          {r.savedAt && (
                            <div className="text-[10px] text-gray-400 mt-0.5">
                              {new Date(r.savedAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric",
                              })}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="font-serif font-black text-2xl tabular-nums" style={{ color }}>{pct}%</div>
                          <button onClick={() => setReportResult(r)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white transition hover:brightness-110"
                            style={{ background: "#064e3b" }}>
                            📄 Report
                          </button>
                        </div>
                      </div>

                      <ScoreBar pct={pct} />

                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{r.correct} Correct
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
                          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />{r.wrong} Wrong
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />{r.skipped} Skipped
                        </span>
                        <span className="ml-auto text-xs font-bold text-gray-500 tabular-nums">
                          {r.score}/{r.maxScore} marks
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
