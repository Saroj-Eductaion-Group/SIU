import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { Header } from './cuetNeet/components/Header';
import { Ticker } from './cuetNeet/components/Ticker';
import { ScholarshipModal } from './cuetNeet/components/ScholarshipModal';
import { HomePanel } from './cuetNeet/components/HomePanel';
import { MockTestsPanel } from './cuetNeet/components/MockTestsPanel';
import { RankingsPanel } from './cuetNeet/components/RankingsPanel';
import { AIMentorPanel } from './cuetNeet/components/AIMentorPanel';
import { ResultsPanel } from './cuetNeet/components/ResultsPanel';
import { AdminPanel } from './cuetNeet/components/AdminPanel';

const queryClient = new QueryClient();
const VALID_TABS = ['home', 'mocks', 'rankings', 'ai', 'results', 'admin'];

function NeetApp() {
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    return VALID_TABS.includes(hash) ? hash : 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const mainRef = useRef(null);

  const handleTabChange = (tab) => {
    // Push a new history state so browser Back stays inside the NEET ecosystem
    window.history.pushState({ neetTab: tab }, '', `/neet-talent-hunt#${tab}`);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Seed initial history entry so the first Back press stays inside the portal
    const initialTab = getInitialTab();
    if (!window.history.state?.neetTab) {
      window.history.replaceState({ neetTab: initialTab }, '', `/neet-talent-hunt#${initialTab}`);
    }
    // Handle browser back/forward within the NEET portal
    const onPopState = (e) => {
      if (e.state?.neetTab) {
        const tab = e.state.neetTab;
        setActiveTab(VALID_TABS.includes(tab) ? tab : 'home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [activeTab]);

  useEffect(() => {
    const seen = sessionStorage.getItem('neet_sch_modal_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setShowScholarshipModal(true);
        sessionStorage.setItem('neet_sch_modal_seen', '1');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} onScholarship={() => setShowScholarshipModal(true)} />
      <Ticker />

      <main ref={mainRef} className="max-w-7xl mx-auto px-4 md:px-6 py-5">
        {activeTab === 'home'     && <HomePanel setActiveTab={handleTabChange} onScholarship={() => setShowScholarshipModal(true)} />}
        {activeTab === 'mocks'    && <MockTestsPanel />}
        {activeTab === 'rankings' && <RankingsPanel />}
        {activeTab === 'ai'       && <AIMentorPanel />}
        {activeTab === 'results'  && <ResultsPanel />}
        {activeTab === 'admin'    && <AdminPanel />}
      </main>

      <button
        onClick={() => handleTabChange('ai')}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg text-white"
        style={{ background: 'linear-gradient(135deg, #4c1d95, #6c3fc7)', boxShadow: '0 4px 20px rgba(76,29,149,0.45)' }}
      >
        🤖 Ask AI Mentor
      </button>

      {showScholarshipModal && (
        <ScholarshipModal
          onClose={() => setShowScholarshipModal(false)}
          onRegister={() => { setShowScholarshipModal(false); handleTabChange('mocks'); }}
        />
      )}
    </div>
  );
}

export default function NeetTalentHunt() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <NeetApp />
      </QueryClientProvider>
    </Layout>
  );
}
