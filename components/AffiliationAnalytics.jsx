
import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  LayoutGrid
} from 'lucide-react';
import * as Charts from './ExecutiveCharts';
import { dashboardData } from '../mockData';
import { MODULE_DEFINITIONS } from '../constants';

const AffiliationAnalytics = ({ 
  activeSubTab, 
  setActiveSubTab,
  region = 'All India' 
}) => {
  const [isSyncing, setIsSyncing] = useState(true);

  const currentModule = MODULE_DEFINITIONS.find(m => m.id === 'affiliation');
  const subTabs = currentModule?.subTabs || [];

  useEffect(() => {
    // Avoid synchronous setState in effect body to satisfy linter and prevent cascading renders
    const startSync = setTimeout(() => setIsSyncing(true), 0);
    const endSync = setTimeout(() => setIsSyncing(false), 600);
    return () => {
      clearTimeout(startSync);
      clearTimeout(endSync);
    };
  }, [region, activeSubTab]);

  const currentData = useMemo(() => {
    if (!dashboardData || !dashboardData.regions) return dashboardData?.default || {};
    const data = dashboardData.regions[region] || dashboardData.default;
    return data;
  }, [region]);

  const renderStatusView = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
         <div className="space-y-1">
            <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">Sovereign Affiliation Command</p>
            <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-tight leading-none">Application Lifecycle Analytics</h3>
         </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'New Affiliations', val: '1,240', icon: <CheckCircle2 className="text-emerald-500" /> },
           { label: 'Extensions Pending', val: '840', icon: <Clock className="text-amber-500" /> },
           { label: 'Deficiencies', val: '124', icon: <AlertCircle className="text-rose-500" /> },
           { label: 'Total Active', val: '30,124', icon: <ShieldCheck className="text-blue-500" /> },
         ].map((kpi, idx) => (
           <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6">
             <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">{kpi.icon}</div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
               <h4 className="text-3xl font-black text-[#002B5B] leading-none">{kpi.val}</h4>
             </div>
           </div>
         ))}
      </div>
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 min-h-[600px] flex items-center justify-center">
         <Charts.ExecutiveVerticalBarChart data={(currentData.sqaaf_maturity || []).slice(0, 10)} title="Affiliation Maturity" yAxisName="Approval Rating" />
      </div>
    </div>
  );

  const renderSQAAFView = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 min-h-[700px] flex flex-col space-y-10">
         <div className="flex justify-between items-center border-b border-slate-100 pb-8">
            <div>
               <h3 className="text-3xl font-black text-[#002B5B] uppercase tracking-tight leading-none">SQAAF Maturity Index</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Quality Standards Compliance Radar</p>
            </div>
            <div className="px-6 py-2 bg-blue-50 text-blue-600 rounded-full font-black text-[10px] uppercase tracking-widest">Framework Active: 2026</div>
         </div>
         <div className="flex-1 flex items-center justify-center">
            <Charts.ExecutiveRadarChart data={currentData.sqaaf_maturity || []} />
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-white rounded-[2.5rem] shadow-3xl border border-slate-100 sticky top-32 overflow-hidden">
           <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-cyan-50/40">
              <LayoutGrid size={20} className="text-cyan-600" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Affiliation Hub</p>
           </div>
           <nav className="p-6 space-y-2">
              {subTabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveSubTab(tab.id)} 
                  className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeSubTab === tab.id 
                    ? 'bg-cyan-600 text-white shadow-xl border-cyan-600 translate-x-1' 
                    : 'text-slate-500 hover:bg-cyan-50 hover:text-cyan-600 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </nav>
        </div>
      </aside>

      <div className="flex-1 space-y-10 min-w-0">
        <div className="bg-cyan-600 rounded-[3rem] p-16 text-white flex flex-col md:flex-row items-center gap-10 shadow-3xl relative overflow-hidden border-b-8 border-cyan-900/30">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12 scale-150"><FileCheck size={260} /></div>
          <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-3xl border border-white/20 shadow-xl group"><FileCheck size={48} className="text-white" /></div>
          <div className="relative z-10 space-y-2">
             <h2 className="text-5xl font-black tracking-tighter uppercase leading-none italic drop-shadow-lg">Affiliation Hub</h2>
             <p className="text-cyan-100 font-bold text-xl opacity-90 tracking-tight">OASIS National Institutional Certification Command</p>
          </div>
        </div>
        
        {isSyncing ? (
          <div className="flex flex-col items-center justify-center p-24 bg-white rounded-[3rem] border border-slate-100 shadow-3xl text-center gap-6 min-h-[700px]">
            <div className="w-16 h-16 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Handshaking Affiliation Registry...</p>
          </div>
        ) : (
          activeSubTab === 'sqaaf' ? renderSQAAFView() : renderStatusView()
        )}
      </div>
    </div>
  );
};

export default AffiliationAnalytics;
