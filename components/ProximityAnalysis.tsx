import React, { useEffect, useRef, useState } from 'react';
import { Target, Plus, Minus } from 'lucide-react';

import esriConfig from "@arcgis/core/config.js";
import * as intl from "@arcgis/core/intl.js";
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
  { id: '3', name: 'Modern School, Barakhamba Road', udise: '07010300901', lat: 28.6300, lng: 77.2300 }
];

const AMENITY_CATEGORIES = [
  { id: 'bus', name: 'Bus Station', icon: '🚌' },
  { id: 'railway', name: 'Railway Station', icon: '🚂' },
  { id: 'bank', name: 'Bank', icon: '🏦' },
  { id: 'hospital', name: 'Hospital', icon: '🏥' }
];

const ProximityAnalysis: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState(PRESET_SCHOOLS[0].id);
  const [activeAmenity, setActiveAmenity] = useState(AMENITY_CATEGORIES[0].id);
  const [nearbyResults, setNearbyResults] = useState<{name: string, distance: number}[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const viewRef = useRef<MapView | null>(null);
  const graphicsLayerRef = useRef<GraphicsLayer | null>(null);

  const performAnalysis = React.useCallback(() => {
    if (!graphicsLayerRef.current || !viewRef.current) return;
    
    const school = PRESET_SCHOOLS.find(s => s.id === selectedSchoolId);
    if (!school) return;

    graphicsLayerRef.current.removeAll();
    const schoolPt = new Point({ longitude: school.lng, latitude: school.lat });

    const schoolGraphic = new Graphic({
      geometry: schoolPt,
      symbol: new SimpleMarkerSymbol({ color: [0, 43, 91], size: 16, outline: { color: [255, 255, 255], width: 2 } })
    });

    const amenityType = AMENITY_CATEGORIES.find(a => a.id === activeAmenity);
    const results: {name: string, distance: number, pt: Point}[] = [];
    
    for (let i = 1; i <= 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.015 + Math.random() * 0.04;
      const lng = school.lng + Math.cos(angle) * radius;
      const lat = school.lat + Math.sin(angle) * radius;
      
      const pt = new Point({ longitude: lng, latitude: lat });
      const line = new Polyline({ paths: [[[school.lng, school.lat], [lng, lat]]] });
      const dist = geometryEngine.geodesicLength(line, "kilometers");
      
      results.push({ name: `${amenityType?.name} Cluster ${i}`, distance: dist, pt: pt });

      const amenityGraphic = new Graphic({
        geometry: pt,
        symbol: new SimpleMarkerSymbol({ color: [0, 102, 204], style: "square", size: 12, outline: { color: [255, 255, 255], width: 2 } })
      });

      const lineGraphic = new Graphic({
        geometry: line,
        symbol: new SimpleLineSymbol({ color: [0, 43, 91, 0.2], width: 1, style: "short-dot" })
      });

      graphicsLayerRef.current.addMany([amenityGraphic, lineGraphic]);
    }

    graphicsLayerRef.current.add(schoolGraphic);
    setNearbyResults(results.sort((a, b) => a.distance - b.distance));
    viewRef.current.goTo({ target: graphicsLayerRef.current.graphics.toArray() }, { duration: 1200 }).catch(() => {});
  }, [selectedSchoolId, activeAmenity]);

  useEffect(() => {
    if (!mapDiv.current) return;

    const map = new ArcGISMap({ basemap: "gray-vector" });
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [77.17, 28.56], 
      zoom: 13,
      ui: { components: [] } 
    });

    const layer = new GraphicsLayer();
    map.add(layer);
    graphicsLayerRef.current = layer;
    viewRef.current = view;

    view.when(() => {
      setMapLoaded(true);
      performAnalysis();
    }).catch(err => {
      console.warn("Proximity Map Init Error:", err?.message);
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [performAnalysis]);

  useEffect(() => {
    if (mapLoaded) performAnalysis();
  }, [mapLoaded, performAnalysis]);

  const zoomIn = () => viewRef.current?.zoom !== undefined && (viewRef.current.zoom += 1);
  const zoomOut = () => viewRef.current?.zoom !== undefined && (viewRef.current.zoom -= 1);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AMENITY_CATEGORIES.map((amenity) => (
            <button
              key={amenity.id}
              onClick={() => setActiveAmenity(amenity.id)}
              className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all border border-slate-100 dark:border-slate-800 shadow-sm ${
                activeAmenity === amenity.id ? 'bg-[#EBF5FF] dark:bg-blue-900/20 border-[#002B5B] dark:border-blue-500' : 'bg-white dark:bg-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="text-4xl mb-4">{amenity.icon}</div>
              <span className="text-[11px] font-black text-[#002B5B] dark:text-blue-400 uppercase tracking-widest">{amenity.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 space-y-8">
            <select 
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[11px] font-black text-[#002B5B] dark:text-white outline-none"
            >
              {PRESET_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <div className="space-y-4">
               {nearbyResults.map((res, i) => (
                <div key={i} className={`p-5 rounded-2xl flex items-center justify-between border ${i === 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800'}`}>
                  <span className="text-[11px] font-black text-[#002B5B] dark:text-slate-300 uppercase">{res.name}</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-blue-600 dark:text-blue-400">{res.distance.toFixed(2)}</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase ml-1">KMs</span>
                  </div>
                </div>
               ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-[3rem] h-[600px] shadow-3xl relative overflow-hidden border border-slate-200 dark:border-slate-800">
            <div ref={mapDiv} className="absolute inset-0 w-full h-full"></div>
            
            <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
              <button onClick={zoomIn} className="w-8 h-8 bg-white/90 dark:bg-slate-800 rounded shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"><Plus size={14}/></button>
              <button onClick={zoomOut} className="w-8 h-8 bg-white/90 dark:bg-slate-800 rounded shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"><Minus size={14}/></button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-8 rounded-[2.5rem] flex items-center gap-6">
        <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><Target size={28} /></div>
        <div>
           <p className="text-[12px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest italic mb-1">🎯 Proximity Objective</p>
           <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">Identify resource management gaps & assess institutional accessibility</p>
        </div>
      </div>
    </div>
  );
};

export default ProximityAnalysis;