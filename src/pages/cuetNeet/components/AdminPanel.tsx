import { useState, useMemo, useEffect } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

const BASE = import.meta.env.VITE_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5000/api`;
export interface Registration {
  id: string;
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
  courses: string[];
  examDate: string;
  examMode: string;
  examCentre: string;
  medium: string;
  category: string;
  source: string;
  status: "Pending" | "Approved" | "Rejected";
  registeredAt: string;
  examCompleted: boolean;
  score: number | null;
}
type StatusFilter = "All" | "Pending" | "Approved" | "Rejected" | "Exam Done";

const ADMIN_PASS = "SIU@Admin2026";

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = { Approved: "bg-green-100 text-green-700 border-green-300", Pending: "bg-amber-100 text-amber-700 border-amber-300", Rejected: "bg-red-100 text-red-700 border-red-300" };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${map[s] || "bg-gray-100 text-gray-700 border-gray-300"}`}>{s}</span>;
}

function getGradeBadge(score: number | null) {
  if (score === null) return null;
  if (score >= 90) return { g: "A+", s: "100%", col: "#7a5500", bg: "#fffbea" };
  if (score >= 75) return { g: "A", s: "50%", col: "#0a1f5c", bg: "#dbeafe" };
  if (score >= 60) return { g: "B", s: "25%", col: "#92400e", bg: "#fef3c7" };
  if (score >= 40) return { g: "C", s: "Cert", col: "#374151", bg: "#f3f4f6" };
  return { g: "F", s: "None", col: "#dc2626", bg: "#fee2e2" };
}

function downloadCSV(registrations: Registration[]) {
  const headers = ["App ID", "First Name", "Last Name", "Mobile", "Email", "City", "State", "Qualification", "Board", "Marks", "Year", "Courses", "Exam Date", "Mode", "Centre", "Medium", "Category", "Source", "Registered At", "Status", "Score", "Grade"];
  const rows = registrations.map(r => {
    const g = getGradeBadge(r.score);
    return [r.id, r.firstName, r.lastName, r.mobile, r.email, r.city, r.state, r.qualification, r.board, r.marks, r.year, r.courses.join("; "), r.examDate, r.examMode, r.examCentre, r.medium, r.category, r.source, new Date(r.registeredAt).toLocaleDateString(), r.status, r.score ?? "", g?.g ?? ""].join(",");
  });
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "SIU_TalentHunt_2026_Registrations.csv"; a.click();
  URL.revokeObjectURL(url);
}

export function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem("admin_in") === "1");
  const [pwInput, setPwInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPwModal, setShowPwModal] = useState(false);
  const [changePw, setChangePw] = useState({ current: "", next: "", confirm: "" });
  const [changePwError, setChangePwError] = useState("");
  const [adminPass, setAdminPass] = useLocalStorage("admin_pass", ADMIN_PASS);

  const [registrations, setRegistrations] = useLocalStorage<Registration[]>("siu_registrations", []);

  // Automatically clear out any residual TEST999 or test candidates from the user's browser local storage
  useEffect(() => {
    if (registrations.some(r => r.id === "TEST999" || r.id === "SIU156714" || r.id === "SIU120229")) {
      setRegistrations(prev => prev.filter(r => r.id !== "TEST999" && r.id !== "SIU156714" && r.id !== "SIU120229"));
    }
  }, [registrations, setRegistrations]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const fetchBackendRegistrations = async (tokenOverride?: string) => {
    const token = tokenOverride || sessionStorage.getItem("neet_admin_token");
    if (!token) return;
    try {
      const res = await fetch(`${BASE}/registrations/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        const mappedRegs = data.map((r: any) => ({
          id: r.appId,
          firstName: r.firstName,
          lastName: r.lastName,
          mobile: r.mobile,
          email: r.email,
          city: r.city,
          state: r.state,
          qualification: r.qual || r.qualification || "—",
          board: r.board || "—",
          marks: r.marks || "—",
          year: r.yop || r.year || "—",
          courses: r.courses || [],
          examDate: r.examDate || "—",
          examMode: r.examMode || "Online (CBT)",
          examCentre: r.centre || r.examCentre || "—",
          medium: r.medium || "English",
          category: r.category || "General",
          source: r.source || "Database Sync",
          status: r.status || "Pending",
          registeredAt: r.registeredAt || new Date().toISOString(),
          examCompleted: r.score !== null && r.score !== undefined,
          score: r.score
        }));
        setRegistrations(mappedRegs);
      }
    } catch (e) {
      console.error("Failed to fetch registrations from backend:", e);
    }
  };

  const login = async () => {
    if (locked) return;
    setLoginError("");

    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@sarojuniversity.edu.in",
          password: pwInput
        })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem("admin_in", "1");
        sessionStorage.setItem("neet_admin_token", data.token);
        setLoggedIn(true);
        setPwInput("");
        fetchBackendRegistrations(data.token);
        return;
      }
    } catch (e) {
      console.warn("Backend login failed, using local fallback credentials", e);
    }

    if (pwInput === adminPass) {
      setLoggedIn(true);
      sessionStorage.setItem("admin_in", "1");
      setLoginError("");
      setPwInput("");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLocked(true);
        setLoginError("Too many failed attempts. Admin panel locked for this session.");
      } else {
        setLoginError(`Invalid password. ${5 - newAttempts} attempt(s) remaining.`);
      }
    }
  };

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("admin_in");
    sessionStorage.removeItem("neet_admin_token");
  };

  useEffect(() => {
    if (loggedIn) {
      fetchBackendRegistrations();
    }
  }, [loggedIn]);

  const updateStatus = async (id: string, status: Registration["status"]) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));

    const token = sessionStorage.getItem("neet_admin_token");
    if (token) {
      try {
        await fetch(`${BASE}/registrations/admin/status/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        });
      } catch (e) {
        console.error(`Failed to update status for candidate ${id} in backend:`, e);
      }
    }
  };

  const approveAllPending = async () => {
    setRegistrations(prev => prev.map(r => r.status === "Pending" ? { ...r, status: "Approved" } : r));

    const token = sessionStorage.getItem("neet_admin_token");
    if (token) {
      try {
        await fetch(`${BASE}/registrations/admin/approve-all`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
      } catch (e) {
        console.error("Failed to approve all pending in backend:", e);
      }
    }
  };

  const handleRefresh = () => {
    const token = sessionStorage.getItem("neet_admin_token");
    if (token) {
      fetchBackendRegistrations(token);
    } else {
      const item = localStorage.getItem("siu_registrations");
      if (item) {
        try {
          setRegistrations(JSON.parse(item));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const filtered = useMemo(() => {
    return registrations.filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || `${r.firstName} ${r.lastName} ${r.id} ${r.mobile} ${r.email} ${r.courses.join(" ")}`.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || (statusFilter === "Exam Done" ? r.examCompleted : r.status === statusFilter);
      return matchSearch && matchStatus;
    });
  }, [registrations, search, statusFilter]);

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === "Pending").length,
    approved: registrations.filter(r => r.status === "Approved").length,
    rejected: registrations.filter(r => r.status === "Rejected").length,
    examDone: registrations.filter(r => r.examCompleted).length,
  };

  if (!loggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-10 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-serif text-xl font-black text-[#0a1f5c] mb-1">Admin Panel</h2>
          <p className="text-xs text-gray-400 mb-5">Restricted Access — Authorised SIU Personnel Only</p>
          {locked ? (
            <div className="text-red-600 text-sm font-semibold p-3 rounded-lg bg-red-50">{loginError}</div>
          ) : (
            <>
              <input type="password" value={pwInput} onChange={e => setPwInput(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Enter Admin Password" data-testid="admin-pw-input"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-purple-400" />
              {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}
              <button onClick={login} data-testid="admin-login-btn" className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: "#0a1f5c" }}>
                Login as Administrator →
              </button>
              <p className="text-[10px] text-gray-400 mt-3">Hint: SIU@Admin2026</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Change PW Modal */}
      {showPwModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-bold text-[#0a1f5c] mb-4">Change Admin Password</h3>
            <div className="space-y-3">
              <input type="password" placeholder="Current Password" value={changePw.current} onChange={e => setChangePw(p => ({ ...p, current: e.target.value }))} className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none" />
              <input type="password" placeholder="New Password" value={changePw.next} onChange={e => setChangePw(p => ({ ...p, next: e.target.value }))} className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none" />
              <input type="password" placeholder="Confirm New Password" value={changePw.confirm} onChange={e => setChangePw(p => ({ ...p, confirm: e.target.value }))} className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none" />
              {changePwError && <p className="text-red-500 text-xs">{changePwError}</p>}
              <div className="flex gap-2">
                <button onClick={() => setShowPwModal(false)} className="flex-1 py-2 border rounded-lg text-sm">Cancel</button>
                <button onClick={() => {
                  if (changePw.current !== adminPass) { setChangePwError("Current password is incorrect."); return; }
                  if (changePw.next.length < 6) { setChangePwError("New password must be at least 6 characters."); return; }
                  if (changePw.next !== changePw.confirm) { setChangePwError("Passwords do not match."); return; }
                  setAdminPass(changePw.next);
                  setShowPwModal(false);
                  setChangePw({ current: "", next: "", confirm: "" });
                  setChangePwError("");
                }} className="flex-1 py-2 rounded-lg text-sm font-bold text-white" style={{ background: "#0a1f5c" }}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin bar */}
      <div className="rounded-xl p-3 mb-5 flex items-center gap-3 flex-wrap" style={{ background: "#ecfdf5", border: "1.5px solid #a7f3d0" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-xs font-bold text-green-800">Logged in as Administrator | Session 2026-27 | {500} seats capacity</span>
        <div className="flex-1" />
        <button onClick={() => setShowPwModal(true)} className="text-xs px-3 py-1 rounded border border-green-400 text-green-700 font-semibold hover:bg-green-50">Change Password</button>
        <button onClick={logout} data-testid="admin-logout" className="text-xs px-3 py-1 rounded border border-red-300 text-red-600 font-semibold hover:bg-red-50">Logout</button>
      </div>

      {/* Dashboard header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="font-serif font-black text-xl text-[#0a1f5c]">Candidate Management Dashboard</h2>
        <div className="flex gap-2">
          <button onClick={handleRefresh} className="text-xs px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">↺ Refresh</button>
          <button onClick={() => downloadCSV(filtered)} data-testid="admin-export-csv" className="text-xs px-3 py-2 rounded-lg font-bold text-white" style={{ background: "#0a1f5c" }}>⬇ Export CSV</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        {[
          { num: stats.total, label: "Total Registered", color: "#6c3fc7", bg: "#f5f0ff" },
          { num: stats.pending, label: "Pending Approval", color: "#d97706", bg: "#fef3c7" },
          { num: stats.approved, label: "Approved", color: "#16a34a", bg: "#ecfdf5" },
          { num: stats.rejected, label: "Rejected", color: "#dc2626", bg: "#fee2e2" },
          { num: stats.examDone, label: "Exam Completed", color: "#0a1f5c", bg: "#dbeafe" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center border" style={{ background: s.bg, borderColor: s.color + "40" }}>
            <div className="font-serif font-bold text-2xl" style={{ color: s.color }}>{s.num}</div>
            <div className="text-[10px] font-medium mt-0.5" style={{ color: s.color + "cc" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex gap-3 mb-3 flex-wrap items-center">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, App ID, mobile, email, course..." data-testid="admin-search"
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-400" />
        <div className="flex gap-1 flex-wrap">
          {(["All", "Pending", "Approved", "Rejected", "Exam Done"] as StatusFilter[]).map(f => (
            <button key={f} onClick={() => setStatusFilter(f)} data-testid={`admin-filter-${f}`}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
              style={{ background: statusFilter === f ? "#0a1f5c" : "#fff", color: statusFilter === f ? "#fff" : "#6b7280", border: "1.5px solid " + (statusFilter === f ? "#0a1f5c" : "#e5e7eb") }}>
              {f}
            </button>
          ))}
        </div>
        {stats.pending > 0 && (
          <button onClick={approveAllPending} data-testid="approve-all-pending" className="text-xs px-3 py-1.5 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700">
            ✓ Approve All Pending ({stats.pending})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[900px]">
            <thead>
              <tr className="text-left border-b border-gray-200" style={{ background: "#f5f0ff" }}>
                {["#", "App ID", "Name", "Mobile", "Email", "City/State", "Qualification", "Courses", "Exam Date", "Mode", "Status", "Score", "Grade", "Scholarship", "Actions"].map(h => (
                  <th key={h} style={{ color: "#4c1d95" }} className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr><td colSpan={15} className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">🔍</div>
                  <div>No candidates match your search or filter</div>
                </td></tr>
              )}
              {filtered.map((reg, i) => {
                const g = reg.score !== null && reg.examCompleted ? getGradeBadge(reg.score) : null;
                return (
                  <tr key={reg.id} data-testid={`admin-row-${reg.id}`} className="hover:bg-gray-50 transition">
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
                    <td className="px-3 py-3 text-gray-600">{reg.examMode.includes("Online") ? "Online" : "Offline"}</td>
                    <td className="px-3 py-3 whitespace-nowrap"><StatusBadge s={reg.examCompleted ? "Exam Done" : reg.status} /></td>
                    <td className="px-3 py-3 font-serif font-bold text-[#4c1d95]">{reg.score !== null && reg.examCompleted ? `${reg.score}%` : "—"}</td>
                    <td className="px-3 py-3">
                      {g ? <span className="px-1.5 py-0.5 rounded font-bold text-xs border" style={{ background: g.bg, color: g.col, borderColor: g.col + "44" }}>{g.g}</span> : "—"}
                    </td>
                    <td className="px-3 py-3 text-xs font-semibold" style={{ color: g?.col || "#9ca3af" }}>{g?.s || "—"}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex gap-1">
                        {reg.status === "Pending" && (
                          <>
                            <button onClick={() => updateStatus(reg.id, "Approved")} data-testid={`approve-${reg.id}`} className="px-2 py-1 rounded text-xs font-bold text-white bg-green-600 hover:bg-green-700">Approve</button>
                            <button onClick={() => updateStatus(reg.id, "Rejected")} data-testid={`reject-${reg.id}`} className="px-2 py-1 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-700">Reject</button>
                          </>
                        )}
                        {reg.status !== "Pending" && <span className="text-gray-400 text-[10px]">No actions</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-400 text-right">Showing {filtered.length} of {registrations.length} candidates</div>
    </div>
  );
}
