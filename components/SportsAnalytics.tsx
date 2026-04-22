
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, School, Building2, MapPin, Award, 
  FileText, LayoutGrid, Target, ChevronRight, Gamepad2
} from 'lucide-react';
import * as Charts from './ExecutiveCharts';
import { dashboardData } from '../mockData';
import { MODULE_DEFINITIONS } from '../constants';

interface SportsAnalyticsProps {
  activeSubTab: string;
  setActiveSubTab?: (id: string) => void;
  region?: string;
}

const SportsAnalytics: React.FC<SportsAnalyticsProps> = ({ 
  activeSubTab, 
  setActiveSubTab, 
  region = 'All India' 
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  
  const currentModule = MODULE_DEFINITIONS.find(m => m.id === 'sports');
  const subTabs = currentModule?.subTabs || [];

  const currentData = useMemo(() => {
    if (!dashboardData || !dashboardData.regions) return dashboardData?.default || {};
    const regionData = (dashboardData.regions as any)[region] || dashboardData.default;
    return regionData;
  }, [region]);

  const renderAuditControls = (label: string) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4 mb-8">
       <div className="space-y-1">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Leadership Participation Audit</p>
          <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-tight leading-none">{label}</h3>
       </div>
       <div className="flex flex-wrap gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
             <button onClick={() => setViewMode('chart')} className={`px-5 py-2 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'chart' ? 'bg-[#FF6600] text-white shadow-md' : 'text-slate-400 hover:text-orange-600'}`}>
                Visual
             </button>
             <button onClick={() => setViewMode('table')} className={`px-5 py-2 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'table' ? 'bg-[#FF6600] text-white shadow-md' : 'text-slate-400 hover:text-orange-600'}`}>
                Stats
             </button>
          </div>
          <button onClick={() => window.print()} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-all"><FileText size={18} /></button>
       </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSubTab) {
      case 'summary':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            {renderAuditControls('Sovereign Sports Participation')}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 min-h-[650px] flex flex-col items-center justify-center">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">By School Type</h4>
                  <Charts.ExecutiveDonutChart data={currentData.sports_school_type || []} />
               </div>
               <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 min-h-[650px] flex flex-col items-center justify-center">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Management Distribution</h4>
                  <Charts.ExecutiveRadarChart data={currentData.sports_management || []} />
               </div>
            </div>
          </div>
        );
      case 'games':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            {renderAuditControls('Game Frequency Analytics')}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 min-h-[750px] flex items-center justify-center">
               <Charts.ExecutiveVerticalBarChart data={currentData.sports_games || []} title="Popularity Matrix" yAxisName="Participating Schools" />
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            {renderAuditControls('Regional Mastery Index')}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 min-h-[750px] flex items-center justify-center">
               <Charts.ExecutiveVerticalBarChart data={(currentData.sports_regions || []).slice(0, 15)} title="Region Ranking" yAxisName="Aggregate Score" />
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-24 rounded-[3rem] border border-slate-100 shadow-3xl flex flex-col items-center justify-center text-center gap-8 min-h-[700px]">
            <Trophy size={64} className="text-orange-500 animate-bounce" />
            <h2 className="text-4xl font-black text-[#002B5B] uppercase tracking-tight">Syncing Sports Data</h2>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Preparing Executive Participation Feed...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-white rounded-[2.5rem] shadow-3xl border border-slate-100 sticky top-32 overflow-hidden">
           <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-orange-50/40">
              <LayoutGrid size={20} className="text-orange-600" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Sports Hub</p>
           </div>
           <nav className="p-6 space-y-2">
              {subTabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveSubTab?.(tab.id)} 
                  className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeSubTab === tab.id 
                    ? 'bg-[#FF6600] text-white shadow-xl border-[#FF6600] translate-x-1' 
                    : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </nav>
        </div>
      </aside>
      <div className="flex-1 space-y-10 min-w-0">
        <div className="bg-gradient-to-br from-[#FF6600] to-[#CC5200] rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-3xl relative overflow-hidden border-b-[8px] border-orange-900/30">
           <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12 scale-110"><Trophy size={260} /></div>
           <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-xl group"><Trophy size={48} className="text-white group-hover:scale-105 transition-transform" /></div>
           <div className="relative z-10 space-y-2">
              <h2 className="text-5xl font-black tracking-tighter uppercase leading-none italic drop-shadow-lg">Sports Panorama</h2>
              <p className="text-orange-100 font-bold text-xl opacity-90 tracking-tight">OASIS National Sports Command</p>
           </div>
        </div>
        <div className="min-h-[700px]">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SportsAnalytics;
