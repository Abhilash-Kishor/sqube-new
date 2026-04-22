
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Download, 
  FileText, 
  ChevronDown, 
  Maximize2, 
  X,
  Target,
  BarChart3
} from 'lucide-react';

interface ResultAtGlanceProps {
  region: string;
  theme?: 'light' | 'dark';
}

const ResultAtGlance: React.FC<ResultAtGlanceProps> = ({ theme = 'light' }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedState] = useState('GUJARAT');

  // Metrics from the image
  const metrics = [
    { label: 'Total Students', value: '23,81,448', year: '2025', icon: <Users size={20} />, color: 'bg-[#5D5FEF]' },
    { label: 'Male Students', value: '56.4%', subValue: 'Count: 13,43,162', year: '2025', icon: <UserPlus size={20} />, color: 'bg-[#4B9EFE]' },
    { label: 'Female Students', value: '43.6%', subValue: 'Count: 10,38,286', year: '2025', icon: <UserCheck size={20} />, color: 'bg-[#EB5757]' },
  ];

  const gradeDistribution = [
    { grade: 'Excellent', range: '91-100 %', percentage: '7.48%', count: '1,78,078', color: 'bg-[#5D5FEF]' },
    { grade: 'Very Good', range: '81-90 %', percentage: '16.81%', count: '4,00,334', color: 'bg-[#5359C5]' },
    { grade: 'Good', range: '71-80 %', percentage: '18.02%', count: '4,29,114', color: 'bg-[#474CB3]' },
    { grade: 'Satisfactory', range: '61-70 %', percentage: '19.26%', count: '4,58,615', color: 'bg-[#3C419E]' },
    { grade: 'Average', range: '51-60 %', percentage: '20.27%', count: '4,82,653', color: 'bg-[#313589]' },
    { grade: 'Below Average', range: '41-50 %', percentage: '14.45%', count: '3,44,229', color: 'bg-[#2A2E78]' },
    { grade: 'Poor', range: '33-40 %', percentage: '2.76%', count: '65,612', color: 'bg-[#232767]' },
    { grade: 'Failed', range: '0-32 %', percentage: '0.92%', count: '21,972', color: 'bg-[#1C2056]' },
  ];

  const resultStats = [
    { label: 'Absent', percentage: '0.54%', count: '12,769', color: 'bg-[#F2709C]' },
    { label: 'Compartment', percentage: '5.86%', count: '1,39,523', color: 'bg-[#FE9496]' },
    { label: 'Pass', percentage: '93.25%', count: '22,20,602', color: 'bg-[#6FCF97]' },
    { label: 'Fail', percentage: '0.32%', count: '7,679', color: 'bg-[#EB5757]' },
  ];

  const statePerformanceData = [
    { name: 'ARUNACHAL PRADESH', value: 50.57 },
    { name: 'ASSAM', value: 69.34 },
    { name: 'A&N ISLANDS', value: 72.83 },
    { name: 'ANDHRA PRADESH', value: 64.75 },
    { name: 'BIHAR', value: 54.34 },
    { name: 'CHHATTISGARH', value: 64.12 },
    { name: 'CHANDIGARH', value: 52.47 },
    { name: 'DAMAN & DIU', value: 65.94 },
    { name: 'DELHI', value: 59.32 },
    { name: 'D&N HAVELI', value: 72.88 },
    { name: 'GOA', value: 68.92 },
    { name: 'GUJARAT', value: 65.4 },
    { name: 'HARYANA', value: 62.87 },
    { name: 'HIMACHAL PRADESH', value: 72.16 },
    { name: 'JAMMU & KASHMIR', value: 71.35 },
    { name: 'JHARKHAND', value: 76.19 },
    { name: 'KARNATAKA', value: 54.01 },
    { name: 'KERALA', value: 69.79 },
    { name: 'LADAKH', value: 58.98 },
    { name: 'LAKSHADWEEP', value: 64.07 },
    { name: 'MADHYA PRADESH', value: 60.73 },
    { name: 'MAHARASHTRA', value: 66.1 },
    { name: 'MANIPUR', value: 70.97 },
    { name: 'MEGHALAYA', value: 63.67 },
    { name: 'MIZORAM', value: 62.67 },
    { name: 'NAGALAND', value: 64.73 },
    { name: 'ODISHA', value: 70.42 },
    { name: 'PUDUCHERRY', value: 67.57 },
    { name: 'PUNJAB', value: 59.02 },
    { name: 'RAJASTHAN', value: 54.85 },
    { name: 'SIKKIM', value: 71.36 },
    { name: 'TAMIL NADU', value: 73.72 },
    { name: 'TRIPURA', value: 65.48 },
    { name: 'UTTAR PRADESH', value: 64.14 },
    { name: 'UTTARAKHAND', value: 71.86 },
    { name: 'WEST BENGAL', value: 70.38 },
  ];

  const stateChartOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: statePerformanceData.map(d => d.name),
      axisLabel: { rotate: 45, interval: 0, fontSize: 8, color: theme === 'dark' ? '#94a3b8' : '#64748b' },
      axisLine: { lineStyle: { color: theme === 'dark' ? '#334155' : '#e2e8f0' } }
    },
    yAxis: {
      type: 'value',
      name: 'Avg Score',
      min: 0, max: 100,
      axisLabel: { fontSize: 10, color: theme === 'dark' ? '#94a3b8' : '#64748b' },
      splitLine: { lineStyle: { type: 'dashed', color: theme === 'dark' ? '#1e293b' : '#f1f5f9' } }
    },
    series: [{
      type: 'bar',
      data: statePerformanceData.map(d => ({
        value: d.value,
        itemStyle: { color: d.name === 'GUJARAT' ? '#10b981' : '#f87171' }
      })),
      barWidth: '60%',
      markLine: {
        data: [{ yAxis: 66.62, name: 'National Avg' }],
        lineStyle: { color: '#ef4444', type: 'dashed' },
        label: { formatter: 'National Avg: 66.62', position: 'end' }
      }
    }]
  };

  const districtPerformanceData = [
    { name: 'AHMEDABAD', value: 80.72 },
    { name: 'AMRELI', value: 72.00 },
    { name: 'ANAND', value: 74.00 },
    { name: 'ARVALLI', value: 72.04 },
    { name: 'BANASKANTHA', value: 72.98 },
    { name: 'BHARUCH', value: 64.12 },
    { name: 'BHAVNAGAR', value: 71.29 },
    { name: 'BOTAD', value: 73.51 },
    { name: 'CHHOTA UDEPUR', value: 61.66 },
    { name: 'DAHOD', value: 69.61 },
    { name: 'DANG', value: 67.84 },
    { name: 'JAMNAGAR', value: 72.55 },
    { name: 'JUNAGADH', value: 69.19 },
    { name: 'KACHCHH', value: 67.95 },
    { name: 'KHEDA', value: 69.79 },
    { name: 'MAHESANA', value: 70.73 },
    { name: 'MAHISAGAR', value: 64.94 },
    { name: 'MORBI', value: 70.97 },
    { name: 'NARMADA', value: 68.65 },
    { name: 'NAVSARI', value: 70.36 },
    { name: 'PATAN', value: 70.75 },
    { name: 'PORBANDAR', value: 65.39 },
    { name: 'RAJKOT', value: 70.98 },
    { name: 'SABARKANTHA', value: 71.36 },
    { name: 'SURAT', value: 73.12 },
    { name: 'VADODARA', value: 64.14 },
    { name: 'VALSAD', value: 71.86 },
  ];

  const districtChartOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: districtPerformanceData.map(d => d.name),
      axisLabel: { rotate: 90, interval: 0, fontSize: 8, color: theme === 'dark' ? '#94a3b8' : '#64748b' },
    },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [{
      type: 'bar',
      data: districtPerformanceData.map(d => ({
        value: d.value,
        itemStyle: { color: d.name === 'AHMEDABAD' ? '#f59e0b' : '#3b82f6' }
      })),
      markLine: {
        data: [{ yAxis: 72.88, name: 'State Avg' }],
        lineStyle: { color: '#f59e0b', type: 'dashed' },
        label: { formatter: 'State Avg: 72.88' }
      }
    }]
  };

  const schoolPerformanceData = [
    { name: 'UDGAM SCHOOL FOR CHILDREN', value: 85.57, type: 'top' },
    { name: 'RACHANA SCHOOL SHAHIBAAG', value: 84.77, type: 'top' },
    { name: 'CHETHNA ENG MED SCHOOL', value: 84.37, type: 'top' },
    { name: 'NIRMA VIDYIVIHAR BODAKDEV', value: 84.08, type: 'top' },
    { name: 'DELHI PUBLIC SCHOOL BOPAL', value: 83.68, type: 'top' },
    { name: 'SHANTI GYAN NIKETAN', value: 62.76, type: 'bottom' },
    { name: 'ST. JOSEPH PUBLIC SCHOOL', value: 60.92, type: 'bottom' },
    { name: 'NEW ERA HIGH SCHOOL', value: 59.43, type: 'bottom' },
    { name: 'SHREE JI IMAGE PUBLIC SCHOOL', value: 57.06, type: 'bottom' },
    { name: 'CENTRAL ENGLISH SCHOOL', value: 51.69, type: 'bottom' },
  ];

  const schoolChartOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '25%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: schoolPerformanceData.map(d => d.name),
      axisLabel: { rotate: 45, interval: 0, fontSize: 8, color: theme === 'dark' ? '#94a3b8' : '#64748b' },
    },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [{
      type: 'bar',
      data: schoolPerformanceData.map(d => ({
        value: d.value,
        itemStyle: { color: d.type === 'top' ? '#4f46e5' : '#ef4444' }
      })),
      barWidth: '40%'
    }]
  };

  const schoolTypeData = [
    { type: 'Govt Aided', total: '18,311', male: '9,299', female: '9,012', malePerc: '50.78%', femalePerc: '49.22%' },
    { type: 'Government', total: '3,33,145', male: '1,65,715', female: '1,67,426', malePerc: '49.74%', femalePerc: '50.26%' },
    { type: 'Independent', total: '18,78,219', male: '10,85,905', female: '7,92,299', malePerc: '57.82%', femalePerc: '42.18%' },
    { type: 'JNV', total: '44,487', male: '25,644', female: '18,843', malePerc: '57.64%', femalePerc: '42.36%' },
    { type: 'KVS', total: '1,06,927', male: '56,398', female: '50,528', malePerc: '52.74%', femalePerc: '47.25%' },
    { type: 'CTSA', total: '359', male: '201', female: '158', malePerc: '55.99%', femalePerc: '44.01%' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header Info Bar */}
      <div className="bg-[#002B5B] dark:bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl flex flex-wrap items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl text-white"></div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-2xl font-black tracking-tight italic">Result at Glance for Class X for Session 2024-2025</h2>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10 backdrop-blur-md">
                <Target size={16} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200">National Average:</span>
                <span className="text-xl font-black ml-1">66.62</span>
             </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 relative z-10">
           <div className="flex flex-col gap-1.5 min-w-[140px]">
              <span className="text-[9px] uppercase font-black text-blue-300 tracking-widest ml-1">Academic Session</span>
              <select className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-sm font-bold outline-none cursor-pointer"><option>2024-2025</option></select>
           </div>
           <div className="flex flex-col gap-1.5 min-w-[140px]">
              <span className="text-[9px] uppercase font-black text-blue-300 tracking-widest ml-1">Geography Scope</span>
              <select className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-sm font-bold outline-none cursor-pointer"><option>All States</option></select>
           </div>
           <div className="flex items-end gap-3 mt-auto h-full pt-4">
              <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">Apply</button>
              <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center gap-2"><Download size={14} /> Report</button>
           </div>
        </div>
      </div>

      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((m, i) => (
          <div key={i} className={`${m.color} p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}>
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">{m.icon}</div>
             <div className="relative z-10 text-center flex flex-col items-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-3">{m.label}</p>
                <h3 className="text-6xl font-black tracking-tighter mb-2 italic">{m.value}</h3>
                <p className="text-[11px] font-bold opacity-70 mb-8">{m.subValue || m.year}</p>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-xl px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all shadow-lg"
                >
                  Deep Analytics →
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Student Distribution Section */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
           <h4 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight flex items-center gap-4 italic">
              <BarChart3 size={28} className="text-blue-600" />
              Student Distribution by Grade (2025)
           </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {gradeDistribution.map((g, i) => (
             <div key={i} className={`${g.color} p-8 rounded-[2.5rem] text-white shadow-xl relative group hover:shadow-2xl transition-all`}>
                <div className="flex justify-between items-start mb-6">
                   <h5 className="text-3xl font-black tracking-tighter">{g.percentage}</h5>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase opacity-50 tracking-widest leading-none">Count</p>
                      <p className="text-sm font-bold mt-1 tracking-tight">{g.count}</p>
                   </div>
                </div>
                <div className="space-y-2">
                   <p className="text-base font-black tracking-tight italic">{g.range}</p>
                   <p className="text-[10px] font-bold uppercase opacity-60 tracking-[0.2em]">{g.grade}</p>
                </div>
                <div className="mt-10 flex justify-center">
                   <button className="w-full bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">Telemetry</button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Result Statistics Section */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
           <h4 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight flex items-center gap-4 italic">
              <FileText size={28} className="text-rose-600" />
              Result Statistics (2025)
           </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {resultStats.map((s, i) => (
             <div key={i} className={`${s.color} p-8 rounded-[2.5rem] text-white shadow-xl group transition-all`}>
                <div className="flex justify-between items-start mb-6">
                   <h5 className="text-3xl font-black tracking-tighter">{s.percentage}</h5>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase opacity-50 tracking-widest leading-none">Count</p>
                      <p className="text-sm font-bold mt-1 tracking-tight">{s.count}</p>
                   </div>
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">{s.label}</p>
                <div className="mt-10 flex justify-center">
                   <button className="w-full bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">Details</button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Charts Controls */}
      <div className="flex flex-wrap justify-center gap-3">
         {['State Average vs National', 'Gender Performance', 'Top Schools', 'Pass Percentage'].map((btn, i) => (
           <button key={i} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all shadow-md ${i === 0 ? 'bg-[#002B5B] dark:bg-blue-600 text-white border-[#002B5B]' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800 hover:border-blue-500'}`}>
             {btn}
           </button>
         ))}
      </div>

      {/* Main Charts */}
      <div className="space-y-12">
         {/* Chart 1 */}
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl space-y-8">
            <div className="flex justify-between items-start">
               <div>
                  <h4 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 italic">State Performance Analysis</h4>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2 border-l-2 border-rose-500 pl-4 ml-1">Comparative Merit landscape Across National Core</p>
               </div>
               <div className="flex gap-2">
                 <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"><Maximize2 size={20} /></button>
               </div>
            </div>
            <div className="h-[450px]">
               <ReactECharts option={stateChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
         </div>

         {/* Drilldown Section */}
         <div className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
               <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-mono italic">Primary Filter: State Domain</p>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between cursor-pointer group shadow-sm">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">GUJARAT</span>
                  <ChevronDown size={16} className="text-slate-400 group-hover:text-blue-600 transition-transform" />
               </div>
            </div>
            <div className="space-y-3">
               <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-mono italic">Secondary Filter: District Hub</p>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between cursor-pointer group shadow-sm">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">AHMEDABAD (Avg: 76.72)</span>
                  <ChevronDown size={16} className="text-slate-400 group-hover:text-blue-600 transition-transform" />
               </div>
            </div>
            <div className="flex items-end justify-end">
               <button className="bg-slate-200 dark:bg-slate-800 text-slate-500 font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-inner">Reset All Handlers</button>
            </div>
         </div>

         {/* Chart 2 */}
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl space-y-8">
            <div>
               <h4 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 italic font-sans">Districts in {selectedState}</h4>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2 border-l-2 border-blue-500 pl-4 ml-1">Hyper-local Merit Clustering</p>
            </div>
            <div className="h-[450px]">
               <ReactECharts option={districtChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
         </div>

         {/* Chart 3 */}
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-3xl space-y-8">
            <div className="flex items-center justify-between">
               <div>
                  <h4 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 italic">Top & Bottom Schools in AHMEDABAD</h4>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2 border-l-2 border-indigo-500 pl-4 ml-1">Institutional Entity Benchmark</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600"></div><span className="text-[9px] font-black uppercase text-slate-400">Top</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-600"></div><span className="text-[9px] font-black uppercase text-slate-400">Bottom</span></div>
               </div>
            </div>
            <div className="h-[450px]">
               <ReactECharts option={schoolChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
         </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-[#002B5B]/40 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 scale-100 animate-in zoom-in-95 duration-500">
              <div className="p-10 pb-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl"><Users size={28} /></div>
                    <div>
                       <h3 className="text-2xl font-black text-[#002B5B] dark:text-blue-400 italic">Students by School Type</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono mt-1 italic">Verified National Registry Protocol</p>
                    </div>
                 </div>
                 <button onClick={() => setShowModal(false)} className="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-600 rounded-2xl flex items-center justify-center transition-all border border-transparent hover:border-rose-100">
                    <X size={28} />
                 </button>
              </div>

              <div className="p-10">
                 <div className="overflow-hidden rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                             <th className="px-8 py-6 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest italic">School Category</th>
                             <th className="px-8 py-6 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-center">Total Volume</th>
                             <th className="px-8 py-6 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-center">Male Enr.</th>
                             <th className="px-8 py-6 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-center">Female Enr.</th>
                             <th className="px-8 py-6 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-right">Male Ratio</th>
                             <th className="px-8 py-6 text-[10px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest text-right">Female Ratio</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                          {schoolTypeData.map((row, i) => (
                             <tr key={i} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-8 py-6 text-[11px] font-black text-[#002B5B] dark:text-slate-300 uppercase tracking-tight italic">{row.type}</td>
                                <td className="px-8 py-6 text-sm font-black text-slate-600 dark:text-slate-400 text-center">{row.total}</td>
                                <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400 text-center">{row.male}</td>
                                <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400 text-center">{row.female}</td>
                                <td className="px-8 py-6 text-sm font-black text-blue-600 dark:text-blue-400 text-right">{row.malePerc}</td>
                                <td className="px-8 py-6 text-sm font-black text-rose-600 dark:text-rose-400 text-right">{row.femalePerc}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
              
              <div className="p-10 pt-0 flex justify-end gap-4">
                 <button onClick={() => setShowModal(false)} className="px-10 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Close Deep View</button>
                 <button className="px-10 py-4 bg-[#002B5B] dark:bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3"><Download size={16} /> Technical Export</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ResultAtGlance;
