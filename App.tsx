
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Landing from './components/Landing';
import PublicHome from './components/PublicHome';
import ModuleView from './components/ModuleView';
import { MODULE_DEFINITIONS } from './constants';
import { Language, Theme } from './types';

export type AppView = 'public' | 'login' | 'portal' | 'dashboard' | 'school';
export type InstitutionType = 'cbse' | 'nvs' | 'kvs';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<AppView>('public');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('national');
  const [user, setUser] = useState<any>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<InstitutionType>('cbse');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('s3-theme') as Theme) || 'light');
  
  // Global Filters
  const [selectedRegion, setSelectedRegion] = useState('Delhi West');
  const [selectedSchoolType, setSelectedSchoolType] = useState('Independent');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('s3-theme', theme);
  }, [theme]);

  const handleLogin = (username: string) => {
    setUser({ username, role: 'Leadership' });
    setIsAuthenticated(true);
    setView('portal');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setView('public');
    setActiveTab('dashboard');
    setActiveSubTab('national');
  };

  const handleEnterApp = (tabId: string) => {
    const module = MODULE_DEFINITIONS.find(m => m.id === tabId);
    setActiveTab(tabId);
    setActiveSubTab(module?.subTabs[0]?.id || 'summary');
    setView('dashboard'); 
  };

  const handleBackToPortal = () => setView('portal');

  const handleShowLogin = (institution: InstitutionType) => {
    setSelectedInstitution(institution);
    setView('login');
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  if (view === 'public') return <PublicHome onLoginClick={handleShowLogin} />;
  
  if (view === 'login' && !isAuthenticated) {
    return (
      <div className={`relative ${theme === 'dark' ? 'dark' : ''}`}>
         <button 
           onClick={() => setView('public')}
           className="fixed top-8 left-8 z-50 px-6 py-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl text-[#002B5B] dark:text-white border border-white/40 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-white/60 transition-all flex items-center gap-2"
         >
           ← Back to Home
         </button>
         {/* Fix: Language prop now matches the expanded Language type */}
         <Auth onLogin={handleLogin} institution={selectedInstitution} language={language} />
      </div>
    );
  }

  if (view === 'portal' && isAuthenticated) {
    return (
      <Landing 
        onEnterApp={handleEnterApp} 
        user={user} 
        onLogout={handleLogout} 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      activeSubTab={activeSubTab}
      setActiveSubTab={setActiveSubTab}
      user={user}
      onLogout={handleLogout}
      onBackToPortal={handleBackToPortal}
      language={language}
      setLanguage={setLanguage}
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      selectedSchoolType={selectedSchoolType}
      setSelectedSchoolType={setSelectedSchoolType}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      <ModuleView 
        activeTab={activeTab} 
        activeSubTab={activeSubTab} 
        setActiveSubTab={setActiveSubTab}
        language={language} 
        region={selectedRegion} 
        schoolType={selectedSchoolType} 
        theme={theme}
      />
    </Layout>
  );
};

export default App;