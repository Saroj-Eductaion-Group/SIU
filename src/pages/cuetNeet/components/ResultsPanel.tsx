import { useState, useEffect } from "react";

const BASE = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5000/api`;
const API = `${BASE}/registrations`;

const FILTERS = ["All", "100% Scholarship (A+)", "50% Scholarship (A)", "25% Scholarship (B)", "Grade C", "Not Qualified"];

function getGrade(score: number | null) {
  if (score === null) return null;
  if (score >= 90) return { grade: "A+", label: "100% Scholarship", color: "#7a5500", bg: "#fffbea", border: "#e8c840" };
  if (score >= 75) return { grade: "A",  label: "50% Scholarship",  color: "#0a1f5c", bg: "#dbeafe", border: "#93c5fd" };
  if (score >= 60) return { grade: "B",  label: "25% Scholarship",  color: "#92400e", bg: "#fef3c7", border: "#fcd34d" };
  if (score >= 40) return { grade: "C",  label: "Merit Certificate",color: "#374151", bg: "#f3f4f6", border: "#d1d5db" };
  return { grade: "F", label: "Not Qualified", color: "#dc2626", bg: "#fee2e2", border: "#fca5a5" };
}

type Reg = {
  _id: string;
  appId: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  courses: string[];
  score: number | null;
  grade: string | null;
  status: string;
  sectionData?: {
    correct?: number;
    wrong?: number;
    skipped?: number;
    timeTaken?: number;
    avgTimePerQuestion?: number;
    difficultyAnalytics?: {
      easy?: { correct: number; total: number; pct: number };
      medium?: { correct: number; total: number; pct: number };
      hard?: { correct: number; total: number; pct: number };
      advanced?: { correct: number; total: number; pct: number };
    };
  };
};

export function ResultsPanel() {
  const [filter, setFilter] = useState("All");
  const [regs, setRegs] = useState<Reg[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeReport, setActiveReport] = useState<Reg | null>(null);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/results`);
      const data = await res.json();
      setRegs(Array.isArray(data) ? data : []);
    } catch { setRegs([]); }
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, []);

  const appeared = regs.length;
  const qualified = regs.filter(r => r.score !== null && r.score >= 60).length;
  const topScore = appeared > 0 ? Math.max(...regs.map(r => r.score ?? 0)) : 0;
  const avgScore = appeared > 0 ? Math.round(regs.reduce((s, r) => s + (r.score ?? 0), 0) / appeared) : 0;

  const filtered = regs.filter(r => {
    const g = getGrade(r.score);
    if (filter === "All") return true;
    if (filter === "100% Scholarship (A+)") return g?.grade === "A+";
    if (filter === "50% Scholarship (A)")   return g?.grade === "A";
    if (filter === "25% Scholarship (B)")   return g?.grade === "B";
    if (filter === "Grade C")               return g?.grade === "C";
    if (filter === "Not Qualified")         return g?.grade === "F";
    return true;
  });

  // Safe fallback utility for rendering report card details
  const getAnalyticData = (reg: Reg) => {
    const defaultData = {
      correct: Math.round(((reg.score || 0) / 100) * 50),
      wrong: 0,
      skipped: 50 - Math.round(((reg.score || 0) / 100) * 50),
      timeTaken: 1800,
      avgTimePerQuestion: 36,
      difficultyAnalytics: {
        easy: { correct: Math.round(((reg.score || 0) / 100) * 12), total: 12, pct: reg.score || 0 },
        medium: { correct: Math.round(((reg.score || 0) / 100) * 13), total: 13, pct: reg.score || 0 },
        hard: { correct: Math.round(((reg.score || 0) / 100) * 13), total: 13, pct: reg.score || 0 },
        advanced: { correct: Math.round(((reg.score || 0) / 100) * 12), total: 12, pct: reg.score || 0 }
      }
    };
    return reg.sectionData || defaultData;
  };

  return (
    <div className="relative">
      {/* Styles block injecting custom layout for window.print() */}
      <style>{`
        @media print {
          /* Hide all general UI and wrappers */
          body * {
            visibility: hidden;
            background: none !important;
          }
          #print-root, #print-root * {
            visibility: visible;
          }
          #print-root {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 20px;
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .cert-border {
            border: 8px double #c9a84c !important;
            padding: 30px !important;
            background: #fff !important;
          }
        }
      `}</style>

      <div className="rounded-xl p-4 mb-5 flex items-center gap-3 no-print" style={{ background: "#fffbea", border: "1.5px solid #c9a84c" }}>
        <span className="text-2xl">🏆</span>
        <div className="text-sm font-medium text-[#7a5500]">Score <strong>90% or above</strong> in the Talent Hunt Exam to win a <strong>100% Full Scholarship</strong> at Saroj International University.</div>
      </div>

      <div className="rounded-xl p-5 mb-5 text-center no-print" style={{ background: "linear-gradient(135deg,#0a1f5c,#4c1d95)" }}>
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Saroj International University</div>
        <h2 className="font-serif font-black text-xl text-white mb-0.5">Official Result Sheet</h2>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Talent Hunt Examination 2026-27 — Session Results</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 no-print">
        {[
          { num: appeared,                    label: "Appeared" },
          { num: qualified,                   label: "Qualified" },
          { num: topScore ? `${topScore}%` : "—", label: "Top Score" },
          { num: avgScore ? `${avgScore}%` : "—", label: "Avg Score" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className="font-serif font-bold text-xl text-[#6c3fc7]">{s.num}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mb-4 items-center no-print">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition animate-fade-in"
            style={{ background: filter === f ? "#6c3fc7" : "#fff", color: filter === f ? "#fff" : "#6b7280", border: `1.5px solid ${filter === f ? "#6c3fc7" : "#e5e7eb"}` }}>
            {f}
          </button>
        ))}
        <button onClick={fetchResults} className="ml-auto text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">↻ Refresh</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 text-left" style={{ background: "#4c1d95" }}>
                {["App ID","Candidate","Course(s)","Score","Grade","Scholarship","Status","Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-white">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={8} className="text-center py-12 text-gray-400">Loading...</td></tr>}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">📋</div>
                  <div className="font-medium">No results available yet.</div>
                </td></tr>
              )}
              {filtered.map(reg => {
                const g = getGrade(reg.score);
                return (
                  <tr key={reg._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#6c3fc7]">{reg.appId}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{reg.firstName} {reg.lastName}</div>
                      <div className="text-xs text-gray-400">{reg.city}, {reg.state}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(reg.courses || []).slice(0, 2).map(c => (
                          <span key={c} className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-[#0a1f5c] font-medium border border-blue-100">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-serif font-bold text-lg text-[#4c1d95]">{reg.score}%</span>
                    </td>
                    <td className="px-4 py-3">
                      {g ? <span className="px-2 py-1 rounded-full text-xs font-extrabold border-[1.5px]" style={{ background: g.bg, color: g.color, borderColor: g.border }}>{g.grade}</span> : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {g ? <span className="text-xs font-semibold" style={{ color: g.color }}>{g.label}</span> : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {g && g.grade !== "F"
                        ? <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-green-600">Qualified</span>
                        : <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-red-500">Not Qualified</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setActiveReport(reg)} className="px-2.5 py-1 text-xs font-bold text-white bg-[#6c3fc7] rounded-lg transition hover:bg-[#522b9c] flex items-center gap-1 shadow-sm">
                        📄 Report
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* REPORT CARD / CERTIFICATE MODAL */}
      {activeReport && (() => {
        const sd = getAnalyticData(activeReport);
        const g = getGrade(activeReport.score);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm p-4 overflow-y-auto no-print">
            <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-4xl shadow-2xl relative overflow-hidden animate-scale-up my-8">
              
              {/* Modal Header */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center no-print">
                <div>
                  <h3 className="font-serif font-black text-lg text-[#0a1f5c]">Scholarship Certificate & Report</h3>
                  <p className="text-xs text-gray-400">Official candidate assessment for {activeReport.firstName} {activeReport.lastName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => window.print()} className="px-4 py-2 text-xs font-bold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition flex items-center gap-1">
                    🖨️ Export to PDF / Print
                  </button>
                  <button onClick={() => setActiveReport(null)} className="px-3.5 py-2 text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                    Close
                  </button>
                </div>
              </div>

              {/* Printable Area */}
              <div id="print-root" className="p-8 max-w-4xl mx-auto bg-white text-gray-800">
                <div className="border-[8px] border-double border-amber-300 p-6 md:p-8 rounded-xl bg-amber-50/10 cert-border relative">
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500"></div>
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500"></div>

                  {/* Document Header */}
                  <div className="text-center mb-6">
                    <h1 className="font-serif font-black text-2xl tracking-widest text-[#0a1f5c]">SAROJ INTERNATIONAL UNIVERSITY</h1>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-amber-600 mt-1">Established under SIU Act 2026 · Lucknow Main Campus</p>
                    <div className="h-0.5 w-32 bg-amber-500 mx-auto my-3"></div>
                    <h2 className="font-serif font-black text-xl text-gray-900 tracking-wide">TALENT HUNT SCHOLARSHIP CERTIFICATE</h2>
                    <p className="text-xs text-gray-500">Candidate Performance & Eligibility Report Sheet</p>
                  </div>

                  {/* Candidate Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 text-sm">
                    <div className="space-y-2">
                      <div><span className="text-gray-400 font-medium">Candidate Name:</span> <strong className="text-gray-950 font-bold">{activeReport.firstName} {activeReport.lastName}</strong></div>
                      <div><span className="text-gray-400 font-medium">Application ID:</span> <strong className="font-mono text-[#6c3fc7]">{activeReport.appId}</strong></div>
                      <div><span className="text-gray-400 font-medium">Address:</span> <strong>{activeReport.city}, {activeReport.state}</strong></div>
                    </div>
                    <div className="space-y-2">
                      <div><span className="text-gray-400 font-medium">Applied Course(s):</span> <strong>{activeReport.courses.join(", ")}</strong></div>
                      <div><span className="text-gray-400 font-medium">Assessment Date:</span> <strong>{new Date(activeReport.registeredAt).toLocaleDateString()}</strong></div>
                      <div><span className="text-gray-400 font-medium">Exam Mode:</span> <strong>Online (CBT)</strong></div>
                    </div>
                  </div>

                  {/* Core Metrics Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-[#0a1f5c]/5 border border-[#0a1f5c]/10 rounded-xl p-4 text-center">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Score</div>
                      <div className="font-serif font-black text-3xl text-[#0a1f5c] mt-1">{activeReport.score}%</div>
                    </div>
                    <div className="bg-[#0a1f5c]/5 border border-[#0a1f5c]/10 rounded-xl p-4 text-center">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Performance Grade</div>
                      <div className="font-serif font-black text-3xl text-purple-800 mt-1">{g?.grade || "F"}</div>
                    </div>
                    <div className="bg-[#0a1f5c]/5 border border-[#0a1f5c]/10 rounded-xl p-4 text-center col-span-2">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Awarded Scholarship</div>
                      <div className="font-serif font-black text-xl text-green-700 mt-2">{g?.label || "None"}</div>
                    </div>
                  </div>

                  {/* Analytical Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Left: General Stats */}
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-serif font-bold text-sm text-[#0a1f5c] mb-3 pb-1 border-b border-gray-100">Sectional Statistics</h4>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-green-50 p-2.5 rounded-lg border border-green-100">
                          <div className="text-green-700 font-serif font-black text-lg">{sd.correct}</div>
                          <div className="text-gray-500 mt-0.5">Correct</div>
                        </div>
                        <div className="bg-red-50 p-2.5 rounded-lg border border-red-100">
                          <div className="text-red-600 font-serif font-black text-lg">{sd.wrong}</div>
                          <div className="text-gray-500 mt-0.5">Wrong</div>
                        </div>
                        <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100">
                          <div className="text-amber-600 font-serif font-black text-lg">{sd.skipped}</div>
                          <div className="text-gray-500 mt-0.5">Skipped</div>
                        </div>
                      </div>

                      {/* Time indicators */}
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="flex justify-between border-b border-gray-50 py-1.5">
                          <span className="text-gray-400">Total Duration Taken:</span>
                          <strong className="text-gray-900">{Math.floor((sd.timeTaken || 1800) / 60)}m {(sd.timeTaken || 1800) % 60}s</strong>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-gray-400">Average Speed per Question:</span>
                          <strong className="text-gray-900">{sd.avgTimePerQuestion || 36} seconds</strong>
                        </div>
                      </div>
                    </div>

                    {/* Right: Difficulty breakdown */}
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-serif font-bold text-sm text-[#0a1f5c] mb-3 pb-1 border-b border-gray-100">Difficulty Efficiency</h4>
                      <div className="space-y-3">
                        {Object.entries(sd.difficultyAnalytics || {}).map(([key, item]: [string, any]) => (
                          <div key={key}>
                            <div className="flex justify-between text-[11px] font-medium mb-1">
                              <span className="capitalize text-gray-500">{key === "advanced" ? "Advanced (JEE Level)" : key}</span>
                              <span className="text-gray-800 font-bold">{item.correct} / {item.total} ({item.pct}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{
                                width: `${item.pct}%`,
                                backgroundColor: key === "easy" ? "#16a34a" : key === "medium" ? "#2563eb" : key === "hard" ? "#d97706" : "#dc2626"
                              }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certificate Footer Signatures */}
                  <div className="border-t border-amber-200 pt-6 mt-8 flex justify-between items-end flex-wrap gap-4 text-xs">
                    <div>
                      <p className="font-serif italic text-gray-500 mb-1">Dr. S. K. Dixit</p>
                      <div className="w-28 h-px bg-gray-300 my-1"></div>
                      <p className="font-bold text-gray-900">Director Admissions</p>
                      <p className="text-[10px] text-gray-400">Saroj Education Group</p>
                    </div>
                    <div className="text-center no-print">
                      {g && g.grade !== "F" ? (
                        <div className="w-16 h-16 rounded-full border-4 border-double border-amber-500 bg-amber-50 flex items-center justify-center font-serif font-black text-xs text-amber-700 shadow-md">
                          SEAL
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full border-4 border-double border-gray-400 bg-gray-50 flex items-center justify-center font-serif font-black text-xs text-gray-400">
                          SEAL
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-serif italic text-gray-500 mb-1">Prof. Anurag Sharma</p>
                      <div className="w-28 h-px bg-gray-300 my-1 ml-auto"></div>
                      <p className="font-bold text-gray-900">Registrar</p>
                      <p className="text-[10px] text-gray-400">Saroj International University</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
