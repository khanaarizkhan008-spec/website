
export interface Student {
  name: string;
  rollNumber: string;
  department: string;
  semester: number;
  joinDate: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  category: 'core' | 'lab' | 'elective' | 'revision';
  credits: number;
  color: string;
  professor: string;
  plannedHoursPerWeek: number;
}

export interface StudyPlan {
  id: string;
  subjectId: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  studyType: 'reading' | 'practice' | 'notes' | 'lab' | 'revision';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  actualDuration?: number;
  notes?: string;
  reason?: string;
}

export interface Assessment {
  id: string;
  subjectId: string;
  type: string;
  name: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  date: string;
  topics?: string[];
  difficulty?: string;
  notes?: string;
}

export interface WeeklyStats {
  weekNumber: number;
  weekStart: string;
  weekEnd: string;
  plannedHours: number;
  completedHours: number;
  completionRate: number;
  assessmentAverage: number | null;
  subjectBreakdown: Record<string, { planned: number; completed: number }>;
}

export interface Insight {
  type: string;
  text: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

export interface PlanningCorrelation {
  subject: string;
  plannedHours: number;
  averageScore: number;
  assessmentCount: number;
}
