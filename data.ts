
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
  if (!INDIAN_STATES.length || !CBSE_REGIONS_LIST.length) return [];
  
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

export const dashboardData: any = {
  "regions": {
    "All India": {
      "management": [{ "n": "Govt/State", "v": 12050 }, { "n": "Independent", "v": 15062 }, { "n": "KVS/NVS", "v": 3012 }],
      "demographics": [{ "n": "General", "v": 45 }, { "n": "OBC", "v": 30 }, { "n": "SC/ST", "v": 15 }, { "n": "EWS", "v": 10 }],
      "outcomes": generateHighVolumeData(70, 25, 20),
      "safal": [{ "year": "2021", "secondary": 78, "primary": 82 }, { "year": "2022", "secondary": 81, "primary": 84 }, { "year": "2023", "secondary": 79, "primary": 86 }, { "year": "2024", "secondary": 85, "primary": 89 }],
      "infra": generateHighVolumeData(60, 35, 150),
      "sports_school_type": [{ "n": "Independent", "v": 62 }, { "n": "Govt", "v": 24 }, { "n": "KVS", "v": 8 }, { "n": "NVS", "v": 6 }],
      "sports_management": [{ "n": "Central Govt", "v": 1200 }, { "n": "State Govt", "v": 8500 }, { "n": "Private Unaided", "v": 14200 }, { "n": "Aided", "v": 3200 }],
      "sports_regions": generateHighVolumeData(75, 20, 155),
      "sports_games": [{ "n": "Football", "v": 45 }, { "n": "Cricket", "v": 38 }, { "n": "Basketball", "v": 24 }, { "n": "Athletics", "v": 52 }, { "n": "Badminton", "v": 31 }],
      "exam_performance": {
         "dropout_x": generateHighVolumeData(2, 5, 160),
         "dropout_xii": generateHighVolumeData(3, 6, 160),
         "rap_analysis": generateHighVolumeData(80, 15, 160),
         "variance": generateHighVolumeData(1, 8, 160),
         "summary": [{ n: 'Pass', v: 92 }, { n: 'Comp.', v: 6 }, { n: 'Fail', v: 2 }]
      },
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
    "management": [{ "n": "Public", "v": 1000 }, { "n": "Private", "v": 2000 }],
    "school_level": [{ "level": "Middle", "Govt": 500, "Independent": 500, "KVS": 50, "NVS": 50 }],
    "balvatika_reporting": [{ "n": "Sample", "v": 100 }],
    "balvatika_breakdown": [{ "n": "B1", "v": 33 }, { "n": "B2", "v": 33 }, { "n": "B3", "v": 34 }],
    "teacher_type": [{ "n": "PGT", "v": 30 }, { "n": "TGT", "v": 40 }, { "n": "PRT", "v": 30 }],
    "student_class_strength": [{ "n": "Grade 10", "v": 35 }],
    "student_cwsn": [{ "n": "CWSN", "v": 100 }],
    "demographics": [{ "n": "General", "v": 50 }, { "n": "Other", "v": 50 }],
    "ssr_data": generateHighVolumeData(150, 100, 150),
    "tsr_data": generateHighVolumeData(10, 10, 150),
    "land_area": [{ "n": "Sample", "v": 2.0 }],
    "sqaaf_maturity": generateHighVolumeData(40, 50, 150),
    "ptr_benchmarks": [{ "n": "Primary", "v": 20, "v2": 30 }],
    "outcomes": [{ "n": "L1", "v": 70 }, { "n": "L2", "v": 80 }],
    "safal": [{ "year": "2024", "secondary": 80, "primary": 85 }],
    "sports_school_type": [{ "n": "Sample", "v": 100 }],
    "sports_management": [{ "n": "Sample", "v": 100 }],
    "sports_regions": [{ "n": "Sample", "v": 100 }],
    "sports_games": [{ "n": "Sample", "v": 100 }],
    "exam_performance": { "dropout_x": [], "dropout_xii": [], "rap_analysis": [], "variance": [], "summary": [] }
  }
};
