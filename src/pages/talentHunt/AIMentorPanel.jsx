import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function buildHeaders() {
  const key = GEMINI_KEY || '';
  if (key.startsWith('AQ.')) return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` };
  return { 'Content-Type': 'application/json' };
}

function buildUrl() {
  const key = GEMINI_KEY || '';
  const base = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  if (key.startsWith('AQ.')) return base;
  return `${base}?key=${key}`;
}

const SUGGESTIONS = [
  "Explain photoelectric effect",
  "SIUAT exam syllabus 2026",
  "How to score 95+ in SIUAT?",
  "SIUAT scholarship criteria",
  "Organic chemistry tips",
  "Revision strategy for 30 days",
];

const SYSTEM_PROMPT = `You are an expert AI Mentor for students preparing for CUET 2026 and SIUAT (Saroj International University Aptitude Test).
You help students with Physics, Chemistry, Biology, Mathematics, English, Reasoning and General Knowledge.
You also provide guidance on SIUAT scholarship criteria and SIU admissions.
Give concise, accurate, NCERT-based answers. For every question provide concept explanation, exam relevance, and a quick tip.
Format responses clearly with bullet points or numbered steps when helpful.
Keep answers focused and under 250 words unless detailed explanation is needed.
Always encourage the student. IMPORTANT: Never repeat the same phrasing, examples, or sentence structures from previous messages. Vary your language, examples, and teaching approach every time.`;

async function callGemini(userMessage, history) {
  if (!GEMINI_KEY || GEMINI_KEY.trim() === '') {
    return '⚠️ AI Mentor is not configured. Please add a valid VITE_GEMINI_API_KEY to your .env file.';
  }

  const contextMessages = history.slice(-6).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const hints = [
    'Use a fresh analogy.', 'Start with a surprising fact.',
    'Give a step-by-step breakdown.', 'Start with the NCERT line.',
    'Use a real-world example.', 'Start with a common misconception to correct.',
    'Use mnemonics or memory tricks.',
  ];
  const seed = `[uid:${Date.now()}-${Math.random().toString(36).slice(2)}] ${hints[Math.floor(Math.random() * hints.length)]}`;

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT + ' ' + seed }] },
    contents: [
      ...contextMessages,
      { role: 'user', parts: [{ text: userMessage }] }
    ],
    generationConfig: { temperature: 0.85 + Math.random() * 0.1, maxOutputTokens: 600, topP: 0.95, topK: 40 }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

  let lastErr = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(buildUrl(), {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.status === 401 || res.status === 403) throw new Error('API_AUTH: Invalid or expired API key.');
      if (res.status === 429) {
        if (attempt === 0) { await new Promise(r => setTimeout(r, 1500)); continue; }
        throw new Error('API_QUOTA: Rate limit reached. Please wait a moment and try again.');
      }
      if (!res.ok) throw new Error(`API_${res.status}: Server error`);
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from Gemini');
      return text;
    } catch (e) {
      lastErr = e;
      if (e.message?.startsWith('API_AUTH')) break;
      if (attempt === 0) await new Promise(r => setTimeout(r, 1000));
    }
  }

  const msg = lastErr?.message || '';
  if (msg.includes('API_AUTH')) return '🔑 ' + msg.replace('API_AUTH: ', '');
  if (msg.includes('API_QUOTA')) return '⏳ ' + msg.replace('API_QUOTA: ', '');
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network'))
    return '📡 Could not reach AI Mentor. Please check your internet connection and try again.';
  return '⚠️ AI Mentor encountered an error. Please try again in a moment.';
}

const INIT_MESSAGE = {
  role: 'ai',
  text: "👋 Namaste! I'm your SIU AI Mentor, powered by Gemini AI.\n\nI can help you with:\n• CUET preparation strategies and study plans\n• Subject-wise doubts (Physics, Maths, Chemistry, Biology, English)\n• SIUAT scholarship information and exam tips\n• Revision tips and mock test analysis\n\nWhat would you like to learn today?",
  ts: Date.now()
};

export default function AIMentorPanel() {
  const [messages, setMessages] = useLocalStorage('ai_mentor_messages', [INIT_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) setMessages([INIT_MESSAGE]);
  }, []);

  const prevLenRef = useRef(messages.length);
  useEffect(() => {
    if (messages.length > prevLenRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevLenRef.current = messages.length;
  }, [messages]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setError('');
    const userMsg = { role: 'user', text: text.trim(), ts: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await callGemini(text, messages);
      if (reply.startsWith('🔑') || reply.startsWith('📡') || reply.startsWith('⏳')) {
        setError(reply);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: reply, ts: Date.now() }]);
      }
    } catch {
      setError('Could not reach AI Mentor. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => { setMessages([INIT_MESSAGE]); setError(''); };
  const keyOk = !!GEMINI_KEY && GEMINI_KEY.length > 10;

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      {!keyOk && (
        <div className="mb-4 rounded-xl px-4 py-3 flex items-start gap-3 text-sm" style={{ background: '#fef9c3', border: '1.5px solid #fde047' }}>
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <strong className="text-yellow-900">AI Mentor needs configuration.</strong>
            <p className="text-yellow-800 text-xs mt-1">
              The <code className="bg-yellow-100 px-1 rounded">VITE_GEMINI_API_KEY</code> in your <code className="bg-yellow-100 px-1 rounded">.env</code> file appears invalid.
              Get a free key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="underline font-semibold">Google AI Studio</a> and update your .env file.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white">
        {/* Header */}
        <div className="rounded-t-2xl px-5 py-4 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg,#4c1d95,#0a1f5c)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)' }}>🤖</div>
            <div>
              <div className="font-bold text-white text-base sm:text-lg">SIU AI Mentor</div>
              <div className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>Powered by Gemini · CUET & SIUAT Expert</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: keyOk ? '#86efac' : '#fca5a5' }}>
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: keyOk ? '#4ade80' : '#f87171' }} />
              {keyOk ? 'Online' : 'Key Invalid'}
            </div>
            <button onClick={clearChat} className="text-[11px] px-2.5 py-1 rounded-lg border border-white/20 text-white/60 hover:text-white/90 transition">
              Clear
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div className="bg-gray-50 border-x border-gray-200 overflow-y-auto p-4 sm:p-5 space-y-4"
          style={{ minHeight: '420px', height: 'clamp(420px, 55vh, 600px)' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="mr-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 self-end"
                  style={{ background: 'linear-gradient(135deg,#4c1d95,#6c3fc7)', color: '#fff' }}>AI</div>
              )}
              <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
                style={msg.role === 'ai'
                  ? { background: '#fff', color: '#1f2937', border: '1px solid #e5e7eb', borderBottomLeftRadius: '4px' }
                  : { background: 'linear-gradient(135deg,#6c3fc7,#4c1d95)', color: '#fff', borderBottomRightRadius: '4px' }
                }>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="mr-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#4c1d95,#6c3fc7)', color: '#fff' }}>AI</div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full animate-bounce"
                    style={{ background: '#6c3fc7', animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          {error && (
            <div className="mx-auto max-w-md text-center text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="text-base flex-shrink-0">❌</span>
              <span>{error}</span>
              <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600 font-bold flex-shrink-0">✕</button>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="bg-gray-50 border-x border-gray-200 px-4 py-2.5 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)} disabled={loading}
              className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition flex-shrink-0 hover:bg-purple-50 disabled:opacity-50"
              style={{ background: '#fff', borderColor: '#d8b4fe', color: '#6c3fc7' }}>
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border border-gray-200 rounded-b-2xl px-4 py-3 flex gap-3 items-center">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
            placeholder="Ask me anything about CUET, SIUAT, scholarship or study tips..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:border-purple-400 transition"
          />
          <button onClick={() => send(input)} disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-full flex items-center justify-center text-white transition disabled:opacity-40 flex-shrink-0 text-lg"
            style={{ background: 'linear-gradient(135deg,#6c3fc7,#4c1d95)' }}>
            ➤
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { num: 'Gemini AI', label: 'Powered by Google' },
          { num: 'SIUAT 2026', label: 'NCERT-based answers' },
          { num: '24/7', label: 'Available anytime' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="font-bold text-base sm:text-lg" style={{ color: '#6c3fc7' }}>{s.num}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
