import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

type Message = { role: "user" | "ai"; text: string; ts: number };

const OR_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const OR_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OR_MODEL = 'google/gemma-4-31b-it:free';

const SUGGESTIONS = [
  "Explain photoelectric effect",
  "NEET Biology syllabus 2026",
  "How to score 680+ in NEET?",
  "Organic chemistry tips",
  "Revision strategy for 30 days",
  "Weak area improvement plan",
];

const SYSTEM_PROMPT = `You are an expert NEET 2026 AI Mentor for Indian medical aspirants.
You help students with Physics, Chemistry, Biology (Botany & Zoology) for NEET UG exam.
You give concise, accurate, NCERT-based answers.
For every question provide: concept explanation, NEET relevance, and a quick tip.
Format responses clearly with bullet points or numbered steps when helpful.
Keep answers focused and under 250 words unless detailed explanation is needed.
Always encourage the student. IMPORTANT: Never repeat the same phrasing, examples, or sentence structures from previous messages. Vary your language, examples, and teaching approach every time.`;

async function callGemini(userMessage: string, history: Message[]): Promise<string> {
  if (!OR_KEY || OR_KEY.length < 10) return '⚠️ AI key not set. Add VITE_GEMINI_API_KEY in .env';

  const hints = ['Use a fresh analogy.','Start with a surprising fact.','Give a step-by-step breakdown.','Start with the NCERT line.','Use a real-world medical example.','Start with a common misconception to correct.','Use mnemonics or memory tricks.'];
  const seed = `[uid:${Date.now()}-${Math.random().toString(36).slice(2)}] ${hints[Math.floor(Math.random() * hints.length)]}`;

  const messages: {role: string; content: string}[] = [
    { role: 'system', content: SYSTEM_PROMPT + ' ' + seed },
    ...history.slice(-6).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
    { role: 'user', content: userMessage }
  ];

  try {
    const res = await fetch(OR_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OR_KEY}`,
        'HTTP-Referer': 'https://sarojuniversity.edu.in',
        'X-Title': 'SIU NEET AI Mentor'
      },
      body: JSON.stringify({
        model: OR_MODEL,
        messages,
        temperature: 0.85 + Math.random() * 0.1,
        max_tokens: 600
      })
    });
    const data = await res.json();
    if (!res.ok) return '⚠️ ' + (data?.error?.message || 'AI error. Please try again.');
    const text = data?.choices?.[0]?.message?.content;
    if (!text) return '⚠️ Empty response. Please try again.';
    return text;
  } catch (e: any) {
    if (e.message?.includes('fetch') || e.message?.includes('Network')) return '📡 No internet connection.';
    return '⚠️ AI Mentor error. Please try again.';
  }
}

export function AIMentorPanel() {
  const [messages, setMessages] = useLocalStorage<Message[]>("neet_ai_mentor_messages", []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const initMsg: Message = {
    role: "ai",
    text: "👋 Namaste! I'm your NEET 2026 AI Mentor.\n\nI can help you with:\n• Physics, Chemistry, Biology doubts\n• NCERT concept explanations\n• Study strategy & revision plans\n• Weak topic analysis\n• Previous year question patterns\n\nWhat would you like to study today?",
    ts: Date.now()
  };

  useEffect(() => {
    if (messages.length === 0) setMessages([initMsg]);
  }, []);

  const prevLenRef = useRef(messages.length);
  useEffect(() => {
    if (messages.length > prevLenRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevLenRef.current = messages.length;
  }, [messages]);

  const send = async (txt: string) => {
    if (!txt.trim() || loading) return;
    setError("");
    const userMsg: Message = { role: "user", text: txt, ts: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(txt, messages);
      // If reply starts with error symbols, show as error message not AI bubble
      if (reply.startsWith("🔑") || reply.startsWith("📡") || reply.startsWith("⏳")) {
        setError(reply);
        setMessages(prev => prev.filter((_, i) => i !== prev.length - 1 || prev[i].role !== "user" ? true : true));
      } else {
        const aiMsg: Message = { role: "ai", text: reply, ts: Date.now() };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch {
      setError("Could not reach AI Mentor. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([initMsg]);
    setError("");
  };

  const keyOk = true; // Key backend mein hai — always online

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-0">



      <div className="flex flex-col border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between bg-gradient-to-r from-[#064e3b] to-[#0d9488] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>🤖</div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">NEET AI Mentor</h3>
              <p className="text-xs sm:text-sm text-white/70">Powered by Gemini · NEET 2026 Expert</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: keyOk ? "#86efac" : "#fca5a5" }}>
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: keyOk ? "#4ade80" : "#f87171" }} />
              {keyOk ? "Online" : "Key Invalid"}
            </div>
            <button onClick={clearChat} className="text-[11px] px-2.5 py-1 rounded-lg border border-white/20 text-white/60 hover:text-white/90 transition">
              Clear
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4 bg-gray-50/50" style={{ minHeight: "400px", height: "clamp(400px, 52vh, 580px)" }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "ai" && (
                <div className="mr-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 self-end" style={{ background: "linear-gradient(135deg,#064e3b,#0d9488)", color: "#fff" }}>AI</div>
              )}
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm sm:text-base leading-relaxed ${m.role === "user" ? "bg-[#064e3b] text-white rounded-tr-none" : "bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm"}`} style={{ whiteSpace: "pre-wrap" }}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="mr-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#064e3b,#0d9488)", color: "#fff" }}>AI</div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ background: "#0d9488", animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          {error && (
            <div className="mx-auto max-w-md text-center text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="text-base flex-shrink-0">❌</span>
              <span>{error}</span>
              <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-600 font-bold flex-shrink-0">✕</button>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)} disabled={loading}
              className="whitespace-nowrap px-3.5 py-1.5 bg-white border border-teal-200 rounded-full text-xs sm:text-sm font-medium text-teal-700 hover:bg-teal-50 transition flex-shrink-0 disabled:opacity-50">
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex gap-3 items-center">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
            placeholder="Ask me anything about NEET 2026, Physics, Chemistry, Biology..."
            data-testid="chat-input"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:border-teal-400 transition"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            data-testid="chat-send"
            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg transition disabled:opacity-40 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#064e3b,#0d9488)" }}
          >
            ➤
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { num: "Gemini AI", label: "Powered by Google" },
          { num: "NEET 2026", label: "NCERT-based answers" },
          { num: "24/7", label: "Available anytime" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="font-bold text-lg sm:text-xl text-[#064e3b]">{s.num}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
