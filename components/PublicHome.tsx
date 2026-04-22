import React from 'react';
import SpatialEcosystemMap from './SpatialEcosystemMap';
import { 
  ArrowRight, ShieldCheck, Globe, Layers, 
  School, ChevronRight, Activity, Target, 
  BookOpen, Award, Users, Landmark,
  LineChart, Sparkles, Building2, Map, ShieldAlert,
  Database, Zap, Cpu, Brain, Cloud, Bot, MousePointer2,
  Lock, Share2, TrendingUp, SearchCode, FileQuestion, Users2
} from 'lucide-react';

interface PublicHomeProps {
  onLoginClick: (institution: 'cbse' | 'nvs' | 'kvs') => void;
}

const PublicHome: React.FC<PublicHomeProps> = ({ onLoginClick }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'OASIS Snapshot', id: 'oasis' },
    { name: 'Intelligence Pillars', id: 'pillars' },
    { name: 'Institutions', id: 'ecosystem' },
    { name: 'Features', id: 'features' }
  ];

  const strategicStats = [
    { label: 'Registered Institutions', value: '30,124', sub: 'National Affiliation Fabric', icon: <Database className="text-white transition-colors" /> },
    { label: 'Quality Framework', value: 'SQAAF', sub: 'Institutional Maturity Index', icon: <Award className="text-white transition-colors" /> },
    { label: 'Learning Outcomes', value: 'SAFAL', sub: 'Growth Tracking Synchronized', icon: <Target className="text-white transition-colors" /> },
  ];

  const intelligencePillars = [
    { 
      title: 'Question Paper Analysis', 
      desc: 'Psychometric evaluation of Bloom\'s Taxonomy alignment and difficulty index across subject sets.', 
      icon: <FileQuestion className="text-blue-500" size={32} />,
      accent: 'border-blue-200 bg-blue-50/50'
    },
    { 
      title: 'Left Out Analysis', 
      desc: 'Precision tracking of student transition churn between Class X and XI across national clusters.', 
      icon: <Users2 className="text-emerald-500" size={32} />,
      accent: 'border-emerald-200 bg-emerald-50/50'
    },
    { 
      title: 'Drop Out Prediction', 
      desc: 'AI-driven early warning system identifying high-risk students based on longitudinal registry data.', 
      icon: <ShieldAlert className="text-rose-500" size={32} />,
      accent: 'border-rose-200 bg-rose-50/50'
    }
  ];

  const ecosystemMatrix = [
    { name: 'CBSE Schools', full: 'Affiliated Private & Govt Network', count: '30,124' },
    { name: 'KVS', full: 'Kendriya Vidyalaya Network', count: '1,254' },
    { name: 'NVS', full: 'Navodaya Vidyalaya Samiti', count: '661' },
  ];

  const loginTypes = [
    { id: 'cbse' as const, name: 'CBSE', desc: 'Sovereign Institutional Hub', icon: <School size={40} className="text-[#003366] group-hover:text-white transition-colors" /> },
    { id: 'nvs' as const, name: 'NVS', desc: 'Navodaya Vidyalaya Hub', icon: <Landmark size={40} className="text-[#FF9933] group-hover:text-white transition-colors" /> },
    { id: 'kvs' as const, name: 'KVS', desc: 'Kendriya Vidyalaya Hub', icon: <Building2 size={40} className="text-[#006633] group-hover:text-white transition-colors" /> },
  ];

  const screenshotFeatures = [
    { title: 'Perceptual Deduplication', icon: <SearchCode />, color: 'from-cyan-700 to-blue-900', desc: 'Advanced image-hashing to ensure registry integrity and unique records.' },
    { title: 'Real-Time Data Analysis', icon: <Cpu />, color: 'from-blue-700 to-blue-900', desc: 'Distilling raw institutional streams into live metrics.' },
    { title: 'AI/ML Forecasting', icon: <Brain />, color: 'from-indigo-600 to-blue-900', desc: 'Predictive modeling for student performance and attrition trends.' },
    { title: 'Cloud-Scale Infra', icon: <Cloud />, color: 'from-blue-800 to-indigo-950', desc: 'Sovereign cloud infrastructure for the national student database.' },
    { title: 'Role Based Governance', icon: <Users />, color: 'from-blue-500 to-indigo-700', desc: 'Secure multi-level access control for national leadership.' },
    { title: 'Automated Diagnostic', icon: <Bot />, color: 'from-purple-800 to-blue-950', desc: 'AI-driven reporting for regional policy identification.' },
    { title: 'Bank-Grade Security', icon: <Lock />, color: 'from-indigo-900 to-blue-900', desc: 'Military-grade encryption for all sensitive PII data.' },
    { title: 'Full Interoperability', icon: <Share2 />, color: 'from-blue-900 to-purple-800', desc: 'Seamless data exchange across NDEAR & NIC modules.' },
    { title: 'Deep Granularity', icon: <MousePointer2 />, color: 'from-blue-600 to-indigo-800', desc: 'Interactive drill-downs from national to cluster level.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-[#002B5B] selection:bg-[#FFDAB9] scroll-smooth font-inter">
      {/* Official Top Bar */}
      <div className="bg-[#002B5B] text-white py-1.5 px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest whitespace-nowrap overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          <span>Government of India</span>
          <span className="opacity-50">|</span>
          <span>Central Board of Secondary Education</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <button className="hover:underline">Screen Reader Access</button>
          <span className="opacity-50">|</span>
          <button className="hover:underline">English / हिन्दी</button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://www.cbse.gov.in/cbsenew/img/cbse-logo.png" 
              alt="CBSE Logo" 
              className="h-14 w-auto"
            />
            <div className="border-l border-slate-200 pl-4 hidden sm:block">
              <h1 className="text-xl font-black text-[#002B5B] tracking-tighter leading-none">सागर से साराांश</h1>
              <p className="text-[9px] font-black text-[#0066CC] uppercase tracking-[0.2em] mt-1.5">CBSE Strategic IT Hub</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)}
                className="text-[11px] font-black text-slate-500 hover:text-[#002B5B] transition-colors uppercase tracking-[0.12em] border-b-2 border-transparent hover:border-[#002B5B] pb-1 whitespace-nowrap"
              >
                {link.name}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollToSection('access')}
            className="px-8 py-3 bg-[#002B5B] text-white rounded font-black text-[10px] hover:bg-[#004080] transition-all shadow-md flex items-center gap-2 uppercase tracking-[0.15em] shrink-0"
          >
            Access Hub <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
           <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] bg-[#0066CC]/5 rounded-full blur-[120px]"></div>
           <div className="absolute top-[10%] -left-[10%] w-[50%] h-[70%] bg-[#FF9933]/10 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100 shadow-sm animate-fade-in">
              <Sparkles size={16} className="text-[#0066CC]" />
              <span className="text-[10px] font-black text-[#0066CC] uppercase tracking-[0.25em]">S³ Strategic Decision Engine</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-[4.5rem] font-black text-[#002B5B] tracking-tighter leading-[0.9] drop-shadow-sm">
                National <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#002B5B] via-[#0066CC] to-[#1E40AF]">Strategic Intelligence.</span>
              </h2>
              <div className="h-2 w-32 bg-gradient-to-r from-[#FF9933] to-[#FFCC66] rounded-full"></div>
            </div>

            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl border-l-8 border-[#0066CC] pl-8 py-3 bg-white/40 backdrop-blur-sm rounded-r-2xl shadow-sm border-y border-r border-blue-50/50">
              Sagar se Saransh (S³) transforms the vast <b>OASIS</b> national repository into precise, actionable diagnostic tools for India's educational leadership.
            </p>

            <div className="flex flex-wrap gap-6 pt-6">
               <button onClick={() => scrollToSection('access')} className="px-12 py-6 bg-gradient-to-br from-[#002B5B] to-[#1E40AF] text-white rounded-2xl font-black text-sm shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all flex items-center gap-4 uppercase tracking-widest group">
                 Launch Command Center <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </button>
               <button onClick={() => scrollToSection('pillars')} className="px-12 py-6 bg-white text-[#002B5B] border-2 border-slate-100 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-50 transition-all uppercase tracking-widest">
                 View Analytics Pillars
               </button>
            </div>
          </div>

          <div id="oasis" className="relative">
            <div className="bg-gradient-to-br from-[#002B5B] to-[#0066CC] p-10 rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,43,91,0.3)] border border-blue-400/20 relative z-10 text-white">
               <div className="flex items-center justify-between mb-12">
                  <h4 className="text-xs font-black text-blue-100 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                    Live OASIS Telemetry
                  </h4>
                  <Activity size={24} className="text-blue-200 animate-pulse" />
               </div>
               <div className="space-y-12">
                  {strategicStats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-8 group cursor-pointer">
                       <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-[#002B5B] transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-1">
                          {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 36, className: "group-hover:text-[#002B5B] transition-colors" })}
                       </div>
                       <div className="space-y-1">
                          <p className="text-4xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</p>
                          <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">{stat.label}</p>
                          <p className="text-[9px] font-black text-white mt-2 opacity-90 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full inline-block border border-white/10">{stat.sub}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Strategic Pillars Section */}
      <section id="pillars" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h3 className="text-4xl font-black text-[#002B5B] tracking-tight">Strategic Intelligence Pillars</h3>
             <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.3em]">Advanced Diagnostic Capabilities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {intelligencePillars.map((pillar, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border-2 transition-all hover:scale-[1.02] shadow-xl ${pillar.accent}`}>
                <div className="mb-8">{pillar.icon}</div>
                <h4 className="text-2xl font-black text-[#002B5B] mb-4 tracking-tight">{pillar.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium mb-10">{pillar.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-[#002B5B] uppercase tracking-widest">
                  Active in S³ Dashboard <ArrowRight size={14} className="text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National GIS Landscape Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
              <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-blue-100 italic">
                    <Globe size={12} /> Spatial Registry Systems
                 </div>
                 <h3 className="text-4xl lg:text-5xl font-black text-[#002B5B] tracking-tight">National Institutional <br/><span className="text-blue-600">GIS Presence.</span></h3>
                 <p className="text-slate-500 font-bold max-w-xl leading-relaxed">
                    Interactive geographic distribution of affiliated institutions across the Indian subcontinent.Distilling national spatial data into actionable regional insights.
                 </p>
              </div>
              
              <div className="flex gap-4">
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center min-w-[140px]">
                    <span className="text-2xl font-black text-[#002B5B]">36</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">States & UTs</span>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center min-w-[140px]">
                    <span className="text-2xl font-black text-blue-600">100%</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Registry Sync</span>
                 </div>
              </div>
           </div>

           <SpatialEcosystemMap />

           <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src="https://www.digitalindia.gov.in/img/di-logo.png" alt="Digital India" className="h-10 w-auto" />
              <img src="https://www.nic.in/wp-content/uploads/2021/04/NIC_Final_Logo.png" alt="NIC" className="h-8 w-auto" />
              <img src="https://www.mygov.in/sites/all/themes/mygov/images/mygov_logo_footer.png" alt="MyGov" className="h-10 w-auto" />
           </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
             <h3 className="text-5xl font-black text-[#002B5B] text-center mb-20 tracking-tight">S³ Core Ecosystem Features</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {screenshotFeatures.map((f, i) => (
                  <div key={i} className="flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-50 group">
                    <div className={`flex-1 min-h-[160px] bg-gradient-to-br ${f.color} flex flex-col items-center justify-center p-8 text-center`}>
                      <div className="text-white/40 group-hover:text-white transition-all duration-500 scale-125 mb-4">
                        {React.cloneElement(f.icon as React.ReactElement<any>, { size: 64, strokeWidth: 1.2 })}
                      </div>
                      <p className="text-[10px] text-white/0 group-hover:text-white/90 font-bold transition-all duration-500 leading-tight uppercase tracking-widest">
                        {f.desc}
                      </p>
                    </div>
                    <div className="bg-[#E3F2FD] py-5 px-3 text-center border-t border-[#66B2FF]/20 min-h-[60px] flex items-center justify-center">
                      <span className="text-[11px] font-black text-[#002B5B] uppercase tracking-widest leading-tight block">{f.title}</span>
                    </div>
                  </div>
                ))}
             </div>
        </div>
      </section>

      {/* Access Hub */}
      <section id="access" className="py-24 bg-[#002B5B] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-10 flex items-center justify-center text-[#002B5B] shadow-2xl">
            <ShieldCheck size={40} />
          </div>
          <h3 className="text-6xl font-black text-white tracking-tighter mb-4">Secure Access Portal</h3>
          <p className="text-xl text-blue-200 font-medium mb-16 max-w-2xl mx-auto">
            Authorized multi-factor authentication for CBSE, NVS, and KVS administrative domains.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loginTypes.map((login, idx) => (
               <button 
                key={idx}
                onClick={() => onLoginClick(login.id)}
                className="group flex flex-col items-center gap-8 p-12 bg-white/10 backdrop-blur-xl border-2 border-white/10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 text-center hover:bg-white"
               >
                 <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-blue-50">
                    {login.icon}
                 </div>
                 <div>
                    <h4 className="text-3xl font-black mb-2 transition-colors group-hover:text-[#002B5B] text-white">{login.name}</h4>
                    <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest transition-colors group-hover:text-blue-600 text-blue-100">{login.desc}</p>
                 </div>
                 <div className="mt-4 px-12 py-5 bg-white group-hover:bg-[#002B5B] group-hover:text-white text-[#002B5B] rounded-2xl font-black text-[10px] transition-all uppercase tracking-[0.25em] shadow-lg">
                   Secure Login
                 </div>
               </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white text-[#002B5B]/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-5">
              <img 
                src="https://www.cbse.gov.in/cbsenew/img/cbse-logo.png" 
                alt="CBSE Logo Footer" 
                className="h-16 w-auto"
              />
              <div>
                <span className="font-black text-[#002B5B] block text-xl leading-none uppercase tracking-tight">सागर से साराांश</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0066CC] mt-1.5">CBSE Strategic IT Unit</span>
              </div>
            </div>
            <p className="text-[11px] font-medium leading-relaxed max-w-sm">
              S³ is a sovereign decision support system engineered by the IT Department, CBSE, empowering governance through high-fidelity data storytelling.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[11px] font-black text-[#002B5B] uppercase tracking-[0.3em]">Governance Links</h5>
            <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">NDEAR Integration</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">NIC Data Hub</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Digital India</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              © 2026 Designed & Developed by IT Department, CBSE.
            </p>
            <p className="text-[9px] font-bold text-slate-300 mt-1 uppercase tracking-widest">
              Central Board of Secondary Education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;