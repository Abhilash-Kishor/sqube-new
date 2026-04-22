
import React, { useState, useEffect, useRef } from 'react';
import { GRADES, STATE_PERFORMANCE, CBSE_REGIONS, SCHOOL_TYPES } from '../constants';
import { 
  LayoutDashboard, 
  Filter, 
  Download, 
  Maximize2, 
  ChevronDown,
  Sparkles,
  TrendingUp,
  TrendingDown,
  BookOpen
} from 'lucide-react';
import * as Charts from './ExecutiveCharts';

interface GradeAnalyticsProps {
  language?: 'en' | 'hi';
}

const GradeAnalytics: React.FC<GradeAnalyticsProps> = ({ language = 'en' }) => {
  const [selectedClass, setSelectedClass] = useState<'X' | 'XII'>('X');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for Grade Tiles
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollMax = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    const interval = setInterval(() => {
      scrollAmount += 1;
      if (scrollAmount >= scrollMax) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Top Section with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex bg-white p-1.5 rounded-2xl shadow-lg border border-slate-100 ring-4 ring-slate-50">
          <button 
            onClick={() => setSelectedClass('X')}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all ${selectedClass === 'X' ? 'bg-[#002B5B] text-white shadow-xl shadow-blue-200' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Class X
          </button>
          <button 
            onClick={() => setSelectedClass('XII')}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all ${selectedClass === 'XII' ? 'bg-[#002B5B] text-white shadow-xl shadow-blue-200' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Class XII
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl font-black text-[10px] text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/20">
            <Sparkles size={16} className="text-[#0066CC]" />
            AI Grade Insight
          </button>
          <button className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl font-black text-[10px] text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/20">
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-[#002B5B] to-[#004080] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12 scale-150">
          <BookOpen size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-200 font-black uppercase tracking-[0.3em] text-xs">
              <span className="w-10 h-1.5 bg-blue-400 rounded-full"></span>
              Competitive Intelligence
            </div>
            <h2 className="text-5xl font-black tracking-tighter leading-none">Class {selectedClass} - National Grade Analytics</h2>
            <p className="text-blue-100 font-medium text-lg max-w-2xl opacity-80">
              Longitudinal performance comparison spanning academic cycles 2023-2025. Standardized against national pedagogical benchmarks.
            </p>
          </div>
          <div className="flex items-center gap-3 text-white font-black bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer">
            <Maximize2 size={18} />
            Interactive Map Sync
          </div>
        </div>
      </div>

      {/* Filter Row with Functional Selects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-3 group hover:border-blue-100 transition-all">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Filter size={14}/> Academic Cycle
          </label>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-black text-[10px] text-[#002B5B] uppercase tracking-widest outline-none appearance-none cursor-pointer group-hover:bg-white transition-all shadow-inner">
              <option>2023 - 2025 (Synced)</option>
              <option>2020 - 2022</option>
              <option>2017 - 2019</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={16} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-3 group hover:border-blue-100 transition-all">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            Institutional Type
          </label>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-black text-[10px] text-[#002B5B] uppercase tracking-widest outline-none appearance-none cursor-pointer group-hover:bg-white transition-all shadow-inner">
              <option>All Types</option>
              {SCHOOL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={16} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-3 group hover:border-blue-100 transition-all">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            Regional Zone
          </label>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-black text-[10px] text-[#002B5B] uppercase tracking-widest outline-none appearance-none cursor-pointer group-hover:bg-white transition-all shadow-inner">
              <option>All National Clusters</option>
              {CBSE_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={16} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-3 group hover:border-blue-100 transition-all">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            Primary Subject
          </label>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-black text-[10px] text-[#002B5B] uppercase tracking-widest outline-none appearance-none cursor-pointer group-hover:bg-white transition-all shadow-inner">
              <option>Mathematics Standard (041)</option>
              <option>Science (086)</option>
              <option>Social Science (087)</option>
              <option>English Lang & Lit (184)</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Horizontal Grade Scroll with Auto-Scroll functionality */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth"
      >
        {GRADES.map((grade) => (
          <div 
            key={grade.grade} 
            className="min-w-[320px] bg-white p-8 rounded-[3rem] shadow-xl border-t-[10px] border-slate-100 hover:shadow-2xl transition-all cursor-default group snap-start"
            style={{ borderTopColor: grade.color }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="text-lg font-black text-[#002B5B] uppercase tracking-[0.3em]">{grade.grade}</div>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all shadow-inner">
                <LayoutDashboard size={18} />
              </div>
            </div>
            
            <div className="space-y-6">
              {grade.history.map((record, index) => {
                const previous = grade.history[index + 1];
                const diff = previous ? record.count - previous.count : 0;
                const isUp = diff > 0;
                
                return (
                  <div key={record.year} className="flex items-center justify-between gap-6 group/row">
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${index === 0 ? 'text-[#0066CC]' : 'text-slate-400'}`}>
                        Session {record.year}
                      </span>
                      <span className={`text-2xl font-black tracking-tighter ${index === 0 ? 'text-[#002B5B]' : 'text-slate-600'}`}>
                        {record.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-black text-slate-500">{record.percentage}%</span>
                      {previous && (
                        <span className={`flex items-center gap-1 text-[10px] font-black tracking-tight ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {isUp ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                          {Math.abs(diff).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50 flex gap-2">
              {grade.history.map((record, idx) => (
                 <div 
                  key={record.year}
                  className="flex-1 h-2 rounded-full overflow-hidden bg-slate-100 shadow-inner"
                 >
                   <div 
                      className={`h-full transition-all duration-1000 ${idx === 0 ? 'bg-blue-600' : 'bg-slate-300'}`}
                      style={{ width: `${(record.count / Math.max(...grade.history.map(h => h.count))) * 100}%` }}
                   />
                 </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Performance Chart - Updated to ECharts */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50">
        <Charts.ExecutiveStackedBarChart data={STATE_PERFORMANCE} />
      </div>
    </div>
  );
};

export default GradeAnalytics;
