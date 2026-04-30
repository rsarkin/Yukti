import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { JourneyProvider } from './context/JourneyContext';
import Navbar from './components/layout/Navbar';
import MobileBottomNav from './components/layout/MobileBottomNav';
import FloatingChatButton from './components/layout/FloatingChatButton';

// Pages
import LandingPage from './components/landing';
import JourneyWizard from './components/journey/JourneyWizard';
import ChatWindow from './components/chat/ChatWindow';
import EVMSimulator from './components/evm/EVMSimulator';
import BoothLocator from './components/booth/BoothLocator';
import ConstituencyFinder from './components/constituency/ConstituencyFinder';
import ReportWizard from './components/report/ReportWizard';
import VolunteerHub from './components/volunteer/VolunteerHub';
import ElectionNews from './components/news/ElectionNews';
import VotingPrep from './components/journey/VotingPrep';

function App() {
  return (
    <LanguageProvider>
      <JourneyProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
            <Navbar />
            <main className="flex-grow flex flex-col pb-20 lg:pb-0">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/journey" element={<JourneyWizard />} />
                <Route path="/chat" element={<ChatWindow />} />
                <Route path="/preparation" element={<VotingPrep />} />
                <Route path="/evm" element={<EVMSimulator />} />
                <Route path="/booth" element={<BoothLocator />} />
                <Route path="/constituency" element={<ConstituencyFinder />} />
                <Route path="/report" element={<ReportWizard />} />
                <Route path="/volunteer" element={<VolunteerHub />} />
                <Route path="/news" element={<ElectionNews />} />
              </Routes>
            </main>
            <MobileBottomNav />
            <FloatingChatButton />
          </div>
        </Router>
      </JourneyProvider>
    </LanguageProvider>
  );
}

export default App;
