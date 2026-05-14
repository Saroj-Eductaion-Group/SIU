import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { Header } from './cuetNeet/components/Header';
import { Ticker } from './cuetNeet/components/Ticker';
import { ScholarshipModal } from './cuetNeet/components/ScholarshipModal';
import { HomePanel } from './cuetNeet/components/HomePanel';
import { MockTestsPanel } from './cuetNeet/components/MockTestsPanel';
import { RegistrationPanel } from './cuetNeet/components/RegistrationPanel';
import { RankingsPanel } from './cuetNeet/components/RankingsPanel';
import { AIMentorPanel } from './cuetNeet/components/AIMentorPanel';
import { ResultsPanel } from './cuetNeet/components/ResultsPanel';
import { AdminPanel } from './cuetNeet/components/AdminPanel';

const queryClient = new QueryClient();

function CuetNeetApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('cuet_sch_modal_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setShowScholarshipModal(true);
        sessionStorage.setItem('cuet_sch_modal_seen', '1');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onScholarship={() => setShowScholarshipModal(true)} />
      <Ticker />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-5">
        {activeTab === 'home'     && <HomePanel setActiveTab={setActiveTab} onScholarship={() => setShowScholarshipModal(true)} />}
        {activeTab === 'mocks'    && <MockTestsPanel />}
        {activeTab === 'siuat'    && <RegistrationPanel />}
        {activeTab === 'rankings' && <RankingsPanel />}
        {activeTab === 'ai'       && <AIMentorPanel />}
        {activeTab === 'results'  && <ResultsPanel />}
        {activeTab === 'admin'    && <AdminPanel />}
      </main>

      <button
        onClick={() => setShowScholarshipModal(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg animate-pulse text-[#0a1f5c]"
        style={{ background: 'linear-gradient(90deg, #c9a84c, #e8b840)' }}
      >
        🏆 Win 100% Scholarship!
      </button>

      <button
        onClick={() => setActiveTab('ai')}
        className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #4c1d95, #6c3fc7)' }}
      >
        🤖 Ask AI Mentor
      </button>

      {showScholarshipModal && (
        <ScholarshipModal
          onClose={() => setShowScholarshipModal(false)}
          onRegister={() => { setShowScholarshipModal(false); setActiveTab('siuat'); }}
        />
      )}
    </div>
  );
}

export default function CuetNeetTalentHunt() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <CuetNeetApp />
      </QueryClientProvider>
    </Layout>
  );
}
