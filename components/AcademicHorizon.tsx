
import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Trophy, 
  BookOpen, 
  Microscope, 
  UserSquare2, 
  Award, 
  TrendingUp, 
  Lightbulb, 
  ChevronRight,
  Calculator,
  Languages,
  ArrowLeft,
  Search,
  School,
  FileText
} from 'lucide-react';
import * as Charts from './ExecutiveCharts';
import { academicChallengeData } from '../mockData';

const AcademicHorizon: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [isSyncing, setIsSyncing] = useState(true);

  // Simulate registry handshake on component mount to avoid empty state flash
  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const challenges = [
    { name: "Ganit Challenge", desc: "Class 8, 9 & 10 Math", icon: <Calculator size={20} />, color: "bg-[#FFF9C4]", borderColor: "border-yellow-200", textColor: "text-yellow-900", iconColor: "text-yellow-700" },
    { name: "Reading Challenge", desc: "Regional registrations", icon: <BookOpen size={20} />, color: "bg-[#E3F2FD]", borderColor: "border-blue-200", textColor: "text-blue-900", iconColor: "text-blue-700" },
    { name: "Science Challenge", desc: "Attendance & answers", icon: <Microscope size={20} />, color: "bg-[#FCE4EC]", borderColor: "border-pink-200", textColor: "text-pink-900", iconColor: "text-pink-700" },
    { name: "SAFAL", desc: "Class 5 & 8 Assessment", icon: <Award size={20} />, color: "bg-[#E8EAF6]", borderColor: "border-indigo-200", textColor: "text-indigo-900", iconColor: "text-indigo-700" },
    { name: "Veergatha 2022", desc: "Patriotic Creative Hub", icon: <Award size={20} />, color: "bg-[#FFF3E0]", borderColor: "border-orange-200", textColor: "text-orange-900", iconColor: "text-orange-700" },
  ];

  if (isSyncing) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl text-center gap-6">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Handshaking with Academic Core...</p>
      </div>
    );
  }

  if (selectedChallenge) {
    const data = academicChallengeData[selectedChallenge] || { participation: [], winners: [], summary: [] };
    
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-300 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
           <button 
             onClick={() => setSelectedChallenge(null)}
             className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-black text-xs text-[#002B5B] dark:text-blue-400 uppercase tracking-widest shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
           >
             <ArrowLeft size={18} /> Back to Hub
           </button>
           
           <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shadow-inner no-print">
              <button onClick={() => setViewMode('chart')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'chart' ? 'bg-[#002B5B] dark:bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-blue-600'}`}>Visual</button>
              <button onClick={() => setViewMode('table')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'table' ? 'bg-[#002B5B] dark:bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-blue-600'}`}>Stats</button>
           </div>
        </div>

        <div className="bg-[#002B5B] dark:bg-slate-800 rounded-[3.5rem] p-12 text-white flex items-center gap-10 shadow-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-150">
              <Trophy size={200} />
           </div>
           <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-3xl border border-white/20">
              {challenges.find(c => c.name === selectedChallenge)?.icon || <Trophy size={48} />}
           </div>
           <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic">{selectedChallenge}</h2>
              <p className="text-blue-200 font-black uppercase text-[12px] tracking-[0.4em] mt-4 opacity-80">National Participation & Excellence Report</p>
           </div>
        </div>

        {viewMode === 'chart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-3xl border border-slate-50 dark:border-slate-800 space-y-10">
               <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
                  <h4 className="text-xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight">National Participation Matrix</h4>
                  <div className="px-5 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">Live Data Sync</div>
               </div>
               <div className="min-h-[500px] flex items-center justify-center">
                  <Charts.ExecutiveVerticalBarChart data={data.participation} title="State Wise Participation" yAxisName="Registrations" />
               </div>
            </div>

            <div className="lg:col-span-4 space-y-10">
               <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-50 dark:border-slate-800 flex flex-col items-center">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Outcomes By Domain</h4>
                  <Charts.ExecutiveRadarChart data={data.summary} />
               </div>
               
               <div className="bg-gradient-to-br from-[#0066CC] to-[#002B5B] p-10 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10 rotate-6"><Award size={140} /></div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                     <Trophy size={14} className="text-blue-300" /> TOP PERFORMING SCHOOLS
                  </h4>
                  <div className="space-y-6">
                     {data.winners.map((winner: any, i: number) => (
                       <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-blue-200">#{i+1}</div>
                             <span className="text-[11px] font-black uppercase tracking-tight">{winner.n}</span>
                          </div>
                          <span className="text-lg font-black">{winner.v}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] overflow-hidden shadow-3xl animate-in fade-in duration-500">
             <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                   <tr>
                      <th className="px-10 py-6 text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest">State/Cluster</th>
                      <th className="px-10 py-6 text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-center">Registrations</th>
                      <th className="px-10 py-6 text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-center">Top Performers</th>
                      <th className="px-10 py-6 text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-right">Audit Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                   {data.participation.map((row: any, i: number) => (
                     <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-10 py-5 font-black text-[#002B5B] dark:text-slate-300 uppercase text-xs">{row.n}</td>
                        <td className="px-10 py-5 font-black text-2xl text-blue-600 text-center">{row.v.toLocaleString()}</td>
                        <td className="px-10 py-5 font-black text-lg text-emerald-600 text-center">{row.v2}</td>
                        <td className="px-10 py-5 text-right">
                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-[9px] font-black tracking-widest uppercase">Verified</div>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 font-inter">
      <div className="bg-[#8E24AA] rounded-[3rem] p-16 text-white flex flex-col items-center justify-center gap-4 shadow-3xl relative overflow-hidden text-center border-b-8 border-purple-900/30">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12 scale-150">
           <Trophy size={180} />
        </div>
        <div className="flex items-center gap-6 mb-4">
          <div className="bg-white/20 p-5 rounded-[2rem] shadow-2xl backdrop-blur-3xl border border-white/20">
             <Trophy size={48} />
          </div>
          <h2 className="text-6xl font-black tracking-tighter uppercase italic drop-shadow-lg">Academic Horizon</h2>
        </div>
        <p className="text-purple-100 font-bold text-xl opacity-90 tracking-wide uppercase max-w-2xl leading-relaxed">ASAR Activities, Academic Challenges & Competitive Assessments Command Hub</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 flex flex-col gap-1">
          <div className="bg-[#F3E5F5] dark:bg-purple-900/20 p-8 rounded-t-[3rem] flex items-center gap-4 border-b-4 border-purple-200 dark:border-purple-800 shadow-sm">
            <ClipboardList className="text-purple-700 dark:text-purple-400" size={24} />
            <h3 className="text-lg font-black text-purple-900 dark:text-purple-300 uppercase tracking-tight">ASAR Intelligence</h3>
          </div>
          <div className="bg-white dark:bg-slate-900 flex-1 p-4 flex flex-col border border-slate-100 dark:border-slate-800 shadow-3xl rounded-b-[3rem] overflow-hidden">
            {[
              "Regional Participation Distribution",
              "Institutional Sector Metrics",
              "National Management Feed",
              "State Compliance Sync",
              "Master Activities Registry"
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedChallenge(challenges[idx % challenges.length].name)}
                className="group w-full flex items-center justify-between gap-4 px-8 py-6 text-left border-b border-slate-50 dark:border-slate-800 hover:bg-purple-50 dark:hover:bg-slate-800 transition-all rounded-2xl mb-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-10 bg-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-purple-700 dark:group-hover:text-purple-400 leading-tight">{item}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#E8F5E9] dark:bg-emerald-900/20 p-8 rounded-[3rem] flex items-center gap-4 border-b-4 border-green-200 dark:border-emerald-800 shadow-sm">
            <Trophy className="text-green-700 dark:text-emerald-400" size={24} />
            <h3 className="text-lg font-black text-green-900 dark:text-emerald-300 uppercase tracking-tight">Active Academic Challenges</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {challenges.map((challenge, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedChallenge(challenge.name)}
                className={`${challenge.color} dark:bg-slate-800 p-8 rounded-[2.5rem] border ${challenge.borderColor} dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all group cursor-pointer hover:-translate-y-2 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform scale-125">
                  {challenge.icon}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-white/60 dark:bg-slate-700 flex items-center justify-center ${challenge.iconColor} shadow-inner`}>
                    {challenge.icon}
                  </div>
                  <h4 className={`text-sm font-black uppercase tracking-tight ${challenge.textColor} dark:text-slate-100`}>{challenge.name}</h4>
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-wider opacity-60 ${challenge.textColor} dark:text-slate-400`}>{challenge.desc}</p>
                <div className={`mt-6 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${challenge.textColor} dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity`}>
                   Explore Data <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-1">
          <div className="bg-[#E8EAF6] dark:bg-indigo-900/20 p-8 rounded-t-[3rem] flex items-center gap-4 border-b-4 border-indigo-200 dark:border-indigo-800 shadow-sm">
            <TrendingUp className="text-indigo-700 dark:text-indigo-400" size={24} />
            <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-tight">SAFAL Insights</h3>
          </div>
          <div className="bg-white dark:bg-slate-900 flex-1 p-10 flex flex-col gap-8 border border-slate-100 dark:border-slate-800 shadow-3xl rounded-b-[3rem]">
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest border-l-4 border-indigo-500 pl-4">Core Performance Domains</h4>
              <ul className="space-y-6">
                {[
                  { l: "Participation By Gender", k: "Sovereign Equality Matrix" },
                  { l: "Regional Average Scores", k: "Cluster Benchmark Sync" },
                  { l: "Learning Outcomes - EVS", k: "Pedagogical Compliance" },
                  { l: "LO - Language & Math", k: "Foundation Literacy Index" }
                ].map((item, i) => (
                  <li key={i} className="group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 group-hover:scale-150 transition-transform"></div>
                      <div>
                        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors block">{item.l}</span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">{item.k}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto bg-[#E8EAF6]/50 dark:bg-indigo-900/10 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800 flex flex-col gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                 <Lightbulb className="text-yellow-600 shrink-0" size={20} />
                 <p className="text-[10px] font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest">S³ Policy Objective</p>
              </div>
              <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-widest">Identify institutional learning gaps to facilitate targeted regional interventions via the OASIS Decision Engine.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicHorizon;
