import { useState } from 'react';
import { calcGrade } from './thData';

const BASE = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
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
  const [appIdInput, setAppIdInput] = useState('');
  const [candidate, setCandidate]   = useState(null);
  const [error, setError]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [reportFor, setReportFor]   = useState(null);

  const lookup = async () => {
    const id = appIdInput.trim().toUpperCase();
    if (!id) return setError('Please enter your Application ID.');
    setError(''); setLoading(true); setCandidate(null);
    try {
      const res  = await fetch(`${API}/${id}`);
      if (res.status === 404) { setError('Application ID not found. Please check and try again.'); setLoading(false); return; }
      const data = await res.json();
      if (data.score === null || data.score === undefined) {
        setError('You have not completed the exam yet. Please take the exam first.');
      } else {
        setCandidate(data);
      }
    } catch { setError('Cannot connect to server. Make sure backend is running.'); }
    setLoading(false);
  };

  const gradeBadge = g => {
    if (g==='A+') return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    if (g==='A')  return 'bg-green-100 text-green-700';
    if (g==='B')  return 'bg-blue-100 text-blue-700';
    if (g==='C')  return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div>
      {reportFor && <DetailModal candidate={reportFor} onClose={() => setReportFor(null)} />}

      {/* Header */}
      <div className="bg-blue-800 rounded-2xl p-5 mb-5">
        <h2 className="text-white font-bold text-lg font-outfit">Check Your Result</h2>
        <p className="text-blue-300 text-xs mt-1">Saroj International University — SIUAT 2026-27</p>
      </div>

      {/* Lookup form */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-5 max-w-md mx-auto">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Enter Your Application ID</label>
        <input
          value={appIdInput}
          onChange={e => setAppIdInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="e.g. SIU123456"
          className="w-full border border-gray-300 rounded-lg px-3 py-3 text-center font-bold text-lg tracking-widest focus:outline-none focus:border-blue-700 mb-3"
        />
        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">{error}</p>}
        <button onClick={lookup} disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60">
          {loading ? 'Searching...' : 'View My Result →'}
        </button>
      </div>

      {/* Result card */}
      {candidate && (() => {
        const { grade, scholarship } = calcGrade(candidate.score);
        const gc  = GRADE_COLOR[grade] || '#374151';
        const gbg = GRADE_BG[grade]   || '#f3f4f6';
        const sch = scholarship;
        const hasSectionData = candidate.sectionData && typeof candidate.sectionData === 'object';
        return (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden max-w-2xl mx-auto">
            {/* Candidate header */}
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

            <div className="p-5 space-y-4">
              {/* Grade + Scholarship */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl p-4 flex items-center gap-3 border" style={{ background: gbg, borderColor: gc + '33' }}>
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
                  style={{ background: sch ? 'linear-gradient(135deg,#78350f,#b45309)' : '#f9fafb', border: sch ? 'none' : '1px solid #e5e7eb' }}>
                  <div className="text-2xl shrink-0">{sch ? '🏆' : '📋'}</div>
                  <div>
                    <p className={`font-bold text-sm ${sch ? 'text-yellow-200' : 'text-gray-500'}`}>
                      {sch ? 'Scholarship Qualified!' : 'Not Qualified'}
                    </p>
                    <p className={`text-xs mt-0.5 ${sch ? 'text-yellow-100/70' : 'text-gray-400'}`}>
                      {sch || 'Score 60%+ for merit certificate'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: `${candidate.score}%`, label: 'Score',  bg: '#eff6ff', color: '#1d4ed8' },
                  { val: candidate.grade,        label: 'Grade',  bg: '#f0fdf4', color: '#16a34a' },
                  { val: candidate.status,       label: 'Status', bg: '#fef3c7', color: '#d97706' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
                    <div className="font-black text-lg font-outfit" style={{ color: s.color }}>{s.val}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Detailed report button */}
              {hasSectionData && (
                <button onClick={() => setReportFor(candidate)}
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition">
                  📄 View Detailed Report
                </button>
              )}

              <button onClick={() => { setCandidate(null); setAppIdInput(''); setError(''); }}
                className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition">
                ← Check another result
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
