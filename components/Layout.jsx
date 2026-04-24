
import React, { useState, useRef, useEffect } from 'react';
import { MODULE_DEFINITIONS, CBSE_REGIONS } from '../constants';
import { LogOut, Languages, MapPin, Moon, Sun } from 'lucide-react';
import AIAnalystChat from './AIAnalystChat';

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिन्दी' },
  { id: 'mr', label: 'मराठी' },
  { id: 'ta', label: 'தமிழ்' },
  { id: 'te', label: 'తెలుగు' },
  { id: 'bn', label: 'বাংলা' }
];

const Layout = ({ 
  children, activeTab, setActiveTab, activeSubTab, setActiveSubTab, user, onLogout, 
  onBackToPortal, language, setLanguage, selectedRegion, setSelectedRegion, theme, toggleTheme 
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModule = MODULE_DEFINITIONS.find(m => m.id === activeTab) || MODULE_DEFINITIONS[0];
  const subTabs = currentModule?.subTabs || [];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-[#FDFEFF] text-slate-900'}`}>
      <header className="h-20 bg-[#002B5B] dark:bg-slate-900 text-white px-4 lg:px-8 flex items-center justify-between sticky top-0 z-[100] shadow-2xl">
        <div className="flex items-center gap-4 shrink-0">
          <button onClick={onBackToPortal} className="flex items-center gap-3 group hover:bg-white/10 px-2 py-1.5 rounded-xl transition-all">
            <div className="bg-white p-1 rounded-lg flex items-center justify-center shadow-md"><img src="https://www.cbse.gov.in/cbsenew/img/cbse-logo.png" className="w-8 h-8 lg:w-9 lg:h-9" alt="CBSE" /></div>
            <div className="text-left hidden md:block">
              <span className="font-black text-sm lg:text-base tracking-tighter block leading-none uppercase">S³ Hub 3.0</span>
            </div>
          </button>
        </div>
          
        <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center px-4">
          {MODULE_DEFINITIONS.slice(0, 7).map((module) => (
            <button
              key={module.id}
              onClick={() => { setActiveTab(module.id); setActiveSubTab(module.subTabs[0]?.id || ''); }}
              className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === module.id ? 'bg-white text-[#002B5B] shadow-lg' : 'text-white/60 hover:text-white'}`}
            >
              {module.subtitle?.split(' ')[0] || 'Module'}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          <button onClick={toggleTheme} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-yellow-400" />}
          </button>

          <div className="relative" ref={menuRef}>
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10">
              <Languages size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">{LANGUAGES.find(l => l.id === language)?.label || 'EN'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-2xl py-2 z-[200] border border-slate-100 dark:border-slate-700">
                {LANGUAGES.map(l => (
                  <button key={l.id} onClick={() => { setLanguage(l.id); setLangMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 dark:hover:bg-slate-700 ${language === l.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black tracking-tight leading-none uppercase">{user?.username || 'Officer'}</p>
              <button onClick={onLogout} className="text-[7px] text-rose-400 font-black uppercase tracking-widest hover:underline">Sign Out</button>
            </div>
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-black border border-white/10 text-xs">
              {user?.username?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-20 z-[90] px-4 lg:px-8 h-14 flex items-center gap-4 shadow-sm">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-slate-100 dark:border-slate-800">
           <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${activeTab === 'dashboard' ? 'bg-blue-600' : 'bg-slate-700'}`}>
              {React.isValidElement(currentModule.icon) ? React.cloneElement(currentModule.icon, { size: 16 }) : null}
           </div>
           <p className="hidden sm:block text-[10px] font-black uppercase tracking-tighter text-slate-700 dark:text-slate-300">{currentModule.subtitle}</p>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 flex-1">
           {subTabs.map(st => (
             <button key={st.id} onClick={() => setActiveSubTab(st.id)} className={`text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all whitespace-nowrap ${activeSubTab === st.id ? 'bg-[#002B5B] dark:bg-blue-600 text-white' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{st.label}</button>
           ))}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
          <MapPin size={10} className="text-blue-500" />
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="bg-transparent text-[9px] font-black uppercase text-[#002B5B] dark:text-blue-400 outline-none">
             {CBSE_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <main className="flex-1 px-4 py-6 lg:px-8 lg:py-10 max-w-screen-2xl mx-auto w-full">
        {children}
      </main>

      <AIAnalystChat />
    </div>
  );
};

export default Layout;
