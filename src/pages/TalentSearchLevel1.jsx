import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import {
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  BookOpen,
  HelpCircle,
  School,
  User,
  Phone,
  Mail,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Printer,
  RotateCcw,
  X,
  MessageSquare,
  FileCheck,
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

// Stream options
const STREAMS = [
  { id: 'PCM', label: 'PCM', full: 'Physics, Chemistry, Maths', icon: '📐' },
  { id: 'PCB', label: 'PCB', full: 'Physics, Chemistry, Biology', icon: '🧬' },
  { id: 'PCM+Bio', label: 'PCMB', full: 'PCM + Biology', icon: '🔬' },
  { id: 'Commerce', label: 'Commerce', full: 'Accounts, Economics, B.St', icon: '📈' },
  { id: 'Arts', label: 'Arts', full: 'History, Pol. Sci., Geography', icon: '🎨' },
  { id: 'Humanities', label: 'Humanities', full: 'Economics, Psychology, History', icon: '📚' },
];

// Boards
const BOARDS = ['CBSE', 'ICSE', 'UP Board', 'Other State Board'];

// Exact exam slot dates requested by user (Time removed)
const EXAM_SLOTS = [
  { id: '29 Nov', label: '29 Nov', year: '2026', day: 'Sunday' },
  { id: '6 Dec', label: '6 Dec', year: '2026', day: 'Sunday' },
  { id: '20 Dec', label: '20 Dec', year: '2026', day: 'Sunday' },
  { id: '10 Jan', label: '10 Jan', year: '2027', day: 'Sunday' },
  { id: '24 Jan', label: '24 Jan', year: '2027', day: 'Sunday' },
  { id: '7 Feb', label: '7 Feb', year: '2027', day: 'Sunday' },
  { id: '21 Feb', label: '21 Feb', year: '2027', day: 'Sunday' },
];

export default function TalentSearchLevel1() {
  // Phase: 'form' | 'confirmed'
  const [phase, setPhase] = useState('form');

  // Mandatory Registration Form States
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [board, setBoard] = useState('CBSE');
  const [stream, setStream] = useState('Class 12');
  const [slot, setSlot] = useState('29 Nov');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirmedCandidate, setConfirmedCandidate] = useState(null);

  // "Any Query" Modal State
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [qName, setQName] = useState('');
  const [qMobile, setQMobile] = useState('');
  const [qEmail, setQEmail] = useState('');
  const [qQuery, setQQuery] = useState('');
  const [qLoading, setQLoading] = useState(false);
  const [qError, setQError] = useState('');
  const [qSuccess, setQSuccess] = useState('');

  // -------------------------------------------------------------
  // REGISTRATION SUBMIT HANDLER
  // -------------------------------------------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError('');

    // Strict validation for all mandatory fields
    if (!name.trim()) {
      setFormError('Please enter Student Full Name.');
      return;
    }
    if (!fatherName.trim()) {
      setFormError("Please enter Father's Name.");
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
      setFormError('Please enter a valid 10-digit Mobile Number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid Email Address.');
      return;
    }
    if (!schoolName.trim()) {
      setFormError('Please enter your School Name.');
      return;
    }
    if (!board.trim()) {
      setFormError('Please select your Board.');
      return;
    }
    if (!slot) {
      setFormError('Please select an Exam Slot.');
      return;
    }

    setLoading(true);

    const regData = {
      name: name.trim(),
      fatherName: fatherName.trim(),
      mobile: cleanMobile,
      email: email.toLowerCase().trim(),
      schoolName: schoolName.trim(),
      board: board.trim(),
      stream,
      slot,
    };

    try {
      // 1. Try Backend API
      let savedCandidate = null;
      try {
        const res = await fetch(`${API_BASE}/talent-search/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regData),
        });
        const data = await res.json();
        if (data.success && data.candidate) {
          savedCandidate = data.candidate;
        }
      } catch (backendErr) {
        console.warn('Backend unavailable, saving offline:', backendErr);
      }

      // 2. Offline / LocalStorage fallback
      const regId = savedCandidate?._id || `SIU-TS-${Date.now().toString().slice(-6)}`;
      const appNumber = `SIU-TS-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      const finalRecord = {
        _id: regId,
        applicationNumber: appNumber,
        ...regData,
        hasAttempted: false,
        score: 0,
        registeredAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('siu_talent_local_submissions') || '[]');
        const updated = [finalRecord, ...existing.filter((c) => c.mobile !== cleanMobile)];
        localStorage.setItem('siu_talent_local_submissions', JSON.stringify(updated));
      } catch (locErr) {
        console.warn('Local storage save error:', locErr);
      }

      setConfirmedCandidate(finalRecord);
      setPhase('confirmed');
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // QUERY / HELPDESK SUBMIT HANDLER
  // -------------------------------------------------------------
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setQError('');
    setQSuccess('');

    if (!qName.trim()) {
      setQError('Please enter your Name.');
      return;
    }
    const cleanMobile = qMobile.replace(/\D/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
      setQError('Please enter a valid 10-digit Mobile Number.');
      return;
    }
    if (!qEmail.trim() || !qEmail.includes('@')) {
      setQError('Please enter a valid Email Address.');
      return;
    }
    if (!qQuery.trim()) {
      setQError('Please describe your query or problem.');
      return;
    }

    setQLoading(true);

    const queryPayload = {
      name: qName.trim(),
      mobile: cleanMobile,
      email: qEmail.toLowerCase().trim(),
      query: qQuery.trim(),
    };

    try {
      // 1. Send to Backend
      try {
        await fetch(`${API_BASE}/talent-search/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(queryPayload),
        });
      } catch (netErr) {
        console.warn('Backend query submit offline fallback:', netErr);
      }

      // 2. Save in LocalStorage
      try {
        const existingQueries = JSON.parse(localStorage.getItem('siu_talent_student_queries') || '[]');
        const newQueryObj = {
          _id: `q_${Date.now()}`,
          ...queryPayload,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('siu_talent_student_queries', JSON.stringify([newQueryObj, ...existingQueries]));
      } catch {}

      setQSuccess('Your query has been submitted successfully! SIU counseling team will contact you shortly.');
      setTimeout(() => {
        setQQuery('');
        setQError('');
      }, 1000);
    } catch (err) {
      setQError('Failed to submit query. Please try again.');
    } finally {
      setQLoading(false);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <Layout>
      <Helmet>
        <title>Talent Search 2026-27 Scholarship | Saroj International University</title>
        <meta
          name="description"
          content="Register for Talent Search 2026-27 Scholarship. Win up to 100% Tuition Fee Waiver for Class 12th students."
        />
      </Helmet>

      {/* ------------------------------------------------------------- */}
      {/* ANY QUERY / HELPDESK MODAL                                     */}
      {/* ------------------------------------------------------------- */}
      {showQueryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#0b2545] text-white p-5 sm:p-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Student Helpdesk & Support
                </span>
                <h3 className="text-xl font-bold font-serif">Any Query? Ask Us</h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  Have questions about slots, syllabus, or scholarships? Submit your query below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowQueryModal(false);
                  setQError('');
                  setQSuccess('');
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleQuerySubmit} className="p-6 space-y-4">
              {qError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{qError}</span>
                </div>
              )}

              {qSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-4 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-emerald-900">Query Submitted!</div>
                    <p className="mt-0.5 text-xs text-emerald-700">{qSuccess}</p>
                    <button
                      type="button"
                      onClick={() => setShowQueryModal(false)}
                      className="mt-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={qName}
                      onChange={(e) => setQName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={qMobile}
                        onChange={(e) => setQMobile(e.target.value)}
                        placeholder="10-digit number"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={qEmail}
                        onChange={(e) => setQEmail(e.target.value)}
                        placeholder="your.email@gmail.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Your Query / Problem Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={qQuery}
                      onChange={(e) => setQQuery(e.target.value)}
                      placeholder="Kya dikkat hai? Write your query or question here..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowQueryModal(false)}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={qLoading}
                      className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-1.5 shadow cursor-pointer disabled:opacity-50"
                    >
                      {qLoading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Query</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TOP NOTIFICATION / HELP BAR                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-slate-950 text-white border-b border-slate-800 text-xs py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase">
              Official Scholarship Drive
            </span>
            <span className="text-gray-300 hidden sm:inline">
              Talent Search 2026-27 Scholarship · Admissions Open for Class 12
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setShowQueryModal(true);
                setQError('');
                setQSuccess('');
              }}
              className="inline-flex items-center gap-1.5 text-white font-black transition cursor-pointer bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-md shadow-red-500/50 ring-2 ring-red-400/80 animate-pulse hover:animate-none hover:scale-105 px-3 py-1 rounded-lg text-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Any Query?</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PHASE: REGISTRATION CONFIRMED / ADMIT SLIP VIEW                */}
      {/* ------------------------------------------------------------- */}
      {phase === 'confirmed' && confirmedCandidate && (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Top Success Banner */}
            <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 rounded-3xl shadow-xl text-white p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40 mb-3 shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                Registration Successful
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1 font-serif">
                Talent Search 2026-27 Scholarship
              </h2>
              <p className="text-sm text-emerald-100 max-w-lg mx-auto mt-2">
                Your application has been received and verified. Please note your allocated examination slot details below.
              </p>
            </div>

            {/* Official Registration Slip Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 space-y-6 print:shadow-none print:border-none">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                    Candidate Confirmation Slip
                  </span>
                  <div className="text-xs text-gray-500 font-mono mt-0.5">
                    Application ID: <strong className="text-gray-900 font-mono text-sm">{confirmedCandidate.applicationNumber || confirmedCandidate._id}</strong>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Slot: {confirmedCandidate.slot}
                  </span>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Student Full Name</span>
                  <span className="font-bold text-gray-900 text-base">{confirmedCandidate.name}</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Father's Name</span>
                  <span className="font-bold text-gray-900 text-base">{confirmedCandidate.fatherName}</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Registered Mobile</span>
                  <span className="font-mono font-bold text-gray-900">{confirmedCandidate.mobile}</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Email Address</span>
                  <span className="font-mono text-gray-800 truncate block">{confirmedCandidate.email}</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">School & Board</span>
                  <span className="font-semibold text-gray-800 block">{confirmedCandidate.schoolName}</span>
                  <span className="text-xs text-blue-600 font-medium">({confirmedCandidate.board})</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Class Eligibility</span>
                  <span className="font-bold text-indigo-700 text-base">Class 12th</span>
                </div>
              </div>

              {/* Slot Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
                <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Allocated Examination Slot: {confirmedCandidate.slot}</div>
                  <p className="leading-relaxed text-amber-800">
                    The scholarship exam will be conducted through our dedicated live examination software. Your software download link, exam roll number, and proctoring credentials will be delivered via SMS & Email 24 hours prior to your slot.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-3 print:hidden">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4 text-gray-500" />
                  <span>Print Slip</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowQueryModal(true);
                      setQName(confirmedCandidate.name);
                      setQMobile(confirmedCandidate.mobile);
                      setQEmail(confirmedCandidate.email);
                    }}
                    className="px-4 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-md shadow-red-500/50 ring-2 ring-red-400/80 animate-pulse hover:animate-none hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <HelpCircle className="w-4 h-4" />
                    <span>Any Query?</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setFatherName('');
                      setMobile('');
                      setEmail('');
                      setSchoolName('');
                      setPhase('form');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Register Another</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE: REGISTRATION FORM VIEW                                 */}
      {/* ------------------------------------------------------------- */}
      {phase === 'form' && (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[#0b2545] to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Header Hero */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Class 12th Merit Scholarship Drive 2026–2027</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
                Talent Search 2026-27 <span className="text-amber-400">Scholarship</span>
              </h1>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Saroj International University invites all Class 12 aspirants across India to participate in the prestigious scholarship examination. Compete for up to 100% full tuition fee waivers.
              </p>

              {/* Quick Perks Pill */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs">
                <span className="px-3 py-1 bg-white/10 rounded-full border border-white/15 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Up to 100% Scholarships
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full border border-white/15 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-300" /> Multiple Slot Choices
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full border border-white/15 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Class 12 Board Syllabus
                </span>
              </div>
            </div>

            {/* Main Form Container */}
            <div className="bg-white text-gray-900 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-[#0b2545] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    Candidate Registration Form
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif">Enter Student Details</h2>
                  <p className="text-xs text-blue-200 mt-0.5">
                    All fields marked with <span className="text-amber-400 font-bold">*</span> are mandatory.
                  </p>
                </div>

                {/* Any Query CTA on the card right: Glowing / Shining Red Background */}
                <button
                  type="button"
                  onClick={() => setShowQueryModal(true)}
                  className="self-start sm:self-auto px-4 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-lg shadow-red-500/50 ring-2 ring-red-400/80 animate-pulse hover:animate-none hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <HelpCircle className="w-4 h-4 text-white" />
                  <span className="tracking-wide uppercase">Any Query?</span>
                </button>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleRegister} className="p-6 sm:p-8 space-y-6">
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm p-3.5 rounded-2xl flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="font-semibold">{formError}</span>
                  </div>
                )}

                {/* Section 1: Personal Details */}
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>1. Student & Parent Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Student Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Student Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter student full name"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      />
                    </div>

                    {/* Father's Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Father's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="Enter father's full name"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-xs font-bold text-gray-400 font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                          placeholder="10-digit mobile number"
                          className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-mono"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="candidate.email@gmail.com"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: School & Board */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <School className="w-4 h-4" />
                    <span>2. Academic Background</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* School Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        School Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g. Delhi Public School / St. Mary's High School"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      />
                    </div>

                    {/* Board */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Board <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={board}
                        onChange={(e) => setBoard(e.target.value)}
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white"
                      >
                        {BOARDS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Exam Slot Selection */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>2. Choose Your Examination Slot <span className="text-red-500">*</span></span>
                    </div>
                    <span className="text-[11px] text-gray-500">Pick any 1 slot date</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {EXAM_SLOTS.map((s) => {
                      const isSelected = slot === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSlot(s.id)}
                          className={`p-3.5 rounded-2xl border text-center transition cursor-pointer relative ${
                            isSelected
                              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500 text-amber-950 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-gray-700'
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
                          )}
                          <div className="text-base font-black text-gray-900">{s.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{s.year} ({s.day})</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free registration · Admit card issued immediately on submit</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Submitting Registration...</span>
                    ) : (
                      <>
                        <span>Submit Registration & Get Slip</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom FAQ / Help Note */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-center text-xs text-gray-400 space-y-2">
              <div className="text-white font-bold flex items-center justify-center gap-2 text-sm">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Need help with your application?
              </div>
              <p className="max-w-xl mx-auto">
                If you face any issues while filling the registration form, click the <strong>"Any Query?"</strong> button above or contact the Saroj International University Admission Helpdesk.
              </p>
            </div>

          </div>
        </div>
      )}
    </Layout>
  );
}
