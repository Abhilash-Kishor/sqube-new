
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Zap, 
  Wifi, 
  Library, 
  Activity,
  FileText,
  ChevronRight,
  Target,
  LayoutGrid
} from 'lucide-react';
import * as Charts from './ExecutiveCharts';
import { dashboardData } from '../mockData';
import { MODULE_DEFINITIONS } from '../constants';

interface InfrastructureAnalyticsProps {
  activeSubTab: string;
  setActiveSubTab: (id: string) => void;
  region?: string;
}

const InfrastructureAnalytics: React.FC<InfrastructureAnalyticsProps> = ({ 
  activeSubTab, 
  setActiveSubTab,
  region = 'All India' 
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [isSyncing, setIsSyncing] = useState(true);

  const currentModule = MODULE_DEFINITIONS.find(m => m.id === 'infrastructure');
  const subTabs = currentModule?.subTabs || [];

  useEffect(() => {
    // Avoid synchronous setState in effect body
    const startSync = setTimeout(() => setIsSyncing(true), 0);
    const endSync = setTimeout(() => setIsSyncing(false), 600);
    return () => {
      clearTimeout(startSync);
      clearTimeout(endSync);
    };
  }, [region, activeSubTab]);

  const currentData = useMemo(() => {
    if (!dashboardData || !dashboardData.regions) return dashboardData?.default || {};
    const data = (dashboardData.regions as any)[region] || dashboardData.default;
    return data;
  }, [region]);

  const renderAuditControls = (label: string) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 dark:border-slate-800 pb-6 gap-4 mb-8">
       <div className="space-y-1">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">National Infrastructure Audit</p>
          <h3 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight leading-none">{label}</h3>
       </div>
       <div className="flex flex-wrap gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner">
             <button onClick={() => setViewMode('chart')} className={`px-5 py-2 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'chart' ? 'bg-[#FF6600] text-white shadow-md' : 'text-slate-400 hover:text-orange-600'}`}>
                Visual
             </button>
             <button onClick={() => setViewMode('table')} className={`px-5 py-2 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'table' ? 'bg-[#FF6600] text-white shadow-md' : 'text-slate-400 hover:text-orange-600'}`}>
                Stats
             </button>
          </div>
          <button onClick={() => window.print()} className="p-2.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl border border-rose-100 dark:border-rose-800 shadow-sm hover:shadow-md transition-all"><FileText size={18} /></button>
       </div>
    </div>
  );

  const renderContentBody = () => {
    if (isSyncing) {
      return (
        <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl text-center gap-6 min-h-[600px]">
          <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Infrastructure Registry...</p>
        </div>
      );
    }

    const data = activeSubTab === 'physical' ? currentData.infra_physical : currentData.infra_digital;
    const label = activeSubTab === 'physical' ? 'Physical Facilities Availability' : 'Digital Amenities Maturity';

    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        {renderAuditControls(label)}
        
        {viewMode === 'chart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-50 dark:border-slate-800 min-h-[600px] flex items-center justify-center">
              <Charts.ExecutiveVerticalBarChart data={data || []} title="National Availability %" yAxisName="Percentage (%)" />
            </div>
            <div className="lg:col-span-4 space-y-6">
               <div className="bg-[#002B5B] dark:bg-slate-800 p-10 rounded-[2.5rem] text-white flex flex-col justify-center relative overflow-hidden shadow-2xl h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Building2 size={160} /></div>
                  <h4 className="text-[10px] font-black text-orange-200 uppercase tracking-[0.4em] mb-6">Strategy Hub</h4>
                  <p className="text-2xl font-black leading-tight tracking-tight italic">
                    {activeSubTab === 'physical' 
                      ? "98.4% of institutions have synchronized functional drinking water registries." 
                      : "Digital transformation benchmarks show a 14% uptick in ICT lab readiness."}
                  </p>
                  <div className="mt-10 flex items-center gap-3">
                     <Target className="text-orange-400" size={20} />
                     <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Verified OASIS Registry</p>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
             <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                   <tr>
                      <th className="px-10 py-6 text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest">Facility Asset</th>
                      <th className="px-10 py-6 text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-center">Audit Value</th>
                      <th className="px-10 py-6 text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-right">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                   {data?.map((row: any, i: number) => (
                     <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-10 py-5 font-black text-[#002B5B] dark:text-slate-300 uppercase text-xs">{row.n}</td>
                        <td className="px-10 py-5 font-black text-3xl text-orange-600 text-center">{row.v}%</td>
                        <td className="px-10 py-5 text-right">
                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-[9px] font-black tracking-widest uppercase">Validated</div>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'CWSN Ramps', val: '84%', icon: <Activity size={20} />, color: 'bg-blue-600' },
             { label: 'Solar Audit', val: '42%', icon: <Zap size={20} />, color: 'bg-amber-500' },
             { label: 'ICT Connect', val: '85%', icon: <Wifi size={20} />, color: 'bg-emerald-500' },
             { label: 'Library Hub', val: '95%', icon: <Library size={20} />, color: 'bg-indigo-600' },
           ].map((kpi, idx) => (
             <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center gap-6">
               <div className={`w-14 h-14 ${kpi.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>{kpi.icon}</div>
               <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                 <h4 className="text-2xl font-black text-[#002B5B] dark:text-white leading-none">{kpi.val}</h4>
               </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 sticky top-32 overflow-hidden">
           <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-orange-50/40 dark:bg-orange-900/10">
              <LayoutGrid size={20} className="text-orange-600" />
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Infra Hub</p>
           </div>
           <nav className="p-6 space-y-2">
              {subTabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveSubTab(tab.id)} 
                  className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeSubTab === tab.id 
                    ? 'bg-[#F59E0B] text-white shadow-xl border-[#F59E0B] translate-x-1' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </nav>
        </div>
      </aside>

      <div className="flex-1 space-y-10 min-w-0">
        <div className="bg-[#F59E0B] rounded-[3rem] p-16 text-white flex flex-col md:flex-row items-center gap-10 shadow-3xl relative overflow-hidden border-b-8 border-orange-900/30">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12 scale-150"><Building2 size={260} /></div>
          <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-xl group"><Building2 size={48} className="text-white" /></div>
          <div className="relative z-10 space-y-2">
             <h2 className="text-5xl font-black tracking-tighter uppercase leading-none italic drop-shadow-lg">Infrastructure Hub</h2>
             <p className="text-orange-100 font-bold text-xl opacity-90 tracking-tight">OASIS National Asset & Facilities Command</p>
          </div>
        </div>
        <div className="min-h-[700px]">{renderContentBody()}</div>
      </div>
    </div>
  );
};

export default InfrastructureAnalytics;
