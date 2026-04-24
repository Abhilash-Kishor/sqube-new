
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Ruler, ArrowRightLeft, Plus, Minus } from 'lucide-react';

import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";

const PRESET_SCHOOLS = [
  { id: '1', name: 'Delhi Public School, R.K. Puram', udise: '07010100101', lat: 28.5600, lng: 77.1700 },
  { id: '2', name: 'Kendriya Vidyalaya No. 1, Delhi Cantt', udise: '07010200502', lat: 28.5900, lng: 77.1300 },
  { id: '3', name: 'Modern School, Barakhamba Road', udise: '07010300901', lat: 28.6300, lng: 77.2300 },
  { id: '4', name: 'Sanskriti School, Chanakyapuri', udise: '07010400110', lat: 28.5950, lng: 77.1900 },
  { id: '5', name: 'Jawahar Navodaya Vidyalaya, Rohini', udise: '07010500205', lat: 28.7200, lng: 77.1100 }
];

const DistanceTool = () => {
  const mapDiv = useRef(null);
  const [schoolA, setSchoolA] = useState(PRESET_SCHOOLS[0].id);
  const [schoolB, setSchoolB] = useState(PRESET_SCHOOLS[1].id);
  const [distance, setDistance] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const viewRef = useRef(null);
  const graphicsLayerRef = useRef(null);

  const calculateAndDraw = useCallback(() => {
    if (!graphicsLayerRef.current || !viewRef.current) return;
    const sA = PRESET_SCHOOLS.find(s => s.id === schoolA);
    const sB = PRESET_SCHOOLS.find(s => s.id === schoolB);
    if (!sA || !sB) return;

    graphicsLayerRef.current.removeAll();
    const ptA = new Point({ longitude: sA.lng, latitude: sA.lat });
    const ptB = new Point({ longitude: sB.lng, latitude: sB.lat });

    const markerA = new Graphic({ geometry: ptA, symbol: new SimpleMarkerSymbol({ color: [0, 43, 91], size: 14, outline: { color: [255, 255, 255], width: 2 } }) });
    const markerB = new Graphic({ geometry: ptB, symbol: new SimpleMarkerSymbol({ color: [0, 102, 204], size: 14, outline: { color: [255, 255, 255], width: 2 } }) });
    const line = new Polyline({ paths: [[[sA.lng, sA.lat], [sB.lng, sB.lat]]] });
    const lineGraphic = new Graphic({ geometry: line, symbol: new SimpleLineSymbol({ color: [0, 102, 204, 0.6], width: 3, style: "dash" }) });

    graphicsLayerRef.current.addMany([markerA, markerB, lineGraphic]);
    setDistance(geometryEngine.geodesicLength(line, "kilometers"));
    viewRef.current.goTo({ target: [markerA, markerB] }, { duration: 1000 }).catch(() => {});
  }, [schoolA, schoolB]);

  useEffect(() => {
    if (!mapDiv.current) return;

    const map = new ArcGISMap({ basemap: "gray-vector" });
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [77.17, 28.56], 
      zoom: 11,
      ui: { components: [] } // Avoid Calcite icon errors
    });

    const layer = new GraphicsLayer();
    map.add(layer);
    graphicsLayerRef.current = layer;
    viewRef.current = view;

    view.when(() => {
      setMapLoaded(true);
      calculateAndDraw();
    }).catch((err) => {
      console.warn("Distance Map Init Error:", err?.message);
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [calculateAndDraw]);

  useEffect(() => { if (mapLoaded) calculateAndDraw(); }, [mapLoaded, calculateAndDraw]);

  const zoomIn = () => {
    if (viewRef.current) viewRef.current.zoom += 1;
  };
  const zoomOut = () => {
    if (viewRef.current) viewRef.current.zoom -= 1;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800 pb-4">
            <Ruler className="text-blue-600" size={24} />
            <h3 className="text-xl font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-tight">Institutional Distance</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">School A</label>
              <select value={schoolA} onChange={(e) => setSchoolA(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[11px] font-black text-[#002B5B] dark:text-white">
                {PRESET_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="flex justify-center"><ArrowRightLeft size={20} className="rotate-90 text-slate-300" /></div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">School B</label>
              <select value={schoolB} onChange={(e) => setSchoolB(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[11px] font-black text-[#002B5B] dark:text-white">
                {PRESET_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            {distance !== null && (
              <div className="p-8 bg-[#002B5B] dark:bg-blue-600 text-white rounded-[2rem] text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-70">Direct Distance</p>
                <h4 className="text-5xl font-black tracking-tighter">{distance.toFixed(2)}</h4>
                <p className="text-[11px] font-black uppercase tracking-widest text-blue-200">Kilometers</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-[3rem] h-[600px] shadow-3xl relative overflow-hidden border border-slate-200 dark:border-slate-800">
          <div ref={mapDiv} className="absolute inset-0 w-full h-full"></div>
          
          <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
            <button onClick={zoomIn} className="w-8 h-8 bg-white/90 dark:bg-slate-800 rounded shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-700"><Plus size={14}/></button>
            <button onClick={zoomOut} className="w-8 h-8 bg-white/90 dark:bg-slate-800 rounded shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-700"><Minus size={14}/></button>
          </div>

          {!mapLoaded && (
            <div className="absolute inset-0 z-50 bg-[#F1F5F9] dark:bg-slate-900 flex flex-col items-center justify-center gap-6 text-blue-600">
               <div className="w-10 h-10 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Initializing Core Map...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistanceTool;
