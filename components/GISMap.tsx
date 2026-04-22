import React, { useEffect, useRef, useState } from 'react';
import { Globe, Search, Plus, Minus, Navigation } from 'lucide-react';
import { STATES_INDIA } from '../constants';

import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import { INDIA_SCHOOLS_DATA } from '../data/indiaSchoolsData';

const stateBounds: Record<string, { center: [number, number], zoom: number }> = {
  'National View': { center: [78.9629, 22.5937], zoom: 5 },
  'All India': { center: [78.9629, 22.5937], zoom: 5 },
  'Delhi': { center: [77.1025, 28.7041], zoom: 11 },
  'Maharashtra': { center: [73.8567, 18.5204], zoom: 7 },
  'Uttar Pradesh': { center: [80.9462, 26.8467], zoom: 7 },
  'Tamil Nadu': { center: [78.6569, 11.1271], zoom: 7 },
  'Karnataka': { center: [77.5946, 12.9716], zoom: 8 },
  'Gujarat': { center: [72.1919, 22.2587], zoom: 7 }
};

const GISMap: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedState, setSelectedState] = useState('Delhi');
  const [hoverInfo, setHoverInfo] = useState<{
    state: string;
    schools: number;
    students: number;
    teachers: number;
    x: number;
    y: number;
  } | null>(null);

  const viewRef = useRef<MapView | null>(null);
  const featureLayerRef = useRef<FeatureLayer | null>(null);

  const getShadeColor = (schools: number) => {
    if (schools > 5000) return [0, 43, 91, 0.85]; // Darkest Blue
    if (schools > 2000) return [0, 102, 204, 0.75]; // Dark Blue
    if (schools > 500) return [102, 178, 255, 0.65]; // Medium Blue
    return [204, 229, 255, 0.6]; // Lightest Blue
  };

  useEffect(() => {
    let active = true;
    
    const initMap = async () => {
      if (!mapDiv.current || !active) return;

      try {
        const map = new ArcGISMap({
          basemap: "gray" 
        });

        const renderer = new UniqueValueRenderer({
          field: "State_Name",
          defaultSymbol: new SimpleFillSymbol({
            color: [240, 240, 240, 0.5],
            outline: { color: [255, 255, 255], width: 1 }
          })
        });

        // Map school data to renderer with various possible field values
        INDIA_SCHOOLS_DATA.forEach(data => {
          renderer.addUniqueValueInfo({
            value: data.state,
            symbol: new SimpleFillSymbol({
              color: getShadeColor(data.schools),
              outline: { color: [255, 255, 255, 0.8], width: 1.5 }
            })
          });
          // Also add uppercase version just in case
          renderer.addUniqueValueInfo({
            value: data.state.toUpperCase(),
            symbol: new SimpleFillSymbol({
              color: getShadeColor(data.schools),
              outline: { color: [255, 255, 255, 0.8], width: 1.5 }
            })
          });
        });

        const stateLayer = new FeatureLayer({
          url: "https://services6.arcgis.com/8v98Hxr866S50qI5/arcgis/rest/services/India_States/FeatureServer/0",
          renderer: renderer,
          outFields: ["*"],
          id: "indiaStates"
        });

        map.add(stateLayer);
        featureLayerRef.current = stateLayer;

        const view = new MapView({
          container: mapDiv.current,
          map: map,
          center: [78.9629, 22.5937],
          zoom: 5,
          ui: { components: [] },
          highlightOptions: {
            color: [255, 193, 7, 1], // Yellow highlight from image001
            haloOpacity: 0.9,
            fillOpacity: 0.4
          }
        });

        viewRef.current = view;

        await view.when();
        
        if (active) {
          setMapLoaded(true);

          // Interaction handling
          view.on("pointer-move", async (event) => {
            const response = await view.hitTest(event);
            const results = response.results.filter(r => r.type === "graphic" && r.layer.id === "indiaStates");
            
            if (results.length > 0) {
              const graphic = (results[0] as any).graphic;
              const attrs = graphic.attributes;
              const stateName = attrs.State_Name || attrs.ST_NM || attrs.ST_NAME || attrs.state_name;
              
              if (!stateName) {
                setHoverInfo(null);
                return;
              }

              const schoolData = INDIA_SCHOOLS_DATA.find(d => 
                d.state.toLowerCase() === stateName.toLowerCase()
              );
              
              if (schoolData) {
                setHoverInfo({
                  ...schoolData,
                  state: stateName,
                  x: event.x,
                  y: event.y
                });
                view.container.style.cursor = "pointer";
              } else {
                setHoverInfo(null);
                view.container.style.cursor = "default";
              }
            } else {
              setHoverInfo(null);
              view.container.style.cursor = "default";
            }
          });
        }
      } catch (err: any) {
        console.warn("ArcGIS Initialize Error:", err?.message);
      }
    };

    initMap();

    return () => {
      active = false;
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []); 

  const handleFilterUpdate = React.useCallback(() => {
    if (viewRef.current && stateBounds[selectedState]) {
      viewRef.current.goTo({
        center: stateBounds[selectedState].center,
        zoom: stateBounds[selectedState].zoom
      }, { duration: 1500 });
    }
  }, [selectedState]);

  useEffect(() => {
    if (mapLoaded) handleFilterUpdate();
  }, [handleFilterUpdate, mapLoaded]);

  const zoomIn = () => viewRef.current?.zoom !== undefined && (viewRef.current.zoom += 1);
  const zoomOut = () => viewRef.current?.zoom !== undefined && (viewRef.current.zoom -= 1);
  const resetCompass = () => viewRef.current?.goTo({ rotation: 0 });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] h-[600px] shadow-2xl relative overflow-hidden border border-slate-200 dark:border-slate-800 no-print">
      {/* Map Container - Explicitly taking full size */}
      <div 
        ref={mapDiv} 
        className="absolute inset-0 w-full h-full" 
        style={{ height: '100%', width: '100%' }}
      ></div>

      {!mapLoaded && (
        <div className="absolute inset-0 z-50 bg-[#F1F5F9] dark:bg-slate-900 flex flex-col items-center justify-center gap-6">
           <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
           <p className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-[9px]">Synchronizing Spatial Registry...</p>
        </div>
      )}

      {/* Hover Tooltip - Matching image001 design */}
      {hoverInfo && (
        <div 
          className="absolute z-[100] bg-[#FFC107] p-5 rounded-2xl shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-200 border-2 border-white/20 backdrop-blur-sm transition-all"
          style={{ 
            left: hoverInfo.x + 15, 
            top: hoverInfo.y - 100,
            maxWidth: '240px'
          }}
        >
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight border-b border-slate-900/10 pb-1 mb-2">{hoverInfo.state}</h4>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-800 flex justify-between gap-10">
                <span>Number of Schools:</span>
                <span className="text-slate-900">{hoverInfo.schools.toLocaleString()}</span>
              </p>
              <p className="text-[10px] font-black text-slate-800 flex justify-between gap-10">
                <span>Number of Students:</span>
                <span className="text-slate-900">{hoverInfo.students.toLocaleString()}</span>
              </p>
              <p className="text-[10px] font-black text-slate-800 flex justify-between gap-10">
                <span>No. of Teachers:</span>
                <span className="text-slate-900">{hoverInfo.teachers.toLocaleString()}</span>
              </p>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-2 left-4 w-4 h-4 bg-[#FFC107] rotate-45 border-r border-b border-white/20"></div>
        </div>
      )}

      {/* Manual UI Controls to bypass Calcite Icon Errors */}
      <div className="absolute left-4 bottom-8 z-20 flex flex-col gap-2">
        <button onClick={zoomIn} className="w-10 h-10 bg-white/95 dark:bg-slate-800 text-slate-700 dark:text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-white transition-all border border-slate-200 dark:border-slate-700">
          <Plus size={18} />
        </button>
        <button onClick={zoomOut} className="w-10 h-10 bg-white/95 dark:bg-slate-800 text-slate-700 dark:text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-white transition-all border border-slate-200 dark:border-slate-700">
          <Minus size={18} />
        </button>
        <button onClick={resetCompass} className="w-10 h-10 bg-white/95 dark:bg-slate-800 text-slate-700 dark:text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-white transition-all border border-slate-200 dark:border-slate-700">
          <Navigation size={18} />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl pointer-events-auto">
          <h3 className="text-sm font-black text-[#002B5B] dark:text-blue-400 tracking-tight flex items-center gap-2 uppercase">
            <Globe className="text-blue-600" size={14} /> National GIS Hub
          </h3>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-col gap-3">
        <div className="bg-white/95 dark:bg-slate-800/95 p-4 rounded-2xl shadow-2xl w-52 border border-slate-100 dark:border-slate-700">
          <div className="space-y-3">
            <div className="space-y-1">
               <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
               <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black text-[#002B5B] dark:text-white outline-none"
               >
                 {STATES_INDIA.map(s => <option key={s} value={s}>{s}</option>)}
               </select>
            </div>
            <button 
              onClick={handleFilterUpdate}
              className="w-full py-2 bg-[#002B5B] dark:bg-blue-600 text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
            >
              <Search size={12} /> Update View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISMap;