import React, { useState, useEffect } from 'react';
import { UserRole, Language } from './types';
import { USER_ROLES_LIST, LifeConnectLogo, MoonIcon, SunIcon, ChatBubbleIcon, HeartIcon, GlobeIcon, LANGUAGES } from './constants';
import Dashboard from './components/Dashboard';
import DonorFlow from './components/DonorFlow';
import RecipientFlow from './components/RecipientFlow';
import HospitalView from './components/HospitalView';
import AdminView from './components/AdminView';
import Chatbot from './components/Chatbot';
import AwarenessHub from './components/AwarenessHub';
import { Modal, Button } from './components/common/ui';
import { t, LanguageKey } from './translations';

type View = UserRole | 'AWARENESS';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<LanguageKey>('EN');
  const [currentView, setCurrentView] = useState<View>(UserRole.DONOR);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    root.lang = lang.toLowerCase();
  }, [theme, lang]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const renderView = () => {
    switch (currentView) {
      case UserRole.DONOR: return <DonorFlow />;
      case UserRole.RECIPIENT: return <RecipientFlow />;
      case UserRole.HOSPITAL: return <HospitalView />;
      case UserRole.ADMIN: return <AdminView />;
      case 'AWARENESS': return <AwarenessHub lang={lang} />;
      default: return <Dashboard userRole={currentView} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-slate-800 dark:text-slate-200 font-sans">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark/80 backdrop-blur-sm shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <LifeConnectLogo className="h-8 text-secondary dark:text-sky-400" lang={lang} />
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block">
                <select value={currentView} onChange={(e) => setCurrentView(e.target.value as View)} className="bg-transparent dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary">
                  {USER_ROLES_LIST.map(role => (<option key={role} value={role}>{role} {t('viewSuffix', lang)}</option>))}
                  <option value="AWARENESS">{t('awarenessHub', lang)}</option>
                </select>
              </div>
               <div className="hidden sm:block">
                <select value={lang} onChange={(e) => setLang(e.target.value as LanguageKey)} className="bg-transparent dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary">
                  {LANGUAGES.map(l => (<option key={l.key} value={l.key}>{l.name}</option>))}
                </select>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><span className="sr-only">Toggle Theme</span>{theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="sm:hidden space-y-4 mb-4">
            <div>
              <label className="text-sm font-medium">{t('switchView', lang)}:</label>
              <select value={currentView} onChange={(e) => setCurrentView(e.target.value as View)} className="w-full mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-secondary">
                {USER_ROLES_LIST.map(role => (<option key={role} value={role}>{role} {t('viewSuffix', lang)}</option>))}
                <option value="AWARENESS">{t('awarenessHub', lang)}</option>
              </select>
            </div>
            <div>
                 <label className="text-sm font-medium">Language:</label>
                 <select value={lang} onChange={(e) => setLang(e.target.value as LanguageKey)} className="w-full mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-secondary">
                    {LANGUAGES.map(l => (<option key={l.key} value={l.key}>{l.name}</option>))}
                </select>
            </div>
        </div>

        {currentView !== 'AWARENESS' && <Dashboard userRole={currentView as UserRole} lang={lang} />}
        <div className="mt-8">{renderView()}</div>
      </main>

      <div className="fixed bottom-4 right-4 space-y-3 z-40">
        <button onClick={() => setIsEmergencyModalOpen(true)} className="group flex items-center justify-center w-16 h-16 bg-danger hover:bg-red-600 text-white rounded-full shadow-lg transition-all transform hover:scale-110" title={t('emergencyBroadcast', lang)}>
          <HeartIcon className="w-8 h-8 animate-pulse-fast" />
        </button>
         <button onClick={() => setIsChatbotOpen(!isChatbotOpen)} className="group flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg transition-all transform hover:scale-110" title={t('aiAssistant', lang)}>
          <ChatBubbleIcon className="w-7 h-7" />
        </button>
      </div>

      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} lang={lang} />

      <Modal isOpen={isEmergencyModalOpen} onClose={() => setIsEmergencyModalOpen(false)} title={t('emergencyBroadcast', lang)}>
        <div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">This will send an urgent notification to all available donors within a specified radius for a critical case.</p>
            <div className="space-y-4">
                 <label className="block"><span className="text-slate-700 dark:text-slate-300">Broadcast Radius: 25 km</span><input type="range" min="5" max="100" defaultValue="25" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" /></label>
                 <Button variant="danger" className="w-full">Confirm and Broadcast</Button>
                 <Button variant="ghost" className="w-full" onClick={() => setIsEmergencyModalOpen(false)}>Cancel</Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
