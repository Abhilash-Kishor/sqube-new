
import React, { useState, useEffect } from 'react';
import { Trees, Zap, Activity, Target, LayoutGrid } from 'lucide-react';
import ProximityAnalysis from './ProximityAnalysis';
import { MODULE_DEFINITIONS } from '../constants';

interface EnvironmentAnalyticsProps {
  activeSubTab: string;
  setActiveSubTab: (id: string) => void;
  theme?: string;
}

const EnvironmentAnalytics: React.FC<EnvironmentAnalyticsProps> = ({ 
  activeSubTab, 
  setActiveSubTab,
  theme = 'light'
}) => {
  const [isSyncing, setIsSyncing] = useState(true);
  const currentModule = MODULE_DEFINITIONS.find(m => m.id === 'environment');
  const subTabs = currentModule?.subTabs || [];

  useEffect(() => {
    // Avoid synchronous setState in effect body
    const startSync = setTimeout(() => setIsSyncing(true), 0);
    const endSync = setTimeout(() => setIsSyncing(false), 500);
    return () => {
      clearTimeout(startSync);
      clearTimeout(endSync);
    };
  }, [activeSubTab]);

  const renderSustainabilityContent = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-emerald-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12 scale-150"><Trees size={260} /></div>
        <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-xl group"><Trees size={48} className="text-white" /></div>
        <div className="relative z-10 space-y-2">
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none italic">Sustainability Hub</h2>
          <p className="text-emerald-100 font-bold text-xl opacity-90 tracking-tight">OASIS Green Index & Audit Reporting</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Solar Adoption', val: '42%', icon: <Zap size={24} />, color: 'bg-amber-500' },
          { label: 'Water Recycling', val: '68%', icon: <Activity size={24} />, color: 'bg-blue-500' },
          { label: 'Waste Mgmt', val: '89%', icon: <Target size={24} />, color: 'bg-emerald-500' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center gap-6">
            <div className={`w-14 h-14 ${kpi.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>{kpi.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <h4 className="text-3xl font-black text-[#002B5B] dark:text-white leading-none">{kpi.val}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 p-16 rounded-[3rem] border border-slate-50 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center gap-6 opacity-60">
         <Trees size={64} className="text-emerald-500" />
         <h4 className="text-2xl font-black text-[#002B5B] dark:text-emerald-400 uppercase tracking-tight">Regional Sustainability Heatmap</h4>
         <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Registry Handshake in Progress... Preparing Environmental Geospatial Feed</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 sticky top-32 overflow-hidden">
           <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-emerald-50/40 dark:bg-emerald-900/10">
              <LayoutGrid size={20} className="text-emerald-600" />
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Enviro Hub</p>
           </div>
           <nav className="p-6 space-y-2">
              {subTabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveSubTab(tab.id)} 
                  className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeSubTab === tab.id 
                    ? 'bg-emerald-600 text-white shadow-xl border-emerald-600 translate-x-1' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </nav>
        </div>
      </aside>

      <div className="flex-1 space-y-10 min-w-0">
        {isSyncing ? (
          <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl text-center gap-6 min-h-[700px]">
            <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Handshaking Environment Registry...</p>
          </div>
        ) : (
          activeSubTab === 'proximity' ? <ProximityAnalysis /> : renderSustainabilityContent()
        )}
      </div>
    </div>
  );
};

export default EnvironmentAnalytics;
