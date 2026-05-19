import { useState, useMemo, useEffect } from "react";
import { CuetAdminPanel } from "./CuetAdminPanel";

type Registration = {
  id: string; firstName: string; lastName: string; mobile: string; email: string;
  city: string; state: string; qualification: string; board: string; marks: string;
  year: string; courses: string[]; examDate: string; examMode: string; examCentre: string;
  medium: string; category: string; source: string; status: "Pending" | "Approved" | "Rejected";
  registeredAt: string; examCompleted: boolean; score: number | null;
};
type StatusFilter = "All" | "Pending" | "Approved" | "Rejected" | "Exam Done";

const BASE = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_URL || 'http://localhost:5000/api';
const API_AUTH = `${BASE}/auth`;
const API_ADMIN = `${BASE}/siuat/admin`;

function getGradeBadge(score: number | null) {
  if (score === null) return null;
  if (score >= 90) return { g: "A+", s: "100%", col: "#7a5500", bg: "#fffbea" };
  if (score >= 75) return { g: "A",  s: "50%",  col: "#0a1f5c", bg: "#dbeafe" };
  if (score >= 60) return { g: "B",  s: "25%",  col: "#92400e", bg: "#fef3c7" };
  if (score >= 40) return { g: "C",  s: "Cert", col: "#374151", bg: "#f3f4f6" };
  return { g: "F", s: "None", col: "#dc2626", bg: "#fee2e2" };
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = { Approved: "bg-green-100 text-green-700 border-green-300", Pending: "bg-amber-100 text-amber-700 border-amber-300", Rejected: "bg-red-100 text-red-700 border-red-300" };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${map[s] || "bg-gray-100 text-gray-700 border-gray-300"}`}>{s}</span>;
}

function downloadCSV(regs: Registration[]) {
  const headers = ["App ID","First Name","Last Name","Mobile","Email","City","State","Qualification","Board","Marks","Year","Courses","Exam Date","Mode","Centre","Medium","Category","Source","Registered At","Status","Score","Grade"];
  const rows = regs.map(r => {
    const g = getGradeBadge(r.score);
    return [r.id,r.firstName,r.lastName,r.mobile,r.email,r.city,r.state,r.qualification,r.board,r.marks,r.year,r.courses.join("; "),r.examDate,r.examMode,r.examCentre,r.medium,r.category,r.source,new Date(r.registeredAt).toLocaleDateString(),r.status,r.score??'',g?.g??''].join(",");
  });
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent([headers.join(","),...rows].join("\n"));
  a.download = "SIU_TalentHunt_2026_Registrations.csv"; a.click();
}

export function AdminPanel() {
  const savedToken = localStorage.getItem('siu_admin_token') || '';
  const [token, setToken] = useState(savedToken);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErr, setLoginErr] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [loading, setLoading] = useState(false);
  const [dataTab, setDataTab] = useState<"siuat" | "cuet">("siuat");

  const fetchData = async (tok?: string) => {
    const t = tok || token;
    if (!t) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_ADMIN}/all`, { headers: { Authorization: `Bearer ${t}` } });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setRegistrations(Array.isArray(data) ? data.map((r: Record<string, unknown>) => ({
        id: r.appId as string, firstName: r.firstName as string, lastName: r.lastName as string,
        mobile: r.mobile as string, email: r.email as string, city: r.city as string, state: r.state as string,
        qualification: r.qual as string, board: (r.board as string) || '', marks: (r.marks as string) || '',
        year: (r.yop as string) || '', courses: (r.courses as string[]) || [], examDate: (r.examDate as string) || '',
        examMode: (r.examMode as string) || '', examCentre: (r.centre as string) || '', medium: (r.medium as string) || '',
        category: (r.category as string) || '', source: (r.source as string) || '',
        status: r.status as 'Pending'|'Approved'|'Rejected', registeredAt: (r.registeredAt as string) || '',
        examCompleted: r.score !== null && r.score !== undefined, score: r.score as number | null
      })) : []);
    } catch { setRegistrations([]); }
    setLoading(false);
  };

  useEffect(() => { if (token) fetchData(token); }, [token]);

  const login = async () => {
    setLoginErr('');
    if (!loginForm.email || !loginForm.password) return setLoginErr('Email and password required.');
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_AUTH}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginForm) });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('siu_admin_token', data.token);
        setToken(data.token);
        fetchData(data.token);
      } else setLoginErr(data.message || 'Invalid credentials.');
    } catch { setLoginErr('Cannot connect to server.'); }
    setLoginLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('siu_admin_token');
    setToken(''); setRegistrations([]);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API_ADMIN}/status/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
    fetchData();
  };

  const approveAllPending = async () => {
    await fetch(`${API_ADMIN}/approve-all`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
    fetchData();
  };

  const filtered = useMemo(() => registrations.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${r.firstName} ${r.lastName} ${r.id} ${r.mobile} ${r.email} ${r.courses.join(" ")}`.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || (statusFilter === "Exam Done" ? r.examCompleted : r.status === statusFilter);
    return matchSearch && matchStatus;
  }), [registrations, search, statusFilter]);

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === "Pending").length,
    approved: registrations.filter(r => r.status === "Approved").length,
    rejected: registrations.filter(r => r.status === "Rejected").length,
    examDone: registrations.filter(r => r.examCompleted).length,
  };

  if (!token) return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="font-serif text-xl font-black text-[#0a1f5c] mb-1">Admin Login</h2>
        <p className="text-xs text-gray-400 mb-5">Saroj International University — Talent Hunt Portal</p>
        <div className="space-y-3 mb-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <input type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({...p, email: e.target.value}))}
              onKeyDown={e => e.key === 'Enter' && login()} placeholder="admin@sarojuniversity.edu.in"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-700" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm(p => ({...p, password: e.target.value}))}
              onKeyDown={e => e.key === 'Enter' && login()} placeholder="Enter password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-700" />
          </div>
        </div>
        {loginErr && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">{loginErr}</p>}
        <button onClick={login} disabled={loginLoading} className="w-full py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60" style={{ background: "#0a1f5c" }}>
          {loginLoading ? 'Logging in...' : 'Login →'}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Admin bar */}
      <div className="rounded-xl p-3 mb-5 flex items-center gap-3 flex-wrap" style={{ background: "#ecfdf5", border: "1.5px solid #a7f3d0" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-xs font-bold text-green-800">🟢 Logged in as Administrator | Session 2026-27 | {500 - stats.total} seats remaining</span>
        <div className="flex-1" />
        <button onClick={() => fetchData()} className="text-xs px-3 py-1 rounded border border-green-400 text-green-700 font-semibold hover:bg-green-50">↻ Refresh</button>
        <button onClick={logout} className="text-xs px-3 py-1 rounded border border-red-300 text-red-600 font-semibold hover:bg-red-50">Logout</button>
      </div>

      {/* Data tab switcher */}
      <div className="flex gap-1 mb-5 bg-gray-100 rounded-xl p-1 max-w-xs">
        {([["siuat", "🎓 SIUAT"], ["cuet", "📚 CUET"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setDataTab(id)}
            className="flex-1 py-2 px-4 rounded-lg text-sm font-bold transition"
            style={{ background: dataTab === id ? "#0a1f5c" : "transparent", color: dataTab === id ? "#fff" : "#6b7280" }}>
            {label}
          </button>
        ))}
      </div>

      {/* CUET Registrations */}
      {dataTab === "cuet" && <CuetAdminPanel token={token} />}

      {/* SIUAT Registrations */}
      {dataTab === "siuat" && (
        <div>
          {/* Dashboard header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="font-serif font-black text-xl text-[#0a1f5c]">SIUAT Candidate Management</h2>
            <button onClick={() => downloadCSV(filtered)} className="text-xs px-3 py-2 rounded-lg font-bold text-white" style={{ background: "#0a1f5c" }}>⬇ Export CSV</button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
            {[
              { num: stats.total,    label: "Total Registered", color: "#6c3fc7", bg: "#f5f0ff" },
              { num: stats.pending,  label: "Pending Approval", color: "#d97706", bg: "#fef3c7" },
              { num: stats.approved, label: "Approved",         color: "#16a34a", bg: "#ecfdf5" },
              { num: stats.rejected, label: "Rejected",         color: "#dc2626", bg: "#fee2e2" },
              { num: stats.examDone, label: "Exam Completed",   color: "#0a1f5c", bg: "#dbeafe" },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center border" style={{ background: s.bg, borderColor: s.color + "40" }}>
                <div className="font-serif font-bold text-2xl" style={{ color: s.color }}>{s.num}</div>
                <div className="text-[10px] font-medium mt-0.5" style={{ color: s.color + "cc" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search + Filters */}
          <div className="flex gap-3 mb-3 flex-wrap items-center">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, App ID, mobile, email, course..."
              className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-400" />
            <div className="flex gap-1 flex-wrap">
              {(["All","Pending","Approved","Rejected","Exam Done"] as StatusFilter[]).map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
                  style={{ background: statusFilter === f ? "#0a1f5c" : "#fff", color: statusFilter === f ? "#fff" : "#6b7280", border: "1.5px solid " + (statusFilter === f ? "#0a1f5c" : "#e5e7eb") }}>
                  {f}
                </button>
              ))}
            </div>
            {stats.pending > 0 && (
              <button onClick={approveAllPending} className="text-xs px-3 py-1.5 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700">
                ✓ Approve All Pending ({stats.pending})
              </button>
            )}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
              <table className="w-full text-xs min-w-[900px]">
                <thead>
                  <tr className="text-left border-b border-gray-200 sticky top-0 z-10" style={{ background: "#f5f0ff" }}>
                    {["#","App ID","Name","Mobile","Email","City/State","Qualification","Courses","Exam Date","Mode","Status","Score","Grade","Scholarship","Actions"].map(h => (
                      <th key={h} className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: "#1e1b4b" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && <tr><td colSpan={15} className="text-center py-12 text-gray-400">Loading...</td></tr>}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={15} className="text-center py-12 text-gray-400">
                      <div className="text-3xl mb-2">🔍</div>
                      <div>No candidates found</div>
                    </td></tr>
                  )}
                  {filtered.map((reg, i) => {
                    const g = reg.examCompleted && reg.score !== null ? getGradeBadge(reg.score) : null;
                    return (
                      <tr key={reg.id} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-3 text-gray-400">{i + 1}</td>
                        <td className="px-3 py-3 font-mono font-bold text-[#6c3fc7]">{reg.id}</td>
                        <td className="px-3 py-3 font-semibold text-gray-900 whitespace-nowrap">{reg.firstName} {reg.lastName}</td>
                        <td className="px-3 py-3 text-gray-600">{reg.mobile}</td>
                        <td className="px-3 py-3 text-gray-600 max-w-[150px] truncate">{reg.email}</td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{reg.city}, {reg.state.slice(0, 12)}</td>
                        <td className="px-3 py-3 text-gray-600">{reg.qualification}</td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-1">
                            {reg.courses.slice(0, 2).map(c => <span key={c} className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-[#0a1f5c] border border-blue-100">{c}</span>)}
                            {reg.courses.length > 2 && <span className="text-gray-400">+{reg.courses.length - 2}</span>}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{reg.examDate}</td>
                        <td className="px-3 py-3 text-gray-600">{reg.examMode?.includes("Online") ? "Online" : "Offline"}</td>
                        <td className="px-3 py-3 whitespace-nowrap"><StatusBadge s={reg.examCompleted ? "Exam Done" : reg.status} /></td>
                        <td className="px-3 py-3 font-serif font-bold text-[#4c1d95]">{reg.examCompleted && reg.score !== null ? `${reg.score}%` : "—"}</td>
                        <td className="px-3 py-3">{g ? <span className="px-1.5 py-0.5 rounded font-bold text-xs border" style={{ background: g.bg, color: g.col, borderColor: g.col + "44" }}>{g.g}</span> : "—"}</td>
                        <td className="px-3 py-3 text-xs font-semibold" style={{ color: g?.col || "#9ca3af" }}>{g?.s || "—"}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex gap-1">
                            {reg.status === "Pending" && (
                              <>
                                <button onClick={() => updateStatus(reg.id, "Approved")} className="px-2 py-1 rounded text-xs font-bold text-white bg-green-600 hover:bg-green-700">Approve</button>
                                <button onClick={() => updateStatus(reg.id, "Rejected")} className="px-2 py-1 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-700">Reject</button>
                              </>
                            )}
                            {reg.status !== "Pending" && <span className="text-gray-400 text-[10px]">—</span>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400 text-right">Showing {filtered.length} of {registrations.length} candidates</div>
        </div>
      )}
    </div>
  );
}
