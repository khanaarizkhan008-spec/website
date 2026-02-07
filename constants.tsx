
import React from 'react';
import { Subject, StudyPlan, Assessment, WeeklyStats, Insight, PlanningCorrelation } from './types';

export const WavyDivider = () => (
  <svg viewBox="0 0 20 40" className="w-4 h-8 text-gray-200">
    <path d="M10,0 Q15,10 10,20 Q5,30 10,40" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const WavyUnderline = ({ color = 'black' }: { color?: string }) => (
  <svg className="w-full h-2 mt-1" viewBox="0 0 100 10" preserveAspectRatio="none">
    <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke"/>
  </svg>
);

export const SUBJECTS: Subject[] = [
  { id: "sub1", name: "Data Structures & Algorithms", code: "CS301", category: "core", credits: 4, color: "#3B82F6", professor: "Dr. Sharma", plannedHoursPerWeek: 8 },
  { id: "sub2", name: "Database Systems", code: "CS302", category: "core", credits: 4, color: "#6366F1", professor: "Dr. Kumar", plannedHoursPerWeek: 6 },
  { id: "sub3", name: "Web Technologies", code: "CS303", category: "core", credits: 3, color: "#8B5CF6", professor: "Prof. Mehta", plannedHoursPerWeek: 5 },
  { id: "sub4", name: "DBMS Lab", code: "CS302L", category: "lab", credits: 2, color: "#10B981", professor: "Dr. Kumar", plannedHoursPerWeek: 4 },
  { id: "sub5", name: "Machine Learning", code: "CS304", category: "elective", credits: 3, color: "#F59E0B", professor: "Dr. Singh", plannedHoursPerWeek: 5 }
];

export const STUDY_PLANS: StudyPlan[] = [
  { id: "plan1", subjectId: "sub1", topic: "BST Implementation", date: "2024-05-13", startTime: "09:00", endTime: "11:00", duration: 120, studyType: "practice", priority: "high", completed: true, actualDuration: 125 },
  { id: "plan2", subjectId: "sub2", topic: "Normalization Examples", date: "2024-05-13", startTime: "14:00", endTime: "16:00", duration: 120, studyType: "reading", priority: "medium", completed: true, actualDuration: 115 },
  { id: "plan3", subjectId: "sub3", topic: "React State Management", date: "2024-05-14", startTime: "10:00", endTime: "11:30", duration: 90, studyType: "practice", priority: "medium", completed: true, actualDuration: 95 },
  { id: "plan4", subjectId: "sub4", topic: "SQL Join Assignment", date: "2024-05-14", startTime: "15:00", endTime: "17:00", duration: 120, studyType: "lab", priority: "high", completed: true, actualDuration: 140 },
  { id: "plan5", subjectId: "sub1", topic: "AVL Rotations", date: "2024-05-15", startTime: "09:00", endTime: "11:00", duration: 120, studyType: "practice", priority: "high", completed: true, actualDuration: 130 },
  { id: "plan6", subjectId: "sub5", topic: "Linear Regression Math", date: "2024-05-15", startTime: "14:00", endTime: "15:30", duration: 90, studyType: "reading", priority: "medium", completed: false, reason: "Group meeting" },
  { id: "plan7", subjectId: "sub2", topic: "ACID Transactions", date: "2024-05-16", startTime: "10:00", endTime: "12:00", duration: 120, studyType: "reading", priority: "medium", completed: true },
  { id: "plan8", subjectId: "sub3", topic: "Node.js API Development", date: "2024-05-16", startTime: "15:00", endTime: "17:00", duration: 120, studyType: "practice", priority: "high", completed: false }
];

export const ASSESSMENTS: Assessment[] = [
  { id: "assess1", subjectId: "sub1", type: "internal1", name: "Internal Exam 1", marksObtained: 42, maxMarks: 50, percentage: 84, date: "2024-04-20" },
  { id: "assess2", subjectId: "sub2", type: "internal1", name: "Internal Exam 1", marksObtained: 38, maxMarks: 50, percentage: 76, date: "2024-04-22" },
  { id: "assess10", subjectId: "sub1", type: "internal2", name: "Internal Exam 2", marksObtained: 45, maxMarks: 50, percentage: 90, date: "2024-05-05" }
];

export const WEEKLY_STATS: WeeklyStats[] = [
  { weekNumber: 1, weekStart: "2024-04-06", weekEnd: "2024-04-12", plannedHours: 20, completedHours: 18, completionRate: 90, assessmentAverage: 78, subjectBreakdown: { sub1: { planned: 6, completed: 6 } } },
  { weekNumber: 2, weekStart: "2024-04-13", weekEnd: "2024-04-19", plannedHours: 24, completedHours: 22, completionRate: 92, assessmentAverage: 82, subjectBreakdown: { sub1: { planned: 7, completed: 7 } } },
  { weekNumber: 3, weekStart: "2024-04-20", weekEnd: "2024-04-26", plannedHours: 18, completedHours: 14, completionRate: 78, assessmentAverage: 75, subjectBreakdown: { sub1: { planned: 5, completed: 4 } } },
  { weekNumber: 4, weekStart: "2024-04-27", weekEnd: "2024-05-02", plannedHours: 26, completedHours: 24, completionRate: 92, assessmentAverage: 86, subjectBreakdown: { sub1: { planned: 8, completed: 8 } } }
];

export const INSIGHTS: Insight[] = [
  { type: "time_preference", text: "You complete 85% of morning study blocks vs 60% evening blocks", recommendation: "Consider scheduling important subjects before 12 PM", priority: "high" },
  { type: "volume_correlation", text: "Subjects with 5+ planned hours/week show 12% higher assessment scores", recommendation: "Current high performers: Data Structures, DBMS", priority: "medium" },
  { type: "streak_impact", text: "Your study streaks correlate with 0.4 point better semester averages", recommendation: "Keep the momentum going! Current streak: 7 days", priority: "high" }
];

export const PLANNING_CORRELATION: PlanningCorrelation[] = [
  { subject: "Data Structures", plannedHours: 32, averageScore: 85, assessmentCount: 5 },
  { subject: "DBMS", plannedHours: 24, averageScore: 78, assessmentCount: 4 },
  { subject: "Web Tech", plannedHours: 20, averageScore: 82, assessmentCount: 3 },
  { subject: "DBMS Lab", plannedHours: 16, averageScore: 93, assessmentCount: 2 },
  { subject: "Machine Learning", plannedHours: 12, averageScore: 72, assessmentCount: 3 }
];
