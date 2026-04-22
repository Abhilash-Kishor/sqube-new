
export interface User {
  username: string;
  role: 'Leadership' | 'PolicyMaker' | 'Analyst' | 'Admin';
}

export interface KPI {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  description: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';
export type Theme = 'light' | 'dark';

export enum AppRoute {
  LANDING = 'landing',
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  SCHOOL_ANALYTICS = 'school',
  TEACHER_ANALYTICS = 'teacher',
  STUDENT_ANALYTICS = 'student',
  INFRASTRUCTURE = 'infrastructure',
  RESULT_LANDSCAPE = 'result',
}