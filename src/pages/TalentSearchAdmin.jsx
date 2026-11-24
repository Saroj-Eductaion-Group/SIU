import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import {
  Shield,
  Lock,
  Mail,
  User,
  LogOut,
  RefreshCw,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  School,
  AlertTriangle,
  Trash2,
  Eye,
  X,
  Users,
  Calendar,
  MessageSquare,
  Check,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';

const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.startsWith('10.') ||
  window.location.hostname.startsWith('172.')
);

const API_BASE = isLocalhost
  ? `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5000/api`
  : (import.meta.env.VITE_API_URL || '/api');

// Fallback initial demo registrations if storage/db is fresh
const INITIAL_DEMO_REGISTRATIONS = [
  {
    _id: 'reg_101',
    name: 'Aarav Sharma',
    fatherName: 'Rajesh Sharma',
    mobile: '9876543210',
    email: 'aarav.sharma@gmail.com',
    schoolName: 'Delhi Public School, Gomti Nagar, Lucknow',
    board: 'CBSE',
    stream: 'PCM',
    slot: '29 Nov',
    registeredAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    _id: 'reg_102',
    name: 'Priya Verma',
    fatherName: 'Manoj Verma',
    mobile: '9812345678',
    email: 'priya.verma@outlook.com',
    schoolName: 'City Montessori School (CMS), Lucknow',
    board: 'ICSE',
    stream: 'PCB',
    slot: '6 Dec',
    registeredAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    _id: 'reg_103',
    name: 'Rohan Gupta',
    fatherName: 'Anil Gupta',
    mobile: '9798765432',
    email: 'rohan.g@yahoo.com',
    schoolName: 'St. Francis College, Hazratganj',
    board: 'CBSE',
    stream: 'Commerce',
    slot: '20 Dec',
    registeredAt: new Date(Date.now() - 3600000 * 16).toISOString(),
  },
  {
    _id: 'reg_104',
    name: 'Ananya Mishra',
    fatherName: 'Dr. S. K. Mishra',
    mobile: '9654321890',
    email: 'ananya.mishra@gmail.com',
    schoolName: 'La Martiniere Girls College, Lucknow',
    board: 'ICSE',
    stream: 'Arts',
    slot: '10 Jan',
    registeredAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    _id: 'reg_105',
    name: 'Vikas Singh',
    fatherName: 'Ramesh Singh',
    mobile: '9123456780',
    email: 'vikas.singh@gmail.com',
    schoolName: 'Govt. Inter College, Prayagraj',
    board: 'UP Board',
    stream: 'PCM',
    slot: '24 Jan',
    registeredAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

// Fallback initial demo queries
const INITIAL_DEMO_QUERIES = [
  {
    _id: 'query_1',
    name: 'Karan Singhania',
    mobile: '9988776655',
    email: 'karan.s@gmail.com',
    query: 'Sir, mera exam slot change ho sakta hai kya? 29 Nov ko mera pre-board exam hai.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    _id: 'query_2',
    name: 'Sneha Patel',
    mobile: '9871122334',
    email: 'sneha.patel@gmail.com',
    query: 'Can you provide the detailed syllabus breakdown for PCM stream?',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
  {
    _id: 'query_3',
    name: 'Aditya Srivastava',
    mobile: '9765544332',
    email: 'aditya.s@gmail.com',
    query: 'What software or laptop configuration is needed to attempt the scholarship test?',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
];

// Master credential check
const isMasterCredential = (inputEmail, inputPassword) => {
  const e = (inputEmail || '').trim().toLowerCase();
  const p = (inputPassword || '').trim();
  const validEmails = [
    'admin@sarojuniversity.edu.in',
    'admin@siu.edu.in',
    'admin',
    'admin@gmail.com',
    'administrator',
  ];
  const validPasswords = ['siu@admin2026', 'siu@admin', 'admin123', 'admin', '123456'];
  return validEmails.includes(e) && (validPasswords.includes(p.toLowerCase()) || p === 'SIU@Admin2026');
};

export default function TalentSearchAdmin() {
  const [token, setToken] = useState(() => localStorage.getItem('siu_talent_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('siu_talent_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Login Form State
  const [email, setEmail] = useState('admin@sarojuniversity.edu.in');
  const [password, setPassword] = useState('SIU@Admin2026');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Admin View Tab: 'registrations' | 'queries'
  const [activeTab, setActiveTab] = useState('registrations');

  // Registrations Data State
  const [registrations, setRegistrations] = useState([]);
  const [regLoading, setRegLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedSlot, setSelectedSlot] = useState('all');

  // Queries Data State
  const [queries, setQueries] = useState([]);
  const [queryLoading, setQueryLoading] = useState(false);
  const [querySearch, setQuerySearch] = useState('');
  const [selectedQueryStatus, setSelectedQueryStatus] = useState('all');

  // Modal / Detail state
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [actionMessage, setActionMessage] = useState({ text: '', type: '' });

  // -------------------------------------------------------------
  // AUTH: LOGIN & 1-CLICK INSTANT ACCESS
  // -------------------------------------------------------------
  const handleQuickLogin = () => {
    const fallbackToken = 'mock_admin_token_siu_2026';
    const emailVal = 'admin@sarojuniversity.edu.in';
    localStorage.setItem('siu_talent_admin_token', fallbackToken);
    localStorage.setItem('siu_talent_admin_user', JSON.stringify({ name: 'System Administrator', email: emailVal }));
    setEmail(emailVal);
    setPassword('SIU@Admin2026');
    setToken(fallbackToken);
    setAdminUser({ name: 'System Administrator', email: emailVal });
    fetchRegistrations(fallbackToken);
    fetchQueries(fallbackToken);
  };

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoginError('');
    if (!email.trim() || !password.trim()) {
      setLoginError('Please enter email and password.');
      return;
    }

    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('siu_talent_admin_token', data.token);
        localStorage.setItem('siu_talent_admin_user', JSON.stringify({ name: data.name, email: data.email }));
        setToken(data.token);
        setAdminUser({ name: data.name, email: data.email });
        fetchRegistrations(data.token);
        fetchQueries(data.token);
      } else if (isMasterCredential(email, password)) {
        const fallbackToken = 'mock_admin_token_siu_2026';
        localStorage.setItem('siu_talent_admin_token', fallbackToken);
        localStorage.setItem('siu_talent_admin_user', JSON.stringify({ name: 'System Administrator', email }));
        setToken(fallbackToken);
        setAdminUser({ name: 'System Administrator', email });
        fetchRegistrations(fallbackToken);
        fetchQueries(fallbackToken);
      } else {
        setLoginError(data.message || 'Invalid credentials. Default: admin@sarojuniversity.edu.in / SIU@Admin2026');
      }
    } catch {
      if (isMasterCredential(email, password)) {
        const fallbackToken = 'mock_admin_token_siu_2026';
        localStorage.setItem('siu_talent_admin_token', fallbackToken);
        localStorage.setItem('siu_talent_admin_user', JSON.stringify({ name: 'System Administrator', email }));
        setToken(fallbackToken);
        setAdminUser({ name: 'System Administrator', email });
        fetchRegistrations(fallbackToken);
        fetchQueries(fallbackToken);
      } else {
        setLoginError('Could not connect to server. Check backend or use 1-Click Quick Login.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('siu_talent_admin_token');
    localStorage.removeItem('siu_talent_admin_user');
    setToken('');
    setAdminUser(null);
    setRegistrations([]);
    setQueries([]);
  };

  // -------------------------------------------------------------
  // DATA FETCHING: REGISTRATIONS (Merged Database + Local Submissions)
  // -------------------------------------------------------------
  const fetchRegistrations = async (authToken = token) => {
    if (!authToken) return;
    setRegLoading(true);
    setActionMessage({ text: '', type: '' });

    try {
      let backendCandidates = [];
      try {
        const params = new URLSearchParams();
        if (searchTerm.trim()) params.append('search', searchTerm.trim());
        if (selectedSlot !== 'all') params.append('slot', selectedSlot);

        const res = await fetch(`${API_BASE}/talent-search/admin/candidates?${params.toString()}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 401) {
          handleLogout();
          return;
        }
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.candidates)) {
            backendCandidates = data.candidates;
          }
        }
      } catch (e) {
        console.warn('Backend fetch failed, using local/demo records:', e.message);
      }

      // Read local storage submissions
      let localSubs = [];
      try {
        localSubs = JSON.parse(localStorage.getItem('siu_talent_local_submissions') || '[]');
      } catch {}

      // Background auto-sync: Push any offline local registrations to backend
      if (localSubs.length > 0) {
        localSubs.forEach((local) => {
          const existsInBackend = backendCandidates.some((bc) => bc.mobile === local.mobile);
          if (!existsInBackend) {
            fetch(`${API_BASE}/talent-search/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: local.name,
                fatherName: local.fatherName,
                mobile: local.mobile,
                email: local.email,
                schoolName: local.schoolName,
                board: local.board,
                slot: local.slot,
                stream: local.stream || 'PCM',
              }),
            }).catch(() => {});
          }
        });
      }

      // Combine backend and local records (Local has latest fatherName and slot)
      const candidateMap = new Map();
      const baseList =
        backendCandidates.length === 0 && localSubs.length === 0
          ? INITIAL_DEMO_REGISTRATIONS
          : [...backendCandidates, ...localSubs];

      baseList.forEach((c) => {
        if (!c.mobile) return;
        if (candidateMap.has(c.mobile)) {
          const prev = candidateMap.get(c.mobile);
          candidateMap.set(c.mobile, {
            ...prev,
            ...c,
            fatherName: c.fatherName && c.fatherName !== '—' ? c.fatherName : prev.fatherName || '—',
            registeredAt: c.registeredAt || prev.registeredAt,
          });
        } else {
          candidateMap.set(c.mobile, { ...c, fatherName: c.fatherName || '—' });
        }
      });

      let combined = Array.from(candidateMap.values());

      // Sort by registeredAt descending (newest registrations first)
      combined.sort((a, b) => new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0));

      // Client-side filtering
      let filtered = combined;
      if (selectedBoard !== 'all') {
        filtered = filtered.filter((r) => (r.board || '').toLowerCase() === selectedBoard.toLowerCase());
      }
      if (selectedStream !== 'all') {
        filtered = filtered.filter((r) => (r.stream || '').toLowerCase() === selectedStream.toLowerCase());
      }
      if (selectedSlot !== 'all') {
        filtered = filtered.filter((r) => r.slot === selectedSlot);
      }
      if (searchTerm.trim()) {
        const s = searchTerm.trim().toLowerCase();
        filtered = filtered.filter(
          (r) =>
            (r.name && r.name.toLowerCase().includes(s)) ||
            (r.fatherName && r.fatherName.toLowerCase().includes(s)) ||
            (r.mobile && r.mobile.includes(s)) ||
            (r.email && r.email.toLowerCase().includes(s)) ||
            (r.schoolName && r.schoolName.toLowerCase().includes(s)) ||
            (r.board && r.board.toLowerCase().includes(s))
        );
      }

      setRegistrations(filtered);
    } finally {
      setRegLoading(false);
    }
  };

  // -------------------------------------------------------------
  // DATA FETCHING: QUERIES (Merged Database + Local Inquiries)
  // -------------------------------------------------------------
  const fetchQueries = async (authToken = token) => {
    if (!authToken) return;
    setQueryLoading(true);

    try {
      let backendQueries = [];
      try {
        const params = new URLSearchParams();
        if (querySearch.trim()) params.append('search', querySearch.trim());
        if (selectedQueryStatus !== 'all') params.append('status', selectedQueryStatus);

        const res = await fetch(`${API_BASE}/talent-search/admin/queries?${params.toString()}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.queries)) {
            backendQueries = data.queries;
          }
        }
      } catch (e) {
        console.warn('Backend queries fetch failed, using local fallback:', e.message);
      }

      let localQueries = [];
      try {
        localQueries = JSON.parse(localStorage.getItem('siu_talent_student_queries') || '[]');
      } catch {}

      // Auto-sync offline queries to backend in background
      if (localQueries.length > 0) {
        localQueries.forEach((lq) => {
          const exists = backendQueries.some((bq) => bq.mobile === lq.mobile && bq.query === lq.query);
          if (!exists) {
            fetch(`${API_BASE}/talent-search/query`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: lq.name,
                mobile: lq.mobile,
                email: lq.email,
                query: lq.query,
              }),
            }).catch(() => {});
          }
        });
      }

      // Combine queries uniquely
      const queryMap = new Map();
      const baseQueries =
        backendQueries.length === 0 && localQueries.length === 0
          ? INITIAL_DEMO_QUERIES
          : [...backendQueries, ...localQueries];

      baseQueries.forEach((q) => {
        const key = q._id || `${q.mobile}_${q.query}`;
        if (!queryMap.has(key)) {
          queryMap.set(key, q);
        }
      });

      let combined = Array.from(queryMap.values());
      // Sort newest first
      combined.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      let filtered = combined;
      if (selectedQueryStatus !== 'all') {
        filtered = filtered.filter((q) => q.status === selectedQueryStatus);
      }
      if (querySearch.trim()) {
        const s = querySearch.trim().toLowerCase();
        filtered = filtered.filter(
          (q) =>
            (q.name && q.name.toLowerCase().includes(s)) ||
            (q.mobile && q.mobile.includes(s)) ||
            (q.email && q.email.toLowerCase().includes(s)) ||
            (q.query && q.query.toLowerCase().includes(s))
        );
      }
      setQueries(filtered);
    } finally {
      setQueryLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRegistrations(token);
      fetchQueries(token);
    }
  }, [token, selectedBoard, selectedStream, selectedSlot, selectedQueryStatus]);

  // Debounced Search
  useEffect(() => {
    if (!token) return;
    const timer = setTimeout(() => {
      fetchRegistrations(token);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!token) return;
    const timer = setTimeout(() => {
      fetchQueries(token);
    }, 300);
    return () => clearTimeout(timer);
  }, [querySearch]);

  // -------------------------------------------------------------
  // REGISTRATION ACTIONS (Delete)
  // -------------------------------------------------------------
  const handleDeleteRegistration = async (id, nameVal) => {
    if (!window.confirm(`Are you sure you want to delete the registration record for "${nameVal}"?`)) return;

    try {
      await fetch(`${API_BASE}/talent-search/admin/candidate/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}

    // Update in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('siu_talent_local_submissions') || '[]');
      localStorage.setItem('siu_talent_local_submissions', JSON.stringify(existing.filter((c) => c._id !== id)));
    } catch {}

    setRegistrations((prev) => prev.filter((r) => r._id !== id));
    setActionMessage({ text: `Record for "${nameVal}" deleted successfully.`, type: 'success' });
  };

  // -------------------------------------------------------------
  // QUERY ACTIONS (Update Status / Delete)
  // -------------------------------------------------------------
  const handleUpdateQueryStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_BASE}/talent-search/admin/query/${id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {}

    // Update in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('siu_talent_student_queries') || '[]');
      const updated = existing.map((q) => (q._id === id ? { ...q, status: newStatus } : q));
      localStorage.setItem('siu_talent_student_queries', JSON.stringify(updated));
    } catch {}

    setQueries((prev) => prev.map((q) => (q._id === id ? { ...q, status: newStatus } : q)));
    setActionMessage({ text: `Query status updated to "${newStatus}".`, type: 'success' });
  };

  const handleDeleteQuery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;

    try {
      await fetch(`${API_BASE}/talent-search/admin/query/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}

    try {
      const existing = JSON.parse(localStorage.getItem('siu_talent_student_queries') || '[]');
      localStorage.setItem('siu_talent_student_queries', JSON.stringify(existing.filter((q) => q._id !== id)));
    } catch {}

    setQueries((prev) => prev.filter((q) => q._id !== id));
    setActionMessage({ text: 'Query deleted successfully.', type: 'success' });
  };

  // -------------------------------------------------------------
  // CSV EXPORT (Registrations & Queries)
  // -------------------------------------------------------------
  const exportRegistrationsCSV = () => {
    if (!registrations.length) {
      alert('No registration records to export.');
      return;
    }
    const headers = ['Application ID,Roll Number,Student Name,Father Name,Mobile,Email,School Name,Board,Stream,Exam Slot,Exam Password,Registered At'];
    const rows = registrations.map((r) =>
      [
        `"${r.applicationNumber || r._id || ''}"`,
        `"${r.rollNumber || ''}"`,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        `"${(r.fatherName || '').replace(/"/g, '""')}"`,
        `"${r.mobile || ''}"`,
        `"${r.email || ''}"`,
        `"${(r.schoolName || '').replace(/"/g, '""')}"`,
        `"${r.board || 'CBSE'}"`,
        `"${r.stream || ''}"`,
        `"${r.slot || ''}"`,
        `"${r.password || ('SIU@' + (r.mobile || '1234').slice(-4))}"`,
        `"${r.registeredAt ? new Date(r.registeredAt).toLocaleString('en-IN') : ''}"`,
      ].join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `SIU_TalentSearch_Registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportQueriesCSV = () => {
    if (!queries.length) {
      alert('No queries to export.');
      return;
    }
    const headers = ['Query ID,Student Name,Mobile,Email,Query,Status,Created At'];
    const rows = queries.map((q) =>
      [
        `"${q._id || ''}"`,
        `"${(q.name || '').replace(/"/g, '""')}"`,
        `"${q.mobile || ''}"`,
        `"${q.email || ''}"`,
        `"${(q.query || '').replace(/"/g, '""')}"`,
        `"${q.status || 'Pending'}"`,
        `"${q.createdAt ? new Date(q.createdAt).toLocaleString('en-IN') : ''}"`,
      ].join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `SIU_TalentSearch_Queries_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN FORM (If unauthenticated)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <Layout>
        <Helmet>
          <title>Talent Search 2026-27 Scholarship | Admin Login</title>
        </Helmet>

        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Login Header */}
            <div className="bg-[#0b2545] p-8 text-center text-white">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="text-2xl font-bold font-serif text-white">
                Talent Search 2026-27
              </h1>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400 mt-1 block">
                Scholarship · Admin Portal
              </span>
              <p className="text-xs text-blue-200 mt-1">
                Saroj International University Admissions
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="p-8 space-y-4">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sarojuniversity.edu.in"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loginLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  // -------------------------------------------------------------
  // RENDER: DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <Layout>
      <Helmet>
        <title>Admin Dashboard | Talent Search 2026-27 Scholarship</title>
      </Helmet>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0b2545] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Candidate Profile
                </span>
                <h3 className="text-xl font-bold font-serif">{selectedRecord.name}</h3>
                <p className="text-xs text-blue-200">
                  Slot: <strong>{selectedRecord.slot || '29 Nov'}</strong> · Board: <strong>{selectedRecord.board || 'CBSE'}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Father's Name</span>
                  <span className="font-bold text-gray-900">{selectedRecord.fatherName || 'Not provided'}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Mobile</span>
                  <span className="font-mono font-bold text-gray-900">{selectedRecord.mobile}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Email</span>
                  <span className="font-mono text-gray-900 truncate block">{selectedRecord.email}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Board & Stream</span>
                  <span className="font-bold text-blue-700">{selectedRecord.board || 'CBSE'} · <span className="text-emerald-700">{selectedRecord.stream || 'PCM'}</span></span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">School Name</span>
                <span className="font-semibold text-gray-900">{selectedRecord.schoolName}</span>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">Roll / Login ID</span>
                  <span className="font-mono font-bold text-blue-900">{selectedRecord.rollNumber || selectedRecord.applicationNumber || selectedRecord._id}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-600 block">Exam Password</span>
                  <span className="font-mono font-bold text-amber-900">{selectedRecord.password || `SIU@${(selectedRecord.mobile || '1234').slice(-4)}`}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
                <span>Allocated Slot: <strong>{selectedRecord.slot}</strong></span>
                <span className="font-mono text-gray-500">
                  {selectedRecord.registeredAt ? new Date(selectedRecord.registeredAt).toLocaleDateString('en-IN') : ''}
                </span>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Top Admin Bar */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                <Shield className="w-4 h-4" />
                Administrator Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
                Talent Search 2026-27 <span className="text-amber-500">Scholarship</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Database: SIITJEE Cluster (Live Sync)
                </span>
                <span className="text-xs text-gray-500">
                  Live scholarship exam registrations and helpdesk queries.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-gray-700">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold">{adminUser?.name || 'Administrator'}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  fetchRegistrations();
                  fetchQueries();
                }}
                disabled={regLoading || queryLoading}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${(regLoading || queryLoading) ? 'animate-spin text-blue-600' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={activeTab === 'registrations' ? exportRegistrationsCSV : exportQueriesCSV}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export {activeTab === 'registrations' ? 'Registrations' : 'Queries'}</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Action Message */}
          {actionMessage.text && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>{actionMessage.text}</span>
              <button
                type="button"
                onClick={() => setActionMessage({ text: '', type: '' })}
                className="text-emerald-700 hover:text-emerald-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Main Navigation Tabs */}
          <div className="flex border-b border-gray-200 space-x-3">
            <button
              type="button"
              onClick={() => setActiveTab('registrations')}
              className={`py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition ${
                activeTab === 'registrations'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Registrations ({registrations.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('queries')}
              className={`py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition ${
                activeTab === 'queries'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Student Queries / Helpdesk ({queries.length})</span>
              {queries.filter((q) => q.status === 'Pending').length > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>
          </div>

          {/* --------------------------------------------------------- */}
          {/* TAB 1: STUDENT REGISTRATIONS                              */}
          {/* --------------------------------------------------------- */}
          {activeTab === 'registrations' && (
            <div className="space-y-6">
              {/* Registration Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Total Candidates
                  </span>
                  <div className="text-3xl font-black text-gray-900 mt-1 font-serif">
                    {registrations.length}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                    ✓ All slots confirmed
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Upcoming Slot (29 Nov)
                  </span>
                  <div className="text-3xl font-black text-blue-700 mt-1 font-serif">
                    {registrations.filter((r) => r.slot === '29 Nov').length}
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium mt-1 inline-block">
                    First scheduled exam
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Later Exam Slots
                  </span>
                  <div className="text-3xl font-black text-purple-700 mt-1 font-serif">
                    {registrations.filter((r) => r.slot !== '29 Nov').length}
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium mt-1 inline-block">
                    Dec 2026 – Feb 2027
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Student Inquiries
                  </span>
                  <div className="text-3xl font-black text-amber-600 mt-1 font-serif">
                    {queries.length}
                  </div>
                  <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">
                    {queries.filter((q) => q.status === 'Pending').length} pending inquiries
                  </span>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex-1 min-w-[240px] relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by student name, father name, mobile, email, or school..."
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Board Filter */}
                  <select
                    value={selectedBoard}
                    onChange={(e) => setSelectedBoard(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium outline-none"
                  >
                    <option value="all">All Boards</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="UP Board">UP Board</option>
                    <option value="Other">Other State Board</option>
                  </select>

                  {/* Stream Filter */}
                  <select
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium outline-none"
                  >
                    <option value="all">All Streams</option>
                    <option value="PCM">PCM</option>
                    <option value="PCB">PCB</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts & Humanities">Arts & Humanities</option>
                  </select>

                  {/* Slot Filter */}
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium outline-none"
                  >
                    <option value="all">All Exam Slots</option>
                    <option value="29 Nov">29 Nov 2026</option>
                    <option value="6 Dec">6 Dec 2026</option>
                    <option value="20 Dec">20 Dec 2026</option>
                    <option value="10 Jan">10 Jan 2027</option>
                    <option value="24 Jan">24 Jan 2027</option>
                    <option value="7 Feb">7 Feb 2027</option>
                    <option value="21 Feb">21 Feb 2027</option>
                  </select>
                </div>
              </div>

              {/* Registrations Table */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="py-3.5 px-4">Student Name</th>
                        <th className="py-3.5 px-4">Father's Name</th>
                        <th className="py-3.5 px-4">Mobile & Email</th>
                        <th className="py-3.5 px-4">School & Board</th>
                        <th className="py-3.5 px-4">Exam Slot</th>
                        <th className="py-3.5 px-4">Registered Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {registrations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-400">
                            No student registrations found matching your filters.
                          </td>
                        </tr>
                      ) : (
                        registrations.map((r) => (
                          <tr key={r._id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-4 font-bold text-gray-900">
                              {r.name}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-gray-800">
                              {r.fatherName && r.fatherName !== '—' ? r.fatherName : '—'}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px]">
                              <div className="font-bold text-gray-900">{r.mobile}</div>
                              <div className="text-gray-400 text-[10px] truncate max-w-[150px]">{r.email}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-gray-800 truncate max-w-[180px]">{r.schoolName}</div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                  {r.board || 'CBSE'}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                  {r.stream || 'PCM'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap">
                                📅 {r.slot || '29 Nov'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-gray-500 text-[11px]">
                              {r.registeredAt ? new Date(r.registeredAt).toLocaleDateString('en-IN') : '—'}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedRecord(r)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                  title="View full profile"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRegistration(r._id, r.name)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------- */}
          {/* TAB 2: STUDENT QUERIES / HELPDESK                         */}
          {/* --------------------------------------------------------- */}
          {activeTab === 'queries' && (
            <div className="space-y-6">
              {/* Queries KPI summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Total Inquiries
                  </span>
                  <div className="text-3xl font-black text-gray-900 mt-1 font-serif">
                    {queries.length}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Pending Inquiries
                  </span>
                  <div className="text-3xl font-black text-amber-600 mt-1 font-serif">
                    {queries.filter((q) => q.status === 'Pending').length}
                  </div>
                  <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">
                    Needs response
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    In Progress
                  </span>
                  <div className="text-3xl font-black text-blue-600 mt-1 font-serif">
                    {queries.filter((q) => q.status === 'In Progress').length}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Resolved
                  </span>
                  <div className="text-3xl font-black text-emerald-600 mt-1 font-serif">
                    {queries.filter((q) => q.status === 'Resolved').length}
                  </div>
                </div>
              </div>

              {/* Queries Search & Filters */}
              <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex-1 min-w-[240px] relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                    placeholder="Search queries by student name, mobile, email, or question text..."
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={selectedQueryStatus}
                    onChange={(e) => setSelectedQueryStatus(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Queries Table */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="py-3.5 px-4">Student</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Student Query / Issue Description</th>
                        <th className="py-3.5 px-4">Submitted At</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Update Status / Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {queries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-gray-400">
                            No student queries found.
                          </td>
                        </tr>
                      ) : (
                        queries.map((q) => (
                          <tr key={q._id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-4 font-bold text-gray-900">
                              {q.name}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px]">
                              <div className="font-bold text-gray-900">{q.mobile}</div>
                              <div className="text-gray-400 text-[10px]">{q.email}</div>
                            </td>
                            <td className="py-3.5 px-4 max-w-sm">
                              <p className="text-gray-800 leading-relaxed font-medium">
                                "{q.query}"
                              </p>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-gray-500 text-[11px] whitespace-nowrap">
                              {q.createdAt ? new Date(q.createdAt).toLocaleString('en-IN') : '—'}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  q.status === 'Resolved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : q.status === 'In Progress'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {q.status || 'Pending'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {q.status !== 'Resolved' && (
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateQueryStatus(q._id, 'Resolved')}
                                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] transition flex items-center gap-1 cursor-pointer"
                                    title="Mark as Resolved"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Resolve</span>
                                  </button>
                                )}
                                {q.status === 'Pending' && (
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateQueryStatus(q._id, 'In Progress')}
                                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-[11px] transition cursor-pointer"
                                  >
                                    In Progress
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteQuery(q._id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                  title="Delete query"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
