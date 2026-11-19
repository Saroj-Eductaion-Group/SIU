import { useState } from 'react';

export default function CuetWelcomeBanner({ candidate, onLogout }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl mb-4 overflow-hidden border" style={{ borderColor: '#c9a84c' }}>
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(90deg,#0a1f5c,#1e3a8a)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: '#c9a84c', color: '#0a1f5c' }}>
          {candidate.firstName?.[0]}{candidate.lastName?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-sm">{candidate.firstName} {candidate.lastName}</div>
          <div className="text-[11px] font-mono" style={{ color: '#c9a84c' }}>{candidate.cuetId}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: '#c9a84c', color: '#0a1f5c' }}>✓ CUET Registered</span>
          <button onClick={() => setExpanded(e => !e)} className="text-white/40 hover:text-white/80 text-xs px-2">{expanded ? '▲' : '▼'}</button>
          <button onClick={onLogout} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/20 text-white/60 hover:text-white/90 transition">Logout</button>
        </div>
      </div>
      {expanded && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
          {candidate.languages?.length > 0 && <span><strong>Languages:</strong> {candidate.languages.join(', ')}</span>}
          {candidate.domainSubjects?.length > 0 && <span><strong>Domain Subjects:</strong> {candidate.domainSubjects.join(', ')}</span>}
          {candidate.generalTest && <span><strong>Section III:</strong> General Test ✓</span>}
          {candidate.testCity1 && <span><strong>Test City:</strong> {candidate.testCity1}</span>}
          {candidate.category && <span><strong>Category:</strong> {candidate.category}</span>}
        </div>
      )}
    </div>
  );
}
