import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const BASE = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
const API  = `${BASE}/registrations/admin`;
const AUTH = `${BASE}/auth`;

const gradeBadge = g => {
  if (g === 'A+') return 'bg-yellow-100 text-yellow-700';
  if (g === 'A')  return 'bg-green-100 text-green-700';
  if (g === 'B')  return 'bg-blue-100 text-blue-700';
  if (g === 'C')  return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
};

const schText = r => {
  if (!r.score && r.score !== 0) return '—';
  if (r.score >= 90) return '100% Fee Waiver';
  if (r.score >= 75) return '50% Fee Waiver';
  if (r.score >= 60) return '25% Fee Waiver';
  if (r.score >= 40) return 'Merit Certificate';
  return '—';
};

export default function AdminPanel() {
  const savedToken = localStorage.getItem('siu_admin_token') || '';
  const savedName  = localStorage.getItem('siu_admin_name') || '';

  const [token, setToken]         = useState(savedToken);
  const [adminName, setAdminName] = useState(savedName);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErr, setLoginErr]   = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [regs, setRegs]           = useState([]);
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(false);
  const [showChPwd, setShowChPwd] = useState(false);
  const [chPwd, setChPwd]         = useState({ cur: '', nw: '', con: '' });
  const [chPwdErr, setChPwdErr]   = useState('');
  const [chPwdOk, setChPwdOk]     = useState('');
  const [chPwdLoading, setChPwdLoading] = useState(false);
  const tokenRef = useRef(savedToken);

  const fetchData = async () => {
    const tok = tokenRef.current || localStorage.getItem('siu_admin_token');
    if (!tok) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/all`, { headers: { Authorization: `Bearer ${tok}` } });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setRegs(Array.isArray(data) ? data : []);
    } catch { setRegs([]); }
    setLoading(false);
  };

  useEffect(() => { if (tokenRef.current) fetchData(); }, []);

  const login = async () => {
    setLoginErr('');
    if (!loginForm.email || !loginForm.password) return setLoginErr('Email and password required.');
    setLoginLoading(true);
    try {
      const res = await fetch(`${AUTH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('siu_admin_token', data.token);
        localStorage.setItem('siu_admin_name', data.name);
        tokenRef.current = data.token;
        setToken(data.token);
        setAdminName(data.name);
        fetchData();
      } else {
        setLoginErr(data.message || 'Invalid credentials.');
      }
    } catch { setLoginErr('Cannot connect to server.'); }
    setLoginLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('siu_admin_token');
    localStorage.removeItem('siu_admin_name');
    tokenRef.current = '';
    setToken(''); setAdminName(''); setRegs([]);
  };

  const changePassword = async () => {
    setChPwdErr(''); setChPwdOk('');
    if (!chPwd.cur || !chPwd.nw || !chPwd.con) return setChPwdErr('All fields are required.');
    if (chPwd.nw.length < 6) return setChPwdErr('New password must be at least 6 characters.');
    if (chPwd.nw !== chPwd.con) return setChPwdErr('Passwords do not match.');
    setChPwdLoading(true);
    try {
      const res = await fetch(`${AUTH}/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenRef.current}` },
        body: JSON.stringify({ currentPassword: chPwd.cur, newPassword: chPwd.nw })
      });
      const data = await res.json();
      if (res.ok) {
        setChPwdOk('Password updated successfully!');
        setChPwd({ cur: '', nw: '', con: '' });
        setTimeout(() => { setShowChPwd(false); setChPwdOk(''); }, 2000);
      } else {
        setChPwdErr(data.message || 'Failed to update password.');
      }
    } catch { setChPwdErr('Cannot connect to server.'); }
    setChPwdLoading(false);
  };

  const setStatus = async (appId, status) => {
    await fetch(`${API}/status/${appId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenRef.current}` }, body: JSON.stringify({ status }) });
    fetchData();
  };

  const verifyId = async (appId, verified) => {
    await fetch(`${API}/verify-id/${appId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenRef.current}` }, body: JSON.stringify({ idVerified: verified }) });
    fetchData();
  };

  const toggleOverride = async (appId, current) => {
    await fetch(`${API}/override/${appId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenRef.current}` }, body: JSON.stringify({ examOverride: !current }) });
    fetchData();
  };

  const resetExam = async (appId) => {
    if (!window.confirm('Reset this candidate\'s exam? They will be able to retake it.')) return;
    await fetch(`${API}/reset/${appId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenRef.current}` } });
    fetchData();
  };

  const approveAll = async () => {
    await fetch(`${API}/approve-all`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenRef.current}` } });
    fetchData();
  };

  const exportCSV = () => {
    if (!regs.length) return alert('No data to export.');
    const h = ['#','App ID','Name','Mobile','Email','City','State','Qualification','Board','Marks','Year','Courses','Exam Date','Mode','Centre','Medium','Category','Source','Registered','Status','Score','Grade','Scholarship'];
    const rows = regs.map((r, i) => [
      i+1, r.appId, `${r.firstName} ${r.lastName}`, r.mobile, r.email,
      r.city, r.state, r.qual, r.board, r.marks, r.yop,
      (r.courses||[]).join('|'), r.examDate, r.examMode, r.centre,
      r.medium, r.category, r.source,
      r.registeredAt ? new Date(r.registeredAt).toLocaleString('en-IN') : '',
      r.status, r.score??'', r.grade??'', schText(r)
    ].map(v=>`"${(v||'').toString().replace(/"/g,'""')}"`).join(','));
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent([h.join(','),...rows].join('\n'));
    a.download = 'SIU_TalentHunt_2026-27.csv'; a.click();
  };

  // LOGIN SCREEN
  if (!token) return (
    <div className="max-w-sm mx-auto py-12">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h3 className="text-blue-800 font-bold text-lg font-outfit">Admin Login</h3>
          <p className="text-gray-400 text-xs mt-1">Saroj International University — Talent Hunt Portal</p>
        </div>
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <input type="email" value={loginForm.email} onChange={e => setLoginForm(p=>({...p,email:e.target.value}))}
              onKeyDown={e=>e.key==='Enter'&&login()}
              placeholder="admin@sarojuniversity.edu.in"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm(p=>({...p,password:e.target.value}))}
              onKeyDown={e=>e.key==='Enter'&&login()}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"/>
          </div>
        </div>
        {loginErr && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">{loginErr}</p>}
        <button onClick={login} disabled={loginLoading} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60">
          {loginLoading ? 'Logging in...' : 'Login →'}
        </button>
      </div>
    </div>
  );

  const filtered = filter === 'all' ? regs : filter === 'ExamDone' ? regs.filter(r => r.score !== null && r.score !== undefined) : regs.filter(r => r.status === filter);
  const q = search.toLowerCase();
  const rows = !q ? filtered : filtered.filter(r =>
    (r.appId||'').toLowerCase().includes(q) ||
    (`${r.firstName} ${r.lastName}`).toLowerCase().includes(q) ||
    (r.mobile||'').includes(q) ||
    (r.email||'').toLowerCase().includes(q) ||
    (r.courses||[]).join(' ').toLowerCase().includes(q)
  );
  const badge = s => s==='Pending'?'bg-amber-100 text-amber-700':s==='Approved'?'bg-green-100 text-green-700':'bg-red-100 text-red-700';

  return (
    <div>
      {/* Change Password Modal — rendered via portal so it sits above everything */}
      {showChPwd && createPortal(
        <div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.6)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
          <div style={{background:'#fff',borderRadius:'16px',padding:'24px',width:'100%',maxWidth:'400px',boxShadow:'0 20px 60px rgba(0,0,0,0.25)'}}>
            <h3 className="text-blue-800 font-bold text-lg mb-4 font-outfit">Change Password</h3>
            <div className="space-y-3 mb-4">
              {[['cur','Current Password'],['nw','New Password (min 6 chars)'],['con','Confirm New Password']].map(([key,label])=>(
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
                  <input type="password" value={chPwd[key]} onChange={e=>setChPwd(p=>({...p,[key]:e.target.value}))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-700"/>
                </div>
              ))}
            </div>
            {chPwdErr && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">{chPwdErr}</p>}
            {chPwdOk  && <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">✓ {chPwdOk}</p>}
            <div className="flex gap-2">
              <button onClick={changePassword} disabled={chPwdLoading} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60">
                {chPwdLoading ? 'Updating...' : 'Update Password'}
              </button>
              <button onClick={()=>{ setShowChPwd(false); setChPwdErr(''); setChPwdOk(''); setChPwd({cur:'',nw:'',con:''}); }}
                className="flex-1 border border-gray-300 text-gray-600 hover:border-blue-700 hover:text-blue-700 font-semibold py-2.5 rounded-lg text-sm transition">
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Top bar */}
      <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 flex items-center justify-between flex-wrap gap-3">
        <span className="text-sm text-green-700 font-medium">🟢 Logged in as <strong>{adminName || 'Administrator'}</strong> | Session 2026-27 | <strong>{regs.length > 0 ? 1000 - regs.length : 1000}</strong> seats remaining</span>
        <div className="flex gap-2">
          <button onClick={()=>setShowChPwd(true)} className="text-xs font-semibold text-blue-700 hover:underline">✎ Change Password</button>
          <button onClick={logout} className="text-xs font-semibold text-red-600 hover:underline">🔓 Logout</button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-800 rounded-2xl p-5 mb-5 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-white font-bold text-lg font-outfit">Admin Dashboard — All Data</h2>
          <p className="text-blue-300 text-xs mt-1">Complete candidate data, approvals, exam scores & results — Session 2026-27</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 text-xs font-semibold px-4 py-2 rounded-lg transition">⬋ Export CSV</button>
          <button onClick={fetchData} className="bg-white text-blue-800 border border-white border-opacity-40 hover:bg-blue-50 text-xs font-semibold px-4 py-2 rounded-lg transition">↻ Refresh</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        {[
          ['Total', regs.length, 'text-blue-800'],
          ['Pending', regs.filter(r=>r.status==='Pending').length, 'text-amber-600'],
          ['Approved', regs.filter(r=>r.status==='Approved').length, 'text-green-600'],
          ['Rejected', regs.filter(r=>r.status==='Rejected').length, 'text-red-600'],
          ['Exam Done', regs.filter(r=>r.score!==null && r.score!==undefined).length, 'text-purple-600'],
        ].map(([label, val, cls]) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className={`text-3xl font-bold font-outfit ${cls}`}>{val}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2 items-center">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search name, ID, mobile, email, course..."
            className="w-full sm:flex-1 min-w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-700 bg-gray-50"/>
          {['all','Pending','Approved','Rejected','ExamDone'].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${filter===f?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-500 border-gray-300 hover:border-blue-700 hover:text-blue-700'}`}>
              {f==='all'?'All':f==='ExamDone'?'Exam Done':f}
            </button>
          ))}
          <button onClick={approveAll} className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 text-xs font-semibold px-4 py-1.5 rounded-full transition">
            ✓ Approve All Pending
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="overflow-y-auto" style={{maxHeight:'600px'}}>
            <table className="w-full text-sm" style={{minWidth:'1400px'}}>
              <thead className="bg-blue-700 text-white sticky top-0 z-10">
                <tr>{['#','App ID','Name','Mobile','Email','City','State','Qualification','Board','Marks','Year','Courses','Mode','Centre','Medium','Category','Source','Registered','Status','Score','Grade','Scholarship','Actions'].map(h=>(
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold tracking-wide whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={24} className="text-center py-12 text-gray-400 text-sm">No registrations found.</td></tr>
                ) : rows.map((r, i) => (
                  <tr key={r._id} className="border-b border-gray-100 hover:bg-blue-50 transition">
                    <td className="px-3 py-3 text-gray-400 text-xs">{i+1}</td>
                    <td className="px-3 py-3 font-bold text-blue-800 tracking-wide text-xs whitespace-nowrap">{r.appId}</td>
                    <td className="px-3 py-3 font-medium text-xs whitespace-nowrap">{r.firstName} {r.lastName}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">{r.mobile}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.email}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.city}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.state}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.qual}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.board||'—'}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.marks||'—'}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.yop||'—'}</td>
                    <td className="px-3 py-3 text-gray-600 text-xs whitespace-nowrap">{(r.courses||[]).join(', ')}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">{r.examMode}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.centre||'—'}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.medium}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.category}</td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{r.source||'—'}</td>
                    <td className="px-3 py-3 text-gray-400 text-xs whitespace-nowrap">{r.registeredAt ? new Date(r.registeredAt).toLocaleDateString('en-IN') : '—'}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge(r.status)}`}>{r.status}</span>
                      {r.score !== null && r.score !== undefined && <span className="ml-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">Done</span>}
                    </td>
                    <td className="px-3 py-3 font-bold text-blue-800 text-xs">{r.score !== null && r.score !== undefined ? `${r.score}%` : '—'}</td>
                    <td className="px-3 py-3">{r.grade ? <span className={`px-2 py-1 rounded-full text-xs font-bold ${gradeBadge(r.grade)}`}>Grade {r.grade}</span> : '—'}</td>
                    <td className="px-3 py-3 text-xs text-green-700 font-semibold whitespace-nowrap">{schText(r)}</td>
                    <td className="px-3 py-3">
                      {r.status === 'Pending' ? (
                        <div className="flex gap-1 flex-wrap">
                          <button onClick={()=>setStatus(r.appId,'Approved')} className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg transition">Approve</button>
                          <button onClick={()=>setStatus(r.appId,'Rejected')} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition">Reject</button>
                        </div>
                      ) : (
                        <div className="flex gap-1 flex-wrap">
                          <span className={`text-xs font-semibold ${r.status==='Approved'?'text-green-600':'text-red-500'}`}>
                            {r.status==='Approved'?'✓ Approved':'✗ Rejected'}
                          </span>
                          {r.score !== null && r.score !== undefined && (
                            <button onClick={()=>resetExam(r.appId)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-2 py-0.5 rounded transition">Reset</button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
        <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">
          Showing {rows.length} of {regs.length} records | Total capacity: 1000 | Remaining: {1000 - regs.length}
        </div>
      </div>
    </div>
  );
}
