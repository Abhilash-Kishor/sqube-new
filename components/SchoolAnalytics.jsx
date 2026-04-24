
import React, { useMemo, useState } from 'react';
import { 
  ChevronRight, School, Globe, LayoutGrid, FileText, X
} from 'lucide-react';
import GISMap from './GISMap';
import DistanceTool from './DistanceTool';
import { MODULE_DEFINITIONS } from '../constants';
import { dashboardData } from '../mockData';
import * as Charts from './ExecutiveCharts';

const SchoolAnalytics = ({ activeSubTab, setActiveSubTab, region = 'All India' }) => {
  const [viewMode, setViewMode] = useState('chart');
  
  const currentModule = MODULE_DEFINITIONS.find(m => m.id === 'school');
  const subTabs = currentModule?.subTabs || [];
  
  const currentData = useMemo(() => {
    if (!dashboardData || !dashboardData.regions) return dashboardData?.default || {};
    const regionData = dashboardData.regions[region] || dashboardData.regions['All India'];
    return { ...dashboardData.default, ...regionData };
  }, [region]);

  const renderAuditControls = (label) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4 mb-8">
       <div className="space-y-1">
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Institutional Audit Command</p>
          <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-tight leading-none">{label}</h3>
       </div>
       <div className="flex flex-wrap gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
             <button onClick={() => setViewMode('chart')} className={`px-5 py-2 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'chart' ? 'bg-[#002B5B] text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>
                Visual
             </button>
             <button onClick={() => setViewMode('table')} className={`px-5 py-2 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase transition-all ${viewMode === 'table' ? 'bg-[#002B5B] text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>
                Stats
             </button>
          </div>
          <button onClick={() => window.print()} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-all"><FileText size={18} /></button>
       </div>
    </div>
  );

  const renderDataDisplay = (label, data = [], chartType = 'radar') => (
    <div id="printable-report" className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8 animate-in slide-in-from-bottom-3 duration-500 min-h-[650px]">
      {renderAuditControls(label)}
      {viewMode === 'chart' ? (
        <div className="min-h-[550px] w-full flex flex-col items-center justify-center bg-slate-50/10 rounded-[2rem] border border-dashed border-slate-100 p-4">
          {chartType === 'radar' && <Charts.ExecutiveRadarChart data={data} />}
          {chartType === 'bar' && <Charts.ExecutiveVerticalBarChart data={data} title="Institutional Comparison" yAxisName="Units" />}
          {chartType === 'donut' && <Charts.ExecutiveDonutChart data={data.slice(0, 8)} />}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-xl max-h-[600px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 z-10">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-[#002B5B] tracking-widest">Cluster ID</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-[#002B5B] tracking-widest">Aggregate</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-[#002B5B] tracking-widest">Maturity</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-[#002B5B] tracking-widest">Feed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-black text-[#002B5B] uppercase text-[10px]">{item.n || item.level}</td>
                  <td className="px-6 py-4 font-black text-xl text-blue-600">{item.v?.toLocaleString() || 'Synced'}</td>
                  <td className="px-6 py-4 font-bold text-slate-500 text-[9px] uppercase tracking-widest">Tier { (i % 5) + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-emerald-600 font-black text-[8px] uppercase tracking-widest">Active</span>
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

  const renderContent = () => {
    switch (activeSubTab) {
      case 'quick_facts':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner"><School size={24} /></div>
                   <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-tight">Density Hub</h3>
                </div>
                <div className="space-y-3">
                  {[{ label: 'Institutional Matrix', id: 'level_type' }, { label: 'Balvatika Sync', id: 'balvatika' }, { label: 'Spatial Geo Hub', id: 'land' }].map((item, i) => (
                    <button key={i} onClick={() => setActiveSubTab?.(item.id)} className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-xl border border-slate-100 group/btn hover:bg-[#002B5B] hover:text-white transition-all shadow-sm">
                       <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                       <ChevronRight size={16} className="text-slate-300 group-hover/btn:text-white" />
                    </button>
                  ))}
                </div>
              </div>
              <div onClick={() => setActiveSubTab?.('teacher_details')} className="bg-[#FFF9F2] rounded-[2.5rem] p-8 border border-[#FFE8CC] shadow-2xl border-l-[12px] border-l-[#FF9933] cursor-pointer hover:-translate-y-1 transition-all group overflow-hidden relative">
                <div className="flex items-center gap-4 mb-6"><h3 className="text-xl font-black text-[#8B4513] uppercase tracking-tight">Faculty Hub</h3></div>
                <div className="p-6 bg-white/60 rounded-[1.5rem] backdrop-blur-xl shadow-inner inline-block"><span className="text-5xl font-black text-[#8B4513] tracking-tighter">1.34M</span></div>
                <p className="mt-6 text-[10px] font-black text-orange-800 uppercase tracking-widest opacity-60">Verified Core Staff</p>
              </div>
              <div onClick={() => setActiveSubTab?.('student_details')} className="bg-[#FFF0F5] rounded-[2.5rem] p-8 border border-[#FFD1DC] shadow-2xl border-l-[12px] border-l-[#EC4899] cursor-pointer hover:-translate-y-1 transition-all group overflow-hidden relative">
                <div className="flex items-center gap-4 mb-6"><h3 className="text-xl font-black text-[#9D174D] uppercase tracking-tight">Student Hub</h3></div>
                <div className="p-6 bg-white/60 rounded-[1.5rem] backdrop-blur-xl shadow-inner inline-block"><span className="text-5xl font-black text-[#9D174D] tracking-tighter">2.84Cr</span></div>
                <p className="mt-6 text-[10px] font-black text-rose-800 uppercase tracking-widest opacity-60">Total Enrollment Registry</p>
              </div>
            </div>
          </div>
        );
      case 'level_type': return renderDataDisplay('Management Sector Matrix', currentData.management, 'donut');
      case 'balvatika': return renderDataDisplay('Foundation Literacy Sync', currentData.balvatika_breakdown, 'bar');
      case 'land': return renderDataDisplay('Institutional Geo-Spatial Area', currentData.land_area, 'radar');
      case 'ssr': return renderDataDisplay('National SSR Index', currentData.ssr_data, 'bar');
      case 'tsr': return renderDataDisplay('National TSR Index', currentData.tsr_data, 'bar');
      case 'student_details': return renderDataDisplay('Enrolment Pyramid Analytics', currentData.student_class_strength, 'radar');
      case 'teacher_details': return renderDataDisplay('Faculty Classification Metrics', currentData.teacher_type, 'bar');
      case 'sqaaf': return renderDataDisplay('SQAAF Maturity Index', currentData.sqaaf_maturity, 'bar');
      case 'gis': return <GISMap />;
      case 'distance': return <DistanceTool />;
      default: return (
          <div className="bg-white p-24 rounded-[3rem] border border-slate-100 shadow-3xl flex flex-col items-center justify-center text-center gap-8">
            <Globe size={64} className="text-blue-500 animate-pulse" />
            <h2 className="text-4xl font-black text-[#002B5B] uppercase tracking-tight">Syncing Registry</h2>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Awaiting Handshake from OASIS Core API...</p>
          </div>
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-white rounded-[2.5rem] shadow-3xl border border-slate-100 sticky top-32 overflow-hidden group">
           <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/40">
              <LayoutGrid size={20} className="text-blue-600" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Panorama Hub</p>
           </div>
           <nav className="p-6 space-y-2">
              {subTabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveSubTab?.(tab.id)} 
                  className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeSubTab === tab.id 
                    ? 'bg-[#002B5B] text-white shadow-xl border-[#002B5B] translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </nav>
        </div>
      </aside>
      <div className="flex-1 space-y-10 min-w-0">
        <div className="bg-gradient-to-br from-[#0066CC] to-[#002B5B] rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-3xl relative overflow-hidden border-b-[8px] border-blue-900/30">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12 scale-110"><School size={260} /></div>
           <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-xl group"><School size={48} className="text-white group-hover:scale-105 transition-transform" /></div>
           <div className="relative z-10 space-y-2">
              <h2 className="text-5xl font-black tracking-tighter uppercase leading-none italic drop-shadow-lg">School Panorama</h2>
              <p className="text-blue-200 font-bold text-xl opacity-90 tracking-tight">OASIS Institutional Intelligence Engine</p>
           </div>
        </div>
        <div className="min-h-[650px]">
          <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/20 shadow-inner mb-10">
            <h4 className="text-2xl font-black mb-12 border-b border-white/10 pb-6 flex items-center gap-3">
              <Globe className="text-cyan-400" size={28} /> National Institutional Footprint
            </h4>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAnalytics;
