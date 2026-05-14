import { useState } from 'react';
import { MOCK_TESTS, SUBJECT_FILTERS, DIFF_COLORS, SECTION_COLORS, SUBJECT_ICONS } from './mockData';

export default function MockTestList({ onStart }) {
  const [filter, setFilter] = useState('All');
  const filtered = MOCK_TESTS.filter(t => filter === 'All' || t.subject === filter);

  return (
    <div>
      {/* CUET Banner */}
      <div className="rounded-xl p-4 mb-5 flex items-center gap-4" style={{ background: 'linear-gradient(135deg,#0a1f5c,#1e3a8a)' }}>
        <div className="text-3xl">📋</div>
        <div className="flex-1">
          <div className="text-white font-bold text-sm mb-0.5">CUET 2026 — NTA Official Pattern</div>
          <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            All mock tests follow the official NTA CUET pattern · Section II Domain Subjects · Section III General Test · Section IA Language
          </div>
        </div>
        <div className="flex-shrink-0 space-y-1 text-right text-[11px]">
          <div className="font-bold text-green-300">+5 Correct</div>
          <div className="font-bold text-red-300">−1 Wrong</div>
          <div className="text-white/40">0 Skipped</div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-5">
        {SUBJECT_FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
            style={{ background: filter === f ? '#0a1f5c' : '#fff', color: filter === f ? '#fff' : '#6b7280', border: `1.5px solid ${filter === f ? '#0a1f5c' : '#e5e7eb'}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* Test Cards */}
      <div className="space-y-3">
        {filtered.map(test => {
          const sc = SECTION_COLORS[test.cuetSection] || { bg: '#f3e8ff', text: '#7c3aed' };
          return (
            <div key={test.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0a1f5c] hover:shadow-md transition group">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${test.iconColor}`}>
                  {SUBJECT_ICONS[test.subject] || '📚'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: sc.bg, color: sc.text }}>{test.cuetSection}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ background: DIFF_COLORS[test.difficulty] }}>{test.difficulty}</span>
                  </div>
                  <div className="font-bold text-gray-900 text-sm mb-1.5">{test.name}</div>
                  <div className="flex items-center gap-3 flex-wrap text-[11px] text-gray-500">
                    <span>⏱ <strong>{test.durationMinutes} min</strong></span>
                    <span>·</span>
                    <span>❓ <strong>{test.questionsCount}</strong> Qs</span>
                    <span>·</span>
                    <span>✏️ Attempt any <strong>{test.attemptCount}</strong></span>
                    <span>·</span>
                    <span>📊 Max <strong>{test.marks}</strong> marks</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700">+5 Correct</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600">−1 Wrong</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500">0 Skipped</span>
                    {test.questionsCount > test.attemptCount && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">Choice-based</span>
                    )}
                  </div>
                </div>
                <button onClick={() => onStart(test.id)}
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold text-white transition hover:brightness-110 self-center"
                  style={{ background: 'linear-gradient(135deg,#0a1f5c,#4c1d95)' }}>
                  Start →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📚</div>
          <div className="font-semibold">No tests found for this filter</div>
        </div>
      )}
    </div>
  );
}
