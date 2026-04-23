import { useState, useEffect } from 'react';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API  = `${BASE}/registrations`;

export default function ResultsPanel() {
  const [regs, setRegs]     = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/results`);
      const data = await res.json();
      setRegs(Array.isArray(data) ? data : []);
    } catch { setRegs([]); }
    setLoading(false);
  };

  useEffect(() => { fetch_(); }, []);

  const appeared = regs.filter(r => r.score !== null && r.score !== undefined);
  const filtered = filter === 'all' ? appeared : appeared.filter(r => r.grade === filter);
  const scores   = appeared.map(r => r.score);
  const top      = scores.length ? Math.max(...scores) + '%' : '—';
  const avg      = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) + '%' : '—';

  const gradeBadge = g => g==='A'?'bg-green-100 text-green-700':g==='B'?'bg-blue-100 text-blue-700':g==='C'?'bg-amber-100 text-amber-700':'bg-red-100 text-red-700';

  return (
    <div>
      {/* Header */}
      <div className="bg-blue-800 rounded-2xl p-5 mb-5">
        <h2 className="text-white font-bold text-lg font-outfit">Official Result Sheet</h2>
        <p className="text-blue-300 text-xs mt-1">Saroj International University — Talent Hunt Examination 2026-27</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          ['Appeared', appeared.length, 'text-blue-800'],
          ['Qualified', appeared.filter(r=>r.grade!=='F').length, 'text-green-600'],
          ['Top Score', top, 'text-blue-800'],
          ['Avg Score', avg, 'text-blue-800'],
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
          {[['all','All'],['A','Grade A'],['B','Grade B'],['C','Grade C'],['F','Not Qualified']].map(([val,label]) => (
            <button key={val} onClick={()=>setFilter(val)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${filter===val?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-500 border-gray-300 hover:border-blue-700 hover:text-blue-700'}`}>
              {label}
            </button>
          ))}
          <button onClick={fetch_} className="ml-auto bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 text-xs font-semibold px-3 py-1.5 rounded-full transition">↻ Refresh</button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>{['App ID','Candidate','Course','Score','Grade','Scholarship','Status'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No results available yet.</td></tr>
                ) : filtered.map(r => (
                  <tr key={r._id} className="border-b border-gray-100 hover:bg-blue-50 transition">
                    <td className="px-4 py-3 font-bold text-blue-800 text-xs tracking-wide">{r.appId}</td>
                    <td className="px-4 py-3 font-medium">{r.firstName} {r.lastName}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{(r.courses||[])[0]}</td>
                    <td className="px-4 py-3 font-bold text-base text-blue-800">{r.score}%</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${gradeBadge(r.grade)}`}>Grade {r.grade}</span></td>
                    <td className="px-4 py-3">{r.grade==='A'?<span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Eligible</span>:<span className="text-gray-400 text-xs">—</span>}</td>
                    <td className="px-4 py-3">{r.grade!=='F'?<span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Qualified</span>:<span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Not Qualified</span>}</td>
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
