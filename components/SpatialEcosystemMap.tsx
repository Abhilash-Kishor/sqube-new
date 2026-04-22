import React, { useEffect, useRef, useState } from 'react';
import { INDIA_SCHOOLS_DATA } from '../data/indiaSchoolsData';
import { MapIcon, AlertCircle, Info, Activity } from 'lucide-react';

declare global {
  interface Window {
    echarts: any;
  }
}

const SpatialEcosystemMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'india' | 'international'>('india');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let myChart: any = null;
    let isMounted = true;

    const fetchWithTimeout = async (url: string, options: any = {}, timeout = 15000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
      } catch (e) {
        clearTimeout(id);
        throw e;
      }
    };

    const fetchAndRegisterMap = async () => {
      if (!mapRef.current) return;
      setMapLoaded(false);
      setError(null);

      try {
        // Sequential fallback strategy
        const INDIA_URLS = [
          "https://code.highcharts.com/mapdata/countries/in/in-all.geo.json",
          "https://raw.githubusercontent.com/Subhash0708/India-GeoJSON/main/India_States.json",
          "https://raw.githubusercontent.com/udit-001/india-maps-data/master/india.json",
          "https://raw.githubusercontent.com/AnjayGoel/India-Maps-GeoJSON/master/india_state.json"
        ];

        const WORLD_URLS = [
          "https://raw.githubusercontent.com/highcharts/map-collection-dist/master/custom/world.geo.json",
          "https://code.highcharts.com/mapdata/custom/world.geo.json"
        ];

        let geoJson: any = null;
        const urlsToTry = view === 'india' ? INDIA_URLS : WORLD_URLS;

        for (const url of urlsToTry) {
          try {
            const response = await fetchWithTimeout(url);
            if (response.ok) {
              geoJson = await response.json();
              break;
            }
          } catch (e) {
            console.warn(`Failed to fetch from ${url}, trying next...`);
          }
        }

        if (!geoJson) throw new Error("All GIS registry mirrors are currently unresponsive. Please check your connection.");

        if (!isMounted) return;

        window.echarts.registerMap(view, geoJson);

        myChart = window.echarts.init(mapRef.current);

        const normalize = (s: string) => (s || '').toLowerCase()
          .replace(/&/g, 'and')
          .replace(/ and /g, ' ')
          .replace(/[^a-z0-9]/g, '')
          .replace('jammuandkashmir', 'jammukashmir')
          .replace('andamanandnicobar', 'andamannicobar')
          .replace('dadraandnagarhavelianddamananddiu', 'dadranagarhavelidamananddiu')
          .replace('arunachalpradesh', 'arunachal')
          .replace('lakshadweepislands', 'lakshadweep')
          .trim();

        const mapData = INDIA_SCHOOLS_DATA.map(d => ({
          name: d.state,
          value: d.schools,
          students: d.students,
          teachers: d.teachers,
          normalized: normalize(d.state)
        }));

        const finalMapData = geoJson.features.map((feature: any) => {
          const props = feature.properties || {};
          // Comprehensive property check for different GeoJSON structures
          const featureName = props.ST_NM || props.ST_NAME || props.NAME_1 || props.state_name || props.name || props['name-en'] || props.NAME || "";
          const normFeature = normalize(featureName);
          const schoolRecord = mapData.find(m => 
            m.normalized === normFeature || 
            (normFeature && m.normalized && (normFeature.includes(m.normalized) || m.normalized.includes(normFeature)))
          );
          
          return {
            name: featureName,
            value: schoolRecord ? schoolRecord.value : 0,
            students: schoolRecord ? schoolRecord.students : 0,
            teachers: schoolRecord ? schoolRecord.teachers : 0
          };
        });

        const option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            backgroundColor: '#FFC107',
            borderColor: 'rgba(255,255,255,0.4)',
            borderWidth: 2,
            padding: [16, 20],
            borderRadius: 16,
            z: 9999,
            formatter: (params: any) => {
              if (!params.data || params.data.value === 0) {
                const nameStr = params.name || 'Unknown Region';
                return `<div class="text-[10px] font-black uppercase text-slate-900">${nameStr}</div><div class="text-[9px] text-slate-800 font-bold opacity-70">No Registry Data</div>`;
              }
              return `
                <div style="color: #0f172a; font-family: 'Inter', sans-serif;">
                  <div style="font-weight: 900; border-bottom: 2px solid rgba(0,0,0,0.1); padding-bottom: 8px; margin-bottom: 12px; font-size: 15px; text-transform: uppercase;">${params.name}</div>
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; justify-content: space-between; gap: 40px; font-size: 13px; font-weight: 800;">
                      <span>SCHOOLS:</span> <strong>${params.data.value.toLocaleString()}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 40px; font-size: 13px; font-weight: 800;">
                      <span>STUDENTS:</span> <strong>${params.data.students.toLocaleString()}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 40px; font-size: 13px; font-weight: 800;">
                      <span>FACULTY:</span> <strong>${params.data.teachers.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              `;
            },
            extraCssText: 'box-shadow: 0 0 30px rgba(0,0,0,0.3); pointer-events: none; z-index: 9999 !important;'
          },
          visualMap: {
            min: 0,
            max: view === 'india' ? 10000 : 500,
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#E3F2FD', '#90CAF9', '#1E88E5', '#0D47A1']
            },
            show: false
          },
          series: [
            {
              name: 'Institutional Density',
              type: 'map',
              map: view,
              roam: true,
              layoutCenter: ['50%', '50%'],
              layoutSize: '88%', // Added padding via layoutSize
              aspectScale: 0.85,
              zoom: 1.0, // Reset zoom to 1.0 to rely on layoutSize for scaling
              emphasis: {
                label: { show: false },
                itemStyle: { areaColor: '#F59E0B' }
              },
              itemStyle: {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 1,
                areaColor: '#f1f5f9'
              },
              data: finalMapData
            }
          ]
        };

        myChart.setOption(option);
        setMapLoaded(true);

      } catch (err: any) {
        if (isMounted) setError(`GIS Registry unreachable: ${err?.message || "Connection Timed Out"}`);
      }
    };

    let checkCount = 0;
    const checkEchartsLoaded = setInterval(() => {
      checkCount++;
      if (window.echarts) {
        clearInterval(checkEchartsLoaded);
        fetchAndRegisterMap();
      } else if (checkCount > 50) {
        clearInterval(checkEchartsLoaded);
        setError("Mapping engine failed to initialize.");
      }
    }, 200);

    const handleResize = () => myChart && myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      clearInterval(checkEchartsLoaded);
      window.removeEventListener('resize', handleResize);
      if (myChart) myChart.dispose();
    };
  }, [view, retryCount]);

  const handleRetry = () => {
    setError(null);
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header HUD - Moved above map to prevent coincidence */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] border border-slate-200 shadow-xl transition-all hover:shadow-2xl">
         <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transform transition-transform hover:rotate-3">
               <MapIcon size={28} className={mapLoaded ? "" : "animate-pulse"} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-[#002B5B] leading-none uppercase italic tracking-tight font-sans">Unified Institutional Analytics</h3>
            </div>
         </div>
         
         <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl gap-2 border border-slate-200 shadow-inner">
            <button 
              onClick={() => setView('india')}
              className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase transition-all flex items-center gap-2 ${view === 'india' ? 'bg-white text-blue-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${view === 'india' ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
              India
            </button>
            <button 
              onClick={() => setView('international')}
              className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase transition-all flex items-center gap-2 ${view === 'international' ? 'bg-white text-blue-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${view === 'international' ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
              Foreign
            </button>
         </div>
      </div>

      <div className="relative w-full h-[850px] bg-slate-50/50 rounded-[4rem] overflow-hidden border border-slate-200/80 shadow-2xl p-10 group transition-all duration-700">
        {/* Main Map Content - Direct ECharts with Manually Prefetched GeoJSON */}
        <div 
          ref={mapRef} 
          className={`w-full h-full transition-all duration-1000 ${mapLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ width: '100%', height: '100%' }}
        />

        {/* Helper Tip */}
        <div className="absolute top-10 right-10 z-20 pointer-events-none md:block hidden">
          <div className="bg-[#FFC107] px-6 py-3 rounded-full shadow-2xl border-2 border-white/20 text-slate-900 flex items-center gap-3 animate-float pointer-events-auto">
            <Info size={16} className="text-slate-900" />
            <span className="text-[11px] font-black uppercase tracking-wider font-sans">
              {view === 'india' ? 'Hover Region for Stats' : 'Hover Country for Stats'}
            </span>
          </div>
        </div>

        {/* Initializing Overlay */}
        {!mapLoaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-50">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-blue-600/10 border-t-blue-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity size={40} className="text-blue-600 animate-pulse" />
              </div>
            </div>
            <p className="mt-8 text-blue-900 font-black text-[12px] uppercase tracking-[0.3em] animate-pulse text-center font-sans">
              {view === 'india' ? 'Syncing Schools Registry...' : 'Syncing International Registry...'}
            </p>
          </div>
        )}

        {/* Error Interface */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-50 z-50 p-12 text-center">
            <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-[2rem] flex items-center justify-center shadow-inner mb-8">
              <AlertCircle size={48} />
            </div>
            <div className="space-y-3 mb-10 text-slate-900">
              <h3 className="text-3xl font-black text-rose-900 uppercase italic leading-none font-sans">System Interrupt</h3>
              <p className="text-xs font-bold text-rose-600/70 max-w-sm mx-auto font-sans">{error}</p>
            </div>
            <button 
              onClick={handleRetry}
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 font-sans"
            >
              <Activity size={18} />
              Re-Initialize Registry
            </button>
          </div>
        )}

        {/* Institutional Density Legend */}
        {mapLoaded && (
          <div className="absolute bottom-10 right-10 z-20">
            <div className="bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-slate-200">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center opacity-60 font-sans">Density Key</div>
              <div className="space-y-3 font-sans">
                {[
                  { label: 'Highest Density', color: 'bg-[#0D47A1]' },
                  { label: 'Moderate Flow', color: 'bg-[#1E88E5]' },
                  { label: 'Low Concentration', color: 'bg-[#90CAF9]' },
                  { label: 'Baseline Sector', color: 'bg-[#E3F2FD]' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-lg ${item.color} shadow-sm`} />
                    <span className="text-[10px] font-black text-[#002B5B] uppercase tracking-tight font-sans">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpatialEcosystemMap;
