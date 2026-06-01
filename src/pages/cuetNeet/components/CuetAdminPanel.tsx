import { useState, useEffect, useMemo } from "react";

const BASE = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5000/api`;
const API = `${BASE}/cuet/admin/all`;

type MockResult = {
  testId: string;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  pct: number;
  savedAt: string;
};

type CuetReg = {
  _id: string;
  cuetId: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  qualification: string;
  languages: string[];
  domainSubjects: string[];
  generalTest: boolean;
  testCity1: string;
  category: string;
  mockResults: MockResult[];
  registeredAt: string;
};

function downloadCSV(regs: CuetReg[]) {
  const headers = ["CUET ID","Name","Mobile","Email","City","State","Qualification","Languages","Domain Subjects","General Test","Test City","Category","Mock Tests Taken","Best Score","Registered At"];
  const rows = regs.map(r => {
    const best = r.mockResults?.length ? Math.max(...r.mockResults.map(m => m.pct)) : 0;
    return [
      r.cuetId, `${r.firstName} ${r.lastName}`, r.mobile, r.email,
      r.city, r.state, r.qualification,
      (r.languages || []).join("; "),
      (r.domainSubjects || []).join("; "),
      r.generalTest ? "Yes" : "No",
      r.testCity1, r.category,
      r.mockResults?.length || 0,
      best ? `${best}%` : "—",
      r.registeredAt ? new Date(r.registeredAt).toLocaleDateString('en-IN') : "—"
    ].map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(",");
  });
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent([headers.join(","), ...rows].join("\n"));
  a.download = "CUET_2026_Registrations.csv";
  a.click();
}

export function CuetAdminPanel({ token }: { token: string }) {
  const [regs, setRegs] = useState<CuetReg[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return;
      const data = await res.json();
      setRegs(Array.isArray(data) ? data : []);
    } catch { setRegs([]); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [token]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return regs;
    return regs.filter(r =>
      `${r.firstName} ${r.lastName} ${r.cuetId} ${r.mobile} ${r.email}`.toLowerCase().includes(q)
    );
  }, [regs, search]);

  const stats = {
    total: regs.length,
    withTests: regs.filter(r => r.mockResults?.length > 0).length,
    avgTests: regs.length ? Math.round(regs.reduce((s, r) => s + (r.mockResults?.length || 0), 0) / regs.length) : 0,
    topScorer: regs.reduce((best, r) => {
      const top = r.mockResults?.length ? Math.max(...r.mockResults.map(m => m.pct)) : 0;
      return top > best.score ? { name: `${r.firstName} ${r.lastName}`, score: top } : best;
    }, { name: "—", score: 0 }),
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { num: stats.total, label: "Total Registered", color: "#0a1f5c", bg: "#dbeafe" },
          { num: stats.withTests, label: "Took Mock Tests", color: "#16a34a", bg: "#ecfdf5" },
          { num: `${stats.avgTests} tests`, label: "Avg Tests/Student", color: "#7c3aed", bg: "#f5f0ff" },
          { num: stats.topScorer.score ? `${stats.topScorer.score}%` : "—", label: "Top Score", color: "#d97706", bg: "#fef3c7" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center border" style={{ background: s.bg, borderColor: s.color + "40" }}>
            <div className="font-serif font-bold text-2xl" style={{ color: s.color }}>{s.num}</div>
            <div className="text-[10px] font-medium mt-0.5" style={{ color: s.color + "cc" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Actions */}
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, CUET ID, mobile, email..."
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
        <button onClick={() => fetchData()} className="text-xs px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold">↻ Refresh</button>
        <button onClick={() => downloadCSV(filtered)} className="text-xs px-3 py-2 rounded-lg font-bold text-white" style={{ background: "#0a1f5c" }}>⬇ Export CSV</button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
          <table className="w-full text-xs min-w-[900px]">
            <thead>
              <tr className="text-left border-b border-gray-200 sticky top-0 z-10" style={{ background: "#f5f0ff" }}>
                {["#", "CUET ID", "Name", "Mobile", "Email", "City/State", "Subjects", "Test City", "Mock Tests", "Best Score", "Registered", "Details"].map(h => (
                  <th key={h} className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: "#1e1b4b" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={12} className="text-center py-12 text-gray-400">Loading...</td></tr>}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={12} className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">🔍</div>
                  <div>No CUET registrations found</div>
                </td></tr>
              )}
              {filtered.map((r, i) => {
                const bestScore = r.mockResults?.length ? Math.max(...r.mockResults.map(m => m.pct)) : null;
                const isExpanded = expanded === r.cuetId;
                return (
                  <>
                    <tr key={r.cuetId} className="hover:bg-gray-50 transition">
                      <td className="px-3 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-3 py-3 font-mono font-bold text-[#0a1f5c]">{r.cuetId}</td>
                      <td className="px-3 py-3 font-semibold text-gray-900 whitespace-nowrap">{r.firstName} {r.lastName}</td>
                      <td className="px-3 py-3 text-gray-600">{r.mobile}</td>
                      <td className="px-3 py-3 text-gray-600 max-w-[140px] truncate">{r.email}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.city}, {(r.state || '').slice(0, 10)}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(r.domainSubjects || []).slice(0, 2).map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-purple-50 text-purple-700 border border-purple-100">{s}</span>
                          ))}
                          {(r.domainSubjects || []).length > 2 && <span className="text-gray-400">+{r.domainSubjects.length - 2}</span>}
                          {r.generalTest && <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 text-amber-700 border border-amber-100">GT</span>}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-600">{r.testCity1 || "—"}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.mockResults?.length ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {r.mockResults?.length || 0} tests
                        </span>
                      </td>
                      <td className="px-3 py-3 font-bold" style={{ color: bestScore !== null ? (bestScore >= 75 ? "#16a34a" : bestScore >= 50 ? "#d97706" : "#dc2626") : "#9ca3af" }}>
                        {bestScore !== null ? `${bestScore}%` : "—"}
                      </td>
                      <td className="px-3 py-3 text-gray-400 whitespace-nowrap">
                        {r.registeredAt ? new Date(r.registeredAt).toLocaleDateString('en-IN') : "—"}
                      </td>
                      <td className="px-3 py-3">
                        {r.mockResults?.length > 0 && (
                          <button onClick={() => setExpanded(isExpanded ? null : r.cuetId)}
                            className="text-[10px] px-2 py-1 rounded border font-semibold transition"
                            style={{ borderColor: "#7c3aed", color: "#7c3aed", background: isExpanded ? "#f5f0ff" : "#fff" }}>
                            {isExpanded ? "▲ Hide" : "▼ Results"}
                          </button>
                        )}
                      </td>
                    </tr>
                    {isExpanded && r.mockResults?.length > 0 && (
                      <tr key={`${r.cuetId}-expanded`}>
                        <td colSpan={12} className="px-4 py-3 bg-purple-50 border-b border-purple-100">
                          <div className="text-xs font-bold text-purple-700 mb-2 uppercase tracking-wider">Mock Test History — {r.firstName} {r.lastName}</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {r.mockResults.map((m, mi) => (
                              <div key={mi} className="bg-white rounded-lg p-3 border border-purple-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                                  style={{ background: m.pct >= 75 ? "#ecfdf5" : m.pct >= 50 ? "#fef3c7" : "#fee2e2", color: m.pct >= 75 ? "#16a34a" : m.pct >= 50 ? "#d97706" : "#dc2626" }}>
                                  {m.pct}%
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-gray-800 truncate">{m.testId?.toUpperCase() || "Test"}</div>
                                  <div className="text-gray-400 text-[10px]">✓{m.correct} ✗{m.wrong} —{m.skipped} · {m.score}/{m.maxScore}</div>
                                  <div className="text-gray-400 text-[10px]">{m.savedAt ? new Date(m.savedAt).toLocaleDateString('en-IN') : ""}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400 text-right">Showing {filtered.length} of {regs.length} CUET registrations</div>
    </div>
  );
}
