import { useState, useEffect } from 'react';
import { calcGrade } from './thData';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API  = `${BASE}/registrations`;

const GRADE_COLOR = { 'A+': '#b45309', 'A': '#16a34a', 'B': '#1d4ed8', 'C': '#d97706', 'F': '#dc2626' };
const GRADE_BG    = { 'A+': '#fefce8', 'A': '#f0fdf4', 'B': '#eff6ff', 'C': '#fef3c7', 'F': '#fef2f2' };
const SEC_ICON    = { Biology: '🧬', Chemistry: '🧪', English: '📖', Mathematics: '📐',
                      Physics: '⚡', Maths: '📐', Science: '🔬', GK: '🌍', Reasoning: '🧠',
                      Computers: '💻', Business: '💼', Accounts: '📊', Finance: '💰',
                      Management: '🏢', Economics: '📈', 'Legal Basics': '⚖️',
                      'Constitutional Law': '🏛️', 'Criminal Law': '🔒', Pharmacology: '💊',
                      Anatomy: '🫀', Biochemistry: '🧬', Physiology: '🩺', Basics: '📋',
                      'Contract Law': '📜', 'Tort Law': '⚖️' };

function DetailModal({ candidate, onClose }) {
  const sd = candidate.sectionData || {};
  const diff = sd.difficultyAnalytics || {};

  // Extract per-subject entries (exclude flat keys)
  const FLAT_KEYS = ['correct','wrong','skipped','timeTaken','avgTimePerQuestion','difficultyAnalytics'];
  const secEntries = Object.entries(sd).filter(([k]) => !FLAT_KEYS.includes(k));

  const weakest  = secEntries.length
    ? secEntries.reduce((a, b) => (b[1].total ? Math.round(b[1].correct/b[1].total*100) : 0) < (a[1].total ? Math.round(a[1].correct/a[1].total*100) : 0) ? b : a)[0]
    : null;
  const strongest = secEntries.length
    ? secEntries.reduce((a, b) => (b[1].total ? Math.round(b[1].correct/b[1].total*100) : 0) > (a[1].total ? Math.round(a[1].correct/a[1].total*100) : 0) ? b : a)[0]
    : null;

  const { grade, scholarship } = calcGrade(candidate.score);
  const gc   = GRADE_COLOR[grade] || '#374151';
  const gbg  = GRADE_BG[grade]   || '#f3f4f6';

  const timeTaken = sd.timeTaken || 0;
  const avgTime   = sd.avgTimePerQuestion || 0;
  const now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  // Difficulty rows config
  const diffRows = [
    { key: 'easy',     label: 'Easy',     color: '#16a34a' },
    { key: 'medium',   label: 'Medium',   color: '#2563eb' },
    { key: 'hard',     label: 'Hard',     color: '#ea580c' },
    { key: 'advanced', label: 'Advanced', color: '#7c3aed' },
  ].filter(d => diff[d.key] && diff[d.key].total > 0);

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 py-6 px-3"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#0a1f5c,#1e3a8a)' }} className="px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">SIUAT 2026-27 · Saroj International University</p>
              <h2 className="text-white font-bold text-xl mt-1">{candidate.firstName} {candidate.lastName}</h2>
              <p className="text-white/50 text-xs font-mono mt-0.5">{candidate.appId} · {(candidate.courses||[]).join(', ')}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-black text-white font-outfit">{candidate.score}%</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest">Score</div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">

          {/* Grade + Scholarship */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4 flex items-center gap-3 border"
              style={{ background: gbg, borderColor: gc + '33' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black border-2 shrink-0"
                style={{ background: gc + '18', borderColor: gc + '44', color: gc }}>{grade}</div>
              <div>
                <p className="font-bold text-sm" style={{ color: gc }}>Grade {grade}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {grade==='A+'?'Outstanding — Top Scorer':grade==='A'?'Excellent':grade==='B'?'Good — Above Average':grade==='C'?'Average':'Below Average'}
                </p>
              </div>
            </div>
            <div className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: scholarship ? 'linear-gradient(135deg,#78350f,#b45309)' : '#f9fafb',
                       border: scholarship ? 'none' : '1px solid #e5e7eb' }}>
              <div className="text-2xl shrink-0">{scholarship ? '🏆' : '📋'}</div>
              <div>
                <p className={`font-bold text-sm ${scholarship ? 'text-yellow-200' : 'text-gray-500'}`}>
                  {scholarship ? 'Scholarship Qualified!' : 'Not Qualified'}
                </p>
                <p className={`text-xs mt-0.5 ${scholarship ? 'text-yellow-100/70' : 'text-gray-400'}`}>
                  {scholarship || 'Score 60%+ for merit certificate'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { val: sd.correct ?? '—', label: 'Marks Earned', bg: '#f0fdf4', color: '#16a34a' },
              { val: sd.wrong  ?? '—', label: 'Wrong',        bg: '#fef2f2', color: '#dc2626' },
              { val: sd.skipped ?? '—', label: 'Skipped',     bg: '#fef3c7', color: '#d97706' },
              { val: timeTaken ? `${Math.floor(timeTaken/60)}m ${timeTaken%60}s` : '—', label: 'Time Taken', bg: '#eff6ff', color: '#1d4ed8' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
                <div className="font-black text-lg font-outfit" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Subject-wise Performance */}
          {secEntries.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="font-bold text-sm text-gray-800">📊 Subject-wise Breakdown</p>
                {weakest && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600">⚠ Weakest: {weakest}</span>}
              </div>
              <div className="divide-y divide-gray-50">
                {secEntries.map(([sec, d]) => {
                  const pct     = d.total ? Math.round(d.correct / d.total * 100) : 0;
                  const wrong   = d.total - d.correct;
                  const color   = pct>=75?'#16a34a':pct>=50?'#1d4ed8':pct>=35?'#d97706':'#dc2626';
                  const bg      = pct>=75?'#f0fdf4':pct>=50?'#eff6ff':pct>=35?'#fef3c7':'#fef2f2';
                  const status  = pct>=75?'Strong':pct>=50?'Average':pct>=35?'Weak':'Critical';
                  return (
                    <div key={sec} className="px-5 py-4"
                      style={{ background: sec===weakest?'#fff5f5':sec===strongest?'#f0fdf4':'#fff' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{SEC_ICON[sec] || '📚'}</span>
                          <div>
                            <div className="font-semibold text-sm text-gray-900 flex items-center gap-1.5">
                              {sec}
                              {sec===weakest   && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">WEAKEST</span>}
                              {sec===strongest && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">STRONGEST</span>}
                            </div>
                            <div className="text-[10px] text-gray-400">{d.total} questions</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-xl font-outfit" style={{ color }}>{pct}%</div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: bg, color }}>{status}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div className="h-full rounded-full" style={{ width: `${Math.max(pct,2)}%`, background: color }} />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg px-3 py-2 text-center bg-green-50">
                          <div className="font-bold text-sm text-green-700">{d.correct}</div>
                          <div className="text-[9px] text-gray-400">Correct</div>
                        </div>
                        <div className="rounded-lg px-3 py-2 text-center bg-red-50">
                          <div className="font-bold text-sm text-red-600">{wrong}</div>
                          <div className="text-[9px] text-gray-400">Wrong</div>
                        </div>
                        <div className="rounded-lg px-3 py-2 text-center bg-gray-50">
                          <div className="font-bold text-sm text-gray-500">{d.totalMarks || d.total}</div>
                          <div className="text-[9px] text-gray-400">Total Marks</div>
                        </div>
                      </div>
                      {pct < 50 && (
                        <div className="mt-2 rounded-lg px-3 py-2 text-[11px] text-amber-800 font-medium"
                          style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                          💡 Focus area: Revise {sec} concepts and practise more questions.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Difficulty-wise Analysis */}
          {diffRows.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-800">🎯 Difficulty-wise Analysis</p>
              </div>
              <div className="divide-y divide-gray-50">
                {diffRows.map(({ key, label, color }) => {
                  const d   = diff[key];
                  const pct = Math.round(d.correct / d.total * 100);
                  return (
                    <div key={key} className="px-5 py-3 flex items-center gap-4">
                      <span className="text-xs font-bold w-16 shrink-0" style={{ color }}>{label}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.max(pct,2)}%`, background: color }} />
                      </div>
                      <div className="text-right shrink-0 w-32">
                        <span className="text-xs text-gray-500">{d.correct}/{d.total} correct</span>
                        <span className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: color }}>{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Time Analytics */}
          {(timeTaken > 0 || avgTime > 0) && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Time Spent', val: `${Math.floor(timeTaken/60)}m ${timeTaken%60}s` },
                { label: 'Avg per Question', val: `${avgTime}s` },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-blue-50 p-3 text-center">
                  <div className="font-bold text-base text-blue-800 font-outfit">{s.val}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">Report generated on {now} · Saroj International University</p>
            <button onClick={onClose}
              className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPanel() {
  const [regs, setRegs]         = useState([]);
  const [filter, setFilter]     = useState('all');
  const [loading, setLoading]   = useState(false);
  const [reportFor, setReportFor] = useState(null);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/results`);
      const data = await res.json();
      setRegs(Array.isArray(data) ? data : []);
    } catch { setRegs([]); }
    setLoading(false);
  };

  useEffect(() => { fetch_(); }, []);

  const appeared  = regs.filter(r => r.score !== null && r.score !== undefined);
  const filtered  = filter === 'all' ? appeared : appeared.filter(r => r.grade === filter);
  const scores    = appeared.map(r => r.score);
  const top       = scores.length ? Math.max(...scores) + '%' : '—';
  const avg       = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) + '%' : '—';

  const gradeBadge = g => {
    if (g==='A+') return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    if (g==='A')  return 'bg-green-100 text-green-700';
    if (g==='B')  return 'bg-blue-100 text-blue-700';
    if (g==='C')  return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  const schText = r => calcGrade(r.score).scholarship;

  return (
    <div>
      {reportFor && <DetailModal candidate={reportFor} onClose={() => setReportFor(null)} />}

      {/* Scholarship banner */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-700">
        <span>🏆 Score 90%+ in the SIUAT Exam and win a <strong>100% Full Scholarship!</strong></span>
        <button onClick={() => window.dispatchEvent(new CustomEvent('th-tab', { detail: 'registration' }))}
          className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold text-xs px-4 py-1.5 rounded-lg transition">
          Register Now
        </button>
      </div>

      {/* Header */}
      <div className="bg-blue-800 rounded-2xl p-5 mb-5">
        <h2 className="text-white font-bold text-lg font-outfit">Official Result Sheet</h2>
        <p className="text-blue-300 text-xs mt-1">Saroj International University — SIUAT 2026-27</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          ['Appeared',  appeared.length,                                'text-blue-800'],
          ['Qualified', appeared.filter(r=>r.grade!=='F').length,       'text-green-600'],
          ['Top Score', top,                                             'text-blue-800'],
          ['Avg Score', avg,                                             'text-blue-800'],
        ].map(([label, val, cls]) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className={`text-2xl font-bold font-outfit ${cls}`}>{val}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2 items-center">
          {[
            ['all','All'],
            ['A+','100% Scholarship (A+)'],
            ['A','50% Scholarship (A)'],
            ['B','25% Scholarship (B)'],
            ['C','Grade C'],
            ['F','Not Qualified'],
          ].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${filter===val?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-500 border-gray-300 hover:border-blue-700 hover:text-blue-700'}`}>
              {label}
            </button>
          ))}
          <button onClick={fetch_}
            className="ml-auto bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 text-xs font-semibold px-3 py-1.5 rounded-full transition">
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>{['App ID','Candidate','Course','Score','Grade','Scholarship','Status','Report'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No results available yet.</td></tr>
                ) : filtered.map(r => {
                  const sch = schText(r);
                  const hasSectionData = r.sectionData && typeof r.sectionData === 'object';
                  return (
                    <tr key={r._id} className="border-b border-gray-100 hover:bg-blue-50 transition">
                      <td className="px-4 py-3 font-bold text-blue-800 text-xs tracking-wide">{r.appId}</td>
                      <td className="px-4 py-3 font-medium">{r.firstName} {r.lastName}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{(r.courses||[])[0]}</td>
                      <td className="px-4 py-3 font-bold text-base text-blue-800">{r.score}%</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${gradeBadge(r.grade)}`}>Grade {r.grade}</span>
                      </td>
                      <td className="px-4 py-3">
                        {sch
                          ? <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">{sch}</span>
                          : <span className="text-gray-400 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        {r.grade !== 'F'
                          ? <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Qualified</span>
                          : <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Not Qualified</span>}
                      </td>
                      <td className="px-4 py-3">
                        {hasSectionData
                          ? <button onClick={() => setReportFor(r)}
                              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition">
                              📄 Report
                            </button>
                          : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
