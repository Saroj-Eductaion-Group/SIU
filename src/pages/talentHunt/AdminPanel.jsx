import { useState, useEffect, useRef } from 'react';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API  = `${BASE}/registrations/admin`;
const AUTH = `${BASE}/auth`;

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
  const [loading, setLoading]     = useState(false);
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

  useEffect(() => {
    if (tokenRef.current) fetchData();
  }, []);

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

  const setStatus = async (appId, status) => {
    const tok = tokenRef.current;
    await fetch(`${API}/status/${appId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` }, body: JSON.stringify({ status }) });
    fetchData();
  };

  const toggleOverride = async (appId, current) => {
    const tok = tokenRef.current;
    await fetch(`${API}/override/${appId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` }, body: JSON.stringify({ examOverride: !current }) });
    fetchData();
  };

  const resetExam = async (appId) => {
    if (!window.confirm('Reset this candidate\'s exam? They will be able to retake it.')) return;
    const tok = tokenRef.current;
    await fetch(`${API}/reset/${appId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` } });
    fetchData();
  };

  const approveAll = async () => {
    const tok = tokenRef.current;
    await fetch(`${API}/approve-all`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` } });
    fetchData();
  };

  const exportCSV = () => {
    if (!regs.length) return alert('No data to export.');
    const h = ['App ID','Name','Mobile','Email','City','State','Courses','Qual','Exam Date','Mode','Category','Status','Score','Grade'];
    const rows = regs.map(r => [r.appId,`${r.firstName} ${r.lastName}`,r.mobile,r.email,r.city,r.state,(r.courses||[]).join('|'),r.qual,r.examDate,r.examMode,r.category,r.status,r.score??'',r.grade??''].map(v=>`"${(v||'').toString().replace(/"/g,'""')}"`).join(','));
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

  const rows = filter === 'all' ? regs : regs.filter(r => r.status === filter);
  const badge = s => s==='Pending'?'bg-amber-100 text-amber-700':s==='Approved'?'bg-green-100 text-green-700':'bg-red-100 text-red-700';

  return (
    <div>
      <div className="bg-blue-800 rounded-2xl p-5 mb-5 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-white font-bold text-lg font-outfit">Admin Dashboard</h2>
          <p className="text-blue-300 text-xs mt-1">Welcome, {adminName} — Session 2026-27</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">⬋ Export CSV</button>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          ['Total', regs.length, 'text-blue-800'],
          ['Pending', regs.filter(r=>r.status==='Pending').length, 'text-amber-600'],
          ['Approved', regs.filter(r=>r.status==='Approved').length, 'text-green-600'],
          ['Rejected', regs.filter(r=>r.status==='Rejected').length, 'text-red-600'],
        ].map(([label, val, cls]) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className={`text-3xl font-bold font-outfit ${cls}`}>{val}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2 items-center">
          {['all','Pending','Approved','Rejected'].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${filter===f?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-500 border-gray-300 hover:border-blue-700 hover:text-blue-700'}`}>
              {f==='all'?'All':f}
            </button>
          ))}
          <button onClick={approveAll} className="ml-auto bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 text-xs font-semibold px-4 py-1.5 rounded-full transition">
            ✓ Approve All Pending
          </button>
          <button onClick={fetchData} className="bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 text-xs font-semibold px-3 py-1.5 rounded-full transition">↻ Refresh</button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>{['App ID','Candidate','Mobile','Courses','Exam Date','Status','Action'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No registrations found.</td></tr>
                ) : rows.map(r => (
                  <tr key={r._id} className="border-b border-gray-100 hover:bg-blue-50 transition">
                    <td className="px-4 py-3 font-bold text-blue-800 tracking-wide text-xs">{r.appId}</td>
                    <td className="px-4 py-3 font-medium">{r.firstName} {r.lastName}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{r.mobile}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{(r.courses||[]).slice(0,2).join(', ')}{(r.courses||[]).length>2?'…':''}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{r.examDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge(r.status)}`}>{r.status}</span>
                      {r.score !== null && r.score !== undefined && <span className="ml-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">Done</span>}
                    </td>
                    <td className="px-4 py-3">
                      {r.status === 'Pending' ? (
                        <div className="flex gap-1">
                          <button onClick={()=>setStatus(r.appId,'Approved')} className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg transition">Approve</button>
                          <button onClick={()=>setStatus(r.appId,'Rejected')} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition">Reject</button>
                        </div>
                      ) : r.status === 'Approved' ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-green-600 text-xs font-semibold">✓ Approved</span>
                          {r.score === null || r.score === undefined ? (
                            <button onClick={()=>toggleOverride(r.appId, r.examOverride)}
                              className={`text-xs px-2 py-0.5 rounded-lg font-semibold transition ${
                                r.examOverride
                                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                              }`}>
                              {r.examOverride ? '🔓 Override ON' : '🔒 Allow Now'}
                            </button>
                          ) : (
                            <button onClick={()=>resetExam(r.appId)}
                              className="text-xs px-2 py-0.5 rounded-lg font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition">
                              🔄 Reset Exam
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-red-500 text-xs font-semibold">✗ Rejected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
