export const STATE_SCHOOL_METRICS: Record<string, { schools: number; students: number; teachers: number }> = {
  "Madhya Pradesh": { schools: 5220, students: 252220, teachers: 15712 },
  "Maharashtra": { schools: 8450, students: 485200, teachers: 22150 },
  "Uttar Pradesh": { schools: 12400, students: 685000, teachers: 35600 },
  "Gujarat": { schools: 4850, students: 215400, teachers: 12850 },
  "Rajasthan": { schools: 6200, students: 310500, teachers: 18400 },
  "Tamil Nadu": { schools: 5800, students: 295000, teachers: 16900 },
  "Karnataka": { schools: 5100, students: 245000, teachers: 14200 },
  "West Bengal": { schools: 4950, students: 238000, teachers: 13500 },
  "Bihar": { schools: 3800, students: 185000, teachers: 9800 },
  "Andhra Pradesh": { schools: 4200, students: 205000, teachers: 11200 },
  "Telangana": { schools: 3900, students: 195000, teachers: 10500 },
  "Kerala": { schools: 2800, students: 145000, teachers: 8900 },
  "Punjab": { schools: 3200, students: 165000, teachers: 9200 },
  "Haryana": { schools: 3500, students: 175000, teachers: 9800 },
  "Delhi": { schools: 2500, students: 125000, teachers: 7800 },
  "Odisha": { schools: 3100, students: 155000, teachers: 8800 },
  "Assam": { schools: 2100, students: 105000, teachers: 5800 },
  "Jharkhand": { schools: 2400, students: 115000, teachers: 6500 },
  "Chhattisgarh": { schools: 2200, students: 108000, teachers: 5900 },
  "Uttarakhand": { schools: 1800, students: 85000, teachers: 4200 },
  "Himachal Pradesh": { schools: 1500, students: 75000, teachers: 3800 },
  "Goa": { schools: 450, students: 22000, teachers: 1200 },
};

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Ladakh", "Jammu & Kashmir",
  "Puducherry", "A&N Islands", "Dadra & Nagar Haveli"
];

const CBSE_REGIONS_LIST = [
  'Ajmer', 'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 
  'Delhi East', 'Delhi West', 'Guwahati', 'Noida', 'Panchkula', 'Patna', 
  'Prayagraj', 'Pune', 'Thiruvananthapuram', 'Vijayawada'
];

const generateHighVolumeData = (baseVal: number, variance: number, count: number = 155) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const state = INDIAN_STATES[i % INDIAN_STATES.length];
    const region = CBSE_REGIONS_LIST[i % CBSE_REGIONS_LIST.length];
    data.push({
      n: `${state} - ${region} Cluster ${Math.floor(i / 10) + 1}`,
      v: baseVal + Math.floor(Math.random() * variance),
      v2: baseVal + Math.floor(Math.random() * variance * 0.8),
      v3: baseVal * 10 + Math.floor(Math.random() * 500)
    });
  }
  return data;
};

const generateStateWiseChallengeData = () => {
  return INDIAN_STATES.slice(0, 15).map(state => ({
    n: state,
    v: Math.floor(Math.random() * 5000) + 1000,
    v2: Math.floor(Math.random() * 500) + 50 // Winners/Top performers
  }));
};

const NATIONAL_OUTCOMES = generateHighVolumeData(70, 25, 12);
const NATIONAL_SPORTS = generateHighVolumeData(75, 20, 155);
const NATIONAL_EXAM = {
  dropout_x: generateHighVolumeData(2, 5, 160),
  dropout_xii: generateHighVolumeData(3, 6, 160),
  rap_analysis: generateHighVolumeData(80, 15, 160),
  variance: generateHighVolumeData(1, 8, 160),
  summary: [{ n: 'Pass', v: 92 }, { n: 'Comp.', v: 6 }, { n: 'Fail', v: 2 }]
};

const MOCK_PHYSICAL_INFRA = [
  { "n": "Drinking Water", "v": 95.4 },
  { "n": "Separate Boys Toilet", "v": 92.2 },
  { "n": "Separate Girls Toilet", "v": 96.1 },
  { "n": "Playground", "v": 82.5 },
  { "n": "Boundary Wall", "v": 88.4 },
  { "n": "Library", "v": 91.8 },
  { "n": "Handrail/Ramps", "v": 78.2 }
];

const MOCK_DIGITAL_INFRA = [
  { "n": "ICT Lab", "v": 68.4 },
  { "n": "Internet Access", "v": 81.1 },
  { "n": "Smart Classrooms", "v": 58.8 },
  { "n": "Digital Library", "v": 38.5 },
  { "n": "Computer Aided Lab", "v": 72.2 }
];

export const academicChallengeData: any = {
  "Ganit Challenge": {
    participation: generateStateWiseChallengeData(),
    winners: [
      { n: 'Delhi Public School, Rohini', v: 42 },
      { n: 'KV No. 1 Colaba', v: 38 },
      { n: 'NPS Bengaluru', v: 35 },
      { n: 'DAV Public School, Pune', v: 31 }
    ],
    summary: [{ n: 'Class 8', v: 12400 }, { n: 'Class 9', v: 15600 }, { n: 'Class 10', v: 18200 }]
  },
  "Science Challenge": {
    participation: generateStateWiseChallengeData(),
    winners: [
      { n: 'Apeejay School, Noida', v: 28 },
      { n: 'JNV Patna', v: 25 },
      { n: 'Amity International', v: 22 },
      { n: 'Loreto House', v: 19 }
    ],
    summary: [{ n: 'Physics', v: 4500 }, { n: 'Chemistry', v: 3800 }, { n: 'Biology', v: 4200 }]
  },
  "Reading Challenge": {
    participation: generateStateWiseChallengeData(),
    winners: [
      { n: 'Step by Step', v: 50 },
      { n: 'Mayo College', v: 48 },
      { n: 'Sanskriti School', v: 45 }
    ],
    summary: [{ n: 'English', v: 22000 }, { n: 'Hindi', v: 18000 }]
  },
  "Veergatha 2022": {
    participation: generateStateWiseChallengeData(),
    winners: [
      { n: 'Army Public School', v: 65 },
      { n: 'KV Cantt', v: 58 },
      { n: 'Modern School', v: 52 }
    ],
    summary: [{ n: 'Painting', v: 12000 }, { n: 'Poetry', v: 8000 }, { n: 'Essay', v: 15000 }]
  }
};

export const dashboardData: any = {
  "regions": {
    "All India": {
      "management": [{ "n": "Govt/State", "v": 12050 }, { "n": "Independent", "v": 15062 }, { "n": "KVS/NVS", "v": 3012 }],
      "demographics": [{ "n": "General", "v": 45 }, { "n": "OBC", "v": 30 }, { "n": "SC/ST", "v": 15 }, { "n": "EWS", "v": 10 }],
      "outcomes": NATIONAL_OUTCOMES,
      "safal": [{ "year": "2021", "secondary": 78, "primary": 82 }, { "year": "2022", "secondary": 81, "primary": 84 }, { "year": "2023", "secondary": 79, "primary": 86 }, { "year": "2024", "secondary": 85, "primary": 89 }],
      "infra": generateHighVolumeData(60, 35, 150),
      "infra_physical": MOCK_PHYSICAL_INFRA,
      "infra_digital": MOCK_DIGITAL_INFRA,
      "sports_school_type": [{ "n": "Independent", "v": 62 }, { "n": "Govt", "v": 24 }, { "n": "KVS", "v": 8 }, { "n": "NVS", "v": 6 }],
      "sports_management": [{ "n": "Central Govt", "v": 1200 }, { "n": "State Govt", "v": 8500 }, { "n": "Private Unaided", "v": 14200 }, { "n": "Aided", "v": 3200 }],
      "sports_regions": NATIONAL_SPORTS,
      "sports_games": [{ "n": "Football", "v": 45 }, { "n": "Cricket", "v": 38 }, { "n": "Basketball", "v": 24 }, { "n": "Athletics", "v": 52 }, { "n": "Badminton", "v": 31 }],
      "exam_performance": NATIONAL_EXAM,
      "school_level": [
        { "level": "Middle", "Govt": 4500, "Independent": 2000, "KVS": 100, "NVS": 50 },
        { "level": "Secondary", "Govt": 5200, "Independent": 8400, "KVS": 450, "NVS": 220 },
        { "level": "Sr. Secondary", "Govt": 2350, "Independent": 4662, "KVS": 704, "NVS": 391 }
      ],
      "balvatika_reporting": [{ "n": "Independent", "v": 4200 }, { "n": "Govt", "v": 1200 }, { "n": "KVS", "v": 850 }, { "n": "NVS", "v": 150 }],
      "balvatika_breakdown": [{ "n": "Balvatika 1", "v": 1240 }, { "n": "Balvatika 2", "v": 2100 }, { "n": "Balvatika 3", "v": 3060 }],
      "teacher_type": [{ "n": "PGT", "v": 342000 }, { "n": "TGT", "v": 458000 }, { "n": "PRT", "v": 540000 }],
      "student_class_strength": [{ "n": "Class IX", "v": 34 }, { "n": "Class X", "v": 32 }, { "n": "Class XI", "v": 28 }, { "n": "Class XII", "v": 26 }],
      "student_cwsn": [{ "n": "Visual", "v": 2400 }, { "n": "Hearing", "v": 1800 }, { "n": "Locomotor", "v": 3200 }, { "n": "Cognitive", "v": 4500 }],
      "ssr_data": generateHighVolumeData(180, 200, 155),
      "tsr_data": generateHighVolumeData(12, 15, 155),
      "land_area": [{ "n": "Urban", "v": 1.2 }, { "n": "Semi-Urban", "v": 2.5 }, { "n": "Rural", "v": 4.8 }, { "n": "Hilly", "v": 1.5 }],
      "sqaaf_maturity": generateHighVolumeData(15, 75, 150),
      "ptr_benchmarks": [{ "n": "Primary", "v": 22, "v2": 30 }, { "n": "Secondary", "v": 18, "v2": 25 }, { "n": "Senior Sec", "v": 14, "v2": 20 }]
    }
  },
  "default": {
    "management": [{ "n": "Govt/State", "v": 12050 }, { "n": "Independent", "v": 15062 }, { "n": "KVS/NVS", "v": 3012 }],
    "school_level": [
      { "level": "Middle", "Govt": 500, "Independent": 500, "KVS": 50, "NVS": 50 },
      { "level": "Secondary", "Govt": 800, "Independent": 1200, "KVS": 150, "NVS": 100 },
      { "level": "Sr. Secondary", "Govt": 400, "Independent": 900, "KVS": 200, "NVS": 150 }
    ],
    "balvatika_reporting": [{ "n": "Independent", "v": 1000 }, { "n": "Govt", "v": 400 }],
    "balvatika_breakdown": [{ "n": "B1", "v": 33 }, { "n": "B2", "v": 33 }, { "n": "B3", "v": 34 }],
    "teacher_type": [{ "n": "PGT", "v": 30000 }, { "n": "TGT", "v": 40000 }, { "n": "PRT", "v": 30000 }],
    "student_class_strength": [{ "n": "Class IX", "v": 35 }, { "n": "Class X", "v": 32 }, { "n": "Class XI", "v": 28 }, { "n": "Class XII", "v": 25 }],
    "student_cwsn": [{ "n": "Visual", "v": 100 }, { "n": "Hearing", "v": 80 }],
    "demographics": [{ "n": "General", "v": 50 }, { "n": "Other", "v": 50 }],
    "ssr_data": generateHighVolumeData(150, 100, 150),
    "tsr_data": generateHighVolumeData(10, 10, 150),
    "land_area": [{ "n": "Urban", "v": 2.0 }, { "n": "Rural", "v": 5.5 }],
    "sqaaf_maturity": generateHighVolumeData(40, 50, 150),
    "ptr_benchmarks": [{ "n": "Primary", "v": 20, "v2": 30 }],
    "outcomes": NATIONAL_OUTCOMES,
    "safal": [{ "year": "2024", "secondary": 80, "primary": 85 }],
    "sports_school_type": [{ "n": "Independent", "v": 70 }, { "n": "Govt", "v": 30 }],
    "sports_management": [{ "n": "Private", "v": 60 }, { "n": "Public", "v": 40 }],
    "sports_regions": NATIONAL_SPORTS,
    "sports_games": [{ "n": "Cricket", "v": 50 }, { "n": "Football", "v": 30 }, { "n": "Badminton", "v": 45 }],
    "exam_performance": NATIONAL_EXAM,
    "infra_physical": MOCK_PHYSICAL_INFRA,
    "infra_digital": MOCK_DIGITAL_INFRA
  }
};