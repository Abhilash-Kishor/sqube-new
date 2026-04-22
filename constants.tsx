
import React from 'react';
import { 
  School, 
  Users, 
  GraduationCap, 
  Building2, 
  MapPin, 
  BarChart3, 
  FileCheck,
  LayoutDashboard,
  Zap,
  Activity,
  Trees,
  UserCheck,
  Scaling,
  Monitor,
  Trophy,
  Globe,
  BookOpen,
  Wifi,
  Users2,
  Droplets,
  Wind,
  Trophy as SportsIcon,
  ClipboardList,
  FileText,
  Compass
} from 'lucide-react';

export interface SubTab {
  id: string;
  label: string;
}

export interface ModuleDefinition {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconType: string;
  subTabs: SubTab[];
}

export const CBSE_REGIONS = [
  'Ajmer', 'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 
  'Delhi East', 'Delhi West', 'Guwahati', 'Noida', 'Panchkula', 'Patna', 
  'Prayagraj', 'Pune', 'Thiruvananthapuram', 'Vijayawada'
];

export const SCHOOL_TYPES = [
  'Independent', 'Govt', 'KVS', 'NVS'
];

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  { 
    id: 'dashboard', 
    title: 'कार्यकारी सारांश', 
    subtitle: 'Executive Summary', 
    icon: <LayoutDashboard size={24} />, 
    iconType: 'pearl-blue',
    subTabs: [{ id: 'national', label: 'National Metrics' }, { id: 'regional', label: 'Regional Comparison' }]
  },
  { 
    id: 'academic_horizon', 
    title: 'अकादमिक क्षितिज', 
    subtitle: 'Academic Horizon', 
    icon: <Compass size={24} />, 
    iconType: 'pearl-purple',
    subTabs: [
      { id: 'asar', label: 'ASAR Activities' },
      { id: 'challenges', label: 'Academic Challenges' },
      { id: 'safal_analytics', label: 'SAFAL Analytics' }
    ]
  },
  { 
    id: 'school', 
    title: 'संस्थान परिदृश्य', 
    subtitle: 'School Panorama', 
    icon: <School size={24} />, 
    iconType: 'pearl-blue',
    subTabs: [
      { id: 'quick_facts', label: 'Quick Facts' },
      { id: 'level_type', label: 'School Level & Type' },
      { id: 'balvatika', label: 'Balvatika' },
      { id: 'student_details', label: 'Student Analytics' },
      { id: 'teacher_details', label: 'Teacher Analytics' },
      { id: 'ssr', label: 'Student-School Ratio' },
      { id: 'tsr', label: 'Teacher-School Ratio' },
      { id: 'land', label: 'School Land Area' },
      { id: 'gis', label: 'School on Map' },
      { id: 'distance', label: 'Distance Tool' },
      { id: 'sqaaf', label: 'SQAAF' }
    ]
  },
  { 
    id: 'infrastructure', 
    title: 'बुनियादी ढांचा', 
    subtitle: 'Infra Panorama', 
    icon: <Building2 size={24} />, 
    iconType: 'pearl-orange',
    subTabs: [{ id: 'physical', label: 'Physical Facilities' }, { id: 'digital', label: 'Digital Amenities' }]
  },
  { 
    id: 'environment', 
    title: 'पर्यावरण और स्थान', 
    subtitle: 'Environment Panorama', 
    icon: <Trees size={24} />, 
    iconType: 'pearl-green',
    subTabs: [{ id: 'sustainability', label: 'Sustainability Hub' }, { id: 'proximity', label: 'Proximity Analysis' }]
  },
  { 
    id: 'sports', 
    title: 'खेल विश्लेषण', 
    subtitle: 'Sports Analytics', 
    icon: <SportsIcon size={24} />, 
    iconType: 'pearl-orange',
    subTabs: [{ id: 'summary', label: 'Sports Summary' }, { id: 'games', label: 'Games Opted' }, { id: 'performance', label: 'Performance' }]
  },
  { 
    id: 'result', 
    title: 'परिणाम', 
    subtitle: 'Result Landscape', 
    icon: <BarChart3 size={24} />, 
    iconType: 'pearl-indigo',
    subTabs: [{ id: 'class10', label: 'Class X' }, { id: 'class12', label: 'Class XII' }, { id: 'grades', label: 'Grade Analytics' }]
  },
  { 
    id: 'affiliation', 
    title: 'संबद्धन', 
    subtitle: 'Affiliation Hub', 
    icon: <FileCheck size={24} />, 
    iconType: 'pearl-cyan',
    subTabs: [{ id: 'status', label: 'Status' }, { id: 'sqaaf', label: 'SQAAF' }]
  },
  { 
    id: 'exam', 
    title: 'परीक्षा विश्लेषण', 
    subtitle: 'Exam Panorama', 
    icon: <Zap size={24} />, 
    iconType: 'pearl-red',
    subTabs: [
      { id: 'result_at_glance', label: 'Result at Glance' },
      { id: 'dropout_9_10', label: 'Drop-out Analysis: 9th - 10th' },
      { id: 'leftout_10_11', label: 'Left/Out Analysis: 10th - 11th' },
      { id: 'school_vs_exam', label: 'School vs Exam Centres' },
      { id: 'scoring_100', label: 'Scoring 100 marks' },
      { id: 'top_students', label: 'Top 0.1% Students' },
      { id: 'qp_analysis', label: 'Question Paper Analysis' },
      { id: 'board_mean', label: 'Board Exam (Mean Marks Analysis)' },
      { id: 'theory_practical', label: 'Theory Practical Variance' },
      { id: 'registered_appeared', label: 'Registered Appeared Passed' }
    ]
  }
];

export const GRADES = [
  { grade: 'A1', color: '#4f46e5', history: [{ year: '2025', count: 125400, percentage: 12.4 }, { year: '2024', count: 118200, percentage: 11.8 }, { year: '2023', count: 105400, percentage: 10.5 }] },
  { grade: 'A2', color: '#6366f1', history: [{ year: '2025', count: 142100, percentage: 14.1 }, { year: '2024', count: 135400, percentage: 13.5 }, { year: '2023', count: 128200, percentage: 12.8 }] },
  { grade: 'B1', color: '#818cf8', history: [{ year: '2025', count: 168200, percentage: 16.7 }, { year: '2024', count: 162100, percentage: 16.2 }, { year: '2023', count: 154300, percentage: 15.4 }] },
  { grade: 'B2', color: '#a5b4fc', history: [{ year: '2025', count: 185400, percentage: 18.4 }, { year: '2024', count: 178200, percentage: 17.8 }, { year: '2023', count: 169100, percentage: 16.9 }] },
  { grade: 'C1', color: '#67e8f9', history: [{ year: '2025', count: 142100, percentage: 14.1 }, { year: '2024', count: 145200, percentage: 14.5 }, { year: '2023', count: 148300, percentage: 14.8 }] },
  { grade: 'C2', color: '#fb923c', history: [{ year: '2025', count: 98200, percentage: 9.7 }, { year: '2024', count: 102100, percentage: 10.2 }, { year: '2023', count: 108400, percentage: 10.8 }] },
  { grade: 'D1', color: '#f87171', history: [{ year: '2025', count: 65400, percentage: 6.5 }, { year: '2024', count: 72100, percentage: 7.2 }, { year: '2023', count: 78400, percentage: 7.8 }] },
  { grade: 'D2', color: '#ec4899', history: [{ year: '2025', count: 42100, percentage: 4.2 }, { year: '2024', count: 48200, percentage: 4.8 }, { year: '2023', count: 52100, percentage: 5.2 }] },
  { grade: 'E', color: '#d1d5db', history: [{ year: '2025', count: 32100, percentage: 3.2 }, { year: '2024', count: 35400, percentage: 3.5 }, { year: '2023', count: 42100, percentage: 4.2 }] },
];

export const STATE_PERFORMANCE = [
  { state: 'Delhi', A1: 4200, A2: 5100, B1: 6200, B2: 7100, C1: 5400, C2: 3200, D1: 2100, D2: 1400, E: 800 },
  { state: 'Maharashtra', A1: 3800, A2: 4800, B1: 5900, B2: 6800, C1: 5200, C2: 3000, D1: 2000, D2: 1300, E: 750 },
  { state: 'Tamil Nadu', A1: 4500, A2: 5400, B1: 6500, B2: 7400, C1: 5800, C2: 3500, D1: 2300, D2: 1600, E: 900 },
  { state: 'Uttar Pradesh', A1: 3200, A2: 4200, B1: 5300, B2: 6200, C1: 4800, C2: 2800, D1: 1800, D2: 1100, E: 650 },
  { state: 'Karnataka', A1: 3900, A2: 4900, B1: 6000, B2: 6900, C1: 5300, C2: 3100, D1: 2100, D2: 1400, E: 780 },
  { state: 'West Bengal', A1: 3500, A2: 4500, B1: 5600, B2: 6500, C1: 5000, C2: 2900, D1: 1900, D2: 1200, E: 700 },
  { state: 'Bihar', A1: 2800, A2: 3800, B1: 4900, B2: 5800, C1: 4400, C2: 2500, D1: 1600, D2: 950, E: 550 },
  { state: 'Rajasthan', A1: 3600, A2: 4600, B1: 5700, B2: 6600, C1: 5100, C2: 3000, D1: 2000, D2: 1300, E: 750 },
  { state: 'Gujarat', A1: 3700, A2: 4700, B1: 5800, B2: 6700, C1: 5200, C2: 3000, D1: 2000, D2: 1300, E: 760 },
  { state: 'Kerala', A1: 4800, A2: 5700, B1: 6800, B2: 7700, C1: 6200, C2: 3800, D1: 2500, D2: 1800, E: 1000 },
];

export const STATES_INDIA = [
  'All India', 'Delhi', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'Karnataka', 'West Bengal', 'Bihar', 'Rajasthan', 'Gujarat'
];

export const DISTRICTS_BY_STATE: Record<string, string[]> = {
  'All India': ['Select State First'],
  'Delhi': ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Prayagraj', 'Agra', 'Varanasi', 'Noida'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot']
};

export const MOCK_REGIONAL_DATA: Record<string, any> = {
  'All India': { schools: 30124, teachers: 1340000, students: 28400000, gpi: 0.98, ptr: 24, passRate: 91.2, rank: 0, teacherAdequacy: 88, infraScore: 82, digitalIndex: 75, nepReady: 82 },
  'Delhi West': { schools: 2450, teachers: 84000, students: 1800000, gpi: 1.02, ptr: 21, passRate: 94.5, rank: 2, teacherAdequacy: 92, infraScore: 88, digitalIndex: 85, nepReady: 89 },
  'Chennai': { schools: 3200, teachers: 120000, students: 2400000, gpi: 0.96, ptr: 20, passRate: 92.8, rank: 1, teacherAdequacy: 95, infraScore: 90, digitalIndex: 88, nepReady: 92 },
  'Bhopal': { schools: 4800, teachers: 180000, students: 4200000, gpi: 0.92, ptr: 28, passRate: 88.4, rank: 12, teacherAdequacy: 78, infraScore: 75, digitalIndex: 68, nepReady: 74 },
  'Ajmer': { schools: 2100, teachers: 95000, students: 1600000, gpi: 1.05, ptr: 19, passRate: 95.2, rank: 4, teacherAdequacy: 86, infraScore: 84, digitalIndex: 80, nepReady: 85 },
};

export interface KPI_Definition {
  label: string;
  key: string;
  value: string;
  trend: 'up' | 'down';
  change: string;
  description: string;
  whatIsIt: string;
  whyItMatters: string;
  howToInterpret: string;
  icon: React.ReactNode;
}

export const QUICK_FACTS_KPIS: KPI_Definition[] = [
  { 
    label: 'Total Schools', 
    key: 'schools', 
    value: '30,124', 
    trend: 'up', 
    change: '+2.4%', 
    description: 'Growth in affiliated schools across all regions.',
    whatIsIt: 'The total number of functional institutions affiliated with CBSE across India and abroad.',
    whyItMatters: 'Indicates the board\'s reach and the capacity to accommodate the national student population.',
    howToInterpret: 'Positive growth suggests increasing trust in the CBSE curriculum and expansion of educational infrastructure.',
    icon: <School size={24} /> 
  },
  { 
    label: 'Total Teachers', 
    key: 'teachers', 
    value: '1.34M', 
    trend: 'up', 
    change: '+1.8%', 
    description: 'Verified staff across Primary, TGT, and PGT categories.',
    whatIsIt: 'Total count of uniquely identified and verified teaching staff registered in OASIS.',
    whyItMatters: 'Essential for maintaining pedagogical quality and calculating the national PTR.',
    howToInterpret: 'Should grow proportionally with student enrollment to ensure academic standards are met.',
    icon: <Users size={24} /> 
  },
  { 
    label: 'Total Students', 
    key: 'students', 
    value: '28.4M', 
    trend: 'up', 
    change: '+3.1%', 
    description: 'Enrolled students from Class IX to XII.',
    whatIsIt: 'Aggregate enrollment figures validated through the Board\'s registration systems.',
    whyItMatters: 'The primary metric for resource planning, exam logistics, and policy outreach.',
    howToInterpret: 'Surges in enrollment might require rapid infrastructure and teacher deployment.',
    icon: <GraduationCap size={24} /> 
  },
  { 
    label: 'Pupil Teacher Ratio', 
    key: 'ptr', 
    value: '24:1', 
    trend: 'down', 
    change: '-1.2%', 
    description: 'Optimizing PTR according to NEP 2020 standards.',
    whatIsIt: 'The ratio of students to the number of teachers available in a specific cluster.',
    whyItMatters: 'A critical indicator of individual attention and classroom management efficiency.',
    howToInterpret: 'Lower ratios (closer to 20:1) are generally preferred for higher quality personalized learning.',
    icon: <Scaling size={24} /> 
  },
  { 
    label: 'Gender Parity Index', 
    key: 'gpi', 
    value: '0.98', 
    trend: 'up', 
    change: '+0.02', 
    description: 'Institutional girl-to-boy enrolment ratio.',
    whatIsIt: 'The ratio of female students to male students enrolled across the network.',
    whyItMatters: 'Measures progress toward gender equity and female empowerment in education.',
    howToInterpret: 'A value of 1.0 represents perfect parity. Trends moving toward 1.0 indicate successful inclusivity policies.',
    icon: <Activity size={24} /> 
  },
  { 
    label: 'Staff Vacancy %', 
    key: 'vacancy', 
    value: '4.2%', 
    trend: 'down', 
    change: '-0.8%', 
    description: 'Teacher recruitment positions vs sanctioned.',
    whatIsIt: 'Percentage of sanctioned teaching posts currently unoccupied.',
    whyItMatters: 'Directly impacts PTR and causes learning gaps if left unaddressed.',
    howToInterpret: 'High vacancy rates in specific regions signal an urgent need for recruitment drives.',
    icon: <UserCheck size={24} /> 
  },
  { 
    label: 'Green Index', 
    key: 'solar', 
    value: '42%', 
    trend: 'up', 
    change: '+8%', 
    description: 'Schools with solar/sustainable energy audits.',
    whatIsIt: 'Percentage of schools implementing renewable energy or sustainable waste management.',
    whyItMatters: 'Aligns institutions with national sustainability goals and reduces operational costs.',
    howToInterpret: 'High percentages reflect successful infrastructure modernization and ecological awareness.',
    icon: <Trees size={24} /> 
  },
  { 
    label: 'NEP Readiness', 
    key: 'nep', 
    value: '82%', 
    trend: 'up', 
    change: '+15%', 
    description: 'Implementation maturity of NCF guidelines.',
    whatIsIt: 'A composite score measuring the adoption of New Curriculum Framework guidelines.',
    whyItMatters: 'Tracks the speed and depth of the national educational transformation.',
    howToInterpret: 'Scores above 80% indicate robust early adoption and alignment with 21st-century learning goals.',
    icon: <Zap size={24} /> 
  },
];

export interface CompositeIndicator {
  label: string;
  key: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export const COMPOSITE_INDICATORS: CompositeIndicator[] = [
  {
    label: 'Teacher Adequacy Index',
    key: 'teacherAdequacy',
    icon: <Users2 size={20} />,
    description: 'Weights PTR, teacher qualification, and professional development training hours.',
    color: '#4f46e5'
  },
  {
    label: 'Infrastructure Readiness',
    key: 'infraScore',
    icon: <Building2 size={20} />,
    description: 'Aggregates safety compliance, laboratory quality, and playground standards.',
    color: '#f59e0b'
  },
  {
    label: 'Digital Readiness Index',
    key: 'digitalIndex',
    icon: <Wifi size={20} />,
    description: 'Measures ICT lab availability, high-speed internet access, and smart-classroom penetration.',
    color: '#0ea5e9'
  },
  {
    label: 'NEP Implementation Score',
    key: 'nepReady',
    icon: <BookOpen size={20} />,
    description: 'Tracks NCF alignment, competency-based assessment adoption, and vocational integration.',
    color: '#10b981'
  }
];
