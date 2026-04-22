import React, { useState, useMemo, useEffect } from 'react';
import { QUICK_FACTS_KPIS, MOCK_REGIONAL_DATA, COMPOSITE_INDICATORS } from '../constants';
import { 
  TrendingUp, TrendingDown, BrainCircuit, Sparkles, BarChart3, Info, X, 
  ChevronRight, Target, Trophy, Percent, Activity, Table as TableIcon,
  Download, FileText, Layout, RefreshCw, Zap, Users, FileQuestion
} from 'lucide-react';
import { getAIInsight } from '../services/geminiService';
import { dashboardData } from '../mockData';
import * as Charts from './ExecutiveCharts';
import { Language } from '../types';

interface DashboardProps {
  language?: Language;
  activeSubTab?: string;
  region?: string;
  schoolType?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  language = 'en', 
  activeSubTab = 'national',
  region = 'All India',
  schoolType = 'Independent'
}) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<typeof QUICK_FACTS_KPIS[0] | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const currentStats = useMemo(() => MOCK_REGIONAL_DATA[region] || MOCK_REGIONAL_DATA['All India'], [region]);
  
  const handleGenerateInsight = React.useCallback(async () => {
    setIsGenerating(true);
    const summary = `Focus: ${activeSubTab === 'regional' ? `Region ${region} Analysis` : 'National Summary'} Region: ${region}, Institutions: ${currentStats.schools}, PTR: ${currentStats.ptr}, Pass Rate: ${currentStats.passRate}%`;
    
    const insight = await getAIInsight(
      activeSubTab === 'regional' ? 'Regional Comparison' : 'National Overview', 
      summary, 
      language as Language
    );
    
    setAiInsight(insight);
    setIsGenerating(false);
  }, [activeSubTab, region, currentStats, language]);

  useEffect(() => {
    handleGenerateInsight();
  }, [handleGenerateInsight]);

  const kpiValue = (kpiKey: string) => {
    switch(kpiKey) {
      case 'schools': return currentStats.schools.toLocaleString();
      case 'ptr': return `${currentStats.ptr}:1`;
      case 'students': return (currentStats.students / 1000000).toFixed(2) + 'M';
      case 'gpi': return currentStats.gpi;
      case 'teachers': return (currentStats.teachers / 1000000).toFixed(2) + 'M';
      default: return currentStats.passRate + '%';
    }
  };

  const exportCSV = () => {
    if (!selectedKpi) return;
    const headers = "Category,Current Value,Status\n";
    const rows = `${selectedKpi.label},${kpiValue(selectedKpi.key)},Verified`;
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBSE_KPI_${selectedKpi.key}_Report.csv`;
    a.click();
  };

  return (
    <div className="space-y-10 font-inter pb-24">
      {/* Command Priorities Bar */}
      <div className="bg-slate-900 text-white px-8 py-4 rounded-[2rem] flex flex-wrap items-center justify-between gap-6 shadow-2xl border border-white/10 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none rotate-12"><Zap size={100} /></div>
         <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em]">Command Priorities:</span>
            <div className="flex gap-4">
               {[
                 { label: 'Drop Out Analysis', icon: <TrendingDown size={14} className="text-rose-400" /> },
                 { label: 'Left Out Analysis', icon: <Users size={14} className="text-emerald-400" /> },
                 { label: 'Question Paper Insights', icon: <FileQuestion size={14} className="text-blue-400" /> }
               ].map((p, i) => (
                 <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 cursor-pointer transition-all">
                    {p.icon}
                    <span className="text-[9px] font-black uppercase tracking-widest">{p.label}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Registry Handshake Active</span>
         </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div className="animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="flex items-center gap-4 mb-3">
             <div className="w-2.5 h-12 bg-gradient-to-b from-[#0066CC] to-[#002B5B] rounded-full"></div>
             <h2 className="text-4xl lg:text-5xl font-black text-[#002B5B] dark:text-blue-400 tracking-tighter leading-tight uppercase">
               {activeSubTab === 'national' ? 'National Overview' : `Region: ${region}`}
             </h2>
          </div>
          <p className="text-slate-400 font-semibold text-lg ml-6">
            OASIS Repository Sync • {region} Analytics Cluster
          </p>
        </div>
        
        <button 
          onClick={handleGenerateInsight} 
          disabled={isGenerating} 
          className="group flex items-center gap-4 px-10 py-5 bg-gradient-to-br from-[#0066CC] to-[#002B5B] text-white rounded-2xl shadow-xl hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest text-xs font-black"
        >
          {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <BrainCircuit size={20} />}
          {isGenerating ? 'Syncing Insights...' : 'Manual Insight Refresh'}
        </button>
      </div>

      {aiInsight && (
        <div className="p-10 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-[3rem] shadow-3xl flex flex-col lg:flex-row gap-10 items-start animate-in zoom-in-95 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Sparkles size={120} /></div>
          <div className="w-16 h-16 bg-[#002B5B] dark:bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xl">
            <Sparkles size={28} />
          </div>
          <div className="flex-1 space-y-4 relative z-10">
             <h4 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 tracking-tight">Executive Summary Analytics</h4>
             <p className="text-slate-600 dark:text-slate-300 font-medium text-lg leading-relaxed max-w-5xl">
                {aiInsight}
             </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {QUICK_FACTS_KPIS.map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-[#002B5B] dark:group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600 shadow-inner">
                {kpi.icon}
              </div>
              <button onClick={() => { setSelectedKpi(kpi); setViewMode('chart'); }} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                <Info size={18} />
              </button>
            </div>
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-1">{kpi.label}</p>
              <h3 className="text-4xl font-black text-[#002B5B] dark:text-slate-100 tracking-tighter mb-4 leading-none">{kpiValue(kpi.key)}</h3>
            </div>
            <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
              <div className={`px-3 py-1 rounded-full flex items-center gap-1 text-[9px] font-black tracking-widest border ${kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {kpi.change}
              </div>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">OASIS SYNC</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight">Governance Composite Indicators</h3>
            <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPOSITE_INDICATORS.map((ci) => (
               <div key={ci.key} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform cursor-pointer">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[#002B5B] dark:text-blue-400 mb-2 group-hover:bg-[#002B5B] dark:group-hover:bg-blue-600 group-hover:text-white transition-colors">{ci.icon}</div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">{ci.label}</h4>
                  <Charts.ExecutiveCompositeGauge value={(currentStats as any)[ci.key] || 0} label={ci.label} color={ci.color} />
                  <p className="text-[10px] text-slate-400 font-medium px-4 opacity-0 group-hover:opacity-100 transition-opacity">{ci.description}</p>
               </div>
            ))}
         </div>
      </div>

      {selectedKpi && (
        <div id="printable-report" className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] shadow-3xl overflow-hidden relative border border-slate-100 dark:border-slate-800">
              <button onClick={() => setSelectedKpi(null)} className="absolute top-8 right-8 p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400 hover:text-rose-500 transition-all"><X size={24} /></button>
              <div className="p-12 space-y-10">
                 <div className="flex justify-between items-end border-b border-slate-50 dark:border-slate-800 pb-8">
                    <div className="flex items-center gap-6">
                       <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-[#002B5B] dark:text-blue-400 rounded-3xl flex items-center justify-center">{React.cloneElement(selectedKpi.icon as React.ReactElement<any>, { size: 40 })}</div>
                       <div>
                          <h2 className="text-4xl font-black text-[#002B5B] dark:text-slate-100 tracking-tight">{selectedKpi.label}</h2>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Success Metric</p>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                          <button onClick={() => setViewMode('chart')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase ${viewMode === 'chart' ? 'bg-[#002B5B] text-white shadow-lg' : 'text-slate-400'}`}>Visual</button>
                          <button onClick={() => setViewMode('table')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase ${viewMode === 'table' ? 'bg-[#002B5B] text-white shadow-lg' : 'text-slate-400'}`}>Stats</button>
                       </div>
                       <button onClick={exportCSV} className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl"><Download size={20}/></button>
                       <button onClick={() => window.print()} className="p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl"><FileText size={20}/></button>
                    </div>
                 </div>
                 {viewMode === 'chart' ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{selectedKpi.whatIsIt}</p>
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-[11px] font-bold text-blue-900 dark:text-blue-200 uppercase tracking-widest">Interpretation: {selectedKpi.howToInterpret}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 flex items-center justify-center min-h-[300px]">
                         <Charts.ExecutiveRadarChart data={[{n:'Current', v:90}, {n:'National', v:75}, {n:'Cluster', v:82}]} />
                      </div>
                   </div>
                 ) : (
                   <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr><th className="px-6 py-4 text-[10px] font-black uppercase">Category</th><th className="px-6 py-4 text-[10px] font-black uppercase">Value</th><th className="px-6 py-4 text-[10px] font-black uppercase">Status</th></tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-slate-50 dark:border-slate-800"><td className="px-6 py-4 font-bold">{selectedKpi.label}</td><td className="px-6 py-4 font-black text-blue-600 text-lg">{kpiValue(selectedKpi.key)}</td><td className="px-6 py-4 text-emerald-600 font-black">Verified</td></tr>
                        </tbody>
                      </table>
                   </div>
                 )}
                 <div className="flex justify-end pt-4"><button onClick={() => setSelectedKpi(null)} className="px-8 py-4 bg-[#002B5B] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Close Report</button></div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;