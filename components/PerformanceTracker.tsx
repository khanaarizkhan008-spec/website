
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, ArrowUpRight, CheckCircle, Target, Award, ListTodo } from 'lucide-react';
import { SUBJECTS, ASSESSMENTS, WavyUnderline } from '../constants';

const PerformanceTracker: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <header>
        <h1 className="font-display text-6xl md:text-7xl mb-4 tracking-tight">
          Track Your <br />
          <span className="italic">Performance</span>
        </h1>
        <div className="w-48">
          <WavyUnderline color="#000" />
        </div>
        <p className="text-gray-500 mt-6 text-xl">See how planning translates to results</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <PerfStatCard label="Latest Average" value="84" sub="/100" accent="#FFD4C4" />
        <PerfStatCard label="Subjects Tracked" value="5" sub="active" accent="#E8F4FF" />
        <PerfStatCard label="Assessments Logged" value="12" sub="this sem" accent="#FFE5E5" />
        <PerfStatCard label="Improvement" value="+6%" sub="trend" accent="#E8F9F0" isTrend />
      </div>

      {/* Subject Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SUBJECTS.map((sub, idx) => (
          <SubjectCard key={sub.id} subject={sub} assessments={ASSESSMENTS.filter(a => a.subjectId === sub.id)} />
        ))}
      </div>

      <button className="fixed bottom-12 right-12 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group z-50">
        <Plus className="w-8 h-8" />
        <span className="absolute right-20 bg-black text-white px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-bold shadow-xl">
          Log Assessment
        </span>
      </button>
    </div>
  );
};

const PerfStatCard = ({ label, value, sub, accent, isTrend }: any) => (
  <div className="bg-white rounded-[32px] p-8 shadow-sm border-t-8 border-gray-50 relative overflow-hidden group" style={{ borderTopColor: accent }}>
    <div className="relative z-10">
      <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-5xl font-mono font-bold ${isTrend ? 'text-green-600' : ''}`}>{value}</span>
        <span className="text-gray-300 font-mono text-lg">{sub}</span>
      </div>
    </div>
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      {isTrend ? <TrendingUp className="w-12 h-12" /> : <Target className="w-12 h-12" />}
    </div>
  </div>
);

const SubjectCard = ({ subject, assessments }: any) => {
  const avg = assessments.length > 0 
    ? Math.round(assessments.reduce((acc: number, curr: any) => acc + curr.percentage, 0) / assessments.length)
    : 0;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50 flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-display text-3xl mb-1">{subject.name}</h3>
          <p className="text-gray-400 font-mono text-xs">{subject.code}</p>
        </div>
        <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <p className="text-sm font-medium text-gray-500">Average Performance</p>
          <p className="text-3xl font-mono font-bold">{avg}%</p>
        </div>
        <div className="h-4 bg-gray-50 rounded-full overflow-hidden p-1">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${avg}%` }}
            className={`h-full rounded-full ${avg > 80 ? 'bg-green-500' : avg > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <ListTodo className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">Assessments</p>
        </div>
        {assessments.length > 0 ? (
          assessments.map((a: any) => (
            <div key={a.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 group cursor-default">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-medium">{a.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-gray-400">{a.marksObtained}/{a.maxMarks}</span>
                <span className="bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors px-3 py-1 rounded-full text-xs font-mono font-bold">
                  {a.percentage}%
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center italic py-4">No assessments logged yet</p>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-500">Planned: <span className="font-bold text-black">{subject.plannedHoursPerWeek}h/wk</span></span>
        </div>
        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Improving
        </span>
      </div>
    </motion.div>
  );
};

export default PerformanceTracker;
