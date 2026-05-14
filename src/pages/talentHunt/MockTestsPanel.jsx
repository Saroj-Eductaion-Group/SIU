import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import CuetGate from './CuetGate';
import CuetWelcomeBanner from './CuetWelcomeBanner';
import MockTestList from './MockTestList';
import MockExam from './MockExam';

export default function MockTestsPanel() {
  const [candidate, setCandidate] = useLocalStorage('cuet_candidate', null);
  const [activeTestId, setActiveTestId] = useState(null);

  const handleLogin = (data) => setCandidate(data);
  const handleLogout = () => { setCandidate(null); setActiveTestId(null); };

  // Not logged in — show gate
  if (!candidate) return <CuetGate onLogin={handleLogin} />;

  // Taking a test
  if (activeTestId) {
    return (
      <div>
        <CuetWelcomeBanner candidate={candidate} onLogout={handleLogout} />
        <MockExam testId={activeTestId} candidate={candidate} onBack={() => setActiveTestId(null)} />
      </div>
    );
  }

  // Test list
  return (
    <div>
      <CuetWelcomeBanner candidate={candidate} onLogout={handleLogout} />
      <MockTestList onStart={(id) => setActiveTestId(id)} />
    </div>
  );
}
