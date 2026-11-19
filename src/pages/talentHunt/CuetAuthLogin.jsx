import { useState } from 'react';
import { cuetLogin } from './api';

export default function CuetAuthLogin({ onLogin }) {
  const [loginId, setLoginId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const id = loginId.trim().toUpperCase();
    if (!id) { setError('Please enter your CUET Application ID.'); return; }
    setLoading(true); setError('');
    try {
      const data = await cuetLogin(id);
      onLogin(data);
    } catch (e) {
      setError(e.message || 'CUET ID not found. Please register first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-blue-50">🎓</div>
          <div>
            <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: '#0a1f5c' }}>Candidate Login</h3>
            <p className="text-xs text-gray-400">Enter your CUET Application ID to access mock tests</p>
          </div>
        </div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          CUET Application ID <span className="text-red-500">*</span>
        </label>
        <input
          value={loginId}
          onChange={e => setLoginId(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="e.g. CUET2026847382"
          className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-blue-400 font-mono tracking-widest"
        />
        {error && <div className="text-red-600 text-xs mb-3 p-2 rounded-lg bg-red-50 border border-red-200">{error}</div>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60"
          style={{ background: 'linear-gradient(90deg,#0a1f5c,#4c1d95)' }}>
          {loading ? 'Logging in...' : 'Login to Mock Tests →'}
        </button>
        <div className="mt-3 pt-3 border-t border-gray-100 text-center text-xs text-gray-400">
          No account?{' '}
          <span className="text-[#0a1f5c] font-semibold">Switch to New Registration tab above</span>
        </div>
      </div>
    </div>
  );
}
