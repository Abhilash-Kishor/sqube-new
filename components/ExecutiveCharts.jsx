
import React from 'react';
import ReactECharts from 'echarts-for-react';

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#67e8f9', '#fb923c', '#f87171', '#ec4899', '#d1d5db'];

export const ExecutiveCompositeGauge = ({ value, label, color }) => {
  const safeValue = isNaN(value) ? 0 : value;
  
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 8,
            color: [
              [0.3, '#FF6E76'],
              [0.7, '#FDDD60'],
              [1, color || '#0066CC']
            ]
          }
        },
        pointer: {
          show: true,
          length: '60%',
          width: 8,
          itemStyle: { color: 'auto' }
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        title: { 
          offsetCenter: [0, '-10%'], 
          fontSize: 12, 
          fontWeight: 'bold', 
          color: '#002B5B',
          show: !!label 
        },
        detail: { 
          fontSize: 24, 
          fontWeight: '900', 
          offsetCenter: [0, '25%'], 
          valueAnimation: true, 
          formatter: '{value}%', 
          color: color || '#002B5B' 
        },
        data: [{ value: safeValue, name: '' }]
      }
    ]
  };
  return <div className="w-full h-[280px]"><ReactECharts option={option} style={{ height: '100%', width: '100%' }} /></div>;
};

export const ExecutiveRadarChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];
  if (safeData.length === 0) return <div className="flex items-center justify-center h-[400px] text-slate-300 font-black uppercase tracking-widest text-[10px]">Registry Empty</div>;

  const maxValue = Math.max(...safeData.map(item => item.v || 0), 100);

  const option = {
    tooltip: { trigger: 'item' },
    radar: {
      indicator: safeData.map(d => ({ name: d.n || 'Unknown', max: maxValue })),
      splitNumber: 5,
      radius: '70%',
      center: ['50%', '50%'],
      axisName: { color: '#002B5B', fontWeight: '900', fontSize: 10, textTransform: 'uppercase' },
      splitLine: { lineStyle: { color: ['rgba(0, 43, 91, 0.05)'] } },
      splitArea: { show: true, areaStyle: { color: ['rgba(255,255,255,0.3)', 'rgba(200,200,200,0.02)'] } },
      axisLine: { lineStyle: { color: 'rgba(0, 43, 91, 0.05)' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: safeData.map(d => d.v || 0),
        name: 'National Metric',
        itemStyle: { color: COLORS[0] },
        areaStyle: { color: 'rgba(79, 70, 229, 0.4)' },
        symbolSize: 6
      }]
    }]
  };
  return <div className="w-full h-[500px]"><ReactECharts option={option} style={{ height: '100%', width: '100%' }} /></div>;
};

export const ExecutiveVerticalBarChart = ({ data = [], title = "Metric", yAxisName = "Value" }) => {
  const safeData = Array.isArray(data) ? data : [];
  if (safeData.length === 0) return <div className="flex items-center justify-center h-[400px] text-slate-300 font-black uppercase tracking-widest text-[10px]">Registry Empty</div>;

  const hasHighVolume = safeData.length > 20;
  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '5%', right: '5%', bottom: hasHighVolume ? '30%' : '15%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: safeData.map(d => d.n || d.label || 'Cluster'),
      axisLabel: { interval: hasHighVolume ? 'auto' : 0, rotate: 45, fontSize: 9, fontWeight: '700', color: '#64748b' }
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
      nameTextStyle: { fontWeight: '900', fontSize: 11, color: '#002B5B' },
      splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } }
    },
    dataZoom: hasHighVolume ? [{ type: 'inside', start: 0, end: 20 }, { show: true, type: 'slider', bottom: 10, height: 20, start: 0, end: 20 }] : [],
    series: [{
      name: title,
      type: 'bar',
      data: safeData.map(d => d.v || 0),
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#0066CC' }, { offset: 1, color: '#002B5B' }] },
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: hasHighVolume ? '80%' : '40%'
    }]
  };
  return <div className="w-full h-[550px]"><ReactECharts option={option} style={{ height: '100%', width: '100%' }} /></div>;
};

export const ExecutiveDonutChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];
  if (safeData.length === 0) return <div className="flex items-center justify-center h-[400px] text-slate-300 font-black uppercase tracking-widest text-[10px]">Registry Empty</div>;

  const option = {
    tooltip: { trigger: 'item', padding: 10, borderRadius: 8 },
    legend: { bottom: '5%', left: 'center', textStyle: { fontSize: 10, fontWeight: 'bold' }, itemGap: 15 },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
      label: { show: true, formatter: '{d}%', fontWeight: '900', fontSize: 11 },
      data: safeData.map((d, idx) => ({ 
        value: d.v || 0, 
        name: d.n || d.label || 'Segment', 
        itemStyle: { color: COLORS[idx % COLORS.length] } 
      }))
    }]
  };
  return <div className="w-full h-[450px]"><ReactECharts option={option} style={{ height: '100%', width: '100%' }} /></div>;
};

export const ExecutiveLineChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];
  if (safeData.length === 0) return <div className="flex items-center justify-center h-[400px] text-slate-300 font-black uppercase tracking-widest text-[10px]">Registry Empty</div>;

  const option = {
    tooltip: { trigger: 'axis', padding: 12 },
    legend: { data: ['Secondary', 'Primary'], bottom: 10, textStyle: { fontWeight: 'bold', fontSize: 10 } },
    grid: { left: '5%', right: '5%', bottom: '15%', top: '15%', containLabel: true },
    xAxis: { type: 'category', data: safeData.map(d => d.year || 'N/A'), axisLabel: { fontWeight: 'bold', fontSize: 11, color: '#64748b' } },
    yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } } },
    series: [
      { 
        name: 'Secondary', 
        type: 'line', 
        data: safeData.map(d => d.secondary || 0), 
        smooth: true, 
        lineStyle: { width: 4, color: '#0066CC' }, 
        symbolSize: 8,
        itemStyle: { color: '#0066CC' }
      },
      { 
        name: 'Primary', 
        type: 'line', 
        data: safeData.map(d => d.primary || 0), 
        smooth: true, 
        lineStyle: { width: 4, color: '#FF9933' }, 
        symbolSize: 8,
        itemStyle: { color: '#FF9933' }
      }
    ]
  };
  return <div className="w-full h-[500px]"><ReactECharts option={option} style={{ height: '100%', width: '100%' }} /></div>;
};

export const ExecutiveStackedBarChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];
  if (safeData.length === 0) return <div className="flex items-center justify-center h-[500px] text-slate-300 font-black uppercase tracking-widest text-[10px]">Registry Empty</div>;

  const grades = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E'];
  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { bottom: 0, textStyle: { fontWeight: 'bold', fontSize: 10 }, itemGap: 10 },
    grid: { left: '2%', right: '2%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: safeData.map(d => d.state || 'Region'), axisLabel: { rotate: 35, fontWeight: 'bold', fontSize: 9, color: '#64748b' } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: grades.map((grade, idx) => ({ 
      name: grade, 
      type: 'bar', 
      stack: 'total', 
      data: safeData.map(d => d[grade] || 0), 
      itemStyle: { color: COLORS[idx % COLORS.length] } 
    }))
  };
  return <div className="w-full h-[650px]"><ReactECharts option={option} style={{ height: '100%', width: '100%' }} /></div>;
};
