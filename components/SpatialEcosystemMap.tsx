import React, { useEffect, useRef, useState } from 'react';
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import { INDIA_SCHOOLS_DATA } from '../data/indiaSchoolsData';
import { MousePointer2, Map as MapIcon } from 'lucide-react';

const SpatialEcosystemMap: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hoverData, setHoverData] = useState<{
    state: string;
    schools: number;
    students: number;
    teachers: number;
    x: number;
    y: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setDebugLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const getShadeColor = (schools: number) => {
    if (schools > 5000) return [13, 71, 161, 0.95]; 
    if (schools > 2000) return [25, 118, 210, 0.9]; 
    if (schools > 500) return [66, 165, 245, 0.85]; 
    return [187, 222, 251, 0.8]; 
  };

  useEffect(() => {
    let active = true;
    let view: MapView | null = null;
    
    const initMap = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      if (!mapDiv.current || !active) return;

      addLog("Initializing Ecosystem Map v9.0...");
      setError(null);

      try {
        const map = new ArcGISMap({
          basemap: "gray-vector" 
        });

        if (!active) return;
        
        view = new MapView({
          container: mapDiv.current,
          map: map,
          center: [78.9629, 23.5937],
          zoom: 4.8,
          ui: { components: [] },
          constraints: {
            minZoom: 3,
            maxZoom: 10
          }
        });

        // Fail-Safe: Make the map view ready first so the UI isn't blocked by layer errors
        await view.when();
        if (!active) return;
        setMapLoaded(true);
        addLog("Base Map Operational.");

        // Boundary URLs - Using a set of known public services
        const layerUrls = [
          "https://services6.arcgis.com/8v98Hxr866S50qI5/arcgis/rest/services/India_States/FeatureServer/0",
          "https://services.arcgis.com/P3ePLMYs2IC9p75X/arcgis/rest/services/India_state_boundary/FeatureServer/0"
        ];
        
        let statesLayer: FeatureLayer | null = null;
        for (const url of layerUrls) {
          if (!active) break;
          const tempLayer = new FeatureLayer({ url: url, outFields: ["*"], id: "indiaStates", opacity: 1 });
          try {
            await tempLayer.load();
            statesLayer = tempLayer;
            addLog("Registry Connected.");
            break;
          } catch (e) {
            addLog(`Server Skip: ${url.split('/')[2]}`);
          }
        }

        if (statesLayer && active) {
          map.add(statesLayer);
          
          const stateField = statesLayer.fields.find(f => 
            ["State_Name", "ST_NM", "ST_NAME", "STATE_NAME", "NAME_1", "NAME"].includes(f.name)
          )?.name || "ST_NM";

          const renderer = new UniqueValueRenderer({
            field: stateField,
            defaultSymbol: new SimpleFillSymbol({
              color: [220, 220, 220, 0.2], 
              outline: { color: [150, 150, 150, 0.4], width: 1 }
            })
          });

          const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\s+/g, '');

          INDIA_SCHOOLS_DATA.forEach(data => {
            const sym = new SimpleFillSymbol({
              color: getShadeColor(data.schools),
              outline: { color: [255, 255, 255, 0.9], width: 1.2 }
            });
            renderer.addUniqueValueInfo({ value: data.state, symbol: sym });
            renderer.addUniqueValueInfo({ value: data.state.toUpperCase(), symbol: sym });
            if (data.state.includes('AND')) {
              renderer.addUniqueValueInfo({ value: data.state.replace(/AND/g, '&'), symbol: sym });
            }
          });

          statesLayer.renderer = renderer;
          addLog("Data Sync Complete!");

          view.on("pointer-move", async (event) => {
            if (!view || !active || !statesLayer) return;
            try {
              const response = await view.hitTest(event, { include: [statesLayer] });
              const stateResult = response.results.find(r => r.type === "graphic" && r.layer.id === "indiaStates");
              if (stateResult && stateResult.type === "graphic") {
                const attrs = stateResult.graphic.attributes;
                const rawStateName = attrs[stateField] || attrs.State_Name || attrs.ST_NM || attrs.ST_NAME || attrs.NAME_1 || attrs.NAME; 
                if (!rawStateName) return;
                const normalizedTarget = normalize(rawStateName.toString());
                const schoolData = INDIA_SCHOOLS_DATA.find(d => normalize(d.state) === normalizedTarget || normalize(d.state.replace(/AND/g, '&')) === normalizedTarget);
                if (schoolData && active) {
                  setHoverData({ ...schoolData, state: rawStateName, x: event.x, y: event.y });
                  view.container.style.cursor = "pointer";
                } else if (active) {
                  setHoverData({ state: rawStateName, schools: 0, students: 0, teachers: 0, x: event.x, y: event.y });
                  view.container.style.cursor = "default";
                }
              } else {
                setHoverData(null);
                view.container.style.cursor = "default";
              }
            } catch (e) {}
          });
        } else if (active) {
          addLog("Registry Offline. Using Base View.");
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          addLog("Update In Progress...");
        } else {
          addLog(`Sync Error: ${err?.message}`);
          if (active) setError(err?.message || "Failed to initialize map engine.");
        }
      }
    };

    initMap();

    return () => {
      active = false;
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[700px] min-h-[600px] bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-200 shadow-inner group">
      <div 
        ref={mapDiv} 
        className="w-full h-full absolute inset-0"
        style={{ width: '100%', height: '100%', outline: 'none' }}
      ></div>

      {!mapLoaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-50 z-10">
           <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
           <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Generating Spatial Intelligence...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-rose-50 z-20 p-12 text-center">
           <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner">
             <MapIcon size={32} />
           </div>
           <div className="space-y-2">
             <h3 className="text-xl font-black text-rose-900 uppercase italic">Synchronization Failed</h3>
             <p className="text-[11px] font-medium text-rose-600/80 max-w-sm mx-auto">{error}</p>
           </div>
           <button 
             onClick={() => window.location.reload()}
             className="px-8 py-4 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-rose-700 transition-all"
           >
             Retry Connection
           </button>
        </div>
      )}

      {/* Debug Log Panel */}
      <div className="absolute bottom-10 left-10 z-30 pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
         <div className="bg-slate-900/90 text-emerald-400 p-4 rounded-xl text-[8px] font-mono space-y-1 shadow-2xl border border-white/10 min-w-[200px]">
            <p className="text-white/40 mb-1 border-b border-white/10 pb-1">System Logs (v6.0)</p>
            {debugLog.map((log, i) => (
              <p key={i} className="truncate">{log}</p>
            ))}
         </div>
      </div>

      {/* Hero Badge Updated */}
      <div className="absolute top-10 left-10 z-20 space-y-4">
        <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-2xl">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <MapIcon size={20} />
           </div>
           <div>
              <h3 className="text-lg font-black text-[#002B5B] leading-none uppercase italic">National GIS Footprint</h3>
              <p className="text-[9px] font-black text-slate-400 tracking-widest mt-1 uppercase">CBSE Institutional Density Map</p>
           </div>
           <div className="ml-4 px-3 py-1 bg-emerald-500 text-white rounded-full text-[8px] font-black uppercase tracking-tighter animate-pulse shadow-lg">
              Strategic Sync Active
           </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl max-w-[280px]">
           <p className="text-[10px] font-medium text-slate-600 leading-relaxed">
              Explore the interactive national dashboard. Hover over states to view real-time registry statistics including school count, student enrollment, and faculty strength.
           </p>
        </div>
      </div>

      {/* Hover Tooltip - Matching image001 design */}
      {hoverData && (
        <div 
          className="absolute z-[100] bg-[#FFC107] p-5 rounded-2xl shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-200 border-2 border-white/20 backdrop-blur-sm transition-all"
          style={{ 
            left: hoverData.x + 15, 
            top: hoverData.y - 120,
            maxWidth: '240px'
          }}
        >
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight border-b border-slate-900/10 pb-1 mb-2">{hoverData.state}</h4>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-800 flex justify-between gap-10">
                <span>Number of Schools:</span>
                <span className="text-slate-900">{hoverData.schools.toLocaleString()}</span>
              </p>
              <p className="text-[10px] font-black text-slate-800 flex justify-between gap-10">
                <span>Number of Students:</span>
                <span className="text-slate-900">{hoverData.students.toLocaleString()}</span>
              </p>
              <p className="text-[10px] font-black text-slate-800 flex justify-between gap-10">
                <span>No. of Teachers:</span>
                <span className="text-slate-900">{hoverData.teachers.toLocaleString()}</span>
              </p>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-2 left-4 w-4 h-4 bg-[#FFC107] rotate-45 border-r border-b border-white/20"></div>
        </div>
      )}

      {/* Bottom Controls Legend */}
      <div className="absolute bottom-10 right-10 z-20 flex flex-col gap-4">
         <div className="bg-white/90 backdrop-blur-xl p-3 px-6 rounded-2xl border border-slate-200 shadow-2xl flex items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="w-4 h-4 bg-[#002B5B] rounded-md"></div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">High Density</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-4 h-4 bg-[#CCE5FF] rounded-md"></div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Strategic Outposts</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SpatialEcosystemMap;
