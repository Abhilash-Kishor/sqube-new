
import React from 'react';
import { MODULE_DEFINITIONS } from '../constants';
import { ChevronRight, Search, Bell, Sparkles, LogOut, ArrowRight, Languages, Moon, Sun } from 'lucide-react';
import { Language, Theme } from '../types';

interface LandingProps {
  onEnterApp: (tabId: string) => void;
  user: any;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnterApp, user, onLogout, language, setLanguage, theme, toggleTheme }) => {
  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-400 blur-[140px] opacity-40"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[35%] h-[35%] bg-rose-500 blur-[160px] opacity-30"></div>
      </div>

      <header className="h-24 px-12 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border-b border-white/20 dark:border-slate-800/50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">S³</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">Sagar se Saransh</h1>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">Executive Analytics • CBSE</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:scale-110 transition-transform">
            {theme === 'light' ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-yellow-400" />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black tracking-tight">{user?.username}</p>
              <button onClick={onLogout} className="text-[10px] text-rose-500 font-black uppercase tracking-widest hover:underline flex items-center gap-1 justify-end">Sign Out <LogOut size={10} /></button>
            </div>
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl shadow-lg flex items-center justify-center font-black text-xl uppercase ring-4 ring-blue-500/10">
              {user?.username?.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-12 pt-20 pb-40">
        <div className="text-center mb-24 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-blue-600 dark:text-blue-400">
            <Sparkles size={14} /> National Analytics Hub
          </div>
          <h2 className="text-7xl font-black mb-10 leading-[1] tracking-tighter">
            Distilling Complexity <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 animate-gradient-x">
              Into Actionable Insights
            </span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Welcome to the unified institutional intelligence engine. Navigate multi-layered datasets designed for rapid policy formulation and resource auditing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MODULE_DEFINITIONS.map((module) => (
            <button
              key={module.id}
              onClick={() => onEnterApp(module.id)}
              className="group relative flex flex-col p-10 bg-white dark:bg-slate-900/40 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-4 transition-all duration-500 overflow-hidden backdrop-blur-md"
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl transition-all group-hover:rotate-6 ${
                module.iconType === 'pearl-blue' ? 'bg-blue-600' : 
                module.iconType === 'pearl-orange' ? 'bg-orange-500' : 
                module.iconType === 'pearl-green' ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}>
                {React.cloneElement(module.icon as React.ReactElement<any>, { size: 40 })}
              </div>
              
              <div className="text-left space-y-2">
                <h3 className="text-2xl font-black tracking-tight">{module.subtitle}</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{module.title}</p>
              </div>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Explore Module <ChevronRight size={14} />
              </div>
              <div className="absolute -bottom-10 -right-10 p-10 opacity-[0.03] text-slate-900 dark:text-white group-hover:scale-150 transition-transform">
                {module.icon}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-32 text-center">
          <button 
            onClick={() => onEnterApp('dashboard')}
            className="group px-16 py-8 bg-slate-900 dark:bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-6 mx-auto"
          >
            Launch Unified Hub <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="p-20 text-center opacity-40">
        <p className="text-[11px] font-black uppercase tracking-[0.5em]">© 2026 CBSE National IT Hub • Unified Infrastructure</p>
      </footer>
    </div>
  );
};

export default Landing;