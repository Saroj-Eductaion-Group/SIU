import { useState, useMemo, useEffect } from "react";

const BASE = import.meta.env.VITE_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5000/api`;

type NeetReg = {
  _id: string;
  neetId: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  qualification: string;
  board: string;
  marks: string;
  year: string;
  languages: string[];
  mockResults: any[];
  registeredAt: string;
};

type StatusFilter = "All" | "Exam Done" | "No Exam";

function getGradeBadge(score: number | null) {
  if (score === null) return null;
  if (score >= 90) return { g: "A+", s: "100%", col: "#7a5500", bg: "#fffbea" };
  if (score >= 75) return { g: "A",  s: "50%",  col: "#0a1f5c", bg: "#dbeafe" };
  if (score >= 60) return { g: "B",  s: "25%",  col: "#92400e", bg: "#fef3c7" };
  if (score >= 40) return { g: "C",  s: "Cert", col: "#374151", bg: "#f3f4f6" };
  return { g: "F", s: "None", col: "#dc2626", bg: "#fee2e2" };
}

function downloadCSV(regs: NeetReg[]) {
  const headers = ["NEET ID", "Name", "Mobile", "Email", "City", "State", "Qualification", "Board", "Marks", "Year", "Languages", "Mock Tests", "Best Score", "Registered At"];
  const rows = regs.map(r => {
    const best = r.mockResults?.length ? Math.max(...r.mockResults.map((m: any) => m.pct ?? 0)) : null;
    return [
      r.neetId, `${r.firstName} ${r.lastName}`, r.mobile, r.email,
      r.city, r.state, r.qualification, r.board, r.marks, r.year,
      (r.languages || []).join("; "),
      r.mockResults?.length || 0,
      best !== null ? `${best}%` : "—",
      r.registeredAt ? new Date(r.registeredAt).toLocaleDateString('en-IN') : "—"
    ].map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(",");
  });
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent([headers.join(","), ...rows].join("\n"));
  a.download = "NEET_2026_Registrations.csv";
  a.click();
}

export function AdminPanel() {
  const [token, setToken] = useState(() => sessionStorage.getItem("neet_admin_token") || "");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [regs, setRegs] = useState<NeetReg[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const fetchRegs = async (tok: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/neet/admin/all`, {
        headers: { Authorization: `Bearer ${tok}` }
      });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setRegs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch NEET registrations:", e);
    }
    setLoading(false);
  };

  const login = async () => {
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem("neet_admin_token", data.token);
        setToken(data.token);
        setLoginForm({ email: "", password: "" });
        fetchRegs(data.token);
      } else {
        setLoginError(data.message || "Invalid password.");
      }
    } catch {
      setLoginError("Cannot connect to server.");
    }
    setLoginLoading(false);
  };

  const logout = () => {
    sessionStorage.removeItem("neet_admin_token");
    setToken("");
    setRegs([]);
  };

  useEffect(() => {
    if (token) fetchRegs(token);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return regs.filter(r => {
      const matchSearch = !q || `${r.firstName} ${r.lastName} ${r.neetId} ${r.mobile} ${r.email}`.toLowerCase().includes(q);
      const hasDoneExam = r.mockResults?.length > 0;
      const matchStatus = statusFilter === "All" || (statusFilter === "Exam Done" ? hasDoneExam : !hasDoneExam);
      return matchSearch && matchStatus;
    });
  }, [regs, search, statusFilter]);

  const stats = {
    total: regs.length,
    examDone: regs.filter(r => r.mockResults?.length > 0).length,
    noExam: regs.filter(r => !r.mockResults?.length).length,
  };

  if (!token) {
    return (
      <div className="max-w-sm mx-auto mt-10 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-serif text-xl font-black text-[#0a1f5c] mb-1">Admin Panel</h2>
          <p className="text-xs text-gray-400 mb-5">Restricted Access — Authorised SIU Personnel Only</p>
          <input type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} onKeyDown={e => e.key === "Enter" && login()} placeholder="admin@sarojuniversity.edu.in"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-purple-400" />
          <input type="password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} onKeyDown={e => e.key === "Enter" && login()} placeholder="Enter Admin Password" data-testid="admin-pw-input"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-purple-400" />
          {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}
          <button onClick={login} disabled={loginLoading} data-testid="admin-login-btn" className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60" style={{ background: "#0a1f5c" }}>
            {loginLoading ? "Logging in..." : "Login as Administrator →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Admin bar */}
      <div className="rounded-xl p-3 mb-5 flex items-center gap-3 flex-wrap" style={{ background: "#ecfdf5", border: "1.5px solid #a7f3d0" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-xs font-bold text-green-800">Logged in as Administrator | NEET Portal 2026-27</span>
        <div className="flex-1" />
        <button onClick={() => fetchRegs(token)} className="text-xs px-3 py-1 rounded border border-green-400 text-green-700 font-semibold hover:bg-green-50">↺ Refresh</button>
        <button onClick={() => downloadCSV(filtered)} className="text-xs px-3 py-1 rounded border border-blue-300 text-blue-700 font-semibold hover:bg-blue-50">⬇ Export CSV</button>
        <button onClick={logout} data-testid="admin-logout" className="text-xs px-3 py-1 rounded border border-red-300 text-red-600 font-semibold hover:bg-red-50">Logout</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {[
          { num: stats.total,    label: "Total Registered", color: "#6c3fc7", bg: "#f5f0ff" },
          { num: stats.examDone, label: "Took Mock Test",   color: "#16a34a", bg: "#ecfdf5" },
          { num: stats.noExam,   label: "No Exam Yet",      color: "#d97706", bg: "#fef3c7" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center border" style={{ background: s.bg, borderColor: s.color + "40" }}>
            <div className="font-serif font-bold text-2xl" style={{ color: s.color }}>{s.num}</div>
            <div className="text-[10px] font-medium mt-0.5" style={{ color: s.color + "cc" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex gap-3 mb-3 flex-wrap items-center">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, NEET ID, mobile, email..." data-testid="admin-search"
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-400" />
        <div className="flex gap-1">
          {(["All", "Exam Done", "No Exam"] as StatusFilter[]).map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
              style={{ background: statusFilter === f ? "#0a1f5c" : "#fff", color: statusFilter === f ? "#fff" : "#6b7280", border: "1.5px solid " + (statusFilter === f ? "#0a1f5c" : "#e5e7eb") }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
            <table className="w-full text-xs min-w-[900px]">
              <thead>
                <tr className="text-left border-b border-gray-200 sticky top-0 z-10" style={{ background: "#f5f0ff" }}>
                  {["#", "NEET ID", "Name", "Mobile", "Email", "City/State", "Qualification", "Languages", "Mock Tests", "Best Score", "Grade", "Registered"].map(h => (
                    <th key={h} className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: "#4c1d95" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && <tr><td colSpan={12} className="text-center py-12 text-gray-400">Loading...</td></tr>}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={12} className="text-center py-12 text-gray-400">
                    <div className="text-3xl mb-2">🔍</div>
                    <div>No NEET registrations found</div>
                  </td></tr>
                )}
                {!loading && filtered.map((r, i) => {
                  const bestScore = r.mockResults?.length ? Math.max(...r.mockResults.map((m: any) => m.pct ?? 0)) : null;
                  const g = bestScore !== null ? getGradeBadge(bestScore) : null;
                  return (
                    <tr key={r._id} className="hover:bg-gray-50 transition">
                      <td className="px-3 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-3 py-3 font-mono font-bold text-[#6c3fc7]">{r.neetId}</td>
                      <td className="px-3 py-3 font-semibold text-gray-900 whitespace-nowrap">{r.firstName} {r.lastName}</td>
                      <td className="px-3 py-3 text-gray-600">{r.mobile}</td>
                      <td className="px-3 py-3 text-gray-600 max-w-[150px] truncate">{r.email}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.city}, {(r.state || '').slice(0, 12)}</td>
                      <td className="px-3 py-3 text-gray-600">{r.qualification || '—'}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(r.languages || []).slice(0, 2).map((l: string) => (
                            <span key={l} className="px-1.5 py-0.5 rounded text-[10px] bg-purple-50 text-purple-700 border border-purple-100">{l}</span>
                          ))}
                          {(r.languages || []).length > 2 && <span className="text-gray-400">+{r.languages.length - 2}</span>}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.mockResults?.length ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {r.mockResults?.length || 0} tests
                        </span>
                      </td>
                      <td className="px-3 py-3 font-bold" style={{ color: bestScore !== null ? (bestScore >= 75 ? "#16a34a" : bestScore >= 50 ? "#d97706" : "#dc2626") : "#9ca3af" }}>
                        {bestScore !== null ? `${bestScore}%` : '—'}
                      </td>
                      <td className="px-3 py-3">
                        {g ? <span className="px-1.5 py-0.5 rounded font-bold text-xs border" style={{ background: g.bg, color: g.col, borderColor: g.col + "44" }}>{g.g}</span> : '—'}
                      </td>
                      <td className="px-3 py-3 text-gray-400 whitespace-nowrap">
                        {r.registeredAt ? new Date(r.registeredAt).toLocaleDateString('en-IN') : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400 text-right">Showing {filtered.length} of {regs.length} NEET registrations</div>
    </div>
  );
}
