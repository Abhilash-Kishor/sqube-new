import React, { useMemo, useState, useEffect, useRef } from 'react';
import Dashboard from './Dashboard';
import SchoolAnalytics from './SchoolAnalytics';
import GISMap from './GISMap';
import GradeAnalytics from './GradeAnalytics';
import SportsAnalytics from './SportsAnalytics';
import ExamAnalytics from './ExamAnalytics';
import AcademicHorizon from './AcademicHorizon';
import AffiliationAnalytics from './AffiliationAnalytics';
import InfrastructureAnalytics from './InfrastructureAnalytics';
import EnvironmentAnalytics from './EnvironmentAnalytics';
import { 
  Sparkles, BrainCircuit, ChevronDown, ChevronUp, RefreshCw, 
  AlertCircle, FileCheck, BrainCircuit as BrainIcon, Trophy
} from 'lucide-react';
import { getAIInsight } from '../services/geminiService';
import { Language, Theme } from '../types';

interface ModuleViewProps {
  activeTab: string;
  activeSubTab: string;
  setActiveSubTab: (id: string) => void;
  language?: Language;
  region?: string;
  schoolType?: string;
  theme?: Theme;
}

const ModuleView: React.FC<ModuleViewProps> = ({ 
  activeTab, activeSubTab, setActiveSubTab, language = 'en', region = 'All India', schoolType = 'Independent', theme = 'light' 
}) => {
  const [briefing, setBriefing] = useState<string | null>(null);
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);
  const [isBriefingExpanded, setIsBriefingExpanded] = useState(true);
  const [syncError, setSyncError] = useState(false);
  const lastRequestRef = useRef<string>("");

  useEffect(() => {
    let isMounted = true;
    const requestKey = `${activeTab}-${activeSubTab}-${region}-${language}`;
    
    if (lastRequestRef.current === requestKey) return;

    const timer = setTimeout(async () => {
      if (!isMounted) return;
      
      lastRequestRef.current = requestKey;
      setIsBriefingLoading(true);
      setSyncError(false);
      
      try {
        const summary = `Executive View: ${activeTab}, Module: ${activeSubTab}, Geo: ${region}, Filter: ${schoolType}`;
        const text = await getAIInsight(`${activeTab} ${activeSubTab}`, summary, language as Language);
        
        if (isMounted) {
          setBriefing(text);
          setSyncError(text.includes("deferred") || text.includes("stabilizing"));
        }
      } catch (e: any) {
        if (isMounted) {
          console.error("Briefing Sync Error:", e?.message || "Channel timeout");
          setSyncError(true);
        }
      } finally {
        if (isMounted) setIsBriefingLoading(false);
      }
    }, 2000); 

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [activeTab, activeSubTab, language, region, schoolType]);

  const renderBriefing = () => (
    <div className={`mb-10 p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-50 shadow-xl'}`}>
      <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles size={120} /></div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${syncError ? 'bg-amber-500' : 'bg-blue-600'}`}>
            {isBriefingLoading ? <RefreshCw size={24} className="animate-spin" /> : <BrainCircuit size={24} />}
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {syncError ? 'Optimizer Active' : 'National Intelligence Brief'}
            </h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              {isBriefingLoading ? 'Refining National Insights...' : 'OASIS Registry Analysis'}
            </p>
          </div>
        </div>
        <button onClick={() => setIsBriefingExpanded(!isBriefingExpanded)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
          {isBriefingExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isBriefingExpanded && (
        <div className="animate-in fade-in slide-in-from-top-2">
          {isBriefingLoading ? (
            <div className="space-y-3 py-4">
              <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2 animate-pulse"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-5xl italic">
                {briefing || "Initializing intelligence handshake..."}
              </p>
              {syncError && (
                <div className="flex items-center gap-2 mt-2 text-[10px] text-amber-600 font-black uppercase tracking-widest">
                  <AlertCircle size={12} />
                  <span>Sync optimization in progress to preserve bandwidth</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderPlaceholder = (title: string, icon: React.ReactNode) => (
    <div className="bg-white dark:bg-slate-900 p-24 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl flex flex-col items-center justify-center text-center gap-8">
      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-blue-500 animate-pulse">
        {icon}
      </div>
      <h2 className="text-4xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight italic">Registry Handshake</h2>
      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Awaiting {title} Telemetry Sync from National Core...</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <Dashboard language={language as Language} activeSubTab={activeSubTab} region={region} schoolType={schoolType} />;
      case 'school': 
        return <SchoolAnalytics activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} region={region} />;
      case 'academic_horizon':
        return <AcademicHorizon />;
      case 'sports': 
        return <SportsAnalytics activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} region={region} />;
      case 'exam': 
        return <ExamAnalytics region={region} activeSubTab={activeSubTab} theme={theme} />;
      case 'infrastructure':
        return <InfrastructureAnalytics activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} region={region} />;
      case 'environment': 
        return <EnvironmentAnalytics activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} theme={theme} />;
      case 'affiliation':
        return <AffiliationAnalytics activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} region={region} />;
      case 'result': 
        if (activeSubTab === 'grades') return <GradeAnalytics />;
        return <ExamAnalytics region={region} activeSubTab={activeSubTab} initialFocus={activeSubTab === 'class10' ? 'X' : 'XII'} theme={theme} />;
      default: 
        return renderPlaceholder("Module Sync", <BrainIcon size={40} />);
    }
  };

  return (
    <div className="w-full pb-20 animate-in fade-in duration-700">
      {renderBriefing()}
      {renderContent()}
    </div>
  );
};

export default ModuleView;