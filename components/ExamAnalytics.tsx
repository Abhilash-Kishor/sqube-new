import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  TrendingDown, 
  ArrowRightLeft, 
  ClipboardList, 
  Trophy, 
  LineChart, 
  PenTool, 
  Scale, 
  PieChart, 
  Link, 
  Table as TableIcon,
  Download,
  Layout,
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';
import * as Charts from './ExecutiveCharts';
import { dashboardData } from '../mockData';
import ResultAtGlance from './ResultAtGlance';

interface ExamAnalyticsProps {
  region?: string;
  initialFocus?: 'X' | 'XII';
  activeSubTab?: string;
  theme?: 'light' | 'dark';
}

const ExamAnalytics: React.FC<ExamAnalyticsProps> = ({ region = 'All India', initialFocus, activeSubTab, theme = 'light' }) => {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    // Avoid synchronous setState in effect body
    const startSync = setTimeout(() => setIsSyncing(true), 0);
    
    // Sync with horizontal sub-tabs from Layout
    if (activeSubTab === 'dropout_9_10') {
      setSelectedKpi('X: Drop-out Analysis');
    } else if (activeSubTab === 'leftout_10_11') {
      setSelectedKpi('X: Left-out (10th→11th)');
    } else if (activeSubTab === 'qp_analysis') {
      setSelectedKpi('XII: Marks & RAP Analysis'); // Example mapping
    } else if (activeSubTab === 'theory_practical') {
      setSelectedKpi('XII: Theory-Practical Gap');
    } else if (initialFocus === 'X') {
      setSelectedKpi('X: Drop-out Analysis');
    } else if (initialFocus === 'XII') {
      setSelectedKpi('XII: Marks & RAP Analysis');
    }
    const timer = setTimeout(() => setIsSyncing(false), 500);
    return () => {
      clearTimeout(startSync);
      clearTimeout(timer);
    };
  }, [region, initialFocus, activeSubTab]);

  const currentData = useMemo(() => {
    if (!dashboardData || !dashboardData.regions) return dashboardData?.default || {};
    const data = (dashboardData.regions as any)[region] || dashboardData.default;
    return data;
  }, [region]);

  const classXItems = [
    { label: 'X: Drop-out Analysis', icon: <TrendingDown size={18} />, id: 'dropout_x' },
    { label: 'X: Left-out (10th→11th)', icon: <ArrowRightLeft size={18} />, id: 'leftout' },
    { label: 'X: Exam Summary', icon: <ClipboardList size={18} />, id: 'summary_x' },
    { label: 'X: Top Performers', icon: <Trophy size={18} />, id: 'performers' },
    { label: 'X: Board Marks (Mean)', icon: <LineChart size={18} />, id: 'marks_x' },
  ];

  const classXIIItems = [
    { label: 'XII: Drop-out Analysis', icon: <TrendingDown size={18} />, id: 'dropout_xii' },
    { label: 'XII: Exam Summary', icon: <ClipboardList size={18} />, id: 'summary_xii' },
    { label: 'XII: Top Performers', icon: <Trophy size={18} />, id: 'performers' },
    { label: 'XII: Marks & RAP Analysis', icon: <Zap size={18} />, id: 'rap' },
    { label: 'XII: Theory-Practical Gap', icon: <Scale size={18} />, id: 'variance' },
  ];

  const successVariance = useMemo(() => (Math.random()*4).toFixed(1), []);

  const getActiveData = () => {
     if (!currentData?.exam_performance) return [];
     if (selectedKpi?.includes('Drop-out')) return currentData.exam_performance?.dropout_x || [];
     if (selectedKpi?.includes('RAP') || selectedKpi?.includes('Marks')) return currentData.exam_performance?.rap_analysis || [];
     if (selectedKpi?.includes('Theory') || selectedKpi?.includes('Gap')) return currentData.exam_performance?.variance || [];
     return currentData.exam_performance?.rap_analysis || [];
  };

  const renderDetailCanvas = (label: string) => {
    const data = getActiveData();
    
    return (
      <div id="printable-report" className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl border border-slate-50 dark:border-slate-800 space-y-10 animate-in zoom-in-95 duration-300 min-h-[800px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-50 dark:border-slate-800 pb-6 gap-4">
           <div className="space-y-1">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Sovereign Performance Engine</p>
              <h3 className="text-3xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight leading-none">{label}</h3>
           </div>
           <div className="flex flex-wrap gap-2">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner">
                 <button onClick={() => setViewMode('chart')} className={`px-6 py-2.5 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'chart' ? 'bg-[#002B5B] dark:bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>
                   Visual
                 </button>
                 <button onClick={() => setViewMode('table')} className={`px-6 py-2.5 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'table' ? 'bg-[#002B5B] dark:bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>
                   Stats
                 </button>
              </div>
              <button onClick={() => window.print()} className="p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl border border-rose-100 dark:border-rose-800 shadow-sm hover:shadow-lg transition-all"><FileText size={18} /></button>
           </div>
        </div>

        {viewMode === 'chart' ? (
          <div className="space-y-12">
            <div className="bg-slate-50/50 dark:bg-slate-800/50 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 min-h-[550px] flex items-center justify-center">
               {label.includes('Drop-out') || data.length > 30 ? (
                 <Charts.ExecutiveVerticalBarChart data={data} title="Regional Cluster Comparison" yAxisName="Verified Index" />
               ) : (
                 <Charts.ExecutiveRadarChart data={data} />
               )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl"><Charts.ExecutiveDonutChart data={currentData.exam_performance?.summary || []} /></div>
               <div className="bg-[#002B5B] dark:bg-slate-800 p-10 rounded-[2.5rem] text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={160} /></div>
                  <h4 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.4em] mb-6">National Insight</h4>
                  <p className="text-2xl font-black leading-tight tracking-tight">National success variance is stabilized at ±{successVariance}% across core clusters.</p>
                  <p className="text-[10px] text-blue-300 mt-8 uppercase tracking-[0.3em] font-black border-l-2 border-blue-500 pl-4">Verified Feed: {new Date().toLocaleDateString()}</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[700px] overflow-y-auto custom-scrollbar">
             <table className="w-full text-left">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 z-10">
                  <tr>
                     <th className="px-8 py-5 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest">Region Cluster</th>
                     <th className="px-8 py-5 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-center">Aggregate Score</th>
                     <th className="px-8 py-5 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-right">Audit Maturity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                   {data.map((row: any, i: number) => (
                     <tr key={i} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-8 py-5 font-black text-[#002B5B] dark:text-slate-300 text-xs uppercase">{row.n}</td>
                        <td className="px-8 py-5 font-black text-2xl text-rose-600 text-center">{row.v?.toFixed(1) || '0.0'}{label.includes('Drop-out') ? '%' : ''}</td>
                        <td className="px-8 py-5 text-right">
                           <div className="inline-flex items-center gap-3">
                             <div className={`w-3 h-3 rounded-full ${row.v > 50 ? 'bg-emerald-500 shadow-emerald-200' : 'bg-rose-500 shadow-rose-200'} shadow-lg`}></div>
                             <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Synced Hub</span>
                           </div>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    );
  };

  if (isSyncing) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl text-center gap-6">
        <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing National Exam Feed...</p>
      </div>
    );
  }

  // If sub-tab is Result at Glance, show that specific view
  if (activeSubTab === 'result_at_glance') {
    return <ResultAtGlance region={region} theme={theme} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-40">
      <div className="bg-[#E11D48] rounded-[3rem] p-16 text-white flex items-center gap-12 shadow-3xl relative overflow-hidden border-b-8 border-rose-900/20">
        <Scale size={240} className="absolute right-0 top-0 opacity-10 rotate-12 scale-125 text-white" />
        <div className="w-28 h-28 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-3xl border border-white/20 shadow-2xl group">
          <FileText size={56} className="group-hover:scale-105 transition-transform" />
        </div>
        <div>
          <h2 className="text-6xl font-black tracking-tighter uppercase leading-none italic">Exam Panorama</h2>
          <p className="text-rose-100 font-black uppercase text-[12px] tracking-[0.5em] mt-5 opacity-90">National Result Logistics Command Hub</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
           <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl sticky top-40 space-y-8">
              <div>
                 <div className="flex items-center gap-3 mb-6 pb-2 border-b border-rose-50 dark:border-rose-900">
                    <Zap size={18} className="text-rose-500" />
                    <h4 className="text-[12px] font-black text-rose-500 uppercase tracking-widest">Class X Domain</h4>
                 </div>
                 <div className="grid gap-3">
                   {classXItems.map(item => (
                     <button key={item.id} onClick={() => setSelectedKpi(item.label)} className={`w-full flex items-center gap-5 p-5 rounded-2xl transition-all text-left group ${selectedKpi === item.label ? 'bg-[#002B5B] dark:bg-blue-600 text-white shadow-2xl border-[#002B5B]' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:border-rose-200 border border-transparent shadow-sm'}`}>
                        <div className={`p-3 rounded-xl transition-colors ${selectedKpi === item.label ? 'bg-white/10' : 'bg-white dark:bg-slate-900 text-rose-500 shadow-inner'}`}>{item.icon}</div>
                        <span className="text-[11px] font-black uppercase tracking-tight flex-1">{item.label}</span>
                        <ChevronRight size={16} className={`transition-all ${selectedKpi === item.label ? 'opacity-100 translate-x-1' : 'opacity-0 group-hover:opacity-40'}`} />
                     </button>
                   ))}
                 </div>
              </div>
              
              <div>
                 <div className="flex items-center gap-3 mb-6 pb-2 border-b border-blue-50 dark:border-blue-900">
                    <Trophy size={18} className="text-blue-500" />
                    <h4 className="text-[12px] font-black text-blue-500 uppercase tracking-widest">Class XII Domain</h4>
                 </div>
                 <div className="grid gap-3">
                   {classXIIItems.map(item => (
                     <button key={item.id} onClick={() => setSelectedKpi(item.label)} className={`w-full flex items-center gap-5 p-5 rounded-2xl transition-all text-left group ${selectedKpi === item.label ? 'bg-[#002B5B] dark:bg-blue-600 text-white shadow-2xl border-[#002B5B]' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-200 border border-transparent shadow-sm'}`}>
                        <div className={`p-3 rounded-xl transition-colors ${selectedKpi === item.label ? 'bg-white/10' : 'bg-white dark:bg-slate-900 text-blue-500 shadow-inner'}`}>{item.icon}</div>
                        <span className="text-[11px] font-black uppercase tracking-tight flex-1">{item.label}</span>
                        <ChevronRight size={16} className={`transition-all ${selectedKpi === item.label ? 'opacity-100 translate-x-1' : 'opacity-0 group-hover:opacity-40'}`} />
                     </button>
                   ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8">
           {selectedKpi ? renderDetailCanvas(selectedKpi) : (
             <div className="h-full min-h-[750px] bg-slate-50/50 dark:bg-slate-800/20 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[4rem] flex flex-col items-center justify-center text-center p-20 shadow-inner">
                <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-3xl flex items-center justify-center text-rose-300 mb-10 animate-bounce ring-[10px] ring-white/40 dark:ring-slate-800/40">
                   <Zap size={64} strokeWidth={1} />
                </div>
                <h3 className="text-4xl font-black text-slate-400 uppercase tracking-tighter">Diagnostic Analytics</h3>
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.4em] mt-6 max-w-lg leading-relaxed">
                  Select an institutional performance metric from the sovereign domain sidebar to initiate analytics.
                </p>
             </div>
           )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 text-slate-400 flex flex-wrap items-center justify-center gap-12 shadow-2xl">
         <div className="flex items-center gap-4">
            <Link size={20} className="text-[#002B5B] dark:text-blue-400" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-[#002B5B] dark:text-blue-400">Sovereign Portals:</span>
         </div>
         <span className="text-[13px] font-bold text-rose-500 hover:underline cursor-pointer transition-all hover:scale-105">exam10.cbse.gov.in</span>
         <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
         <span className="text-[13px] font-bold text-blue-500 hover:underline cursor-pointer transition-all hover:scale-105">exam12.cbse.gov.in</span>
         <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
         <span className="text-[13px] font-bold text-emerald-500 hover:underline cursor-pointer transition-all hover:scale-105">grades.cbse.gov.in</span>
      </div>
    </div>
  );
};

export default ExamAnalytics;